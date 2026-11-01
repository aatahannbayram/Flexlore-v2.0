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
      <svg width="20" height="10" viewBox="0 0 20 10"><rect x=".5" y=".5" width="17" height="9" rx="2.5" fill="none" stroke="#fff" strokeOpacity=".5"/><rect x="2" y="2" width="13" height="6" rx="1.4" fill="#fff"/><rect x="18.5" y="3.3" width="1.3" height="3.4" rx=".6" fill="#fff" fillOpacity=".5"/></svg>
    </span></div>);
}
function Bar({ title, right }: { title: string; right?: string }) {
  return (<div className="flex items-center justify-between px-4 py-2 text-[11px] text-white/90">
    <span className="flex items-center gap-1 text-white/70"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7.5 2 3.5 6l4 4"/></svg>Back</span>
    <span className="max-w-[60%] truncate font-medium">{title}</span><span className="text-white/60">{right ?? "⋯"}</span></div>);
}

const BASE = 308;
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

export function RecordScreen({ active }: { active: boolean }) {
  const s = useTick(active, 1000, 600); const t = 14 + s;
  return (<div className="absolute inset-0 flex flex-col">
    <div className="absolute inset-0"><Clip name="kitchen" active={active} /></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
    <div className="relative z-10"><Status /></div>
    <div className="relative z-10 mt-2 flex justify-center"><span className="flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold tabular-nums text-white backdrop-blur">
      <motion.span animate={active ? { opacity: [1, .2, 1] } : {}} transition={{ repeat: Infinity, duration: 1.2 }} className="h-2 w-2 rounded-full bg-[#ff3b30]" />
      {String(Math.floor(t / 60)).padStart(2, "0")}:{String(t % 60).padStart(2, "0")}</span></div>
    <div className="relative z-10 mx-4 mt-3 rounded-xl bg-black/45 px-3 py-2 backdrop-blur"><p className="text-[9px] uppercase tracking-[.14em] text-white/55">Recording</p><p className="text-[12px] font-semibold text-white">Line cook · Opening checklist</p></div>
    <div className="relative z-10 mt-auto px-4 pb-8">
      <div className="mb-4 flex gap-1">{[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25"><motion.span className="block h-full bg-white" initial={false} animate={{ width: active ? (i < 2 ? "100%" : i === 2 ? "55%" : "0%") : "0%" }} transition={{ duration: 1.2, delay: i * .25, ease }} /></span>)}</div>
      <div className="flex items-center justify-between">
        <span className="h-9 w-9 rounded-lg border border-white/30 bg-[url('/video/kitchen.jpg')] bg-cover" />
        <span className="grid h-[62px] w-[62px] place-items-center rounded-full border-[3px] border-white"><motion.span animate={active ? { scale: [1, .82, 1] } : {}} transition={{ repeat: Infinity, duration: 1.6 }} className="h-[22px] w-[22px] rounded-[6px] bg-[#ff3b30]" /></span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-[10px] font-semibold text-white">1×</span>
      </div></div></div>);
}

const SOP = ["Wash hands, gloves on", "Check walk-in temperature", "Sanitise boards and knives", "Set up the line by station", "Label and date prep"];
export function SopScreen({ active }: { active: boolean }) {
  const n = useTick(active, 1100, SOP.length + 2); const done = Math.min(n, SOP.length);
  return (<div className="absolute inset-0 flex flex-col bg-[#0e0e10]">
    <Status /><Bar title="Opening checklist" />
    <div className="mx-4 mt-1 flex items-center gap-2"><span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10"><motion.span className="block h-full rounded-full" style={{ background: O }} animate={{ width: `${(done / SOP.length) * 100}%` }} transition={{ duration: .6, ease }} /></span><span className="text-[10px] tabular-nums text-white/60">{done}/{SOP.length}</span></div>
    <div className="relative mx-4 mt-3 aspect-video overflow-hidden rounded-xl"><Clip name="plating" active={active} />
      <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur">Step {Math.min(done + 1, SOP.length)} · 00:{String(12 + done * 9).padStart(2, "0")}</span></div>
    <p className="mx-4 mt-4 text-[10px] font-medium uppercase tracking-[.12em] text-white/45">Standard work steps</p>
    <ul className="mx-4 mt-2 space-y-1.5">{SOP.map((x, i) => { const ok = i < done, cur = i === done;
      return (<li key={x} className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[11.5px] transition-colors duration-500 ${cur ? "border-[#f5580a]/70 bg-[#f5580a]/[.08] text-white" : "border-white/[.06] bg-[#1a1a1d] text-white/80"}`}>
        <span className="w-4 text-[10px] tabular-nums text-white/40">{i + 1}</span><span className="flex-1 truncate">{x}</span>
        <span className="grid h-[18px] w-[18px] place-items-center rounded-full border transition-all duration-500" style={{ borderColor: ok ? O : "rgba(255,255,255,.25)", background: ok ? O : "transparent" }}>
          {ok && <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} width="10" height="10" viewBox="0 0 10 10"><motion.path d="M2 5.2 4.2 7.3 8 3" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .35 }} /></motion.svg>}</span></li>); })}</ul></div>);
}

export function QuizScreen({ active, q, a, ok }: { active: boolean; q: string; a: string[]; ok: number }) {
  const n = useTick(active, 900, 7); const pick = n >= 2 ? (n >= 3 ? ok : 0) : -1; const reveal = n >= 4;
  return (<div className="absolute inset-0 flex flex-col bg-[#0e0e10]">
    <Status /><Bar title="Opening checklist · Quiz" right="2/5" />
    <div className="mx-4 mt-1 flex gap-1">{[0, 1, 2, 3, 4].map((i) => <span key={i} className="h-[3px] flex-1 rounded-full" style={{ background: i < 2 ? O : "rgba(255,255,255,.12)" }} />)}</div>
    <span className="mx-4 mt-5 w-fit rounded-full border border-[#f5580a]/40 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[.12em]" style={{ color: O }}>AI drafted · approved by your lead</span>
    <p className="mx-4 mt-3 text-[15px] font-semibold leading-snug tracking-[-.01em] text-white">{q}</p>
    <ul className="mx-4 mt-5 space-y-2">{a.map((x, i) => { const sel = pick === i, right = reveal && i === ok;
      return (<motion.li key={x} animate={{ scale: sel && !reveal ? .98 : 1 }} className="flex items-center gap-3 rounded-xl border px-3 py-3 text-[12px] transition-colors duration-300"
        style={{ borderColor: right ? "#34c759" : sel ? O : "rgba(255,255,255,.08)", background: right ? "rgba(52,199,89,.1)" : sel ? "rgba(245,88,10,.08)" : "#1a1a1d", color: sel || right ? "#fff" : "rgba(255,255,255,.75)" }}>
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[9px] font-semibold" style={{ borderColor: right ? "#34c759" : sel ? O : "rgba(255,255,255,.25)", background: right ? "#34c759" : "transparent", color: right ? "#000" : "rgba(255,255,255,.6)" }}>{right ? "✓" : String.fromCharCode(65 + i)}</span>{x}</motion.li>); })}</ul>
    <motion.div initial={false} animate={{ opacity: reveal ? 1 : 0, y: reveal ? 0 : 10 }} className="mx-4 mt-4 rounded-xl bg-[#1a1a1d] px-3 py-2.5 text-[11px] leading-snug text-white/70"><span className="font-semibold text-[#34c759]">Correct.</span> Shown at 00:41 in the step video.</motion.div>
    <div className="mx-4 mb-8 mt-auto rounded-full py-3 text-center text-[12px] font-semibold text-black" style={{ background: O }}>Next question</div></div>);
}

const TEAM = [["Line cook", "Opening checklist", 100], ["Prep cook", "Allergen handling", 82], ["Server", "Table service", 64], ["Dishwasher", "Closing clean-down", 40], ["New starter", "Orientation", 18]] as const;
export function ReadyScreen({ active }: { active: boolean }) {
  return (<div className="absolute inset-0 flex flex-col bg-[#0e0e10]">
    <Status />
    <div className="flex items-center justify-between px-4 py-2"><span className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={O} strokeWidth="3" strokeLinecap="round"><path d="M4 4l16 16M20 4 4 20"/></svg><span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[8.5px] font-bold text-white/80">PRO</span></span><span className="text-[11px] text-white/60">Morning shift ▾</span></div>
    <p className="px-4 pt-2 text-[10px] font-medium uppercase tracking-[.12em] text-white/45">Readiness · sample data</p>
    <div className="mx-4 mt-2 flex items-center gap-4 rounded-2xl bg-[#1a1a1d] p-4">
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90"><circle cx="32" cy="32" r="27" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="6"/><motion.circle cx="32" cy="32" r="27" fill="none" stroke={O} strokeWidth="6" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" initial={false} animate={{ strokeDashoffset: active ? 1 - .61 : 1 }} transition={{ duration: 1.6, ease }} /></svg>
      <div><p className="text-[22px] font-bold tabular-nums tracking-[-.03em] text-white">3 of 5</p><p className="text-[11px] text-white/55">roles ready for this shift</p></div></div>
    <div className="mx-4 mt-3 flex gap-1.5 text-[10.5px]"><span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-white">By role</span><span className="rounded-lg px-2.5 py-1.5 text-white/50">By location</span></div>
    <ul className="mx-4 mt-3 space-y-2">{TEAM.map(([r, s, v], i) => (<li key={r} className="rounded-xl bg-[#1a1a1d] px-3 py-2.5">
      <div className="flex items-baseline justify-between"><span className="text-[11.5px] font-semibold text-white">{r}</span><span className="text-[10px] tabular-nums" style={{ color: v >= 80 ? O : "rgba(255,255,255,.55)" }}>{v}%</span></div>
      <p className="text-[9.5px] text-white/45">{s}</p>
      <span className="mt-1.5 block h-[4px] overflow-hidden rounded-full bg-white/10"><motion.span className="block h-full rounded-full" style={{ background: v >= 80 ? O : "rgba(255,255,255,.45)" }} initial={false} animate={{ width: active ? `${v}%` : "0%" }} transition={{ duration: 1.2, delay: .2 + i * .12, ease }} /></span></li>))}</ul></div>);
}
