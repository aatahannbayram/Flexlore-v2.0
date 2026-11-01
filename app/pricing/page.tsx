import Pricing, { PRICING_FAQ } from "@/components/Pricing";
import { meta, Ld, crumbs, faqLd } from "@/components/seo";
import seo from "@/lib/seo.json";
export const metadata = meta({ title: seo["/pricing/"].t, description: seo["/pricing/"].d, path: "/pricing/" });
export default function Page() { return (<><Ld data={[faqLd(PRICING_FAQ), crumbs([["Home", "/"], ["Pricing", "/pricing/"]])]} /><Pricing /></>); }
