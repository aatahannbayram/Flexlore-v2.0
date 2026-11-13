import type { Metadata } from "next";
import MikelCoffee from "@/components/MikelCoffee";
import { meta } from "@/components/seo";
/* Named-customer demo: never indexed, whatever the launch flag says (customer names stay out of search until approved). */
const m = meta({ title: "Flexlore × Mikel Coffee · Kahve operasyonu demosu", description: "Barista video reçeteleri, kahve istasyonu açılışı, alerjen ve hijyen, usta–çırak aktarımı: Mikel Coffee şubeleri için Flexlore demosu.", path: "/demo/mikel-coffee/" });
export const metadata: Metadata = { ...m, robots: { index: false, follow: false } };
export default function Page() { return <MikelCoffee />; }
