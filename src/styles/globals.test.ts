import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/styles/globals.css", "utf8");

describe("responsive typography CSS", () => {
  it("keeps Korean copy intact by default", () => {
    const bodyRule = css.match(/body\s*{[^}]*}/s)?.[0] ?? "";

    expect(bodyRule).toContain("word-break: keep-all");
    expect(bodyRule).not.toContain("overflow-wrap: anywhere");
  });

  it("removes odd-card borders after the strengths grid becomes one column", () => {
    expect(css).toMatch(
      /@media \(max-width: 40rem\)[\s\S]*?\.strength-item:nth-child\(odd\),[\s\S]*?border-right: 0/,
    );
  });
});
