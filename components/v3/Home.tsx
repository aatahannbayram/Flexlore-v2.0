"use client";
/* Home page below the hero, one numbered story on the dark ground:
 * 01 how it works (you film and send, your team watches and takes the quiz, you see who is ready) ·
 * 02 why Flexlore (know-how stays, video not paper, built for the floor) · 03 workspaces (head office over its sites) ·
 * 04 web, desk to field (twin of 03) · 05 industries · 06 customers (pinned, slides sideways as the page scrolls) · closing card.
 * Orange is the payoff words, the progress line and the call to action.
 * Copy: d.process / d.bento / d.end / d.ind (main dictionary), HOME2 (steps, roles, why, sector lines, web chip), HOME4 (workspaces, web, customers). */
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { SITE } from "../config";
import { useLocale, fmt } from "../i18n/LocaleProvider";
import { HOME2 } from "../i18n/home2";
import { HOME4 } from "../i18n/home4";
import { EXTRA } from "../i18n/extra";
import { Device, WorkScreen, Status, Nav, Player, Clip, CheckRing } from "../AppScreens";
import { EASE } from "../ui/Reveal";
import { Play, Pause, Check, CheckCircle, ShieldCheck, MapPin, BookOpen, Users, ForkKnife, Storefront, Factory, HardHat, Buildings, Bed, ArrowRight, FirstAid, GraduationCap, ChalkboardTeacher, Barbell, FilmSlate, DotsThreeCircle, Lightning, ArrowCounterClockwise, Article, Translate } from "../ui/icons";
import { LOCALES } from "../i18n/locales";
import { Chev } from "./Chevron";
import { CASES } from "./cases";
import { LOGOS, CaseLogo } from "./logos";
import { Photo, Kicker, rise, type Media } from "./Top";
import M from "./media.json";

/** Section heading: words rise in one after another when the heading enters view (static under reduced motion).
 *  Payoff words (the `b` part, or the last third of `a`) carry the brand orange (.t-accent, globals.css). */
function H2({ id, a, b, className = "" }: { id: string; a: string; b?: string; className?: string }) {
  const reduce = useReducedMotion(); const aw = a.split(" "); const nA = b ? aw.length : aw.length - Math.ceil(aw.length / 3);
  const words = [...aw.map((w, k) => [w, k >= nA] as const), ...(b ? b.split(" ").map((w) => [w, true] as const) : [])];
  if (reduce) return <h2 id={id} className={`v4-h2 mt-3 ${className}`}>{aw.slice(0, nA).join(" ")} <span className="t-accent">{[...aw.slice(nA), ...(b ? [b] : [])].join(" ")}</span></h2>;
  return (
    <m.h2 id={id} aria-label={b ? `${a} ${b}` : a} className={`v4-h2 mt-3 ${className}`} initial="h" whileInView="s" viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.045 }}>
      {words.map(([w, pay], k) => (
        <span key={k} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <m.span className={`inline-block ${pay ? "t-accent" : ""}`} variants={{ h: { y: "105%" }, s: { y: 0 } }} transition={{ duration: 0.7, ease: EASE }}>{w}</m.span>
        </span>)).flatMap((el, k) => (k ? [" ", el] : [el]))}
    </m.h2>);
}
/** Chapter marker: the home page reads as one story, numbered 01 to 06. */
const Ch = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-3"><span className="text-[13px] font-semibold tabular-nums text-ink">{n}</span><span aria-hidden="true" className="h-px w-8 bg-line-strong" /><Kicker>{children}</Kicker></div>);
/** Chapter head: number and heading on the left, the lead on the right (03 and 04 share it, so they read as a pair). */
const Head = ({ n, k, id, h, h2, p, w = "max-w-[18ch]", extra }: { n: string; k: string; id: string; h: string; h2?: string; p: string; w?: string; extra?: React.ReactNode }) => (
  <div className="grid-12 items-end gap-y-4">
    <div className="col-span-12 lg:col-span-7"><div className="flex flex-wrap items-center gap-3"><Ch n={n}>{k}</Ch>{extra}</div><H2 id={id} a={h} b={h2} className={w} /></div>
    <p className="col-span-12 max-w-[30rem] text-[15px] leading-[1.55] text-ink-muted md:text-[16px] lg:col-span-5 lg:justify-self-end">{p}</p>
  </div>);
const glass = "rounded-[16px] bg-[rgb(26_22_19/0.62)] ring-1 ring-[rgb(255_240_225/0.14)] backdrop-blur-xl";
/** Warm fade from the photo into the ground. */
const fade = "bg-[linear-gradient(180deg,rgb(17_14_12/0)_30%,rgb(17_14_12/0.55)_62%,rgb(17_14_12/0.94)_100%)]";
/** Rule-of-thirds lines for the camera screen. */
const THIRDS = (() => { const l = "rgb(255 255 255 / 0.18)"; const g = (dir: string) => `linear-gradient(${dir},transparent calc(33.33% - .5px),${l} calc(33.33% - .5px),${l} calc(33.33% + .5px),transparent calc(33.33% + .5px),transparent calc(66.66% - .5px),${l} calc(66.66% - .5px),${l} calc(66.66% + .5px),transparent calc(66.66% + .5px))`; return `${g("90deg")},${g("180deg")}`; })();

/* ---------- How it works: five steps, one stage ----------
 * Told to the business owner: "you" film and send, "your team" watches and takes the quiz, "you" see who is ready.
 * Steps advance every 6 s while in view (pausable, never under reduced motion); hover holds, click or focus picks.
 * The stage is a field photo with the phone standing fully inside it (sized by the stage height) and a status chip. */
const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const STAGE = ["bakery", "phone-mount", "saha-eldiven-makro", "saha-drone-cember", "saha-santiye-havadan"] as const;
const STAGE_POS: Record<string, string> = { bakery: "30% 50%", "phone-mount": "30% 50%" };
/* Who holds the phone at each step: 0 you (the owner or manager), 1 your team. */
const ROLE = [0, 0, 1, 1, 0] as const;
/* Stage photo: the v3 set, or a /photos still (bakery, phone on a mount). `soft` blurs it a little so the phone's own
   camera view, which shows the same scene sharp, reads as the thing in focus. */
function StageImg({ n, soft = false }: { n: string; soft?: boolean }) {
  const cls = `absolute inset-0 h-full w-full object-cover ${soft ? "scale-105 blur-[3px]" : ""}`;
  if (n in M) return <Photo n={n as Media} sizes="(min-width:1024px) 55vw, 100vw" className={cls} />;
  return (<picture><source type="image/avif" srcSet={`/photos/${n}-800.avif 800w, /photos/${n}-1600.avif 1600w`} sizes="(min-width:1024px) 55vw, 100vw" />
    <img src={`/photos/${n}-1600.webp`} srcSet={`/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w`} sizes="(min-width:1024px) 55vw, 100vw" alt="" decoding="async" loading="lazy"
      style={{ objectPosition: STAGE_POS[n] }} className={`${cls} saturate-[0.85]`} /></picture>);
}
/* Step 1 screen: the phone's camera filming the baker at work. Thirds grid, focus box on the hands, REC timer counting up,
   zoom and mode rows, shutter recording. Units are px of the 320 px design screen. */
function CameraScreen({ active, lang }: { active: boolean; lang: "en" | "tr" }) {
  const [t, setT] = useState(0);
  useEffect(() => { if (!active) return; setT(0); const id = window.setInterval(() => setT((v) => Math.min(13, v + 1)), 420); return () => window.clearInterval(id); }, [active]);
  return (
    <div className="absolute inset-0 overflow-hidden bg-black text-white">
      <img src="/photos/bakery-800.webp" alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "22% 50%" }} />
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: THIRDS }} />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-[18px] pb-[22px] pt-[50px] text-[12px] font-semibold">
        <Lightning size={16} aria-hidden="true" className="text-white/85" />
        <span className="flex items-center gap-[6px] rounded-full bg-black/55 px-[10px] py-[4px] text-[13px] tabular-nums backdrop-blur-md"><span className="rec-dot h-[7px] w-[7px] rounded-full bg-accent" />00:{String(t).padStart(2, "0")}</span>
        <span className="text-white/85">4K · 30</span>
      </div>
      <span aria-hidden="true" className="cam-focus absolute left-[30%] top-[47%] h-[92px] w-[92px]">
        {["start-0 top-0 border-s-2 border-t-2 rounded-ss-[6px]", "end-0 top-0 border-e-2 border-t-2 rounded-se-[6px]", "start-0 bottom-0 border-s-2 border-b-2 rounded-es-[6px]", "end-0 bottom-0 border-e-2 border-b-2 rounded-ee-[6px]"].map((c) => <span key={c} className={`absolute h-[16px] w-[16px] border-white ${c}`} />)}
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-black/70 pb-[34px] pt-[12px] backdrop-blur-md">
        <div className="flex justify-center gap-[6px] text-[12px] font-semibold tabular-nums">
          {["0.5", "1×", "2"].map((z, k) => <span key={z} className={`grid h-[30px] w-[30px] place-items-center rounded-full ${k === 1 ? "bg-white/20 text-accent" : "bg-white/10 text-white/80"}`}>{z}</span>)}
        </div>
        <div className="mt-[12px] flex justify-center gap-[20px] text-[12px] font-semibold uppercase tracking-[0.1em]">
          <span className="text-white/45">{lang === "tr" ? "Foto" : "Photo"}</span><span className="text-accent">Video</span><span className="text-white/45">Slo-mo</span>
        </div>
        <div className="mt-[14px] flex items-center justify-between px-[34px]">
          <span className="h-[40px] w-[40px] overflow-hidden rounded-[9px] ring-1 ring-white/30"><img src="/photos/bakery-800.webp" alt="" decoding="async" className="h-full w-full object-cover" /></span>
          <span className="grid h-[64px] w-[64px] place-items-center rounded-full ring-[3px] ring-white"><span className="h-[24px] w-[24px] rounded-[6px] bg-accent" /></span>
          <span className="grid h-[40px] w-[40px] place-items-center rounded-full bg-white/15"><ArrowCounterClockwise size={18} aria-hidden="true" /></span>
        </div>
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
  const { d, lang, locale } = useLocale(); const c = d.process; const s = HOME2[locale].steps; const roles = HOME2[locale].roles; const x = EXTRA[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const on = useInView(ref, { amount: 0.35 }); const near = useInView(ref, { margin: "300px 0px", once: true });
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const [paused, setPaused] = useState(false);
  const run = on && !hold && !paused && !reduce;
  useEffect(() => { if (!run) return; const t = window.setTimeout(() => setI((k) => (k + 1) % 5), 6000); return () => window.clearTimeout(t); }, [run, i]);
  const screen = i === 0 ? <CameraScreen active={on && !reduce} lang={lang} /> : i === 1 ? <Editor active={on} lang={lang} />
    : i === 2 ? <StepPlayerScreen active={on} lang={lang} /> : i === 3 ? <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} /> : <Ready active={on} lang={lang} />;
  /* Load the story screens as soon as the section is near, so switching steps never waits on code (no pop-in). */
  useEffect(() => { if (near) void import("../AppScreensStory"); }, [near]);
  return (
    <section id="how" aria-labelledby="how-h" className="section-y">
      <div className="container-x">
        <Ch n="01">{c.k}</Ch><H2 id="how-h" a={c.h} className="max-w-[20ch]" />
        <div ref={ref} className="mt-7 grid gap-5 md:mt-10 lg:grid-cols-12 lg:items-center lg:gap-10" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div className="dark relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#1A1714] sm:aspect-[16/11] lg:order-last lg:col-span-7 lg:aspect-auto lg:h-[540px]">
            <AnimatePresence initial={false}>
              <m.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}>
                {near && <StageImg n={STAGE[i]} soft={i === 0} />}
              </m.div>
            </AnimatePresence>
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgb(17_14_12/0.3)_0%,rgb(17_14_12/0.85)_78%)]" />
            {!reduce && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? c.play : c.pause} className="absolute end-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-[rgb(26_22_19/0.7)] text-white/80 ring-1 ring-white/10 backdrop-blur-md transition-colors hover:text-white md:end-5 md:top-5">{paused ? <Play size={15} weight="fill" aria-hidden="true" /> : <Pause size={15} weight="fill" aria-hidden="true" />}</button>}
            {/* The phone is sized by the stage height, so it always stands whole inside the frame. */}
            <div className="absolute left-1/2 top-[55%] h-[80%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] md:top-1/2 md:h-[84%]" style={{ aspectRatio: "393 / 852" }} dir="ltr">
              <Device label={s[i][0]}>{near ? <AnimatePresence initial={false}><m.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35 }}>{screen}</m.div></AnimatePresence> : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}
                className={`${glass} absolute start-3 top-3 flex w-max max-w-[calc(100%-4.5rem)] items-center gap-2 !rounded-full py-1.5 pe-3.5 ps-1.5 text-[13px] font-medium text-white md:start-5 md:top-5`}>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.08em] ${ROLE[i] ? "bg-accent text-white" : "bg-white/15"}`}>{roles[ROLE[i]]}</span><span className="truncate">{x.chips[i]}</span>
              </m.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col lg:col-span-5">
            <ol className="flex flex-col" role="tablist" aria-label={c.k}>
              {s.map(([h], k) => { const act = i === k; const done = k < i; const team = ROLE[k] === 1; return (
                <li key={h} className="relative">
                  {k < s.length - 1 && <span aria-hidden="true" className="absolute start-[21px] top-[58px] -bottom-[8px] w-px overflow-hidden bg-line">
                    <span className="block h-full w-full origin-top bg-ink-faint transition-transform duration-700 ease-out" style={{ transform: done ? "scaleY(1)" : "scaleY(0)" }} /></span>}
                  <button type="button" role="tab" aria-selected={act} onClick={() => setI(k)} onFocus={() => setI(k)}
                    className="group grid w-full grid-cols-[44px_1fr] items-center gap-4 py-[7px] text-start">
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
                      <span className={`block text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${act ? (team ? "text-accent-text" : "text-ink-muted") : "text-ink-faint"}`}>{roles[ROLE[k]]}</span>
                      <span className={`block text-[18px] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-300 md:text-[20px] ${act ? "text-ink" : "text-ink-faint group-hover:text-ink-muted"}`}>{h}</span>
                    </span>
                  </button>
                </li>); })}
            </ol>
            {/* One fixed slot for the picked step's text: every description sits in the same grid cell, so the slot is as
                tall as the longest one and nothing above or below moves when the step changes. */}
            <div className="mt-3 grid ps-[60px]" aria-live="polite">
              {s.map(([h, p], k) => (
                <p key={h} aria-hidden={k !== i} className={`[grid-area:1/1] text-[15px] leading-[1.55] text-ink-muted transition-[opacity,transform] duration-500 ease-out ${k === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1.5 opacity-0"}`}>
                  {p}</p>))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 text-[13px] text-ink-faint sm:flex-row sm:justify-between md:mt-5">
          <p className="flex items-start gap-2"><ShieldCheck size={15} aria-hidden="true" className="mt-px shrink-0" />{c.note}</p><p>{c.sample}</p>
        </div>
      </div>
    </section>);
}

/* ---------- Why Flexlore: three full-photo cards ----------
 * What Flexlore is for, in its own words, without repeating the other chapters: the expert's know-how stays with the
 * company, short video steps replace paper, and it is made for people on the floor. A small glass fragment on each photo
 * shows the idea. Phones: one row that scrolls sideways (snap, the next card peeks). */
export function WhyV3() {
  const { locale } = useLocale(); const c = HOME2[locale].why; const reduce = useReducedMotion();
  const ref = useRef<HTMLUListElement>(null); const go = useInView(ref, { amount: 0.3, once: true });
  const row = "flex items-center gap-2.5 rounded-[10px] bg-white/[.06] px-3 py-2.5 text-[13px] text-white";
  const frags = [
    <div key="a" className={`${glass} p-2`}>
      <div className={`${row} text-white/70`}><Users size={14} aria-hidden="true" className="shrink-0" /><span className="truncate">{c.a[0]}</span></div>
      <div className="flex justify-center py-1 text-white/45"><ArrowRight size={13} aria-hidden="true" className="rotate-90" /></div>
      <div className={`${row} bx-rise`} style={{ animationDelay: "650ms" }}><CheckCircle size={14} weight="fill" aria-hidden="true" className="shrink-0 text-accent" /><span className="truncate font-semibold">{c.a[1]}</span></div>
    </div>,
    <div key="b" className={`${glass} space-y-1.5 p-2`}>
      <div className={`${row} text-white/50`}><Article size={14} aria-hidden="true" className="shrink-0" /><span className="truncate line-through decoration-white/40">{c.b[0]}</span></div>
      <div className={`${row} bx-rise`} style={{ animationDelay: "650ms" }}><Play size={13} weight="fill" aria-hidden="true" className="shrink-0 text-accent" /><span className="min-w-0 flex-1 truncate font-semibold">{c.b[1]}</span>
        <span aria-hidden="true" className="flex shrink-0 gap-[3px]">{[0, 1, 2, 3, 4, 5].map((k) => <span key={k} className="bx-in h-3 w-[3px] rounded-full bg-white/75" style={{ animationDelay: `${900 + k * 90}ms` }} />)}</span></div>
    </div>,
    <div key="c" className={`${glass} flex flex-wrap gap-1.5 p-2`}>{c.c.map((t, k) => { const I = [Play, Translate, MapPin][k]; return (
      <span key={t} className="bx-rise inline-flex items-center gap-1.5 rounded-full bg-white/[.08] px-3 py-2 text-[13px] text-white" style={{ animationDelay: `${550 + k * 160}ms` }}><I size={13} aria-hidden="true" />{t}</span>); })}</div>,
  ];
  const imgs: Media[] = ["problem-vardiya", "problem-kagitlar", "saha-iskele-pov"];
  return (
    <section aria-labelledby="why-h" className="section-y pt-0">
      <div className="container-x">
        <Head n="02" k={c.k} id="why-h" h={c.h} h2={c.h2} p={c.lead} w="max-w-[20ch]" />
        <ul ref={ref} className={`no-sb -mx-[var(--pad-x)] mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--pad-x)] [scroll-padding-inline:var(--pad-x)] md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:overflow-visible md:px-0 ${go || reduce ? "bx-go" : ""}`}>
          {c.cards.map(([h, p], k) => (
            <m.li key={h} {...rise(reduce, k)} className="dark group relative aspect-[4/5] w-[82%] shrink-0 snap-start overflow-hidden rounded-[24px] bg-[#1A1714] text-white md:aspect-auto md:min-h-[440px] md:w-auto">
              <Photo n={imgs[k]} sizes="(min-width:768px) 33vw, 82vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
              <span aria-hidden="true" className={`absolute inset-0 ${fade}`} />
              <div className="absolute inset-x-4 top-[24%] md:inset-x-5" aria-hidden="true">{frags[k]}</div>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="text-[20px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[22px]">{h}</h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-white/75 md:text-[15px]">{p}</p>
              </div>
            </m.li>))}
        </ul>
      </div>
    </section>);
}
function useCount(to: number, run: boolean) {
  const [v, setV] = useState(to); const from = useRef(to);
  useEffect(() => { if (!run) { setV(to); from.current = to; return; } const a = from.current, t0 = performance.now(); let raf = 0;
    const step = (t: number) => { const p = Math.min(1, (t - t0) / 700); const e = 1 - Math.pow(1 - p, 3); setV(Math.round(a + (to - a) * e)); if (p < 1) raf = requestAnimationFrame(step); else from.current = to; };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf); }, [to, run]);
  return v;
}

/* ---------- Workspaces: head office over its sites ----------
 * One panel, the twin of chapter 04: on the left the head office (a photo card) over three site cards, joined by lines
 * that carry a pulse to the picked site; on the right the picked site's numbers and what is still due. The site tab
 * underline fills while it waits its turn and the numbers count up. Sample numbers, labelled. */
const WS_PATHS = ["M150 0 V12 H62 Q50 12 50 22 V32", "M150 0 V32", "M150 0 V12 H238 Q250 12 250 22 V32"];
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
  const total = sites.reduce((a, x) => a + x.people, 0);
  return (
    <section aria-labelledby="ws-h" className="section-y pt-0">
      <div className="container-x">
        <Head n="03" k={c.k} id="ws-h" h={c.h} p={c.p} />
        <div ref={ref} className="relative mt-7 overflow-hidden rounded-[28px] bg-[var(--card)] p-3 md:mt-10 md:p-4" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {seen && <AnimatePresence initial={false}>
            <m.span key={cur.img} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.9, ease: EASE }} className="pointer-events-none absolute inset-0">
              <img src={`/photos/${cur.img}-800.webp`} alt="" decoding="async" loading="lazy" className="h-full w-full scale-110 object-cover opacity-[0.14] blur-2xl saturate-[0.8]" />
            </m.span></AnimatePresence>}
          <div className="relative grid gap-3 lg:grid-cols-12 lg:gap-4">
            <div className="lg:col-span-7">
              {/* Head office: a photo card (toned warm, so no cold colours from the photo reach the page). */}
              <div className="dark relative flex h-[92px] items-center overflow-hidden rounded-[18px] bg-[#1A1714] px-3 text-white md:h-[104px] md:px-4">
                {seen && <img src="/photos/office-800.webp" alt="" decoding="async" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_42%] grayscale sepia-[.3]" />}
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(17_14_12/0.92)_0%,rgb(17_14_12/0.6)_45%,rgb(17_14_12/0.25)_100%)] rtl:bg-[linear-gradient(270deg,rgb(17_14_12/0.92)_0%,rgb(17_14_12/0.6)_45%,rgb(17_14_12/0.25)_100%)]" />
                <span className="relative flex items-center gap-3">
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#F4F0EB] text-[#111]"><Buildings size={18} aria-hidden="true" />
                    {!reduce && <span aria-hidden="true" className="ws-ping absolute inset-0 rounded-[12px] ring-1 ring-[#F4F0EB]" />}</span>
                  <span className="min-w-0">
                    <span className="block text-[16px] font-semibold md:text-[17px]">{c.nodes[0]}</span>
                    <span className="mt-0.5 flex items-center gap-3 text-[12px] text-white/75"><span className="flex items-center gap-1"><MapPin size={12} aria-hidden="true" />{sites.length}</span><span className="flex items-center gap-1 tabular-nums"><Users size={12} aria-hidden="true" />{total} {c.people}</span></span>
                  </span>
                </span>
              </div>
              <svg aria-hidden="true" viewBox="0 0 300 32" preserveAspectRatio="none" className="relative block h-7 w-full md:h-8">
                {WS_PATHS.map((p) => <path key={p} d={p} fill="none" stroke="rgb(255 240 225 / 0.16)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
                  pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: seen || reduce ? 0 : 1, transition: reduce ? "none" : "stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)" }} />)}
                <path key={`a${i}`} d={WS_PATHS[i]} fill="none" stroke="rgb(244 240 235 / 0.9)" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1}
                  className={reduce ? "" : "ws-flow"} strokeDasharray={reduce ? "1" : "0.18 0.82"} />
              </svg>
              <div role="tablist" aria-label={c.k} className="grid grid-cols-3 gap-2 md:gap-3">
                {sites.map((s, k) => { const act = k === i; const Ic = s.Ic; return (
                  <button key={s.n} type="button" role="tab" aria-selected={act} aria-controls="ws-panel" onClick={() => setI(k)}
                    className={`dark group relative flex h-[124px] flex-col justify-between overflow-hidden rounded-[18px] bg-[#1A1714] p-2.5 text-start text-white ring-1 transition-all duration-500 sm:h-[140px] md:h-[150px] md:p-3 ${act ? "ring-[rgb(255_240_225/0.45)]" : "ring-transparent hover:ring-[rgb(255_240_225/0.2)]"}`}>
                    {seen && <img src={`/photos/${s.img}-800.webp`} alt="" decoding="async" loading="lazy" style={{ objectPosition: s.pos }}
                      className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter,opacity] duration-700 ease-out ${act ? "scale-105 opacity-100 saturate-100" : "opacity-55 saturate-[0.35] group-hover:opacity-75"}`} />}
                    <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_14_12/0.15)_0%,rgb(17_14_12/0.2)_40%,rgb(17_14_12/0.88)_100%)]" />
                    <span className={`relative grid h-9 w-9 place-items-center rounded-[11px] backdrop-blur-md transition-colors duration-300 ${act ? "bg-[#F4F0EB] text-[#111]" : "bg-[rgb(17_14_12/0.45)] text-white/85 ring-1 ring-white/15"}`}><Ic size={17} aria-hidden="true" /></span>
                    <span className="relative block">
                      <span className="block truncate text-[14px] font-semibold md:text-[15px]">{s.n}</span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-[12px] text-white/75"><span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${act ? "bg-accent" : "bg-white/40"}`} /><span className="truncate">{fmt(c.due, { n: s.due })}</span></span>
                    </span>
                    {act && auto && <span key={`t${i}`} aria-hidden="true" className="ws-timer absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[rgb(244_240_235/0.8)] rtl:origin-right" />}
                  </button>); })}
              </div>
            </div>
            <div id="ws-panel" role="tabpanel" className="relative overflow-hidden rounded-[20px] bg-[var(--card-2)] lg:col-span-5">
              <AnimatePresence mode="wait" initial={false}>
                <m.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }}
                  className="flex h-full flex-col p-4 md:p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-[17px] font-semibold tracking-[-0.02em]">{cur.n}</p>
                      <p className="mt-1 flex items-center gap-3 text-[13px] text-ink-muted"><span className="flex items-center gap-1.5"><BookOpen size={14} aria-hidden="true" />{cur.jobs.length} {c.jobs}</span><span className="flex items-center gap-1.5 tabular-nums"><Users size={14} aria-hidden="true" />{people} {c.people}</span></p>
                    </div>
                    <div className="shrink-0 text-end">
                      <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-faint">{c.done}</p>
                      <p className="mt-0.5 text-[38px] font-semibold leading-none tracking-[-0.04em] tabular-nums">%{shown}</p>
                    </div>
                  </div>
                  <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-white/[.06]"><m.span initial={{ width: 0 }} animate={{ width: seen ? `${pct}%` : 0 }} transition={{ duration: reduce ? 0 : 0.8, ease: EASE }} className="block h-full rounded-full bg-ink" /></span>
                  <ul className="mt-4 space-y-1.5">
                    <li className="px-1 pb-0.5 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-faint">{c.pending}</li>
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
          </div>
        </div>
        <p className="mt-3 text-end text-[12px] text-ink-faint">{c.sample}</p>
      </div>
    </section>);
}
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
        <Head n="04" k={t.k} id="web-h" h={t.h} h2={t.h2} p={t.p}
          extra={<span className="rounded-full bg-[var(--card)] px-2.5 py-0.5 text-[12px] font-medium text-ink-muted">{w2.soon}</span>} />
        {/* Same frame and the same 7 / 5 split as chapter 03: desk on the left, field on the right. */}
        <div ref={ref} className="mt-7 grid gap-3 rounded-[28px] bg-[var(--card)] p-3 md:mt-10 md:p-4 lg:grid-cols-12 lg:gap-4">
          <figure className="dark relative overflow-hidden rounded-[20px] bg-[#1A1714] lg:col-span-7">
            <DeskScene on={on} near={near} />
            <span aria-hidden="true" className={`absolute inset-0 hidden md:block ${fade}`} />
            <figcaption className="relative p-4 text-white md:absolute md:inset-x-0 md:bottom-0 md:p-6">
              <span className="block text-[19px] font-semibold tracking-[-0.02em] md:text-[22px]">{t.flow[0][0]}</span>
              <span className="mt-1 block max-w-[24rem] text-[14px] text-white/70">{t.flow[0][1]}</span>
            </figcaption>
            <AnimatePresence>{beat === 0 && (
              <m.div key="out" initial={reduce ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: 24 }} transition={{ duration: 0.45, ease: EASE }}
                className="absolute end-3 top-3 w-[min(70%,270px)] md:end-5 md:top-5" aria-hidden="true">{chip(b.jobs[0], `${b.sent} · ${b.today}`)}</m.div>)}</AnimatePresence>
          </figure>
          <figure className="dark relative min-h-[420px] overflow-hidden rounded-[20px] bg-[#1A1714] lg:col-span-5 lg:min-h-0">
            <Photo n="saha-cati-siluet" sizes="(min-width:1024px) 38vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
            <span aria-hidden="true" className={`absolute inset-0 ${fade}`} />
            <div className="float-y absolute end-[7%] top-[7%] w-[min(36%,140px)] drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)]" dir="ltr" aria-hidden="true">
              <Device label={d.hero.chip.t}>{near ? <WorkScreen active={on} lang={lang} /> : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            <AnimatePresence>{beat === 1 && (
              <m.div key="back" initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: EASE }}
                className="absolute start-3 top-3 w-[min(54%,230px)] md:start-5 md:top-5" aria-hidden="true">{chip(b.branch, b.branchP)}</m.div>)}</AnimatePresence>
            <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white md:p-6">
              <span className="block max-w-[60%] text-[19px] font-semibold tracking-[-0.02em] md:text-[22px]">{t.flow[1][0]} <span className="text-white/45">·</span> {t.flow[2][0]}</span>
              <span className="mt-1 block max-w-[58%] text-[14px] text-white/70">{t.flow[2][1]}</span>
            </figcaption>
          </figure>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <a href="/features/web-panel/" className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold">{w2.go}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
          <p className="text-[12px] text-ink-faint">{t.sample}</p>
        </div>
      </div>
    </section>);
}

/* ---------- Customers ----------
 * Tablets and up (motion allowed): the chapter pins to the screen and the cards slide sideways as the page scrolls down,
 * every card at full strength; the sector tabs follow, a tab click scrolls to its card. Logos where we have them.
 * Phones and reduced motion: the swipe carousel (snap, the next card peeks), with arrows and arrow keys. */
const SEC_IC = { food: ForkKnife, franchise: Storefront, mfg: Factory, build: HardHat } as const;
function useMedia(q: string) {
  const [v, setV] = useState(false);
  useEffect(() => { const mq = window.matchMedia(q); const f = () => setV(mq.matches); f(); mq.addEventListener("change", f); return () => mq.removeEventListener("change", f); }, [q]);
  return v;
}
type CaseT = (typeof HOME4)["en"]["cases"];
function CaseCard({ c, t, act, k, n, className }: { c: (typeof CASES)[number]; t: CaseT; act: boolean; k: number; n: number; className: string }) {
  const I = SEC_IC[c.sec];
  return (
    <article aria-roledescription="slide" aria-label={`${c.company}, ${k + 1} / ${n}`}
      className={`dark relative shrink-0 select-none overflow-hidden rounded-[24px] bg-[#1A1714] text-white transition-opacity duration-500 ${act ? "opacity-100" : "opacity-45"} ${className}`}>
      <Photo n={c.img} portrait sizes="(min-width:768px) 70vw, 86vw" className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] ${act ? "scale-100" : "scale-[1.06]"}`} />
      <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(17_14_12/0.15)_0%,rgb(17_14_12/0.55)_60%,rgb(17_14_12/0.85)_100%)]" />
      <div className="relative flex h-full flex-col items-center justify-between p-6 text-center md:p-8">
        <span className={`${glass} inline-flex items-center gap-2 !rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white/90`}><I size={14} aria-hidden="true" />{t.sec[c.sec]}</span>
        <div className="max-w-[92%] md:max-w-[80%]">
          {LOGOS[c.slug]
            ? <h3 className="flex justify-center drop-shadow-[0_2px_18px_rgb(17_14_12/0.45)]"><CaseLogo slug={c.slug} name={c.company} /></h3>
            : <h3 className="text-[clamp(30px,1rem+2.6vw,62px)] [text-wrap:balance] font-semibold leading-[0.98] tracking-[-0.045em]">{c.company}</h3>}
          <p className="mt-3 text-[15px] text-white/80 md:text-[17px]">{t.desc[c.desc]}</p>
        </div>
        <span className={`${glass} inline-flex min-h-11 items-center gap-2 !rounded-full px-5 text-[14px] font-medium text-white/85`}>{t.soon}</span>
      </div>
    </article>);
}
function CaseTabs({ t, secs, cur, go, list }: { t: CaseT; secs: (typeof CASES)[number]["sec"][]; cur: string | undefined; go: (k: number) => void; list: typeof CASES }) {
  const reduce = useReducedMotion();
  return (
    <div role="tablist" aria-label={t.k} className="no-sb -mx-[var(--pad-x)] flex gap-6 overflow-x-auto px-[var(--pad-x)] md:mx-0 md:gap-8 md:px-0">
      {secs.map((sc) => { const act = cur === sc; return (
        <button key={sc} type="button" role="tab" aria-selected={act} onClick={() => go(list.findIndex((c) => c.sec === sc))}
          className={`relative inline-flex min-h-12 shrink-0 items-center text-[15px] font-medium transition-colors ${act ? "text-ink" : "text-ink-faint hover:text-ink"}`}>
          {t.sec[sc]}
          {act && <m.span layoutId="case-tab" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-ink" />}</button>); })}
    </div>);
}
const Arrows = ({ i, n, go }: { i: number; n: number; go: (k: number) => void }) => (
  <div className="hidden shrink-0 gap-2 pb-2 md:flex">
    <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--card)] transition-opacity hover:bg-[var(--card-2)] disabled:opacity-30"><Chev dir="start" className="h-2.5 w-3.5" /></button>
    <button type="button" onClick={() => go(i + 1)} disabled={i === n - 1} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--card)] transition-opacity hover:bg-[var(--card-2)] disabled:opacity-30"><Chev dir="end" className="h-2.5 w-3.5" /></button>
  </div>);

function CasesPinned() {
  const { locale } = useLocale(); const t = HOME4[locale].cases; const list = CASES; const secs = [...new Set(list.map((c) => c.sec))];
  const wrap = useRef<HTMLElement>(null); const view = useRef<HTMLDivElement>(null); const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0); const [rtl, setRtl] = useState(false); const [i, setI] = useState(0);
  useEffect(() => { setRtl(document.documentElement.dir === "rtl"); }, [locale]);
  useEffect(() => { const f = () => { const tr = track.current, v = view.current; if (tr && v) setDist(Math.max(0, tr.scrollWidth - v.clientWidth)); };
    f(); const ro = new ResizeObserver(f); if (track.current) ro.observe(track.current); if (view.current) ro.observe(view.current); return () => ro.disconnect(); }, []);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => (rtl ? 1 : -1) * p * dist);
  useMotionValueEvent(scrollYProgress, "change", (p) => setI(Math.round(p * (list.length - 1))));
  const go = useCallback((n: number) => { const el = wrap.current; if (!el) return; const k = Math.max(0, Math.min(list.length - 1, n));
    const top = el.getBoundingClientRect().top + window.scrollY; const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * (k / (list.length - 1)) + 1, behavior: "smooth" }); }, [list.length]);
  return (
    <section ref={wrap} id="customers" aria-labelledby="cases-h" className="relative" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[var(--header-h)]">
        <div className="container-x">
          <Ch n="06">{t.k}</Ch><H2 id="cases-h" a={t.h} b={t.h2} className="max-w-[24ch]" />
          <div className="relative mt-5 flex items-center justify-between gap-4 border-b border-line">
            <CaseTabs t={t} secs={secs} cur={list[i]?.sec} go={go} list={list} />
            <Arrows i={i} n={list.length} go={go} />
          </div>
        </div>
        <div ref={view} className="mt-6 w-full" role="region" aria-roledescription="carousel" aria-label={t.k}>
          <m.div ref={track} style={{ x }} className="flex w-max gap-4 px-[max(var(--pad-x),calc((100vw-var(--container))/2))]">
            {list.map((c, k) => <CaseCard key={c.slug} c={c} t={t} act k={k} n={list.length} className="aspect-[16/9] h-[min(52vh,480px)]" />)}
          </m.div>
        </div>
      </div>
    </section>);
}
function CasesCarousel() {
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
        <div className="mt-6 flex items-center justify-between gap-4 border-b border-line">
          <CaseTabs t={t} secs={secs} cur={list[i]?.sec} go={go} list={list} />
          <Arrows i={i} n={list.length} go={go} />
        </div>
      </div>
      <div ref={track} role="region" aria-roledescription="carousel" aria-label={t.k} tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); } }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
        className="no-sb relative mt-6 flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto px-[max(var(--pad-x),calc((100vw-var(--container))/2))] [scroll-padding-inline:max(var(--pad-x),calc((100vw-var(--container))/2))] active:cursor-grabbing md:gap-4">
        {list.map((c, k) => <CaseCard key={c.slug} c={c} t={t} act={k === i} k={k} n={list.length} className="aspect-[4/5] w-[86%] snap-start sm:aspect-[16/10] md:aspect-[16/8] md:w-[min(1000px,84%)]" />)}
      </div>
      <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">{list.map((c, k) => <span key={c.slug} className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-ink" : "w-1.5 bg-line-strong"}`} />)}</div>
    </section>);
}
export function CasesV3() {
  const reduce = useReducedMotion(); const wide = useMedia("(min-width: 768px) and (min-height: 600px)");
  return wide && !reduce ? <CasesPinned /> : <CasesCarousel />;
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


/* ---------- Industries: who it is for ----------
 * Four photo cards into the sector pages: icon and number on a glass chip, the name and its one-line use always shown,
 * the three uses opening on hover. Under them two twin panels: other areas as chips, and the 8 languages as round-flag
 * pills that switch the site language. Phones: the cards scroll sideways (snap, the next card peeks). */
const IND: [string, string, typeof Factory, string][] = [["/sektor/restoran/", "chef-plating", ForkKnife, "50% 30%"], ["/sektor/uretim/", "field", Factory, "40% 40%"],
  ["/sektor/otel/", "hotel-desk", Bed, "50% 45%"], ["/sektor/franchise/", "huddle", Storefront, "50% 40%"]];
const AREA_IC = [FirstAid, GraduationCap, ChalkboardTeacher, Barbell, FilmSlate, DotsThreeCircle];
export function SectorsV3() {
  const { d, locale, setLocale } = useLocale(); const c = d.ind; const tabs = HOME2[locale].tabs; const reduce = useReducedMotion();
  return (
    <section aria-labelledby="ind-h" className="section-y pt-0">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Ch n="05">{c.k}</Ch><H2 id="ind-h" a={c.h} className="max-w-[16ch]" /></div>
          <Link href="/see-it/" className="btn btn-secondary hidden h-12 md:inline-flex">{c.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        </div>
        <ul className="no-sb -mx-[var(--pad-x)] mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--pad-x)] px-[var(--pad-x)] md:mx-0 md:mt-10 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible md:px-0">
          {IND.map(([href, img, Ic, pos], k) => (
            <m.li key={href} className="w-[78%] shrink-0 snap-start sm:w-[44%] md:w-auto"
              initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.7, delay: reduce ? 0 : k * 0.08, ease: EASE }}>
              <Link href={href} className="group dark relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[22px] bg-[#1A1714] p-3.5 text-white ring-1 ring-white/[.06] md:p-4">
                <picture className="absolute inset-0"><source type="image/avif" srcSet={`/photos/${img}-800.avif 800w, /photos/${img}-1600.avif 1600w`} sizes="(min-width:768px) 25vw, 78vw" />
                  <img src={`/photos/${img}-800.webp`} srcSet={`/photos/${img}-800.webp 800w, /photos/${img}-1600.webp 1600w`} sizes="(min-width:768px) 25vw, 78vw" alt="" loading="lazy" decoding="async" style={{ objectPosition: pos }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]" /></picture>
                {/* Shade top and bottom so the chips and text read on any photo; a little deeper on hover for the use list. */}
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_14_12/0.55)_0%,rgb(17_14_12/0)_24%,rgb(17_14_12/0)_40%,rgb(17_14_12/0.94)_100%)]" />
                <span aria-hidden="true" className="absolute inset-0 bg-[rgb(17_14_12/0.4)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="relative flex items-center justify-between">
                  <span className="inline-flex h-9 items-center gap-2 rounded-full bg-[rgb(17_14_12/0.5)] pe-3 ps-2.5 text-[13px] font-semibold tabular-nums ring-1 ring-white/15 backdrop-blur-md">
                    <Ic size={16} aria-hidden="true" /><span aria-hidden="true" className="h-3 w-px bg-white/25" /><span aria-hidden="true" className="text-white/80">0{k + 1}</span></span>
                  <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[rgb(17_14_12/0.5)] ring-1 ring-white/15 backdrop-blur-md transition-[background-color,transform] duration-300 group-hover:bg-accent group-hover:ring-accent">
                    <ArrowRight size={15} className="-rotate-45 transition-transform duration-300 group-hover:rotate-0 rtl:-scale-x-100" /></span>
                </span>
                <span className="relative block">
                  <span className="block text-[19px] font-semibold leading-tight tracking-[-0.02em] md:text-[20px]">{c.cards[k]}</span>
                  <span className="mt-1.5 line-clamp-2 block text-[13px] leading-[1.45] text-white/75">{tabs[k][0]}</span>
                  {/* On hover-capable screens the three uses open under the line. */}
                  <span className="hidden transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] [@media(hover:hover)]:grid [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-focus-visible:opacity-100">
                    <span className="overflow-hidden"><span className="mt-3 block space-y-1.5 border-t border-white/15 pt-3">
                      {tabs[k][1].map((u) => <span key={u} className="flex items-start gap-2 text-[13px] leading-snug text-white/90"><Check size={13} aria-hidden="true" className="mt-[3px] shrink-0 text-accent" /><span className="line-clamp-1">{u}</span></span>)}
                    </span></span>
                  </span>
                </span>
              </Link>
            </m.li>))}
        </ul>
        <Link href="/see-it/" className="btn btn-secondary mt-5 h-12 md:hidden">{c.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        {/* Two calm twin panels: other areas, and the languages (a pick switches the site language). */}
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <div className="dark rounded-[22px] bg-[#1A1714] p-5 text-white ring-1 ring-white/[.06] md:p-7">
            <p className="flex items-center gap-2.5 text-[19px] font-semibold tracking-[-0.02em] md:text-[20px]"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-accent/15 text-accent"><DotsThreeCircle size={17} aria-hidden="true" /></span>{c.also}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.areas.map((a, k) => { const I = AREA_IC[k] ?? DotsThreeCircle; return (
                <li key={a} className="inline-flex h-10 items-center gap-2 rounded-full bg-white/[.06] pe-4 ps-3 text-[14px] text-white/90 ring-1 ring-white/[.06]"><I size={16} aria-hidden="true" className="text-accent" />{a}</li>); })}
            </ul>
          </div>
          <div className="dark rounded-[22px] bg-[#1A1714] p-5 text-white ring-1 ring-white/[.06] md:p-7">
            <p className="flex items-center gap-2.5 text-[19px] font-semibold tracking-[-0.02em] md:text-[20px]"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-accent/15 text-accent"><Translate size={17} aria-hidden="true" /></span>{c.langs}</p>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {LOCALES.map((l) => { const on = l.code === locale; return (
                <li key={l.code}><button type="button" aria-pressed={on} onClick={() => setLocale(l.code)}
                  className={`flex h-11 w-full items-center gap-2 rounded-full pe-3 ps-1.5 text-[14px] ring-1 transition-colors duration-300 ${on ? "bg-white text-[#111] ring-white" : "bg-white/[.06] text-white/90 ring-white/[.06] hover:bg-white/[.12]"}`}>
                  <img src={`/flags/${l.flag}.svg`} alt="" width={26} height={26} className="h-[26px] w-[26px] shrink-0 rounded-full object-cover" /><span lang={l.code} dir={l.dir} className="truncate">{l.name}</span></button></li>); })}
            </ul>
          </div>
        </div>
      </div>
    </section>);
}

/** Everything below the hero, in page order. */
export default function BelowV3() {
  return (<><StepsV3 /><WhyV3 /><WorkspaceV3 /><WebV3 /><SectorsV3 /><CasesV3 /><EndV3 /></>);
}
