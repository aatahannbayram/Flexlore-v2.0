import { defineConfig } from "@playwright/test";
/* Responsive checks against the static export. Serve out/ first (any static server), then:
 *   BASE_URL=http://localhost:4322 npx playwright test
 * Uses the installed Chrome, so no browser download is needed. */
export default defineConfig({
  testDir: "tests", timeout: 60_000, workers: 8, reporter: [["line"], ["json", { outputFile: "test-results/responsive.json" }]],
  use: { baseURL: process.env.BASE_URL ?? "http://localhost:4322", channel: "chrome", timezoneId: "Europe/Istanbul", locale: "tr-TR" },
});
