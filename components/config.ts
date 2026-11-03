// Single source of truth for launch flags, links and pricing hooks.
export const SITE = {
  url: "https://www.flexlore.com",
  // DEMO: keep true. Flip to false at launch: robots, sitemap and every page's meta follow this flag.
  noindex: true,
  // Log in link in the header. Empty = hidden. Paste the app login URL here when it is decided.
  login: "",
  demo: "https://app-eu1.hubspot.com/meetings/alper-kalip",
  // Unverified program badges (NVIDIA Inception, Claude for Startups). Keep false until confirmed.
  programBadges: false,
  appStore: "https://apps.apple.com/tr/app/flexlore/id6751126206?l",
  googlePlay: "https://play.google.com/store/apps/details?id=com.flexlore.app&hl=en",
  productHunt: "https://www.producthunt.com/products/flexlore-app/launches/flexlore-app",
  social: {
    linkedin: "https://www.linkedin.com/company/flexlore-inc/",
    instagram: "https://www.instagram.com/flexlore.inc/",
    youtube: "https://www.youtube.com/@FlexloreInc",
  },
  legal: [
    ["Privacy", "https://www.flexlore.com/legal/privacy"], ["Terms", "https://www.flexlore.com/legal/terms"],
    ["Cookies", "https://www.flexlore.com/legal/cookies"], ["Security", "https://www.flexlore.com/legal/security"],
    ["DPA", "https://www.flexlore.com/legal/dpa"], ["Subprocessors", "https://www.flexlore.com/legal/subprocessors"],
    ["Acceptable use", "https://www.flexlore.com/legal/acceptable-use"], ["Billing", "https://www.flexlore.com/legal/billing"],
  ] as [string, string][],
};

/* Pricing. Model: priced per location (site), unlimited operators at every location.
   No Stripe access yet and no approved prices, so every `price` is null and every CTA
   falls back to Book a demo / Contact sales. To go live: fill `price`, and paste a Stripe
   Payment Link or Checkout URL into `checkout`. Plan names and limits are placeholders. */
export const PRICING = { unit: "per location / month", operators: "Unlimited operators", currency: null as string | null };
export type Plan = { id: string; name: string; for: string; price: string | null; checkout: string | null; cta: string; featured?: boolean; points: string[] };
/* Membership plan cards (PLANS[0..1]) + Enterprise block (30+ users). NO prices yet: Ata Han sends the
   price visuals; until then every price renders as a visible placeholder ("$—" + "Pricing coming soon"). */
export const PLANS: Plan[] = [
  { id: "location", name: "Single location", for: "One site getting its jobs on video.", price: null, checkout: null, cta: "Book a demo",
    points: ["Unlimited operators", "Video SOPs filmed on iOS and Android", "Video into steps, drafted instructions", "AI-drafted quizzes, approved by you", "Readiness by person and shift", "Web platform for managers"] },
  { id: "multi", name: "Multi-location", for: "Several sites that must work to one standard.", price: null, checkout: null, cta: "Book a demo", featured: true,
    points: ["Everything in Single location", "Readiness by team, shift and location", "Role- and location-based access", "Notices to teams", "Same job sent to every site at once"] },
  { id: "enterprise", name: "Enterprise", for: "Franchises, plants and networks of sites.", price: null, checkout: null, cta: "Contact sales",
    points: ["Everything in Multi-location", "Rollout support across sites", "Custom branding (coming soon)", "API, BI tools and AI assistants (coming soon)"] },
];
export const COMPARE: { f: string; v: (boolean | string)[] }[] = [
  { f: "Operators per location", v: ["Unlimited", "Unlimited", "Unlimited"] },
  { f: "Video SOPs filmed on a phone", v: [true, true, true] },
  { f: "Video into steps", v: [true, true, true] },
  { f: "AI-drafted quizzes", v: [true, true, true] },
  { f: "Readiness tracking", v: [true, true, true] },
  { f: "Notices", v: [true, true, true] },
  { f: "Role- and location-based access", v: [false, true, true] },
  { f: "Multiple locations", v: [false, true, true] },
  { f: "Multilingual content", v: ["Coming soon", "Coming soon", "Coming soon"] },
  { f: "Custom branding", v: [false, false, "Coming soon"] },
  { f: "QR and job links", v: ["Coming soon", "Coming soon", "Coming soon"] },
  { f: "API and integrations", v: [false, false, "Coming soon"] },
];

// Enterprise tiers for 30+ users. Tier ranges and prices are placeholders until confirmed. Do not invent numbers.
export const ENTERPRISE_TIERS = [
  { id: "t1", en: "Tier 1", tr: "Kademe 1" },
  { id: "t2", en: "Tier 2", tr: "Kademe 2" },
  { id: "t3", en: "Tier 3", tr: "Kademe 3" },
];
export const PLAN_TR: Record<string, { name: string; for: string; points: string[] }> = {
  location: { name: "Tek lokasyon", for: "İşlerini videoya almaya başlayan tek bir işletme.", points: ["Sınırsız operatör", "iOS ve Android'de çekilen video SOP'lar", "Videodan adımlar, taslak talimatlar", "Yapay zekâ taslağı quizler, sizin onayınızla", "Kişi ve vardiya bazında hazırlık", "Yöneticiler için web platformu"] },
  multi: { name: "Çoklu lokasyon", for: "Aynı standartla çalışması gereken birden fazla lokasyon.", points: ["Tek lokasyon'daki her şey", "Ekip, vardiya ve lokasyon bazında hazırlık", "Rol ve lokasyon bazlı erişim", "Ekiplere duyurular", "Aynı işi tüm lokasyonlara tek seferde gönderme"] },
  enterprise: { name: "Enterprise", for: "Franchise'lar, fabrikalar ve lokasyon ağları.", points: ["Çoklu lokasyon'daki her şey", "Lokasyonlar arası yaygınlaştırma desteği", "Özel marka (yakında)", "API, BI araçları ve yapay zekâ asistanları (yakında)"] },
};

export const PRICING_FAQ = [
  { q: "How much does Flexlore cost?", a: "Flexlore is priced per location, with unlimited operators at each one. The exact plan depends on your team and how you will use it. Book a demo and we will put together the right plan with you." },
  { q: "Do I pay per user?", a: "No. Pricing is per location. Every operator at that location can learn on Flexlore." },
  { q: "Can I try it before I commit?", a: "Ask us on the demo call. We will build one of your real jobs with you so you can see it working on your floor." },
  { q: "Do I need technical skills to set it up?", a: "No. If you can film with a phone, you can create a step-by-step video SOP." },
  { q: "Which devices does it run on?", a: "iOS and Android for your team, plus a web platform for managers." },
  { q: "Who checks what the AI writes?", a: "You do. Steps, instructions and quizzes are drafts until your team approves them." },
  { q: "Does it work across several locations?", a: "Yes. Assign jobs and see readiness by team, shift and location. Control who can view, edit or complete each job by role and location." },
  { q: "Can it carry our branding?", a: "Custom branding is coming soon. Ask us on the demo call how it will fit your plan." },
  { q: "Can we connect Flexlore to our own tools?", a: "An API, connections to the BI tools you already use and an MCP server for AI assistants are coming soon. Tell us what you would connect and we will keep you posted." },
  { q: "How does billing and cancellation work?", a: "See our Subscription & Billing policy, or ask us on the demo call." },
  { q: "Where can I read about data and security?", a: "Our Privacy Policy, Data Processing, Sub-processors and Security pages cover it. Still have questions? Ask on the demo call." },
];
