import { Bar } from "@/components/Blog";
import { Footer, IntegrationsDetail } from "@/components/Sections";
import { meta, Ld, crumbs } from "@/components/seo";
import { Arr } from "@/components/Icons";
import { SITE } from "@/components/config";
export const metadata = meta({ title: "Flexlore integrations: apps, web and what is coming", description: "Flexlore runs on iOS, Android and the web today. BI tool connections, an MCP server, a REST API and webhooks are on the roadmap.", path: "/integrations/" });
export default function Page() { return (<><Ld data={[crumbs([["Home", "/"], ["Integrations", "/integrations/"]])]} /><Bar />
  <main id="main" className="pb-[var(--section-y)] pt-32 md:pt-44"><div className="container-x">
    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">Integrations</p><h1 className="mt-5 max-w-[16ch] text-[clamp(40px,1rem+3.6vw,76px)] font-semibold leading-[0.98] tracking-[-0.05em] [text-wrap:balance]"><span className="t-ink">Works where your team</span> <span className="t-accent">already is.</span></h1>
    <p className="lead mt-5 max-w-[36rem]">Phones for the people doing the job, web for the people running it. Data connections are on the roadmap and labelled as such.</p>
    <IntegrationsDetail /><a href={SITE.demo} className="btn btn-primary mt-10 h-11 px-5 text-[15px]">Book a demo <Arr className="ms-1" /></a></div></main><Footer /></>); }
