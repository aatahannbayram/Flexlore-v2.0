import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { CompanyPage } from "@/components/pages/Company";
import { meta, Ld, crumbs, abs } from "@/components/seo";
import { SITE } from "@/components/config";
export const metadata = meta({ title: "About Flexlore: our story, vision and mission", description: "Flexlore Inc. turns how your best people do the job into video steps everyone can follow, then checks what was learned. Our story, vision, mission and timeline.", path: "/company/" });
const org = { "@context": "https://schema.org", "@type": "AboutPage", url: abs("/company/"), name: "About Flexlore",
  mainEntity: { "@type": "Organization", name: "Flexlore Inc.", url: SITE.url, email: "support@flexlore.com", logo: abs("/brand/icon-512.png"),
    address: { "@type": "PostalAddress", addressRegion: "DE", addressCountry: "US" }, sameAs: Object.values(SITE.social) } };
export default function Page() {
  return (<><Ld data={[crumbs([["Home", "/"], ["Company", "/company/"]]), org]} /><Header />
    <main id="main" className="overflow-x-clip"><CompanyPage /></main><Footer /></>);
}
