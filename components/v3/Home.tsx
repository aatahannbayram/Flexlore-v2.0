"use client";
/* Home page, below the problem block (dark ground; light only when the visitor picks it).
 * Order: how it works (4 steps, one stage) · standards (3 photo cards with live fragments) · workspaces (tree) ·
 * web panel ("desk to field") · customers (sector tabs + carousel) · FAQ · closing call to action.
 * Copy: d.process / d.caps / d.faq / d.end (main dictionary), HOME2 (steps), HOME3 (FAQ device line), HOME4 (rest). */
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { SITE } from "../config";
import { useLocale, fmt } from "../i18n/LocaleProvider";
import { HOME2 } from "../i18n/home2";
import { HOME3 } from "../i18n/home3";
import { HOME4 } from "../i18n/home4";
import { EXTRA } from "../i18n/extra";
import { Device, WorkScreen } from "../AppScreens";
import { EASE } from "../ui/Reveal";
import { Plus, Play, Pause, FilmSlate, Sparkle, ListChecks, ChartBar, ShieldCheck, CheckCircle, MapPin, LockSimple, BookOpen, Users, ForkKnife, Storefront, Factory, HardHat } from "../ui/icons";
import { Chev } from "./Chevron";
import { CASES } from "./cases";
import { Photo, Kicker, rise, type Media } from "./Top";

const H2 = ({ id, a, b, className = "" }: { id: string; a: string; b?: string; className?: string }) => (
  <h2 id={id} className={`v4-h2 mt-4 ${className}`}>{a}{b && <> <span className="text-ink-faint">{b}</span></>}</h2>);
const glass = "rounded-[16px] bg-[rgb(20_20_20/0.72)] ring-1 ring-white/10 backdrop-blur-xl";

/* ---------- How it works: four steps, one stage ----------
 * Steps advance every 6 s while in view (pausable, never under reduced motion); hover holds, click or focus picks.
 * The stage is the step's own field photo, softened, behind the phone with the real screen and a status chip. */
const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const STAGE: { img: Media; icon: typeof FilmSlate }[] = [
  { img: "saha-iskele-pov", icon: FilmSlate }, { img: "case-eatwell", icon: Sparkle }, { img: "saha-eldiven-makro", icon: ListChecks }, { img: "web-toplanti", icon: ChartBar }];
export function StepsV3() {
  const { d, lang, locale } = useLocale(); const c = d.process; const s = HOME2[locale].steps; const x = EXTRA[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const on = useInView(ref, { amount: 0.35 }); const near = useInView(ref, { margin: "300px 0px", once: true });
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const [paused, setPaused] = useState(false);
  const run = on && !hold && !paused && !reduce;
  useEffect(() => { if (!run) return; const t = window.setTimeout(() => setI((k) => (k + 1) % 4), 6000); return () => window.clearTimeout(t); }, [run, i]);
  const screen = i === 0 ? <Editor active={on} lang={lang} /> : i === 1 ? <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} />
    : i === 2 ? <WorkScreen active={on} lang={lang} /> : <Ready active={on} lang={lang} />;
  const ChipIc = STAGE[i].icon;
  return (
    <section id="how" aria-labelledby="how-h" className="section-y">
      <div className="container-x">
        <Kicker>{c.k}</Kicker><H2 id="how-h" a={c.h} className="max-w-[20ch]" />
        <div ref={ref} className="mt-8 grid gap-4 md:mt-12 lg:grid-cols-12 lg:gap-10" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div className="dark relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#141414] ring-1 ring-white/[.06] sm:aspect-[16/11] lg:order-last lg:col-span-7 lg:aspect-auto lg:min-h-[600px]">
            <AnimatePresence initial={false}>
              <m.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}>
                {near && <Photo n={STAGE[i].img} sizes="(min-width:1024px) 55vw, 100vw" className="absolute inset-0 h-full w-full object-cover opacity-60 blur-[2px]" />}
              </m.div>
            </AnimatePresence>
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgb(17_17_17/0.15)_0%,rgb(17_17_17/0.8)_80%)]" />
            {!reduce && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? c.play : c.pause} className="absolute end-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-[rgb(30_30_30/0.85)] text-white/80 ring-1 ring-white/10 backdrop-blur-md transition-colors hover:text-white md:end-5 md:top-5">{paused ? <Play size={15} weight="fill" aria-hidden="true" /> : <Pause size={15} weight="fill" aria-hidden="true" />}</button>}
            <div className="absolute left-1/2 top-[18%] w-[min(42%,270px)] -translate-x-1/2 lg:top-[15%] lg:w-[min(48%,280px)]" dir="ltr">
              <Device label={s[i][0]}>{near ? screen : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}
                className="absolute start-4 top-4 flex w-max max-w-[calc(100%-5rem)] items-center gap-2.5 rounded-full bg-[rgb(30_30_30/0.85)] py-1.5 pe-4 ps-1.5 text-[13px] font-medium text-white ring-1 ring-white/10 backdrop-blur-md md:start-5 md:top-5 md:gap-3 md:py-2 md:pe-5 md:ps-2 md:text-[14px]">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-[#111] md:h-8 md:w-8"><ChipIc size={15} /></span><span className="truncate">{x.chips[i]}</span>
              </m.div>
            </AnimatePresence>
          </div>
          <ol className="flex flex-col gap-1 lg:col-span-5 lg:justify-center" role="tablist" aria-label={c.k}>
            {s.map(([h, p], k) => { const I = STAGE[k].icon; const act = i === k; return (
              <li key={h}>
                <button type="button" role="tab" aria-selected={act} onClick={() => setI(k)} onFocus={() => setI(k)}
                  className={`group relative block w-full rounded-[20px] p-3 text-start transition-colors duration-300 md:p-5 ${act ? "bg-[var(--card)] ring-1 ring-white/[.06]" : "hover:bg-[var(--card)]/50"}`}>
                  <span className="flex items-center gap-3 md:gap-4">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-[12px] transition-colors duration-300 md:h-11 md:w-11 ${act ? "bg-accent text-[#111]" : "bg-[var(--card)] text-ink-faint"}`}><I size={19} /></span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-[12px] font-semibold tabular-nums text-ink-faint"><Chev className={`h-2 w-3 ${act ? "text-accent" : ""}`} />{String(k + 1).padStart(2, "0")}</span>
                      <span className={`block text-[17px] font-semibold leading-snug tracking-[-0.015em] transition-colors md:text-[19px] ${act ? "text-ink" : "text-ink-muted"}`}>{h}</span>
                    </span>
                  </span>
                  <span className={`mt-2 block text-[15px] leading-[1.55] text-ink-muted md:mt-3 md:ps-[3.75rem] ${act ? "" : "hidden"}`}>{k === 0 ? c.steps[0][1] : p}</span>
                  {act && <span aria-hidden="true" className="mt-3 block h-[2px] overflow-hidden rounded-full bg-[var(--card-2)] md:mt-4 md:ms-[3.75rem]">
                    <span key={`${i}-${run}`} className="block h-full origin-left rounded-full bg-accent rtl:origin-right" style={{ animation: run ? "procbar 6s linear forwards" : "none", transform: run ? undefined : "scaleX(1)" }} /></span>}
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

/* ---------- Standards: three photo cards, each with a live product fragment ----------
 * The photo fills the top of the card with the fragment on it; title and line on the card below.
 * Phones: one row that scrolls sideways (snap, the next card peeks), so the block stays short. */
export function StandardV3() {
  const { d } = useLocale(); const c = d.caps; const f = c.frag; const reduce = useReducedMotion();
  const ref = useRef<HTMLUListElement>(null); const go = useInView(ref, { amount: 0.3, once: true });
  const vals = [92, 78, 64];
  const frags = [
    <div key="a" className={`${glass} space-y-1.5 p-2`}>{([[3, f.s1], [4, f.s2]] as const).map(([n, t], k) => (
      <div key={k} className="flex items-center gap-2.5 rounded-[10px] bg-white/[.05] px-3 py-2 text-[13px] text-white">
        <span className="tabular-nums text-white/55">{n}</span><span className="min-w-0 flex-1 truncate">{t}</span>
        <span className="relative h-6 w-[5.8rem] shrink-0">
          <span className="bx-out absolute inset-0 grid place-items-center rounded-full bg-white/10 text-[12px] text-white/80" style={{ animationDelay: `${900 + k * 500}ms` }}><span className="flex items-center gap-1"><Sparkle size={11} weight="fill" />{f.draft}</span></span>
          <span className="bx-in absolute inset-0 grid place-items-center rounded-full bg-white text-[12px] font-semibold text-[#111]" style={{ animationDelay: `${900 + k * 500}ms` }}><span className="flex items-center gap-1"><CheckCircle size={11} weight="fill" />{f.ok}</span></span>
        </span></div>))}</div>,
    <div key="b" className={`${glass} space-y-2.5 p-3`}>{f.sites.map((n, k) => (
      <div key={n} className="text-[13px] text-white"><div className="flex justify-between"><span>{n}</span><span className="tabular-nums text-white/70">%{vals[k]}</span></div>
        <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/10"><span className="bx-bar block h-full origin-left rounded-full bg-white/85 rtl:origin-right" style={{ width: `${vals[k]}%`, animationDelay: `${600 + k * 200}ms` }} /></span></div>))}</div>,
    <div key="c" className={`${glass} space-y-1.5 p-2`}>{f.roles.map(([r, w], k) => (
      <div key={r} className="bx-rise flex items-center gap-2 rounded-[10px] bg-white/[.05] px-3 py-2 text-[13px] text-white" style={{ animationDelay: `${600 + k * 180}ms` }}>
        <span className="min-w-0 flex-1 truncate">{r}</span><span className="flex items-center gap-1 text-white/60"><MapPin size={12} />{w}</span>
        {k < 2 ? <CheckCircle size={14} weight="fill" className="text-white" /> : <LockSimple size={14} className="text-white/60" />}</div>))}</div>,
  ];
  const imgs: Media[] = ["hero-sef", "saha-drone-cember", "case-sistemteknik"];
  return (
    <section aria-labelledby="std-h" className="section-y pt-0">
      <div className="container-x">
        <Kicker>{c.k}</Kicker><H2 id="std-h" a={c.h} b={c.h2} className="max-w-[18ch]" />
        <p className="mt-4 max-w-[34rem] text-[16px] leading-[1.55] text-ink-muted md:text-[17px]">{c.lead}</p>
        <ul ref={ref} className={`no-sb -mx-[var(--pad-x)] mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--pad-x)] [scroll-padding-inline:var(--pad-x)] md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:overflow-visible md:px-0 ${go || reduce ? "bx-go" : ""}`}>
          {c.cards.map(([h, p], k) => (
            <m.li key={h} {...rise(reduce, k)} className="group w-[84%] shrink-0 snap-start overflow-hidden rounded-[24px] bg-[var(--card)] ring-1 ring-white/[.06] md:w-auto">
              <div className="dark relative aspect-[4/3] overflow-hidden">
                <Photo n={imgs[k]} sizes="(min-width:768px) 33vw, 84vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_35%,rgb(17_17_17/0.75)_100%)]" />
                <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4" aria-hidden="true">{frags[k]}</div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.02em] md:text-[21px]">{h}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{p}</p>
              </div>
            </m.li>))}
        </ul>
        <p className="mt-3 text-[12px] text-ink-faint">{c.sample}</p>
      </div>
    </section>);
}

/* ---------- Workspaces: head office and three sites, each with its jobs, people and what is due ----------
 * The connector draws in when the tree enters view; each site lifts on hover. */
export function WorkspaceV3() {
  const { locale } = useLocale(); const c = HOME4[locale].ws; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const seen = useInView(ref, { amount: 0.4, once: true });
  const nodes: [string, Media, number, number, number][] = [[c.nodes[0], "web-toplanti", 7, 48, 0], [c.nodes[1], "problem-vardiya", 12, 64, 5], [c.nodes[2], "saha-santiye-havadan", 9, 41, 3], [c.nodes[3], "saha-liman", 13, 93, 8]];
  const Node = ({ n }: { n: (typeof nodes)[number] }) => (
    <div className="overflow-hidden rounded-[16px] bg-[var(--card-2)] ring-1 ring-white/[.06] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-16 sm:h-20 md:h-24"><Photo n={n[1]} sizes="200px" className="absolute inset-0 h-full w-full object-cover" />
        {n[4] > 0 && <span className="absolute end-1.5 top-1.5 rounded-full bg-[#111]/80 px-2 py-0.5 text-[12px] font-semibold text-accent-text backdrop-blur">{fmt(c.due, { n: n[4] })}</span>}</div>
      <p className="truncate px-2 py-2.5 text-center text-[14px] font-semibold md:text-[15px]">{n[0]}</p>
      <div className="grid grid-cols-2 border-t border-line text-[12px] text-ink-muted md:text-[13px]">
        <span className="flex items-center justify-center gap-1 py-2"><BookOpen size={13} aria-hidden="true" />{n[2]}<span className="sr-only"> {c.jobs}</span></span>
        <span className="flex items-center justify-center gap-1 border-s border-line py-2"><Users size={13} aria-hidden="true" />{n[3]}<span className="sr-only"> {c.people}</span></span>
      </div>
    </div>);
  return (
    <section aria-labelledby="ws-h" className="section-y pt-0">
      <div className="container-x grid-12 items-center gap-y-10">
        <div className="col-span-12 lg:col-span-5 lg:order-last lg:ps-6">
          <Kicker>{c.k}</Kicker><H2 id="ws-h" a={c.h} className="max-w-[16ch]" />
          <p className="mt-4 text-[16px] leading-[1.55] text-ink-muted md:text-[17px]">{c.p}</p>
          <ul className="mt-6 space-y-2.5">{c.pts.map((p) => <li key={p} className="flex items-start gap-3 text-[15px]"><Chev dir="end" className="mt-[7px] h-2 w-3 text-accent" />{p}</li>)}</ul>
        </div>
        <div ref={ref} className="col-span-12 lg:col-span-7">
          <div className="rounded-[24px] bg-[var(--card)] p-4 ring-1 ring-white/[.06] md:p-8">
            <div className="mx-auto w-[44%] min-w-[140px] max-w-[220px]"><Node n={nodes[0]} /></div>
            <svg aria-hidden="true" viewBox="0 0 300 40" preserveAspectRatio="none" className="mx-auto block h-10 w-[68%] text-accent/70">
              <path d="M150 0 V18 M150 18 H40 Q30 18 30 28 V40 M150 18 H260 Q270 18 270 28 V40 M150 18 V40" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
                pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: seen || reduce ? 0 : 1, transition: reduce ? "none" : "stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)" }} />
            </svg>
            <div className="grid grid-cols-3 gap-2 md:gap-3">{nodes.slice(1).map((n) => <Node key={n[0]} n={n} />)}</div>
            <p className="mt-4 text-center text-[12px] text-ink-faint">{c.sample}</p>
          </div>
        </div>
      </div>
    </section>);
}

/* ---------- Web panel: desk to field ----------
 * Copy and a three-stop flow on the left; on the right the live panel in a bezel that runs off the edge, with the
 * phone (the field) overlapping its corner. Phones: the bezel stays inside the page. */
const Dash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="aspect-[1180/720] w-full" /> });
export function WebV3() {
  const { locale, lang, d } = useLocale(); const t = HOME4[locale].web; const soon = HOME2[locale].web.soon; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const near = useInView(ref, { margin: "300px 0px", once: true }); const on = useInView(ref, { amount: 0.25 });
  return (
    <section id="web" aria-labelledby="web-h" className="section-y overflow-hidden pt-0">
      <div className="container-x grid-12 items-center gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3"><Kicker>{t.k}</Kicker><span className="rounded-full border border-line px-2.5 py-0.5 text-[12px] font-medium text-ink-muted">{soon}</span></div>
          <H2 id="web-h" a={t.h} b={t.h2} />
          <p className="mt-4 max-w-[30rem] text-[16px] leading-[1.55] text-ink-muted md:text-[17px]">{t.p}</p>
          <ol className="mt-7">
            {t.flow.map(([h, p], k) => (
              <m.li key={h} {...rise(reduce, k)} className="relative flex gap-4">
                <span className="relative flex flex-col items-center"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[13px] font-semibold ${k === 1 ? "bg-accent text-[#111]" : "bg-[var(--card)] text-ink ring-1 ring-white/[.08]"}`}>{k + 1}</span>
                  {k < 2 && <span aria-hidden="true" className="w-px flex-1 bg-line-strong" />}</span>
                <span className="pb-5 pt-1.5"><span className="block text-[16px] font-semibold">{h}</span><span className="mt-0.5 block text-[15px] text-ink-muted">{p}</span></span>
              </m.li>))}
          </ol>
          <a href={SITE.demo} className="btn btn-primary group mt-2 h-12 px-6">{t.cta}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
        </div>
        <div ref={ref} className="relative col-span-12 lg:col-span-7">
          <div className="relative rounded-[24px] bg-[var(--card)] p-2.5 ring-1 ring-white/[.06] md:p-4 lg:me-[calc(-1*max(var(--pad-x),(100vw-var(--container))/2))] lg:rounded-e-none" dir="ltr">
            <div className="overflow-hidden rounded-[14px] ring-1 ring-white/[.08] md:rounded-[16px]">
              <div aria-hidden="true" className="flex h-7 items-center gap-1.5 bg-[#1b1b1b] px-3"><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="mx-auto rounded-full bg-[#111] px-3 py-0.5 text-[10px] text-white/50">app.flexlore.com</span></div>
              <div role="img" aria-label={`${t.k}: ${t.flow.map((x) => x[0]).join(", ")}`}>{near ? <Dash on={on} lang={lang} /> : <div className="aspect-[1180/720] w-full" />}</div>
            </div>
            <div className="absolute -bottom-6 left-[3%] w-[24%] max-w-[170px] md:-bottom-8 lg:left-[-5%]" aria-hidden="true">
              <Device label={d.hero.chip.t}>{near ? <WorkScreen active={on} lang={lang} /> : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
          </div>
          <p className="mt-10 ps-[22%] text-[12px] text-ink-faint md:ps-[20%]">{t.sample}</p>
        </div>
      </div>
    </section>);
}

/* ---------- Customers: sector tabs over a sideways carousel ----------
 * Full-width photo cards (16:8 desktop, 4:5 phones), the next one peeking. Each card: sector, company, what they do.
 * Drag with the mouse, swipe, arrows or arrow keys; tabs jump to the sector and follow the scroll. */
const SEC_IC = { food: ForkKnife, franchise: Storefront, mfg: Factory, build: HardHat } as const;
export function CasesV3() {
  const { locale } = useLocale(); const t = HOME4[locale].cases; const reduce = useReducedMotion();
  const list = CASES; const track = useRef<HTMLDivElement>(null); const [i, setI] = useState(0);
  const secs = [...new Set(list.map((c) => c.sec))];
  const go = useCallback((n: number) => { const el = track.current; if (!el) return; const k = Math.max(0, Math.min(list.length - 1, n)); const card = el.children[k] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(el).paddingInlineStart), behavior: reduce ? "auto" : "smooth" }); setI(k); }, [list.length, reduce]);
  useEffect(() => { const el = track.current; if (!el) return; let raf = 0;
    const f = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const pad = parseFloat(getComputedStyle(el).paddingInlineStart); const kids = [...el.children] as HTMLElement[];
      let best = 0, dist = Infinity; kids.forEach((c, k) => { const dd = Math.abs(c.offsetLeft - pad - el.scrollLeft); if (dd < dist) { dist = dd; best = k; } }); setI(best); }); };
    el.addEventListener("scroll", f, { passive: true }); return () => { el.removeEventListener("scroll", f); cancelAnimationFrame(raf); }; }, []);
  // Mouse drag (touch and trackpads scroll natively).
  const drag = useRef<{ x: number; l: number; moved: boolean } | null>(null);
  const down = (e: React.PointerEvent) => { if (e.pointerType !== "mouse" || !track.current) return; drag.current = { x: e.clientX, l: track.current.scrollLeft, moved: false }; track.current.style.scrollSnapType = "none"; };
  const move = (e: React.PointerEvent) => { const g = drag.current; if (!g || !track.current) return; const dx = e.clientX - g.x; if (Math.abs(dx) > 4) g.moved = true; track.current.scrollLeft = g.l - dx; };
  const up = () => { const g = drag.current; if (!g || !track.current) return; track.current.style.scrollSnapType = ""; drag.current = null; if (g.moved) go(i); };
  return (
    <section id="customers" aria-labelledby="cases-h" className="section-y overflow-hidden pt-0">
      <div className="container-x">
        <Kicker>{t.k}</Kicker><H2 id="cases-h" a={t.h} b={t.h2} className="max-w-[22ch]" />
        <div className="mt-8 flex items-center justify-between gap-4">
          <div role="tablist" aria-label={t.k} className="no-sb -mx-[var(--pad-x)] flex gap-1 overflow-x-auto px-[var(--pad-x)] md:mx-0 md:px-0">
            {secs.map((sc) => { const I = SEC_IC[sc]; const act = list[i]?.sec === sc; return (
              <button key={sc} type="button" role="tab" aria-selected={act} onClick={() => go(list.findIndex((c) => c.sec === sc))}
                className={`relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[15px] font-medium transition-colors ${act ? "text-ink" : "text-ink-faint hover:text-ink"}`}>
                {act && <m.span layoutId="case-tab" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} className="absolute inset-0 rounded-full bg-[var(--card)] ring-1 ring-white/[.08]" />}
                <I size={16} aria-hidden="true" className="relative" /><span className="relative">{t.sec[sc]}</span></button>); })}
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-line-strong transition-opacity disabled:opacity-30"><Chev dir="start" className="h-2.5 w-3.5" /></button>
            <button type="button" onClick={() => go(i + 1)} disabled={i === list.length - 1} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-line-strong transition-opacity disabled:opacity-30"><Chev dir="end" className="h-2.5 w-3.5" /></button>
          </div>
        </div>
      </div>
      <div ref={track} role="region" aria-roledescription="carousel" aria-label={t.k} tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); } }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
        className="no-sb relative mt-5 flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto px-[max(var(--pad-x),calc((100vw-var(--container))/2))] [scroll-padding-inline:max(var(--pad-x),calc((100vw-var(--container))/2))] active:cursor-grabbing md:gap-4">
        {list.map((c, k) => { const I = SEC_IC[c.sec]; const act = k === i; return (
          <article key={c.slug} aria-roledescription="slide" aria-label={`${c.company}, ${k + 1} / ${list.length}`}
            className={`dark relative aspect-[4/5] w-[86%] shrink-0 snap-start select-none overflow-hidden rounded-[24px] bg-[#111111] text-white transition-opacity duration-500 sm:aspect-[16/10] md:aspect-[16/8] md:w-[min(1100px,82%)] ${act ? "opacity-100" : "opacity-50"}`}>
            <Photo n={c.img} portrait sizes="(min-width:768px) 82vw, 86vw" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgb(17_17_17/0.88)_0%,rgb(17_17_17/0.25)_45%,rgb(17_17_17/0.1)_70%,rgb(17_17_17/0.45)_100%)]" />
            <div className="relative flex h-full flex-col justify-between p-5 md:p-9">
              <span className="inline-flex w-max items-center gap-2 rounded-full bg-[rgb(17_17_17/0.55)] px-3 py-1.5 text-[13px] font-medium text-white/90 ring-1 ring-white/15 backdrop-blur-md"><I size={14} aria-hidden="true" />{t.sec[c.sec]}</span>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-[clamp(26px,1rem+2vw,48px)] font-semibold leading-[1.02] tracking-[-0.035em]">{c.company}</h3>
                  <p className="mt-2 text-[15px] text-[#E6E6E6] md:text-[17px]">{t.desc[c.desc]}</p>
                </div>
                <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-[14px] font-medium text-white/85 ring-1 ring-white/15 backdrop-blur-md">{t.soon}</span>
              </div>
            </div>
          </article>); })}
      </div>
      <div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">{list.map((c, k) => <span key={c.slug} className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-ink" : "w-1.5 bg-line-strong"}`} />)}</div>
    </section>);
}

/* ---------- FAQ: six questions, one open at a time ---------- */
const FAQ_PICK = [0, 1, 2, 4, 5, 7];
export function FaqV3() {
  const { d, locale } = useLocale(); const c = d.faq; const t = HOME3[locale]; const reduce = useReducedMotion(); const [open, setOpen] = useState<number | null>(null);
  const items = FAQ_PICK.map((k) => c.items[k]).filter(Boolean).map(([q, a], k) => [q, FAQ_PICK[k] === 4 ? t.dev : a] as const);
  return (
    <section id="faq" aria-labelledby="faq-h" className="section-y pt-0">
      <div className="container-x grid-12 gap-y-6">
        <div className="col-span-12 lg:col-span-4">
          <Kicker>{c.k}</Kicker><H2 id="faq-h" a={c.h} />
          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link href="/pricing/" className="inline-flex min-h-11 items-center rounded-full bg-[var(--card)] px-4 text-[14px] font-semibold ring-1 ring-white/[.06] hover:bg-[var(--card-2)]">{d.pricing.all}</Link>
            <a href="mailto:support@flexlore.com" className="inline-flex min-h-11 items-center px-2 text-[14px] text-ink-muted underline-offset-4 hover:text-ink hover:underline">support@flexlore.com</a>
          </div>
        </div>
        <ul className="col-span-12 overflow-hidden rounded-[24px] bg-[var(--card)] ring-1 ring-white/[.06] lg:col-span-7 lg:col-start-6">
          {items.map(([q, a], i) => { const on = open === i; return (
            <li key={q} className="border-line [&:not(:first-child)]:border-t">
              <h3><button type="button" id={`faq-q-${i}`} aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}
                className="group flex min-h-14 w-full items-center justify-between gap-4 px-5 py-3 text-start text-[16px] font-semibold leading-snug tracking-[-.01em] md:min-h-16 md:px-7 md:text-[18px]">
                <span className={on ? "text-ink" : "text-ink/85 group-hover:text-ink"}>{q}</span>
                <m.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.25, ease: EASE }} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${on ? "bg-accent text-[#111]" : "bg-[var(--card-2)] text-ink-muted"}`}><Plus size={14} aria-hidden="true" /></m.span>
              </button></h3>
              <AnimatePresence initial={false}>{on && (
                <m.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.3, ease: EASE }} className="overflow-hidden">
                  <p className="max-w-[38rem] px-5 pb-5 pe-14 text-[16px] leading-[1.6] text-ink-muted md:px-7">{a}</p></m.div>)}</AnimatePresence>
            </li>); })}
        </ul>
      </div>
    </section>);
}

/* ---------- Closing call to action: the approved card with the phone and tablet on one stand ---------- */
const CtaDuoInner = dynamic(() => import("../home/CtaDuo").then((x) => x.CtaDuo), { ssr: false, loading: () => <div className="aspect-[2752/1536] w-full" /> });
export function EndV3() {
  const { d, lang } = useLocale(); const c = d.end;
  return (
    <section aria-labelledby="end-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-center gap-y-7 overflow-hidden rounded-[28px] bg-[var(--card)] px-5 py-8 ring-1 ring-white/[.06] sm:px-10 md:py-16 lg:px-16">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="end-h" className="v4-h2 max-w-[12ch]">{c.h}</h2>
            <p className="mt-4 max-w-[26rem] text-[17px] leading-[1.55] text-ink-muted">{c.p}</p>
            <a href={SITE.demo} className="btn btn-accent group mt-7 h-12 px-6 text-[16px]">{c.cta}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
          </div>
          <div className="col-span-12 mx-auto w-[86%] sm:w-full lg:col-span-7"><div dir="ltr"><CtaDuoInner lang={lang} /></div></div>
        </div>
      </div>
    </section>);
}

/** Everything below the problem block, in page order. */
export default function BelowV3() {
  return (<><StepsV3 /><StandardV3 /><WorkspaceV3 /><WebV3 /><CasesV3 /><FaqV3 /><EndV3 /></>);
}
