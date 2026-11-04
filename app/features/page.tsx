import { FeaturesIndex } from "@/components/features/FeaturePage";
import { meta, Ld, crumbs } from "@/components/seo";
export const metadata = meta({ title: "Flexlore features: video SOPs, AI quizzes, translation, QR and more", description: "Everything Flexlore does: video to SOP, a phone video editor, AI quizzes, permissions and workspaces, a web panel and what is coming next.", path: "/features/" });
export default function Page() { return (<><Ld data={[crumbs([["Home", "/"], ["Features", "/features/"]])]} /><FeaturesIndex /></>); }
