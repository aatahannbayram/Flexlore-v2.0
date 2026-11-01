import type { Metadata } from "next";
import { BlogIndex } from "@/components/Blog";
export const metadata: Metadata = { title: "Articles | Flexlore", alternates: { canonical: "/blog/" }, robots: { index: false, follow: false } };
export default function Page() { return <BlogIndex />; }
