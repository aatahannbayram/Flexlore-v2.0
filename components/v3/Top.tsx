"use client";
/* v3 home page, first screen: hero (B1), plus the shared photo, kicker and heading helpers.
 * The rest of the page is in ./Home.tsx and loads after this. */
import { useEffect, useState } from "react";
import { Device, WorkScreen } from "../AppScreens";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { SITE } from "../config";
import { useLocale } from "../i18n/LocaleProvider";
import { StoreButtons } from "../Icons";
import { VideoModal } from "../ui/VideoModal";
import { EASE } from "../ui/Reveal";
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

/* Over the headline: one quiet line naming the trade, in step with the photo behind the phone (existing 8-language copy). */
function Eyebrow({ i }: { i: number }) {
  const { d } = useLocale(); const h = d.hero;
  return (
    <p className="hs-in flex items-center gap-3 text-[14px] text-white/55">
      <span aria-hidden="true" className="h-px w-8 bg-white/30" />
      <span className="truncate">{h.rotPre}<AnimatePresence mode="wait" initial={false}><m.span key={i} className="font-medium text-white/90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>{h.rot[i % h.rot.length]}</m.span></AnimatePresence>{h.rotPost}</span>
    </p>);
}

/* The stage behind the hero phone cycles through the trades, in the order of the eyebrow words (hero.rot): restaurants,
   production lines, hotels, franchises, warehouses, bakeries. Warm photos only, darkened so the phone leads. */
// Bright, airy scenes made for this stage (ElevenLabs image generation, 2026-11-11), cropped 5:6 with the person on the right.
// Full-bleed hero: the 16:9 takes of the same scenes (the 5:6 stage crops stay for other uses); people sit right of centre.
const STAGE_PICS: [string, string][] = [["hero-restoran", "60% 35%"], ["hero-uretim", "62% 40%"], ["hero-otel", "55% 45%"], ["hero-franchise", "62% 40%"], ["hero-depo", "62% 45%"], ["hero-firin", "60% 50%"]];
export function HeroV3({ children }: { children?: React.ReactNode }) {
  const { d, lang } = useLocale(); const h = d.hero; const [demo, setDemo] = useState(false); const reduce = useReducedMotion();
  const [i, setI] = useState(0); const n = Math.min(STAGE_PICS.length, h.rot.length);
  /* Only the first stage photo is in the page as sent; the rest mount once the page is idle, so first paint stays light. */
  const [rest, setRest] = useState(false);
  useEffect(() => { const go = () => setRest(true); const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (document.readyState === "complete") { ric ? ric(go, { timeout: 2500 }) : window.setTimeout(go, 1500); } else window.addEventListener("load", () => (ric ? ric(go, { timeout: 2500 }) : window.setTimeout(go, 1500)), { once: true }); }, []);
  useEffect(() => { if (reduce || !rest) return; const t = window.setInterval(() => setI((k) => (k + 1) % n), 3600); return () => window.clearInterval(t); }, [reduce, n, rest]);
  return (
    <section aria-labelledby="hero-h" className="dark relative isolate overflow-hidden bg-[#111111] pt-[var(--header-h)] text-ink [--bleed:calc(var(--pad-x)+max(0px,(100vw-var(--container)-2*var(--pad-x))/2))]">
      {/* Atmosphere: a warm glow behind the stage, a soft light upper left, a faint grain-free vignette. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_78%_42%,rgb(236_103_38/0.16)_0%,rgb(236_103_38/0)_70%),radial-gradient(40%_45%_at_12%_18%,rgb(244_240_235/0.07)_0%,rgb(244_240_235/0)_70%),radial-gradient(120%_80%_at_50%_120%,rgb(0_0_0/0.6)_0%,rgb(0_0_0/0)_60%)]" />
      {/* Full-bleed stage: the trade of the moment fills the hero; the start side darkens for the words, a warm orange
          wash and a soft glow tie it to the brand, and the foot fades into the page for the programs strip. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        {STAGE_PICS.slice(0, rest ? n : 1).map(([img, pos], k) => { const on = k === i; return (
                  <picture key={img} className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${on ? "opacity-100" : "opacity-0"}`}>
                    <source type="image/avif" srcSet={`/photos/${img}-800.avif 800w, /photos/${img}-1600.avif 1600w`} sizes="100vw" />
                    <img src={`/photos/${img}-800.webp`} srcSet={`/photos/${img}-800.webp 800w, /photos/${img}-1600.webp 1600w`} sizes="100vw" alt="" decoding="async" loading="eager" {...(k === 0 ? { fetchPriority: "high" as const } : {})}
                      style={{ objectPosition: pos }} className={`h-full w-full object-cover ${on && !reduce ? "stage-zoom" : ""}`} /></picture>); })}
        <span className="absolute inset-0 bg-[linear-gradient(90deg,rgb(17_17_17/0.94)_0%,rgb(17_17_17/0.78)_30%,rgb(17_17_17/0.3)_58%,rgb(17_17_17/0.15)_100%)] rtl:-scale-x-100" />
        <span className="absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_45%,rgb(236_103_38/0.18)_0%,rgb(236_103_38/0)_70%)] mix-blend-screen" />
        <span className="absolute inset-0 bg-[rgb(236_103_38/0.06)] mix-blend-overlay" />
        <span className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_top,#111111_8%,rgb(17_17_17/0.7)_45%,rgb(17_17_17/0))]" />
        <span className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgb(17_17_17/0.7),rgb(17_17_17/0))]" />
      </div>
      <div className="container-x relative">
        <div className="grid-12 items-center gap-y-10 pb-10 pt-6 lg:min-h-[min(calc(100svh-var(--header-h)-24px),840px)] lg:py-10">
          <div className="relative z-10 col-span-12 lg:col-span-5">
            <Eyebrow i={i} />
            <h1 id="hero-h" className="mt-5 max-w-[14ch] text-[clamp(36px,0.9rem+2.5vw,58px)] font-[580] leading-[1] tracking-[-0.045em] [text-wrap:balance]">
              <span className="hs-word block"><span className="t-ink">{h.h1a}</span></span>
              <span className="hs-word block pb-[0.06em]" style={{ animationDelay: "90ms" }}><span className="hero-grad">{h.h1b}</span></span>
            </h1>
            <p className="hs-in mt-5 max-w-[23rem] text-[15px] leading-[1.65] text-white/75" style={{ animationDelay: "150ms" }}>{h.sub}</p>
            <div className="hs-in mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: "250ms" }}>
              <a href={SITE.demo} className="btn btn-glass h-11 px-6 text-[15px]">{d.nav.cta}</a>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-glass-2 h-11 px-5 text-[15px]"><Play size={13} weight="fill" aria-hidden="true" />{h.watch}</button>
            </div>
            <div className="hs-in mt-7 hidden flex-wrap items-center gap-3 sm:flex" style={{ animationDelay: "350ms" }}>
              <StoreButtons small lang={lang} className="opacity-60 transition-opacity hover:opacity-100 [&_img]:!h-8 [&_a]:!rounded-[6px] [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center" />
            </div>
          </div>
          {/* The stage: one rounded window onto the trade of the moment, the phone with the live app standing in front. */}
          <div className="col-span-12 lg:col-span-7">
            <div className="hs-device relative mx-auto aspect-[4/5] w-full max-w-[560px] lg:mx-0 lg:w-[calc(100%+var(--bleed))] lg:max-w-none lg:aspect-auto lg:h-[min(calc(100svh-var(--header-h)-80px),720px)]" style={{ animationDelay: "200ms" }}>
              <AnimatePresence mode="wait" initial={false}>
                <m.p key={i} aria-hidden="true" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.4, ease: EASE }}
                  className="absolute bottom-6 end-8 rounded-full bg-[rgb(17_17_17/0.35)] px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-white/85 ring-1 ring-white/15 backdrop-blur-md">{h.rot[i % h.rot.length]}</m.p>
              </AnimatePresence>
              {/* Two quiet glass notes on the stage (facts, not figures): the app's own languages, a finished step. */}
              <div aria-hidden="true" className="float-y absolute bottom-14 end-5 hidden items-center gap-2.5 rounded-[16px] bg-[rgb(17_17_17/0.6)] py-2.5 pe-4 ps-3 text-white shadow-[0_24px_50px_-24px_rgb(0_0_0/0.95),inset_0_1px_0_rgb(255_255_255/0.1)] ring-1 ring-white/10 backdrop-blur-md sm:flex" style={{ animationDelay: "-2.5s" }}>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F4F0EB] text-[#111]"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
                <span className="leading-tight"><span className="block text-[13px] font-semibold">{lang === "tr" ? "Adım tamamlandı" : "Step complete"}</span><span className="block text-[11.5px] text-white/55">{lang === "tr" ? "Quiz açıldı" : "Quiz unlocked"}</span></span></div>
              {/* The phone stands at the lower left, over the window's edge, so the photo reads and the app leads. */}
              <div className="absolute left-[28%] top-[54%] w-[42%] max-w-[250px] -translate-x-1/2 -translate-y-1/2 lg:left-[7%] lg:top-1/2 lg:w-[33%]" dir="ltr">
                <div className="hero-lift drop-shadow-[0_45px_70px_rgba(0,0,0,0.7)]"><Device label={h.chip.t}><WorkScreen active lang={lang} /></Device></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* The programs strip sits on a dim city skyline at dusk, fading into the page above and below. */}
      <div className="relative isolate pb-10 pt-4 md:pb-14">
        <span aria-hidden="true" className="absolute inset-x-[10%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.12),transparent)]" />
        {children}
      </div>
      <VideoModal open={demo} onClose={() => setDemo(false)} title={h.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={d.nav.close} />
    </section>);
}
