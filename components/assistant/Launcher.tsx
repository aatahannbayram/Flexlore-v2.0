"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import type { Locale } from "../i18n/locales";

/* Site assistant, part 1: the launcher. This is all that ships with the first page load: a round glass button with the
   Flexlore mark in the bottom corner and its two labels. The panel module (chat, greeting text, local search) loads when
   the browser is idle after load, on hover or on the first click; the knowledge base itself loads only when someone asks.
   A plain dynamic import (no next/dynamic), so the loader runtime does not join the first load either. */
type Mod = typeof import("./Panel");
let modP: Promise<Mod> | null = null;
const loadPanel = () => (modP ??= import("./Panel"));

const T: Record<Locale, [string, string]> = {
  tr: ["Flexlore Asistan'ı açın", "Asistanı kapatın"], en: ["Open the Flexlore Assistant", "Close the assistant"],
  de: ["Flexlore-Assistent öffnen", "Assistent schließen"], ar: ["افتح مساعد Flexlore", "أغلق المساعد"],
  es: ["Abrir el asistente de Flexlore", "Cerrar el asistente"], ru: ["Открыть ассистента Flexlore", "Закрыть ассистента"],
  fr: ["Ouvrir l'assistant Flexlore", "Fermer l'assistant"], pl: ["Otwórz asystenta Flexlore", "Zamknij asystenta"],
};

/** The two-part Flexlore symbol (light upper half, orange lower half): the same file as the favicon. */
export const Mark = ({ className = "" }: { className?: string }) => <img src="/brand/symbol-main.svg" alt="" width={24} height={24} className={className} />;

const HI_KEY = "flx-as-hi";
export function AssistantLauncher() {
  const { locale } = useLocale(); const t = T[locale] ?? T.en;
  const [mod, setMod] = useState<Mod | null>(null); const [demo, setDemo] = useState(false);
  const [open, setOpen] = useState(false); const [ever, setEver] = useState(false); const [hi, setHi] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  // The customer demo page has its own layout and controls in this corner.
  useEffect(() => { setDemo(location.pathname.startsWith("/demo/")); }, []);
  // Warm the panel code when the browser is idle, so the first click opens at once.
  useEffect(() => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const go = () => { void loadPanel().catch(() => {}); };
    const id = window.setTimeout(() => (ric ? ric(go, { timeout: 4000 }) : go()), 3500);
    return () => window.clearTimeout(id);
  }, []);
  // The greeting shows once per visit, a few seconds after the page settles.
  useEffect(() => {
    let seen = false; try { seen = sessionStorage.getItem(HI_KEY) === "1"; } catch {}
    if (seen) return;
    const id = window.setTimeout(() => { loadPanel().then((m) => { setMod(m); setHi(true); }).catch(() => {}); }, 6000);
    return () => window.clearTimeout(id);
  }, []);
  const dismiss = useCallback(() => { setHi(false); try { sessionStorage.setItem(HI_KEY, "1"); } catch {} }, []);
  const toggle = () => { setEver(true); dismiss(); setOpen((o) => !o); };
  useEffect(() => { if (ever && !mod) loadPanel().then(setMod).catch(() => {}); }, [ever, mod]);
  const close = useCallback(() => { setOpen(false); requestAnimationFrame(() => btn.current?.focus()); }, []);
  if (demo) return null;
  return (
    <div className="dark fixed bottom-4 end-4 z-[45] flex flex-col items-end gap-3 text-white sm:bottom-6 sm:end-6 print:hidden">
      {ever && mod && <mod.default open={open} onClose={close} />}
      {hi && !open && mod && <mod.Greeting onOpen={toggle} onDismiss={dismiss} />}
      <button ref={btn} type="button" onClick={toggle} onPointerEnter={() => { void loadPanel().catch(() => {}); }} aria-expanded={open} aria-controls="flx-assistant" aria-label={open ? t[1] : t[0]}
        className="grid h-14 w-14 place-items-center rounded-full bg-[rgb(22_22_22/0.78)] text-[#F4F0EB] shadow-[0_16px_36px_-14px_rgb(0_0_0/0.85),inset_0_1px_0_rgb(255_255_255/0.12)] backdrop-blur-xl transition-transform duration-300 hover:scale-[1.04] motion-reduce:transition-none motion-reduce:hover:scale-100">
        {open
          ? <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          : <Mark className="h-6 w-6" />}
      </button>
    </div>);
}
