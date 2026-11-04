// Image pipeline (static export has no next/image optimisation). For every PNG/JPG in the folders below it writes
// <name>-800.(avif|webp) and <name>-1600.(avif|webp) next to the source. components/ui/Picture.tsx serves them with srcset/sizes.
// Usage: node scripts/images.mjs   (skips outputs that are newer than their source)
import sharp from "sharp";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIRS = ["public/blog", "public/photos"];
const WIDTHS = [800, 1600];
let n = 0, saved = 0;
for (const d of DIRS) {
  for (const f of readdirSync(join(ROOT, d))) {
    if (!/\.(png|jpe?g)$/i.test(f) || /-(800|1600)\./.test(f)) continue;
    const src = join(ROOT, d, f), base = join(ROOT, d, basename(f, extname(f)));
    const meta = await sharp(src).metadata();
    for (const w of WIDTHS) {
      const width = Math.min(w, meta.width ?? w);
      for (const [fmt, opt] of [["avif", { quality: 55 }], ["webp", { quality: 78 }]]) {
        const out = `${base}-${w}.${fmt}`;
        if (existsSync(out) && statSync(out).mtimeMs > statSync(src).mtimeMs) continue;
        const info = await sharp(src).resize({ width, withoutEnlargement: true })[fmt](opt).toFile(out);
        n++; if (w === 1600 && fmt === "avif") saved += statSync(src).size - info.size;
      }
    }
  }
}
console.log(`images: ${n} files written, ~${(saved / 1048576).toFixed(1)} MB smaller than the sources at 1600w AVIF`);
