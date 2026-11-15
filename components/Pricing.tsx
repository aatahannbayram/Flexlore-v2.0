"use client";
import { useState } from "react";
import { TrustNote } from "./trust/TrustNote";
import { PLANS, COMPARE, SITE, savePct } from "./config";
import { sendLead, leadDirect, type LeadType } from "./lead";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLocale, fmt } from "./i18n/LocaleProvider";
import { GetApp } from "./home/home5b";
import { QUOTE } from "./pages/copy-quote";
import { PRICING2, type PricingCopy, type Cell } from "./pages/copy-pricing";
import { ArrowRight, Check, LockSimple, CheckCircle, Plus, Lightning, EnvelopeSimple, Users, Package, Wrench, Buildings } from "./ui/icons";

const field = "block h-12 w-full rounded-[10px] border border-white/10 bg-[#262626] px-4 text-[16px] text-[#FAFAFA] outline-none transition-colors duration-150 placeholder:text-[#737373] focus:border-white/20";
const glassCard = "k-card rounded-[16px] border border-white/10";

/* Request form: one form for the Enterprise quote and the add-ons. The type picked beside it (or by an add-on button)
 * goes with the request; components/lead.ts sends it to HubSpot, PostHog, GA4 and Sentry, or to email as a fallback. */
function QuoteForm({ type, P }: { type: LeadType; P: PricingCopy | undefined }) {
  const { locale } = useLocale(); const q = QUOTE[locale];
  const [v, setV] = useState({ name: "", email: "", company: "", size: q.sizes[0], sector: q.sectors[0], sites: "", msg: "" });
  const [state, setState] = useState<"idle" | "busy" | "hubspot" | "mail">("idle");
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });
  const send = async (e: React.FormEvent) => {
    e.preventDefault(); setState("busy");
    const typeLabel = P ? P.opts[type][0] : q.subject;
    const r = await sendLead({ ...v, type, typeLabel, subject: P ? typeLabel : q.subject, labels: { size: q.size, sector: q.sector, sites: q.sites, msg: q.msg } });
    setState(r);
  };
  const L = ({ id, t, children }: { id: string; t: string; children: React.ReactNode }) => (
    <label htmlFor={id} className="block"><span className="mb-1.5 block text-[13px] font-medium text-[#A3A3A3]">{t}</span>{children}</label>);
  if (state === "hubspot" || state === "mail") return (
    <div role="status" className={`${glassCard} flex min-h-[320px] flex-col items-start justify-center gap-3 p-6 md:p-8`}>
      <CheckCircle size={28} aria-hidden="true" className="text-[#FAFAFA]" />
      <p className="max-w-[30rem] text-[18px] font-medium leading-7">{state === "hubspot" ? (P?.sent ?? q.note) : (P?.sentMail ?? q.note)}</p>
    </div>);
  return (
    <form onSubmit={send} className={`${glassCard} grid gap-4 p-5 sm:grid-cols-2 md:p-7`}>
      {P && <p className="text-[18px] font-medium leading-7 sm:col-span-2">{P.formH}<span className="ms-2 text-[14px] font-normal text-[#A3A3A3]">{P.opts[type][0]}</span></p>}
      <L id="q-name" t={q.name}><input id="q-name" required autoComplete="name" value={v.name} onChange={set("name")} className={field} /></L>
      <L id="q-email" t={q.email}><input id="q-email" required type="email" autoComplete="email" value={v.email} onChange={set("email")} className={field} /></L>
      <L id="q-company" t={q.company}><input id="q-company" required autoComplete="organization" value={v.company} onChange={set("company")} className={field} /></L>
      <L id="q-size" t={q.size}><select id="q-size" value={v.size} onChange={set("size")} className={`${field} appearance-none`}>{q.sizes.map((x) => <option key={x} className="bg-[#171717]">{x}</option>)}</select></L>
      <L id="q-sector" t={q.sector}><select id="q-sector" value={v.sector} onChange={set("sector")} className={`${field} appearance-none`}>{q.sectors.map((x) => <option key={x} className="bg-[#171717]">{x}</option>)}</select></L>
      <L id="q-sites" t={q.sites}><input id="q-sites" type="number" min={1} inputMode="numeric" value={v.sites} onChange={set("sites")} className={field} /></L>
      <div className="sm:col-span-2"><L id="q-msg" t={q.msg}><textarea id="q-msg" rows={4} value={v.msg} onChange={set("msg")} placeholder={q.msgPh} className={`${field} h-auto py-3`} /></L></div>
      <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
        <p className="flex items-center gap-2 text-[13px] text-[#737373]"><EnvelopeSimple size={15} aria-hidden="true" />{leadDirect() && P ? P.direct : q.note}</p>
        <button type="submit" disabled={state === "busy"} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#FAFAFA] px-5 text-[14px] font-medium text-[#111] transition-colors duration-150 hover:bg-white disabled:opacity-60">{P ? P.send : q.send}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></button>
      </div>
    </form>);
}

/* Pricing page, Krea layout with Flexlore tokens (2026-11-15). Quiet and static: no entrance, no number animation, no
 * hover lift; only 150ms colour changes. Background #111, cards #191919 with a faint top light and a 10% white hairline,
 * one warm glow from the top right of the hero. The recommended plan has an orange tab and an orange hairline, and the
 * only orange button. Content for English and Turkish comes from copy-pricing.ts; other locales fall back to their
 * dictionary until translated. */
const K = {
  card: "k-card rounded-[16px] border border-white/10",
  pillDark: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-[#262626] px-4 text-[14px] font-medium text-[#FAFAFA] transition-colors duration-150 hover:bg-[#2e2e2e]",
  pillLight: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FAFAFA] px-4 text-[14px] font-medium text-[#111] transition-colors duration-150 hover:bg-white",
  pillAccent: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#EC6726] px-4 text-[14px] font-medium text-white transition-[filter] duration-150 hover:brightness-[1.08]",
};
const money = (v: number) => { const r = Math.round(v * 100) / 100; return `$${Number.isInteger(r) ? r : r.toFixed(2)}`; };
const isUnl = (s: string) => /unlimited|sınırsız/i.test(s);

export default function Pricing() {
  const { d, locale } = useLocale(); const c = d.pricing; const t = d.pricingPage; const q = QUOTE[locale];
  const [yearly, setYearly] = useState(true); const [open, setOpen] = useState<number | null>(0); const [lead, setLead] = useState<LeadType>("enterprise");
  const pick = (k: LeadType) => { setLead(k); document.getElementById("quote")?.scrollIntoView({ block: "start" }); };
  const best = Math.max(...PLANS.map((p) => savePct(p) ?? 0));
  const cellMap: Record<string, string> = { "By number of users": t.cells.byUsers, Unlimited: t.cells.unlimited, "3 quizzes": t.cells.q3, "10 quizzes": t.cells.q10, "Talk to sales": t.cells.talk, Standard: t.cells.standard, Premium: t.cells.premium };
  const PC = PRICING2[locale]; void pick;
  const P: PricingCopy = PC ?? ({
    h1: t.h1, sub: t.sub, help: "", see: t.compareH, badge: fmt(c.upTo, { pct: best }), saveAmt: "", includes: "", soonH: t.soon, soon: [], fair: "",
    for: Object.fromEntries(PLANS.map((p) => [p.id, c.plans[p.id as keyof typeof c.plans][1]])), points: t.points as unknown as Record<string, string[]>,
    addonsH: "", addons: [], addonsNote: "", teamsH: t.entK, entP: t.entP, entCta: q.cta, entAlt: q.alt, custom: c.custom,
    compareH: t.compareH, feature: t.feature, groups: [{ h: "", rows: COMPARE.map((r, k) => [t.rows[k] ?? r.f, ...r.v.map((v) => (typeof v === "string" ? cellMap[v] ?? v : v))] as [string, Cell, Cell, Cell, Cell]) }],
    faqH: t.faqH, faq: t.faq as [string, string][], endH: t.endH, endP: t.endP,
  } as unknown as PricingCopy);
  const num = (x: string) => parseFloat(x.replace(/[^0-9.]/g, ""));
  const cell = (v: Cell) => v === true ? <Check size={16} aria-label="✓" className="mx-auto text-[#FAFAFA]" /> : v === false ? <span aria-label="–" className="text-[#737373]">–</span> : <span>{v}</span>;
  const featured = PLANS.findIndex((p) => p.featured);
  const prevOf: Record<string, string> = { pro: "free", proplus: "pro", enterprise: "proplus" };
  const users: Record<string, string> = { free: "3", pro: "10", proplus: "30" };
  const [mPlan, setMPlan] = useState("proplus"); const [mAll, setMAll] = useState(false);
  const renderPlan = (p: (typeof PLANS)[number], mobile = false) => { const id = p.id; const rec = !!p.featured; const pr = yearly ? p.yearly : p.monthly; const save = yearly ? savePct(p) : null;
            const amt = pr && p.monthly && yearly && save ? (num(p.monthly.now) - num(pr.now)) * 12 : 0;
            const checkout = (yearly ? (p as { checkoutYearly?: string | null }).checkoutYearly : p.checkout) ?? null;
            const pts = P.points[id] ?? []; const prev = prevOf[id]; const fair = P.fair && (pts.some(isUnl) || id === "enterprise");
            return (
            <li key={id} id={mobile ? undefined : `plan-${id}`} className="relative flex list-none flex-col">
              {rec && !mobile && <span className="absolute inset-x-0 -top-7 flex h-10 items-start justify-center rounded-t-[18px] k-grad pt-1.5 text-[12px] font-medium text-white">{c.recommended}</span>}
              <div className={`${K.card} relative isolate flex min-h-[248px] flex-col overflow-hidden p-6 ${rec ? "k-card-rec" : ""}`}>
                {/* Enterprise: an office photo under a dark scrim, so the white text on it stays easy to read. */}
                {id === "enterprise" && <><img src="/photos/ws-ofis-800.webp" srcSet="/photos/ws-ofis-800.webp 800w, /photos/ws-ofis-1600.webp 1600w" sizes="(min-width:1280px) 300px, (min-width:768px) 50vw, 100vw" alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_35%]" />
                  <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,17,17,.9)_0%,rgba(17,17,17,.74)_45%,rgba(17,17,17,.94)_100%)]" /></>}
                <h2 className="text-[24px] font-medium leading-8">{c.plans[id as keyof typeof c.plans][0]}</h2>
                <p className="text-[14px] leading-5 text-[#FAFAFA]">{id === "enterprise" ? c.enterpriseUsers : fmt(c.users, { n: users[id] })}</p>
                <p className={`mt-2 text-[14px] leading-5 ${id === "enterprise" ? "text-[#FAFAFA]/80" : "text-[#A3A3A3]"}`}>{P.for[id]}</p>
                <div className="mt-auto pt-8">
                  {pr ? <p className="flex flex-wrap items-baseline gap-x-2">
                      {yearly && save && p.monthly && <span className="text-[18px] text-[#737373] line-through">{p.monthly.now}</span>}
                      <span className="text-[28px] font-medium leading-none tracking-[-0.02em]">{pr.now}</span><span className="text-[12px] text-[#737373]">{c.perMo}</span></p>
                    : <p className="text-[28px] font-medium leading-none tracking-[-0.02em]">{P.custom}</p>}
                  <p className="mt-2 min-h-4 text-[12px] text-[#737373]">{pr && id !== "free" ? (yearly && save ? fmt(c.yrNote, { total: money(num(pr.now) * 12) }) : c.moNote) : id === "free" ? c.free : c.contact}</p>
                </div>
              </div>
              <div className="mt-3">
                {id === "enterprise"
                  ? <a href="#quote" onClick={() => setLead("enterprise")} className={K.pillLight}>{P.entCta}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>
                  : <GetApp checkout={checkout} label={id === "free" ? c.start : c.choose} cls={rec ? K.pillAccent : K.pillDark} />}
              </div>
              <p className="mt-2.5 min-h-5 text-center text-[13px] text-[#737373]">{amt > 0 ? (P.saveAmt
                ? (() => { const [a, b] = P.saveAmt.split("{amt}"); return <>{a}<b className="font-medium text-[#FAFAFA]">{money(amt)}</b>{b}</>; })()
                : <b className="font-medium text-[#FAFAFA]">{fmt(c.save, { pct: save ?? 0 })}</b>) : null}</p>
              <div className="mt-5 px-1">
                <p className="min-h-5 text-[13px] text-[#A3A3A3]">{prev ? fmt(c.plus, { plan: c.plans[prev as keyof typeof c.plans][0] }) : P.includes}</p>
                <ul className="mt-3 space-y-2.5 text-[14px] leading-5">{pts.map((f) => <li key={f} className="flex items-start gap-2.5 text-[#FAFAFA]/90"><Check size={14} aria-hidden="true" className="mt-[3px] shrink-0 text-[#737373]" />
                  <span>{f}{P.fair && isUnl(f) && <span aria-hidden="true" className="text-[#737373]"> *</span>}</span></li>)}</ul>
                {id === "enterprise" && P.soon.length > 0 && <>
                  <p className="mt-5 text-[13px] text-[#A3A3A3]">{P.soonH}</p>
                  <ul className="mt-3 space-y-2.5 text-[14px] leading-5">{P.soon.map((f) => <li key={f} className="flex flex-wrap items-center gap-2 text-[#FAFAFA]/70"><Lightning size={14} aria-hidden="true" className="shrink-0 text-[#737373]" />{f}<span className="rounded-full bg-white/[.15] px-1.5 py-px text-[12px] font-medium uppercase tracking-[.02em] text-[#FAFAFA]">{t.soon}</span></li>)}</ul></>}
                {fair && <p className="mt-4 text-[12px] text-[#737373]">* {P.fair}</p>}
              </div>
            </li>); };

  return (<>
    <Header />
    <main id="main" className="k-page relative isolate overflow-x-clip bg-[#111] pt-[calc(var(--header-h)+40px)] text-[#FAFAFA]">
      <span aria-hidden="true" className="k-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px]" />

      {/* Hero: title on the left, billing switch with a help link on one row. */}
      <section className="mx-auto max-w-[1280px] px-4 md:px-8">
        <h1 className="text-[30px] font-medium leading-[38px] tracking-[-0.025em] md:text-[36px] md:leading-[40px]">{P.h1}</h1>
        <p className="mt-2 text-[14px] leading-5 text-[#FAFAFA]/85">{P.sub}</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <div role="group" aria-label={c.billing} className="inline-flex rounded-full border border-white/10 bg-white/[.06] p-1">
            <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)} className={`inline-flex h-11 items-center rounded-full px-6 text-[14px] font-medium transition-colors duration-150 ${!yearly ? "bg-[#FAFAFA] text-[#111]" : "text-[#FAFAFA]/80 hover:text-[#FAFAFA]"}`}>{c.monthly}</button>
            <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)} className={`inline-flex h-11 items-center gap-2 rounded-full px-6 text-[14px] font-medium transition-colors duration-150 ${yearly ? "bg-[#FAFAFA] text-[#111]" : "text-[#FAFAFA]/80 hover:text-[#FAFAFA]"}`}>{c.yearly}
              {best > 0 && <span className="rounded-full k-grad px-2 py-0.5 text-[12px] font-medium uppercase tracking-[.02em] text-white">{P.badge}</span>}</button>
          </div>
          {P.help && <a href={SITE.demo} className="inline-flex min-h-11 items-center text-[14px] font-medium text-[#FAFAFA]/85 transition-colors duration-150 hover:text-[#FAFAFA]">{P.help}</a>}
        </div>

        {/* Plans: card (name, users, who it is for, price at the foot), button under it, saving, then the list. */}
        <ul className="mt-12 grid gap-4 max-md:hidden md:grid-cols-2 xl:grid-cols-4" aria-label={c.k}>
          {PLANS.map((p) => renderPlan(p))}
        </ul>
        {/* Mobile: an app-like view. One plan at a time picked from a segmented bar (ProPlus first), its card, button and
            list, then its full feature list on demand instead of the wide comparison table. */}
        <div className="mt-8 md:hidden">
          <div role="tablist" aria-label={c.k} className="grid grid-cols-4 gap-1 rounded-[14px] border border-white/10 bg-white/[.04] p-1">
            {PLANS.map((p) => { const on = mPlan === p.id; return (
              <button key={p.id} type="button" role="tab" aria-selected={on} onClick={() => { setMPlan(p.id); setMAll(false); }}
                className={`relative flex min-h-11 flex-col items-center justify-center rounded-[10px] px-1 text-[13px] font-medium transition-colors duration-150 ${on ? "bg-[#FAFAFA] text-[#111]" : "text-[#FAFAFA]/75"}`}>
                {c.plans[p.id as keyof typeof c.plans][0]}
                {p.featured && <span aria-hidden="true" className={`absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full ${on ? "bg-[#EC6726]" : "bg-[#EC6726]/80"}`} />}
              </button>); })}
          </div>
          {PLANS.find((p) => p.id === mPlan)?.featured && <p className="mt-3 text-center text-[13px] font-medium text-[#FF8652]">{c.recommended}</p>}
          <ul className="mt-4" aria-label={c.plans[mPlan as keyof typeof c.plans][0]}>{renderPlan(PLANS.find((p) => p.id === mPlan)!, true)}</ul>
          <div className="mt-6 border-t border-white/10 pt-2">
            <button type="button" aria-expanded={mAll} onClick={() => setMAll(!mAll)} className="flex min-h-12 w-full items-center justify-between text-[15px] font-medium">
              {P.see}<Plus size={15} aria-hidden="true" className={`text-[#A3A3A3] ${mAll ? "rotate-45" : ""}`} /></button>
            {mAll && <div className="pb-2">{P.groups.map((g) => (
              <div key={g.h || "all"} className="mt-3">
                {g.h && <p className="pb-1 text-[13px] font-medium text-[#A3A3A3]">{g.h}</p>}
                <ul>{g.rows.map(([f, ...v]) => { const x = v[PLANS.findIndex((p) => p.id === mPlan)]; return (
                  <li key={f} className="flex min-h-11 items-center justify-between gap-4 border-b border-white/[.07] py-2 text-[14px]"><span className="text-[#FAFAFA]/85">{f}</span><span className="shrink-0 text-end">{x === true ? <Check size={16} aria-label="✓" /> : x === false ? <span aria-label="–" className="text-[#737373]">–</span> : x}</span></li>); })}</ul>
              </div>))}</div>}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-4">
          <a href="#compare" className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-[#A3A3A3] max-md:hidden transition-colors duration-150 hover:text-[#FAFAFA]">{P.see}<ArrowRight size={14} aria-hidden="true" className="rotate-90" /></a>
          <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[#737373]">
            <span className="flex items-center gap-1.5"><LockSimple size={14} />{c.secure}</span><span className="flex items-center gap-1.5"><CheckCircle size={14} />{c.cancel}</span><span>{c.appNote}</span></p>
        </div>
      </section>

      {/* Add-ons and Enterprise in one place: pick what you need on the left, the request form on the right. */}
      <section id="quote" aria-labelledby="quote-h" className="mx-auto mt-24 max-w-[1280px] scroll-mt-24 px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-10">
          <div>
            <h2 id="quote-h" className="text-[24px] font-medium leading-8">{PC ? PC.addonsH : q.h}</h2>
            <p className="mt-2 max-w-[30rem] text-[14px] leading-5 text-[#A3A3A3]">{PC ? PC.addonsP : q.p}</p>
            {PC && <div role="radiogroup" aria-label={PC.addonsH} className="mt-6 grid grid-cols-2 gap-3">
              {(["enterprise", "users", "storage", "setup"] as const).map((k) => { const on = lead === k; const I = { enterprise: Buildings, users: Users, storage: Package, setup: Wrench }[k]; return (
                <button key={k} type="button" role="radio" aria-checked={on} onClick={() => setLead(k)}
                  className={`relative flex min-h-[132px] flex-col items-start rounded-[16px] border p-4 text-start transition-colors duration-150 ${on ? "border-[rgba(236,103,38,.7)] bg-[linear-gradient(180deg,rgba(236,103,38,.14),rgba(236,103,38,.03))]" : "border-white/10 bg-white/[.03] hover:border-white/20 hover:bg-white/[.05]"}`}>
                  <span aria-hidden="true" className={`grid h-9 w-9 place-items-center rounded-[10px] ${on ? "bg-[#EC6726] text-white" : "bg-white/[.07] text-[#FAFAFA]"}`}><I size={17} /></span>
                  <span aria-hidden="true" className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full ${on ? "bg-[#EC6726] text-white" : "border border-white/20"}`}>{on && <Check size={12} />}</span>
                  <span className="mt-auto block pt-4 text-[15px] font-medium leading-5">{PC.opts[k][0]}</span>
                  <span className="mt-1 block text-[13px] leading-[18px] text-[#A3A3A3]">{PC.opts[k][1]}</span>
                </button>); })}
            </div>}
            {PC && <p className="mt-3 text-[12px] text-[#737373]">{PC.addonsNote}</p>}
            <TrustNote className="mt-4" />
          </div>
          <QuoteForm type={lead} P={PC} />
        </div>
      </section>

      {/* Full comparison, grouped like Krea's feature table. */}
      <section id="compare" aria-labelledby="cmp-h" className="mx-auto mt-24 max-w-[1280px] scroll-mt-24 px-4 max-md:hidden md:px-8">
        <h2 id="cmp-h" className="text-[24px] font-medium leading-8">{P.compareH}</h2>
        <div className="no-sb mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-start text-[14px] leading-5">
            <thead className="sticky top-0"><tr className="border-b border-white/10">
              <th className="w-[32%] py-4 pe-4 text-start font-medium text-[#A3A3A3]">{P.feature}</th>
              {PLANS.map((p, i) => <th key={p.id} className={`py-4 text-center text-[16px] font-medium ${i === featured ? "text-[#FAFAFA]" : "text-[#FAFAFA]/85"}`}>{c.plans[p.id as keyof typeof c.plans][0]}</th>)}</tr></thead>
            {P.groups.map((g) => (
              <tbody key={g.h || "all"}>
                {g.h && <tr><th colSpan={5} scope="colgroup" className="pb-2 pt-8 text-start text-[18px] font-medium leading-7">{g.h}</th></tr>}
                {g.rows.map(([f, ...v]) => <tr key={f} className="border-b border-white/[.07]"><td className="py-3.5 pe-4 text-[#A3A3A3]">{f}</td>
                  {v.map((x, i) => <td key={i} className={`py-3.5 text-center ${i === featured ? "bg-white/[.03]" : ""}`}>{cell(x)}</td>)}</tr>)}
              </tbody>))}
          </table>
        </div>
        {P.fair && <p className="mt-3 text-[12px] text-[#737373]">{P.fair}</p>}
      </section>

      <section aria-labelledby="pfaq-h" className="mx-auto mt-24 max-w-[1280px] px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[4fr_8fr]">
          <h2 id="pfaq-h" className="text-[24px] font-medium leading-8">{P.faqH}</h2>
          <ul className="border-t border-white/10">
            {P.faq.map(([qq, a], i) => { const on = open === i; return (
              <li key={qq} className="border-b border-white/10">
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="flex min-h-14 w-full items-center justify-between gap-6 py-4 text-start text-[16px] font-medium">
                  {qq}<Plus size={15} aria-hidden="true" className={`shrink-0 text-[#A3A3A3] ${on ? "rotate-45" : ""}`} /></button>
                {on && <p className="max-w-[44rem] pb-5 text-[14px] leading-[22px] text-[#A3A3A3]">{a}</p>}
              </li>); })}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-24 pt-24 md:px-8">
        <div className="relative isolate flex flex-col items-start gap-6 overflow-hidden rounded-[16px] border border-white/10 p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <img src="/photos/ws-mutfak-1600.webp" srcSet="/photos/ws-mutfak-800.webp 800w, /photos/ws-mutfak-1600.webp 1600w" sizes="(min-width:1280px) 1216px, 100vw" alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_40%]" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,17,17,.92)_0%,rgba(17,17,17,.78)_50%,rgba(17,17,17,.55)_100%)] max-md:bg-[rgba(17,17,17,.8)]" />
          <div><h2 className="text-[24px] font-medium leading-8">{P.endH}</h2><p className="mt-1 text-[14px] leading-5 text-[#FAFAFA]/80">{P.endP}</p></div>
          <div className="flex flex-wrap gap-3">
            <a href={SITE.demo} className={`${K.pillLight} !w-auto px-6`}>{d.nav.cta}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>
            <a href="#quote" onClick={() => setLead("enterprise")} className={`${K.pillDark} !w-auto px-6`}>{q.cta}</a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>);
}
