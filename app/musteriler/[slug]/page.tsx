import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CasePage from "@/components/v3/CasePage";
import { CASES, published } from "@/components/v3/cases";
import { meta } from "@/components/seo";
import { HOME4 } from "@/components/i18n/home4";

/* Customer pages: one per company on the home carousel. A page is indexable (and may join the sitemap) only once its
 * case is approved and complete (published()); until then it is built but noindex, and shows only the carousel facts
 * plus a "case study coming soon" card (components/v3/CasePage.tsx). */
export const dynamicParams = false;
export function generateStaticParams() { return CASES.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug); if (!c) return {};
  const live = published().some((x) => x.slug === slug);
  const m = meta({ title: `${c.company} | Flexlore`, description: c.quote ?? `${c.company}: ${HOME4.en.cases.desc[c.desc]}. One of the teams working with Flexlore.`, path: `/musteriler/${slug}/` });
  return live ? m : { ...m, robots: { index: false, follow: true } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!CASES.some((c) => c.slug === slug)) notFound();
  return <CasePage slug={slug} />;
}
