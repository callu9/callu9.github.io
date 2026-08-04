import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const OWNER = "callu9"; // target repo owner
const REPO = "frontend-study"; // target repo name
const BRANCH = "main"; // branch to read from
const GITHUB_API = "https://api.github.com";

export type BlogFrontmatter = {
  title?: string;
  description?: string;
  date?: string;
  readingTime?: number;
};

export type GitHubPost = {
  slug: string;
  path: string;
  frontmatter: BlogFrontmatter;
  html: string;
  raw: string;
};

function getHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  return headers;
}

async function mdToHtml(md: string) {
  const processed = await remark().use(html).process(md);
  return processed.toString();
}

export async function listMarkdownPathsRecursive(): Promise<string[]> {
  const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) {
    // If we hit a 403 (rate limit or API restriction), fallback to the
    // Contents API which lists directories and files and is often more
    // forgiving for public repos. If that also fails, throw.
    if (res.status === 403) {
      console.warn(
        "GitHub tree API returned 403; falling back to Contents API",
      );
      // Fallback: traverse repo via the Contents API
      const paths = await listMarkdownPathsViaContents();
      return paths;
    }
    throw new Error(`Failed to fetch repo tree: ${res.status}`);
  }
  const data = await res.json();
  const tree = data.tree as Array<{ path: string; type: string }>;
  // Return all .md / .mdx files
  return tree
    .filter(
      (t) =>
        t.type === "blob" &&
        (t.path.endsWith(".md") || t.path.endsWith(".mdx")),
    )
    .map((t) => t.path);
}

async function listMarkdownPathsViaContents(dir = ""): Promise<string[]> {
  const results: string[] = [];
  const apiUrl = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${dir}?ref=${BRANCH}`;
  const res = await fetch(apiUrl, { headers: getHeaders() });
  if (!res.ok) {
    throw new Error(`Contents API failed for ${dir}: ${res.status}`);
  }
  const data = await res.json();
  // If the path is a file, GitHub returns an object, otherwise an array for directory
  const items = Array.isArray(data) ? data : [data];
  for (const item of items) {
    if (item.type === "file") {
      if (item.path.endsWith(".md") || item.path.endsWith(".mdx")) {
        results.push(item.path);
      }
    } else if (item.type === "dir") {
      const child = await listMarkdownPathsViaContents(item.path);
      results.push(...child);
    }
    // skip other types (symlink, submodule)
  }
  return results;
}

type TreeNode = {
  name: string;
  path: string;
  type: "tree" | "blob";
  children?: TreeNode[];
};

/**
 * Returns the raw git tree (flat) for the repo branch.
 */
export async function getRepoTreeRecursive() {
  const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) throw new Error(`Failed to fetch repo tree: ${res.status}`);
  const data = await res.json();
  return data.tree as Array<{ path: string; type: string }>;
}

/**
 * Build a nested tree structure from the git tree array.
 * Keeps directories and files; files include their path and type.
 */
export async function buildNestedTree(rootPrefix = ""): Promise<TreeNode[]> {
  const tree = await getRepoTreeRecursive();
  const nodes: Record<string, TreeNode> = {};

  // Helper to ensure a node exists
  const ensureNode = (pathParts: string[]) => {
    let currentPath = "";
    let parent: TreeNode | undefined = undefined;
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      if (!nodes[currentPath]) {
        nodes[currentPath] = {
          name: part,
          path: currentPath,
          type: i === pathParts.length - 1 ? "blob" : "tree",
          children: [],
        };
        if (parent) parent.children = parent.children || [];
        if (parent && !parent.children!.some((c) => c.path === currentPath)) {
          parent.children!.push(nodes[currentPath]);
        }
      }
      parent = nodes[currentPath];
    }
    return nodes[pathParts.join("/")];
  };

  // Build tree only for entries that match rootPrefix (or all if empty)
  for (const entry of tree) {
    if (rootPrefix && !entry.path.startsWith(rootPrefix)) continue;
    const rel = rootPrefix
      ? entry.path.replace(new RegExp(`^${rootPrefix}/?`), "")
      : entry.path;
    const parts = rel.split("/").filter(Boolean);
    if (parts.length === 0) continue;
    ensureNode(parts);
  }

  // Collect top-level nodes (those without a slash in rel path)
  const roots: TreeNode[] = [];
  for (const key of Object.keys(nodes)) {
    if (!key.includes("/")) roots.push(nodes[key]);
  }
  return roots;
}

/**
 * Fetch a file's raw content by its repo path (e.g. content/blog/post.md)
 */
export async function fetchRawByPath(path: string) {
  const url = rawUrlForPath(path);
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`Failed to fetch raw file ${path}: ${res.status}`);
  return res.text();
}

function rawUrlForPath(path: string) {
  return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;
}

export async function getAllPostsFromGitHub(): Promise<GitHubPost[]> {
  let paths: string[] = [];
  try {
    paths = await listMarkdownPathsRecursive();
  } catch (err) {
    console.error("Failed to list markdown paths from GitHub:", err);
    return [];
  }

  const posts: GitHubPost[] = [];

  // Fetch files one-by-one with per-file error handling so a single
  // bad/missing/temporarily-failing file doesn't cause the whole page
  // render to throw (which produces a 500).
  for (const p of paths) {
    try {
      const url = rawUrlForPath(p);
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Skipping ${p}: failed to fetch raw file: ${res.status}`);
        continue;
      }
      const raw = await res.text();
      const { data, content } = matter(raw);
      const frontmatter: BlogFrontmatter = {
        title: typeof data.title === "string" ? data.title : undefined,
        description:
          typeof data.description === "string" ? data.description : undefined,
        date: typeof data.date === "string" ? data.date : undefined,
        readingTime:
          typeof data.readingTime === "number" ? data.readingTime : undefined,
      };
      const htmlContent = await mdToHtml(content);
      const slug = p.replace(/\.mdx?$/, "").toLowerCase();
      posts.push({ slug, path: p, frontmatter, html: htmlContent, raw });
    } catch (err) {
      console.error(`Error processing ${p}, skipping.`, err);
      continue;
    }
  }
  // sort by date if available
  posts.sort((a, b) => {
    const da = new Date(a.frontmatter?.date || 0).getTime();
    const db = new Date(b.frontmatter?.date || 0).getTime();
    return db - da;
  });
  return posts;
}

export async function getPostBySlugFromGitHub(slug: string) {
  const posts = await getAllPostsFromGitHub();
  return posts.find((p) => p.slug === slug) ?? null;
}

export default getAllPostsFromGitHub;
