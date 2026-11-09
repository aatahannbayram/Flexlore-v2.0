// Prints WCAG contrast for every text/background token pair used on the site and fails under the threshold.
// Values mirror app/globals.css @theme. Alpha colours are composited over their ground first.
const T = {
  bg: "#111111", "surface-1": "#191919", "surface-2": "#1F1F1F",
  ink: "#F4F0EB", "ink-muted": "#BAB3AB", "ink-faint": "#8E8780",
  accent: "#EC6726", "accent-strong": "#D75E23", "accent-text": "#F08551", "on-accent": "#FFFFFF", "accent-deep": "#C04E19", "accent-mid": "#D45A1F",
  "calm-aqua": "#68D2B9", "calm-lilac": "#B4A7E5",
  "ice-100": "#EAE5DF", "ice-300": "#BAB3AB", "ice-400": "#968F87", "ice-500": "#8E8780",
  "v3-bg": "#FAF8F5", "v3-band": "#F1EDE7", "v3-ink": "#161616", "v3-muted": "#55524D", "v3-faint": "#6E6A64", "v3-ice-400": "#5E5A55", "v3-aqua": "#3B7C6D", "v3-orange-text": "#A8491B",
  "light-bg": "#F4F6F6", "light-surface": "#E7EBEB", white: "#FFFFFF", "light-ink": "#333333", "light-muted": "#666666", "light-accent-text": "#A8491B",
};
const lum = (hex) => { const c = hex.replace("#", "").match(/../g).map((x) => parseInt(x, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// [text, ground, minimum, note]. Not listed on purpose: ice-500 is never used as text on light grounds (4.42:1).
const PAIRS = [
  ["ink", "bg", 4.5], ["ink", "surface-1", 4.5], ["ink", "surface-2", 4.5],
  ["ink-muted", "bg", 4.5], ["ink-muted", "surface-1", 4.5], ["ink-muted", "surface-2", 4.5],
  ["ink-faint", "bg", 4.5], ["ink-faint", "surface-1", 4.5], ["ink-faint", "surface-2", 4.5, "captions only"],
  ["accent-text", "bg", 4.5], ["accent-text", "surface-1", 4.5], ["accent-text", "surface-2", 4.5],
  ["accent", "bg", 3, "display text 24px+"], ["on-accent", "accent-deep", 4.5, "button label, gradient bottom stop"], ["on-accent", "accent-mid", 3, "button label, gradient middle (bold 16px+)"],
  ["calm-aqua", "surface-1", 4.5, "status chip"], ["calm-lilac", "surface-1", 4.5, "status chip"],
  ["ice-300", "bg", 4.5, "labels"], ["ice-500", "bg", 4.5, "small captions"], ["ice-500", "surface-1", 4.5], ["ice-400", "bg", 4.5, "eyebrow, muted headline"], ["ice-400", "surface-1", 4.5], ["bg", "ice-100", 4.5, "primary button"], ["ice-100", "bg", 4.5, "inverted card text"],
  ["light-ink", "white", 4.5, "card on light"], ["light-muted", "white", 4.5],
  ["light-ink", "light-bg", 4.5], ["light-ink", "light-surface", 4.5], ["light-muted", "light-bg", 4.5], ["light-muted", "light-surface", 4.5],
  ["v3-ink", "v3-bg", 4.5, "v3 light page"], ["v3-muted", "v3-bg", 4.5], ["v3-faint", "v3-bg", 4.5], ["v3-ice-400", "v3-bg", 4.5],
  ["v3-ink", "v3-band", 4.5], ["v3-muted", "v3-band", 4.5], ["v3-faint", "v3-band", 4.5], ["v3-faint", "white", 4.5], ["v3-aqua", "white", 4.5],
  ["v3-orange-text", "v3-bg", 4.5], ["accent", "v3-bg", 3, "display payoff 40px+"], ["v3-bg", "v3-ink", 4.5, "dark button on light"],
  ["light-accent-text", "light-bg", 4.5], ["light-accent-text", "light-surface", 4.5], ["bg", "light-surface", 4.5, "dark button on light"],
];
let fail = 0;
console.log("contrast: text / ground  ratio  (min)");
for (const [a, b, min, note] of PAIRS) {
  const r = ratio(T[a], T[b]); const ok = r >= min; if (!ok) fail++;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${a.padEnd(18)} on ${b.padEnd(14)} ${r.toFixed(2).padStart(5)}:1  (${min})${note ? "  " + note : ""}`);
}
if (fail) { console.error(`contrast: ${fail} pair(s) below threshold`); process.exit(1); }
console.log("contrast: OK");
