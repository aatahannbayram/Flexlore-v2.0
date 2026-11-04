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
  const o = useTransform(p, [a, b], [0.22, 1]);
  return <m.span style={{ opacity: o }}>{w} </m.span>;
}

export function Positioning({ lang }: { lang: Lang }) {
  const c = POS[lang]; const ref = useRef<HTMLParagraphElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = c.p.split(" ");
  return (
    <section aria-labelledby="pos-h" className="bg-bg">
      <div className="container-x grid items-center gap-10 py-[calc(var(--section-y)*0.8)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="pos-h" className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-flame" />{c.k}
          </h2>
          <p ref={ref} className="mt-6 max-w-[22ch] text-[clamp(30px,1rem+3vw,60px)] font-[620] leading-[1.06] tracking-[-0.035em] text-ink [text-wrap:balance]">
            {reduce ? c.p : words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
          </p>
        </div>
        {/* Step by step, as an object: brushed slabs rising, amber seams between them. */}
        <div aria-hidden="true" className="relative overflow-hidden rounded-[24px] lg:col-span-5">
          <picture>
            <source srcSet="/photos/steps-sculpture-800.avif 800w, /photos/steps-sculpture-1600.avif 1600w" sizes="(min-width:1024px) 40vw, 100vw" type="image/avif" />
            <img src="/photos/steps-sculpture-1600.webp" srcSet="/photos/steps-sculpture-800.webp 800w, /photos/steps-sculpture-1600.webp 1600w" sizes="(min-width:1024px) 40vw, 100vw" alt="" loading="lazy" className="kenburns aspect-[4/3] w-full object-cover object-[35%_60%]" />
          </picture>
        </div>
      </div>
    </section>);
}
