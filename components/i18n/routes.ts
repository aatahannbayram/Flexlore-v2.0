/* Turkish URL mirror (2026-11-14). English pages live at their usual paths; the pages that have Turkish copy are also
 * prerendered in Turkish under /tr/ (sector pages use Turkish slugs: /industries/restaurants/ <-> /tr/sektor/restoran/).
 * One table drives the language switch, internal links on Turkish pages, hreflang and the sitemap.
 * Blog posts and legal documents are English only, so they have no /tr/ twin and links to them stay English. */
/* Small lists kept here on purpose: this module ships on every page (Link), so it must not import the copy-heavy
 * sector or feature modules. sectors.ts re-exports SECTOR_EN; a test-free guard: both lists are checked at build in
 * app/sitemap.ts (every sector and feature must resolve). */
/** English URL slug per sector (the Turkish slug is the key and the Turkish page slug). */
export const SECTOR_EN: Record<string, string> = {"restoran":"restaurants","uretim":"manufacturing","otel":"hotels","franchise":"franchises","depo":"warehouses","firin":"bakeries-cafes"};
const FEATURE_SLUGS = ["video-to-sop", "pdf-to-steps", "video-editor", "screen-recording", "ai-quiz", "auto-translation", "qr-codes", "notifications", "permissions-workspaces", "web-panel", "ai-agents-mcp"];

const STATIC = ["/", "/features/", "/pricing/", "/faq/", "/ai/", "/integrations/", "/see-it/", "/company/", "/support/", "/careers/"];
/** English paths that have a Turkish twin. */
export const TR_MIRROR: string[] = [
  ...STATIC,
  ...FEATURE_SLUGS.map((f) => `/features/${f}/`),
  ...Object.values(SECTOR_EN).map((s) => `/industries/${s}/`),
  /* Use-case slugs are listed here (not imported from UseCase.tsx) to keep this module free of component imports. */
  "/use-cases/master-apprentice-skills-transfer/", "/use-cases/installation-training-on-site-orientation/",
];
const SET = new Set(TR_MIRROR);
const TR_SECTOR: Record<string, string> = Object.fromEntries(Object.entries(SECTOR_EN).map(([tr, en]) => [en, tr]));

export const isTrPath = (p: string) => p === "/tr" || p.startsWith("/tr/");
/** Split "/x/?a=1#b" into path and the rest. */
const split = (href: string) => { const m = href.match(/^([^?#]*)(.*)$/)!; return [m[1] || "/", m[2]] as const; };
const slash = (p: string) => (p.endsWith("/") ? p : p + "/");

/** English path -> its Turkish twin, or null when the page is English only. */
export function trOf(path: string): string | null {
  const p = slash(path);
  if (!SET.has(p)) return null;
  const sec = p.match(/^\/industries\/([^/]+)\/$/);
  if (sec) return `/tr/sektor/${TR_SECTOR[sec[1]] ?? sec[1]}/`;
  return p === "/" ? "/tr/" : `/tr${p}`;
}
/** Turkish path -> its English twin. */
export function enOf(path: string): string {
  const p = slash(path);
  const sec = p.match(/^\/tr\/sektor\/([^/]+)\/$/);
  if (sec) return `/industries/${SECTOR_EN[sec[1]] ?? sec[1]}/`;
  if (p === "/tr/") return "/";
  return isTrPath(p) ? p.slice(3) : p;
}
/** An internal href as seen from a Turkish page: mirrored pages get their /tr/ twin, everything else stays as is. */
export function localHref(href: string, tr: boolean): string {
  if (!tr || !href.startsWith("/") || href.startsWith("//") || isTrPath(href)) return href;
  const [p, rest] = split(href); const t = trOf(p);
  return t ? t + rest : href;
}
