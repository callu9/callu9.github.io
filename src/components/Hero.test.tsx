import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "@/components/Hero";

describe("Hero", () => {
  it("only exposes the available GitHub action", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: "GitHub 프로필" })).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "프로젝트 보기" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "이력서 다운로드" }),
    ).not.toBeInTheDocument();
  });
});
