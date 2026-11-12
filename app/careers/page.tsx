import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareersPage } from "@/components/pages/Careers";
import { meta, Ld, crumbs } from "@/components/seo";

export const metadata = meta({ title: "Careers at Flexlore", path: "/careers/",
  description: "Work on the product that turns how the best people do a job into video steps and a quiz for frontline teams. Open roles and how to apply." });
export default function Page() {
  return (<><Ld data={[crumbs([["Home", "/"], ["Careers", "/careers/"]])]} /><Header overDark />
    <main id="main" className="overflow-x-clip"><CareersPage /></main><Footer /></>);
}
