import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, Article, cardTitle } from "@/components/Blog";
export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = posts.find((x) => x.slug === slug); if (!p) return {};
  return { title: `${cardTitle(p)} | Flexlore`, alternates: { canonical: `/blog/${p.slug}/` }, robots: { index: false, follow: false }, openGraph: { images: [p.cover] } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = posts.find((x) => x.slug === slug); if (!p) notFound();
  return <Article p={p} />;
}
