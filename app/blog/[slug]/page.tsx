import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, Article, cardTitle } from "@/components/Blog";
import { meta, Ld, crumbs, abs } from "@/components/seo";
import seo from "@/lib/seo.json";
const S = seo as Record<string, { t: string; d: string }>;
export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }
const title = (p: (typeof posts)[number]) => `${cardTitle(p)} | Flexlore`;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = posts.find((x) => x.slug === slug); if (!p) return {};
  const path = `/blog/${p.slug}/`;
  return meta({ title: title(p), description: S[path]?.d ?? S["/blog/"].d, path, image: p.cover, type: "article" });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = posts.find((x) => x.slug === slug); if (!p) notFound();
  const path = `/blog/${p.slug}/`;
  const ld = [{ "@context": "https://schema.org", "@type": "BlogPosting", headline: cardTitle(p), description: S[path]?.d, image: abs(p.cover),
    datePublished: new Date(p.date + " 12:00 UTC").toISOString().slice(0, 10), mainEntityOfPage: abs(path),
    author: { "@type": "Organization", name: "Flexlore" }, publisher: { "@type": "Organization", name: "Flexlore", logo: { "@type": "ImageObject", url: abs("/brand/logo.png") } } },
    crumbs([["Home", "/"], ["Blog", "/blog/"], [cardTitle(p), path]])];
  return (<><Ld data={ld} /><Article p={p} /></>);
}
