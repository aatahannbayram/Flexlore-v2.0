import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FaqPage } from "@/components/pages/Help";
import { meta, Ld, crumbs, faqLd } from "@/components/seo";
import { tr } from "@/components/i18n/home/tr";
import { PRICING_FAQ_TR } from "@/components/config";
import { cmsFaq } from "@/lib/cms";
import seo from "@/lib/seo-tr.json";
export const metadata = meta({ title: seo["/tr/faq/"].t, description: seo["/tr/faq/"].d, path: "/tr/faq/" });
/* The Turkish CMS FAQ (lib/cms-faq.tr.json) when it has items, else the hard-coded Turkish home and pricing FAQ. */
const cms = cmsFaq("tr");
const items = cms ? cms.map(({ q, a }) => ({ q, a })) : [...tr.faq.items.map(([q, a]) => ({ q, a })), ...PRICING_FAQ_TR.filter(({ q }) => !tr.faq.items.some(([p]) => p.trim().toLowerCase() === q.trim().toLowerCase())).map(({ q, a }) => ({ q, a: a.replace("bu sayfada", "fiyatlar sayfasında") }))];
export default function Page() {
  return (<><Ld data={[crumbs([["Ana sayfa", "/tr/"], ["SSS", "/tr/faq/"]]), faqLd(items)]} /><Header />
    <main id="main" className="overflow-x-clip"><FaqPage cms={cms && { lang: "tr", items: cms }} /></main><Footer /></>);
}
