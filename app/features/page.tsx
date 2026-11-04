import { FeaturesIndex } from "@/components/features/FeaturePage";
import { FEATURES } from "@/components/features/data";
import { fen } from "@/components/i18n/features/en";
import { meta, Ld, crumbs, abs } from "@/components/seo";
export const metadata = meta({ title: "Flexlore features: video and PDF to SOP, AI quizzes, translation, QR and more", description: "Everything Flexlore does: video or PDF to step-by-step SOPs, a phone video editor, AI quizzes, permissions and workspaces, plus what is on the roadmap.", path: "/features/" });
const list = { "@context": "https://schema.org", "@type": "ItemList", name: "Flexlore features", itemListElement: FEATURES.map((f, i) => {
  const it = fen.items[f.slug as keyof typeof fen.items];
  return { "@type": "ListItem", position: i + 1, url: abs(`/features/${f.slug}/`), name: `${it.k}${f.status === "live" ? "" : " (coming soon)"}`, description: it.meta };
}) };
export default function Page() { return (<><Ld data={[list, crumbs([["Home", "/"], ["Features", "/features/"]])]} /><FeaturesIndex /></>); }
