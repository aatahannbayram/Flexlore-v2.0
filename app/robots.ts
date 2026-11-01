import type { MetadataRoute } from "next";
import { SITE } from "@/components/config";
export const dynamic = "force-static";
// Follows SITE.noindex. Demo: disallow all. Launch: flip the flag.
export default function robots(): MetadataRoute.Robots {
  return SITE.noindex ? { rules: { userAgent: "*", disallow: "/" }, sitemap: SITE.url + "/sitemap.xml" }
    : { rules: { userAgent: "*", allow: "/" }, sitemap: SITE.url + "/sitemap.xml" };
}
