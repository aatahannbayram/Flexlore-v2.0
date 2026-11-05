"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play } from "./icons";

/** Page-wide pause switch (WCAG 2.2.2). Pages without a provider play normally. */
export const VideoPause = createContext(false);

import { playOnly as start, stopVideo as stop, pauseAll } from "../media";
export { pauseAll };

function saveData() { return typeof navigator !== "undefined" && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true; }

/** Muted loop from /video/<name>.(webm|mp4) with /video/<name>.jpg poster.
 *  Loads nothing until it is near the viewport (preload="none"), plays at >= `threshold` visible, pauses off-screen.
 *  Reduced motion or Save-Data: poster plus a play button (or poster only when `decorative`). */
export function SmartVideo({ name, className = "", threshold = 0.5, decorative = true, alt = "", poster, play, idle = false, underlay = false }: {
  name: string; className?: string; threshold?: number; decorative?: boolean; alt?: string; poster?: string;
  /** External control (e.g. hover on desktop). undefined = play when visible. */
  play?: boolean;
  /** Wait for window load + idle before loading anything (hero background). */
  idle?: boolean;
  /** A picture of the same frame already sits underneath: no poster (avoids painting the image twice, keeps it the LCP). */
  underlay?: boolean;
}) {
  const reduce = useReducedMotion();
  const paused = useContext(VideoPause);
  const ref = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [lite, setLite] = useState(false);
  const [userPlay, setUserPlay] = useState(false);
  const [near, setNear] = useState(false);
  const still = poster ?? `/video/${name}.jpg`;
  // Phones on mobile data: decorative loops stay as their poster (the page reads the same, without the megabytes).
  useEffect(() => { setMounted(true); setLite(saveData() || (decorative && window.matchMedia("(max-width: 767px)").matches)); }, [decorative]);
  const auto = mounted && !reduce && !lite;
  const active = (auto || userPlay) && !paused && play !== false;

  useEffect(() => { const el = ref.current; if (!el || !mounted) return;
    let io: IntersectionObserver | undefined; let t: number | undefined;
    const watch = () => { io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io?.disconnect(); } }, { rootMargin: "20% 0px" }); io.observe(el); };
    if (!idle) watch();
    else { const go = () => { t = window.setTimeout(watch, 800); }; document.readyState === "complete" ? go() : window.addEventListener("load", go, { once: true }); }
    return () => { io?.disconnect(); if (t) clearTimeout(t); }; }, [mounted, idle]);
  useEffect(() => { const el = ref.current; if (!el || !near) return;
    if (!active) { stop(el); return; }
    const io = new IntersectionObserver(([e]) => { e.intersectionRatio >= threshold ? start(el) : stop(el); }, { threshold: [0, threshold] });
    io.observe(el); return () => { io.disconnect(); stop(el); }; }, [near, active, threshold]);

  const cls = `absolute inset-0 h-full w-full object-cover ${className}`;
  return (<>
    <video ref={ref} className={cls} poster={!underlay && (near || lite) ? still : undefined} muted loop playsInline preload="none"
      aria-hidden={decorative || undefined} aria-label={decorative ? undefined : alt} {...(decorative ? { tabIndex: -1 } : {})}>
      {near && (active || userPlay) && <><source src={`/video/${name}.webm`} type={'video/webm; codecs="av01.0.05M.08"'} /><source src={`/video/${name}.mp4`} type="video/mp4" /></>}
    </video>
    {mounted && !auto && !decorative && !userPlay && (
      <button type="button" onClick={() => setUserPlay(true)} aria-label={`Play video: ${alt}`}
        className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-bg">
        <Play size={18} weight="fill" aria-hidden="true" /></button>)}
  </>);
}
