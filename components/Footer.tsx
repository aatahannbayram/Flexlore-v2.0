import Link from "next/link";
import { StoreButtons } from "./Icons";
import { SITE } from "./config";
import { home } from "./home/home-copy";

/* Footer: brand block (wordmark, line, social marks, store badges) and four balanced link groups.
 * Layers are separated by surface tone, not rules. Social marks are the official monochrome glyphs
 * (Simple Icons, CC0) drawn through a CSS mask, so they follow the text colour and add no JS.
 * Layout: phone = stacked, 2 link columns. Tablet (md) = brand row on top, 4 link columns.
 * Desktop (lg) = brand column left, links right. */

type L = "en" | "tr";
type Item = { en: string; tr?: string; href: string; ext?: boolean };

const GROUPS: { en: string; tr: string; items: Item[] }[] = [
  { en: "Product", tr: "Ürün", items: [
    { en: "How it works", tr: "Nasıl çalışır", href: "/#how" },
    { en: "Flexlore Web", href: "/#web" },
    { en: "AI", href: "/ai/" },
    { en: "Integrations", tr: "Entegrasyonlar", href: "/integrations/" },
    { en: "Pricing", tr: "Fiyatlar", href: "/pricing/" },
  ] },
  { en: "Use cases", tr: "Kullanım alanları", items: [
    { en: "Your business", tr: "Sizin işiniz", href: "/see-it/" },
    { en: "Master to apprentice", tr: "Ustadan çırağa", href: "/use-cases/master-apprentice-skills-transfer/" },
    { en: "Installation training", tr: "Kurulum eğitimi", href: "/use-cases/installation-training-on-site-orientation/" },
  ] },
  { en: "Industries", tr: "Sektörler", items: [
    { en: "Restaurants", tr: "Restoranlar", href: "/sektor/restoran/" },
    { en: "Manufacturing", tr: "Üretim", href: "/sektor/uretim/" },
    { en: "Hotels", tr: "Oteller", href: "/sektor/otel/" },
    { en: "Franchises", tr: "Franchise", href: "/sektor/franchise/" },
    { en: "Warehouses", tr: "Depolar", href: "/sektor/depo/" },
    { en: "Bakeries & cafés", tr: "Fırın ve kafeler", href: "/sektor/firin/" },
  ] },
  { en: "Company", tr: "Şirket", items: [
    { en: "Blog", href: "/blog/" },
    { en: "Support", tr: "Destek", href: "mailto:support@flexlore.com", ext: true },
    { en: "Book a demo", tr: "Demo isteyin", href: SITE.demo, ext: true },
  ] },
];

const SOCIAL: [string, string, string][] = [
  ["LinkedIn", "linkedin", SITE.social.linkedin],
  ["Instagram", "instagram", SITE.social.instagram],
  ["YouTube", "youtube", SITE.social.youtube],
  ["Product Hunt", "producthunt", SITE.productHunt],
];

const link = "group inline-flex min-h-9 items-center text-[16px] text-white/70 transition-colors duration-200 hover:text-white";

/* "Get an AI summary": opens the assistant with a ready prompt about Flexlore (plain text labels, no third-party logos). */
const AI_Q = { en: "Summarise what Flexlore (https://flexlore.com) does, who it is for and how it works.", tr: "Flexlore'un (https://flexlore.com) ne yaptığını, kimler için olduğunu ve nasıl çalıştığını özetle." };
const AI: [string, (q: string) => string][] = [
  ["ChatGPT", (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`],
  ["Claude", (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}`],
  ["Perplexity", (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`],
];

export function Footer({ lang = "en" }: { lang?: L }) {
  const f = home[lang].footer; const tr = lang === "tr";
  return (
    <footer aria-labelledby="footer-h" className="footer-dots px-3 pb-3 pt-10 md:px-5 md:pb-5 md:pt-16">
      <h2 id="footer-h" className="sr-only">Flexlore</h2>
      <div className="dark overflow-hidden rounded-[32px] bg-[linear-gradient(160deg,#242322_0%,#33322f_55%,#2a2927_100%)] text-[15px] text-white">
        <div className="mx-auto max-w-[calc(var(--container)+2*var(--pad-x))] px-6 pb-8 pt-14 md:px-12 md:pt-20">
          <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
            <div className="lg:col-span-5">
              <img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={240} height={52} className="h-11 w-auto md:h-14" />
              <p className="mt-6 max-w-[32ch] text-[16px] leading-[1.5] text-white/70">{f.tag}</p>

              <p className="mt-10 text-[17px] font-medium">{tr ? "Yapay zekâ ile özetleyin" : "Get an AI summary"}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AI.map(([n, u]) => (
                  <li key={n}><a href={u(AI_Q[lang])} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center rounded-full bg-white/[.08] px-4 text-[14px] font-medium text-white/85 transition-colors hover:bg-white/[.14] hover:text-white">{n}</a></li>))}
              </ul>

              <ul className="mt-10 flex gap-2" aria-label={f.follow}>
                {SOCIAL.map(([n, k, h]) => (
                  <li key={k}>
                    <a href={h} target="_blank" rel="noopener" aria-label={n} title={n}
                      className="grid h-11 w-11 place-items-center rounded-full bg-white/[.08] text-white/80 transition-colors duration-200 hover:bg-white/[.14] hover:text-white">
                      <span aria-hidden="true" className="social-mark h-[18px] w-[18px]" style={{ ["--m" as string]: `url(/brand/social/${k}.svg)` }} />
                    </a>
                  </li>))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7">
              {GROUPS.map((g) => (
                <nav key={g.en} aria-label={tr ? g.tr : g.en}>
                  <p className="mb-4 text-[17px] font-medium text-white">{tr ? g.tr : g.en}</p>
                  <ul className="space-y-1">
                    {g.items.map((x) => {
                      const label = tr && x.tr ? x.tr : x.en;
                      return (
                        <li key={x.href + x.en}>
                          {x.ext || x.href.startsWith("/#")
                            ? <a className={link} href={x.href}>{label}</a>
                            : <Link className={link} href={x.href}>{label}</Link>}
                        </li>);
                    })}
                  </ul>
                </nav>))}
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-6 md:mt-20 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <a href="mailto:support@flexlore.com" className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white/[.08] pl-4 pr-5 text-white transition-colors hover:bg-white/[.14]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame" />support@flexlore.com</a>
            </div>
            <div><p className="mb-3 text-[13px] text-white/60">{f.app}</p><StoreButtons small lang={lang} /></div>
          </div>

          <div className="mt-10 border-t border-white/[.1] pt-6 text-[13px]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <span className="flex items-center gap-4 text-white/70">© 2026 Flexlore Inc. {tr ? "Tüm hakları saklıdır." : "All rights reserved."}
                <a href="#" className="group inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white/[.08] px-3 text-white/80 transition-colors hover:bg-white/[.14] hover:text-white">
                  <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>{tr ? "Başa dön" : "Back to top"}</a></span>
              <ul className="-mx-2 flex flex-wrap" aria-label={tr ? "Yasal" : "Legal"}>
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
