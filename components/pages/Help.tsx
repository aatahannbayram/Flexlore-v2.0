"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { SITE, PRICING_FAQ, PRICING_FAQ_TR } from "../config";
import { useLocale } from "../i18n/LocaleProvider";
import { HELP } from "./copy-help";
import { useTrustTR } from "../trust/flags";
import { TRUST_TR_LABEL } from "../trust/labels";
import { Pic } from "../home/home5";
import { PhotoBand, glassIcon } from "../ui/PhotoBand";
import { Split } from "../ui/Split";
import { StoreButtons } from "../Icons";
import { glass, h1, pill, Kicker } from "./Support";
import { ArrowRight, ArrowUpRight, LockSimple, Question, MagnifyingGlass, Plus, X } from "../ui/icons";

/* ---------- Log in ----------
 * The site is static and holds no accounts, so this page is a handoff, not a form: one clear button into the web app
 * (SITE.login), the store buttons for the mobile app, and two quiet ways out (book a demo, get help). A large field photo
 * on one side carries the brand line; the panel on the other side is glass. Not indexed (see app/login/page.tsx). */
export function LoginPage() {
  const { locale, lang } = useLocale(); const c = HELP[locale].login;
  return (
    <section aria-labelledby="login-h" className="pb-10 pt-[calc(var(--header-h)+20px)] md:pb-16 md:pt-[calc(var(--header-h)+32px)]">
      <div className="container-x grid gap-3 lg:min-h-[min(calc(100svh-var(--header-h)-64px),760px)] lg:grid-cols-[1.15fr_1fr]">
        <div className="dark relative min-h-[300px] overflow-hidden rounded-[32px] bg-[#171717] text-white sm:min-h-[380px] lg:order-first lg:min-h-0">
          <Pic n="hero-sef" eager sizes="(min-width:1024px) 55vw, 100vw" className="absolute inset-0 h-full w-full object-cover object-[70%_40%]" />
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.05)_30%,rgb(16_16_16/0.88)_100%)]" />
          <div className="absolute inset-x-4 bottom-4 rounded-[22px] bg-[rgb(20_20_20/0.8)] p-5 md:inset-x-6 md:bottom-6 md:p-6">
            <p className="text-[clamp(22px,1rem+1.2vw,32px)] font-semibold leading-tight tracking-[-0.03em]">{c.cap1}</p>
            <p className="mt-1.5 text-[15px] text-white/75">{c.cap2}</p>
          </div>
        </div>
        <div className={`${glass} flex flex-col justify-center p-6 sm:p-10 lg:p-14`}>
          <Kicker icon={LockSimple}>{c.k}</Kicker>
          <h1 id="login-h" className={`${h1} mt-6`}>{c.h1a}{c.h1b && <> <span className="t-accent">{c.h1b}</span></>}</h1>
          <p className="mt-4 max-w-[28rem] text-[16px] leading-[1.55] text-ink-muted md:text-[17px]">{c.p}</p>
          <a href={SITE.login} className={`${pill} btn-primary mt-8 h-14 w-full justify-between px-6 text-[16px]`}>{c.web}<ArrowUpRight size={18} aria-hidden="true" className="rtl:-scale-x-100" /></a>
          <p className="mt-2.5 text-[13px] text-ink-faint">{c.webNote}</p>
          <div className="mt-8 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-faint"><span className="h-px flex-1 bg-line" />{c.or}<span className="h-px flex-1 bg-line" /></div>
          <p className="mt-4 text-[14px] text-ink-muted">{c.appP}</p>
          <StoreButtons lang={lang} className="mt-3" />
          <div className="mt-10 grid gap-2 border-t border-line pt-6 text-[14px] sm:grid-cols-2">
            <p className="text-ink-muted">{c.noAcc}<a href={SITE.demo} className="flex min-h-11 items-center gap-1.5 font-semibold text-ink hover:underline">{c.demo}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a></p>
            <p className="text-ink-muted">{c.trouble}<Link href="/support/" className="flex min-h-11 items-center gap-1.5 font-semibold text-ink hover:underline">{c.support}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link></p>
          </div>
        </div>
      </div>
    </section>);
}

/* ---------- FAQ ----------
 * Every answered question on the site in one place: the product questions (the home page FAQ, all 8 languages) and, where
 * the pricing FAQ is written (English and Turkish), pricing and billing. A search box filters as you type; chips pick a
 * group; each question opens in place. JSON-LD (FAQPage) is in app/faq/page.tsx. */
type Item = { q: string; a: string; g: "product" | "pricing"; href?: string; link?: string };
const fixPricing = (a: string) => a.replace("listed on this page", "listed on the pricing page").replace("bu sayfada", "fiyatlar sayfasında");
export function FaqPage() {
  const { locale, d } = useLocale(); const c = HELP[locale].faq; const trust = useTrustTR();
  const items = useMemo<Item[]>(() => {
    const pr = locale === "tr" ? PRICING_FAQ_TR : locale === "en" ? PRICING_FAQ : [];
    const seen = new Set(d.faq.items.map(([q]) => q.trim().toLowerCase()));
    return [...d.faq.items.map(([q, a]) => ({ q, a, g: "product" as const })),
      ...pr.filter(({ q }) => !seen.has(q.trim().toLowerCase())).map(({ q, a }) => ({ q, a: fixPricing(a), g: "pricing" as const })),
      // Türkiye visitors only (components/trust/config.ts): one item pointing to the data and KVKK page.
      ...(trust ? [(({ faqQ, faqA, faqLink }) => ({ q: faqQ, a: faqA, g: "product" as const, href: trust.href, link: faqLink }))(TRUST_TR_LABEL[trust.tr ? "tr" : "en"])] : [])];
  }, [d, locale, trust]);
  const [term, setTerm] = useState(""); const [grp, setGrp] = useState<"all" | Item["g"]>("all"); const [open, setOpen] = useState<string | null>(null);
  const norm = (s: string) => s.toLocaleLowerCase(locale);
  const shown = items.filter((x) => (grp === "all" || x.g === grp) && (!term.trim() || norm(x.q + " " + x.a).includes(norm(term.trim()))));
  const groups = (["product", "pricing"] as const).filter((g) => items.some((x) => x.g === g));
  return (<>
    <section aria-labelledby="faq-h" className="pb-4 pt-32 md:pt-44">
      <div className="container-x">
        <Kicker icon={Question}>{c.k}</Kicker>
        <h1 id="faq-h" className={`${h1} mt-6 max-w-[14ch]`}>{c.h1a} <span className="t-accent">{c.h1b}</span></h1>
        <p className="lead mt-5 max-w-[34rem]">{c.p}</p>
        <div className="mt-10 flex flex-col gap-3 md:mt-12 md:flex-row md:items-center">
          <label className="relative block md:w-[min(460px,50%)]">
            <span className="sr-only">{c.search}</span>
            <MagnifyingGlass size={18} aria-hidden="true" className="pointer-events-none absolute start-5 top-1/2 z-10 -translate-y-1/2 text-ink-faint" />
            <input type="search" value={term} onChange={(e) => setTerm(e.target.value)} placeholder={c.search}
              className="h-14 w-full rounded-full bg-[var(--card)] pe-12 ps-12 text-[16px] text-ink outline-none placeholder:text-ink-faint [&::-webkit-search-cancel-button]:hidden" />
            {term && <button type="button" onClick={() => setTerm("")} aria-label={c.clear} className="absolute end-1.5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-ink-muted hover:text-ink"><X size={16} aria-hidden="true" /></button>}
          </label>
          {groups.length > 1 && <div role="group" aria-label={c.k} className="flex flex-wrap gap-2">
            {(["all", ...groups] as const).map((g) => { const on = grp === g; return (
              <button key={g} type="button" aria-pressed={on} onClick={() => setGrp(g)}
                className={`inline-flex h-11 items-center rounded-full px-4 text-[14px] font-medium ring-1 transition-colors ${on ? "bg-ink text-bg ring-ink" : "bg-[var(--card)] text-ink-muted ring-line hover:text-ink"}`}>
                {g === "all" ? c.all : c.groups[g]}</button>); })}
          </div>}
        </div>
        <p aria-live="polite" className="mt-4 text-[13px] text-ink-faint">{c.count.replace("{n}", String(shown.length))}</p>
      </div>
    </section>

    <section aria-label={c.k} className="pb-[var(--section-y)] pt-6">
      <div className="container-x">
        {shown.length === 0 ? <p className={`${glass} p-8 text-[16px] text-ink-muted`}>{c.empty}</p> : (
          <div className="grid gap-10">
            {groups.filter((g) => shown.some((x) => x.g === g)).map((g) => (
              <div key={g} className="grid gap-4 lg:grid-cols-[240px_1fr] lg:gap-10">
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint lg:pt-6">{c.groups[g]}</h2>
                <ul className={`${glass} overflow-hidden`}>
                  {shown.filter((x) => x.g === g).map((x, i) => { const on = open === x.q; const id = `${g}-${i}`; return (
                    <li key={x.q} className="border-line [&:not(:first-child)]:border-t">
                      <h3><button type="button" id={`fq-${id}`} aria-expanded={on} aria-controls={`fa-${id}`} onClick={() => setOpen(on ? null : x.q)}
                        className="group flex min-h-16 w-full items-center gap-4 px-5 py-4 text-start md:px-7">
                        <span className={`flex-1 text-[16px] font-semibold leading-snug tracking-[-0.01em] md:text-[18px] ${on ? "text-ink" : "text-ink/85 group-hover:text-ink"}`}>{x.q}</span>
                        <span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 transition-[transform,background-color] duration-300 ${on ? "rotate-45 bg-ink text-bg ring-ink" : "bg-[var(--card-2)] text-ink ring-line"}`}><Plus size={14} /></span>
                      </button></h3>
                      <div id={`fa-${id}`} role="region" aria-labelledby={`fq-${id}`} className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-expo)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden"><p className="max-w-[44rem] px-5 pb-6 text-[15px] leading-[1.65] text-ink-muted md:px-7 md:text-[16px]">{x.a}{x.href && <> <Link href={x.href} className="font-semibold text-ink underline underline-offset-4">{x.link}</Link></>}</p></div>
                      </div>
                    </li>); })}
                </ul>
              </div>))}
          </div>)}
        <PhotoBand img="brewery" pos="50% 35%" className="mt-12 flex flex-col gap-6 p-6 md:mt-16 md:flex-row md:items-center md:justify-between md:p-12">
          <div><span className={glassIcon}><Question size={18} aria-hidden="true" /></span>
            <h2 className="mt-5 text-[26px] font-semibold tracking-[-0.03em] md:text-[34px]"><Split text={c.moreH} /></h2><p className="mt-2 max-w-[36rem] text-[15px] text-white/70 md:text-[16px]">{c.moreP}</p></div>
          <div className="flex flex-wrap gap-2">
            <Link href="/support/" className={`${pill} btn-glass-2 h-12 px-5`}>{c.contact}</Link>
            <a href={SITE.demo} className={`${pill} btn-primary h-12 px-6`}>{c.demo}<ArrowRight size={15} aria-hidden="true" className="ms-1 rtl:-scale-x-100" /></a>
          </div>
        </PhotoBand>
      </div>
    </section>
  </>);
}
