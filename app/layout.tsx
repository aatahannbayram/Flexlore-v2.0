import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
import "./globals.css";
const inter = Inter({ subsets: ["latin", "latin-ext"], axes: ["opsz"], variable: "--font-inter", display: "swap" });
import seo from "@/lib/seo.json";
import { SITE } from "@/components/config";
import { robots } from "@/components/seo";
const title = seo["/"].t;
const description = seo["/"].d;
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title, description,
  keywords: ["video SOP", "video work instructions", "standard work instructions", "standard work", "frontline training", "AI quiz", "work instructions", "employee onboarding"],
  alternates: { canonical: "/" },
  robots, // driven by SITE.noindex in components/config.ts
  openGraph: { type: "website", url: "/", siteName: "Flexlore", title, description, images: [{ url: "/og.png", width: 526, height: 526, alt: "Flexlore video SOPs, step by step" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  icons: { icon: "/brand/app-icon.png", apple: "/brand/app-icon.png" },
};
export const viewport: Viewport = { themeColor: "#000000" };
const ld = [
  { "@context": "https://schema.org", "@type": "Organization", "@id": SITE.url + "/#org", name: "Flexlore", legalName: "Flexlore Inc.", url: SITE.url, logo: SITE.url + "/brand/logo.png", email: "hello@flexlore.com",
    founder: { "@type": "Person", name: "Ata Han Bayram", jobTitle: "Co-founder and CEO" },
    sameAs: [SITE.social.linkedin, SITE.social.instagram, SITE.social.youtube, SITE.appStore, SITE.googlePlay] },
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Flexlore", applicationCategory: "BusinessApplication", operatingSystem: "iOS, Android, Web",
    description, url: SITE.url, downloadUrl: [SITE.appStore, SITE.googlePlay], installUrl: SITE.appStore, publisher: { "@id": SITE.url + "/#org" } },
];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${inter.variable} ${geistMono.variable}`}><head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /></head><body className="font-sans antialiased">{children}<div aria-hidden="true" className="grain" /></body></html>);
}
