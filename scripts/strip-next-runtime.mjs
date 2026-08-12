import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "out");
// ponytail: static-only export; remove this step before adding client-side interaction.
const htmlFiles = (await readdir(outputDirectory, { recursive: true }))
  .filter((file) => file.endsWith(".html"))
  .map((file) => join(outputDirectory, file));

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const staticHtml = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(
      /<link\b(?=[^>]*\brel=["']preload["'])(?=[^>]*\bas=["']script["'])[^>]*>/gi,
      "",
    );

  if (/<script\b/i.test(staticHtml)) {
    throw new Error(`Next.js runtime remains in ${file}`);
  }

  if (staticHtml !== html) await writeFile(file, staticHtml);
}

console.log(`Removed the unused Next.js runtime from ${htmlFiles.length} static pages.`);
