"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { copy, Lang } from "./copy";
import { SITE } from "./config";

/** One header for every page (home, sectors, use cases, pricing, blog, demo). EN and TR share it.
 *  `home` keeps in-page anchors; elsewhere they point back to "/#...". Language toggle and video pause
 *  only render when the page passes the handlers. Log in shows only when SITE.login is set. */
export function Header({ lang = "en", setLang, paused = false, setPaused, motionOk = false, home = false, brand }: { lang?: Lang; setLang?: (l: Lang) => void; paused?: boolean; setPaused?: (p: boolean) => void; motionOk?: boolean; home?: boolean; brand?: React.ReactNode }) {
  const t = copy[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  useEffect(() => { if (wasOpen.current && !open) menuBtn.current?.focus(); wasOpen.current = open; }, [open]);
  const { scrollYProgress } = useScroll();
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [open]);
  const links = [...t.nav.map((n, i) => ({ n, h: (home ? "" : "/") + ["#method", "#imagine", "#cases", "#ai"][i] })), { n: t.navP, h: "/pricing/" }, { n: "Blog", h: "/blog/" }];
  const Lang2 = setLang && (
    <div role="group" aria-label={t.langLabel} className="relative flex rounded-full bg-white/[0.07] p-0.5 text-[12px]">
      {(["en", "tr"] as Lang[]).map((l) => (
        <button key={l} onClick={() => setLang!(l)} aria-pressed={lang === l} aria-label={l === "tr" ? "Türkçe" : "English"} lang={l} className={`relative z-10 rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? "text-black" : "text-white/80 hover:text-white"}`}>
          {lang === l && <motion.span layoutId="langpill" className="absolute inset-0 -z-10 rounded-full bg-white" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}{l}
        </button>))}
    </div>);
  // 16: döngülü videolar için durdurma düğmesi; girişi kalabalıklaştırmasın diye menü çubuğunda küçük bir ikon.
  const pauseLabel = paused ? (lang === "tr" ? "Videoları oynat" : "Play videos") : (lang === "tr" ? "Videoları durdur" : "Pause videos");
  const PauseBtn = motionOk && setPaused && (
    <button type="button" onClick={() => setPaused!(!paused)} aria-label={pauseLabel} title={pauseLabel}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/70 ring-1 ring-white/15 transition hover:text-white hover:ring-white/40">
      {paused ? <Play size={11} fill="currentColor" strokeWidth={0} className="ml-px" /> : <Pause size={11} fill="currentColor" strokeWidth={0} />}
    </button>);
  return (
    <>
      <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3">
        <motion.nav aria-label="Main" layout transition={{ type: "spring", stiffness: 260, damping: 32 }}
          className={`relative flex items-center justify-between overflow-hidden transition-[background,border-color,box-shadow] duration-500 ${scrolled ? "h-14 w-[min(100%,900px)] rounded-full border border-white/10 bg-[rgba(20,20,22,0.92)] pl-5 pr-2 shadow-[0_10px_40px_rgba(0,0,0,.45)] backdrop-blur-2xl backdrop-saturate-150" : "h-16 w-[min(100%,1200px)] rounded-none border border-transparent bg-transparent px-3"}`}>
          <a href={home ? "#main" : "/"} className="flex items-center gap-2" aria-label="Flexlore">
            <img src="/brand/wordmark-light.png" alt="Flexlore" width={166} height={36} className={`w-auto transition-[height] duration-500 ${scrolled ? "h-6 sm:h-7" : "h-6 sm:h-9"}`} />
          </a>{brand}
          <ul className="hidden items-center gap-7 text-[14px] text-white/85 md:flex">
            {links.map((l) => <li key={l.h}><a href={l.h} className="link-u hover:text-white">{l.n}</a></li>)}
          </ul>
          <div className="flex items-center gap-2">
            {PauseBtn}
            <div className="hidden sm:block">{Lang2}</div>
            {SITE.login && <a href={SITE.login} className="hidden whitespace-nowrap rounded-full px-3 py-1.5 text-[14px] text-white/85 hover:text-white sm:inline">{t.login}</a>}
            <a href={SITE.demo} className="btn-p inline-flex whitespace-nowrap">{t.cta}</a>
            <button ref={menuBtn} onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu" className="rounded-full px-2 py-1.5 text-[13px] text-white/85 hover:text-white md:hidden">{t.menu}</button>
          </div>
          <motion.span aria-hidden="true" style={{ scaleX: scrollYProgress }} className={`absolute bottom-0 left-0 h-px w-full origin-left bg-flame/80 transition-opacity ${scrolled ? "opacity-100" : "opacity-0"}`} />
        </motion.nav>
      </motion.header>
      {open && (
        <motion.div id="menu" role="dialog" aria-modal="true" aria-label={t.menu} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/90 px-6 pb-10 pt-5 backdrop-blur-2xl">
          <div className="flex items-center justify-between"><img src="/brand/wordmark-light.png" alt="Flexlore" className="h-9 w-auto" />
            <button onClick={() => setOpen(false)} className="rounded-full px-3 py-1.5 text-[13px]" autoFocus>{t.close}</button></div>
          <ul className="mt-16 space-y-3">
            {links.map((l, i) => (
              <motion.li key={l.h} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}>
                <a href={l.h} onClick={() => setOpen(false)} className="display block text-[3.4rem]">{l.n}</a></motion.li>))}
          </ul>
          {SITE.login && <a href={SITE.login} className="mt-10 block text-[17px] text-white/85">{t.login}</a>}
          <div className="mt-auto flex items-center justify-between">{Lang2}<a href={SITE.demo} onClick={() => setOpen(false)} className="btn-p">{t.cta}</a></div>
        </motion.div>)}
    </>
  );
}

