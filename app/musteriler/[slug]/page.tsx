import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CasePage from "@/components/v3/CasePage";
import { CASES, published } from "@/components/v3/cases";
import { meta } from "@/components/seo";

/* Customer stories. Only approved cases get a page. While none is approved, one unlinked, noindex preview
 * (/musteriler/taslak/) is built so the template can be reviewed; it is left out of the sitemap. */
const PREVIEW = "taslak";
export const dynamicParams = false;
export function generateStaticParams() {
  const list = published().map((c) => ({ slug: c.slug }));
  return list.length ? list : [{ slug: PREVIEW }];
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === PREVIEW) return { title: "Customer story (preview)", robots: { index: false, follow: false } };
  const c = CASES.find((x) => x.slug === slug); if (!c) return {};
  return meta({ title: `${c.company} | Flexlore`, description: c.quote ?? c.company, path: `/musteriler/${slug}/` });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === PREVIEW) return <CasePage slug={CASES[0].slug} />;
  if (!published().some((c) => c.slug === slug)) notFound();
  return <CasePage slug={slug} />;
}
