/* Site assistant, part 2 (loaded on demand, never with the first page load): the greeting copy and the code that loads
   and mounts the official ElevenLabs widget. Importing this module opens no connection; only mount() does, after a click.
   The widget script is pinned and checked with SRI; to update it, change both SRC and SRI (sha384 of the exact file). */
import type { Locale } from "../i18n/locales";

const SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed@0.22.2/dist/index.js";
const SRI = "sha384-DpBWLghpAvk2oZk9MFxnwzOYbcZxNGynQfvc5qmeK4ceuiaSUMICU+QJIwJS2GEK";

export const COPY: Record<Locale, { error: string; hi: string; dismiss: string }> = {
  tr: { error: "Asistan şu an açılamadı. Lütfen biraz sonra tekrar deneyin.", hi: "Sorunuz mu var? Yapay zekâ asistanımız yardımcı olabilir.", dismiss: "Mesajı kapatın" },
  en: { error: "The assistant could not open right now. Please try again shortly.", hi: "Got a question? Our AI assistant can help.", dismiss: "Dismiss message" },
  de: { error: "Der Assistent konnte gerade nicht geöffnet werden. Bitte versuchen Sie es gleich noch einmal.", hi: "Eine Frage? Unser KI-Assistent hilft weiter (auf Englisch).", dismiss: "Nachricht schließen" },
  ar: { error: "تعذر فتح المساعد الآن. حاول مرة أخرى بعد قليل.", hi: "لديك سؤال؟ يمكن لمساعدنا الذكي المساعدة (بالإنجليزية).", dismiss: "إغلاق الرسالة" },
  es: { error: "El asistente no se pudo abrir ahora. Inténtelo de nuevo en un momento.", hi: "¿Tiene una pregunta? Nuestro asistente de IA puede ayudar (en inglés).", dismiss: "Cerrar mensaje" },
  ru: { error: "Сейчас не удалось открыть ассистента. Попробуйте чуть позже.", hi: "Есть вопрос? Наш ИИ-ассистент поможет (на английском).", dismiss: "Закрыть сообщение" },
  fr: { error: "L'assistant n'a pas pu s'ouvrir. Réessayez dans un instant.", hi: "Une question ? Notre assistant IA peut vous aider (en anglais).", dismiss: "Fermer le message" },
  pl: { error: "Nie udało się teraz otworzyć asystenta. Spróbuj ponownie za chwilę.", hi: "Masz pytanie? Nasz asystent AI pomoże (po angielsku).", dismiss: "Zamknij wiadomość" },
};

/** Widget labels: they say plainly that this is an AI assistant, in voice mode too. Other languages use English. */
const LABELS = {
  en: { main_label: "Flexlore AI assistant", start_chat: "Ask a question", start_call: "Talk by voice", chatting_status: "Flexlore AI assistant", listening_status: "AI assistant is listening", speaking_status: "AI assistant is speaking. Talk to interrupt", input_placeholder: "Type your question", input_placeholder_text_only: "Type your question", accept_terms: "Continue", dismiss_terms: "Cancel", end_chat: "End chat", end_call: "End" },
  tr: { main_label: "Flexlore yapay zekâ asistanı", start_chat: "Soru sorun", start_call: "Sesli konuşun", chatting_status: "Flexlore yapay zekâ asistanı", listening_status: "Yapay zekâ asistanı dinliyor", speaking_status: "Yapay zekâ asistanı konuşuyor. Araya girebilirsiniz", input_placeholder: "Sorunuzu yazın", input_placeholder_text_only: "Sorunuzu yazın", send_message: "Gönder", accept_terms: "Devam et", dismiss_terms: "Vazgeç", end_chat: "Sohbeti bitir", end_call: "Bitir", new_call: "Yeni görüşme", text_mode: "Yazılı moda geç", voice_mode: "Sesli moda geç", switched_to_text_mode: "Yazılı moda geçildi", switched_to_voice_mode: "Sesli moda geçildi", mute_microphone: "Mikrofonu kapat", collapse: "Küçült", expand: "Büyüt", connecting_status: "Bağlanıyor", reconnecting_status: "Yeniden bağlanıyor...", typing_indicator: "Asistan yazıyor...", thinking_status: "Düşünüyor...", error_occurred: "Bir hata oluştu", user_ended_conversation: "Sohbeti bitirdiniz", agent_ended_conversation: "Asistan sohbeti bitirdi", input_label: "Mesaj alanı", input_placeholder_new_conversation: "Yeni bir sohbet başlatın", initiate_feedback: "Bu sohbet nasıldı?", submit: "Gönder", go_back: "Geri", copy: "Kopyala", copied: "Kopyalandı" },
};

/** Event the Launcher listens for to navigate inside the app. */
export const NAV_EVENT = "flx-assistant-nav";
const PATH_OK = /^\/(?:[a-z0-9-]+\/)*(?:#[a-z-]+)?$/;

let scriptP: Promise<void> | null = null;
function loadScript() {
  return (scriptP ??= new Promise<void>((res, rej) => {
    if (customElements.get("elevenlabs-convai")) return res();
    const s = document.createElement("script");
    s.src = SRC; s.async = true; s.integrity = SRI; s.crossOrigin = "anonymous"; s.type = "text/javascript";
    s.onload = () => { void customElements.whenDefined("elevenlabs-convai").then(() => res()); };
    s.onerror = () => { scriptP = null; s.remove(); rej(new Error("widget script")); };
    document.head.appendChild(s);
  }));
}
/** A random id per tab, so the widget does not fall back to its device fingerprint. */
function userId() {
  try { let id = sessionStorage.getItem("flx-as-uid"); if (!id) { id = crypto.randomUUID(); sessionStorage.setItem("flx-as-uid", id); } return id; }
  catch { return crypto.randomUUID(); }
}
/** Language, labels and page context: Turkish pages run the agent in Turkish, every other language in English. */
export function sync(locale: Locale) {
  const el = document.querySelector<HTMLElement>("elevenlabs-convai"); if (!el) return;
  const lang = locale === "tr" ? "tr" : "en";
  el.setAttribute("override-language", lang);
  el.setAttribute("text-contents", JSON.stringify(LABELS[lang]));
  el.setAttribute("dynamic-variables", JSON.stringify({ page_url: location.href.split(/[?#]/)[0], site_language: locale }));
}
/** The widget ships its own font (Inter) and has no setting for it; put the site font into its (open) shadow root.
 *  --font-schibsted is set on <html> by next/font and custom properties inherit into shadow trees. */
function brandFont(el: HTMLElement, tries = 0) {
  const sr = el.shadowRoot;
  if (!sr) { if (tries < 120) requestAnimationFrame(() => brandFont(el, tries + 1)); return; }
  if (sr.querySelector("style[data-flx]")) return;
  const s = document.createElement("style"); s.dataset.flx = "";
  s.textContent = `:host,*{font-family:var(--font-schibsted),system-ui,sans-serif!important}`;
  sr.appendChild(s);
}
/** Loads the widget script and mounts the widget, opened. Safe to call more than once. */
export async function mount(agentId: string, locale: Locale) {
  await loadScript();
  if (!document.querySelector("elevenlabs-convai")) {
    const el = document.createElement("elevenlabs-convai");
    el.setAttribute("agent-id", agentId);
    el.setAttribute("user-id", userId());
    el.setAttribute("default-expanded", "true");
    el.setAttribute("dismissible", "true");
    el.setAttribute("markdown-link-allowed-hosts", "flexlore.com,www.flexlore.com,app-eu1.hubspot.com");
    el.setAttribute("avatar-image-url", location.origin + "/icon.svg");
    el.setAttribute("syntax-highlight-theme", "dark");
    el.style.zIndex = "45";
    // Client tool: the agent can open site pages (navigate_to_page). Only known site paths; the Launcher does the
    // in-app navigation, so the widget and a voice call stay alive across the page change.
    el.addEventListener("elevenlabs-convai:call", (e) => {
      const d = (e as CustomEvent<{ config: { clientTools?: Record<string, (p: { path?: string }) => Promise<string> | string> } }>).detail;
      d.config.clientTools = { ...d.config.clientTools, navigate_to_page: ({ path }) => {
        if (!path || !PATH_OK.test(path) || path.includes("//")) return "That page is not available.";
        window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: path }));
        return `Opened ${path}`;
      } };
    });
    document.body.appendChild(el);
    brandFont(el);
  }
  sync(locale);
}
