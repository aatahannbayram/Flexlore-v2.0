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

export function MegaPanel({ id, lang, d, home, close, reduce }: { id: string; lang: Lang; d?: Dict; home: boolean; close: () => void; reduce: boolean }) {
  const g = NAV.find((x) => x.id === id)!;
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="rounded-[24px] bg-surface-1 p-3">
      <ul className="grid grid-cols-2 gap-1" onMouseLeave={() => setHover(null)}>
        {g.items.map((it, i) => { const Ic = it.icon; return (
          <li key={it.href} onMouseEnter={() => setHover(i)} className="relative">
            {hover === i && <m.span layoutId="mega-hover" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }} className="absolute inset-0 rounded-2xl bg-white/[.06]" />}
            <a href={navHref(it, home)} onClick={close} onFocus={() => setHover(i)} className="relative flex items-start gap-3.5 rounded-2xl p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[.07] text-ink"><Ic size={19} /></span>
              <span><span className="block text-[15px] font-semibold text-ink">{tt(d, it.k, 0, it.t[lang])}</span><span className="mt-0.5 block text-[13px] leading-snug text-ink-muted">{tt(d, it.k, 1, it.d[lang])}</span></span>
            </a>
          </li>); })}
      </ul>
      {g.more && (
        <a href={g.more.href} onClick={close} className="mt-1 flex items-center justify-between rounded-2xl bg-white/[.04] px-4 py-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink">
          {d ? d.nav.seeAll : g.more.t[lang]}<ArrowRight size={14} aria-hidden="true" /></a>)}
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
