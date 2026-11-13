/* Cookie and storage consent, one small record in localStorage ("flx-consent"). Only analytics asks for it: the theme and
 * language preferences are needed for the site to work, and the assistant only runs after the visitor opens it and
 * accepts its own notice. The banner (ConsentBanner) shows only when an analytics tool is configured at build time, so a
 * build without analytics asks nothing. Analytics.tsx reads the same record and listens for CONSENT_EVENT. */
export type Consent = { v: 1; analytics: boolean; at: number };
export const CONSENT_KEY = "flx-consent";
export const CONSENT_EVENT = "flx-consent";
export const CONSENT_OPEN_EVENT = "flx-consent-open";
/** True when the build includes a tool that needs consent (PostHog, or GA4 and HubSpot in the launch build). */
export const consentNeeded = !!process.env.NEXT_PUBLIC_POSTHOG_KEY || process.env.FLX_LAUNCH === "1";

export function readConsent(): Consent | null {
  try { const c = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null"); return c && c.v === 1 ? c : null; } catch { return null; }
}
export function writeConsent(analytics: boolean) {
  const c: Consent = { v: 1, analytics, at: Date.now() };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
}
/** Footer link label ("Cookie settings"). */
export const CONSENT_SETTINGS: Record<string, string> = {"en": "Cookie settings", "tr": "Çerez ayarları", "de": "Cookie-Einstellungen", "ar": "إعدادات ملفات تعريف الارتباط", "es": "Ajustes de cookies", "nl": "Cookie-instellingen", "pt": "Configurações de cookies", "fr": "Paramètres des cookies", "pl": "Ustawienia cookies"};
export const openConsent = () => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
