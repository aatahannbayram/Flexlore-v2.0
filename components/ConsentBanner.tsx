"use client";
/* Consent banner: a small glass card in the bottom corner opposite the assistant, with two equal buttons (no pre-ticked
 * choice, no dark pattern) and a link to the cookie policy. Shown once, until the visitor picks; the footer's
 * "Cookie settings" link opens it again. Renders nothing when the build has no analytics (see components/consent.ts). */
import { useEffect, useState } from "react";
import { useLocale } from "./i18n/LocaleProvider";
import { consentNeeded, readConsent, writeConsent, CONSENT_OPEN_EVENT } from "./consent";
type Copy = typeof import("./consent-copy");

export function ConsentBanner() {
  const { locale } = useLocale();
  const [show, setShow] = useState(false); const [copy, setCopy] = useState<Copy | null>(null);
  useEffect(() => { if (show && !copy) import("./consent-copy").then(setCopy).catch(() => {}); }, [show, copy]);
  useEffect(() => {
    if (!consentNeeded) return;
    if (!readConsent()) setShow(true);
    const open = () => setShow(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);
  if (!show || !copy) return null;
  const t = copy.CONSENT_T[locale] ?? copy.CONSENT_T.en;
  const pick = (a: boolean) => { writeConsent(a); setShow(false); };
  return (
    <section role="region" aria-label={t.label}
      className="dark fixed bottom-4 start-4 end-[88px] z-[46] max-w-[420px] rounded-[22px] bg-[rgb(22_22_22/0.9)] p-4 text-white shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl sm:bottom-6 sm:start-6 sm:end-auto sm:p-5 print:hidden">
      <p className="text-[14px] leading-[1.5] text-white/80">{t.p} <a href="/legal/cookies/" className="font-semibold text-white underline underline-offset-2">{t.more}</a></p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => pick(false)} className="btn btn-glass-2 h-11 justify-center px-3 text-[14px]">{t.no}</button>
        <button type="button" onClick={() => pick(true)} className="btn btn-primary h-11 justify-center px-3 text-[14px]">{t.yes}</button>
      </div>
    </section>);
}
