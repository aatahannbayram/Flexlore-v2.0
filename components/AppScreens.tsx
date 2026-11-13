"use client";
import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Lang } from "./copy";
import { playOnly, stopVideo } from "./media";
import { ArrowRight, CaretDown, Check, DotsThree, Play } from "./ui/icons";

/* Shared phone primitives + the screens the first paint needs (WorkScreen: hero front phone, Web section).
   Story-only screens (EditorScreen, LibraryScreen, QuizScreen, ReadyScreen) live in AppScreensStory.tsx and are
   loaded on demand with next/dynamic, so they stay out of the home route's initial JS. */

/* Design tokens (phone, 320pt design width), measured from the real app */
export const O = "#EC6726";
export const S0 = "#111111", S1 = "#161616", S2 = "#1A1A1A", S3 = "#222222";
export const G1 = "#8A8A8A", G2 = "#666666";
export const HL = "rgba(255,255,255,.07)";
export const ease = [0.22, 1, 0.36, 1] as const;
export const ic = { size: 15 } as const;
export const card = "rounded-[14px] border border-white/[.07] shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_1px_2px_rgba(0,0,0,.4),0_8px_24px_-12px_rgba(0,0,0,.6)]";
export type ScreenProps = { active: boolean; lang?: Lang; still?: Still; clip?: string };

/** Counts 0..max-1 every `ms` while `active`; resets to 0 when paused. */
export function useTick(active: boolean, ms: number, max: number) {
  const [n, setN] = useState(0);
  useEffect(() => { if (!active) { setN(0); return; } const id = setInterval(() => setN((v) => (v + 1) % max), ms); return () => clearInterval(id); }, [active, ms, max]);
  return n;
}
/** Muted loop from public/video. Plays only while `active` (page-wide registry caps concurrent loops). */
/** A still close-up of the scene behind the phone, so the screen and the stage show the same place. `at` is the focus
 *  point (object-position and zoom origin); it drifts in slowly while active, like a handheld clip. */
export type Still = { src: string; at: string };
export function StillClip({ still, active, className = "" }: { still: Still; active: boolean; className?: string }) {
  return (<div className="relative h-full w-full overflow-hidden">
    <img src={still.src} alt="" decoding="async" className={`h-full w-full object-cover transition-transform ease-out motion-reduce:transition-none ${active ? "scale-[1.75] duration-[6000ms]" : "scale-[1.6] duration-0"} ${className}`}
      style={{ objectPosition: still.at, transformOrigin: still.at }} /></div>);
}
export function Clip({ name, active, className = "", still }: { name: string; active: boolean; className?: string; still?: Still }) {
  if (still) return <StillClip still={still} active={active} className={className} />;
  return <VideoClip name={name} active={active} className={className} />;
}
function VideoClip({ name, active, className = "" }: { name: string; active: boolean; className?: string }) {
  const r = useRef<HTMLVideoElement>(null); const [ready, setReady] = useState(false);
  useEffect(() => { const v = r.current; if (!v) return; if (active) playOnly(v); else stopVideo(v); }, [active]);
  useEffect(() => () => { const v = r.current; if (v) stopVideo(v); }, []);
  return (<div className="relative h-full w-full">
    <video ref={r} muted loop playsInline preload="none" poster={`/video/${name}.webp`} onLoadedData={() => setReady(true)} className={`h-full w-full object-cover ${className}`}>
      <source src={`/video/${name}.webm`} type="video/webm" /><source src={`/video/${name}.mp4`} type="video/mp4" /></video>
    {active && !ready && <span className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/video/${name}.webp)` }} />}</div>);
}
/* iOS status bar */
export function Status() {
  return (<div className="flex h-[44px] shrink-0 items-center justify-between pl-[30px] pr-[24px] pt-[6px] text-sm font-semibold tracking-[-.01em] text-white tabular-nums">
    <span>9:41</span>
    <span className="flex items-center gap-[5px]">
      <svg width="17" height="11" viewBox="0 0 17 11" fill="#fff"><rect x="0" y="7" width="3" height="4" rx=".8"/><rect x="4.6" y="5" width="3" height="6" rx=".8"/><rect x="9.2" y="2.6" width="3" height="8.4" rx=".8"/><rect x="13.8" y="0" width="3" height="11" rx=".8"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="#fff"><path d="M7.5 2.3c2.2 0 4.2.9 5.6 2.3l1.1-1.1A9.5 9.5 0 0 0 7.5.7 9.5 9.5 0 0 0 .8 3.5l1.1 1.1a7.9 7.9 0 0 1 5.6-2.3Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.1-1.1a6.4 6.4 0 0 0-9 0L4.1 6.8c.9-.8 2.1-1.3 3.4-1.3Zm0 3.2a1.6 1.6 0 0 1 1.2.5L7.5 10.4 6.3 9.2a1.6 1.6 0 0 1 1.2-.5Z"/></svg>
      <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3.5" fill="none" stroke="#fff" strokeOpacity=".4"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#fff"/><path d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4Z" fill="#fff" fillOpacity=".45"/></svg>
    </span></div>);
}
/** Renders children at a fixed design width (320pt portrait, 693pt landscape) and scales them to the frame. */
export function Scaled({ children, base = 320 }: { children: React.ReactNode; base?: number }) {
  const r = useRef<HTMLDivElement>(null); const [k, setK] = useState(1); const [h, setH] = useState(0);
  useEffect(() => { const el = r.current; if (!el) return; const ro = new ResizeObserver(() => { const kk = el.clientWidth / base; setK(kk); setH(el.clientHeight / kk); }); ro.observe(el); return () => ro.disconnect(); }, [base]);
  return (<div ref={r} className="relative h-full w-full overflow-hidden rounded-[var(--scr-r,2.55rem)] bg-bg [isolation:isolate]">
    <div className="absolute left-0 top-0 origin-top-left font-sans antialiased [font-feature-settings:'cv11','ss01']" style={{ width: base, height: h || "100%", transform: `scale(${k})` }}>{children}</div></div>);
}
/** iPhone frame, drawn in CSS (no Apple artwork: Apple's bezels are licensed only for Apple-only apps, not websites).
 *  Proportions follow the iPhone 16/17 Pro Max: 440 x 956 pt, display corner about 12.5% of the width, a thin titanium
 *  band with a polished edge, antenna lines, Action button and volume on the left, side button and Camera Control on the
 *  right, a black bezel, the Dynamic Island and a faint glass reflection. `max` is Desert Titanium; without it, black
 *  titanium at 393 x 852 pt. All sizes are in cqw so the frame stays sharp at any width. */
const RIM = {
  max: { band: "linear-gradient(150deg,#efe2cf 0%,#c3ab8f 14%,#8a7660 34%,#6b5c4b 52%,#8f7b65 72%,#cdb79c 90%,#f1e5d3 100%)",
    btn: "linear-gradient(90deg,#6b5c4b,#d2bea4 45%,#8a7660)", gap: "#5a4d3f" },
  std: { band: "linear-gradient(150deg,#6c6c70 0%,#3e3e42 18%,#26262a 45%,#333337 70%,#5c5c61 90%,#77777c 100%)",
    btn: "linear-gradient(90deg,#2a2a2d,#6a6a6f 45%,#333336)", gap: "#18181a" },
};
export function Device({ children, label, max = false }: { children: React.ReactNode; label: string; max?: boolean }) {
  const r = max ? RIM.max : RIM.std;
  const key = (side: "l" | "r", top: string, h: string) => (
    <span aria-hidden="true" className={`absolute w-[0.95cqw] ${side === "l" ? "-left-[0.6cqw] rounded-l-[0.6cqw]" : "-right-[0.6cqw] rounded-r-[0.6cqw]"} shadow-[0_0.3cqw_0.6cqw_rgb(0_0_0/0.35)]`}
      style={{ top, height: h, background: r.btn }} />);
  const gap = (pos: string) => <span aria-hidden="true" className={`absolute h-[0.9cqw] w-[1.15cqw] ${pos}`} style={{ background: r.gap }} />;
  return (<div role="img" aria-label={label} className={`dark relative w-full [container-type:inline-size] ${max ? "aspect-[440/956]" : "aspect-[393/852]"}`} style={{ ["--scr-r" as string]: "12.5cqw" }}>
    {key("l", "17.5%", "3.6%")}{key("l", "24.5%", "6.8%")}{key("l", "33%", "6.8%")}{key("r", "27%", "10.5%")}{key("r", "52%", "5.4%")}
    {/* Titanium band: polished edge (inset highlight), darker inner lip, soft contact shadow. */}
    <div className="absolute inset-0 rounded-[15.2cqw] p-[1.15cqw] shadow-[inset_0_0_0_0.3cqw_rgb(255_255_255/0.35),inset_0_0.4cqw_0.5cqw_rgb(255_255_255/0.35),inset_0_-0.4cqw_0.6cqw_rgb(0_0_0/0.35),0_0_0_0.25cqw_rgb(0_0_0/0.55)]"
      style={{ background: r.band }}>
      {gap("left-0 top-[8.5%]")}{gap("right-0 top-[8.5%]")}{gap("left-0 bottom-[8.5%]")}{gap("right-0 bottom-[8.5%]")}
      <div className="relative h-full w-full rounded-[14.05cqw] bg-[#020203] p-[1.55cqw] shadow-[inset_0_0_0_0.25cqw_rgb(0_0_0/0.9),inset_0_0_0_0.5cqw_rgb(255_255_255/0.05)]">
        <Scaled base={max ? 344 : 320}>
          {children}
          <div className="absolute left-1/2 top-[11px] z-30 flex h-[30px] w-[98px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[11px] shadow-[0_0_0_.5px_rgba(255,255,255,.05)]"><span className="h-[10px] w-[10px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#3a3632_0%,#0d0c0b_55%,#000_100%)] ring-1 ring-white/[.06]" /></div>
          <div className="absolute bottom-[8px] left-1/2 z-30 h-[5px] w-[124px] -translate-x-1/2 rounded-full bg-white/90 mix-blend-difference" />
        </Scaled>
        {/* Glass: one faint diagonal sheen over the screen, never over the content's contrast. */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-[1.55cqw] z-40 rounded-[var(--scr-r)] bg-[linear-gradient(118deg,rgb(255_255_255/0.07)_0%,rgb(255_255_255/0.02)_28%,transparent_42%)]" />
      </div>
    </div>
  </div>);
}

/* ---------- primitives ---------- */
/** App header: back arrow (+ optional label) on the left, centred title, icons on the right, hairline below. */
export function Nav({ left, title, right }: { left?: React.ReactNode; title?: string; right?: React.ReactNode }) {
  return (<div className="relative flex h-[44px] shrink-0 items-center px-3.5 text-white" style={{ borderBottom: `1px solid ${HL}` }}>
    <span className="flex min-w-[60px] items-center gap-2 text-base tracking-[-.01em] text-white/90">{left ?? <BackArrow />}</span>
    {title && <span className="absolute left-1/2 max-w-[50%] -translate-x-1/2 truncate text-[15px] font-medium tracking-[-.01em]">{title}</span>}
    <span className="ml-auto flex items-center gap-4 text-white/85">{right}</span></div>);
}
export const BackArrow = () => <ArrowRight size={19} className="rotate-180 text-white/85" />;
export const Kebab = ({ size = 18, className = "" }: { size?: number; className?: string }) => <DotsThree size={size} className={`rotate-90 ${className}`} />;
export function Bar({ v, h = 4 }: { v: number; h?: number }) {
  return (<span className="relative block flex-1 overflow-hidden rounded-full bg-white/[.08]" style={{ height: h }}>
    <m.span className="absolute inset-y-0 left-0 rounded-full" style={{ background: O }} initial={false} animate={{ width: `${v * 100}%` }} transition={{ duration: .8, ease }} /></span>);
}
export function Toast({ show, text, sub }: { show: boolean; text: string; sub?: string }) {
  return (<AnimatePresence>{show && <m.div initial={{ y: -40, opacity: 0, scale: .9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -30, opacity: 0, scale: .95 }} transition={{ type: "spring", stiffness: 380, damping: 30 }}
    className="absolute left-1/2 top-[48px] z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#1f1f22]/95 py-1.5 pl-1.5 pr-3.5 shadow-[0_10px_30px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.06)]">
    <span className="grid h-6 w-6 place-items-center rounded-full bg-flame"><Check size={13} className="text-[#111111]" /></span>
    <span className="leading-tight"><span className="block text-xs font-semibold text-white">{text}</span>{sub && <span className="block text-xs text-white/50">{sub}</span>}</span></m.div>}</AnimatePresence>);
}
export const mm = (x: number) => `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(Math.floor(x) % 60).padStart(2, "0")}`;
/* Player controls, measured from the real app: played part #E4E4E4 to #949494, rest #545454, ringed thumb */
export function Track({ v }: { v: number }) {
  const left = `${Math.min(v, 1) * 100}%`, tr = { duration: .9, ease: "linear" } as const;
  return (<span className="relative h-[3px] flex-1 rounded-full bg-[#545454]">
    <m.span className="absolute inset-y-0 left-0 rounded-full" style={{ background: "linear-gradient(90deg,#E4E4E4,#949494)" }} initial={false} animate={{ width: left }} transition={tr} />
    <m.span className="absolute top-1/2 h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#B2B2B2] bg-[#111111]" initial={false} animate={{ left }} transition={tr} /></span>);
}
export function Player({ t, d = 12, text, more = "Read more...", playing = false }: { t: number; d?: number; text?: string; more?: string; playing?: boolean }) {
  return (<div><div className="flex items-center gap-2.5 text-xs tabular-nums text-white">
    <span className="grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full ring-[1.5px] ring-white">{playing
      ? <span aria-hidden="true" className="flex gap-[2.5px]"><span className="h-[8px] w-[2.5px] rounded-full bg-white" /><span className="h-[8px] w-[2.5px] rounded-full bg-white" /></span>
      : <Play size={9} weight="fill" className="ml-px" />}</span>
    <span>{mm(t)}</span><Track v={t / d} /><span>{mm(d)}</span></div>
    {text && <p className="mt-2 text-xs leading-[1.45] text-[#B2B2B2]">{text} <span className="font-medium text-white">{more}</span></p>}</div>);
}
/** Round chevron button used on collapsible cards. */
export const Chev = ({ open = true }: { open?: boolean }) => (
  <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full" style={{ background: S3 }}>
    <CaretDown size={13} className={`text-white/70 transition-transform duration-500 ${open ? "" : "-rotate-90"}`} /></span>);
/** Centred white play ring drawn over step videos. */
export const PlayRing = () => (<span className="grid h-[38px] w-[38px] place-items-center rounded-full ring-[2.5px] ring-white/90"><Play size={15} weight="fill" className="ml-0.5 text-white" /></span>);
/** Orange OUTLINE check circle (the app's step-complete mark); `on` draws the tick. */
export function CheckRing({ on, reduce }: { on: boolean; reduce?: boolean | null }) {
  return (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0">
    <circle cx="11" cy="11" r="9.6" stroke={on ? O : "rgba(255,255,255,.18)"} strokeWidth="1.6" style={{ transition: "stroke .4s" }} />
    <m.path d="M6.8 11.3 9.7 14.1 15.3 8.3" stroke={O} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ duration: reduce ? 0 : .45, ease }} /></svg>);
}

/* ---------- Real screen: Work detail (standard work viewer) ---------- */
const WS = {
  en: { back: "Back", title: "Opening routine", op: "Operator 1", steps: "Standard Work Steps", desc: "Description",
    list: [["Switch on the main power", "Turn the main switch on the control panel to ON and wait for the green light.", "line"],
      ["Check the pressure gauge", "The needle should sit in the green band before you go on.", "warehouse"],
      ["Open the air valve", "Turn the valve a slow quarter turn until the line holds pressure.", "steam"]],
    more: ["Start the compressor", "Log the start time", "Hand over to the next shift"] },
  tr: { back: "Geri", title: "Açılış rutini", op: "Operatör 1", steps: "Standart İş Adımları", desc: "Açıklama",
    list: [["Ana şalteri aç", "Kontrol panelindeki ana şalteri AÇIK konumuna getir ve yeşil ışığı bekle.", "line"],
      ["Basınç göstergesini kontrol et", "Devam etmeden önce ibre yeşil bölgede olmalı.", "warehouse"],
      ["Hava vanasını aç", "Hat basıncı tutana kadar vanayı yavaşça çeyrek tur çevir.", "steam"]],
    more: ["Kompresörü çalıştır", "Başlangıç saatini kaydet", "Sonraki vardiyaya devret"] },
} as const;
/* Film: each step opens in turn (its clip plays, the scrubber runs), its check ticks, then the next opens.
   One loop = 15 ticks of 1 s. Reduced motion or inactive: a still of step 1 open. */
const STEP_T = 4, LOOP = 15;
export function WorkScreen({ active, lang = "en", onStep }: ScreenProps & { onStep?: (k: number, done: number) => void }) {
  const L = WS[lang]; const reduce = useReducedMotion(); const run = active && !reduce;
  const n = useTick(run, 1000, LOOP);
  const k = run ? Math.min(Math.floor(n / STEP_T), 2) : 0;           // open step
  const within = run ? n - k * STEP_T : 0;                           // seconds into the open step
  const end = run && n >= STEP_T * 3;                                // all done: scroll back to the top
  const done = (i: number) => run ? (i < k || (i === k && within >= 3) || end) : !!reduce;
  const count = [0, 1, 2].filter((i) => done(i)).length;          // steps watched, of 6
  // Tell the page which step is open and how many are ticked (the home hero follows it with the same scene).
  useEffect(() => { onStep?.(k, count); }, [k, count, onStep]);
  // Scroll so the open step sits near the top: steps above it are collapsed cards of 50pt + 10pt gap.
  const first = useRef<HTMLDivElement>(null); const [top0, setTop0] = useState(300);
  useEffect(() => { if (first.current) setTop0(first.current.offsetTop); }, [lang]);
  const y = !run || end || k === 0 ? 0 : -Math.max(0, top0 + (k - 1) * 60 - 8);
  return (<div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: S0 }}>
    <Status /><Nav left={<><BackArrow /><span className="text-[15px] text-white/90">{L.back}</span></>} title={L.title} right={<Kebab />} />
    {/* Progress (steps watched): fixed under the header, as in the app */}
    <div className="relative z-10 px-3 pb-1 pt-3" style={{ background: S0 }}><div className="flex items-center gap-4 rounded-[16px] px-4 py-3" style={{ background: S1 }}><Bar v={Math.min(count + 1, 6) / 6} h={3} /><span className="text-[12.5px] tabular-nums text-white/60">{Math.min(count + 1, 6)}/6</span></div></div>
    <div className="relative flex-1 overflow-hidden">
      <m.div className="relative px-3 pb-10 pt-2" initial={false} animate={{ y }} transition={{ duration: reduce ? 0 : 1.1, ease }}>
        {/* Operator */}
        <div className="flex items-center rounded-[16px] px-4 py-3.5 text-[14px] text-white" style={{ background: S1 }}>
          <span className="flex-1">{L.op}</span><CaretDown size={11} weight="fill" className="text-white/85" /></div>
        {/* Steps */}
        <p className="mt-4 pl-1 text-[13.5px]" style={{ color: "#BDBDBD" }}>{L.steps}</p>
        {L.list.map(([title, desc, clip], i) => { const open = i === k; return (
          <div key={i} ref={i === 0 ? first : undefined} className="mt-2.5 rounded-[16px] px-3 py-3" style={{ background: S1 }}>
            <div className="flex items-center gap-2.5"><Chev open={open} />
              <span className={`flex-1 text-[13.5px] leading-[1.3] tracking-[-.005em] text-white ${open ? "" : "truncate"}`}>{i + 1} <span className="text-white/50">•</span> {title}</span><CheckRing on={done(i)} reduce={reduce} /></div>
            <m.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduce ? 0 : .6, ease }} className="overflow-hidden">
              <div className="relative mt-3 h-[188px] overflow-hidden rounded-[14px] bg-black">
                {open ? <Clip name={clip} active={run} /> : <span className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/video/${clip}.webp)` }} />}
                <AnimatePresence initial={false}>{!(run && open && within >= 1) &&
                  <m.span key="ring" initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: .35 }} className="absolute inset-0 grid place-items-center bg-black/10"><PlayRing /></m.span>}</AnimatePresence>
                {run && open && <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2.5 pb-2 pt-6"><Player t={Math.min(Math.max(within - 1, 0) * 4, 12)} playing={within >= 1 && within < 4} /></span>}
              </div>
              <p className="mt-2.5 text-[11.5px]" style={{ color: G1 }}>{L.desc}</p>
              <p className="mt-1 text-[12.5px] leading-[1.4] text-white/90">{desc}</p>
            </m.div>
          </div>); })}
        {L.more.map((title, j) => <div key={title} className="mt-2.5 flex items-center gap-2.5 rounded-[16px] px-3 py-3" style={{ background: S1 }}><Chev open={false} />
          <span className="flex-1 truncate text-[13.5px] leading-[1.3] text-white">{j + 4} <span className="text-white/50">•</span> {title}</span><CheckRing on={false} /></div>)}
      </m.div>
    </div></div>);
}
/** @deprecated alias kept for older imports: the work viewer is now WorkScreen. */
export const SopScreen = WorkScreen;
