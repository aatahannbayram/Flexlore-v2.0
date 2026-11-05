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
import { Device, WorkScreen } from "../AppScreens";
import { StoreButtons } from "../Icons";
import { SmartVideo } from "../ui/SmartVideo";
import { EASE } from "../ui/Reveal";
import { Pic, Label, H2, card, type Ic } from "./home5";
import {
  ArrowRight, Check, CheckCircle, Users, Sparkle, LockSimple, FilmSlate, Question, ChartBar, Plus, ShieldCheck,
  X, ArrowsLeftRight, Play, Pause, Storefront, PlugsConnected, Tag, Lightning, Buildings, ForkKnife, Factory, Bed, Code, Browser,
  AppleLogo, AndroidLogo, WebhooksLogo, Robot,
} from "../ui/icons";


/* ---------- Before and after: one frame, a handle to drag between the usual way and Flexlore ----------
 * The usual way (an empty training room, greyscale) lies over Flexlore (filming at the station, in colour) and is
 * clipped at the handle. When the frame first comes into view the handle sweeps across once; after that the visitor
 * drags it (pointer, touch or arrow keys through a native range input). The glass card lists the side that covers
 * more of the frame. Reduced motion: no sweep, the Flexlore side shows. `short` keeps four rows (home). */
export function Compare5({ short = false }: { short?: boolean }) {
  const { locale } = useLocale(); const c = COMPARE5[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const seen = useInView(ref, { amount: 0.5, once: true });
  const rows = short ? [0, 1, 4, 5].map((i) => c.rows[i]) : c.rows;
  const [pos, setPos] = useState(88); const [touched, setTouched] = useState(false); const raf = useRef(0);
  useEffect(() => {
    if (!seen || touched) return;
    if (reduce) { setPos(12); return; }
    const from = 88, to = 12, dur = 1800; let t0 = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (t: number) => { if (!t0) t0 = t; const k = Math.min(1, (t - t0) / dur); setPos(from + (to - from) * ease(k)); if (k < 1) raf.current = requestAnimationFrame(tick); };
    const start = window.setTimeout(() => { raf.current = requestAnimationFrame(tick); }, 400);
    return () => { window.clearTimeout(start); cancelAnimationFrame(raf.current); };
  }, [seen, touched, reduce]);
  const old = pos > 50; const rtl = locale === "ar";
  // Physical clip: the usual way always sits on the left of the handle (also in Arabic, where the arrow keys follow the input).
  const clip = { clipPath: `inset(0 ${100 - pos}% 0 0)` };
  return (
    <section aria-labelledby="cmp5-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-5">
          <div className="col-span-12 lg:col-span-7"><Label icon={ArrowsLeftRight}>{c.k}</Label><H2 id="cmp5-h" className="max-w-[20ch]">{c.h}</H2></div>
          <p className="col-span-12 max-w-[34rem] text-[16px] leading-[1.6] text-ink-muted md:text-[17px] lg:col-span-5">{c.lead}</p>
        </div>
        <div ref={ref} dir="ltr" className="dark relative mt-8 aspect-[4/5] select-none outline-offset-4 has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-ink overflow-hidden rounded-[28px] bg-[#141414] text-white sm:aspect-[16/10] md:mt-10 lg:aspect-[16/8] lg:rounded-[32px]">
          {/* Flexlore, underneath */}
          <div aria-hidden="true" className="absolute inset-0">
            <Pic n="food-qa" sizes="(min-width:1024px) 80vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.35)_0%,rgb(17_17_17/0)_30%,rgb(17_17_17/0.15)_55%,rgb(17_17_17/0.85)_100%)]" />
            <span className="absolute end-4 top-4 inline-flex items-center gap-2 rounded-full bg-[rgb(17_17_17/0.6)] py-1.5 pe-3.5 ps-2 text-[13px] font-semibold ring-1 ring-white/10 backdrop-blur-md md:end-6 md:top-6 md:text-[14px]"><img src="/brand/symbol-main.svg" alt="" className="h-4 w-4" />{c.now}</span>
          </div>
          {/* The usual way, on top, clipped at the handle */}
          <div aria-hidden="true" className="absolute inset-0" style={clip}>
            <picture><source srcSet="/blog/5Gqy3sTtza69mfyNDeoj3TAXg-800.avif 800w, /blog/5Gqy3sTtza69mfyNDeoj3TAXg-1600.avif 1600w" sizes="(min-width:1024px) 80vw, 100vw" type="image/avif" />
              <img src="/blog/5Gqy3sTtza69mfyNDeoj3TAXg-1600.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale" /></picture>
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.45)_0%,rgb(17_17_17/0.25)_40%,rgb(17_17_17/0.9)_100%)]" />
            <span className="absolute start-4 top-4 inline-flex items-center gap-2 rounded-full bg-[rgb(17_17_17/0.6)] py-1.5 pe-3.5 ps-2.5 text-[13px] font-medium text-white/80 ring-1 ring-white/10 backdrop-blur-md md:start-6 md:top-6 md:text-[14px]"><X size={13} />{c.old}</span>
          </div>
          {/* Handle */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-10 w-0" style={{ left: `${pos}%` }}>
            <span className="absolute inset-y-0 -left-px w-[2px] bg-white/85 shadow-[0_0_24px_rgb(0_0_0/0.5)]" />
            <span className={`absolute left-0 top-[30%] grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white md:top-[40%] text-[#111] shadow-[0_8px_30px_rgb(0_0_0/0.45)] ${touched || reduce ? "" : "cmp-pulse"}`}><ArrowsLeftRight size={20} /></span>
          </div>
          {/* The list of the side that covers more of the frame */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 md:inset-x-auto md:bottom-6 md:start-6 md:w-[25rem]" dir={rtl ? "rtl" : "ltr"}>
            <AnimatePresence mode="wait" initial={false}>
              <m.ul key={old ? "old" : "now"} aria-live="polite" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -4 }} transition={{ duration: 0.25, ease: EASE }}
                className="space-y-1 rounded-[20px] bg-[rgb(17_17_17/0.72)] p-2 ring-1 ring-white/10 backdrop-blur-md">
                <li className="px-2.5 pb-1 pt-1 text-[12px] font-medium uppercase tracking-[.08em] text-white/55">{old ? c.old : c.now}</li>
                {rows.map(([o, n]) => (
                  <li key={o} className={`flex items-center gap-3 rounded-[14px] px-2.5 py-2 text-[14px] md:text-[15px] ${old ? "text-white/60" : "bg-[rgb(255_255_255/0.06)] font-medium text-white"}`}>
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${old ? "bg-[rgb(255_255_255/0.08)] text-white/55" : "bg-white text-[#111]"}`}>{old ? <X size={12} aria-hidden="true" /> : <Check size={12} aria-hidden="true" />}</span>
                    {old ? o : n}</li>))}
              </m.ul>
            </AnimatePresence>
          </div>
          <input type="range" min={0} max={100} step={1} value={Math.round(pos)} aria-label={`${c.old} / ${c.now}`} aria-valuetext={old ? c.old : c.now}
            onChange={(e) => { setTouched(true); cancelAnimationFrame(raf.current); setPos(Number(e.target.value)); }}
            className="cmp-range absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0 [touch-action:pan-y]" />
        </div>
        {/* Screen readers get both columns as one plain list. */}
        <ul className="sr-only">{rows.map(([o, n]) => <li key={o}>{c.old}: {o}. {c.now}: {n}.</li>)}</ul>
      </div>
    </section>);
}

/* ---------- How it works: four steps, one stage ----------
 * The approved process stage (blurred loop behind a phone with the real app screen and a status chip) with the four
 * steps of the product. Steps advance every 6 s while in view (pausable; never under reduced motion); hover or focus
 * holds a step. Phones: the stage first, then the steps as a compact list where only the active one shows its text. */
const STAGE = [{ v: "kitchen", icon: FilmSlate }, { v: "line", icon: Sparkle }, { v: "plating", icon: CheckCircle }, { v: "coffee", icon: ChartBar }] as const;
const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
export function Steps5() {
  const { d, lang, locale } = useLocale(); const c = d.process; const s = HOME2[locale].steps; const x = EXTRA[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const on = useInView(ref, { amount: 0.35 }); const near = useInView(ref, { margin: "300px 0px", once: true });
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const [paused, setPaused] = useState(false);
  const run = on && !hold && !paused && !reduce;
  useEffect(() => { if (!run) return; const t = window.setTimeout(() => setI((k) => (k + 1) % 4), 6000); return () => window.clearTimeout(t); }, [run, i]);
  const screen = i === 0 ? <Editor active={on} lang={lang} /> : i === 1 ? <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} />
    : i === 2 ? <WorkScreen active={on} lang={lang} /> : <Ready active={on} lang={lang} />;
  const chips = [x.chips[0], x.chips[1], `${d.caps.frag.ok} · ${d.bento.who[0]}`, x.chips[3]];
  const ChipIc = STAGE[i].icon;
  return (
    <section id="how" aria-labelledby="how-h" className="section-y pt-0">
      <div className="container-x">
        <Label icon={Lightning}>{c.k}</Label><H2 id="how-h" className="max-w-[20ch]">{c.h}</H2>
        <div ref={ref} className="mt-8 grid gap-4 md:mt-12 lg:grid-cols-12 lg:gap-10" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div className="dark relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#141414] sm:aspect-[16/11] lg:order-last lg:col-span-7 lg:aspect-auto lg:min-h-[620px] lg:rounded-[32px]">
            <AnimatePresence initial={false}>
              <m.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}>
                <img src={`/video/${STAGE[i].v}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-[6px]" />
                {near && <SmartVideo name={STAGE[i].v} poster={`/video/${STAGE[i].v}.webp`} threshold={0.3} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-[6px]" />}
              </m.div>
            </AnimatePresence>
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(20_20_20/0)_0%,rgb(20_20_20/0.75)_75%)]" />
            {!reduce && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? c.play : c.pause} className="absolute end-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-[rgb(30_30_30/0.85)] text-white/80 ring-1 ring-white/10 backdrop-blur-md transition-colors hover:text-white md:end-5 md:top-5">{paused ? <Play size={15} weight="fill" aria-hidden="true" /> : <Pause size={15} weight="fill" aria-hidden="true" />}</button>}
            <div className="absolute left-1/2 top-[19%] w-[min(42%,280px)] -translate-x-1/2 lg:top-[17%] lg:w-[min(50%,280px)]" dir="ltr">
              <Device label={s[i][0]}>{near ? screen : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}
                className="absolute start-4 top-4 flex w-max max-w-[calc(100%-5rem)] items-center gap-2.5 rounded-full bg-[rgb(30_30_30/0.85)] py-1.5 pe-4 ps-1.5 text-[13px] font-medium text-white ring-1 ring-white/10 backdrop-blur-md md:start-5 md:top-5 md:gap-3 md:py-2 md:pe-5 md:ps-2 md:text-[14px]">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[#111] md:h-8 md:w-8"><ChipIc size={15} /></span><span className="truncate">{chips[i]}</span>
              </m.div>
            </AnimatePresence>
          </div>
          <ol className="flex flex-col gap-1 lg:col-span-5 lg:justify-center" role="tablist" aria-label={c.k}>
            {s.map(([h, p], k) => { const I = STAGE[k].icon; const act = i === k; return (
              <li key={h}>
                <button type="button" role="tab" aria-selected={act} onClick={() => setI(k)} onFocus={() => setI(k)}
                  className={`relative block w-full rounded-[20px] p-3 text-start transition-colors duration-300 md:rounded-[22px] md:p-5 ${act ? "bg-[var(--card)]" : "hover:bg-[var(--card)]/50"}`}>
                  <span className="flex items-center gap-3 md:gap-4">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-[12px] transition-colors duration-300 md:h-11 md:w-11 md:rounded-[14px] ${act ? "bg-[var(--card-2)] text-ink" : "text-ink-faint"}`}><I size={19} /></span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-medium uppercase tracking-[.08em] text-ink-faint">{String(k + 1).padStart(2, "0")}</span>
                      <span className={`block text-[17px] font-semibold leading-snug tracking-[-0.015em] transition-colors md:text-[19px] ${act ? "text-ink" : "text-ink-muted"}`}>{h}</span>
                    </span>
                  </span>
                  <span className={`mt-2 block text-[15px] leading-[1.55] text-ink-muted md:mt-3 md:ps-[3.75rem] ${act ? "" : "hidden"}`}>{k === 0 ? c.steps[0][1] : p}</span>
                  {act && <span aria-hidden="true" className="mt-3 block h-[2px] overflow-hidden rounded-full bg-[var(--card-2)] md:mt-4 md:ms-[3.75rem]">
                    <span key={`${i}-${run}`} className="block h-full origin-left rounded-full bg-ink/70 rtl:origin-right" style={{ animation: run ? "procbar 6s linear forwards" : "none", transform: run ? undefined : "scaleX(1)" }} /></span>}
                </button>
              </li>); })}
          </ol>
        </div>
        <div className="mt-5 flex flex-col gap-2 text-[13px] text-ink-faint sm:flex-row sm:justify-between md:mt-6">
          <p className="flex items-start gap-2"><ShieldCheck size={15} aria-hidden="true" className="mt-px shrink-0" />{c.note}</p><p>{c.sample}</p>
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
            <h2 id="int-h" className="flex shrink-0 items-center gap-2.5 text-[16px] font-semibold"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--card-2)]"><PlugsConnected size={16} aria-hidden="true" /></span>{c.k}</h2>
          <ul className="flex flex-1 flex-wrap items-center gap-1.5 md:gap-2">
            {LIVE.map(([I, n], i) => <li key={n} className={`${chip} bg-[var(--card-2)] font-medium`}><I size={15} aria-hidden="true" />{n}<span className="sr-only"> ({c.liveItems[i]}, {c.live})</span><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-calm-aqua" /></li>)}
            <li className="px-1 text-[13px] text-ink-faint">{d.pricingPage.soon}:</li>
            {NEXT.map(([I, n]) => <li key={n} className={`${chip} text-ink-muted ring-1 ring-inset ring-[var(--card-2)]`}><I size={15} aria-hidden="true" />{n}</li>)}
          </ul>
          <Link href="/integrations/" className="inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start text-[14px] font-semibold hover:underline lg:self-auto">{c.cta}<ArrowRight size={13} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
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
              <span className={`mt-0.5 text-[12px] ${act ? "text-bg/75" : "text-ink-faint"}`}>{pr ? pr.now : "30+"}</span>
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
