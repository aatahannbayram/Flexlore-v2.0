import type { Locale } from "./i18n/locales";
/* Consent banner copy, loaded only when the banner is about to show. */
type S = { p: string; yes: string; no: string; more: string; label: string; settings: string };
export const CONSENT_T: Record<Locale, S> = {
  en: { label: "Cookie choice", p: "We use analytics to see which pages help visitors, only if you agree. Theme and language settings are always kept on your device.", yes: "Allow analytics", no: "Decline", more: "Cookie policy", settings: "Cookie settings" },
  tr: { label: "Çerez tercihi", p: "Hangi sayfaların işe yaradığını görmek için analitik kullanıyoruz, yalnızca siz izin verirseniz. Tema ve dil tercihiniz her zaman cihazınızda kalır.", yes: "Analitiğe izin ver", no: "Reddet", more: "Çerez politikası", settings: "Çerez ayarları" },
  de: { label: "Cookie-Auswahl", p: "Wir nutzen Analysen, um zu sehen, welche Seiten helfen, nur mit Ihrer Zustimmung. Design- und Spracheinstellungen bleiben immer auf Ihrem Gerät.", yes: "Analysen erlauben", no: "Ablehnen", more: "Cookie-Richtlinie", settings: "Cookie-Einstellungen" },
  ar: { label: "اختيار ملفات تعريف الارتباط", p: "نستخدم التحليلات لمعرفة الصفحات المفيدة للزوار، فقط إذا وافقت. تبقى إعدادات المظهر واللغة دائمًا على جهازك.", yes: "السماح بالتحليلات", no: "رفض", more: "سياسة ملفات تعريف الارتباط", settings: "إعدادات ملفات تعريف الارتباط" },
  es: { label: "Preferencia de cookies", p: "Usamos analítica para ver qué páginas ayudan, solo si usted lo permite. El tema y el idioma se guardan siempre en su dispositivo.", yes: "Permitir analítica", no: "Rechazar", more: "Política de cookies", settings: "Ajustes de cookies" },
  ru: { label: "Выбор cookie", p: "Мы используем аналитику, чтобы понять, какие страницы полезны, только с вашего согласия. Настройки темы и языка всегда хранятся на вашем устройстве.", yes: "Разрешить аналитику", no: "Отклонить", more: "Политика cookie", settings: "Настройки cookie" },
  fr: { label: "Choix des cookies", p: "Nous utilisons des statistiques pour voir quelles pages aident, seulement si vous l'acceptez. Le thème et la langue restent toujours sur votre appareil.", yes: "Autoriser les statistiques", no: "Refuser", more: "Politique cookies", settings: "Paramètres des cookies" },
  pl: { label: "Wybór cookies", p: "Używamy analityki, aby sprawdzić, które strony pomagają, tylko za Twoją zgodą. Motyw i język zawsze zostają na Twoim urządzeniu.", yes: "Zezwól na analitykę", no: "Odrzuć", more: "Polityka cookies", settings: "Ustawienia cookies" },
};
