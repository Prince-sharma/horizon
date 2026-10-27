// Wraps each page fragment into a standalone document for static hosting.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));

const PAGES = [
  { src: "horizon.body.html", out: "index.html",
    description: "Horizon — build, deploy and govern AI agents your IT team can sign off on.",
    scheme: "light" },
  { src: "mal.body.html", out: "mal/index.html",
    description: "A design concept for Mal's Agents tab: specialist rooms that can move money under a written mandate.",
    scheme: "dark" },
];

for (const page of PAGES) {
  const src = readFileSync(join(dir, page.src), "utf8");
  const cut = src.indexOf("</style>");
  if (cut === -1) throw new Error(`no </style> in ${page.src}`);
  const head = src.slice(0, cut + "</style>".length).replace(/^<meta name="claude:[^>]*>\n/m, "");
  const body = src.slice(cut + "</style>".length);

  const out = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="${page.description}">
<style>
  :root { color-scheme: ${page.scheme}; padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }
  body { margin: 0; font: 14px system-ui, -apple-system, "Segoe UI", sans-serif; }
  img { max-width: 100%; }
  [hidden] { display: none !important; }
</style>
${head}
</head>
<body>
${body}
</body>
</html>
`;
  const target = join(dir, page.out);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, out);
  console.log(`wrote ${page.out} (${out.length} bytes)`);
}
