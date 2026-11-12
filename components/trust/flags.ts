"use client";
/* Visitor check for the Türkiye page surfaces. Switches and rules: ./config.ts */
import { useEffect, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import { TRUST_TR, TRUST_TR_PATH } from "./config";
export { TRUST_TR, TRUST_TR_PATH, TRUST_TR_FOOTER } from "./config";

/** Returns the page link to show (Turkish page for Turkish, English otherwise), or null when nothing should show. */
export function useTrustTR(): { href: string; tr: boolean } | null {
  const { locale } = useLocale(); const [tz, setTz] = useState(false);
  useEffect(() => { try { setTz(Intl.DateTimeFormat().resolvedOptions().timeZone === "Europe/Istanbul"); } catch {} }, []);
  if (!TRUST_TR.surface || !(locale === "tr" || tz)) return null;
  const tr = locale === "tr"; return { href: tr ? TRUST_TR_PATH.tr : TRUST_TR_PATH.en, tr };
}

