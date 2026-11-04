import { FEATURES } from "@/components/features/data";
import type { MetadataRoute } from "next";
import { SITE } from "@/components/config";
import { posts } from "@/components/Blog";
import { sectors } from "@/components/sectors";
import { USE_CASES } from "@/components/UseCase";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string, priority: number) => ({ url: SITE.url + p, lastModified: "2026-11-02", priority });
  return [u("/", 1), u("/pricing/", 0.9), u("/see-it/", 0.8), u("/ai/", 0.7), u("/integrations/", 0.7), u("/features/", 0.8), ...FEATURES.map((f) => u(`/features/${f.slug}/`, 0.7)), ...USE_CASES.map((c) => u(`/use-cases/${c.slug}/`, 0.8)), ...sectors.map((s) => u(`/sektor/${s.slug}/`, 0.7)), u("/blog/", 0.6), ...posts.map((p) => u(`/blog/${p.slug}/`, 0.5))];
}
