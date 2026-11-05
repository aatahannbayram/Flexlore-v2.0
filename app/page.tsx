import Site from "@/components/Site";
import { home } from "@/components/home/home-copy";
import { en } from "@/components/i18n/home/en";
import { HOME2 } from "@/components/i18n/home2";
import { Ld, faqLd, abs } from "@/components/seo";
const IND_HREF = ["/sektor/restoran/", "/sektor/uretim/", "/sektor/otel/", "/sektor/franchise/"];
export default function Page() { return (<><Ld data={[faqLd(home.en.faq.items), { "@context": "https://schema.org", "@type": "ItemList", name: en.ind.h,
    itemListElement: IND_HREF.map((href, i) => ({ "@type": "ListItem", position: i + 1, name: en.ind.cards[i], description: `${HOME2.en.tabs[i][0]} ${HOME2.en.tabs[i][1].join(". ")}.`, url: abs(href) })) }]} /><Site /></>); }
