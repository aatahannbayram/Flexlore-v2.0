/* Every route at every width: no sideways scroll, logo in the header, no text under 12 px, no tap target under
 * 44×44 px, no console errors. Product mockups (role="img") and aria-hidden art are excluded: their text is sample UI.
 * Inline links inside running text are excluded from the target check (WCAG 2.5.8 inline exception). */
import { test, expect, type Page } from "@playwright/test";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = join(__dirname, "..", "out");
function routes(dir = OUT, base = "/"): string[] {
  const r: string[] = [];
  if (existsSync(join(dir, "index.html"))) r.push(base);
  for (const f of readdirSync(dir)) {
    const p = join(dir, f); if (!statSync(p).isDirectory() || f.startsWith("_") || ["media", "photos", "blog-img", "video", "brand"].includes(f)) continue;
    r.push(...routes(p, `${base}${f}/`));
  }
  return r;
}
const all = routes();
const blog = all.filter((r) => r.startsWith("/blog/") && r !== "/blog/");
const ROUTES = [...all.filter((r) => !blog.includes(r)), ...blog.slice(0, 2), "/404.html"];
const SIZES: [number, number][] = [[320, 640], [360, 740], [390, 844], [430, 932], [768, 1024], [1024, 768], [1280, 800], [1440, 900], [844, 390]];

async function audit(page: Page) {
  return page.evaluate(() => {
    const vis = (e: Element) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
    const skip = (e: Element) => !!e.closest('[role="img"], [aria-hidden="true"], .sr-only, [hidden]');
    const overflow = document.documentElement.scrollWidth - innerWidth;
    const logo = document.querySelector('header img[alt="Flexlore"], header a[aria-label*="Flexlore"]');
    const logoOk = !!logo && [...document.querySelectorAll('header img[alt="Flexlore"]')].some(vis);
    const small: string[] = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) {
      const el = n.parentElement; if (!el || !n.textContent?.trim() || skip(el) || !vis(el)) continue;
      const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 12) small.push(`${fs}px "${n.textContent.trim().slice(0, 30)}"`);
    }
    const targets: string[] = [];
    for (const el of document.querySelectorAll("a[href], button, [role=tab], summary")) {
      if (skip(el) || !vis(el)) continue;
      const s = getComputedStyle(el); if (s.display === "inline" && el.closest("p, li p, dd, td")) continue;
      const r = el.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) targets.push(`${Math.round(r.width)}x${Math.round(r.height)} "${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 30)}"`);
    }
    return { overflow, logoOk, small: [...new Set(small)].slice(0, 10), targets: [...new Set(targets)].slice(0, 10) };
  });
}

for (const route of ROUTES) {
  test.describe(route, () => {
    for (const [w, h] of SIZES) {
      test(`${w}x${h}`, async ({ page }) => {
        const errors: string[] = []; page.on("pageerror", (e) => errors.push(String(e))); page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
        await page.setViewportSize({ width: w, height: h });
        await page.goto(route, { waitUntil: "networkidle" });
        const r = await audit(page);
        test.info().annotations.push({ type: "audit", description: JSON.stringify(r) });
        expect.soft(r.overflow, "horizontal overflow (px)").toBeLessThanOrEqual(1);
        expect.soft(r.logoOk, "logo visible in header").toBe(true);
        expect.soft(r.small, "text under 12 px").toEqual([]);
        expect.soft(r.targets, "targets under 44x44").toEqual([]);
        expect.soft(errors, "console errors").toEqual([]);
      });
    }
  });
}

test("mobile menu: opens, locks scroll, traps focus, closes on Escape and on navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/", { waitUntil: "networkidle" });
  await page.click('button[aria-controls="menu"]');
  await expect(page.locator("#menu")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("hidden");
  for (let i = 0; i < 30; i++) await page.keyboard.press("Tab");
  expect(await page.evaluate(() => !!document.getElementById("menu")?.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape"); await expect(page.locator("#menu")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
  await page.click('button[aria-controls="menu"]'); await page.locator('#menu a[href="/pricing/"]:visible').first().click();
  await page.waitForURL("**/pricing/"); await expect(page.locator("#menu")).toHaveCount(0);
});
