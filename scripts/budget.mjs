// Performance budget (runs as postbuild). Home route JS (gzip, excluding video) must stay under 180 kB,
// and hero media requested before first interaction under 1.5 MB.
import { readFileSync, statSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;
const JS_BUDGET = 180 * 1024, HERO_BUDGET = 1.5 * 1024 * 1024;
const html = readFileSync(join(OUT, "index.html"), "utf8");

// noModule scripts (Next polyfills) are skipped by every modern browser, so they do not count.
const scripts = [...new Set([...html.matchAll(/<script([^>]*)src="([^"]+\.js)"([^>]*)>/g)].filter((m) => !/noModule/i.test(m[1] + m[3])).map((m) => m[2]))];
let js = 0;
for (const s of scripts) { const p = join(OUT, s.replace(/^\//, "")); if (existsSync(p)) js += gzipSync(readFileSync(p)).length; }

// Hero media requested before first interaction: every image in the hero section (largest srcset entry) plus the
// largest file of its background loop (desktop only, starts after load, but counted to stay honest).
const hero = new Set();
const sec = html.slice(html.indexOf('aria-labelledby="hero-h"'), html.indexOf("</section>", html.indexOf('aria-labelledby="hero-h"')));
for (const m of sec.matchAll(/(?:src|srcSet|srcset)="([^"]+)"/g)) m[1].split(",").map((x) => x.trim().split(" ")[0]).forEach((u) => /\.(avif|webp|jpg|png|svg)$/.test(u) && hero.add(u));
let media = 0; for (const h of hero) { const p = join(OUT, decodeURI(h).replace(/^\//, "")); if (existsSync(p)) media += statSync(p).size; }
const loops = ["kitchen-bg.webm", "kitchen-bg.mp4"].map((f) => join(OUT, "video", f)).filter(existsSync).map((p) => statSync(p).size);
if (loops.length) media += Math.max(...loops);

const kb = (n) => (n / 1024).toFixed(1) + " kB";
console.log(`budget: home JS ${kb(js)} gzip across ${scripts.length} scripts (budget ${kb(JS_BUDGET)})`);
console.log(`budget: hero media ${kb(media)} (${hero.size} files, budget ${kb(HERO_BUDGET)})`);
const fail = js > JS_BUDGET || media > HERO_BUDGET;
// Strict by default: an over-budget build fails. BUDGET_STRICT=0 turns it into a warning for local experiments.
const strict = process.env.BUDGET_STRICT !== "0";
if (fail) { console.error(`budget: OVER BUDGET${strict ? "" : " (warning only, BUDGET_STRICT=0)"}`); if (strict) process.exit(1); }
else console.log("budget: OK");
