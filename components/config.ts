// Single source of truth for launch flags, links and pricing hooks.
export const SITE = {
  url: "https://www.flexlore.com",
  // DEMO: keep true. Flip to false at launch: robots, sitemap and every page's meta follow this flag.
  noindex: true,
  demo: "https://app-eu1.hubspot.com/meetings/alper-kalip?troubleshoot=true&uuid=6feee1d8-83b2-400a-b3f2-929119a9047d",
  appStore: "https://apps.apple.com/app/flexlore/id6751126206",
  googlePlay: "https://play.google.com/store/apps/details?id=com.flexlore.app",
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
export const PLANS: Plan[] = [
  { id: "location", name: "Single location", for: "One site getting its jobs on video.", price: null, checkout: null, cta: "Book a demo",
    points: ["Unlimited operators", "Video SOPs filmed on iOS and Android", "Video into steps, drafted instructions", "AI-drafted quizzes, approved by you", "Readiness by person and shift", "Web platform for managers"] },
  { id: "multi", name: "Multi-location", for: "Several sites that must work to one standard.", price: null, checkout: null, cta: "Book a demo", featured: true,
    points: ["Everything in Single location", "Readiness by team, shift and location", "Role- and location-based access", "Notices to teams", "Same job sent to every site at once"] },
  { id: "enterprise", name: "Enterprise", for: "Franchises, plants and networks of sites.", price: null, checkout: null, cta: "Contact sales",
    points: ["Everything in Multi-location", "Rollout support across sites", "Custom branding (coming soon)", "API, Power BI and MCP (coming soon)"] },
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
