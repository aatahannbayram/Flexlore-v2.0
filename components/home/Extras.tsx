"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { Lang } from "../copy";

const StandardMap = dynamic(() => import("./StandardMap").then((x) => x.StandardMap), { ssr: false, loading: () => <div className="mx-auto aspect-[5/4] w-full max-w-[560px]" /> });

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
      {/* Soft ice light behind the map so the glass reads; no photograph, nothing to compete with the hero above. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_45%_55%_at_74%_50%,rgb(231_235_235/0.06),rgb(17_17_17/0)_70%)]" />
      <div className="container-x grid items-center gap-12 py-[calc(var(--section-y)*0.9)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <h2 id="pos-h" className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-flame" />{c.k}
          </h2>
          <p ref={ref} className="mt-6 max-w-[22ch] text-[clamp(28px,0.9rem+2.2vw,46px)] font-[600] leading-[1.1] tracking-[-0.03em] text-ink [text-wrap:balance]">
            {reduce ? c.p : words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
          </p>
        </div>
        <div className="lg:col-span-6"><StandardMap lang={lang} /></div>
      </div>
    </section>);
}
