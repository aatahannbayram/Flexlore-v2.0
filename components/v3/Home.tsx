"use client";
/* Home page below the hero. Sections chosen by Flexlore (2026-11-05), warm and premium on the dark ground:
 * how it works (4 steps, one stage) · standards (3 full-photo cards) · workspaces (pick a site) ·
 * web, desk to field (meeting room and field side by side) · customers (sector tabs, sideways carousel) · closing card.
 * Few icons and badges; orange is the progress line and the call to action.
 * Copy: d.process / d.caps / d.bento / d.end (main dictionary), HOME2 (steps, web chip), HOME4 (workspaces, web, customers). */
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { SITE } from "../config";
import { useLocale, fmt } from "../i18n/LocaleProvider";
import { HOME2 } from "../i18n/home2";
import { HOME4 } from "../i18n/home4";
import { EXTRA } from "../i18n/extra";
import { Device, WorkScreen, Status, Nav, Player, Clip, CheckRing } from "../AppScreens";
import { EASE } from "../ui/Reveal";
import { Play, Pause, Check, Sparkle, ShieldCheck, CheckCircle, MapPin, LockSimple, BookOpen, Users, ForkKnife, Storefront, Factory, HardHat, Buildings, Bed, ArrowRight, FirstAid, GraduationCap, ChalkboardTeacher, Barbell, FilmSlate, DotsThreeCircle } from "../ui/icons";
import { SmartVideo } from "../ui/SmartVideo";
import { LOCALES } from "../i18n/locales";
import { Chev } from "./Chevron";
import { CASES } from "./cases";
import { Photo, Kicker, rise, type Media } from "./Top";
import M from "./media.json";

/** Section heading: words rise in one after another when the heading enters view (static under reduced motion). */
/** Payoff words in a heading: muted ink warming toward the accent, word by word (at most 45% accent, so it stays calm). */
const warm = (k: number, n: number) => `color-mix(in oklab, var(--color-ink-muted) ${100 - Math.round(((k + 1) / Math.max(n, 1)) * 45)}%, var(--color-accent))`;
function H2({ id, a, b, className = "" }: { id: string; a: string; b?: string; className?: string }) {
  const reduce = useReducedMotion(); const aw = a.split(" "); const nA = b ? aw.length : aw.length - Math.ceil(aw.length / 3); /* no payoff given: the last third carries it */
  const words = [...aw.map((w, k) => [w, k >= nA] as const), ...(b ? b.split(" ").map((w) => [w, true] as const) : [])];
  if (reduce) return <h2 id={id} className={`v4-h2 mt-4 ${className}`}>{aw.slice(0, nA).join(" ")} <span style={{ color: warm(0, 1) }}>{[...aw.slice(nA), ...(b ? [b] : [])].join(" ")}</span></h2>;
  return (
    <m.h2 id={id} aria-label={b ? `${a} ${b}` : a} className={`v4-h2 mt-4 ${className}`} initial="h" whileInView="s" viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.045 }}>
      {words.map(([w, faint], k) => (
        <span key={k} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <m.span className="inline-block" style={faint ? { color: warm(k - nA, words.length - nA) } : undefined} variants={{ h: { y: "105%" }, s: { y: 0 } }} transition={{ duration: 0.7, ease: EASE }}>{w}</m.span>
        </span>)).flatMap((el, k) => (k ? [" ", el] : [el]))}
    </m.h2>);
}
/** Chapter marker: the home page reads as one story, numbered 01 to 06 (how, standard, sites, desk to field, industries, customers). */
const Ch = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-3"><span className="text-[13px] font-semibold tabular-nums text-ink">{n}</span><span aria-hidden="true" className="h-px w-8 bg-[rgb(255_240_225/0.2)]" /><Kicker>{children}</Kicker></div>);
const glass = "rounded-[16px] bg-[rgb(26_22_19/0.62)] ring-1 ring-[rgb(255_240_225/0.14)] backdrop-blur-xl";
/** Warm fade from the photo into the ground. */
const fade = "bg-[linear-gradient(180deg,rgb(17_14_12/0)_30%,rgb(17_14_12/0.55)_62%,rgb(17_14_12/0.94)_100%)]";

/* ---------- How it works: five steps, one stage ----------
 * Steps advance every 6 s while in view (pausable, never under reduced motion); hover holds, click or focus picks.
 * The stage is the step's own field photo behind the phone with the real screen and a status chip. */
const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const STAGE: (Media | "phone-mount")[] = ["saha-iskele-pov", "phone-mount", "saha-eldiven-makro", "problem-kagitlar", "saha-santiye-havadan"];
/* Who is holding the phone at each step: 0 manager, 1 team member. */
const ROLE = [0, 0, 1, 1, 0] as const;
/* Stage photo: the v3 set, plus the phone-on-a-mount still (public/photos) for the edit step. */
function StageImg({ n }: { n: Media | "phone-mount" }) {
  if (n !== "phone-mount") return <Photo n={n} sizes="(min-width:1024px) 55vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />;
  return (<picture><source type="image/avif" srcSet="/photos/phone-mount-800.avif 800w, /photos/phone-mount-1600.avif 1600w" sizes="(min-width:1024px) 55vw, 100vw" />
    <img src="/photos/phone-mount-1600.webp" srcSet="/photos/phone-mount-800.webp 800w, /photos/phone-mount-1600.webp 1600w" sizes="(min-width:1024px) 55vw, 100vw" alt="" decoding="async" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[30%_50%] saturate-[0.85]" /></picture>);
}
/* Step 1 screen: the phone's own camera filming the job (the stage photo in the viewfinder), REC timer counting up. */
function CameraScreen({ active, n }: { active: boolean; n: Media }) {
  const [t, setT] = useState(0);
  useEffect(() => { if (!active) return; setT(0); const id = window.setInterval(() => setT((v) => Math.min(13, v + 1)), 420); return () => window.clearInterval(id); }, [active]);
  return (
    <div className="absolute inset-0 overflow-hidden bg-black text-white">
      <div className="absolute inset-y-[-12%] end-[-4%] w-[300%]"><Photo n={n} sizes="900px" className="absolute inset-0 h-full w-full object-cover" /></div>
      <span className="absolute inset-x-0 top-[10%] flex justify-center"><span className="flex items-center gap-[5px] rounded-full bg-black/55 px-[11px] py-[4px] text-[13px] font-semibold tabular-nums backdrop-blur-md">
        <span className="rec-dot h-[7px] w-[7px] rounded-full bg-accent" />00:{String(t).padStart(2, "0")}</span></span>
      <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 rounded-[6px] border border-white/60" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-[10px] bg-[linear-gradient(0deg,rgb(0_0_0/0.8)_40%,transparent)] pb-[30%] pt-[40px]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Video</span>
        <span className="grid h-[56px] w-[56px] place-items-center rounded-full ring-[3px] ring-white"><span className="h-[21px] w-[21px] rounded-[5px] bg-accent" /></span>
      </div>
    </div>);
}
/* Step 3 screen: the team member on the last step, played full screen; when it ends every step is watched and the quiz
   opens next (step 4). */
const SP = { en: { t: "Opening routine", s: "Step 6 of 6", h: "Open the air valve", p: "Turn the valve a slow quarter turn until the line holds pressure.", more: "Read more...", done: "All steps watched", next: "Start the quiz" },
  tr: { t: "Açılış rutini", s: "Adım 6 / 6", h: "Hava vanasını aç", p: "Hat basıncı tutana kadar vanayı yavaşça çeyrek tur çevir.", more: "Devamı...", done: "Tüm adımlar izlendi", next: "Quize başla" } } as const;
function StepPlayerScreen({ active, lang }: { active: boolean; lang: "en" | "tr" }) {
  const L = SP[lang]; const reduce = useReducedMotion(); const D = 12; const [t, setT] = useState(reduce ? D : 0);
  useEffect(() => { if (!active || reduce) { setT(D); return; } setT(0); const id = window.setInterval(() => setT((v) => Math.min(D, v + 1)), 360); return () => window.clearInterval(id); }, [active, reduce]);
  const done = t >= D;
  return (<div className="absolute inset-0 flex flex-col bg-[#111]">
    <Status /><Nav title={L.t} right={<span className="text-[13px] tabular-nums text-white/60">6/6</span>} />
    <span className="mx-3.5 mt-2 block h-[3px] overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: done ? "100%" : "83.4%" }} /></span>
    <div className="relative mt-3 flex-1 overflow-hidden bg-black">
      <Clip name="steam" active={active} className="scale-[1.02]" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/75 to-transparent" />
      <span className="absolute start-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">{L.s}</span>
      <div className="absolute inset-x-4 bottom-[26px]">
        <p className="mb-2 text-[17px] font-semibold tracking-[-.01em] text-white">{L.h}</p>
        <Player t={t} d={D} text={L.p} more={L.more} />
      </div>
      <div className={`absolute inset-x-5 top-[30%] flex flex-col items-center gap-3 rounded-[18px] bg-black/55 px-4 py-5 text-center backdrop-blur-md transition-all duration-500 ${done ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
        <span className="scale-[1.6]"><CheckRing on={done} reduce={reduce} /></span>
        <span className="mt-1 text-[16px] font-semibold text-white">{L.done}</span>
        <span className="rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-white">{L.next}</span></div>
    </div></div>);
}
export function StepsV3() {
  const { d, lang, locale } = useLocale(); const c = d.process; const s = HOME2[locale].steps; const x = EXTRA[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const on = useInView(ref, { amount: 0.35 }); const near = useInView(ref, { margin: "300px 0px", once: true });
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const [paused, setPaused] = useState(false);
  const run = on && !hold && !paused && !reduce;
  useEffect(() => { if (!run) return; const t = window.setTimeout(() => setI((k) => (k + 1) % 5), 6000); return () => window.clearTimeout(t); }, [run, i]);
  const screen = i === 0 ? <CameraScreen active={on && !reduce} n="saha-iskele-pov" /> : i === 1 ? <Editor active={on} lang={lang} />
    : i === 2 ? <StepPlayerScreen active={on} lang={lang} /> : i === 3 ? <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} /> : <Ready active={on} lang={lang} />;
  const roles = HOME2[locale].roles;
  /* Load the story screens as soon as the section is near, so switching steps never waits on code (no pop-in). */
  useEffect(() => { if (near) void import("../AppScreensStory"); }, [near]);
  return (
    <section id="how" aria-labelledby="how-h" className="section-y">
      <div className="container-x">
        <Ch n="01">{c.k}</Ch><H2 id="how-h" a={c.h} className="max-w-[20ch]" />
        <div ref={ref} className="mt-8 grid gap-4 md:mt-12 lg:grid-cols-12 lg:gap-12" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div className="dark relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#1A1714] sm:aspect-[16/11] lg:order-last lg:col-span-7 lg:aspect-auto lg:min-h-[620px]">
            <AnimatePresence initial={false}>
              <m.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}>
                {near && <StageImg n={STAGE[i]} />}
              </m.div>
            </AnimatePresence>
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgb(17_14_12/0.25)_0%,rgb(17_14_12/0.82)_78%)]" />
            {!reduce && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? c.play : c.pause} className="absolute end-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-[rgb(26_22_19/0.7)] text-white/80 ring-1 ring-white/10 backdrop-blur-md transition-colors hover:text-white md:end-5 md:top-5">{paused ? <Play size={15} weight="fill" aria-hidden="true" /> : <Pause size={15} weight="fill" aria-hidden="true" />}</button>}
            <div className="absolute left-1/2 top-[17%] w-[min(42%,270px)] -translate-x-1/2 drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)] lg:top-[14%] lg:w-[min(46%,280px)]" dir="ltr">
              <Device label={s[i][0]}>{near ? <AnimatePresence initial={false}><m.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35 }}>{screen}</m.div></AnimatePresence> : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}
                className={`${glass} absolute start-4 top-4 flex w-max max-w-[calc(100%-5rem)] items-center gap-2 !rounded-full py-2 pe-4 ps-3 text-[13px] font-medium text-white md:start-5 md:top-5 md:text-[14px]`}>
                <span className="shrink-0 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em]">{roles[ROLE[i]]}</span><span className="truncate">{x.chips[i]}</span>
              </m.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col lg:col-span-5 lg:justify-center">
          <ol className="flex flex-col" role="tablist" aria-label={c.k}>
            {s.map(([h, p], k) => { const act = i === k; const done = k < i; return (
              <li key={h} className="relative">
                {k < s.length - 1 && <span aria-hidden="true" className="absolute start-[21px] top-[64px] -bottom-[8px] w-px overflow-hidden bg-line">
                  <span className="block h-full w-full origin-top bg-ink-faint transition-transform duration-700 ease-out" style={{ transform: done ? "scaleY(1)" : "scaleY(0)" }} /></span>}
                <button type="button" role="tab" aria-selected={act} onClick={() => setI(k)} onFocus={() => setI(k)}
                  className="group grid w-full grid-cols-[44px_1fr] gap-4 py-3 text-start md:gap-5 md:py-4">
                  <span className="relative grid h-11 w-11 place-items-center">
                    <svg aria-hidden="true" viewBox="0 0 44 44" className="absolute inset-0 -rotate-90 rtl:scale-x-[-1]">
                      <circle cx="22" cy="22" r="21" fill="none" strokeWidth="1" className={`transition-colors duration-300 ${act || done ? "stroke-line-strong" : "stroke-line group-hover:stroke-line-strong"}`} />
                      {act && <circle key={`${i}-${run}`} cx="22" cy="22" r="21" fill="none" strokeWidth="1.5" strokeLinecap="round" pathLength={100} className="stroke-accent"
                        style={{ strokeDasharray: 100, strokeDashoffset: run ? 100 : 0, animation: run ? "ringfill 6s linear forwards" : "none" }} />}
                    </svg>
                    {done ? <Check size={16} aria-hidden="true" className="text-ink" />
                      : <span className={`text-[13px] font-semibold tabular-nums transition-colors ${act ? "text-ink" : "text-ink-faint group-hover:text-ink-muted"}`}>{String(k + 1).padStart(2, "0")}</span>}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${act ? (ROLE[k] ? "text-accent-text" : "text-ink-muted") : "text-ink-faint"}`}>{roles[ROLE[k]]}</span>
                    <span className={`mt-0.5 block text-[19px] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-300 md:text-[23px] ${act ? "text-ink" : "text-ink-faint group-hover:text-ink-muted"}`}>{h}</span>
                  </span>
                </button>
              </li>); })}
          </ol>
          {/* One fixed slot for the picked step's text: every description sits in the same grid cell, so the slot is as
              tall as the longest one and nothing above or below moves when the step changes. */}
          <div className="mt-4 grid ps-[60px] md:mt-5 md:ps-[64px]" aria-live="polite">
            {s.map(([h, p], k) => (
              <p key={h} aria-hidden={k !== i} className={`[grid-area:1/1] text-[15px] leading-[1.55] text-ink-muted transition-[opacity,transform] duration-500 ease-out md:text-[16px] ${k === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1.5 opacity-0"}`}>
                {p}</p>))}
          </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2 text-[13px] text-ink-faint sm:flex-row sm:justify-between md:mt-6">
          <p className="flex items-start gap-2"><ShieldCheck size={15} aria-hidden="true" className="mt-px shrink-0" />{c.note}</p><p>{c.sample}</p>
        </div>
      </div>
    </section>);
}

/* ---------- Standards: three full-photo cards (the approved structure) ----------
 * Photo fills the card; a glass product fragment floats in the middle; title and line sit on the photo's warm fade.
 * Phones: one row that scrolls sideways (snap, the next card peeks). */
export function StandardV3() {
  const { d } = useLocale(); const c = d.caps; const f = c.frag; const reduce = useReducedMotion();
  const ref = useRef<HTMLUListElement>(null); const go = useInView(ref, { amount: 0.3, once: true });
  const vals = [92, 78, 64];
  const frags = [
    <div key="a" className={`${glass} space-y-1.5 p-2`}>{([[3, f.s1], [4, f.s2]] as const).map(([n, t], k) => (
      <div key={k} className="flex items-center gap-2.5 rounded-[10px] bg-white/[.06] px-3 py-2.5 text-[13px] text-white">
        <span className="tabular-nums text-white/55">{n}</span><span className="min-w-0 flex-1 truncate">{t}</span>
        <span className="relative h-6 w-[5.8rem] shrink-0">
          <span className="bx-out absolute inset-0 grid place-items-center rounded-full bg-white/10 text-[12px] text-white/80" style={{ animationDelay: `${900 + k * 500}ms` }}><span className="flex items-center gap-1"><Sparkle size={11} weight="fill" />{f.draft}</span></span>
          <span className="bx-in absolute inset-0 grid place-items-center rounded-full bg-[#F4F0EB] text-[12px] font-semibold text-[#111]" style={{ animationDelay: `${900 + k * 500}ms` }}><span className="flex items-center gap-1"><CheckCircle size={11} weight="fill" />{f.ok}</span></span>
        </span></div>))}</div>,
    <div key="b" className={`${glass} space-y-3 p-4`}>{f.sites.map((n, k) => (
      <div key={n} className="text-[13px] text-white"><div className="flex justify-between"><span>{n}</span><span className="tabular-nums text-white/75">%{vals[k]}</span></div>
        <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/10"><span className="bx-bar block h-full origin-left rounded-full bg-[#F4F0EB] rtl:origin-right" style={{ width: `${vals[k]}%`, animationDelay: `${600 + k * 200}ms` }} /></span></div>))}</div>,
    <div key="c" className={`${glass} space-y-1.5 p-2`}>{f.roles.map(([r, w], k) => (
      <div key={r} className="bx-rise flex items-center gap-2 rounded-[10px] bg-white/[.06] px-3 py-2.5 text-[13px] text-white" style={{ animationDelay: `${600 + k * 180}ms` }}>
        <span className="min-w-0 flex-1 truncate">{r}</span><span className="flex items-center gap-1 text-white/60"><MapPin size={12} />{w}</span>
        {k < 2 ? <CheckCircle size={14} weight="fill" className="text-white" /> : <LockSimple size={14} className="text-white/60" />}</div>))}</div>,
  ];
  const imgs: Media[] = ["problem-vardiya", "saha-drone-cember", "saha-liman"];
  return (
    <section aria-labelledby="std-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-4">
          <div className="col-span-12 lg:col-span-7"><Ch n="02">{c.k}</Ch><H2 id="std-h" a={c.h} b={c.h2} className="max-w-[18ch]" /></div>
          <p className="col-span-12 max-w-[30rem] text-[16px] leading-[1.55] text-ink-muted md:text-[17px] lg:col-span-5">{c.lead}</p>
        </div>
        <ul ref={ref} className={`no-sb -mx-[var(--pad-x)] mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--pad-x)] [scroll-padding-inline:var(--pad-x)] md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:overflow-visible md:px-0 ${go || reduce ? "bx-go" : ""}`}>
          {c.cards.map(([h, p], k) => (
            <m.li key={h} {...rise(reduce, k)} className="dark group relative aspect-[4/5] w-[82%] shrink-0 snap-start overflow-hidden rounded-[28px] bg-[#1A1714] text-white md:aspect-auto md:min-h-[540px] md:w-auto">
              <Photo n={imgs[k]} sizes="(min-width:768px) 33vw, 82vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
              <span aria-hidden="true" className={`absolute inset-0 ${fade}`} />
              <div className="absolute inset-x-4 top-[30%] md:inset-x-5" aria-hidden="true">{frags[k]}</div>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <h3 className="text-[21px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[24px]">{h}</h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-white/75">{p}</p>
              </div>
            </m.li>))}
        </ul>
        <p className="mt-3 text-[12px] text-ink-faint">{c.sample}</p>
      </div>
    </section>);
}

/* ---------- Workspaces: one network of sites ----------
 * Head office over three sites (kitchen, production, building site), drawn as a live network: a pulse runs from the
 * office to the picked site, the tab underlines fill while it waits its turn, and the panel counts up. Each site is a photo
 * card (photos used nowhere else on the home page); the picked one also tints the stage behind. Sample numbers, labelled. */
function useCount(to: number, run: boolean) {
  const [v, setV] = useState(to); const from = useRef(to);
  useEffect(() => { if (!run) { setV(to); from.current = to; return; } const a = from.current, t0 = performance.now(); let raf = 0;
    const step = (t: number) => { const p = Math.min(1, (t - t0) / 700); const e = 1 - Math.pow(1 - p, 3); setV(Math.round(a + (to - a) * e)); if (p < 1) raf = requestAnimationFrame(step); else from.current = to; };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf); }, [to, run]);
  return v;
}
const WS_PATHS = ["M150 0 V16 H52 Q40 16 40 28 V40", "M150 0 V40", "M150 0 V16 H248 Q260 16 260 28 V40"];
export function WorkspaceV3() {
  const { d, locale } = useLocale(); const c = HOME4[locale].ws; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const seen = useInView(ref, { amount: 0.35, once: true }); const on = useInView(ref, { amount: 0.35 });
  const sites: { n: string; Ic: typeof Factory; img: string; pos: string; jobs: string[]; people: number; due: number; done: [number, number][] }[] = [
    { n: c.nodes[1], Ic: ForkKnife, img: "cafe-opening", pos: "55% 50%", jobs: d.bento.jobs, people: 64, due: 5, done: [[14, 14], [11, 14], [6, 14]] },
    { n: c.nodes[2], Ic: Factory, img: "food-qa", pos: "50% 45%", jobs: c.siteJobs[0], people: 93, due: 8, done: [[22, 22], [17, 22], [9, 22]] },
    { n: c.nodes[3], Ic: HardHat, img: "safety", pos: "50% 40%", jobs: c.siteJobs[1], people: 41, due: 3, done: [[18, 18], [15, 18], [12, 18]] },
  ];
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const auto = on && !hold && !reduce;
  useEffect(() => { if (!auto) return; const t = window.setTimeout(() => setI((k) => (k + 1) % 3), 5000); return () => window.clearTimeout(t); }, [auto, i]);
  const cur = sites[i]; const pct = Math.round(100 * cur.done.reduce((a, [x, y]) => a + x / y, 0) / cur.done.length);
  const shown = useCount(pct, seen && !reduce); const people = useCount(cur.people, seen && !reduce);
  return (
    <section aria-labelledby="ws-h" className="section-y pt-0">
      <div className="container-x grid-12 items-center gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <Ch n="03">{c.k}</Ch><H2 id="ws-h" a={c.h} className="max-w-[16ch]" />
          <p className="mt-4 max-w-[30rem] text-[16px] leading-[1.55] text-ink-muted md:text-[17px]">{c.p}</p>
        </div>
        <div ref={ref} className="col-span-12 lg:col-span-8 lg:ps-8" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div className="relative overflow-hidden rounded-[28px] bg-[var(--card)] p-3 md:p-6">
            {seen && <AnimatePresence initial={false}>
              <m.span key={cur.img} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.9, ease: EASE }} className="pointer-events-none absolute inset-0">
                <img src={`/photos/${cur.img}-800.webp`} alt="" decoding="async" loading="lazy" className="h-full w-full scale-110 object-cover opacity-[0.16] blur-2xl saturate-[0.8]" />
              </m.span></AnimatePresence>}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgb(255_240_225/0.06),transparent_70%)]" />
            <div className="relative mx-auto flex w-max items-center gap-3 rounded-full bg-[var(--card-2)] py-1.5 pe-5 ps-1.5 ring-1 ring-line">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-[#F4F0EB] text-[#111]"><Buildings size={17} aria-hidden="true" />
                {!reduce && <span aria-hidden="true" className="ws-ping absolute inset-0 rounded-full ring-1 ring-[#F4F0EB]" />}</span>
              <span className="text-[15px] font-semibold">{c.nodes[0]}</span>
            </div>
            <svg aria-hidden="true" viewBox="0 0 300 40" preserveAspectRatio="none" className="relative mx-auto block h-10 w-[67%]">
              {WS_PATHS.map((p) => <path key={p} d={p} fill="none" stroke="rgb(255 240 225 / 0.14)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
                pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: seen || reduce ? 0 : 1, transition: reduce ? "none" : "stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)" }} />)}
              <path key={`a${i}`} d={WS_PATHS[i]} fill="none" stroke="rgb(244 240 235 / 0.9)" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1}
                className={reduce ? "" : "ws-flow"} strokeDasharray={reduce ? "1" : "0.18 0.82"} />
            </svg>
            <div role="tablist" aria-label={c.k} className="relative grid grid-cols-3 gap-2 md:gap-3">
              {sites.map((s, k) => { const act = k === i; const Ic = s.Ic; return (
                <button key={s.n} type="button" role="tab" aria-selected={act} aria-controls="ws-panel" onClick={() => setI(k)}
                  className={`group relative flex h-[132px] flex-col justify-between overflow-hidden rounded-[18px] bg-[#1A1714] p-2.5 text-start text-white ring-1 transition-all duration-500 sm:h-[150px] md:h-[172px] md:p-3.5 ${act ? "ring-[rgb(255_240_225/0.45)]" : "ring-transparent hover:ring-[rgb(255_240_225/0.2)]"}`}>
                  {seen && <img src={`/photos/${s.img}-800.webp`} alt="" decoding="async" loading="lazy" style={{ objectPosition: s.pos }}
                    className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter,opacity] duration-700 ease-out ${act ? "scale-105 opacity-100 saturate-100" : "opacity-55 saturate-[0.35] group-hover:opacity-75"}`} />}
                  <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_14_12/0.15)_0%,rgb(17_14_12/0.2)_40%,rgb(17_14_12/0.88)_100%)]" />
                  <span className={`relative grid h-9 w-9 place-items-center rounded-[11px] backdrop-blur-md transition-colors duration-300 md:h-10 md:w-10 ${act ? "bg-[#F4F0EB] text-[#111]" : "bg-[rgb(17_14_12/0.45)] text-white/85 ring-1 ring-white/15"}`}><Ic size={18} aria-hidden="true" /></span>
                  <span className="relative block">
                    <span className="block truncate text-[14px] font-semibold md:text-[16px]">{s.n}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-[12px] text-white/75"><span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${act ? "bg-accent" : "bg-white/40"}`} /><span className="truncate">{fmt(c.due, { n: s.due })}</span></span>
                  </span>
                  {act && auto && <span key={`t${i}`} aria-hidden="true" className="ws-timer absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[rgb(244_240_235/0.8)] rtl:origin-right" />}
                </button>); })}
            </div>
            <div id="ws-panel" role="tabpanel" className="relative mt-3 overflow-hidden rounded-[20px] bg-[var(--card-2)] md:mt-4">
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }}
                  className="grid gap-5 p-4 md:grid-cols-[1fr_1.4fr] md:p-5">
                  <div>
                    <p className="text-[18px] font-semibold tracking-[-0.02em]">{cur.n}</p>
                    <p className="mt-1 flex items-center gap-4 text-[13px] text-ink-muted"><span className="flex items-center gap-1.5"><BookOpen size={14} aria-hidden="true" />{cur.jobs.length} {c.jobs}</span><span className="flex items-center gap-1.5 tabular-nums"><Users size={14} aria-hidden="true" />{people} {c.people}</span></p>
                    <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-faint">{c.done}</p>
                    <p className="mt-1 text-[44px] font-semibold leading-none tracking-[-0.04em] tabular-nums">%{shown}</p>
                    <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-white/[.06]"><m.span initial={{ width: 0 }} animate={{ width: seen ? `${pct}%` : 0 }} transition={{ duration: reduce ? 0 : 0.8, ease: EASE }} className="block h-full rounded-full bg-ink" /></span>
                  </div>
                  <ul className="space-y-1.5">
                    <li className="px-1 pb-1 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-faint">{c.pending}</li>
                    {cur.jobs.map((j, k) => { const [a, b] = cur.done[k]; const full = a === b; return (
                      <m.li key={j} initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: reduce ? 0 : 0.08 + k * 0.07, ease: EASE }}
                        className="flex items-center gap-3 rounded-[12px] bg-white/[.04] px-3 py-2.5 text-[14px]">
                        <span className="min-w-0 flex-1 truncate">{j}</span>
                        <span className="h-1 w-14 overflow-hidden rounded-full bg-white/[.08] sm:w-16"><m.span initial={{ width: 0 }} animate={{ width: `${(100 * a) / b}%` }} transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.15 + k * 0.07, ease: EASE }} className="block h-full rounded-full bg-ink/80" /></span>
                        <span className={`flex w-11 justify-end text-[13px] tabular-nums ${full ? "text-ink" : "text-ink-muted"}`}>{full ? <CheckCircle size={15} weight="fill" /> : `${a}/${b}`}</span>
                      </m.li>); })}
                  </ul>
                </m.div>
              </AnimatePresence>
            </div>
            <p className="relative mt-3 text-center text-[12px] text-ink-faint">{c.sample}</p>
          </div>
        </div>
      </div>
    </section>);
}

/* ---------- Web: desk to field ----------
 * Two scenes side by side: the meeting room, whose wall screens carry the live panel (perspective transform, people
 * masked in front), and the field, where the same job arrives on a phone. A job goes out, completion comes back. */
const Dash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="h-full w-full bg-[#111]" /> });
type Q = number[][];
/** CSS matrix3d that maps a w×h box onto the quad (TL, TR, BR, BL) in px. */
function quadMatrix(w: number, h: number, q: Q) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3; const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
  const den = dx1 * dy2 - dx2 * dy1; const g = (sx * dy2 - dx2 * sy) / den, k = (dx1 * sy - sx * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3, c = x0, d = y1 - y0 + g * y1, e = y3 - y0 + k * y3, f = y0;
  return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${k / h},0,0,1,0,${c},${f},0,1)`;
}
function DeskScene({ on, near }: { on: boolean; near: boolean }) {
  const { lang } = useLocale(); const box = useRef<HTMLDivElement>(null); const [W, setW] = useState(0);
  useEffect(() => { const el = box.current; if (!el) return; const ro = new ResizeObserver(() => setW(el.clientWidth)); ro.observe(el); return () => ro.disconnect(); }, []);
  const [IW] = M["web-toplanti"].size; const s = W / IW; const [L, R] = M["web-toplanti"].screens.map((q) => q.map(([x, y]) => [x * s, y * s]));
  return (
    <div ref={box} className="relative aspect-[1408/768] w-full overflow-hidden">
      <Photo n="web-toplanti" sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
      {W > 0 && near && (
        <div aria-hidden="true" className="absolute inset-0" style={{ maskImage: "url(/media/v3/web-toplanti-mask.png)", WebkitMaskImage: "url(/media/v3/web-toplanti-mask.png)", maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: 1180, height: 720, transform: quadMatrix(1180, 720, R) }}><div className="h-full w-full overflow-hidden bg-[#111]"><Dash on={on} lang={lang} /></div></div>
          <img src="/photos/cta-dashboard.webp" alt="" className="absolute left-0 top-0 origin-top-left" style={{ width: 1600, height: 1049, transform: quadMatrix(1600, 1049, L), maxWidth: "none" }} />
        </div>)}
    </div>);
}
export function WebV3() {
  const { d, locale, lang } = useLocale(); const t = HOME4[locale].web; const w2 = HOME2[locale].web; const b = d.bento; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const near = useInView(ref, { margin: "300px 0px", once: true }); const on = useInView(ref, { amount: 0.3 });
  const [beat, setBeat] = useState(0); // 0: the job goes out, 1: completion comes back
  useEffect(() => { if (!on || reduce) return; const id = window.setInterval(() => setBeat((x) => 1 - x), 3200); return () => window.clearInterval(id); }, [on, reduce]);
  const chip = (txt: string, sub: string) => (
    <div className={`${glass} flex items-center gap-3 px-3.5 py-2.5 text-white`}><CheckCircle size={16} weight="fill" className="shrink-0 text-white/85" aria-hidden="true" />
      <span className="min-w-0"><span className="block truncate text-[13px] font-semibold">{txt}</span><span className="block truncate text-[12px] text-white/65">{sub}</span></span></div>);
  return (
    <section id="web" aria-labelledby="web-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-5">
          <div className="col-span-12 lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3"><Ch n="04">{t.k}</Ch><span className="rounded-full bg-[var(--card)] px-2.5 py-0.5 text-[12px] font-medium text-ink-muted">{w2.soon}</span></div>
            <H2 id="web-h" a={t.h} b={t.h2} />
          </div>
          <p className="col-span-12 max-w-[32rem] text-[16px] leading-[1.55] text-ink-muted md:text-[17px] lg:col-span-6">{t.p}</p>
        </div>
        <div ref={ref} className="mt-8 grid gap-3 md:mt-12 lg:grid-cols-[1.35fr_1fr]">
          <figure className="dark relative overflow-hidden rounded-[28px] bg-[#1A1714]">
            <DeskScene on={on} near={near} />
            <span aria-hidden="true" className={`absolute inset-0 hidden md:block ${fade}`} />
            <figcaption className="relative p-5 text-white md:absolute md:inset-x-0 md:bottom-0 md:p-7">
              <span className="mt-1 block text-[20px] font-semibold tracking-[-0.02em] md:text-[24px]">{t.flow[0][0]}</span>
              <span className="mt-1 block max-w-[24rem] text-[14px] text-white/70">{t.flow[0][1]}</span>
            </figcaption>
            <AnimatePresence>{beat === 0 && (
              <m.div key="out" initial={reduce ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: 24 }} transition={{ duration: 0.45, ease: EASE }}
                className="absolute end-4 top-4 w-[min(70%,280px)] md:end-6 md:top-6" aria-hidden="true">{chip(b.jobs[0], `${b.sent} · ${b.today}`)}</m.div>)}</AnimatePresence>
          </figure>
          <figure className="dark relative min-h-[440px] overflow-hidden rounded-[28px] bg-[#1A1714] lg:min-h-0">
            <Photo n="saha-cati-siluet" sizes="(min-width:1024px) 38vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
            <span aria-hidden="true" className={`absolute inset-0 ${fade}`} />
            <div className="float-y absolute end-[7%] top-[8%] w-[min(38%,170px)] lg:w-[min(30%,150px)] drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)]" dir="ltr" aria-hidden="true">
              <Device label={d.hero.chip.t}>{near ? <WorkScreen active={on} lang={lang} /> : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            <AnimatePresence>{beat === 1 && (
              <m.div key="back" initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: EASE }}
                className="absolute start-4 top-4 w-[min(54%,240px)] md:start-6 md:top-6" aria-hidden="true">{chip(b.branch, b.branchP)}</m.div>)}</AnimatePresence>
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
              <span className="mt-1 block max-w-[60%] text-[20px] font-semibold tracking-[-0.02em] md:text-[24px]">{t.flow[1][0]} <span className="text-white/45">·</span> {t.flow[2][0]}</span>
              <span className="mt-1 block max-w-[58%] text-[14px] text-white/70">{t.flow[2][1]}</span>
            </figcaption>
          </figure>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <a href="/features/web-panel/" className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold">{w2.go}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
          <p className="text-[12px] text-ink-faint">{t.sample}</p>
        </div>
      </div>
    </section>);
}

/* ---------- Customers: sector tabs over a sideways carousel ----------
 * Full-photo cards (16:8 desktop, 4:5 phones), the next one peeking: sector, the company large in the middle,
 * what they do, and the case study when it is approved. Drag, swipe, arrows or arrow keys; tabs follow the scroll. */
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
  const drag = useRef<{ x: number; l: number; moved: boolean } | null>(null);
  const down = (e: React.PointerEvent) => { if (e.pointerType !== "mouse" || !track.current) return; drag.current = { x: e.clientX, l: track.current.scrollLeft, moved: false }; track.current.style.scrollSnapType = "none"; };
  const move = (e: React.PointerEvent) => { const g = drag.current; if (!g || !track.current) return; const dx = e.clientX - g.x; if (Math.abs(dx) > 4) g.moved = true; track.current.scrollLeft = g.l - dx; };
  const up = () => { const g = drag.current; if (!g || !track.current) return; track.current.style.scrollSnapType = ""; drag.current = null; if (g.moved) go(i); };
  return (
    <section id="customers" aria-labelledby="cases-h" className="section-y overflow-hidden pt-0">
      <div className="container-x">
        <Ch n="06">{t.k}</Ch><H2 id="cases-h" a={t.h} b={t.h2} className="max-w-[22ch]" />
        <div className="mt-8 flex items-center justify-between gap-4 border-b border-line">
          <div role="tablist" aria-label={t.k} className="no-sb -mx-[var(--pad-x)] flex gap-6 overflow-x-auto px-[var(--pad-x)] md:mx-0 md:gap-8 md:px-0">
            {secs.map((sc) => { const act = list[i]?.sec === sc; return (
              <button key={sc} type="button" role="tab" aria-selected={act} onClick={() => go(list.findIndex((c) => c.sec === sc))}
                className={`relative inline-flex min-h-12 shrink-0 items-center text-[15px] font-medium transition-colors md:text-[16px] ${act ? "text-ink" : "text-ink-faint hover:text-ink"}`}>
                {t.sec[sc]}
                {act && <m.span layoutId="case-tab" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-ink" />}</button>); })}
          </div>
          <div className="hidden shrink-0 gap-2 pb-2 md:flex">
            <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--card)] transition-opacity hover:bg-[var(--card-2)] disabled:opacity-30"><Chev dir="start" className="h-2.5 w-3.5" /></button>
            <button type="button" onClick={() => go(i + 1)} disabled={i === list.length - 1} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--card)] transition-opacity hover:bg-[var(--card-2)] disabled:opacity-30"><Chev dir="end" className="h-2.5 w-3.5" /></button>
          </div>
        </div>
      </div>
      <div ref={track} role="region" aria-roledescription="carousel" aria-label={t.k} tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); } }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
        className="no-sb relative mt-6 flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto px-[max(var(--pad-x),calc((100vw-var(--container))/2))] [scroll-padding-inline:max(var(--pad-x),calc((100vw-var(--container))/2))] active:cursor-grabbing md:gap-4">
        {list.map((c, k) => { const I = SEC_IC[c.sec]; const act = k === i; return (
          <article key={c.slug} aria-roledescription="slide" aria-label={`${c.company}, ${k + 1} / ${list.length}`}
            className={`dark relative aspect-[4/5] w-[86%] shrink-0 snap-start select-none overflow-hidden rounded-[28px] bg-[#1A1714] text-white transition-opacity duration-500 sm:aspect-[16/10] md:aspect-[16/8] md:w-[min(1100px,84%)] ${act ? "opacity-100" : "opacity-40"}`}>
            <Photo n={c.img} portrait sizes="(min-width:768px) 84vw, 86vw" className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] ${act ? "scale-100" : "scale-[1.06]"}`} />
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(17_14_12/0.15)_0%,rgb(17_14_12/0.55)_60%,rgb(17_14_12/0.85)_100%)]" />
            <div className="relative flex h-full flex-col items-center justify-between p-6 text-center md:p-10">
              <span className={`${glass} inline-flex items-center gap-2 !rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white/90`}><I size={14} aria-hidden="true" />{t.sec[c.sec]}</span>
              <div className="max-w-[92%] md:max-w-[80%]">
                <h3 className="text-[clamp(32px,1rem+3.4vw,76px)] [text-wrap:balance] font-semibold leading-[0.98] tracking-[-0.045em]">{c.company}</h3>
                <p className="mt-3 text-[15px] text-white/80 md:mt-4 md:text-[18px]">{t.desc[c.desc]}</p>
              </div>
              <span className={`${glass} inline-flex min-h-11 items-center gap-2 !rounded-full px-5 text-[14px] font-medium text-white/85`}>{t.soon}</span>
            </div>
          </article>); })}
      </div>
      <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">{list.map((c, k) => <span key={c.slug} className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-ink" : "w-1.5 bg-line-strong"}`} />)}</div>
    </section>);
}

/* ---------- Closing call to action: the approved card with the phone and tablet on one stand ---------- */
const CtaDuoInner = dynamic(() => import("../home/CtaDuo").then((x) => x.CtaDuo), { ssr: false, loading: () => <div className="aspect-[2752/1536] w-full" /> });
export function EndV3() {
  const { d, lang } = useLocale(); const c = d.end;
  return (
    <section aria-labelledby="end-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-center gap-y-7 overflow-hidden rounded-[32px] bg-[var(--card)] px-5 py-8 sm:px-10 md:py-16 lg:px-16">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="end-h" className="v4-h2 max-w-[12ch]">{c.h}</h2>
            <p className="mt-4 max-w-[26rem] text-[17px] leading-[1.55] text-ink-muted">{c.p}</p>
            <a href={SITE.demo} className="btn btn-accent group mt-7 h-[52px] px-7 text-[19px]">{c.cta}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
          </div>
          <div className="col-span-12 mx-auto w-[86%] sm:w-full lg:col-span-7"><div dir="ltr"><CtaDuoInner lang={lang} /></div></div>
        </div>
      </div>
    </section>);
}

/** Everything below the hero, in page order. */

/* ---------- Industries: who it is for ----------
 * Four photo cards into the sector pages (photos used nowhere else on the home page), then one dark box over a slow,
 * darkened kitchen loop: other areas as chips, and the 8 languages as round-flag pills that switch the site language.
 * Phones: the cards scroll sideways (snap, the next card peeks). */
const IND: [string, string, typeof Factory, string][] = [["/sektor/restoran/", "chef-plating", ForkKnife, "50% 30%"], ["/sektor/uretim/", "field", Factory, "40% 40%"],
  ["/sektor/otel/", "hotel-desk", Bed, "50% 45%"], ["/sektor/franchise/", "huddle", Storefront, "50% 40%"]];
const AREA_IC = [FirstAid, GraduationCap, ChalkboardTeacher, Barbell, FilmSlate, DotsThreeCircle];
export function SectorsV3() {
  const { d, locale, setLocale } = useLocale(); const c = d.ind; const reduce = useReducedMotion();
  return (
    <section aria-labelledby="ind-h" className="section-y pt-0">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Ch n="05">{c.k}</Ch><H2 id="ind-h" a={c.h} className="max-w-[16ch]" /></div>
          <Link href="/see-it/" className="btn btn-secondary hidden h-12 md:inline-flex">{c.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        </div>
        <ul className="no-sb -mx-[var(--pad-x)] mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--pad-x)] px-[var(--pad-x)] md:mx-0 md:mt-12 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
          {IND.map(([href, img, Ic, pos], k) => (
            <m.li key={href} className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-auto"
              initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: reduce ? 0 : k * 0.08, ease: EASE }}>
              <Link href={href} className="group dark relative block aspect-[3/4] overflow-hidden rounded-[24px] bg-[#1A1714] text-white md:aspect-[4/5] lg:aspect-[3/4]">
                <picture><source type="image/avif" srcSet={`/photos/${img}-800.avif 800w, /photos/${img}-1600.avif 1600w`} sizes="(min-width:768px) 25vw, 72vw" />
                  <img src={`/photos/${img}-800.webp`} srcSet={`/photos/${img}-800.webp 800w, /photos/${img}-1600.webp 1600w`} sizes="(min-width:768px) 25vw, 72vw" alt="" loading="lazy" decoding="async" style={{ objectPosition: pos }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]" /></picture>
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_14_12/0)_45%,rgb(17_14_12/0.85)_100%)]" />
                <span className="absolute start-4 top-4 grid h-11 w-11 place-items-center rounded-[14px] bg-[rgb(17_14_12/0.45)] ring-1 ring-white/15 backdrop-blur-md"><Ic size={19} aria-hidden="true" /></span>
                <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 md:inset-x-5 md:bottom-5">
                  <span className="text-[19px] font-semibold leading-tight tracking-[-0.02em] md:text-[21px]">{c.cards[k]}</span>
                  <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-colors duration-300 group-hover:bg-white group-hover:text-[#111]"><ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100" /></span>
                </span>
              </Link>
            </m.li>))}
        </ul>
        <Link href="/see-it/" className="btn btn-secondary mt-5 h-12 md:hidden">{c.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        <div className="dark relative mt-4 overflow-hidden rounded-[28px] bg-[#1A1714] px-5 py-12 text-center text-white md:mt-5 md:py-20">
          <div aria-hidden="true" className="absolute inset-0">
            <SmartVideo name="kitchen-bg" poster="/video/kitchen-bg.webp" threshold={0.2} className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40 blur-[3px]" />
            <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(17_14_12/0.5)_0%,rgb(17_14_12/0.85)_70%,#141110_100%)]" />
          </div>
          <p className="relative text-[15px] text-white/70">{c.also}</p>
          <ul className="relative mx-auto mt-5 flex max-w-[52rem] flex-wrap justify-center gap-2.5">
            {c.areas.map((a, k) => { const I = AREA_IC[k] ?? DotsThreeCircle; return (
              <li key={a} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/[.08] pe-4 ps-3 text-[15px] text-white/90 ring-1 ring-white/[.07] backdrop-blur-md"><I size={17} aria-hidden="true" className="text-white/70" />{a}</li>); })}
          </ul>
          <p className="relative mt-12 text-[clamp(28px,1rem+2vw,48px)] font-semibold tracking-[-0.04em] md:mt-16">{c.langs}</p>
          <ul className="relative mx-auto mt-6 flex max-w-[52rem] flex-wrap justify-center gap-2.5">
            {LOCALES.map((l) => { const on = l.code === locale; return (
              <li key={l.code}><button type="button" lang={l.code} dir={l.dir} aria-pressed={on} onClick={() => setLocale(l.code)}
                className={`inline-flex min-h-11 items-center gap-2.5 rounded-full py-1.5 pe-4 ps-1.5 text-[15px] ring-1 backdrop-blur-md transition-colors duration-300 ${on ? "bg-white text-[#111] ring-white" : "bg-white/[.08] text-white/90 ring-white/[.07] hover:bg-white/[.14]"}`}>
                <img src={`/flags/${l.flag}.svg`} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />{l.name}</button></li>); })}
          </ul>
        </div>
      </div>
    </section>);
}

export default function BelowV3() {
  return (<><StepsV3 /><StandardV3 /><WorkspaceV3 /><WebV3 /><SectorsV3 /><CasesV3 /><EndV3 /></>);
}
