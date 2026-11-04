"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Kinetic type: one word swaps every few seconds and slides up into place (CSS, no exit animation, so a word can never
 *  get stuck half-way when the language changes). Server HTML and reduced motion show the first word; screen readers
 *  get the whole list once (the moving word is aria-hidden). */
export function Rotator({ words, every = 2400 }: { words: string[]; every?: number }) {
  const [i, setI] = useState(0); const reduce = useReducedMotion();
  useEffect(() => { setI(0); }, [words]);
  useEffect(() => { if (reduce) return; const id = window.setInterval(() => setI((v) => (v + 1) % words.length), every); return () => window.clearInterval(id); }, [reduce, words, every]);
  const w = words[i % words.length];
  return (
    <span className="relative inline-block overflow-hidden align-bottom leading-[inherit]">
      <span className="sr-only">{words.join(", ")}</span>
      <span key={w} aria-hidden="true" className="rot-in inline-block whitespace-nowrap text-ink">{w}</span>
    </span>);
}
