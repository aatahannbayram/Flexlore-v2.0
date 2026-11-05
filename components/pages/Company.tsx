"use client";
import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { SITE } from "../config";
import { useLocale } from "../i18n/LocaleProvider";
import { COMPANY } from "./copy";
import { Pic, Label, card } from "../home/home5";
import { Reveal, RevealItem, EASE } from "../ui/Reveal";
import { Buildings, BookOpen, Eye, Sparkle, ArrowRight } from "../ui/icons";

export function CompanyPage() {
  const { locale, d } = useLocale(); const c = COMPANY[locale]; const reduce = useReducedMotion();
  const tl = useRef<HTMLDivElement>(null); const seen = useInView(tl, { amount: 0.4, once: true });
  const icons = [BookOpen, Eye, Sparkle];
  return (<>
    <section aria-labelledby="co-h" className="pb-16 pt-32 md:pt-40">
      <div className="container-x grid items-end gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Label icon={Buildings}>{c.k}</Label>
          <h1 id="co-h" className="v3-h1 mt-5 max-w-[16ch]">{c.h[0]} <span className="text-ink-faint">{c.h[1]}</span></h1>
          <p className="lead mt-5 max-w-[34rem]">{c.p}</p>
          <dl className="mt-8 flex flex-wrap gap-2">{c.facts.map(([k, v]) => (
            <div key={k} className="rounded-full bg-[var(--card)] px-4 py-2 text-[14px]"><dt className="sr-only">{k}</dt><dd>{v.includes("@") ? <a href={`mailto:${v}`} className="hover:underline">{v}</a> : v}</dd></div>))}</dl>
        </div>
        <Reveal stagger={0.08} className="grid h-[420px] grid-cols-[1.25fr_1fr] gap-3 md:h-[500px]">
          <RevealItem className="relative overflow-hidden rounded-[28px]"><Pic n="huddle" eager sizes="(min-width:1024px) 30vw, 55vw" className="absolute inset-0 h-full w-full object-cover" /></RevealItem>
          <div className="grid gap-3">
            <RevealItem className="relative overflow-hidden rounded-[28px]"><Pic n="bakery" sizes="(min-width:1024px) 22vw, 45vw" className="absolute inset-0 h-full w-full object-cover" /></RevealItem>
            <RevealItem className="relative overflow-hidden rounded-[28px]"><Pic n="qr-scan" sizes="(min-width:1024px) 22vw, 45vw" className="absolute inset-0 h-full w-full object-cover" /></RevealItem>
          </div>
        </Reveal>
      </div>
    </section>

    <section aria-label={c.cards.map((x) => x[0]).join(", ")} className="section-y pt-0">
      <Reveal stagger={0.08} className="container-x grid gap-3 md:grid-cols-3">
        {c.cards.map(([h, p], i) => { const I = icons[i]; return (
          <RevealItem key={h} className={`${card} p-6 md:p-8`}>
            <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[var(--card-2)] text-ink"><I size={18} /></span>
            <h2 className="mt-8 text-[22px] font-semibold tracking-[-.02em]">{h}</h2>
            <p className="mt-3 text-[16px] leading-[1.55] text-ink-muted">{p}</p>
          </RevealItem>); })}
      </Reveal>
    </section>

    <section aria-labelledby="tl-h" className="section-y pt-0">
      <div className="container-x">
        <h2 id="tl-h" className="v3-h2 max-w-[18ch]">{c.tl}</h2>
        <div ref={tl} className="relative mt-12">
          <span aria-hidden="true" className="absolute inset-x-0 top-[7px] hidden h-px bg-line md:block" />
          <m.span aria-hidden="true" className="absolute inset-x-0 top-[7px] hidden h-px origin-left bg-ink md:block rtl:origin-right"
            initial={{ scaleX: reduce ? 1 : 0 }} animate={{ scaleX: seen || reduce ? 1 : 0 }} transition={{ duration: 1.6, ease: EASE }} />
          <Reveal as="ol" stagger={0.25} className="grid gap-8 md:grid-cols-4 md:gap-6">
            {c.timeline.map(([y, h, p], i) => (
              <RevealItem as="li" key={h} className="relative ps-7 md:ps-0 md:pt-10">
                <span aria-hidden="true" className={`absolute start-0 top-1 h-[15px] w-[15px] rounded-full ring-4 ring-bg md:top-0 ${i === c.timeline.length - 1 ? "bg-flame" : "bg-ink"}`} />
                <p className="text-[14px] font-semibold tabular-nums text-ink-faint">{y}</p>
                <h3 className="mt-2 text-[19px] font-semibold tracking-[-.015em]">{h}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{p}</p>
              </RevealItem>))}
          </Reveal>
        </div>
      </div>
    </section>

    <section aria-label={c.programs} className="section-y pt-0">
      <div className="container-x">
        <div className={`${card} flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8`}>
          <div><p className="text-[14px] text-ink-faint">{c.programs}</p>
            <ul className="mt-3 flex flex-wrap gap-2">{SITE.programs.map((p) => <li key={p.name}><a href={p.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full bg-[var(--card-2)] px-4 text-[14px] font-medium hover:bg-[var(--card-2)]/70">{p.name}</a></li>)}</ul></div>
          <a href={SITE.demo} className="btn btn-primary shrink-0">{d.end.cta}<ArrowRight size={15} aria-hidden="true" className="ms-1 rtl:-scale-x-100" /></a>
        </div>
      </div>
    </section>
  </>);
}
