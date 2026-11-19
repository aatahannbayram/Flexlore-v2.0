import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DemoPage } from "@/components/pages/Demo";
import { meta, Ld, crumbs } from "@/components/seo";
import seo from "@/lib/seo-tr.json";
export const metadata = meta({ title: seo["/tr/demo/"].t, description: seo["/tr/demo/"].d, path: "/tr/demo/" });
export default function Page() {
  return (<><Ld data={crumbs([["Ana sayfa", "/tr/"], ["Demo isteyin", "/tr/demo/"]])} /><Header />
    <main id="main" className="overflow-x-clip pb-[var(--section-y)]"><DemoPage /></main><Footer /></>);
}
