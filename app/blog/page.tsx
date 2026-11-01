import { BlogIndex } from "@/components/Blog";
import { meta, Ld, crumbs } from "@/components/seo";
import seo from "@/lib/seo.json";
export const metadata = meta({ title: seo["/blog/"].t, description: seo["/blog/"].d, path: "/blog/" });
export default function Page() { return (<><Ld data={crumbs([["Home", "/"], ["Blog", "/blog/"]])} /><BlogIndex /></>); }
