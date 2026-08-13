import type { ReactElement, ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("provides a skip link to main content", () => {
    const layout = RootLayout({ children: <p>페이지 내용</p> });
    const body = layout.props.children as ReactElement<{ children: ReactNode }>;
    render(<>{body.props.children}</>);

    expect(
      screen.getByRole("link", { name: "본문으로 건너뛰기" }),
    ).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
  });

  it("matches global navigation to the home reading order", () => {
    const layout = RootLayout({ children: <p>페이지 내용</p> });
    const body = layout.props.children as ReactElement<{ children: ReactNode }>;
    render(<>{body.props.children}</>);

    const nav = screen.getByRole("navigation", { name: "주요 메뉴" });
    expect(within(nav).getAllByRole("link").map((link) => link.textContent)).toEqual([
      "프로젝트",
      "경력",
      "역량",
      "연락",
    ]);
    expect(within(nav).getByRole("link", { name: "연락" })).toHaveAttribute(
      "href",
      "/#contact",
    );
  });

  it("puts the target role first in share metadata", () => {
    expect(metadata.title).toMatchObject({
      default: "Frontend-focused Product Engineer | 이수정",
    });
    expect(metadata.openGraph).toMatchObject({
      title: "Frontend-focused Product Engineer | 이수정",
    });
  });
});
