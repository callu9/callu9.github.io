import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsFromGitHub, type GitHubPost } from "@/lib/githubPosts";
import { getBlogConfig, getVisibleBlogs } from "@/data/blogs";
import {
  createFallbackBlogPost,
  resolveBlogPost,
  type ResolvedBlogPost,
} from "@/lib/blogPosts";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

async function getResolvedPost(
  pathWithoutExt: string,
): Promise<ResolvedBlogPost | null> {
  const config = getBlogConfig(pathWithoutExt);
  if (!config) return null;

  let post: GitHubPost | undefined;
  try {
    const posts = await getAllPostsFromGitHub();
    post = posts.find(
      (candidate) =>
        candidate.path.replace(/\.mdx?$/, "") === pathWithoutExt,
    );
  } catch (error) {
    console.error("Failed to list markdown paths from GitHub:", error);
  }

  return post ? resolveBlogPost(post, config) : createFallbackBlogPost(config);
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPostsFromGitHub();
    if (posts && posts.length > 0) {
      // Return params as arrays of path segments (without extension)
      return posts.map((p) => ({
        slug: p.path.replace(/\.mdx?$/, "").split("/") as string[],
      }));
    }
  } catch (err) {
    console.error("Failed to list markdown paths from GitHub:", err);
  }

  // Fallback to local blog config if GitHub is inaccessible (e.g., 403).
  const configs = getVisibleBlogs();
  return configs.map((c) => ({
    slug: c.path.replace(/\.mdx?$/, "").split("/") as string[],
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pathWithoutExt = slug.join("/");
  const post = await getResolvedPost(pathWithoutExt);
  return {
    title: `${post?.title || "포스트"} | 개발 블로그`,
    description: post?.description || "",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const pathWithoutExt = slug.join("/");
  const post = await getResolvedPost(pathWithoutExt);

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="section-container">
          <h1 className="text-text-primary mb-4 text-4xl font-bold">
            포스트를 찾을 수 없습니다
          </h1>
          <p className="text-text-secondary">
            <Link href="/blog" className="text-secondary-coral hover:underline">
              블로그로 돌아가기
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="section-container max-w-3xl">
        <article className="card bg-white/70 p-8 backdrop-blur-sm md:p-12">
          <header className="mb-8">
            <h1 className="text-text-primary mb-4 text-4xl font-bold md:text-5xl">
              {post.title}
            </h1>
            {(post.date || post.readingTime) && (
              <div className="text-text-secondary flex items-center gap-4">
                {post.date && <time>{post.date}</time>}
                {post.date && post.readingTime && <span>•</span>}
                {post.readingTime && <span>읽기 시간: 약 {post.readingTime}분</span>}
              </div>
            )}
          </header>

          <div className="prose prose-invert prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-secondary-coral hover:prose-a:text-secondary-peach prose-code:text-secondary-coral prose-code:bg-secondary-mint/20 prose-code:px-2 prose-code:py-1 prose-code:rounded max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>

          <footer className="border-secondary-peach/30 mt-12 border-t pt-8">
            <Link
              href="/blog"
              className="text-secondary-coral hover:text-secondary-peach font-medium transition-colors"
            >
              ← 블로그로 돌아가기
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}
