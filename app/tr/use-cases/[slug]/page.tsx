import type { Metadata } from "next";
import { USE_CASES, USE_CASES_TR } from "@/components/UseCase";
import { meta } from "@/components/seo";
export { generateStaticParams, default } from "../../../use-cases/[slug]/page";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const c = USE_CASES.find((x) => x.slug === slug); const t = USE_CASES_TR[slug]; if (!c || !t) return {};
  return meta({ title: `${t.h1} | Flexlore`, description: t.lede, path: `/tr/use-cases/${slug}/`, image: c.img });
}
