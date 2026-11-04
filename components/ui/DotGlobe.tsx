"use client";
import { useEffect, useRef } from "react";

/** A horizon made of ice-grey dots: the top of a slowly turning sphere. Canvas, no glow, no gradients.
 *  Draws only while on screen; static under prefers-reduced-motion. Decorative (aria-hidden). */
export function DotGlobe({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Fibonacci sphere: evenly spread points.
    const N = 3200, pts: [number, number, number][] = [];
    const g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = g * i; pts.push([Math.cos(t) * r, y, Math.sin(t) * r]); }
    let w = 0, h = 0, dpr = 1, a = 0.6, raf = 0, visible = false;
    const tilt = -0.42, ct = Math.cos(tilt), st = Math.sin(tilt);
    const size = () => { dpr = Math.min(2, window.devicePixelRatio || 1); w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; draw(); };
    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      const R = Math.min(Math.max(w * 0.42, 260), 560), cx = w / 2, cy = R + h * 0.28; // sphere top sits 28% into the canvas: a visible horizon
      const ca = Math.cos(a), sa = Math.sin(a);
      for (const [x0, y0, z0] of pts) {
        const x1 = x0 * ca + z0 * sa, z1 = -x0 * sa + z0 * ca;     // turn around Y
        const y2 = y0 * ct - z1 * st, z2 = y0 * st + z1 * ct;      // tilt toward the viewer
        if (z2 < 0) continue;
        const px = cx + x1 * R, py = cy - y2 * R;
        if (py > h + 2 || py < -2) continue;
        ctx.globalAlpha = 0.06 + 0.62 * z2;
        ctx.fillStyle = "#D2D8D9";
        ctx.beginPath(); ctx.arc(px, py, 0.5 + 0.9 * z2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const loop = () => { a += 0.0014; draw(); raf = requestAnimationFrame(loop); };
    const ro = new ResizeObserver(size); ro.observe(cv); size();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce && !raf) raf = requestAnimationFrame(loop);
      if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(cv);
    return () => { ro.disconnect(); io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
