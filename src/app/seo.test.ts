import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("SEO route metadata", () => {
  it("publishes the home and blog URLs in the sitemap", () => {
    expect(sitemap()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: "https://callu9.github.io/" }),
        expect.objectContaining({ url: "https://callu9.github.io/blog/" }),
      ]),
    );
  });

  it("points crawlers to the published sitemap", () => {
    expect(robots().sitemap).toBe("https://callu9.github.io/sitemap.xml");
  });
});
