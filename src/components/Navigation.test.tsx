import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Navigation from "@/components/Navigation";

describe("Navigation", () => {
  it("opens the mobile navigation links", async () => {
    const user = userEvent.setup();
    render(<Navigation />);

    const button = screen.getByRole("button", { name: "메뉴 열기" });
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("link", { name: "경력" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "리뷰" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "블로그" }).length).toBeGreaterThan(0);
  });
});
