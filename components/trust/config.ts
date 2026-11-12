/* Türkiye data and KVKK page: the two switches and the visitor check that decides where the page is surfaced.
 *
 * TRUST_TR.surface  shows the footer link, the pricing and support notes and the FAQ item to visitors counted as in
 *                   Türkiye. false hides all of them everywhere; the page itself still opens from a direct link.
 * TRUST_TR.approved false until counsel has approved the page: noindex and left out of the sitemap. true lifts both.
 *
 * A visitor counts as in Türkiye only by location: the browser time zone is Europe/Istanbul. The site language does not
 * count (a Turkish speaker abroad sees nothing); it only picks the Turkish or the English page.
 * The check runs only in the browser, after the first render (no hydration mismatch). Nothing is sent anywhere, no
 * cookie or storage is written and no location or IP service is called. */

export const TRUST_TR = { surface: true, approved: false, updated: { tr: "12 Kasım 2026", en: "12 November 2026", iso: "2026-11-12" } };
export const TRUST_TR_PATH = { tr: "/trust/turkiye/", en: "/trust/turkey/" } as const;

/** Footer link label (Turkish for Turkish, English for every other language). Longer copy lives in ./labels.ts. */
export const TRUST_TR_FOOTER = { tr: "Türkiye: Veri ve KVKK", en: "Türkiye: Data and KVKK" };
