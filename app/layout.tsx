import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
const schibsted = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-schibsted", display: "swap" });
import seo from "@/lib/seo.json";
import { SITE } from "@/components/config";
import { robots } from "@/components/seo";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { TZ, LOCALES } from "@/components/i18n/locales";
/* Runs before first paint: picks the language the provider will pick (saved choice, time-zone country, browser language).
   For a non-English visitor the page stays invisible until that dictionary has loaded, so English never flashes or shifts. */
const I18N_BOOT = `try{var L=${JSON.stringify(LOCALES.map((l) => [l.code, l.dir]))},T=${JSON.stringify(TZ)},s=localStorage.getItem("flx-lang"),c=null,k=function(x){for(var i=0;i<L.length;i++)if(L[i][0]===x)return L[i];return null};if(k(s))c=s;else{var z=Intl.DateTimeFormat().resolvedOptions().timeZone;if(T[z])c=T[z];else{var n=navigator.languages||[navigator.language];for(var j=0;j<n.length;j++){var q=(n[j]||"").slice(0,2).toLowerCase();if(k(q)){c=q;break}}}}if(c&&c!=="en"){var e=document.documentElement;e.lang=c;e.dir=k(c)[1];e.classList.add("i18n-wait");setTimeout(function(){e.classList.remove("i18n-wait")},2500)}}catch(e){}`;
const title = seo["/"].t;
const description = seo["/"].d;
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title, description,
  keywords: ["video SOP", "video work instructions", "standard work instructions", "standard work", "frontline training", "AI quiz", "work instructions", "employee onboarding"],
  alternates: { canonical: "/" },
  robots, // driven by SITE.noindex in components/config.ts
  openGraph: { type: "website", url: "/", siteName: "Flexlore", title, description, images: [{ url: "/og.png", width: 1200, height: 630, alt: "Film the job once. Know who is ready to do it. Flexlore video work instructions." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  icons: { icon: [{ url: "/brand/icon-32.png", sizes: "32x32" }, { url: "/brand/symbol-main.svg", type: "image/svg+xml" }], apple: "/brand/icon-180.png" },
};
export const viewport: Viewport = { themeColor: "#111111" };
const ld = [
  { "@context": "https://schema.org", "@type": "Organization", "@id": SITE.url + "/#org", name: "Flexlore", legalName: "Flexlore Inc.", url: SITE.url, logo: SITE.url + "/brand/logo.png", email: "support@flexlore.com",
    founder: { "@type": "Person", name: "Ata Han Bayram", jobTitle: "Co-founder and CEO" },
    sameAs: [SITE.social.linkedin, SITE.social.instagram, SITE.social.youtube, SITE.appStore, SITE.googlePlay] },
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Flexlore", applicationCategory: "BusinessApplication", operatingSystem: "iOS, Android, Web",
    description, url: SITE.url, downloadUrl: [SITE.appStore, SITE.googlePlay], installUrl: SITE.appStore, publisher: { "@id": SITE.url + "/#org" } },
];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={schibsted.variable} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: I18N_BOOT }} /><script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("flx-theme")==="light"){document.documentElement.dataset.theme="light";document.querySelector('meta[name="theme-color"]')?.setAttribute("content","#FAF8F5")}}catch(e){}` }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /></head><body className="font-sans antialiased"><MotionProvider><LocaleProvider>{children}</LocaleProvider></MotionProvider></body></html>);
}
