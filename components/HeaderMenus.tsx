"use client";
import { m } from "framer-motion";
import { useState } from "react";
import { NAV, navHref } from "./nav";
import type { Lang } from "./copy";
import type { Dict } from "./i18n/home/en";
const tt = (d: Dict | undefined, k: string, i: 0 | 1, fb: string) => (d ? (d.nav.items as Record<string, string[]>)[k]?.[i] ?? fb : fb);
import { MagnifyingGlass, ArrowRight } from "./ui/icons";
import { EASE } from "./ui/Reveal";

/* Menu content (icons, descriptions) for the header. Loaded on first interaction, so it is not part of the first page load. */

/* One featured card per menu, with a blog photograph: a calm visual anchor next to the links. */
const FEATURE: Record<string, { img: string; href: string; t: (d?: Dict, lang?: Lang) => string; k: (d?: Dict) => string }> = {
  product: { img: "vvyMkqyAHHEpN8ItawEya0MuNM", href: "/see-it/", t: (d, l) => tt(d, "seeit", 0, l === "tr" ? "Kendi işinizde görün" : "See it in your business"), k: (d) => tt(d, "seeit", 1, "One real job, start to finish") },
  industries: { img: "KaY79DZIn2DIGC4EcRjC6onFOk", href: "/see-it/", t: (d, l) => d ? d.nav.seeAll : l === "tr" ? "Flexlore'u kendi işinizde görün" : "See Flexlore in your business", k: (d) => tt(d, "seeit", 1, "One real job, start to finish") },
  resources: { img: "exrv3Azw8JV3f2UvuRcEXLveb9Q", href: "/blog/training-gaps-and-quality-defects-what-the-data-shows/", t: () => "Training Gaps and Quality Defects: What the Data Shows", k: (d) => tt(d, "blog", 0, "Blog") },
};
export function MegaPanel({ id, lang, d, home, close, reduce }: { id: string; lang: Lang; d?: Dict; home: boolean; close: () => void; reduce: boolean }) {
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
  const tr = lang === "tr";
  return (
            <div className="container-x flex-1 overflow-y-auto pb-6">
              <button type="button" onClick={() => { close(); openSearch(); }} className="mt-2 flex h-12 w-full items-center gap-3 rounded-2xl bg-surface-1 px-4 text-ink-muted">
                <MagnifyingGlass size={18} aria-hidden="true" />{d ? d.nav.searchSite : tr ? "Sitede ara" : "Search the site"}
              </button>
              {NAV.map((g, gi) => (
                <m.section key={g.id} aria-label={d ? (d.nav as Record<string, unknown>)[g.id] as string ?? g.label[lang] : g.label[lang]} className="mt-7" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + gi * 0.06, duration: 0.4, ease: EASE }}>
                  <p className="px-1 text-[13px] font-medium text-ice-400">{d ? (d.nav as Record<string, unknown>)[g.id] as string ?? g.label[lang] : g.label[lang]}</p>
                  <ul className="mt-2">
                    {g.items.map((it) => { const Ic = it.icon; return (
                      <li key={it.href}><a href={navHref(it, home)} onClick={close} className="flex min-h-12 items-center gap-3.5 rounded-xl px-1 py-1.5 text-[17px] text-ink">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[.06]"><Ic size={18} /></span>{tt(d, it.k, 0, it.t[lang])}</a></li>); })}
                  </ul>
                </m.section>))}
              <a href="/pricing/" onClick={close} className="mt-6 flex min-h-12 items-center px-1 text-[17px] font-semibold">{pricing}</a>
            </div>
  );
}
