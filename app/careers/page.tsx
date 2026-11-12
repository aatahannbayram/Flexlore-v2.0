import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareersPage } from "@/components/pages/Careers";
import { meta, Ld, crumbs } from "@/components/seo";

export const metadata = meta({ title: "Careers at Flexlore", path: "/careers/",
  description: "Work at Flexlore: a small team where everyone owns their area. How we work, your first week, open roles and how to apply." });
export default function Page() {
  return (<><Ld data={[crumbs([["Home", "/"], ["Careers", "/careers/"]])]} /><Header overDark />
    <main id="main" className="overflow-x-clip"><CareersPage /></main><Footer /></>);
}
