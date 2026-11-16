import { FEATURE_TITLE } from "@/components/features/seoTitles";
import { meta } from "@/components/seo";
import { ftr } from "@/components/i18n/features/tr";
type P = { params: Promise<{ slug: string }> };
export { generateStaticParams, default } from "../../../features/[slug]/page";
export async function generateMetadata({ params }: P) {
  const { slug } = await params; const it = ftr.items[slug as keyof typeof ftr.items];
  return meta({ title: FEATURE_TITLE[slug]?.tr ?? `${it.k}: ${it.h1} | Flexlore`, description: it.meta, path: `/tr/features/${slug}/` });
}
