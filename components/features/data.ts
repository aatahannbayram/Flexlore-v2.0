// The product's features: one source for the Product menu, the /features/ index and each feature page.
// status: "live" only for what the app does today; everything else is "soon" until confirmed (change it here only).
import type { Locale } from "../i18n/locales";
export type Group = "create" | "spread" | "manage";
export type Visual = "pdf" | "sop" | "editor" | "screen" | "quiz" | "translate" | "qr" | "notify" | "roles" | "panel" | "agents";
export type Feature = { slug: string; icon: string; group: Group; status: "live" | "soon"; visual: Visual; photo: string };
export const FEATURES: Feature[] = [
  { slug: "video-to-sop", icon: "FilmSlate", group: "create", status: "live", visual: "sop", photo: "brewery" },
  { slug: "pdf-to-steps", icon: "FilePdf", group: "create", status: "soon", visual: "pdf", photo: "factory" },
  { slug: "video-editor", icon: "Scissors", group: "create", status: "live", visual: "editor", photo: "bakery" },
  { slug: "screen-recording", icon: "Browser", group: "create", status: "soon", visual: "screen", photo: "office" },
  { slug: "ai-quiz", icon: "Question", group: "create", status: "live", visual: "quiz", photo: "food-qa" },
  { slug: "auto-translation", icon: "Translate", group: "spread", status: "soon", visual: "translate", photo: "field" },
  { slug: "qr-codes", icon: "QrCode", group: "spread", status: "soon", visual: "qr", photo: "qr-scan" },
  { slug: "notifications", icon: "Bell", group: "spread", status: "soon", visual: "notify", photo: "cafe-opening" },
  { slug: "permissions-workspaces", icon: "LockSimple", group: "manage", status: "live", visual: "roles", photo: "hotel-desk" },
  { slug: "web-panel", icon: "ChartBar", group: "manage", status: "soon", visual: "panel", photo: "restaurant" },
  { slug: "ai-agents-mcp", icon: "Robot", group: "manage", status: "soon", visual: "agents", photo: "safety" },
];
export const GROUPS: Group[] = ["create", "spread", "manage"];

type NavT = { groups: Record<Group, string>; soon: string; all: string; how: string; items: Record<string, [string, string]> };
export const FEAT_NAV: Record<Locale, NavT> = {
  en: { groups: { create: "Create", spread: "Roll out", manage: "Manage" }, soon: "Soon", all: "All features", how: "How it works", items: {
    "pdf-to-steps": ["PDF to steps", "Turn existing documents into steps"], "video-to-sop": ["Video to SOP", "Film once, get step-by-step instructions"], "video-editor": ["Video editor", "Trim, mark steps, add text"], "screen-recording": ["Screen recording", "Record a web task, get a guide"], "ai-quiz": ["AI quiz", "Questions drafted from the job"],
    "auto-translation": ["Automatic translation", "Every step in the team's language"], "qr-codes": ["QR on the job", "Scan the station, see the steps"], notifications: ["Notifications", "Reminders and announcements"],
    "permissions-workspaces": ["Permissions and workspaces", "Who sees what, by role and site"], "web-panel": ["Web panel", "Assign and track from the desk"], "ai-agents-mcp": ["AI agents and MCP", "Automations and AI assistants"] } },
  tr: { groups: { create: "Oluştur", spread: "Yaygınlaştır", manage: "Yönet" }, soon: "Yakında", all: "Tüm özellikler", how: "Nasıl çalışır", items: {
    "pdf-to-steps": ["PDF'ten adımlar", "Mevcut dokümanları adımlara dönüştürün"], "video-to-sop": ["Videodan SOP", "Bir kez çekin, adım adım talimat hazır"], "video-editor": ["Video editörü", "Kırpın, adımları işaretleyin, metin ekleyin"], "screen-recording": ["Ekran kaydı", "Web'deki işi kaydedin, kılavuz hazır"], "ai-quiz": ["Yapay zekâ quiz", "İşin kendisinden hazırlanan sorular"],
    "auto-translation": ["Otomatik çeviri", "Her adım ekibin kendi dilinde"], "qr-codes": ["İş başında QR", "İstasyonu okutun, adımları görün"], notifications: ["Bildirimler", "Hatırlatmalar ve duyurular"],
    "permissions-workspaces": ["Yetki ve çalışma alanları", "Kim neyi görür, rol ve şubeye göre"], "web-panel": ["Web paneli", "Masadan atayın ve takip edin"], "ai-agents-mcp": ["Yapay zekâ ajanları ve MCP", "Otomasyonlar ve yapay zekâ asistanları"] } },
  de: { groups: { create: "Erstellen", spread: "Ausrollen", manage: "Verwalten" }, soon: "Bald", all: "Alle Funktionen", how: "So funktioniert es", items: {
    "pdf-to-steps": ["PDF zu Schritten", "Bestehende Dokumente in Schritte verwandeln"], "video-to-sop": ["Video zu SOP", "Einmal filmen, Schrittanleitung erhalten"], "video-editor": ["Video-Editor", "Schneiden, Schritte markieren, Text hinzufügen"], "screen-recording": ["Bildschirmaufnahme", "Web-Aufgabe aufnehmen, Anleitung erhalten"], "ai-quiz": ["KI-Quiz", "Fragen aus der Aufgabe selbst"],
    "auto-translation": ["Automatische Übersetzung", "Jeder Schritt in der Sprache des Teams"], "qr-codes": ["QR am Arbeitsplatz", "Station scannen, Schritte sehen"], notifications: ["Benachrichtigungen", "Erinnerungen und Ankündigungen"],
    "permissions-workspaces": ["Rechte und Workspaces", "Wer was sieht, nach Rolle und Standort"], "web-panel": ["Web-Panel", "Vom Schreibtisch zuweisen und verfolgen"], "ai-agents-mcp": ["KI-Agenten und MCP", "Automatisierungen und KI-Assistenten"] } },
  ar: { groups: { create: "إنشاء", spread: "النشر", manage: "الإدارة" }, soon: "قريبًا", all: "جميع الميزات", how: "كيف يعمل", items: {
    "pdf-to-steps": ["من PDF إلى خطوات", "حوّل المستندات الحالية إلى خطوات"], "video-to-sop": ["من الفيديو إلى SOP", "صوّر مرة واحدة واحصل على تعليمات خطوة بخطوة"], "video-editor": ["محرر الفيديو", "قصّ، حدّد الخطوات، أضف نصًا"], "screen-recording": ["تسجيل الشاشة", "سجّل مهمة على الويب واحصل على دليل"], "ai-quiz": ["اختبار بالذكاء الاصطناعي", "أسئلة مستمدة من المهمة نفسها"],
    "auto-translation": ["الترجمة التلقائية", "كل خطوة بلغة الفريق"], "qr-codes": ["QR في موقع العمل", "امسح المحطة وشاهد الخطوات"], notifications: ["الإشعارات", "تذكيرات وإعلانات"],
    "permissions-workspaces": ["الصلاحيات ومساحات العمل", "من يرى ماذا حسب الدور والموقع"], "web-panel": ["لوحة الويب", "وزّع المهام وتابعها من المكتب"], "ai-agents-mcp": ["وكلاء الذكاء الاصطناعي وMCP", "الأتمتة ومساعدات الذكاء الاصطناعي"] } },
  es: { groups: { create: "Crear", spread: "Desplegar", manage: "Gestionar" }, soon: "Pronto", all: "Todas las funciones", how: "Cómo funciona", items: {
    "pdf-to-steps": ["De PDF a pasos", "Convierta documentos existentes en pasos"], "video-to-sop": ["Video a SOP", "Grabe una vez y obtenga instrucciones paso a paso"], "video-editor": ["Editor de video", "Recorte, marque pasos, añada texto"], "screen-recording": ["Grabación de pantalla", "Grabe una tarea web y obtenga una guía"], "ai-quiz": ["Cuestionario con IA", "Preguntas a partir de la propia tarea"],
    "auto-translation": ["Traducción automática", "Cada paso en el idioma del equipo"], "qr-codes": ["QR en el puesto", "Escanee la estación y vea los pasos"], notifications: ["Notificaciones", "Recordatorios y anuncios"],
    "permissions-workspaces": ["Permisos y espacios de trabajo", "Quién ve qué, por rol y sede"], "web-panel": ["Panel web", "Asigne y haga seguimiento desde la oficina"], "ai-agents-mcp": ["Agentes de IA y MCP", "Automatizaciones y asistentes de IA"] } },
  ru: { groups: { create: "Создание", spread: "Внедрение", manage: "Управление" }, soon: "Скоро", all: "Все функции", how: "Как это работает", items: {
    "pdf-to-steps": ["Из PDF в шаги", "Превратите готовые документы в шаги"], "video-to-sop": ["Из видео в SOP", "Снимите один раз и получите пошаговую инструкцию"], "video-editor": ["Видеоредактор", "Обрезка, разметка шагов, текст"], "screen-recording": ["Запись экрана", "Запишите веб-задачу и получите руководство"], "ai-quiz": ["ИИ-тест", "Вопросы по самой задаче"],
    "auto-translation": ["Автоматический перевод", "Каждый шаг на языке команды"], "qr-codes": ["QR на рабочем месте", "Отсканируйте станцию и увидите шаги"], notifications: ["Уведомления", "Напоминания и объявления"],
    "permissions-workspaces": ["Права и рабочие пространства", "Кто что видит по роли и точке"], "web-panel": ["Веб-панель", "Назначайте и отслеживайте с рабочего места"], "ai-agents-mcp": ["ИИ-агенты и MCP", "Автоматизация и ИИ-ассистенты"] } },
  fr: { groups: { create: "Créer", spread: "Déployer", manage: "Gérer" }, soon: "Bientôt", all: "Toutes les fonctionnalités", how: "Comment ça marche", items: {
    "pdf-to-steps": ["Du PDF aux étapes", "Transformez vos documents en étapes"], "video-to-sop": ["Vidéo en SOP", "Filmez une fois, obtenez des instructions étape par étape"], "video-editor": ["Éditeur vidéo", "Coupez, marquez les étapes, ajoutez du texte"], "screen-recording": ["Enregistrement d'écran", "Enregistrez une tâche web, obtenez un guide"], "ai-quiz": ["Quiz IA", "Des questions tirées de la tâche"],
    "auto-translation": ["Traduction automatique", "Chaque étape dans la langue de l'équipe"], "qr-codes": ["QR sur le poste", "Scannez le poste, voyez les étapes"], notifications: ["Notifications", "Rappels et annonces"],
    "permissions-workspaces": ["Droits et espaces de travail", "Qui voit quoi, par rôle et par site"], "web-panel": ["Panneau web", "Attribuez et suivez depuis le bureau"], "ai-agents-mcp": ["Agents IA et MCP", "Automatisations et assistants IA"] } },
  pl: { groups: { create: "Tworzenie", spread: "Wdrażanie", manage: "Zarządzanie" }, soon: "Wkrótce", all: "Wszystkie funkcje", how: "Jak to działa", items: {
    "pdf-to-steps": ["Z PDF do kroków", "Zamień istniejące dokumenty na kroki"], "video-to-sop": ["Z wideo do SOP", "Nagraj raz, otrzymaj instrukcję krok po kroku"], "video-editor": ["Edytor wideo", "Przycinaj, oznaczaj kroki, dodawaj tekst"], "screen-recording": ["Nagrywanie ekranu", "Nagraj zadanie w przeglądarce, otrzymaj poradnik"], "ai-quiz": ["Quiz AI", "Pytania z samego zadania"],
    "auto-translation": ["Automatyczne tłumaczenie", "Każdy krok w języku zespołu"], "qr-codes": ["QR na stanowisku", "Zeskanuj stanowisko, zobacz kroki"], notifications: ["Powiadomienia", "Przypomnienia i ogłoszenia"],
    "permissions-workspaces": ["Uprawnienia i przestrzenie robocze", "Kto co widzi, wg roli i lokalizacji"], "web-panel": ["Panel webowy", "Przydzielaj i śledź zza biurka"], "ai-agents-mcp": ["Agenci AI i MCP", "Automatyzacje i asystenci AI"] } },
};
