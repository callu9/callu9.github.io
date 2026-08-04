import type { ReactElement, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RootLayout from "@/app/layout";

describe("RootLayout", () => {
  it("provides a skip link to main content", () => {
    const layout = RootLayout({ children: <p>페이지 내용</p> });
    const body = layout.props.children as ReactElement<{ children: ReactNode }>;
    render(<>{body.props.children}</>);

    expect(
      screen.getByRole("link", { name: "본문으로 건너뛰기" }),
    ).toHaveAttribute("href", "#main-content");
  });
});
