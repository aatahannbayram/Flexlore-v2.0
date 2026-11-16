/* Guides and templates (EN at /guides/<slug>/, TR at /tr/rehber/<slug>/). One JSON file per page in content/guides/<lang>/,
 * read at build time (static export), so this module is server-only: import it from app/ routes and sitemap, never from
 * a client component. Writer rules: content/guides/BRIEF.md. The EN <-> TR slug table is GUIDE_TR in i18n/routes.ts. */
import fs from "node:fs";
import path from "node:path";
import { GUIDE_TR } from "../i18n/routes";

export type GuideSection = { id: string; h2: string; html: string };
export type GuideTemplate = { title: string; intro: string; html: string; text: string };
export type Guide = {
  slug: string; lang: "en" | "tr"; twin: string; kind: "guide" | "template" | "checklist";
  seoTitle: string; description: string; h1: string; kicker: string; answer: string;
  sections: GuideSection[]; template: GuideTemplate | null; faq: { q: string; a: string }[]; related: string[];
};

/** Last content update shown on the page and used as dateModified / sitemap lastmod. */
export const GUIDES_UPDATED = "2026-11-17";

const DIR = path.join(process.cwd(), "content", "guides");
/* Order on the hub pages follows GUIDE_TR (buyer journey: what it is, templates, tools). */
const ORDER = Object.keys(GUIDE_TR);
function load(lang: "en" | "tr"): Guide[] {
  const dir = path.join(DIR, lang);
  if (!fs.existsSync(dir)) return [];
  const all = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Guide);
  const key = (g: Guide) => ORDER.indexOf(lang === "en" ? g.slug : g.twin);
  return all.sort((a, b) => key(a) - key(b));
}
export const GUIDES = { en: load("en"), tr: load("tr") };
export const guidePath = (g: Pick<Guide, "lang" | "slug">) => (g.lang === "tr" ? `/tr/rehber/${g.slug}/` : `/guides/${g.slug}/`);
export const hubPath = (lang: "en" | "tr") => (lang === "tr" ? "/tr/rehber/" : "/guides/");

/** Wraps tables so they scroll inside their own box on phones (the page itself never scrolls sideways). */
export const prep = (html: string) => html.replace(/<table>/g, '<div class="tbl" tabindex="0"><table>').replace(/<\/table>/g, "</table></div>");
export const words = (g: Guide) => [g.answer, ...g.sections.map((s) => s.html), g.template?.text ?? ""].join(" ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
