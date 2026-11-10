/* Site assistant (ElevenLabs widget): nothing loads before a click, the button works from the keyboard, the widget opens
 * in the page language with the site font and no blue. The "live" test loads the real widget (network, no conversation,
 * no credits); set NO_NET=1 to skip it. Needs a build with NEXT_PUBLIC_ELEVENLABS_AGENT_ID set. */
import { test, expect, type Page } from "@playwright/test";
const EXT = /unpkg\.com|elevenlabs\.io/;
const BTN = 'button[aria-label*="assist" i], button[aria-label*="asistan" i]';
async function go(page: Page, lang: string, route = "/pricing/") {
  await page.addInitScript((l) => { try { localStorage.setItem("flx-lang", l); sessionStorage.setItem("flx-as-hi", "1"); } catch {} }, lang);
  await page.goto(route, { waitUntil: "networkidle" });
}

test("assistant: no ElevenLabs request before a click, then the pinned script", async ({ page }) => {
  const seen: string[] = []; page.on("request", (r) => { if (EXT.test(r.url())) seen.push(r.url()); });
  await page.route(EXT, (r) => r.abort());
  await go(page, "en"); await page.waitForTimeout(5000);
  expect(seen).toEqual([]);
  const btn = page.locator(BTN).first();
  await expect(btn).toHaveAttribute("aria-label", "Open the Flexlore AI assistant");
  await btn.focus(); await page.keyboard.press("Enter");
  await expect(page.getByText("The assistant could not open")).toBeVisible({ timeout: 10_000 }); // script blocked: a clear message, no crash
  expect(seen[0]).toContain("@elevenlabs/convai-widget-embed@0.22.2/");
  expect(await page.locator("elevenlabs-convai").count()).toBe(0);
});

for (const [lang, w] of [["tr", 390], ["en", 1440]] as const) test(`assistant live: opens in ${lang} @${w}, site font, no blue`, async ({ page }) => {
  test.skip(!!process.env.NO_NET, "network disabled");
  await page.setViewportSize({ width: w, height: 900 });
  await go(page, lang);
  await page.locator(BTN).first().click();
  const el = page.locator("elevenlabs-convai");
  await expect(el).toHaveAttribute("override-language", lang === "tr" ? "tr" : "en", { timeout: 20_000 });
  await page.waitForTimeout(4000);
  await expect(page.locator(BTN)).toHaveCount(0); // our button steps aside for the widget's own launcher
  const r = await page.evaluate(() => {
    const sr = document.querySelector("elevenlabs-convai")!.shadowRoot!;
    const hsl = (c: string) => { const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/); if (!m || (m[4] !== undefined && +m[4] < 0.15)) return null;
      const [r, g, b] = [+m[1] / 255, +m[2] / 255, +m[3] / 255]; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn; if (!d) return null;
      const s = d / (1 - Math.abs(2 * l - 1)); let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360; return { h, s, l }; };
    const blue: string[] = []; const fonts = new Set<string>();
    for (const e of sr.querySelectorAll("*")) {
      const b = e.getBoundingClientRect(); if (!b.width || !b.height) continue;
      const cs = getComputedStyle(e); if (e.textContent?.trim()) fonts.add(cs.fontFamily.split(",")[0]);
      for (const v of [cs.color, cs.backgroundColor, cs.borderTopColor, cs.outlineColor]) { const x = hsl(v); if (x && x.h >= 180 && x.h <= 260 && x.s > 0.25 && x.l > 0.08 && x.l < 0.95) blue.push(`${e.tagName} ${v}`); }
    }
    return { blue: [...new Set(blue)].slice(0, 10), fonts: [...fonts] };
  });
  expect(r.blue).toEqual([]);
  expect(r.fonts.every((f) => /schibsted/i.test(f))).toBe(true);
});
