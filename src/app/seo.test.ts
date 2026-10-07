import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("SEO route metadata", () => {
  it("publishes only the canonical home URL in the sitemap", () => {
    expect(sitemap().map(({ url }) => url)).toEqual([
      "https://callu9.github.io/",
    ]);
  });

  it("points crawlers to the published sitemap", () => {
    expect(robots().sitemap).toBe("https://callu9.github.io/sitemap.xml");
  });
});
