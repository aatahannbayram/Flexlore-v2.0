"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play } from "@phosphor-icons/react/dist/ssr";

/** Page-wide pause switch (WCAG 2.2.2). Pages without a provider play normally. */
export const VideoPause = createContext(false);

import { playOnly as start, stopVideo as stop, pauseAll } from "../media";
export { pauseAll };

function saveData() { return typeof navigator !== "undefined" && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true; }

/** Muted loop from /video/<name>.(webm|mp4) with /video/<name>.jpg poster.
 *  Loads nothing until it is near the viewport (preload="none"), plays at >= `threshold` visible, pauses off-screen.
 *  Reduced motion or Save-Data: poster plus a play button (or poster only when `decorative`). */
export function SmartVideo({ name, className = "", threshold = 0.5, decorative = true, alt = "", poster }: {
  name: string; className?: string; threshold?: number; decorative?: boolean; alt?: string; poster?: string;
}) {
  const reduce = useReducedMotion();
  const paused = useContext(VideoPause);
  const ref = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [lite, setLite] = useState(false);
  const [userPlay, setUserPlay] = useState(false);
  const [near, setNear] = useState(false);
  const still = poster ?? `/video/${name}.jpg`;
  useEffect(() => { setMounted(true); setLite(saveData()); }, []);
  const auto = mounted && !reduce && !lite;
  const active = (auto || userPlay) && !paused;

  useEffect(() => { const el = ref.current; if (!el || !mounted) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "50% 0px" });
    io.observe(el); return () => io.disconnect(); }, [mounted]);
  useEffect(() => { const el = ref.current; if (!el || !near) return;
    if (!active) { stop(el); return; }
    const io = new IntersectionObserver(([e]) => { e.intersectionRatio >= threshold ? start(el) : stop(el); }, { threshold: [0, threshold] });
    io.observe(el); return () => { io.disconnect(); stop(el); }; }, [near, active, threshold]);

  const cls = `absolute inset-0 h-full w-full object-cover ${className}`;
  return (<>
    <video ref={ref} className={cls} poster={still} muted loop playsInline preload="none"
      aria-hidden={decorative || undefined} aria-label={decorative ? undefined : alt} {...(decorative ? { tabIndex: -1 } : {})}>
      {near && (active || userPlay) && <><source src={`/video/${name}.webm`} type="video/webm" /><source src={`/video/${name}.mp4`} type="video/mp4" /></>}
    </video>
    {mounted && !auto && !decorative && !userPlay && (
      <button type="button" onClick={() => setUserPlay(true)} aria-label={`Play video: ${alt}`}
        className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-bg">
        <Play size={18} weight="fill" aria-hidden="true" /></button>)}
  </>);
}
