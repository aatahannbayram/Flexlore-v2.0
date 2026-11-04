import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
const schibsted = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-schibsted", display: "swap" });
import seo from "@/lib/seo.json";
import { SITE } from "@/components/config";
import { robots } from "@/components/seo";
import { MotionProvider } from "@/components/ui/MotionProvider";
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
  return (<html lang="en" className={schibsted.variable} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("flx-theme")==="light"){document.documentElement.dataset.theme="light";document.querySelector('meta[name="theme-color"]')?.setAttribute("content","#FAF8F5")}}catch(e){}` }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /></head><body className="font-sans antialiased"><MotionProvider>{children}</MotionProvider></body></html>);
}
