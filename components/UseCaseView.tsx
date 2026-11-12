"use client";
import Link from "next/link";
import { I, Arr } from "./Icons";
import { SITE } from "./config";
import { Split } from "./ui/Split";
import { PhotoBand, glassTile } from "./ui/PhotoBand";
import { useLocale } from "./i18n/LocaleProvider";
import { base } from "./i18n/locales";
import type { UC, UCText } from "./UseCase";

/* Fixed labels of the use case template. Content per use case lives in UseCase.tsx (USE_CASES, USE_CASES_TR). */
const L = {
  en: { home: "Home", ucs: "Use cases", crumbs: "Breadcrumb", demo: "Book a demo", pricing: "See pricing", problem: "The problem", how: ["How it", "works"], howSub: "Film it. Approve it. Assign it.", faq: "Questions", out: "What changes" },
  tr: { home: "Ana sayfa", ucs: "Kullanım alanları", crumbs: "Sayfa yolu", demo: "Demo isteyin", pricing: "Fiyatları görün", problem: "Sorun", how: ["Nasıl", "çalışır"], howSub: "Çekin. Onaylayın. Atayın.", faq: "Sorular", out: "Neler değişir" },
};

export default function UseCaseView({ c: en, tr, band, rel }: { c: UC; tr?: UCText; band: [string, string]; rel: { slug: string; en: string; tr: string } }) {
  const lang = base(useLocale().locale) === "tr" && tr ? "tr" : "en"; const t = L[lang];
  const c: UCText = lang === "tr" && tr ? tr : en; const r = { slug: rel.slug, crumb: lang === "tr" ? rel.tr : rel.en };
  return (
    <main id="main">
      <section className="dark relative flex min-h-[88svh] items-end overflow-hidden pb-14 pt-36">
        <img src={en.img} alt={c.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="relative w-full container-x">
          <nav aria-label={t.crumbs} className="mono text-xs uppercase tracking-[.18em] text-white/70"><Link href="/" className="inline-flex min-h-11 items-center hover:text-white">{t.home}</Link> / <span>{t.ucs}</span> / <span className="text-white/80">{c.crumb}</span></nav>
          <p className="mono mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[.2em] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-ice-100" />{c.k}</p>
          <h1 className="display mt-4 max-w-[17ch] text-h1"><Split text={c.h1} /></h1>
          <p className="mt-5 max-w-[58ch] text-lg leading-[1.4] text-white/80">{c.lede}</p>
          <div className="mt-6 flex flex-wrap gap-3"><a href={SITE.demo} className="btn btn-cta">{t.demo} <Arr className="ml-1" /></a><Link href="/pricing/" className="btn-g">{t.pricing}</Link></div>
        </div>
      </section>
      <section className="section-y" aria-labelledby="uc-p">
        <div className="container-x">
          <p className="v4-h2 max-w-[22ch]"><span className="t-ink">{c.quote}</span></p>
          <PhotoBand img={band[0]} className="mt-12 p-5 sm:p-8 md:mt-16 md:p-12">
            <h2 id="uc-p" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">{t.problem}</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">{c.problem.map(([h, p], i) => <li key={h} className={`${glassTile} p-6 md:p-7`}><span className="text-[13px] font-semibold tabular-nums text-white/45">0{i + 1}</span><p className="mt-6 text-[19px] font-semibold tracking-[-0.02em]">{h}</p><p className="mt-2 text-[15px] leading-[1.55] text-white/70">{p}</p></li>)}</ul>
          </PhotoBand>
        </div>
      </section>
      <section className="section-y pt-0" aria-labelledby="uc-s">
        <div className="grid container-x gap-10 md:grid-cols-12">
          <div className="md:col-span-4"><h2 id="uc-s" className="v4-h2"><span className="t-ink">{t.how[0]}</span> <span className="t-accent">{t.how[1]}</span></h2><p className="mt-3 text-[16px] leading-[1.5] text-ink-muted">{t.howSub}</p></div>
          <ol className="grid gap-2 md:col-span-8">{c.steps.map(([h, p], i) => <li key={h} className="grid grid-cols-[3rem_1fr] gap-4 rounded-[22px] bg-[var(--card)] p-5 md:p-6"><span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[var(--card-2)] text-ink">{[<I.record key="a" size={20} />, <I.split key="b" size={20} />, <I.quiz key="c" size={20} />, <I.ready key="d" size={20} />][i]}</span><div><p className="text-[18px] font-semibold tracking-[-0.015em]">{h}</p><p className="mt-1.5 text-[15px] leading-[1.55] text-ink-muted">{p}</p></div></li>)}</ol>
        </div>
      </section>
      <section className="section-y pt-0" aria-labelledby="uc-f">
        <div className="grid container-x gap-10 md:grid-cols-12"><h2 id="uc-f" className="v4-h2 md:col-span-4"><span className="t-ink">{t.faq}</span></h2>
          <div className="grid gap-2 md:col-span-8">{c.faq.map((f) => <details key={f.q} className="group rounded-[22px] bg-[var(--card)] px-5 py-4 md:px-6"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-semibold tracking-[-0.01em]">{f.q}<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--card-2)] text-ink-muted transition group-open:rotate-45">+</span></summary><p className="mt-2 max-w-[62ch] pb-2 text-[15px] leading-[1.6] text-ink-muted">{f.a}</p></details>)}</div></div>
      </section>
      <section className="pb-[var(--section-y)]" aria-labelledby="uc-o"><div className="container-x">
        <PhotoBand img={band[1]} tone="center" className="px-5 py-12 text-center sm:px-10 md:py-20">
          <h2 id="uc-o" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">{t.out}</h2>
          <ul className="mx-auto mt-6 grid max-w-[60rem] gap-3 text-start md:grid-cols-3">{c.out.map((o) => <li key={o} className={`${glassTile} flex gap-3 p-5 text-[17px] font-semibold leading-[1.3] tracking-[-0.01em]`}><I.check size={20} className="tick mt-0.5 shrink-0" />{o}</li>)}</ul>
          <div className="mt-10 flex flex-wrap justify-center gap-3"><a href={SITE.demo} className="btn btn-cta h-11 px-5 text-[15px]">{t.demo} <Arr className="ms-1" /></a>
            <Link href={`/use-cases/${r.slug}/`} className="btn btn-glass-2 h-11 px-5 text-[15px]">{r.crumb}</Link></div>
        </PhotoBand>
      </div></section>
    </main>
  );
}
