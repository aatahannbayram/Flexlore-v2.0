// The 8 languages of the site. Flags are round, real-colour icons (admin-approved exception to the no-blue rule,
// public/flags, circle-flags, MIT). English uses the US flag (Flexlore Inc. is US-based); Arabic uses the UAE flag.
export type Locale = "en" | "tr" | "de" | "ar" | "es" | "ru" | "fr" | "pl";
export const LOCALES: { code: Locale; name: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", name: "English", flag: "us", dir: "ltr" },
  { code: "tr", name: "Türkçe", flag: "tr", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "de", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "ae", dir: "rtl" },
  { code: "es", name: "Español", flag: "es", dir: "ltr" },
  { code: "ru", name: "Русский", flag: "ru", dir: "ltr" },
  { code: "fr", name: "Français", flag: "fr", dir: "ltr" },
  { code: "pl", name: "Polski", flag: "pl", dir: "ltr" },
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
  "Europe/Moscow": "ru", "Europe/Minsk": "ru", "Asia/Almaty": "ru", "Asia/Yekaterinburg": "ru", "Asia/Novosibirsk": "ru", "Asia/Krasnoyarsk": "ru", "Asia/Irkutsk": "ru", "Asia/Vladivostok": "ru", "Europe/Samara": "ru", "Asia/Omsk": "ru",
  "Europe/Warsaw": "pl",
  "Asia/Riyadh": "ar", "Asia/Dubai": "ar", "Asia/Qatar": "ar", "Asia/Kuwait": "ar", "Asia/Bahrain": "ar", "Asia/Muscat": "ar", "Africa/Cairo": "ar",
  "Asia/Amman": "ar", "Asia/Beirut": "ar", "Asia/Baghdad": "ar", "Asia/Damascus": "ar", "Africa/Tripoli": "ar", "Africa/Khartoum": "ar", "Asia/Aden": "ar",
};
export function detectLocale(): Locale {
  try { const z = Intl.DateTimeFormat().resolvedOptions().timeZone; if (z && TZ[z]) return TZ[z]; } catch {}
  try { for (const l of navigator.languages ?? [navigator.language]) { const c = l.slice(0, 2).toLowerCase(); if (isLocale(c)) return c; } } catch {}
  return "en";
}
