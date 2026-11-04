"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

/** Kinetic type: one word in a line swaps every few seconds.
 *  - Fixed-width slot: every word is rendered invisibly in the same grid cell, so the slot is as wide as the longest word
 *    and the line never jumps.
 *  - Swap: the old word leaves (up, fading) before the new one enters (from below), so two words are never visible on top
 *    of each other. Each half is under 250ms, ease-out, transform and opacity only.
 *  - Server HTML and reduced motion show the first word with no animation; screen readers get the whole list once. */
const OUT = { duration: 0.12, ease: [0.4, 0, 1, 1] as const };
const IN = { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const };

export function Rotator({ words, every = 2400, align = "start" }: { words: string[]; every?: number; align?: "start" | "end" }) {
  const [i, setI] = useState(0); const reduce = useReducedMotion();
  useEffect(() => { if (reduce) return; const id = window.setInterval(() => setI((v) => (v + 1) % words.length), every); return () => window.clearInterval(id); }, [reduce, words.length, every]);
  useEffect(() => { setI(0); }, [words]);
  const place = `col-start-1 row-start-1 whitespace-nowrap ${align === "end" ? "justify-self-end" : "justify-self-start"}`;
  return (
    <span className="relative inline-grid overflow-hidden align-bottom leading-[inherit]">
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((w) => <span key={`sizer-${w}`} aria-hidden="true" className={`${place} invisible`}>{w}</span>)}
      {/* Under reduced motion the interval never starts, so the first word stays put. */}
      <AnimatePresence mode="wait" initial={false}>
        <m.span key={words[i]} aria-hidden="true" className={`${place} text-ice-200`}
          initial={{ y: "60%", opacity: 0 }} animate={{ y: "0%", opacity: 1, transition: IN }} exit={{ y: "-60%", opacity: 0, transition: OUT }}>
          {words[i]}
        </m.span>
      </AnimatePresence>
    </span>);
}
