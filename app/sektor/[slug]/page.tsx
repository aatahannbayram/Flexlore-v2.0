import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectors } from "@/components/sectors";
import SectorPage from "@/components/SectorPage";
import { meta, Ld, crumbs } from "@/components/seo";
import seo from "@/lib/seo.json";
const S = seo as Record<string, { t: string; d: string }>;
export function generateStaticParams() { return sectors.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const s = sectors.find((x) => x.slug === slug); if (!s) return {};
  const path = `/sektor/${s.slug}/`;
  return meta({ title: S[path]?.t ?? `Flexlore for ${s.en}`, description: S[path]?.d ?? s.lede, path });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const i = sectors.findIndex((x) => x.slug === slug); if (i < 0) notFound();
  const s = sectors[i];
  return (<><Ld data={crumbs([["Home", "/"], [s.en, `/sektor/${s.slug}/`]])} /><SectorPage i={i} /></>);
}
