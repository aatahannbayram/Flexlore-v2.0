// Builds the assistant's knowledge base from the site's own content, so the answers never drift from the pages.
// Sources: the home dictionaries (how it works, FAQ, industries), the feature dictionaries, the pricing plans and FAQ
// (components/config.ts), the sector pages and the support contact. Nothing is written by hand here: every entry is
// copied from a source file. Runs before every build (package.json prebuild).
// Output: public/knowledge/<locale>.json, one small file per language, loaded by the site assistant on demand, and
// server/assistant/knowledge.json (all locales) for the Claude-backed handler.
import { createJiti } from "jiti";
import { mkdirSync, writeFileSync } from "node:fs";
const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const j = createJiti(ROOT + "/", { alias: { "@": ROOT } });
const load = (f) => j.import(`${ROOT}/${f}`);

const LOCALES = ["en", "tr", "de", "ar", "es", "pt", "nl", "fr", "pl"];
const { SITE, PLANS, PRICING_FAQ, PRICING_FAQ_TR, ENTERPRISE_TIERS } = await load("components/config.ts");
const { FEATURES } = await load("components/features/data.ts");
const { sectors } = await load("components/sectors.ts");
const { HOME2 } = await load("components/i18n/home2.ts");
const HOME = {}, FEAT = {};
for (const l of LOCALES) {
  HOME[l] = (await load(`components/i18n/home/${l}.ts`))[l];
  const fm = await load(`components/i18n/features/${l}.ts`); FEAT[l] = fm[`f${l}`];
}
const u = (p) => SITE.url + p;
const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const all = [];
const add = (locale, id, title, body, url, tags) => { if (!clean(title) || !clean(body)) return; all.push({ id: `${locale}:${id}`, locale, title: clean(title), body: clean(body), url, tags }); };

for (const l of LOCALES) {
  const d = HOME[l]; const h2 = HOME2[l]; const f = FEAT[l];
  // How it works: the five steps told to the owner, plus the four-step summary and its note.
  if (h2?.steps) add(l, "how", d.process?.k ?? "How it works", h2.steps.map(([t, p], i) => `${i + 1}. ${t}: ${p}`).join(" ") + (d.process?.note ? ` ${d.process.note}` : ""), u("/#how"), ["how", "steps", "video", "quiz", "ai"]);
  // Why Flexlore.
  if (h2?.why) add(l, "why", `${h2.why.k}: ${h2.why.h} ${h2.why.h2}`, `${h2.why.lead} ${h2.why.cards.map(([t, p]) => `${t}: ${p}`).join(" ")}`, u("/#why"), ["why", "knowhow", "video", "field"]);
  // Industries with their one-line use and three typical jobs.
  if (h2?.tabs && d.ind?.cards) d.ind.cards.forEach((name, i) => { const t = h2.tabs[i]; if (t) add(l, `industry-${i}`, name, `${t[0]} ${t[1].join(". ")}.`, u(["/sektor/restoran/", "/sektor/uretim/", "/sektor/otel/", "/sektor/franchise/"][i]), ["industry", "sector"]); });
  if (d.ind?.areas) add(l, "industries-more", d.ind.also, `${d.ind.areas.join(", ")}. ${d.ind.langs}`, u("/#industries"), ["industry", "languages"]);
  // Home FAQ.
  (d.faq?.items ?? []).forEach(([q, a], i) => add(l, `faq-${i}`, q, a, u("/#faq"), ["faq"]));
  // Features: one entry each, with the feature's own FAQ folded in.
  for (const ft of FEATURES) {
    const it = f?.items?.[ft.slug]; if (!it) continue;
    const faq = (it.faq ?? []).map(([q, a]) => `${q} ${a}`).join(" ");
    add(l, `feature-${ft.slug}`, `${it.k}${ft.status === "soon" ? ` (${f.common?.soon ?? "soon"})` : ""}`, `${it.meta} ${(it.steps ?? []).map(([t, p]) => `${t}: ${p}`).join(" ")} ${faq}`, u(`/features/${ft.slug}/`), ["feature", ft.group, ft.status]);
  }
  // Web panel.
  if (h2?.web) add(l, "web", `${h2.web.k}: ${h2.web.h} ${h2.web.h2}`, `${h2.web.p} ${h2.web.points.join(". ")}. ${h2.web.soon}`, u("/features/web-panel/"), ["web", "panel", "desk"]);
  // Support contact and demo.
  add(l, "contact", d.faq?.more ?? "Contact", `${d.faq?.moreP ?? ""} ${d.faq?.email ?? ""} support@flexlore.com. ${d.nav?.cta ?? "Book a demo"}: ${SITE.demo}`, u("/support/"), ["contact", "support", "demo"]);
}

// Pricing: plans and their points are kept in English in the source; the TR pricing FAQ exists, other languages fall back.
const plans = PLANS.map((p) => `${p.name}: ${p.for} ${p.monthly?.now ? `Monthly ${p.monthly.now}, yearly ${p.yearly.now} per month.` : ""} ${p.points.join(", ")}.`).join(" ");
add("en", "pricing-plans", "Plans and prices", `${plans} Enterprise tiers: ${(ENTERPRISE_TIERS ?? []).map((t) => `${t.name} (${t.users} users, ${t.price ?? "custom price"}): ${t.points.join(", ")}`).join("; ")}.`, u("/pricing/"), ["pricing", "plans", "price"]);
PRICING_FAQ.forEach(({ q, a }, i) => add("en", `pricing-faq-${i}`, q, a, u("/pricing/"), ["pricing", "faq"]));
PRICING_FAQ_TR.forEach(({ q, a }, i) => add("tr", `pricing-faq-${i}`, q, a, u("/pricing/"), ["pricing", "faq"]));

// Sector pages: the long copy exists in English only; the Turkish name is kept as a tag so Turkish questions still match.
for (const s of sectors) {
  const sops = (s.sops ?? []).map((x) => `${x.t}: ${(x.steps ?? []).join(", ")}`).join(". ");
  add("en", `sector-${s.slug}`, s.en, `${s.h} ${s.lede} ${s.problem?.h ?? ""} ${sops}. ${s.ready ?? ""}`, u(`/sektor/${s.slug}/`), ["industry", "sector", s.slug, s.tr]);
}

// Data and KVKK for customers in Türkiye (components/trust): the page text in Turkish and English, with the rules the
// assistant follows on this topic. Indexed by the assistant even while the page itself is noindex.
const { TURKIYE_TEXT, TURKIYE_TITLE } = await load("components/trust/turkiye-copy.ts");
const { TRUST_TR_PATH } = await load("components/trust/config.ts");
const TRUST_RULES = {
  tr: "Asistan için kurallar: \"KVKK uyumluyuz\", \"GDPR uyumlu\" veya \"verileriniz Türkiye'de\" denmez; şifreleme, ISO, SOC 2, sızma testi veya yedek süresi iddiası yapılmaz. Belge (Veri İşleme Sözleşmesi, standart sözleşme ekleri, çalışan bilgilendirme metni) isteyene metin verilmez; sayfadaki \"Belgeleri talep edin\" butonu gösterilir (" + SITE.url + TRUST_TR_PATH.tr + "#belgeler). Hukuki sorularda: \"Bu hukuki görüş değildir, ekibimiz yardımcı olur.\"",
  en: "Rules for the assistant: never say Flexlore is \"KVKK compliant\" or \"GDPR compliant\" or that data is kept in Türkiye; make no claims about encryption, ISO, SOC 2, penetration tests or backup periods. When someone asks for the documents (Data Processing Agreement, standard contract annexes, employee notice template), do not provide text; point to the \"Request the documents\" button on the page (" + SITE.url + TRUST_TR_PATH.en + "#belgeler). For legal questions: \"This is not legal advice; our team can help.\"",
};
for (const k of ["tr", "en"]) add(k, "trust-turkiye", TURKIYE_TITLE[k], `${TURKIYE_TEXT(k)} ${TRUST_RULES[k]}`, u(TRUST_TR_PATH[k]), ["kvkk", "data", "privacy", "gdpr", "turkey", "türkiye", "legal", "dpa", "subprocessors", "consent", "transfer"]);

const byLocale = Object.fromEntries(LOCALES.map((l) => [l, all.filter((e) => e.locale === l)]));
mkdirSync(`${ROOT}/public/knowledge`, { recursive: true });
for (const l of LOCALES) writeFileSync(`${ROOT}/public/knowledge/${l}.json`, JSON.stringify({ v: 1, locale: l, entries: byLocale[l] }));
mkdirSync(`${ROOT}/server/assistant`, { recursive: true });
writeFileSync(`${ROOT}/server/assistant/knowledge.json`, JSON.stringify({ v: 1, site: SITE.url, demo: SITE.demo, support: "support@flexlore.com", entries: all }, null, 1));
console.log(`knowledge: ${all.length} entries (${LOCALES.map((l) => `${l} ${byLocale[l].length}`).join(", ")})`);
