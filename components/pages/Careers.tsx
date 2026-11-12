"use client";
/* Careers (/careers/). Same language as the KVKK page: an ember hero with three facts, then calm sections on the ground
 * and one photo band at the end. Roles come from ROLES (careers-copy.ts); with none open, the page shows one general
 * application card. Turkish visitors get the Turkish copy, everyone else English. */
import Link from "next/link";
import { useLocale } from "../i18n/LocaleProvider";
import { CAREERS, CAREERS_EMAIL, ROLES } from "./careers-copy";
import { PhotoBand } from "../ui/PhotoBand";
import { ArrowRight, EnvelopeSimple, Check } from "../ui/icons";

const mail = (subject: string) => `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}`;

export function CareersPage() {
  const { locale } = useLocale(); const lang = locale === "tr" ? "tr" : "en"; const c = CAREERS[lang];
  return (
    <article lang={lang}>
      <header className="ember dark pb-14 pt-[calc(var(--header-h)+56px)] text-white md:pb-20 md:pt-[calc(var(--header-h)+96px)]">
        <div className="container-x">
          <p className="text-[14px] text-white/60">{c.k}</p>
          <h1 className="mt-8 max-w-[14ch] text-[clamp(44px,1rem+4.4vw,96px)] font-semibold leading-[0.97] tracking-[-0.05em] [text-wrap:balance]">
            <span className="t-ink">{c.h[0]}</span> <span className="t-accent">{c.h[1]}</span></h1>
          <p className="mt-6 max-w-[38rem] text-[18px] leading-[1.6] text-white/70">{c.p}</p>
          <span aria-hidden="true" className="ember-line mt-12 block md:mt-16" />
          <dl className="grid gap-6 pt-6 sm:grid-cols-3">
            {c.facts.map(([k, v]) => (
              <div key={k}><dt className="text-[13px] text-white/50">{k}</dt><dd className="mt-1 text-[16px] font-medium leading-snug text-white">{v}</dd></div>))}
          </dl>
        </div>
      </header>

      <section aria-labelledby="cr-work" className="section-y">
        <div className="container-x">
          <p className="text-[14px] font-medium text-ink-faint">{c.work.k}</p>
          <h2 id="cr-work" className="v4-h2 mt-3 max-w-[18ch]">{c.work.h}</h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {c.work.items.map(([h, p], i) => (
              <li key={h} className="flex min-h-[220px] flex-col rounded-[24px] bg-[var(--card)] p-7">
                <span aria-hidden="true" className="text-[13px] font-medium tabular-nums text-ink-faint">0{i + 1}</span>
                <h3 className="mt-auto pt-10 text-[21px] font-semibold leading-tight tracking-[-0.02em]">{h}</h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-ink-muted">{p}</p>
              </li>))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="cr-how" className="section-y pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="text-[14px] font-medium text-ink-faint">{c.how.k}</p>
            <h2 id="cr-how" className="v4-h2 mt-3 max-w-[14ch]">{c.how.h}</h2>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {c.how.items.map(([h, p]) => (
              <div key={h} className="border-t border-line py-6">
                <dt className="text-[18px] font-semibold tracking-[-0.015em]">{h}</dt>
                <dd className="mt-2 text-[16px] leading-[1.6] text-ink-muted">{p}</dd>
              </div>))}
          </dl>
        </div>
      </section>

      <section id="roles" aria-labelledby="cr-roles" className="section-y scroll-mt-[calc(var(--header-h)+24px)] pt-0">
        <div className="container-x">
          <p className="text-[14px] font-medium text-ink-faint">{c.roles.k}</p>
          <h2 id="cr-roles" className="v4-h2 mt-3">{c.roles.h}</h2>
          {ROLES.length > 0 && (
            <ul className="mt-10 border-t border-line">{ROLES.map((r) => (
              <li key={r.title} className="grid gap-3 border-b border-line py-6 md:grid-cols-[1.2fr_1fr_auto] md:items-center md:gap-8">
                <div><h3 className="text-[20px] font-semibold tracking-[-0.02em]">{r.title}</h3><p className="mt-1 text-[15px] leading-[1.55] text-ink-muted">{r.summary}</p></div>
                <p className="text-[15px] text-ink-muted">{[r.team, r.place, r.type].join(" · ")}</p>
                <a href={mail(`${c.k}: ${r.title}`)} className="btn btn-cta h-11 justify-self-start px-5">{c.roles.apply}</a>
              </li>))}</ul>)}
          <div className="ember ember-sm dark mt-10 grid gap-10 rounded-[28px] p-7 text-white md:grid-cols-[1.1fr_1fr] md:p-10">
            <div>
              <h3 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[34px]">{ROLES.length ? c.send.h : c.roles.none}</h3>
              <p className="mt-3 max-w-[30rem] text-[16px] leading-[1.6] text-white/65">{ROLES.length ? c.send.p : c.roles.noneP}</p>
              <a href={mail(c.send.subject)} className="btn btn-cta mt-8 h-11 px-5"><EnvelopeSimple size={16} aria-hidden="true" />{c.send.cta}</a>
              <p className="mt-3 text-[14px] text-white/50">{CAREERS_EMAIL}</p>
            </div>
            <div>
              {!ROLES.length && <p className="text-[15px] font-medium text-white/80">{c.send.p}</p>}
              <ul className="mt-4 space-y-3">{c.send.items.map((x) => (
                <li key={x} className="flex gap-3 text-[16px] leading-[1.5] text-white/85">
                  <span aria-hidden="true" className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10"><Check size={11} /></span>{x}</li>))}</ul>
              <Link href={c.send.privacy[1]} className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[14px] text-white/60 hover:text-white">{c.send.privacy[0]}<ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="cr-band" className="section-y pt-0">
        <div className="container-x">
          <PhotoBand img="saha-cati-siluet" pos="60% 45%" tone="side" dim={0.7} className="flex min-h-[360px] flex-col justify-end p-7 md:min-h-[440px] md:p-12">
            <h2 id="cr-band" className="max-w-[16ch] text-[clamp(30px,1rem+2.4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em]">{c.band.h}</h2>
            <p className="mt-3 max-w-[30rem] text-[17px] leading-[1.6] text-white/70">{c.band.p}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={c.band.a[1]} className="btn btn-glass-2 h-11 px-5">{c.band.a[0]}</Link>
              <Link href={c.band.b[1]} className="btn btn-glass-2 h-11 px-5">{c.band.b[0]}</Link>
            </div>
          </PhotoBand>
        </div>
      </section>
    </article>);
}
