import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
const schibsted = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-schibsted", display: "swap" });
import seo from "@/lib/seo.json";
import { SITE } from "@/components/config";
import { robots } from "@/components/seo";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { AssistantLauncher } from "@/components/assistant/Launcher";
import { ConsentBanner } from "@/components/ConsentBanner";
import { TZ, LOCALES } from "@/components/i18n/locales";
import { Analytics } from "@/components/Analytics";
/* Runs before first paint: picks the language the provider will pick (saved choice, time-zone country, browser language).
   On a Turkish URL (/tr/...) the HTML is already Turkish: it only sets lang="tr" and never hides the page.
   For a non-English visitor the page stays invisible until that dictionary has loaded, so English never flashes or shifts. */
const I18N_BOOT = `try{if(/^\\/tr(\\/|$)/.test(location.pathname)){document.documentElement.lang="tr";throw 0}var L=${JSON.stringify(LOCALES.map((l) => [l.code, l.dir]))},T=${JSON.stringify(TZ)},s=localStorage.getItem("flx-lang"),c=null,k=function(x){for(var i=0;i<L.length;i++)if(L[i][0]===x)return L[i];return null};if(k(s))c=s;else{var z=Intl.DateTimeFormat().resolvedOptions().timeZone;if(T[z])c=T[z];else{var n=navigator.languages||[navigator.language];for(var j=0;j<n.length;j++){var q=(n[j]||"").slice(0,2).toLowerCase();if(k(q)){c=q;break}}}}if(c&&c!=="en"){var e=document.documentElement;e.lang=c;e.dir=k(c)[1];e.classList.add("i18n-wait");setTimeout(function(){e.classList.remove("i18n-wait")},2500)}}catch(e){}`;
/* Loading mark (globals.css .splash): shown on the first page of a visit only. Later pages and reduced motion skip it; while it
   plays, the hero's own entrance waits (splash-on), then runs as the mark fades. */
const SPLASH = `try{var h=document.documentElement;if(sessionStorage.getItem("flx-sp")||matchMedia("(prefers-reduced-motion: reduce)").matches){h.classList.add("no-splash")}else{sessionStorage.setItem("flx-sp","1");h.classList.add("splash-on");setTimeout(function(){h.classList.remove("splash-on")},700)}}catch(e){document.documentElement.classList.add("no-splash")}`;
const title = seo["/"].t;
const description = seo["/"].d;
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title, description,
  keywords: ["video SOP", "video work instructions", "standard work instructions", "standard work", "frontline training", "AI quiz", "work instructions", "employee onboarding", "training readiness tracking", "restaurant training", "manufacturing work instructions", "franchise training"],
  alternates: { canonical: "/", languages: { en: "/", tr: "/tr/", "x-default": "/" } },
  robots, // driven by SITE.noindex in components/config.ts
  openGraph: { type: "website", url: "/", siteName: "Flexlore", title, description, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Film the job once. Know who is ready to do it. Flexlore video work instructions." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  icons: { icon: [{ url: "/brand/icon-32.png", sizes: "32x32" }, { url: "/icon.svg", type: "image/svg+xml" }], apple: "/brand/icon-180.png" },
};
export const viewport: Viewport = { themeColor: "#111111" };
const ld = [
  { "@context": "https://schema.org", "@type": "Organization", "@id": SITE.url + "/#org", name: "Flexlore", legalName: "Flexlore Inc.", url: SITE.url, logo: SITE.url + "/brand/logo.png", email: "support@flexlore.com",
    founder: { "@type": "Person", name: "Ata Han Bayram", jobTitle: "Co-founder and CEO" },
    sameAs: [SITE.social.linkedin, SITE.social.instagram, SITE.social.youtube, SITE.appStore, SITE.googlePlay] },
  { "@context": "https://schema.org", "@type": "WebSite", "@id": SITE.url + "/#website", name: "Flexlore", url: SITE.url, description, publisher: { "@id": SITE.url + "/#org" },
    inLanguage: LOCALES.map((l) => l.code) },
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Flexlore", applicationCategory: "BusinessApplication", operatingSystem: "iOS, Android, Web",
    description, url: SITE.url, downloadUrl: [SITE.appStore, SITE.googlePlay], installUrl: SITE.appStore,
    featureList: ["Video to step-by-step SOP", "Phone video editor with step markers", "AI-drafted quizzes", "Roles, permissions and workspaces by location", "Completion tracking by person, team and location", "Workspaces, folders and work by site and team", "Available in 8 languages"],
    audience: { "@type": "BusinessAudience", audienceType: "Frontline businesses: restaurants and cafés, manufacturing, hotels, franchises, warehouses" }, publisher: { "@id": SITE.url + "/#org" } },
];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={schibsted.variable} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: I18N_BOOT }} /><script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("flx-theme")==="light"){document.documentElement.dataset.theme="light";document.querySelector('meta[name="theme-color"]')?.setAttribute("content","#FAF8F5")}}catch(e){}` }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /></head><body className="font-sans antialiased"><div className="splash" aria-hidden="true"><i /><svg viewBox="0 0 69.64 69.64"><path className="sp-a" fill="currentColor" d="M44.50 13.69C42.73 15.34 40.60 17.14 38.86 18.80C36.83 20.63 35.82 21.57 34.79 21.57C33.76 21.57 32.75 20.66 30.72 18.80C28.950 17.14 26.82 15.31 25.08 13.69C17.91 7.08 9.32 2.86 0.00 0.00L0.00 11.12C8.38 12.95 15.93 20.24 22.84 26.14C26.47 29.66 30.63 31.54 34.82 31.57C39.01 31.57 43.14 29.66 46.80 26.14C53.68 20.24 61.26 12.95 69.64 11.12L69.64 0.00C60.32 2.83 51.73 7.05 44.56 13.69L44.50 13.69" /><path className="sp-b" fill="#EC6726" d="M34.79 34.64C30.78 34.70 26.94 36.21 24.20 38.51L0.00 57.31L0.00 69.64L30.42 46.74C31.34 46.06 32.31 45.470 33.34 45.00C34.26 44.56 35.35 44.56 36.27 45.00C37.30 45.47 38.27 46.06 39.19 46.74L69.61 69.64L69.61 57.31L45.41 38.51C42.67 36.21 38.83 34.70 34.82 34.64L34.79 34.64" /></svg></div><script dangerouslySetInnerHTML={{ __html: SPLASH }} /><MotionProvider><LocaleProvider>{children}<AssistantLauncher /><ConsentBanner /><Analytics /></LocaleProvider></MotionProvider></body></html>);
}
