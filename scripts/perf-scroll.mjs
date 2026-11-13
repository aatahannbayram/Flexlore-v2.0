// Local scroll-smoothness probe (not part of the build): scrolls each page with the mouse wheel in Chrome and reports
// frame timing. Usage: node scripts/perf-scroll.mjs [baseUrl]   (serve out/ first)
import { chromium } from "@playwright/test";
const base = process.argv[2] || "http://localhost:4322";
const routes = ["/", "/pricing/", "/industries/restaurants/", "/features/video-to-sop/", "/company/", "/support/"];
const b = await chromium.launch({ channel: "chrome", args: ["--enable-gpu-rasterization", "--ignore-gpu-blocklist"] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
for (const r of routes) {
  const p = await ctx.newPage();
  await p.addInitScript(() => { try { sessionStorage.setItem("flx-as-hi", "1"); } catch {} });
  await p.goto(base + r, { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  await p.evaluate(() => { const w = window; w.__f = []; let last = performance.now(); const loop = (t) => { w.__f.push(t - last); last = t; if (w.__on) requestAnimationFrame(loop); }; w.__on = true; requestAnimationFrame(loop);
    w.__lt = 0; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) w.__lt += e.duration; }).observe({ type: "longtask", buffered: false }); } catch {} });
  await p.mouse.move(700, 450);
  for (let i = 0; i < 60; i++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(16); }
  await p.waitForTimeout(800);
  const s = await p.evaluate(() => { window.__on = false; const f = window.__f.slice(3).sort((a, b) => a - b); const n = f.length; const pct = (q) => f[Math.min(n - 1, Math.floor(n * q))];
    return { frames: n, p50: +pct(0.5).toFixed(1), p95: +pct(0.95).toFixed(1), janky: f.filter((x) => x > 33).length, longTaskMs: Math.round(window.__lt) }; });
  console.log(r.padEnd(26), JSON.stringify(s));
  await p.close();
}
await b.close();
