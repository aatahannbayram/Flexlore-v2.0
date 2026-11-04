"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "../ui/icons";
import type { C, Lang } from "../copy";
import { SITE } from "../config";
import { Device, WorkScreen } from "../AppScreens";
import { StoreButtons } from "../Icons";
import { Rotator } from "../ui/Rotator";
import { MagneticButton } from "../ui/MagneticButton";
import { VideoModal } from "../ui/VideoModal";

/** Hero. Split 12-column layout: copy in columns 1 to 6, the product in a device frame in 7 to 12. Text and media never overlap.
 *  HeroSequence is CSS-only (globals.css .hs-*): words rise in turn, then the device settles from 0.96 to 1.
 *  It runs without JS, ends fully visible, and is switched off by prefers-reduced-motion. */
// Decorative back phone (desktop only): its screen comes from the story chunk, fetched after mount on lg screens.
const LazyReady = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111111]" /> });

export function Hero({ t, lang }: { t: C; lang: Lang }) {
  const [demo, setDemo] = useState(false);
  const [lg, setLg] = useState(false);
  useEffect(() => { setLg(window.matchMedia("(min-width: 1024px)").matches); }, []);
  let w = 0;
  return (
    <section aria-labelledby="hero-h" className="relative isolate overflow-hidden pt-[var(--header-h)]">
      {/* Background: a warm kitchen-line photograph at ~32% with a very slow push-in (CSS, off under reduced motion), faded toward #111111. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.32]">
          <picture>
            <source srcSet="/photos/kitchenline-800.avif 800w, /photos/kitchenline-1600.avif 1600w" sizes="100vw" type="image/avif" />
            <img src="/photos/kitchenline-1600.webp" srcSet="/photos/kitchenline-800.webp 800w, /photos/kitchenline-1600.webp 1600w" sizes="100vw" alt="" fetchPriority="low" className="kenburns absolute inset-0 h-full w-full object-cover object-[70%_center]" />
          </picture>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#111111_0%,rgb(17_17_17/0.92)_45%,rgb(17_17_17/0.7)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#111111,rgb(17_17_17/0))]" />
      </div>

      <div className="container-x">
        <div className="grid-12 min-h-[calc(100svh-var(--header-h))] items-center gap-y-14 pb-14 pt-8 md:pb-16 md:pt-10 lg:max-h-[900px] lg:min-h-[min(calc(100svh-var(--header-h)),900px)] lg:py-8">
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <p className="eyebrow hs-in" style={{ animationDelay: "0ms" }}>{t.rotPre}<Rotator words={t.rot} />{t.rotPost}</p>
            <h1 id="hero-h" className="mt-5 max-w-[15ch] text-[clamp(36px,0.9rem+2.7vw,62px)] font-[600] leading-[1.04] tracking-[-0.038em] [text-wrap:balance]">
              {t.h1.map((s, i) => (
                <span key={i} className={`block ${s.o ? "text-ice-400" : ""}`}>
                  {s.t.trim().split(" ").map((word, j, arr) => (
                    <span key={j}><span className="hs-word" style={{ animationDelay: `${80 + 55 * w++}ms` }}>{word}</span>{j < arr.length - 1 || i < t.h1.length - 1 ? " " : ""}</span>))}
                </span>))}
            </h1>
            <p className="lead hs-in mt-5 max-w-[30rem]" style={{ animationDelay: "520ms" }}>{t.heroLine}</p>
            <div className="hs-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "620ms" }}>
              <MagneticButton href={SITE.demo}>{t.cta}</MagneticButton>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-secondary">
                <Play size={14} weight="fill" aria-hidden="true" />{t.watch}
              </button>
            </div>
            <div className="hs-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "700ms" }}>
              <StoreButtons small lang={lang} />
            </div>
          </div>

          {/* Product: the step-by-step player in front; on desktop the Orientation Analyzer stands behind it, offset and
              slightly turned, so the hero shows both sides of the app (learn the job / see who is ready). */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6 lg:col-start-7">
            <div className="relative mx-auto lg:h-[min(calc(100svh-var(--header-h)-64px),780px)] lg:w-full">
              <div aria-hidden="true" className="hs-device absolute left-[4%] top-[9%] hidden w-[clamp(200px,calc((100svh-var(--header-h)-96px)*0.4),262px)] -rotate-[5deg] opacity-80 [filter:brightness(.82)] lg:block" style={{ animationDelay: "520ms" }}>
                <Device label="">{lg ? <LazyReady active lang={lang} /> : <div className="absolute inset-0 bg-[#111111]" />}</Device>
              </div>
              <div className="hs-device relative z-10 mx-auto w-[min(64vw,260px)] md:w-[min(100%,250px)] lg:absolute lg:right-[2%] lg:top-1/2 lg:mx-0 lg:w-[clamp(232px,calc((100svh-var(--header-h)-96px)*0.461),300px)] lg:-translate-y-1/2" style={{ animationDelay: "360ms" }}>
                <Device label={t.alts[1]}><WorkScreen active lang={lang} /></Device>
                {/* Readiness chip: phones only (on tablet and desktop the second screen tells this story). */}
                <div className="panel absolute -bottom-8 left-1/2 w-[14rem] -translate-x-1/2 px-4 py-3 md:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{t.chip.title}</p>
                    <span className="rounded-full bg-[rgb(104_210_185/0.12)] px-2 py-0.5 text-xs font-semibold text-calm-aqua">{t.chip.status}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"><span className="absolute inset-y-0 left-0 w-[86%] rounded-full bg-ice-200" /></span>
                    <span className="text-sm font-semibold tabular-nums">12/14</span>
                  </div>
                  <p className="mt-2 text-xs text-ink-faint">{t.chip.note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal open={demo} onClose={() => setDemo(false)} title={t.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={t.close} />
    </section>
  );
}
