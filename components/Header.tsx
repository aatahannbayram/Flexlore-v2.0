"use client";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ui/ThemeToggle";
import { FlagPicker } from "./ui/FlagPicker";
import { useLocale } from "./i18n/LocaleProvider";
import dynamic from "next/dynamic";
import { AnimatePresence, m, useMotionValueEvent, useScroll, useReducedMotion } from "framer-motion";
import { Pause, Play, List, X, CaretDown, MagnifyingGlass } from "./ui/icons";
import { copy, Lang } from "./copy";
import { SITE } from "./config";
import { NAV_LABELS } from "./navLabels";
import { EASE } from "./ui/Reveal";

// ⌘K search: its code loads only when someone opens it.
const CommandPalette = dynamic(() => import("./ui/CommandPalette"), { ssr: false });
// Menu content (icons and descriptions) loads on first hover, focus or tap; preloaded as soon as the pointer nears the nav.
const loadMenus = () => import("./HeaderMenus");
const MegaPanel = dynamic(() => loadMenus().then((x) => x.MegaPanel), { ssr: false, loading: () => <div className="h-[260px] rounded-[24px] bg-surface-1" /> });
const MobileMenuBody = dynamic(() => loadMenus().then((x) => x.MobileMenuBody), { ssr: false, loading: () => <div className="flex-1" /> });

/** One header for every page. Full container width, 64 px, translucent #111111 with blur that deepens after 8 px of scroll.
 *  Desktop: categorised mega menus (Product, Industries, Resources) with an icon, title and one line per item, plus Pricing,
 *  ⌘K search, language and Book a demo. Mobile: a full-screen menu grouped the same way.
 *  Hides on scroll down after 400 px, comes back on scroll up, and stays visible while focus or a menu is inside it. */
export function Header({ lang: langProp, setLang, paused = false, setPaused, motionOk = false, home = false, brand }: { lang?: Lang; setLang?: (l: Lang) => void; paused?: boolean; setPaused?: (p: boolean) => void; motionOk?: boolean; home?: boolean; brand?: React.ReactNode }) {
  const ctx = useLocale(); const lang: Lang = langProp ?? ctx.lang; const n = ctx.d.nav;
  // Pages with their own EN/TR switch (the Mikel demo) keep it; everywhere else the 8-language flag picker drives the site.
  const own = !!setLang; const t = own ? copy[lang] : { ...copy[lang], langLabel: n.language, navP: n.pricing, cta: n.cta, menu: n.menu, close: n.close }; const tr = lang === "tr";
  const navLabel = (id: string, fb: string) => own ? fb : ({ product: n.product, industries: n.industries, resources: n.resources } as Record<string, string>)[id] ?? fb;
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [lined, setLined] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const [open, setOpen] = useState(false);            // mobile menu
  const [mega, setMega] = useState<string | null>(null); // desktop mega menu id
  const [search, setSearch] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const closeT = useRef<number | undefined>(undefined);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setLined(y > 8);
    if (y < 400) setHidden(false); else if (y > prev + 4) { setHidden(true); setMega(null); } else if (y < prev - 4) setHidden(false);
  });
  useEffect(() => { setLined(window.scrollY > 8); }, []);
  // Preload the menu content once the browser is idle after load (not on pointerdown: starting a chunk load mid-tap
  // cancelled the click on touch devices).
  useEffect(() => {
    const go = () => { const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback; ric ? ric(() => { loadMenus(); }) : window.setTimeout(() => { loadMenus(); }, 1500); };
    if (document.readyState === "complete") go(); else window.addEventListener("load", go, { once: true });
  }, []);
  useEffect(() => { if (wasOpen.current && !open) menuBtn.current?.focus(); wasOpen.current = open; }, [open]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); if (mega) { triggers.current[mega]?.focus(); setMega(null); } }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); }
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open, mega]);

  const enter = (id: string) => { window.clearTimeout(closeT.current); setMega(id); };
  const leave = () => { closeT.current = window.setTimeout(() => setMega(null), 140); };
  const show = !hidden || focusIn || open || !!mega;

  const LangSwitch = setLang && (
    <div role="group" aria-label={t.langLabel} className="relative flex rounded-full bg-white/[.06] p-0.5 text-xs font-semibold">
      {(["en", "tr"] as Lang[]).map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l} lang={l}
          className={`relative z-10 grid h-8 min-w-9 place-items-center rounded-full px-2 uppercase transition-colors ${lang === l ? "text-bg" : "text-ink-muted hover:text-ink"}`}>
          {lang === l && <m.span layoutId="langpill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 260, damping: 30 }} />}{l}<span className="sr-only"> {l === "tr" ? "Türkçe" : "English"}</span>
        </button>))}
    </div>);
  const pauseLabel = paused ? (tr ? "Videoları oynat" : "Play videos") : (tr ? "Videoları durdur" : "Pause videos");
  const PauseBtn = motionOk && setPaused && (
    <button type="button" onClick={() => setPaused(!paused)} aria-label={pauseLabel} title={pauseLabel}
      className="hidden h-11 w-11 place-items-center rounded-full text-ink-muted transition-colors hover:text-ink xl:grid">
      {paused ? <Play size={14} weight="fill" aria-hidden="true" /> : <Pause size={14} weight="fill" aria-hidden="true" />}
    </button>);

  return (
    <>
      <m.header
        onFocusCapture={() => setFocusIn(true)} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) { setFocusIn(false); setMega(null); } }}
        animate={{ y: show ? 0 : "-100%" }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
        className={`fixed inset-x-0 top-0 z-40 backdrop-blur-[16px] backdrop-saturate-[1.4] transition-colors duration-300 ${lined || mega ? "bg-[rgb(var(--bg-rgb)/0.86)]" : "bg-[rgb(var(--bg-rgb)/0.55)]"}`}>
        <nav aria-label="Main" className="container-x relative flex h-[var(--header-h)] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href={home ? "#main" : "/"} className="flex h-11 items-center" aria-label="Flexlore home">
              <><img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={110} height={24} className="logo-dark h-6 w-auto" /><img src="/brand/wordmark-light-main.svg" alt="Flexlore" width={110} height={24} className="logo-light h-6 w-auto" /></>
            </a>{brand}
          </div>

          <ul className="hidden items-center gap-0.5 text-[15px] lg:flex" onMouseLeave={leave} onPointerEnter={() => { loadMenus(); }} onFocusCapture={() => { loadMenus(); }}>
            {NAV_LABELS.map((g) => (
              <li key={g.id} onMouseEnter={() => enter(g.id)}>
                <button ref={(el) => { triggers.current[g.id] = el; }} type="button" aria-expanded={mega === g.id} aria-controls={`mega-${g.id}`}
                  onClick={() => setMega(mega === g.id ? null : g.id)}
                  className={`inline-flex h-11 items-center gap-1.5 rounded-full px-3.5 transition-colors ${mega === g.id ? "bg-white/[.07] text-ink" : "text-ink-muted hover:text-ink"}`}>
                  {navLabel(g.id, g.label[lang])}<CaretDown size={12} aria-hidden="true" className={`transition-transform duration-300 ${mega === g.id ? "rotate-180" : ""}`} />
                </button>
                {/* Panel sits right after its trigger in the DOM (keyboard order); positioned against the nav. */}
                <AnimatePresence>
                  {mega === g.id && (
                    <m.div key="mega" id={`mega-${g.id}`} onMouseEnter={() => enter(g.id)} onMouseLeave={leave}
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                      className={`absolute left-1/2 top-[calc(var(--header-h)-4px)] ${g.id === "product" ? "w-[min(1000px,calc(100vw-48px))]" : "w-[min(820px,calc(100vw-48px))]"} -translate-x-1/2`}>
                      <MegaPanel id={g.id} lang={lang} d={own ? undefined : ctx.d} home={home} close={() => setMega(null)} reduce={!!reduce} />
                    </m.div>)}
                </AnimatePresence>
              </li>))}
            <li onMouseEnter={leave}><a href="/pricing/" className="inline-flex h-11 items-center rounded-full px-3.5 text-ink-muted transition-colors hover:text-ink">{t.navP}</a></li>
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button type="button" onClick={() => setSearch(true)} aria-keyshortcuts="Meta+K Control+K"
              className="grid h-11 w-11 place-items-center rounded-full text-ink-muted transition-colors hover:text-ink lg:flex lg:h-10 lg:w-auto lg:gap-2 lg:bg-[var(--card)] lg:px-3.5 lg:text-sm">
              <MagnifyingGlass size={16} aria-hidden="true" /><span className="sr-only lg:not-sr-only">{own ? (tr ? "Ara" : "Search") : n.search}</span><span className="sr-only">{own ? (tr ? ": sitede" : " the site") : ""}</span><kbd aria-hidden="true" className="hidden rounded bg-white/[.08] px-1.5 text-[11px] text-ice-400 lg:inline">⌘K</kbd>
            </button>
            {own ? <><ThemeToggle lang={lang} className="hidden sm:grid" /><div className="hidden sm:block">{LangSwitch}</div></> : <div className="hidden items-center rounded-full bg-[var(--card)] p-0.5 sm:flex"><ThemeToggle lang={lang} labels={[n.lightMode, n.darkMode]} className="!h-9 !w-9" /><FlagPicker /></div>}
            <a href={SITE.demo} className="btn btn-primary btn-sm">{t.cta}</a>
            <button ref={menuBtn} type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu" aria-label={t.menu}
              className="grid h-11 w-11 place-items-center rounded-full text-ink lg:hidden"><List size={22} aria-hidden="true" /></button>
          </div>

        </nav>
      </m.header>

      {/* Mobile menu: grouped, with icons, like an app sidebar */}
      <AnimatePresence>
        {open && (
          <m.div id="menu" role="dialog" aria-modal="true" aria-label={t.menu} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg">
            <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <><img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={110} height={24} className="logo-dark h-6 w-auto" /><img src="/brand/wordmark-light-main.svg" alt="Flexlore" width={110} height={24} className="logo-light h-6 w-auto" /></>
              <button type="button" onClick={() => setOpen(false)} aria-label={t.close} autoFocus className="grid h-11 w-11 place-items-center rounded-full"><X size={22} aria-hidden="true" /></button>
            </div>
            <MobileMenuBody lang={lang} d={own ? undefined : ctx.d} home={home} close={() => setOpen(false)} openSearch={() => setSearch(true)} pricing={t.navP} />
            <div className="container-x flex shrink-0 items-center justify-between gap-4 pb-8 pt-4">
              {own ? LangSwitch : <FlagPicker up />}
              <ThemeToggle lang={lang} labels={own ? undefined : [n.lightMode, n.darkMode]} /><a href={SITE.demo} onClick={() => setOpen(false)} className="btn btn-primary">{t.cta}</a>
            </div>
          </m.div>)}
      </AnimatePresence>

      {search && <CommandPalette lang={lang} onHome={home} onClose={() => setSearch(false)} />}
    </>
  );
}
