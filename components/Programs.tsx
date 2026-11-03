// Program participation badges. Hidden until the official assets from each
// program's member portal are placed in /public/badges/ and NEXT_PUBLIC_BADGES=1.
// Do not redraw these marks; use the files exactly as supplied.
import { SITE } from "./config";
const on = SITE.programBadges && process.env.NEXT_PUBLIC_BADGES === "1";
const items = [
  { src: "/badges/nvidia-inception.svg", alt: "NVIDIA Inception Program member badge" },
  { src: "/badges/claude-for-startups.svg", alt: "Claude for Startups program badge" },
];
export default function Programs({ lang }: { lang: "en" | "tr" }) {
  if (!on) return null;
  return (
    <section aria-label={lang === "tr" ? "Programlar" : "Programs"} className="px-6 pt-12 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-16 gap-y-8 border-t border-white/10 pt-8">
        <p className="mono text-[12px] uppercase tracking-[.2em] text-white/70">{lang === "tr" ? "Program katılımı" : "Program participation"}</p>
        {items.map((b) => (<img key={b.src} src={b.src} alt={b.alt} className="h-12 w-auto p-3 md:h-14" />))}
      </div>
    </section>);
}
