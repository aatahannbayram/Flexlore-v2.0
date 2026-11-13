"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, EnvelopeSimple, ArrowUpRight, ArrowUp } from "./ui/icons";
import { StoreButtons } from "./Icons";
import { SITE } from "./config";
import { useLocale } from "./i18n/LocaleProvider";
import { consentNeeded, openConsent, CONSENT_SETTINGS } from "./consent";
import { useTrustTR } from "./trust/flags";
import { TRUST_TR_FOOTER } from "./trust/config";

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
    { k: "restaurants", en: "Restaurants", tr: "Restoranlar", href: "/industries/restaurants/" },
    { k: "manufacturing", en: "Manufacturing", tr: "Üretim", href: "/industries/manufacturing/" },
    { k: "hotels", en: "Hotels", tr: "Oteller", href: "/industries/hotels/" },
    { k: "franchises", en: "Franchises", tr: "Franchise", href: "/industries/franchises/" },
    { k: "warehouses", en: "Warehouses", tr: "Depolar", href: "/industries/warehouses/" },
    { k: "bakeries", en: "Bakeries & cafés", tr: "Fırın ve kafeler", href: "/industries/bakeries-cafes/" },
  ] },
  { g: "company", en: "Company", tr: "Şirket", items: [
    { k: "blog", en: "Blog", href: "/blog/" },
    { k: "company", en: "About us", tr: "Hakkımızda", href: "/company/" },
    { k: "careers", en: "Careers", tr: "Kariyer", href: "/careers/" },
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
  pt: { faq: "Perguntas frequentes", all: "Todos os recursos", aiP: "Abra seu assistente com uma pergunta pronta sobre o que o Flexlore faz e para quem é.", talk: "Fale conosco", talkP: "Dúvidas sobre implantação, piloto ou sua conta? Escreva para nós.", mail: "E-mail", open: "abre em uma nova aba" },
  nl: { faq: "FAQ", all: "Alle functies", aiP: "Open uw assistent met een kant-en-klare vraag over wat Flexlore doet en voor wie het is.", talk: "Neem contact op", talkP: "Vragen over een uitrol, een pilot of uw account? Schrijf ons.", mail: "E-mail", open: "opent in een nieuw tabblad" },
  fr: { faq: "FAQ", all: "Toutes les fonctionnalités", aiP: "Ouvrez votre assistant avec une question prête sur ce que fait Flexlore et pour qui.", talk: "Écrivez-nous", talkP: "Une question sur le déploiement, un pilote ou votre compte ? Écrivez-nous.", mail: "E-mail", open: "s'ouvre dans un nouvel onglet" },
  pl: { faq: "FAQ", all: "Wszystkie funkcje", aiP: "Otwórz asystenta z gotowym pytaniem o to, co robi Flexlore i dla kogo jest.", talk: "Napisz do nas", talkP: "Pytania o wdrożenie, pilotaż lub konto? Napisz do nas.", mail: "E-mail", open: "otwiera się w nowej karcie" },
};

const link = "inline-flex min-h-11 min-w-11 items-center text-[14.5px] text-white/60 transition-colors duration-200 hover:text-white";
/* A dim, softly blurred photo behind each footer card; the glass and a dark wash on top keep the text readable. */
const Mark = ({ k, dir, cls = "h-4 w-4" }: { k: string; dir: "social" | "ai"; cls?: string }) => (
  <span aria-hidden="true" className={`social-mark shrink-0 ${cls}`} style={{ ["--m" as string]: `url(/brand/${dir}/${k}.svg)` }} />);

/* Footer legal row in the visitor's language (order of SITE.legal). The documents themselves are English. */
const LEGAL_LABEL: Record<string, string[]> = {
  en: ["Privacy", "Terms", "Cookies", "Security", "DPA", "Subprocessors", "Acceptable use", "Billing"],
  tr: ["Gizlilik", "Koşullar", "Çerezler", "Güvenlik", "Veri işleme", "Alt işleyenler", "Kabul edilebilir kullanım", "Faturalama"],
  de: ["Datenschutz", "AGB", "Cookies", "Sicherheit", "AVV", "Unterauftragsverarbeiter", "Nutzungsrichtlinie", "Abrechnung"],
  ar: ["الخصوصية", "الشروط", "ملفات تعريف الارتباط", "الأمان", "اتفاقية معالجة البيانات", "المعالجون الفرعيون", "الاستخدام المقبول", "الفوترة"],
  es: ["Privacidad", "Términos", "Cookies", "Seguridad", "DPA", "Subencargados", "Uso aceptable", "Facturación"],
  pt: ["Privacidade", "Termos", "Cookies", "Segurança", "DPA", "Subprocessadores", "Uso aceitável", "Cobrança"],
  nl: ["Privacy", "Voorwaarden", "Cookies", "Beveiliging", "DPA", "Subverwerkers", "Acceptabel gebruik", "Facturering"],
  fr: ["Confidentialité", "Conditions", "Cookies", "Sécurité", "DPA", "Sous-traitants", "Utilisation acceptable", "Facturation"],
  pl: ["Prywatność", "Warunki", "Cookies", "Bezpieczeństwo", "DPA", "Podmioty przetwarzające", "Dozwolone użycie", "Płatności"],
};

export function Footer({ lang: _l }: { lang?: L } = {}) {
  const { d, lang, locale } = useLocale(); const f = d.footer; const t = T[locale] ?? T.en; const [open, setOpen] = useState<string | null>(null); const trust = useTrustTR();
  return (
    <footer aria-labelledby="footer-h" className="ember ember-foot dark border-t border-[rgb(255_255_255/0.08)] text-[15px] text-white">
      <h2 id="footer-h" className="sr-only">Flexlore</h2>
      <div className="container-x relative pt-12 md:pt-20">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
          <div className="lg:col-span-4">
            <img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={240} height={52} className="h-8 w-auto md:h-10" />
            <p className="mt-4 max-w-[30ch] text-[15px] leading-[1.55] text-white/55">{f.tag}</p>
            <ul className="mt-5 flex gap-2" aria-label={f.follow}>
              {SOCIAL.map(([n, k, h]) => (
                <li key={k}>
                  <a href={h} target="_blank" rel="noopener" aria-label={`${n} (${t.open})`} title={n}
                    className="grid h-11 w-11 place-items-center rounded-full text-white/75 transition-colors duration-200 hover:bg-white/[.08] hover:text-white">
                    <Mark k={k} dir="social" cls="h-[17px] w-[17px]" />
                  </a>
                </li>))}
            </ul>
          </div>

          {/* Phones: each group opens under its own heading. From 640 px: four open columns. */}
          <div className="grid gap-x-6 border-y border-[rgb(255_255_255/0.08)] sm:grid-cols-4 sm:border-0 lg:col-span-8">
            {GROUPS.map((g) => { const on = open === g.g; return (
              <nav key={g.en} aria-label={f.groups[g.g]} className="border-[rgb(255_255_255/0.08)] [&:not(:first-child)]:border-t sm:!border-0">
                <p className="mb-3 hidden text-[13.5px] font-medium text-white/45 sm:block">{f.groups[g.g]}</p>
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

        {/* One quiet utility row instead of two photo cards: ask an AI about Flexlore, write to us, get the app. */}
        <div className="mt-10 grid gap-6 border-t border-[rgb(255_255_255/0.08)] pt-8 md:mt-14 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <section aria-labelledby="ft-ai" className="hidden md:block">
            <h3 id="ft-ai" className="text-[14px] font-medium text-white/80">{f.ai}</h3>
            <p className="mt-1 max-w-[46ch] text-[13.5px] leading-[1.55] text-white/50">{t.aiP}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {AI.map(([n, k, u]) => (
                <li key={n}>
                  <a href={u(f.aiQ)} target="_blank" rel="noopener" aria-label={`${n} (${t.open})`}
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-white/[.05] pe-3.5 ps-3 text-[13.5px] font-medium text-white/80 ring-1 ring-white/[.07] transition-colors hover:bg-white/[.1] hover:text-white">
                    {k === "claude" ? <img src="/brand/ai/claude-color.svg" alt="" width={16} height={16} className="h-4 w-4 shrink-0" /> : <Mark k={k} dir="ai" cls="h-4 w-4" />}{n}
                    <ArrowUpRight size={12} aria-hidden="true" className="text-white/35 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/80 rtl:-scale-x-100" />
                  </a>
                </li>))}
            </ul>
          </section>
          <section aria-labelledby="ft-talk" className="lg:border-s lg:border-[rgb(255_255_255/0.08)] lg:ps-12">
            <h3 id="ft-talk" className="text-[14px] font-medium text-white/80">{t.talk}</h3>
            <a href="mailto:support@flexlore.com" className="group mt-1 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-white/90 transition-colors hover:text-white">
              <EnvelopeSimple size={15} aria-hidden="true" className="text-white/55" />support@flexlore.com
              <ArrowUpRight size={14} aria-hidden="true" className="text-white/40 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" /></a>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-[13px] text-white/50">{f.app}</span>
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
              {SITE.legal.map(([n, h], k) => (
                <li key={n}><a className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-white/60 transition-colors duration-200 hover:text-white" href={h}>{(LEGAL_LABEL[locale] ?? LEGAL_LABEL.en)[k] ?? n}</a></li>))}
              {trust && <li><Link className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-white/80 transition-colors duration-200 hover:text-white" href={trust.href}>{TRUST_TR_FOOTER[trust.tr ? "tr" : "en"]}</Link></li>}
              {consentNeeded && <li><button type="button" onClick={openConsent} className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-white/60 transition-colors duration-200 hover:text-white">{CONSENT_SETTINGS[locale] ?? CONSENT_SETTINGS.en}</button></li>}
            </ul>
          </div>
          <p className="mt-3 max-w-[90ch] pb-8 text-[12px] leading-[1.5] text-white/35">
            © 2026 NVIDIA, the NVIDIA logo, and NVIDIA Inception are trademarks and/or registered trademarks of NVIDIA Corporation in the U.S. and other countries.
          </p>
        </div>
      </div>
    </footer>
  );
}
