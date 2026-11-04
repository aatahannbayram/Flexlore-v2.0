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
    { en: "How it works", tr: "Nasıl çalışır", href: "/#product" },
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

const link = "group inline-flex min-h-9 items-center text-ink-muted transition-colors duration-200 hover:text-ink";

export function Footer({ lang = "en" }: { lang?: L }) {
  const f = home[lang].footer; const tr = lang === "tr";
  return (
    <footer className="bg-bg pt-16 text-[15px] md:pt-24" aria-labelledby="footer-h">
      <h2 id="footer-h" className="sr-only">Flexlore</h2>
      <div className="container-x">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          {/* Brand: stacked on phone, a row on tablet, a column on desktop */}
          <div className="gap-8 md:flex md:items-end md:justify-between lg:col-span-4 lg:block">
            <div>
              <img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={128} height={28} className="h-7 w-auto" />
              <p className="mt-5 max-w-[30ch] leading-[1.5] text-ink-muted">{f.tag}</p>
              <a href="mailto:support@flexlore.com" className="group mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white/[.05] pl-4 pr-5 text-ink transition-colors duration-200 hover:bg-white/[.1]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame" />support@flexlore.com
              </a>
            </div>
            <div className="mt-8 shrink-0 md:mt-0 lg:mt-9">
              <ul className="flex gap-2" aria-label={f.follow}>
                {SOCIAL.map(([n, k, h]) => (
                  <li key={k}>
                    <a href={h} target="_blank" rel="noopener" aria-label={n} title={n}
                      className="grid h-11 w-11 place-items-center rounded-full bg-white/[.05] text-ice-300 transition-colors duration-200 hover:bg-white/[.1] hover:text-ink">
                      <span aria-hidden="true" className="social-mark h-[18px] w-[18px]" style={{ ["--m" as string]: `url(/brand/social/${k}.svg)` }} />
                    </a>
                  </li>))}
              </ul>
              <p className="mt-7 text-[13px] font-medium text-ice-400">{f.app}</p>
              <StoreButtons small lang={lang} className="mt-3" />
            </div>
          </div>

          {/* Links: 2 columns on phone, 4 from tablet up */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8 lg:col-start-5">
            {GROUPS.map((g) => (
              <nav key={g.en} aria-label={tr ? g.tr : g.en}>
                <p className="mb-3 text-[13px] font-medium tracking-[.01em] text-ice-400">{tr ? g.tr : g.en}</p>
                <ul>
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

        {/* Bottom bar on a raised surface: copyright and legal on one line, trademark note under it */}
        <div className="mt-16 rounded-2xl bg-surface-1 px-5 py-5 text-caption md:mt-20 md:px-7">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <span className="flex items-center gap-4 text-ink-muted">© 2026 Flexlore Inc.
              <a href="#" className="group inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white/[.05] px-3 text-[13px] text-ice-300 transition-colors hover:bg-white/[.1] hover:text-ink">
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>{tr ? "Başa dön" : "Back to top"}</a></span>
            <ul className="-mx-2 flex flex-wrap" aria-label={tr ? "Yasal" : "Legal"}>
              {SITE.legal.map(([n, h]) => (
                <li key={n}><a className="inline-flex min-h-9 items-center px-2 text-ink-faint transition-colors duration-200 hover:text-ink" href={h}>{n}</a></li>))}
            </ul>
          </div>
        </div>
        <div className="h-6 md:h-8" />
      </div>
    </footer>
  );
}
