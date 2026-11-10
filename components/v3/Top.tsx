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
export const rise = (reduce: boolean | null, i = 0) => reduce ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-8% 0px" }, transition: { duration: 0.6, ease: EASE, delay: i * 0.07 } };

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
const STAGE_PICS: [string, string][] = [["chef-plating", "50% 30%"], ["field", "40% 35%"], ["hotel-desk", "50% 45%"], ["huddle", "50% 40%"], ["warehouse", "50% 40%"], ["bakery", "30% 50%"]];
export function HeroV3({ children }: { children?: React.ReactNode }) {
  const { d, lang } = useLocale(); const h = d.hero; const [demo, setDemo] = useState(false); const reduce = useReducedMotion();
  const [i, setI] = useState(0); const n = Math.min(STAGE_PICS.length, h.rot.length);
  /* Only the first stage photo is in the page as sent; the rest mount once the page is idle, so first paint stays light. */
  const [rest, setRest] = useState(false);
  useEffect(() => { const go = () => setRest(true); const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (document.readyState === "complete") { ric ? ric(go, { timeout: 2500 }) : window.setTimeout(go, 1500); } else window.addEventListener("load", () => (ric ? ric(go, { timeout: 2500 }) : window.setTimeout(go, 1500)), { once: true }); }, []);
  useEffect(() => { if (reduce || !rest) return; const t = window.setInterval(() => setI((k) => (k + 1) % n), 3600); return () => window.clearInterval(t); }, [reduce, n, rest]);
  return (
    <section aria-labelledby="hero-h" className="dark relative isolate overflow-hidden bg-[#111111] pt-[var(--header-h)] text-ink">
      <div className="container-x relative">
        <div className="grid-12 items-center gap-y-10 pb-12 pt-8 lg:min-h-[min(calc(100svh-var(--header-h)-40px),820px)] lg:py-14">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow i={i} />
            <h1 id="hero-h" className="mt-6 max-w-[15ch] text-[clamp(40px,1rem+3.2vw,74px)] font-semibold leading-[0.97] tracking-[-0.055em] [text-wrap:balance]">
              <span className="hs-word block"><span className="t-ink">{h.h1a}</span></span>
              <span className="hs-word block pb-[0.06em]" style={{ animationDelay: "90ms" }}><span className="hero-grad">{h.h1b}</span></span>
            </h1>
            <p className="hs-in mt-6 max-w-[32rem] text-[16px] leading-[1.6] text-white/70 sm:text-[17px]" style={{ animationDelay: "150ms" }}>{h.sub}</p>
            <div className="hs-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "250ms" }}>
              <a href={SITE.demo} className="btn btn-glass h-11 px-6 text-[15px]">{d.nav.cta}</a>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-glass-2 h-11 px-5 text-[15px]"><Play size={13} weight="fill" aria-hidden="true" />{h.watch}</button>
            </div>
            <div className="hs-in mt-8 hidden flex-wrap items-center gap-3 sm:flex" style={{ animationDelay: "350ms" }}>
              <StoreButtons small lang={lang} className="opacity-80 transition-opacity hover:opacity-100 [&_img]:!h-8 [&_a]:!rounded-[6px] [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center" />
            </div>
          </div>
          {/* The stage: one rounded window onto the trade of the moment, the phone with the live app standing in front. */}
          <div className="col-span-12 lg:col-span-6">
            <div className="hs-device relative mx-auto aspect-[4/5] w-full max-w-[520px] lg:aspect-[5/6] lg:max-w-none" style={{ animationDelay: "200ms" }}>
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[36px] bg-[#1A1A1A]">
                {STAGE_PICS.slice(0, rest ? n : 1).map(([img, pos], k) => { const on = k === i; return (
                  <picture key={img} className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${on ? "opacity-100" : "opacity-0"}`}>
                    <source type="image/avif" srcSet={`/photos/${img}-800.avif 800w, /photos/${img}-1600.avif 1600w`} sizes="(min-width:1024px) 45vw, 90vw" />
                    <img src={`/photos/${img}-800.webp`} srcSet={`/photos/${img}-800.webp 800w, /photos/${img}-1600.webp 1600w`} sizes="(min-width:1024px) 45vw, 90vw" alt="" decoding="async" loading="eager" {...(k === 0 ? { fetchPriority: "high" as const } : {})}
                      style={{ objectPosition: pos }} className={`h-full w-full object-cover ${on && !reduce ? "stage-zoom" : ""}`} /></picture>); })}
                <span className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_55%,rgb(17_17_17/0.15)_0%,rgb(17_17_17/0.7)_100%),linear-gradient(0deg,rgb(17_17_17/0.55)_0%,rgb(17_17_17/0)_40%)]" />
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <m.p key={i} aria-hidden="true" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.4, ease: EASE }}
                  className="absolute bottom-5 start-6 text-[13px] font-medium uppercase tracking-[0.14em] text-white/75">{h.rot[i % h.rot.length]}</m.p>
              </AnimatePresence>
              <div className="absolute left-1/2 top-1/2 w-[44%] max-w-[260px] -translate-x-1/2 -translate-y-1/2" dir="ltr">
                <div className="hero-lift drop-shadow-[0_45px_70px_rgba(0,0,0,0.7)]"><Device label={h.chip.t}><WorkScreen active lang={lang} /></Device></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* The programs strip sits on a dim city skyline at dusk, fading into the page above and below. */}
      <div className="relative isolate py-8 md:py-12">
        <span aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <img src="/media/v3/saha-cati-siluet-800.webp" alt="" loading="lazy" decoding="async" className="h-full w-full scale-110 object-cover object-[30%_75%] opacity-40 blur-[2px]" />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,#111111_0%,rgb(17_17_17/0.55)_35%,rgb(17_17_17/0.55)_65%,#111111_100%)]" />
        </span>
        {children}
      </div>
      <VideoModal open={demo} onClose={() => setDemo(false)} title={h.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={d.nav.close} />
    </section>);
}
