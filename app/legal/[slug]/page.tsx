import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LegalArticle } from "@/components/legal/LegalLayout";
import { LEGAL, legalBySlug } from "@/components/legal/docs";
import { meta, Ld, crumbs, abs } from "@/components/seo";
import { cmsLegal } from "@/lib/cms";

/* lib/cms-legal.json (npm run cms:pull) wins when it has the slug: title, body and date come from the CMS and the page is
 * not a draft. Slugs the CMS has not published keep docs.ts, including its draft flag. */
const resolve = (slug: string) => {
  const d = legalBySlug(slug); if (!d) return null;
  const cms = cmsLegal(slug);
  return { cms, doc: cms ? { ...d, title: cms.title, updated: cms.updated || d.updated, draft: false } : d };
};

export const dynamicParams = false;
export function generateStaticParams() { return LEGAL.map((d) => ({ slug: d.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = resolve((await params).slug)?.doc; if (!d) return {};
  return meta({ title: `${d.title} | Flexlore`, description: d.desc, path: `/legal/${d.slug}/` });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const r = resolve((await params).slug); if (!r) notFound();
  const { doc: d, cms } = r;
  const ld = { "@context": "https://schema.org", "@type": "WebPage", url: abs(`/legal/${d.slug}/`), name: d.title, description: d.desc, inLanguage: "en", dateModified: cms?.dateModified ?? "2026-11-05" };
  return (<><Ld data={[crumbs([["Home", "/"], ["Legal", "/legal/"], [d.title, `/legal/${d.slug}/`]]), ld]} /><Header />
    <main id="main"><LegalArticle doc={d} cms={cms} /></main><Footer /></>);
}
