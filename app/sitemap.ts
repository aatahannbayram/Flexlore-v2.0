import { FEATURES } from "@/components/features/data";
import type { MetadataRoute } from "next";
import { SITE } from "@/components/config";
import { posts } from "@/components/Blog";
import { sectors } from "@/components/sectors";
import { USE_CASES } from "@/components/UseCase";
import { LEGAL } from "@/components/legal/docs";
import { TRUST_TR, TRUST_TR_PATH } from "@/components/trust/config";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string, priority: number) => ({ url: SITE.url + p, lastModified: "2026-11-10", priority });
  return [u("/", 1), u("/pricing/", 0.9), u("/see-it/", 0.8), u("/ai/", 0.7), u("/integrations/", 0.7), u("/features/", 0.8), ...FEATURES.map((f) => u(`/features/${f.slug}/`, 0.7)), ...USE_CASES.map((c) => u(`/use-cases/${c.slug}/`, 0.8)), ...sectors.map((s) => u(`/sektor/${s.slug}/`, 0.7)), u("/company/", 0.6), u("/support/", 0.6), u("/faq/", 0.6), u("/legal/", 0.4), ...LEGAL.map((d) => u(`/legal/${d.slug}/`, 0.3)), ...(TRUST_TR.approved ? [u(TRUST_TR_PATH.tr, 0.4), u(TRUST_TR_PATH.en, 0.4)] : []), u("/blog/", 0.6), ...posts.map((p) => u(`/blog/${p.slug}/`, 0.5))];
}
