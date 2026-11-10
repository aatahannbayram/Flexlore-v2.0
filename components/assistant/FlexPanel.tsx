"use client";
/* Flex AI, part 2 (loaded on the first click, never with the page): our own chat and voice panel on the ElevenLabs agent
   (@elevenlabs/react). Opening the panel connects to nothing: the text session starts with the first message, the voice
   session (and the microphone prompt) only when the visitor taps the mic. Voice mode shows the Flexlore mark inside
   rings and a bar wave that follow the real input and output levels. The agent can open site pages (navigate_to_page);
   the panel lives in the root layout, so a page change keeps the conversation going.
   Strings: English and Turkish; the other site languages use English (the agent answers in English there). */
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import type { Locale } from "../i18n/locales";

const AGENT = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "";
const TERMS_KEY = "flx-ai-terms-v1";
const PATH_OK = /^\/(?:[a-z0-9-]+\/)*(?:#[a-z-]+)?$/;
const LINK_HOSTS = /^(?:www\.)?flexlore\.com$|^app-eu1\.hubspot\.com$/;

type T = { title: string; sub: string; hello: string; chips: string[]; ph: string; send: string; mic: string; voiceCta: string; voiceSub: string; endVoice: string; mute: string; unmute: string; close: string;
  listening: string; speaking: string; connecting: string; voiceHint: string; notice: string; privacy: string; note: string; error: string; ended: string; you: string; newChat: string };
const EN: T = { title: "Flex AI", sub: "Flexlore's AI assistant", hello: "Hi, I'm Flex AI. Ask me how Flexlore works for your team, or let's book a demo.",
  chips: ["How does Flexlore work?", "Is it right for restaurants?", "What does the AI do?", "Show me pricing"], ph: "Ask Flex AI", send: "Send", mic: "Talk to Flex AI by voice", voiceCta: "Talk by voice", voiceSub: "Ask out loud. Flex AI answers and can show you around the site.",
  endVoice: "End voice", mute: "Mute microphone", unmute: "Unmute microphone", close: "Close Flex AI", listening: "Listening", speaking: "Flex AI is speaking", connecting: "Connecting",
  voiceHint: "Speak naturally. You can say \"show me pricing\" and I will open the page.", notice: "Flex AI is an AI assistant. Your messages are processed by Flexlore and ElevenLabs to answer you.",
  privacy: "Privacy Policy", note: "AI assistant, may make mistakes.", error: "Flex AI cannot answer right now. Please try again shortly or write to support@flexlore.com.",
  ended: "The conversation ended.", you: "You", newChat: "New chat" };
const TR: T = { title: "Flex AI", sub: "Flexlore'un yapay zekâ asistanı", hello: "Merhaba, ben Flex AI. Flexlore'un ekibinizde nasıl çalıştığını sorabilir ya da demo planlayabilirsiniz.",
  chips: ["Flexlore nasıl çalışır?", "Restoranlar için uygun mu?", "Yapay zekâ ne yapıyor?", "Fiyatları göster"], ph: "Flex AI'ya sorun", send: "Gönder", mic: "Flex AI ile sesli konuşun", voiceCta: "Sesli konuşun", voiceSub: "Sesli sorun. Flex AI cevaplar ve sizi sitede gezdirebilir.",
  endVoice: "Sesli görüşmeyi bitir", mute: "Mikrofonu kapat", unmute: "Mikrofonu aç", close: "Flex AI'yı kapatın", listening: "Dinliyor", speaking: "Flex AI konuşuyor", connecting: "Bağlanıyor",
  voiceHint: "Doğal konuşun. \"Fiyatları göster\" derseniz sayfayı açarım.", notice: "Flex AI bir yapay zekâ asistanıdır. Mesajlarınız size yanıt vermek için Flexlore ve ElevenLabs tarafından işlenir.",
  privacy: "Gizlilik Politikası", note: "Yapay zekâ asistanı, hata yapabilir.", error: "Flex AI şu an yanıt veremiyor. Lütfen biraz sonra tekrar deneyin ya da support@flexlore.com adresine yazın.",
  ended: "Görüşme sona erdi.", you: "Siz", newChat: "Yeni sohbet" };
/** Greeting bubble copy for the launcher, in all site languages. */
export const GREET: Record<Locale, [string, string]> = {
  tr: ["Sorunuz mu var? Flex AI yardımcı olabilir.", "Mesajı kapatın"], en: ["Got a question? Flex AI can help.", "Dismiss message"],
  de: ["Eine Frage? Flex AI hilft weiter (auf Englisch).", "Nachricht schließen"], ar: ["لديك سؤال؟ يمكن لـ Flex AI المساعدة (بالإنجليزية).", "إغلاق الرسالة"],
  es: ["¿Una pregunta? Flex AI puede ayudar (en inglés).", "Cerrar mensaje"], ru: ["Есть вопрос? Flex AI поможет (на английском).", "Закрыть сообщение"],
  fr: ["Une question ? Flex AI peut aider (en anglais).", "Fermer le message"], pl: ["Masz pytanie? Flex AI pomoże (po angielsku).", "Zamknij wiadomość"],
};

type Msg = { id: number; role: "user" | "agent" | "system"; text: string };
const uid = () => { try { let id = sessionStorage.getItem("flx-as-uid"); if (!id) { id = crypto.randomUUID(); sessionStorage.setItem("flx-as-uid", id); } return id; } catch { return crypto.randomUUID(); } };

const css = `
.fx-in{animation:fx-in .5s cubic-bezier(.22,1,.36,1) both}@keyframes fx-in{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}
.fx-msg{animation:fx-msg .35s cubic-bezier(.22,1,.36,1) both}@keyframes fx-msg{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.fx-dot{animation:fx-dot 1.1s ease-in-out infinite}@keyframes fx-dot{0%,100%{opacity:.25;transform:none}50%{opacity:1;transform:translateY(-2px)}}
.fx-breathe{animation:fx-breathe 3.2s ease-in-out infinite}@keyframes fx-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
.fx-spin{animation:fx-spin 14s linear infinite}@keyframes fx-spin{to{transform:rotate(360deg)}}
.fx-halo{animation:fx-halo 2.4s ease-out infinite}@keyframes fx-halo{0%{transform:scale(.9);opacity:.6}100%{transform:scale(1.35);opacity:0}}
@media (prefers-reduced-motion:reduce){.fx-in,.fx-msg,.fx-dot,.fx-breathe,.fx-spin,.fx-halo{animation:none}}`;

function Icon({ d, s = 18 }: { d: string; s?: number }) { return <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>; }
const I = {
  x: "M6 6l12 12M18 6L6 18", send: "M5 12h13M13 6l6 6-6 6", mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
  micOff: "M4 4l16 16M9 9v3a3 3 0 0 0 5.1 2.1M15 9.3V6a3 3 0 0 0-5.7-1.3M5 11a7 7 0 0 0 11.3 5.5M19 11a7 7 0 0 1-.4 2.3M12 18v3",
  stop: "M8 8h8v8H8z", plus: "M12 5v14M5 12h14",
};

/** Text with clickable links: site and booking hosts only; site links open in the app. */
function Rich({ text, go }: { text: string; go: (p: string) => void }) {
  const parts: React.ReactNode[] = []; const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s)]+)/g; let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    parts.push(text.slice(last, m.index)); last = re.lastIndex;
    const href = (m[2] || m[3]).replace(/[.,;:]+$/, ""); const label = m[1] || href.replace(/^https?:\/\/(www\.)?/, "");
    let u: URL | null = null; try { u = new URL(href); } catch {}
    if (!u || !LINK_HOSTS.test(u.hostname)) { parts.push(label); continue; }
    const internal = /flexlore\.com$/.test(u.hostname) && PATH_OK.test(u.pathname + (u.hash || ""));
    parts.push(<a key={k++} href={href} target={internal ? undefined : "_blank"} rel="noopener noreferrer" className="font-medium text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
      onClick={internal ? (e) => { e.preventDefault(); go(u!.pathname + (u!.hash || "")); } : undefined}>{label}</a>);
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

/** The voice visual: the Flexlore mark in rings that swell with the agent's voice and a bar wave for the visitor's. */
function Orb({ c, active }: { c: ReturnType<typeof useConversation>; active: boolean }) {
  const ring = useRef<HTMLSpanElement>(null); const glow = useRef<HTMLSpanElement>(null); const bars = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active) return; let raf = 0; let o = 0, i = 0;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      let out = 0, inp = 0; try { out = c.getOutputVolume(); inp = c.getInputVolume(); } catch {}
      o += (Math.min(out * 2.2, 1) - o) * 0.18; i += (Math.min(inp * 2.6, 1) - i) * 0.25;
      if (!reduce) {
        if (ring.current) ring.current.style.transform = `scale(${1 + o * 0.22})`;
        if (glow.current) { glow.current.style.transform = `scale(${1 + o * 0.5})`; glow.current.style.opacity = String(0.12 + o * 0.5); }
        if (bars.current) { let f: Uint8Array | null = null; try { f = c.isSpeaking ? c.getOutputByteFrequencyData() : c.getInputByteFrequencyData(); } catch {}
          const kids = bars.current.children; for (let n = 0; n < kids.length; n++) { const v = f && f.length ? f[Math.floor((n / kids.length) * f.length * 0.7)] / 255 : 0; (kids[n] as HTMLElement).style.transform = `scaleY(${0.12 + Math.max(v, c.isSpeaking ? o * 0.3 : i * 0.3) * 0.88})`; } }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [c, active]);
  return (<div className="flex flex-col items-center">
    <div className="relative grid h-[190px] w-[190px] place-items-center">
      <span ref={glow} aria-hidden="true" className="absolute inset-4 rounded-full bg-[radial-gradient(circle,rgb(244_240_235/0.5),rgb(244_240_235/0)_70%)] opacity-20 blur-2xl transition-none" />
      <span aria-hidden="true" className="fx-spin absolute inset-2 rounded-full border border-dashed border-white/[.12]" />
      <span ref={ring} aria-hidden="true" className="fx-breathe absolute inset-7 rounded-full bg-[radial-gradient(circle_at_35%_30%,#2a2a2a,#151515_70%)] shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_24px_60px_-20px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.08)]" />
      <img src="/icon.svg" alt="" width={84} height={84} className="relative h-[84px] w-[84px] rounded-[22px] shadow-[0_10px_30px_-10px_rgb(0_0_0/0.9)]" />
    </div>
    <div ref={bars} aria-hidden="true" className="mt-4 flex h-8 items-center gap-[3px]">{Array.from({ length: 24 }, (_, n) => <span key={n} className="h-full w-[3px] origin-center rounded-full bg-[#F4F0EB]/80" style={{ transform: "scaleY(.12)" }} />)}</div>
  </div>);
}

function Panel({ locale, open, onClose }: { locale: Locale; open: boolean; onClose: () => void }) {
  const t = locale === "tr" ? TR : EN; const lang = locale === "tr" ? "tr" : "en";
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([]); const [input, setInput] = useState(""); const [voice, setVoice] = useState(false); const [typing, setTyping] = useState(false);
  const [terms, setTerms] = useState(true); const pending = useRef<string | null>(null); const skipFirst = useRef(false); const nid = useRef(1); const list = useRef<HTMLDivElement>(null); const field = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { try { setTerms(localStorage.getItem(TERMS_KEY) === "1"); } catch { setTerms(false); } }, []);
  const add = useCallback((role: Msg["role"], text: string) => setMsgs((m) => [...m, { id: nid.current++, role, text }]), []);
  const go = useCallback((path: string) => {
    const [route, hash] = path.split("#");
    if (location.pathname === route && hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }); else router.push(path, { scroll: !hash });
  }, [router]);
  const c = useConversation({
    onMessage: ({ message, source }) => { if (!message?.trim()) return; setTyping(false);
      // The panel shows its own greeting, so the agent's opening line of a text session is dropped (it would repeat).
      if (source === "ai" && skipFirst.current) { skipFirst.current = false; return; }
      if (source === "ai") { setMsgs((m) => (m.length && m[m.length - 1].role === "agent" && m[m.length - 1].text === message) ? m : [...m, { id: nid.current++, role: "agent", text: message }]); }
      else if (voice) add("user", message); },
    onError: () => { setTyping(false); add("system", t.error); },
    onDisconnect: (d) => { setTyping(false); if (d.reason === "agent") add("system", t.ended); },
    clientTools: { navigate_to_page: ({ path }: { path?: string }) => {
      if (!path || !PATH_OK.test(path) || path.includes("//")) return "That page is not available.";
      go(path); return `Opened ${path}`; } },
  });
  const connected = c.status === "connected"; const connecting = c.status === "connecting";
  const base = () => ({ agentId: AGENT, userId: uid(), dynamicVariables: { page_url: location.href.split(/[?#]/)[0], site_language: locale } });
  // Send the queued first message as soon as the text session is up.
  useEffect(() => { if (connected && !voice && pending.current) { const m = pending.current; pending.current = null; c.sendUserMessage(m); setTyping(true); } }, [connected, voice, c]);
  // Voice: once connected, hand over what was said in the chat so the agent picks up where it left off.
  useEffect(() => { if (connected && voice) { const ctx = msgs.filter((m) => m.role !== "system").slice(-10).map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.text}`).join("\n");
    if (ctx) c.sendContextualUpdate(`The visitor switched from text chat to voice. Conversation so far:\n${ctx}`); } }, [connected, voice]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);
  useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [open, onClose]);
  useEffect(() => () => { try { c.endSession(); } catch {} }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const accept = () => { if (!terms) { try { localStorage.setItem(TERMS_KEY, "1"); } catch {} setTerms(true); } };

  const send = (text: string) => {
    const m = text.trim(); if (!m || !AGENT) return; accept(); add("user", m); setInput("");
    if (connected && !voice) { c.sendUserMessage(m); setTyping(true); return; }
    pending.current = m; setTyping(true);
    if (!connecting) { skipFirst.current = true; c.startSession({ ...base(), connectionType: "websocket", textOnly: true, overrides: { agent: { language: lang }, conversation: { textOnly: true } } }); }
  };
  const startVoice = () => {
    accept(); if (connected || connecting) { try { c.endSession(); } catch {} }
    setVoice(true); skipFirst.current = false;
    window.setTimeout(() => c.startSession({ ...base(), connectionType: "websocket", overrides: { agent: { language: lang } } }), 150);
  };
  const stopVoice = () => { try { c.endSession(); } catch {} setVoice(false); requestAnimationFrame(() => field.current?.focus()); };
  // Hiding the panel ends a voice call (a text chat simply waits, so it can be picked up again).
  useEffect(() => { if (!open && voice) stopVoice(); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (open) requestAnimationFrame(() => field.current?.focus()); }, [open]);
  const reset = () => { try { c.endSession(); } catch {} setMsgs([]); setVoice(false); setTyping(false); pending.current = null; };

  const status = connecting ? t.connecting : c.isSpeaking ? t.speaking : t.listening;
  return (
    <section role="dialog" aria-modal="false" aria-labelledby="fx-title"
      className="fx-in dark fixed inset-0 z-[46] flex flex-col overflow-hidden bg-[#111111] text-white sm:inset-auto sm:bottom-24 sm:end-6 sm:h-[min(660px,calc(100svh-128px))] sm:w-[400px] sm:rounded-[28px] sm:bg-[rgb(17_17_17/0.94)] sm:shadow-[0_40px_90px_-30px_rgb(0_0_0/0.95),0_0_0_1px_rgb(255_255_255/0.08),inset_0_1px_0_rgb(255_255_255/0.06)] sm:backdrop-blur-2xl print:hidden">
      <style>{css}</style>
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-white/[.07] px-4 pb-3 pt-[max(14px,env(safe-area-inset-top))]">
        <span className="relative"><img src="/icon.svg" alt="" width={40} height={40} className="h-10 w-10 rounded-[12px]" />
          <span aria-hidden="true" className={`absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full ring-2 ring-[#111] ${connected ? "bg-[#F4F0EB]" : "bg-white/25"}`} /></span>
        <div className="min-w-0 flex-1"><h2 id="fx-title" className="text-[16px] font-semibold leading-tight tracking-[-0.01em]">{t.title}</h2><p className="truncate text-[12.5px] text-white/55">{t.sub}</p></div>
        {!voice && <button type="button" onClick={startVoice} aria-label={t.mic} title={t.mic} className="grid h-10 w-10 place-items-center rounded-full bg-white/[.08] text-white transition-colors hover:bg-white/[.14]"><Icon d={I.mic} s={18} /></button>}
        {msgs.length > 0 && !voice && <button type="button" onClick={reset} aria-label={t.newChat} title={t.newChat} className="grid h-10 w-10 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/[.08] hover:text-white"><Icon d={I.plus} /></button>}
        <button type="button" onClick={onClose} aria-label={t.close} className="grid h-10 w-10 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/[.08] hover:text-white"><Icon d={I.x} /></button>
      </header>

      {voice ? (
        /* Voice mode */
        <div className="flex flex-1 flex-col items-center justify-between px-5 pb-5 pt-8">
          <div className="flex flex-col items-center text-center">
            <Orb c={c} active={voice} />
            <p aria-live="polite" className="mt-6 text-[15px] font-medium">{status}{connecting && <span className="ms-1 inline-flex gap-0.5">{[0, 1, 2].map((n) => <span key={n} className="fx-dot inline-block h-1 w-1 rounded-full bg-white" style={{ animationDelay: `${n * .15}s` }} />)}</span>}</p>
            <p className="mt-2 max-w-[28ch] text-[13px] leading-[1.5] text-white/55">{t.voiceHint}</p>
          </div>
          <div aria-live="polite" className="mb-4 w-full space-y-1.5 text-center text-[13.5px] leading-[1.45]">
            {msgs.filter((m) => m.role !== "system").slice(-2).map((m) => <p key={m.id} className={`fx-msg ${m.role === "user" ? "text-white/55" : "text-white/90"}`}>{m.text}</p>)}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => c.setMuted(!c.isMuted)} aria-pressed={c.isMuted} aria-label={c.isMuted ? t.unmute : t.mute}
              className={`grid h-14 w-14 place-items-center rounded-full ring-1 transition-colors ${c.isMuted ? "bg-[#F4F0EB] text-[#111] ring-[#F4F0EB]" : "bg-white/[.07] text-white ring-white/10 hover:bg-white/[.12]"}`}><Icon d={c.isMuted ? I.micOff : I.mic} s={20} /></button>
            <button type="button" onClick={stopVoice} className="flex h-14 items-center gap-2 rounded-full bg-[#F4F0EB] px-6 text-[15px] font-semibold text-[#111] transition-colors hover:bg-white"><Icon d={I.stop} s={16} />{t.endVoice}</button>
          </div>
        </div>
      ) : (
        /* Text mode */
        <>
          <div ref={list} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5">
            {msgs.length === 0 && (
              <button type="button" onClick={startVoice} className="fx-msg group relative mb-2 flex w-full items-center gap-4 overflow-hidden rounded-[22px] bg-[radial-gradient(120%_140%_at_0%_0%,rgb(255_255_255/0.09),rgb(255_255_255/0.03)_60%)] p-4 text-start ring-1 ring-white/10 transition-colors hover:ring-white/25">
                <span className="relative grid h-16 w-16 shrink-0 place-items-center">
                  <span aria-hidden="true" className="fx-halo absolute inset-0 rounded-full ring-2 ring-white/30" />
                  <span aria-hidden="true" className="fx-halo absolute inset-0 rounded-full ring-2 ring-white/20" style={{ animationDelay: "1.2s" }} />
                  <span aria-hidden="true" className="fx-breathe absolute inset-1 rounded-full bg-[radial-gradient(circle_at_35%_30%,#2c2c2c,#151515_70%)] shadow-[0_0_0_1px_rgb(255_255_255/0.1)]" />
                  <img src="/icon.svg" alt="" width={34} height={34} className="relative h-[34px] w-[34px] rounded-[10px]" />
                </span>
                <span className="min-w-0 flex-1"><span className="block text-[15.5px] font-semibold">{t.voiceCta}</span><span className="mt-0.5 block text-[12.5px] leading-[1.4] text-white/60">{t.voiceSub}</span></span>
                <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F4F0EB] text-[#111] transition-transform group-hover:scale-105"><Icon d={I.mic} s={19} /></span>
              </button>)}
            <div className="fx-msg flex gap-2.5"><img src="/icon.svg" alt="" width={28} height={28} className="mt-0.5 h-7 w-7 shrink-0 rounded-[8px]" />
              <p className="max-w-[85%] rounded-[18px] rounded-tl-[6px] bg-white/[.06] px-3.5 py-2.5 text-[14.5px] leading-[1.5] text-white/90">{t.hello}</p></div>
            {msgs.length === 0 && <div className="flex flex-wrap gap-2 ps-[38px]">{t.chips.map((x) => <button key={x} type="button" onClick={() => send(x)}
              className="fx-msg rounded-full bg-white/[.05] px-3.5 py-2 text-start text-[13px] text-white/80 ring-1 ring-white/10 transition-colors hover:bg-white/[.1] hover:text-white">{x}</button>)}</div>}
            {msgs.map((m) => m.role === "user"
              ? <div key={m.id} className="fx-msg flex justify-end"><p className="max-w-[85%] whitespace-pre-wrap rounded-[18px] rounded-tr-[6px] bg-[#F4F0EB] px-3.5 py-2.5 text-[14.5px] leading-[1.5] text-[#111]"><span className="sr-only">{t.you}: </span>{m.text}</p></div>
              : m.role === "system" ? <p key={m.id} role="status" className="fx-msg text-center text-[12.5px] text-white/50">{m.text}</p>
              : <div key={m.id} className="fx-msg flex gap-2.5"><img src="/icon.svg" alt="" width={28} height={28} className="mt-0.5 h-7 w-7 shrink-0 rounded-[8px]" />
                  <p className="max-w-[85%] whitespace-pre-wrap rounded-[18px] rounded-tl-[6px] bg-white/[.06] px-3.5 py-2.5 text-[14.5px] leading-[1.5] text-white/90"><span className="sr-only">{t.title}: </span><Rich text={m.text} go={go} /></p></div>)}
            {typing && <div className="flex gap-2.5 ps-[38px]" aria-hidden="true"><span className="flex items-center gap-1 rounded-[18px] bg-white/[.06] px-3.5 py-3.5">{[0, 1, 2].map((n) => <span key={n} className="fx-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: `${n * .15}s` }} />)}</span></div>}
          </div>
          <div className="border-t border-white/[.07] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3">
            {!terms && <p className="mb-2.5 px-1 text-[12px] leading-[1.45] text-white/50">{t.notice} <a href="/legal/privacy/" className="text-white/75 underline underline-offset-2">{t.privacy}</a></p>}
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-end gap-2 rounded-[22px] bg-white/[.05] p-1.5 ring-1 ring-white/10 focus-within:ring-white/30">
              <label htmlFor="fx-input" className="sr-only">{t.ph}</label>
              <textarea id="fx-input" ref={field} rows={1} data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" spellCheck={false} value={input} maxLength={600} onChange={(e) => setInput(e.target.value)} placeholder={t.ph}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                className="max-h-28 min-h-11 flex-1 resize-none appearance-none rounded-none border-0 !bg-transparent px-3 py-2.5 !shadow-none focus:!bg-transparent focus:!shadow-none text-[15px] leading-[1.4] text-white outline-none placeholder:text-white/40" />
              <button type="button" onClick={startVoice} aria-label={t.mic} title={t.mic} className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/[.1] hover:text-white"><Icon d={I.mic} s={19} /></button>
              <button type="submit" disabled={!input.trim()} aria-label={t.send} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F4F0EB] text-[#111] transition-opacity disabled:opacity-30"><Icon d={I.send} s={18} /></button>
            </form>
            <p className="mt-2 text-center text-[11.5px] text-white/40">{t.note}</p>
          </div>
        </>
      )}
    </section>);
}

export default function FlexPanel({ locale, open, onClose }: { locale: Locale; open: boolean; onClose: () => void }) {
  return <ConversationProvider><Panel locale={locale} open={open} onClose={onClose} /></ConversationProvider>;
}
