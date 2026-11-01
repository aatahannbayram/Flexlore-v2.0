import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
import "./globals.css";
const inter = Inter({ subsets: ["latin", "latin-ext"], axes: ["opsz"], variable: "--font-inter", display: "swap" });
const title = "Flexlore | AI-Powered Video Onboarding & Standard Work";
const description = "Turn videos into standard work. Flexlore splits recordings into steps, drafts AI quizzes and shows which frontline team is ready, by shift and location.";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.flexlore.com"),
  title, description,
  keywords: ["video onboarding", "standard work", "video SOP", "frontline training", "AI quiz", "work instructions", "employee onboarding", "training effectiveness"],
  alternates: { canonical: "/" },
  // DEMO: noindex. For launch set index: true, follow: true and remove public/robots.txt Disallow.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: { type: "website", url: "/", siteName: "Flexlore", title, description, images: [{ url: "/og.png", width: 1080, height: 1080, alt: "Flexlore video onboarding and standard work" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  icons: { icon: "/brand/mark.png" },
};
export const viewport: Viewport = { themeColor: "#000000" };
const ld = [
  { "@context": "https://schema.org", "@type": "Organization", name: "Flexlore", url: "https://www.flexlore.com", logo: "https://www.flexlore.com/brand/logo.png",
    sameAs: ["https://apps.apple.com/tr/app/flexlore/id6751126206", "https://play.google.com/store/apps/details?id=com.flexlore.app"] },
  { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Flexlore", applicationCategory: "BusinessApplication", operatingSystem: "iOS, Android, Web",
    description, url: "https://www.flexlore.com", publisher: { "@type": "Organization", name: "Flexlore" } },
];
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${inter.variable} ${geistMono.variable}`}><head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /></head><body className="font-sans antialiased">{children}<div aria-hidden="true" className="grain" /></body></html>);
}
