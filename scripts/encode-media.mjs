// Media pipeline. Reads media-src/manifest.json and source clips in media-src/, writes to public/video/:
//   <name>.webm (AV1, SVT-AV1), <name>.mp4 (H.264 fallback), posters <name>.jpg / .webp / .avif
// No audio, 6 to 12 s, 720p for cards, 1080p max for hero. Grades remove blue casts (brand: never blue-tinted).
// Usage: node scripts/encode-media.mjs [name ...]   (no names = all). Requires ffmpeg with libsvtav1 + libx264.
// Large sources do not belong in git: media-src/ is gitignored except manifest.json and README.md.
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "media-src"), OUT = join(ROOT, "public/video");
const manifest = JSON.parse(readFileSync(join(SRC, "manifest.json"), "utf8"));
const only = process.argv.slice(2);
mkdirSync(OUT, { recursive: true });

// Grades. "warm": pull blue out of shadows and mids, add a little red/yellow. "neutral": desaturate cool hues only.
const GRADES = {
  none: "",
  neutral: "colorbalance=bs=-0.10:bm=-0.08:bh=-0.04,eq=saturation=0.85",
  // "cool-fix": for strongly teal/blue footage. Desaturates only cyan and blue hues, then warms.
  "cool-fix": "hue=s=0.28,colorbalance=rs=0.08:gs=0.01:bs=-0.10:rm=0.06:bm=-0.08:rh=0.03:bh=-0.04",
  warm: "colorbalance=rs=0.06:bs=-0.16:rm=0.05:gm=0.01:bm=-0.12:rh=0.03:bh=-0.06,eq=saturation=0.82:gamma=1.02",
};
// bg: decorative loops shown at ~20% opacity behind text, so small and soft is fine.
const SIZE = { card: 1280, hero: 1920, bg: 960 };
const run = (args) => execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });

for (const [name, m] of Object.entries(manifest.clips)) {
  if (only.length && !only.includes(name)) continue;
  const src = join(SRC, m.src);
  if (!existsSync(src)) { console.warn(`skip ${name}: ${m.src} not found in media-src/`); continue; }
  const w = SIZE[m.role ?? "card"];
  const dur = Math.min(12, Math.max(6, m.duration ?? 8));
  const vf = [m.grade && GRADES[m.grade], `scale=${w}:-2:flags=lanczos`, "fps=30", "format=yuv420p"].filter(Boolean).join(",");
  const cut = ["-ss", String(m.start ?? 0), "-t", String(dur), "-i", src, "-an", "-vf", vf];
  console.log(`${name}: ${m.src} -> ${w}px, ${dur}s, grade=${m.grade ?? "none"}`);
  run([...cut, "-c:v", "libsvtav1", "-preset", "6", "-crf", m.role === "hero" ? "34" : m.role === "bg" ? "50" : "38", "-g", "120", join(OUT, `${name}.webm`)]);
  run([...cut, "-c:v", "libx264", "-preset", "slow", "-crf", m.role === "hero" ? "24" : m.role === "bg" ? "33" : "27", "-profile:v", "high", "-movflags", "+faststart", join(OUT, `${name}.mp4`)]);
  const poster = ["-ss", String((m.start ?? 0) + (m.posterAt ?? 1)), "-i", src, "-frames:v", "1", "-vf", vf.replace("fps=30,", "")];
  run([...poster, "-q:v", "3", join(OUT, `${name}.jpg`)]);
  const jpg = join(OUT, `${name}.jpg`);
  await sharp(jpg).webp({ quality: 78 }).toFile(join(OUT, `${name}.webp`));
  await sharp(jpg).avif({ quality: 55 }).toFile(join(OUT, `${name}.avif`));
}
console.log("encode-media: done");
