"use client";
/* Customer page (/customers/<slug>/), one per company on the home carousel. It shows only what is approved for the
 * carousel (company, sector, one-line descriptor, photo, logo where we have it). The story (problem, solution, result)
 * and the quote appear only when filled in components/v3/cases.ts; until then a "case study coming soon" card stands in
 * their place. Never invent a quote, a person or a number. Pages stay noindex until the case is approved and complete
 * (app/customers/[slug]/page.tsx). Frame copy is TR/EN; sector and descriptor follow the visitor's language. */
import Link from "../i18n/Link";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useLocale } from "../i18n/LocaleProvider";
import { HOME4 } from "../i18n/home4";
import { SITE } from "../config";
import { CASES } from "./cases";
import { LOGOS, CaseLogo } from "./logos";
import { Photo } from "./Top";
import { ForkKnife, Storefront, Factory, HardHat, ArrowUpRight } from "../ui/icons";

const SEC_IC = { food: ForkKnife, franchise: Storefront, mfg: Factory, build: HardHat } as const;
const T = {
  en: { k: "Customers", p: "The problem", s: "What they did", r: "The result", soonH: "Their story is on its way.", soonP: "We are writing this case study with the team. Until then, see how Flexlore works for teams like theirs in a short demo.", cta: "Book a demo", back: "All customers", more: "Other teams on Flexlore", home: "Home", crumb: "Breadcrumb" },
  tr: { k: "Müşteriler", p: "Sorun", s: "Çözüm", r: "Sonuç", soonH: "Hikâyeleri yolda.", soonP: "Bu vaka çalışmasını ekiple birlikte hazırlıyoruz. O zamana kadar Flexlore'un benzer ekiplerde nasıl çalıştığını kısa bir demoda görün.", cta: "Demo isteyin", back: "Tüm müşteriler", more: "Flexlore ile çalışan diğer ekipler", home: "Ana sayfa", crumb: "Sayfa yolu" },
};

export default function CasePage({ slug }: { slug: string }) {
  const { lang, locale } = useLocale(); const t = T[lang]; const h4 = HOME4[locale].cases;
  const c = CASES.find((x) => x.slug === slug) ?? CASES[0]; const I = SEC_IC[c.sec];
  const story = ([[t.p, c.story.problem], [t.s, c.story.solution], [t.r, c.story.result]] as const).filter(([, x]) => x);
  const others = CASES.filter((x) => x.slug !== c.slug);
  return (
    <>
      <Header overDark />
      <main id="main">
        <section aria-labelledby="case-h" className="dark relative isolate overflow-hidden bg-[#111111] pt-[var(--header-h)]">
          <div aria-hidden="true" className="absolute inset-0"><Photo n={c.img} portrait priority sizes="100vw" className="h-full w-full object-cover" /></div>
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,#111111_0%,rgb(17_17_17/0.55)_45%,rgb(17_17_17/0.3)_80%,rgb(17_17_17/0.6)_100%)]" />
          <div className="container-x relative flex min-h-[min(78svh,720px)] flex-col justify-end pb-12 md:pb-16">
            <nav aria-label={t.crumb} className="text-[14px] text-white/70"><Link href="/" className="inline-flex min-h-11 items-center hover:text-white">{t.home}</Link><span aria-hidden="true" className="px-2">/</span><Link href="/#customers" className="inline-flex min-h-11 items-center hover:text-white">{t.k}</Link></nav>
            <span className="mt-3 inline-flex w-max items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur-md ring-1 ring-inset ring-white/15"><I size={14} aria-hidden="true" />{h4.sec[c.sec]}</span>
            <h1 id="case-h" className="mt-5 max-w-[18ch] text-[clamp(36px,1rem+3vw,72px)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
              {LOGOS[c.slug] ? <><span className="sr-only">{c.company}</span><span aria-hidden="true" className="flex"><CaseLogo slug={c.slug} name={c.company} /></span></> : c.company}</h1>
            <p className="mt-4 max-w-[34rem] text-[18px] leading-[1.5] text-white/80">{h4.desc[c.desc]}</p>
            {c.quote && c.name && <p className="mt-6 max-w-[38rem] text-[18px] leading-[1.5] text-white">“{c.quote}”<span className="mt-2 block text-[15px] text-white/60">{c.name}{c.title ? `, ${c.title}` : ""}</span></p>}
          </div>
        </section>

        <section aria-label={t.k} className="section-y">
          <div className="container-x">
            {story.length ? (
              <div className="grid gap-3 md:grid-cols-3">{story.map(([h, x], k) => (
                <div key={h} className="rounded-[24px] bg-[var(--card)] p-6 md:p-8"><h2 className="flex items-center justify-between gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{h}<span className="tabular-nums">0{k + 1}</span></h2>
                  <p className="mt-5 text-[18px] leading-[1.55] text-ink">{x}</p></div>))}</div>
            ) : (
              <div className="grid gap-8 border-y border-line py-10 md:grid-cols-12 md:items-center md:py-14">
                <div className="md:col-span-7"><h2 className="text-[28px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[40px]">{t.soonH}</h2>
                  <p className="mt-4 max-w-[34rem] text-[16px] leading-[1.6] text-ink-muted">{t.soonP}</p></div>
                <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
                  <a href={SITE.demo} className="btn btn-cta h-11 px-5">{t.cta}</a>
                  <Link href="/#customers" className="btn btn-secondary h-11 px-5">{t.back}</Link></div>
              </div>)}

            <h2 className="mt-16 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint md:mt-20">{t.more}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{others.map((o) => (
              <li key={o.slug}><Link href={`/customers/${o.slug}/`} className="group dark relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[20px] bg-[#171717] p-5 text-white">
                <Photo n={o.img} portrait sizes="(min-width:1024px) 25vw, 50vw" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(17_17_17/0.9)_0%,rgb(17_17_17/0.2)_60%)]" />
                <span className="flex items-start justify-between gap-3 text-[18px] font-semibold leading-snug tracking-[-0.02em]">{o.company}<ArrowUpRight size={16} aria-hidden="true" className="mt-1 shrink-0 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" /></span>
                <span className="mt-1 text-[14px] text-white/70">{h4.desc[o.desc]}</span></Link></li>))}</ul>
          </div>
        </section>
      </main>
      <Footer />
    </>);
}
