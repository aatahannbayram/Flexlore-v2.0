import type { Metadata } from "next";
import Site2 from "@/components/Site2";
// Turkish copy of the /home2 trial: never indexed, not in the sitemap.
export const metadata: Metadata = { title: { absolute: "Flexlore (home2 deneme)" }, robots: { index: false, follow: false }, alternates: { canonical: "/tr/" } };
export default function Page() { return <Site2 />; }
