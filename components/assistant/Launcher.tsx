"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "../i18n/LocaleProvider";
import type { Locale } from "../i18n/locales";

/* Site assistant, part 1: the Flexlore Assistant on ElevenLabs (agent config as code in elevenlabs/, pushed by
   scripts/elevenlabs-sync.mjs). All that ships with the page is this round glass button. Part 2 (./widget: greeting copy
   and the widget loader) is a plain dynamic import fetched when the browser is idle, which still talks to no one.
   Nothing from ElevenLabs loads, no connection opens and no microphone is asked for until the visitor clicks: the click
   loads the official widget (pinned, SRI-checked), mounts it opened, and this button steps aside for the widget's own
   launcher (dark, set in the agent's widget settings).
     NEXT_PUBLIC_ELEVENLABS_AGENT_ID  the public agent's ID. Unset = no assistant at all.
   The agent only accepts sessions from the allowlisted hosts (preprod, flexlore.com, www, localhost). */
const AGENT = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "";
type Mod = typeof import("./widget");
let modP: Promise<Mod> | null = null;
const loadMod = () => (modP ??= import("./widget").catch((e) => { modP = null; throw e; }));

const T: Record<Locale, [string, string]> = {
  tr: ["Flexlore yapay zekâ asistanını açın", "Asistan açılıyor"], en: ["Open the Flexlore AI assistant", "Opening the assistant"],
  de: ["Flexlore-KI-Assistent öffnen", "Assistent wird geöffnet"], ar: ["افتح مساعد Flexlore الذكي", "جارٍ فتح المساعد"],
  es: ["Abrir el asistente de IA de Flexlore", "Abriendo el asistente"], ru: ["Открыть ИИ-ассистента Flexlore", "Открываем ассистента"],
  fr: ["Ouvrir l'assistant IA de Flexlore", "Ouverture de l'assistant"], pl: ["Otwórz asystenta AI Flexlore", "Otwieranie asystenta"],
};

/** The two-part Flexlore symbol (light upper half, orange lower half): the same file as the favicon. */
export const Mark = ({ className = "" }: { className?: string }) => <img src="/brand/symbol-main.svg" alt="" width={24} height={24} className={className} />;
const X = () => <svg viewBox="0 0 16 16" width={14} height={14} aria-hidden="true"><path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
const ANIM = `.as-in{animation:as-in .45s cubic-bezier(.22,1,.36,1) both}@keyframes as-in{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}.as-spin{animation:as-spin .9s linear infinite}@keyframes as-spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){.as-in,.as-spin{animation:none}}`;
const bubble = "as-in max-w-[min(300px,calc(100vw-96px))] rounded-[18px] bg-[rgb(22_22_22/0.88)] text-[14px] leading-snug text-white shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)] backdrop-blur-xl";

const HI_KEY = "flx-as-hi";
export function AssistantLauncher() {
  const { locale } = useLocale(); const t = T[locale] ?? T.en;
  const [mod, setMod] = useState<Mod | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "on" | "error">("idle");
  const [hi, setHi] = useState(false); const [demo, setDemo] = useState(false);
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
  const open = useCallback(async () => {
    dismiss(); setState("loading");
    try { const m = await loadMod(); setMod(m); await m.mount(AGENT, locale); setState("on"); }
    catch { setState("error"); }
  }, [dismiss, locale]);
  // Keep the open widget in step with the site language and the page.
  const pathname = usePathname();
  useEffect(() => { if (state === "on") mod?.sync(locale); }, [state, locale, mod, pathname]);
  // The agent's navigate_to_page tool: an in-app route change, so the conversation keeps going.
  const router = useRouter();
  useEffect(() => {
    if (!mod) return;
    const go = (e: Event) => {
      const path = (e as CustomEvent<string>).detail; const [route, hash] = path.split("#");
      if (location.pathname === route && hash) { document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }); return; }
      router.push(path, { scroll: !hash });
    };
    window.addEventListener(mod.NAV_EVENT, go);
    return () => window.removeEventListener(mod.NAV_EVENT, go);
  }, [mod, router]);
  useEffect(() => { if (state !== "error") return; const id = window.setTimeout(() => setState("idle"), 6000); return () => window.clearTimeout(id); }, [state]);
  if (!AGENT || demo || state === "on") return null;
  const c = mod ? (mod.COPY[locale] ?? mod.COPY.en) : null;
  return (
    <div className="dark fixed bottom-4 end-4 z-[45] flex flex-col items-end gap-3 text-white sm:bottom-6 sm:end-6 print:hidden">
      <style>{ANIM}</style>
      {c && hi && state === "idle" && (
        <div role="status" className={`${bubble} relative flex items-start gap-1 self-end py-1.5 pe-1.5 ps-4`}>
          <button type="button" onClick={open} className="min-h-11 flex-1 py-1.5 text-start">{c.hi}</button>
          <button type="button" onClick={dismiss} aria-label={c.dismiss} className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"><X /></button>
        </div>)}
      {state === "error" && <p role="alert" className={`${bubble} px-4 py-3 text-white/85`}>{c?.error ?? "Error"}</p>}
      <button type="button" onClick={open} disabled={state === "loading"} aria-busy={state === "loading"} aria-label={state === "loading" ? t[1] : t[0]}
        className="grid h-14 w-14 place-items-center rounded-full bg-[rgb(22_22_22/0.78)] text-[#F4F0EB] shadow-[0_16px_36px_-14px_rgb(0_0_0/0.85),inset_0_1px_0_rgb(255_255_255/0.12)] backdrop-blur-xl transition-transform duration-300 hover:scale-[1.04] disabled:cursor-progress motion-reduce:transition-none motion-reduce:hover:scale-100">
        {state === "loading"
          ? <span aria-hidden="true" className="as-spin h-5 w-5 rounded-full border-2 border-white/25 border-t-white" />
          : <Mark className="h-6 w-6" />}
      </button>
    </div>);
}
