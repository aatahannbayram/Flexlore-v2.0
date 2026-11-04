"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import type { C, Lang } from "../copy";
import { home } from "./home-copy";
import { Device } from "../AppScreens";
import { Sparkle, CheckCircle, ListChecks, UsersThree, Pause } from "../ui/icons";

// The four story screens (editor, work, quiz, readiness) live in their own chunk, fetched when the section nears the
// viewport. Placeholder: the app's screen colour, same box as the screen, so nothing shifts when it arrives.
const StoryScreen = dynamic(() => import("../AppScreensStory").then((x) => x.StoryScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111111]" /> });

const STEP_MS = 5000;
const FADE = "transition-opacity duration-[250ms] ease-out motion-reduce:transition-none";
const CHIP_ICON = [() => <span className="block h-2.5 w-2.5 rounded-full bg-danger" />, () => <Sparkle size={16} weight="fill" />, () => <ListChecks size={16} />, () => <UsersThree size={16} />];

function Chip({ i, chips }: { i: number; chips: [string, string][] }) {
  const Ic = CHIP_ICON[i];
  return (
    <span className="flex items-center gap-3 whitespace-nowrap rounded-2xl bg-surface-2 px-4 py-3">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/[.08] text-ink"><Ic /></span>
      <span><span className="block text-[14px] font-semibold tracking-[-.01em]">{chips[i][0]}</span><span className="block text-[12px] text-ice-300">{chips[i][1]}</span></span>
      {i === 3 && <CheckCircle size={16} weight="fill" className="text-ice-200" />}
    </span>);
}

/** Progress bar on the active step. A Web Animations API scaleX timer (transform only): it pauses and resumes in place, and
 *  its end advances the story. Remounted per step (keyed by the parent), so each step starts from zero. */
function Progress({ run, onDone }: { run: boolean; onDone: () => void }) {
  const el = useRef<HTMLSpanElement>(null);
  const anim = useRef<Animation | null>(null);
  const done = useRef(onDone); done.current = onDone;
  useEffect(() => {
    const node = el.current; if (!node || typeof node.animate !== "function") return;
    const a = node.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: STEP_MS, easing: "linear", fill: "forwards" });
    a.pause(); a.onfinish = () => done.current(); anim.current = a;
    return () => { a.onfinish = null; a.cancel(); };
  }, []);
  useEffect(() => { const a = anim.current; if (!a) return; if (run) a.play(); else a.pause(); }, [run]);
  return (
    <span aria-hidden="true" className="absolute inset-x-3 bottom-1.5 h-[2px] overflow-hidden rounded-full bg-white/10 lg:inset-x-5 lg:bottom-2">
      <span ref={el} className="absolute inset-0 origin-left scale-x-0 rounded-full bg-ice-200" />
    </span>);
}

/** "How it works": Record, Steps, Quiz, Readiness. A normal-height section (no scroll-jacking).
 *  The active step auto-advances every 5 s while the section is in view, with a progress bar on that step and a Pause
 *  toggle. Choosing a step selects it and pauses. The device shows that step's real app screen, swapped with a 250ms
 *  opacity crossfade. Reduced motion: no auto-advance, no crossfade. Mobile: the steps become a segmented row above the
 *  device. Server HTML lists all four steps (title and description) as text. */
export function ScrollStory({ t, lang }: { t: C; lang: Lang }) {
  const h = home[lang].story;
  const ref = useRef<HTMLElement>(null);
  const [a, setA] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [near, setNear] = useState(false);
  const reduce = useReducedMotion();
  const n = t.steps.length;

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const pre = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); pre.disconnect(); } }, { rootMargin: "400px 0px" });
    const vis = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    pre.observe(el); vis.observe(el);
    return () => { pre.disconnect(); vis.disconnect(); };
  }, []);

  const auto = !reduce;
  const run = auto && !paused && inView;
  const pick = (i: number) => { setA(i); setPaused(true); };
  const title = (s: string) => s.replace(".", "");
  const pauseLabel = lang === "tr" ? "Duraklat" : "Pause";

  return (
    <section ref={ref} id="product" aria-labelledby="story-h" className="relative bg-bg">
      <div className="container-x section-y">
        <div className="grid-12 items-center gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <p className="eyebrow">{h.k}</p>
            <h2 id="story-h" className="h2 mt-4 max-w-[15ch]">{h.h}</h2>
            <p className="lead mt-5 max-w-[30rem]">{h.lead}</p>

            {/* Steps: a vertical list on desktop, a segmented row on mobile. No rules or dividers: the active step is filled. */}
            <ol className="mt-8 grid grid-cols-4 gap-1 rounded-[16px] bg-surface-1 p-1 lg:mt-10 lg:block lg:space-y-1.5 lg:rounded-none lg:bg-transparent lg:p-0">
              {t.steps.map((s, i) => {
                const on = a === i;
                return (
                  <li key={i}><h3>
                    <button type="button" onClick={() => pick(i)} aria-current={on ? "step" : undefined}
                      className={`relative block min-h-11 w-full rounded-[12px] px-2 pb-3 pt-2.5 text-center transition-colors duration-200 ease-out lg:rounded-[18px] lg:px-5 lg:pb-5 lg:pt-4 lg:text-left ${on ? "bg-surface-2 lg:bg-surface-1" : "hover:bg-surface-2/60 lg:hover:bg-surface-1/50"}`}>
                      <span className="flex flex-col items-center gap-0.5 lg:flex-row lg:items-baseline lg:gap-4">
                        <span className={`text-[12px] font-semibold tabular-nums lg:w-6 lg:text-sm ${on ? "text-ice-200" : "text-ice-400"}`}>0{i + 1}</span>
                        <span className={`text-[14px] font-semibold tracking-[-.01em] lg:text-[21px] lg:tracking-[-.02em] ${on ? "text-ink" : "text-ink-faint"}`}>{title(s.h)}</span>
                      </span>
                      <span className={`mt-2 hidden pl-10 text-[15px] leading-relaxed lg:block ${on ? "text-ink-muted" : "sr-only"}`}>{s.p}</span>
                      {on && auto && <Progress key={`p-${a}`} run={run} onDone={() => setA((v) => (v + 1) % n)} />}
                    </button>
                  </h3></li>);
              })}
            </ol>
            {/* Mobile: the active step's sentence under the segmented row. */}
            <p className="mt-4 min-h-[3.2em] text-base leading-relaxed text-ink-muted lg:hidden" aria-live="polite">{t.steps[a].p}</p>

            {auto && (
              <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused}
                className={`mt-4 inline-flex min-h-11 min-w-11 items-center gap-2 rounded-full px-4 text-[14px] font-medium transition-colors duration-200 ease-out active:scale-[.97] lg:mt-6 ${paused ? "bg-ice-100 text-[#111111]" : "bg-white/[.07] text-ink hover:bg-white/[.11]"}`}>
                <Pause size={14} weight="fill" aria-hidden="true" />{pauseLabel}
              </button>)}
          </div>

          {/* Stage: one calm flat panel, the phone with the real screen for the active step, a chip saying what happened. */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative flex h-[min(580px,142vw)] items-center pt-8 sm:pt-0 justify-center lg:justify-end lg:pr-[12%] overflow-hidden rounded-[28px] bg-surface-1 lg:h-[min(640px,calc(100svh-140px))] lg:rounded-[32px]">
              <div className="absolute left-4 top-4 z-10 hidden sm:block lg:left-6 lg:top-6" aria-hidden="true">
                {h.chips.map((_, i) => (
                  <div key={i} className={`${FADE} ${i === 0 ? "" : "absolute left-0 top-0"} ${a === i ? "opacity-100" : "opacity-0"}`}><Chip i={i} chips={h.chips} /></div>))}
              </div>
              <p className="absolute left-4 top-4 z-10 text-xs text-ice-400 sm:bottom-4 sm:top-auto lg:bottom-5 lg:left-6">{h.sample}</p>
              <div className="w-[min(56vw,232px)] lg:w-[min(270px,calc((100svh-220px)*0.46))]">
                <Device label={t.alts[a]}>
                  {near ? [0, 1, 2, 3].map((i) => (
                    <div key={i} aria-hidden={a !== i} className={`absolute inset-0 ${FADE} ${a === i ? "z-[2] opacity-100" : "z-[1] opacity-0"}`}>
                      <StoryScreen i={i} active={a === i && inView} lang={lang} />
                    </div>)) : <div className="absolute inset-0 bg-[#111111]" />}
                </Device>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
