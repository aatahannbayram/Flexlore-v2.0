"use client";
import { useEffect, useRef, useState } from "react";
import { m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import type { C, Lang } from "../copy";
import { home } from "./home-copy";
import { Device, RecordScreen, SopScreen, QuizScreen, ReadyScreen } from "../AppScreens";
import { EASE } from "../ui/Reveal";

// Same quiz as the restaurant sector page (sectors.ts), inlined so the home bundle does not carry every sector's copy.
const QUIZ = { q: "Raw chicken was prepped on a board. What comes next?", a: ["Rinse and reuse for salad", "Clean, sanitise, then switch to the right colour board", "Wipe with a dry cloth"], ok: 1 };

function Screen({ i, active }: { i: number; active: boolean }) {
  const qz = QUIZ;
  return i === 0 ? <RecordScreen active={active} /> : i === 1 ? <SopScreen active={active} /> : i === 2 ? <QuizScreen active={active} q={qz.q} a={qz.a} ok={qz.ok} /> : <ReadyScreen active={active} />;
}

/** "Record, Steps, Quiz, Readiness" as ONE story.
 *  Desktop (lg+): a 250vh section with a sticky stage. Scroll progress picks the step; the device screen crossfades.
 *  Mobile/tablet: a horizontal swipe carousel with snap points, a visible next card and dots. No sticky scroll.
 *  Server HTML lists all four steps as readable text; only one h3 per step, no duplicated nodes. */
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
  useEffect(() => { const m = window.matchMedia("(min-width: 1024px)"); const f = () => setLg(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  // Mount the device mockups only when the section nears the viewport (keeps hydration and first-load work small).
  const [near, setNear] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "400px 0px" }); io.observe(el); return () => io.disconnect(); }, []);

  const jump = (i: number) => {
    const el = ref.current; if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY, span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / n), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section ref={ref} id="product" aria-labelledby="story-h" className="relative bg-bg lg:h-[250vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
        <div className="container-x w-full section-y lg:py-0">
          <div className="grid-12 items-center gap-y-10">
            {/* Copy and step list */}
            <div className="col-span-12 lg:col-span-6">
              <p className="eyebrow">{h.k}</p>
              <h2 id="story-h" className="h2 mt-4 max-w-[16ch]">{h.h}</h2>
              <p className="lead mt-5 max-w-[34rem]">{h.lead}</p>

              <ol className="mt-12 hidden space-y-1 lg:block">
                {t.steps.map((s, i) => {
                  const on = a === i;
                  return (
                    <li key={i}>
                      <button type="button" onClick={() => jump(i)} aria-current={on ? "step" : undefined}
                        className="group relative grid w-full grid-cols-[3rem_1fr] items-center gap-x-4 rounded-2xl py-3.5 pl-5 pr-4 text-left">
                        <span aria-hidden="true" className={`absolute inset-0 rounded-[20px] transition-colors duration-500 ${on ? "bg-surface-1" : "bg-transparent"}`} />
                        <span className={`relative text-sm font-semibold tabular-nums transition-colors ${on ? "text-ice-100" : "text-ink-faint"}`}>0{i + 1}</span>
                        <h3 className={`h3 relative transition-colors ${on ? "text-ink" : "text-ink-faint group-hover:text-ink-muted"}`}>{s.h.replace(".", "")}</h3>
                        {/* progress rail */}
                        <span aria-hidden="true" className="absolute bottom-3 left-5 right-4 h-px overflow-hidden bg-transparent">
                          {on && <m.span layoutId="story-rail" className="block h-full bg-ice-300" />}
                        </span>
                      </button>
                    </li>);
                })}
              </ol>
              {/* One description area: all four texts share a grid cell (height = tallest), only opacity changes. */}
              <div className="mt-6 hidden pl-5 lg:grid">
                {t.steps.map((s, i) => (
                  <m.p key={i} initial={false} animate={{ opacity: a === i ? 1 : 0, y: a === i ? 0 : 6 }} transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                    className="max-w-[44ch] text-base text-ink-muted [grid-area:1/1]">{s.p}</m.p>))}
              </div>
            </div>

            {/* Desktop device: one frame, screens crossfade */}
            <div className="col-span-12 hidden lg:col-span-5 lg:col-start-8 lg:block">
              <div className="mx-auto w-[330px]">
                {lg && near && <Device label={t.alts[a]}>
                  {[0, 1, 2, 3].map((i) => (
                    <m.div key={i} initial={false} animate={{ opacity: a === i ? 1 : 0, scale: a === i ? 1 : 0.985 }} transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                      className="absolute inset-0" aria-hidden={a !== i} style={{ zIndex: a === i ? 2 : 1 }}>
                      <Screen i={i} active={a === i} />
                    </m.div>))}
                </Device>}
              </div>
            </div>

            {/* Mobile and tablet: swipe carousel */}
            <div className="col-span-12 lg:hidden">
              <StoryCarousel t={t} hint={h.hint} devices={lg === false && near} />
            </div>
          </div>
        </div>
      </div>
    </section>);
}

function StoryCarousel({ t, hint, devices }: { t: C; hint: string; devices: boolean }) {
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
            {devices && <div className="mx-auto mt-6 w-[min(100%,230px)]"><Device label={t.alts[k]}><Screen i={k} active={i === k} /></Device></div>}
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
