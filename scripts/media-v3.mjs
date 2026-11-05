// v3 photo set. Originals live in media-src/v3/ (gitignored, master copies on Drive); names and crops in
// components/v3/media.json. For each photo it writes to public/media/v3/:
//   <name>-800 / -1600 .avif .webp (landscape, no upscaling) and <name>-1600.jpg (fallback)
//   <name>-m .avif .webp: a 4:5 portrait crop for phones, centred on `fx` (0..1 across the frame)
// Also writes web-toplanti-mask.png: white where the two wall screens show, so the live panel can be laid on them
// without covering the people in front. Usage: node scripts/media-v3.mjs
import sharp from "sharp";
import { readFileSync, existsSync, statSync } from "node:fs";
const ROOT = new URL("..", import.meta.url).pathname;
const M = JSON.parse(readFileSync(`${ROOT}components/v3/media.json`, "utf8"));
const OUT = `${ROOT}public/media/v3`;
const fresh = (src, out) => existsSync(out) && statSync(out).mtimeMs > statSync(src).mtimeMs;
for (const [name, m] of Object.entries(M)) {
  const src = `${ROOT}media-src/v3/${m.src}`; const { width: W, height: H } = await sharp(src).metadata();
  for (const w of [800, 1600]) for (const [fmt, opt] of [["avif", { quality: 52 }], ["webp", { quality: 78 }], ...(w === 1600 ? [["jpeg", { quality: 80, mozjpeg: true }]] : [])]) {
    const out = `${OUT}/${name}-${w}.${fmt === "jpeg" ? "jpg" : fmt}`; if (fresh(src, out)) continue;
    await sharp(src).resize({ width: Math.min(w, W) })[fmt](opt).toFile(out);
  }
  const cw = Math.round(H * 0.8), left = Math.max(0, Math.min(W - cw, Math.round(W * m.fx - cw / 2)));
  for (const [fmt, opt] of [["avif", { quality: 55 }], ["webp", { quality: 80 }]]) {
    const out = `${OUT}/${name}-m.${fmt}`; if (fresh(src, out)) continue;
    await sharp(src).extract({ left, top: 0, width: cw, height: H })[fmt](opt).toFile(out);
  }
  console.log(name, `${W}x${H}`, `mobile crop ${cw}x${H} at x=${left}`);
}
// Screen mask for web-toplanti: pixels inside each screen quad that are screen-white (bright, unsaturated).
{
  const src = `${ROOT}media-src/v3/${M["web-toplanti"].src}`;
  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info; const mask = Buffer.alloc(W * H);
  const quads = M["web-toplanti"].screens;
  const inside = (q, x, y) => { let s = 0; for (let i = 0; i < 4; i++) { const [ax, ay] = q[i], [bx, by] = q[(i + 1) % 4]; const c = (bx - ax) * (y - ay) - (by - ay) * (x - ax); if (c !== 0) { if (s === 0) s = Math.sign(c); else if (Math.sign(c) !== s) return false; } } return true; };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!quads.some((q) => inside(q, x, y))) continue;
    const i = (y * W + x) * C, r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = (r + g + b) / 3, sat = Math.max(r, g, b) - Math.min(r, g, b);
    mask[y * W + x] = lum > 175 && sat < 34 ? 255 : 0;
  }
  await sharp(mask, { raw: { width: W, height: H, channels: 1 } }).median(3).blur(0.6).png({ compressionLevel: 9 }).toFile(`${OUT}/web-toplanti-mask.png`);
  console.log("web-toplanti-mask.png");
}
