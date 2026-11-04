"use client";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { Lang } from "../copy";

/* Positioning band: names the category in one line, then the promise. The promise lights up word by word as it
   scrolls through the viewport (opacity only, so it stays readable without JS and under reduced motion). */
const POS = {
  en: { k: "Onboarding & Operational Training", p: "Standardize how employees learn and clearly see when they’re ready to work across teams and locations." },
  tr: { k: "Oryantasyon ve Operasyonel Eğitim", p: "Çalışanların nasıl öğrendiğini standartlaştırın, ekipler ve lokasyonlar genelinde işe ne zaman hazır olduklarını net görün." },
};

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const a = i / n, b = a + 1.6 / n;
  const o = useTransform(p, [a, b], [0.45, 1]);
  return <m.span style={{ opacity: o }}>{w} </m.span>;
}

export function Positioning({ lang }: { lang: Lang }) {
  const c = POS[lang]; const ref = useRef<HTMLParagraphElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 62%"] });
  const words = c.p.split(" ");
  return (
    <section aria-labelledby="pos-h" className="relative isolate overflow-hidden bg-bg">
      {/* Step by step, as an object: the brushed-metal steps fill the right of the band and melt into the ground. */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full [mask-image:linear-gradient(90deg,transparent_0%,#000_38%)] md:w-[72%] md:[mask-image:linear-gradient(90deg,transparent_0%,#000_45%)]">
        <picture>
          <source srcSet="/photos/steps-sculpture-800.avif 800w, /photos/steps-sculpture-1600.avif 1600w, /photos/steps-sculpture-2400.avif 2400w" sizes="(min-width:768px) 68vw, 100vw" type="image/avif" />
          <img src="/photos/steps-sculpture-1600.webp" srcSet="/photos/steps-sculpture-800.webp 800w, /photos/steps-sculpture-1600.webp 1600w, /photos/steps-sculpture-2400.webp 2400w" sizes="(min-width:768px) 68vw, 100vw" alt="" loading="lazy" className="kenburns h-full w-full object-cover object-[8%_55%] opacity-55 md:opacity-100" />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#111111_0%,rgb(17_17_17/0.85)_22%,rgb(17_17_17/0.2)_55%,rgb(17_17_17/0)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#111111_0%,rgb(17_17_17/0)_22%,rgb(17_17_17/0)_70%,#111111_100%)]" />
      </div>
      <div className="container-x flex min-h-[min(78svh,680px)] items-center py-[calc(var(--section-y)*0.9)]">
        <div className="max-w-[38rem]">
          <h2 id="pos-h" className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-flame" />{c.k}
          </h2>
          <p ref={ref} className="mt-6 text-[clamp(28px,0.9rem+2.4vw,50px)] font-[600] leading-[1.1] tracking-[-0.03em] text-ink [text-wrap:balance]">
            {reduce ? c.p : words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
          </p>
        </div>
      </div>
    </section>);
}
