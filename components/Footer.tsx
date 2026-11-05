"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus } from "./ui/icons";
import { StoreButtons } from "./Icons";
import { SITE } from "./config";
import { useLocale } from "./i18n/LocaleProvider";
const ALL_FEATURES: Record<string, string> = { en: "All features", tr: "Tüm özellikler", de: "Alle Funktionen", ar: "جميع الميزات", es: "Todas las funciones", ru: "Все функции", fr: "Toutes les fonctionnalités", pl: "Wszystkie funkcje" };

/* Footer (v3): flat dark ground, brand block and four link groups, then one row for the AI summary, email and
 * store badges, then legal. Phones: link groups are accordions. Height budget: desktop under 600 px, phone ~700 px. Social marks are the official monochrome glyphs
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

const link = "group inline-flex min-h-11 min-w-11 items-center text-[15px] text-white/70 transition-colors duration-200 hover:text-white";

/* "Get an AI summary": opens the assistant with a ready prompt about Flexlore (plain text labels, no third-party logos). */
const AI: [string, (q: string) => string][] = [
  ["ChatGPT", (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`],
  ["Claude", (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}`],
  ["Perplexity", (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`],
];

export function Footer({ lang: _l }: { lang?: L } = {}) {
  const { d, lang, locale } = useLocale(); const f = d.footer; const [open, setOpen] = useState<string | null>(null);
  return (
    <footer aria-labelledby="footer-h" className="dark border-t border-white/[.08] bg-[#111111] text-[15px] text-white">
      <h2 id="footer-h" className="sr-only">Flexlore</h2>
      <div className="container-x pb-6 pt-10 md:pt-14">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <div className="lg:col-span-4">
            <div className="flex flex-wrap items-center justify-between gap-4 lg:block">
            <img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={240} height={52} className="h-8 w-auto md:h-10" />
            <p className="mt-4 hidden max-w-[30ch] text-[16px] leading-[1.5] text-white/70 lg:block">{f.tag}</p>
            <ul className="flex gap-1 lg:mt-5 lg:gap-2" aria-label={f.follow}>
              {SOCIAL.map(([n, k, h]) => (
                <li key={k}>
                  <a href={h} target="_blank" rel="noopener" aria-label={n} title={n}
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/[.08] text-white/80 transition-colors duration-200 hover:bg-white/[.14] hover:text-white">
                    <span aria-hidden="true" className="social-mark h-[18px] w-[18px]" style={{ ["--m" as string]: `url(/brand/social/${k}.svg)` }} />
                  </a>
                </li>))}
            </ul>
            </div>
          </div>

          {/* Phones: each group opens under its own heading (48 px rows). From 640 px: four open columns. */}
          <div className="grid gap-x-6 border-y border-white/[.08] sm:grid-cols-4 sm:border-0 lg:col-span-8">
            {GROUPS.map((g) => { const on = open === g.g; return (
              <nav key={g.en} aria-label={f.groups[g.g]} className="border-white/[.08] [&:not(:first-child)]:border-t sm:!border-0">
                <p className="mb-2 hidden text-[15px] font-semibold text-white sm:block">{f.groups[g.g]}</p>
                <button type="button" aria-expanded={on} aria-controls={`ft-${g.g}`} onClick={() => setOpen(on ? null : g.g)}
                  className="flex min-h-12 w-full items-center justify-between text-start text-[16px] font-medium text-white sm:hidden">
                  {f.groups[g.g]}<Plus size={16} aria-hidden="true" className={`text-white/60 transition-transform duration-300 ${on ? "rotate-45" : ""}`} /></button>
                <ul id={`ft-${g.g}`} className={`pb-3 sm:block sm:pb-0 ${on ? "block" : "hidden"}`}>
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

        <div className="mt-6 flex flex-col gap-4 md:mt-12 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="me-1 hidden text-[14px] text-white/60 sm:inline">{f.ai}</span>
            {AI.map(([n, u]) => (
              <a key={n} href={u(f.aiQ)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full bg-white/[.08] px-4 text-[14px] font-medium text-white/85 transition-colors hover:bg-white/[.14] hover:text-white">{n}</a>))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="mailto:support@flexlore.com" className="inline-flex min-h-11 items-center text-[15px] text-white/80 underline-offset-4 hover:text-white hover:underline">support@flexlore.com</a>
            <div className="[&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center"><StoreButtons small lang={lang} /></div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/[.08] pt-4 text-[13px]">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/70">© 2026 Flexlore Inc. {f.rights}
              <a href="#" className="inline-flex min-h-11 items-center gap-1.5 text-white/80 transition-colors hover:text-white">
                <span aria-hidden="true">↑</span>{f.top}</a></span>
            <ul className="-mx-2 flex flex-wrap" aria-label={f.legal}>
              {SITE.legal.map(([n, h]) => (
                <li key={n}><a className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-white/65 transition-colors duration-200 hover:text-white" href={h}>{n}</a></li>))}
            </ul>
          </div>
          <p className="mt-2 max-w-[90ch] text-[12px] leading-[1.5] text-white/55">
            © 2026 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.
          </p>
        </div>
      </div>
    </footer>
  );
}
