import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectPage, { generateStaticParams } from "./page";

const slugs = [
  "frontend-contract-handoff",
  "work-support-platform",
  "recruitment-pipeline-board",
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

  it("bounds the contract handoff to frontend and verified API artifacts", async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: "frontend-contract-handoff" }) }));

    const role = within(screen.getByRole("region", { name: "역할과 기여 범위" }));
    expect(role.getByText(/MSW 응답으로 프론트엔드 검수 흐름/)).toBeVisible();
    expect(role.getByText(/OpenAPI JSON.*TypeScript 타입/)).toBeVisible();
    expect(screen.getByText(/실제 백엔드 연동.*운영 성과는 포함하지/)).toBeVisible();
  });

  it("shows the public board's server-state and rollback decisions", async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: "recruitment-pipeline-board" }) }));

    expect(screen.getByText(/TanStack Query.*서버 상태의 기준/)).toBeVisible();
    expect(screen.getByText(/낙관적 갱신.*롤백/)).toBeVisible();
    expect(screen.getByText(/실제 채용 운영.*포함하지/)).toBeVisible();
  });
});
