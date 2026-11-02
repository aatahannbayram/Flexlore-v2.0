import { Bar } from "@/components/Blog";
import { Footer, IntegrationsDetail } from "@/components/Sections";
import { meta, Ld, crumbs } from "@/components/seo";
import { SITE } from "@/components/config";
export const metadata = meta({ title: "Flexlore integrations: apps, web and what is coming", description: "Flexlore runs on iOS, Android and the web today. Power BI, an MCP server, a REST API and webhooks are on the roadmap.", path: "/integrations/" });
export default function Page() { return (<><Ld data={[crumbs([["Home", "/"], ["Integrations", "/integrations/"]])]} /><Bar />
  <main id="main" className="px-6 pb-20 pt-36 md:px-10"><div className="mx-auto max-w-[1400px]">
    <p className="eyebrow">Integrations</p><h1 className="display mt-4 max-w-[15ch] text-[clamp(3rem,7vw,6.5rem)]">Works where your team already is.</h1>
    <p className="mt-4 max-w-xl text-lg leading-[1.4] text-white/65">Phones for the people doing the job, web for the people running it. Data connections are on the roadmap and labelled as such.</p>
    <IntegrationsDetail /><a href={SITE.demo} className="btn-p mt-12">Book a demo →</a></div></main><Footer /></>); }
