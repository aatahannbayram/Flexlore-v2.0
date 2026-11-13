"use client";
import { useEffect } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";
const features = () => import("./motion-features").then((r) => r.default);
/** Site-wide: honours prefers-reduced-motion and loads animation features after first paint (smaller initial JS).
 *  Components use `m.*` instead of `motion.*` so the full motion bundle stays out of the first load. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  /* Glass light: one passive pointer listener for the whole site writes the pointer position into the hovered
     .glass-card (--gx/--gy); CSS draws a soft light and an edge glow there. Mouse only, nothing on touch. */
  useEffect(() => {
    let raf = 0;
    const on = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const el = (e.target as Element | null)?.closest?.(".glass-card") as HTMLElement | null; if (!el) return;
      const r = el.getBoundingClientRect(); el.style.setProperty("--gx", `${e.clientX - r.left}px`); el.style.setProperty("--gy", `${e.clientY - r.top}px`); }); };
    document.addEventListener("pointermove", on, { passive: true }); return () => { document.removeEventListener("pointermove", on); cancelAnimationFrame(raf); };
  }, []);
  return <LazyMotion features={features}><MotionConfig reducedMotion="user">{children}</MotionConfig></LazyMotion>;
}
