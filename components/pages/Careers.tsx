"use client";
/* Careers (/careers/), written for people who might join: an ember hero with three facts and the programs that back us,
 * then why join, how we work (where information lives), the first week, and open roles with one general application
 * card. Roles come from ROLES (careers-copy.ts). Turkish visitors get the Turkish copy, everyone else English. */
import Link from "next/link";
import { useLocale } from "../i18n/LocaleProvider";
import { CAREERS, CAREERS_EMAIL, ROLES } from "./careers-copy";
import { TrustStrip } from "../home/TrustStrip";
import { ArrowRight, EnvelopeSimple, Check } from "../ui/icons";

const mail = (subject: string) => `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}`;
const K = ({ children }: { children: React.ReactNode }) => <p className="text-[14px] font-medium text-ink-faint">{children}</p>;

export function CareersPage() {
  const { locale } = useLocale(); const lang = locale === "tr" ? "tr" : "en"; const c = CAREERS[lang];
  return (
    <article lang={lang}>
      <header className="ember dark pt-[calc(var(--header-h)+56px)] text-white md:pt-[calc(var(--header-h)+96px)]">
        <div className="container-x">
          <p className="text-[14px] text-white/60">{c.k}</p>
          <h1 className="mt-8 max-w-[15ch] text-[clamp(44px,1rem+4.4vw,96px)] font-semibold leading-[0.97] tracking-[-0.05em] [text-wrap:balance]">
            <span className="t-ink">{c.h[0]}</span> <span className="t-accent">{c.h[1]}</span></h1>
          <p className="mt-6 max-w-[38rem] text-[18px] leading-[1.6] text-white/70">{c.p}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#roles" className="btn btn-cta h-11 px-5">{c.roles.k}</a>
            <a href={mail(c.send.subject)} className="btn btn-glass-2 h-11 px-5"><EnvelopeSimple size={16} aria-hidden="true" />{c.send.cta}</a>
          </div>
          <span aria-hidden="true" className="ember-line mt-12 block md:mt-16" />
          <dl className="grid gap-6 pt-6 sm:grid-cols-3">
            {c.facts.map(([k, v]) => (
              <div key={k}><dt className="text-[13px] text-white/50">{k}</dt><dd className="mt-1 text-[16px] font-medium leading-snug text-white">{v}</dd></div>))}
          </dl>
        </div>
        <div className="pb-12 pt-14 md:pb-16"><TrustStrip as="div" lang={lang} label={c.programs} /></div>
      </header>

      <section aria-labelledby="cr-why" className="section-y">
        <div className="container-x">
          <K>{c.why.k}</K>
          <h2 id="cr-why" className="v4-h2 mt-3 max-w-[18ch]">{c.why.h}</h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {c.why.items.map(([h, p], i) => (
              <li key={h} className="flex min-h-[230px] flex-col rounded-[24px] bg-[var(--card)] p-7">
                <span aria-hidden="true" className="text-[13px] font-medium tabular-nums text-ink-faint">0{i + 1}</span>
                <h3 className="mt-auto pt-10 text-[21px] font-semibold leading-tight tracking-[-0.02em]">{h}</h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-ink-muted">{p}</p>
              </li>))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="cr-how" className="section-y pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <K>{c.how.k}</K>
            <h2 id="cr-how" className="v4-h2 mt-3 max-w-[14ch]">{c.how.h}</h2>
            <p className="mt-4 max-w-[26rem] text-[17px] leading-[1.6] text-ink-muted">{c.how.p}</p>
          </div>
          <dl className="border-t border-line">
            {c.how.items.map(([h, p]) => (
              <div key={h} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[200px_1fr] sm:gap-6">
                <dt className="text-[17px] font-semibold tracking-[-0.01em]">{h}</dt>
                <dd className="text-[16px] leading-[1.6] text-ink-muted">{p}</dd>
              </div>))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="cr-week" className="section-y pt-0">
        <div className="container-x">
          <K>{c.week.k}</K>
          <h2 id="cr-week" className="v4-h2 mt-3 max-w-[18ch]">{c.week.h}</h2>
          <p className="mt-4 max-w-[36rem] text-[17px] leading-[1.6] text-ink-muted">{c.week.p}</p>
          <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            <span aria-hidden="true" className="absolute inset-x-0 top-[7px] hidden h-px bg-[linear-gradient(90deg,var(--color-line-strong),rgb(236_103_38/0.6),var(--color-line-strong))] md:block" />
            {c.week.steps.map(([t, h, p], i) => (
              <li key={t} className="relative ps-7 md:ps-0 md:pt-10">
                <span aria-hidden="true" className={`absolute start-0 top-1 h-[15px] w-[15px] rounded-full ring-4 ring-bg md:top-0 ${i === 1 ? "bg-flame" : "bg-ink-faint"}`} />
                <p className="text-[14px] font-semibold text-ink-faint">{t}</p>
                <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.015em]">{h}</h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-ink-muted">{p}</p>
              </li>))}
          </ol>
          <div className="mt-14 flex flex-wrap items-center gap-2">
            <p className="me-2 text-[14px] text-ink-faint">{c.week.tools}</p>
            {c.week.toolList.map((t) => <span key={t} className="rounded-full bg-[var(--card)] px-3.5 py-1.5 text-[14px] text-ink-muted">{t}</span>)}
          </div>
        </div>
      </section>

      <section id="roles" aria-labelledby="cr-roles" className="section-y scroll-mt-[calc(var(--header-h)+24px)] pt-0">
        <div className="container-x">
          <K>{c.roles.k}</K>
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
    </article>);
}
