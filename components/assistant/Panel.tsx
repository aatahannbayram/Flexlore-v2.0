"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import { LOCALES, type Locale } from "../i18n/locales";
import { SITE } from "../config";
import { Mark } from "./Launcher";
import { search, extract } from "./retrieve";

/* Site assistant, part 2: the chat panel (loaded on demand).
   Answers come from the Claude-backed endpoint in NEXT_PUBLIC_ASSISTANT_URL (server/assistant), streamed as plain text.
   Without that endpoint the panel answers from the site's knowledge base on its own: it quotes the closest entry with a
   link to its page, and says plainly when it has no answer. Either way it offers a demo call and support. */
const ENDPOINT = process.env.NEXT_PUBLIC_ASSISTANT_URL || "";

const GREET: Record<Locale, [string, string]> = {
  tr: ["Sorunuz mu var? Yardımcı olmaktan memnuniyet duyarım.", "Mesajı kapatın"], en: ["Got a question? I'm happy to help.", "Dismiss message"],
  de: ["Haben Sie eine Frage? Ich helfe gern.", "Nachricht schließen"], ar: ["هل لديك سؤال؟ يسعدني أن أساعدك.", "إغلاق الرسالة"],
  es: ["¿Tiene alguna pregunta? Con gusto le ayudo.", "Cerrar mensaje"], ru: ["Есть вопрос? С радостью помогу.", "Закрыть сообщение"],
  fr: ["Une question ? Je suis là pour vous aider.", "Fermer le message"], pl: ["Masz pytanie? Chętnie pomogę.", "Zamknij wiadomość"],
};
const X = ({ s = 14 }: { s?: number }) => <svg viewBox="0 0 16 16" width={s} height={s} aria-hidden="true"><path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
const ANIM = `.as-in{animation:as-in .45s cubic-bezier(.22,1,.36,1) both}@keyframes as-in{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}.as-dot{animation:as-dot 1s ease-in-out infinite}@keyframes as-dot{0%,100%{opacity:.3;transform:none}50%{opacity:1;transform:translateY(-2px)}}@media (prefers-reduced-motion:reduce){.as-in,.as-dot{animation:none}}`;

/** The once-per-visit greeting next to the button. Clicking the text opens the chat; the cross dismisses it. */
export function Greeting({ onOpen, onDismiss }: { onOpen: () => void; onDismiss: () => void }) {
  const { locale } = useLocale(); const [hi, dismiss] = GREET[locale] ?? GREET.en;
  return (
    <div role="status" className="as-in relative flex max-w-[min(300px,calc(100vw-96px))] items-start gap-1 self-end rounded-[18px] bg-[rgb(22_22_22/0.86)] py-1.5 pe-1.5 ps-4 text-[14px] leading-snug text-white shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)] backdrop-blur-xl">
      <button type="button" onClick={onOpen} className="min-h-11 flex-1 py-1.5 text-start">{hi}</button>
      <button type="button" onClick={onDismiss} aria-label={dismiss} className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"><X /></button>
      <style>{ANIM}</style>
    </div>);
}

type S = { title: string; welcome: string; chips: string[]; ph: string; send: string; note: string; demo: string; support: string; dunno: string; source: string; related: string; enNote: string; typing: string; error: string; close: string; you: string };
const T: Record<Locale, S> = {
  tr: { title: "Flexlore Asistan", welcome: "Merhaba! Flexlore, ürünün özellikleri, fiyatlar veya sektörünüz hakkında sorun; sitedeki bilgilere dayanarak yanıtlayayım.", chips: ["Flexlore nasıl çalışır?", "Fiyatlar nasıl belirleniyor?", "Hangi sektörler için?", "Yapay zekâ ne yapıyor?"], ph: "Sorunuzu yazın", send: "Gönder", note: "Yanıtlar hatalı olabilir. Kesin bilgi için bize ulaşın.", demo: "Demo isteyin", support: "Destek", dunno: "Bu konuda sitede net bir bilgi bulamadım. Uydurmak istemem; ekibimiz demo görüşmesinde ya da support@flexlore.com adresinden yanıtlayabilir.", source: "Kaynak", related: "İlgili", enNote: "Bu bilgi şimdilik yalnızca İngilizce mevcut.", typing: "Yanıt hazırlanıyor", error: "Şu an yanıt veremiyorum. Lütfen biraz sonra tekrar deneyin ya da support@flexlore.com adresine yazın.", close: "Kapat", you: "Siz" },
  en: { title: "Flexlore Assistant", welcome: "Hi! Ask about Flexlore, its features, pricing or your industry, and I will answer from what is on this site.", chips: ["How does Flexlore work?", "How is pricing set?", "Which industries is it for?", "What does the AI do?"], ph: "Type your question", send: "Send", note: "Answers can be wrong. Contact us for anything you rely on.", demo: "Book a demo", support: "Support", dunno: "I could not find a clear answer to that on the site. I would rather not guess; our team can answer on a demo call or at support@flexlore.com.", source: "Source", related: "Related", enNote: "This information is only available in English for now.", typing: "Writing a reply", error: "I cannot answer right now. Please try again shortly or write to support@flexlore.com.", close: "Close", you: "You" },
  de: { title: "Flexlore-Assistent", welcome: "Hallo! Fragen Sie nach Flexlore, den Funktionen, den Preisen oder Ihrer Branche. Ich antworte auf Basis dieser Website.", chips: ["Wie funktioniert Flexlore?", "Wie werden die Preise festgelegt?", "Für welche Branchen?", "Was macht die KI?"], ph: "Ihre Frage", send: "Senden", note: "Antworten können Fehler enthalten. Für Verbindliches kontaktieren Sie uns.", demo: "Demo buchen", support: "Support", dunno: "Dazu habe ich auf der Website keine klare Antwort gefunden. Ich möchte nicht raten; unser Team antwortet im Demo-Gespräch oder unter support@flexlore.com.", source: "Quelle", related: "Verwandt", enNote: "Diese Information gibt es vorerst nur auf Englisch.", typing: "Antwort wird geschrieben", error: "Ich kann gerade nicht antworten. Bitte versuchen Sie es gleich noch einmal oder schreiben Sie an support@flexlore.com.", close: "Schließen", you: "Sie" },
  ar: { title: "مساعد Flexlore", welcome: "مرحبًا! اسأل عن Flexlore أو ميزاته أو الأسعار أو قطاعك، وسأجيب بناءً على ما في هذا الموقع.", chips: ["كيف يعمل Flexlore؟", "كيف تُحدد الأسعار؟", "لأي القطاعات؟", "ماذا يفعل الذكاء الاصطناعي؟"], ph: "اكتب سؤالك", send: "إرسال", note: "قد تحتوي الإجابات على أخطاء. تواصل معنا لأي أمر تعتمد عليه.", demo: "احجز عرضًا توضيحيًا", support: "الدعم", dunno: "لم أجد إجابة واضحة عن ذلك في الموقع. لا أريد التخمين؛ يمكن لفريقنا الإجابة في مكالمة العرض أو عبر support@flexlore.com.", source: "المصدر", related: "ذو صلة", enNote: "هذه المعلومات متاحة بالإنجليزية فقط حاليًا.", typing: "جارٍ كتابة الرد", error: "لا أستطيع الرد الآن. حاول مرة أخرى بعد قليل أو راسل support@flexlore.com.", close: "إغلاق", you: "أنت" },
  es: { title: "Asistente de Flexlore", welcome: "¡Hola! Pregunte por Flexlore, sus funciones, los precios o su sector, y le responderé con la información de este sitio.", chips: ["¿Cómo funciona Flexlore?", "¿Cómo se fijan los precios?", "¿Para qué sectores es?", "¿Qué hace la IA?"], ph: "Escriba su pregunta", send: "Enviar", note: "Las respuestas pueden contener errores. Contáctenos para lo que sea importante.", demo: "Solicitar una demo", support: "Soporte", dunno: "No encontré una respuesta clara en el sitio. Prefiero no adivinar; nuestro equipo puede responder en una demo o en support@flexlore.com.", source: "Fuente", related: "Relacionado", enNote: "Esta información solo está disponible en inglés por ahora.", typing: "Escribiendo respuesta", error: "Ahora no puedo responder. Inténtelo de nuevo en un momento o escriba a support@flexlore.com.", close: "Cerrar", you: "Usted" },
  ru: { title: "Ассистент Flexlore", welcome: "Здравствуйте! Спросите о Flexlore, его функциях, ценах или вашей отрасли, и я отвечу по материалам этого сайта.", chips: ["Как работает Flexlore?", "Как формируются цены?", "Для каких отраслей?", "Что делает ИИ?"], ph: "Ваш вопрос", send: "Отправить", note: "Ответы могут содержать ошибки. По важным вопросам свяжитесь с нами.", demo: "Записаться на демо", support: "Поддержка", dunno: "Я не нашёл на сайте чёткого ответа. Не хочу гадать; наша команда ответит на демо или по адресу support@flexlore.com.", source: "Источник", related: "По теме", enNote: "Пока эта информация есть только на английском.", typing: "Пишу ответ", error: "Сейчас не могу ответить. Попробуйте чуть позже или напишите на support@flexlore.com.", close: "Закрыть", you: "Вы" },
  fr: { title: "Assistant Flexlore", welcome: "Bonjour ! Posez vos questions sur Flexlore, ses fonctions, les tarifs ou votre secteur ; je réponds à partir de ce site.", chips: ["Comment fonctionne Flexlore ?", "Comment les tarifs sont-ils fixés ?", "Pour quels secteurs ?", "Que fait l'IA ?"], ph: "Votre question", send: "Envoyer", note: "Les réponses peuvent contenir des erreurs. Contactez-nous pour tout point important.", demo: "Réserver une démo", support: "Support", dunno: "Je n'ai pas trouvé de réponse claire sur le site. Je préfère ne pas deviner ; notre équipe peut répondre lors d'une démo ou à support@flexlore.com.", source: "Source", related: "Voir aussi", enNote: "Cette information n'existe qu'en anglais pour le moment.", typing: "Rédaction de la réponse", error: "Je ne peux pas répondre pour le moment. Réessayez dans un instant ou écrivez à support@flexlore.com.", close: "Fermer", you: "Vous" },
  pl: { title: "Asystent Flexlore", welcome: "Cześć! Zapytaj o Flexlore, funkcje, ceny lub swoją branżę, a odpowiem na podstawie tej strony.", chips: ["Jak działa Flexlore?", "Jak ustalane są ceny?", "Dla jakich branż?", "Co robi AI?"], ph: "Wpisz pytanie", send: "Wyślij", note: "Odpowiedzi mogą zawierać błędy. W ważnych sprawach skontaktuj się z nami.", demo: "Umów demo", support: "Wsparcie", dunno: "Nie znalazłem na stronie jasnej odpowiedzi. Nie chcę zgadywać; nasz zespół odpowie podczas demo lub pod adresem support@flexlore.com.", source: "Źródło", related: "Powiązane", enNote: "Ta informacja jest na razie dostępna tylko po angielsku.", typing: "Piszę odpowiedź", error: "Nie mogę teraz odpowiedzieć. Spróbuj za chwilę lub napisz na support@flexlore.com.", close: "Zamknij", you: "Ty" },
};

type Link = { title: string; url: string };
type Msg = { role: "user" | "assistant"; text: string; links?: Link[]; note?: string; handoff?: boolean };
const short = (u: string) => u.replace(/^https?:\/\/(www\.)?flexlore\.com/, "") || "/";
const isSite = (u: string) => /^https?:\/\/(www\.)?flexlore\.com/.test(u);

/** Plain text with bare URLs turned into links (the server cites page URLs inline). */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+[^\s).,;:!?])/g);
  return <>{parts.map((p, i) => (/^https?:\/\//.test(p)
    ? <a key={i} href={isSite(p) ? short(p) : p} className="underline decoration-white/40 underline-offset-2 hover:decoration-white" {...(isSite(p) ? {} : { target: "_blank", rel: "noopener noreferrer" })}>{isSite(p) ? short(p) : p}</a>
    : <span key={i}>{p}</span>))}</>;
}

export default function Panel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale } = useLocale(); const t = T[locale] ?? T.en; const dir = LOCALES.find((l) => l.code === locale)?.dir ?? "ltr";
  const [msgs, setMsgs] = useState<Msg[]>([]); const [q, setQ] = useState(""); const [busy, setBusy] = useState(false);
  const box = useRef<HTMLDivElement>(null); const list = useRef<HTMLDivElement>(null); const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { if (open) requestAnimationFrame(() => input.current?.focus()); }, [open]);
  useEffect(() => { const el = list.current; if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }); }, [msgs, busy]);
  // Esc closes; Tab stays inside the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab" || !box.current) return;
      const f = [...box.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), textarea")].filter((x) => x.offsetParent !== null);
      if (!f.length) return; const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k);
  }, [open, onClose]);

  const local = useCallback(async (text: string): Promise<Msg> => {
    const hits = await search(text, locale);
    if (!hits.length || hits[0].score < 1.1) return { role: "assistant", text: t.dunno, handoff: true };
    const [top, ...rest] = hits;
    return { role: "assistant", text: extract(top.entry.body), note: top.fallback ? t.enNote : undefined,
      links: [{ title: top.entry.title, url: top.entry.url }, ...rest.filter((h) => h.score >= top.score * 0.6 && h.entry.url !== top.entry.url).slice(0, 2).map((h) => ({ title: h.entry.title, url: h.entry.url }))], handoff: true };
  }, [locale, t]);

  const ask = useCallback(async (raw: string) => {
    const text = raw.trim(); if (!text || busy) return;
    const next: Msg[] = [...msgs, { role: "user", text }]; setMsgs(next); setQ(""); setBusy(true);
    try {
      if (!ENDPOINT) { const m = await local(text); await new Promise((r) => setTimeout(r, 350)); setMsgs([...next, m]); return; }
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, page: location.pathname, messages: next.map((m) => ({ role: m.role, content: m.text })).slice(-12) }) });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader(); const dec = new TextDecoder(); let acc = "";
      setMsgs([...next, { role: "assistant", text: "", handoff: true }]);
      for (;;) { const { done, value } = await reader.read(); if (done) break; acc += dec.decode(value, { stream: true }); const cur = acc; setMsgs([...next, { role: "assistant", text: cur, handoff: true }]); }
      if (!acc.trim()) throw new Error("empty");
    } catch {
      // The endpoint failed: fall back to the local knowledge base rather than leaving the visitor without an answer.
      try { const m = await local(text); setMsgs([...next, m.text === t.dunno ? { role: "assistant", text: t.error, handoff: true } : m]); }
      catch { setMsgs([...next, { role: "assistant", text: t.error, handoff: true }]); }
    } finally { setBusy(false); }
  }, [busy, msgs, local, locale, t]);

  return (
    <div ref={box} id="flx-assistant" role="dialog" aria-modal="true" aria-labelledby="flx-as-h" hidden={!open} dir={dir} lang={locale}
      className="as-in fixed inset-x-3 bottom-[88px] top-auto flex max-h-[min(640px,calc(100dvh-112px))] flex-col overflow-hidden rounded-[24px] bg-[rgb(20_20_20/0.88)] text-white shadow-[0_30px_70px_-24px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-2xl sm:inset-x-auto sm:end-6 sm:bottom-[96px] sm:w-[400px]">
      <div className="flex items-center gap-3 border-b border-white/[.08] px-4 py-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[.07] text-[#F4F0EB]"><Mark className="h-5 w-5" /></span>
        <div className="min-w-0 flex-1"><h2 id="flx-as-h" className="text-[15px] font-semibold tracking-[-0.01em]">{t.title}</h2>
          <p className="flex items-center gap-1.5 text-[12px] text-white/55"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white/70" />{ENDPOINT ? "Claude" : "flexlore.com"}</p></div>
        <button type="button" onClick={onClose} aria-label={t.close} className="grid h-11 w-11 place-items-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white">
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button>
      </div>
      <div ref={list} aria-live="polite" aria-busy={busy} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 text-[14px] leading-[1.55]">
        <p className="max-w-[88%] rounded-[16px] rounded-ss-[6px] bg-white/[.06] px-3.5 py-2.5 text-white/90">{t.welcome}</p>
        {msgs.map((m, i) => m.role === "user"
          ? <p key={i} className="ms-auto w-fit max-w-[85%] whitespace-pre-wrap rounded-[16px] rounded-se-[6px] bg-[#F4F0EB] px-3.5 py-2.5 text-[#111]"><span className="sr-only">{t.you}: </span>{m.text}</p>
          : <div key={i} className="max-w-[92%] space-y-2">
              <p className="whitespace-pre-wrap rounded-[16px] rounded-ss-[6px] bg-white/[.06] px-3.5 py-2.5 text-white/90"><Rich text={m.text} />{m.note && <span className="mt-1.5 block text-[12px] text-white/50">{m.note}</span>}</p>
              {!!m.links?.length && <ul className="flex flex-wrap gap-1.5">{m.links.map((l, k) => (
                <li key={l.url + k}><a href={short(l.url)} className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white/[.06] px-3 text-[12.5px] text-white/85 transition-colors hover:bg-white/[.12]">
                  <span className="text-white/45">{k === 0 ? t.source : t.related}</span><span className="max-w-[200px] truncate">{l.title}</span></a></li>))}</ul>}
              {m.handoff && i === msgs.length - 1 && !busy && <div className="flex flex-wrap gap-1.5">
                <a href={SITE.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center rounded-full bg-[#F4F0EB] px-3.5 text-[12.5px] font-semibold text-[#111] transition-colors hover:bg-white">{t.demo}</a>
                <a href="/support/" className="inline-flex min-h-9 items-center rounded-full bg-white/[.06] px-3.5 text-[12.5px] text-white/85 hover:bg-white/[.12]">{t.support}</a></div>}
            </div>)}
        {busy && (msgs[msgs.length - 1]?.role !== "assistant") && <p className="flex w-fit items-center gap-1 rounded-[16px] bg-white/[.06] px-3.5 py-3" aria-label={t.typing}>
          {[0, 1, 2].map((d) => <span key={d} className="as-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: `${d * 140}ms` }} />)}</p>}
        {!msgs.length && <ul className="flex flex-wrap gap-2 pt-1" aria-label={t.related}>{t.chips.map((c) => (
          <li key={c}><button type="button" onClick={() => ask(c)} className="min-h-11 rounded-full bg-white/[.05] px-3.5 text-start text-[13px] text-white/85 transition-colors hover:bg-white/[.1]">{c}</button></li>))}</ul>}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); ask(q); }} className="border-t border-white/[.08] p-3">
        <div className="flex items-end gap-2 rounded-[22px] bg-white/[.06] p-1.5 focus-within:ring-white/30">
          <label htmlFor="flx-as-q" className="sr-only">{t.ph}</label>
          <textarea ref={input} id="flx-as-q" rows={1} value={q} maxLength={600} placeholder={t.ph} onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); ask(q); } }}
            className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] text-white outline-none placeholder:text-white/40 focus-visible:outline-none" />
          <button type="submit" disabled={!q.trim() || busy} aria-label={t.send} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F4F0EB] text-[#111] transition-opacity disabled:opacity-35">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 13V3m0 0L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        </div>
        <p className="mt-2 px-1 text-[11.5px] leading-snug text-white/45">{t.note}</p>
      </form>
      <style>{ANIM}</style>
    </div>);
}
