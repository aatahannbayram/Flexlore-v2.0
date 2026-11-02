import type { Metadata } from "next";
import MikelCoffee from "@/components/MikelCoffee";
import { meta } from "@/components/seo";
export const metadata: Metadata = meta({ title: "Flexlore × Mikel Coffee · Kahve operasyonu demosu", description: "Barista video reçeteleri, kahve istasyonu açılışı, alerjen ve hijyen, usta–çırak aktarımı: Mikel Coffee şubeleri için Flexlore demosu.", path: "/demo/mikel-coffee/" });
export default function Page() { return <MikelCoffee />; }
