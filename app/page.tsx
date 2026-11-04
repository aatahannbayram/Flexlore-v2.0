import Site from "@/components/Site";
import { home } from "@/components/home/home-copy";
import { Ld, faqLd, abs } from "@/components/seo";
import { CASES, CASES_HEAD } from "@/components/home/cases";
import { UseCases } from "@/components/home/UseCases";
export default function Page() { return (<><Ld data={[faqLd(home.en.faq.items), { "@context": "https://schema.org", "@type": "ItemList", name: CASES_HEAD.en.h, description: CASES_HEAD.en.lead,
    itemListElement: CASES.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.h.en, description: c.p.en, url: abs(c.href) })) }]} /><Site useCases={<UseCases />} /></>); }
