import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectors, SECTOR_EN, sectorPath } from "@/components/sectors";
import SectorPage from "@/components/SectorPage";
import { meta, Ld, crumbs } from "@/components/seo";
import seo from "@/lib/seo.json";
const S = seo as Record<string, { t: string; d: string }>;
/* Sector pages at /industries/<english-slug>/ (e.g. /industries/restaurants/). The Turkish slug in sectors.ts stays the key. */
const find = (slug: string) => sectors.findIndex((x) => (SECTOR_EN[x.slug] ?? x.slug) === slug);
export function generateStaticParams() { return sectors.map((s) => ({ slug: SECTOR_EN[s.slug] ?? s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const i = find(slug); if (i < 0) return {}; const s = sectors[i];
  const path = sectorPath(s.slug);
  return meta({ title: S[path]?.t ?? `Flexlore for ${s.en}`, description: S[path]?.d ?? s.lede, path });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const i = find(slug); if (i < 0) notFound();
  const s = sectors[i];
  return (<><Ld data={crumbs([["Home", "/"], [s.en, sectorPath(s.slug)]])} /><SectorPage i={i} /></>);
}
