"use client";
import Link from "next/link";
import { I, Arr } from "./Icons";
import { SITE } from "./config";

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

export function AIDetail() {
  const Col = ({ t, live, xs }: { t: string; live: boolean; xs: typeof AI_NOW }) => (<div>
    <div className="flex items-baseline justify-between pb-3"><h2 className="text-base font-semibold">{t}</h2><Tag live={live} /></div>
    {xs.map((x) => (<div key={x.h} className="py-6"><h3 className={`text-lg font-semibold tracking-tight ${live ? "" : "text-white/85"}`}>{x.h}</h3><p className="mt-1.5 max-w-[52ch] text-base leading-[1.45] text-white/70">{x.p}</p></div>))}</div>);
  return (<div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10"><Col t="Today" live xs={AI_NOW} /><div><Col t="Coming soon" live={false} xs={AI_NEXT} /><p className="mono mt-4 text-xs uppercase tracking-[.14em] text-white/70">On our roadmap. No dates yet.</p></div></div>);
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

export function IntegrationsDetail() {
  return (<div className="mt-14">
    {DIR.map((c) => (<div key={c.cat} className="grid gap-4 py-7 md:grid-cols-12">
      <h2 className="mono text-xs uppercase tracking-[.18em] text-white/70 md:col-span-3">{c.cat}</h2>
      <ul className="grid gap-6 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
        {c.items.map((x) => (<li key={x.h}><p className={`text-base font-semibold tracking-tight ${x.live ? "" : "text-white/70"}`}>{x.h}</p><div className="mt-1"><Tag live={x.live} /></div><p className="mt-2 text-sm leading-[1.4] text-white/70">{x.p}</p></li>))}
      </ul></div>))}
  </div>);
}

export { Footer } from "./Footer";
