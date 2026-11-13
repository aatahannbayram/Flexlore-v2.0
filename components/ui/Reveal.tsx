"use client";
import { useEffect, useState } from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** True only after hydration. Initial (hidden) motion states are applied only then,
 *  so server HTML is complete and readable if JS never runs. */
export function useHydrated() { const [h, setH] = useState(false); useEffect(() => setH(true), []); return h; }

/* Motion system (2026-11-13, "calm"): one distance (12 px), one duration (0.7 s), one easing, stagger 0.06 s. */
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

/** Fade + 12 px rise when the block enters the viewport, once. `stagger` reveals direct <RevealItem> children in turn. */
export function Reveal({ children, className = "", stagger = 0, delay = 0, as = "div" }: {
  children: React.ReactNode; className?: string; stagger?: number; delay?: number; as?: "div" | "ul" | "ol" | "li";
}) {
  const hydrated = useHydrated(); const reduce = useReducedMotion();
  const M = m[as];
  if (!hydrated || reduce) { const T = as; return <T className={className}>{children}</T>; }
  return (
    <M className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }}
      variants={stagger ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } } : { ...item, show: { ...(item.show as object), transition: { duration: 0.7, ease: EASE, delay } } }}>
      {children}
    </M>);
}

export function RevealItem({ children, className = "", as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" }) {
  const hydrated = useHydrated(); const reduce = useReducedMotion();
  const M = m[as];
  if (!hydrated || reduce) { const T = as; return <T className={className}>{children}</T>; }
  return <M className={className} variants={item}>{children}</M>;
}
