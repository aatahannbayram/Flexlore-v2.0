"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playOnly, stopVideo } from "./media";
import { ChevronLeft, ChevronRight, ChevronsUpDown, MoreHorizontal, ListOrdered, Maximize2, Undo2, Redo2, Play, Pause, Sticker, Type, Eye, EyeOff, Check, CircleCheck, Info, Scissors } from "lucide-react";
/* Design tokens (phone, 320pt design width) */
const O = "#EC6726";
const S0 = "#111111", S1 = "#161618", S2 = "#1f1f22";
const HL = "rgba(255,255,255,.07)";
const ease = [0.22, 1, 0.36, 1] as const;
const ic = { size: 15, strokeWidth: 1.5, absoluteStrokeWidth: true } as const;
const card = "rounded-[14px] border border-white/[.07] shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_1px_2px_rgba(0,0,0,.4),0_8px_24px_-12px_rgba(0,0,0,.6)]";

function useTick(active: boolean, ms: number, max: number) {
  const [n, setN] = useState(0);
  useEffect(() => { if (!active) { setN(0); return; } const id = setInterval(() => setN((v) => (v + 1) % max), ms); return () => clearInterval(id); }, [active, ms, max]);
  return n;
}
function Clip({ name, active, className = "" }: { name: string; active: boolean; className?: string }) {
  const r = useRef<HTMLVideoElement>(null); const [ready, setReady] = useState(false);
  useEffect(() => { const v = r.current; if (!v) return; if (active) playOnly(v); else stopVideo(v); }, [active]);
  return (<div className="relative h-full w-full">
    <video ref={r} muted loop playsInline preload="none" poster={`/video/${name}.jpg`} onLoadedData={() => setReady(true)} className={`h-full w-full object-cover ${className}`}>
      <source src={`/video/${name}.webm`} type="video/webm" /><source src={`/video/${name}.mp4`} type="video/mp4" /></video>
    {active && !ready && <span className="absolute inset-0 bg-[#161618]" />}</div>);
}
/* iOS 17 status bar */
function Status() {
  return (<div className="flex h-[44px] items-center justify-between pl-[30px] pr-[24px] pt-[6px] text-sm font-semibold tracking-[-.01em] text-white tabular-nums">
    <span>9:41</span>
    <span className="flex items-center gap-[5px]">
      <svg width="17" height="11" viewBox="0 0 17 11" fill="#fff"><rect x="0" y="7" width="3" height="4" rx=".8"/><rect x="4.6" y="5" width="3" height="6" rx=".8"/><rect x="9.2" y="2.6" width="3" height="8.4" rx=".8"/><rect x="13.8" y="0" width="3" height="11" rx=".8"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="#fff"><path d="M7.5 2.3c2.2 0 4.2.9 5.6 2.3l1.1-1.1A9.5 9.5 0 0 0 7.5.7 9.5 9.5 0 0 0 .8 3.5l1.1 1.1a7.9 7.9 0 0 1 5.6-2.3Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.1-1.1a6.4 6.4 0 0 0-9 0L4.1 6.8c.9-.8 2.1-1.3 3.4-1.3Zm0 3.2a1.6 1.6 0 0 1 1.2.5L7.5 10.4 6.3 9.2a1.6 1.6 0 0 1 1.2-.5Z"/></svg>
      <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3.5" fill="none" stroke="#fff" strokeOpacity=".4"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#fff"/><path d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4Z" fill="#fff" fillOpacity=".45"/></svg>
    </span></div>);
}
const BASE = 320;
function Scaled({ children }: { children: React.ReactNode }) {
  const r = useRef<HTMLDivElement>(null); const [k, setK] = useState(1); const [h, setH] = useState(0);
  useEffect(() => { const el = r.current; if (!el) return; const ro = new ResizeObserver(() => { const kk = el.clientWidth / BASE; setK(kk); setH(el.clientHeight / kk); }); ro.observe(el); return () => ro.disconnect(); }, []);
  return (<div ref={r} className="relative h-full w-full overflow-hidden rounded-[2.55rem] bg-bg [isolation:isolate]">
    <div className="absolute left-0 top-0 origin-top-left font-sans antialiased [font-feature-settings:'cv11','ss01']" style={{ width: BASE, height: h || "100%", transform: `scale(${k})` }}>{children}</div></div>);
}
/** iPhone 15 Pro-style frame: brushed titanium rim, inner black bezel, Dynamic Island, glass reflection. */
export function Device({ children, label }: { children: React.ReactNode; label: string }) {
  const btn = "absolute w-[3px] bg-[#3b3b3e]";
  return (<div role="img" aria-label={label} className="relative aspect-[393/852] w-full">
    <span className={`${btn} -left-[2px] top-[16%] h-[4%] rounded-l-sm`} /><span className={`${btn} -left-[2px] top-[23%] h-[7.5%] rounded-l-sm`} /><span className={`${btn} -left-[2px] top-[32%] h-[7.5%] rounded-l-sm`} /><span className={`${btn} -right-[2px] top-[26%] h-[11%] rounded-r-sm`} />
    {/* titanium rim */}
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
function Nav({ left, title, right }: { left?: React.ReactNode; title: string; right?: React.ReactNode }) {
  return (<div className="relative flex h-[44px] items-center px-3 text-white">
    <span className="flex min-w-[60px] items-center text-base tracking-[-.01em] text-white/90">{left}</span>
    <span className="absolute left-1/2 max-w-[54%] -translate-x-1/2 truncate text-base font-semibold tracking-[-.02em]">{title}</span>
    <span className="ml-auto flex items-center gap-3 text-white/80">{right ?? <MoreHorizontal {...ic} size={18} />}</span></div>);
}
const Back = ({ t = "Back" }: { t?: string }) => <><ChevronLeft size={22} strokeWidth={1.75} absoluteStrokeWidth className="-ml-1.5" /><span className="-ml-0.5">{t}</span></>;
function Bar({ v, h = 4 }: { v: number; h?: number }) {
  return (<span className="relative block flex-1 overflow-hidden rounded-full bg-white/[.08]" style={{ height: h }}>
    <motion.span className="absolute inset-y-0 left-0 rounded-full shadow-[0_0_0_.5px_rgba(255,255,255,.15)_inset]" style={{ background: `linear-gradient(90deg,#EC6726,${O} 60%,#EC6726)` }} initial={false} animate={{ width: `${v * 100}%` }} transition={{ duration: .8, ease }} /></span>);
}
function Ring({ v, size = 34, sw = 3.5, children }: { v: number; size?: number; sw?: number; children?: React.ReactNode }) {
  const r = (size - sw) / 2, c = 2 * Math.PI * r;
  return (<span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
    <svg width={size} height={size} className="-rotate-90"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EC6726" /><stop offset="1" stopColor="#EC6726" /></linearGradient></defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={sw} />
      <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#rg)" strokeWidth={sw} strokeLinecap="round" strokeDasharray={c} initial={false} animate={{ strokeDashoffset: c * (1 - v) }} transition={{ duration: 1, ease }} /></svg>
    <span className="absolute text-xs font-semibold tabular-nums text-white">{children}</span></span>);
}
function Seg({ items, i }: { items: string[]; i: number }) {
  return (<div className="relative flex rounded-[10px] bg-white/[.06] p-[2px] text-sm font-medium">
    {items.map((x, k) => <span key={x} className={`relative z-10 flex-1 py-[6px] text-center tracking-[-.01em] ${k === i ? "text-white" : "text-white/55"}`}>{k === i && <motion.span layoutId={`seg${items[0]}`} className="absolute inset-0 -z-10 rounded-[8px] bg-[#2c2c30] shadow-[0_1px_0_rgba(255,255,255,.08)_inset,0_2px_6px_rgba(0,0,0,.4)]" />}{x}</span>)}</div>);
}
function Picker({ label, value }: { label: string; value: string }) {
  return (<div className={`flex items-center gap-2.5 px-3 py-2.5 ${card}`} style={{ background: S1 }}>
    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#2a2a2d] text-xs font-semibold text-white ring-1 ring-white/10">{value.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</span>
    <span className="flex-1 leading-tight"><span className="block text-xs text-white/45">{label}</span><span className="block text-sm font-medium text-white">{value}</span></span>
    <ChevronsUpDown {...ic} size={14} className="text-white/40" /></div>);
}
export function Toast({ show, text, sub }: { show: boolean; text: string; sub?: string }) {
  return (<AnimatePresence>{show && <motion.div initial={{ y: -40, opacity: 0, scale: .9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -30, opacity: 0, scale: .95 }} transition={{ type: "spring", stiffness: 380, damping: 30 }}
    className="absolute left-1/2 top-[48px] z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#1f1f22]/95 py-1.5 pl-1.5 pr-3.5 shadow-[0_10px_30px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur">
    <span className="grid h-6 w-6 place-items-center rounded-full bg-flame"><Check size={13} strokeWidth={2.5} className="text-[#111111]" /></span>
    <span className="leading-tight"><span className="block text-xs font-semibold text-white">{text}</span>{sub && <span className="block text-xs text-white/50">{sub}</span>}</span></motion.div>}</AnimatePresence>);
}
const mm = (x: number) => `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`;

/* Real screen: Video editor */
export function RecordScreen({ active }: { active: boolean }) {
  const s = useTick(active, 1000, 60); const t = 15 + s;
  return (<div className="absolute inset-0 flex flex-col" style={{ background: S0 }}>
    <Status /><Nav left={<span className="font-semibold">Done</span>} title="Set up the line" right={<><ListOrdered {...ic} size={18} /><MoreHorizontal {...ic} size={18} /></>} />
    <div className="relative h-[300px] overflow-hidden bg-black">
      <Clip name="kitchen" active={active} />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
      <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 py-1 pl-1 pr-2.5 text-xs font-medium text-white backdrop-blur"><span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-white/15 text-xs font-bold">LC</span>Line cook 1</span>
      <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-[#E54A4A] px-2 py-1 text-xs font-semibold tabular-nums text-white shadow-[0_2px_10px_rgba(229,74,74,.4)]"><motion.i animate={active ? { opacity: [1, .25, 1] } : {}} transition={{ repeat: Infinity, duration: 1.2 }} className="h-1.5 w-1.5 rounded-full bg-white" />REC {mm(t)}</span>
      <span className="absolute bottom-[44px] right-3 flex flex-col items-end gap-1.5">
        <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">Cancel Step</span>
        <motion.span animate={active ? { scale: [1, 1.04, 1] } : {}} transition={{ repeat: Infinity, duration: 1.8 }} className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: O }}>Complete Step</motion.span></span>
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 text-xs tabular-nums text-white/80"><span>{mm(t)}</span><Bar v={t / 600} h={3} /><span className="text-white/50">10:00</span><Maximize2 {...ic} size={12} /></div>
    </div>
    <div className="flex items-center justify-between px-6 py-2.5 text-white/80" style={{ borderBottom: `1px solid ${HL}` }}>
      <Undo2 {...ic} size={17} /><span className="text-xs font-medium tabular-nums">−1s</span>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,.5)]">{active ? <Pause size={15} fill="currentColor" strokeWidth={0} /> : <Play size={15} fill="currentColor" strokeWidth={0} className="ml-0.5" />}</span>
      <span className="text-xs font-medium tabular-nums">+1s</span><Redo2 {...ic} size={17} /></div>
    <div className="grid grid-cols-3 px-4 pt-2.5 text-center">{[["Start", "00:15"], ["Stop", mm(Math.max(t, 16))], ["Duration", mm(Math.max(t - 15, 1))]].map(([k, v]) => <span key={k}><span className="block text-xs uppercase tracking-[.06em] text-white/40">{k}</span><span className="block text-sm font-medium tabular-nums text-white">{v}</span></span>)}</div>
    <div className="relative mx-4 mt-2.5 h-[42px] overflow-hidden rounded-[10px] ring-1 ring-white/10">
      <div className="flex h-full">{["kitchen", "line", "plating", "steam", "kitchen", "line"].map((v, i) => <span key={i} className="h-full flex-1 bg-cover bg-center" style={{ backgroundImage: `url(/video/${v}.jpg)`, boxShadow: "inset -1px 0 0 rgba(0,0,0,.5)" }} />)}</div>
      <span className="absolute inset-y-0 left-0 w-[14%] bg-black/60" />
      <span className="absolute inset-y-0 left-[14%] right-[6%] rounded-[8px] border-2 border-flame"><span className="absolute -left-[2px] inset-y-0 w-2 rounded-l-[6px] bg-flame" /><span className="absolute -right-[2px] inset-y-0 w-2 rounded-r-[6px] bg-flame" /></span>
      <motion.span className="absolute -top-[2px] -bottom-[2px] w-[3px] rounded-full bg-white shadow-[0_0_6px_rgba(0,0,0,.8)]" initial={false} animate={{ left: `${16 + (s / 60) * 76}%` }} transition={{ duration: 1, ease: "linear" }} /></div>
    <div className="mx-3 mb-[26px] mt-auto flex gap-2">
      <div className={`flex flex-[3] py-2 ${card}`} style={{ background: S1 }}>{[[Sticker, "Stickers"], [Type, "Text"], [Scissors, "Steps"]].map(([C, l]) => { const Icon = C as typeof Type; return <span key={l as string} className="flex flex-1 flex-col items-center gap-1 text-xs text-white/70"><Icon {...ic} size={18} />{l as string}</span>; })}</div>
      <div className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 ${card}`} style={{ background: S1 }}><span className="grid h-[20px] w-[20px] place-items-center rounded-full ring-[1.5px] ring-white/80"><motion.span animate={active ? { scale: [1, .7, 1] } : {}} transition={{ repeat: Infinity, duration: 1.2 }} className="h-[12px] w-[12px] rounded-full bg-[#E54A4A]" /></span><span className="text-xs text-white/70">Start Step</span></div></div>
  </div>);
}

/* Real screen: Standard work viewer */
const SOP = ["Wash hands and put on gloves", "Check walk-in temperature", "Sanitise boards and knives", "Set up the line by station", "Label and date prep", "Final check with the lead"];
export function SopScreen({ active }: { active: boolean }) {
  const n = useTick(active, 1400, SOP.length + 2); const done = Math.min(n, SOP.length - 1);
  return (<div className="absolute inset-0 flex flex-col" style={{ background: S0 }}>
    <Status /><Nav left={<Back />} title="Opening checklist" />
    <div className="flex items-center gap-3 px-4 pb-3 pt-1"><Bar v={(done + 1) / SOP.length} /><span className="text-xs font-medium tabular-nums text-white/60">{done + 1}/{SOP.length}</span></div>
    <div className="mx-3"><Picker label="Role" value="Line cook 1" /></div>
    <p className="mx-4 mb-2 mt-4 text-xs font-medium uppercase tracking-[.06em] text-white/40">Standard Work Steps</p>
    <div className={`mx-3 overflow-hidden ${card}`} style={{ background: S1 }}>{SOP.map((x, i) => { const ok = i < done, open = i === done; return (
      <div key={x} style={{ borderTop: i ? `1px solid ${HL}` : undefined }} className={open ? "bg-white/[.025]" : ""}>
        <div className="flex h-[40px] items-center gap-2.5 px-3 text-sm tracking-[-.01em] text-white">
          <span className={`grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full text-xs font-semibold tabular-nums transition-colors duration-500 ${ok ? "text-white" : open ? "text-white ring-1 ring-flame" : "text-white/50 ring-1 ring-white/15"}`} style={{ background: ok ? O : "transparent" }}>{ok ? <Check size={11} strokeWidth={3} /> : i + 1}</span>
          <span className={`flex-1 truncate ${ok ? "text-white/50" : ""}`}>{x}</span>
          <ChevronRight {...ic} size={14} className={`text-white/30 transition-transform duration-500 ${open ? "rotate-90 text-white/60" : ""}`} /></div>
        <motion.div initial={false} animate={{ height: open ? 150 : 0, opacity: open ? 1 : 0 }} transition={{ duration: .55, ease }} className="overflow-hidden px-3">
          <div className="relative mb-3 h-[138px] overflow-hidden rounded-[10px] ring-1 ring-white/10"><Clip name="plating" active={active && open} />
            <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-2.5 pb-2 pt-6 text-xs tabular-nums text-white/85"><Play size={11} fill="currentColor" strokeWidth={0} />0:0{(n % 9) + 1}<Bar v={((n % 9) + 1) / 12} h={3} />0:12</span></div></motion.div>
      </div>); })}</div>
    <Toast show={active && n >= SOP.length} text="Checklist complete" sub="6 of 6 steps" /></div>);
}

/* Real screen: Standard Work Quiz */
export function QuizScreen({ active, q, a }: { active: boolean; q: string; a: string[]; ok: number }) {
  const n = useTick(active, 900, 10); const pick = n < 2 ? -1 : n < 4 ? 0 : 1;
  const opts = [...a, "Leave it for the next shift"].slice(0, 4);
  const Q = ({ k, t, o, sel }: { k: number; t: string; o: string[]; sel: number }) => (
    <div className={`px-3.5 py-3 ${card}`} style={{ background: S1 }}><div className="flex items-center justify-between"><span className="rounded-full bg-white/[.06] px-2 py-0.5 text-xs font-medium tabular-nums text-white/60">Question {k}</span><span className="text-xs text-white/35">Single choice</span></div>
      <p className="mt-2 text-sm font-medium leading-[1.35] tracking-[-.01em] text-white">{t}</p>
      <ul className="mt-2.5 space-y-1.5">{o.map((x, i) => <li key={x} className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-[7px] text-xs leading-snug transition-colors duration-300 ${sel === i ? "bg-flame/[.12] text-white ring-1 ring-flame/60" : "bg-white/[.03] text-white/70 ring-1 ring-white/[.06]"}`}>
        <span className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] text-xs font-semibold ${sel === i ? "text-white" : "bg-white/[.06] text-white/55"}`} style={sel === i ? { background: O } : {}}>{String.fromCharCode(65 + i)}</span>
        <span className="flex-1">{x}</span>{sel === i && <motion.span layoutId={`r${k}`}><CircleCheck {...ic} size={14} style={{ color: O }} /></motion.span>}</li>)}</ul></div>);
  return (<div className="absolute inset-0 flex flex-col" style={{ background: S0 }}>
    <Status /><Nav left={<Back />} title="Opening checklist" right={<span className="text-sm tabular-nums text-white/50">{n >= 6 ? 2 : 1}/6</span>} />
    <div className="flex items-center gap-3 px-4 pb-3 pt-1"><Bar v={(n >= 6 ? 2 : 1) / 6} /></div>
    <div className="space-y-2.5 px-3"><Q k={1} t={q} o={opts} sel={pick} /><Q k={2} t="Which order is right when setting up the line?" o={["Stock → Clean → Check temps", "Clean → Check temps → Stock", "Check temps → Stock → Clean"]} sel={n >= 6 ? 1 : -1} /></div>
    <Toast show={active && n >= 4 && n < 6} text="Correct" sub="Answer saved" />
    <Toast show={active && n >= 8} text="Quiz passed" sub="Results sent to your lead" /></div>);
}

/* Real screen: Orientation Analyzer */
const WORK = [["Opening checklist", "line", 1, 1], ["Allergen handling", "plating", 1, 0], ["Knife safety", "steam", 0, 0], ["Fryer cleaning", "kitchen", 1, 0], ["Closing clean-down", "hotel", 1, 1]] as const;
export function ReadyScreen({ active }: { active: boolean }) {
  return (<div className="absolute inset-0 flex flex-col" style={{ background: S0 }}>
    <Status /><Nav left={<Back />} title="Orientation Analyzer" />
    <div className="mx-3 mt-1"><Seg items={["Standard Work", "Person"]} i={1} /></div>
    <div className="mx-3 mt-2.5"><Picker label="Person" value="New starter" /></div>
    <div className={`mx-3 mt-2.5 px-3.5 py-3 ${card}`} style={{ background: `linear-gradient(180deg,${S2},${S1})` }}>
      <div className="flex items-center gap-2"><span className="text-sm font-semibold tracking-[-.01em] text-white">Orientation Data</span><Info {...ic} size={13} className="text-white/35" /><span className="ml-auto rounded-full bg-flame/15 px-2 py-0.5 text-xs font-medium text-flame ring-1 ring-flame/25">In progress</span></div>
      <div className="mt-3 flex items-center gap-4">{([["Viewed", 4], ["Quiz", 2]] as const).map(([k, v]) => <div key={k} className="flex flex-1 items-center gap-2.5"><Ring v={active ? v / 5 : 0}>{v}/5</Ring><span className="leading-tight"><span className="block text-xs text-white/45">{k}</span><span className="block text-sm font-medium tabular-nums text-white">{v * 20}%</span></span></div>)}</div></div>
    <div className="mx-4 mb-1.5 mt-4 flex text-xs font-medium uppercase tracking-[.06em] text-white/40"><span className="flex-1">Standard Work</span><span className="w-9 text-center">View</span><span className="w-9 text-center">Quiz</span></div>
    <ul className={`mx-3 overflow-hidden ${card}`} style={{ background: S1 }}>{WORK.map(([t, v, e, q], i) => <motion.li key={t} initial={false} animate={{ opacity: active ? 1 : .3, x: active ? 0 : 8 }} transition={{ delay: .3 + i * .08, duration: .5, ease }} className="flex h-[50px] items-center gap-2.5 px-2.5" style={{ borderTop: i ? `1px solid ${HL}` : undefined }}>
      <span className="h-9 w-9 shrink-0 rounded-[8px] bg-cover bg-center ring-1 ring-white/10" style={{ backgroundImage: `url(/video/${v}.jpg)` }} />
      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium tracking-[-.01em] text-white">{t}</span><span className="block text-xs tabular-nums text-white/40">Updated 14.03.2026</span></span>
      <span className="grid w-9 place-items-center">{e ? <Eye {...ic} size={15} className="text-white/85" /> : <EyeOff {...ic} size={15} className="text-white/25" />}</span>
      <span className="grid w-9 place-items-center"><span className={`grid h-[18px] w-[18px] place-items-center rounded-full ${q ? "bg-flame" : "ring-1 ring-white/15"}`}>{q ? <Check size={11} strokeWidth={3} className="text-[#111111]" /> : null}</span></span></motion.li>)}</ul></div>);
}
