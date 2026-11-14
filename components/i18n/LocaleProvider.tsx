"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { en, type Dict } from "./home/en";
import { LOCALES, detectLocale, isLocale, base, type Locale } from "./locales";
import { isTrPath, trOf, enOf } from "./routes";

/* One language for the whole site. English ships with the page (server HTML); other dictionaries load only when chosen.
   Order: the visitor's saved choice, then the country from the browser time zone, then the browser language.
   Turkish has its own URLs (/tr/..., components/i18n/routes.ts): those pages are prerendered in Turkish by a nested
   provider with `fixed="tr"` (TrProvider). Choosing Turkish on an English page with a Turkish twin goes to that URL;
   choosing another language on a Turkish page goes to the English URL. A first-time visitor whose language resolves to
   Turkish is sent to the Turkish twin once (crawlers resolve to English, so they keep the English page). */
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
  try { if (!isTrPath(location.pathname)) { let s: string | null = null; try { s = localStorage.getItem(KEY); } catch {} const l = isLocale(s) ? s : detectLocale(); if (l !== "en" && !(l === "tr" && trOf(location.pathname))) early = { l, p: LOAD[l]() }; } } catch {}
}

/** Go to another URL keeping the query and hash. */
const go = (path: string) => { location.assign(path + location.search + location.hash); };

export function LocaleProvider({ children, fixed, dict }: { children: React.ReactNode; fixed?: Locale; dict?: Dict }) {
  const [locale, set] = useState<Locale>(fixed ?? "en"); const [d, setD] = useState<Dict>(dict ?? en); const [ready, setReady] = useState(!!fixed);
  const apply = useCallback((l: Locale) => {
    set(l); const p = early?.l === l ? early.p : LOAD[l](); early = null; p.then(setD).catch(() => setD(en)).finally(() => requestAnimationFrame(() => document.documentElement.classList.remove("i18n-wait")));
    const dir = LOCALES.find((x) => x.code === l)?.dir ?? "ltr";
    document.documentElement.lang = l; document.documentElement.dir = dir;
  }, []);
  useEffect(() => {
    if (fixed) { document.documentElement.lang = fixed; document.documentElement.dir = "ltr"; document.documentElement.classList.remove("i18n-wait"); return; }
    const path = location.pathname;
    /* Root provider on a Turkish URL: the page itself is Turkish (nested provider); switch the chrome outside it too. */
    if (isTrPath(path)) { apply("tr"); setReady(true); return; }
    let saved: string | null = null; try { saved = localStorage.getItem(KEY); } catch {}
    const l = isLocale(saved) ? saved : detectLocale();
    const twin = l === "tr" ? trOf(path) : null;
    if (twin) { go(twin); return; }
    if (l !== "en") apply(l); else document.documentElement.classList.remove("i18n-wait"); setReady(true);
  }, [apply, fixed]);
  const setLocale = useCallback((l: Locale) => {
    try { localStorage.setItem(KEY, l); } catch {}
    const path = location.pathname;
    if (isTrPath(path)) { if (l !== "tr") go(enOf(path)); return; }
    const twin = l === "tr" ? trOf(path) : null;
    if (twin) { go(twin); return; }
    apply(l);
  }, [apply]);
  return <C.Provider value={{ locale, lang: base(locale), d, setLocale, ready }}>{children}</C.Provider>;
}
