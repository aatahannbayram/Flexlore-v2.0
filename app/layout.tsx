import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist" });
export const metadata: Metadata = {
  title: "Flexlore. Teach it once.",
  description: "Film the job once. Flexlore turns it into video steps, checks understanding and shows who is ready, every shift.",
  icons: { icon: "/brand/mark.png" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={geist.variable}><body className="font-sans antialiased">{children}</body></html>);
}
