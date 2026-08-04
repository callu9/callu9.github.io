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
});
