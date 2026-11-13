import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { MotionLab } from "@/components/lab/MotionLab";

/* Internal motion lab (2026-11-13): side-by-side demos of the proposed motion system for review. Not in the sitemap,
 * never indexed, not linked from the site. Remove before launch or keep as an internal page. */
export const metadata: Metadata = { title: { absolute: "Motion lab | Flexlore (internal)" }, robots: { index: false, follow: false } };
export default function Page() {
  return (<><Header /><main id="main" className="overflow-x-clip pt-[var(--header-h)]"><MotionLab /></main></>);
}
