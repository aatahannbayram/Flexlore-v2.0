import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectors, sectorCopy } from "@/components/sectors";
import SectorPage from "@/components/SectorPage";
import { meta, Ld, crumbs } from "@/components/seo";
/* Turkish sector pages at /tr/sektor/<turkish-slug>/ (English twin: /industries/<english-slug>/). */
export function generateStaticParams() { return sectors.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const s = sectors.find((x) => x.slug === slug); if (!s) return {};
  const c = sectorCopy(s, "tr");
  return meta({ title: `${s.tr} için Video İş Talimatı ve Personel Eğitimi | Flexlore`, description: c.lede, path: `/tr/sektor/${s.slug}/` });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const i = sectors.findIndex((x) => x.slug === slug); if (i < 0) notFound();
  const s = sectors[i];
  return (<><Ld data={crumbs([["Ana sayfa", "/tr/"], [s.tr, `/tr/sektor/${s.slug}/`]])} /><SectorPage i={i} /></>);
}
