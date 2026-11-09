"use client";
/* v3 home page, first screen: hero (B1), plus the shared photo, kicker and heading helpers.
 * The rest of the page is in ./Home.tsx and loads after this. */
import { useState } from "react";
import { SITE } from "../config";
import { useLocale } from "../i18n/LocaleProvider";
import { Device, WorkScreen } from "../AppScreens";
import { StoreButtons } from "../Icons";
import { VideoModal } from "../ui/VideoModal";
import { EASE } from "../ui/Reveal";
import { Play } from "../ui/icons";
import { Chev } from "./Chevron";
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
  <p className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${light ? "text-white/70" : "text-ink-faint"}`}>{children}</p>);
/** Two-tone heading: the set-up in ink, the result in orange. */
export const H2 = ({ id, a, b, className = "" }: { id: string; a: string; b?: string; className?: string }) => (
  <h2 id={id} className={`v4-h2 mt-4 ${className}`}>{a}{b && <> <span className="text-ink-faint">{b}</span></>}</h2>);
export const rise = (reduce: boolean | null, i = 0) => reduce ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-8% 0px" }, transition: { duration: 0.6, ease: EASE, delay: i * 0.07 } };

/* ---------- B1. Hero (dark) ---------- */
export function HeroV3({ children }: { children?: React.ReactNode }) {
  const { d, lang } = useLocale(); const h = d.hero; const [demo, setDemo] = useState(false);
  return (
    <section aria-labelledby="hero-h" className="dark relative isolate overflow-hidden bg-[#111111] pt-[var(--header-h)] text-ink">
      {/* Desktop: the photo fills the right side and fades into the ground under the text. */}
      <div aria-hidden="true" className="absolute inset-y-0 end-0 hidden w-[64%] lg:block">
        <Photo n="hero-sef" priority sizes="64vw" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-[linear-gradient(90deg,#111111_0%,rgb(17_17_17/0.55)_28%,rgb(17_17_17/0)_60%),linear-gradient(0deg,#111111_0%,rgb(17_17_17/0)_22%)] rtl:bg-[linear-gradient(270deg,#111111_0%,rgb(17_17_17/0.55)_28%,rgb(17_17_17/0)_60%),linear-gradient(0deg,#111111_0%,rgb(17_17_17/0)_22%)]" />
      </div>
      <div className="container-x relative">
        <div className="grid-12 items-center gap-y-8 pb-6 pt-6 lg:min-h-[min(calc(100svh-var(--header-h)-88px),780px)] lg:py-12">
          <div className="col-span-12 lg:col-span-6">
            <h1 id="hero-h" className="max-w-[14ch] text-[clamp(40px,0.9rem+3.3vw,78px)] font-semibold leading-[0.98] tracking-[-0.05em] [text-wrap:balance]">
              <span className="hs-word block">{h.h1a}</span>
              <span className="hs-word block pb-[0.06em]" style={{ animationDelay: "90ms" }}><span className="hero-grad">{h.h1b}</span></span>
            </h1>
            <p className="hs-in mt-5 max-w-[30rem] text-[16px] leading-[1.6] text-ink-muted sm:text-[18px]" style={{ animationDelay: "150ms" }}>{h.sub}</p>
            <div className="hs-in mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: "250ms" }}>
              <a href={SITE.demo} className="btn btn-accent group h-12 px-6 text-[16px]">{d.nav.cta}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-secondary h-12"><Play size={14} weight="fill" aria-hidden="true" />{h.watch}</button>
            </div>
            <div className="hs-in mt-8 hidden flex-wrap items-center gap-3 sm:flex" style={{ animationDelay: "350ms" }}>
              <StoreButtons small lang={lang} className="opacity-80 transition-opacity hover:opacity-100 [&_img]:!h-8 [&_a]:!rounded-[6px] [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center" />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            {/* Phones and tablets: the photo is cropped behind the phone, under the headline and CTA. */}
            <div className="hs-device relative mx-auto aspect-[5/4] max-w-[560px] sm:aspect-[4/3] lg:aspect-[4/5] lg:max-w-[420px] lg:me-[4%]" style={{ animationDelay: "200ms" }}>
              <div className="absolute inset-0 overflow-hidden rounded-[16px] lg:hidden">
                <Photo n="hero-sef" sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgb(17_17_17/0.55)_0%,rgb(17_17_17/0)_45%)]" />
              </div>
              <div className="absolute bottom-[6%] start-[5%] w-[34%] max-w-[230px] lg:bottom-auto lg:start-auto lg:end-0 lg:top-1/2 lg:w-[62%] lg:max-w-none lg:-translate-y-1/2" dir="ltr">
                <Device label={h.chip.t}><WorkScreen active lang={lang} /></Device>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative pb-6 md:pb-8">{children}</div>
      <VideoModal open={demo} onClose={() => setDemo(false)} title={h.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={d.nav.close} />
    </section>);
}
