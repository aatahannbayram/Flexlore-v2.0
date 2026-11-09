/* Local answers for the site assistant while no Claude endpoint is configured: plain keyword retrieval over the
   knowledge base built by scripts/knowledge.mjs (public/knowledge/<locale>.json). It never writes new facts; it quotes the
   best matching entry and links to its page, and says so when nothing matches well enough. */
import type { Locale } from "../i18n/locales";

export type Entry = { id: string; locale: string; title: string; body: string; url: string; tags: string[] };
const cache = new Map<string, Promise<Entry[]>>();
export function loadKb(l: string): Promise<Entry[]> {
  if (!cache.has(l)) cache.set(l, fetch(`/knowledge/${l}.json`).then((r) => (r.ok ? r.json() : { entries: [] })).then((j) => j.entries as Entry[]).catch(() => []));
  return cache.get(l)!;
}

const fold = (s: string, l: string) => s.toLocaleLowerCase(l).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");
const STOP = new Set(["the", "and", "for", "you", "your", "with", "what", "how", "can", "does", "is", "are", "do", "bir", "ve", "ile", "mi", "mı", "mu", "mü", "ne", "nasil", "icin", "bu", "da", "de", "ki", "var", "mi?", "der", "die", "das", "und", "les", "des", "est", "que", "los", "las", "una", "por", "para", "jak", "czy", "что", "как", "это", "для"]);
const words = (s: string, l: string) => fold(s, l).split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1 && !STOP.has(w));
// Turkish, Polish, Russian and Arabic add suffixes, so a word matches on its first five letters as well.
const stem = (w: string) => (w.length > 5 ? w.slice(0, 5) : w);

function score(q: string[], e: Entry, l: string) {
  const title = words(e.title, l), body = words(e.body, l), tags = e.tags.flatMap((t) => words(t, l));
  const has = (list: string[], w: string) => list.some((x) => x === w || (w.length > 3 && stem(x) === stem(w)));
  let s = 0;
  for (const w of q) { if (has(title, w)) s += 3; if (has(tags, w)) s += 2; if (has(body, w)) s += 1; }
  return s / Math.max(2, Math.sqrt(q.length));
}

export type Hit = { entry: Entry; score: number; fallback: boolean };
export async function search(query: string, locale: Locale): Promise<Hit[]> {
  const run = async (l: string, fallback: boolean) => {
    const kb = await loadKb(l); const q = words(query, l);
    if (!q.length) return [] as Hit[];
    return kb.map((entry) => ({ entry, score: score(q, entry, l), fallback })).filter((h) => h.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
  };
  const own = await run(locale, false);
  if (own[0] && own[0].score >= 1.4) return own;
  if (locale === "en") return own;
  const en = await run("en", true);
  return (en[0]?.score ?? 0) > (own[0]?.score ?? 0) ? en : own;
}

/** A short extract: the first sentences of the entry, up to about 420 characters. */
export function extract(body: string, max = 420) {
  if (body.length <= max) return body;
  const cut = body.slice(0, max); const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "), cut.lastIndexOf("。"));
  return (end > 120 ? cut.slice(0, end + 1) : cut.replace(/\s+\S*$/, "")) + (end > 120 ? "" : "…");
}
