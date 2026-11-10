"use client";
/* Customer story template (/musteriler/<slug>/): hero photo, problem, solution, result, quote.
 * Renders only fields that exist; an unapproved case shows [ONAY BEKLİYOR] placeholders and is noindex
 * (see app/musteriler/[slug]/page.tsx). Copy for the frame is TR/EN; the story itself comes from components/v3/cases.ts. */
import Link from "next/link";
import { Header } from "../Header";
import { Footer } from "../Sections";
import { useLocale } from "../i18n/LocaleProvider";
import { SITE } from "../config";
import { CASES } from "./cases";
import { Photo } from "./Top";
import { Chev } from "./Chevron";
import { PhotoBand, glassTile } from "../ui/PhotoBand";

const T = { en: { k: "Customer story", p: "The problem", s: "What they did", r: "The result", back: "All stories", wait: "[AWAITING APPROVAL]", cta: "Book a demo" },
  tr: { k: "Müşteri hikâyesi", p: "Sorun", s: "Çözüm", r: "Sonuç", back: "Tüm hikâyeler", wait: "[ONAY BEKLİYOR]", cta: "Demo isteyin" } };

export default function CasePage({ slug }: { slug: string }) {
  const { lang } = useLocale(); const t = T[lang];
  const c = CASES.find((x) => x.slug === slug) ?? CASES[0];
  const v = (x: string | null) => x ?? t.wait;
  return (
    <>
      <Header />
      <main id="main">
        <section aria-labelledby="case-h" className="dark relative isolate overflow-hidden bg-[#111111] pt-[var(--header-h)]">
          <div aria-hidden="true" className="absolute inset-0"><Photo n={c.img} portrait priority sizes="100vw" className="h-full w-full object-cover" /></div>
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,#111111_0%,rgb(17_17_17/0.6)_45%,rgb(17_17_17/0.2)_100%)]" />
          <div className="container-x relative flex min-h-[min(78svh,720px)] flex-col justify-end pb-12 md:pb-16">
            <p className="inline-flex items-center gap-2 text-[14px] font-semibold text-white/80"><Chev className="h-2.5 w-4 text-white/60" />{t.k}</p>
            <h1 id="case-h" className="mt-4 max-w-[18ch] text-[clamp(36px,1rem+3vw,72px)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">{c.company}</h1>
            {c.quote !== undefined && <p className="mt-5 max-w-[34rem] text-[18px] leading-[1.5] text-[#E6E6E6]">“{v(c.quote)}”</p>}
            <p className="mt-3 text-[15px] text-[#B2B2B2]">{v(c.name)}, {v(c.title)}</p>
          </div>
        </section>
        <section aria-label={t.k} className="section-y">
          <div className="container-x"><PhotoBand img={c.img} blur dim={0.4} tone="center" className="p-3 md:p-5">
            <div className="grid gap-3 md:grid-cols-3">
              {([[t.p, c.story.problem], [t.s, c.story.solution], [t.r, c.story.result]] as const).map(([h, x], k) => (
                <div key={h} className={`${glassTile} p-6 md:p-8`}><h2 className="flex items-center justify-between gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">{h}<span className="tabular-nums text-white/40">0{k + 1}</span></h2>
                  <p className="mt-5 text-[18px] leading-[1.55] text-white/90">{v(x)}</p></div>))}
            </div>
            <div className="mt-3 flex flex-wrap gap-3 p-3 md:mt-5">
              <a href={SITE.demo} className="btn btn-primary group h-11 px-5 text-[15px]">{t.cta}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
              <Link href="/" className="btn btn-glass-2 h-11">{t.back}</Link>
            </div>
          </PhotoBand></div>
        </section>
      </main>
      <Footer />
    </>);
}
