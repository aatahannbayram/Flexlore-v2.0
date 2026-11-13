"use client";
import { useLocale } from "../i18n/LocaleProvider";
import type { Locale } from "../i18n/locales";

const NOTE: Record<Locale, string> = {
  en: "", tr: "Yasal metinler İngilizcedir; bağlayıcı olan İngilizce sürümdür.", de: "Die Rechtstexte sind auf Englisch; die englische Fassung ist maßgeblich.",
  ar: "النصوص القانونية باللغة الإنجليزية، والنسخة الإنجليزية هي المعتمدة.", es: "Los textos legales están en inglés; la versión en inglés es la vinculante.",
  nl: "De juridische teksten zijn in het Engels; de Engelse versie is bindend.", pt: "Os textos jurídicos estão em inglês; a versão em inglês é a que prevalece.", fr: "Les textes juridiques sont en anglais ; la version anglaise fait foi.",
  pl: "Teksty prawne są po angielsku; wiążąca jest wersja angielska.",
};
export function LegalLangNote() {
  const { locale } = useLocale(); const t = NOTE[locale];
  return t ? <p className="mt-4 text-[14px] text-ink-faint" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>{t}</p> : null;
}
