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
import { HOME4, WS_LEVELS } from "../i18n/home4";
import { EXTRA } from "../i18n/extra";
import { Device, WorkScreen, Status, Nav, Player, Clip, CheckRing } from "../AppScreens";
import { EASE } from "../ui/Reveal";
import { Play, Pause, Check, CheckCircle, ShieldCheck, MapPin, Users, ForkKnife, Storefront, Factory, HardHat, Buildings, Bed, ArrowRight, FirstAid, GraduationCap, ChalkboardTeacher, Barbell, FilmSlate, DotsThreeCircle, Lightning, ArrowCounterClockwise, Article, Translate } from "../ui/icons";
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
  if (reduce) return <h2 id={id} className={`v4-h2 mt-3 ${className}`}><span className="t-ink">{aw.slice(0, nA).join(" ")}</span> <span className="t-accent">{[...aw.slice(nA), ...(b ? [b] : [])].join(" ")}</span></h2>;
  return (
    <m.h2 id={id} aria-label={b ? `${a} ${b}` : a} className={`v4-h2 mt-3 ${className}`} initial="h" whileInView="s" viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.045 }}>
      {words.map(([w, pay], k) => (
        <span key={k} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <m.span className={`inline-block ${pay ? "t-accent" : "t-ink"}`} variants={{ h: { y: "105%" }, s: { y: 0 } }} transition={{ duration: 0.7, ease: EASE }}>{w}</m.span>
        </span>)).flatMap((el, k) => (k ? [" ", el] : [el]))}
    </m.h2>);
}
/** Chapter marker: the home page reads as one story, numbered 01 to 06. */
const Ch = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-2.5" data-n={n}><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame" /><Kicker>{children}</Kicker></div>);
/** Chapter head: number and heading on the left, the lead on the right (03 and 04 share it, so they read as a pair). */
const Head = ({ n, k, id, h, h2, p, w = "max-w-[24ch]", extra }: { n: string; k: string; id: string; h: string; h2?: string; p: string; w?: string; extra?: React.ReactNode }) => (
  <div className="grid-12 items-end gap-y-4">
    <div className="col-span-12 lg:col-span-7"><div className="flex flex-wrap items-center gap-3"><Ch n={n}>{k}</Ch>{extra}</div><H2 id={id} a={h} b={h2} className={w} /></div>
    <p className="col-span-12 max-w-[30rem] text-[15px] leading-[1.55] text-ink-muted md:text-[16px] lg:col-span-5 lg:justify-self-end">{p}</p>
  </div>);
const glass = "rounded-[16px] bg-[rgb(24_24_24/0.62)]";
/** Warm fade from the photo into the ground. */
const fade = "bg-[linear-gradient(180deg,rgb(16_16_16/0)_30%,rgb(16_16_16/0.55)_62%,rgb(16_16_16/0.94)_100%)]";
/** Rule-of-thirds lines for the camera screen. */
const THIRDS = (() => { const l = "rgb(255 255 255 / 0.18)"; const g = (dir: string) => `linear-gradient(${dir},transparent calc(33.33% - .5px),${l} calc(33.33% - .5px),${l} calc(33.33% + .5px),transparent calc(33.33% + .5px),transparent calc(66.66% - .5px),${l} calc(66.66% - .5px),${l} calc(66.66% + .5px),transparent calc(66.66% + .5px))`; return `${g("90deg")},${g("180deg")}`; })();

/* ---------- How it works: five steps, one stage ----------
 * Told to the business owner: "you" film and send, "your team" watches and takes the quiz, "you" see who is ready.
 * Steps advance every 6 s while in view (pausable, never under reduced motion); hover holds, click or focus picks.
 * The stage is a field photo with the phone standing fully inside it (sized by the stage height) and a status chip. */
const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const STAGE = ["bakery", "bakery", "saha-liman", "saha-drone-cember", "saha-santiye-havadan"] as const;
const STAGE_POS: Record<string, string> = { bakery: "30% 50%" };
/* Who holds the phone at each step: 0 you (the owner or manager), 1 your team. */
const ROLE = [0, 0, 1, 1, 0] as const;
/* Stage photo: the v3 set, or a /photos still. None of them shows a phone or tablet, so the mockup is the only device on
   the stage; all are softened a little so the phone reads as the thing in focus. */
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
        <span className="flex items-center gap-[6px] rounded-full bg-black/70 px-[10px] py-[4px] text-[13px] tabular-nums"><span className="rec-dot h-[7px] w-[7px] rounded-full bg-[#FF453A]" />00:{String(t).padStart(2, "0")}</span>
        <span className="text-white/85">4K · 30</span>
      </div>
      <span aria-hidden="true" className="cam-focus absolute left-[30%] top-[47%] h-[92px] w-[92px]">
        {["start-0 top-0 border-s-2 border-t-2 rounded-ss-[6px]", "end-0 top-0 border-e-2 border-t-2 rounded-se-[6px]", "start-0 bottom-0 border-s-2 border-b-2 rounded-es-[6px]", "end-0 bottom-0 border-e-2 border-b-2 rounded-ee-[6px]"].map((c) => <span key={c} className={`absolute h-[16px] w-[16px] border-white ${c}`} />)}
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-black/70 pb-[34px] pt-[12px]">
        <div className="flex justify-center gap-[6px] text-[12px] font-semibold tabular-nums">
          {["0.5", "1×", "2"].map((z, k) => <span key={z} className={`grid h-[30px] w-[30px] place-items-center rounded-full ${k === 1 ? "bg-white/20 text-[#FFD60A]" : "bg-white/10 text-white/80"}`}>{z}</span>)}
        </div>
        <div className="mt-[12px] flex justify-center gap-[20px] text-[12px] font-semibold uppercase tracking-[0.1em]">
          <span className="text-white/45">{lang === "tr" ? "Foto" : "Photo"}</span><span className="text-[#FFD60A]">Video</span><span className="text-white/45">Slo-mo</span>
        </div>
        <div className="mt-[14px] flex items-center justify-between px-[34px]">
          <span className="h-[40px] w-[40px] overflow-hidden rounded-[9px] ring-1 ring-white/30"><img src="/photos/bakery-800.webp" alt="" decoding="async" className="h-full w-full object-cover" /></span>
          <span className="grid h-[64px] w-[64px] place-items-center rounded-full ring-[3px] ring-white"><span className="h-[24px] w-[24px] rounded-[6px] bg-[#FF453A]" /></span>
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
    <span className="mx-3.5 mt-2 block h-[3px] overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-white transition-[width] duration-500" style={{ width: done ? "100%" : "83.4%" }} /></span>
    <div className="relative mt-3 flex-1 overflow-hidden bg-black">
      <Clip name="steam" active={active} className="scale-[1.02]" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/75 to-transparent" />
      <span className="absolute start-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white">{L.s}</span>
      <div className="absolute inset-x-4 bottom-[26px]">
        <p className="mb-2 text-[17px] font-semibold tracking-[-.01em] text-white">{L.h}</p>
        <Player t={t} d={D} text={L.p} more={L.more} />
      </div>
      <div className={`absolute inset-x-5 top-[30%] flex flex-col items-center gap-3 rounded-[18px] bg-black/75 px-4 py-5 text-center transition-all duration-500 ${done ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
        <span className="scale-[1.6]"><CheckRing on={done} reduce={reduce} /></span>
        <span className="mt-1 text-[16px] font-semibold text-white">{L.done}</span>
        <span className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#111]">{L.next}</span></div>
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
        <Ch n="01">{c.k}</Ch><H2 id="how-h" a={c.h} className="max-w-[30ch]" />
        <div ref={ref} className="mt-9 grid gap-5 md:mt-14 lg:grid-cols-12 lg:items-center lg:gap-10" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div className="dark relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#171717] sm:aspect-[16/11] lg:order-last lg:col-span-7 lg:aspect-auto lg:h-[540px]">
            <AnimatePresence initial={false}>
              <m.div key={STAGE[i]} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}>
                {near && <StageImg n={STAGE[i]} soft />}
              </m.div>
            </AnimatePresence>
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgb(16_16_16/0.3)_0%,rgb(16_16_16/0.85)_78%)]" />
            {!reduce && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? c.play : c.pause} className="absolute end-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-[rgb(24_24_24/0.7)] text-white/80 transition-colors hover:text-white md:end-5 md:top-5">{paused ? <Play size={15} weight="fill" aria-hidden="true" /> : <Pause size={15} weight="fill" aria-hidden="true" />}</button>}
            {/* The phone is sized by the stage height, so it always stands whole inside the frame. */}
            <div className="absolute left-1/2 top-[55%] h-[80%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] md:top-1/2 md:h-[84%]" style={{ aspectRatio: "393 / 852" }} dir="ltr">
              <Device label={s[i][0]}>{near ? <AnimatePresence initial={false}><m.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35 }}>{screen}</m.div></AnimatePresence> : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}
                className={`${glass} absolute start-3 top-3 flex w-max max-w-[calc(100%-4.5rem)] items-center gap-2 !rounded-full py-1.5 pe-3.5 ps-1.5 text-[13px] font-medium text-white md:start-5 md:top-5`}>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.08em] ${ROLE[i] ? "bg-white text-[#111]" : "bg-white/15"}`}>{roles[ROLE[i]]}</span><span className="truncate">{x.chips[i]}</span>
              </m.div>
            </AnimatePresence>
          </div>
          <div className="flex min-w-0 flex-col lg:col-span-5">
            {/* Steps as quiet rows: the picked one lifts onto a card, opens its line and fills an orange bar while it plays. */}
            <ol className="flex flex-col gap-1" role="tablist" aria-label={c.k}>
              {s.map(([h, p], k) => { const act = i === k; const done = k < i; const team = ROLE[k] === 1; return (
                <li key={h}>
                  <button type="button" role="tab" aria-selected={act} onClick={() => setI(k)} onFocus={() => setI(k)}
                    className={`group relative w-full overflow-hidden rounded-[18px] px-4 py-3 text-start transition-colors duration-300 md:px-5 md:py-3.5 ${act ? "bg-[var(--card)]" : "hover:bg-white/[.03]"}`}>
                    <span className="flex items-center gap-3">
                      <span className={`grid w-6 shrink-0 text-[13px] font-semibold tabular-nums transition-colors duration-300 ${act ? "text-ink" : "text-ink-faint"}`}>
                        {done ? <Check size={15} aria-hidden="true" className="tick" /> : String(k + 1).padStart(2, "0")}</span>
                      <span className={`min-w-0 flex-1 text-[18px] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-300 md:text-[19px] ${act ? "text-ink" : done ? "text-ink-muted" : "text-ink-faint group-hover:text-ink-muted"}`}>{h}</span>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${act ? (team ? "bg-ink text-bg" : "bg-white/10 text-ink") : "text-ink-faint"}`}>{roles[ROLE[k]]}</span>
                    </span>
                    <span aria-hidden={!act} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${act ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <span className="overflow-hidden"><span className="block ps-9 pt-1.5 text-[15px] leading-[1.55] text-ink-muted">{p}</span></span>
                    </span>
                    {act && <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-[2px] overflow-hidden rounded-full bg-line md:inset-x-5">
                      <span key={`${i}-${run}`} className="block h-full origin-left bg-ink rtl:origin-right" style={run ? { animation: "barfill 6s linear both" } : { transform: "scaleX(0)" }} /></span>}
                  </button>
                </li>); })}
            </ol>
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
      <div className={`${row} bx-rise`} style={{ animationDelay: "650ms" }}><CheckCircle size={14} weight="fill" aria-hidden="true" className="tick shrink-0" /><span className="truncate font-semibold">{c.a[1]}</span></div>
    </div>,
    <div key="b" className={`${glass} space-y-1.5 p-2`}>
      <div className={`${row} text-white/50`}><Article size={14} aria-hidden="true" className="shrink-0" /><span className="truncate line-through decoration-white/40">{c.b[0]}</span></div>
      <div className={`${row} bx-rise`} style={{ animationDelay: "650ms" }}><Play size={13} weight="fill" aria-hidden="true" className="shrink-0 text-white" /><span className="min-w-0 flex-1 truncate font-semibold">{c.b[1]}</span>
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
        <ul ref={ref} className={`no-sb -mx-[var(--pad-x)] mt-9 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--pad-x)] [scroll-padding-inline:var(--pad-x)] md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:overflow-visible md:px-0 ${go || reduce ? "bx-go" : ""}`}>
          {c.cards.map(([h, p], k) => (
            <m.li key={h} {...rise(reduce, k)} className="dark group relative aspect-[4/5] w-[82%] shrink-0 snap-start overflow-hidden rounded-[24px] bg-[#171717] text-white md:aspect-auto md:min-h-[440px] md:w-auto">
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

/* ---------- Workspaces: the account as a pyramid ----------
 * Workspace, folder, work: the head office on top (a photo card the same size as the cards under it), its three sites as
 * folders, and the picked site's jobs as the work at the base, joined by lines that carry a pulse downwards. On large
 * screens each level is named in a rail on the start side; on phones the name sits above its row. The site picks itself
 * every few seconds while the panel is on screen (paused on hover); the numbers count up. Sample numbers, labelled. */
const WS_X = [50, 150, 250];
const wsImg = (n: string) => (n in M ? `/media/v3/${n}-800.webp` : `/photos/${n}-800.webp`);
const WS_PATHS = ["M150 0 V12 H62 Q50 12 50 22 V32", "M150 0 V32", "M150 0 V12 H238 Q250 12 250 22 V32"];
const wsDown = (x: number) => WS_X.map((t) => (t === x ? `M${x} 0 V32` : `M${x} 0 V12 H${t + (t > x ? -12 : 12)} Q${t} 12 ${t} 22 V32`));
function WsLines({ paths, act, seen, reduce, k }: { paths: string[]; act: number[]; seen: boolean; reduce: boolean | null; k: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 32" preserveAspectRatio="none" className="block h-7 w-full md:h-9">
      {paths.map((p) => <path key={p} d={p} fill="none" stroke="rgb(255 255 255 / 0.14)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
        pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: seen || reduce ? 0 : 1, transition: reduce ? "none" : "stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)" }} />)}
      {act.map((n) => <path key={`${k}${n}`} d={paths[n]} fill="none" stroke="rgb(244 240 235 / 0.9)" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1}
        className={reduce ? "" : "ws-flow"} strokeDasharray={reduce ? "1" : "0.18 0.82"} />)}
    </svg>);
}
function WsLevel({ n, name, hint }: { n: number; name: string; hint: string }) {
  return (
    <div className="mb-2 flex items-baseline gap-2 lg:mb-0 lg:flex-col lg:justify-center lg:gap-1 lg:border-e lg:border-line lg:pe-5">
      <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-faint tabular-nums">0{n}</span>
      <span className="text-[14px] font-semibold text-ink lg:text-[16px]">{name}</span>
      <span className="truncate text-[13px] text-ink-faint lg:whitespace-normal">{hint}</span>
    </div>);
}
export function WorkspaceV3() {
  const { d, locale } = useLocale(); const c = HOME4[locale].ws; const L = WS_LEVELS[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const seen = useInView(ref, { amount: 0.3, once: true }); const on = useInView(ref, { amount: 0.3 });
  const sites: { n: string; Ic: typeof Factory; img: string; pos: string; jobs: string[]; pics: string[]; people: number; due: number; done: [number, number][] }[] = [
    { n: c.nodes[1], Ic: ForkKnife, img: "cafe-opening", pos: "55% 50%", jobs: d.bento.jobs, pics: ["restaurant", "chef-plating", "hero-sef"], people: 64, due: 5, done: [[14, 14], [11, 14], [6, 14]] },
    { n: c.nodes[2], Ic: Factory, img: "food-qa", pos: "50% 45%", jobs: c.siteJobs[0], pics: ["factory", "field", "safety"], people: 93, due: 8, done: [[22, 22], [17, 22], [9, 22]] },
    { n: c.nodes[3], Ic: HardHat, img: "saha-santiye-havadan", pos: "50% 50%", jobs: c.siteJobs[1], pics: ["saha-iskele-pov", "saha-liman", "saha-drone-cember"], people: 41, due: 3, done: [[18, 18], [15, 18], [12, 18]] },
  ];
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const auto = on && !hold && !reduce;
  useEffect(() => { if (!auto) return; const t = window.setTimeout(() => setI((k) => (k + 1) % 3), 5000); return () => window.clearTimeout(t); }, [auto, i]);
  const cur = sites[i]; const pct = Math.round(100 * cur.done.reduce((a, [x, y]) => a + x / y, 0) / cur.done.length);
  const shown = useCount(pct, seen && !reduce); const people = useCount(cur.people, seen && !reduce);
  const total = sites.reduce((a, x) => a + x.people, 0);
  const cardH = "h-[118px] sm:h-[136px] md:h-[148px]";
  return (
    <section aria-labelledby="ws-h" className="section-y pt-0">
      <div className="container-x">
        <Head n="03" k={c.k} id="ws-h" h={c.h} p={c.p} />
        <div ref={ref} className="relative mt-9 md:mt-14" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {seen && <AnimatePresence initial={false}>
            <m.span key={cur.img} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.9, ease: EASE }} className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
              <img src={wsImg(cur.img)} alt="" decoding="async" loading="lazy" className="h-full w-full scale-110 object-cover opacity-[0.1] blur-2xl saturate-0" />
            </m.span></AnimatePresence>}
          <div className="relative grid lg:grid-cols-[180px_1fr] lg:gap-x-6">
            {/* 01 Workspace: the head office, one card wide, centred over the sites. */}
            <WsLevel n={1} name={L[0][0]} hint={L[0][1]} />
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className={`dark relative col-start-2 flex flex-col justify-between overflow-hidden rounded-[18px] bg-[#171717] p-2.5 text-white ring-1 ring-[rgb(255_255_255/0.3)] md:p-3 ${cardH}`}>
                {seen && <img src="/photos/office-800.webp" alt="" decoding="async" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_42%] grayscale" />}
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.25)_0%,rgb(16_16_16/0.3)_40%,rgb(16_16_16/0.9)_100%)]" />
                <span className="relative grid h-9 w-9 place-items-center rounded-[11px] bg-[#F4F0EB] text-[#111]"><Buildings size={17} aria-hidden="true" />
                  {!reduce && <span aria-hidden="true" className="ws-ping absolute inset-0 rounded-[11px] ring-1 ring-[#F4F0EB]" />}</span>
                <span className="relative block">
                  <span className="block truncate text-[14px] font-semibold md:text-[15px]">{c.nodes[0]}</span>
                  <span className="mt-0.5 flex items-center gap-2.5 text-[12px] text-white/75"><span className="flex items-center gap-1"><MapPin size={12} aria-hidden="true" />{sites.length}</span><span className="flex items-center gap-1 truncate tabular-nums"><Users size={12} aria-hidden="true" />{total}</span></span>
                </span>
              </div>
            </div>
            <span className="hidden lg:block" /><WsLines paths={WS_PATHS} act={[i]} seen={seen} reduce={reduce} k="a" />
            {/* 02 Folders: the sites. Picking one sends the pulse down to its work. */}
            <WsLevel n={2} name={L[1][0]} hint={L[1][1]} />
            <div role="tablist" aria-label={c.k} className="grid grid-cols-3 gap-2 md:gap-3">
              {sites.map((s, k) => { const act = k === i; const Ic = s.Ic; return (
                <button key={s.n} type="button" role="tab" aria-selected={act} aria-controls="ws-panel" onClick={() => setI(k)}
                  className={`group dark relative flex flex-col justify-between overflow-hidden rounded-[18px] bg-[#171717] p-2.5 text-start text-white ring-1 transition-all duration-500 md:p-3 ${cardH} ${act ? "ring-[rgb(255_255_255/0.45)]" : "ring-transparent hover:ring-[rgb(255_255_255/0.2)]"}`}>
                  {seen && <img src={wsImg(s.img)} alt="" decoding="async" loading="lazy" style={{ objectPosition: s.pos }}
                    className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter,opacity] duration-700 ease-out ${act ? "scale-105 opacity-100 saturate-100" : "opacity-55 saturate-[0.35] group-hover:opacity-75"}`} />}
                  <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.15)_0%,rgb(16_16_16/0.2)_40%,rgb(16_16_16/0.88)_100%)]" />
                  <span className={`relative grid h-9 w-9 place-items-center rounded-[11px] transition-colors duration-300 ${act ? "bg-[#F4F0EB] text-[#111]" : "bg-[rgb(16_16_16/0.45)] text-white/85"}`}><Ic size={17} aria-hidden="true" /></span>
                  <span className="relative block">
                    <span className="block truncate text-[14px] font-semibold md:text-[15px]">{s.n}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-[12px] text-white/75"><span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${act ? "bg-white" : "bg-white/40"}`} /><span className="truncate">{fmt(c.due, { n: s.due })}</span></span>
                  </span>
                  {act && auto && <span key={`t${i}`} aria-hidden="true" className="ws-timer absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[rgb(244_240_235/0.8)] rtl:origin-right" />}
                </button>); })}
            </div>
            <span className="hidden lg:block" /><WsLines paths={wsDown(WS_X[i])} act={[0, 1, 2]} seen={seen} reduce={reduce} k={`b${i}`} />
            {/* 03 Work: the picked site's jobs, each with how many of its people have finished it. */}
            <WsLevel n={3} name={L[2][0]} hint={L[2][1]} />
            <div id="ws-panel" role="tabpanel">
              <AnimatePresence mode="wait" initial={false}>
                <m.ul key={i} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }}
                  className="grid grid-cols-3 gap-2 md:gap-3">
                  {cur.jobs.map((j, k) => { const [a, b] = cur.done[k]; const full = a === b; return (
                    <li key={j} className={`dark relative flex flex-col justify-between overflow-hidden rounded-[18px] bg-[#171717] p-2.5 text-white md:p-3 ${cardH}`}>
                      {seen && <img src={wsImg(cur.pics[k])} alt="" decoding="async" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80" />}
                      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.35)_0%,rgb(16_16_16/0.25)_35%,rgb(16_16_16/0.92)_100%)]" />
                      <span className="relative flex items-start justify-between gap-2">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-[rgb(16_16_16/0.72)] text-white"><Play size={13} weight="fill" aria-hidden="true" /></span>
                        <span className={`rounded-full bg-[rgb(16_16_16/0.72)] px-2 py-0.5 text-[12px] tabular-nums md:text-[13px] ${full ? "text-white" : "text-white/80"}`}>{full ? <span className="flex items-center gap-1"><Check size={13} aria-hidden="true" className="tick" /><span className="hidden sm:inline">{a}/{b}</span></span> : `${a}/${b}`}</span>
                      </span>
                      <span className="relative block">
                        <span className="line-clamp-2 block text-[13px] font-semibold leading-snug md:text-[14px]">{j}</span>
                        <span className="mt-2 block h-1 overflow-hidden rounded-full bg-white/[.15]"><m.span initial={{ width: 0 }} animate={{ width: seen ? `${(100 * a) / b}%` : 0 }} transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.15 + k * 0.07, ease: EASE }} className="block h-full rounded-full bg-white/90" /></span>
                      </span>
                    </li>); })}
                </m.ul>
              </AnimatePresence>
              <p className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 text-[13px] text-ink-muted">
                <span className="flex items-center gap-3"><span className="font-semibold text-ink">{cur.n}</span><span className="flex items-center gap-1.5 tabular-nums"><Users size={14} aria-hidden="true" />{people} {c.people}</span></span>
                <span className="flex items-center gap-2">{c.done}<span className="text-[18px] font-semibold tracking-[-0.03em] text-ink tabular-nums">%{shown}</span></span>
              </p>
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
/* Left wall screen: a readiness board per site (the same sample numbers as chapter 03), so the two screens differ:
   the board on the left, the live library on the right. Drawn at 1180 x 720 and mapped onto the screen. */
function BoardScreen() {
  const { locale } = useLocale(); const c = HOME4[locale].ws; const rows: [string, number][] = [[c.nodes[1], 74], [c.nodes[2], 73], [c.nodes[3], 83]];
  return (
    <div className="flex h-full w-full flex-col bg-[#101010] p-14 text-white">
      <div className="flex items-end justify-between"><span className="text-[44px] font-semibold tracking-[-0.03em]">{c.nodes[0]}</span><span className="text-[30px] text-white/50">{c.done}</span></div>
      <div className="mt-12 flex flex-1 flex-col justify-between">
        {rows.map(([n, v]) => (
          <div key={n}><div className="flex items-end justify-between text-[38px]"><span className="font-semibold">{n}</span><span className="tabular-nums text-white/80">%{v}</span></div>
            <div className="mt-4 h-5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white/85" style={{ width: `${v}%` }} /></div></div>))}
      </div>
    </div>);
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
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: 1180, height: 720, transform: quadMatrix(1180, 720, L) }}><BoardScreen /></div>
        </div>)}
    </div>);
}
export function WebV3() {
  const { d, locale, lang } = useLocale(); const t = HOME4[locale].web; const w2 = HOME2[locale].web; const b = d.bento; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const near = useInView(ref, { margin: "300px 0px", once: true }); const on = useInView(ref, { amount: 0.3 });
  const [beat, setBeat] = useState(0); // 0: the job goes out, 1: completion comes back
  useEffect(() => { if (!on || reduce) return; const id = window.setInterval(() => setBeat((x) => 1 - x), 3200); return () => window.clearInterval(id); }, [on, reduce]);
  const chip = (txt: string, sub: string) => (
    <div className={`${glass} flex items-center gap-3 px-3.5 py-2.5 text-white`}><CheckCircle size={16} weight="fill" className="tick shrink-0" aria-hidden="true" />
      <span className="min-w-0"><span className="block truncate text-[13px] font-semibold">{txt}</span><span className="block truncate text-[12px] text-white/65">{sub}</span></span></div>);
  return (
    <section id="web" aria-labelledby="web-h" className="section-y pt-0">
      <div className="container-x">
        <Head n="04" k={t.k} id="web-h" h={t.h} h2={t.h2} p={t.p}
          extra={<span className="rounded-full bg-[var(--card)] px-2.5 py-0.5 text-[12px] font-medium text-ink-muted">{w2.soon}</span>} />
        {/* Same frame and the same 7 / 5 split as chapter 03: desk on the left, field on the right. */}
        <div ref={ref} className="mt-9 grid gap-3 md:mt-14 lg:grid-cols-12 lg:gap-4">
          <figure className="dark relative overflow-hidden rounded-[20px] bg-[#171717] lg:col-span-7">
            <DeskScene on={on} near={near} />
            <span aria-hidden="true" className={`absolute inset-0 hidden md:block ${fade}`} />
            <figcaption className="relative p-4 text-white md:absolute md:inset-x-0 md:bottom-0 md:p-6">
              <span className="block text-[19px] font-semibold tracking-[-0.02em] md:text-[22px]">{t.flow[0][0]}</span>
              <span className="mt-1 block max-w-[24rem] text-[14px] text-white/70">{t.flow[0][1]}</span>
            </figcaption>
            <AnimatePresence>{beat === 0 && (
              <m.div key="out" initial={reduce ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: EASE }}
                className="absolute end-3 top-3 w-[min(62%,250px)] md:end-5 md:top-5" aria-hidden="true">{chip(b.jobs[0], `${b.sent} · ${b.today}`)}</m.div>)}</AnimatePresence>
          </figure>
          <figure className="dark relative min-h-[420px] overflow-hidden rounded-[20px] bg-[#171717] lg:col-span-5 lg:min-h-0">
            <picture className="absolute inset-0"><source type="image/avif" srcSet="/photos/factory-800.avif 800w, /photos/factory-1600.avif 1600w" sizes="(min-width:1024px) 38vw, 100vw" />
              <img src="/photos/factory-800.webp" srcSet="/photos/factory-800.webp 800w, /photos/factory-1600.webp 1600w" sizes="(min-width:1024px) 38vw, 100vw" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-[20%_50%]" /></picture>
            <span aria-hidden="true" className={`absolute inset-0 ${fade}`} />
            <div className="float-y absolute end-[7%] top-[7%] w-[min(36%,140px)] drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)]" dir="ltr" aria-hidden="true">
              <Device label={d.hero.chip.t}>{near ? <WorkScreen active={on} lang={lang} /> : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            <AnimatePresence>{beat === 1 && (
              <m.div key="back" initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: EASE }}
                className="absolute start-3 top-3 w-[min(54%,230px)] md:start-5 md:top-5" aria-hidden="true">{chip(b.branch, b.branchP)}</m.div>)}</AnimatePresence>
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4 text-start text-white md:p-6">
              <span className="block max-w-[56%] text-[19px] font-semibold tracking-[-0.02em] md:text-[22px]">{t.flow[1][0]} <span className="text-white/45">·</span> {t.flow[2][0]}</span>
              <span className="mt-1 block max-w-[56%] text-[14px] text-white/70">{t.flow[2][1]}</span>
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
      className={`dark relative shrink-0 select-none overflow-hidden rounded-[24px] bg-[#171717] text-white transition-opacity duration-500 ${act ? "opacity-100" : "opacity-45"} ${className}`}>
      <Photo n={c.img} portrait sizes="(min-width:768px) 70vw, 86vw" className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] ${act ? "scale-100" : "scale-[1.06]"}`} />
      <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(16_16_16/0.15)_0%,rgb(16_16_16/0.55)_60%,rgb(16_16_16/0.85)_100%)]" />
      <div className="relative flex h-full flex-col items-center justify-between p-6 text-center md:p-8">
        <span className={`${glass} inline-flex items-center gap-2 !rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white/90`}><I size={14} aria-hidden="true" />{t.sec[c.sec]}</span>
        <div className="max-w-[92%] md:max-w-[80%]">
          {LOGOS[c.slug]
            ? <h3 className="flex justify-center drop-shadow-[0_2px_18px_rgb(16_16_16/0.45)]"><CaseLogo slug={c.slug} name={c.company} /></h3>
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
          <Ch n="06">{t.k}</Ch><H2 id="cases-h" a={t.h} b={t.h2} className="max-w-[32ch]" />
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
        <Ch n="06">{t.k}</Ch><H2 id="cases-h" a={t.h} b={t.h2} className="max-w-[32ch]" />
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
        <div className="grid-12 items-center gap-y-7 border-t border-line pt-12 md:pt-16">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="end-h" className="v4-h2 max-w-[12ch]">{c.h}</h2>
            <p className="mt-4 max-w-[26rem] text-[17px] leading-[1.55] text-ink-muted">{c.p}</p>
            <a href={SITE.demo} className="btn btn-accent group mt-7 h-11 px-5 text-[15px]">{c.cta}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
          </div>
          <div className="col-span-12 mx-auto w-[86%] sm:w-full lg:col-span-7"><div dir="ltr"><CtaDuoInner lang={lang} /></div></div>
        </div>
      </div>
    </section>);
}


/* ---------- Industries: who it is for ----------
 * Large screens: four photo panels in a row into the sector pages; the one under the pointer or focus opens wide with
 * its line and three uses, the others narrow. Phones and tablets: cards that scroll sideways. Under them one glass strip:
 * other areas as chips, and the 8 languages as round flags that switch the site language. */
const IND: [string, string, typeof Factory, string][] = [["/sektor/restoran/", "chef-plating", ForkKnife, "50% 30%"], ["/sektor/uretim/", "field", Factory, "40% 40%"],
  ["/sektor/otel/", "hotel-desk", Bed, "50% 45%"], ["/sektor/franchise/", "huddle", Storefront, "50% 40%"]];
const AREA_IC = [FirstAid, GraduationCap, ChalkboardTeacher, Barbell, FilmSlate, DotsThreeCircle];
export function SectorsV3() {
  const { d, locale, setLocale } = useLocale(); const c = d.ind; const tabs = HOME2[locale].tabs; const reduce = useReducedMotion();
  const [act, setAct] = useState(0);
  const pic = (img: string, sizes: string, cls: string, pos: string) => (
    <picture className="absolute inset-0"><source type="image/avif" srcSet={`/photos/${img}-800.avif 800w, /photos/${img}-1600.avif 1600w`} sizes={sizes} />
      <img src={`/photos/${img}-800.webp`} srcSet={`/photos/${img}-800.webp 800w, /photos/${img}-1600.webp 1600w`} sizes={sizes} alt="" loading="lazy" decoding="async" style={{ objectPosition: pos }} className={cls} /></picture>);
  return (
    <section aria-labelledby="ind-h" className="section-y pt-0">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Ch n="05">{c.k}</Ch><H2 id="ind-h" a={c.h} className="max-w-[26ch]" /></div>
          <Link href="/see-it/" className="btn btn-secondary hidden md:inline-flex">{c.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        </div>
        {/* Large screens: four panels in a row; the one under the pointer (or keyboard focus) opens wide and tells its story,
            the others narrow to a photo strip with their number and name. */}
        <ul className="mt-9 hidden h-[clamp(440px,58vh,560px)] gap-3 md:mt-14 lg:flex">
          {IND.map(([href, img, Ic, pos], k) => { const on = act === k; return (
            <li key={href} className="min-w-0 transition-[flex-grow] duration-700 ease-[var(--ease-out-expo)]" style={{ flexGrow: on ? 2.7 : 1, flexBasis: 0 }}
              onMouseEnter={() => setAct(k)}>
              <Link href={href} onFocus={() => setAct(k)} aria-label={c.cards[k]}
                className="group dark relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] bg-[#171717] p-5 text-white">
                {pic(img, "(min-width:1024px) 50vw, 100vw", `absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1.2s] ease-[var(--ease-out-expo)] ${on ? "scale-100 saturate-100" : "scale-110 saturate-[0.4]"}`, pos)}
                <span aria-hidden="true" className={`absolute inset-0 transition-opacity duration-700 ${on ? "bg-[linear-gradient(180deg,rgb(16_16_16/0.45)_0%,rgb(16_16_16/0)_28%,rgb(16_16_16/0.15)_50%,rgb(16_16_16/0.92)_100%)]" : "bg-[rgb(16_16_16/0.55)]"}`} />
                <span className="relative flex items-center justify-between">
                  <span className="inline-flex h-9 items-center gap-2 rounded-full bg-[rgb(16_16_16/0.72)] pe-3 ps-2.5 text-[13px] font-semibold tabular-nums">
                    <Ic size={16} aria-hidden="true" /><span aria-hidden="true" className="h-3 w-px bg-white/25" /><span className="text-white/80">0{k + 1}</span></span>
                </span>
                <span className="relative block">
                  <span className={`block font-semibold leading-tight tracking-[-0.03em] transition-[font-size] duration-500 ${on ? "text-[30px]" : "truncate text-[19px]"}`}>{c.cards[k]}</span>
                  <span className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <span className="overflow-hidden">
                      <span className="block max-w-[34rem] pt-2.5 text-[15px] leading-[1.5] text-white/80">{tabs[k][0]}</span>
                      <span className="mt-4 flex flex-wrap gap-2">
                        {tabs[k][1].map((u) => <span key={u} className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(17_17_17/0.62)] px-3 py-1.5 text-[13px] text-white/90"><Check size={13} aria-hidden="true" className="tick" />{u}</span>)}
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>); })}
        </ul>
        {/* Phones and tablets: cards in a sideways row (snap, the next card peeks), each with its line and uses. */}
        <ul className="no-sb -mx-[var(--pad-x)] mt-9 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--pad-x)] px-[var(--pad-x)] lg:hidden">
          {IND.map(([href, img, Ic, pos], k) => (
            <m.li key={href} className="w-[80%] shrink-0 snap-start sm:w-[46%]"
              initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.7, delay: reduce ? 0 : k * 0.08, ease: EASE }}>
              <Link href={href} className="group dark relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[22px] bg-[#171717] p-4 text-white">
                {pic(img, "80vw", "absolute inset-0 h-full w-full object-cover", pos)}
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.5)_0%,rgb(16_16_16/0)_26%,rgb(16_16_16/0)_42%,rgb(16_16_16/0.94)_100%)]" />
                <span className="relative inline-flex h-9 w-max items-center gap-2 rounded-full bg-[rgb(16_16_16/0.72)] pe-3 ps-2.5 text-[13px] font-semibold"><Ic size={16} aria-hidden="true" /><span aria-hidden="true" className="h-3 w-px bg-white/25" />0{k + 1}</span>
                <span className="relative block"><span className="block text-[20px] font-semibold leading-tight tracking-[-0.02em]">{c.cards[k]}</span>
                  <span className="mt-1.5 line-clamp-3 block text-[13px] leading-[1.45] text-white/75">{tabs[k][0]}</span></span>
              </Link>
            </m.li>))}
        </ul>
        <Link href="/see-it/" className="btn btn-secondary mt-5 md:hidden">{c.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        {/* One slim glass strip: the other areas on one side, the 8 languages as round flags (a tap switches the site) on the other. */}
        <div className="mt-8 grid gap-5 border-t border-line pt-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{c.also}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {c.areas.map((a, k) => { const I = AREA_IC[k] ?? DotsThreeCircle; return (
                <li key={a} className="inline-flex h-9 items-center gap-2 rounded-full bg-white/[.05] pe-3.5 ps-3 text-[14px] text-ink"><I size={15} aria-hidden="true" className="text-ink-muted" />{a}</li>); })}
            </ul>
          </div>
          <div className="lg:border-s lg:border-line lg:ps-10">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{c.langs}</p>
            <ul className="mt-3 flex flex-wrap gap-1">
              {LOCALES.map((l) => { const on = l.code === locale; return (
                <li key={l.code}><button type="button" aria-pressed={on} aria-label={l.name} title={l.name} onClick={() => setLocale(l.code)}
                  className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-300 ${on ? "bg-white/[.12] ring-2 ring-ink" : "hover:bg-white/[.06]"}`}>
                  <img src={`/flags/${l.flag}.svg`} alt="" width={28} height={28} className={`h-7 w-7 rounded-full object-cover transition-transform duration-300 ${on ? "scale-105" : "opacity-85"}`} /></button></li>); })}
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
