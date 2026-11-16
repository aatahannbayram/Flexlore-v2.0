/* After a deploy: tell Bing, Yandex and the other IndexNow engines which URLs exist or changed (Bing also feeds ChatGPT
 * search and Copilot). The key file is public by design (public/0ffccfce72471a1deef14a4a0314b64d.txt).
 * Usage: node scripts/indexnow.mjs            -> every URL in out/sitemap.xml
 *        node scripts/indexnow.mjs /guides/ /tr/rehber/   -> only these paths */
import { readFileSync } from "node:fs";
const KEY = "0ffccfce72471a1deef14a4a0314b64d", HOST = "www.flexlore.com";
const args = process.argv.slice(2);
const urls = args.length ? args.map((p) => "https://" + HOST + p)
  : [...readFileSync(new URL("../out/sitemap.xml", import.meta.url), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const r = await fetch("https://api.indexnow.org/indexnow", { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }) });
console.log(`IndexNow: ${urls.length} URLs -> ${r.status} ${r.statusText}`);
