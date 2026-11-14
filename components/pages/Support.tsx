"use client";
import { useState } from "react";
import Link, { useHref } from "../i18n/Link";
import { SITE } from "../config";
import { useLocale } from "../i18n/LocaleProvider";
import { SUPPORT } from "./copy";
import { TrustNote } from "../trust/TrustNote";
import { HELP } from "./copy-help";
import { Pic } from "../home/home5";
import { Split } from "../ui/Split";
import { PhotoBand, glassTile, glassIcon } from "../ui/PhotoBand";
import { StoreButtons } from "../Icons";
import { Lifebuoy, ArrowRight, ArrowUpRight, EnvelopeSimple, CalendarBlank, CheckCircle, Question, Check } from "../ui/icons";

/* Shared look for the help pages: glass cards on the page ground, pill buttons, big headings with one payoff word. */
export const glass = "rounded-[28px] bg-[var(--card)]";
export const h1 = "text-[clamp(40px,1rem+3.6vw,76px)] font-semibold leading-[0.98] tracking-[-0.05em] [text-wrap:balance]";
export const pill = "btn !rounded-full";
/** Bright orange tick: the one orange mark on these pages besides the heading word. */
export const Tick = () => <Check size={16} aria-hidden="true" className="mt-[3px] shrink-0 text-[#FF8A4C]" />;
export const Kicker = ({ icon: I, children }: { icon: typeof Lifebuoy; children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
    <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--card)] text-ink"><I size={15} aria-hidden="true" /></span>{children}</p>);

const field = "block w-full rounded-[14px] bg-[var(--card-2)] px-4 text-[16px] text-ink outline-none transition-shadow placeholder:text-ink-faint";

/* Support: a big heading, three quick routes (email, FAQ, demo), then the message form beside a photo card listing what
 * we help with, the app and the legal pages; a band into the FAQ closes it. The site is static, so the form composes an
 * email to support@flexlore.com instead of posting to a server. */
export function SupportPage() {
  const lh = useHref();
  const { locale, lang } = useLocale(); const c = SUPPORT[locale]; const h = HELP[locale].sup; const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget); const v = (k: string) => String(f.get(k) || "").trim();
    const subject = `[${v("topic") || "Support"}] ${v("name")}`;
    const body = `${v("message")}\n\n${v("name")}\n${v("email")}${v("phone") ? `\n${v("phone")}` : ""}`;
    window.location.href = `mailto:support@flexlore.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const quick: [string, typeof Lifebuoy, boolean][] = [["mailto:support@flexlore.com", EnvelopeSimple, true], ["/faq/", Question, false], [SITE.demo, CalendarBlank, true]];
  return (<>
    <section aria-labelledby="sup-h" className="pb-4 pt-32 md:pt-44">
      <div className="container-x">
        <Kicker icon={Lifebuoy}>{c.k}</Kicker>
        <h1 id="sup-h" className={`${h1} mt-6 max-w-[14ch]`}>{h.h1a} <span className="t-accent">{h.h1b}</span></h1>
        <p className="lead mt-5 max-w-[34rem]">{h.lead}</p>
        <ul className="mt-10 grid border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-line md:mt-14 rtl:sm:divide-x-reverse">
          {h.quick.map(([t, line], k) => { const [href, I, ext] = quick[k]; const inner = (<>
            <I size={20} aria-hidden="true" className="shrink-0 text-ink-faint transition-colors group-hover:text-ink" />
            <span className="min-w-0 flex-1"><span className="block text-[16px] font-medium text-ink">{t}</span><span className="block truncate text-[14px] text-ink-muted">{line}</span></span>
            <ArrowUpRight size={16} aria-hidden="true" className="shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink rtl:-scale-x-100" /></>);
            const cls = `group flex min-h-[92px] items-center gap-4 border-b border-line px-1 py-5 transition-colors last:border-b-0 sm:border-b-0 sm:px-6 sm:first:ps-0`;
            return (<li key={t}>{ext ? <a href={lh(href)} className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>}</li>); })}
        </ul>
        <TrustNote className="mt-4" />
      </div>
    </section>

    <section aria-labelledby="sup-form" className="section-y pt-12 md:pt-16">
      <div className="container-x grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <div className={`${glass} p-6 md:p-10`}>
          <h2 id="sup-form" className="text-[24px] font-semibold tracking-[-0.03em] md:text-[28px]">{h.formH}</h2>
          <p className="mt-2 text-[15px] text-ink-muted">{c.p}</p>
          {sent ? (
            <p role="status" className="mt-8 flex items-start gap-3 rounded-[16px] bg-[var(--card-2)] p-5 text-[16px]"><CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-ink" />{c.sent}</p>
          ) : (
            <form onSubmit={submit} className="mt-8 grid gap-3 sm:grid-cols-2">
              <label className="sm:col-span-2"><span className="mb-1.5 block text-[14px] font-medium text-ink-muted">{c.name}</span><input name="name" required autoComplete="name" className={`${field} h-12`} /></label>
              <label><span className="mb-1.5 block text-[14px] font-medium text-ink-muted">{c.email}</span><input name="email" type="email" required autoComplete="email" className={`${field} h-12`} /></label>
              <label><span className="mb-1.5 block text-[14px] font-medium text-ink-muted">{c.phone}</span><input name="phone" type="tel" autoComplete="tel" className={`${field} h-12`} /></label>
              <label className="sm:col-span-2"><span className="mb-1.5 block text-[14px] font-medium text-ink-muted">{c.topic}</span>
                <select name="topic" required defaultValue="" className={`${field} h-12 appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat rtl:bg-[left_1rem_center]`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='%238A8A8A'%3E%3Cpath d='M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32z'/%3E%3C/svg%3E\")" }}>
                  <option value="" disabled>{c.topicPh}</option>{c.topics.map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
              <label className="sm:col-span-2"><span className="mb-1.5 block text-[14px] font-medium text-ink-muted">{c.message}</span><textarea name="message" required rows={5} className={`${field} resize-y py-3`} /></label>
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-ink-faint">{c.note}</p>
                <button type="submit" className={`${pill} btn-primary h-12 shrink-0 px-6`}>{c.send}<ArrowRight size={15} aria-hidden="true" className="ms-1 rtl:-scale-x-100" /></button>
              </div>
            </form>)}
        </div>

        <div className="grid gap-3">
          <div className="dark relative min-h-[340px] overflow-hidden rounded-[28px] bg-[#171717] text-white">
            <Pic n="warehouse" sizes="(min-width:1024px) 45vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.1)_20%,rgb(16_16_16/0.92)_100%)]" />
            <div className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7">
              <p className="text-[19px] font-semibold tracking-[-0.02em]">{h.helpH}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">{h.help.map((x) => <li key={x} className="flex items-start gap-2 text-[14px] leading-snug text-white/85"><Tick />{x}</li>)}</ul>
            </div>
          </div>
          <div className={`${glass} p-6 md:p-7`}>
            <p className="text-[17px] font-semibold">{h.appH}</p>
            <p className="mt-1 text-[14px] text-ink-muted">{h.appP}</p>
            <StoreButtons lang={lang} className="mt-4" />
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-faint">{h.legalH}</p>
              <ul className="mt-3 flex flex-wrap gap-2">{h.legal.map(([href, t]) => (
                <li key={href}><Link href={href} className="inline-flex min-h-11 items-center rounded-full bg-[var(--card-2)] px-4 text-[14px] text-ink-muted transition-colors hover:text-ink">{t}</Link></li>))}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="sup-faq" className="section-y pt-0">
      <div className="container-x">
        <PhotoBand img="cafe-opening" pos="50% 40%" className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-12">
          <div><span className={glassIcon}><Question size={18} aria-hidden="true" /></span>
            <h2 id="sup-faq" className="mt-5 text-[26px] font-semibold tracking-[-0.03em] md:text-[34px]"><Split text={h.faqH} /></h2><p className="mt-2 max-w-[36rem] text-[15px] text-white/70 md:text-[16px]">{h.faqP}</p></div>
          <Link href="/faq/" className={`${pill} btn-primary h-12 shrink-0 self-start px-6 md:self-auto`}>{h.faqCta}<ArrowRight size={15} aria-hidden="true" className="ms-1 rtl:-scale-x-100" /></Link>
        </PhotoBand>
      </div>
    </section>
  </>);
}
