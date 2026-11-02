import Link from "next/link";
import { I, StoreButtons, Arr } from "./Icons";
import { SITE, PLANS, PRICING } from "./config";

const Tag = ({ live }: { live: boolean }) => (
  <span className={`mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[.16em] ${live ? "text-white" : "text-white/70"}`}>
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
  { i: I.chat, h: "Ask your training data anything", p: "Connect training data to the BI tools you already use. Ask your AI assistant which location isn’t ready." },
];
const Card = ({ title, live, items, muted }: { title: string; live: boolean; items: string[]; muted?: boolean }) => (
  <div className={`rounded-2xl p-7 md:p-9 ${muted ? "bg-white/[.025] ring-1 ring-white/[.07]" : "bg-white/[.05] ring-1 ring-white/10"}`}>
    <div className="flex items-baseline justify-between"><h3 className="text-[15px] font-semibold">{title}</h3><Tag live={live} /></div>
    <ol className="mt-8 space-y-4">{items.map((h, i) => (<li key={h} className="flex items-baseline gap-4"><span className="mono w-6 text-[11px] tabular-nums text-white/35">{String(i + 1).padStart(2, "0")}</span><span className={`text-[clamp(1.2rem,1.8vw,1.55rem)] font-semibold tracking-tight ${muted ? "text-white/55" : "text-white"}`}>{h}</span></li>))}</ol>
  </div>);

export function AISection() {
  return (
    <section id="ai" className="px-6 py-14 md:px-10 md:py-20" aria-labelledby="ai-h">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8"><p className="eyebrow">AI</p>
            <h2 id="ai-h" className="display mt-4 max-w-[15ch] text-[clamp(2.6rem,5.6vw,5.6rem)]">AI does the paperwork. Your experts have the final say.</h2></div>
          <p className="text-[17px] leading-[1.4] text-white/60 md:col-span-4">Every draft is reviewed and approved by your team before it goes out.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Card title="Today" live items={AI_NOW.map((x) => x.h)} />
          <Card title="Coming soon" live={false} muted items={AI_NEXT.map((x) => x.h)} />
        </div>
        <Link href="/ai/" className="link-u mt-6 inline-block text-[14px] text-white/70 hover:text-white">Full AI roadmap <Arr className="ml-1" /></Link>
      </div>
    </section>
  );
}

export function AIDetail() {
  const Col = ({ t, live, xs }: { t: string; live: boolean; xs: typeof AI_NOW }) => (<div>
    <div className="flex items-baseline justify-between border-b border-white/25 pb-3"><h2 className="text-[15px] font-semibold">{t}</h2><Tag live={live} /></div>
    {xs.map((x) => (<div key={x.h} className="border-b border-white/10 py-6"><h3 className={`text-[20px] font-semibold tracking-tight ${live ? "" : "text-white/85"}`}>{x.h}</h3><p className="mt-1.5 max-w-[52ch] text-[15px] leading-[1.45] text-white/60">{x.p}</p></div>))}</div>);
  return (<div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10"><Col t="Today" live xs={AI_NOW} /><div><Col t="Coming soon" live={false} xs={AI_NEXT} /><p className="mono mt-4 text-[12px] uppercase tracking-[.14em] text-white/70">On our roadmap. No dates yet.</p></div></div>);
}

// Directory by category. Only what Linear/Notion verify: apps + web are live; FLE-124 covers API, webhooks,
// BI connections and an MCP server. HRIS, LMS and MES/ERP have no named connector on the roadmap, so they are
// listed as "through the API, coming soon" with no partner names or logos.
type It = { i: (p: { className?: string }) => React.ReactNode; h: string; p: string; live: boolean; href?: string };
const DIR: { cat: string; items: It[] }[] = [
  { cat: "Apps", items: [
    { i: I.phone, h: "iOS", p: "Film and learn on iPhone.", live: true, href: SITE.appStore },
    { i: I.phone, h: "Android", p: "Film and learn on Android.", live: true, href: SITE.googlePlay },
    { i: I.web, h: "Web platform", p: "Managers assign jobs and track readiness.", live: true } ] },
  { cat: "BI & reporting", items: [ { i: I.chart, h: "BI tools", p: "Connect training data to the BI tools you already use.", live: false } ] },
  { cat: "AI assistants (MCP)", items: [ { i: I.chat, h: "MCP server", p: "Ask your AI assistant which location isn’t ready.", live: false } ] },
  { cat: "API & webhooks", items: [ { i: I.plug, h: "REST API", p: "Read people, jobs, quiz results and readiness.", live: false }, { i: I.hook, h: "Webhooks", p: "Events when a quiz is passed or readiness changes.", live: false } ] },
  { cat: "HRIS · LMS · MES/ERP", items: [ { i: I.plug, h: "Through the API", p: "No named connectors yet. Tell us what you run.", live: false } ] },
];
export function Integrations() {
  const live = DIR[0].items; const soon = DIR.slice(1).flatMap((c) => c.items).filter((x) => x.h !== "Through the API");
  return (
    <section id="integrations" className="px-6 py-14 md:px-10 md:py-20" aria-labelledby="int-h">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8"><p className="eyebrow">Integrations</p>
            <h2 id="int-h" className="display mt-4 text-[clamp(2.6rem,5.6vw,5.6rem)]">Works where your team already is.</h2></div>
          <p className="text-[17px] leading-[1.4] text-white/60 md:col-span-4">Phones for the people doing the job, web for the people running it.</p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {live.map((x) => { const body = (<div className="flex h-full flex-col justify-between rounded-2xl bg-white/[.05] p-7 ring-1 ring-white/10 transition hover:bg-white/[.08]"><Tag live /><div className="mt-10"><p className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-tight">{x.h}</p><p className="mt-1 text-[14px] leading-[1.4] text-white/55">{x.p}</p></div></div>);
            return <li key={x.h}>{x.href ? <a href={x.href} target="_blank" rel="noopener" className="block h-full">{body}</a> : body}</li>; })}
        </ul>
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 md:flex-row md:items-baseline md:justify-between">
          <p className="text-[14px] text-white/45"><span className="mono mr-3 text-[11px] uppercase tracking-[.16em] text-white/70">Coming soon</span>{soon.map((x) => x.h).join(" · ")}</p>
          <Link href="/integrations/" className="link-u text-[14px] text-white/70 hover:text-white">All integrations <Arr className="ml-1" /></Link>
        </div>
      </div>
    </section>
  );
}

export function IntegrationsDetail() {
  return (<div className="mt-14 border-t border-white/15">
    {DIR.map((c) => (<div key={c.cat} className="grid gap-4 border-b border-white/15 py-7 md:grid-cols-12">
      <h2 className="mono text-[11px] uppercase tracking-[.18em] text-white/45 md:col-span-3">{c.cat}</h2>
      <ul className="grid gap-6 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
        {c.items.map((x) => (<li key={x.h}><p className={`text-[17px] font-semibold tracking-tight ${x.live ? "" : "text-white/70"}`}>{x.h}</p><div className="mt-1"><Tag live={x.live} /></div><p className="mt-2 text-[14px] leading-[1.4] text-white/55">{x.p}</p></li>))}
      </ul></div>))}
  </div>);
}

export function PricingTeaser() {
  const proof = [["App Store", "iPhone app is live", SITE.appStore], ["Google Play", "Android app is live", SITE.googlePlay], ["Product Hunt", "Launched on Product Hunt", SITE.productHunt]];
  return (
    <section id="pricing" className="px-6 py-14 md:px-10 md:py-20" aria-labelledby="pt-h">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7"><p className="eyebrow">Pricing</p><h2 id="pt-h" className="display mt-4 text-[clamp(2.4rem,5vw,4.8rem)]">Pricing that fits your floor.</h2></div>
          <div className="md:col-span-5"><p className="text-[17px] leading-[1.4] text-white/60">Priced per location, with unlimited operators.</p>
            <div className="mt-4 flex flex-wrap gap-3"><Link href="/pricing/" className="btn-p">See pricing <Arr className="ml-1" /></Link><a href={SITE.demo} className="btn-g">Book a demo</a></div></div>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => (<li key={p.id} className={`rounded-2xl p-7 ring-1 ${p.featured ? "bg-white/[.07] ring-white/20" : "bg-white/[.03] ring-white/10"}`}><p className="text-[18px] font-semibold tracking-tight">{p.name}</p><p className="mt-1 text-[14px] leading-[1.4] text-white/55">{p.for}</p><p className="mt-8 border-t border-white/10 pt-4 text-[13px] text-white/75">{p.price ?? "Price on request"}<span className="text-white/40"> · {PRICING.operators}</span></p></li>))}
        </ul>
        <ul aria-label="See for yourself" className="mt-10 grid gap-x-8 border-t border-white/10 pt-5 sm:grid-cols-3">
          {proof.map(([k, h, u]) => (<li key={k}><a href={u} target="_blank" rel="noopener" className="group flex items-baseline justify-between gap-4 py-2"><span><span className="mono block text-[10px] uppercase tracking-[.18em] text-white/40">{k}</span><span className="mt-1 block text-[15px] font-medium">{h}</span></span><span aria-hidden="true" className="text-white/40 transition group-hover:text-white"><Arr dir="ur" /></span></a></li>))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  const col = "mono mb-4 text-[11px] uppercase tracking-[.16em] text-white/60";
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
            <li><Link className={a} href="/blog/">Blog</Link></li><li><a className={a} href="mailto:hello@flexlore.com">Support</a></li><li><a className={a} href="mailto:hello@flexlore.com">hello@flexlore.com</a></li></ul></nav>
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
