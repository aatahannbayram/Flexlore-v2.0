import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DemoPage } from "@/components/pages/Demo";
import { meta, Ld, crumbs } from "@/components/seo";
export const metadata = meta({ title: "Book a Flexlore demo", description: "Twenty minutes, one of your real jobs. Pick a time and we build it with you on the call.", path: "/demo/" });
export default function Page() {
  return (<><Ld data={crumbs([["Home", "/"], ["Book a demo", "/demo/"]])} /><Header />
    <main id="main" className="overflow-x-clip pb-[var(--section-y)]"><DemoPage /></main><Footer /></>);
}
