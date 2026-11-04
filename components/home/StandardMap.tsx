"use client";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "../copy";

/* "One standard, every location": a single job card on the left sends the same steps along three light paths to
 * three locations; each location fills its readiness bar and ticks people off as ready. Glass cards on the dark
 * ground, ice greys, one orange accent (the pulse travelling the paths). Decorative (the copy beside it says it);
 * CSS-driven, starts when on screen, static under reduced motion. Loaded on demand. */
const L = {
  en: { job: "Opening routine", meta: "6 steps · Standard v3", pub: "Published", of: (a: number, b: number) => `${a} of ${b} ready`,
    sites: [["Downtown", 92, 12, 13], ["Airport", 78, 7, 9], ["Harbour", 64, 9, 14]] as [string, number, number, number][] },
  tr: { job: "Açılış rutini", meta: "6 adım · Standart v3", pub: "Yayında", of: (a: number, b: number) => `${a}/${b} hazır`,
    sites: [["Kadıköy", 92, 12, 13], ["Havalimanı", 78, 7, 9], ["Liman", 64, 9, 14]] as [string, number, number, number][] },
};
const glass = "rounded-2xl bg-[rgb(28_28_28/0.66)] ring-1 ring-white/[.08] backdrop-blur-xl";
const INI = ["AK", "MS", "JT", "LB", "OR"]; // sample initials

export function StandardMap({ lang }: { lang: Lang }) {
  const t = L[lang]; const ref = useRef<HTMLDivElement>(null); const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const ys = [17, 50, 83]; // location card centres, % of height
  return (
    <div ref={ref} aria-hidden="true" className={`smap relative mx-auto aspect-[3/4] w-full max-w-[560px] sm:aspect-[5/4] ${on ? "smap-on" : ""}`}>
      {/* Light paths from the job card to each location */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        {ys.map((y, i) => (
          <g key={y}>
            <path d={`M44 50 C 53 50, 51 ${y}, 60 ${y}`} fill="none" stroke="rgb(231 235 235 / .16)" strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
            <path d={`M44 50 C 53 50, 51 ${y}, 60 ${y}`} fill="none" stroke="rgb(231 235 235 / .55)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" strokeDasharray="2 10" className="smap-flow" style={{ animationDelay: `${i * 0.25}s` }} />
            <path d={`M44 50 C 53 50, 51 ${y}, 60 ${y}`} fill="none" stroke="#EC6726" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" pathLength={100} strokeDasharray="6 94" className="smap-pulse" style={{ animationDelay: `${0.6 + i * 0.5}s` }} />
          </g>))}
      </svg>

      {/* The one standard */}
      <div className={`${glass} absolute left-0 top-1/2 w-[46%] -translate-y-1/2 p-3 sm:w-[44%]`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
          <picture><source srcSet="/photos/kitchenline-800.avif" type="image/avif" /><img src="/photos/kitchenline-800.webp" alt="" loading="lazy" className="h-full w-full object-cover" /></picture>
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_40%,rgb(17_17_17/0.7)_100%)]" />
          <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ring-2 ring-white/90"><span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" /></span>
          <span className="absolute bottom-2 left-2 rounded-full bg-[rgb(17_17_17/0.7)] px-2 py-0.5 text-[10px] font-medium text-ice-200 backdrop-blur">{t.pub}</span>
        </div>
        <p className="mt-2.5 text-[14px] font-semibold text-ink">{t.job}</p>
        <p className="text-[12px] text-ice-400">{t.meta}</p>
        <div className="mt-2 flex gap-1">{[0, 1, 2, 3, 4, 5].map((k) => <span key={k} className="smap-step h-1 flex-1 rounded-full bg-white/15" style={{ transitionDelay: `${0.2 + k * 0.12}s` }} />)}</div>
      </div>

      {/* Locations */}
      {t.sites.map(([name, pct, ready, total], i) => (
        <div key={name} className={`${glass} absolute right-0 w-[50%] -translate-y-1/2 p-3 sm:w-[40%]`} style={{ top: `${ys[i]}%` }}>
          <div className="flex items-baseline justify-between">
            <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink"><span className="h-1.5 w-1.5 rounded-full bg-ice-300" />{name}</p>
            <p className="text-[13px] font-semibold tabular-nums text-ink">{pct}%</p>
          </div>
          <span className="mt-2 block h-1 overflow-hidden rounded-full bg-white/10"><span className="smap-bar block h-full rounded-full bg-ice-200" style={{ ["--w" as string]: `${pct}%`, transitionDelay: `${1 + i * 0.35}s` }} /></span>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="flex -space-x-1">
              {[0, 1, 2].map((k) => (
                <span key={k} className="smap-who relative grid h-6 w-6 place-items-center rounded-full bg-[#2a2a2a] text-[9px] font-semibold text-ice-200 ring-2 ring-[#1c1c1c]" style={{ transitionDelay: `${1.3 + i * 0.35 + k * 0.12}s` }}>
                  {INI[(k + i) % INI.length]}
                  {k < 3 - i % 2 && <span className="smap-tick absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-calm-aqua ring-[1.5px] ring-[#1c1c1c]" />}
                </span>))}
            </span>
            <span className="whitespace-nowrap text-[11px] tabular-nums text-ice-400">{t.of(ready, total)}</span>
          </div>
        </div>))}
    </div>);
}
