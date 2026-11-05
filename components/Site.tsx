"use client";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Footer } from "./Sections";
import { Header } from "./Header";
import { TrustStrip } from "./home/Sections";
import dynamic from "next/dynamic";
import { HeroV3 } from "./v3/Top";
const Below = dynamic(() => import("./v3/Home"));
import { useLocale } from "./i18n/LocaleProvider";
import { SmartVideo, VideoPause } from "./ui/SmartVideo";

/** Kept for sector, demo and legacy pages: a muted loop driven by SmartVideo (max 2 playing, poster under reduced motion). */
export function Video({ name, className = "" }: { name: string; eager?: boolean; className?: string }) {
  return <SmartVideo name={name} className={className} threshold={0.35} />;
}

/** Home page: hero with the programs strip, how it works, standards, workspaces, web (desk to field),
 *  customers, closing call to action (sections chosen by Flexlore, 2026-11-05). Header and footer sit outside <main>. */
export default function Site() {
  const { d, locale } = useLocale();
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-3 focus:text-bg">{d.nav.skip}</a>
      <Header home paused={paused} setPaused={setPaused} motionOk={!reduce} />
      <VideoPause.Provider value={paused}>
        <main id="main" lang={locale} className="home-v3">
          <HeroV3><TrustStrip as="div" label={d.trust.programs} /></HeroV3>
          <Below />
        </main>
      </VideoPause.Provider>
      <Footer />
    </>
  );
}
