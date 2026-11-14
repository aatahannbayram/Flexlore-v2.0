"use client";
/* Book a demo (2026-11-15): the HubSpot scheduler embedded on our own page, so a booking is tied to the visitor's
 * HubSpot history (pages read, source, Flex AI) instead of starting cold on hubspot.com. The scheduler sets HubSpot
 * cookies, so it loads at once only when analytics is allowed; otherwise one tap loads it (or the visitor can open the
 * plain HubSpot page). A finished booking fires "demo_booked" (GA4 + PostHog, with consent). */
import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import { SITE } from "../config";
import { readConsent, CONSENT_EVENT } from "../consent";
import { track } from "../track";
import { ArrowUpRight, CalendarBlank } from "../ui/icons";

const T: Record<string, { k: string; load: string; note: string; open: string; done: string }> = {
  en: { k: "Book a demo", load: "Show the calendar", note: "The calendar is provided by HubSpot and uses its cookies.", open: "Open it on HubSpot instead", done: "Thank you. Your demo is booked; the invitation is on its way to your inbox." },
  tr: { k: "Demo isteyin", load: "Takvimi göster", note: "Takvim HubSpot tarafından sağlanır ve HubSpot çerezlerini kullanır.", open: "HubSpot'ta açın", done: "Teşekkürler. Demonuz planlandı; davet e-posta kutunuza geliyor." },
};

export function DemoPage() {
  const { d, lang } = useLocale(); const c = d.end; const t = T[lang] ?? T.en;
  const [show, setShow] = useState(false); const [done, setDone] = useState(false); const box = useRef<HTMLDivElement>(null);
  useEffect(() => { const f = () => { if (readConsent()?.analytics) setShow(true); }; f(); addEventListener(CONSENT_EVENT, f); return () => removeEventListener(CONSENT_EVENT, f); }, []);
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (!/hubspot\.com$/.test(new URL(e.origin).hostname)) return;
      if ((e.data as { meetingBookSucceeded?: boolean } | null)?.meetingBookSucceeded) { setDone(true); track("demo_booked", { page: location.pathname }); }
    };
    addEventListener("message", onMsg); return () => removeEventListener("message", onMsg);
  }, []);
  useEffect(() => {
    if (!show || !box.current) return;
    track("demo_calendar_shown");
    const s = document.createElement("script"); s.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"; s.async = true;
    document.body.appendChild(s); return () => { s.remove(); };
  }, [show]);
  const src = `${SITE.meetings}?embed=true${lang === "tr" ? "&lang=tr" : ""}`;
  return (
    <section aria-labelledby="demo-h" className="relative isolate overflow-hidden pt-[calc(var(--header-h)+48px)] md:pt-[calc(var(--header-h)+80px)]">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_70%_at_50%_0%,rgb(236_103_38/0.12),transparent_70%)]" />
      <div className="container-x text-center">
        <p className="inline-flex items-center gap-2.5 text-[13px] font-medium text-ink-faint"><span aria-hidden="true" className="kick-line" />{t.k}<span aria-hidden="true" className="kick-line" /></p>
        <h1 id="demo-h" className="mx-auto mt-5 max-w-[18ch] text-[clamp(38px,1rem+3.6vw,80px)] !font-normal leading-[1.02] tracking-[-0.045em] [text-wrap:balance]">{c.h}</h1>
        <p className="mx-auto mt-5 max-w-[34rem] text-[16px] leading-[1.6] text-ink-muted md:text-[18px]">{c.p}</p>
      </div>
      <div className="container-x mt-10 md:mt-14">
        <div className="glass-card mx-auto max-w-[920px] overflow-hidden rounded-[28px] p-2 md:p-3">
          {done ? <p className="px-6 py-16 text-center text-[18px]">{t.done}</p>
            : show ? <div ref={box} className="meetings-iframe-container min-h-[680px] overflow-hidden rounded-[22px] bg-white" data-src={src} />
            : <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
                <CalendarBlank size={28} aria-hidden="true" className="text-ink-muted" />
                <button type="button" onClick={() => setShow(true)} className="grid min-h-11 place-items-center"><span className="btn btn-cta !h-[38px] !min-h-[38px] !px-4 !text-[14px]">{t.load}</span></button>
                <p className="max-w-[28rem] text-[13px] text-ink-faint">{t.note}</p>
                <a href={SITE.meetings} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-ink-muted hover:text-ink">{t.open}<ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>}
        </div>
      </div>
    </section>);
}
