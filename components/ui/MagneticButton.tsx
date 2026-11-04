"use client";
import { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/** Primary CTA: follows the pointer by at most 6 px on a spring, presses to 0.98. Off on touch and reduced motion. */
export function MagneticButton({ href, children, className = "btn btn-primary", onClick, external }: {
  href: string; children: React.ReactNode; className?: string; onClick?: () => void; external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => { setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches); }, []);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30 }), sy = useSpring(y, { stiffness: 260, damping: 30 });
  const on = fine && !reduce;
  const move = (e: React.PointerEvent) => { if (!on || !ref.current) return; const r = ref.current.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-6, Math.min(6, v));
    x.set(clamp((e.clientX - r.left - r.width / 2) * 0.15)); y.set(clamp((e.clientY - r.top - r.height / 2) * 0.3)); };
  return (
    <m.a ref={ref} href={href} onClick={onClick} className={className} style={on ? { x: sx, y: sy } : undefined}
      onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }} whileTap={reduce ? undefined : { scale: 0.98 }}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      {children}
    </m.a>);
}
