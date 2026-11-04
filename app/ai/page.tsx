import { Bar } from "@/components/Blog";
import { Footer, AIDetail } from "@/components/Sections";
import { meta, Ld, crumbs } from "@/components/seo";
import { Arr } from "@/components/Icons";
import { SITE } from "@/components/config";
export const metadata = meta({ title: "AI in Flexlore: today and on the roadmap", description: "What Flexlore's AI does today (video into steps, drafted instructions and quizzes) and what is coming soon. Your team approves every draft.", path: "/ai/" });
export default function Page() { return (<><Ld data={[crumbs([["Home", "/"], ["AI", "/ai/"]])]} /><Bar />
  <main id="main" className="pb-20 pt-36"><div className="container-x">
    <p className="eyebrow">AI</p><h1 className="display mt-4 max-w-[15ch] text-h1">AI does the paperwork. Your experts have the final say.</h1>
    <p className="mt-4 max-w-xl text-lg leading-[1.4] text-white/65">Your team reviews and approves every draft before it goes out.</p>
    <AIDetail /><a href={SITE.demo} className="btn-p mt-12">Book a demo <Arr className="ml-1" /></a></div></main><Footer /></>); }
