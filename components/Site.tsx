"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { copy, Lang } from "./copy";
import { Footer } from "./Sections";
import { Header } from "./Header";
import { Hero } from "./home/Hero";
import { ScrollStory } from "./home/ScrollStory";
import { TrustStrip, Problem, WebShowcase, Industries, Proof, PricingPreview, Faq, FinalCta } from "./home/Sections";
import { Capabilities } from "./home/Capabilities";
import { Positioning, UseCases } from "./home/Extras";
import { SmartVideo, VideoPause } from "./ui/SmartVideo";

/** Kept for sector, demo and legacy pages: a muted loop driven by SmartVideo (max 2 playing, poster under reduced motion). */
export function Video({ name, className = "" }: { name: string; eager?: boolean; className?: string }) {
  return <SmartVideo name={name} className={className} threshold={0.35} />;
}

/** Home page, in brief order: header, hero, trust, problem, how it works, Flexlore Web, capabilities, industries,
 *  proof (flagged), pricing (light), FAQ, final CTA, footer. */
export default function Site() {
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
        <main id="main" lang={lang}>
          <Hero t={t} lang={lang} />
          <TrustStrip lang={lang} />
          <Positioning lang={lang} />
          <Problem lang={lang} />
          <ScrollStory t={t} lang={lang} />
          <WebShowcase lang={lang} />
          <Capabilities lang={lang} />
          <Industries lang={lang} />
          <UseCases lang={lang} />
          <Proof />
          <PricingPreview lang={lang} />
          <Faq lang={lang} />
          <FinalCta lang={lang} />
        </main>
      </VideoPause.Provider>
      <div lang={lang}><Footer lang={lang} /></div>
    </>
  );
}
