"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { m, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { Lang } from "../copy";
import { Device, WorkScreen } from "../AppScreens";
import { SmartVideo } from "../ui/SmartVideo";
import { EASE } from "../ui/Reveal";
import { CheckCircle, Sparkle, UsersThree } from "../ui/icons";

/* "Duo": the same job on two Apple devices. An iPad in landscape (the job's footage full screen, the work on glass
 * panels: steps, readiness, AI draft, player) with an iPhone in front (the full-screen step player). As the section
 * scrolls in, the pair turns toward the viewer and settles; pointer parallax adds depth on desktop; a soft floor
 * reflection grounds them. Three glass notes sit beside the copy.
 * The screens live in the lazy story module, so none of this weighs on the first load. */
const Tablet = dynamic(() => import("../TabletScreen").then((x) => x.TabletScreen), { ssr: false, loading: () => <div className="h-full w-full bg-bg" /> });
const ScaledScreen = dynamic(() => import("../AppScreens").then((x) => x.Scaled), { ssr: false });

const COPY = {
  en: { k: "On the floor", h: ["Find the job.", "Follow it step by step."], p: "Every job lives in your library. Open one and each step plays full screen, at the station, as often as it takes.",
    notes: [["Step 3 of 6", "Sanitise boards and knives"], ["Split into 6 steps", "Drafted from one video"], ["Operator 1", "Ready for this job"]] },
  tr: { k: "Sahada", h: ["İşi bul.", "Adım adım takip et."], p: "Her iş kütüphanenizde. Birini açın, her adım istasyonda, gerektiği kadar tam ekran oynasın.",
    notes: [["Adım 3 / 6", "Tahta ve bıçakları dezenfekte et"], ["6 adıma bölündü", "Tek videodan taslak"], ["Operatör 1", "Bu işe hazır"]] },
};

function Note({ i, t, className }: { i: number; t: [string, string]; className: string }) {
  const Ic = [CheckCircle, Sparkle, UsersThree][i];
  return (
    <div className={`flex items-center gap-3 rounded-2xl bg-[rgb(28_28_28/0.62)] py-2.5 pl-2.5 pr-4 ring-1 ring-white/[.08] backdrop-blur-xl ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[.08] text-ice-100"><Ic size={17} weight={i === 0 ? "fill" : "regular"} className={i === 0 ? "text-flame" : undefined} /></span>
      <span className="leading-tight"><span className="block text-[13px] font-semibold text-ink">{t[0]}</span><span className="block text-[12px] text-ice-300">{t[1]}</span></span>
    </div>);
}

export function Duo({ lang }: { lang: Lang }) {
  const c = COPY[lang]; const ref = useRef<HTMLElement>(null); const stage = useRef<HTMLDivElement>(null); const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.3 }); const near = useInView(ref, { margin: "500px 0px", once: true });
  const [lg, setLg] = useState(false);
  useEffect(() => { const q = window.matchMedia("(min-width: 1024px)"); const f = () => setLg(q.matches); f(); q.addEventListener("change", f); return () => q.removeEventListener("change", f); }, []);
  // Scroll: the pair turns in toward each other and settles as the stage crosses the viewport.
  const { scrollYProgress: sp } = useScroll({ target: stage, offset: ["start end", "center center"] });
  const backR = useTransform(sp, [0, 1], reduce ? [-8, -8] : [-22, -8]);
  const frontR = useTransform(sp, [0, 1], reduce ? [6, 6] : [16, 6]);
  const frontY = useTransform(sp, [0, 1], reduce ? [0, 0] : [80, 0]);
  // Pointer parallax (desktop only).
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 }), sy = useSpring(my, { stiffness: 60, damping: 20 });
  const bx = useTransform(sx, (v) => v * -12), by = useTransform(sy, (v) => v * -8);
  const fx = useTransform(sx, (v) => v * 16), fy = useTransform(sy, (v) => v * 10);
  const onMove = (e: React.PointerEvent) => { if (reduce || !lg) return; const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); };
  const reflect = { WebkitBoxReflect: "below 10px linear-gradient(transparent 72%, rgb(255 255 255 / 0.10))" } as React.CSSProperties;

  return (
    <section ref={ref} id="duo" aria-labelledby="duo-h" onPointerMove={onMove} className="relative isolate overflow-hidden bg-bg py-[var(--section-y)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <picture><source srcSet="/video/gen-hands.avif" type="image/avif" /><img src="/video/gen-hands.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" /></picture>
        {near && <div className="absolute inset-0 opacity-25"><SmartVideo name="gen-hands" poster="/video/gen-hands.webp" threshold={0.2} /></div>}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_58%,rgb(17_17_17/0.25)_0%,rgb(17_17_17/0.85)_55%,#111111_100%)]" />
      </div>

      <div className="container-x grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="lg:col-span-5">
          <p className="eyebrow">{c.k}</p>
          <h2 id="duo-h" className="h2 mt-4">{c.h[0]} <span className="text-ice-400">{c.h[1]}</span></h2>
          <p className="lead mt-5 max-w-[30rem]">{c.p}</p>
          <div className="mt-8 hidden flex-col items-start gap-2.5 lg:flex">
            {c.notes.map((n, i) => (
              <m.div key={i} initial={reduce ? false : { opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE }}>
                <Note i={i} t={n as [string, string]} className="" />
              </m.div>))}
          </div>
        </div>

        <div ref={stage} className="relative lg:col-span-7">
          {/* Soft light pool under the pair. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-[8%] bottom-[2%] h-[38%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(255_255_255/0.08),rgb(255_255_255/0)_70%)] blur-2xl" />
          {/* A real photograph of hands holding a tablet; the Flexlore tablet screen is fitted into its black display
              (measured: left 26%, top 23.8%, 48.2% x 49.3% of the frame). The iPhone floats in the empty top-right corner. */}
          <div className="relative mx-auto max-w-[780px] [perspective:1800px]">
            <m.div style={{ rotateX: useTransform(sp, [0, 1], reduce ? [0, 0] : [10, 0]), x: lg ? bx : 0, y: lg ? by : 0 }} className="relative aspect-[2400/1792] w-full overflow-hidden rounded-[28px]">
              <picture>
                <source srcSet="/photos/hands-tablet-800.avif 800w, /photos/hands-tablet-1600.avif 1600w" sizes="(min-width:1024px) 780px, 100vw" type="image/avif" />
                <img src="/photos/hands-tablet-1600.webp" srcSet="/photos/hands-tablet-800.webp 800w, /photos/hands-tablet-1600.webp 1600w" sizes="(min-width:1024px) 780px, 100vw" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </picture>
              <div role="img" aria-label={lang === "tr" ? "Tablette Flexlore iş ekranı" : "Flexlore job screen on a tablet"} className="absolute left-[26%] top-[23.8%] h-[49.3%] w-[48.2%] overflow-hidden rounded-[0.6%] [&>div]:!rounded-[4px]">
                {near && <ScaledScreen base={1024}><Tablet active={inView} lang={lang} /></ScaledScreen>}
              </div>
              {/* Glass sheen over the display so it reads as behind glass. */}
              <div aria-hidden="true" className="pointer-events-none absolute left-[26%] top-[23.8%] h-[49.3%] w-[48.2%] bg-[linear-gradient(125deg,rgb(255_255_255/0.07)_0%,rgb(255_255_255/0)_38%)]" />
            </m.div>
            {near && (
              <m.div style={{ rotate: frontR, x: lg ? fx : 0, y: frontY, translateY: lg ? fy : 0 }} className="absolute -right-[5%] -top-[12%] z-10 hidden w-[18%] max-w-[150px] sm:block">
                <div style={reflect}><Device label={lang === "tr" ? "iPhone'da iş adımları" : "Job steps on iPhone"}><WorkScreen active={inView} lang={lang} /></Device></div>
              </m.div>)}
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-2.5 lg:hidden">
            {c.notes.map((n, i) => <Note key={i} i={i} t={n as [string, string]} className="" />)}
          </div>
        </div>
      </div>
    </section>);
}
