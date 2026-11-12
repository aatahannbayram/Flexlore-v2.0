"use client";
import { IntegrationsDetail } from "@/components/Sections";
import { Arr } from "@/components/Icons";
import { SITE } from "@/components/config";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { base } from "@/components/i18n/locales";

/* Visible copy of /integrations/ (English and Turkish; other locales show English). Metadata stays in page.tsx. */
const T = {
  en: { k: "Integrations", h: ["Works where your team", "already is."], lead: "Phones for the people doing the job, web for the people running it. Data connections are on the roadmap and labelled as such.", cta: "Book a demo" },
  tr: { k: "Entegrasyonlar", h: ["Ekibinizin zaten", "olduğu yerde çalışır."], lead: "İşi yapanlar için telefon, işi yönetenler için web. Veri bağlantıları yol haritamızda ve sayfada da öyle belirtiliyor.", cta: "Demo isteyin" },
};
export default function Body() {
  const t = T[base(useLocale().locale)];
  return (<main id="main" className="pb-[var(--section-y)] pt-32 md:pt-44"><div className="container-x">
    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{t.k}</p><h1 className="mt-5 max-w-[16ch] text-[clamp(40px,1rem+3.6vw,76px)] font-semibold leading-[0.98] tracking-[-0.05em] [text-wrap:balance]"><span className="t-ink">{t.h[0]}</span> <span className="t-accent">{t.h[1]}</span></h1>
    <p className="lead mt-5 max-w-[36rem]">{t.lead}</p>
    <IntegrationsDetail /><a href={SITE.demo} className="btn btn-cta mt-10 h-11 px-5 text-[15px]">{t.cta} <Arr className="ms-1" /></a></div></main>);
}
