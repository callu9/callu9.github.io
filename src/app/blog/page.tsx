import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsFromGitHub } from "@/lib/githubPosts";
import { getBlogConfig, getVisibleBlogs } from "@/data/blogs";
import { createFallbackBlogPost, resolveBlogPost } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "개발 블로그 | 포트폴리오",
  description: "개발하면서 배운 것들과 인사이트를 공유합니다.",
  alternates: {
    canonical: "/blog/",
  },
};

export default async function BlogPage() {
  const posts = await getAllPostsFromGitHub();

  const postsWithConfig = (posts.length > 0
    ? posts
    .map((post) => {
      const pathWithoutExt = post.path.replace(/\.mdx?$/, "");
      const config = getBlogConfig(pathWithoutExt);
      return config ? resolveBlogPost(post, config) : null;
    })
    .filter((item) => item !== null)
    : getVisibleBlogs().map(createFallbackBlogPost))
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="section-container">
        <div className="mb-16">
          <h1 className="text-text-primary mb-4 text-5xl font-bold">
            개발 블로그
          </h1>
          <p className="text-text-secondary max-w-2xl text-lg">
            개발하면서 배운 것들과 인사이트를 공유합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {postsWithConfig.map((item) => (
            <article
              key={item.path}
              className={`card overflow-hidden backdrop-blur-sm transition-all hover:shadow-lg ${
                item.featured
                  ? "border-secondary-coral/30 to-secondary-mint/20 border-2 bg-gradient-to-br from-white/80"
                  : "bg-white/60"
              }`}
            >
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="bg-secondary-peach/50 text-text-primary inline-block rounded-full px-3 py-1 text-xs font-semibold">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="text-secondary-coral text-xs font-bold">
                      ★ 추천
                    </span>
                  )}
                </div>

                <h2 className="text-text-primary hover:text-secondary-coral mb-3 text-xl font-bold transition-colors">
                  <Link href={`/blog/${item.path.replace(/\.mdx?$/, "")}`}>
                    {item.title}
                  </Link>
                </h2>

                <p className="text-text-secondary mb-4 text-sm">
                  {item.description}
                </p>

                {(item.date || item.readingTime) && (
                  <div className="text-text-light border-secondary-peach/20 flex items-center justify-between border-t pt-4 text-xs">
                    <span>{item.date}</span>
                    <span>{item.readingTime && `${item.readingTime}분 읽기`}</span>
                  </div>
                )}
              </div>

              <Link
                href={`/blog/${item.path.replace(/\.mdx?$/, "")}`}
                className="bg-secondary-coral hover:bg-secondary-peach block px-6 py-3 text-center font-medium text-white transition-colors"
              >
                읽기 →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
