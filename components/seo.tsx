import type { Metadata } from "next";
import { SITE } from "./config";
import { trOf, enOf, isTrPath } from "./i18n/routes";
export const robots = SITE.noindex ? { index: false, follow: false, googleBot: { index: false, follow: false } } : { index: true, follow: true };
export function meta({ title, description, path, image = "/og.png", type = "website" }: { title: string; description: string; path: string; image?: string; type?: "website" | "article" }): Metadata {
  return { title: { absolute: title }, description, alternates: { canonical: path, ...langs(path) }, robots,
    openGraph: { type, url: path, siteName: "Flexlore", title, description, images: [{ url: image, alt: title }], locale: isTrPath(path) ? "tr_TR" : "en_US" },
    twitter: { card: "summary_large_image", title, description, images: [image] } };
}
/** hreflang for pages with a Turkish twin: en, tr and x-default (English). Empty for English-only pages. */
export function langs(path: string): { languages?: Record<string, string> } {
  const en = isTrPath(path) ? enOf(path) : path; const tr = trOf(en);
  return tr ? { languages: { en, tr, "x-default": en } } : {};
}
export const abs = (p: string) => SITE.url + p;
export const crumbs = (items: [string, string][]) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })) });
export const faqLd = (f: { q: string; a: string }[]) => ({ "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: f.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })) });
export function Ld({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
