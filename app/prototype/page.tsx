import KreaProto from "@/components/proto/KreaProto";
import { Footer } from "@/components/Footer";
/* Design prototype for review only: not linked, not in the sitemap, never indexed. */
export const metadata = { title: "Prototype | Flexlore", robots: { index: false, follow: false }, alternates: { canonical: null } };
export default function Page() { return (<><KreaProto /><Footer /></>); }
