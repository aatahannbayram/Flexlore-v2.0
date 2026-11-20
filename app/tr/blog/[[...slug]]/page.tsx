import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { trBlogPosts as posts, BlogIndex, Article, cardTitle, type Post } from "@/components/Blog";
import { meta, Ld, crumbs, abs } from "@/components/seo";
import { BLOG_TR_LIVE } from "@/components/i18n/routes";
/* Turkish blog: /tr/blog/ (index) and /tr/blog/<slug>/ (posts from lib/blog.tr.json) in one optional catch-all route, so
 * the static export still works while there are no Turkish posts (output: export rejects an empty generateStaticParams).
 * Until the first Turkish post the index shows an empty state and stays out of search (noindex, no sitemap entry, no
 * hreflang); header and footer "Blog" links on Turkish pages still lead here. A post with an English version gets hreflang
 * from components/seo.tsx (lib/blog-map.json); a Turkish-only post is canonical to itself. */
export const dynamicParams = false;
export function generateStaticParams() { return [{ slug: [] as string[] }, ...posts.map((p) => ({ slug: [p.slug] }))]; }
const DESC = "Saha ekipleri için oryantasyon, eğitim, iş güvenliği ve çapraz eğitim üzerine yazılar.";
const desc = (p: Post) => p.description || DESC;
const day = (p: Post) => { const d = new Date(p.publishedAt || `${p.date} 12:00 UTC`); return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10); };
type Params = { params: Promise<{ slug?: string[] }> };
const find = (slug?: string[]) => (slug?.length === 1 ? posts.find((x) => x.slug === slug[0]) : undefined);
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (!slug?.length) {
    const m = meta({ title: "Flexlore Blog: Sahada eğitim ve oryantasyon", description: DESC, path: "/tr/blog/" });
    return BLOG_TR_LIVE ? m : { ...m, robots: { index: false, follow: true } };
  }
  const p = find(slug); if (!p) return {};
  return meta({ title: `${cardTitle(p)} | Flexlore`, description: desc(p), path: `/tr/blog/${p.slug}/`, image: p.cover, type: "article" });
}
export default async function Page({ params }: Params) {
  const { slug } = await params;
  if (!slug?.length) return (<><Ld data={crumbs([["Ana sayfa", "/tr/"], ["Blog", "/tr/blog/"]])} /><BlogIndex lang="tr" /></>);
  const p = find(slug); if (!p) notFound();
  const path = `/tr/blog/${p.slug}/`;
  const ld = [{ "@context": "https://schema.org", "@type": "BlogPosting", headline: cardTitle(p), description: desc(p), image: abs(p.cover),
    datePublished: day(p), dateModified: day(p), inLanguage: "tr", mainEntityOfPage: abs(path),
    author: { "@type": "Organization", "@id": abs("/#org"), name: "Flexlore", url: abs("/") }, publisher: { "@type": "Organization", "@id": abs("/#org"), name: "Flexlore", logo: { "@type": "ImageObject", url: abs("/brand/logo.png") } } },
    crumbs([["Ana sayfa", "/tr/"], ["Blog", "/tr/blog/"], [cardTitle(p), path]])];
  return (<><Ld data={ld} /><Article p={p} lang="tr" /></>);
}
