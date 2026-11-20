// Pull published blog posts from the Flexlore CMS (admin.flexlore.com > İçerik > Blog) into lib/blog.json (English) and
// lib/blog.tr.json (Turkish).
//
// Opt-in, not part of the default build:  npm run cms:pull   (CMS_API_URL=https://... npm run cms:pull for another host)
//
// - Base URL: CMS_API_URL (CMS_PUBLIC_URL is still read as an older name), default https://test-api.flexlore.com.
// - Reads GET {base}/cms/public/posts/?lang=en and ?lang=tr (published posts only, already sanitized HTML). CMS_LANG=en
//   (or tr) limits the pull to one language.
// - Writes each file in the shape components/Blog.tsx expects (slug, title, h1, date, author, cover, coverAlt, card, body,
//   inline, links, cardDate, cardTitle) plus lang, translationGroup, description and publishedAt. Translations are then
//   paired by scripts/blog-map.mjs (lib/blog-map.json).
// - Covers stored on the photo CDN are downloaded to public/blog/cms/<slug>.jpg and their -800/-1600 AVIF/WebP
//   variants are written next to them (same settings as scripts/images.mjs), so components/ui/Picture.tsx can
//   serve them. Only these downloaded covers are processed; nothing else in public/ is touched.
// - Safe by default, per language: when the API is unreachable, answers an error, returns nothing, or every post is
//   malformed, that language's committed file stays as it is and a warning is printed; the command still exits 0.
//   Pass --strict to fail instead, --allow-empty to let an empty CMS clear a language.
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = new URL("..", import.meta.url).pathname;
const FILES = { en: join(ROOT, "lib/blog.json"), tr: join(ROOT, "lib/blog.tr.json") };
const COVER_DIR = join(ROOT, "public/blog/cms");
const strict = process.argv.includes("--strict");
const allowEmpty = process.argv.includes("--allow-empty");
const LANGS = process.env.CMS_LANG ? [process.env.CMS_LANG] : ["en", "tr"];
const DEFAULT_BASE = "https://test-api.flexlore.com";
const MAX_COVER_BYTES = 15 * 1024 * 1024;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

class Keep extends Error {}
const keep = (lang, why) => {
  const msg = `cms:pull [${lang}]: ${why}; keeping the committed ${lang === "tr" ? "lib/blog.tr.json" : "lib/blog.json"}`;
  if (strict) { console.error(msg); process.exit(1); }
  console.warn(msg);
  throw new Keep(msg);
};

async function fetchWithTimeout(url, ms, init = {}) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try { return await fetch(url, { ...init, signal: ctl.signal, redirect: "follow" }); } finally { clearTimeout(t); }
}

async function downloadCover(url, slug) {
  const res = await fetchWithTimeout(url, 15000);
  if (!res.ok) throw new Error(`cover ${res.status}`);
  const type = res.headers.get("content-type") || "";
  const ext = /png/.test(type) ? "png" : /jpe?g/.test(type) ? "jpg" : null;
  if (!ext) throw new Error(`cover type ${type}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_COVER_BYTES) throw new Error("cover too large");
  mkdirSync(COVER_DIR, { recursive: true });
  const file = join(COVER_DIR, `${slug}.${ext}`);
  writeFileSync(file, buf);
  await variants(file, join(COVER_DIR, slug));
  return `/blog/cms/${slug}.${ext}`;
}

// The same widths and qualities as scripts/images.mjs, for one downloaded cover.
async function variants(src, base) {
  const { default: sharp } = await import("sharp");
  const meta = await sharp(src).metadata();
  for (const w of [800, 1600]) {
    const width = Math.min(w, meta.width ?? w);
    for (const [fmt, opt] of [["avif", { quality: 55 }], ["webp", { quality: 78 }]]) {
      await sharp(src).resize({ width, withoutEnlargement: true })[fmt](opt).toFile(`${base}-${w}.${fmt}`);
    }
  }
}

const base = (process.env.CMS_API_URL || process.env.CMS_PUBLIC_URL || DEFAULT_BASE).replace(/\/$/, "");
if (!/^https?:\/\//.test(base)) { console.warn("cms:pull: CMS_API_URL must start with http(s)://; keeping the committed blog files"); process.exit(strict ? 1 : 0); }

async function pull(lang) {
  const file = FILES[lang];
  if (!file) keep(lang, "unknown language");
  let payload;
  try {
    const res = await fetchWithTimeout(`${base}/cms/public/posts/?lang=${encodeURIComponent(lang)}`, 10000, { headers: { Accept: "application/json" } });
    if (!res.ok) keep(lang, `CMS answered ${res.status}`);
    payload = await res.json();
  } catch (e) {
    if (e instanceof Keep) throw e;
    keep(lang, `CMS unreachable (${e.message})`);
  }
  const posts = Array.isArray(payload?.posts) ? payload.posts : null;
  if (!posts) keep(lang, "unexpected CMS response");
  if (!posts.length && !allowEmpty) keep(lang, "CMS has no published posts (use --allow-empty to clear it)");

  const committed = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
  const oldBySlug = new Map(committed.map((p) => [p.slug, p]));
  const seen = new Set();
  const out = [];
  for (const p of posts) {
    if (!p || !SLUG.test(p.slug || "") || seen.has(p.slug) || !p.title || typeof p.body !== "string") {
      if (strict) { console.error(`cms:pull [${lang}]: malformed post (${p?.slug})`); process.exit(1); }
      console.warn(`cms:pull [${lang}]: skipping a malformed post (${p?.slug})`);
      continue;
    }
    seen.add(p.slug);
    let cover = p.cover || "";
    if (/^https:\/\//.test(cover)) {
      try { cover = await downloadCover(cover, p.slug); } catch (e) {
        console.warn(`cms:pull [${lang}]: ${p.slug}: ${e.message}; using the previous cover if there is one`);
        cover = oldBySlug.get(p.slug)?.cover || "";
      }
    }
    if (!cover) console.warn(`cms:pull [${lang}]: ${p.slug} has no cover; the blog card needs one`);
    out.push({
      slug: p.slug, title: p.title, h1: p.h1 || p.title, date: p.date, author: p.author || "Flexlore",
      cover, coverAlt: p.coverAlt || "", card: cover, body: p.body,
      inline: Array.isArray(p.inline) ? p.inline : [], links: Array.isArray(p.links) ? p.links : [],
      cardDate: p.cardDate || p.date, cardTitle: p.cardTitle || p.title,
      lang, ...(p.translationGroup ? { translationGroup: p.translationGroup } : {}),
      ...(p.translation ? { translation: p.translation } : {}),
      ...(p.seoDescription || p.excerpt ? { description: p.seoDescription || p.excerpt } : {}),
      ...(p.publishedAt ? { publishedAt: p.publishedAt } : {}),
    });
  }
  if (!out.length && !allowEmpty) keep(lang, "no usable posts");
  /* Write to a temp file first, then rename: an interrupted run never leaves a half-written blog file. */
  const tmp = `${file}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(out, null, 1)}\n`);
  renameSync(tmp, file);
  console.log(`cms:pull [${lang}]: wrote ${out.length} posts (was ${committed.length})`);
}

console.log(`cms:pull: ${base}`);
for (const lang of LANGS) {
  try { await pull(lang); } catch (e) { if (!(e instanceof Keep)) { if (strict) throw e; console.warn(`cms:pull [${lang}]: ${e.message}; keeping the committed file`); } }
}
execFileSync(process.execPath, [join(ROOT, "scripts/blog-map.mjs")], { stdio: "inherit" });
