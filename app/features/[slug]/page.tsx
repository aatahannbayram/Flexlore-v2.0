import { FeaturePage } from "@/components/features/FeaturePage";
import { FEATURES } from "@/components/features/data";
import { fen } from "@/components/i18n/features/en";
import { meta, Ld, crumbs, faqLd } from "@/components/seo";
type P = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return FEATURES.map((f) => ({ slug: f.slug })); }
export async function generateMetadata({ params }: P) {
  const { slug } = await params; const it = fen.items[slug as keyof typeof fen.items];
  return meta({ title: `${it.k}: ${it.h1} | Flexlore`, description: it.meta, path: `/features/${slug}/` });
}
export default async function Page({ params }: P) {
  const { slug } = await params; const it = fen.items[slug as keyof typeof fen.items];
  return (<><Ld data={[faqLd(it.faq.map(([q, a]) => ({ q, a }))), crumbs([["Home", "/"], ["Features", "/features/"], [it.k, `/features/${slug}/`]])]} /><FeaturePage slug={slug} /></>);
}
