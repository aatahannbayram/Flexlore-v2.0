"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HERO, HeroSrc } from "./config";

const MOBILE = "(max-width: 768px)";
const BIG = "(min-width: 1921px), (min-width: 1281px) and (min-resolution: 1.5dppx)";
const TYPES: [keyof HeroSrc, string][] = [["av1", 'video/webm; codecs="av01.0.08M.08"'], ["vp9", 'video/webm; codecs="vp9"'], ["h264", 'video/mp4; codecs="avc1.640028"']];

/** Hero still + optional video. Picks the source by format (AV1 → VP9 → H.264) and size (mobile vertical, 1920, 2560).
 *  Paths live in HERO (config.ts). With HERO.video = null only the poster is shown. */
export function HeroMedia({ lang = "en", paused = false }: { lang?: "en" | "tr"; paused?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<{ s: HeroSrc; poster: string } | null>(null);
  const P = HERO.poster;
  useEffect(() => {
    const v = HERO.video; if (!v || reduce) return;
    const m = window.matchMedia(MOBILE).matches, big = window.matchMedia(BIG).matches;
    const s = m && v.mobile ? v.mobile : big && v.d2560 ? v.d2560 : v.d1920;
    setSrc({ s, poster: m ? P.mobile.avif : big ? P.d2560.avif : P.d1920.avif });
  }, [reduce, P]);
  useEffect(() => { const el = ref.current; if (!el) return; paused ? el.pause() : el.play().catch(() => {}); }, [paused, src]);
  return (
    <div className="absolute inset-0">
      <picture>
        <source media={MOBILE} type="image/avif" srcSet={P.mobile.avif} />
        <source media={MOBILE} type="image/webp" srcSet={P.mobile.webp} />
        <source type="image/avif" srcSet={`${P.d1920.avif} 1920w, ${P.d2560.avif} 2560w`} sizes="100vw" />
        <source type="image/webp" srcSet={`${P.d1920.webp} 1920w, ${P.d2560.webp} 2560w`} sizes="100vw" />
        <img src={P.d1920.webp} alt={lang === "tr" ? P.altTr : P.alt} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[70%_50%] md:object-right" />
      </picture>
      {src && (
        <video ref={ref} className="absolute inset-0 h-full w-full object-cover" poster={src.poster} muted loop playsInline autoPlay={!paused} preload="metadata" aria-hidden="true">
          {TYPES.map(([k, type]) => src.s[k] && <source key={k} src={src.s[k]} type={type} />)}
        </video>)}
    </div>);
}
