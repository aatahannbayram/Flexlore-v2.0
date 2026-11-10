"use client";
import Link from "next/link";
import { I, Arr } from "./Icons";
import { SITE } from "./config";
import { PhotoBand, glassTile } from "./ui/PhotoBand";

const Tag = ({ live }: { live: boolean }) => (
  <span className={`mono inline-flex items-center gap-1.5 text-xs uppercase tracking-[.16em] ${live ? "text-white" : "text-white/70"}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-ice-100" : "bg-white/40"}`} />{live ? "Live" : "Coming soon"}</span>);

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
  <div className={`rounded-2xl p-7 md:p-9 ${muted ? "bg-white/[.025]  " : "bg-white/[.05]  "}`}>
    <div className="flex items-baseline justify-between"><h3 className="text-base font-semibold">{title}</h3><Tag live={live} /></div>
    <ol className="mt-8 space-y-4">{items.map((h, i) => (<li key={h} className="flex items-baseline gap-4"><span className="mono w-6 text-xs tabular-nums text-white/70">{String(i + 1).padStart(2, "0")}</span><span className={`text-lg font-semibold tracking-tight ${muted ? "text-white/70" : "text-white"}`}>{h}</span></li>))}</ol>
  </div>);

export function AISection() {
  return (
    <section id="ai" className="py-14 md:py-20" aria-labelledby="ai-h">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8"><p className="eyebrow">AI</p>
            <h2 id="ai-h" className="display mt-4 max-w-[15ch] text-h1">AI does the paperwork. Your experts have the final say.</h2></div>
          <p className="text-base leading-[1.4] text-white/70 md:col-span-4">Every draft is reviewed and approved by your team before it goes out.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Card title="Today" live items={AI_NOW.map((x) => x.h)} />
          <Card title="Coming soon" live={false} muted items={AI_NEXT.map((x) => x.h)} />
        </div>
        <Link href="/ai/" className="mt-6 inline-block text-sm text-white/70 hover:text-white">Full AI roadmap <Arr className="ml-1" /></Link>
      </div>
    </section>
  );
}

/* AI page body: today and coming soon as two glass tiles over a dimmed photo of a phone filming a step. */
export function AIDetail() {
  const Col = ({ t, live, xs }: { t: string; live: boolean; xs: typeof AI_NOW }) => (
    <div className={`${glassTile} p-6 md:p-8`}>
      <div className="flex items-center justify-between gap-3"><h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">{t}</h2><Pill live={live} /></div>
      <ul className="mt-4 divide-y divide-white/10">{xs.map((x) => (<li key={x.h} className="flex gap-4 py-5 last:pb-0"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-white/10 text-white"><x.i size={18} /></span>
        <div><h3 className={`text-[18px] font-semibold tracking-[-0.015em] ${live ? "" : "text-white/85"}`}>{x.h}</h3><p className="mt-1.5 max-w-[52ch] text-[15px] leading-[1.55] text-white/70">{x.p}</p></div></li>))}</ul>
    </div>);
  return (<PhotoBand img="food-qa" pos="50% 40%" className="mt-12 p-3 md:mt-16 md:p-5">
    <div className="grid gap-3 md:grid-cols-2"><Col t="Today" live xs={AI_NOW} /><Col t="Coming soon" live={false} xs={AI_NEXT} /></div>
    <p className="px-3 pb-2 pt-5 text-[13px] text-white/60">On our roadmap. No dates yet.</p>
  </PhotoBand>);
}
const Pill = ({ live }: { live: boolean }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${live ? "bg-[#F4F0EB] text-[#111]" : "bg-white/10 text-white/75"}`}>{live ? "Live" : "Coming soon"}</span>);

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
    <section id="integrations" className="py-14 md:py-20" aria-labelledby="int-h">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8"><p className="eyebrow">Integrations</p>
            <h2 id="int-h" className="display mt-4 text-h1">Works where your team already is.</h2></div>
          <p className="text-base leading-[1.4] text-white/70 md:col-span-4">Phones for the people doing the job, web for the people running it.</p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {live.map((x) => { const body = (<div className="flex h-full flex-col justify-between rounded-2xl bg-white/[.05] p-7 transition hover:bg-white/[.08]"><Tag live /><div className="mt-10"><p className="text-h3 font-semibold tracking-tight">{x.h}</p><p className="mt-1 text-sm leading-[1.4] text-white/70">{x.p}</p></div></div>);
            return <li key={x.h}>{x.href ? <a href={x.href} target="_blank" rel="noopener" className="block h-full">{body}</a> : body}</li>; })}
        </ul>
        <div className="mt-6 flex flex-col gap-3 pt-5 md:flex-row md:items-baseline md:justify-between">
          <p className="text-sm text-white/70"><span className="mono mr-3 text-xs uppercase tracking-[.16em] text-white/70">Coming soon</span>{soon.map((x) => x.h).join(" · ")}</p>
          <Link href="/integrations/" className="text-sm text-white/70 hover:text-white">All integrations <Arr className="ml-1" /></Link>
        </div>
      </div>
    </section>
  );
}

/* Integrations page body: every category as a glass tile over the dimmed web dashboard mockup. */
export function IntegrationsDetail() {
  return (<PhotoBand img="/photos/cta-dashboard.webp" pos="50% 30%" dim={0.5} tone="center" className="mt-12 p-3 md:mt-16 md:p-5">
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {DIR.map((c, k) => (<div key={c.cat} className={`${glassTile} p-6 md:p-7 ${k === 0 ? "md:col-span-2 lg:col-span-4" : ""}`}>
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">{c.cat}</h2>
        <ul className={`mt-5 grid gap-5 ${k === 0 ? "sm:grid-cols-3" : ""}`}>
          {c.items.map((x) => { const body = (<div className="flex gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-white/10 text-white"><x.i className="h-[18px] w-[18px]" /></span>
            <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="text-[17px] font-semibold tracking-[-0.01em]">{x.h}</p><Pill live={x.live} /></div><p className="mt-1.5 text-[14px] leading-[1.5] text-white/70">{x.p}</p></div></div>);
            return <li key={x.h}>{x.href ? <a href={x.href} target="_blank" rel="noopener" className="block rounded-[14px] transition-opacity hover:opacity-80">{body}</a> : body}</li>; })}
        </ul></div>))}
    </div>
  </PhotoBand>);
}

export { Footer } from "./Footer";
