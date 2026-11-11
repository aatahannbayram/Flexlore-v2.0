import type { Metadata } from "next";
import Site2 from "@/components/Site2";
// Trial page for comparing with the home page: never indexed, not in the sitemap.
export const metadata: Metadata = { title: { absolute: "Flexlore (home2 trial)" }, robots: { index: false, follow: false }, alternates: { canonical: "/" } };
export default function Page() { return <Site2 />; }
