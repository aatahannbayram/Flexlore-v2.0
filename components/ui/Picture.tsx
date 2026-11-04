/** <picture> for images processed by scripts/images.mjs: AVIF, then WebP, at 800 and 1600 px wide.
 *  `src` is the original path (e.g. /blog/x.png); variants are derived from it. */
export function Picture({ src, alt, sizes = "100vw", className = "", loading = "lazy", priority = false }: {
  src: string; alt: string; sizes?: string; className?: string; loading?: "lazy" | "eager"; priority?: boolean;
}) {
  const base = src.replace(/\.(png|jpe?g)$/i, "");
  const set = (fmt: string) => `${base}-800.${fmt} 800w, ${base}-1600.${fmt} 1600w`;
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img src={`${base}-1600.webp`} alt={alt} className={className} loading={priority ? "eager" : loading} decoding="async" {...(priority ? { fetchPriority: "high" as const } : {})} />
    </picture>);
}
