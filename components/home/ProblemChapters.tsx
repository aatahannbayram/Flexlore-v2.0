"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { Lang } from "../copy";
import { home } from "./home-copy";
import { SmartVideo } from "../ui/SmartVideo";
import { EASE } from "../ui/Reveal";

/* "Why it matters" as scroll chapters (remixed from a cinematic scroll hero): the section is three screens tall, a
 * sticky stage crossfades between real footage, and each chapter's line rises in. Brand rules applied: no blue (the
 * original's indigo is gone), ice greys with one orange accent (the progress ring), our own clips.
 * Only the active clip and its neighbours mount, so at most two loops load at once. The progress pill lives inside
 * the stage, so it shows only while this section is on screen. All chapter text is also in an sr-only list. */
const CH = {
  en: [
    { v: "plating", k: "Scrap and rework", h: "Guesswork comes back as remakes.", p: "When the steps live in someone’s head, every new person improvises. It shows up as rework, waste and returns." },
    { v: "line", k: "Uneven across shifts", h: "Every shift learns it from someone else.", p: "Shadowing passes on habits, not the standard. A few handovers later, the same job is done three different ways." },
    { v: "warehouse", k: "Binders nobody reads", h: "Written down. Never opened on the floor.", p: "Procedures sit in a folder. On the floor, people ask whoever is standing next to them." },
  ],
  tr: [
    { v: "plating", k: "Fire ve yeniden iş", h: "Tahmin, yeniden yapım olarak geri döner.", p: "Adımlar birinin aklında kalınca her yeni kişi doğaçlama yapar. Sonuç yeniden iş, fire ve iadedir." },
    { v: "line", k: "Vardiyadan vardiyaya farklı", h: "Her vardiya işi başka birinden öğrenir.", p: "Yanında öğrenmek standardı değil alışkanlıkları aktarır. Birkaç devir sonra aynı iş üç farklı şekilde yapılır." },
    { v: "warehouse", k: "Kimsenin okumadığı klasörler", h: "Yazıldı. Sahada hiç açılmadı.", p: "Prosedürler klasörde durur. Sahada herkes yanındakine sorar." },
  ],
};

export function ProblemChapters({ lang }: { lang: Lang }) {
  const c = home[lang].problem; const ch = CH[lang];
  const ref = useRef<HTMLElement>(null); const reduce = useReducedMotion();
  const [on, setOn] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const ring = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => scrollYProgress.on("change", (v) => setOn(Math.min(ch.length - 1, Math.max(0, Math.floor(v * ch.length))))), [scrollYProgress, ch.length]);
  const x = ch[on];
  return (
    <section ref={ref} id="problem" aria-labelledby="problem-h" className="relative bg-bg" style={{ height: `${ch.length * 100}svh` }}>
      <ul className="sr-only">{ch.map((y) => <li key={y.k}><h3>{y.k}: {y.h}</h3><p>{y.p}</p></li>)}</ul>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Stage: footage crossfades; only the active clip and its neighbours are mounted. */}
        <div aria-hidden="true" className="absolute inset-0 bg-bg">
          {ch.map((y, i) => (
            <div key={y.v} className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${i === on ? "opacity-100" : "opacity-0"}`}>
              <picture><source srcSet={`/video/${y.v}.avif`} type="image/avif" /><img src={`/video/${y.v}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>
              {Math.abs(i - on) <= 1 && <SmartVideo name={y.v} poster={`/video/${y.v}.webp`} threshold={0.2} play={i === on} />}
            </div>))}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(17_17_17/0.92)_0%,rgb(17_17_17/0.72)_45%,rgb(17_17_17/0.5)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,#111111,rgb(17_17_17/0))]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(0deg,#111111,rgb(17_17_17/0))]" />
        </div>

        <div className="container-x relative flex h-full flex-col justify-center pb-24 pt-[calc(var(--header-h)+24px)]">
          <p className="eyebrow">{c.k}</p>
          <h2 id="problem-h" className="mt-3 max-w-[22ch] text-[clamp(22px,0.9rem+1.1vw,30px)] font-semibold leading-tight tracking-[-.025em] text-ice-300">
            {c.h[0]} {c.h[1]} <span className="text-ice-500">{c.p}</span>
          </h2>

          <div aria-hidden="true" className="mt-10 min-h-[15rem] md:mt-14">
            <AnimatePresence mode="wait">
              <m.div key={on + lang} initial={reduce ? false : "hide"} animate="show" exit={reduce ? undefined : "out"}
                variants={{ hide: {}, show: { transition: { staggerChildren: 0.08 } }, out: { opacity: 0, transition: { duration: 0.25 } } }}>
                <m.p variants={{ hide: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                  className="flex items-center gap-3 text-[13px] font-medium text-ice-300">
                  <span className="tabular-nums text-ice-500">{String(on + 1).padStart(2, "0")} / {String(ch.length).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-white/25" />{x.k}
                </m.p>
                <div className="overflow-hidden py-1">
                  <m.p variants={{ hide: { y: "105%" }, show: { y: "0%", transition: { duration: 0.8, ease: EASE } } }}
                    className="mt-4 max-w-[16ch] text-[clamp(38px,1rem+4vw,80px)] font-[620] leading-[1.02] tracking-[-0.042em] text-ink [text-wrap:balance]">{x.h}</m.p>
                </div>
                <m.p variants={{ hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: EASE } } }}
                  className="mt-6 max-w-[30rem] rounded-2xl bg-[rgb(17_17_17/0.55)] p-5 text-[17px] leading-[1.5] text-ice-200 backdrop-blur-md">{x.p}</m.p>
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress pill: inside the stage, so it is visible only while this section is. */}
        <div aria-hidden="true" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full bg-[rgb(17_17_17/0.8)] py-2 pl-5 pr-2 ring-1 ring-white/10 backdrop-blur-xl md:bottom-8">
          <span className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[.16em] text-ice-500">{lang === "tr" ? "Bölüm" : "Chapter"} {String(on + 1).padStart(2, "0")}</span>
            <span className="min-w-[9rem] text-[13px] font-semibold text-ink">{x.k}</span>
          </span>
          <span className="flex gap-1.5">{ch.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === on ? "w-5 bg-ink" : "w-1.5 bg-white/25"}`} />)}</span>
          <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
            <circle cx="20" cy="20" r="15" fill="none" stroke="rgb(255 255 255 / .1)" strokeWidth="2" />
            <m.circle cx="20" cy="20" r="15" fill="none" stroke="#EC6726" strokeWidth="2" strokeLinecap="round" style={{ pathLength: ring }} />
          </svg>
        </div>
      </div>
    </section>);
}
