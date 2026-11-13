"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { en, type Dict } from "./home/en";
import { LOCALES, detectLocale, isLocale, base, type Locale } from "./locales";

/* One language for the whole site. English ships with the page (server HTML); other dictionaries load only when chosen.
   Order: the visitor's saved choice, then the country from the browser time zone, then the browser language. */
const LOAD: Record<Locale, () => Promise<Dict>> = {
  en: async () => en,
  tr: () => import("./home/tr").then((m) => m.tr), de: () => import("./home/de").then((m) => m.de), ar: () => import("./home/ar").then((m) => m.ar),
  es: () => import("./home/es").then((m) => m.es), nl: () => import("./home/nl").then((m) => m.nl), pt: () => import("./home/pt").then((m) => m.pt),
  fr: () => import("./home/fr").then((m) => m.fr), pl: () => import("./home/pl").then((m) => m.pl),
};
const KEY = "flx-lang";
type Ctx = { locale: Locale; lang: "en" | "tr"; d: Dict; setLocale: (l: Locale) => void; ready: boolean };
const C = createContext<Ctx>({ locale: "en", lang: "en", d: en, setLocale: () => {}, ready: false });
export const useLocale = () => useContext(C);
export const fmt = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));

/* Start fetching the visitor's dictionary as soon as this module runs in the browser, in parallel with hydration, instead
   of after it: the page stays hidden (i18n-wait, behind the splash) until the dictionary is in, so this shortens the
   wait for every non-English visitor. The provider picks the promise up below; nothing renders differently. */
let early: { l: Locale; p: Promise<Dict> } | null = null;
if (typeof window !== "undefined") {
  try { let s: string | null = null; try { s = localStorage.getItem(KEY); } catch {} const l = isLocale(s) ? s : detectLocale(); if (l !== "en") early = { l, p: LOAD[l]() }; } catch {}
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, set] = useState<Locale>("en"); const [d, setD] = useState<Dict>(en); const [ready, setReady] = useState(false);
  const apply = useCallback((l: Locale) => {
    set(l); const p = early?.l === l ? early.p : LOAD[l](); early = null; p.then(setD).catch(() => setD(en)).finally(() => requestAnimationFrame(() => document.documentElement.classList.remove("i18n-wait")));
    const dir = LOCALES.find((x) => x.code === l)?.dir ?? "ltr";
    document.documentElement.lang = l; document.documentElement.dir = dir;
  }, []);
  useEffect(() => {
    let saved: string | null = null; try { saved = localStorage.getItem(KEY); } catch {}
    const l = isLocale(saved) ? saved : detectLocale();
    if (l !== "en") apply(l); else document.documentElement.classList.remove("i18n-wait"); setReady(true);
  }, [apply]);
  const setLocale = useCallback((l: Locale) => { try { localStorage.setItem(KEY, l); } catch {} apply(l); }, [apply]);
  return <C.Provider value={{ locale, lang: base(locale), d, setLocale, ready }}>{children}</C.Provider>;
}
