import { Bar } from "@/components/Blog";
import { Footer } from "@/components/Footer";
import Body from "./Body";
import { meta, Ld, crumbs } from "@/components/seo";
export const metadata = meta({ title: "AI in Flexlore: today and on the roadmap", description: "What Flexlore's AI does today (video into steps, drafted instructions and quizzes) and what is coming soon. Your team approves every draft.", path: "/ai/" });
export default function Page() { return (<><Ld data={[crumbs([["Home", "/"], ["AI", "/ai/"]])]} /><Bar />
  <Body /><Footer /></>); }
