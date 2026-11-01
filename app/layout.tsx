import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const display = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-display" });
export const metadata: Metadata = {
  title: "Flexlore — Video SOPs that show which team is actually ready",
  description: "Turn operational know-how into video SOPs, AI quizzes and live readiness tracking for frontline teams.",
  icons: { icon: "/brand/mark.png" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${inter.variable} ${display.variable}`}><body className="grain font-sans antialiased">{children}</body></html>);
}
