"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import type { Lang } from "../copy";
import { Scaled, WorkScreen } from "../AppScreens";

/* Studio photograph of an iPhone and an iPad on one stand, screens off; the live Flexlore screens are fitted into the
 * two black displays (measured on device-duo: phone L24.9 T21.2 W13.7 H54.4, tablet L43.5 T25.5 W36.8 H49.2, in %).
 * Screens mount only near the viewport and play only while it is on screen. */
const Tablet = dynamic(() => import("../TabletScreen").then((x) => x.TabletScreen), { ssr: false });

export function CtaDuo({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "400px 0px", once: true });
  const on = useInView(ref, { amount: 0.3 });
  const tr = lang === "tr";
  return (
    <div ref={ref} className="relative aspect-[2752/1536] w-full overflow-hidden rounded-[24px] [mask-image:radial-gradient(ellipse_75%_80%_at_55%_50%,#000_60%,transparent_100%)]">
      <picture>
        <source srcSet="/photos/device-duo-800.avif 800w, /photos/device-duo-1600.avif 1600w, /photos/device-duo-2400.avif 2400w" sizes="(min-width:1024px) 60vw, 100vw" type="image/avif" />
        <img src="/photos/device-duo-1600.webp" srcSet="/photos/device-duo-800.webp 800w, /photos/device-duo-1600.webp 1600w, /photos/device-duo-2400.webp 2400w" sizes="(min-width:1024px) 60vw, 100vw" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      <div role="img" aria-label={tr ? "iPhone'da Flexlore iş adımları" : "Flexlore job steps on iPhone"} className="absolute left-[24.9%] top-[21.2%] h-[54.4%] w-[13.7%] overflow-hidden rounded-[14%/6.4%] [&>div]:!rounded-none">
        {near && <Scaled><WorkScreen active={on} lang={lang} /></Scaled>}
      </div>
      <div role="img" aria-label={tr ? "iPad'de Flexlore iş ekranı" : "Flexlore job screen on iPad"} className="absolute left-[43.5%] top-[25.5%] h-[49.2%] w-[36.8%] overflow-hidden rounded-[3%/4%] [&>div]:!rounded-none">
        {near && <Scaled base={1024}><Tablet active={on} lang={lang} /></Scaled>}
      </div>
      {/* Glass sheen and a touch of the studio's warm falloff over both displays. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.05)_0%,rgb(255_255_255/0)_35%),radial-gradient(ellipse_at_50%_0%,rgb(17_17_17/0)_40%,rgb(17_17_17/0.35)_100%)]" />
    </div>);
}
