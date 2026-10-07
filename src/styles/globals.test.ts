import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/styles/globals.css", "utf8");

describe("responsive typography CSS", () => {
  it("keeps Korean copy intact by default", () => {
    const bodyRule = css.match(/body\s*{[\s\S]*?}/)?.[0] ?? "";

    expect(bodyRule).toContain("word-break: keep-all");
    expect(bodyRule).not.toContain("overflow-wrap: anywhere");
  });

});
