"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { m, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { Lang } from "../copy";
import { Device } from "../AppScreens";
import { SmartVideo } from "../ui/SmartVideo";
import { EASE } from "../ui/Reveal";
import { CheckCircle, Sparkle, UsersThree } from "../ui/icons";

/* "Duo": the app as people hold it. A portrait iPhone (the library: find the job) and a landscape iPhone (the step
 * player: follow it) float over a slow, warm hands-and-phone loop, with three glass notes around them. Desktop gets a
 * gentle pointer parallax and a 3D settle on entry; phones get the landscape player and the notes only.
 * The screens live in the lazy story module, so none of this weighs on the first load. */
const Library = dynamic(() => import("../AppScreensStory").then((x) => x.LibraryScreen), { ssr: false, loading: () => <div className="h-full w-full bg-bg" /> });
const Landscape = dynamic(() => import("../AppScreensStory").then((x) => x.LandscapePlayerScreen), { ssr: false, loading: () => <div className="h-full w-full bg-bg" /> });
const DeviceLandscape = dynamic(() => import("../AppScreensStory").then((x) => x.DeviceLandscape), { ssr: false, loading: () => <div className="aspect-[852/393] w-full rounded-[2.4rem] bg-[#0b0b0b]" /> });

const COPY = {
  en: { k: "On the floor", h: ["Portrait to find it.", "Landscape to follow it."], p: "Every job lives in your library. Turn the phone and the steps play full screen, one at a time, with a check as each one is done.",
    notes: [["Step 2 of 5", "Check the pressure gauge"], ["Split into 5 steps", "Drafted from one video"], ["Operator 1", "Ready for this job"]] },
  tr: { k: "Sahada", h: ["Dikeyde bul.", "Yatayda takip et."], p: "Her iş kütüphanenizde. Telefonu çevirin, adımlar tam ekran ve tek tek oynasın; biten her adım işaretlensin.",
    notes: [["Adım 2 / 5", "Basınç göstergesini kontrol et"], ["5 adıma bölündü", "Tek videodan taslak"], ["Operatör 1", "Bu işe hazır"]] },
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
  const c = COPY[lang]; const ref = useRef<HTMLElement>(null); const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.3 }); const near = useInView(ref, { margin: "500px 0px", once: true });
  const [lg, setLg] = useState(false);
  useEffect(() => { const q = window.matchMedia("(min-width: 1024px)"); const f = () => setLg(q.matches); f(); q.addEventListener("change", f); return () => q.removeEventListener("change", f); }, []);
  // Pointer parallax (desktop only): the two phones and the notes drift a few px in opposite directions.
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 }), sy = useSpring(my, { stiffness: 60, damping: 20 });
  const far = { x: useTransform(sx, (v) => v * -10), y: useTransform(sy, (v) => v * -8) };
  const near2 = { x: useTransform(sx, (v) => v * 14), y: useTransform(sy, (v) => v * 10) };
  const onMove = (e: React.PointerEvent) => { if (reduce || !lg) return; const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); };
  const enter = (d: number, rot: number) => reduce ? {} : { initial: { opacity: 0, y: 40, rotateY: rot }, whileInView: { opacity: 1, y: 0, rotateY: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 1.1, delay: d, ease: EASE } };

  return (
    <section ref={ref} id="duo" aria-labelledby="duo-h" onPointerMove={onMove} className="relative isolate overflow-hidden bg-bg py-[var(--section-y)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <picture><source srcSet="/video/gen-hands.avif" type="image/avif" /><img src="/video/gen-hands.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" /></picture>
        {near && <div className="absolute inset-0 opacity-30"><SmartVideo name="gen-hands" poster="/video/gen-hands.webp" threshold={0.2} /></div>}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_55%,rgb(17_17_17/0.35)_0%,rgb(17_17_17/0.85)_55%,#111111_100%)]" />
      </div>

      <div className="container-x">
        <div className="max-w-[40rem]">
          <p className="eyebrow">{c.k}</p>
          <h2 id="duo-h" className="h2 mt-4">{c.h[0]} <span className="text-ice-400">{c.h[1]}</span></h2>
          <p className="lead mt-5 max-w-[32rem]">{c.p}</p>
        </div>

        <div className="relative mt-14 [perspective:1800px] lg:mt-6 lg:h-[620px]">
          {/* Portrait: the library, set back on the left (desktop only). */}
          {lg && near && (
            <m.div style={far} className="absolute left-[2%] top-[4%] w-[250px]" {...enter(0.05, 18)}>
              <div className="-rotate-[4deg]"><Device label={lang === "tr" ? "Flexlore kütüphane ekranı" : "Flexlore library screen"}><Library active={inView} lang={lang} /></Device></div>
            </m.div>)}
          {/* Landscape: the step player, in front. */}
          <m.div style={lg ? near2 : undefined} className="relative mx-auto w-full max-w-[640px] lg:absolute lg:right-[2%] lg:top-[10%] lg:w-[62%] lg:max-w-none" {...enter(0.2, -14)}>
            {near ? <DeviceLandscape label={lang === "tr" ? "Yatay adım oynatıcı" : "Landscape step player"}><Landscape active={inView} lang={lang} /></DeviceLandscape>
              : <div className="aspect-[852/393] w-full rounded-[2.4rem] bg-[#0b0b0b]" />}
          </m.div>
          {/* Glass notes. */}
          <m.div style={lg ? near2 : undefined} className="mt-6 flex flex-wrap gap-2.5 lg:mt-0 lg:contents">
            <Note i={0} t={c.notes[0] as [string, string]} className="lg:absolute lg:bottom-[4%] lg:right-[8%]" />
            <Note i={1} t={c.notes[1] as [string, string]} className="lg:absolute lg:left-[24%] lg:top-[2%]" />
            <Note i={2} t={c.notes[2] as [string, string]} className="lg:absolute lg:-bottom-[2%] lg:left-[22%]" />
          </m.div>
        </div>
      </div>
    </section>);
}
