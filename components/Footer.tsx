"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, EnvelopeSimple, ArrowUpRight, ArrowUp } from "./ui/icons";
import { StoreButtons } from "./Icons";
import { SITE } from "./config";
import { useLocale } from "./i18n/LocaleProvider";

/* Footer (v4): warm dark ground in three layers.
 * 1. Brand block (wordmark, line, social) and four link groups. Phones: the link groups are accordions (48 px rows).
 * 2. Two cards: "Ask an AI about Flexlore" with the assistants' own monochrome marks, and "Talk to us" with mail and the apps.
 * 3. Legal row, then a large faded wordmark that closes the page.
 * All marks (social and AI) are official monochrome glyphs (Simple Icons, CC0) drawn through a CSS mask, so they follow
 * the text colour, carry no brand colour (no blue) and add no JS. */

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
    { k: "faq", en: "FAQ", tr: "SSS", href: "/faq/" },
    { k: "demo", en: "Book a demo", tr: "Demo isteyin", href: SITE.demo, ext: true },
  ] },
];

const SOCIAL: [string, string, string][] = [
  ["LinkedIn", "linkedin", SITE.social.linkedin],
  ["Instagram", "instagram", SITE.social.instagram],
  ["YouTube", "youtube", SITE.social.youtube],
  ["Product Hunt", "producthunt", SITE.productHunt],
];

/* "Ask an AI": opens the assistant with a ready prompt about Flexlore. */
const AI: [string, string, (q: string) => string][] = [
  ["ChatGPT", "chatgpt", (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`],
  ["Claude", "claude", (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}`],
  ["Perplexity", "perplexity", (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`],
];

/* Footer-only lines, kept here so the shared dictionaries do not change shape. */
const T: Record<string, { all: string; faq: string; aiP: string; talk: string; talkP: string; mail: string; open: string }> = {
  en: { faq: "FAQ", all: "All features", aiP: "Open your assistant with a ready question about what Flexlore does and who it is for.", talk: "Talk to us", talkP: "Questions about a rollout, a pilot or your account? Write to us.", mail: "Email", open: "opens in a new tab" },
  tr: { faq: "SSS", all: "Tüm özellikler", aiP: "Asistanınızı Flexlore'un ne yaptığı ve kimin için olduğu hakkında hazır bir soruyla açın.", talk: "Bize yazın", talkP: "Kurulum, pilot ya da hesabınızla ilgili sorularınız için bize yazın.", mail: "E-posta", open: "yeni sekmede açılır" },
  de: { faq: "FAQ", all: "Alle Funktionen", aiP: "Öffnen Sie Ihren Assistenten mit einer fertigen Frage dazu, was Flexlore macht und für wen.", talk: "Schreiben Sie uns", talkP: "Fragen zu Einführung, Pilot oder Konto? Schreiben Sie uns.", mail: "E-Mail", open: "öffnet in neuem Tab" },
  ar: { faq: "الأسئلة الشائعة", all: "جميع الميزات", aiP: "افتح مساعدك بسؤال جاهز عمّا تفعله Flexlore ولمن هي.", talk: "تواصل معنا", talkP: "لديك أسئلة حول الإطلاق أو التجربة أو حسابك؟ راسلنا.", mail: "البريد الإلكتروني", open: "يفتح في علامة تبويب جديدة" },
  es: { faq: "Preguntas frecuentes", all: "Todas las funciones", aiP: "Abre tu asistente con una pregunta lista sobre qué hace Flexlore y para quién es.", talk: "Escríbenos", talkP: "¿Preguntas sobre la implantación, un piloto o tu cuenta? Escríbenos.", mail: "Correo", open: "se abre en una pestaña nueva" },
  ru: { faq: "Частые вопросы", all: "Все функции", aiP: "Откройте ассистента с готовым вопросом о том, что делает Flexlore и для кого он.", talk: "Напишите нам", talkP: "Вопросы о внедрении, пилоте или аккаунте? Напишите нам.", mail: "Почта", open: "откроется в новой вкладке" },
  fr: { faq: "FAQ", all: "Toutes les fonctionnalités", aiP: "Ouvrez votre assistant avec une question prête sur ce que fait Flexlore et pour qui.", talk: "Écrivez-nous", talkP: "Une question sur le déploiement, un pilote ou votre compte ? Écrivez-nous.", mail: "E-mail", open: "s'ouvre dans un nouvel onglet" },
  pl: { faq: "FAQ", all: "Wszystkie funkcje", aiP: "Otwórz asystenta z gotowym pytaniem o to, co robi Flexlore i dla kogo jest.", talk: "Napisz do nas", talkP: "Pytania o wdrożenie, pilotaż lub konto? Napisz do nas.", mail: "E-mail", open: "otwiera się w nowej karcie" },
};

const link = "inline-flex min-h-11 min-w-11 items-center text-[15px] text-white/65 transition-colors duration-200 hover:text-white";
/* A dim, softly blurred photo behind each footer card; the glass and a dark wash on top keep the text readable. */
const CardBg = ({ src, pos = "50% 50%" }: { src: string; pos?: string }) => (
  <span aria-hidden="true" className="absolute inset-0 -z-10">
    <img src={src} alt="" loading="lazy" decoding="async" style={{ objectPosition: pos }} className="h-full w-full scale-105 object-cover opacity-55 blur-[2px] saturate-[0.7]" />
    <span className="absolute inset-0 bg-[linear-gradient(110deg,rgb(14_14_14/0.94)_0%,rgb(14_14_14/0.78)_45%,rgb(14_14_14/0.5)_100%)] rtl:bg-[linear-gradient(250deg,rgb(14_14_14/0.94)_0%,rgb(14_14_14/0.78)_45%,rgb(14_14_14/0.5)_100%)]" />
  </span>);
const card = "relative isolate overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgb(255_255_255/0.06)_0%,rgb(255_255_255/0.02)_100%)] p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.07)] ring-1 ring-[rgb(255_255_255/0.08)] backdrop-blur-xl md:p-7";
const Mark = ({ k, dir, cls = "h-4 w-4" }: { k: string; dir: "social" | "ai"; cls?: string }) => (
  <span aria-hidden="true" className={`social-mark shrink-0 ${cls}`} style={{ ["--m" as string]: `url(/brand/${dir}/${k}.svg)` }} />);

export function Footer({ lang: _l }: { lang?: L } = {}) {
  const { d, lang, locale } = useLocale(); const f = d.footer; const t = T[locale] ?? T.en; const [open, setOpen] = useState<string | null>(null);
  return (
    <footer aria-labelledby="footer-h" className="dark relative overflow-hidden border-t border-[rgb(255_255_255/0.08)] bg-[#111111] text-[15px] text-white">
      <h2 id="footer-h" className="sr-only">Flexlore</h2>
      <div className="container-x relative pt-12 md:pt-20">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <div className="lg:col-span-4">
            <img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={240} height={52} className="h-8 w-auto md:h-10" />
            <p className="mt-4 max-w-[30ch] text-[16px] leading-[1.5] text-white/65 md:text-[17px]">{f.tag}</p>
            <ul className="mt-5 flex gap-2" aria-label={f.follow}>
              {SOCIAL.map(([n, k, h]) => (
                <li key={k}>
                  <a href={h} target="_blank" rel="noopener" aria-label={`${n} (${t.open})`} title={n}
                    className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-[rgb(255_255_255/0.12)] text-white/75 transition-colors duration-200 hover:bg-white/[.08] hover:text-white">
                    <Mark k={k} dir="social" cls="h-[17px] w-[17px]" />
                  </a>
                </li>))}
            </ul>
          </div>

          {/* Phones: each group opens under its own heading. From 640 px: four open columns. */}
          <div className="grid gap-x-6 border-y border-[rgb(255_255_255/0.08)] sm:grid-cols-4 sm:border-0 lg:col-span-8">
            {GROUPS.map((g) => { const on = open === g.g; return (
              <nav key={g.en} aria-label={f.groups[g.g]} className="border-[rgb(255_255_255/0.08)] [&:not(:first-child)]:border-t sm:!border-0">
                <p className="mb-3 hidden text-[13px] font-semibold uppercase tracking-[0.12em] text-white/55 sm:block">{f.groups[g.g]}</p>
                <button type="button" aria-expanded={on} aria-controls={`ft-${g.g}`} onClick={() => setOpen(on ? null : g.g)}
                  className="flex min-h-14 w-full items-center justify-between text-start text-[16px] font-medium text-white sm:hidden">
                  {f.groups[g.g]}<Plus size={16} aria-hidden="true" className={`text-white/55 transition-transform duration-300 ${on ? "rotate-45" : ""}`} /></button>
                <ul id={`ft-${g.g}`} className={`pb-3 sm:block sm:pb-0 ${on ? "block" : "hidden"}`}>
                  {g.items.map((x) => {
                    const label = x.k === "features" ? t.all : x.k === "faq" ? t.faq : (f.links as Record<string, string>)[x.k] ?? x.en;
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

        <div className="mt-10 grid gap-3 md:mt-16 md:grid-cols-2 md:gap-4">
          <section aria-labelledby="ft-ai" className={`${card} flex flex-col`}>
            <CardBg src="/media/v3/web-toplanti-800.webp" pos="60% 40%" />
            <h3 id="ft-ai" className="text-[17px] font-semibold text-white md:text-[19px]">{f.ai}</h3>
            <p className="mt-2 max-w-[40ch] text-[14px] leading-[1.55] text-white/60 md:text-[15px]">{t.aiP}</p>
            <ul className="mt-auto grid grid-cols-1 gap-2 pt-5 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
              {AI.map(([n, k, u]) => (
                <li key={n}>
                  <a href={u(f.aiQ)} target="_blank" rel="noopener" aria-label={`${n} (${t.open})`}
                    className="group flex min-h-12 items-center gap-2.5 rounded-[14px] bg-white/[.05] px-3.5 text-[14px] font-medium text-white/85 ring-1 ring-[rgb(255_255_255/0.08)] transition-colors hover:bg-white/[.1] hover:text-white">
                    <Mark k={k} dir="ai" cls="h-[18px] w-[18px]" />
                    <span className="min-w-0 flex-1 truncate">{n}</span>
                    <ArrowUpRight size={13} aria-hidden="true" className="shrink-0 text-white/40 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80 rtl:-scale-x-100" />
                  </a>
                </li>))}
            </ul>
          </section>

          <section aria-labelledby="ft-talk" className={card}>
            <CardBg src="/photos/hotel-desk-800.webp" pos="50% 45%" />
            <h3 id="ft-talk" className="text-[17px] font-semibold text-white md:text-[19px]">{t.talk}</h3>
            <p className="mt-2 max-w-[40ch] text-[14px] leading-[1.55] text-white/60 md:text-[15px]">{t.talkP}</p>
            <a href="mailto:support@flexlore.com" className="group mt-5 flex min-h-12 items-center gap-3 rounded-[14px] bg-white/[.05] px-3.5 py-2 ring-1 ring-[rgb(255_255_255/0.08)] transition-colors hover:bg-white/[.1]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[.08] text-white"><EnvelopeSimple size={18} aria-hidden="true" /></span>
              <span className="min-w-0 flex-1"><span className="block text-[12px] text-white/55">{t.mail}</span><span className="block truncate text-[15px] font-medium text-white">support@flexlore.com</span></span>
              <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 text-white/40 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80 rtl:-scale-x-100" />
            </a>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[rgb(255_255_255/0.08)] pt-4">
              <span className="text-[14px] text-white/60">{f.app}</span>
              <div className="[&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center"><StoreButtons small lang={lang} /></div>
            </div>
          </section>
        </div>

        <div className="mt-10 border-t border-[rgb(255_255_255/0.08)] pt-4 text-[13px] md:mt-14">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <span className="flex flex-wrap items-center gap-x-5 gap-y-1 text-white/60">© 2026 Flexlore Inc. {f.rights}
              <a href="#" className="group inline-flex min-h-11 items-center gap-1.5 text-white/75 transition-colors hover:text-white">
                <ArrowUp size={13} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5" />{f.top}</a></span>
            <ul className="-mx-2 flex flex-wrap" aria-label={f.legal}>
              {SITE.legal.map(([n, h]) => (
                <li key={n}><a className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-white/60 transition-colors duration-200 hover:text-white" href={h}>{n}</a></li>))}
            </ul>
          </div>
          <p className="mt-2 max-w-[90ch] text-[12px] leading-[1.5] text-white/55">
            © 2026 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.
          </p>
        </div>
      </div>
      {/* Closing wordmark: decorative, fades into the ground, cropped by the page edge. */}
      <div aria-hidden="true" className="container-x pointer-events-none mt-4 select-none overflow-hidden md:mt-6">
        <p dir="ltr" className="translate-y-[22%] bg-[linear-gradient(180deg,rgb(255_255_255/0.12)_0%,rgb(255_255_255/0)_85%)] bg-clip-text text-center text-[clamp(84px,21vw,300px)] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent">Flexlore</p>
      </div>
    </footer>
  );
}
