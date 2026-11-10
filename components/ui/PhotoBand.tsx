/* The photo band: a dark rounded panel with a dimmed work photo behind it and glass tiles on top (first used for the
 * Enterprise tiers on the pricing page). Stays dark in the light theme too, so the glass always reads the same.
 *
 * Photo map (keep it free of repeats; the footer cards use web-toplanti and hotel-desk, so bands avoid those):
 *   pricing      huddle (enterprise) · factory (cost calculator) · restaurant (closing)
 *   support      office (quick routes) · warehouse (what to write about, a side card) · cafe-opening (FAQ band)
 *   faq          brewery (closing)
 *   company      saha-liman (story, vision, mission) · saha-santiye-havadan (programs)
 *   features     saha-iskele-pov (closing, every feature page and the index)
 *   see-it       the picked industry's video still, blurred
 *   sectors      SECTOR_BANDS in components/SectorPage.tsx (two per sector, none shared with its own still)
 *   cases        the case photo, blurred
 *   404          problem-kagitlar
 */
import V3 from "../v3/media.json";

type Tone = "side" | "center" | "bottom";
const TONES: Record<Tone, string> = {
  side: "bg-[linear-gradient(100deg,rgb(14_14_14/0.95)_0%,rgb(14_14_14/0.8)_50%,rgb(14_14_14/0.55)_100%)] rtl:bg-[linear-gradient(260deg,rgb(14_14_14/0.95)_0%,rgb(14_14_14/0.8)_50%,rgb(14_14_14/0.55)_100%)]",
  center: "bg-[radial-gradient(ellipse_at_50%_50%,rgb(14_14_14/0.72)_0%,rgb(14_14_14/0.9)_75%)]",
  bottom: "bg-[linear-gradient(180deg,rgb(14_14_14/0.15)_0%,rgb(14_14_14/0.55)_45%,rgb(14_14_14/0.92)_100%)]",
};

/** A photo name (see Pic in home/home5) or a full path such as /video/coffee.jpg. */
function src(n: string) {
  if (n.startsWith("/")) return { webp: n, avif: null as string | null };
  const b = n in V3 ? `/media/v3/${n}` : `/photos/${n}`;
  return { webp: `${b}-1600.webp`, avif: `${b}-1600.avif` };
}

export function PhotoBand({ img, pos = "50% 50%", tone = "side", blur = false, dim = 0.45, id, label, labelledBy, className = "", children }: {
  img: string; pos?: string; tone?: Tone; blur?: boolean; dim?: number; id?: string; label?: string; labelledBy?: string; className?: string; children: React.ReactNode;
}) {
  const s = src(img);
  return (
    <div id={id} role={label || labelledBy ? "region" : undefined} aria-label={label} aria-labelledby={labelledBy}
      className={`dark relative isolate overflow-hidden rounded-[32px] bg-[#141414] text-white ${className}`}>
      <picture className="absolute inset-0 -z-10">
        {s.avif && <source type="image/avif" srcSet={s.avif} />}
        <img src={s.webp} alt="" loading="lazy" decoding="async" style={{ objectPosition: pos, opacity: dim }}
          className={`h-full w-full object-cover saturate-[0.75] ${blur ? "scale-110 blur-[6px]" : ""}`} />
      </picture>
      <span aria-hidden="true" className={`absolute inset-0 -z-10 ${TONES[tone]}`} />
      {children}
    </div>);
}

/** Glass tile for use on a PhotoBand. */
export const glassTile = "rounded-[22px] bg-white/[.06] backdrop-blur-xl shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]";
/** Small icon chip on glass. */
export const glassIcon = "grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-white/10 text-white";
