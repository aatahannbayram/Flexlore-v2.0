import Link from "next/link";
import { I, StoreButtons } from "./Icons";
import { SITE, PLANS, PRICING } from "./config";

const Tag = ({ live }: { live: boolean }) => (
  <span className={`mono inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[.18em] ${live ? "text-white" : "text-white/45"}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-flame" : "border border-white/40"}`} />{live ? "Live" : "Coming soon"}</span>);

const AI_NOW = [
  { i: I.split, h: "Video into steps", p: "Upload a phone video of the job. Flexlore cuts it into clear steps, so nobody scrubs through a long recording to find the bit they need." },
  { i: I.steps, h: "Instructions, drafted", p: "Each step gets a written instruction drafted from the content. You edit, you approve." },
  { i: I.quiz, h: "Quizzes, written for you", p: "Flexlore drafts a short quiz from the steps. You see who understood the job, not just who watched it." },
];
const AI_NEXT = [
  { i: I.lang, h: "Multilingual content", p: "Content in the languages your team speaks, so the standard holds whoever is on shift." },
  { i: I.brand, h: "Your brand, your words", p: "Your logo, colours and welcome screen in the app, with templates adapted to your roles, branches and terms." },
  { i: I.qr, h: "Scan a QR, start the job", p: "Every job gets a shareable link. Print a QR for a machine, a station or a branch door. Scan it and the right job opens." },
  { i: I.chat, h: "Ask your training data anything", p: "An API, a Power BI connection and an MCP server for Claude and other AI assistants. Ask “Who isn’t ready at branch 3?” in your own tools." },
];
export function AISection() {
  return (
    <section id="ai" className="px-6 py-14 md:px-10 md:py-20" aria-labelledby="ai-h">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">AI</p>
        <h2 id="ai-h" className="display mt-4 max-w-[15ch] text-[clamp(2.8rem,6.4vw,6.4rem)]">AI does the paperwork. Your experts keep the say.</h2>
        <p className="mt-4 max-w-xl text-lg leading-[1.4] text-white/65">Your team reviews and approves every draft before it goes out.</p>
        <div className="mt-14 grid gap-x-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-baseline justify-between border-b border-white/25 pb-3"><h3 className="text-[15px] font-semibold">Today</h3><Tag live /></div>
            {AI_NOW.map((x) => (<div key={x.h} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-white/10 py-6"><x.i className="text-white" /><div><p className="text-[19px] font-semibold tracking-tight">{x.h}</p><p className="mt-1.5 text-[15px] leading-[1.4] text-white/60">{x.p}</p></div></div>))}
          </div>
          <div className="mt-14 md:col-span-6 md:col-start-7 md:mt-0">
            <div className="flex items-baseline justify-between border-b border-white/25 pb-3"><h3 className="text-[15px] font-semibold">Coming soon</h3><Tag live={false} /></div>
            {AI_NEXT.map((x) => (<div key={x.h} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-white/10 py-6"><x.i className="text-white/80" /><div><p className="text-[19px] font-semibold tracking-tight text-white/90">{x.h}</p><p className="mt-1.5 text-[15px] leading-[1.4] text-white/55">{x.p}</p></div></div>))}
            <p className="mono mt-4 text-[10px] uppercase tracking-[.16em] text-white/35">On our roadmap. No dates yet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Directory by category. Only what Linear/Notion verify: apps + web are live; FLE-124 covers API, webhooks,
// Power BI and an MCP server. HRIS, LMS and MES/ERP have no named connector on the roadmap, so they are
// listed as "through the API, coming soon" with no partner names or logos.
type It = { i: (p: { className?: string }) => React.ReactNode; h: string; p: string; live: boolean; href?: string };
const DIR: { cat: string; items: It[] }[] = [
  { cat: "Apps", items: [
    { i: I.phone, h: "iOS", p: "Film and learn on iPhone.", live: true, href: SITE.appStore },
    { i: I.phone, h: "Android", p: "Film and learn on Android.", live: true, href: SITE.googlePlay },
    { i: I.web, h: "Web platform", p: "Managers assign jobs and track readiness.", live: true } ] },
  { cat: "BI & reporting", items: [ { i: I.chart, h: "Power BI", p: "Training and readiness data in your own reports.", live: false } ] },
  { cat: "AI assistants (MCP)", items: [ { i: I.chat, h: "MCP server", p: "Ask Claude and other assistants about readiness.", live: false } ] },
  { cat: "API & webhooks", items: [ { i: I.plug, h: "REST API", p: "Read people, jobs, quiz results and readiness.", live: false }, { i: I.hook, h: "Webhooks", p: "Events when a quiz is passed or readiness changes.", live: false } ] },
  { cat: "HRIS · LMS · MES/ERP", items: [ { i: I.plug, h: "Through the API", p: "No named connectors yet. Tell us what you run.", live: false } ] },
];
export function Integrations() {
  return (
    <section id="integrations" className="px-6 py-14 md:px-10 md:py-20" aria-labelledby="int-h">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7"><p className="eyebrow">Integrations</p>
            <h2 id="int-h" className="display mt-4 text-[clamp(2.6rem,5.6vw,5.6rem)]">Works where your team already is.</h2></div>
          <p className="text-[17px] leading-[1.4] text-white/60 md:col-span-4 md:col-start-9">Phones for the people doing the job, web for the people running it. Data connections are on the roadmap and labelled as such.</p>
        </div>
        <div className="mt-12 border-t border-white/15">
          {DIR.map((c) => (<div key={c.cat} className="grid gap-4 border-b border-white/15 py-6 md:grid-cols-12">
            <p className="mono text-[11px] uppercase tracking-[.18em] text-white/45 md:col-span-3">{c.cat}</p>
            <ul className="grid gap-6 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
              {c.items.map((x) => { const body = (<div className="flex gap-3"><x.i className={x.live ? "text-white" : "text-white/55"} /><div><p className="flex flex-wrap items-baseline gap-x-3 text-[17px] font-semibold tracking-tight">{x.h} <Tag live={x.live} /></p><p className="mt-1 text-[14px] leading-[1.4] text-white/55">{x.p}</p></div></div>);
                return <li key={x.h}>{x.href ? <a href={x.href} target="_blank" rel="noopener" className="block hover:opacity-80">{body}</a> : body}</li>; })}
            </ul></div>))}
        </div>
      </div>
    </section>
  );
}

export function PricingTeaser() {
  return (
    <section id="pricing" className="px-6 py-14 md:px-10 md:py-20" aria-labelledby="pt-h">
      <div className="mx-auto grid max-w-[1400px] gap-10 border-t border-white/15 pt-12 md:grid-cols-12">
        <div className="md:col-span-5"><p className="eyebrow">Pricing</p><h2 id="pt-h" className="display mt-4 text-[clamp(2.4rem,5vw,4.8rem)]">Pricing that fits your floor.</h2>
          <p className="mt-4 max-w-md text-[17px] leading-[1.4] text-white/60">Priced per location, with unlimited operators. Book a demo and we will walk you through the options.</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link href="/pricing/" className="btn-p">See pricing →</Link><a href={SITE.demo} className="btn-g">Book a demo</a></div></div>
        <ul className="grid gap-px bg-white/10 md:col-span-7 md:grid-cols-3">
          {PLANS.map((p) => (<li key={p.id} className="bg-black p-5"><p className="text-[15px] font-semibold">{p.name}</p><p className="mt-1 text-[13px] leading-[1.35] text-white/55">{p.for}</p><p className="mt-8 text-[13px] text-white/80">{p.price ?? "Price on request"}<span className="block text-white/40">{PRICING.operators}</span></p></li>))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  const col = "mono mb-4 text-[10px] uppercase tracking-[.2em] text-white/35";
  const a = "link-u text-white/65 hover:text-white";
  return (
    <footer className="px-6 pb-8 text-[13px] md:px-10" aria-labelledby="footer-h">
      <h2 id="footer-h" className="sr-only">Flexlore</h2>
      <div className="mx-auto max-w-[1400px] border-t border-white/10 pt-14">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <img src="/brand/wordmark-light.png" alt="Flexlore" className="h-9 w-auto" width={166} height={36} />
            <p className="mt-4 max-w-xs leading-[1.4] text-white/60">Every job, step by step. Through the eyes of the person who does it.</p>
            <p className={`${col} mt-8`}>Get the app</p><StoreButtons small />
          </div>
          <nav aria-label="Product" className="md:col-span-2 md:col-start-6"><p className={col}>Product</p><ul className="space-y-2.5">
            <li><a className={a} href="/#method">How it works</a></li><li><a className={a} href="/#imagine">Your business</a></li><li><Link className={a} href="/use-cases/master-apprentice-skills-transfer/">Master to apprentice</Link></li><li><Link className={a} href="/use-cases/installation-training-on-site-orientation/">Installation training</Link></li><li><a className={a} href="/#ai">AI</a></li><li><a className={a} href="/#integrations">Integrations</a></li><li><Link className={a} href="/pricing/">Pricing</Link></li></ul></nav>
          <nav aria-label="Industries" className="md:col-span-2"><p className={col}>Industries</p><ul className="space-y-2.5">
            {[["Restaurants", "restoran"], ["Manufacturing", "uretim"], ["Hotels", "otel"], ["Franchises", "franchise"], ["Warehouses", "depo"], ["Bakeries & cafés", "firin"]].map(([n, s]) => <li key={s}><Link className={a} href={`/sektor/${s}/`}>{n}</Link></li>)}</ul></nav>
          <nav aria-label="Company" className="md:col-span-2"><p className={col}>Company</p><ul className="space-y-2.5">
            <li><Link className={a} href="/blog/">Blog</Link></li><li><a className={a} href="https://www.flexlore.com/careers">Careers</a></li><li><a className={a} href="https://www.flexlore.com/support">Support</a></li><li><a className={a} href="mailto:hello@flexlore.com">hello@flexlore.com</a></li></ul></nav>
          <nav aria-label="Follow" className="md:col-span-2"><p className={col}>Follow</p><ul className="space-y-2.5">
            <li><a className={a} href={SITE.social.linkedin} target="_blank" rel="noopener">LinkedIn</a></li><li><a className={a} href={SITE.social.instagram} target="_blank" rel="noopener">Instagram</a></li><li><a className={a} href={SITE.social.youtube} target="_blank" rel="noopener">YouTube</a></li><li><a className={a} href={SITE.productHunt} target="_blank" rel="noopener">Product Hunt</a></li></ul></nav>
        </div>
        <p aria-hidden="true" className="display mt-20 select-none text-center text-[22vw] leading-[.8] text-white/[.07]">Flexlore</p>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Flexlore Inc.</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">{SITE.legal.map(([n, h]) => <li key={n}><a className="link-u hover:text-white" href={h}>{n}</a></li>)}</ul>
        </div>
      </div>
    </footer>
  );
}
