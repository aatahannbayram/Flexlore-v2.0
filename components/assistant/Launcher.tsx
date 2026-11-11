"use client";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import type { Locale } from "../i18n/locales";

/* Flex AI, part 1: the round glass button in the bottom corner, and once per visit a short greeting. This is all that
   ships with the page. Part 2 (./FlexPanel: our chat and voice panel on the ElevenLabs agent, agent config as code in
   elevenlabs/) is a plain dynamic import fetched when the browser is idle or on the first click; it connects to nothing
   until the visitor sends a message or taps the mic.
     NEXT_PUBLIC_ELEVENLABS_AGENT_ID  the public agent's ID. Unset = no assistant at all.
   The agent only accepts sessions from the allowlisted hosts (preprod, flexlore.com, www, localhost). The button lives in
   the root layout, so the panel and a running conversation survive page changes. */
const AGENT = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "";
type Mod = typeof import("./FlexPanel");
let modP: Promise<Mod> | null = null;
const loadMod = () => (modP ??= import("./FlexPanel").catch((e) => { modP = null; throw e; }));

const T: Record<Locale, [string, string, string]> = {
  tr: ["Flex AI'yı açın", "Flex AI'yı kapatın", "Flex AI şu an açılamadı. Lütfen biraz sonra tekrar deneyin."],
  en: ["Open Flex AI", "Close Flex AI", "Flex AI could not open right now. Please try again shortly."],
  de: ["Flex AI öffnen", "Flex AI schließen", "Flex AI konnte gerade nicht geöffnet werden."], ar: ["افتح Flex AI", "أغلق Flex AI", "تعذر فتح Flex AI الآن."],
  es: ["Abrir Flex AI", "Cerrar Flex AI", "Flex AI no se pudo abrir ahora."], ru: ["Открыть Flex AI", "Закрыть Flex AI", "Сейчас не удалось открыть Flex AI."],
  fr: ["Ouvrir Flex AI", "Fermer Flex AI", "Flex AI n'a pas pu s'ouvrir."], pl: ["Otwórz Flex AI", "Zamknij Flex AI", "Nie udało się otworzyć Flex AI."],
};

/** The Flexlore app icon (the favicon): the two-part mark on its dark tile. */
export const Mark = ({ className = "" }: { className?: string }) => <img src="/icon.svg" alt="" width={32} height={32} className={className} />;
const X = () => <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden="true"><path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
const ANIM = `.fl-aura{background:conic-gradient(from 0deg,rgba(244,240,235,0),rgba(244,240,235,.55),rgba(236,103,38,.35),rgba(244,240,235,.45),rgba(244,240,235,0));animation:fl-spin 6s linear infinite}@keyframes fl-spin{to{transform:rotate(360deg)}}.fl-breathe{animation:fl-breathe 3s ease-in-out infinite}@keyframes fl-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}.fl-bar{animation:fl-bar 1.1s ease-in-out infinite;transform-origin:center}@keyframes fl-bar{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}.fl-pop{animation:fl-pop .55s cubic-bezier(.34,1.56,.64,1) both}@keyframes fl-pop{from{opacity:0;transform:translateY(12px) scale(.85)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.fl-aura,.fl-breathe,.fl-bar,.fl-pop{animation:none}}.as-in{animation:as-in .45s cubic-bezier(.22,1,.36,1) both}@keyframes as-in{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}.as-spin{animation:as-spin .9s linear infinite}@keyframes as-spin{to{transform:rotate(360deg)}}.as-halo{animation:as-halo 2.8s ease-out infinite}@keyframes as-halo{0%{transform:scale(1);opacity:.35}100%{transform:scale(1.45);opacity:0}}@media (prefers-reduced-motion:reduce){.as-in,.as-spin,.as-halo{animation:none;opacity:0}}`;
const bubble = "as-in max-w-[min(300px,calc(100vw-96px))] rounded-[18px] bg-[rgb(22_22_22/0.88)] text-[14px] leading-snug text-white shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)] backdrop-blur-xl";

const HI_KEY = "flx-as-hi";
export function AssistantLauncher() {
  const { locale } = useLocale(); const t = T[locale] ?? T.en;
  const [mod, setMod] = useState<Mod | null>(null);
  const [open, setOpen] = useState(false); const [ever, setEver] = useState(false); const [err, setErr] = useState(false);
  const [hi, setHi] = useState(false); const [demo, setDemo] = useState(false); const [active, setActive] = useState(false);
  // The customer demo page has its own layout and controls in this corner.
  useEffect(() => { setDemo(location.pathname.startsWith("/demo/")); }, []);
  // Warm part 2 when the browser is idle; the greeting shows once per visit, a few seconds after the page settles.
  useEffect(() => {
    if (!AGENT) return;
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const go = () => { loadMod().then(setMod).catch(() => {}); };
    const a = window.setTimeout(() => (ric ? ric(go, { timeout: 4000 }) : go()), 3500);
    let seen = false; try { seen = sessionStorage.getItem(HI_KEY) === "1"; } catch {}
    const b = seen ? 0 : window.setTimeout(() => { loadMod().then((m) => { setMod(m); setHi(true); }).catch(() => {}); }, 6000);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, []);
  const dismiss = useCallback(() => { setHi(false); try { sessionStorage.setItem(HI_KEY, "1"); } catch {} }, []);
  const toggle = useCallback(() => {
    dismiss(); setEver(true);
    if (open) { setOpen(false); return; }
    loadMod().then((m) => { setMod(m); setOpen(true); setErr(false); }).catch(() => setErr(true));
  }, [dismiss, open]);
  const close = useCallback(() => { setOpen(false); requestAnimationFrame(() => document.getElementById("flx-ai-btn")?.focus()); }, []);
  useEffect(() => { if (!err) return; const id = window.setTimeout(() => setErr(false), 6000); return () => window.clearTimeout(id); }, [err]);
  if (!AGENT || demo) return null;
  const g = mod ? (mod.GREET[locale] ?? mod.GREET.en) : null;
  return (<>
    {/* The panel stays mounted once opened, so closing it does not end a conversation in progress. */}
    {ever && mod && <div hidden={!open}><mod.default locale={locale} open={open} onClose={close} onActive={setActive} /></div>}
    <div className={`dark fixed bottom-4 end-4 z-[47] flex flex-col items-end gap-3 text-white sm:bottom-6 sm:end-6 print:hidden ${open ? "max-sm:hidden" : ""}`}>
      <style>{ANIM}</style>
      {g && hi && !open && (
        <div role="status" className={`${bubble} relative flex items-start gap-1 self-end py-1.5 pe-1.5 ps-4`}>
          <button type="button" onClick={toggle} className="min-h-11 flex-1 py-1.5 text-start">{g[0]}</button>
          <button type="button" onClick={dismiss} aria-label={g[1]} className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"><X /></button>
        </div>)}
      {err && <p role="alert" className={`${bubble} px-4 py-3 text-white/85`}>{t[2]}</p>}
      <button id="flx-ai-btn" type="button" onClick={toggle} aria-expanded={open} aria-label={open ? t[1] : t[0]}
        className={`fl-pop group relative flex h-14 items-center gap-2.5 rounded-full bg-[#161616] p-1.5 text-[#F4F0EB] shadow-[0_18px_44px_-14px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.09),inset_0_1px_0_rgb(255_255_255/0.1)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-14px_rgb(0_0_0/0.95),0_0_0_1px_rgb(255_255_255/0.16),0_0_32px_-6px_rgb(244_240_235/0.25)] motion-reduce:transition-none ${open ? "w-14 justify-center" : "sm:pe-4"}`}>
        {open ? <span className="grid h-11 w-11 place-items-center"><X /></span> : (<>
          {/* Mini orb: the app icon in a slowly turning ring of light */}
          <span className="relative grid h-11 w-11 shrink-0 place-items-center">
            <span aria-hidden="true" className="fl-aura absolute -inset-0.5 rounded-full opacity-80 blur-[5px]" />
            <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#111]" />
            <img src="/icon.svg" alt="" width={30} height={30} className="fl-breathe relative h-[30px] w-[30px] rounded-[9px]" />
            {!ever && <span aria-hidden="true" className="as-halo absolute inset-0 rounded-full ring-2 ring-white/40" />}
            {active && <span aria-hidden="true" className="absolute -end-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#F4F0EB] ring-2 ring-[#161616]" />}
          </span>
          {/* Label and a tiny voice wave (desktop) */}
          <span className="hidden items-center gap-2 sm:flex">
            <span className="text-[14.5px] font-semibold tracking-[-0.01em]">Flex AI</span>
            <span aria-hidden="true" className="flex h-3.5 items-center gap-[2px]">{[0, 1, 2, 3].map((n) => <span key={n} className="fl-bar h-full w-[2.5px] rounded-full bg-white/70" style={{ animationDelay: `${n * 0.14}s` }} />)}</span>
          </span>
        </>)}
      </button>
    </div>
  </>);
}
