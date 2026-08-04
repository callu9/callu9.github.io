import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/githubPosts", () => ({
  getAllPostsFromGitHub: vi.fn(async () => [
    {
      slug: "unconfigured/post",
      path: "unconfigured/post.md",
      frontmatter: { title: "설정 없는 글" },
      html: "<p>본문</p>",
      raw: "# 설정 없는 글",
    },
  ]),
}));

import BlogPage from "./page";

describe("BlogPage", () => {
  it("shows GitHub posts that have no local blog configuration", async () => {
    render(await BlogPage());

    expect(screen.getByRole("link", { name: "설정 없는 글" })).toBeVisible();
  });
});
