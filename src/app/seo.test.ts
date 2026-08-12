import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("SEO route metadata", () => {
  it("publishes only the home and approved project URLs in the sitemap", () => {
    expect(sitemap().map(({ url }) => url)).toEqual([
      "https://callu9.github.io/",
      "https://callu9.github.io/projects/work-support-platform/",
      "https://callu9.github.io/projects/operations-dashboard/",
      "https://callu9.github.io/projects/collaborative-web-product/",
    ]);
  });

  it("points crawlers to the published sitemap", () => {
    expect(robots().sitemap).toBe("https://callu9.github.io/sitemap.xml");
  });
});
