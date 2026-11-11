"use client";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { Footer } from "./Sections";
import { Header } from "./Header";
import { TrustStrip } from "./home/Sections";
import { HeroCinema } from "./v3/HeroCinema";
import { useLocale } from "./i18n/LocaleProvider";
import { VideoPause } from "./ui/SmartVideo";
const Below = dynamic(() => import("./v3/Below2"));

/** /home2: the home page with the cinematic full-bleed hero, for side-by-side comparison with /. Everything below the
 *  hero is the same as the home page. Not in the sitemap, noindex. */
export default function Site2() {
  const { d, locale } = useLocale(); const [paused, setPaused] = useState(false); const reduce = useReducedMotion();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-3 focus:text-bg">{d.nav.skip}</a>
      <Header home pill paused={paused} setPaused={setPaused} motionOk={!reduce} />
      <VideoPause.Provider value={paused}>
        <main id="main" lang={locale} className="home-v3">
          <HeroCinema><div className="container-x pt-10"><TrustStrip as="div" label={d.trust.programs} /></div></HeroCinema>
          <Below />
        </main>
      </VideoPause.Provider>
      <Footer />
    </>);
}
