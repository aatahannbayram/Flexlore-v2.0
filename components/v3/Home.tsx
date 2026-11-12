"use client";
/* Home page below the hero, one numbered story on the dark ground:
 * 01 how it works (you film and send, your team watches and takes the quiz, you see who is ready) ·
 * 02 why Flexlore (know-how stays, video not paper, built for the floor) · 03 workspaces (head office over its sites) ·
 * 04 web, desk to field (twin of 03) · 05 industries · 06 customers (pinned, slides sideways as the page scrolls) · closing card.
 * Orange is the payoff words, the progress line and the call to action.
 * Copy: d.process / d.bento / d.end / d.ind (main dictionary), HOME2 (steps, roles, why, sector lines, web chip), HOME4 (workspaces, web, customers). */
import { useCallback, useEffect, useRef, useState, Fragment } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
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
import { DesktopV3 } from "./Desktop";
import { FactsV3 } from "./Facts";

/** Section heading: words rise in one after another when the heading enters view (static under reduced motion).
 *  Two tones everywhere: a heading with two sentences splits after the first; otherwise the last third is the result.
 *  Payoff words (the `b` part, or the last third of `a`) carry the brand orange (.t-accent, globals.css). */
function H2({ id, a, b, className = "" }: { id: string; a: string; b?: string; className?: string }) {
  const reduce = useReducedMotion();
  if (!b) { const m = a.match(/^(.+?\.)\s+(.+)$/); if (m) { a = m[1]; b = m[2]; } }
  const aw = a.split(" "); const nA = b ? aw.length : aw.length - Math.ceil(aw.length / 3);
  const words = [...aw.map((w, k) => [w, k >= nA] as const), ...(b ? b.split(" ").map((w) => [w, true] as const) : [])];
  if (reduce) return <h2 id={id} className={`v4-h2 mt-3 ${className}`}><span className="t-ink">{aw.slice(0, nA).join(" ")}</span> <span className="t-accent">{[...aw.slice(nA), ...(b ? [b] : [])].join(" ")}</span></h2>;
  return (
    <m.h2 id={id} aria-label={b ? `${a} ${b}` : a} className={`v4-h2 mt-3 ${className}`} initial="h" whileInView="s" viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.045 }}>
      {words.map(([w, pay], k) => (
        <span key={k} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <m.span className={`inline-block ${pay ? "t-accent" : "t-ink"}`} variants={{ h: { y: "105%" }, s: { y: 0 } }} transition={{ duration: 0.22, ease: "easeOut" as const }}>{w}</m.span>
        </span>)).flatMap((el, k) => (k ? [" ", el] : [el]))}
    </m.h2>);
}
/** Sideways rows on phones: "1 / 4" under the row, following the card that is snapped in. */
function RowCount({ row, n, className = "" }: { row: React.RefObject<HTMLElement | null>; n: number; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => { const el = row.current; if (!el) return; let raf = 0;
    const f = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const kids = [...el.children] as HTMLElement[]; const pad = parseFloat(getComputedStyle(el).paddingInlineStart) || 0;
      let best = 0, d = Infinity; kids.forEach((c, k) => { const x = Math.abs(c.offsetLeft - pad - el.scrollLeft); if (x < d) { d = x; best = k; } }); setI(best); }); };
    el.addEventListener("scroll", f, { passive: true }); return () => { el.removeEventListener("scroll", f); cancelAnimationFrame(raf); }; }, [row]);
  return <p aria-hidden="true" className={`mt-3 text-center text-[12px] tabular-nums text-ink-faint ${className}`}>{i + 1} / {n}</p>;
}
/** Chapter marker: the home page reads as one story, numbered 01 to 06. */
const Ch = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-2" data-n={n}><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame" /><p className="ch-label">{children}</p></div>);
/** Chapter head: number and heading on the left, the lead on the right (03 and 04 share it, so they read as a pair). */
const Head = ({ n, k, id, h, h2, p, w = "max-w-[24ch]", extra }: { n: string; k: string; id: string; h: string; h2?: string; p: string; w?: string; extra?: React.ReactNode }) => (
  <div className="grid-12 items-end gap-y-4">
    <div className="col-span-12 lg:col-span-7"><div className="flex flex-wrap items-center gap-3"><Ch n={n}>{k}</Ch>{extra}</div><H2 id={id} a={h} b={h2} className={w} /></div>
    <p className="rv intro col-span-12 max-w-[30rem] lg:col-span-5 lg:justify-self-end">{p}</p>
  </div>);
const glass = "rounded-[16px] bg-[rgb(24_24_24/0.62)]";
/** Warm fade from the photo into the ground. */
const fade = "bg-[linear-gradient(180deg,rgb(16_16_16/0)_30%,rgb(16_16_16/0.55)_62%,rgb(16_16_16/0.94)_100%)]";
/** Words of a heading, each revealed as the line scrolls in (see .sw in globals.css). `from` continues the count. */
const Words = ({ text, from = 0 }: { text: string; from?: number }) => <>{text.split(" ").map((w, k) => <Fragment key={k}>{k > 0 && " "}<span className="sw" style={{ ["--i" as string]: from + k }}>{w}</span></Fragment>)}</>;
/** Rule-of-thirds lines for the camera screen. */
const THIRDS = (() => { const l = "rgb(255 255 255 / 0.18)"; const g = (dir: string) => `linear-gradient(${dir},transparent calc(33.33% - .5px),${l} calc(33.33% - .5px),${l} calc(33.33% + .5px),transparent calc(33.33% + .5px),transparent calc(66.66% - .5px),${l} calc(66.66% - .5px),${l} calc(66.66% + .5px),transparent calc(66.66% + .5px))`; return `${g("90deg")},${g("180deg")}`; })();

/* ---------- How it works: five steps, one stage ----------
 * Told to the business owner: "you" film and send, "your team" watches and takes the quiz, "you" see who is ready.
 * Steps advance every 6 s while in view (pausable, never under reduced motion); hover holds, click or focus picks.
 * The stage is a field photo with the phone standing fully inside it (sized by the stage height) and a status chip. */
const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
// Bright scenes behind the phone, one per step: film at the bench, split for the team, watch on the floor, quiz, see who is ready.
// Other takes of the hero's scenes, so the two chapters never show the same frame; softened behind the phone.
const STAGE = ["how-firin", "how-franchise", "how-uretim", "how-restoran", "how-otel"] as const;
/* The phone shows a close-up of the same scene (focus point per step), so stage and screen are one place. */
export const STILL = [{ src: "/photos/how-firin-800.webp", at: "50% 66%" }, { src: "/photos/how-franchise-800.webp", at: "62% 76%" },
  { src: "/photos/how-uretim-800.webp", at: "60% 46%" }] as const;
const STAGE_POS: Record<string, string> = { "how-firin": "50% 50%", "how-franchise": "60% 40%", "how-uretim": "60% 40%", "how-restoran": "60% 40%", "how-otel": "70% 40%", "stage-firin": "50% 40%", "stage-franchise": "50% 10%", "stage-uretim": "50% 10%", "stage-restoran": "50% 5%", "stage-otel": "50% 5%" };
/* Who holds the phone at each step: 0 you (the owner or manager), 1 your team. */
const ROLE = [0, 0, 1, 1, 0] as const;
/* Stage photo: the v3 set, or a /photos still. None of them shows a phone or tablet, so the mockup is the only device on
   the stage; all are softened a little so the phone reads as the thing in focus. */
function StageImg({ n, soft = false }: { n: string; soft?: boolean }) {
  const cls = `absolute inset-0 h-full w-full object-cover ${soft ? "scale-[1.06] blur-[6px]" : ""}`;
  if (n in M) return <Photo n={n as Media} sizes="(min-width:1024px) 55vw, 100vw" className={cls} />;
  return (<picture><source type="image/avif" srcSet={`/photos/${n}-800.avif 800w, /photos/${n}-1600.avif 1600w`} sizes="(min-width:1024px) 55vw, 100vw" />
    <img src={`/photos/${n}-1600.webp`} srcSet={`/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w`} sizes="(min-width:1024px) 55vw, 100vw" alt="" decoding="async" loading="lazy"
      style={{ objectPosition: STAGE_POS[n] }} className={cls} /></picture>);
}
/* Step 1 screen: the phone's camera filming the baker at work. Thirds grid, focus box on the hands, REC timer counting up,
   zoom and mode rows, shutter recording. Units are px of the 320 px design screen. */
export function CameraScreen({ active, lang }: { active: boolean; lang: "en" | "tr" }) {
  const [t, setT] = useState(0);
  useEffect(() => { if (!active) return; setT(0); const id = window.setInterval(() => setT((v) => Math.min(13, v + 1)), 420); return () => window.clearInterval(id); }, [active]);
  return (
    <div className="absolute inset-0 overflow-hidden bg-black text-white">
      <img src={STILL[0].src} alt="" decoding="async" className="absolute inset-0 h-full w-full scale-[1.35] object-cover" style={{ objectPosition: STILL[0].at, transformOrigin: STILL[0].at }} />
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
          <span className="h-[40px] w-[40px] overflow-hidden rounded-[9px] ring-1 ring-white/30"><img src={STILL[0].src} alt="" decoding="async" className="h-full w-full object-cover" /></span>
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
export function StepPlayerScreen({ active, lang }: { active: boolean; lang: "en" | "tr" }) {
  const L = SP[lang]; const reduce = useReducedMotion(); const D = 12; const [t, setT] = useState(reduce ? D : 0);
  useEffect(() => { if (!active || reduce) { setT(D); return; } setT(0); const id = window.setInterval(() => setT((v) => Math.min(D, v + 1)), 360); return () => window.clearInterval(id); }, [active, reduce]);
  const done = t >= D;
  return (<div className="absolute inset-0 flex flex-col bg-[#111]">
    <Status /><Nav title={L.t} right={<span className="text-[13px] tabular-nums text-white/60">6/6</span>} />
    <span className="mx-3.5 mt-2 block h-[3px] overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-white transition-[width] duration-500" style={{ width: done ? "100%" : "83.4%" }} /></span>
    <div className="relative mt-3 flex-1 overflow-hidden bg-black">
      <Clip name="how-player" active={active} />
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
  /* Steps advance on their own every 6 s while the section is on screen; only the pause button stops them. */
  const [i, setI] = useState(0); const [paused, setPaused] = useState(false);
  const run = on && !paused && !reduce;
  useEffect(() => { if (!run) return; const t = window.setTimeout(() => setI((k) => (k + 1) % 5), 6000); return () => window.clearTimeout(t); }, [run, i]);
  const screen = i === 0 ? <CameraScreen active={on && !reduce} lang={lang} /> : i === 1 ? <Editor active={on} lang={lang} clip="how-editor" />
    : i === 2 ? <StepPlayerScreen active={on} lang={lang} /> : i === 3 ? <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} /> : <Ready active={on} lang={lang} />;
  /* Load the story screens as soon as the section is near, so switching steps never waits on code (no pop-in). */
  useEffect(() => { if (near) void import("../AppScreensStory"); }, [near]);
  return (
    <section id="how" aria-labelledby="how-h" className="section-y">
      <div className="container-x">
        <Ch n="01">{c.k}</Ch><H2 id="how-h" a={c.h} className="max-w-[30ch]" />
        <div ref={ref} className="mt-8 grid gap-5 md:mt-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <m.div {...rise(reduce)}
            className="dark card-pro relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#171717] sm:aspect-[16/11] lg:order-last lg:col-span-7 lg:aspect-auto lg:h-[600px]">
            <AnimatePresence initial={false}>
              <m.div key={STAGE[i]} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}>
                {near && <div className={`absolute inset-0 ${reduce ? "" : "stage-zoom"}`}><StageImg n={STAGE[i]} soft /></div>}
              </m.div>
            </AnimatePresence>
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_70%_75%_at_50%_55%,rgb(16_16_16/0.05)_0%,rgb(16_16_16/0.55)_100%)]" />
            {!reduce && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? c.play : c.pause} className="absolute end-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-[rgb(24_24_24/0.7)] text-white/80 transition-colors hover:text-white md:end-5 md:top-5">{paused ? <Play size={15} weight="fill" aria-hidden="true" /> : <Pause size={15} weight="fill" aria-hidden="true" />}</button>}
            {/* The phone is sized by the stage height, so it always stands whole inside the frame. */}
            <div className="absolute left-1/2 top-[52%] h-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[13%/6%] shadow-[0_50px_80px_-30px_rgb(0_0_0/0.8),0_18px_36px_-18px_rgb(0_0_0/0.55)] md:top-[48%] md:h-[80%]" style={{ aspectRatio: "440 / 956" }} dir="ltr">
              <Device max label={s[i][0]}>{near ? <AnimatePresence initial={false}><m.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35 }}>{screen}</m.div></AnimatePresence> : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            {/* Where the story is: five segments, the open one filling over its 6 s. */}
            <div aria-hidden="true" className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[rgb(17_17_17/0.55)] px-3 py-2.5 ring-1 ring-white/10 backdrop-blur-md md:bottom-5">
              {s.map((_, k) => <span key={k} className="h-[3px] w-7 overflow-hidden rounded-full bg-white/20 md:w-10">
                <span key={`${i}-${run}`} className="block h-full origin-left rounded-full bg-[#EC6726] rtl:origin-right" style={k < i ? { transform: "none" } : k === i ? (run ? { animation: "barfill 6s linear both" } : { transform: "none" }) : { transform: "scaleX(0)" }} /></span>)}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}
                className={`${glass} absolute start-3 top-3 flex w-max max-w-[calc(100%-4.5rem)] items-center gap-2 !rounded-full py-1.5 pe-3.5 ps-1.5 text-[13px] font-medium text-white md:start-5 md:top-5`}>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold ${ROLE[i] ? "bg-[#F4F0EB] text-[#111]" : "bg-white/15"}`}>{roles[ROLE[i]]}</span><span className="truncate">{x.chips[i]}</span>
              </m.div>
            </AnimatePresence>
          </m.div>
          <div className="flex min-w-0 flex-col lg:col-span-5">
            {/* Steps as quiet rows on a thin rail: the picked one lifts onto a card and opens its line. Every open line reserves
                the height of the longest one (all five stacked in one grid cell), so the list never changes height and
                nothing around it moves when the step changes. Numbers stay neutral: white for the open step, a tick once done. */}
            <ol className="relative flex flex-col gap-1 before:absolute before:bottom-6 before:start-[27px] before:top-6 before:w-px before:bg-line md:before:start-[31px]" role="tablist" aria-label={c.k}>
              {s.map(([h], k) => { const act = i === k; const done = k < i; return (
                <li key={h}>
                  <button type="button" role="tab" aria-selected={act} onClick={() => setI(k)} onFocus={() => setI(k)}
                    className={`group relative w-full overflow-hidden rounded-[18px] px-4 py-3 text-start transition-colors duration-300 md:px-5 md:py-3.5 ${act ? "bg-[var(--card)]" : "hover:bg-white/[.03]"}`}>
                    <span className="flex items-center gap-3">
                      <span className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-semibold tabular-nums ring-1 transition-colors duration-300 ${act ? "bg-ink text-bg ring-ink" : done ? "bg-bg text-ink-muted ring-line-strong" : "bg-bg text-ink-faint ring-line"}`}>
                        {done ? <Check size={12} aria-hidden="true" /> : k + 1}</span>
                      <span className={`min-w-0 flex-1 text-[17px] font-medium leading-snug tracking-[-0.02em] transition-colors duration-300 md:text-[18px] ${act ? "text-ink" : done ? "text-ink-muted" : "text-ink-faint group-hover:text-ink-muted"}`}>{h}</span>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[12.5px] font-medium transition-colors duration-300 ${act ? "bg-white/[.08] text-ink-muted" : "text-ink-faint"}`}>{roles[ROLE[k]]}</span>
                    </span>
                    <span aria-hidden={!act} className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${act ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <span className="overflow-hidden"><span className="grid ps-9 pt-1.5 text-[14.5px] leading-[1.6] text-ink-muted">
                        {s.map(([, q], j) => <span key={j} aria-hidden={j !== k} className={`[grid-area:1/1] ${j === k ? "" : "invisible"}`}>{q}</span>)}</span></span>
                    </span>
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
        {/* A statement, set apart: the line reveals word by word as it scrolls in (CSS scroll timeline, no JS). */}
        <div className="mx-auto max-w-[52rem] pt-6 text-center md:pt-10">
          <div className="flex justify-center"><Ch n="02">{c.k}</Ch></div>
          <h2 id="why-h" className="rv v4-h2 mt-3" style={{ fontSize: "clamp(34px, 1rem + 2.9vw, 66px)" }}><Words text={c.h} /> <span className="text-ink-faint"><Words text={c.h2 ?? ""} from={c.h.split(" ").length} /></span></h2>
          <p className="rv intro mx-auto mt-4 max-w-[40rem]">{c.lead}</p>
        </div>
        <ul ref={ref} className={`no-sb -mx-[var(--pad-x)] mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad-x)] [scroll-padding-inline:var(--pad-x)] md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 ${go || reduce ? "bx-go" : ""}`}>
          {c.cards.map(([h, p], k) => (
            <m.li key={h} {...rise(reduce, k)} className="dark card-pro group relative aspect-[4/5] w-[calc(100%-32px)] shrink-0 snap-start overflow-hidden rounded-[24px] bg-[#171717] text-white md:aspect-auto md:min-h-[420px] md:w-auto">
              <Photo n={imgs[k]} sizes="(min-width:768px) 33vw, 82vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
              <span aria-hidden="true" className={`absolute inset-0 ${fade}`} />
              <div className="absolute inset-x-4 top-[24%] md:inset-x-5" aria-hidden="true">{frags[k]}</div>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="text-[20px] font-semibold leading-[26px] tracking-[-0.02em]">{h}</h3>
                <p className="mt-2 text-[15px] leading-[22px] text-white/70">{p}</p>
              </div>
            </m.li>))}
        </ul>
        <RowCount row={ref} n={c.cards.length} className="md:hidden" />
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
const WS_FAN = ["M150 0 V12 H62 Q50 12 50 22 V32", "M150 0 V32", "M150 0 V12 H238 Q250 12 250 22 V32"];
/** From the picked site back to the centre trunk, where the next level's label sits. */
const wsBack = (x: number) => (x === 150 ? "M150 0 V20" : `M${x} 0 V4 Q${x} 10 ${x + (x < 150 ? 8 : -8)} 10 H${150 + (x < 150 ? -8 : 8)} Q150 10 150 16 V20`);
function WsLines({ paths, act, seen, pulse, reduce, k, h = 32, at = 0, cls = "h-7 md:h-9" }: { paths: string[]; act: number[]; seen: boolean; pulse: boolean; reduce: boolean | null; k: string; h?: number; at?: number; cls?: string }) {
  return (
    <svg aria-hidden="true" viewBox={`0 0 300 ${h}`} preserveAspectRatio="none" className={`block w-full ${cls}`}>
      {paths.map((p) => <path key={p} d={p} fill="none" stroke="var(--ws-line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
        style={{ opacity: seen || reduce ? 1 : 0, transition: reduce ? "none" : `opacity .6s ease ${at}s` }} />)}
      {pulse && act.map((n) => <path key={`${k}${n}`} d={paths[n]} fill="none" stroke="var(--ws-pulse)" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1}
        className={reduce ? "" : "ws-flow"} strokeDasharray={reduce ? "1" : "0.18 0.82"} />)}
    </svg>);
}
/** Level label on the trunk: number, name and a short hint, read top to bottom in the middle of the tree. */
function WsPill({ n, name, hint }: { n: number; name: string; hint: string }) {
  return (
    <div className="flex justify-center">
      <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-[var(--card)] px-3.5 py-1.5 text-[13px] ring-1 ring-line backdrop-blur-sm">
        <span className="font-semibold tabular-nums text-flame">0{n}</span>
        <span className="font-semibold text-ink">{name}</span>
        <span className="hidden truncate text-ink-faint sm:inline">· {hint}</span>
      </span>
    </div>);
}
export function WorkspaceV3() {
  const { d, locale } = useLocale(); const c = HOME4[locale].ws; const L = WS_LEVELS[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const seen = useInView(ref, { amount: 0.3, once: true }); const on = useInView(ref, { amount: 0.3 });
  const sites: { n: string; Ic: typeof Factory; img: string; pos: string; jobs: string[]; pics: string[]; people: number; due: number; done: [number, number][] }[] = [
    { n: c.nodes[1], Ic: ForkKnife, img: "ws-mutfak", pos: "50% 45%", jobs: d.bento.jobs, pics: ["ws-j-acilis", "ws-j-alerjen", "ws-j-fritoz"], people: 64, due: 5, done: [[14, 14], [11, 14], [6, 14]] },
    { n: c.nodes[2], Ic: Factory, img: "ws-uretim", pos: "50% 45%", jobs: c.siteJobs[0], pics: ["ws-j-hat", "ws-j-kalip", "ws-j-kkd"], people: 93, due: 8, done: [[22, 22], [17, 22], [9, 22]] },
    { n: c.nodes[3], Ic: HardHat, img: "ws-santiye", pos: "50% 45%", jobs: c.siteJobs[1], pics: ["ws-j-iskele", "ws-j-vinc", "ws-j-brifing"], people: 41, due: 3, done: [[18, 18], [15, 18], [12, 18]] },
  ];
  /* The tree builds itself once, level by level (label, cards, then the line down to the next level); only then do the
   * pulses run and the sites start taking turns. */
  const [ready, setReady] = useState(false);
  useEffect(() => { if (!seen) return; const t = window.setTimeout(() => setReady(true), reduce ? 0 : 2300); return () => window.clearTimeout(t); }, [seen, reduce]);
  const rise = (t: number) => (reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: seen ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }, transition: { duration: 0.6, delay: t, ease: EASE } });
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const auto = on && !hold && !reduce && ready;
  useEffect(() => { if (!auto) return; const t = window.setTimeout(() => setI((k) => (k + 1) % 3), 5000); return () => window.clearTimeout(t); }, [auto, i]);
  const cur = sites[i]; const pct = Math.round(100 * cur.done.reduce((a, [x, y]) => a + x / y, 0) / cur.done.length);
  const shown = useCount(pct, seen && !reduce); const people = useCount(cur.people, seen && !reduce);
  const total = sites.reduce((a, x) => a + x.people, 0);
  const cardH = "h-[118px] sm:h-[136px] md:h-[148px]";
  return (
    <section aria-labelledby="ws-h" className="section-y relative isolate">
      {/* Turn of the page: a fine line of light and a soft glow under it, so the statement above closes and the product opens. */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,rgb(244_240_235/0.05),transparent_70%)]" />
      <span aria-hidden="true" className="absolute inset-x-[12%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.16),transparent)]" />
      <div className="container-x">
        {/* Centred head: one idea, read before the tree starts building. */}
        <div className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <Ch n="03">{c.k}</Ch>
          <H2 id="ws-h" a={c.h} className="mx-auto max-w-[30ch]" />
          <p className="rv intro mt-4 max-w-[34rem]">{c.p}</p>
        </div>
        <div ref={ref} className="relative mx-auto mt-8 max-w-[940px] md:mt-12" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {/* 01 Workspace: the head office, one card wide, on the trunk. */}
          <m.div {...rise(0)}><WsPill n={1} name={L[0][0]} hint={L[0][1]} /></m.div>
          <WsLines paths={["M150 0 V20"]} act={[]} seen={seen} pulse={false} reduce={reduce} k="t" h={20} at={0.1} cls="h-4 md:h-5" />
          <m.div {...rise(0.2)} className="grid grid-cols-3 gap-2 md:gap-3">
              <div className={`dark card-pro relative col-start-2 flex flex-col justify-between overflow-hidden rounded-[18px] bg-[#171717] p-2.5 text-white ring-1 ring-[rgb(255_255_255/0.35)] md:p-3 ${cardH}`}>
                {seen && <img src="/photos/ws-ofis-800.webp" alt="" decoding="async" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_42%]" />}
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.05)_0%,rgb(16_16_16/0)_40%,rgb(16_16_16/0.78)_100%)]" />
                <span className="relative grid h-9 w-9 place-items-center rounded-[11px] bg-[#F4F0EB] text-[#111]"><Buildings size={17} aria-hidden="true" />
                  {!reduce && <span aria-hidden="true" className="ws-ping absolute inset-0 rounded-[11px] ring-1 ring-[#F4F0EB]" />}</span>
                <span className="relative block">
                  <span className="block truncate text-[14px] font-semibold md:text-[15px]">{c.nodes[0]}</span>
                  <span className="mt-0.5 flex items-center gap-2.5 text-[12px] text-white/75"><span className="flex items-center gap-1"><MapPin size={12} aria-hidden="true" />{sites.length}</span><span className="flex items-center gap-1 truncate tabular-nums"><Users size={12} aria-hidden="true" />{total}</span></span>
                </span>
              </div>
          </m.div>
          {/* 02 Folders: the trunk carries on to the label, then fans out to the sites. */}
          <WsLines paths={["M150 0 V20"]} act={[0]} seen={seen} pulse={ready} reduce={reduce} k="u" h={20} at={0.55} cls="h-5 md:h-6" />
          <m.div {...rise(0.75)}><WsPill n={2} name={L[1][0]} hint={L[1][1]} /></m.div>
          <WsLines paths={WS_FAN} act={[i]} seen={seen} pulse={ready} reduce={reduce} k={`a${i}`} at={0.85} />
          <m.div {...rise(1.05)} role="tablist" aria-label={c.k} className="grid grid-cols-3 gap-2 md:gap-3">
              {sites.map((s, k) => { const act = k === i; const Ic = s.Ic; return (
                <button key={s.n} type="button" role="tab" aria-selected={act} aria-controls="ws-panel" onClick={() => setI(k)}
                  className={`group dark card-pro relative flex flex-col justify-between overflow-hidden rounded-[18px] bg-[#171717] p-2.5 text-start text-white ring-1 transition-all duration-500 md:p-3 ${cardH} ${act ? "ring-[rgb(255_255_255/0.45)]" : "ring-transparent hover:ring-[rgb(255_255_255/0.2)]"}`}>
                  {seen && <img src={wsImg(s.img)} alt="" decoding="async" loading="lazy" style={{ objectPosition: s.pos }}
                    className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter,opacity] duration-700 ease-out ${act ? "scale-105 opacity-100" : "opacity-80 saturate-[0.75] group-hover:opacity-100 group-hover:saturate-100"}`} />}
                  <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.05)_0%,rgb(16_16_16/0)_40%,rgb(16_16_16/0.78)_100%)]" />
                  <span className={`relative grid h-9 w-9 place-items-center rounded-[11px] transition-colors duration-300 ${act ? "bg-[#F4F0EB] text-[#111]" : "bg-[rgb(16_16_16/0.45)] text-white/85"}`}><Ic size={17} aria-hidden="true" /></span>
                  <span className="relative block">
                    <span className="block truncate text-[14px] font-semibold md:text-[15px]">{s.n}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-[12px] text-white/75"><span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${act ? "bg-white" : "bg-white/40"}`} /><span className="truncate">{fmt(c.due, { n: s.due })}</span></span>
                  </span>
                  {act && auto && <span key={`t${i}`} aria-hidden="true" className="ws-timer absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[rgb(244_240_235/0.8)] rtl:origin-right" />}
                </button>); })}
            </m.div>
          {/* 03 Work: from the picked site back to the trunk, then out to its jobs. */}
          <WsLines paths={[wsBack(WS_X[i])]} act={[0]} seen={seen} pulse={ready} reduce={reduce} k={`b${i}`} h={20} at={1.45} cls="h-5 md:h-6" />
          <m.div {...rise(1.6)}><WsPill n={3} name={L[2][0]} hint={L[2][1]} /></m.div>
          <WsLines paths={WS_FAN} act={[1]} seen={seen} pulse={ready} reduce={reduce} k={`c${i}`} at={1.7} />
          <m.div {...rise(1.9)}>
            <div id="ws-panel" role="tabpanel">
              <AnimatePresence mode="wait" initial={false}>
                <m.ul key={i} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: EASE }}
                  className="grid grid-cols-3 gap-2 md:gap-3">
                  {cur.jobs.map((j, k) => { const [a, b] = cur.done[k]; const full = a === b; return (
                    <li key={j} className={`dark card-pro relative flex flex-col justify-between overflow-hidden rounded-[18px] bg-[#171717] p-2.5 text-white md:p-3 ${cardH}`}>
                      {seen && <img src={wsImg(cur.pics[k])} alt="" decoding="async" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
                      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.3)_0%,rgb(16_16_16/0)_32%,rgb(16_16_16/0.82)_100%)]" />
                      <span className="relative flex items-start justify-between gap-2">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-[rgb(16_16_16/0.72)] text-white"><Play size={13} weight="fill" aria-hidden="true" /></span>
                        <span className={`rounded-full bg-[rgb(16_16_16/0.72)] px-2 py-0.5 text-[12px] tabular-nums md:text-[13px] ${full ? "text-white" : "text-white/80"}`}>{full ? <span className="flex items-center gap-1"><Check size={13} aria-hidden="true" className="tick" /><span className="hidden sm:inline">{a}/{b}</span></span> : `${a}/${b}`}</span>
                      </span>
                      <span className="relative block">
                        <span className="line-clamp-2 block text-[13px] font-semibold leading-snug md:text-[14px]">{j}</span>
                        <span className="mt-2 block h-1 overflow-hidden rounded-full bg-white/[.15]"><m.span initial={{ width: 0 }} animate={{ width: seen ? `${(100 * a) / b}%` : 0 }} transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : (ready ? 0.15 : 2.1) + k * 0.07, ease: EASE }} className="block h-full rounded-full bg-white/90" /></span>
                      </span>
                    </li>); })}
                </m.ul>
              </AnimatePresence>
              <p className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 text-[13px] text-ink-muted">
                <span className="flex items-center gap-3"><span className="font-semibold text-ink">{cur.n}</span><span className="flex items-center gap-1.5 tabular-nums"><Users size={14} aria-hidden="true" />{people} {c.people}</span></span>
                <span className="flex items-center gap-2">{c.done}<span className="text-[18px] font-semibold tracking-[-0.03em] text-ink tabular-nums">%{shown}</span></span>
              </p>
            </div>
          </m.div>
        </div>
        <p className="mx-auto mt-3 max-w-[940px] text-end text-[12px] text-ink-faint">{c.sample}</p>
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
/* Meeting room (1408 x 792): a manager presents at a TV hung above everyone's heads; two laptops face the camera. Each
   screen's four edges were fitted to the photo and their crossings are the corners; the mask is the exact screen area, so nothing is painted over a person. */
// Corners sit 2.6 px outside the fitted inner bezel, so the panel tucks under the bezel with no white seam.
const MEET = { w: 1408, h: 792, tv: [[407.4, 52.7], [980.2, 52.7], [980.2, 386.2], [408, 386.3]],
  lapL: [[458.8, 577.3], [698.5, 598.4], [667.6, 780.1], [422.9, 739.5]], lapR: [[737.6, 527], [936.9, 513.3], [960.6, 650.7], [759.1, 676.2]] };
function DeskScene({ on, near }: { on: boolean; near: boolean }) {
  const { lang } = useLocale(); const box = useRef<HTMLDivElement>(null); const [W, setW] = useState(0);
  useEffect(() => { const el = box.current; if (!el) return; const ro = new ResizeObserver(() => setW(el.clientWidth)); ro.observe(el); return () => ro.disconnect(); }, []);
  const k = W / MEET.w; const q = (pts: number[][]) => pts.map(([x, y]) => [x * k, y * k]);
  const scr = (pts: number[][], w: number, h: number, child: React.ReactNode) => (
    <div className="absolute left-0 top-0 origin-top-left overflow-hidden bg-[#111]" style={{ width: w, height: h, transform: quadMatrix(w, h, q(pts)) }}>{child}</div>);
  return (
    <div ref={box} className="relative aspect-[1408/792] w-full overflow-hidden">
      <picture className="absolute inset-0"><source type="image/avif" srcSet="/photos/meet-800.avif 800w, /photos/meet-1600.avif 1600w" sizes="(min-width:1024px) 58vw, 100vw" />
        <img src="/photos/meet-1600.webp" srcSet="/photos/meet-800.webp 800w, /photos/meet-1600.webp 1600w" sizes="(min-width:1024px) 58vw, 100vw" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /></picture>
      {W > 0 && near && (
        <div aria-hidden="true" dir="ltr" className="absolute inset-0" style={{ maskImage: "url(/photos/meet-mask.png)", WebkitMaskImage: "url(/photos/meet-mask.png)", maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}>
          {scr(MEET.tv, 1180, 720, <Dash on={on} lang={lang} />)}
          {scr(MEET.lapL, 1180, 720, <BoardScreen />)}
          {scr(MEET.lapR, 1180, 720, <Dash on={false} lang={lang} />)}
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
        <div ref={ref} className="mt-8 grid gap-4 md:mt-12 lg:gap-6 lg:grid-cols-12 lg:gap-4">
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
            <picture className="absolute inset-0"><source type="image/avif" srcSet="/photos/web-saha-800.avif 800w, /photos/web-saha-1600.avif 1600w" sizes="(min-width:1024px) 38vw, 100vw" />
              <img src="/photos/web-saha-800.webp" srcSet="/photos/web-saha-800.webp 800w, /photos/web-saha-1600.webp 1600w" sizes="(min-width:1024px) 38vw, 100vw" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-[25%_50%]" /></picture>
            <span aria-hidden="true" className={`absolute inset-0 ${fade}`} />
            <div className="float-y absolute end-[7%] top-[7%] w-[min(36%,140px)] drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)]" dir="ltr" aria-hidden="true">
              <Device label={d.hero.chip.t}>{near ? <WorkScreen active={on} lang={lang} /> : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            <AnimatePresence>{beat === 1 && (
              <m.div key="back" initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: EASE }}
                className="absolute start-3 top-3 w-[min(54%,230px)] md:start-5 md:top-5" aria-hidden="true">{chip(b.branch, b.branchP)}</m.div>)}</AnimatePresence>
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4 text-start text-white md:p-6">
              <span className="block max-w-[56%] text-[19px] font-semibold tracking-[-0.02em] md:text-[22px]">{t.flow[1][0]}</span>
              <span className="mt-1 block max-w-[56%] text-[14px] text-white/75">{t.flow[1][1]}</span>
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
        <span aria-hidden="true" />
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
const ARROWS: Record<string, [string, string]> = { en: ["Previous", "Next"], tr: ["Önceki", "Sonraki"], de: ["Zurück", "Weiter"], ar: ["السابق", "التالي"], es: ["Anterior", "Siguiente"], ru: ["Назад", "Далее"], fr: ["Précédent", "Suivant"], pl: ["Poprzedni", "Następny"] };
const Arrows = ({ i, n, go }: { i: number; n: number; go: (k: number) => void }) => { const [prev, next] = ARROWS[useLocale().locale] ?? ARROWS.en; return (
  <div className="hidden shrink-0 gap-2 pb-2 md:flex">
    <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label={prev} className="grid h-11 w-11 place-items-center rounded-full bg-[var(--card)] transition-opacity hover:bg-[var(--card-2)] disabled:opacity-30"><Chev dir="start" className="h-2.5 w-3.5" /></button>
    <button type="button" onClick={() => go(i + 1)} disabled={i === n - 1} aria-label={next} className="grid h-11 w-11 place-items-center rounded-full bg-[var(--card)] transition-opacity hover:bg-[var(--card-2)] disabled:opacity-30"><Chev dir="end" className="h-2.5 w-3.5" /></button>
  </div>); };

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
        <p className="intro mt-4">{t.soon}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-b border-line">
          <CaseTabs t={t} secs={secs} cur={list[i]?.sec} go={go} list={list} />
          <Arrows i={i} n={list.length} go={go} />
        </div>
      </div>
      <div ref={track} role="region" aria-roledescription="carousel" aria-label={t.k} tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); } }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
        className="no-sb relative mt-8 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto md:mt-12 md:gap-6 px-[max(var(--pad-x),calc((100vw-var(--container))/2))] [scroll-padding-inline:max(var(--pad-x),calc((100vw-var(--container))/2))] active:cursor-grabbing">
        {list.map((c, k) => <CaseCard key={c.slug} c={c} t={t} act={k === i} k={k} n={list.length} className="aspect-[4/5] w-[calc(100%-32px)] snap-start sm:aspect-[16/10] md:aspect-[16/8] md:w-[min(1000px,84%)] md:max-h-[min(56vh,500px)]" />)}
      </div>
      <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
        <span className="flex gap-1.5">{list.map((c, k) => <span key={c.slug} className={`h-1.5 rounded-full transition-all duration-200 ${k === i ? "w-6 bg-ink" : "w-1.5 bg-line-strong"}`} />)}</span>
        <span className="text-[12px] tabular-nums text-ink-faint">{i + 1} / {list.length}</span></div>
    </section>);
}
export function CasesV3() {
  return <CasesCarousel />;
}
/* ---------- Closing call to action: the approved card with the phone and tablet on one stand ---------- */
const CtaDuoInner = dynamic(() => import("../home/CtaDuo").then((x) => x.CtaDuo), { ssr: false, loading: () => <div className="aspect-[2752/1536] w-full" /> });
export function EndV3() {
  const { d, lang } = useLocale(); const c = d.end;
  return (
    <section aria-labelledby="end-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-center gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <H2 id="end-h" a={c.h} className="max-w-[16ch]" />
            <p className="intro mt-4 max-w-[28rem]">{c.p}</p>
            <a href={SITE.demo} className="btn btn-cta group mt-8 h-11 px-5 text-[15px]">{c.cta}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
          </div>
          <div className="col-span-12 mx-auto w-full lg:col-span-7"><div dir="ltr" className="overflow-hidden rounded-[24px]"><CtaDuoInner lang={lang} /></div></div>
        </div>
      </div>
    </section>);
}


/* ---------- Industries: who it is for ----------
 * Large screens: four photo panels in a row into the sector pages; the one under the pointer or focus opens wide with
 * its line and three uses, the others narrow. Phones and tablets: cards that scroll sideways. Under them one glass strip:
 * other areas as chips, and the 8 languages as round flags that switch the site language. */
const IND: [string, string, typeof Factory, string][] = [["/sektor/restoran/", "sec-restoran", ForkKnife, "62% 40%"], ["/sektor/uretim/", "sec-uretim", Factory, "55% 40%"],
  ["/sektor/otel/", "sec-otel", Bed, "82% 30%"], ["/sektor/franchise/", "sec-franchise", Storefront, "30% 40%"]];
const AREA_IC = [FirstAid, GraduationCap, ChalkboardTeacher, Barbell, FilmSlate, DotsThreeCircle];
export function SectorsV3() {
  const { d, locale, setLocale } = useLocale(); const c = d.ind; const tabs = HOME2[locale].tabs; const reduce = useReducedMotion(); const row = useRef<HTMLUListElement>(null);
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
        <ul className="mt-12 hidden h-[clamp(440px,58vh,560px)] gap-6 lg:flex">
          {IND.map(([href, img, Ic, pos], k) => { const on = act === k; return (
            <li key={href} className="min-w-0 transition-[flex-grow] duration-700 ease-[var(--ease-out-expo)]" style={{ flexGrow: on ? 2.7 : 1, flexBasis: 0 }}
              onMouseEnter={() => setAct(k)}>
              <Link href={href} onFocus={() => setAct(k)} aria-label={c.cards[k]}
                className="group dark relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] bg-[#171717] p-5 text-white">
                {pic(img, "(min-width:1024px) 50vw, 100vw", `absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1.2s] ease-[var(--ease-out-expo)] ${on ? "scale-100" : "scale-110 saturate-[0.85] group-hover:saturate-100"}`, pos)}
                <span aria-hidden="true" className={`absolute inset-0 transition-opacity duration-700 ${on ? "bg-[linear-gradient(180deg,rgb(16_16_16/0.45)_0%,rgb(16_16_16/0)_28%,rgb(16_16_16/0.15)_50%,rgb(16_16_16/0.92)_100%)]" : "bg-[linear-gradient(180deg,rgb(16_16_16/0.1)_0%,rgb(16_16_16/0)_45%,rgb(16_16_16/0.7)_100%)]"}`} />
                <span className="relative flex items-center justify-between">
                  <span className="inline-flex h-9 items-center gap-2 rounded-full bg-[rgb(16_16_16/0.72)] pe-3 ps-2.5 text-[13px] font-semibold tabular-nums">
                    <Ic size={16} aria-hidden="true" /><span aria-hidden="true" className="h-3 w-px bg-white/25" /><span className="text-white/80">0{k + 1}</span></span>
                </span>
                <span className="relative block">
                  <span className={`block font-semibold leading-tight tracking-[-0.03em] transition-[font-size] duration-500 ${on ? "text-[30px]" : "text-[19px] [overflow-wrap:anywhere]"}`}>{c.cards[k]}</span>
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
        <ul ref={row} className="no-sb -mx-[var(--pad-x)] mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--pad-x)] px-[var(--pad-x)] lg:hidden">
          {IND.map(([href, img, Ic, pos], k) => (
            <m.li key={href} className="w-[calc(100%-32px)] shrink-0 snap-start sm:w-[46%]"
              {...rise(reduce, k)}>
              <Link href={href} className="group dark relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[22px] bg-[#171717] p-4 text-white">
                {pic(img, "80vw", "absolute inset-0 h-full w-full object-cover", pos)}
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.5)_0%,rgb(16_16_16/0)_26%,rgb(16_16_16/0)_42%,rgb(16_16_16/0.94)_100%)]" />
                <span className="relative inline-flex h-9 w-max items-center gap-2 rounded-full bg-[rgb(16_16_16/0.72)] pe-3 ps-2.5 text-[13px] font-semibold"><Ic size={16} aria-hidden="true" /><span aria-hidden="true" className="h-3 w-px bg-white/25" />0{k + 1}</span>
                <span className="relative block"><span className="block text-[20px] font-semibold leading-tight tracking-[-0.02em]">{c.cards[k]}</span>
                  <span className="mt-1.5 line-clamp-3 block text-[15px] leading-[22px] text-white/70">{tabs[k][0]}</span></span>
              </Link>
            </m.li>))}
        </ul>
        <RowCount row={row} n={IND.length} className="lg:hidden" />
        <Link href="/see-it/" className="btn btn-secondary mt-8 md:hidden">{c.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        {/* One slim glass strip: the other areas on one side, the 8 languages as round flags (a tap switches the site) on the other. */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div className="min-w-0">
            <p className="text-[13.5px] font-medium text-ink-faint">{c.also}</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
              {c.areas.map((a, k) => { const I = AREA_IC[k] ?? DotsThreeCircle; return (
                <li key={a} className="inline-flex items-center gap-2 text-[15px] text-ink/85"><I size={16} aria-hidden="true" className="text-ink-faint" />{a}</li>); })}
            </ul>
          </div>
          <div className="lg:border-s lg:border-line lg:ps-10">
            <p className="text-[13.5px] font-medium text-ink-faint">{c.langs}</p>
            <ul className="mt-3 flex flex-wrap gap-1">
              {LOCALES.map((l) => { const on = l.code === locale; return (
                <li key={l.code}><button type="button" aria-pressed={on} aria-label={l.name} title={l.name} onClick={() => setLocale(l.code)}
                  className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-300 ${on ? "bg-white/[.12] ring-2 ring-ink" : "hover:bg-white/[.06]"}`}>
                  <img src={`/flags/${l.flag}.svg`} alt="" width={28} height={28} className={`h-6 w-6 rounded-full object-cover transition-[transform,opacity] duration-300 ${on ? "scale-110" : "opacity-60 hover:opacity-100"}`} /></button></li>); })}
            </ul>
          </div>
        </div>
      </div>
    </section>);
}

/** Everything below the hero, in page order. */
/** One reveal for the page: text marked .rv fades up 12 px in 220 ms, once, when it enters the view. */
function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(".home-v3 .rv")]; if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => { el.classList.add("rv-js"); io.observe(el); }); return () => io.disconnect();
  }, []);
}
export default function BelowV3() {
  useReveal();
  return (<><StepsV3 /><WhyV3 /><FactsV3 H2={H2} Ch={Ch} /><WorkspaceV3 /><WebV3 /><DesktopV3 H2={H2} Ch={Ch} /><SectorsV3 /><CasesV3 /><EndV3 /></>);
}
