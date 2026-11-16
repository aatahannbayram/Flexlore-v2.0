/* Static export: the root layout renders <html lang="en"> for every page, and the Turkish pages only switch to "tr" in
 * the browser (I18N_BOOT in app/layout.tsx). Crawlers that read the raw HTML should see the right language, so after the
 * build every page under out/tr/ (and the Turkish trust page) gets lang="tr" in the file itself. */
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
const OUT = new URL("../out", import.meta.url).pathname;
const files = [];
const walk = (d) => { if (!existsSync(d)) return; for (const n of readdirSync(d)) { const p = join(d, n); statSync(p).isDirectory() ? walk(p) : n.endsWith(".html") && files.push(p); } };
walk(join(OUT, "tr")); if (existsSync(join(OUT, "trust/turkiye/index.html"))) files.push(join(OUT, "trust/turkiye/index.html"));
let n = 0;
for (const f of files) {
  const s = readFileSync(f, "utf8"); const r = s.replace(/<html lang="en"/, '<html lang="tr"');
  if (r !== s) { writeFileSync(f, r); n++; }
}
console.log(`lang-tr: ${n} Turkish pages set to lang="tr"`);
