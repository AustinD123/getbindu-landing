/**
 * Generates the blog flow-diagram thumbnails from scripts/blog-diagrams.data.mjs
 * into public/images/blog/<slug>.svg — the on-brand cobalt numbered-step
 * pipeline every post uses as its `image:` — and a 1200x630 PNG raster of the
 * same diagram into public/images/blog/og/<slug>.png for the Open Graph /
 * Twitter card (social scrapers do not render SVG). Both are committed.
 *
 *   node scripts/gen-blog-diagrams.mjs
 *
 * Style is fixed here so every diagram matches: off-white stage, white step
 * cards on a stone hairline, cobalt arrows + numbers, the final node a solid
 * cobalt "outcome". Edit the DATA file (words only), never the geometry here,
 * unless you are deliberately evolving the house style for ALL diagrams.
 * See the `blog-post` skill for the workflow.
 */
import { Buffer } from "node:buffer";
import { mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { DIAGRAMS } from "./blog-diagrams.data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "public", "images", "blog");
const OG_OUT = join(OUT, "og");
mkdirSync(OG_OUT, { recursive: true });

// Bindu marketing tokens (docs/DESIGN.md) — cobalt is the only chromatic color.
const INK = "#0c0a09";
const MUTED = "#777169";
const FAINT = "#a8a29e";
const HAIR = "#e7e5e4";
const BRAND = "#0033cc";
const BG = "#f6f5f3";

// Escapes for both text nodes and double-quoted attribute values (aria-label).
const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function diagram({ slug, eyebrow, heading, alt, nodes }) {
  const n = nodes.length;
  const margin = 64;
  const gap = 36;
  const usable = 1200 - margin * 2;
  const nodeW = Math.round((usable - gap * (n - 1)) / n);
  const nodeH = 172;
  const nodeY = 318;
  const midY = nodeY + nodeH / 2;
  const x = (i) => margin + i * (nodeW + gap);

  const parts = [];

  for (let i = 0; i < n - 1; i++) {
    const x1 = x(i) + nodeW + 8;
    const x2 = x(i + 1) - 8;
    parts.push(
      `<line x1="${x1}" y1="${midY}" x2="${x2 - 4}" y2="${midY}" stroke="${BRAND}" stroke-width="2.5" marker-end="url(#arw)"/>`
    );
  }

  nodes.forEach((label, i) => {
    const isLast = i === n - 1;
    const fill = isLast ? BRAND : "#ffffff";
    const stroke = isLast ? "none" : HAIR;
    const txt = isLast ? "#ffffff" : INK;
    const stepColor = isLast ? "rgba(255,255,255,0.85)" : BRAND;
    const cx = x(i) + nodeW / 2;
    const step = String(i + 1).padStart(2, "0");
    const lines = Array.isArray(label) ? label : [label];

    parts.push(
      `<rect x="${x(i)}" y="${nodeY}" width="${nodeW}" height="${nodeH}" rx="20" fill="${fill}"${
        stroke === "none" ? "" : ` stroke="${stroke}" stroke-width="2"`
      }/>`
    );
    parts.push(
      `<text x="${cx}" y="${nodeY + 44}" text-anchor="middle" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="17" font-weight="700" letter-spacing="1" fill="${stepColor}">${step}</text>`
    );
    const startY = lines.length === 1 ? midY + 22 : midY + 8;
    lines.forEach((ln, li) => {
      parts.push(
        `<text x="${cx}" y="${startY + li * 34}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="25" font-weight="500" fill="${txt}">${esc(ln)}</text>`
      );
    });
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-label="${esc(alt)}">
  <defs>
    <marker id="arw" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
      <path d="M1,1 L7,4.5 L1,8" fill="none" stroke="${BRAND}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <rect width="1200" height="675" fill="${BG}"/>
  <text x="64" y="108" font-family="Inter, system-ui, sans-serif" font-size="21" font-weight="600" letter-spacing="3" fill="${MUTED}">${esc(eyebrow)}</text>
  <text x="64" y="176" font-family="Georgia, 'Times New Roman', serif" font-size="48" fill="${INK}">${esc(heading)}</text>
  ${parts.join("\n  ")}
  <text x="1136" y="628" text-anchor="end" font-family="Inter, system-ui, sans-serif" font-size="18" fill="${FAINT}">getbindu.com</text>
</svg>
`;
  writeFileSync(join(OUT, `${slug}.svg`), svg);

  // OG card: the same drawing on a 1200x630 canvas. The 16:9 diagram's content
  // sits between y=64 and y=640, so a 630px window from y=22 keeps all of it.
  const ogSvg = svg.replace(
    'viewBox="0 0 1200 675"',
    'viewBox="0 22 1200 630" width="1200" height="630"'
  );
  // No density override: sharp then rasterises at the SVG's own declared
  // 1200x630. The explicit resize is a guard so the file can never drift from
  // the dimensions the page metadata promises.
  const png = await sharp(Buffer.from(ogSvg))
    .resize(1200, 630, { fit: "fill" })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  writeFileSync(join(OG_OUT, `${slug}.png`), png);
  console.log(`wrote ${slug}.svg + og/${slug}.png (${n} nodes)`);
}

for (const spec of DIAGRAMS) await diagram(spec);
console.log(`done — ${DIAGRAMS.length} diagram(s)`);
