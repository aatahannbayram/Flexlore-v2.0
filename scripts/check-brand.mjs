// Brand guard (runs as prebuild). Fails on: blue Tailwind classes, blue-hued colour values, em dashes in copy,
// and font families other than Schibsted Grotesk. Brand source: Flexlore Hyper design system ("Never use blue").
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIRS = ["app", "components", "lib", "public/brand"];
const EXT = new Set([".ts", ".tsx", ".css", ".json", ".svg", ".mjs"]);
const SKIP = [/node_modules/, /\.next/, /^out\//];

const files = [];
const walk = (d) => { for (const n of readdirSync(d)) { const p = join(d, n); const r = relative(ROOT, p); if (SKIP.some((s) => s.test(r))) continue;
  statSync(p).isDirectory() ? walk(p) : EXT.has(extname(n)) && files.push(p); } };
DIRS.forEach((d) => { try { walk(join(ROOT, d)); } catch {} });

const errors = [];
const add = (f, line, msg) => errors.push(`${relative(ROOT, f)}:${line}  ${msg}`);

const TW_BLUE = /\b(?:bg|text|border|ring|ring-offset|from|via|to|fill|stroke|outline|shadow|decoration|accent|caret|divide|placeholder)-(?:blue|sky|indigo|cyan|slate)-\d{2,3}\b/;
const HEX = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
const RGB = /rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/g;
const FONT = /font-family\s*:\s*([^;}"]+)/g;

function hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360;
  return { h, s, l };
}
// Blue range: hue 190 to 260 deg with real saturation. Purple support colour (#B4A7E5 etc., hue ~252) is allowed by the
// design system for info states only, so the brand's own purple tokens are whitelisted by value.
const ALLOWED = new Set(["b4a7e5", "cac1ed", "7d68d2", "584993", "f2f0fb"]);
const isBlue = (r, g, b, raw) => { if (ALLOWED.has(raw)) return false; const { h, s, l } = hsl(r, g, b); return h >= 190 && h <= 260 && s > 0.15 && l > 0.06 && l < 0.97; };

for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  const isCopy = !f.endsWith(".svg") && !f.endsWith(".mjs");
  lines.forEach((ln, i) => {
    const n = i + 1;
    if (TW_BLUE.test(ln)) add(f, n, `blue Tailwind class: ${ln.match(TW_BLUE)[0]}`);
    for (const m of ln.matchAll(HEX)) { let h = m[1].toLowerCase(); if (h.length === 3) h = [...h].map((c) => c + c).join("");
      const [r, g, b] = [0, 2, 4].map((k) => parseInt(h.slice(k, k + 2), 16)); if (isBlue(r, g, b, h)) add(f, n, `blue colour #${h}`); }
    for (const m of ln.matchAll(RGB)) { const [r, g, b] = [m[1], m[2], m[3]].map(Number); if (isBlue(r, g, b, "")) add(f, n, `blue colour ${m[0]}`); }
    if (isCopy && ln.includes("—")) add(f, n, "em dash in copy");
    for (const m of ln.matchAll(FONT)) if (!/schibsted|var\(--font|inherit/i.test(m[1])) add(f, n, `font other than Schibsted Grotesk: ${m[1].trim()}`);
  });
}

if (errors.length) { console.error(`check-brand: ${errors.length} problem(s)\n` + errors.join("\n")); process.exit(1); }
console.log(`check-brand: OK (${files.length} files, no blue, no em dash, one font)`);
