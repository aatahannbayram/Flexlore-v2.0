"use client";
/* Pricing page. Same plan cards as the home page (PlanCard), yearly selected by default, all copy from the locale
 * dictionary. Checkout: each plan's `checkout` / `checkoutYearly` in config.ts takes a Stripe Payment Link; until one
 * is set, the button falls back to this page's app/demo flow. */
import { useState } from "react";
import { PLANS, COMPARE, SITE, ENTERPRISE_TIERS } from "./config";
import { Header } from "./Header";
import { Footer } from "./Sections";
import Copq from "./Copq";
import { useLocale, fmt } from "./i18n/LocaleProvider";
import { BillingSwitch, PlanCard } from "./home/home5b";
import { ArrowRight, Check, Buildings, LockSimple, CheckCircle, Plus, Tag, Lightning } from "./ui/icons";

export default function Pricing() {
  const { d, lang } = useLocale(); const c = d.pricing; const t = d.pricingPage;
  const [yearly, setYearly] = useState(true); const [cmp, setCmp] = useState(false); const [open, setOpen] = useState<number | null>(0);
  const cell = (v: boolean | string) => {
    if (v === true) return <Check size={18} aria-label="✓" className="mx-auto text-ink" />;
    if (v === false) return <span className="text-ink-faint">–</span>;
    const map: Record<string, string> = { "By number of users": t.cells.byUsers, Unlimited: t.cells.unlimited, "3 quizzes": t.cells.q3, "10 quizzes": t.cells.q10, "Talk to sales": t.cells.talk, Standard: t.cells.standard, Premium: t.cells.premium };
    return <span>{map[v] ?? v}</span>;
  };
  const tiers = ENTERPRISE_TIERS.map((x) => ({ ...x, pts: t.tiers[x.id as "starter" | "growth" | "scale"], soon: x.id === "scale" ? t.tiers.scaleSoon : [] }));
  return (<>
    <Header />
    <main id="main" className="home-v3 pt-[calc(var(--header-h)+56px)]">
      <section className="container-x">
        <div className="mx-auto max-w-[44rem] text-center">
          <p className="inline-flex items-center gap-2.5 text-[15px] font-medium text-ink-muted"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--card)] text-ink"><Tag size={16} /></span>{t.k}</p>
          <h1 className="v3-h1 mt-5">{t.h1}</h1>
          <p className="mx-auto mt-5 max-w-[32rem] text-[18px] leading-[1.55] text-ink-muted">{t.sub}</p>
          <div className="mt-9 flex justify-center"><BillingSwitch yearly={yearly} setYearly={setYearly} id="pricing" /></div>
        </div>
        <ul className="mt-12 grid gap-3 md:grid-cols-2 xl:grid-cols-4" aria-label={c.k}>
          {PLANS.map((p) => <PlanCard key={p.id} id={p.id} yearly={yearly} full />)}
        </ul>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-ink-faint">
          <span className="flex items-center gap-1.5"><LockSimple size={15} />{c.secure}</span><span className="flex items-center gap-1.5"><CheckCircle size={15} />{c.cancel}</span><span>{c.appNote}</span>
        </p>
      </section>

      <section aria-labelledby="ent-h" className="container-x mt-24">
        <div className="relative overflow-hidden rounded-[32px] bg-[var(--card)] p-6 md:p-12">
          <div className="grid-12 items-end gap-y-6">
            <div className="col-span-12 lg:col-span-7">
              <p className="inline-flex items-center gap-2.5 text-[15px] font-medium text-ink-muted"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--card-2)] text-ink"><Buildings size={16} /></span>{t.entK}</p>
              <h2 id="ent-h" className="v3-h2 mt-5">{t.entH}</h2>
              <p className="mt-4 max-w-[34rem] text-[17px] leading-[1.55] text-ink-muted">{t.entP}</p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:justify-self-end"><a href={SITE.demo} className="btn btn-primary h-12 px-6 text-[16px]">{t.sales}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></a></div>
          </div>
          <ul className="mt-10 grid gap-3 md:grid-cols-3">
            {tiers.map((x) => (
              <li key={x.id} className="flex flex-col rounded-[22px] bg-[var(--card-2)] p-6">
                <p className="text-[17px] font-semibold">Enterprise {x.name}</p>
                <p className="mt-4 text-[30px] font-bold leading-none tracking-[-.03em]">{x.custom ? c.custom : <>{x.price}<span className="ms-1 text-[14px] font-normal text-ink-muted">{c.perMo}</span></>}</p>
                <p className="mt-2 text-[14px] text-ink-muted">{fmt(t.entUsers, { n: x.users })}</p>
                <ul className="mt-5 space-y-2 text-[14px] text-ink-muted">
                  {x.pts.map((y) => <li key={y} className="flex items-start gap-2.5"><Check size={15} className="mt-0.5 shrink-0" />{y}</li>)}
                  {x.soon.map((y) => <li key={y} className="flex flex-wrap items-center gap-2.5"><Lightning size={15} className="shrink-0 text-ink-faint" />{y}<span className="rounded-full bg-[var(--card)] px-2 py-0.5 text-[11px] font-semibold text-ink-muted">{t.soon}</span></li>)}
                </ul>
              </li>))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="cmp-h" className="container-x mt-24">
        <h2 id="cmp-h" className="v3-h2">{t.compareH}</h2>
        <button type="button" aria-expanded={cmp} aria-controls="cmp-table" onClick={() => setCmp(!cmp)} className="btn btn-secondary mt-6 md:hidden">{cmp ? t.hide : t.show}</button>
        <div id="cmp-table" className={`no-sb mt-8 overflow-x-auto rounded-[24px] bg-[var(--card)] p-2 ${cmp ? "block" : "hidden"} md:block`}>
          <table className="w-full min-w-[680px] border-collapse text-start text-[14px]">
            <thead><tr><th className="px-4 py-4 text-start font-medium text-ink-muted">{t.feature}</th>{PLANS.map((p) => <th key={p.id} className={`w-[18%] py-4 text-center font-semibold ${p.featured ? "text-ink" : "text-ink-muted"}`}>{c.plans[p.id as keyof typeof c.plans][0]}</th>)}</tr></thead>
            <tbody>{COMPARE.map((r, k) => <tr key={r.f} className="odd:bg-[var(--card-2)]/60"><td className="rounded-s-xl px-4 py-3.5 text-ink-muted">{t.rows[k] ?? r.f}</td>{r.v.map((v, i) => <td key={i} className={`py-3.5 text-center ${i === 3 ? "rounded-e-xl" : ""}`}>{cell(v)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
    </main>
    <div className="mt-24"><Copq lang={lang} /></div>
    <section aria-labelledby="pfaq-h" className="section-y">
      <div className="container-x grid-12 gap-y-10">
        <h2 id="pfaq-h" className="v3-h2 col-span-12 lg:col-span-4">{t.faqH}</h2>
        <ul className="col-span-12 space-y-2 lg:col-span-7 lg:col-start-6">
          {t.faq.map(([q, a], i) => { const on = open === i; return (
            <li key={q} className={`rounded-[20px] transition-colors ${on ? "bg-[var(--card)]" : "hover:bg-[var(--card)]/60"}`}>
              <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="flex min-h-16 w-full items-center justify-between gap-6 px-5 py-4 text-start text-[17px] font-semibold md:px-6">
                {q}<span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--card-2)] text-ink-muted transition-transform ${on ? "rotate-45" : ""}`}><Plus size={15} aria-hidden="true" /></span></button>
              {on && <p className="measure px-5 pb-6 text-[16px] leading-[1.6] text-ink-muted md:px-6">{a}</p>}
            </li>); })}
        </ul>
      </div>
    </section>
    <section className="pb-[var(--section-y)]"><div className="container-x">
      <div className="rounded-[32px] bg-[var(--card)] px-6 py-12 text-center md:py-16">
        <p className="v3-h2 mx-auto max-w-[18ch]">{t.endH}</p>
        <p className="mt-4 text-[17px] text-ink-muted">{t.endP}</p>
        <a href={SITE.demo} className="btn btn-primary mt-8 h-12 px-6 text-[16px]">{d.nav.cta}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></a>
      </div></div></section>
    <Footer />
  </>);
}
