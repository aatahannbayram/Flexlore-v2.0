"use client";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useLocale } from "./i18n/LocaleProvider";
import { VideoPause } from "./ui/SmartVideo";
import Home2 from "./v4/Home2";

/** /home2: a home page built from scratch for comparison with /. Not in the sitemap, noindex. */
export default function Site2() {
  const { d, locale } = useLocale(); const [paused, setPaused] = useState(false); const reduce = useReducedMotion();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-3 focus:text-bg">{d.nav.skip}</a>
      <Header home paused={paused} setPaused={setPaused} motionOk={!reduce} />
      <VideoPause.Provider value={paused}>
        <main id="main" lang={locale} className="home-v3"><Home2 /></main>
      </VideoPause.Provider>
      <Footer />
    </>);
}
