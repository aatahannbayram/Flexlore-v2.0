"use client";
/* Language, asked once (2026-11-15). The site no longer switches language on its own: the browser's country (time zone,
 * then browser language; nothing leaves the device) suggests one, and a small dialog asks "Türkçe detected: continue or
 * change". The answer is remembered (flx-lang); closing keeps the page's language and is remembered too (flx-lang-asked).
 * Not shown to automated browsers (tests, crawlers), so the first paint for search engines is the page as served. */
import { useEffect, useRef, useState } from "react";
import { Translate } from "../ui/icons";
import { useLocale } from "./LocaleProvider";
import { LOCALES, detectLocale, isLocale, type Locale } from "./locales";
import { isTrPath } from "./routes";

const T: Record<Locale, { k: string; h: string; p: string; go: string; change: string; close: string; pick: string }> = {
  en: { k: "Language", h: "Continue in English?", p: "Suggested from your location.", go: "Continue", change: "Change", close: "Close", pick: "Choose a language" },
  tr: { k: "Dil", h: "Türkçe devam edelim mi?", p: "Bulunduğunuz yere göre önerdik.", go: "Devam et", change: "Değiştir", close: "Kapat", pick: "Bir dil seçin" },
  de: { k: "Sprache", h: "Auf Deutsch weiter?", p: "Nach Ihrem Standort vorgeschlagen.", go: "Weiter", change: "Ändern", close: "Schließen", pick: "Sprache wählen" },
  nl: { k: "Taal", h: "Verder in het Nederlands?", p: "Voorgesteld op basis van je locatie.", go: "Verder", change: "Wijzigen", close: "Sluiten", pick: "Kies een taal" },
  fr: { k: "Langue", h: "Continuer en français ?", p: "Suggéré selon votre position.", go: "Continuer", change: "Changer", close: "Fermer", pick: "Choisir une langue" },
  es: { k: "Idioma", h: "¿Continuar en español?", p: "Sugerido según tu ubicación.", go: "Continuar", change: "Cambiar", close: "Cerrar", pick: "Elige un idioma" },
  pt: { k: "Idioma", h: "Continuar em português?", p: "Sugerido pela sua localização.", go: "Continuar", change: "Alterar", close: "Fechar", pick: "Escolha um idioma" },
  pl: { k: "Język", h: "Kontynuować po polsku?", p: "Zaproponowane na podstawie lokalizacji.", go: "Dalej", change: "Zmień", close: "Zamknij", pick: "Wybierz język" },
  ar: { k: "اللغة", h: "المتابعة بالعربية؟", p: "مقترحة حسب موقعك.", go: "متابعة", change: "تغيير", close: "إغلاق", pick: "اختر لغة" },
};
const ASKED = "flx-lang-asked";

export function LanguageModal() {
  const { setLocale } = useLocale();
  const [sug, setSug] = useState<Locale | null>(null); const [list, setList] = useState(false); const card = useRef<HTMLDivElement>(null);
  /* Focus goes to the dialog itself (not a button), so nothing looks pre-selected. */
  useEffect(() => { if (sug) card.current?.focus({ preventScroll: true }); }, [sug]);
  useEffect(() => {
    try {
      if (navigator.webdriver) return;
      /* Preview: ?dil=sor (or ?lang=ask) always asks, whatever was chosen before. */
      const force = /[?&](dil=sor|lang=ask)\b/.test(location.search);
      if (!force && (isLocale(localStorage.getItem("flx-lang")) || localStorage.getItem(ASKED))) return;
      const page: Locale = isTrPath(location.pathname) ? "tr" : "en";
      const d = detectLocale();
      if (force || d !== page) { const id = window.setTimeout(() => setSug(d), 900); return () => clearTimeout(id); }
    } catch {}
  }, []);
  useEffect(() => { if (!sug) return; const k = (e: KeyboardEvent) => { if (e.key === "Escape") close(); }; addEventListener("keydown", k); return () => removeEventListener("keydown", k); });
  if (!sug) return null;
  const t = T[sug]; const cur = LOCALES.find((l) => l.code === sug)!;
  const close = () => { try { localStorage.setItem(ASKED, "1"); } catch {} setSug(null); };
  const pick = (l: Locale) => { try { localStorage.setItem(ASKED, "1"); } catch {} setSug(null); setLocale(l); };
  /* Krea panel language: one compact dark sheet, a tight bold question, a cream pill to go on and a dark pill to change;
     small ring-framed flags. Phones: a sheet at the bottom; larger screens: centred. */
  const flag = (f: string, sz = 16) => <img src={`/flags/${f}.svg`} alt="" width={sz} height={sz} className="shrink-0 rounded-full ring-1 ring-white/20" style={{ width: sz, height: sz }} />;
  return (
    <div className="lang-modal fixed inset-0 z-[60] grid place-items-end p-3 sm:place-items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="lm-h" dir={cur.dir}>
      <button type="button" aria-label={t.close} onClick={close} className="absolute inset-0 cursor-default bg-[rgb(8_8_8/0.45)]" />
      <div ref={card} tabIndex={-1} className="lang-card dark relative w-full max-w-[380px] outline-none overflow-hidden rounded-[28px] bg-[#1b1b1b] p-2 text-white shadow-[0_50px_100px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/[.07]">
        <div className="px-4 pb-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-white/[.07] text-[#F4F0EB] ring-1 ring-white/[.08]"><Translate size={19} aria-hidden="true" /></span>
              <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-white/[.06] pe-2.5 ps-1.5 text-[12.5px] font-medium text-white/70">{flag(cur.flag, 16)}{cur.code === "ar" ? "Arabic" : cur.name}</span>
            </span>
            <button type="button" onClick={close} aria-label={t.close} className="-me-2 grid h-11 w-11 place-items-center rounded-full text-white/45 transition-colors hover:text-white">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button>
          </div>
          <h2 id="lm-h" className="mt-4 text-[26px] font-semibold leading-[1.05] tracking-[-0.045em]">{list ? t.pick : t.h}</h2>
          {!list && <p className="mt-2 text-[14.5px] text-white/50">{t.p}</p>}
        </div>
        {list ? (
          <ul className="grid grid-cols-2 gap-1 px-1 pb-1">
            {LOCALES.map((l) => { const on = l.code === sug; return (
              <li key={l.code}><button type="button" onClick={() => pick(l.code)}
                className={`flex min-h-11 w-full items-center gap-2.5 rounded-[16px] px-3 text-start text-[14px] transition-colors ${on ? "bg-white/[.09] text-white" : "text-white/70 hover:bg-white/[.06] hover:text-white"}`}>
                {flag(l.flag)}<span className="truncate">{l.code === "ar" ? "Arabic" : l.name}</span></button></li>); })}
          </ul>
        ) : (
          <div className="flex gap-1.5 p-1">
            <button type="button" onClick={() => pick(sug)} className="btn btn-primary group flex-1 gap-2">
              {t.go}<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <button type="button" onClick={() => setList(true)} className="btn btn-glass-2">{t.change}</button>
          </div>
        )}
      </div>
    </div>);
}
