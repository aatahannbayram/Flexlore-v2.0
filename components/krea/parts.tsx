"use client";
/* Krea-language building blocks (2026-11-15), shared by the real pages: warm app-style icons, the curved "drum"
 * carousel with a before/after card, and the floating bottom pill nav. All copy comes in through props (every locale). */
import { useEffect, useRef, useState } from "react";
import { FICON } from "../features/ficons";
import { ArrowRight } from "../ui/icons";

/* Flat (2D) squircle icons, site-wide since 2026-11-15: one solid warm colour, no gradient, highlight or shadow; never
 * blue or purple. Light tones get a dark glyph, the rest a white one. */
const FLAT = ["bg-[#EC6726]", "bg-[#F2A33A]", "bg-[#E2604F]", "bg-[#A9C26A]", "bg-[#EFE9DF]", "bg-[#2E2B28]"];
const TONE: Record<string, number> = { "video-to-sop": 0, "pdf-to-steps": 4, "video-editor": 5, "screen-recording": 1, "ai-quiz": 2, "auto-translation": 3, "qr-codes": 5, notifications: 1, "permissions-workspaces": 4, "web-panel": 0, "ai-agents-mcp": 2 };
type Ico = (p: { size?: number; className?: string }) => React.ReactElement;
function Flat({ Icon, tone, size }: { Icon?: Ico; tone: number; size: number }) {
  const t = ((tone % FLAT.length) + FLAT.length) % FLAT.length; const light = t === 1 || t === 3 || t === 4;
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-[30%] ${FLAT[t]} ${t === 5 ? "ring-1 ring-inset ring-white/10" : ""}`} style={{ width: size, height: size }}>
      <span className={light ? "text-[#1a1a1a]" : "text-white"}>{Icon ? <Icon size={Math.round(size * 0.44)} /> : null}</span>
    </span>);
}
export function AppIcon({ slug, icon, size = 44 }: { slug: string; icon: string; size?: number }) {
  return <Flat Icon={FICON[icon] as Ico | undefined} tone={TONE[slug] ?? 0} size={size} />;
}
/* `flat` is kept for older call sites; every icon is flat now. */
export function GlyphIcon({ Icon, tone = 0, size = 40 }: { Icon: Ico; tone?: number; size?: number; flat?: boolean }) {
  return <Flat Icon={Icon} tone={tone} size={size} />;
}

const pic = (n: string) => ({ src: `/photos/${n}-1600.webp`, srcSet: `/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w` });

/* Before / after on the centre card, both sides built from the same job photo: on the left the scene faded and grey with
 * a paper instruction sheet pinned over it (dense, static); on the right the scene in colour with the Flexlore step player
 * over it (short video steps, ticks, progress). A round handle drags the split. Text on the sheets is placeholder bars,
 * only the job name is real, so nothing here claims steps that are not on the site. */
function Compare({ img, name, beforeLabel, label }: { img: string; name: string; beforeLabel: string; label: string }) {
  const [x, setX] = useState(50); const box = useRef<HTMLDivElement>(null); const drag = useRef(false);
  const at = (cx: number) => { const r = box.current!.getBoundingClientRect(); const v = ((cx - r.left) / r.width) * 100; setX(Math.max(6, Math.min(94, getComputedStyle(box.current!).direction === "rtl" ? 100 - v : v))); };
  const bar = (w: string, k: number) => <span key={k} className="block h-[6px] rounded-full bg-[#2a2622]/22" style={{ width: w }} />;
  return (
    <div ref={box} dir="ltr" className="absolute inset-0 touch-pan-y select-none" onPointerDown={(e) => { drag.current = true; (e.target as Element).setPointerCapture?.(e.pointerId); at(e.clientX); }}
      onPointerMove={(e) => drag.current && at(e.clientX)} onPointerUp={() => { drag.current = false; }} onPointerCancel={() => { drag.current = false; }}>
      {/* After: the Flexlore step player over the scene in colour: a short clip of the job on top, step progress, then
          the steps (two done, one playing, one next). Bars stand in for step text. */}
      <div aria-hidden="true" className="absolute right-[7%] top-1/2 w-[min(40%,284px)] -translate-y-1/2 overflow-hidden rounded-[18px] bg-[rgb(22_22_22/0.8)] text-white ring-1 ring-white/[.12] backdrop-blur-xl max-md:hidden">
        <div className="relative h-[92px] overflow-hidden">
          <img src={`/photos/${img}-800.webp`} alt="" loading="lazy" className="h-full w-full object-cover" />
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(22_22_22/0)_25%,rgb(22_22_22/0.9)_100%)]" />
          <span className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/95 text-[#111]"><svg width="9" height="10" viewBox="0 0 10 12"><path d="M1 1l8 5-8 5z" fill="currentColor" /></svg></span>
          <span className="absolute inset-x-3 bottom-2.5 block truncate text-[13.5px] font-semibold tracking-[-0.01em]">{name}</span>
        </div>
        <div className="flex gap-1 px-3 pt-2">{[0, 1, 2, 3].map((k) => <span key={k} className={`h-[3px] flex-1 rounded-full ${k < 2 ? "bg-[#EC6726]" : k === 2 ? "bg-[linear-gradient(90deg,#EC6726_45%,rgb(255_255_255/0.16)_45%)]" : "bg-white/[.16]"}`} />)}</div>
        <ol className="space-y-1 p-2">{[0, 1, 2, 3].map((k) => <li key={k} className={`flex items-center gap-2.5 rounded-[11px] px-2 py-[7px] ${k === 2 ? "bg-white/[.09] ring-1 ring-inset ring-white/10" : ""}`}>
          <span className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-[10px] font-semibold ${k < 2 ? "bg-[#EC6726] text-white" : k === 2 ? "bg-white text-[#111]" : "text-white/55 ring-1 ring-inset ring-white/25"}`}>
            {k < 2 ? <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4l1.7 1.7L6.5 2.3" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg> : k === 2 ? <svg width="6" height="7" viewBox="0 0 10 12"><path d="M1 1l8 5-8 5z" fill="currentColor" /></svg> : k + 1}</span>
          <span className="min-w-0 flex-1 space-y-[5px]"><span className={`block h-[5px] rounded-full ${k === 3 ? "bg-white/25" : "bg-white/50"}`} style={{ width: ["72%", "86%", "64%", "78%"][k] }} /><span className="block h-[4px] w-[34%] rounded-full bg-white/[.16]" /></span>
        </li>)}</ol>
      </div>
      {/* Before: the same scene faded with a paper sheet, revealed up to the handle. */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
        <img src={`/photos/${img}-1600.webp`} srcSet={`/photos/${img}-800.webp 800w, /photos/${img}-1600.webp 1600w`} sizes="60vw" alt="" loading="lazy" className="drum-img grayscale-[1] brightness-[0.62] contrast-[0.9]" />
        <div aria-hidden="true" className="absolute left-[8%] top-1/2 w-[min(36%,260px)] -translate-y-1/2 -rotate-[2.5deg] rounded-[4px] bg-[#EFE9DF] px-4 pb-4 pt-5 shadow-[0_24px_50px_-18px_rgb(0_0_0/0.8)] max-md:left-[6%] max-md:w-[46%] max-md:px-3 max-md:pb-3">
          <span aria-hidden="true" className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rounded-[3px] bg-[#9B948A] ring-1 ring-black/10" />
          <span className="block truncate text-[12px] font-semibold uppercase tracking-[0.1em] text-[#2a2622]/75">{name}</span>
          <span className="mt-2 block h-px bg-[#2a2622]/20" />
          <span className="mt-3 block space-y-[9px]">{["88%", "74%", "92%", "60%", "82%", "70%", "86%"].map((w, k) => <span key={k} className="flex items-center gap-2"><span className="w-3 shrink-0 text-[9px] font-semibold text-[#2a2622]/45">{k + 1}</span>{bar(w, k)}</span>)}</span>
        </div>
      </div>
      <span className="absolute inset-y-0 w-px bg-white/80" style={{ left: `${x}%` }} />
      <span aria-hidden="true" className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#111] shadow-[0_8px_24px_rgb(0_0_0/0.4)]" style={{ left: `${x}%` }}>
        <svg width="18" height="12" viewBox="0 0 18 12"><path d="M5 1L1 6l4 5M13 1l4 5-4 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      <span className="absolute left-5 top-[15%] inline-flex h-8 items-center rounded-full bg-[rgb(17_17_17/0.55)] px-3.5 text-[13.5px] font-medium text-white ring-1 ring-white/10 backdrop-blur-md">{beforeLabel}</span>
      <span className="absolute right-5 top-[15%] inline-flex h-8 items-center rounded-full bg-[rgb(17_17_17/0.55)] px-3.5 ring-1 ring-white/10 backdrop-blur-md"><img src="/brand/wordmark-dark-main.svg" alt={label} width={72} height={16} className="h-[15px] w-auto" /></span>
    </div>);
}

export type DrumItem = { name: string; img: string; group: number };
/* Krea's curved carousel: flat cards side by side with a gap; the band itself is cut with curved top and bottom edges
 * (taller at the sides), so the side cards read as wrapping round you while the centre card stays whole. Group pills above, round
 * arrows, a glass caption over the foot of the centre card. Turns on its own; stops on hover, touch or focus. */
export function Drum({ items, groups, before, beforeLabel, caption, captions = 1, extra, prev, next }: {
  items: DrumItem[]; groups: string[]; before?: string; beforeLabel: string; caption: (i: number) => React.ReactNode; captions?: number; extra?: React.ReactNode; prev: string; next: string;
}) {
  const n = items.length; const [i, setI] = useState(0); const [hold, setHold] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => { setStill(matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  /* Autoplay only while the carousel is on screen and the tab is visible: no timers, re-renders or image decodes off screen. */
  const root = useRef<HTMLDivElement>(null); const [seen, setSeen] = useState(false);
  useEffect(() => { const el = root.current; if (!el || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.25 }); io.observe(el); return () => io.disconnect(); }, []);
  useEffect(() => { if (hold || still || !seen) return; const id = window.setTimeout(() => { if (!document.hidden) setI((k) => (k + 1) % n); }, 4600); return () => clearTimeout(id); }, [i, hold, still, seen, n]);
  const go = (k: number) => setI(((k % n) + n) % n);
  /* Shape (2026-11-15): one deep parabola runs across the band (top) and a shallower one closes it (bottom). Each card is
     clipped to its own slice of those curves with soft rounded corners, and the clip path animates with the slide, so the
     edges stay one continuous arc while the cards move. Without JS the band falls back to the CSS mask. */
  const band = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<{ W: number; H: number; w: number; g: number; r: number; dt: number; db: number } | null>(null);
  useEffect(() => { const el = band.current; if (!el) return;
    const measure = () => { const card = el.querySelector<HTMLElement>(".drum-card"); if (!card) return; const sm = innerWidth < 768;
      setGeo({ W: el.clientWidth, H: el.clientHeight, w: card.offsetWidth, g: parseFloat(getComputedStyle(el).getPropertyValue("--gap")) || 0, r: sm ? 18 : 28, dt: sm ? 0.09 : 0.17, db: sm ? 0.06 : 0.1 }); };
    measure(); const ro = new ResizeObserver(measure); ro.observe(el); return () => ro.disconnect(); }, []);
  const clip = (pos: number) => { if (!geo) return undefined; const { W, H, w, g, r, dt, db } = geo; const L = W / 2 - w / 2 + pos * (w + g);
    const yt = (x: number) => 4 * dt * H * (x / W) * (1 - x / W), st = (x: number) => (4 * dt * H / W) * (1 - 2 * x / W);
    const yb = (x: number) => H - 4 * db * H * (x / W) * (1 - x / W), sb = (x: number) => -(4 * db * H / W) * (1 - 2 * x / W);
    const f = (v: number) => v.toFixed(1); const x0 = L + r, x1 = L + w - r, xm = (x0 + x1) / 2;
    return `path('M0 ${f(yt(L) + r)} Q0 ${f(yt(L))} ${r} ${f(yt(x0))} Q${f(xm - L)} ${f(yt(x0) + st(x0) * (xm - x0))} ${f(w - r)} ${f(yt(x1))} Q${f(w)} ${f(yt(L + w))} ${f(w)} ${f(yt(L + w) + r)} L${f(w)} ${f(yb(L + w) - r)} Q${f(w)} ${f(yb(L + w))} ${f(w - r)} ${f(yb(x1))} Q${f(xm - L)} ${f(yb(x1) + sb(x1) * (xm - x1))} ${r} ${f(yb(x0))} Q0 ${f(yb(L))} 0 ${f(yb(L) - r)} Z')`; };
  const [inView, setIn] = useState(false); useEffect(() => { if (seen) setIn(true); }, [seen]);
  /* Slide motion (2026-11-15): a CSS transition only blends the start and end clip shapes, so mid-slide the edges left the
     arc. Instead one float offset is eased toward the target each frame and every card's position and clip are computed
     from it, so the cards ride the same parabola at every moment of the move. */
  const cards = useRef<(HTMLElement | null)[]>([]); const cur = useRef(0); const raf = useRef(0);
  const place = (o: number) => { if (!geo) return; const { w, g } = geo;
    cards.current.forEach((el, j) => { if (!el) return; let p = j - o; p = ((p % n) + n) % n; if (p > n / 2) p -= n; const a = Math.abs(p);
      el.style.visibility = a > 2.6 ? "hidden" : ""; el.style.transform = `translateX(calc(-50% + ${(p * (w + g)).toFixed(2)}px))`;
      el.style.clipPath = clip(p) ?? ""; el.style.zIndex = String(10 - Math.round(a)); }); };
  useEffect(() => { if (!geo) return; cancelAnimationFrame(raf.current);
    const from = cur.current; let d = i - from; d = ((d % n) + n) % n; if (d > n / 2) d -= n; const to = from + d;
    if (still || Math.abs(d) < 0.001) { cur.current = to; place(to); return; }
    const t0 = performance.now(), dur = 900, ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const step = (now: number) => { const t = Math.min(1, (now - t0) / dur); cur.current = from + d * ease(t); place(cur.current);
      if (t < 1) raf.current = requestAnimationFrame(step); };
    raf.current = requestAnimationFrame(step); return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, geo, still, n]);
  return (
    <div ref={root} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onTouchStart={() => setHold(true)} onFocus={() => setHold(true)}>
      <div className="flex justify-center px-5"><div role="tablist" className="no-sb flex max-w-full gap-1 overflow-x-auto rounded-full bg-white/[.05] p-1.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)] backdrop-blur-md">
        {groups.map((g, j) => { const on = items[i].group === j; return <button key={g} type="button" role="tab" aria-selected={on} onClick={() => go(items.findIndex((x) => x.group === j))} className={`relative min-h-11 shrink-0 overflow-hidden rounded-full px-5 text-[14px] font-[450] transition-colors duration-300 md:px-6 ${on ? "bg-[#F4F0EB] text-[#111]" : "text-white/60 hover:text-white"}`}>{g}
          {on && !still && <span key={i} aria-hidden="true" className="drum-tick absolute inset-x-5 bottom-[7px] h-[2px] origin-left rounded-full bg-[#111]/25 rtl:origin-right" style={{ animationPlayState: hold || !seen ? "paused" : "running" }} />}</button>; })}
      </div></div>
      <div className="relative md:pb-40"> 
        <div ref={band} data-js={geo ? "" : undefined} data-in={inView || still ? "" : undefined} className="drum relative mt-6 h-[min(54vw,640px)] min-h-[340px] md:mt-8">
          {items.map((it, j) => { let pos = j - i; if (pos > n / 2) pos -= n; if (pos < -n / 2) pos += n; const a = Math.abs(pos); if (a > 2 && !geo) return null; return (
            <figure key={it.img} ref={(el) => { cards.current[j] = el; }} data-c={pos === 0 ? "" : undefined} className="drum-card absolute overflow-hidden rounded-[22px] bg-[#1a1a1a]" aria-hidden={pos !== 0}
              style={{ ["--p" as string]: pos, ["--a" as string]: Math.min(a, 3) } as React.CSSProperties} onClick={() => pos !== 0 && go(j)}>
              {/* The photo keeps the band's full height whatever the card's height, so a card growing or shrinking only
                  crops it: no rescaling, no jump. */}
              <img {...pic(it.img)} sizes="60vw" alt="" loading="lazy" className="drum-img" />
              {pos === 0 ? <Compare img={it.img} name={it.name} beforeLabel={beforeLabel} label="Flexlore" /> : <span className="absolute inset-0 bg-[rgb(17_17_17/0.18)]" />}
            </figure>); })}
          <button type="button" aria-label={prev} onClick={() => go(i - 1)} className="absolute start-3 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[rgb(24_24_24/0.7)] text-white ring-1 ring-white/10 backdrop-blur-md md:start-8"><ArrowRight size={15} aria-hidden="true" className="rotate-180 rtl:rotate-0" /></button>
          <button type="button" aria-label={next} onClick={() => go(i + 1)} className="absolute end-3 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[rgb(24_24_24/0.7)] text-white ring-1 ring-white/10 backdrop-blur-md md:end-8"><ArrowRight size={15} aria-hidden="true" className="rtl:rotate-180" /></button>
        </div>
        {/* Caption: every variant is stacked in one cell, so the box keeps one height and nothing below it moves. */}
        <div className="dark relative z-30 mx-4 mt-4 rounded-[22px] md:absolute md:bottom-0 md:left-1/2 md:mx-0 md:mt-0 md:w-[min(90vw,680px)] md:-translate-x-1/2 md:rounded-[24px] bg-[rgb(26_26_26/0.88)] px-6 py-5 text-[15.5px] leading-[1.5] text-white/90 ring-1 ring-white/[.06] backdrop-blur-xl md:text-[16px]">
          <div aria-live="polite" className="grid">{Array.from({ length: captions }, (_, k) => (
            <p key={k} aria-hidden={k !== i % captions} className={`[grid-area:1/1] transition-opacity duration-500 ${k === i % captions ? "opacity-100" : "opacity-0"}`}>{caption(k)}</p>))}</div>
          {extra && <div className="mt-4 flex flex-wrap gap-2">{extra}</div>}
        </div>
      </div>
    </div>);
}

/* Floating pill nav for the page's own sections, the call to action beside it; shows once the hero is passed. */
export function BottomPillNav({ items, cta, ctaHref }: { items: [string, string][]; cta: string; ctaHref: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(scrollY > innerHeight * 0.9 && innerHeight + scrollY < document.documentElement.scrollHeight - 700); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  return (
    <nav aria-label="Page" className={`fixed inset-x-0 bottom-5 z-40 hidden justify-center gap-2 transition-[opacity,transform] duration-500 md:flex ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <div className="dark flex rounded-full bg-[rgb(28_28_28/0.84)] p-1.5 ring-1 ring-white/[.1] backdrop-blur-xl">{items.map(([l, h]) => <a key={h} href={h} tabIndex={show ? 0 : -1} className="inline-flex h-11 items-center rounded-full px-5 text-[15px] text-white/70 transition-colors hover:bg-white/[.07] hover:text-white">{l}</a>)}</div>
      <a href={ctaHref} tabIndex={show ? 0 : -1} className="grid min-h-11 place-items-center"><span className="btn btn-cta">{cta}</span></a>
    </nav>);
}
