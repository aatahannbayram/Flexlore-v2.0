// Writes public/llms.txt (a plain summary for AI assistants and answer engines) from the feature list and copy.
// Runs before every build, so statuses and links never drift from the site.
import { writeFileSync, readFileSync, readdirSync, existsSync } from "node:fs";
const ROOT = new URL("..", import.meta.url).pathname;
const data = readFileSync(ROOT + "components/features/data.ts", "utf8");
const feats = [...data.matchAll(/\{ slug: "([^"]+)", icon: "[^"]+", group: "(\w+)", status: "(\w+)"/g)].map((m) => ({ slug: m[1], group: m[2], status: m[3] }));
const en = readFileSync(ROOT + "components/i18n/features/en.ts", "utf8");
const meta = (slug) => { const i = en.indexOf(`"${slug}": {`) >= 0 ? en.indexOf(`"${slug}": {`) : en.indexOf(`${slug}: {`); const m = en.slice(i).match(/meta: "([^"]+)"[\s\S]*?k: "([^"]+)"/); return m ? { meta: m[1], k: m[2] } : { meta: "", k: slug }; };
const G = { create: "Create", spread: "Roll out", manage: "Manage" };
const site = "https://www.flexlore.com";
let out = `# Flexlore

> Flexlore turns your operational know-how into video-based, step-by-step, AI-assisted employee training you can measure, for every shift and location.

Flexlore is a B2B training platform for frontline teams in restaurants and cafés, manufacturing, hotels, franchises and warehouses. A team films a job on a phone; AI drafts the steps, written instructions and a short quiz; the team reviews and approves every draft; managers see who has watched each job and passed its quiz, by person, team and location. Apps for iOS and Android; the app is available in 8 languages (English, Turkish, German, Arabic, Spanish, Russian, French, Polish). A quiz shows who understood the steps; signing someone off on the floor stays with their supervisor.

Pricing is by number of users: Free (3 users), Pro (10), ProPlus (30), Enterprise (30+). Details: ${site}/pricing/

## Features
`;
for (const g of ["create", "spread", "manage"]) {
  out += `\n### ${G[g]}\n`;
  for (const f of feats.filter((x) => x.group === g)) { const m = meta(f.slug); out += `- [${m.k}](${site}/features/${f.slug}/) (${f.status === "live" ? "available now" : "coming soon"}): ${m.meta}\n`; }
}
/* Guides and templates (content/guides): listed with their short answer; the full text goes to llms-full.txt. */
const GORDER = ["video-sop", "sop-template", "work-instruction-template", "training-matrix-template", "restaurant-onboarding-checklist", "sop-software"];
const guides = (lang) => { const d = ROOT + "content/guides/" + lang + "/"; if (!existsSync(d)) return [];
  return readdirSync(d).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(d + f, "utf8")))
    .sort((a, b) => GORDER.indexOf(lang === "en" ? a.slug : a.twin) - GORDER.indexOf(lang === "en" ? b.slug : b.twin)); };
const gUrl = (g) => g.lang === "tr" ? `${site}/tr/rehber/${g.slug}/` : `${site}/guides/${g.slug}/`;
const GEN = guides("en"), GTR = guides("tr");
out += `
## Industries
- [Restaurants](${site}/industries/restaurants/) · [Manufacturing](${site}/industries/manufacturing/) · [Hotels](${site}/industries/hotels/) · [Franchises](${site}/industries/franchises/) · [Warehouses and logistics](${site}/industries/warehouses/) · [Bakeries and cafés](${site}/industries/bakeries-cafes/)
- Use cases: [Master to apprentice skills transfer](${site}/use-cases/master-apprentice-skills-transfer/) · [Installation training and on-site orientation](${site}/use-cases/installation-training-on-site-orientation/)
`;
if (GEN.length) { out += `\n## Guides and templates (${site}/guides/)\n`; for (const g of GEN) out += `- [${g.h1}](${gUrl(g)}): ${g.answer}\n`; }
if (GTR.length) { out += `\n## Rehberler ve şablonlar, Türkçe (${site}/tr/rehber/)\n`; for (const g of GTR) out += `- [${g.h1}](${gUrl(g)}): ${g.answer}\n`; }
out += `\nFull text of the guides: ${site}/llms-full.txt\n`;
const plain = (h) => h.replace(/<\/(p|li|h3|tr)>/g, "\n").replace(/<\/t[hd]>/g, " | ").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\n{3,}/g, "\n\n").trim();
let full = `# Flexlore guides and templates (full text)\n\n> Practical guides for frontline training from Flexlore (${site}). English and Turkish.\n`;
for (const g of [...GEN, ...GTR]) {
  full += `\n\n---\n\n# ${g.h1}\nURL: ${gUrl(g)}\nLanguage: ${g.lang}\n\n${g.answer}\n`;
  for (const x of g.sections) full += `\n## ${x.h2}\n\n${plain(x.html)}\n`;
  if (g.template) full += `\n## ${g.template.title}\n\n${g.template.text}\n`;
  full += `\n## ${g.lang === "tr" ? "Sorular" : "Questions"}\n`; for (const f of g.faq) full += `\n**${f.q}**\n${f.a}\n`;
}
writeFileSync(ROOT + "public/llms-full.txt", full);
out += `
## More
- [How it works](${site}/#how)
- [Integrations](${site}/integrations/): iOS, Android today; REST API, webhooks, MCP server and BI connections on the roadmap
- [See it in your business](${site}/see-it/)
- [Blog](${site}/blog/)
- [Guides and templates](${site}/guides/) · [Türkçe rehberler](${site}/tr/rehber/)
- [About Flexlore](${site}/company/): Flexlore Inc., based in Delaware, United States
- [Support](${site}/support/)
- [FAQ](${site}/faq/): AI, devices, languages, pricing and billing
- Log in: https://app.flexlore.com (web app); the team uses the iOS and Android apps
- [Legal](${site}/legal/): terms, privacy, acceptable use, data processing, sub-processors, security, billing, cookies
- Contact: support@flexlore.com · Book a demo: https://app-eu1.hubspot.com/meetings/alper-kalip
`;
writeFileSync(ROOT + "public/llms.txt", out);
console.log(`llms.txt: ${feats.length} features, ${GEN.length + GTR.length} guides`);
