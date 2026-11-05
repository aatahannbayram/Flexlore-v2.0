"use client";
/* v3 home page, below the problem block. Rhythm: dark hero, light content bands, full-bleed photo bands, dark closing call to action.
 * Each block uses a different kind of visual (photo, real UI, full-bleed band, type). Orange once per view: the hero CTA,
 * the result half of a heading, or the closing CTA. Copy: components/i18n/home3.ts (+ the main dictionary).
 * Photos: components/v3/media.json, written by scripts/media-v3.mjs. */
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SITE } from "../config";
import { useLocale } from "../i18n/LocaleProvider";
import { HOME2 } from "../i18n/home2";
import { HOME3 } from "../i18n/home3";
import { Device, WorkScreen } from "../AppScreens";
import { EASE } from "../ui/Reveal";
import { Plus, ForkKnife, Factory, Bed, Storefront, HardHat, Books, Users, ChartBar } from "../ui/icons";
import { Chev } from "./Chevron";
import { CASES } from "./cases";
import M from "./media.json";
import { Photo, Kicker, H2, rise, type Media } from "./Top";

/* ---------- B4. How it works: a sticky phone on desktop, a vertical stepper on phones ---------- */
const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
/** Step 1: the phone as a camera, filming the job. */
function RecScreen({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 bg-[#111]">
      <picture><source type="image/avif" srcSet="/media/v3/hero-sef-m.avif" /><img src="/media/v3/hero-sef-m.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>
      <div className="absolute inset-x-0 top-[9%] flex justify-center"><span className="flex items-center gap-1.5 rounded-full bg-[rgb(17_17_17/0.6)] px-3 py-1 text-[12px] font-medium text-white backdrop-blur"><span className="h-2 w-2 animate-pulse rounded-full bg-[#E54A4A] motion-reduce:animate-none" />{label}</span></div>
      <div className="absolute inset-x-0 bottom-[7%] flex justify-center"><span className="grid h-14 w-14 place-items-center rounded-full ring-[3px] ring-white"><span className="h-9 w-9 rounded-[8px] bg-[#E54A4A]" /></span></div>
    </div>);
}
const SIDE: (Media | null)[] = ["saha-iskele-pov", null, null, "saha-eldiven-makro", null];
function Screen({ i, on }: { i: number; on: boolean }) {
  const { d, lang, locale } = useLocale(); const s = HOME3[locale].steps;
  if (i === 0) return <RecScreen label={s[0][2]} />;
  if (i === 1) return <Editor active={on} lang={lang} />;
  if (i === 2) return <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} />;
  if (i === 3) return <WorkScreen active={on} lang={lang} />;
  return <Ready active={on} lang={lang} />;
}
export function StoryV3() {
  const { locale } = useLocale(); const t = HOME3[locale]; const reduce = useReducedMotion();
  const [act, setAct] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 60%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const stage = useRef<HTMLDivElement>(null); const near = useInView(stage, { margin: "300px 0px", once: true }); const seen = useInView(stage, { amount: 0.2 });
  return (
    <section id="how" aria-labelledby="how-h" className="band-grey section-y">
      <div className="container-x">
        <Kicker>{t.k}</Kicker>
        <H2 id="how-h" a={t.h} b={t.h2} className="max-w-[18ch]" />
        <div className="mt-10 grid-12 md:mt-14">
          {/* Desktop stage: sticky phone, the step's photo or note beside it. */}
          <div ref={stage} className="col-span-5 hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+48px)] flex h-[min(640px,calc(100svh-var(--header-h)-96px))] items-center justify-center">
              <div className="relative w-[min(300px,80%)]" dir="ltr">
                <Device label={t.steps[act][0]}>
                  {near && t.steps.map((_, i) => (
                    <div key={i} aria-hidden={i !== act} className={`absolute inset-0 transition-opacity duration-500 ${i === act ? "opacity-100" : "pointer-events-none opacity-0"}`}><Screen i={i} on={seen && i === act} /></div>))}
                </Device>
                <AnimatePresence mode="wait">
                  <m.div key={act} initial={reduce ? false : { opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }}
                    className="absolute -end-[46%] bottom-[12%] w-[62%]">
                    {SIDE[act]
                      ? <div className="overflow-hidden rounded-[16px] border border-line bg-[var(--card-2)] p-1.5"><div className="relative aspect-[4/3] overflow-hidden rounded-[12px]"><Photo n={SIDE[act]!} sizes="240px" className="absolute inset-0 h-full w-full object-cover" /></div></div>
                      : <div className="rounded-[16px] border border-line bg-[var(--card-2)] px-4 py-3 text-[14px] font-semibold leading-snug"><span className="mb-1 flex items-center gap-1.5 text-[12px] font-medium text-ink-faint"><Chev className="h-2 w-3 text-accent" />{t.step} {act + 1}</span>{t.steps[act][2]}</div>}
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          {/* The steps. A rail with the chevron fills as you scroll; each step lights up when it reaches the middle. */}
          <div className="relative col-span-12 lg:col-span-6 lg:col-start-7">
            <span aria-hidden="true" className="absolute bottom-0 start-[19px] top-0 w-px bg-line" />
            <m.span aria-hidden="true" style={{ scaleY: reduce ? 1 : fill }} className="absolute bottom-0 start-[19px] top-0 w-px origin-top bg-accent" />
            <ol ref={list} className="relative space-y-8 lg:space-y-0">
              {t.steps.map(([title, line, note], i) => <StepRow key={title} i={i} title={title} line={line} note={note} act={act} setAct={setAct} />)}
            </ol>
          </div>
        </div>
      </div>
    </section>);
}
function StepRow({ i, title, line, note, act, setAct }: { i: number; title: string; line: string; note: string; act: number; setAct: (n: number) => void }) {
  const ref = useRef<HTMLLIElement>(null); const mid = useInView(ref, { margin: "-45% 0px -45% 0px" }); const reduce = useReducedMotion();
  const near = useInView(ref, { margin: "200px 0px", once: true }); const vis = useInView(ref, { amount: 0.3 });
  useEffect(() => { if (mid) setAct(i); }, [mid, i, setAct]);
  const on = act === i;
  return (
    <li ref={ref} className="relative ps-14 lg:flex lg:min-h-[min(54vh,460px)] lg:flex-col lg:justify-center">
      <span aria-hidden="true" className={`absolute start-0 top-0 grid h-10 w-10 place-items-center rounded-full border text-[13px] font-semibold tabular-nums transition-colors duration-300 lg:top-1/2 lg:-translate-y-1/2 ${on ? "border-accent bg-accent text-[#111111]" : "border-line bg-[var(--card-2)] text-ink-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
      <h3 className={`text-[22px] font-semibold leading-tight tracking-[-0.025em] transition-colors md:text-[28px] lg:text-[34px] ${on ? "text-ink" : "lg:text-ink-faint"}`}>{title}</h3>
      <p className={`mt-2 max-w-[30rem] text-[16px] leading-[1.55] transition-colors md:text-[17px] ${on ? "text-ink-muted" : "text-ink-muted lg:text-ink-faint"}`}>{line}</p>
      {/* Phones and tablets: one visual per step, the photo or the screen. */}
      <m.div {...(reduce ? {} : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-10% 0px" }, transition: { duration: 0.5, ease: EASE } })} className="mt-4 lg:hidden">
        {SIDE[i]
          ? <div className="relative aspect-[16/10] max-w-[420px] overflow-hidden rounded-[16px]"><Photo n={SIDE[i]!} sizes="(min-width:768px) 420px, 92vw" className="absolute inset-0 h-full w-full object-cover" /></div>
          : <div className="flex max-w-[420px] items-end gap-4 rounded-[16px] border border-line bg-[var(--card-2)] p-3">
              <div className="w-[38%] max-w-[150px] shrink-0" dir="ltr"><Device label={title}>{near ? <Screen i={i} on={vis} /> : <div className="absolute inset-0 bg-[#111]" />}</Device></div>
              <p className="pb-2 text-[14px] font-semibold leading-snug"><span className="mb-1 block text-[12px] font-medium text-ink-faint">{note.split(" · ")[0]}</span>{note.split(" · ")[1] ?? ""}</p>
            </div>}
      </m.div>
    </li>);
}

/* ---------- B5. Full-bleed band ---------- */
export function BandV3() {
  const { locale } = useLocale(); const t = HOME3[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const [wide, setWide] = useState(false);
  useEffect(() => { const q = matchMedia("(min-width: 768px)"); const f = () => setWide(q.matches); f(); q.addEventListener("change", f); return () => q.removeEventListener("change", f); }, []);
  const [a, b] = t.band.split(/,\s*|،\s*/);
  return (
    <section ref={ref} aria-labelledby="band-h" className="dark relative isolate overflow-hidden bg-[#111111]">
      <m.div aria-hidden="true" style={{ y: reduce || !wide ? 0 : y }} className="absolute inset-x-0 -inset-y-[48px]">
        <Photo n="saha-drone-cember" portrait sizes="100vw" className="h-full w-full object-cover" />
      </m.div>
      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,#111111_0%,rgb(17_17_17/0.55)_38%,rgb(17_17_17/0)_70%)]" />
      <div className="container-x relative flex aspect-[4/5] max-h-[760px] flex-col justify-end pb-10 md:aspect-[16/8] md:pb-16">
        <h2 id="band-h" className="max-w-[16ch] text-[clamp(36px,1rem+3.4vw,80px)] font-semibold leading-[1.0] tracking-[-0.045em] text-white">{a}{b ? <>, <span className="text-accent">{b}</span></> : null}</h2>
        <p className="mt-4 max-w-[34rem] text-[16px] leading-[1.55] text-[#E6E6E6] md:text-[18px]">{t.bandP}</p>
      </div>
    </section>);
}

/* ---------- B6. Industries (white, tabs) ---------- */
type Ind = { href: string; img: Media | "hotel"; icon: typeof ForkKnife; tab: number | "build" };
const IND: Ind[] = [
  { href: "/sektor/restoran/", img: "case-eatwell", icon: ForkKnife, tab: 0 },
  { href: "/sektor/uretim/", img: "case-gastrofab", icon: Factory, tab: 1 },
  { href: "/sektor/otel/", img: "hotel", icon: Bed, tab: 2 },
  { href: "/sektor/franchise/", img: "case-bambu", icon: Storefront, tab: 3 },
  { href: "/sektor/insaat/", img: "case-istinye", icon: HardHat, tab: "build" },
];
const BUILD = { en: ["Building and field", "Site crews follow the same safe method on every job.", ["Site safety and PPE on video", "Equipment checks before each shift", "New-starter induction on site"]], tr: ["İnşaat ve saha", "Saha ekipleri her işte aynı güvenli yöntemi izler.", ["Videoyla iş güvenliği ve KKD", "Vardiya öncesi ekipman kontrolleri", "Sahada yeni başlayan oryantasyonu"]] } as const;
export function SectorsV3() {
  const { d, locale, lang } = useLocale(); const c = d.ind; const t = HOME2[locale]; const reduce = useReducedMotion();
  const list = IND.filter((x) => x.tab !== "build" || SITE.flags.construction);
  const [on, setOn] = useState(0); const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const key = (e: React.KeyboardEvent, k: number) => {
    const n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!n) return;
    e.preventDefault(); const rtl = document.documentElement.dir === "rtl"; const next = (k + (rtl ? -n : n) + list.length) % list.length; setOn(next); tabs.current[next]?.focus();
  };
  const cur = list[on]; const label = (x: Ind) => x.tab === "build" ? BUILD[lang][0] : c.cards[x.tab];
  const [role, ex] = cur.tab === "build" ? [BUILD[lang][1], BUILD[lang][2]] : t.tabs[cur.tab];
  return (
    <section id="industries" aria-labelledby="ind-h" className="band-light section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Kicker>{c.k}</Kicker><H2 id="ind-h" a={c.h} className="max-w-[18ch]" /></div>
        </div>
        <div role="tablist" aria-label={c.k} className="no-sb -mx-[var(--pad-x)] mt-8 flex gap-1 overflow-x-auto px-[var(--pad-x)] md:mx-0 md:mt-10 md:w-max md:max-w-full md:rounded-full md:border md:border-line md:bg-[var(--card-2)] md:p-1">
          {list.map((x, k) => { const act = on === k; const I = x.icon; return (
            <button key={x.href} ref={(n) => { tabs.current[k] = n; }} type="button" role="tab" id={`ind-t-${k}`} aria-selected={act} aria-controls="ind-panel" tabIndex={act ? 0 : -1}
              onClick={() => setOn(k)} onKeyDown={(e) => key(e, k)}
              className={`relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line px-4 text-[15px] font-medium transition-colors md:border-0 ${act ? "text-white" : "text-ink-muted hover:text-ink"}`}>
              {act && <m.span layoutId="ind-pill" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} className="absolute inset-0 rounded-full bg-[#111111]" />}
              <I size={17} aria-hidden="true" className="relative" /><span className="relative">{label(x)}</span></button>); })}
        </div>
        <div id="ind-panel" role="tabpanel" aria-labelledby={`ind-t-${on}`} className="mt-4">
          <AnimatePresence mode="wait" initial={false}>
            <m.div key={on} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.28, ease: EASE }}
              className="grid gap-3 md:grid-cols-12">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[#E6E6E6] md:col-span-7 md:aspect-auto md:min-h-[420px]">
                {cur.img === "hotel"
                  ? <picture><source srcSet="/photos/hotel-desk-800.avif 800w, /photos/hotel-desk-1600.avif 1600w" sizes="(min-width:768px) 58vw, 100vw" type="image/avif" /><img src="/photos/hotel-desk-1600.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>
                  : <Photo n={cur.img} sizes="(min-width:768px) 58vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />}
              </div>
              <div className="flex flex-col rounded-[16px] border border-line bg-[var(--card-2)] p-5 md:col-span-5 md:p-8">
                <p className="text-[20px] font-semibold leading-[1.25] tracking-[-0.02em] md:text-[26px]">{role}</p>
                <ul className="mt-5 space-y-3 md:mt-7">
                  {ex.map((e) => <li key={e} className="flex items-start gap-3 text-[16px] leading-snug text-ink-muted"><Chev dir="end" className="mt-[7px] h-2 w-3 shrink-0 text-ink" />{e}</li>)}
                </ul>
                <Link href={cur.href} className="group mt-6 inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold md:mt-auto md:pt-6">{t.go}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></Link>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
        <p className="mt-5 text-[14px] leading-[1.6] text-ink-faint">{c.also}: {c.areas.slice(0, 5).join(" · ")}. {c.langs}</p>
      </div>
    </section>);
}

/* ---------- B7. Customer stories (hidden until each case is approved) ---------- */
export function CasesV3() {
  const { locale } = useLocale(); const t = HOME3[locale]; const reduce = useReducedMotion();
  const list = CASES.filter((c) => c.approved && c.quote && c.name && c.title && c.logo);
  const track = useRef<HTMLDivElement>(null); const [i, setI] = useState(0);
  const go = (n: number) => { const el = track.current; if (!el) return; const k = Math.max(0, Math.min(list.length - 1, n)); const card = el.children[k] as HTMLElement | undefined; card?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "start", block: "nearest" }); setI(k); };
  useEffect(() => { const el = track.current; if (!el) return; const f = () => { const w = (el.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1; setI(Math.round(Math.abs(el.scrollLeft) / (w + 12))); }; el.addEventListener("scroll", f, { passive: true }); return () => el.removeEventListener("scroll", f); }, []);
  if (!SITE.flags.cases || list.length === 0) return null;
  return (
    <section id="cases" aria-labelledby="cases-h" className="band-light section-y pt-0">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6"><div><Kicker>{t.ck}</Kicker><H2 id="cases-h" a={t.ch} /></div>
          <div className="hidden gap-2 md:flex">
            <button type="button" onClick={() => go(i - 1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-line"><Chev dir="start" className="h-2.5 w-3.5" /></button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-line"><Chev dir="end" className="h-2.5 w-3.5" /></button>
          </div></div>
        <div ref={track} role="region" aria-roledescription="carousel" aria-label={t.ch} tabIndex={0}
          onKeyDown={(e) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); }}
          className="no-sb -mx-[var(--pad-x)] mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--pad-x)] [scroll-padding-inline:var(--pad-x)]">
          {list.map((c, k) => (
            <article key={c.slug} aria-roledescription="slide" aria-label={`${k + 1} / ${list.length}`} className="dark relative aspect-[4/5] w-[86%] shrink-0 snap-start overflow-hidden rounded-[16px] bg-[#111111] text-white md:aspect-[16/9] md:w-[78%]">
              <Photo n={c.img} portrait sizes="(min-width:768px) 78vw, 86vw" className="absolute inset-0 h-full w-full object-cover" />
              <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(17_17_17/0.35),rgb(17_17_17/0.75)),linear-gradient(0deg,#111111_0%,rgb(17_17_17/0)_55%)]" />
              <div className="relative flex h-full flex-col justify-between p-6 md:p-10">
                <img src={c.logo!} alt={c.company} className="h-7 w-auto self-start brightness-0 invert" loading="lazy" />
                <blockquote className="max-w-[28ch] text-[clamp(22px,1rem+1.4vw,40px)] font-semibold leading-[1.15] tracking-[-0.03em]">“{c.quote}”</blockquote>
                <div className="flex flex-wrap items-end justify-between gap-4"><p className="text-[15px] text-[#B2B2B2]">{c.name}, {c.title}</p>
                  <Link href={`/musteriler/${c.slug}/`} className="btn bg-white text-[#111111] group">{t.read}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></Link></div>
              </div>
            </article>))}
        </div>
        <div className="mt-4 flex justify-center gap-1.5 md:hidden" aria-hidden="true">{list.map((c, k) => <span key={c.slug} className={`h-1.5 rounded-full transition-all ${k === i ? "w-5 bg-ink" : "w-1.5 bg-line-strong"}`} />)}</div>
      </div>
    </section>);
}

/* ---------- B8. Flexlore Web: the panel on the meeting room screens ---------- */
const Dash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="h-full w-full bg-[#111]" /> });
type Q = number[][];
/** CSS matrix3d that maps a w×h box onto the quad (TL, TR, BR, BL) in px. */
function quadMatrix(w: number, h: number, q: Q) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3; const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
  const den = dx1 * dy2 - dx2 * dy1; const g = (sx * dy2 - dx2 * sy) / den, k = (dx1 * sy - sx * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3, c = x0, d = y1 - y0 + g * y1, e = y3 - y0 + k * y3, f = y0;
  return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${k / h},0,0,1,0,${c},${f},0,1)`;
}
function WebScene({ label }: { label: string }) {
  const { lang } = useLocale(); const box = useRef<HTMLDivElement>(null); const [W, setW] = useState(0);
  const near = useInView(box, { margin: "300px 0px", once: true }); const on = useInView(box, { amount: 0.3 });
  useEffect(() => { const el = box.current; if (!el) return; const ro = new ResizeObserver(() => setW(el.clientWidth)); ro.observe(el); return () => ro.disconnect(); }, []);
  const [IW, IH] = M["web-toplanti"].size; const s = W / IW; const [L, R] = M["web-toplanti"].screens.map((q) => q.map(([x, y]) => [x * s, y * s]));
  return (
    <div ref={box} role="img" aria-label={label} className="relative aspect-[1408/768] w-full overflow-hidden rounded-[16px] bg-[#E6E6E6]">
      <Photo n="web-toplanti" sizes="(min-width:1024px) 58vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
      {W > 0 && near && (
        <div aria-hidden="true" className="absolute inset-0" style={{ maskImage: "url(/media/v3/web-toplanti-mask.png)", WebkitMaskImage: "url(/media/v3/web-toplanti-mask.png)", maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: 1180, height: 720, transform: quadMatrix(1180, 720, R) }}><div className="h-full w-full overflow-hidden bg-[#111]"><Dash on={on} lang={lang} /></div></div>
          <img src="/photos/cta-dashboard.webp" alt="" className="absolute left-0 top-0 origin-top-left" style={{ width: 1600, height: 1049, transform: quadMatrix(1600, 1049, L), maxWidth: "none" }} />
          <span className="absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.06),rgb(255_255_255/0)_40%)]" />
        </div>)}
    </div>);
}
export function WebV3() {
  const { locale } = useLocale(); const t = HOME2[locale].web; const reduce = useReducedMotion(); const icons = [Books, Users, ChartBar];
  return (
    <section id="web" aria-labelledby="web-h" className="band-grey section-y">
      <div className="container-x grid-12 items-center gap-y-8">
        <div className="col-span-12 lg:col-span-7 lg:order-last"><WebScene label={`${t.k}: ${t.points.join(", ")}`} /></div>
        <div className="col-span-12 lg:col-span-5 lg:pe-6">
          <div className="flex flex-wrap items-center gap-3"><Kicker>{t.k}</Kicker><span className="rounded-full border border-line px-2.5 py-0.5 text-[12px] font-medium text-ink-muted">{t.soon}</span></div>
          <H2 id="web-h" a={t.h} b={t.h2} className="max-w-[18ch]" />
          <p className="mt-4 max-w-[30rem] text-[16px] leading-[1.55] text-ink-muted md:text-[17px]">{t.p}</p>
          <ul className="mt-6 space-y-2">
            {t.points.map((x, i) => { const I = icons[i]; return (
              <m.li key={x} {...rise(reduce, i)} className="flex items-center gap-3 text-[16px] font-medium"><span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] border border-line bg-[var(--card-2)]"><I size={17} /></span>{x}</m.li>); })}
          </ul>
          <Link href="/features/web-panel/" className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold">{t.go}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></Link>
        </div>
      </div>
    </section>);
}

/* ---------- B9. FAQ (white, compact: six questions, one open at a time) ---------- */
const FAQ_PICK = [0, 1, 2, 4, 5, 7];
export function FaqV3() {
  const { d, locale } = useLocale(); const c = d.faq; const t = HOME3[locale]; const reduce = useReducedMotion(); const [open, setOpen] = useState<number | null>(null);
  const items = FAQ_PICK.map((k) => c.items[k]).filter(Boolean).map(([q, a], k) => [q, FAQ_PICK[k] === 4 ? t.dev : a] as const);
  return (
    <section id="faq" aria-labelledby="faq-h" className="band-light section-y">
      <div className="container-x grid-12 gap-y-6">
        <div className="col-span-12 lg:col-span-4">
          <Kicker>{c.k}</Kicker><H2 id="faq-h" a={c.h} />
          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link href="/pricing/" className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[14px] font-semibold hover:bg-[var(--card)]">{d.pricing.all}</Link>
            <a href="mailto:support@flexlore.com" className="inline-flex min-h-11 items-center px-2 text-[14px] text-ink-muted underline-offset-4 hover:text-ink hover:underline">support@flexlore.com</a>
          </div>
        </div>
        <ul className="col-span-12 border-t border-line lg:col-span-7 lg:col-start-6">
          {items.map(([q, a], i) => { const on = open === i; return (
            <li key={q} className="border-b border-line">
              <h3><button type="button" id={`faq-q-${i}`} aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}
                className="group flex min-h-14 w-full items-center justify-between gap-4 py-3 text-start text-[16px] font-semibold leading-snug tracking-[-.01em] md:min-h-16 md:text-[18px]">
                <span>{q}</span>
                <m.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.25, ease: EASE }} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${on ? "border-[#111111] bg-[#111111] text-white" : "border-line text-ink"}`}><Plus size={14} aria-hidden="true" /></m.span>
              </button></h3>
              <AnimatePresence initial={false}>{on && (
                <m.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.3, ease: EASE }} className="overflow-hidden">
                  <p className="max-w-[38rem] pb-5 pe-12 text-[16px] leading-[1.6] text-ink-muted">{a}</p></m.div>)}</AnimatePresence>
            </li>); })}
        </ul>
      </div>
    </section>);
}

/* ---------- B10. Closing call to action (dark, roof silhouette at sunset) ---------- */
export function EndV3() {
  const { d } = useLocale(); const c = d.end;
  return (
    <section aria-labelledby="end-h" className="dark relative isolate overflow-hidden bg-[#111111]">
      <div aria-hidden="true" className="absolute inset-0"><Photo n="saha-cati-siluet" portrait sizes="100vw" className="h-full w-full object-cover" /></div>
      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgb(17_17_17/0.92)_0%,rgb(17_17_17/0.7)_40%,rgb(17_17_17/0.1)_75%)] md:bg-[linear-gradient(90deg,rgb(17_17_17/0.7)_0%,rgb(17_17_17/0.15)_50%,rgb(17_17_17/0)_70%)] md:rtl:bg-[linear-gradient(270deg,rgb(17_17_17/0.7)_0%,rgb(17_17_17/0.15)_50%,rgb(17_17_17/0)_70%)]" />
      <div className="container-x relative flex aspect-[4/5] max-h-[720px] flex-col justify-end pb-12 md:aspect-[16/8] md:justify-center md:pb-0">
        <h2 id="end-h" className="max-w-[12ch] text-[clamp(36px,1rem+3vw,72px)] font-semibold leading-[1.0] tracking-[-0.045em] text-white">{c.h}</h2>
        <p className="mt-4 max-w-[26rem] text-[17px] leading-[1.55] text-[#E6E6E6]">{c.p}</p>
        <a href={SITE.demo} className="btn btn-accent group mt-7 h-12 self-start px-6 text-[16px]">{c.cta}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
      </div>
    </section>);
}

/** Everything below the problem block, in page order. */
export default function BelowV3() {
  return (<><StoryV3 /><BandV3 /><SectorsV3 /><CasesV3 /><WebV3 /><FaqV3 /><EndV3 /></>);
}
