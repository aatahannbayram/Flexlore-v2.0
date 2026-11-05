"use client";
import { m } from "framer-motion";
import { useState } from "react";
import { NAV, navHref } from "./nav";
import type { Lang } from "./copy";
import type { Dict } from "./i18n/home/en";
const tt = (d: Dict | undefined, k: string, i: 0 | 1, fb: string) => (d ? (d.nav.items as Record<string, string[]>)[k]?.[i] ?? fb : fb);
import { MagnifyingGlass, ArrowRight, Plus } from "./ui/icons";
import { EASE } from "./ui/Reveal";
import { useLocale } from "./i18n/LocaleProvider";
import { FEATURES, GROUPS, FEAT_NAV } from "./features/data";
import { FICON } from "./features/ficons";

/* Menu content (icons, descriptions) for the header. Loaded on first interaction, so it is not part of the first page load. */

/* One featured card per menu, with a blog photograph: a calm visual anchor next to the links. */
const FEATURE: Record<string, { img: string; href: string; t: (d?: Dict, lang?: Lang) => string; k: (d?: Dict) => string }> = {
  product: { img: "vvyMkqyAHHEpN8ItawEya0MuNM", href: "/see-it/", t: (d, l) => tt(d, "seeit", 0, l === "tr" ? "Kendi işinizde görün" : "See it in your business"), k: (d) => tt(d, "seeit", 1, "One real job, start to finish") },
  industries: { img: "KaY79DZIn2DIGC4EcRjC6onFOk", href: "/see-it/", t: (d, l) => d ? d.nav.seeAll : l === "tr" ? "Flexlore'u kendi işinizde görün" : "See Flexlore in your business", k: (d) => tt(d, "seeit", 1, "One real job, start to finish") },
  resources: { img: "exrv3Azw8JV3f2UvuRcEXLveb9Q", href: "/blog/training-gaps-and-quality-defects-what-the-data-shows/", t: () => "Training Gaps and Quality Defects: What the Data Shows", k: (d) => tt(d, "blog", 0, "Blog") },
};
/* Product menu: features in three groups (create, roll out, manage), quick links under them, one picture card. */
function ProductPanel({ close, home }: { close: () => void; home: boolean }) {
  const { locale, d } = useLocale(); const t = FEAT_NAV[locale];
  return (
    <div className="grid grid-cols-[1fr_210px] gap-2 rounded-[24px] bg-surface-1 p-2 ring-1 ring-line">
      <div className="p-2">
        <div className="grid grid-cols-3 gap-x-2">
          {GROUPS.map((g) => (
            <div key={g}>
              <p className="px-2.5 pb-2 text-[12px] font-medium text-ink-faint">{t.groups[g]}</p>
              <ul className="space-y-0.5">{FEATURES.filter((f) => f.group === g).map((f) => { const Ic = FICON[f.icon]; const [h, line] = t.items[f.slug]; return (
                <li key={f.slug}><a href={`/features/${f.slug}/`} onClick={close} className="group flex items-start gap-2.5 rounded-xl px-2.5 py-2 transition-colors hover:bg-[var(--card-2)]">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[var(--card-2)] text-ink transition-colors group-hover:bg-[var(--card)]"><Ic size={16} /></span>
                  <span className="min-w-0"><span className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">{h}{f.status === "soon" && <span className="rounded-full bg-[var(--card-2)] px-1.5 py-px text-[10px] font-medium text-ink-faint">{t.soon}</span>}</span>
                    <span className="block text-[12.5px] leading-snug text-ink-faint">{line}</span></span>
                </a></li>); })}</ul>
            </div>))}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1 border-t border-line px-1 pt-2 text-[13px]">
          {[[home ? "#how" : "/#how", t.how], ["/integrations/", tt(d, "integrations", 0, "Integrations")], ["/see-it/", tt(d, "seeit", 0, "See it in your business")]].map(([h, l]) => (
            <a key={h} href={h} onClick={close} className="rounded-full px-3 py-1.5 text-ink-muted transition-colors hover:bg-[var(--card-2)] hover:text-ink">{l}</a>))}
          <a href="/features/" onClick={close} className="ms-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold text-ink hover:bg-[var(--card-2)]">{t.all}<ArrowRight size={13} aria-hidden="true" className="rtl:-scale-x-100" /></a>
        </div>
      </div>
      <a href="/features/video-to-sop/" onClick={close} className="group dark relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-[18px] bg-[#1a1a1a] p-4">
        <picture><source srcSet="/blog/vvyMkqyAHHEpN8ItawEya0MuNM-800.avif" type="image/avif" /><img src="/blog/vvyMkqyAHHEpN8ItawEya0MuNM-800.webp" alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></picture>
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_30%,rgb(17_17_17/0.88)_100%)]" />
        <span className="relative text-[12px] text-white/70">{t.items["video-to-sop"][1]}</span>
        <span className="relative mt-1 flex items-end justify-between gap-2 text-[15px] font-semibold leading-snug text-white">{t.items["video-to-sop"][0]}<ArrowRight size={14} aria-hidden="true" className="mb-0.5 shrink-0 rtl:-scale-x-100" /></span>
      </a>
    </div>);
}

export function MegaPanel({ id, lang, d, home, close, reduce }: { id: string; lang: Lang; d?: Dict; home: boolean; close: () => void; reduce: boolean }) {
  if (id === "product") return <ProductPanel close={close} home={home} />;
  const g = NAV.find((x) => x.id === id)!; const f = FEATURE[id];
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-[1fr_230px] gap-2 rounded-[24px] bg-surface-1 p-2 ring-1 ring-line">
      <ul className="grid grid-cols-2 content-start gap-0.5 p-1" onMouseLeave={() => setHover(null)}>
        {g.items.map((it, i) => { const Ic = it.icon; return (
          <li key={it.href} onMouseEnter={() => setHover(i)} className="relative">
            {hover === i && <m.span layoutId="mega-hover" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }} className="absolute inset-0 rounded-2xl bg-[var(--card-2)]" />}
            <a href={navHref(it, home)} onClick={close} onFocus={() => setHover(i)} className="relative flex items-center gap-3 rounded-2xl px-3 py-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-[var(--card-2)] text-ink"><Ic size={17} /></span>
              <span className="min-w-0"><span className="block text-[14px] font-semibold text-ink">{tt(d, it.k, 0, it.t[lang])}</span><span className="block truncate text-[12.5px] text-ink-faint">{tt(d, it.k, 1, it.d[lang])}</span></span>
            </a>
          </li>); })}
      </ul>
      <a href={f.href} onClick={close} className="group dark relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[18px] bg-[#1a1a1a] p-4">
        <picture><source srcSet={`/blog/${f.img}-800.avif`} type="image/avif" /><img src={`/blog/${f.img}-800.webp`} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></picture>
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_30%,rgb(17_17_17/0.85)_100%)]" />
        <span className="relative text-[12px] text-white/70">{f.k(d)}</span>
        <span className="relative mt-1 flex items-end justify-between gap-2 text-[14px] font-semibold leading-snug text-white">{f.t(d, lang)}<ArrowRight size={14} aria-hidden="true" className="mb-0.5 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" /></span>
      </a>
    </div>);
}


export function MobileMenuBody({ lang, d, home, close, openSearch, pricing }: { lang: Lang; d?: Dict; home: boolean; close: () => void; openSearch: () => void; pricing: string }) {
  const tr = lang === "tr"; const [grp, setGrp] = useState<string | null>(null);
  return (
            <div className="container-x flex-1 overflow-y-auto pb-6">
              <button type="button" onClick={() => { close(); openSearch(); }} className="mt-2 flex h-12 w-full items-center gap-3 rounded-2xl bg-surface-1 px-4 text-ink-muted">
                <MagnifyingGlass size={18} aria-hidden="true" />{d ? d.nav.searchSite : tr ? "Sitede ara" : "Search the site"}
              </button>
              {/* Accordion: one group open at a time, headings are 48 px rows. */}
              <div className="mt-4 divide-y divide-line border-y border-line">
              {NAV.map((g, gi) => { const label = d ? (d.nav as Record<string, unknown>)[g.id] as string ?? g.label[lang] : g.label[lang]; const on = grp === g.id; return (
                <m.section key={g.id} aria-label={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + gi * 0.06, duration: 0.4, ease: EASE }}>
                  <button type="button" aria-expanded={on} aria-controls={`mm-${g.id}`} onClick={() => setGrp(on ? null : g.id)} className="flex min-h-14 w-full items-center justify-between px-1 text-start text-[18px] font-semibold text-ink">
                    {label}<Plus size={16} aria-hidden="true" className={`text-ink-muted transition-transform duration-300 ${on ? "rotate-45" : ""}`} /></button>
                  <div id={`mm-${g.id}`} hidden={!on} className="pb-3">
                  {g.id === "product" ? <MobileFeatures close={close} /> : <ul>
                    {g.items.map((it) => { const Ic = it.icon; return (
                      <li key={it.href}><a href={navHref(it, home)} onClick={close} className="flex min-h-12 items-center gap-3.5 rounded-xl px-1 py-1.5 text-[17px] text-ink">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[.06]"><Ic size={18} /></span>{tt(d, it.k, 0, it.t[lang])}</a></li>); })}
                  </ul>}
                  </div>
                </m.section>); })}
              </div>
              <a href="/pricing/" onClick={close} className="flex min-h-14 items-center border-b border-line px-1 text-[18px] font-semibold">{pricing}</a>
            </div>
  );
}

function MobileFeatures({ close }: { close: () => void }) {
  const { locale } = useLocale(); const t = FEAT_NAV[locale];
  return (<div className="mt-2 space-y-4">
    {GROUPS.map((g) => (<div key={g}><p className="px-1 text-[12px] text-ink-faint">{t.groups[g]}</p>
      <ul className="mt-1">{FEATURES.filter((f) => f.group === g).map((f) => { const Ic = FICON[f.icon]; return (
        <li key={f.slug}><a href={`/features/${f.slug}/`} onClick={close} className="flex min-h-12 items-center gap-3.5 rounded-xl px-1 py-1.5 text-[17px] text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--card)]"><Ic size={18} /></span>{t.items[f.slug][0]}
          {f.status === "soon" && <span className="rounded-full bg-[var(--card)] px-2 py-0.5 text-[11px] text-ink-faint">{t.soon}</span>}</a></li>); })}</ul></div>))}
    <a href="/features/" onClick={close} className="flex min-h-12 items-center px-1 text-[15px] font-semibold">{t.all}</a>
  </div>);
}
