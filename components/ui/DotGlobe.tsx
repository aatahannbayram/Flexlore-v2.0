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
    const N = 4200, pts: [number, number, number, number][] = [];
    const g = Math.PI * (3 - Math.sqrt(5));
    // Smooth 3D value noise (deterministic) shapes abstract land masses. Not a real map: no places are implied.
    const h3 = (x: number, y: number, z: number) => { const v = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return v - Math.floor(v); };
    const sm = (t: number) => t * t * (3 - 2 * t);
    const noise = (x: number, y: number, z: number) => {
      const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), xf = sm(x - xi), yf = sm(y - yi), zf = sm(z - zi);
      const l = (a: number, b: number, t: number) => a + (b - a) * t;
      const c = (dx: number, dy: number, dz: number) => h3(xi + dx, yi + dy, zi + dz);
      return l(l(l(c(0, 0, 0), c(1, 0, 0), xf), l(c(0, 1, 0), c(1, 1, 0), xf), yf), l(l(c(0, 0, 1), c(1, 0, 1), xf), l(c(0, 1, 1), c(1, 1, 1), xf), yf), zf);
    };
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = g * i, x = Math.cos(t) * r, z = Math.sin(t) * r;
      const n = 0.62 * noise(x * 2.1 + 5, y * 2.1 + 5, z * 2.1 + 5) + 0.38 * noise(x * 4.3 + 9, y * 4.3 + 9, z * 4.3 + 9);
      pts.push([x, y, z, n > 0.52 ? 1 : 0]);
    }
    const tw = new Float32Array(N);
    let w = 0, h = 0, dpr = 1, a = 0.6, raf = 0, visible = false;
    const tilt = -0.42, ct = Math.cos(tilt), st = Math.sin(tilt);
    const size = () => { dpr = Math.min(2, window.devicePixelRatio || 1); w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; draw(); };
    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      const R = Math.min(Math.max(w * 0.42, 260), 560), cx = w / 2, cy = R + h * 0.28; // sphere top sits 28% into the canvas: a visible horizon
      const ca = Math.cos(a), sa = Math.sin(a);
      for (let k = 0; k < N; k++) {
        const [x0, y0, z0, land] = pts[k];
        const x1 = x0 * ca + z0 * sa, z1 = -x0 * sa + z0 * ca;     // turn around Y
        const y2 = y0 * ct - z1 * st, z2 = y0 * st + z1 * ct;      // tilt toward the viewer
        if (z2 < 0) continue;
        const px = cx + x1 * R, py = cy - y2 * R;
        if (py > h + 2 || py < -2) continue;
        const glint = tw[k];
        ctx.globalAlpha = land ? Math.min(1, 0.18 + 0.7 * z2 + glint) : 0.05 + 0.12 * z2;
        ctx.fillStyle = "#D2D8D9";
        ctx.beginPath(); ctx.arc(px, py, land ? 0.7 + 1.0 * z2 + glint * 1.2 : 0.5 + 0.5 * z2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    // A few land dots brighten and fade at random: quiet signs of activity, not real locations.
    const loop = () => {
      a += 0.0012;
      for (let k = 0; k < N; k++) if (tw[k] > 0) tw[k] = Math.max(0, tw[k] - 0.012);
      if (Math.random() < 0.18) { const k = (Math.random() * N) | 0; if (pts[k][3]) tw[k] = 0.9; }
      draw(); raf = requestAnimationFrame(loop);
    };
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
