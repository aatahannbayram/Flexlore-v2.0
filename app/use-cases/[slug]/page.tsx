import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UseCase, { USE_CASES } from "@/components/UseCase";
import { meta, Ld, crumbs, faqLd } from "@/components/seo";
import seo from "@/lib/seo.json";
const S = seo as Record<string, { t: string; d: string }>;
export function generateStaticParams() { return USE_CASES.map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const c = USE_CASES.find((x) => x.slug === slug); if (!c) return {};
  const path = `/use-cases/${c.slug}/`; return meta({ title: S[path].t, description: S[path].d, path, image: c.img });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = USE_CASES.find((x) => x.slug === slug); if (!c) notFound();
  return (<><Ld data={[faqLd(c.faq), crumbs([["Home", "/"], [c.crumb, `/use-cases/${c.slug}/`]])]} /><UseCase c={c} /></>);
}
