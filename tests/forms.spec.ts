import { test, expect } from "@playwright/test";
/* Real typing into every site form, key by key. Filling values from code missed a bug where each keystroke remounted the
 * input and only the first letter stayed (pricing request form, 2026-11-17). Nothing is submitted here. */
const pages = ["/pricing/", "/tr/pricing/", "/support/", "/tr/support/"];
for (const p of pages) {
  for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    test(`${p} form keeps focus while typing @${vp.width}`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.addInitScript(() => { try { localStorage.setItem("flx-consent", JSON.stringify({ v: 1, analytics: false, at: Date.now() })); } catch {} });
      await page.goto(p);
      const fields = page.locator("form input:not([type=hidden]):not([type=checkbox]):not([type=number]):not([tabindex='-1']), form textarea");
      const n = await fields.count();
      expect(n).toBeGreaterThan(1);
      for (let i = 0; i < n; i++) {
        const f = fields.nth(i);
        if (!(await f.isVisible()) || (await f.getAttribute("aria-hidden")) === "true") continue;
        const type = await f.getAttribute("type");
        const text = type === "email" ? "ada.lovelace@example.com" : "Ada Lovelace";
        await f.click();
        await page.keyboard.type(text, { delay: 15 });
        await expect(f).toHaveValue(text);
      }
    });
  }
}
