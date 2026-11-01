import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });
const serif = Instrument_Serif({ subsets: ["latin", "latin-ext"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
export const metadata: Metadata = {
  title: "Flexlore — Video SOPs that show which team is actually ready",
  description: "Turn the way your best people work into short video SOPs, quizzes and a clear view of who is ready.",
  icons: { icon: "/brand/mark.png" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${inter.variable} ${serif.variable}`}><body className="font-sans antialiased">{children}</body></html>);
}
