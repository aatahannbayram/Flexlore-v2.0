// Pull published blog posts from the Flexlore CMS (admin.flexlore.com > İçerik > Blog) into lib/blog.json.
//
// Opt-in, not part of the default build yet:  CMS_PUBLIC_URL=https://test-api.flexlore.com npm run cms:pull
//
// - Reads GET {CMS_PUBLIC_URL}/cms/public/posts/?lang=en (published posts only, already sanitized HTML).
// - Writes lib/blog.json in the exact shape components/Blog.tsx expects (slug, title, h1, date, author, cover,
//   coverAlt, card, body, inline, links, cardDate, cardTitle).
// - Covers stored on the photo CDN are downloaded to public/blog/cms/<slug>.jpg and their -800/-1600 AVIF/WebP
//   variants are written next to them (same settings as scripts/images.mjs), so components/ui/Picture.tsx can
//   serve them. Only these downloaded covers are processed; nothing else in public/ is touched.
// - Safe by default: when CMS_PUBLIC_URL is unset, the API is unreachable, returns nothing, or a post is
//   malformed, the committed lib/blog.json stays as it is. Pass --strict to fail the build instead.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const BLOG_JSON = join(ROOT, "lib/blog.json");
const COVER_DIR = join(ROOT, "public/blog/cms");
const strict = process.argv.includes("--strict");
const allowEmpty = process.argv.includes("--allow-empty");
const LANG = process.env.CMS_LANG || "en";
const MAX_COVER_BYTES = 15 * 1024 * 1024;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const keep = (why) => {
  const msg = `cms:pull: ${why}; keeping the committed lib/blog.json`;
  if (strict) { console.error(msg); process.exit(1); }
  console.warn(msg);
  process.exit(0);
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

const base = (process.env.CMS_PUBLIC_URL || "").replace(/\/$/, "");
if (!base) keep("CMS_PUBLIC_URL is not set");
if (!/^https?:\/\//.test(base)) keep("CMS_PUBLIC_URL must start with http(s)://");

let payload;
try {
  const res = await fetchWithTimeout(`${base}/cms/public/posts/?lang=${encodeURIComponent(LANG)}`, 10000, { headers: { Accept: "application/json" } });
  if (!res.ok) keep(`CMS answered ${res.status}`);
  payload = await res.json();
} catch (e) {
  keep(`CMS unreachable (${e.message})`);
}
const posts = Array.isArray(payload?.posts) ? payload.posts : null;
if (!posts) keep("unexpected CMS response");
if (!posts.length && !allowEmpty) keep("CMS has no published posts (use --allow-empty to clear the blog)");

const committed = existsSync(BLOG_JSON) ? JSON.parse(readFileSync(BLOG_JSON, "utf8")) : [];
const oldBySlug = new Map(committed.map((p) => [p.slug, p]));
const seen = new Set();
const out = [];
for (const p of posts) {
  if (!p || !SLUG.test(p.slug || "") || seen.has(p.slug) || !p.title || typeof p.body !== "string") {
    if (strict) { console.error(`cms:pull: skipping a malformed post (${p?.slug})`); process.exit(1); }
    console.warn(`cms:pull: skipping a malformed post (${p?.slug})`);
    continue;
  }
  seen.add(p.slug);
  let cover = p.cover || "";
  if (/^https:\/\//.test(cover)) {
    try { cover = await downloadCover(cover, p.slug); } catch (e) {
      console.warn(`cms:pull: ${p.slug}: ${e.message}; using the previous cover if there is one`);
      cover = oldBySlug.get(p.slug)?.cover || "";
    }
  }
  if (!cover) console.warn(`cms:pull: ${p.slug} has no cover; the blog card needs one`);
  out.push({
    slug: p.slug, title: p.title, h1: p.h1 || p.title, date: p.date, author: p.author || "Flexlore",
    cover, coverAlt: p.coverAlt || "", card: cover, body: p.body,
    inline: Array.isArray(p.inline) ? p.inline : [], links: Array.isArray(p.links) ? p.links : [],
    cardDate: p.cardDate || p.date, cardTitle: p.cardTitle || p.title,
  });
}
if (!out.length && !allowEmpty) keep("no usable posts");

writeFileSync(BLOG_JSON, `${JSON.stringify(out, null, 1)}\n`);
console.log(`cms:pull: wrote ${out.length} posts to lib/blog.json (was ${committed.length})`);
