/* Flex AI (our panel on the ElevenLabs agent): nothing talks to ElevenLabs before the visitor sends a message or taps
 * the mic (opening the panel included), the button and panel work from the keyboard, the panel is in the page language,
 * full screen on phones, uses the site font and no blue. No conversation is started here, so no credits are used.
 * Needs a build with NEXT_PUBLIC_ELEVENLABS_AGENT_ID set. */
import { test, expect, type Page } from "@playwright/test";
const EXT = /elevenlabs\.io|livekit|unpkg\.com/;
const BTN = "#flx-ai-btn";
async function go(page: Page, lang: string, route = "/pricing/") {
  await page.addInitScript((l) => { try { localStorage.setItem("flx-lang", l); sessionStorage.setItem("flx-as-hi", "1"); } catch {} }, lang);
  await page.goto(route, { waitUntil: "networkidle" });
}

for (const [lang, w] of [["en", 1440], ["tr", 390]] as const) test(`Flex AI: opens in ${lang} @${w} without connecting, keyboard, font, no blue`, async ({ page }) => {
  const seen: string[] = []; page.on("request", (r) => { if (EXT.test(r.url())) seen.push(r.url()); });
  await page.setViewportSize({ width: w, height: 860 });
  await go(page, lang); await page.waitForTimeout(4500);
  const btn = page.locator(BTN);
  await expect(btn).toHaveAttribute("aria-label", lang === "tr" ? "Flex AI'yı açın" : "Open Flex AI");
  await btn.focus(); await page.keyboard.press("Enter");
  const dlg = page.getByRole("dialog", { name: "Flex AI" });
  await expect(dlg).toBeVisible();
  await expect(dlg.getByText(lang === "tr" ? "Yapay zekâ asistanı, hata yapabilir." : "AI assistant, may make mistakes.")).toBeVisible();
  await expect(dlg.getByLabel(lang === "tr" ? "Flex AI'ya sorun" : "Ask Flex AI")).toBeFocused();
  await page.waitForTimeout(1500);
  expect(seen).toEqual([]); // opening the panel connects to nothing
  const box = await dlg.boundingBox();
  if (w < 640) expect(box!.width).toBeGreaterThanOrEqual(w - 1); // full screen sheet on phones
  const r = await dlg.evaluate((root) => {
    const hsl = (c: string) => { const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/); if (!m || (m[4] !== undefined && +m[4] < 0.15)) return null;
      const [r, g, b] = [+m[1] / 255, +m[2] / 255, +m[3] / 255]; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn; if (!d) return null;
      const s = d / (1 - Math.abs(2 * l - 1)); let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360; return { h, s, l }; };
    const blue: string[] = []; const fonts = new Set<string>();
    for (const e of [root, ...root.querySelectorAll("*")]) {
      const cs = getComputedStyle(e); if (e.textContent?.trim() && e.children.length === 0) fonts.add(cs.fontFamily.split(",")[0]);
      for (const v of [cs.color, cs.backgroundColor, cs.borderTopColor, cs.outlineColor]) { const x = hsl(v); if (x && x.h >= 180 && x.h <= 260 && x.s > 0.25 && x.l > 0.08 && x.l < 0.95) blue.push(`${e.tagName} ${v}`); }
    }
    return { blue: [...new Set(blue)], fonts: [...fonts] };
  });
  expect(r.blue).toEqual([]);
  expect(r.fonts.every((f) => /schibsted/i.test(f))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dlg).toBeHidden();
});
