import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectPage, { generateStaticParams } from "./page";

const slugs = [
  "work-support-platform",
  "operations-dashboard",
  "collaborative-web-product",
];

describe("ProjectPage", () => {
  it("exports only the three approved public project paths", () => {
    expect(generateStaticParams()).toEqual(slugs.map((slug) => ({ slug })));
  });

  it.each(slugs)("renders the complete public case-study structure for %s", async (slug) => {
    render(await ProjectPage({ params: Promise.resolve({ slug }) }));

    for (const heading of [
      "프로젝트 개요",
      "문제와 제약",
      "역할과 기여 범위",
      "핵심 결정과 선택 이유",
      "공개용 UI·흐름",
      "검증 가능한 결과",
      "일반화하거나 생략한 범위",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeVisible();
    }
    expect(screen.getByRole("link", { name: "프로젝트 목록으로" })).toHaveAttribute(
      "href",
      "/#projects",
    );
    expect(screen.getByRole("link", { name: "면접 제안 보내기" })).toHaveAttribute(
      "href",
      "mailto:callu_9ine@naver.com?subject=포트폴리오를 보고 연락드립니다",
    );
  });

  it.each(slugs)("surfaces case facts and an early return path for %s", async (slug) => {
    render(await ProjectPage({ params: Promise.resolve({ slug }) }));

    expect(screen.getByRole("link", { name: /대표 프로젝트/ })).toHaveAttribute(
      "href",
      "/#projects",
    );
    expect(
      Array.from(document.querySelectorAll(".case-facts dt")).map(
        (fact) => fact.textContent,
      ),
    ).toEqual(["기간", "역할", "핵심 문제", "검증 결과"]);

    const headings = Array.from(document.querySelectorAll("h1, h2")).map(
      (heading) => heading.textContent,
    );
    expect(headings.slice(1)).toEqual([
      "프로젝트 개요",
      "문제와 제약",
      "역할과 기여 범위",
      "검증 가능한 결과",
      "핵심 결정과 선택 이유",
      "공개용 UI·흐름",
      "일반화하거나 생략한 범위",
      "더 자세한 판단 과정이 궁금하신가요?",
    ]);
  });
});
