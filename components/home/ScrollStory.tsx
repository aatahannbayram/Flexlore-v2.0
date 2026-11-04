"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { C, Lang } from "../copy";
import { home } from "./home-copy";
import { Device } from "../AppScreens";
import { EASE } from "../ui/Reveal";
import { Sparkle, CheckCircle, ListChecks, UsersThree } from "../ui/icons";

// The four story screens (editor, work, quiz, readiness) live in their own chunk, fetched when the section nears the
// viewport. Placeholder: the app's screen colour, same box as the screen, so nothing shifts when it arrives.
const StoryScreen = dynamic(() => import("../AppScreensStory").then((x) => x.StoryScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111111]" /> });
function Screen({ i, active, lang }: { i: number; active: boolean; lang: Lang }) {
  return <StoryScreen i={i} active={active} lang={lang} />;
}

/* Per step: a small lift of the phone, so each change reads as movement. */
const LEAN = [{ y: 0 }, { y: -10 }, { y: -4 }, { y: 6 }];
const CHIP_ICON = [() => <span className="block h-2.5 w-2.5 rounded-full bg-danger" />, () => <Sparkle size={16} weight="fill" />, () => <ListChecks size={16} />, () => <UsersThree size={16} />];

function Chip({ i, chips }: { i: number; chips: [string, string][] }) {
  const Ic = CHIP_ICON[i];
  return (
    <span className="flex items-center gap-3 whitespace-nowrap rounded-2xl bg-[rgb(31_31_31/0.92)] px-4 py-3 backdrop-blur-md">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/[.08] text-ink"><Ic /></span>
      <span><span className="block text-[14px] font-semibold tracking-[-.01em]">{chips[i][0]}</span><span className="block text-[12px] text-ice-300">{chips[i][1]}</span></span>
      {i === 3 && <CheckCircle size={16} weight="fill" className="text-ice-200" />}
    </span>);
}

/** "Record, Steps, Quiz, Readiness" as ONE story, no rules or dividers.
 *  Desktop (lg+): a 250vh section with a sticky stage. Scroll picks the step: its row fills and opens, a soft fill tracks progress
 *  through it, the phone lifts and changes screen, and the corner chip says what just happened.
 *  Mobile/tablet: a swipe carousel with snap points and dots. Server HTML lists all four steps as text, once. */
export function ScrollStory({ t, lang }: { t: C; lang: Lang }) {
  const h = home[lang].story;
  const ref = useRef<HTMLElement>(null);
  const [a, setA] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const within = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v * 4 - Math.min(3, Math.floor(v * 4)))));
  useMotionValueEvent(scrollYProgress, "change", (v) => setA(Math.min(3, Math.max(0, Math.floor(v * 4)))));
  const n = t.steps.length;
  // Devices render only for the layout in use (null before mount: text only, so server HTML has no duplicate devices).
  const [lg, setLg] = useState<boolean | null>(null);
  useEffect(() => { const q = window.matchMedia("(min-width: 1024px)"); const f = () => setLg(q.matches); f(); q.addEventListener("change", f); return () => q.removeEventListener("change", f); }, []);
  // Mount the device mockups only when the section nears the viewport (keeps hydration and first-load work small).
  const [near, setNear] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "400px 0px" }); io.observe(el); return () => io.disconnect(); }, []);

  const jump = (i: number) => {
    const el = ref.current; if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY, span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / n), behavior: reduce ? "auto" : "smooth" });
  };
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 30 };

  return (
    <section ref={ref} id="product" aria-labelledby="story-h" className="relative bg-bg lg:h-[250vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
        <div className="container-x w-full section-y lg:py-0">
          <div className="grid-12 items-center gap-y-10">
            <div className="col-span-12 lg:col-span-5">
              <p className="eyebrow">{h.k}</p>
              <h2 id="story-h" className="h2 mt-4 max-w-[15ch]">{h.h}</h2>
              <p className="lead mt-5 max-w-[30rem]">{h.lead}</p>

              {/* Step list: no rules. The active row is filled, carries its description, and a soft fill moves across it
                  as you scroll through that step. */}
              <ol className="mt-10 hidden space-y-1.5 lg:block">
                {t.steps.map((s, i) => {
                  const on = a === i;
                  return (
                    <li key={i}><h3>
                      <button type="button" onClick={() => jump(i)} aria-current={on ? "step" : undefined}
                        className={`relative block w-full overflow-hidden rounded-[18px] px-5 py-4 text-left transition-colors duration-500 ${on ? "bg-surface-1" : "hover:bg-surface-1/50"}`}>
                        {on && <m.span aria-hidden="true" style={{ scaleX: reduce ? 1 : within }} className="absolute inset-0 origin-left bg-white/[.035]" />}
                        <span className="relative flex items-baseline gap-4">
                          <span className={`w-6 text-sm font-semibold tabular-nums transition-colors ${on ? "text-ice-200" : "text-ink-faint"}`}>0{i + 1}</span>
                          <span className={`text-[21px] font-semibold tracking-[-.02em] transition-colors duration-500 ${on ? "text-ink" : "text-ink-faint"}`}>{s.h.replace(".", "")}</span>
                        </span>
                        <span className={`relative grid transition-[grid-template-rows,opacity] duration-500 ${on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                          <span className="overflow-hidden pl-10 text-[15px] leading-relaxed text-ink-muted">{s.p}</span>
                        </span>
                      </button>
                    </h3></li>);
                })}
              </ol>
            </div>

            {/* Desktop stage: one calm panel with faint footage, an upright phone and a fixed info chip in the corner. */}
            <div className="relative col-span-12 hidden lg:col-span-7 lg:block">
              <div className="relative h-[min(680px,calc(100svh-120px))] overflow-hidden rounded-[32px] bg-surface-1">
                <picture aria-hidden="true"><source srcSet="/video/kitchen-bg.avif" type="image/avif" /><img src="/video/kitchen-bg.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-[0.16]" /></picture>
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(25_25_25/0.2),rgb(25_25_25/0.85))]" />
                <AnimatePresence mode="wait" initial={false}>
                  {lg && near && (
                    <m.div key={a} aria-hidden="true" className="absolute left-6 top-6 z-10"
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}>
                      <Chip i={a} chips={h.chips} />
                    </m.div>)}
                </AnimatePresence>
                <p className="absolute bottom-5 left-6 z-10 text-xs text-ink-faint">{h.sample}</p>
                <div className="absolute inset-y-0 right-[12%] flex items-center">
                  {lg && near && (
                    <m.div animate={{ y: LEAN[a].y }} transition={spring} className="w-[min(270px,calc((100svh-200px)*0.46))]">
                      <Device label={t.alts[a]}>
                        {[0, 1, 2, 3].map((i) => (
                          <m.div key={i} initial={false} animate={{ opacity: a === i ? 1 : 0, scale: a === i ? 1 : 0.97, y: a === i ? 0 : a > i ? -14 : 14 }} transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                            className="absolute inset-0" aria-hidden={a !== i} style={{ zIndex: a === i ? 2 : 1 }}>
                            <Screen i={i} active={a === i} lang={lang} />
                          </m.div>))}
                      </Device>
                    </m.div>)}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:hidden">
              <StoryCarousel t={t} lang={lang} hint={h.hint} chips={h.chips} devices={lg === false && near} />
            </div>
          </div>
        </div>
      </div>
    </section>);
}

function StoryCarousel({ t, lang, hint, chips, devices }: { t: C; lang: Lang; hint: string; chips: [string, string][]; devices: boolean }) {
  const track = useRef<HTMLOListElement>(null);
  const [i, setI] = useState(0);
  useEffect(() => {
    const el = track.current; if (!el) return;
    const items = [...el.children] as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setI(items.indexOf(e.target as HTMLElement)); }), { root: el, threshold: 0.6 });
    items.forEach((x) => io.observe(x)); return () => io.disconnect();
  }, []);
  const go = (k: number) => { const el = track.current; const c = el?.children[k] as HTMLElement | undefined; if (el && c) el.scrollTo({ left: c.offsetLeft - el.offsetLeft, behavior: "smooth" }); };
  return (
    <div>
      <p className="sr-only">{hint}</p>
      <ol ref={track} className="no-sb -mx-[var(--pad-x)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad-x)] pb-2" aria-label={hint}>
        {t.steps.map((s, k) => (
          <li key={k} className="panel w-[82%] shrink-0 snap-start p-5 sm:w-[60%]">
            <p className="text-sm font-semibold tabular-nums text-ice-400">0{k + 1}</p>
            <h3 className="h3 mt-2">{s.h.replace(".", "")}</h3>
            <p className="mt-2 text-base text-ink-muted">{s.p}</p>
            {devices && <div className="mx-auto mt-6 w-[min(100%,220px)]">
              <Device label={t.alts[k]}><Screen i={k} active={i === k} lang={lang} /></Device>
            </div>}
            <div aria-hidden="true" className="mt-4 flex justify-center"><Chip i={k} chips={chips} /></div>
          </li>))}
      </ol>
      <div className="mt-5 flex items-center justify-center gap-1" role="group" aria-label={hint}>
        {t.steps.map((s, k) => (
          <button key={k} type="button" onClick={() => go(k)} aria-label={`${k + 1}: ${s.h.replace(".", "")}`} aria-current={i === k ? "step" : undefined}
            className="grid h-11 w-11 place-items-center">
            <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === k ? "w-6 bg-ice-100" : "w-1.5 bg-white/20"}`} />
          </button>))}
      </div>
    </div>);
}
