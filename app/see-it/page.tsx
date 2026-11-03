import SeeIt from "@/components/SeeIt";
import { meta, Ld, crumbs } from "@/components/seo";
export const metadata = meta({ title: "See Flexlore in your business | Flexlore", description: "Pick your industry (cafe and restaurant chains, franchise, manufacturing, hotel) and see how one filmed job becomes step-by-step video training with a quiz and readiness.", path: "/see-it/" });
export default function Page() { return (<><Ld data={crumbs([["Home", "/"], ["See it in your business", "/see-it/"]])} /><SeeIt /></>); }
