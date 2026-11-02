import { Bar } from "@/components/Blog";
import { Footer, AIDetail } from "@/components/Sections";
import { meta, Ld, crumbs } from "@/components/seo";
import { SITE } from "@/components/config";
export const metadata = meta({ title: "AI in Flexlore: today and on the roadmap", description: "What Flexlore's AI does today (video into steps, drafted instructions and quizzes) and what is coming soon. Your team approves every draft.", path: "/ai/" });
export default function Page() { return (<><Ld data={[crumbs([["Home", "/"], ["AI", "/ai/"]])]} /><Bar />
  <main id="main" className="px-6 pb-20 pt-36 md:px-10"><div className="mx-auto max-w-[1400px]">
    <p className="eyebrow">AI</p><h1 className="display mt-4 max-w-[15ch] text-[clamp(3rem,7vw,6.5rem)]">AI does the paperwork. Your experts keep the say.</h1>
    <p className="mt-4 max-w-xl text-lg leading-[1.4] text-white/65">Your team reviews and approves every draft before it goes out.</p>
    <AIDetail /><a href={SITE.demo} className="btn-p mt-12">Book a demo →</a></div></main><Footer /></>); }
