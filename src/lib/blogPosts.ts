import type { BlogConfig } from "@/data/blogs";
import type { GitHubPost } from "@/lib/githubPosts";

export type ResolvedBlogPost = {
  path: string;
  html: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  date?: string;
  readingTime?: number;
};

export function resolveBlogPost(
  post: Pick<GitHubPost, "path" | "frontmatter" | "html">,
  config?: BlogConfig,
): ResolvedBlogPost {
  const heading = post.html
    .match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1]
    ?.replace(/<[^>]*>/g, "")
    .trim();

  return {
    path: post.path,
    html: post.html,
    title: post.frontmatter.title || config?.title || heading || post.path,
    description: post.frontmatter.description || config?.description || "",
    category: config?.category || "개발",
    featured: Boolean(config?.featured),
    date: post.frontmatter.date || undefined,
    readingTime: post.frontmatter.readingTime || undefined,
  };
}

export function createFallbackBlogPost(config: BlogConfig): ResolvedBlogPost {
  return {
    path: config.path,
    html: "<p>원격 저장소에서 포스트 내용을 불러올 수 없습니다.</p>",
    title: config.title || config.path.split("/").pop() || "포스트",
    description: config.description,
    category: config.category,
    featured: Boolean(config.featured),
  };
}
