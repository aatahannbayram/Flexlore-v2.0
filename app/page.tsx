import Site from "@/components/Site";
import { home } from "@/components/home/home-copy";
import { Ld, faqLd } from "@/components/seo";
export default function Page() { return (<><Ld data={faqLd(home.en.faq.items)} /><Site /></>); }
