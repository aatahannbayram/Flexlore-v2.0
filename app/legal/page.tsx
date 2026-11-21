import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LegalIndex } from "@/components/legal/LegalLayout";
import { meta, Ld, crumbs } from "@/components/seo";
import { LEGAL } from "@/components/legal/docs";
import { cmsLegal } from "@/lib/cms";
/* Cards show the CMS title and date for pages published there (lib/cms-legal.json), docs.ts for the rest. */
const docs = LEGAL.map((d) => { const c = cmsLegal(d.slug); return c ? { ...d, title: c.title, updated: c.updated || d.updated, draft: false } : d; });
export const metadata = meta({ title: "Flexlore legal: policies and agreements", description: "Terms, privacy, acceptable use, data processing, sub-processors, security, billing and cookies for Flexlore.", path: "/legal/" });
export default function Page() {
  return (<><Ld data={crumbs([["Home", "/"], ["Legal", "/legal/"]])} /><Header /><main id="main"><LegalIndex docs={docs} /></main><Footer /></>);
}
