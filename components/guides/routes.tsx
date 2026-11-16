/* Shared metadata, structured data and rendering for the guide routes (app/guides, app/tr/rehber). */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { meta, Ld, crumbs, faqLd, abs } from "../seo";
import { GUIDES, GUIDES_UPDATED, guidePath, hubPath, words, type Guide } from "./data";
import { GuideView, GuidesHub, GL, type Rel } from "./GuideView";
import seo from "@/lib/seo.json";
import seoTr from "@/lib/seo-tr.json";

type Lang = "en" | "tr";
const find = (lang: Lang, slug: string) => GUIDES[lang].find((g) => g.slug === slug);
export const params = (lang: Lang) => GUIDES[lang].map((g) => ({ slug: g.slug }));

export function guideMeta(lang: Lang, slug: string): Metadata {
  const g = find(lang, slug); if (!g) return {};
  return { ...meta({ title: g.seoTitle, description: g.description, path: guidePath(g), type: "article" }), other: { "article:modified_time": GUIDES_UPDATED } };
}
export function hubMeta(lang: Lang): Metadata {
  const t = GL[lang];
  return meta({ title: lang === "tr" ? "SOP, İş Talimatı ve Eğitim Şablonları | Flexlore" : "SOP Templates and Frontline Training Guides | Flexlore", description: t.hubP.slice(0, 158), path: hubPath(lang) });
}

/* Titles for non-guide related pages (feature, sector, pricing...), from the SEO tables, without the brand suffix. */
const S = { en: seo as Record<string, { t: string }>, tr: seoTr as Record<string, { t: string }> };
const KIND = { en: { page: "Flexlore" }, tr: { page: "Flexlore" } };
function related(g: Guide): Rel[] {
  return g.related.slice(0, 4).flatMap((href) => {
    const lang = href.startsWith("/tr/") ? "tr" : "en";
    const other = GUIDES[lang].find((x) => guidePath(x) === href);
    if (other) return [{ href, title: other.h1, kind: other.kicker }];
    const title = (S[g.lang][href] ?? S.en[href] ?? S.tr[href])?.t?.replace(/\s*[|:]\s*Flexlore.*$/, "").replace(/^Flexlore\s*[|:]\s*/, "");
    return title ? [{ href, title, kind: KIND[g.lang].page }] : [];
  });
}

export function GuideRoute({ lang, slug }: { lang: Lang; slug: string }) {
  const g = find(lang, slug); if (!g) notFound();
  const path = guidePath(g); const t = GL[lang];
  const ld = [
    { "@context": "https://schema.org", "@type": "Article", headline: g.h1, description: g.description,
      inLanguage: lang, datePublished: GUIDES_UPDATED, dateModified: GUIDES_UPDATED, wordCount: words(g), mainEntityOfPage: abs(path),
      image: abs(lang === "tr" ? "/og-tr.png" : "/og.png"), author: { "@id": abs("/#org") }, publisher: { "@id": abs("/#org") },
      about: g.sections.slice(0, 3).map((s) => s.h2), isPartOf: { "@type": "CollectionPage", name: t.hub, url: abs(hubPath(lang)) } },
    faqLd(g.faq),
    crumbs([[t.home, lang === "tr" ? "/tr/" : "/"], [t.hub, hubPath(lang)], [g.h1, path]]),
  ];
  return (<><Ld data={ld} /><GuideView g={g} rel={related(g)} /></>);
}

export function HubRoute({ lang }: { lang: Lang }) {
  const list = GUIDES[lang]; const t = GL[lang];
  const ld = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: t.hub, description: t.hubP, url: abs(hubPath(lang)), inLanguage: lang,
      mainEntity: { "@type": "ItemList", itemListElement: list.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: abs(guidePath(g)), name: g.h1 })) } },
    crumbs([[t.home, lang === "tr" ? "/tr/" : "/"], [t.hub, hubPath(lang)]]),
  ];
  return (<><Ld data={ld} /><GuidesHub lang={lang} list={list} /></>);
}
