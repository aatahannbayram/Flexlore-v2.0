"use client";
/* Prototype (2026-11-15, not linked, noindex): the whole site in the Krea layout language, dark first, Flexlore content.
 * Ata reviews this one page; once approved, the parts move into the real pages. Copy comes from the site's existing
 * Turkish dictionaries and plan table (nothing new is claimed). One font (Schibsted Grotesk), orange only for the demo
 * call to action, warm app-style icons, no blue. */
import { useEffect, useRef, useState } from "react";
import { FEATURES, FEAT_NAV } from "../features/data";
import { FICON } from "../features/ficons";
import { HOME2 } from "../i18n/home2";
import { PLANS, COMPARE, SITE, savePct } from "../config";
import { Device, WorkScreen } from "../AppScreens";
import { ArrowRight, CaretDown, Check, Play } from "../ui/icons";

const t = FEAT_NAV.tr; const h2 = HOME2.tr;
const pic = (n: string) => ({ src: `/photos/${n}-1600.webp`, srcSet: `/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w` });
/* Warm squircle icons: one gradient per feature, never blue or purple. */
const WARM = [
  "from-[#FFB27A] to-[#EC6726]", "from-[#FFD38A] to-[#F2A33A]", "from-[#FF9C8A] to-[#E0584A]", "from-[#D9F27A] to-[#8DBA3E]",
  "from-[#FFFFFF] to-[#E6DED3]", "from-[#5A5651] to-[#262422]",
];
const ICON_TONE: Record<string, number> = { "video-to-sop": 0, "pdf-to-steps": 4, "video-editor": 5, "screen-recording": 1, "ai-quiz": 2, "auto-translation": 3, "qr-codes": 5, notifications: 1, "permissions-workspaces": 4, "web-panel": 0, "ai-agents-mcp": 2 };
function AppIcon({ slug, icon, size = 44 }: { slug: string; icon: string; size?: number }) {
  const I = FICON[icon]; const tone = ICON_TONE[slug] ?? 0; const light = tone === 4 || tone === 3 || tone === 1;
  return (
    <span className={`relative grid shrink-0 place-items-center rounded-[28%] bg-gradient-to-b ${WARM[tone]} shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-1px_0_rgb(0_0_0/0.15),0_8px_18px_-8px_rgb(0_0_0/0.7)]`} style={{ width: size, height: size }}>
      <span className={light ? "text-[#1a1a1a]" : "text-white"}><I size={Math.round(size * 0.46)} /></span>
    </span>);
}

/* Krea headline: very large, bold, tight, two tones (cream, then grey). */
function Display({ a, b, as: T = "h2", className = "", center = true }: { a: string; b?: string; as?: "h1" | "h2"; className?: string; center?: boolean }) {
  return <T className={`kh ${center ? "mx-auto text-center" : ""} ${className}`}><span className="text-[#F4F0EB]">{a}</span>{b && <><br /><span className="text-[#F4F0EB]/45">{b}</span></>}</T>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const groups = ["create", "spread", "manage"] as const;
  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setOpen(false)}>
      <div className="bg-[rgb(17_17_17/0.72)] backdrop-blur-xl">
        <nav className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex h-11 items-center" aria-label="Flexlore"><img src="/brand/wordmark-dark-main.svg" alt="Flexlore" width={110} height={24} className="h-6 w-auto" /></a>
          <ul className="hidden items-center gap-1 text-[15px] text-white/80 lg:flex">
            <li><button type="button" onMouseEnter={() => setOpen(true)} onClick={() => setOpen(!open)} aria-expanded={open} className="inline-flex h-11 items-center gap-1 rounded-full px-3.5 hover:text-white">Ürün<CaretDown size={11} aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`} /></button></li>
            {["Sektörler", "Kaynaklar"].map((x) => <li key={x}><button type="button" onMouseEnter={() => setOpen(false)} className="inline-flex h-11 items-center gap-1 rounded-full px-3.5 hover:text-white">{x}<CaretDown size={11} aria-hidden="true" /></button></li>)}
            <li><a href="#fiyat" onMouseEnter={() => setOpen(false)} className="inline-flex h-11 items-center rounded-full px-3.5 hover:text-white">Fiyatlar</a></li>
          </ul>
          <div className="flex items-center gap-2">
            <a href="/login/" className="hidden min-h-11 place-items-center sm:grid"><span className="inline-flex h-[38px] items-center rounded-full bg-white/[.08] px-4 text-[14px] font-semibold text-white ring-1 ring-white/[.08]">Giriş yap</span></a>
            <a href={SITE.demo} className="grid min-h-11 place-items-center"><span className="btn btn-cta !h-[38px] !min-h-[38px] !px-4 !text-[14px]">Demo isteyin</span></a>
          </div>
        </nav>
      </div>
      {/* Mega menu: three columns of app icons, a featured card, a footer line. */}
      {open && <div className="mx-auto hidden max-w-[1280px] px-5 lg:block">
        <div className="mt-2 overflow-hidden rounded-[30px] bg-[#1c1c1c] shadow-[0_60px_120px_-40px_rgb(0_0_0/0.9)] ring-1 ring-white/[.07]">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_270px] gap-2 p-6">
            {groups.map((g) => (
              <div key={g} className="min-w-0">
                <p className="px-3 pb-3 text-[14px] text-white/45">{t.groups[g]}</p>
                <ul className="space-y-0.5">{FEATURES.filter((f) => f.group === g).map((f) => (
                  <li key={f.slug}><a href={`/features/${f.slug}/`} className="flex items-center gap-3.5 rounded-[18px] px-3 py-2.5 transition-colors hover:bg-white/[.05]">
                    <AppIcon slug={f.slug} icon={f.icon} />
                    <span className="min-w-0"><span className="flex items-center gap-2 text-[15.5px] font-semibold tracking-[-0.02em] text-white">{t.items[f.slug][0]}{f.status === "soon" && <span className="rounded-full bg-white/[.08] px-2 py-0.5 text-[12px] font-medium text-white/60">{t.soon}</span>}</span>
                      <span className="block truncate text-[13.5px] text-white/50">{t.items[f.slug][1]}</span></span></a></li>))}</ul>
              </div>))}
            <a href="/features/video-to-sop/" className="dark relative min-h-[360px] overflow-hidden rounded-[22px] bg-[#111]">
              <img {...pic("phone-mount")} sizes="300px" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.1)_30%,rgb(17_17_17/0.92))]" />
              <span className="absolute start-4 top-4 rounded-full bg-[rgb(17_17_17/0.55)] px-3 py-1 text-[12px] text-white/80 backdrop-blur-md">{t.now}</span>
              <span className="absolute inset-x-5 bottom-5">
                <span className="block text-[26px] font-semibold leading-tight tracking-[-0.04em] text-white">{t.items["video-to-sop"][0]}</span>
                <span className="mt-1 block text-[14px] text-white/70">{t.items["video-to-sop"][1]}</span>
                <span className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[#F4F0EB] px-4 text-[14px] font-semibold text-[#111]">{t.how}<ArrowRight size={13} aria-hidden="true" /></span>
              </span>
            </a>
          </div>
          <div className="flex items-center justify-between border-t border-white/[.06] px-8 py-4 text-[15px] text-white/55">
            <span>{FEATURES.length} özellik, tek uygulamada.</span>
            <a href="/features/" className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-white ring-1 ring-white/[.12] hover:bg-white/[.06]">{t.all}<ArrowRight size={13} aria-hidden="true" /></a>
          </div>
        </div>
      </div>}
    </header>);
}

function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-[68px]">
      <img {...pic("hero-restoran")} sizes="100vw" alt="" className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover" />
      <span className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_45%,rgb(17_17_17/0.35),rgb(17_17_17/0.85))]" />
      <span className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(to_top,#111,transparent)]" />
      <div className="mx-auto w-full max-w-[1100px] px-5 text-center">
        <h1 className="kh kh-xl mx-auto text-center"><span className="text-[#F4F0EB]">Ekibinizi <span className="hero-ember">dakikalar</span> içinde eğitin</span><br /><span className="text-[#F4F0EB]/45">saatler içinde değil</span></h1>
        <p className="mx-auto mt-6 max-w-[36rem] text-[17px] leading-[1.55] text-white/75 md:text-[19px]">Bir işin nasıl yapıldığını bir kez kaydedin. Flexlore bunu kısa kontrollerle adım adım video eğitime dönüştürür, her şubede kimin hazır olduğunu gösterir.</p>
        {/* Krea's prompt bar, ours: the job being trained, as a glass bar. */}
        <div className="mx-auto mt-9 flex max-w-[620px] items-center gap-3 rounded-[24px] bg-[rgb(24_24_24/0.72)] p-2.5 ps-5 text-start ring-1 ring-white/[.1] backdrop-blur-xl">
          <span className="min-w-0 flex-1"><span className="block truncate text-[15px] text-white">Açılış rutini · Mutfak</span><span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/10"><span className="block h-full w-2/3 rounded-full bg-[#EC6726]" /></span></span>
          <span className="shrink-0 text-[13px] tabular-nums text-white/55">4/6</span>
          <a href={SITE.demo} className="grid min-h-11 place-items-center"><span className="btn btn-cta !h-11 !min-h-11 !px-5 !text-[14px]">Demo isteyin</span></a>
        </div>
      </div>
    </section>);
}

/* Krea's curved carousel: real jobs on a concave track (the side cards turn toward you like the inside of a drum),
   category pills above, round arrows, a slow turn on its own that stops on hover or touch. */
const JOBS: [string, string, number][] = [
  ["Açılış rutini", "ws-j-acilis", 0], ["Alerjen yönetimi", "ws-j-alerjen", 0], ["Fritöz temizliği", "ws-j-fritoz", 0],
  ["Hat başlangıç kontrolü", "ws-j-hat", 1], ["Kalıp değişimi", "ws-j-kalip", 1], ["KKD kontrolü", "ws-j-kkd", 1],
  ["İskele güvenlik kontrolü", "ws-j-iskele", 2], ["Vinç işaretleşmesi", "ws-j-vinc", 2], ["Günlük saha brifingi", "ws-j-brifing", 2],
];
const GROUPS = ["Mutfak", "Üretim", "Şantiye"];
/* Before / after on the centre card: the paper instruction on the left, the filmed job on the right, a round handle. */
function Compare({ name }: { name: string }) {
  const [x, setX] = useState(50); const box = useRef<HTMLDivElement>(null); const drag = useRef(false);
  const at = (cx: number) => { const r = box.current!.getBoundingClientRect(); setX(Math.max(6, Math.min(94, ((cx - r.left) / r.width) * 100))); };
  return (
    <div ref={box} className="absolute inset-0 touch-pan-y select-none" onPointerDown={(e) => { drag.current = true; (e.target as Element).setPointerCapture?.(e.pointerId); at(e.clientX); }}
      onPointerMove={(e) => drag.current && at(e.clientX)} onPointerUp={() => { drag.current = false; }}>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
        <img src="/media/v3/problem-kagitlar-1600.webp" alt="" className="h-full w-full object-cover" />
      </div>
      <span className="absolute inset-y-0 w-px bg-white/80" style={{ left: `${x}%` }} />
      <span className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#111] shadow-[0_8px_24px_rgb(0_0_0/0.4)]" style={{ left: `${x}%` }} aria-hidden="true">
        <svg width="18" height="12" viewBox="0 0 18 12"><path d="M5 1L1 6l4 5M13 1l4 5-4 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
      <span className="absolute start-5 top-5 rounded-full bg-[rgb(17_17_17/0.55)] px-3.5 py-1.5 text-[14px] font-medium text-white backdrop-blur-md">Kâğıt talimat</span>
      <span className="absolute end-5 top-5 flex items-center gap-2 rounded-full bg-[rgb(17_17_17/0.55)] px-3.5 py-1.5 text-[14px] font-medium text-white backdrop-blur-md"><img src="/brand/symbol-main.svg" alt="" width={16} height={16} className="h-4 w-4" />Flexlore</span>
      <span className="sr-only">{name}</span>
    </div>);
}
function Arched() {
  const n = JOBS.length; const [i, setI] = useState(0); const [hold, setHold] = useState(false);
  useEffect(() => { if (hold) return; const id = window.setTimeout(() => setI((k) => (k + 1) % n), 4200); return () => clearTimeout(id); }, [i, hold, n]);
  const go = (k: number) => setI(((k % n) + n) % n);
  return (
    <section className="pb-36 pt-24 md:pb-44 md:pt-32" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onTouchStart={() => setHold(true)}>
      <div className="mx-auto max-w-[1100px] px-5"><Display a="Bir kez çekin." b="Ekibin tamamı aynı şekilde öğrensin." />
        <p className="mx-auto mt-5 max-w-[36rem] text-center text-[16px] text-white/55 md:text-[18px]">İşi en iyi yapan kişiyi, işin yapıldığı yerde telefonla çekin. Stüdyo da senaryo da gerekmez.</p>
        <div className="mt-9 flex justify-center"><div role="tablist" className="no-sb flex max-w-full gap-1 overflow-x-auto rounded-full bg-white/[.06] p-1.5">
          {GROUPS.map((g, j) => { const on = JOBS[i][2] === j; return <button key={g} type="button" role="tab" aria-selected={on} onClick={() => go(JOBS.findIndex((x) => x[2] === j))} className={`min-h-11 shrink-0 rounded-full px-6 text-[15px] font-medium transition-colors ${on ? "bg-[#F4F0EB] text-[#111]" : "text-white/60 hover:text-white"}`}>{g}</button>; })}
        </div></div>
      </div>
      <div className="drum relative mt-12 h-[min(46vw,520px)] min-h-[300px]">
        {JOBS.map(([name, im], j) => { let pos = j - i; if (pos > n / 2) pos -= n; if (pos < -n / 2) pos += n; const a = Math.abs(pos); if (a > 2) return null; return (
          <figure key={im} className="drum-card absolute top-0 h-full overflow-hidden rounded-[30px] bg-[#1a1a1a] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]" aria-hidden={pos !== 0}
            style={{ ["--p" as string]: pos, ["--a" as string]: a, zIndex: 10 - a } as React.CSSProperties} onClick={() => pos !== 0 && go(j)}>
            <img {...pic(im)} sizes="60vw" alt="" className="h-full w-full object-cover" />
            {pos === 0 ? <Compare name={name} /> : <span className="absolute inset-0 bg-[rgb(17_17_17/0.15)]" />}
          </figure>); })}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-[linear-gradient(to_top,#111,transparent)]" />
        {/* Krea's prompt card, ours: what changes, in one line, over the bottom of the centre card. */}
        <div className="absolute bottom-0 left-1/2 z-30 w-[min(44vw,640px)] min-w-[300px] -translate-x-1/2 translate-y-[38%] rounded-[24px] bg-[rgb(34_34_34/0.86)] px-6 py-5 text-[16px] leading-[1.5] text-white/90 ring-1 ring-white/[.1] backdrop-blur-xl">
          {h2.why.cards[1][1]}<span className="mt-3 flex items-center gap-2 text-[13px] text-white/50"><img src="/brand/symbol-main.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" />{JOBS[i][0]}</span>
        </div>
        <button type="button" aria-label="Önceki" onClick={() => go(i - 1)} className="absolute start-4 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[rgb(24_24_24/0.7)] text-white ring-1 ring-white/10 backdrop-blur-md md:start-8"><ArrowRight size={15} aria-hidden="true" className="rotate-180" /></button>
        <button type="button" aria-label="Sonraki" onClick={() => go(i + 1)} className="absolute end-4 top-1/2 z-30 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-[rgb(24_24_24/0.7)] text-white ring-1 ring-white/10 backdrop-blur-md md:end-8"><ArrowRight size={15} aria-hidden="true" /></button>
      </div>
    </section>);
}

/* Our own industries block (four panels, the one under the pointer opens wide), only the type and chips in Krea style. */
const IND = [["Restoran ve kafeler", "sec-restoran", "62% 40%"], ["Üretim", "sec-uretim", "55% 40%"], ["Oteller", "sec-otel", "82% 30%"], ["Franchise'lar", "sec-franchise", "30% 40%"]] as const;
function Sectors() {
  const [act, setAct] = useState(0);
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="flex flex-wrap items-end justify-between gap-6"><Display a="Ayakta, elle, vardiyalı" b="çalışan ekipler için." center={false} className="kh-md" />
          <p className="max-w-[22rem] text-[16px] leading-[1.55] text-white/55">Sektörünüzü seçin, çekilen tek bir işin eğitime dönüşmesini görün.</p></div>
        <ul className="mt-12 hidden h-[clamp(440px,56vh,540px)] gap-3 lg:flex">
          {IND.map(([name, im, posn], k) => { const on = act === k; return (
            <li key={im} className="min-w-0 transition-[flex-grow] duration-700 ease-[var(--ease-out-expo)]" style={{ flexGrow: on ? 2.6 : 1, flexBasis: 0 }} onMouseEnter={() => setAct(k)}>
              <a href="/see-it/" className="relative flex h-full flex-col justify-end overflow-hidden rounded-[28px] bg-[#1a1a1a] p-6">
                <img {...pic(im)} sizes="50vw" alt="" style={{ objectPosition: posn }} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ${on ? "scale-100" : "scale-110"}`} />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0)_40%,rgb(16_16_16/0.9))]" />
                <span className="relative block">
                  <span className={`block font-semibold leading-tight tracking-[-0.04em] text-white transition-[font-size] duration-500 ${on ? "text-[30px]" : "text-[19px]"}`}>{name}</span>
                  <span className={`grid transition-[grid-template-rows,opacity] duration-700 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><span className="overflow-hidden">
                    <span className="block max-w-[30rem] pt-2 text-[15px] leading-[1.5] text-white/70">{h2.tabs[k][0]}</span>
                    <span className="mt-4 flex flex-wrap gap-1.5">{h2.tabs[k][1].map((u) => <span key={u} className="rounded-full bg-white/[.1] px-3 py-1.5 text-[13px] text-white/85 backdrop-blur-md">{u}</span>)}</span>
                  </span></span>
                </span>
              </a>
            </li>); })}
        </ul>
        <ul className="mt-8 grid grid-cols-2 gap-3 lg:hidden">{IND.map(([name, im, posn]) => <li key={im}><a href="/see-it/" className="relative flex aspect-[3/4] items-end overflow-hidden rounded-[22px] p-4"><img {...pic(im)} sizes="50vw" alt="" style={{ objectPosition: posn }} className="absolute inset-0 h-full w-full object-cover" /><span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(16_16_16/0.9))]" /><span className="relative text-[16px] font-semibold tracking-[-0.03em]">{name}</span></a></li>)}</ul>
      </div>
    </section>);
}

/* Apple-style framed media beside a big heading with a small pill label. */
function Split({ flip = false, pill, a, b, p, media }: { flip?: boolean; pill: string; a: string; b?: string; p: string; media: React.ReactNode }) {
  return (
    <section className="py-20 md:py-28">
      <div className={`mx-auto grid max-w-[1200px] items-center gap-10 px-5 md:grid-cols-2 md:gap-16 ${flip ? "md:[&>*:first-child]:order-last" : ""}`}>
        <div>
          <span className="inline-flex h-8 items-center rounded-full bg-white/[.07] px-3.5 text-[13.5px] font-medium text-white/80">{pill}</span>
          <Display a={a} b={b} center={false} className="mt-5 kh-md" />
          <p className="mt-6 max-w-[30rem] text-[17px] leading-[1.6] text-white/55">{p}</p>
        </div>
        <div className="frame">{media}</div>
      </div>
    </section>);
}

function Steps() {
  const s = h2.steps; const pick = [0, 1, 3, 4];
  const ui = [
    <div key="a" className="w-full rounded-[18px] bg-[#232323] p-3 ring-1 ring-white/[.06]"><div className="flex items-center gap-3 rounded-[12px] bg-white/[.06] p-2.5"><img {...pic("phone-mount")} sizes="80px" alt="" className="h-9 w-9 rounded-[9px] object-cover" /><span className="flex-1 text-[14px] text-white">Açılış rutini</span><Check size={15} aria-hidden="true" className="text-white/70" /></div><div className="mt-2 h-8 rounded-[10px] bg-white/[.04]" /></div>,
    <div key="b" className="w-full rounded-[18px] bg-[#232323] p-3 ring-1 ring-white/[.06]">{["1 · Ana şalteri aç", "2 · Basınç göstergesini kontrol et", "3 · Hava vanasını aç"].map((x) => <div key={x} className="mb-1.5 rounded-[10px] bg-white/[.05] px-3 py-2 text-[12.5px] text-white/80 last:mb-0">{x}</div>)}</div>,
    <div key="c" className="w-full rounded-[18px] bg-[#232323] p-3 ring-1 ring-white/[.06]"><p className="text-[13px] text-white/85">Bir tahtada çiğ tavuk hazırlandı. Sırada ne var?</p>{["A", "B", "C"].map((x, k) => <div key={x} className={`mt-1.5 flex items-center justify-between rounded-[10px] px-3 py-1.5 text-[12px] ${k === 1 ? "bg-[#EC6726]/20 text-white" : "bg-white/[.05] text-white/60"}`}><span className="h-1.5 w-24 rounded-full bg-white/20" />{x}</div>)}</div>,
    <div key="d" className="w-full rounded-[18px] bg-[#232323] p-3 ring-1 ring-white/[.06]">{[["Merkez", 92], ["Kadıköy", 74], ["Ankara", 58]].map(([x, v]) => <div key={x} className="mb-2 last:mb-0"><div className="flex justify-between text-[12px] text-white/70"><span>{x}</span><span>%{v}</span></div><div className="mt-1 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-[#F4F0EB]" style={{ width: `${v}%` }} /></div></div>)}</div>,
  ];
  return (
    <section className="py-20 md:py-28">
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-white/45">Nasıl çalışır</p>
      <Display a="Çekin, gönderin, kimin hazır olduğunu görün" className="mt-4 kh-md max-w-[22ch] px-5" />
      <div className="mx-auto mt-14 grid max-w-[1280px] gap-3 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {pick.map((k, j) => (
          <article key={k} className="overflow-hidden rounded-[28px] bg-[#191919] ring-1 ring-white/[.06]">
            <div className="grid h-[200px] place-items-center bg-[#1e1e1e] p-6">{ui[j]}</div>
            <div className="p-6"><p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white/40">Adım {j + 1}</p>
              <h3 className="mt-3 text-[20px] font-semibold leading-tight tracking-[-0.03em] text-white">{s[k][0]}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.55] text-white/55">{s[k][1]}</p></div>
          </article>))}
      </div>
    </section>);
}

function AppGrid() {
  return (
    <section className="py-20 md:py-28">
      <Display a="Tek uygulama." b="İşin tamamı." className="kh-md px-5" />
      <div className="mx-auto mt-14 grid max-w-[1200px] gap-3 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <a key={f.slug} href={`/features/${f.slug}/`} className="group flex items-center justify-between gap-4 rounded-[22px] bg-[#191919] p-5 ring-1 ring-white/[.06] transition-colors hover:bg-[#1e1e1e]">
            <span className="min-w-0"><span className="block text-[17px] font-semibold tracking-[-0.025em] text-white">{t.items[f.slug][0]}</span><span className="mt-1 block truncate text-[14px] text-white/50">{t.items[f.slug][1]}</span></span>
            <AppIcon slug={f.slug} icon={f.icon} size={48} />
          </a>))}
      </div>
    </section>);
}

function DarkCta() {
  return (
    <section className="px-5 py-20 md:py-28">
      <div className="relative mx-auto grid max-w-[1200px] overflow-hidden rounded-[36px] bg-[#161616] ring-1 ring-white/[.07] md:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-end p-8 md:p-14">
          <img src="/brand/symbol-main.svg" alt="" width={36} height={36} className="mb-auto h-9 w-9" />
          <Display a={h2.why.h} b={h2.why.h2} center={false} className="mt-16 kh-md" />
          <a href={SITE.demo} className="mt-8 grid min-h-11 w-max place-items-center"><span className="btn btn-cta !h-12 !min-h-12 !px-6 !text-[15px]">Demo isteyin</span></a>
        </div>
        <div className="relative h-[380px] md:h-auto md:min-h-[460px]">
          {[["huddle", "left-[6%] top-[10%] w-[46%] rotate-[-6deg]"], ["sec-uretim", "right-[4%] top-[4%] w-[44%] rotate-[5deg]"], ["sec-otel", "left-[24%] bottom-[-6%] w-[48%] rotate-[3deg]"]].map(([im, cls]) => (
            <img key={im} {...pic(im)} sizes="300px" alt="" className={`absolute aspect-[4/5] rounded-[20px] object-cover shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] ring-1 ring-white/10 ${cls}`} />))}
        </div>
      </div>
    </section>);
}

function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <section id="fiyat" className="relative isolate overflow-hidden py-24 md:py-32">
      <span aria-hidden="true" className="absolute right-[-10%] top-[-10%] -z-10 h-[620px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgb(236_103_38/0.35),transparent_75%)] blur-2xl" />
      <div className="mx-auto max-w-[1200px] px-5">
        <h2 className="kh kh-md text-[#F4F0EB]">Planınızı seçin</h2>
        <p className="mt-3 text-[17px] text-white/60">Kullanıcı sayısına göre fiyatlandırma. Aylık veya yıllık.</p>
        <div className="mt-8 inline-flex rounded-full bg-white/[.06] p-1.5 ring-1 ring-white/[.08]">
          {[["Aylık", false], ["Yıllık", true]].map(([l, v]) => <button key={String(l)} type="button" onClick={() => setYearly(v as boolean)} className={`min-h-11 rounded-full px-6 text-[15px] font-medium transition-colors ${yearly === v ? "bg-[#F4F0EB] text-[#111]" : "text-white/70"}`}>{l as string}</button>)}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => { const price = (yearly ? p.yearly : p.monthly)?.now; const save = yearly ? savePct(p) : null; const users = COMPARE.find((c) => c.f === "Users")?.v[PLANS.indexOf(p)];
            return (
            <div key={p.id} className="flex flex-col">
              <div className={`relative flex min-h-[300px] flex-1 flex-col rounded-[28px] p-7 ring-1 ${p.featured ? "bg-[linear-gradient(180deg,#242424,#171717_70%)] ring-white/[.16]" : "bg-[#161616] ring-white/[.07]"}`}>
                {p.featured && <span className="absolute inset-x-0 top-0 rounded-t-[28px] bg-white/[.07] py-1.5 text-center text-[12.5px] font-medium text-white/80">{p.badgeTr}</span>}
                <p className={`text-[28px] font-semibold tracking-[-0.04em] text-white ${p.featured ? "mt-5" : ""}`}>{p.name}</p>
                <p className="mt-1 text-[15px] text-white/60">{users} kullanıcı</p>
                <p className="mt-auto pt-10 text-[34px] font-semibold tracking-[-0.04em] text-white">{price ?? "Özel fiyat"}{price && <span className="text-[15px] font-normal text-white/45"> /ay</span>}</p>
              </div>
              <a href={p.id === "enterprise" ? SITE.demo : "/pricing/"} className={`mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-full text-[15px] font-semibold ${p.featured || p.id === "enterprise" ? "bg-[#F4F0EB] text-[#111]" : "bg-white/[.08] text-white"}`}>{p.id === "enterprise" ? "Satışla görüşün" : `${p.name} seçin`}<ArrowRight size={13} aria-hidden="true" /></a>
              <p className="mt-3 h-5 text-center text-[14px] text-white/55">{save ? <><b className="font-semibold text-white">%{save}</b> yıllık tasarruf</> : ""}</p>
            </div>); })}
        </div>
      </div>
    </section>);
}

function FinalCard() {
  return (
    <section className="px-5 py-20">
      <div className="relative mx-auto grid min-h-[480px] max-w-[1240px] place-items-center overflow-hidden rounded-[36px] text-center">
        <img {...pic("hero-uretim")} sizes="100vw" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-[rgb(17_17_17/0.62)]" />
        <div className="relative px-6">
          <Display a="Kendi işinizden bir örnekle görün" className="kh-md max-w-[18ch]" />
          <p className="mx-auto mt-5 max-w-[30rem] text-[17px] text-white/70">20 dakikalık görüşmede gerçek bir işinizi birlikte adım adım talimata çeviriyoruz.</p>
          <a href={SITE.demo} className="mx-auto mt-8 grid min-h-11 w-max place-items-center"><span className="inline-flex h-12 items-center rounded-full bg-[#F4F0EB] px-7 text-[15px] font-semibold text-[#111]">Demo isteyin</span></a>
        </div>
      </div>
    </section>);
}

/* Floating pill nav for the page's own sections, with the call to action beside it. */
function BottomNav() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(scrollY > innerHeight * 0.8); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  const items = [["Akış", "#akis"], ["Özellikler", "#ozellik"], ["Fiyatlar", "#fiyat"]];
  return (
    <div className={`fixed inset-x-0 bottom-5 z-40 hidden justify-center gap-2 transition-[opacity,transform] duration-500 md:flex ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <div className="flex rounded-full bg-[rgb(28_28_28/0.82)] p-1.5 ring-1 ring-white/[.1] backdrop-blur-xl">{items.map(([l, h]) => <a key={l} href={h} className="inline-flex h-11 items-center rounded-full px-5 text-[15px] text-white/70 hover:bg-white/[.07] hover:text-white">{l}</a>)}</div>
      <a href={SITE.demo} className="grid min-h-11 place-items-center"><span className="btn btn-cta !h-[56px] !min-h-[56px] !px-7 !text-[15px]">Demo isteyin</span></a>
    </div>);
}

export default function KreaProto() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="krea bg-[#111] text-white">
      <Header />
      <main id="main">
        <Hero />
        <div id="akis"><Arched /></div>
        <Sectors />
        <Split pill={t.now} a={t.items["video-to-sop"][0]} b="bir kez çekin, adım adım hazır" p={h2.steps[1][1]}
          media={<div className="relative grid aspect-[16/11] place-items-center overflow-hidden rounded-[30px] bg-[#0d0d0d] p-3 ring-1 ring-white/[.08] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
            <img {...pic("how-restoran")} sizes="50vw" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 blur-[2px]" />
            <div className="relative h-[86%]" style={{ aspectRatio: "440 / 956" }} dir="ltr"><Device max label="Flexlore"><WorkScreen active lang="tr" /></Device></div>
            <span className="absolute bottom-4 start-5 text-[13px] text-white/70">İlk adım</span><span className="absolute bottom-4 end-5 text-[13px] text-white/70">Son adım</span>
          </div>} />
        <Split flip pill={t.soon} a={t.items["web-panel"][0]} b="masadan atayın ve takip edin" p={FEAT_NAV.tr.lines.manage}
          media={<div className="overflow-hidden rounded-[30px] bg-[#0d0d0d] p-2.5 ring-1 ring-white/[.08] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]"><img src="/photos/cta-dashboard.webp" alt="" className="w-full rounded-[22px]" /></div>} />
        <Steps />
        <div id="ozellik"><AppGrid /></div>
        <DarkCta />
        <Pricing />
        <FinalCard />
      </main>
      <BottomNav />
    </div>);
}
