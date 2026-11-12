"use client";
/* v3 home page, first screen: hero (B1), plus the shared photo, kicker and heading helpers.
 * The rest of the page is in ./Home.tsx and loads after this. */
import { useCallback, useEffect, useState } from "react";
import { Device, WorkScreen, CheckRing } from "../AppScreens";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { SITE } from "../config";
import { useLocale } from "../i18n/LocaleProvider";
import { StoreButtons } from "../Icons";
import { VideoModal } from "../ui/VideoModal";
import { Play } from "../ui/icons";
import M from "./media.json";

export type Media = keyof typeof M;
/** A v3 photo. Landscape AVIF/WebP at 800 and 1600, JPG fallback; `portrait` adds the 4:5 crop for phones. */
export function Photo({ n, sizes = "100vw", className = "", priority = false, portrait = false, alt = "" }: { n: Media; sizes?: string; className?: string; priority?: boolean; portrait?: boolean; alt?: string }) {
  const b = `/media/v3/${n}`;
  return (
    <picture>
      {portrait && <source media="(max-width: 767px)" type="image/avif" srcSet={`${b}-m.avif`} />}
      {portrait && <source media="(max-width: 767px)" type="image/webp" srcSet={`${b}-m.webp`} />}
      <source type="image/avif" srcSet={`${b}-800.avif 800w, ${b}-1600.avif 1600w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${b}-800.webp 800w, ${b}-1600.webp 1600w`} sizes={sizes} />
      <img src={`${b}-1600.jpg`} alt={alt} decoding="async" loading={priority ? "eager" : "lazy"} {...(priority ? { fetchPriority: "high" as const } : {})}
        className={className} style={{ objectPosition: portrait ? undefined : M[n].pos }} />
    </picture>);
}

export const Kicker = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`text-[14px] font-medium tracking-[-0.005em] ${light ? "text-white/70" : "text-ink-faint"}`}>{children}</p>);
/** Two-tone heading: the set-up in ink, the result in orange. */
export const H2 = ({ id, a, b, className = "" }: { id: string; a: string; b?: string; className?: string }) => (
  <h2 id={id} className={`v4-h2 mt-4 ${className}`}>{a}{b && <> <span className="text-ink-faint">{b}</span></>}</h2>);
export const rise = (reduce: boolean | null, i = 0) => reduce ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-8% 0px" }, transition: { duration: 0.22, ease: "easeOut" as const, delay: i * 0.06 } };

/* Over the headline: one quiet line naming the trade of the scene on screen (existing 8-language copy). */
function Eyebrow({ word, k }: { word: string; k: number }) {
  const { d } = useLocale(); const h = d.hero;
  return (
    <p className="hs-in flex items-center gap-3 text-[14px] text-white/60">
      <span aria-hidden="true" className="h-px w-8 bg-white/30" />
      <span className="truncate">{h.rotPre}<AnimatePresence mode="wait" initial={false}><m.span key={k} className="font-medium text-white/95" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.22, ease: "easeOut" }}>{word}</m.span></AnimatePresence>{h.rotPost}</span>
    </p>);
}

/* The world behind the phone is the step the phone is playing: the same real clips (production line, warehouse,
 * kitchen), full-bleed, a little softened and darkened, with a warm orange wash. The phone leads; the page follows its
 * steps, and the eyebrow names the trade of the scene. Only the first poster is in the page as sent; the clips load
 * once the page is idle. Reduced motion: the first poster, still. */
const SCENES = [{ clip: "line", rot: 1 }, { clip: "warehouse", rot: 4 }, { clip: "steam", rot: 0 }] as const;
function Scene({ k, rest, reduce }: { k: number; rest: boolean; reduce: boolean | null }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {SCENES.map((s, i) => { const on = i === k; return (
        <div key={s.clip} className={`absolute inset-0 transition-opacity duration-700 ease-out ${on ? "opacity-100" : "opacity-0"}`}>
          {rest && !reduce
            ? <video className={`h-full w-full scale-[1.08] object-cover blur-[5px] saturate-[1.2] contrast-[1.06] brightness-[0.92] ${on ? "stage-zoom" : ""}`} src={`/video/${s.clip}.mp4`} poster={`/video/${s.clip}.webp`} muted loop playsInline autoPlay preload="auto" />
            : (i === 0 || rest) && <img src={`/video/${s.clip}.webp`} alt="" decoding="async" {...(i === 0 ? { fetchPriority: "high" as const } : {})} className="h-full w-full scale-[1.08] object-cover blur-[5px] saturate-[1.2] contrast-[1.06] brightness-[0.92]" />}
        </div>); })}
      {/* Darker and calmer than the clip: a deep wash from the text side, a vignette that closes the corners, one warm
          glow behind the phone, and a long fade into the ground so the strip below starts on #111. */}
      <span className="absolute inset-0 bg-[rgb(10_10_10/0.34)]" />
      <span className="absolute inset-0 bg-[linear-gradient(90deg,rgb(12_12_12/0.95)_0%,rgb(12_12_12/0.82)_34%,rgb(12_12_12/0.45)_64%,rgb(12_12_12/0.55)_100%)] rtl:-scale-x-100" />
      <span className="absolute inset-0 bg-[radial-gradient(130%_95%_at_60%_45%,transparent_45%,rgb(8_8_8/0.7)_100%)]" />
      <span className="absolute inset-0 bg-[radial-gradient(38%_50%_at_76%_52%,rgb(236_103_38/0.2)_0%,rgb(236_103_38/0)_70%)] mix-blend-screen rtl:-scale-x-100" />
      <span className="absolute inset-0 bg-[radial-gradient(40%_45%_at_18%_42%,rgb(236_103_38/0.07)_0%,rgb(236_103_38/0)_70%)]" />
      <span className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(to_bottom,rgb(12_12_12/0.85),rgb(12_12_12/0))]" />
      <span className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_top,#111111_8%,rgb(17_17_17/0.85)_35%,rgb(17_17_17/0))]" />
    </div>);
}

/** Hero lines stand without a closing full stop (any language). */
const bare = (t: string) => t.replace(/[.。]\s*$/, "");
const STEP_DONE: Record<string, string> = { en: "Step complete", tr: "Adım tamamlandı", de: "Schritt erledigt", ar: "اكتملت الخطوة", es: "Paso completado", ru: "Шаг выполнен", fr: "Étape terminée", pl: "Krok ukończony" };
export function HeroV3({ children }: { children?: React.ReactNode }) {
  const { d, lang, locale } = useLocale(); const h = d.hero; const [demo, setDemo] = useState(false); const reduce = useReducedMotion();
  const [k, setK] = useState(0); const [ticks, setTicks] = useState(0); const [note, setNote] = useState(false);
  const onStep = useCallback((step: number, done: number) => { setK(step); setTicks((t) => { if (done > t) { setNote(true); } return done; }); }, []);
  useEffect(() => { if (!note) return; const id = window.setTimeout(() => setNote(false), 2200); return () => window.clearTimeout(id); }, [note, ticks]);
  /* The clips load once the page is idle, so the first paint stays light. */
  const [rest, setRest] = useState(false);
  useEffect(() => { const go = () => setRest(true); const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (document.readyState === "complete") { ric ? ric(go, { timeout: 2500 }) : window.setTimeout(go, 1500); } else window.addEventListener("load", () => (ric ? ric(go, { timeout: 2500 }) : window.setTimeout(go, 1500)), { once: true }); }, []);
  const word = h.rot[SCENES[k].rot % h.rot.length];
  return (
    <section aria-labelledby="hero-h" className="dark relative isolate overflow-hidden bg-[#111111] pt-[var(--header-h)] text-ink">
      <Scene k={k} rest={rest} reduce={reduce} />
      <div className="container-x relative">
        <div className="grid-12 items-center gap-y-10 pb-12 pt-10 lg:min-h-[min(calc(100svh-var(--header-h)-96px),760px)] lg:pb-14 lg:pt-6">
          {/* The promise, wide: each sentence on one line on large screens. */}
          <div className="relative z-10 col-span-12 lg:col-span-8">
            <Eyebrow word={word} k={k} />
            <h1 id="hero-h" className="mt-5 text-[clamp(38px,0.8rem+3.3vw,62px)] font-bold leading-[1.02] tracking-[-0.04em]">
              <span className="block lg:whitespace-nowrap"><span className="hs-word"><span className="hero-metal">{bare(h.h1a)}</span></span></span>
              <span className="block pb-[0.06em] lg:whitespace-nowrap"><span className="hs-word" style={{ animationDelay: "90ms" }}><span className="hero-ember">{bare(h.h1b)}</span></span></span>
            </h1>
            <p className="hs-in mt-6 max-w-[30rem] text-[16px] leading-[1.6] text-white/80 md:text-[17px]" style={{ animationDelay: "150ms" }}>{h.sub}</p>
            <div className="hs-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "250ms" }}>
              <a href={SITE.demo} className="btn btn-cta h-11 px-6 text-[15px]">{d.nav.cta}</a>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-glass-2 h-11 px-5 text-[15px]"><Play size={13} weight="fill" aria-hidden="true" />{h.watch}</button>
            </div>
            <div className="hs-in mt-7 hidden flex-wrap items-center gap-3 sm:flex" style={{ animationDelay: "350ms" }}>
              <StoreButtons small lang={lang} className="opacity-70 transition-opacity hover:opacity-100 [&_img]:!h-8 [&_a]:!rounded-[6px] [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center" />
            </div>
          </div>
          {/* The phone on the end side, playing the step the scene shows; a glass note pops beside it each time a
              step is ticked. */}
          <div className="relative col-span-12 flex justify-center lg:col-span-4 lg:justify-end">
            <div className="hs-device relative w-[66%] max-w-[300px] lg:w-[290px]" style={{ animationDelay: "200ms" }} dir="ltr">
              <div className="hero-lift rounded-[42px] shadow-[0_60px_90px_-35px_rgb(0_0_0/0.85),0_20px_40px_-20px_rgb(0_0_0/0.6)]"><Device max label={h.chip.t}><WorkScreen active lang={lang} onStep={onStep} /></Device></div>
              <AnimatePresence>{note && (
                <m.div key={ticks} aria-hidden="true" initial={reduce ? false : { opacity: 0, x: 12, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, x: -6 }} transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute -start-[30%] top-[62%] flex items-center gap-2.5 whitespace-nowrap rounded-[16px] bg-[rgb(17_17_17/0.78)] py-2.5 pe-4 ps-3 text-white shadow-[0_24px_50px_-24px_rgb(0_0_0/0.95)] ring-1 ring-white/15 backdrop-blur-md lg:-start-[46%]">
                  <span className="grid h-7 w-7 place-items-center [&>svg]:h-7 [&>svg]:w-7"><CheckRing on reduce={reduce} /></span>
                  <span className="leading-tight"><span className="block text-[14px] font-semibold">{STEP_DONE[locale] ?? STEP_DONE.en}</span><span className="block text-[12px] text-white/70">{ticks}/6</span></span>
                </m.div>)}</AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <div className="relative isolate pb-10 pt-2 md:pb-14">{children}</div>
      <VideoModal open={demo} onClose={() => setDemo(false)} title={h.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={d.nav.close} />
    </section>);
}
