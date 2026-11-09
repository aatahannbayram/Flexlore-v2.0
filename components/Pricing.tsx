"use client";
/* Pricing page. Glass plan cards (the recommended one lit from the top edge, not filled), yearly selected by default,
 * all copy from the locale dictionary. Enterprise gets its own photo section with the three tiers and a quote request
 * form (#quote) that opens the visitor's email app with a filled message. Checkout: each plan's `checkout` /
 * `checkoutYearly` in config.ts takes a Stripe Payment Link; until one is set, the button falls back to the app flow. */
import { useState } from "react";
import { PLANS, COMPARE, SITE, ENTERPRISE_TIERS } from "./config";
import { Header } from "./Header";
import { Footer } from "./Sections";
import Copq from "./Copq";
import { useLocale, fmt } from "./i18n/LocaleProvider";
import { BillingSwitch, PlanCard } from "./home/home5b";
import { QUOTE } from "./pages/copy-quote";
import { ArrowRight, Check, Buildings, LockSimple, CheckCircle, Plus, Tag, Lightning, EnvelopeSimple } from "./ui/icons";

/** Heading with the house style: silver words, the last third in orange. */
function Split({ text }: { text: string }) {
  const w = text.split(" "); const n = w.length - Math.max(1, Math.ceil(w.length / 3));
  return <><span className="t-ink">{w.slice(0, n).join(" ")}</span> <span className="t-accent">{w.slice(n).join(" ")}</span></>;
}
const field = "block h-12 w-full rounded-[14px] bg-white/[.05] px-4 text-[16px] text-ink ring-1 ring-inset ring-white/10 outline-none transition-shadow placeholder:text-ink-faint";
const glassCard = "rounded-[28px] bg-[var(--card)]";

function QuoteForm() {
  const { locale } = useLocale(); const q = QUOTE[locale];
  const [v, setV] = useState({ name: "", email: "", company: "", size: q.sizes[0], sector: q.sectors[0], sites: "", msg: "" });
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [`${q.name}: ${v.name}`, `${q.email}: ${v.email}`, `${q.company}: ${v.company}`, `${q.size}: ${v.size}`, `${q.sector}: ${v.sector}`, `${q.sites}: ${v.sites}`, "", `${q.msg}`, v.msg].join("\n");
    window.location.href = `mailto:support@flexlore.com?subject=${encodeURIComponent(`${q.subject}: ${v.company}`)}&body=${encodeURIComponent(body)}`;
  };
  const L = ({ id, t, children }: { id: string; t: string; children: React.ReactNode }) => (
    <label htmlFor={id} className="block"><span className="mb-1.5 block text-[13px] font-medium text-ink-muted">{t}</span>{children}</label>);
  return (
    <form onSubmit={send} className={`${glassCard} grid gap-4 p-5 sm:grid-cols-2 md:p-7`}>
      <L id="q-name" t={q.name}><input id="q-name" required autoComplete="name" value={v.name} onChange={set("name")} className={field} /></L>
      <L id="q-email" t={q.email}><input id="q-email" required type="email" autoComplete="email" value={v.email} onChange={set("email")} className={field} /></L>
      <L id="q-company" t={q.company}><input id="q-company" required autoComplete="organization" value={v.company} onChange={set("company")} className={field} /></L>
      <L id="q-size" t={q.size}><select id="q-size" value={v.size} onChange={set("size")} className={`${field} appearance-none`}>{q.sizes.map((x) => <option key={x} className="bg-[#171717]">{x}</option>)}</select></L>
      <L id="q-sector" t={q.sector}><select id="q-sector" value={v.sector} onChange={set("sector")} className={`${field} appearance-none`}>{q.sectors.map((x) => <option key={x} className="bg-[#171717]">{x}</option>)}</select></L>
      <L id="q-sites" t={q.sites}><input id="q-sites" type="number" min={1} inputMode="numeric" value={v.sites} onChange={set("sites")} className={field} /></L>
      <div className="sm:col-span-2"><L id="q-msg" t={q.msg}><textarea id="q-msg" rows={4} value={v.msg} onChange={set("msg")} placeholder={q.msgPh} className={`${field} h-auto py-3`} /></L></div>
      <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
        <p className="flex items-center gap-2 text-[13px] text-ink-faint"><EnvelopeSimple size={15} aria-hidden="true" />{q.note}</p>
        <button type="submit" className="btn btn-primary h-11 px-5 text-[15px]">{q.send}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></button>
      </div>
    </form>);
}

export default function Pricing() {
  const { d, lang, locale } = useLocale(); const c = d.pricing; const t = d.pricingPage; const q = QUOTE[locale];
  const [yearly, setYearly] = useState(true); const [cmp, setCmp] = useState(false); const [open, setOpen] = useState<number | null>(0);
  const cell = (v: boolean | string) => {
    if (v === true) return <Check size={18} aria-label="✓" className="tick mx-auto" />;
    if (v === false) return <span className="text-ink-faint">–</span>;
    const map: Record<string, string> = { "By number of users": t.cells.byUsers, Unlimited: t.cells.unlimited, "3 quizzes": t.cells.q3, "10 quizzes": t.cells.q10, "Talk to sales": t.cells.talk, Standard: t.cells.standard, Premium: t.cells.premium };
    return <span>{map[v] ?? v}</span>;
  };
  const tiers = ENTERPRISE_TIERS.map((x) => ({ ...x, pts: t.tiers[x.id as "starter" | "growth" | "scale"], soon: x.id === "scale" ? t.tiers.scaleSoon : [] }));
  const featured = PLANS.findIndex((p) => p.featured);
  return (<>
    <Header />
    <main id="main" className="home-v3 relative pt-[calc(var(--header-h)+64px)]">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgb(244_240_235/0.09)_0%,rgb(244_240_235/0)_70%)]" />
      <section className="container-x">
        <div className="mx-auto max-w-[52rem] text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-[var(--card)] py-1.5 pe-4 ps-1.5 text-[14px] font-medium text-ink-muted"><span className="grid h-7 w-7 place-items-center rounded-full bg-white/[.08] text-ink"><Tag size={14} /></span>{t.k}</p>
          <h1 className="mx-auto mt-6 max-w-[22ch] text-[clamp(38px,1rem+3.4vw,72px)] font-semibold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]"><Split text={t.h1} /></h1>
          <p className="mx-auto mt-6 max-w-[34rem] text-[17px] leading-[1.6] text-ink-muted md:text-[18px]">{t.sub}</p>
          <div className="mt-10 flex justify-center"><BillingSwitch yearly={yearly} setYearly={setYearly} id="pricing" /></div>
        </div>
        <ul className="mt-14 grid gap-3 md:grid-cols-2 xl:grid-cols-4" aria-label={c.k}>
          {PLANS.map((p) => <PlanCard key={p.id} id={p.id} yearly={yearly} full />)}
        </ul>
        <p className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-ink-faint">
          <span className="flex items-center gap-1.5"><LockSimple size={15} />{c.secure}</span><span className="flex items-center gap-1.5"><CheckCircle size={15} className="tick" />{c.cancel}</span><span>{c.appNote}</span>
        </p>
      </section>

      {/* Enterprise: a photo band with the tiers, then the quote request. */}
      <section id="enterprise" aria-labelledby="ent-h" className="container-x mt-28 md:mt-36">
        <div className="dark relative isolate overflow-hidden rounded-[32px] bg-[#141414] p-6 text-white md:p-12">
          <picture className="absolute inset-0 -z-10"><source type="image/avif" srcSet="/photos/huddle-1600.avif" /><img src="/photos/huddle-1600.webp" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-[50%_35%] opacity-45 saturate-[0.75]" /></picture>
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(14_14_14/0.95)_0%,rgb(14_14_14/0.8)_50%,rgb(14_14_14/0.55)_100%)] rtl:bg-[linear-gradient(260deg,rgb(14_14_14/0.95)_0%,rgb(14_14_14/0.8)_50%,rgb(14_14_14/0.55)_100%)]" />
          <div className="grid-12 items-end gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <p className="inline-flex items-center gap-2.5 text-[14px] font-medium text-white/70"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-white/10 ring-1 ring-inset ring-white/15"><Buildings size={16} /></span>{t.entK}</p>
              <h2 id="ent-h" className="v4-h2 mt-5 max-w-[20ch]"><Split text={t.entH} /></h2>
              <p className="mt-5 max-w-[34rem] text-[16px] leading-[1.6] text-white/70 md:text-[17px]">{t.entP}</p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-white/85">{q.bullets.map((b) => <li key={b} className="flex items-center gap-2"><Check size={16} aria-hidden="true" className="tick" />{b}</li>)}</ul>
            </div>
            <div className="col-span-12 flex flex-wrap gap-3 lg:col-span-5 lg:justify-self-end">
              <a href="#quote" className="btn btn-primary h-11 px-5 text-[15px]">{q.cta}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></a>
              <a href={SITE.demo} className="btn btn-glass-2 h-11 px-5 text-[15px]">{q.alt}</a>
            </div>
          </div>
          <ul className="mt-10 grid gap-3 md:grid-cols-3">
            {tiers.map((x) => (
              <li key={x.id} className="flex flex-col rounded-[22px] bg-white/[.06] p-6 ring-1 ring-inset ring-white/10 backdrop-blur-xl">
                <p className="text-[16px] font-semibold text-white/85">Enterprise {x.name}</p>
                <p className="mt-4 text-[32px] font-semibold leading-none tracking-[-.04em]">{x.custom ? c.custom : <>{x.price}<span className="ms-1 text-[14px] font-normal text-white/60">{c.perMo}</span></>}</p>
                <p className="mt-2 text-[14px] text-white/60">{fmt(t.entUsers, { n: x.users })}</p>
                <ul className="mt-5 space-y-2 text-[14px] text-white/75">
                  {x.pts.map((y) => <li key={y} className="flex items-start gap-2.5"><Check size={15} className="tick mt-0.5 shrink-0" />{y}</li>)}
                  {x.soon.map((y) => <li key={y} className="flex flex-wrap items-center gap-2.5"><Lightning size={15} className="shrink-0 text-white/45" />{y}<span className="rounded-full bg-white/10 px-2 py-0.5 text-[12px] font-semibold text-white/70">{t.soon}</span></li>)}
                </ul>
              </li>))}
          </ul>
        </div>
      </section>

      <section id="quote" aria-labelledby="quote-h" className="container-x mt-6 scroll-mt-28">
        <div className="grid-12 gap-y-8 pt-14 md:pt-20">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{q.k}</p>
            <h2 id="quote-h" className="v4-h2 mt-4 max-w-[16ch]"><Split text={q.h} /></h2>
            <p className="mt-5 max-w-[30rem] text-[16px] leading-[1.6] text-ink-muted">{q.p}</p>
            <a href={SITE.demo} className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold">{q.alt}<ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" /></a>
          </div>
          <div className="col-span-12 lg:col-span-7"><QuoteForm /></div>
        </div>
      </section>

      <section aria-labelledby="cmp-h" className="container-x mt-28 md:mt-36">
        <h2 id="cmp-h" className="v4-h2"><Split text={t.compareH} /></h2>
        <button type="button" aria-expanded={cmp} aria-controls="cmp-table" onClick={() => setCmp(!cmp)} className="btn btn-secondary mt-6 md:hidden">{cmp ? t.hide : t.show}</button>
        <div id="cmp-table" className={`no-sb mt-10 overflow-x-auto ${glassCard} p-2 ${cmp ? "block" : "hidden"} md:block`}>
          <table className="w-full min-w-[680px] border-collapse text-start text-[14px]">
            <thead><tr><th className="px-4 py-4 text-start font-medium text-ink-muted">{t.feature}</th>{PLANS.map((p, i) => <th key={p.id} className={`w-[18%] py-4 text-center font-semibold ${i === featured ? "rounded-t-[16px] bg-white/[.05] text-ink" : "text-ink-muted"}`}>{c.plans[p.id as keyof typeof c.plans][0]}</th>)}</tr></thead>
            <tbody>{COMPARE.map((r, k) => <tr key={r.f} className="border-t border-line"><td className="px-4 py-3.5 text-ink-muted">{t.rows[k] ?? r.f}</td>{r.v.map((v, i) => <td key={i} className={`py-3.5 text-center ${i === featured ? "bg-white/[.05]" : ""}`}>{cell(v)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
    </main>
    <div className="mt-28 md:mt-36"><Copq lang={lang} /></div>
    <section aria-labelledby="pfaq-h" className="section-y">
      <div className="container-x grid-12 gap-y-10">
        <h2 id="pfaq-h" className="v4-h2 col-span-12 lg:col-span-4"><Split text={t.faqH} /></h2>
        <ul className="col-span-12 space-y-2 lg:col-span-7 lg:col-start-6">
          {t.faq.map(([qq, a], i) => { const on = open === i; return (
            <li key={qq} className={`rounded-[20px] transition-colors ${on ? "bg-[var(--card)]" : "hover:bg-white/[.03]"}`}>
              <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="flex min-h-16 w-full items-center justify-between gap-6 px-5 py-4 text-start text-[17px] font-semibold md:px-6">
                {qq}<span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[.07] text-ink-muted transition-transform ${on ? "rotate-45" : ""}`}><Plus size={15} aria-hidden="true" /></span></button>
              {on && <p className="measure px-5 pb-6 text-[16px] leading-[1.6] text-ink-muted md:px-6">{a}</p>}
            </li>); })}
        </ul>
      </div>
    </section>
    <section className="pb-[var(--section-y)]"><div className="container-x">
      <div className={`${glassCard} relative isolate overflow-hidden px-6 py-14 text-center md:py-20`}>
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_120%,rgb(244_240_235/0.12)_0%,rgb(244_240_235/0)_60%)]" />
        <p className="v4-h2 mx-auto max-w-[22ch]"><Split text={t.endH} /></p>
        <p className="mt-4 text-[17px] text-ink-muted">{t.endP}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={SITE.demo} className="btn btn-primary h-11 px-5 text-[15px]">{d.nav.cta}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></a>
          <a href="#quote" className="btn btn-secondary h-11 px-5 text-[15px]">{q.cta}</a>
        </div>
      </div></div></section>
    <Footer />
  </>);
}
