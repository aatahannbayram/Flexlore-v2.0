"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, List, X } from "./ui/icons";
import { AnimatePresence, m, useMotionValueEvent, useScroll, useReducedMotion } from "framer-motion";
import { copy, Lang } from "./copy";
import { SITE } from "./config";
import { EASE } from "./ui/Reveal";

/** One header for every page. Full container width, 64 px, translucent #111111 with blur that deepens after 8 px of scroll (no rule line).
 *  Hides on scroll down after 400 px, comes back on scroll up, and always shows while focus is inside it.
 *  `home` keeps in-page anchors; elsewhere they point back to "/#...". */
export function Header({ lang = "en", setLang, paused = false, setPaused, motionOk = false, home = false, brand }: { lang?: Lang; setLang?: (l: Lang) => void; paused?: boolean; setPaused?: (p: boolean) => void; motionOk?: boolean; home?: boolean; brand?: React.ReactNode }) {
  const t = copy[lang];
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [lined, setLined] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setLined(y > 8);
    if (y < 400) setHidden(false); else if (y > prev + 4) setHidden(true); else if (y < prev - 4) setHidden(false);
  });
  useEffect(() => { setLined(window.scrollY > 8); }, []);
  useEffect(() => { if (wasOpen.current && !open) menuBtn.current?.focus(); wasOpen.current = open; }, [open]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open]);

  const base = home ? "" : "/";
  const links = [{ n: t.nav[0], h: base + "#product" }, { n: t.nav[1], h: base + "#industries" }, { n: t.navP, h: "/pricing/" }, { n: "Blog", h: "/blog/" }];
  const show = !hidden || focusIn || open;

  const LangSwitch = setLang && (
    <div role="group" aria-label={t.langLabel} className="relative flex rounded-full bg-white/[.06] p-0.5 text-xs font-semibold">
      {(["en", "tr"] as Lang[]).map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l} lang={l}
          className={`relative z-10 grid h-8 min-w-9 place-items-center rounded-full px-2 uppercase transition-colors ${lang === l ? "text-bg" : "text-ink-muted hover:text-ink"}`}>
          {lang === l && <m.span layoutId="langpill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 260, damping: 30 }} />}{l}<span className="sr-only"> {l === "tr" ? "Türkçe" : "English"}</span>
        </button>))}
    </div>);
  const pauseLabel = paused ? (lang === "tr" ? "Videoları oynat" : "Play videos") : (lang === "tr" ? "Videoları durdur" : "Pause videos");
  const PauseBtn = motionOk && setPaused && (
    <button type="button" onClick={() => setPaused(!paused)} aria-label={pauseLabel} title={pauseLabel}
      className="hidden h-11 w-11 place-items-center rounded-full text-ink-muted transition-colors hover:text-ink sm:grid">
      {paused ? <Play size={14} weight="fill" aria-hidden="true" /> : <Pause size={14} weight="fill" aria-hidden="true" />}
    </button>);

  return (
    <>
      <m.header
        onFocusCapture={() => setFocusIn(true)} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusIn(false); }}
        animate={{ y: show ? 0 : "-100%" }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
        className={`fixed inset-x-0 top-0 z-40 backdrop-blur-[16px] backdrop-saturate-[1.4] transition-colors duration-300 ${lined ? "bg-[rgb(17_17_17/0.82)]" : "bg-[rgb(17_17_17/0.55)]"}`}>
        <nav aria-label="Main" className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <a href={home ? "#main" : "/"} className="flex h-11 items-center" aria-label="Flexlore home">
              <img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={110} height={24} className="h-6 w-auto" />
            </a>{brand}
          </div>
          <ul className="hidden items-center gap-1 text-[15px] md:flex">
            {links.map((l) => <li key={l.h}><a href={l.h} className="inline-flex h-11 items-center rounded-full px-3.5 text-ink-muted transition-colors hover:text-ink">{l.n}</a></li>)}
          </ul>
          <div className="flex items-center gap-2">
            {PauseBtn}
            <div className="hidden sm:block">{LangSwitch}</div>
            {SITE.login && <a href={SITE.login} className="hidden h-11 items-center px-3 text-[15px] text-ink-muted hover:text-ink lg:inline-flex">{t.login}</a>}
            <a href={SITE.demo} className="btn btn-primary btn-sm">{t.cta}</a>
            <button ref={menuBtn} type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu" aria-label={t.menu}
              className="grid h-11 w-11 place-items-center rounded-full text-ink md:hidden"><List size={22} aria-hidden="true" /></button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div id="menu" role="dialog" aria-modal="true" aria-label={t.menu} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg">
            <div className="container-x flex h-[var(--header-h)] items-center justify-between">
              <img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={110} height={24} className="h-6 w-auto" />
              <button type="button" onClick={() => setOpen(false)} aria-label={t.close} autoFocus className="grid h-11 w-11 place-items-center rounded-full"><X size={22} aria-hidden="true" /></button>
            </div>
            <ul className="container-x mt-10 space-y-1">
              {links.map((l, i) => (
                <m.li key={l.h} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 + i * 0.06, ease: EASE, duration: 0.5 }}>
                  <a href={l.h} onClick={() => setOpen(false)} className="h2 flex min-h-14 items-center">{l.n}</a></m.li>))}
            </ul>
            <div className="container-x mt-auto flex items-center justify-between gap-4 pb-8 pt-6">
              {LangSwitch}
              <a href={SITE.demo} onClick={() => setOpen(false)} className="btn btn-primary">{t.cta}</a>
            </div>
          </m.div>)}
      </AnimatePresence>
    </>
  );
}
