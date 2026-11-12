import type { MetadataRoute } from "next";
import { SITE } from "@/components/config";
export const dynamic = "force-static";
/* Follows SITE.noindex (components/config.ts): while true (preprod) every crawler is kept out. At launch, flip the flag.
 * AI crawler policy (Linear FLE-59), a deliberate choice: search and AI assistants may read the whole public site, so
 * ChatGPT, Claude, Gemini and Perplexity describe Flexlore from our own pages (see also /llms.txt). They are named here so
 * the policy is visible and can be changed per bot. */
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "Google-Extended", "PerplexityBot", "Perplexity-User", "Applebot-Extended", "CCBot"];
export default function robots(): MetadataRoute.Robots {
  if (SITE.noindex) return { rules: { userAgent: "*", disallow: "/" }, sitemap: SITE.url + "/sitemap.xml" };
  return { rules: [{ userAgent: "*", allow: "/" }, { userAgent: AI_BOTS, allow: "/" }], sitemap: SITE.url + "/sitemap.xml" };
}
