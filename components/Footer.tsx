"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus } from "./ui/icons";
import { StoreButtons } from "./Icons";
import { SITE } from "./config";
import { useLocale } from "./i18n/LocaleProvider";
const ALL_FEATURES: Record<string, string> = { en: "All features", tr: "Tüm özellikler", de: "Alle Funktionen", ar: "جميع الميزات", es: "Todas las funciones", ru: "Все функции", fr: "Toutes les fonctionnalités", pl: "Wszystkie funkcje" };

/* Footer: brand block (wordmark, line, social marks, store badges) and four balanced link groups.
 * Layers are separated by surface tone, not rules. Social marks are the official monochrome glyphs
 * (Simple Icons, CC0) drawn through a CSS mask, so they follow the text colour and add no JS.
 * Layout: phone = stacked, 2 link columns. Tablet (md) = brand row on top, 4 link columns.
 * Desktop (lg) = brand column left, links right. */

type L = "en" | "tr";
type Item = { k: string; en: string; tr?: string; href: string; ext?: boolean };

const GROUPS: { g: "product" | "cases" | "industries" | "company"; en: string; tr: string; items: Item[] }[] = [
  { g: "product", en: "Product", tr: "Ürün", items: [
    { k: "features", en: "All features", href: "/features/" },
    { k: "how", en: "How it works", tr: "Nasıl çalışır", href: "/#how" },
    { k: "web", en: "Flexlore Web", href: "/features/web-panel/" },
    { k: "ai", en: "AI", href: "/ai/" },
    { k: "integrations", en: "Integrations", tr: "Entegrasyonlar", href: "/integrations/" },
    { k: "pricing", en: "Pricing", tr: "Fiyatlar", href: "/pricing/" },
  ] },
  { g: "cases", en: "Use cases", tr: "Kullanım alanları", items: [
    { k: "business", en: "Your business", tr: "Sizin işiniz", href: "/see-it/" },
    { k: "apprentice", en: "Master to apprentice", tr: "Ustadan çırağa", href: "/use-cases/master-apprentice-skills-transfer/" },
    { k: "installation", en: "Installation training", tr: "Kurulum eğitimi", href: "/use-cases/installation-training-on-site-orientation/" },
  ] },
  { g: "industries", en: "Industries", tr: "Sektörler", items: [
    { k: "restaurants", en: "Restaurants", tr: "Restoranlar", href: "/sektor/restoran/" },
    { k: "manufacturing", en: "Manufacturing", tr: "Üretim", href: "/sektor/uretim/" },
    { k: "hotels", en: "Hotels", tr: "Oteller", href: "/sektor/otel/" },
    { k: "franchises", en: "Franchises", tr: "Franchise", href: "/sektor/franchise/" },
    { k: "warehouses", en: "Warehouses", tr: "Depolar", href: "/sektor/depo/" },
    { k: "bakeries", en: "Bakeries & cafés", tr: "Fırın ve kafeler", href: "/sektor/firin/" },
  ] },
  { g: "company", en: "Company", tr: "Şirket", items: [
    { k: "blog", en: "Blog", href: "/blog/" },
    { k: "company", en: "About us", tr: "Hakkımızda", href: "/company/" },
    { k: "support", en: "Support", tr: "Destek", href: "/support/" },
    { k: "demo", en: "Book a demo", tr: "Demo isteyin", href: SITE.demo, ext: true },
  ] },
];

const SOCIAL: [string, string, string][] = [
  ["LinkedIn", "linkedin", SITE.social.linkedin],
  ["Instagram", "instagram", SITE.social.instagram],
  ["YouTube", "youtube", SITE.social.youtube],
  ["Product Hunt", "producthunt", SITE.productHunt],
];

const link = "group inline-flex min-h-11 sm:min-h-9 items-center text-[16px] text-white/70 transition-colors duration-200 hover:text-white";

/* "Get an AI summary": opens the assistant with a ready prompt about Flexlore (plain text labels, no third-party logos). */
const AI: [string, (q: string) => string][] = [
  ["ChatGPT", (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`],
  ["Claude", (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}`],
  ["Perplexity", (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`],
];

export function Footer({ lang: _l }: { lang?: L } = {}) {
  const { d, lang, locale } = useLocale(); const f = d.footer; const [open, setOpen] = useState<string | null>(null);
  return (
    <footer aria-labelledby="footer-h" className="footer-dots px-3 pb-3 pt-10 md:px-5 md:pb-5 md:pt-16">
      <h2 id="footer-h" className="sr-only">Flexlore</h2>
      <div className="dark overflow-hidden rounded-[32px] bg-[linear-gradient(160deg,#121212_0%,#1a1a19_55%,#141414_100%)] ring-1 ring-white/[.06] text-[15px] text-white">
        <div className="mx-auto max-w-[calc(var(--container)+2*var(--pad-x))] px-6 pb-8 pt-10 md:px-12 md:pt-20">
          <div className="grid gap-y-8 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
            <div className="lg:col-span-5">
              <img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={240} height={52} className="h-11 w-auto md:h-14" />
              <p className="mt-6 max-w-[32ch] text-[16px] leading-[1.5] text-white/70">{f.tag}</p>

              <p className="mt-8 text-[17px] font-medium md:mt-10">{f.ai}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AI.map(([n, u]) => (
                  <li key={n}><a href={u(f.aiQ)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full bg-white/[.08] px-4 text-[14px] font-medium text-white/85 transition-colors hover:bg-white/[.14] hover:text-white">{n}</a></li>))}
              </ul>

              <ul className="mt-6 flex gap-2 md:mt-10" aria-label={f.follow}>
                {SOCIAL.map(([n, k, h]) => (
                  <li key={k}>
                    <a href={h} target="_blank" rel="noopener" aria-label={n} title={n}
                      className="grid h-11 w-11 place-items-center rounded-full bg-white/[.08] text-white/80 transition-colors duration-200 hover:bg-white/[.14] hover:text-white">
                      <span aria-hidden="true" className="social-mark h-[18px] w-[18px]" style={{ ["--m" as string]: `url(/brand/social/${k}.svg)` }} />
                    </a>
                  </li>))}
              </ul>
            </div>

            {/* Phones: each group opens under its own heading (44 px rows). From 640 px: four open columns. */}
            <div className="grid gap-x-6 sm:grid-cols-4 sm:gap-y-10 lg:col-span-7">
              {GROUPS.map((g) => { const on = open === g.g; return (
                <nav key={g.en} aria-label={f.groups[g.g]}>
                  <p className="mb-4 hidden text-[17px] font-medium text-white sm:block">{f.groups[g.g]}</p>
                  <button type="button" aria-expanded={on} aria-controls={`ft-${g.g}`} onClick={() => setOpen(on ? null : g.g)}
                    className="flex min-h-12 w-full items-center justify-between text-start text-[17px] font-medium text-white sm:hidden">
                    {f.groups[g.g]}<Plus size={16} aria-hidden="true" className={`text-white/60 transition-transform duration-300 ${on ? "rotate-45" : ""}`} /></button>
                  <ul id={`ft-${g.g}`} className={`space-y-0 pb-3 sm:block sm:space-y-1 sm:pb-0 ${on ? "block" : "hidden"}`}>
                    {g.items.map((x) => {
                      const label = x.k === "features" ? ALL_FEATURES[locale] : (f.links as Record<string, string>)[x.k] ?? x.en;
                      return (
                        <li key={x.href + x.en}>
                          {x.ext || x.href.startsWith("/#")
                            ? <a className={link} href={x.href}>{label}</a>
                            : <Link className={link} href={x.href}>{label}</Link>}
                        </li>);
                    })}
                  </ul>
                </nav>); })}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-6 md:mt-20 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <a href="mailto:support@flexlore.com" className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white/[.08] pl-4 pr-5 text-white transition-colors hover:bg-white/[.14]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame" />support@flexlore.com</a>
            </div>
            <div><p className="mb-3 text-[13px] text-white/60">{f.app}</p><StoreButtons small lang={lang} /></div>
          </div>

          <div className="mt-10 border-t border-white/[.1] pt-6 text-[13px]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <span className="flex items-center gap-4 text-white/70">© 2026 Flexlore Inc. {f.rights}
                <a href="#" className="group inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white/[.08] px-3 text-white/80 transition-colors hover:bg-white/[.14] hover:text-white">
                  <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>{f.top}</a></span>
              <ul className="-mx-2 flex flex-wrap" aria-label={f.legal}>
                {SITE.legal.map(([n, h]) => (
                  <li key={n}><a className="inline-flex min-h-9 items-center px-2 text-white/65 transition-colors duration-200 hover:text-white" href={h}>{n}</a></li>))}
              </ul>
            </div>
            <p className="mt-3 max-w-[90ch] text-[12px] leading-[1.5] text-white/55">
              © 2026 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
