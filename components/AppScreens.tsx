"use client";
import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Lang } from "./copy";
import { playOnly, stopVideo } from "./media";
import { ArrowRight, CaretDown, Check, DotsThree, Info, Play } from "./ui/icons";

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
export type ScreenProps = { active: boolean; lang?: Lang };

/** Counts 0..max-1 every `ms` while `active`; resets to 0 when paused. */
export function useTick(active: boolean, ms: number, max: number) {
  const [n, setN] = useState(0);
  useEffect(() => { if (!active) { setN(0); return; } const id = setInterval(() => setN((v) => (v + 1) % max), ms); return () => clearInterval(id); }, [active, ms, max]);
  return n;
}
/** Muted loop from public/video. Plays only while `active` (page-wide registry caps concurrent loops). */
export function Clip({ name, active, className = "" }: { name: string; active: boolean; className?: string }) {
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
  return (<div ref={r} className="relative h-full w-full overflow-hidden rounded-[2.55rem] bg-bg [isolation:isolate]">
    <div className="absolute left-0 top-0 origin-top-left font-sans antialiased [font-feature-settings:'cv11','ss01']" style={{ width: base, height: h || "100%", transform: `scale(${k})` }}>{children}</div></div>);
}
/** iPhone 15 Pro-style frame: titanium rim, inner black bezel, Dynamic Island. */
export function Device({ children, label }: { children: React.ReactNode; label: string }) {
  const btn = "absolute w-[3px] bg-[#3b3b3e]";
  return (<div role="img" aria-label={label} className="relative aspect-[393/852] w-full">
    <span className={`${btn} -left-[2px] top-[16%] h-[4%] rounded-l-sm`} /><span className={`${btn} -left-[2px] top-[23%] h-[7.5%] rounded-l-sm`} /><span className={`${btn} -left-[2px] top-[32%] h-[7.5%] rounded-l-sm`} /><span className={`${btn} -right-[2px] top-[26%] h-[11%] rounded-r-sm`} />
    <div className="absolute inset-0 rounded-[3.2rem] bg-[#2a2a2d] p-[2.5px] ring-1 ring-white/10">
      <div className="h-full w-full rounded-[3.05rem] bg-[#050506] p-[1px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]">
        <div className="h-full w-full rounded-[3rem] bg-black p-[8px]">
          <Scaled>
            {children}
            <div className="absolute left-1/2 top-[11px] z-30 flex h-[29px] w-[96px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[10px] shadow-[0_0_0_.5px_rgba(255,255,255,.04)]"><span className="h-[9px] w-[9px] rounded-full bg-bg2 ring-1 ring-white/[.04]" /></div>
            <div className="absolute bottom-[8px] left-1/2 z-30 h-[5px] w-[124px] -translate-x-1/2 rounded-full bg-white/90 mix-blend-difference" />
          </Scaled></div></div></div>
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
    className="absolute left-1/2 top-[48px] z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#1f1f22]/95 py-1.5 pl-1.5 pr-3.5 shadow-[0_10px_30px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur">
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
export function Player({ t, d = 12, text, more = "Read more..." }: { t: number; d?: number; text?: string; more?: string }) {
  return (<div><div className="flex items-center gap-2.5 text-xs tabular-nums text-white">
    <span className="grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full ring-[1.5px] ring-white"><Play size={9} weight="fill" className="ml-px" /></span>
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
  en: { title: "Opening routine", od: "Orientation data", hint: "Who on the team has watched this work and passed its quiz.", watched: "Watched", quiz: "Quiz", eq: "Edit quiz", det: "Orientation details",
    steps: "Standard work steps", es: "Edit steps", desc: "Description",
    list: [["Switch on the main power", "Turn the main switch on the control panel to ON and wait for the green light.", "line"],
      ["Check the pressure gauge", "The needle should sit in the green band before you go on.", "warehouse"],
      ["Open the air valve", "Turn the valve a slow quarter turn until the line holds pressure.", "steam"]],
    more: ["Start the compressor", "Log the start time"] },
  tr: { title: "Açılış rutini", od: "Oryantasyon Verisi", hint: "Bu işi izleyen ve quizini geçen ekip üyeleri.", watched: "İzledi", quiz: "Quiz", eq: "Quizi Düzenle", det: "Oryantasyon Detayları",
    steps: "Standart İş Adımları", es: "Adımları Düzenle", desc: "Açıklama",
    list: [["Ana şalteri aç", "Kontrol panelindeki ana şalteri AÇIK konumuna getir ve yeşil ışığı bekle.", "line"],
      ["Basınç göstergesini kontrol et", "Devam etmeden önce ibre yeşil bölgede olmalı.", "warehouse"],
      ["Hava vanasını aç", "Hat basıncı tutana kadar vanayı yavaşça çeyrek tur çevir.", "steam"]],
    more: ["Kompresörü çalıştır", "Başlangıç saatini kaydet"] },
} as const;
/* Film: each step opens in turn (its clip plays, the scrubber runs), its check ticks, then the next opens.
   One loop = 15 ticks of 1 s. Reduced motion or inactive: a still of step 1 open. */
const STEP_T = 4, LOOP = 15;
export function WorkScreen({ active, lang = "en" }: ScreenProps) {
  const L = WS[lang]; const reduce = useReducedMotion(); const run = active && !reduce;
  const n = useTick(run, 1000, LOOP);
  const k = run ? Math.min(Math.floor(n / STEP_T), 2) : 0;           // open step
  const within = run ? n - k * STEP_T : 0;                           // seconds into the open step
  const end = run && n >= STEP_T * 3;                                // all done: scroll back to the top
  const done = (i: number) => run ? (i < k || (i === k && within >= 3) || end) : !!reduce;
  const watched = run ? 7 + [0, 1, 2, 3].filter((i) => i < 3 && done(i)).length : reduce ? 10 : 7;
  // Scroll so the open step sits near the top: steps above it are collapsed cards of 50pt + 10pt gap.
  const first = useRef<HTMLDivElement>(null); const [top0, setTop0] = useState(300);
  useEffect(() => { if (first.current) setTop0(first.current.offsetTop); }, [lang]);
  const y = !run || end || k === 0 ? 0 : -Math.max(0, top0 + k * 60 - 40);
  return (<div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: S0 }}>
    <Status /><Nav title={L.title} />
    <div className="relative flex-1 overflow-hidden">
      <m.div className="relative px-3 pb-10 pt-3" initial={false} animate={{ y }} transition={{ duration: reduce ? 0 : 1.1, ease }}>
        {/* Orientation data */}
        <div className="rounded-[16px] px-3.5 pb-3.5 pt-3" style={{ background: S1 }}>
          <div className="flex items-center gap-2.5 text-[15px] text-white"><Chev />{L.od}<Info size={15} className="text-white/45" /></div>
          <p className="mt-2 text-[11.5px] leading-[1.4]" style={{ color: G1 }}>{L.hint}</p>
          {([[L.watched, watched], [L.quiz, Math.max(watched - 2, 0)]] as const).map(([lab, v]) => <div key={lab} className="mt-2.5 flex items-center gap-3 text-[11.5px] tabular-nums" style={{ color: G1 }}>
            <span className="w-11">{lab}</span>
            <span className="relative h-[3px] flex-1 rounded-full" style={{ background: S3 }}><m.span className="absolute inset-y-0 left-0 rounded-full bg-white/55" initial={false} animate={{ width: `${(v / 12) * 100}%` }} transition={{ duration: reduce ? 0 : .8, ease }} /></span>
            <span className="w-8 text-right font-medium text-white/85">{v}/12</span></div>)}
          <div className="mt-3 flex gap-2 text-[12px]">
            <span className="flex-1 rounded-full py-[9px] text-center text-white" style={{ background: S3 }}>{L.eq}</span>
            <span className="flex-1 rounded-full py-[9px] text-center text-white" style={{ background: O }}>{L.det}</span></div>
        </div>
        {/* Operator */}
        <div className="mt-2.5 flex items-center rounded-[16px] px-3.5 py-3 text-[14px] text-white" style={{ background: S1 }}>
          <span className="flex-1">Operator 1</span><CaretDown size={11} weight="fill" className="text-white/85" /></div>
        {/* Steps */}
        <div className="mt-3 flex items-center justify-between"><span className="pl-0.5 text-[14px]" style={{ color: "#BDBDBD" }}>{L.steps}</span>
          <span className="rounded-full px-3.5 py-[7px] text-[12px] text-white" style={{ background: S3 }}>{L.es}</span></div>
        {L.list.map(([title, desc, clip], i) => { const open = i === k; return (
          <div key={i} ref={i === 0 ? first : undefined} className="mt-2.5 rounded-[16px] px-3 py-3" style={{ background: S1 }}>
            <div className="flex items-center gap-2.5"><Chev open={open} />
              <span className="flex-1 text-[13.5px] leading-[1.3] tracking-[-.005em] text-white">{i + 1} - {title}</span><CheckRing on={done(i)} reduce={reduce} /></div>
            <m.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduce ? 0 : .6, ease }} className="overflow-hidden">
              <div className="relative mt-3 h-[168px] overflow-hidden rounded-[14px] bg-black">
                {open ? <Clip name={clip} active={run} /> : <span className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/video/${clip}.webp)` }} />}
                <AnimatePresence initial={false}>{!(run && open && within >= 1 && within < 3) &&
                  <m.span key="ring" initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: .35 }} className="absolute inset-0 grid place-items-center bg-black/10"><PlayRing /></m.span>}</AnimatePresence>
                {run && open && <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2.5 pb-2 pt-6"><Player t={Math.min(within * 4, 12)} /></span>}
              </div>
              <p className="mt-2.5 text-[11.5px]" style={{ color: G1 }}>{L.desc}</p>
              <p className="mt-1 text-[12.5px] leading-[1.4] text-white/90">{desc}</p>
            </m.div>
          </div>); })}
        {L.more.map((title, j) => <div key={title} className="mt-2.5 flex items-center gap-2.5 rounded-[16px] px-3 py-3" style={{ background: S1 }}><Chev open={false} />
          <span className="flex-1 text-[13.5px] leading-[1.3] text-white">{j + 4} - {title}</span><CheckRing on={false} /></div>)}
      </m.div>
    </div></div>);
}
/** @deprecated alias kept for older imports: the work viewer is now WorkScreen. */
export const SopScreen = WorkScreen;
