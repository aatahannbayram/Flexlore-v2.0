import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { FaqPage } from "@/components/pages/Help";
import { meta, Ld, crumbs, faqLd } from "@/components/seo";
import { en } from "@/components/i18n/home/en";
import { PRICING_FAQ } from "@/components/config";
export const metadata = meta({ title: "Flexlore FAQ: AI, devices, languages, pricing and billing",
  description: "Answers about Flexlore: how one phone video becomes step-by-step instructions and a quiz, who approves what the AI drafts, devices, languages, pricing by number of users and billing.", path: "/faq/" });
const items = [...en.faq.items.map(([q, a]) => ({ q, a })), ...PRICING_FAQ.filter(({ q }) => !en.faq.items.some(([p]) => p.trim().toLowerCase() === q.trim().toLowerCase())).map(({ q, a }) => ({ q, a: a.replace("listed on this page", "listed on the pricing page") }))];
export default function Page() {
  return (<><Ld data={[crumbs([["Home", "/"], ["FAQ", "/faq/"]]), faqLd(items)]} /><Header />
    <main id="main" className="overflow-x-clip"><FaqPage /></main><Footer /></>);
}
