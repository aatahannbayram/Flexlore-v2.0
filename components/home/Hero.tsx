"use client";
import { useState } from "react";
import { Play } from "@phosphor-icons/react/dist/ssr";
import type { C, Lang } from "../copy";
import { SITE } from "../config";
import { StoreButtons } from "../Icons";
import { Device, SopScreen } from "../AppScreens";
import { MagneticButton } from "../ui/MagneticButton";
import { SmartVideo } from "../ui/SmartVideo";
import { VideoModal } from "../ui/VideoModal";

/** Hero. Split 12-column layout: copy in columns 1 to 6, the product in a device frame in 7 to 12. Text and media never overlap.
 *  HeroSequence is CSS-only (globals.css .hs-*): words rise in turn, then the device settles from 0.96 to 1.
 *  It runs without JS, ends fully visible, and is switched off by prefers-reduced-motion. */
export function Hero({ t, lang }: { t: C; lang: Lang }) {
  const [demo, setDemo] = useState(false);
  let w = 0;
  return (
    <section aria-labelledby="hero-h" className="relative isolate overflow-hidden pt-[var(--header-h)]">
      {/* Background: warm kitchen loop at ~20%, faded toward #111111. Poster only under reduced motion / Save-Data. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.2]"><SmartVideo name="kitchen" threshold={0.2} /></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#111111_0%,rgb(17_17_17/0.92)_45%,rgb(17_17_17/0.7)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#111111,rgb(17_17_17/0))]" />
      </div>

      <div className="container-x">
        <div className="grid-12 min-h-[min(calc(100svh-var(--header-h)),880px)] items-center gap-y-14 pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="col-span-12 lg:col-span-6">
            <p className="eyebrow hs-in" style={{ animationDelay: "0ms" }}>{t.hero}</p>
            <h1 id="hero-h" className="display mt-5 text-display">
              {t.h1.map((s, i) => (
                <span key={i} className={s.o ? "text-accent" : undefined}>
                  {s.t.trim().split(" ").map((word, j, arr) => (
                    <span key={j}><span className="hs-word" style={{ animationDelay: `${80 + 55 * w++}ms` }}>{word}</span>{j < arr.length - 1 || i < t.h1.length - 1 ? " " : ""}</span>))}
                </span>))}
            </h1>
            <p className="lead hs-in mt-6 max-w-[34rem]" style={{ animationDelay: "520ms" }}>{t.heroLine}</p>
            <div className="hs-in mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "620ms" }}>
              <MagneticButton href={SITE.demo}>{t.cta}</MagneticButton>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-secondary">
                <Play size={14} weight="fill" aria-hidden="true" />{t.watch}
              </button>
            </div>
            <div className="hs-in mt-8 flex flex-wrap items-center gap-x-4 gap-y-3" style={{ animationDelay: "700ms" }}>
              <span className="text-caption text-ink-faint">{t.storeNote}</span>
              <StoreButtons small />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="hs-device relative mx-auto w-[min(72vw,300px)] lg:w-[340px]" style={{ animationDelay: "360ms" }}>
              <Device label={t.alts[1]}><SopScreen active /></Device>
              {/* Readiness chip: overlaps the device corner, never the copy column. */}
              <div className="panel absolute -bottom-5 -left-6 w-[15.5rem] px-4 py-3.5 sm:-left-16">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{t.chip.title}</p>
                  <span className="rounded-full bg-[rgb(104_210_185/0.12)] px-2 py-0.5 text-xs font-semibold text-calm-aqua">{t.chip.status}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"><span className="absolute inset-y-0 left-0 w-[86%] rounded-full bg-calm-aqua" /></span>
                  <span className="text-sm font-semibold tabular-nums">12/14</span>
                </div>
                <p className="mt-2 text-xs text-ink-faint">{t.chip.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal open={demo} onClose={() => setDemo(false)} title={t.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={t.close} />
    </section>
  );
}
