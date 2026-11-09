import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { SupportPage } from "@/components/pages/Support";
import { meta, Ld, crumbs, abs } from "@/components/seo";
export const metadata = meta({ title: "Flexlore support: talk to our team", description: "Help with your Flexlore account, log-in, plans and billing, setting up your team and sites, or security and data. Write to support@flexlore.com, read the FAQ or book a 20-minute demo.", path: "/support/" });
const contact = { "@context": "https://schema.org", "@type": "ContactPage", url: abs("/support/"), name: "Flexlore support",
  mainEntity: { "@type": "Organization", name: "Flexlore Inc.", contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: "support@flexlore.com" } } };
export default function Page() {
  return (<><Ld data={[crumbs([["Home", "/"], ["Support", "/support/"]]), contact]} /><Header />
    <main id="main" className="overflow-x-clip"><SupportPage /></main><Footer /></>);
}
