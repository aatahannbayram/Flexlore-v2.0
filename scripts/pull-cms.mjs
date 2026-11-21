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
// - FAQ: GET {base}/cms/public/faq/?lang=en|tr into lib/cms-faq.en.json and lib/cms-faq.tr.json ({lang, items}). A file
//   is written only when the CMS answers in the language that was asked for, so an English fallback never overwrites the
//   Turkish file. Read by app/faq/page.tsx and app/tr/faq/page.tsx (lib/cms.ts); an empty file means the hard-coded list.
// - Legal: GET {base}/cms/public/legal/<slug>/?lang=en for every slug in components/legal/docs.ts into lib/cms-legal.json
//   ({slug: {title, body_html, updated_at}}). 404 means not published (the page keeps docs.ts); any other error keeps
//   the committed file. Same safe-by-default rules as the blog, per file.
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
const keep = (lang, why, label = lang === "tr" ? "lib/blog.tr.json" : "lib/blog.json") => {
  const msg = `cms:pull [${lang}]: ${why}; keeping the committed ${label}`;
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
if (!/^https?:\/\//.test(base)) { console.warn("cms:pull: CMS_API_URL must start with http(s)://; keeping the committed CMS files"); process.exit(strict ? 1 : 0); }

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

/* ---------- FAQ and legal pages ---------- */
const writeAtomic = (file, data) => { const tmp = `${file}.tmp`; writeFileSync(tmp, `${JSON.stringify(data, null, 1)}\n`); renameSync(tmp, file); };
async function getJson(url, onFail) {
  let res;
  try { res = await fetchWithTimeout(url, 10000, { headers: { Accept: "application/json" } }); } catch (e) { onFail(`CMS unreachable (${e.message})`); }
  if (res.status === 404) return null;
  if (!res.ok) onFail(`CMS answered ${res.status}`);
  try { return await res.json(); } catch { onFail("CMS answered something that is not JSON"); }
}

async function pullFaq(lang) {
  const rel = `lib/cms-faq.${lang}.json`, file = join(ROOT, rel);
  const fail = (why) => keep(`faq ${lang}`, why, rel);
  const payload = await getJson(`${base}/cms/public/faq/?lang=${encodeURIComponent(lang)}`, fail);
  if (!payload || !Array.isArray(payload.items)) fail("unexpected CMS response");
  if (payload.lang !== lang) fail(`CMS answered in "${payload.lang}" (no ${lang} FAQ yet)`);
  const items = [];
  for (const x of payload.items) {
    if (!x || typeof x.question !== "string" || !x.question.trim() || typeof x.answer_html !== "string" || !x.answer_html.trim()) {
      if (strict) { console.error(`cms:pull [faq ${lang}]: malformed item (${x?.id})`); process.exit(1); }
      console.warn(`cms:pull [faq ${lang}]: skipping a malformed item (${x?.id})`); continue;
    }
    items.push({ id: x.id, question: x.question.trim(), answer_html: x.answer_html, order: Number(x.order) || 0 });
  }
  items.sort((a, b) => a.order - b.order);
  if (!items.length && !allowEmpty) fail("CMS has no FAQ items (use --allow-empty to clear it)");
  const was = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")).items?.length ?? 0 : 0;
  writeAtomic(file, { lang, items });
  console.log(`cms:pull [faq ${lang}]: wrote ${items.length} items (was ${was})`);
}

async function pullLegal() {
  const rel = "lib/cms-legal.json", file = join(ROOT, rel);
  const fail = (why) => keep("legal", why, rel);
  /* The slugs the site has pages for, read from components/legal/docs.ts (this script cannot import TypeScript). */
  const slugs = [...readFileSync(join(ROOT, "components/legal/docs.ts"), "utf8").matchAll(/\bslug: "([a-z0-9-]+)"/g)].map((m) => m[1]);
  if (!slugs.length) fail("no slugs found in components/legal/docs.ts");
  const out = {};
  for (const slug of slugs) {
    const d = await getJson(`${base}/cms/public/legal/${slug}/?lang=en`, (why) => fail(`${slug}: ${why}`));
    if (!d) continue; // 404: not published, the page keeps docs.ts
    if (d.lang && d.lang !== "en") { console.warn(`cms:pull [legal]: ${slug} answered in "${d.lang}"; skipped`); continue; }
    if (typeof d.title !== "string" || !d.title.trim() || typeof d.body_html !== "string" || !d.body_html.trim()) {
      if (strict) { console.error(`cms:pull [legal]: malformed ${slug}`); process.exit(1); }
      console.warn(`cms:pull [legal]: skipping a malformed ${slug}`); continue;
    }
    out[slug] = { title: d.title.trim(), body_html: d.body_html, updated_at: d.updated_at || null };
  }
  if (!Object.keys(out).length && !allowEmpty) fail("CMS has no published legal pages (use --allow-empty to clear it)");
  const was = existsSync(file) ? Object.keys(JSON.parse(readFileSync(file, "utf8"))).length : 0;
  writeAtomic(file, out);
  console.log(`cms:pull [legal]: wrote ${Object.keys(out).join(", ") || "nothing"} (was ${was})`);
}

const jobs = [...LANGS.filter((l) => l === "en" || l === "tr").map((l) => () => pullFaq(l)), ...(LANGS.includes("en") ? [pullLegal] : [])];
for (const job of jobs) {
  try { await job(); } catch (e) { if (!(e instanceof Keep)) { if (strict) throw e; console.warn(`cms:pull: ${e.message}; keeping the committed file`); } }
}
