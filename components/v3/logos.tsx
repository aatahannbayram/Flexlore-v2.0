/* Customer logos for the home carousel, drawn white on the photo cards. Supplied by Flexlore on 2026-11-10 together with
 * the request to show them; image files live in /public/logos. A customer with no entry here shows its name as text. */
import type { ReactNode } from "react";

/** Bambu Smoothie Bar: a placeholder mark drawn by us (a bamboo stalk with one leaf) until the real logo arrives. */
function BambuMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 252 80" className={className} fill="currentColor" role="img" aria-label="Bambu Smoothie Bar">
      <rect x="12" y="6" width="13" height="31" rx="6.5" />
      <rect x="12" y="41" width="13" height="33" rx="6.5" />
      <path d="M25 39 C29 22 40 13 55 10 C52 26 42 36 25 39 Z" />
      <path d="M12 52 C6 46 2 40 1 32 C9 35 12 42 12 52 Z" opacity=".7" />
      <text x="66" y="50" fontSize="42" fontWeight="600" letterSpacing="-1.4">bambu</text>
      <text x="68" y="70" fontSize="10.5" fontWeight="500" letterSpacing="3.4" opacity=".75">SMOOTHIE BAR</text>
    </svg>);
}

type Logo = { src: string; w: number; h: number } | { node: (cls: string) => ReactNode; w: number; h: number };
export const LOGOS: Partial<Record<string, Logo>> = {
  "eat-well-drink-joy": { src: "/logos/eatwell.webp", w: 900, h: 635 },
  "istinye-insaat": { src: "/logos/istinye.svg", w: 396, h: 140 },
  "sistem-teknik": { src: "/logos/sistemteknik.webp", w: 1024, h: 280 },
  "bambu-smoothie-bar": { node: (cls) => <BambuMark className={cls} />, w: 252, h: 80 },
};

/** The logo at a height that keeps wide and tall marks visually even (wide marks get less height). */
export function CaseLogo({ slug, name }: { slug: string; name: string }) {
  const l = LOGOS[slug];
  if (!l) return null;
  const ratio = l.w / l.h;
  const h = ratio > 3.3 ? "h-[clamp(50px,0.9rem+4.6vw,104px)]" : ratio > 2 ? "h-[clamp(64px,1.1rem+6vw,136px)]" : "h-[clamp(96px,1.6rem+8vw,190px)]";
  const cls = `${h} w-auto max-w-full`;
  return "src" in l
    ? <img src={l.src} alt={name} width={l.w} height={l.h} decoding="async" loading="lazy" draggable={false} className={`${cls} object-contain`} />
    : <>{l.node(cls)}</>;
}
