/* Brand rule: no blue. Lists every visible element whose computed colour, background or border is a saturated hue
 * in 180-260°. Official store badges and real-colour round language flags are the approved exceptions. */
import { test, expect } from "@playwright/test";
const ROUTES = ["/", "/pricing/", "/industries/restaurants/", "/features/", "/integrations/", "/customers/eat-well-drink-joy/", "/company/", "/support/"];
for (const route of ROUTES) for (const w of [390, 1440]) test(`no blue ${route} @${w}`, async ({ page }) => {
  await page.setViewportSize({ width: w, height: 900 }); await page.goto(route, { waitUntil: "networkidle" });
  const hits = await page.evaluate(() => {
    const hsl = (c: string) => { const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/); if (!m) return null; if (m[4] !== undefined && +m[4] < 0.15) return null;
      const [r, g, b] = [+m[1] / 255, +m[2] / 255, +m[3] / 255]; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn; if (d === 0) return null;
      const s = d / (1 - Math.abs(2 * l - 1)); let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360; return { h, s, l }; };
    const out: string[] = [];
    for (const el of document.querySelectorAll("body *")) {
      if (el.closest('[data-allow-color], a[href*="apps.apple.com"], a[href*="play.google.com"], .fi, [class*="flag"]')) continue;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
      const cs = getComputedStyle(el);
      for (const [k, v] of [["color", cs.color], ["background", cs.backgroundColor], ["border", cs.borderTopColor]] as const) {
        const x = hsl(v); if (x && x.h >= 180 && x.h <= 260 && x.s > 0.25 && x.l > 0.08 && x.l < 0.95 && (k !== "border" || parseFloat(cs.borderTopWidth) > 0)) out.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} ${k} ${v}`);
      }
    }
    return [...new Set(out)].slice(0, 20);
  });
  expect(hits).toEqual([]);
});
