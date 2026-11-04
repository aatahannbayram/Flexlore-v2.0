"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Lang } from "../copy";
import { Scaled } from "../AppScreens";

/* Photograph of a rugged phone on a magnetic mount on a machine guard (phone-mount, 2752x1536), with the live step
 * editor fitted into its black screen. The photo is laid out in a 1376x768 design space and scaled to COVER its box;
 * the screen is a 320x693 element mapped onto the four measured screen corners with a matrix3d homography
 * (TL 451,141 · TR 596,131 · BR 582,596 · BL 422,586), so the perspective holds at any size. */
const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="h-full w-full bg-[#111]" /> });
const DW = 1376, DH = 768;
const M = "matrix3d(0.376916,-0.048001,0,-0.000128,-0.101116,0.559833,0,-0.000140,0,0,1,0,451,141,0,1)";

export function MountShot({ active, lang }: { active: boolean; lang: Lang }) {
  const box = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ k: 0, x: 0, y: 0 });
  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(() => { const w = el.clientWidth, h = el.clientHeight; const k = Math.max(w / DW, h / DH); setT({ k, x: (w - DW * k) / 2, y: (h - DH * k) / 2 }); });
    ro.observe(el); return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className="dark absolute inset-0 overflow-hidden">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: DW, height: DH, transform: `translate(${t.x}px,${t.y}px) scale(${t.k})`, visibility: t.k ? "visible" : "hidden" }}>
        <picture>
          <source srcSet="/photos/phone-mount-1600.avif" type="image/avif" />
          <img src="/photos/phone-mount-1600.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full" />
        </picture>
        <div className="absolute left-0 top-0 overflow-hidden rounded-[30px] [&>div]:!rounded-none" style={{ width: 320, height: 693, transform: M, transformOrigin: "0 0" }}>
          {active && <Scaled><Editor active={active} lang={lang} /></Scaled>}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(255_255_255/0.08)_0%,rgb(255_255_255/0)_40%)]" />
        </div>
      </div>
    </div>);
}
