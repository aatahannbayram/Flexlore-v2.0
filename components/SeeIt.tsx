"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Sections";
import { SITE } from "./config";
import { Arr } from "./Icons";
import type { Lang } from "./copy";
import { INDUSTRIES, Ind } from "./seeit-data";
import { playOnly } from "./media";

const ease = [0, 0, 0.2, 1] as const; // ease-out

export default function SeeIt() {
  const [lang, setLang] = useState<Lang>("en");
  const [id, setId] = useState<Ind>("cafe-restaurant");
  const reduce = useReducedMotion();
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { const q = new URLSearchParams(location.search).get("industry"); if (INDUSTRIES.some((x) => x.id === q)) setId(q as Ind); }, []);
  const pick = (n: Ind) => { setId(n); const u = new URL(location.href); u.searchParams.set("industry", n); history.replaceState(null, "", u); };
  const tr = lang === "tr";
  const o = INDUSTRIES.find((x) => x.id === id)!; const c = o[lang];
  const tx = reduce ? {} : { y: 8 };
  return (<>
    <Header lang={lang} setLang={setLang} />
    <main id="main" className="pb-24 pt-32 md:pt-40">
      <div className="container-x">
        <p className="eyebrow">{tr ? "Kendi işinizde görün" : "See it in your business"}</p>
        <h1 id="see-h" className="display mt-4 max-w-[18ch] scroll-mt-32 text-h1">{tr ? "İşinizi seçin. Flexlore'da görün." : "Pick your work. See it in Flexlore."}</h1>
        <div role="radiogroup" aria-label={tr ? "Sektör" : "Industry"} className="mt-10 grid grid-cols-1 gap-2 rounded-2xl bg-bg2 p-2 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((x) => { const on = x.id === id; return (
            <button key={x.id} role="radio" aria-checked={on} onClick={() => pick(x.id)}
              className={`rounded-xl px-5 py-4 text-left text-base font-semibold tracking-tight transition-colors duration-200 ease-out ${on ? "bg-flame text-black" : "text-white/80 hover:bg-card hover:text-white"}`}>{x[lang].label}</button>); })}
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-bg2 lg:col-span-7">
            <img src={`/video/${o.v}.jpg`} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.video key={o.id} initial={{ opacity: 0, scale: reduce ? 1 : 1.01 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease }}
                className="absolute inset-0 h-full w-full object-cover" poster={`/video/${o.v}.jpg`} muted loop playsInline preload="metadata" aria-label={c.alt}
                ref={(el) => { if (el && !reduce) playOnly(el); }}>
                <source src={`/video/${o.v}.webm`} type="video/webm" /><source src={`/video/${o.v}.mp4`} type="video/mp4" />
              </motion.video>
            </AnimatePresence>
          </div>
          <div className="flex flex-col lg:col-span-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={o.id + lang} initial={{ opacity: 0, ...tx }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease }}>
                <p className="text-lg font-semibold leading-[1.35] tracking-tight">{c.job}</p>
                <ol className="mt-6 space-y-3">
                  {c.flow.map((f, i) => (<li key={i} className="grid grid-cols-[2.5rem_1fr] gap-2 rounded-xl bg-bg2 p-5">
                    <span className="pt-0.5 text-sm font-semibold tabular-nums text-flame">{String(i + 1).padStart(2, "0")}</span>
                    <span><span className="block text-base font-semibold">{f[0]}</span><span className="mt-1 block text-base leading-[1.45] text-white/70">{f[1]}</span></span></li>))}
                </ol>
              </motion.div>
            </AnimatePresence>
            <p className="mt-5 text-sm text-white/60">{tr ? "Örnek senaryo." : "Example scenario."}</p>
          </div>
        </div>
        <div className="mt-16 flex justify-center"><a href={SITE.demo} className="btn-p">{tr ? "Demo isteyin" : "Book a demo"} <Arr className="ml-1" /></a></div>
      </div>
    </main>
    <Footer />
  </>);
}
