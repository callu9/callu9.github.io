import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("presents recruiting information in the requested order", () => {
    const { container } = render(<Home />);
    const headings = Array.from(container.querySelectorAll("h1, h2")).map(
      (heading) => heading.textContent,
    );

    expect(headings).toEqual([
      "프론트엔드 중심 프로덕트 엔지니어",
      "핵심 역량",
      "경력",
      "대표 프로젝트",
      "함께 해결할 문제를 이야기해 주세요",
    ]);
    expect(screen.getAllByRole("link", { name: /면접 제안/ }).length).toBe(2);
  });

  it("presents the target role before the candidate name", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "프론트엔드 중심 프로덕트 엔지니어",
      }),
    ).toBeVisible();
    expect(screen.getByText("이수정")).not.toHaveRole("heading");
    expect(container.querySelector(".hero br")).not.toBeInTheDocument();
  });

  it("links exactly three public project case studies", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: /업무지원 운영 플랫폼/ })).toHaveAttribute(
      "href",
      "/projects/work-support-platform",
    );
    expect(screen.getByRole("link", { name: /통합 운영 대시보드/ })).toHaveAttribute(
      "href",
      "/projects/operations-dashboard",
    );
    expect(screen.getByRole("link", { name: /협업형 웹 제품/ })).toHaveAttribute(
      "href",
      "/projects/collaborative-web-product",
    );
  });
});
