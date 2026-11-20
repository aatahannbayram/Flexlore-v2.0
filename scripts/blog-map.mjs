// Pairs English and Turkish blog posts (lib/blog.json <-> lib/blog.tr.json) into lib/blog-map.json, a small file that
// components/i18n/routes.ts can import on every page without pulling in the post bodies.
//
// A post is paired with its translation by an explicit `translation` slug (hand-edited posts) or, for posts from the
// CMS, by a shared `translationGroup`. Runs in prebuild and at the end of `npm run cms:pull`.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const read = (f) => { const p = join(ROOT, f); return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : []; };
const en = read("lib/blog.json");
const tr = read("lib/blog.tr.json");
const trSlugs = new Set(tr.map((p) => p.slug));
const enSlugs = new Set(en.map((p) => p.slug));
const trByGroup = new Map(tr.filter((p) => p.translationGroup).map((p) => [p.translationGroup, p.slug]));

const pairs = {};
const usedTr = new Set();
const add = (e, t) => { if (enSlugs.has(e) && trSlugs.has(t) && !pairs[e] && !usedTr.has(t)) { pairs[e] = t; usedTr.add(t); } };
for (const p of en) if (p.translation) add(p.slug, p.translation);
for (const p of tr) if (p.translation) add(p.translation, p.slug);
for (const p of en) if (p.translationGroup && trByGroup.has(p.translationGroup)) add(p.slug, trByGroup.get(p.translationGroup));

const out = { tr: tr.length, pairs };
const file = join(ROOT, "lib/blog-map.json");
const next = `${JSON.stringify(out, null, 1)}\n`;
if (!existsSync(file) || readFileSync(file, "utf8") !== next) writeFileSync(file, next);
console.log(`blog-map: ${en.length} EN, ${tr.length} TR, ${Object.keys(pairs).length} translated pairs`);
