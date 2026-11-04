"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import type { C, Lang } from "../copy";
import { home } from "./home-copy";
import { Device, RecordScreen, SopScreen, QuizScreen, ReadyScreen } from "../AppScreens";
import { EASE } from "../ui/Reveal";
import { Sparkle, CheckCircle, ListChecks, UsersThree } from "../ui/icons";

// Same quiz as the restaurant sector page (sectors.ts), inlined so the home bundle does not carry every sector's copy.
const QUIZ = { q: "Raw chicken was prepped on a board. What comes next?", a: ["Rinse and reuse for salad", "Clean, sanitise, then switch to the right colour board", "Wipe with a dry cloth"], ok: 1 };

function Screen({ i, active }: { i: number; active: boolean }) {
  return i === 0 ? <RecordScreen active={active} /> : i === 1 ? <SopScreen active={active} /> : i === 2 ? <QuizScreen active={active} q={QUIZ.q} a={QUIZ.a} ok={QUIZ.ok} /> : <ReadyScreen active={active} />;
}

/* Per step: where the live chip sits around the phone, and how the phone leans. */
const CHIP_POS = ["left-[-9.5rem] top-[14%]", "right-[-10.5rem] top-[30%]", "left-[-10rem] top-[52%]", "right-[-9rem] bottom-[16%]"];
const LEAN = [{ r: -3, y: 0 }, { r: 2, y: -10 }, { r: -1.5, y: -4 }, { r: 0, y: 6 }];
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
 *  Desktop (lg+): a 250vh section with a sticky stage. Scroll picks the step: a dot slides to it, its copy fades in, the phone
 *  leans and changes screen, and a live chip appears beside it.
 *  Mobile/tablet: a swipe carousel with snap points and dots. Server HTML lists all four steps as text, once. */
export function ScrollStory({ t, lang }: { t: C; lang: Lang }) {
  const h = home[lang].story;
  const ref = useRef<HTMLElement>(null);
  const [a, setA] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
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

              <ol className="mt-12 hidden lg:block">
                {t.steps.map((s, i) => {
                  const on = a === i;
                  return (
                    <li key={i}><h3>
                      <button type="button" onClick={() => jump(i)} aria-current={on ? "step" : undefined}
                        className="group flex w-full items-center gap-5 py-2.5 text-left">
                        <span className="relative grid h-6 w-6 place-items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                          {on && <m.span layoutId="story-dot" transition={spring} className="absolute h-3 w-3 rounded-full bg-ice-100" />}
                        </span>
                        <span className={`w-7 text-sm font-semibold tabular-nums transition-colors duration-500 ${on ? "text-ice-300" : "text-white/30"}`}>0{i + 1}</span>
                        <m.span animate={{ x: on ? 6 : 0, opacity: on ? 1 : 0.38 }} transition={spring}
                          className="text-[clamp(24px,1.1rem+0.9vw,32px)] font-semibold tracking-[-.03em] text-ink group-hover:opacity-80">
                          {s.h.replace(".", "")}
                        </m.span>
                      </button>
                    </h3></li>);
                })}
              </ol>
              {/* All four descriptions share one grid cell (height = tallest); only opacity and a small rise change. */}
              <div className="mt-6 hidden pl-[3.25rem] lg:grid">
                {t.steps.map((s, i) => (
                  <m.p key={i} initial={false} animate={{ opacity: a === i ? 1 : 0, y: a === i ? 0 : 8 }} transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                    className="max-w-[40ch] text-base text-ink-muted [grid-area:1/1]">{s.p}</m.p>))}
              </div>
            </div>

            {/* Desktop stage */}
            <div className="relative col-span-12 hidden lg:col-span-6 lg:col-start-7 lg:block">
              <div className="relative mx-auto w-[290px]">
                {lg && near && (
                  <m.div animate={{ rotate: LEAN[a].r, y: LEAN[a].y }} transition={spring} className="relative">
                    <Device label={t.alts[a]}>
                      {[0, 1, 2, 3].map((i) => (
                        <m.div key={i} initial={false} animate={{ opacity: a === i ? 1 : 0, scale: a === i ? 1 : 0.97, y: a === i ? 0 : a > i ? -14 : 14 }} transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                          className="absolute inset-0" aria-hidden={a !== i} style={{ zIndex: a === i ? 2 : 1 }}>
                          <Screen i={i} active={a === i} />
                        </m.div>))}
                    </Device>
                  </m.div>)}
                <AnimatePresence mode="wait" initial={false}>
                  {lg && near && (
                    <m.div key={a} aria-hidden="true" className={`absolute z-10 ${CHIP_POS[a]}`}
                      initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : 0.15 }}>
                      <Chip i={a} chips={h.chips} />
                    </m.div>)}
                </AnimatePresence>
              </div>
              <p className="mt-8 text-center text-xs text-ink-faint">{h.sample}</p>
            </div>

            <div className="col-span-12 lg:hidden">
              <StoryCarousel t={t} hint={h.hint} chips={h.chips} devices={lg === false && near} />
            </div>
          </div>
        </div>
      </div>
    </section>);
}

function StoryCarousel({ t, hint, chips, devices }: { t: C; hint: string; chips: [string, string][]; devices: boolean }) {
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
              <Device label={t.alts[k]}><Screen i={k} active={i === k} /></Device>
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
