"use client";
import { useEffect, useState } from "react";
import { useLocale } from "./i18n/LocaleProvider";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Sections";
import { SITE } from "./config";
import { Arr } from "./Icons";
import type { Lang } from "./copy";
import { INDUSTRIES, Ind } from "./seeit-data";
import { playOnly } from "./media";
import { PhotoBand, glassTile } from "./ui/PhotoBand";

const ease = [0, 0, 0.2, 1] as const; // ease-out

export default function SeeIt() {
  const { lang } = useLocale();
  const [id, setId] = useState<Ind>("cafe-restaurant");
  const reduce = useReducedMotion();
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { const q = new URLSearchParams(location.search).get("industry"); if (INDUSTRIES.some((x) => x.id === q)) setId(q as Ind); }, []);
  const pick = (n: Ind) => { setId(n); const u = new URL(location.href); u.searchParams.set("industry", n); history.replaceState(null, "", u); };
  const tr = lang === "tr";
  const o = INDUSTRIES.find((x) => x.id === id)!; const c = o[lang];
  const tx = reduce ? {} : { y: 8 };
  return (<>
    <Header />
    <main id="main" className="pb-24 pt-32 md:pt-40">
      <div className="container-x">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{tr ? "Kendi işinizde görün" : "See it in your business"}</p>
        <h1 id="see-h" className="mt-5 max-w-[18ch] scroll-mt-32 text-[clamp(40px,1rem+3.6vw,76px)] font-semibold leading-[0.98] tracking-[-0.05em] [text-wrap:balance]"><span className="t-ink">{tr ? "İşinizi seçin." : "Pick your work."}</span> <span className="t-accent">{tr ? "Flexlore'da görün." : "See it in Flexlore."}</span></h1>
        <PhotoBand img={`/video/${o.v}.jpg`} blur dim={0.6} tone="center" className="mt-10 p-3 md:p-5">
        <div role="radiogroup" aria-label={tr ? "Sektör" : "Industry"} className={`grid grid-cols-1 gap-1.5 ${glassTile} p-1.5 sm:grid-cols-2 lg:grid-cols-4`}>
          {INDUSTRIES.map((x) => { const on = x.id === id; return (
            <button key={x.id} role="radio" aria-checked={on} onClick={() => pick(x.id)}
              className={`min-h-12 rounded-[16px] px-5 py-3.5 text-start text-base font-semibold tracking-tight transition-colors duration-200 ease-out ${on ? "bg-[#F4F0EB] text-[#111]" : "text-white/80 hover:bg-white/[.08] hover:text-white"}`}>{x[lang].label}</button>); })}
        </div>
        <div className="mt-3 grid gap-3 md:mt-5 lg:grid-cols-12 lg:gap-5">
          <div className="relative aspect-video overflow-hidden rounded-[22px] bg-[#111] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]">
            <img src={`/video/${o.v}.jpg`} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.video key={o.id} initial={{ opacity: 0, scale: reduce ? 1 : 1.01 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease }}
                className="absolute inset-0 h-full w-full object-cover" poster={`/video/${o.v}.jpg`} muted loop playsInline preload="metadata" aria-label={c.alt}
                ref={(el) => { if (el && !reduce) playOnly(el); }}>
                <source src={`/video/${o.v}.webm`} type="video/webm" /><source src={`/video/${o.v}.mp4`} type="video/mp4" />
              </motion.video>
            </AnimatePresence>
          </div>
          <div className="flex flex-col p-2 md:p-3 lg:col-span-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={o.id + lang} initial={{ opacity: 0, ...tx }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease }}>
                <p className="text-[19px] font-semibold leading-[1.35] tracking-tight">{c.job}</p>
                <ol className="mt-5 space-y-2">
                  {c.flow.map((f, i) => (<li key={i} className={`grid grid-cols-[2.5rem_1fr] gap-2 ${glassTile} p-5`}>
                    <span className="pt-0.5 text-sm font-semibold tabular-nums text-white/50">{String(i + 1).padStart(2, "0")}</span>
                    <span><span className="block text-base font-semibold">{f[0]}</span><span className="mt-1 block text-base leading-[1.45] text-white/70">{f[1]}</span></span></li>))}
                </ol>
              </motion.div>
            </AnimatePresence>
            <p className="mt-4 text-[13px] text-white/60">{tr ? "Örnek senaryo." : "Example scenario."}</p>
          </div>
        </div>
        </PhotoBand>
        <div className="mt-16 flex justify-center"><a href={SITE.demo} className="btn btn-cta h-11 px-5 text-[15px]">{tr ? "Demo isteyin" : "Book a demo"} <Arr className="ms-1" /></a></div>
      </div>
    </main>
    <Footer />
  </>);
}
