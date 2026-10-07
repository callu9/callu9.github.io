import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectPage, { generateMetadata, generateStaticParams } from "./page";

const slugs = ["recruitment-pipeline-board", "work-support-platform", "frontend-contract-handoff"];

describe("legacy project URLs", () => {
  it("preserves all three existing routes", () => {
    expect(generateStaticParams().map(({ slug }) => slug).sort()).toEqual([...slugs].sort());
  });

  it.each(slugs)("forwards %s to its home anchor without JavaScript", async (slug) => {
    const params = Promise.resolve({ slug });
    render(await ProjectPage({ params }));
    expect(document.querySelector('meta[http-equiv="refresh"]')).toHaveAttribute("content", `0;url=/#${slug}`);
    expect(screen.getByRole("link", { name: /프로젝트 보기/ })).toHaveAttribute("href", `/#${slug}`);
    expect(await generateMetadata({ params })).toMatchObject({
      alternates: { canonical: "/" },
      robots: { index: false, follow: true },
    });
  });
});
