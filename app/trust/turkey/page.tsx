import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { TurkiyePage, TURKIYE_TITLE } from "@/components/trust/TurkiyePage";
import { TRUST_TR, TRUST_TR_PATH } from "@/components/trust/config";
import { meta, Ld, crumbs, abs, robots } from "@/components/seo";

// Not indexed until counsel approves the page (TRUST_TR.approved in components/trust/config.ts).
const m = meta({ title: `${TURKIYE_TITLE.en} | Flexlore`, path: TRUST_TR_PATH.en,
  description: "Where your data is kept, roles, the steps for transfers from Türkiye, sub-processors and what to know about employees who appear in videos." });
export const metadata = { ...m, robots: TRUST_TR.approved ? robots : { index: false, follow: true },
  alternates: { canonical: TRUST_TR_PATH.en, languages: { tr: TRUST_TR_PATH.tr, en: TRUST_TR_PATH.en } } };
export default function Page() {
  const ld = { "@context": "https://schema.org", "@type": "WebPage", url: abs(TRUST_TR_PATH.en), name: TURKIYE_TITLE.en, inLanguage: "en", dateModified: TRUST_TR.updated.iso };
  return (<><Ld data={[crumbs([["Home", "/"], [TURKIYE_TITLE.en, TRUST_TR_PATH.en]]), ld]} /><Header />
    <main id="main" className="overflow-x-clip"><TurkiyePage lang="en" /></main><Footer /></>);
}
