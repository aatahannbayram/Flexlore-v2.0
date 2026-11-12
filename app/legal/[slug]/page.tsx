import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LegalArticle } from "@/components/legal/LegalLayout";
import { LEGAL, legalBySlug } from "@/components/legal/docs";
import { meta, Ld, crumbs, abs } from "@/components/seo";

export const dynamicParams = false;
export function generateStaticParams() { return LEGAL.map((d) => ({ slug: d.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = legalBySlug((await params).slug); if (!d) return {};
  return meta({ title: `${d.title} | Flexlore`, description: d.desc, path: `/legal/${d.slug}/` });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const d = legalBySlug((await params).slug); if (!d) notFound();
  const ld = { "@context": "https://schema.org", "@type": "WebPage", url: abs(`/legal/${d.slug}/`), name: d.title, description: d.desc, inLanguage: "en", dateModified: "2026-11-05" };
  return (<><Ld data={[crumbs([["Home", "/"], ["Legal", "/legal/"], [d.title, `/legal/${d.slug}/`]]), ld]} /><Header />
    <main id="main"><LegalArticle doc={d} /></main><Footer /></>);
}
