import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectors } from "@/components/sectors";
import SectorPage from "@/components/SectorPage";
export function generateStaticParams() { return sectors.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const s = sectors.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `Flexlore for ${s.en} | Video SOPs, AI quizzes, readiness`, description: s.lede, alternates: { canonical: `/sektor/${s.slug}/` }, robots: { index: false, follow: false } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const i = sectors.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  return <SectorPage i={i} />;
}
