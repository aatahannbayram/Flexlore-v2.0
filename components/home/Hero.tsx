"use client";
import { useEffect, useState, type CSSProperties } from "react";
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
 *  HeroSequence is CSS-only (globals.css .hs-*): words rise in turn, then the devices settle. Each step is 300ms (HS below).
 *  It runs without JS, ends fully visible, and is switched off by prefers-reduced-motion.
 *  Two devices tell "recording to readiness": the step player in front (01), the manager's readiness view behind (02). */
// Decorative back phone (desktop only): its screen comes from the story chunk, fetched after mount on lg screens.
const LazyReady = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111111]" /> });

/** Hero entrance timing: the hs-* keyframes live in globals.css; here every step is capped at 300ms (spec: motion under 300ms). */
const HS = (delay: number): CSSProperties => ({ animationDelay: `${delay}ms`, animationDuration: "300ms", animationTimingFunction: "cubic-bezier(.22,1,.36,1)" });

export function Hero({ t, lang }: { t: C; lang: Lang }) {
  const [demo, setDemo] = useState(false);
  const [lg, setLg] = useState(false);
  useEffect(() => { setLg(window.matchMedia("(min-width: 1024px)").matches); }, []);
  let w = 0;
  return (
    <section aria-labelledby="hero-h" className="relative isolate overflow-hidden pt-[var(--header-h)]">
      {/* Background: a flat, calm tone (#111111 easing to #161616 at the bottom). No photo, no glow, no vignette. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#111111_0%,#111111_40%,#161616_100%)]" />

      <div className="container-x">
        <div className="grid-12 min-h-[calc(100svh-var(--header-h))] items-center gap-y-14 pb-14 pt-8 md:pb-16 md:pt-10 lg:max-h-[900px] lg:min-h-[min(calc(100svh-var(--header-h)),900px)] lg:py-8">
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <p className="hs-in inline-flex items-center gap-2.5 rounded-full bg-white/[.06] py-1.5 pl-2.5 pr-4 text-[13px] text-ice-300 ring-1 ring-white/[.08]" style={HS(0)}>
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-flame" />
              <span>{t.rotPre}<Rotator words={t.rot} align={t.rotPre ? "start" : "end"} />{t.rotPost}</span>
            </p>
            <h1 id="hero-h" className="mt-6 max-w-[16ch] text-[clamp(34px,0.85rem+2.3vw,54px)] font-[580] leading-[1.06] tracking-[-0.034em] [text-wrap:balance]">
              {t.h1.map((s, i) => (
                <span key={i} className={`block ${s.o ? "text-ice-400" : ""}`}>
                  {s.t.trim().split(" ").map((word, j, arr) => (
                    <span key={j}><span className="hs-word" style={HS(60 + 30 * w++)}>{word}</span>{j < arr.length - 1 || i < t.h1.length - 1 ? " " : ""}</span>))}
                </span>))}
            </h1>
            <p className="hs-in mt-5 max-w-[29rem] text-[17px] leading-[1.55] text-ink-muted" style={HS(260)}>{t.heroLine}</p>
            <div className="hs-in mt-8 flex flex-wrap items-center gap-3" style={HS(320)}>
              <MagneticButton href={SITE.demo}>{t.cta}</MagneticButton>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-secondary">
                <Play size={14} weight="fill" aria-hidden="true" />{t.watch}
              </button>
            </div>
            <div className="hs-in mt-9 flex flex-wrap items-center gap-x-4 gap-y-3" style={HS(380)}>
              <span className="text-[13px] text-ice-400">{lang === "tr" ? "Uygulamayı indirin" : "Get the app"}</span>
              <StoreButtons small lang={lang} className="[&_img]:!h-9 [&_a]:!rounded-[7px]" />
            </div>
          </div>

          {/* Product: the step-by-step player in front; on desktop the Orientation Analyzer stands behind it, offset and
              slightly turned, so the hero shows both sides of the app (learn the job / see who is ready). */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6 lg:col-start-7">
            <div className="relative mx-auto lg:h-[min(calc(100svh-var(--header-h)-64px),780px)] lg:w-full">
              <div aria-hidden="true" className="hs-device absolute left-[4%] top-[9%] hidden w-[clamp(200px,calc((100svh-var(--header-h)-96px)*0.4),262px)] -rotate-[4deg] lg:block" style={HS(260)}>
                <div className="opacity-[.72]"><Device label="">{lg ? <LazyReady active lang={lang} /> : <div className="absolute inset-0 bg-[#111111]" />}</Device></div>
                <p className="mt-4 flex items-center gap-2 pl-2 text-[12px] text-ice-400"><span className="tabular-nums text-ice-400">02</span>{lang === "tr" ? "Yönetici kimin hazır olduğunu görür" : "The manager sees who is ready"}</p>
              </div>
              <div className="hs-device relative z-10 mx-auto w-[min(64vw,260px)] md:w-[min(100%,250px)] lg:absolute lg:right-[2%] lg:top-1/2 lg:mx-0 lg:w-[clamp(232px,calc((100svh-var(--header-h)-96px)*0.461),300px)] lg:-translate-y-1/2" style={HS(180)}>
                <Device label={t.alts[1]}><WorkScreen active lang={lang} /></Device>
                <p className="absolute -bottom-9 left-0 right-0 hidden items-center justify-center gap-2 text-[12px] text-ice-400 lg:flex"><span className="tabular-nums text-ice-400">01</span>{lang === "tr" ? "Bir kez çekilir, adım adım öğrenilir" : "Filmed once, learned step by step"}</p>
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
      {/* Scroll cue: static (no looping animation), desktop only. */}
      <a href="#main-next" aria-label={lang === "tr" ? "Aşağı kaydır" : "Scroll down"} className="absolute bottom-4 left-1/2 hidden min-h-11 -translate-x-1/2 flex-col items-center justify-center gap-2 px-3 text-[12px] uppercase tracking-[.18em] text-ice-400 transition-colors duration-200 ease-out hover:text-ink lg:flex">
        {lang === "tr" ? "Kaydır" : "Scroll"}
        <span aria-hidden="true" className="block h-6 w-px bg-white/25" />
      </a>
      <VideoModal open={demo} onClose={() => setDemo(false)} title={t.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={t.close} />
    </section>
  );
}
