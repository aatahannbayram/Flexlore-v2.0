"use client";
import { AIDetail } from "@/components/Sections";
import { Arr } from "@/components/Icons";
import { SITE } from "@/components/config";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { base } from "@/components/i18n/locales";

/* Visible copy of /ai/ (English and Turkish; other locales show English). Metadata stays in page.tsx. */
const T = {
  en: { k: "AI", h: ["AI does the paperwork.", "Your experts have the final say."], lead: "Your team reviews and approves every draft before it goes out.", cta: "Book a demo" },
  tr: { k: "Yapay zekâ", h: ["Evrak işini yapay zekâ yapar.", "Son sözü uzmanlarınız söyler."], lead: "Ekibiniz her taslağı yayına çıkmadan önce inceler ve onaylar.", cta: "Demo isteyin" },
};
export default function Body() {
  const t = T[base(useLocale().locale)];
  return (<main id="main" className="pb-[var(--section-y)] pt-32 md:pt-44"><div className="container-x">
    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{t.k}</p><h1 className="mt-5 max-w-[16ch] text-[clamp(40px,1rem+3.6vw,76px)] font-semibold leading-[0.98] tracking-[-0.05em] [text-wrap:balance]"><span className="t-ink">{t.h[0]}</span> <span className="t-accent">{t.h[1]}</span></h1>
    <p className="lead mt-5 max-w-[36rem]">{t.lead}</p>
    <AIDetail /><a href={SITE.demo} className="btn btn-cta mt-10 h-11 px-5 text-[15px]">{t.cta} <Arr className="ms-1" /></a></div></main>);
}
