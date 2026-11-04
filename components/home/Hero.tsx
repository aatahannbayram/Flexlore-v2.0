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
        <div className="absolute inset-0 opacity-[0.5] md:opacity-[0.62]">
          <picture>
            <source srcSet="/photos/kitchenline-800.avif 800w, /photos/kitchenline-1600.avif 1600w" sizes="100vw" type="image/avif" />
            <img src="/photos/kitchenline-1600.webp" srcSet="/photos/kitchenline-800.webp 800w, /photos/kitchenline-1600.webp 1600w" sizes="100vw" alt="" fetchPriority="low" className="kenburns absolute inset-0 h-full w-full object-cover object-[70%_center]" />
          </picture>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#111111_0%,rgb(17_17_17/0.94)_34%,rgb(17_17_17/0.62)_62%,rgb(17_17_17/0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_50%,rgb(17_17_17/0)_0%,rgb(17_17_17/0.55)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,#111111,rgb(17_17_17/0))]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(0deg,#111111,rgb(17_17_17/0))]" />
      </div>

      <div className="container-x">
        <div className="grid-12 min-h-[calc(100svh-var(--header-h))] items-center gap-y-14 pb-14 pt-8 md:pb-16 md:pt-10 lg:max-h-[900px] lg:min-h-[min(calc(100svh-var(--header-h)),900px)] lg:py-8">
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <p className="hs-in inline-flex items-center gap-2.5 rounded-full bg-white/[.06] py-1.5 pl-2.5 pr-4 text-[13px] text-ice-300 ring-1 ring-white/[.08] backdrop-blur-md" style={{ animationDelay: "0ms" }}>
              <span aria-hidden="true" className="relative grid h-2 w-2 place-items-center"><span className="absolute h-2 w-2 animate-ping rounded-full bg-flame/60 motion-reduce:hidden" /><span className="h-1.5 w-1.5 rounded-full bg-flame" /></span>
              <span>{t.rotPre}<Rotator words={t.rot} />{t.rotPost}</span>
            </p>
            <h1 id="hero-h" className="mt-6 max-w-[16ch] text-[clamp(34px,0.85rem+2.3vw,54px)] font-[580] leading-[1.06] tracking-[-0.034em] [text-wrap:balance]">
              {t.h1.map((s, i) => (
                <span key={i} className={`block ${s.o ? "text-ice-400" : ""}`}>
                  {s.t.trim().split(" ").map((word, j, arr) => (
                    <span key={j}><span className="hs-word" style={{ animationDelay: `${80 + 55 * w++}ms` }}>{word}</span>{j < arr.length - 1 || i < t.h1.length - 1 ? " " : ""}</span>))}
                </span>))}
            </h1>
            <p className="hs-in mt-5 max-w-[29rem] text-[17px] leading-[1.55] text-ink-muted" style={{ animationDelay: "520ms" }}>{t.heroLine}</p>
            <div className="hs-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "620ms" }}>
              <MagneticButton href={SITE.demo}>{t.cta}</MagneticButton>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-secondary">
                <Play size={14} weight="fill" aria-hidden="true" />{t.watch}
              </button>
            </div>
            <div className="hs-in mt-9 flex flex-wrap items-center gap-x-4 gap-y-3" style={{ animationDelay: "700ms" }}>
              <span className="text-[13px] text-ice-500">{lang === "tr" ? "Uygulamayı indirin" : "Get the app"}</span>
              <StoreButtons small lang={lang} className="[&_img]:!h-9 [&_a]:!rounded-[7px]" />
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
      {/* Scroll cue: a thin line that fills on a loop (desktop only, static under reduced motion). */}
      <a href="#main-next" aria-label={lang === "tr" ? "Aşağı kaydır" : "Scroll down"} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[.18em] text-ice-500 transition-colors hover:text-ink lg:flex">
        {lang === "tr" ? "Kaydır" : "Scroll"}
        <span className="relative h-9 w-px overflow-hidden bg-white/15"><span className="scrollcue absolute inset-x-0 top-0 h-1/2 bg-ink" /></span>
      </a>
      <VideoModal open={demo} onClose={() => setDemo(false)} title={t.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={t.close} />
    </section>
  );
}
