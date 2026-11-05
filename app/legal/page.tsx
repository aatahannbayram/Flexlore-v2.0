import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { LegalIndex } from "@/components/legal/LegalLayout";
import { meta, Ld, crumbs } from "@/components/seo";
export const metadata = meta({ title: "Flexlore legal: policies and agreements", description: "Terms, privacy, acceptable use, data processing, sub-processors, security, billing and cookies for Flexlore.", path: "/legal/" });
export default function Page() {
  return (<><Ld data={crumbs([["Home", "/"], ["Legal", "/legal/"]])} /><Header /><main id="main"><LegalIndex /></main><Footer /></>);
}
