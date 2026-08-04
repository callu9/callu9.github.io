import { describe, expect, it } from "vitest";
import { resolveBlogPost } from "@/lib/blogPosts";

describe("resolveBlogPost", () => {
  it("uses configured metadata when Markdown has no frontmatter", () => {
    const post = resolveBlogPost(
      { path: "topic/post", frontmatter: {}, html: "<p>Body</p>" },
      {
        path: "topic/post",
        title: "Configured title",
        description: "Configured description",
        category: "React",
      },
    );

    expect(post).toMatchObject({
      title: "Configured title",
      description: "Configured description",
    });
    expect(post.date).toBeUndefined();
    expect(post.readingTime).toBeUndefined();
  });

  it("prefers non-empty Markdown frontmatter", () => {
    const post = resolveBlogPost(
      {
        path: "topic/post",
        frontmatter: {
          title: "Markdown title",
          description: "Markdown description",
          date: "2026-08-05",
        },
        html: "<p>Body</p>",
      },
      {
        path: "topic/post",
        title: "Configured title",
        description: "Configured description",
        category: "React",
      },
    );

    expect(post).toMatchObject({
      title: "Markdown title",
      description: "Markdown description",
      date: "2026-08-05",
    });
    expect(post.readingTime).toBeUndefined();
  });

  it("keeps unconfigured GitHub posts readable", () => {
    const post = resolveBlogPost(
      {
        path: "topic/unconfigured-post",
        frontmatter: { title: "GitHub title" },
        html: "<p>Body</p>",
      },
      undefined,
    );

    expect(post).toMatchObject({
      title: "GitHub title",
      category: "개발",
      featured: false,
    });
  });

  it("uses the rendered Markdown heading when no title metadata exists", () => {
    const post = resolveBlogPost(
      {
        path: "topic/unconfigured-post",
        frontmatter: {},
        html: "<h1>Readable Markdown heading</h1><p>Body</p>",
      },
      undefined,
    );

    expect(post.title).toBe("Readable Markdown heading");
  });
});
