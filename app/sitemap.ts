import { FEATURES } from "@/components/features/data";
import type { MetadataRoute } from "next";
import { SITE } from "@/components/config";
import { posts } from "@/components/Blog";
import { sectors, sectorPath } from "@/components/sectors";
import { trOf, TR_MIRROR } from "@/components/i18n/routes";
import { USE_CASES } from "@/components/UseCase";
import { LEGAL } from "@/components/legal/docs";
import { TRUST_TR, TRUST_TR_PATH } from "@/components/trust/config";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  /* Pages with a Turkish twin list both languages (hreflang in the sitemap), and the Turkish URL is added as its own entry. */
  const alt = (p: string) => { const t = trOf(p); return t ? { alternates: { languages: { en: SITE.url + p, tr: SITE.url + t, "x-default": SITE.url + p } } } : {}; };
  const u = (p: string, priority: number) => ({ url: SITE.url + p, lastModified: "2026-11-14", priority, ...alt(p) });
  const all = [u("/", 1), u("/pricing/", 0.9), u("/see-it/", 0.8), u("/ai/", 0.7), u("/integrations/", 0.7), u("/features/", 0.8), ...FEATURES.map((f) => u(`/features/${f.slug}/`, 0.7)), ...USE_CASES.map((c) => u(`/use-cases/${c.slug}/`, 0.8)), ...sectors.map((s) => u(sectorPath(s.slug), 0.7)), u("/company/", 0.6), u("/careers/", 0.5), u("/support/", 0.6), u("/faq/", 0.6), u("/legal/", 0.4), ...LEGAL.map((d) => u(`/legal/${d.slug}/`, 0.3)), ...(TRUST_TR.approved ? [u(TRUST_TR_PATH.tr, 0.4), u(TRUST_TR_PATH.en, 0.4)] : []), u("/blog/", 0.6), ...posts.map((p) => u(`/blog/${p.slug}/`, 0.5))];
  /* Guard: every mirrored English path must be in the sitemap (catches a renamed slug in components/i18n/routes.ts). */
  const urls = new Set(all.map((x) => x.url));
  for (const p of TR_MIRROR) if (!urls.has(SITE.url + p)) throw new Error(`routes.ts lists ${p}, which is not a page in the sitemap`);
  const tr = all.flatMap((x) => { const p = x.url.slice(SITE.url.length); const t = trOf(p); return t ? [{ ...x, url: SITE.url + t }] : []; });
  return [...all, ...tr];
}
