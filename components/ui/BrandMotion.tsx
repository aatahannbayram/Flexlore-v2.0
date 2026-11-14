"use client";
/* Flexlore mark in liquid glass (2026-11-14): the first visit of a session opens with the full glass reveal of the mark
 * (Figma "Flexlore UI/UX" node 6215:2), and internal navigations show a short version of it while the next page loads.
 * The server-rendered .splash (app/layout.tsx) covers the page until this mounts, so there is no flash of content.
 * Skipped for reduced motion, automated browsers (navigator.webdriver: tests, crawlers' headless runs) and devices
 * without WebGL2; then the old CSS splash runs as before. Click or Escape skips. */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
/* The shader and its engine load in their own chunk, so pages do not pay for them up front. */
const GlassIconReveal = dynamic(() => import("./liquid-glass-logo-reveal").then((m) => m.GlassIconReveal), { ssr: false });
const preloadLogo = (svg: string) => import("./liquid-glass-logo-reveal").then((m) => m.preloadLogo(svg));

/** The mark with the Figma gradients (grey top, orange bottom). */
export const FLEXLORE_MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 69.64 69.64"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#9C9C9C"/><stop offset="1" stop-color="#DADADA"/></linearGradient><linearGradient id="o" x1="0" x2="1"><stop offset="0" stop-color="#D1501B"/><stop offset=".5" stop-color="#EC6726"/><stop offset="1" stop-color="#FF9440"/></linearGradient></defs><path fill="url(#o)" d="M34.79 34.64C30.78 34.70 26.94 36.21 24.20 38.51L0.00 57.31L0.00 69.64L30.42 46.74C31.34 46.06 32.31 45.47 33.34 45.00C34.26 44.56 35.35 44.56 36.27 45.00C37.30 45.47 38.27 46.06 39.19 46.74L69.61 69.64L69.61 57.31L45.41 38.51C42.67 36.21 38.83 34.70 34.82 34.64L34.79 34.64"/><path fill="url(#g)" d="M44.50 13.69C42.73 15.34 40.60 17.14 38.86 18.80C36.83 20.63 35.82 21.57 34.79 21.57C33.76 21.57 32.75 20.66 30.72 18.80C28.95 17.14 26.82 15.31 25.08 13.69C17.91 7.08 9.32 2.86 0.00 0.00L0.00 11.12C8.38 12.95 15.93 20.24 22.84 26.14C26.47 29.66 30.63 31.54 34.82 31.57C39.01 31.57 43.14 29.66 46.80 26.14C53.68 20.24 61.26 12.95 69.64 11.12L69.64 0.00C60.32 2.83 51.73 7.05 44.56 13.69L44.50 13.69"/></svg>`;

/** Turn page transitions off here if they ever feel slow; the intro stays. */
const NAV_TRANSITIONS = true;
const NAV_MIN_MS = 720; // the short reveal has let go of the glass by then
const NAV_MAX_MS = 2500; // never block a slow navigation longer than this
const FADE_MS = 380;

type Kind = "intro" | "nav";

const canAnimate = () => {
  try {
    return !navigator.webdriver && "WebGL2RenderingContext" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch { return false; }
};
const theme = () => {
  const light = document.documentElement.dataset.theme === "light";
  return { light, bg: light ? "#FAF8F5" : "#111111" };
};
const endSplash = () => {
  const h = document.documentElement;
  h.classList.remove("splash-glass", "splash-on");
  h.classList.add("no-splash");
};

export function BrandMotion() {
  /* One glass canvas for the whole visit: built once (shader compile, logo texture), then replayed on every
   * navigation, so the short reveal starts on the first frame instead of after a fresh WebGL setup. */
  const [ready, setReady] = useState(false); // mounted and allowed to animate
  const [kind, setKind] = useState<Kind>("intro");
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(0);
  const pathname = usePathname();
  const nav = useRef<{ from: string; at: number; arrived: boolean } | null>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const close = () => { setShow(false); nav.current = null; };
  const skip = () => { clear(); endSplash(); close(); };

  useEffect(() => {
    const intro = document.documentElement.classList.contains("splash-glass");
    if (!canAnimate()) { if (intro) endSplash(); return; }
    preloadLogo(FLEXLORE_MARK).catch(() => {});
    setReady(true);
    if (intro) {
      setKind("intro"); setShow(true); setToken((t) => t + 1);
      later(skip, 3600); // safety net if the reveal never reports its end
    }
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Page transitions: start on the click so the cover is up before the next page paints. */
  useEffect(() => {
    if (!NAV_TRANSITIONS || !ready) return;
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (/\.(pdf|png|jpe?g|webp|avif|svg|mp4|zip|xml|txt)$/i.test(url.pathname)) return;
      clear();
      endSplash();
      nav.current = { from: location.pathname, at: performance.now(), arrived: false };
      setKind("nav"); setShow(true); setToken((t) => t + 1);
      later(close, NAV_MAX_MS);
    };
    /* Capture phase: next/link calls preventDefault on its own click, so a bubbling listener would never see it. */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  /* The new page is in: let the short reveal run its minimum time, then fade. */
  useEffect(() => {
    const n = nav.current;
    if (!n || n.arrived || pathname === n.from) return;
    n.arrived = true;
    clear();
    later(close, Math.max(0, NAV_MIN_MS - (performance.now() - n.at)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") skip(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  if (!ready) return null;
  const { light, bg } = theme();
  const intro = kind === "intro";
  return createPortal(
    <div className="brand-motion" data-show={show ? "" : undefined} style={{ background: bg }} onClick={skip} aria-hidden="true">
      <GlassIconReveal
        logo={FLEXLORE_MARK}
        label="Flexlore"
        look={light ? "light" : "dark"}
        background={bg}
        plateColor={light ? "#FFFFFF" : "#181818"}
        originalColors
        loop={false}
        playToken={token}
        tileSize={150}
        logoScale={0.62}
        finalScale={0.8}
        speed={intro ? 1 : 2.1}
        tuning={intro ? { present: 1.7, glide: 1.5 } : { present: 1.0, glide: 0.8, ripple: 0 }}
        onEnd={() => { if (intro && show) { endSplash(); later(close, 120); } }}
        className="h-[300px] w-[300px]"
      />
    </div>,
    document.body,
  );
}
