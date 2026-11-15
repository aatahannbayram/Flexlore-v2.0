"use client";
import Link, { useHref } from "./i18n/Link";
import { m } from "framer-motion";
import { useState } from "react";
import { NAV, navHref } from "./nav";
import type { Lang } from "./copy";
import type { Dict } from "./i18n/home/en";
const tt = (d: Dict | undefined, k: string, i: 0 | 1, fb: string) => (d ? (d.nav.items as Record<string, string[]>)[k]?.[i] ?? fb : fb);
import { MagnifyingGlass, ArrowRight, Plus } from "./ui/icons";
import { EASE } from "./ui/Reveal";
import { useLocale } from "./i18n/LocaleProvider";
import { HOME4 } from "./i18n/home4";
import type { Locale } from "./i18n/locales";
import { FEATURES, GROUPS, FEAT_NAV } from "./features/data";
import { FICON } from "./features/ficons";
import { AppIcon, GlyphIcon } from "./krea/parts";

/* Menu content (icons, descriptions) for the header. Loaded on first interaction, so it is not part of the first page load. */

/* One featured card per menu, with a photograph, pointing somewhere its list does not: Product to the walk-through,
   Industries to the customers on the home page, Resources to the latest data story. */
const FEATURE: Record<string, { img: string; href: string; t: (d: Dict | undefined, lang: Lang, loc: Locale) => string; k: (d: Dict | undefined, loc: Locale) => string }> = {
  product: { img: "vvyMkqyAHHEpN8ItawEya0MuNM", href: "/see-it/", t: (d, l) => tt(d, "seeit", 0, l === "tr" ? "Kendi işinizde görün" : "See it in your business"), k: (d) => tt(d, "seeit", 1, "One real job, start to finish") },
  industries: { img: "KaY79DZIn2DIGC4EcRjC6onFOk", href: "/#customers", t: (_d, _l, loc) => `${HOME4[loc].cases.h} ${HOME4[loc].cases.h2}`, k: (_d, loc) => HOME4[loc].cases.k },
  resources: { img: "exrv3Azw8JV3f2UvuRcEXLveb9Q", href: "/blog/training-gaps-and-quality-defects-what-the-data-shows/", t: () => "Training Gaps and Quality Defects: What the Data Shows", k: (d) => tt(d, "blog", 0, "Blog") },
};
/* Product menu: features in three groups (create, roll out, manage), quick links under them, one picture card. */
function ProductPanel({ close, home }: { close: () => void; home: boolean }) {
  const lh = useHref();
  const { locale, d } = useLocale(); const t = FEAT_NAV[locale];
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-2 rounded-[30px] bg-[#1c1c1c] p-3 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.95),0_0_0_1px_rgb(255_255_255/0.08),inset_0_1px_0_rgb(255_255_255/0.06)]">
      <div className="p-2">
        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-x-2">
          {GROUPS.map((g) => (
            <div key={g}>
              <p className="px-3 pb-2.5 text-[13.5px] text-ink-faint">{t.groups[g]}</p>
              <ul className="space-y-0.5">{FEATURES.filter((f) => f.group === g).map((f) => { const [h, line] = t.items[f.slug]; return (
                <li key={f.slug}><Link prefetch={false} href={lh(`/features/${f.slug}/`)} onClick={close} className="group flex items-center gap-3 rounded-[16px] px-2.5 py-2 transition-colors hover:bg-white/[.05]">
                  {/* Warm app-style icon (Krea menu, 2026-11-15). */}<AppIcon slug={f.slug} icon={f.icon} size={40} />
                  <span className="min-w-0"><span className="flex items-center gap-1.5 text-[15px] font-semibold tracking-[-0.02em] text-ink">{h}{f.status === "soon" && <span className="rounded-full bg-[var(--card-2)] px-1.5 py-px text-[10px] font-medium text-ink-faint">{t.soon}</span>}</span>
                    <span className="block truncate text-[13px] leading-snug text-ink-faint">{line}</span></span>
                </Link></li>); })}</ul>
            </div>))}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1 border-t border-line px-1 pt-2 text-[13px]">
          {[[home ? "#how" : "/#how", t.how], ["/integrations/", tt(d, "integrations", 0, "Integrations")]].map(([h, l]) => (
            <a key={h} href={h} onClick={close} className="rounded-full px-3 py-1.5 text-ink-muted transition-colors hover:bg-[var(--card-2)] hover:text-ink">{l}</a>))}
          <Link prefetch={false} href={lh("/features/")} onClick={close} className="ms-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-ink hover:bg-[var(--card-2)]">{t.all}<ArrowRight size={13} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        </div>
      </div>
      <Link prefetch={false} href={lh("/see-it/")} onClick={close} className="group dark relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-[18px] bg-[#1a1a1a] p-4">
        <picture className="absolute inset-0"><source srcSet="/media/v3/saha-eldiven-makro-m.avif" type="image/avif" /><img src="/media/v3/saha-eldiven-makro-m.webp" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[6%_45%] transition-transform duration-700 group-hover:scale-[1.04]" /></picture>
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.25)_0%,rgb(17_17_17/0.1)_35%,rgb(17_17_17/0.92)_100%)]" />
        <span className="relative text-[12px] text-white/70">{tt(d, "seeit", 1, "One real job, start to finish")}</span>
        <span className="relative mt-1 block text-[22px] font-semibold leading-[1.1] tracking-[-0.035em] text-white">{tt(d, "seeit", 0, "See it in your business")}</span>
        <span className="relative mt-3 inline-flex h-9 w-max items-center gap-1.5 rounded-full bg-[#F4F0EB] px-3.5 text-[13px] font-semibold text-[#111]"><ArrowRight size={13} aria-hidden="true" className="rtl:-scale-x-100" /></span>
      </Link>
    </div>);
}

export function MegaPanel({ id, lang, d, home, close, reduce }: { id: string; lang: Lang; d?: Dict; home: boolean; close: () => void; reduce: boolean }) {
  const lh = useHref();
  if (id === "product") return <ProductPanel close={close} home={home} />;
  const { locale } = useLocale(); const g = NAV.find((x) => x.id === id)!; const f = FEATURE[id];
  const href = f.href.startsWith("/#") && home ? f.href.slice(1) : f.href;
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-2 rounded-[30px] bg-[#1c1c1c] p-3 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.95),0_0_0_1px_rgb(255_255_255/0.08),inset_0_1px_0_rgb(255_255_255/0.06)]">
      <ul className="grid grid-cols-2 content-start gap-0.5 p-1" onMouseLeave={() => setHover(null)}>
        {g.items.map((it, i) => { const Ic = it.icon; return (
          <li key={it.href} onMouseEnter={() => setHover(i)} className="relative">
            {hover === i && <m.span layoutId="mega-hover" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }} className="absolute inset-0 rounded-2xl bg-[var(--card-2)]" />}
            <a href={navHref(it, home)} onClick={close} onFocus={() => setHover(i)} className="relative flex items-center gap-3 rounded-2xl px-3 py-2.5">
              <GlyphIcon Icon={Ic} tone={i} size={40} flat={id === "industries"} />
              <span className="min-w-0"><span className="block text-[15px] font-semibold tracking-[-0.02em] text-ink">{tt(d, it.k, 0, it.t[lang])}</span><span className="block truncate text-[13px] text-ink-faint">{tt(d, it.k, 1, it.d[lang])}</span></span>
            </a>
          </li>); })}
      </ul>
      <Link prefetch={false} href={lh(href)} onClick={close} className="group dark relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[18px] bg-[#1a1a1a] p-4">
        <picture className="absolute inset-0"><source srcSet={`/blog/${f.img}-800.avif`} type="image/avif" /><img src={`/blog/${f.img}-800.webp`} alt="" className="absolute inset-0 h-full w-full object-cover" /></picture>
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_30%,rgb(17_17_17/0.85)_100%)]" />
        <span className="relative text-[12px] text-white/70">{f.k(d, locale)}</span>
        <span className="relative mt-1 flex items-end justify-between gap-2 text-[14px] font-semibold leading-snug text-white">{f.t(d, lang, locale)}<ArrowRight size={14} aria-hidden="true" className="mb-0.5 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" /></span>
      </Link>
    </div>);
}


export function MobileMenuBody({ lang, d, home, close, openSearch, pricing }: { lang: Lang; d?: Dict; home: boolean; close: () => void; openSearch: () => void; pricing: string }) {
  const lh = useHref();
  const tr = lang === "tr"; const [grp, setGrp] = useState<string | null>(null);
  return (
            <div className="container-x flex-1 overflow-y-auto pb-6">
              <button type="button" onClick={() => { close(); openSearch(); }} className="mt-1 flex h-11 w-full items-center gap-2.5 rounded-full bg-white/[.06] px-4 text-[15px] text-ink-muted ring-1 ring-white/[.08] backdrop-blur-md">
                <MagnifyingGlass size={16} aria-hidden="true" />{d ? d.nav.searchSite : tr ? "Sitede ara" : "Search the site"}
              </button>
              {/* Accordion: one group open at a time, headings are 48 px rows. */}
              <div className="mt-3 divide-y divide-white/[.07]">
              {NAV.map((g, gi) => { const label = d ? (d.nav as Record<string, unknown>)[g.id] as string ?? g.label[lang] : g.label[lang]; const on = grp === g.id; return (
                <m.section key={g.id} aria-label={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + gi * 0.06, duration: 0.4, ease: EASE }}>
                  <button type="button" aria-expanded={on} aria-controls={`mm-${g.id}`} onClick={() => setGrp(on ? null : g.id)} className="flex min-h-12 w-full items-center justify-between px-1 text-start text-[16px] font-semibold text-ink">
                    {label}<Plus size={16} aria-hidden="true" className={`text-ink-muted transition-transform duration-300 ${on ? "rotate-45" : ""}`} /></button>
                  <div id={`mm-${g.id}`} hidden={!on} className="pb-2.5">
                  {g.id === "product" ? <MobileFeatures close={close} /> : <ul>
                    {g.items.map((it) => { const Ic = it.icon; return (
                      <li key={it.href}><a href={navHref(it, home)} onClick={close} className="flex min-h-11 items-center gap-3 rounded-xl px-1 text-[15px] text-ink/90">
                        <GlyphIcon Icon={Ic} tone={g.items.indexOf(it)} size={30} />{tt(d, it.k, 0, it.t[lang])}</a></li>); })}
                  </ul>}
                  </div>
                </m.section>); })}
              </div>
              <Link prefetch={false} href={lh("/pricing/")} onClick={close} className="flex min-h-12 items-center border-t border-white/[.07] px-1 text-[16px] font-semibold">{pricing}</Link>
            </div>
  );
}

function MobileFeatures({ close }: { close: () => void }) {
  const lh = useHref();
  const { locale } = useLocale(); const t = FEAT_NAV[locale];
  return (<div className="mt-1 space-y-3">
    {GROUPS.map((g) => (<div key={g}><p className="px-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-faint">{t.groups[g]}</p>
      <ul className="mt-1">{FEATURES.filter((f) => f.group === g).map((f) => { return (
        <li key={f.slug}><Link prefetch={false} href={lh(`/features/${f.slug}/`)} onClick={close} className="flex min-h-11 items-center gap-3 rounded-xl px-1 text-[15px] text-ink/90">
          <AppIcon slug={f.slug} icon={f.icon} size={30} />{t.items[f.slug][0]}
          {f.status === "soon" && <span className="ms-auto text-[12px] text-ink-faint">{t.soon}</span>}</Link></li>); })}</ul></div>))}
    <Link prefetch={false} href={lh("/features/")} onClick={close} className="flex min-h-11 items-center px-1 text-[14px] font-semibold">{t.all}</Link>
  </div>);
}
