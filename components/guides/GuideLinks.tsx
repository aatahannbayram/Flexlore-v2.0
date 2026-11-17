"use client";
/* "Guides and templates" strip on sector and feature pages: three guides picked for the page's topic, in the page's
 * language (EN /guides/..., TR /tr/rehber/...). Titles are kept short here because this ships to the browser; the full
 * guide content stays server-side (components/guides/data.ts). */
import NextLink from "next/link";
import { useLocale } from "../i18n/LocaleProvider";
import { GUIDE_TR } from "../i18n/routes";
import { ArrowRight } from "../ui/icons";

const T: Record<string, { en: string; tr: string; k: { en: string; tr: string } }> = {
  "video-sop": { en: "Video SOPs: what they are and how to make one", tr: "Video SOP nedir, nasıl hazırlanır?", k: { en: "Guide", tr: "Rehber" } },
  "sop-template": { en: "SOP template and how to write an SOP", tr: "SOP nedir? Ücretsiz SOP şablonu", k: { en: "Template", tr: "Şablon" } },
  "work-instruction-template": { en: "Work instruction template with examples", tr: "İş talimatı şablonu ve örneği", k: { en: "Template", tr: "Şablon" } },
  "training-matrix-template": { en: "Training and skills matrix template", tr: "Beceri (yetkinlik) matrisi şablonu", k: { en: "Template", tr: "Şablon" } },
  "restaurant-onboarding-checklist": { en: "Restaurant onboarding checklist", tr: "Restoran oryantasyon kontrol listesi", k: { en: "Checklist", tr: "Kontrol listesi" } },
  "sop-software": { en: "How to choose SOP software", tr: "SOP yazılımı nasıl seçilir?", k: { en: "Guide", tr: "Rehber" } },
  "lms-vs-sop-software": { en: "LMS vs SOP software for frontline teams", tr: "LMS mi, SOP yazılımı mı?", k: { en: "Guide", tr: "Rehber" } },
  "employee-training-tracker": { en: "Employee training tracker template", tr: "Personel eğitim takip tablosu", k: { en: "Template", tr: "Şablon" } },
  "on-the-job-training": { en: "On-the-job training: how to run it", tr: "İş başı eğitim nasıl yapılır?", k: { en: "Guide", tr: "Rehber" } },
  "microlearning-for-frontline-workers": { en: "Microlearning for shift workers", tr: "Mikro öğrenme nedir?", k: { en: "Guide", tr: "Rehber" } },
  "digital-checklists": { en: "Paper vs digital checklists", tr: "Dijital kontrol listesi", k: { en: "Checklist", tr: "Kontrol listesi" } },
};
/** Topic -> guides. Keys: sector slugs (Turkish, as in sectors.ts) and feature slugs. */
const PICK: Record<string, string[]> = {
  restoran: ["restaurant-onboarding-checklist", "digital-checklists", "on-the-job-training"],
  uretim: ["work-instruction-template", "on-the-job-training", "training-matrix-template"],
  otel: ["sop-template", "microlearning-for-frontline-workers", "digital-checklists"],
  franchise: ["sop-software", "lms-vs-sop-software", "employee-training-tracker"],
  depo: ["work-instruction-template", "on-the-job-training", "employee-training-tracker"],
  firin: ["sop-template", "digital-checklists", "microlearning-for-frontline-workers"],
  "video-to-sop": ["video-sop", "sop-template", "sop-software"],
  "video-editor": ["video-sop", "work-instruction-template", "sop-template"],
  "ai-quiz": ["microlearning-for-frontline-workers", "employee-training-tracker", "training-matrix-template"],
  "permissions-workspaces": ["employee-training-tracker", "lms-vs-sop-software", "sop-software"],
  "pdf-to-steps": ["sop-template", "work-instruction-template", "video-sop"],
};
const DEF = ["video-sop", "sop-template", "sop-software"];

export function GuideLinks({ topic }: { topic?: string }) {
  const { lang } = useLocale(); const tr = lang === "tr";
  const list = (topic && PICK[topic]) || DEF;
  return (
    <section aria-labelledby="gl-h" className="container-x py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="gl-h" className="text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[36px]">{tr ? "Rehberler ve şablonlar" : "Guides and templates"}</h2>
        <NextLink href={tr ? "/tr/rehber/" : "/guides/"} className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-ink-muted hover:text-ink">{tr ? "Tümünü görün" : "See all"}<ArrowRight size={14} aria-hidden="true" /></NextLink>
      </div>
      <ul className="mt-8 grid gap-3 md:grid-cols-3">{list.map((g) => (
        <li key={g}><NextLink href={tr ? `/tr/rehber/${GUIDE_TR[g]}/` : `/guides/${g}/`} className="group flex h-full min-h-[148px] flex-col rounded-[22px] bg-[var(--card)] p-6 ring-1 ring-white/[.06] transition-colors hover:ring-white/20">
          <span className="text-[13px] font-medium text-ink-faint">{T[g].k[tr ? "tr" : "en"]}</span>
          <span className="mt-3 text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">{T[g][tr ? "tr" : "en"]}</span>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-ink-muted group-hover:text-ink">{tr ? "Aç" : "Open"}<ArrowRight size={14} aria-hidden="true" /></span>
        </NextLink></li>))}</ul>
    </section>
  );
}
