import { FeaturePage } from "@/components/features/FeaturePage";
import { FEATURES } from "@/components/features/data";
import { fen } from "@/components/i18n/features/en";
import { meta, Ld, crumbs, faqLd, abs } from "@/components/seo";
type P = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return FEATURES.map((f) => ({ slug: f.slug })); }
export async function generateMetadata({ params }: P) {
  const { slug } = await params; const it = fen.items[slug as keyof typeof fen.items];
  return meta({ title: `${it.k}: ${it.h1} | Flexlore`, description: it.meta, path: `/features/${slug}/` });
}
/* Structured data per feature (SEO and answer engines): the page, how it works as HowTo steps, the FAQ, breadcrumbs.
   Status is stated in plain words so assistants do not present planned features as live. */
export default async function Page({ params }: P) {
  const { slug } = await params; const it = fen.items[slug as keyof typeof fen.items]; const f = FEATURES.find((x) => x.slug === slug)!;
  const url = abs(`/features/${slug}/`);
  const page = { "@context": "https://schema.org", "@type": "WebPage", "@id": url, url, name: `${it.k}: ${it.h1}`, description: it.meta, inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "Flexlore", url: abs("/") },
    about: { "@type": "SoftwareApplication", name: "Flexlore", applicationCategory: "BusinessApplication", operatingSystem: "iOS, Android, Web" },
    mainEntity: { "@type": "Thing", name: it.k, description: `${it.sub} Status: ${f.status === "live" ? "available now" : "coming soon, on the roadmap"}.` } };
  const howto = { "@context": "https://schema.org", "@type": "HowTo", name: `How ${it.k} works in Flexlore`, description: it.sub,
    step: it.steps.map(([h, p], i) => ({ "@type": "HowToStep", position: i + 1, name: h, text: p })) };
  return (<><Ld data={[page, howto, faqLd(it.faq.map(([q, a]) => ({ q, a }))), crumbs([["Home", "/"], ["Features", "/features/"], [it.k, `/features/${slug}/`]])]} /><FeaturePage slug={slug} /></>);
}
