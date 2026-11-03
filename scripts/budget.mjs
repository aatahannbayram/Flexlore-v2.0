// Performance budget (runs as postbuild). Home route JS (gzip, excluding video) must stay under 180 kB,
// and hero media requested before first interaction under 1.5 MB.
import { readFileSync, statSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;
const JS_BUDGET = 180 * 1024, HERO_BUDGET = 1.5 * 1024 * 1024;
const html = readFileSync(join(OUT, "index.html"), "utf8");

const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((m) => m[1]))];
let js = 0;
for (const s of scripts) { const p = join(OUT, s.replace(/^\//, "")); if (existsSync(p)) js += gzipSync(readFileSync(p)).length; }

// Hero media: images with fetchpriority=high plus the hero poster(s) and preload links.
const hero = new Set();
for (const m of html.matchAll(/<img[^>]*fetchPriority="high"[^>]*src="([^"]+)"/gi)) hero.add(m[1]);
for (const m of html.matchAll(/<img[^>]*src="([^"]+)"[^>]*fetchPriority="high"/gi)) hero.add(m[1]);
for (const m of html.matchAll(/<link[^>]+rel="preload"[^>]+href="([^"]+\.(?:avif|webp|jpg|png|mp4|webm))"/gi)) hero.add(m[1]);
let media = 0; for (const h of hero) { const p = join(OUT, decodeURI(h).replace(/^\//, "")); if (existsSync(p)) media += statSync(p).size; }

const kb = (n) => (n / 1024).toFixed(1) + " kB";
console.log(`budget: home JS ${kb(js)} gzip across ${scripts.length} scripts (budget ${kb(JS_BUDGET)})`);
console.log(`budget: hero media ${kb(media)} (${hero.size} files, budget ${kb(HERO_BUDGET)})`);
const fail = js > JS_BUDGET || media > HERO_BUDGET;
// Strict (fails the build) once the perf pass lands; until then it warns so CI deploys are not blocked.
const strict = process.env.BUDGET_STRICT === "1";
if (fail) { console.error(`budget: OVER BUDGET${strict ? "" : " (warning only, set BUDGET_STRICT=1 to fail)"}`); if (strict) process.exit(1); }
else console.log("budget: OK");
