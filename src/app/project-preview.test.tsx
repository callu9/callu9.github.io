import { existsSync, readFileSync } from "node:fs";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ProjectPreview from "./project-preview";

function renderHelp() {
  const view = render(<ProjectPreview slug="frontend-contract-handoff" />);
  if (existsSync("public/context-help.js")) {
    new Function(readFileSync("public/context-help.js", "utf8"))();
  }
  return view;
}

describe("mockup contextual help", () => {
  it("highlights the first target immediately when help opens and reopens", () => {
    const { container } = renderHelp();
    const trigger = screen.getByRole("button", { name: "도움말" });
    const input = container.querySelector('[data-help-id="review-input"]')!;
    fireEvent.click(trigger);
    expect(input).toHaveClass("help-target-active");
    fireEvent.click(trigger);
    expect(input).not.toHaveClass("help-target-active");
    fireEvent.click(trigger);
    expect(input).toHaveClass("help-target-active");
    fireEvent.click(trigger);
  });

  it("previews targets, toggles selection, and clears it on close with trigger focus restored", async () => {
    const user = userEvent.setup();
    const { container } = renderHelp();
    const trigger = screen.getByRole("button", { name: "도움말" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("complementary")).toBeNull();
    await user.click(trigger);
    const panel = screen.getByRole("complementary", { name: "검수 화면 도움말" });
    expect(panel).toHaveTextContent("완료 조건");
    const input = container.querySelector('[data-help-id="review-input"]')!;
    const response = container.querySelector('[data-help-id="review-response"]')!;
    const inputHelp = screen.getByRole("button", { name: /입력 조건 확인/ });
    const responseHelp = screen.getByRole("button", { name: /응답과 오류 확인/ });
    await user.hover(inputHelp);
    expect(input).toHaveClass("help-target-active");
    await user.click(inputHelp);
    await user.unhover(inputHelp);
    expect(inputHelp).toHaveAttribute("aria-pressed", "true");
    await user.hover(responseHelp);
    expect(response).toHaveClass("help-target-active");
    expect(input).not.toHaveClass("help-target-active");
    await user.unhover(responseHelp);
    expect(input).toHaveClass("help-target-active");
    await user.click(inputHelp);
    expect(inputHelp).toHaveAttribute("aria-pressed", "false");
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(container.querySelector(".help-target-active")).toBeNull();
    await user.click(trigger);
    expect(inputHelp).toHaveAttribute("aria-pressed", "false");
    await user.click(screen.getByRole("button", { name: "도움말 닫기" }));
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole("complementary")).toBeNull();
  });

  it.each([false, true])("scrolls off-screen targets respecting reduced motion (%s)", (reduced) => {
    const { container } = renderHelp();
    const trigger = screen.getByRole("button", { name: "도움말" });
    fireEvent.click(trigger);
    const target = container.querySelector('[data-help-id="review-input"]')!;
    const scroll = vi.fn();
    target.scrollIntoView = scroll;
    vi.spyOn(target, "getBoundingClientRect").mockReturnValue({ top: -100, bottom: -20, left: 0, right: 100 } as DOMRect);
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: reduced })));
    fireEvent.click(screen.getByRole("button", { name: /입력 조건 확인/ }));
    expect(scroll).toHaveBeenCalledWith({ behavior: reduced ? "auto" : "smooth", block: "center" });
    fireEvent.click(trigger);
    vi.unstubAllGlobals();
  });
});
