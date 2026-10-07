import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";

const outputDirectory = join(process.cwd(), "out");
const helpVersion = createHash("sha256").update(await readFile(join(outputDirectory, "context-help.js"))).digest("hex").slice(0, 12);
// Keep the static export; only the mockup help needs browser JavaScript.
const htmlFiles = (await readdir(outputDirectory, { recursive: true }))
  .filter((file) => file.endsWith(".html"))
  .map((file) => join(outputDirectory, file));

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  let staticHtml = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(
      /<link\b(?=[^>]*\brel=["']preload["'])(?=[^>]*\bas=["']script["'])[^>]*>/gi,
      "",
    );

  if (/<script\b/i.test(staticHtml)) {
    throw new Error(`Next.js runtime remains in ${file}`);
  }

  if (staticHtml.includes('data-context-help=""')) {
    staticHtml = staticHtml.replace("</body>", `<script src="/context-help.js?v=${helpVersion}" defer></script></body>`);
  }
  if (staticHtml !== html) await writeFile(file, staticHtml);
}

console.log(`Removed the unused Next.js runtime from ${htmlFiles.length} static pages.`);
