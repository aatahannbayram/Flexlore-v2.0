"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { EASE } from "./Reveal";

/** Kinetic type: one word in a line swaps every few seconds with a short vertical slide. Server HTML and reduced motion show
 *  the first word; screen readers get the whole list once (the moving word is aria-hidden). */
export function Rotator({ words, every = 2400 }: { words: string[]; every?: number }) {
  const [i, setI] = useState(0); const reduce = useReducedMotion();
  useEffect(() => { if (reduce) return; const id = window.setInterval(() => setI((v) => (v + 1) % words.length), every); return () => window.clearInterval(id); }, [reduce, words.length, every]);
  useEffect(() => { setI(0); }, [words]);
  return (
    <span className="relative inline-grid overflow-hidden align-bottom leading-[inherit]">
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence initial={false}>
        <m.span key={words[i]} aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap text-ice-200"
          initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
          {words[i]}
        </m.span>
      </AnimatePresence>
    </span>);
}
