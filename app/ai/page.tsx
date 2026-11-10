import { Bar } from "@/components/Blog";
import { Footer, AIDetail } from "@/components/Sections";
import { meta, Ld, crumbs } from "@/components/seo";
import { Arr } from "@/components/Icons";
import { SITE } from "@/components/config";
export const metadata = meta({ title: "AI in Flexlore: today and on the roadmap", description: "What Flexlore's AI does today (video into steps, drafted instructions and quizzes) and what is coming soon. Your team approves every draft.", path: "/ai/" });
export default function Page() { return (<><Ld data={[crumbs([["Home", "/"], ["AI", "/ai/"]])]} /><Bar />
  <main id="main" className="pb-[var(--section-y)] pt-32 md:pt-44"><div className="container-x">
    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">AI</p><h1 className="mt-5 max-w-[16ch] text-[clamp(40px,1rem+3.6vw,76px)] font-semibold leading-[0.98] tracking-[-0.05em] [text-wrap:balance]"><span className="t-ink">AI does the paperwork.</span> <span className="t-accent">Your experts have the final say.</span></h1>
    <p className="lead mt-5 max-w-[36rem]">Your team reviews and approves every draft before it goes out.</p>
    <AIDetail /><a href={SITE.demo} className="btn btn-primary mt-10 h-11 px-5 text-[15px]">Book a demo <Arr className="ms-1" /></a></div></main><Footer /></>); }
