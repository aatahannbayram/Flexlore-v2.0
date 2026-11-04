"use client";
import { useRef } from "react";
import Link from "next/link";
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { Lang } from "../copy";
import { Heading } from "../ui/Layout";
import { Reveal, RevealItem } from "../ui/Reveal";
import { ArrowRight } from "../ui/icons";

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
      <div className="container-x py-[calc(var(--section-y)*0.8)]">
        <h2 id="pos-h" className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-flame" />{c.k}
        </h2>
        <p ref={ref} className="mt-6 max-w-[24ch] text-[clamp(30px,1rem+3.2vw,64px)] font-[620] leading-[1.06] tracking-[-0.035em] text-ink [text-wrap:balance]">
          {reduce ? c.p : words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
        </p>
      </div>
    </section>);
}

/* Use cases: the format competitors use for customer stories (picture, tag, one line, link), filled only with
   scenarios we can stand behind. No customer names and no invented results. */
const CASES = [
  { href: "/use-cases/master-apprentice-skills-transfer/", img: "/photos/factory-800", tag: { en: "Manufacturing · Skills transfer", tr: "Üretim · Beceri aktarımı" },
    h: { en: "Master to apprentice", tr: "Ustadan çırağa" }, q: { en: "“Watch how I do it. Then do it again.”", tr: "“Nasıl yaptığımı izle. Sonra sen yap.”" },
    p: { en: "The master’s way, available on every shift, without pulling the master off the job.", tr: "Ustanın yöntemi her vardiyada hazır, usta işinden alıkonmadan." } },
  { href: "/use-cases/installation-training-on-site-orientation/", img: "/video/warehouse", tag: { en: "Equipment · On-site orientation", tr: "Ekipman · Sahada oryantasyon" },
    h: { en: "Installation training", tr: "Kurulum eğitimi" }, q: { en: "“The installers left. The know-how stayed.”", tr: "“Kurulum ekibi gitti. Bilgi kaldı.”" },
    p: { en: "Start-up, cleaning and daily checks filmed on the installed unit, there for the next shift months later.", tr: "Çalıştırma, temizlik ve günlük kontroller kurulan makinede çekilir, aylar sonraki vardiya için hazır kalır." } },
  { href: "/see-it/", img: "/photos/chef-plating-800", tag: { en: "Restaurants · Opening checklist", tr: "Restoranlar · Açılış kontrol listesi" },
    h: { en: "Your business", tr: "Sizin işiniz" }, q: { en: "“Same plate, every shift.”", tr: "“Her vardiyada aynı tabak.”" },
    p: { en: "Pick your industry and follow one real job, from the first recording to who is ready.", tr: "Sektörünüzü seçin, bir gerçek işi ilk çekimden kimin hazır olduğuna kadar izleyin." } },
];

export function UseCases({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  return (
    <section id="use-cases" aria-labelledby="uc-h" className="section-y bg-bg">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading id="uc-h" eyebrow={tr ? "Kullanım alanları" : "Use cases"}
            title={tr ? "Ekipler Flexlore'u nasıl kullanıyor." : "How teams put Flexlore to work."}
            lead={tr ? "Bir kez çekilen gerçek işler, her vardiyada aynı şekilde öğrenilir." : "Real jobs, filmed once and learned the same way on every shift."} />
        </div>
        <Reveal as="ul" stagger={0.08} className="no-sb -mx-[var(--pad-x)] mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad-x)] pb-1 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {CASES.map((c) => (
            <RevealItem as="li" key={c.href} className="w-[84%] shrink-0 snap-start md:w-auto">
              <Link href={c.href} className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-surface-1 transition-colors duration-300 hover:bg-surface-2">
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <picture><source srcSet={`${c.img}.avif`} type="image/avif" />
                    <img src={`${c.img}.webp`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" /></picture>
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(25_25_25/0)_45%,rgb(25_25_25/0.9)_100%)]" />
                  <span className="absolute left-4 top-4 rounded-full bg-[rgb(17_17_17/0.7)] px-3 py-1.5 text-xs font-medium text-ice-200 backdrop-blur-md">{tr ? c.tag.tr : c.tag.en}</span>
                </span>
                <span className="flex flex-1 flex-col px-6 pb-6 pt-2">
                  <span className="text-[22px] font-semibold leading-tight tracking-[-.02em] text-ink">{tr ? c.q.tr : c.q.en}</span>
                  <span className="mt-3 text-[15px] leading-[1.5] text-ice-400">{tr ? c.p.tr : c.p.en}</span>
                  <span className="mt-auto flex items-center justify-between pt-6 text-[15px] font-medium text-ink">
                    {tr ? c.h.tr : c.h.en}
                    <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-white/[.06] text-ice-300 transition-all duration-300 group-hover:bg-ink group-hover:text-bg"><ArrowRight size={14} /></span>
                  </span>
                </span>
              </Link>
            </RevealItem>))}
        </Reveal>
      </div>
    </section>);
}
