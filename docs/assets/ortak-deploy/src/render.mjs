// render.mjs: bu klasördeki HTML kaynaklardan dokümanın PNG görsellerini ve akış videosunu üretir.
// Kullanım (repo kökünden): node docs/assets/ortak-deploy/src/render.mjs
// Gerekenler: Node 22+ (yerleşik WebSocket), Google Chrome, ffmpeg. Chrome yolu farklıysa: CHROME=/yol node ...
import { spawn, execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SRC = dirname(fileURLToPath(import.meta.url));
const OUT = join(SRC, "..");
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const STILLS = [
  ["kapak", 1600, 560],
  ["mimari", 1600, 900],
  ["publish-akisi", 1600, 900],
  ["katmanlar", 1600, 860],
  ["dogrulama", 1600, 760],
];

const profile = mkdtempSync(join(tmpdir(), "flexlore-render-"));
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });

async function waitForChrome() {
  for (let i = 0; i < 50; i++) {
    try {
      return await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
    } catch {
      await new Promise(r => setTimeout(r, 200));
    }
  }
  throw new Error("Chrome açılmadı");
}

// Chrome DevTools Protocol için küçük bir istemci: send(method, params) ve once(event).
function connect(url) {
  const ws = new WebSocket(url);
  let seq = 0;
  const pending = new Map();
  const listeners = [];
  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else listeners.forEach(fn => fn(msg));
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++seq;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const once = method =>
    new Promise(resolve => {
      const fn = m => {
        if (m.method !== method) return;
        listeners.splice(listeners.indexOf(fn), 1);
        resolve(m.params);
      };
      listeners.push(fn);
    });
  return new Promise(resolve => (ws.onopen = () => resolve({ send, once, close: () => ws.close() })));
}

async function openPage(name, width, height, scale) {
  const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json();
  const page = await connect(target.webSocketDebuggerUrl);
  await page.send("Page.enable");
  await page.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile: false });
  const loaded = page.once("Page.loadEventFired");
  await page.send("Page.navigate", { url: pathToFileURL(join(SRC, `${name}.html`)).href });
  await loaded;
  await page.send("Runtime.evaluate", { expression: "Promise.resolve(window.ready || document.fonts.ready).then(() => true)", awaitPromise: true });
  return page;
}

async function shot(page, file) {
  const { data } = await page.send("Page.captureScreenshot", { format: "png" });
  writeFileSync(file, Buffer.from(data, "base64"));
}

try {
  await waitForChrome();
  for (const [name, w, h] of STILLS) {
    const page = await openPage(name, w, h, 2);
    await shot(page, join(OUT, `${name}.png`));
    page.close();
    console.log(`${name}.png`);
  }

  // Akış videosu: mimari.html içindeki frame(t) ile 15,5 sn, 30 kare/sn
  const frames = mkdtempSync(join(tmpdir(), "flexlore-frames-"));
  const page = await openPage("mimari", 1600, 900, 1);
  const fps = 30;
  for (let i = 0; i < fps * 15.5; i++) {
    await page.send("Runtime.evaluate", { expression: `frame(${(i / fps).toFixed(4)})` });
    await shot(page, join(frames, `f${String(i).padStart(4, "0")}.png`));
  }
  page.close();
  const input = ["-framerate", String(fps), "-i", join(frames, "f%04d.png")];
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...input, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", join(OUT, "deploy-akisi.mp4")]);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...input, "-vf", "fps=12,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer:bayer_scale=4", join(OUT, "deploy-akisi.gif")]);
  rmSync(frames, { recursive: true, force: true });
  console.log("deploy-akisi.mp4, deploy-akisi.gif");
} finally {
  chrome.kill();
  rmSync(profile, { recursive: true, force: true });
}
