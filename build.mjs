// Wraps the page fragment (horizon.body.html) into a standalone document for static hosting.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(dir, "horizon.body.html"), "utf8");

const cut = src.indexOf("</style>");
if (cut === -1) throw new Error("no </style> found — cannot split head from body");
const head = src.slice(0, cut + "</style>".length)
  .replace(/^<meta name="claude:[^>]*>\n/m, "");
const body = src.slice(cut + "</style>".length);

const out = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Horizon — build, deploy and govern AI agents your IT team can sign off on.">
<style>
  :root { color-scheme: light; padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }
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
writeFileSync(join(dir, "index.html"), out);
console.log("wrote index.html (" + out.length + " bytes)");
