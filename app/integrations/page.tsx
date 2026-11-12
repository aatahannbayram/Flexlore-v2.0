import { Bar } from "@/components/Blog";
import { Footer } from "@/components/Footer";
import Body from "./Body";
import { meta, Ld, crumbs } from "@/components/seo";
export const metadata = meta({ title: "Flexlore integrations: apps, web and what is coming", description: "Flexlore runs on iOS, Android and the web today. BI tool connections, an MCP server, a REST API and webhooks are on the roadmap.", path: "/integrations/" });
export default function Page() { return (<><Ld data={[crumbs([["Home", "/"], ["Integrations", "/integrations/"]])]} /><Bar />
  <Body /><Footer /></>); }
