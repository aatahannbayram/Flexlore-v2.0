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

/* Pricing. Source: app plan visuals from Ata Han (app-plans.png, enterprise.png), 2026-11-03.
   Model text kept as decided earlier: standard plans "per location", "unlimited operators" (awaiting decision,
   the app plans are user-limited). Do not change those strings until Ata Han decides. */
export const PRICING = { unit: "per location / month", operators: "Unlimited operators", currency: "$" as string | null };
export type Price = { now: string; was: string | null };
export type Plan = { id: string; name: string; for: string; badge: string | null; badgeTr: string | null; monthly: Price | null; yearly: Price | null; checkout: string | null; featured?: boolean; points: string[] };
/* Plan cards. points[0] of every plan after the first is the "Everything in X" link line; rest are additions. */
export const PLANS: Plan[] = [
  { id: "free", name: "Free", for: "Try Flexlore with a small team.", badge: null, badgeTr: null, monthly: { now: "$0", was: null }, yearly: { now: "$0", was: null }, checkout: null,
    points: ["Orientation Analysis", "AI quiz generator: 3 quizzes", "2 workspaces", "Unlimited folders", "5 works", "1 GB cloud storage", "3 users", "Standard support"] },
  { id: "pro", name: "Pro", for: "For a small business getting its jobs on video.", badge: "Recommended for Small Business", badgeTr: "Küçük işletmeler için önerilen", monthly: { now: "$99.99", was: "$149.99" }, yearly: { now: "$49.99", was: "$149.99" }, checkout: null,
    points: ["Everything in Free", "AI quiz generator: 10 quizzes", "5 workspaces", "Unlimited works", "5 GB cloud storage", "10 users"] },
  { id: "proplus", name: "ProPlus", for: "For growing teams that train every day.", badge: "Most popular", badgeTr: "En popüler", monthly: { now: "$149.99", was: "$299.99" }, yearly: { now: "$79.99", was: "$299.99" }, checkout: null, featured: true,
    points: ["Everything in Pro", "Unlimited quizzes", "Unlimited folders and works", "10 GB cloud storage", "30 users", "Premium support"] },
  { id: "enterprise", name: "Enterprise", for: "For teams of 30 or more users.", badge: null, badgeTr: null, monthly: null, yearly: null, checkout: null,
    points: ["Everything in ProPlus", "Cloud storage set with our sales team", "User count set with our sales team"] },
];
export const COMPARE: { f: string; tr: string; v: (boolean | string)[] }[] = [
  { f: "Billing basis", tr: "Fiyatlandırma esası", v: ["Per location", "Per location", "Per location", "By user count (30+ users)"] },
  { f: "Operators per location", tr: "Lokasyon başına operatör", v: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
  { f: "Orientation Analysis", tr: "Oryantasyon Analizi", v: [true, true, true, true] },
  { f: "AI quiz generator", tr: "Yapay zekâ quiz oluşturucu", v: ["3 quizzes", "10 quizzes", "Unlimited", "Unlimited"] },
  { f: "Workspaces", tr: "Çalışma alanları", v: ["2", "5", "Unlimited", "Unlimited"] },
  { f: "Folders", tr: "Klasörler", v: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
  { f: "Works", tr: "İşler", v: ["5", "Unlimited", "Unlimited", "Unlimited"] },
  { f: "Cloud storage", tr: "Bulut depolama", v: ["1 GB", "5 GB", "10 GB", "Talk to sales"] },
  { f: "Users", tr: "Kullanıcılar", v: ["3", "10", "30", "Talk to sales"] },
  { f: "Support", tr: "Destek", v: ["Standard", "Standard", "Premium", "Premium"] },
];

// Enterprise tiers for 30+ users (enterprise.png). ACV values intentionally not shown.
// Scale: SLA, SSO/SAML and dedicated infrastructure left out pending Ata Han's decision.
export const ENTERPRISE_TIERS = [
  { id: "starter", name: "Starter", price: "$249", custom: false, users: "40", usersTr: "40", points: ["Priority support", "Mobile + standard RBAC", "Annual agreement"], pointsTr: ["Öncelikli destek", "Mobil + standart RBAC", "Yıllık anlaşma"] },
  { id: "growth", name: "Growth", price: "$449", custom: false, users: "75", usersTr: "75", points: ["Custom integration + CSM", "Multi-location dashboard", "Annual agreement"], pointsTr: ["Özel entegrasyon + CSM", "Çoklu lokasyon paneli", "Yıllık anlaşma"] },
  { id: "scale", name: "Scale", price: null, custom: true, users: "100+", usersTr: "100+", points: ["Custom contract"], pointsTr: ["Özel kontrat"] },
];
export const PLAN_TR: Record<string, { name: string; for: string; points: string[] }> = {
  free: { name: "Free", for: "Flexlore'u küçük bir ekiple deneyin.", points: ["Oryantasyon Analizi", "Yapay zekâ quiz oluşturucu: 3 quiz", "2 çalışma alanı", "Sınırsız klasör", "5 iş", "1 GB bulut depolama", "3 kullanıcı", "Standart destek"] },
  pro: { name: "Pro", for: "İşlerini videoya almaya başlayan küçük işletmeler için.", points: ["Free planındaki her şey", "Yapay zekâ quiz oluşturucu: 10 quiz", "5 çalışma alanı", "Sınırsız iş", "5 GB bulut depolama", "10 kullanıcı"] },
  proplus: { name: "ProPlus", for: "Her gün eğitim veren, büyüyen ekipler için.", points: ["Pro planındaki her şey", "Sınırsız quiz", "Sınırsız klasör ve iş", "10 GB bulut depolama", "30 kullanıcı", "Premium destek"] },
  enterprise: { name: "Enterprise", for: "30 ve üzeri kullanıcılı ekipler için.", points: ["ProPlus planındaki her şey", "Bulut depolama satış ekibiyle belirlenir", "Kullanıcı sayısı satış ekibiyle belirlenir"] },
};

// TR versions of the pricing FAQ. Model: standard plans per location, Enterprise (30+ users) by user count.
export const PRICING_FAQ_TR = [
  { q: "Flexlore'un ücreti ne kadar?", a: "Standart planlar lokasyon başına fiyatlanır ve her lokasyonda operatör sayısı sınırsızdır. Enterprise (30+ kullanıcı) kullanıcı sayısına göre fiyatlanır. Size uygun plan, ekibinize ve Flexlore'u nasıl kullanacağınıza göre belirlenir. Bir demo ayarlayın, doğru planı birlikte oluşturalım." },
  { q: "Kullanıcı başına mı ödüyorum?", a: "Standart planlar lokasyon başına fiyatlanır. Enterprise (30+ kullanıcı) kullanıcı sayısına göre fiyatlanır. Standart planlarda o lokasyondaki her operatör Flexlore'da öğrenebilir." },
  { q: "Karar vermeden önce deneyebilir miyim?", a: "Demo görüşmesinde bize sorun. Gerçek işlerinizden birini sizinle birlikte hazırlarız, sahada nasıl çalıştığını kendiniz görürsünüz." },
  { q: "Kurulum için teknik bilgi gerekir mi?", a: "Hayır. Telefonla video çekebiliyorsanız adım adım bir video SOP oluşturabilirsiniz." },
  { q: "Hangi cihazlarda çalışır?", a: "Ekibiniz için iOS ve Android, yöneticiler için web platformu." },
  { q: "Yapay zekânın yazdıklarını kim kontrol ediyor?", a: "Siz. Adımlar, talimatlar ve quizler ekibiniz onaylayana kadar taslak olarak kalır." },
  { q: "Birden fazla lokasyonda çalışır mı?", a: "Evet. İşleri atayın, hazırlığı ekip, vardiya ve lokasyon bazında görün. Her işi kimin görebileceğini, düzenleyebileceğini veya tamamlayabileceğini rol ve lokasyona göre belirleyin." },
  { q: "Kendi markamızı taşıyabilir mi?", a: "Özel marka yakında geliyor. Planınıza nasıl uyacağını demo görüşmesinde sorabilirsiniz." },
  { q: "Flexlore'u kendi araçlarımıza bağlayabilir miyiz?", a: "API, kullandığınız BI araçlarına bağlantılar ve yapay zekâ asistanları için bir MCP sunucusu yakında geliyor. Neyi bağlamak istediğinizi söyleyin, sizi haberdar edelim." },
  { q: "Faturalandırma ve iptal nasıl işliyor?", a: "Abonelik ve Faturalandırma politikamıza göz atın ya da demo görüşmesinde bize sorun." },
  { q: "Veri ve güvenlik hakkında nereden bilgi alabilirim?", a: "Gizlilik Politikası, Veri İşleme, Alt İşleyenler ve Güvenlik sayfalarımızda bulabilirsiniz. Başka sorunuz varsa demo görüşmesinde sorun." },
];

export const PRICING_FAQ = [
  { q: "How much does Flexlore cost?", a: "Standard plans are priced per location, with unlimited operators at each one. Enterprise (30+ users) is priced by user count. The exact plan depends on your team and how you will use it. Book a demo and we will put together the right plan with you." },
  { q: "Do I pay per user?", a: "Standard plans are priced per location. Enterprise (30+ users) is priced by user count. On standard plans, every operator at that location can learn on Flexlore." },
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
