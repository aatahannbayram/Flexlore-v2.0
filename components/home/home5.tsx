"use client";
/* Home page sections, all reading one dictionary (components/i18n/home/<locale>.ts) through useLocale().
 * Visual rules: one calm dark ground, slightly raised cards, icons instead of eyebrow rules, real work photos and
 * loops behind every product fragment, orange used once per view. Product fragments are drawn in HTML with sample
 * content and labelled. Planned features (MCP / AI assistants) are labelled "coming soon". */
import V3 from "../v3/media.json";

/* ---------- shared bits ---------- */
export type Ic = (p: { size?: number; className?: string; weight?: "fill" | "regular" }) => React.ReactElement;
/** Photo by name: v3 photos (components/v3/media.json) from /media/v3, older ones from /photos. */
export const Pic = ({ n, sizes = "50vw", className = "", eager = false }: { n: string; sizes?: string; className?: string; eager?: boolean }) => {
  const b = n in V3 ? `/media/v3/${n}` : `/photos/${n}`;
  return (<picture><source srcSet={`${b}-800.avif 800w, ${b}-1600.avif 1600w`} sizes={sizes} type="image/avif" />
    <img src={`${b}-1600.webp`} srcSet={`${b}-800.webp 800w, ${b}-1600.webp 1600w`} sizes={sizes} alt="" loading={eager ? "eager" : "lazy"} className={className} /></picture>); };
/** Section label: an icon chip and a word. Replaces the dot-and-rule eyebrows. */
export const Label = ({ children }: { icon?: Ic; children: React.ReactNode }) => (
  /* Krea pass (2026-11-15): a hairline label, no icon square (the icon prop stays for callers). */
  <p className="inline-flex items-center gap-2.5 text-[13px] font-medium text-ink-faint"><span aria-hidden="true" className="kick-line" />{children}</p>);
export const H2 = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => <h2 id={id} className={`v3-h2 mt-4 md:mt-5 ${className}`}>{children}</h2>;
export const card = "relative overflow-hidden rounded-[28px] bg-[var(--card)]";
