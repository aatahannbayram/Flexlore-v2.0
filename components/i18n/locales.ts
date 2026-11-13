// The 9 languages of the site (Russian removed and Dutch and Brazilian Portuguese added on 2026-11-13). Flags are round, real-colour icons (admin-approved exception to the no-blue rule,
// public/flags, circle-flags, MIT). English uses the US flag (Flexlore Inc. is US-based); Arabic uses the UAE flag;
// Portuguese is Brazilian Portuguese and uses the Brazil flag.
export type Locale = "en" | "tr" | "de" | "nl" | "fr" | "es" | "pt" | "pl" | "ar";
export const LOCALES: { code: Locale; name: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", name: "English", flag: "us", dir: "ltr" },
  { code: "tr", name: "Türkçe", flag: "tr", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "de", dir: "ltr" },
  { code: "nl", name: "Nederlands", flag: "nl", dir: "ltr" },
  { code: "fr", name: "Français", flag: "fr", dir: "ltr" },
  { code: "es", name: "Español", flag: "es", dir: "ltr" },
  { code: "pt", name: "Português", flag: "br", dir: "ltr" },
  { code: "pl", name: "Polski", flag: "pl", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "ae", dir: "rtl" },
];
export const isLocale = (x: unknown): x is Locale => LOCALES.some((l) => l.code === x);
/** Pages that only have English and Turkish content use this. */
export const base = (l: Locale): "en" | "tr" => (l === "tr" ? "tr" : "en");

/* Country from the browser's time zone (no network, no permission prompt, nothing leaves the device).
   Only zones that clearly map to one of our languages are listed; everything else falls back to the browser language. */
export const TZ: Record<string, Locale> = {
  "Europe/Istanbul": "tr", "Asia/Istanbul": "tr", "Asia/Nicosia": "tr",
  "Europe/Berlin": "de", "Europe/Vienna": "de", "Europe/Zurich": "de", "Europe/Busingen": "de", "Europe/Vaduz": "de",
  "Europe/Paris": "fr", "Europe/Monaco": "fr", "Africa/Casablanca": "fr", "Africa/Tunis": "fr", "Africa/Algiers": "fr", "Africa/Dakar": "fr", "Africa/Abidjan": "fr", "Indian/Reunion": "fr",
  "Europe/Madrid": "es", "Atlantic/Canary": "es", "America/Mexico_City": "es", "America/Bogota": "es", "America/Lima": "es", "America/Santiago": "es",
  "America/Argentina/Buenos_Aires": "es", "America/Caracas": "es", "America/Guayaquil": "es", "America/Montevideo": "es", "America/Asuncion": "es", "America/La_Paz": "es",
  "America/Costa_Rica": "es", "America/Panama": "es", "America/Guatemala": "es", "America/El_Salvador": "es", "America/Tegucigalpa": "es", "America/Managua": "es", "America/Santo_Domingo": "es",
  "Europe/Amsterdam": "nl", "America/Paramaribo": "nl", "America/Curacao": "nl", "America/Aruba": "nl",
  "Europe/Lisbon": "pt", "Atlantic/Madeira": "pt", "Atlantic/Azores": "pt", "America/Sao_Paulo": "pt", "America/Bahia": "pt", "America/Fortaleza": "pt", "America/Recife": "pt",
  "America/Belem": "pt", "America/Manaus": "pt", "America/Cuiaba": "pt", "America/Campo_Grande": "pt", "America/Porto_Velho": "pt", "America/Maceio": "pt", "America/Araguaina": "pt",
  "Africa/Luanda": "pt", "Africa/Maputo": "pt",
  "Europe/Warsaw": "pl",
  "Asia/Riyadh": "ar", "Asia/Dubai": "ar", "Asia/Qatar": "ar", "Asia/Kuwait": "ar", "Asia/Bahrain": "ar", "Asia/Muscat": "ar", "Africa/Cairo": "ar",
  "Asia/Amman": "ar", "Asia/Beirut": "ar", "Asia/Baghdad": "ar", "Asia/Damascus": "ar", "Africa/Tripoli": "ar", "Africa/Khartoum": "ar", "Asia/Aden": "ar",
};
export function detectLocale(): Locale {
  try { const z = Intl.DateTimeFormat().resolvedOptions().timeZone; if (z && TZ[z]) return TZ[z]; } catch {}
  try { for (const l of navigator.languages ?? [navigator.language]) { const c = l.slice(0, 2).toLowerCase(); if (isLocale(c)) return c; } } catch {}
  return "en";
}
