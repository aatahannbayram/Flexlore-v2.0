"use client";
import { motion } from "framer-motion";
const ease = [0.22, 1, 0.36, 1] as const;
/** Per-word mask slide-up on view. `accent` = index of word painted orange (-1 = last). */
export function K({ text, accent, delay = 0, className = "" }: { text: string; accent?: number; delay?: number; className?: string }) {
  const w = text.split(" "); const ai = accent === undefined ? -99 : accent < 0 ? w.length + accent : accent;
  return (<span className={className}><span className="sr-only">{text}</span><span aria-hidden="true">
    {w.map((x, i) => (<span key={i} className="inline-block overflow-hidden pb-[.1em] -mb-[.1em] align-bottom">
      <motion.span initial={{ y: "110%", rotate: 4 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ delay: delay + i * 0.06, duration: 0.9, ease }} className={`inline-block origin-bottom-left ${i === ai ? "text-ice-400" : ""}`}>{x}{i < w.length - 1 ? "\u00a0" : ""}</motion.span></span>))}
  </span></span>);
}
