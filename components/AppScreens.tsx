"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const O = "#f5580a";
const ease = [0.22, 1, 0.36, 1] as const;

function useTick(active: boolean, ms: number, max: number) {
  const [n, setN] = useState(0);
  useEffect(() => { if (!active) { setN(0); return; } const id = setInterval(() => setN((v) => (v + 1) % max), ms); return () => clearInterval(id); }, [active, ms, max]);
  return n;
}
function Clip({ name, active, className = "" }: { name: string; active: boolean; className?: string }) {
  const r = useRef<HTMLVideoElement>(null);
  useEffect(() => { const v = r.current; if (!v) return; if (active) v.play().catch(() => {}); else v.pause(); }, [active]);
  return (<video ref={r} muted loop playsInline preload="none" poster={`/video/${name}.jpg`} className={`grade h-full w-full object-cover ${className}`}>
    <source src={`/video/${name}.webm`} type="video/webm" /><source src={`/video/${name}.mp4`} type="video/mp4" /></video>);
}
function Status() {
  return (<div className="flex h-[34px] items-end justify-between px-6 pb-1 text-[11px] font-semibold text-white">
    <span>9:41</span>
    <span className="flex items-center gap-1">
      <svg width="15" height="10" viewBox="0 0 15 10" fill="#fff"><rect x="0" y="6" width="3" height="4" rx=".6"/><rect x="4" y="4" width="3" height="6" rx=".6"/><rect x="8" y="2" width="3" height="8" rx=".6"/><rect x="12" y="0" width="3" height="10" rx=".6"/></svg>
      <svg width="14" height="10" viewBox="0 0 14 10" fill="#fff"><path d="M7 2.2c2 0 3.9.8 5.3 2.1l1-1A8.9 8.9 0 0 0 7 .7 8.9 8.9 0 0 0 .7 3.3l1 1A7.4 7.4 0 0 1 7 2.2Zm0 3c1.2 0 2.3.4 3.2 1.2l1-1A6.2 6.2 0 0 0 7 3.7c-1.6 0-3.1.6-4.2 1.7l1 1C4.7 5.6 5.8 5.2 7 5.2Zm0 2.9 1.6-1.6a2.3 2.3 0 0 0-3.2 0L7 8.1Z"/></svg><svg width="20" height="10" viewBox="0 0 20 10"><rect x=".5" y=".5" width="17" height="9" rx="2.5" fill="none" stroke="#fff" strokeOpacity=".5"/><rect x="2" y="2" width="13" height="6" rx="1.4" fill="#fff"/><rect x="18.5" y="3.3" width="1.3" height="3.4" rx=".6" fill="#fff" fillOpacity=".5"/></svg>
    </span></div>);
}
function Bar({ title, right }: { title: string; right?: string }) {
  return (<div className="flex items-center justify-between px-4 py-2 text-[11px] text-white/90">
    <span className="flex items-center gap-1 text-white/70"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7.5 2 3.5 6l4 4"/></svg>Back</span>
    <span className="max-w-[60%] truncate font-medium">{title}</span><span className="text-white/60">{right ?? "⋯"}</span></div>);
}

const BASE = 320;
/** Renders the screen at a fixed design width and scales it, so small phones stay pixel-identical. */
function Scaled({ children }: { children: React.ReactNode }) {
  const r = useRef<HTMLDivElement>(null); const [k, setK] = useState(1); const [h, setH] = useState(0);
  useEffect(() => { const el = r.current; if (!el) return; const ro = new ResizeObserver(() => { const kk = el.clientWidth / BASE; setK(kk); setH(el.clientHeight / kk); }); ro.observe(el); return () => ro.disconnect(); }, []);
  return (<div ref={r} className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-[#0e0e10]">
    <div className="absolute left-0 top-0 origin-top-left font-sans antialiased" style={{ width: BASE, height: h || "100%", transform: `scale(${k})` }}>{children}</div></div>);
}
/** Modern iPhone frame in CSS: titanium rim, Dynamic Island, side buttons. */
export function Device({ children, label }: { children: React.ReactNode; label: string }) {
  return (<div role="img" aria-label={label} className="relative aspect-[393/852] w-full">
    <span className="absolute -left-[3px] top-[18%] h-[6%] w-[3px] rounded-l bg-[#2a2a2c]" /><span className="absolute -left-[3px] top-[27%] h-[9%] w-[3px] rounded-l bg-[#2a2a2c]" /><span className="absolute -right-[3px] top-[24%] h-[12%] w-[3px] rounded-r bg-[#2a2a2c]" />
    <div className="absolute inset-0 rounded-[3.1rem] bg-gradient-to-b from-[#4a4a4e] via-[#2c2c2e] to-[#3a3a3c] p-[2px] shadow-[0_50px_140px_rgba(0,0,0,.75),0_0_0_1px_rgba(255,255,255,.06)]">
      <div className="h-full w-full rounded-[3rem] bg-black p-[9px]">
        <Scaled>
          <div className="absolute left-1/2 top-[9px] z-30 h-[25px] w-[31%] -translate-x-1/2 rounded-full bg-black" />
          {children}
          <div className="absolute bottom-[7px] left-1/2 z-30 h-[4px] w-[36%] -translate-x-1/2 rounded-full bg-white/80" />
          <div className="pointer-events-none absolute inset-0 z-40 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-transparent to-white/[.05]" />
        </Scaled></div></div></div>);
}


const I = {
  back: <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7H2M6 3 2 7l4 4"/></svg>,
  dots: <svg width="3" height="13" viewBox="0 0 3 13" fill="currentColor"><circle cx="1.5" cy="1.5" r="1.4"/><circle cx="1.5" cy="6.5" r="1.4"/><circle cx="1.5" cy="11.5" r="1.4"/></svg>,
  list: <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M4 1.5h9M4 5.5h9M4 9.5h9M1 1.5h.01M1 5.5h.01M1 9.5h.01"/></svg>,
  caret: <svg width="8" height="5" viewBox="0 0 8 5" fill={O}><path d="M0 0h8L4 5z"/></svg>,
  eye: (on: boolean) => <svg width="15" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.3" opacity={on ? 1 : .35}><path d="M1 5.5S3.6 1 8 1s7 4.5 7 4.5S12.4 10 8 10 1 5.5 1 5.5Z"/><circle cx="8" cy="5.5" r="2"/>{!on && <path d="M2 1l12 9"/>}</svg>,
  tick: (on: boolean) => <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity={on ? 1 : .3}><path d="m1 5 3.5 3.5L11 1.5"/></svg>,
};
function Top({ left, title, right }: { left: React.ReactNode; title: string; right?: React.ReactNode }) {
  return (<div className="relative flex h-[38px] items-center px-4 text-[11.5px] text-white">
    <span className="flex items-center gap-1.5 text-white/85">{left}</span>
    <span className="absolute left-1/2 max-w-[56%] -translate-x-1/2 truncate font-medium">{title}</span>
    <span className="ml-auto flex items-center gap-4 text-white/85">{right ?? I.dots}</span></div>);
}
const BackL = <>{I.back}<span>Back</span></>;
function Progress({ v, label }: { v: number; label: string }) {
  return (<div className="flex items-center gap-3 px-4 py-2"><span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/[.12]"><motion.span className="block h-full rounded-full" style={{ background: O }} initial={false} animate={{ width: `${v * 100}%` }} transition={{ duration: .7, ease }} /></span><span className="text-[11px] tabular-nums text-white/70">{label}</span></div>);
}
const tb = "flex flex-1 flex-col items-center gap-1 text-[9.5px] text-white/75";

/* Real screen: Video editor ("Quickly Create Video Work Instructions", Framer Cjp9). */
export function RecordScreen({ active }: { active: boolean }) {
  const s = useTick(active, 1000, 60); const t = 15 + s;
  const mm = (x: number) => `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`;
  return (<div className="absolute inset-0 flex flex-col bg-[#0b0b0c]">
    <Status /><Top left={<span>Done</span>} title="Set up the line by station" right={<>{I.list}{I.dots}</>} />
    <div className="relative mx-0 h-[300px] overflow-hidden bg-black">
      <Clip name="kitchen" active={active} />
      <span className="absolute left-2.5 top-2.5 rounded-md bg-[#1c1c1e]/90 px-2 py-1 text-[10px] font-medium text-white">Line cook 1</span>
      <svg className="absolute right-3 top-3 text-white" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M7 1h4v4M11 1 7 5M5 11H1V7M1 11l4-4"/></svg>
      <div className="absolute bottom-[34px] right-2.5 flex flex-col items-end gap-2">
        <span className="rounded-full bg-[#e5484d] px-3.5 py-1.5 text-[10.5px] font-medium text-white">Cancel Step</span>
        <motion.span animate={active ? { scale: [1, 1.04, 1] } : {}} transition={{ repeat: Infinity, duration: 1.8 }} className="rounded-full px-3.5 py-1.5 text-[10.5px] font-medium text-white" style={{ background: O }}>Complete Step</motion.span></div>
      <span className="absolute bottom-2 left-2.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">Video Duration: <span style={{ color: O }} className="tabular-nums">{mm(t)}</span> / 10:00</span>
    </div>
    <div className="flex items-center justify-between border-y border-white/[.06] px-5 py-2.5 text-white/85">
      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M4 1 1 4l3 3M1 4h8.5a4 4 0 0 1 0 8H6"/></svg>
      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="m11 1 3 3-3 3M14 4H5.5a4 4 0 0 0 0 8H9"/></svg>
      <span className="grid h-[22px] w-[22px] place-items-center rounded-full border-[1.5px] border-white/85"><span className="ml-[2px] h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-white" /></span>
      <span className="text-[10.5px]">‹1s</span><span className="text-[10.5px]">1s›</span></div>
    <div className="flex justify-between px-3 pt-2.5 text-[9.5px] text-white/70"><span>Start Step: 00:15</span><span>Stop Step: <span className="tabular-nums">{mm(Math.max(t, 16))}</span></span><span>Step Duration: <span className="tabular-nums">{mm(Math.max(t - 15, 1))}</span></span></div>
    <div className="relative mx-3 mt-2 h-[40px] overflow-hidden rounded-lg border border-white/40">
      <div className="flex h-full">{["kitchen", "line", "plating", "steam", "kitchen", "line"].map((v, i) => <span key={i} className="h-full flex-1 bg-cover bg-center" style={{ backgroundImage: `url(/video/${v}.jpg)` }} />)}</div>
      <span className="absolute inset-y-0 left-0 w-[14%] bg-black/55" />
      <motion.span className="absolute inset-y-0 w-[2px] bg-white" initial={false} animate={{ left: `${14 + (s / 60) * 80}%` }} transition={{ duration: 1, ease: "linear" }} /></div>
    <div className="mx-3 mb-6 mt-auto flex gap-2">
      <div className="flex flex-[3] rounded-2xl bg-[#1c1c1e] py-2.5">
        <span className={tb}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 2h12v7l-5 5H2z"/><path d="M9 14V9h5"/></svg>Stickers</span>
        <span className={tb}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M5 5h6M8 5v6"/></svg>Text</span>
        <span className={tb}><span className="pt-[3px]">{I.list}</span>Steps</span></div>
      <div className="flex flex-1 rounded-2xl bg-[#1c1c1e] py-2.5"><span className={tb}><span className="grid h-4 w-4 place-items-center rounded-full border-[1.3px] border-white/80"><motion.span animate={active ? { opacity: [1, .3, 1] } : {}} transition={{ repeat: Infinity, duration: 1.2 }} className="h-2 w-2 rounded-full bg-white" /></span>Start Step</span></div></div>
  </div>);
}

/* Real screen: Standard work viewer ("Train Your Team in Minutes", Framer B0VT). */
const SOP = ["Wash hands and put on gloves", "Check walk-in temperature", "Sanitise boards and knives", "Set up the line by station", "Label and date prep", "Final check with the lead"];
export function SopScreen({ active }: { active: boolean }) {
  const n = useTick(active, 1300, SOP.length + 2); const done = Math.min(n, SOP.length - 1);
  return (<div className="absolute inset-0 flex flex-col bg-[#0b0b0c]">
    <Status /><Top left={BackL} title="Opening checklist" />
    <Progress v={(done + 1) / SOP.length} label={`${done + 1}/${SOP.length}`} />
    <div className="mx-3 mt-2 flex items-center justify-between rounded-2xl bg-[#1c1c1e] px-4 py-3 text-[12px] text-white">Line cook 1 {I.caret}</div>
    <p className="mx-4 mt-4 text-[11px] text-white/70">Standard Work Steps</p>
    <div className="mt-2 space-y-2 overflow-hidden px-3">{SOP.map((x, i) => { const ok = i < done, open = i === done; return (
      <div key={x} className="rounded-2xl bg-[#1c1c1e] px-3 py-3">
        <div className="flex items-center gap-2 text-[11.5px] text-white">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" className={`text-white/60 transition-transform duration-500 ${open ? "rotate-90" : ""}`}><path d="m3.5 1.5 3.5 3.5-3.5 3.5"/></svg>
          <span className="flex-1 truncate">{i + 1} • {x}</span>
          <span className="grid h-[16px] w-[16px] place-items-center rounded-full border-[1.5px] transition-colors duration-500" style={{ borderColor: ok ? O : "rgba(255,255,255,.35)" }}>{ok && <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 5.2 4.2 7.3 8 3" fill="none" stroke={O} strokeWidth="1.8" strokeLinecap="round"/></svg>}</span></div>
        <motion.div initial={false} animate={{ height: open ? 168 : 0, opacity: open ? 1 : 0, marginTop: open ? 10 : 0 }} transition={{ duration: .55, ease }} className="overflow-hidden rounded-xl"><Clip name="line" active={active && open} /></motion.div>
      </div>); })}</div></div>);
}

/* Real screen: Standard Work Quiz ("Generate AI Quizzes with Minimal Effort"). */
export function QuizScreen({ active, q, a }: { active: boolean; q: string; a: string[]; ok: number }) {
  const n = useTick(active, 900, 8); const pick = n < 2 ? -1 : n < 4 ? 0 : 1;
  const opts = [...a, "Leave it for the next shift"].slice(0, 4);
  const Q = ({ k, t, o, sel }: { k: number; t: string; o: string[]; sel: number }) => (
    <div className="rounded-2xl bg-[#1a1a1c] px-4 py-3.5"><p className="text-[10.5px] text-white/55">{k}. Question</p><p className="mt-1.5 text-[12.5px] leading-snug text-white">{t}</p>
      <ul className="mt-3 space-y-[13px]">{o.map((x, i) => <li key={x} className="flex items-start gap-2.5 text-[11.5px] leading-snug" style={{ color: sel === i ? "#fff" : "rgba(255,255,255,.72)" }}>
        <span className="mt-[1px] grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full border-[1.3px] transition-colors duration-300" style={{ borderColor: sel === i ? O : "rgba(255,255,255,.4)" }}>{sel === i && <motion.span layoutId={`r${k}`} className="h-[7px] w-[7px] rounded-full" style={{ background: O }} />}</span>
        <span>{String.fromCharCode(65 + i)} • {x}</span></li>)}</ul></div>);
  return (<div className="absolute inset-0 flex flex-col bg-[#0b0b0c]">
    <Status /><Top left={BackL} title="Opening checklist" right={<span />} />
    <Progress v={1 / 6} label="1/6" />
    <p className="mx-4 mt-3 text-[10.5px] text-white/70">Standard Work Quiz</p>
    <div className="mt-2 space-y-2.5 px-3"><Q k={1} t={q} o={opts} sel={pick} /><Q k={2} t="Which order is right when setting up the line?" o={["Stock → Clean → Check temps", "Clean → Check temps → Stock", "Check temps → Stock → Clean", "Stock → Check temps → Clean"]} sel={n >= 6 ? 1 : -1} /></div></div>);
}

/* Real screen: Orientation Analyzer ("Know Who's Ready in a Crisis"). */
const WORK = [["Opening checklist", "line", 1, 1], ["Allergen handling", "plating", 1, 0], ["Knife safety", "steam", 0, 0], ["Fryer cleaning", "kitchen", 1, 0], ["Closing clean-down", "hotel", 1, 1]] as const;
export function ReadyScreen({ active }: { active: boolean }) {
  return (<div className="absolute inset-0 flex flex-col bg-[#0b0b0c]">
    <Status /><Top left={I.back} title="Orientation Analyzer" />
    <div className="mx-3 mt-1 flex gap-1.5 text-[11px]"><span className="flex-1 rounded-xl border border-white/15 py-2 text-center text-white">Standard Work</span><span className="flex-1 rounded-xl bg-[#1c1c1e] py-2 text-center text-white/80">Person</span></div>
    <div className="mx-3 mt-2 flex items-center justify-between rounded-2xl bg-[#1c1c1e] px-4 py-3 text-[12px] text-white">New starter {I.caret}</div>
    <div className="mx-3 mt-2 rounded-2xl border border-[#f5580a]/45 bg-[#161618] px-4 py-3.5">
      <div className="flex items-center gap-2.5"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/[.07] text-white/80"><svg width="9" height="6" viewBox="0 0 9 6" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="m1 1 3.5 3.5L8 1"/></svg></span><span className="text-[13px] text-white">Orientation Data</span><span className="grid h-[13px] w-[13px] place-items-center rounded-full border border-white/50 text-[8px] text-white/60">!</span></div>
      {([["View", 4], ["Quiz", 2]] as const).map(([k, v], i) => <div key={k} className="mt-3 flex items-center gap-3 text-[11px]"><span className="w-8 text-white/70">{k}</span><span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10"><motion.span className="block h-full rounded-full" style={{ background: O }} initial={false} animate={{ width: active ? `${v * 20}%` : "0%" }} transition={{ duration: 1.3, delay: .2 + i * .25, ease }} /></span><span className="w-6 text-right tabular-nums text-white/60">{v}/5</span></div>)}</div>
    <div className="mx-4 mt-4 flex text-[10px] text-white/55"><span className="flex-1">Standard Work With Access</span><span className="w-10 text-center">View</span><span className="w-8 text-center">Quiz</span></div>
    <ul className="mt-1.5 space-y-2.5 px-4">{WORK.map(([t, v, e, q], i) => <motion.li key={t} initial={false} animate={{ opacity: active ? 1 : .3, x: active ? 0 : 8 }} transition={{ delay: .4 + i * .1, duration: .5 }} className="flex items-center gap-3">
      <span className="h-10 w-10 shrink-0 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(/video/${v}.jpg)` }} />
      <span className="min-w-0 flex-1"><span className="block truncate text-[11.5px] font-medium text-white">{t}</span><span className="block text-[9.5px] text-white/45">Last Updated : 14.03.2026</span></span>
      <span className="w-10 text-center text-white">{I.eye(!!e)}</span><span className="w-8 text-center text-white">{I.tick(!!q)}</span></motion.li>)}</ul></div>);
}
