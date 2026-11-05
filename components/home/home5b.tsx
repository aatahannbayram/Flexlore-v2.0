"use client";
/* Home sections below the fold. Split from home5.tsx so their code loads after the first paint; their HTML is still
 * rendered on the server. Page order (8 sections in all, see Site.tsx): how it works, industries, before and after,
 * integrations, pricing, FAQ with the closing call to action. Same visual rules as home5.tsx. */
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { SITE, PLANS, savePct } from "../config";
import { useLocale, fmt } from "../i18n/LocaleProvider";
import { EXTRA, INTEG, COMPARE5 } from "../i18n/extra";
import { HOME2 } from "../i18n/home2";
import { StoreButtons } from "../Icons";
import { SmartVideo } from "../ui/SmartVideo";
import { EASE } from "../ui/Reveal";
import { Pic, Label, H2, card, type Ic } from "./home5";
import {
  ArrowRight, Check, CheckCircle, Users, Sparkle, MapPin, LockSimple, FilmSlate, Question, ChartBar, Plus, ShieldCheck, ListChecks,
  X, ArrowsLeftRight, Storefront, PlugsConnected, Tag, Lightning, Buildings, ForkKnife, Factory, Bed, Code, Browser,
  AppleLogo, AndroidLogo, WebhooksLogo, Robot,
} from "../ui/icons";

/** Percent in the visitor's locale ("%92" in Turkish, "92 %" in German). */
const pct = (v: number, l: string) => { try { return new Intl.NumberFormat(l, { style: "percent", maximumFractionDigits: 0 }).format(v / 100); } catch { return `${v}%`; } };

/* ---------- Before and after: the usual way vs Flexlore, row by row. `short` keeps four rows (home). ---------- */
export function Compare5({ short = false }: { short?: boolean }) {
  const { locale } = useLocale(); const c = COMPARE5[locale]; const ref = useRef<HTMLDivElement>(null); const reduce = useReducedMotion();
  const go = useInView(ref, { amount: 0.25, once: true }) || !!reduce;
  // Home: rows the "How it works" steps do not already say (word of mouth, scattered files, tracking by hand, branches).
  const rows = short ? [0, 1, 4, 5].map((i) => c.rows[i]) : c.rows;
  return (
    <section aria-labelledby="cmp5-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-5">
          <div className="col-span-12 lg:col-span-7"><Label icon={ArrowsLeftRight}>{c.k}</Label><H2 id="cmp5-h" className="max-w-[20ch]">{c.h}</H2></div>
          <p className="col-span-12 max-w-[34rem] text-[16px] leading-[1.6] text-ink-muted md:text-[17px] lg:col-span-5">{c.lead}</p>
        </div>
        <div ref={ref} className={`${card} mt-8 p-2 md:mt-10 md:p-3 ${go ? "bx-go" : ""}`}>
          {/* Column heads as pictures: the usual way (an empty training room) and Flexlore (filming at the station). */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-[1fr_44px_1fr]">
            <div className="dark relative h-16 overflow-hidden rounded-[20px] md:h-36">
              <picture><source srcSet="/blog/5Gqy3sTtza69mfyNDeoj3TAXg-800.avif" type="image/avif" /><img src="/blog/5Gqy3sTtza69mfyNDeoj3TAXg-800.webp" alt="" loading="lazy" className="h-full w-full object-cover opacity-60 grayscale" /></picture>
              <span className="absolute inset-0 bg-[linear-gradient(90deg,rgb(17_17_17/0.75),rgb(17_17_17/0.1))]" />
              <span className="absolute bottom-3 start-3 text-[14px] font-medium text-white/80 md:bottom-4 md:start-4 md:text-[15px]">{c.old}</span>
            </div>
            <span aria-hidden="true" className="hidden place-items-center md:grid"><ArrowRight size={18} className="text-ink-faint rtl:-scale-x-100" /></span>
            <div className="dark relative h-16 overflow-hidden rounded-[20px] md:h-36">
              <Pic n="food-qa" sizes="50vw" className="h-full w-full object-cover" />
              <span className="absolute inset-0 bg-[linear-gradient(90deg,rgb(17_17_17/0.7),rgb(17_17_17/0.05))]" />
              <span className="absolute bottom-3 start-3 flex items-center gap-2 text-[14px] font-semibold text-white md:bottom-4 md:start-4 md:text-[15px]"><img src="/brand/symbol-main.svg" alt="" className="h-4 w-4" />{c.now}</span>
            </div>
          </div>
          <ul className="mt-2 space-y-1.5">
            {rows.map(([o, n], k) => (
              <li key={o} className="bx-rise grid items-center gap-2 rounded-[18px] bg-[var(--card-2)] px-3 py-2.5 md:grid-cols-[1fr_44px_1fr] md:gap-0 md:px-5" style={reduce ? undefined : { animationDelay: `${150 + k * 120}ms` }}>
                <span className="flex items-center gap-3 text-[15px] text-ink-faint"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--card)]"><X size={13} aria-hidden="true" /></span><span><span className="sr-only">{c.old}: </span><span className="line-through decoration-ink-faint/40">{o}</span></span></span>
                <ArrowRight size={16} aria-hidden="true" className="hidden justify-self-center text-ink-faint md:block rtl:-scale-x-100" />
                <span className="flex items-center gap-3 text-[15px] font-medium text-ink"><span className="bx-pop grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-bg" style={reduce ? undefined : { animationDelay: `${600 + k * 160}ms` }}><Check size={13} aria-hidden="true" /></span><span><span className="sr-only">{c.now}: </span>{n}</span></span>
              </li>))}
          </ul>
        </div>
      </div>
    </section>);
}

/* ---------- How it works: four steps, one picture each ----------
 * Phone: a vertical stepper, each step with its own small mock under the text.
 * Desktop: the steps scroll on the left while one sticky stage on the right shows the mock of the step in view.
 * The mocks are drawn in HTML with sample content and are decorative (aria-hidden). */
const STEP_V = ["kitchen", "line", "plating", "coffee"] as const;
const STEP_IC: Ic[] = [FilmSlate, Sparkle, CheckCircle, ChartBar];
const glass = "rounded-[18px] bg-[rgb(17_17_17/0.72)] ring-1 ring-white/10 backdrop-blur-md";

function StepMock({ i, big = false }: { i: number; big?: boolean }) {
  const { d, locale } = useLocale(); const b = d.bento; const f = d.caps.frag; const x = EXTRA[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const seen = useInView(ref, { amount: 0.4, once: true }); const go = seen || !!reduce;
  // One small entrance per piece, played once when the mock is in view (final state at once under reduced motion).
  const rise = (k: number) => (reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: go ? { opacity: 1, y: 0 } : undefined, transition: { duration: 0.5, ease: EASE, delay: 0.1 + k * 0.12 } });
  const row = "flex items-center gap-3 rounded-xl bg-[rgb(255_255_255/0.07)] px-3 py-2 text-[13px]";
  const ok = <span className="flex items-center gap-1 rounded-full bg-[#E7EBEB] px-2 py-0.5 text-[11px] font-semibold text-[#111]"><CheckCircle size={12} weight="fill" />{f.ok}</span>;
  const body = i === 0 ? (
    <m.div {...rise(0)} className={`${glass} flex items-center gap-3 p-2.5 pe-4`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#111]"><FilmSlate size={16} /></span>
      <span className="min-w-0 flex-1"><span className="block truncate text-[14px] font-semibold">{b.jobs[0]}</span><span className="block truncate text-[12px] text-white/65">{x.chips[0]}</span></span>
      <span className="flex items-center gap-1.5 text-[12px] font-semibold tabular-nums"><span className="h-2 w-2 rounded-full bg-[#EC6726]" />REC</span>
    </m.div>
  ) : i === 1 ? (
    <div className={`${glass} space-y-1.5 p-2.5`}>
      {(big ? [f.s1, f.s2] : [f.s1]).map((s, k) => (
        <m.div key={s} {...rise(k)} className={row}><span className="tabular-nums text-white/55">{k + 1}</span><span className="flex-1 truncate">{s}</span>
          <span className="flex items-center gap-1 rounded-full bg-[rgb(255_255_255/0.1)] px-2 py-0.5 text-[11px] font-semibold text-white/75"><Sparkle size={12} weight="fill" />{f.draft}</span></m.div>))}
      <m.div {...rise(2)} className="rounded-xl bg-[rgb(255_255_255/0.07)] px-3 py-2.5 text-[13px]">
        <p className="flex items-start gap-2 font-medium leading-snug"><Question size={15} className="mt-px shrink-0 text-white/60" />{b.q}</p>
        <p className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-[#E7EBEB] px-2.5 py-1.5 text-[12px] font-semibold text-[#111]"><span className="truncate">{b.qa[1]}</span><Check size={13} className="shrink-0" /></p>
      </m.div>
    </div>
  ) : i === 2 ? (
    <div className={`${glass} space-y-1.5 p-2.5`}>
      {b.jobs.slice(0, big ? 2 : 1).map((j, k) => (
        <m.div key={j} {...rise(k)} className={row}><ListChecks size={15} className="shrink-0 text-white/60" />
          <span className="min-w-0 flex-1"><span className="block truncate">{j}</span><span className="block truncate text-[11px] text-white/55">{b.assigned} · {b.who[k]}</span></span>{ok}</m.div>))}
      <m.div {...rise(2)} className={`flex items-center gap-3 px-1 pt-1.5 ${big ? "justify-between" : "justify-end"}`}>
        {big && <span className="flex min-w-0 items-center gap-1.5 truncate text-[12px] text-white/65"><LockSimple size={13} className="shrink-0" />{f.roles[2][0]} · {f.roles[2][1]}</span>}
        <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 text-[12px] font-semibold text-[#111]"><CheckCircle size={13} weight="fill" />{b.approve}</span>
      </m.div>
    </div>
  ) : (
    <div className={`${glass} px-4 py-3`}>
      <p className="flex items-center justify-between gap-3 text-[12px] text-white/65"><span className="truncate">{b.jobs[1]}</span><span className="shrink-0">{b.today}</span></p>
      <ul className="mt-2.5 space-y-2.5">{b.locs.map((n, k) => { const v = [88, 71, 52][k]; return (
        <li key={n}><p className="flex justify-between text-[13px]"><span className="flex items-center gap-1.5"><MapPin size={12} className="text-white/60" />{n}</span><span className="tabular-nums text-white/75">{pct(v, locale)}</span></p>
          <span className="mt-1 block h-1 overflow-hidden rounded-full bg-[rgb(255_255_255/0.12)]">
            <m.span className="block h-full origin-left rounded-full bg-[#E7EBEB] rtl:origin-right" style={{ width: `${v}%` }}
              initial={reduce ? false : { scaleX: 0 }} animate={go ? { scaleX: 1 } : undefined} transition={{ duration: 1, ease: EASE, delay: 0.2 + k * 0.15 }} /></span></li>); })}</ul>
    </div>);
  return (
    <div ref={ref} aria-hidden="true" className={`dark relative overflow-hidden bg-[#141414] text-white ${big ? "h-full rounded-[32px]" : "rounded-[22px]"}`}>
      <picture><source srcSet={`/video/${STEP_V[i]}.avif`} type="image/avif" /><img src={`/video/${STEP_V[i]}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>
      {big && <SmartVideo name={STEP_V[i]} poster={`/video/${STEP_V[i]}.webp`} threshold={0.3} className="absolute inset-0 h-full w-full object-cover" />}
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.05)_0%,rgb(17_17_17/0.35)_45%,rgb(17_17_17/0.85)_100%)]" />
      <div className={`relative flex flex-col justify-end ${big ? "h-full p-10" : `p-2 ${i === 0 ? "min-h-[120px]" : ""}`}`}><div className={big ? "mx-auto w-full max-w-[400px]" : ""}>{body}</div></div>
    </div>);
}

export function Steps5() {
  const { d, locale } = useLocale(); const c = d.process; const s = HOME2[locale].steps; const reduce = useReducedMotion();
  const [on, setOn] = useState(0); const items = useRef<(HTMLLIElement | null)[]>([]);
  // The sticky stage (and its video) only exists on wide screens; phones never download it.
  const [wide, setWide] = useState(false);
  useEffect(() => { const q = window.matchMedia("(min-width: 1024px)"); const f = () => setWide(q.matches); f(); q.addEventListener("change", f); return () => q.removeEventListener("change", f); }, []);
  // The step crossing the middle of the viewport drives the sticky stage (desktop) and the highlighted number.
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setOn(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-45% 0px -45% 0px" });
    items.current.forEach((n) => n && io.observe(n)); return () => io.disconnect();
  }, []);
  return (
    <section id="how" aria-labelledby="how-h" className="section-y pt-0">
      <div className="container-x">
        <Label icon={Lightning}>{c.k}</Label><H2 id="how-h" className="max-w-[20ch]">{c.h}</H2>
        <div className="mt-7 lg:mt-4 lg:grid lg:grid-cols-12 lg:gap-12">
          <ol className="lg:col-span-5">
            {s.map(([h, p], k) => { const I = STEP_IC[k]; const act = on === k; return (
              <li key={h} ref={(n) => { items.current[k] = n; }} data-i={k} className="relative pb-6 ps-14 last:pb-0 lg:flex lg:min-h-[64vh] lg:flex-col lg:justify-center lg:pb-0 lg:ps-0">
                {k < s.length - 1 && <span aria-hidden="true" className="absolute bottom-0 start-5 top-12 w-[2px] -translate-x-1/2 rounded-full bg-[var(--card-2)] rtl:translate-x-1/2 lg:hidden" />}
                <span aria-hidden="true" className={`absolute start-0 top-0 flex h-10 w-10 items-center justify-center gap-1.5 rounded-full text-[15px] font-semibold tabular-nums transition-colors duration-300 lg:static lg:mb-5 lg:w-auto lg:self-start lg:px-3.5 ${act ? "bg-ink text-bg" : "bg-[var(--card)] text-ink-muted"}`}><I size={16} className="hidden lg:block" />{k + 1}</span>
                <h3 className="mt-1.5 text-[20px] font-semibold leading-tight tracking-[-0.02em] md:text-[24px]">{h}</h3>
                <p className="mt-1.5 max-w-[30rem] text-[15px] leading-[1.5] text-ink-muted md:mt-2 md:text-[16px] md:leading-[1.6]">{k === 0 ? c.steps[0][1] : p}</p>
                <div className="mt-3 lg:hidden"><StepMock i={k} /></div>
              </li>); })}
          </ol>
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-[calc(var(--header-h)+24px)] h-[min(78vh,720px)]">
              {wide && <AnimatePresence initial={false}>
                <m.div key={on} className="absolute inset-0" initial={reduce ? false : { opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                  <StepMock i={on} big />
                </m.div>
              </AnimatePresence>}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 text-[13px] text-ink-faint sm:flex-row sm:justify-between">
          <p className="flex items-start gap-2"><ShieldCheck size={15} aria-hidden="true" className="mt-px shrink-0" />{c.note}</p><p>{d.bento.sample}</p>
        </div>
      </div>
    </section>);
}

/* ---------- Industries: one tab per industry (picture, role sentence, three examples, a link) ---------- */
const IND = [["/sektor/restoran/", "chef-plating", ForkKnife], ["/sektor/uretim/", "safety", Factory], ["/sektor/otel/", "hotel-desk", Bed], ["/sektor/franchise/", "huddle", Storefront]] as const;
export function Sectors5() {
  const { d, locale } = useLocale(); const c = d.ind; const t = HOME2[locale]; const reduce = useReducedMotion();
  const [on, setOn] = useState(0); const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: React.KeyboardEvent, k: number) => {
    const n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!n) return;
    e.preventDefault(); const rtl = document.documentElement.dir === "rtl"; const next = (k + (rtl ? -n : n) + IND.length) % IND.length; setOn(next); tabs.current[next]?.focus();
  };
  const [href, img] = IND[on]; const [role, ex] = t.tabs[on];
  return (
    <section id="industries" aria-labelledby="ind-h" className="section-y pt-0">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label icon={Storefront}>{c.k}</Label><H2 id="ind-h" className="max-w-[16ch]">{c.h}</H2></div>
          <Link href="/see-it/" className="btn btn-secondary hidden md:inline-flex">{c.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        </div>
        {/* Chips scroll sideways inside their own row on small phones; the page itself never does. */}
        <div role="tablist" aria-label={c.k} className="no-sb -mx-[var(--pad-x)] mt-8 flex gap-2 overflow-x-auto px-[var(--pad-x)] md:mx-0 md:mt-10 md:flex-wrap md:px-0">
          {IND.map(([, , I], k) => { const act = on === k; return (
            <button key={k} ref={(n) => { tabs.current[k] = n; }} type="button" role="tab" id={`ind-t-${k}`} aria-selected={act} aria-controls="ind-panel" tabIndex={act ? 0 : -1}
              onClick={() => setOn(k)} onKeyDown={(e) => key(e, k)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full pe-4 ps-3 text-[15px] font-medium transition-colors ${act ? "bg-ink text-bg" : "bg-[var(--card)] text-ink-muted hover:text-ink"}`}>
              <I size={17} aria-hidden="true" />{c.cards[k]}</button>); })}
        </div>
        <div id="ind-panel" role="tabpanel" aria-labelledby={`ind-t-${on}`} className="mt-3">
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={on} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}
              className="grid gap-3 md:grid-cols-2">
              <div className="dark relative aspect-[2/1] overflow-hidden rounded-[24px] bg-[#2a2622] md:aspect-auto md:min-h-[400px]">
                <Pic n={img} sizes="(min-width:768px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className={`${card} flex flex-col p-5 md:p-8`}>
                <p className="text-[18px] font-semibold leading-[1.3] tracking-[-0.015em] md:text-[24px]">{role}</p>
                <ul className="mt-4 space-y-2.5 md:mt-6">
                  {ex.map((e) => <li key={e} className="flex items-start gap-3 text-[15px] leading-snug text-ink-muted md:text-[16px]"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--card-2)] text-ink"><Check size={13} aria-hidden="true" /></span>{e}</li>)}
                </ul>
                <Link href={href} className="mt-4 inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold md:mt-auto md:pt-6">{t.go}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
        <p className="mt-5 text-[14px] leading-[1.6] text-ink-faint">{c.also}: {c.areas.slice(0, 5).join(" · ")}. {c.langs}</p>
      </div>
    </section>);
}

/* ---------- Integrations: one row of what runs today and what is next ---------- */
const LIVE: [Ic, string][] = [[AppleLogo, "iOS"], [AndroidLogo, "Android"], [Browser, "Web"]];
const NEXT: [Ic, string][] = [[Code, "REST API"], [WebhooksLogo, "Webhooks"], [Robot, "MCP"], [ChartBar, "BI"]];
export function Integrations5() {
  const { d, locale } = useLocale(); const c = INTEG[locale];
  const chip = "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] md:h-10 md:gap-2 md:px-3.5 md:text-[14px]";
  return (
    <section id="integrations" aria-labelledby="int-h" className="section-y pt-0">
      <div className="container-x">
        <div className={`${card} flex flex-col gap-3 p-4 md:p-5 lg:flex-row lg:items-center lg:gap-6`}>
          <div className="flex items-center justify-between gap-3 lg:contents">
            <h2 id="int-h" className="flex shrink-0 items-center gap-2.5 text-[16px] font-semibold"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--card-2)]"><PlugsConnected size={16} aria-hidden="true" /></span>{c.k}</h2>
            <Link href="/integrations/" className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-[14px] font-semibold hover:underline lg:order-last">{c.cta}<ArrowRight size={13} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
          </div>
          <ul className="flex flex-1 flex-wrap items-center gap-1.5 md:gap-2">
            {LIVE.map(([I, n], i) => <li key={n} className={`${chip} bg-[var(--card-2)] font-medium`}><I size={15} aria-hidden="true" />{n}<span className="sr-only"> ({c.liveItems[i]}, {c.live})</span><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-calm-aqua" /></li>)}
            <li className="px-1 text-[13px] text-ink-faint">{d.pricingPage.soon}:</li>
            {NEXT.map(([I, n]) => <li key={n} className={`${chip} text-ink-muted ring-1 ring-inset ring-[var(--card-2)]`}><I size={15} aria-hidden="true" />{n}</li>)}
          </ul>
        </div>
      </div>
    </section>);
}

/* ---------- Pricing preview (yearly by default) ---------- */
export function BillingSwitch({ yearly, setYearly, id }: { yearly: boolean; setYearly: (v: boolean) => void; id: string }) {
  const { d } = useLocale(); const c = d.pricing; const best = Math.max(...PLANS.map((p) => savePct(p) ?? 0));
  const b = (on: boolean) => `relative z-10 inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors ${on ? "text-bg" : "text-ink-muted hover:text-ink"}`;
  const pill = <m.span layoutId={`${id}-pill`} className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 260, damping: 30 }} />;
  return (
    <div role="group" aria-label={c.billing} className="inline-flex rounded-full bg-[var(--card)] p-1 ring-1 ring-line">
      <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)} className={b(!yearly)}>{!yearly && pill}{c.monthly}</button>
      <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)} className={b(yearly)}>{yearly && pill}{c.yearly}
        {best > 0 && <span className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${yearly ? "bg-bg/15 text-bg" : "bg-[var(--card-2)] text-ink-muted"}`}>{fmt(c.upTo, { pct: best })}</span>}</button>
    </div>);
}
const PLAN_IC: Record<string, Ic> = { free: Sparkle, pro: Lightning, proplus: Users, enterprise: Buildings };
/* Plans are bought in the app (or through a Stripe link once set). Phones go straight to their store; on a desktop the
   button opens a small panel with both store badges, so nobody lands on the same price cards again. */
function GetApp({ checkout, label, cls }: { checkout: string | null; label: string; cls: string }) {
  const { lang } = useLocale(); const [open, setOpen] = useState(false); const box = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; const off = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", off); return () => document.removeEventListener("mousedown", off); }, [open]);
  const go = (e: React.MouseEvent) => { if (checkout) return; e.preventDefault(); const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua)) window.location.href = SITE.appStore; else if (/Android/i.test(ua)) window.location.href = SITE.googlePlay; else setOpen((o) => !o); };
  return (<div ref={box} className="relative"><a href={checkout ?? SITE.appStore} onClick={go} aria-expanded={checkout ? undefined : open} className={cls}>{label}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>
    {open && <div className="absolute inset-x-0 top-full z-20 mt-2 flex flex-col items-center gap-2 rounded-[18px] bg-surface-1 p-3 ring-1 ring-line"><StoreButtons small lang={lang} /></div>}</div>);
}
export function PlanCard({ id, yearly, full = false, className = "" }: { id: string; yearly: boolean; full?: boolean; className?: string }) {
  const { d } = useLocale(); const c = d.pricing; const p = PLANS.find((x) => x.id === id)!; const rec = !!p.featured; const I = PLAN_IC[id];
  const [name, forWho] = c.plans[id as keyof typeof c.plans]; const pr = yearly ? p.yearly : p.monthly; const save = yearly ? savePct(p) : null;
  const users: Record<string, string> = { free: "3", pro: "10", proplus: "30" };
  const pts = full ? d.pricingPage.points[id as keyof typeof d.pricingPage.points] : c.feats[id as keyof typeof c.feats];
  const prev = { pro: "free", proplus: "pro", enterprise: "proplus" }[id as "pro"] as keyof typeof c.plans | undefined;
  const checkout = (yearly ? (p as { checkoutYearly?: string | null }).checkoutYearly : p.checkout) ?? null;
  const reduce = useReducedMotion();
  return (
    <li id={`plan-${id}`} className={`relative flex-col rounded-[28px] p-5 md:p-7 ${rec ? "bg-ink text-bg" : "bg-[var(--card)]"} ${className || "flex"}`}>
      {/* Phones: no icon row (only the "recommended" badge), so the price sits higher. */}
      <div className={`${rec ? "flex" : "hidden md:flex"} items-center justify-between gap-3`}>
        <span aria-hidden="true" className={`hidden h-11 w-11 place-items-center rounded-[14px] md:grid ${rec ? "bg-bg/10" : "bg-[var(--card-2)]"}`}><I size={20} /></span>
        {rec && <span className="rounded-full bg-bg/10 px-3 py-1 text-[12px] font-semibold">{c.recommended}</span>}
      </div>
      <h3 className={`text-[20px] font-semibold md:mt-6 ${rec ? "mt-3" : ""}`}>{name}</h3>
      <p className={`mt-1 text-[14px] md:min-h-[2.6rem] leading-snug ${rec ? "text-bg/70" : "text-ink-muted"}`}>{forWho}</p>
      <div className="mt-4 md:mt-6 md:min-h-[5.5rem]">
        {pr ? <>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <AnimatePresence mode="popLayout" initial={false}><m.span key={pr.now} className="text-[40px] font-bold leading-none tracking-[-.03em]" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>{pr.now}</m.span></AnimatePresence>
            <span className={`text-[14px] ${rec ? "text-bg/70" : "text-ink-muted"}`}>{c.perMo}</span>
            {save && <span className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${rec ? "bg-bg/10" : "bg-[var(--card-2)] text-ink-muted"}`}>{fmt(c.save, { pct: save })}</span>}
          </div>
          <p className={`mt-2 text-[13px] ${rec ? "text-bg/70" : "text-ink-faint"}`}>{id === "free" ? c.free : yearly ? fmt(c.yrNote, { total: `$${(parseFloat(pr.now.replace(/[^0-9.]/g, "")) * 12).toFixed(2)}` }) : c.moNote}</p>
        </> : <><p className="text-[34px] font-bold leading-none tracking-[-.03em]">{c.contact}</p><p className={`mt-2 text-[13px] ${rec ? "text-bg/70" : "text-ink-faint"}`}>{c.custom}</p></>}
      </div>
      {id === "enterprise"
        ? <a href={SITE.demo} className={`btn mt-5 w-full md:mt-6 ${rec ? "bg-bg text-ink" : "btn-secondary"}`}>{c.talk}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>
        : <GetApp checkout={checkout} label={id === "free" ? c.start : c.choose} cls={`btn mt-5 w-full md:mt-6 ${rec ? "bg-bg text-ink hover:opacity-90" : "btn-secondary"}`} />}
      <div className={`mt-5 flex-1 rounded-[20px] p-4 md:mt-6 ${rec ? "bg-bg/[.08]" : "bg-[var(--card-2)]"}`}>
        <p className="flex items-center gap-2 text-[14px] font-semibold"><Users size={16} aria-hidden="true" />{id === "enterprise" ? c.enterpriseUsers : fmt(c.users, { n: users[id] })}</p>
        {prev && <p className={`mt-3 text-[13px] ${rec ? "text-bg/70" : "text-ink-faint"}`}>{fmt(c.plus, { plan: c.plans[prev][0] })}</p>}
        <ul className="mt-3 space-y-2 text-[14px]">{pts.map((f) => <li key={f} className={`flex items-start gap-2.5 ${rec ? "text-bg/85" : "text-ink-muted"}`}><Check size={15} aria-hidden="true" className="mt-0.5 shrink-0" />{f}</li>)}</ul>
      </div>
    </li>);
}
/* Phones: a plan switcher (every plan and its price in one row of buttons) above one card, no sideways scrolling.
   From 640 px: all cards in a grid. */
export function Pricing5() {
  const { d, locale } = useLocale(); const c = d.pricing; const [yearly, setYearly] = useState(true); const [sel, setSel] = useState(PLANS.find((p) => p.featured)?.id ?? PLANS[0].id);
  return (
    <section id="pricing" aria-labelledby="pp-h" className="section-y pt-0">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label icon={Tag}>{c.k}</Label><H2 id="pp-h" className="md:max-w-[16ch]">{c.h}</H2><p className="mt-4 text-[17px] text-ink-muted">{c.lead}</p></div>
          <BillingSwitch yearly={yearly} setYearly={setYearly} id="pp" />
        </div>
        <div role="group" aria-label={HOME2[locale].plans} className="mt-8 grid grid-cols-4 gap-1 rounded-[20px] bg-[var(--card)] p-1 sm:hidden">
          {PLANS.map((p) => { const act = sel === p.id; const pr = yearly ? p.yearly : p.monthly; return (
            <button key={p.id} type="button" aria-pressed={act} aria-controls={`plan-${p.id}`} onClick={() => setSel(p.id)}
              className={`flex min-h-14 flex-col items-center justify-center rounded-[16px] px-1 text-center transition-colors ${act ? "bg-ink text-bg" : "text-ink-muted"}`}>
              <span className="text-[13px] font-semibold leading-tight">{c.plans[p.id as keyof typeof c.plans][0]}</span>
              <span className={`mt-0.5 text-[12px] tabular-nums ${act ? "text-bg/75" : "text-ink-faint"}`}>{pr ? pr.now : "30+"}</span>
            </button>); })}
        </div>
        <ul className="mt-3 grid items-stretch gap-3 sm:mt-12 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p) => <PlanCard key={p.id} id={p.id} yearly={yearly} className={sel === p.id ? "flex" : "hidden sm:flex"} />)}
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[14px] text-ink-faint md:mt-8">
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2"><span className="flex items-center gap-1.5"><LockSimple size={15} />{c.secure}</span><span className="flex items-center gap-1.5"><CheckCircle size={15} />{c.cancel}</span><span>{c.appNote}</span></span>
          <Link href="/pricing/" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">{c.all}<ArrowRight size={13} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        </div>
      </div>
    </section>);
}

/* ---------- FAQ (children: the closing call to action on the home page, inside the same section) ---------- */
export function Faq5({ children, openFirst = true }: { children?: React.ReactNode; openFirst?: boolean }) {
  const { d } = useLocale(); const c = d.faq; const [open, setOpen] = useState<number | null>(openFirst ? 0 : null); const reduce = useReducedMotion();
  return (
    <section id="faq" aria-labelledby="faq-h" className="section-y pt-0">
      <div className="container-x grid-12 gap-y-6 md:gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <Label icon={Question}>{c.k}</Label><H2 id="faq-h">{c.h}</H2>
          <div className={`${card} mt-10 hidden max-w-[22rem] p-6 lg:block`}>
            <p className="text-[18px] font-semibold tracking-[-.01em]">{c.more}</p><p className="mt-2 text-[15px] text-ink-muted">{c.moreP}</p>
            <a href={SITE.demo} className="btn btn-primary mt-5">{d.end.cta}</a>
            <p className="mt-4 text-[13px] text-ink-faint"><a href="mailto:support@flexlore.com" className="hover:text-ink">{c.email}</a></p>
          </div>
        </div>
        <ul className="col-span-12 space-y-2 lg:col-span-7 lg:col-start-6">
          {c.items.map(([q, a], i) => { const on = open === i; return (
            <li key={q} className={`rounded-[20px] transition-colors duration-300 ${on ? "bg-[var(--card)]" : "hover:bg-[var(--card)]/60"}`}>
              <h3><button type="button" id={`faq-q-${i}`} aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}
                className="flex min-h-12 w-full items-center justify-between gap-6 px-5 py-3 text-start text-[16px] font-semibold tracking-[-.01em] md:min-h-16 md:px-6 md:py-4 md:text-[18px]">
                <span className={on ? "text-ink" : "text-ink/85"}>{q}</span>
                <m.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.3, ease: EASE }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--card-2)] text-ink-muted"><Plus size={15} aria-hidden="true" /></m.span>
              </button></h3>
              <AnimatePresence initial={false}>{on && (
                <m.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35, ease: EASE }} className="overflow-hidden">
                  <p className="measure px-5 pb-6 text-[16px] leading-[1.6] text-ink-muted md:px-6">{a}</p></m.div>)}</AnimatePresence>
            </li>); })}
        </ul>
        {children && <div className="col-span-12 mt-4 md:mt-10">{children}</div>}
      </div>
    </section>);
}

/* ---------- Closing call to action (rendered inside the FAQ section on the home page) ---------- */
export function End5() {
  const { d } = useLocale(); const c = d.end;
  return (
    <div className={`${card} grid-12 items-center gap-y-7 px-5 py-8 sm:px-10 md:py-16 lg:px-16`}>
      <div className="col-span-12 lg:col-span-5">
        <h2 id="end-h" className="v3-h2 max-w-[12ch]">{c.h}</h2>
        <p className="mt-4 max-w-[26rem] text-[17px] leading-[1.55] text-ink-muted">{c.p}</p>
        <a href={SITE.demo} className="btn btn-primary mt-7 h-12 px-6 text-[16px]">{c.cta}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></a>
      </div>
      <div className="col-span-12 mx-auto w-[80%] sm:w-full lg:col-span-7"><CtaDuoLazy /></div>
    </div>);
}
const CtaDuoInner = dynamic(() => import("./CtaDuo").then((x) => x.CtaDuo), { ssr: false, loading: () => <div className="aspect-[2752/1536] w-full" /> });
function CtaDuoLazy() { const { lang } = useLocale(); return <div dir="ltr"><CtaDuoInner lang={lang} /></div>; }

/** Everything below the problem section, in page order. */
export default function Below() {
  return (<><Steps5 /><Sectors5 /><Compare5 short /><Integrations5 /><Pricing5 /><Faq5 openFirst={false}><End5 /></Faq5></>);
}
