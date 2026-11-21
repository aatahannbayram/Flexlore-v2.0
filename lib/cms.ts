// Content pulled from the Flexlore CMS by scripts/pull-cms.mjs (npm run cms:pull): FAQ items and legal pages.
// Server only: import this from server components (app/**/page.tsx), never from a "use client" file, so the JSON stays
// out of the client bundles. The HTML is sanitized by the CMS (h2, h3, p, ul, ol, li, a, strong, em, blockquote, code,
// pre, img); an empty or missing entry means the page keeps its hard-coded copy.
import faqEn from "./cms-faq.en.json";
import faqTr from "./cms-faq.tr.json";
import legal from "./cms-legal.json";

type CmsFaqFile = { lang: string; items: { id: number; question: string; answer_html: string; order: number }[] };
export type FaqEntry = { q: string; a: string; html: string };
type CmsLegal = Record<string, { title: string; body_html: string; updated_at: string | null }>;

const ENT: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: "\"", apos: "'", nbsp: " " };
const decode = (s: string) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) =>
  e[0] === "#" ? String.fromCodePoint(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : ENT[e.toLowerCase()] ?? m);

/** Plain text from CMS HTML, for JSON-LD, search and heading ids. */
export const htmlText = (html: string) =>
  decode(html.replace(/<\/(p|li|h2|h3|blockquote|pre)>|<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();

/** CMS FAQ for a language, or null when the pulled file is empty (the page then uses its hard-coded list). */
export function cmsFaq(lang: "en" | "tr"): FaqEntry[] | null {
  const f = (lang === "tr" ? faqTr : faqEn) as CmsFaqFile;
  if (f?.lang !== lang || !Array.isArray(f.items) || !f.items.length) return null;
  return f.items.map((x) => ({ q: x.question, a: htmlText(x.answer_html), html: x.answer_html }));
}

export type CmsLegalDoc = { title: string; updated: string; dateModified: string | null; intro: string; sections: [string, string][] };
const fmtDate = (iso: string | null) => {
  const d = iso ? new Date(iso) : null;
  return d && !isNaN(+d) ? d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : null;
};

/** A published legal page from the CMS, split at its h2 headings so it renders in the same sections as docs.ts. */
export function cmsLegal(slug: string): CmsLegalDoc | null {
  const d = (legal as CmsLegal)[slug];
  if (!d?.body_html) return null;
  const parts = d.body_html.split(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const sections: [string, string][] = [];
  for (let i = 1; i < parts.length; i += 2) sections.push([parts[i].trim(), (parts[i + 1] ?? "").trim()]);
  return { title: d.title, updated: fmtDate(d.updated_at) ?? "", dateModified: d.updated_at ? d.updated_at.slice(0, 10) : null, intro: parts[0].trim(), sections };
}
