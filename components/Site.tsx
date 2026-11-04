"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { copy, Lang } from "./copy";
import { Footer } from "./Sections";
import { Header } from "./Header";
import { TrustStrip, PricingPreview, Faq } from "./home/Sections";
import { Hero } from "./home/Hero";
import { ProblemV3, StepsV3, IndustriesV3, EndV3 } from "./home/v3";
import { BentoV4, RolesV4, StatementV4, WorkspaceV4, WebV4 } from "./home/v4";
import { SmartVideo, VideoPause } from "./ui/SmartVideo";

/** Kept for sector, demo and legacy pages: a muted loop driven by SmartVideo (max 2 playing, poster under reduced motion). */
export function Video({ name, className = "" }: { name: string; eager?: boolean; className?: string }) {
  return <SmartVideo name={name} className={className} threshold={0.35} />;
}

/** Home page, in brief order: header, hero, trust, problem, how it works, Flexlore Web, capabilities, industries,
 *  proof (flagged), pricing (light), FAQ, final CTA, footer. */
export default function Site({ useCases }: { useCases?: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [paused, setPaused] = useState(false);
  const t = copy[lang];
  const reduce = useReducedMotion();
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-3 focus:text-bg">{t.skip}</a>
      <Header home lang={lang} setLang={setLang} paused={paused} setPaused={setPaused} motionOk={!reduce} />
      <VideoPause.Provider value={paused}>
        <main id="main" lang={lang} className="home-v3">
          <Hero t={t} lang={lang} />
          <TrustStrip lang={lang} />
          <ProblemV3 lang={lang} />
          <StepsV3 t={t} lang={lang} />
          <BentoV4 lang={lang} />
          <RolesV4 lang={lang} />
          <WorkspaceV4 lang={lang} />
          <WebV4 lang={lang} />
          <StatementV4 lang={lang} />
          <IndustriesV3 lang={lang} />
          <div className="band" style={{ ["--color-bg" as string]: "var(--band)", ["--color-surface-1" as string]: "var(--band-card)" }}>{useCases}</div>
          <PricingPreview lang={lang} />
          <div className="band" style={{ ["--color-bg" as string]: "var(--band)", ["--color-surface-1" as string]: "var(--band-card)" }}><Faq lang={lang} /></div>
          <EndV3 lang={lang} />
        </main>
      </VideoPause.Provider>
      <div lang={lang}><Footer lang={lang} /></div>
    </>
  );
}
