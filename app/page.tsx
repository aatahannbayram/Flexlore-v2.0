import Site from "@/components/Site";
import { copy } from "@/components/copy";
import { Ld, faqLd } from "@/components/seo";
export default function Page() { return (<><Ld data={faqLd(copy.en.faq)} /><Site /></>); }
