"use client";
import { useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { ArrowsDownUp, Bell, Books, CaretDown, CaretRight, CaretUpDown, ChartBar, Check, Gear, House, ListChecks, MagnifyingGlass, Play, Plus, ShareNetwork, Users, Warning } from "./ui/icons";
const O = "#EC6726";
const ease = [0.22, 1, 0.36, 1] as const;
const W = 1180, H = 720;

export function Fit({ children }: { children: React.ReactNode }) {
  const r = useRef<HTMLDivElement>(null); const [k, setK] = useState(0.5);
  useEffect(() => { const el = r.current; if (!el) return; const ro = new ResizeObserver(() => setK(el.clientWidth / W)); ro.observe(el); return () => ro.disconnect(); }, []);
  return (<div ref={r} className="relative w-full overflow-hidden" style={{ height: H * k }}><div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})` }}>{children}</div></div>);
}
const S1 = "#111113", S2 = "#161618", S3 = "#1f1f22";
const ic = { size: 16 } as const;
const panel = "rounded-[12px] border border-white/[.07] shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_1px_2px_rgba(0,0,0,.4),0_12px_32px_-16px_rgba(0,0,0,.7)]";
const NAV: [string, [string, typeof House, string?][]][] = [
  ["Workspace", [["Home", House], ["Library", Books], ["Notices", Bell, "3"]]],
  ["Insights", [["Orientation Analyzer", ChartBar], ["Quizzes", ListChecks]]],
  ["Admin", [["Manage Access", Users]]],
];
const LIB = [["Opening checklist", "line", 6, "0:48", "Published"], ["Allergen handling", "plating", 4, "0:36", "Published"], ["Knife safety", "steam", 5, "0:52", "Draft"], ["Fryer cleaning", "kitchen", 7, "1:04", "Published"], ["Room turnover", "hotel", 8, "1:12", "In review"], ["Pallet receiving", "warehouse", 5, "0:44", "Published"]] as const;
const PEOPLE = [["Line cook 1", "LC", "#EC6726"], ["Line cook 2", "LK", "#666666"], ["Prep cook", "PC", "#8a8a8f"], ["Server", "SV", "#4d4d4d"], ["New starter", "NS", "#3b3b3e"]] as const;
// 0 none, 1 viewed, 2 viewed + quiz passed  (sample grid)
const GRID = [[2, 2, 2, 1, 0], [2, 1, 2, 2, 1], [1, 1, 0, 2, 0], [2, 2, 1, 1, 2], [1, 0, 0, 0, 0]];
const BADGE: Record<string, string> = { Published: "text-flame bg-flame/12 ring-flame/25", Draft: "text-white/70 bg-white/[.06] ring-white/10", "In review": "text-flame bg-flame/12 ring-flame/25" };
function Av({ i, c, s = 24 }: { i: string; c: string; s?: number }) {
  return <span className="grid shrink-0 place-items-center rounded-full text-xs font-semibold text-white ring-2 ring-[#0b0b0c]" style={{ width: s, height: s, background: `linear-gradient(180deg,${c},${c}cc)` }}>{i}</span>;
}
const cellBg = (g: number) => g === 2 ? O : g === 1 ? "rgba(236,103,38,.28)" : "rgba(255,255,255,.04)";

export function Dashboard({ on }: { on: boolean }) {
  const [hover, setHover] = useState(0);
  useEffect(() => { if (!on) return; const id = setInterval(() => setHover((h) => (h + 1) % 4), 2300); return () => clearInterval(id); }, [on]);
  const cur = [[478, 200], [628, 520], [300, 382], [1012, 600]][hover];
  const quiz = [["Q1", 4], ["Q2", 3], ["Q3", 5], ["Q4", 2], ["Q5", 4]] as const;
  return (<div className="relative flex h-full w-full bg-bg font-sans text-white antialiased [font-feature-settings:'cv11','ss01']">
    <div className="flex w-[232px] flex-col border-r border-white/[.06] px-3 py-3" style={{ background: S1 }}>
      <div className="flex items-center gap-2.5 rounded-[10px] px-2 py-2 hover:bg-white/5">
        <span className="grid h-7 w-7 place-items-center rounded-[8px] text-xs font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.25)]" style={{ background: `linear-gradient(180deg,#EC6726,${O})` }}>SK</span>
        <span className="flex-1 leading-tight"><span className="block text-sm font-semibold tracking-[-.01em]">Sample Kitchen</span><span className="block text-xs text-white/70">Main · Pro</span></span>
        <CaretUpDown {...ic} size={14} className="text-white/70" /></div>
      <div className="mt-2 flex h-8 items-center gap-2 rounded-[8px] border border-white/[.07] bg-white/[.03] px-2.5 text-sm text-white/70"><MagnifyingGlass {...ic} size={14} /><span className="flex-1">Search</span><kbd className="rounded-[4px] border border-white/10 bg-white/[.04] px-1.5 font-sans text-xs text-white/70">⌘K</kbd></div>
      {NAV.map(([sec, items]) => <div key={sec} className="mt-5"><p className="px-2.5 pb-1.5 text-xs font-medium text-white/70">{sec}</p>
        {items.map(([n, Icon, b]) => { const act = n === "Library"; return <div key={n} className={`relative flex h-8 items-center gap-2.5 rounded-[8px] px-2.5 text-sm tracking-[-.01em] ${act ? "bg-white/[.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.05)]" : "text-white/70"}`}>
          {act && <span className="absolute -left-3 top-1.5 h-5 w-[2px] rounded-r" style={{ background: O }} />}<Icon {...ic} size={16} style={act ? { color: O } : {}} /><span className="flex-1">{n}</span>{b && <span className="rounded-full bg-white/10 px-1.5 text-xs font-medium tabular-nums text-white/70">{b}</span>}</div>; })}</div>)}
      <div className="mt-auto flex items-center gap-2.5 rounded-[10px] border border-white/[.06] p-2.5"><Av i="AM" c="#4d4d4d" s={28} /><span className="flex-1 leading-tight"><span className="block text-xs font-medium">Admin</span><span className="block text-xs text-white/70">Sample data only</span></span><Gear {...ic} size={14} className="text-white/70" /></div>
    </div>
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-[52px] items-center gap-3 border-b border-white/[.06] px-6">
        <span className="flex items-center gap-1.5 text-sm text-white/70">Sample Kitchen<CaretRight {...ic} size={13} /><span className="font-medium text-white">Library</span></span>
        <span className="ml-auto flex -space-x-1.5">{PEOPLE.slice(0, 4).map(([n, i, c]) => <Av key={n} i={i} c={c} />)}<span className="grid h-6 w-6 place-items-center rounded-full bg-[#2a2a2e] text-xs font-medium text-white/70 ring-2 ring-[#0b0b0c]">+8</span></span>
        <span className="h-5 w-px bg-white/10" />
        <span className="flex h-8 items-center gap-1.5 rounded-[8px] border border-white/10 bg-white/[.03] px-3 text-xs text-white/80"><ShareNetwork {...ic} size={13} />Share</span>
        <m.span animate={{ scale: hover === 3 ? 0.97 : 1 }} className="flex h-8 items-center gap-1.5 rounded-[8px] px-3 text-xs font-semibold text-white" style={{ background: O }}><Plus size={14} />Record new</m.span>
      </div>
      <div className="flex-1 overflow-hidden px-6 py-4">
        <div className="flex items-center gap-1 text-xs">{[["All", 24], ["Kitchen", 11], ["Front of house", 7], ["Cleaning", 6]].map(([x, c], k) => <span key={x} className={`relative flex h-7 items-center gap-1.5 rounded-full px-3 ${k ? "text-white/70" : "text-white"}`}>{!k && <span className="absolute inset-0 -z-0 rounded-full bg-white/[.08] ring-1 ring-white/10" />}<span className="relative">{x}</span><span className="relative tabular-nums text-white/70">{c}</span></span>)}
          <span className="ml-auto flex items-center gap-1.5 text-white/70"><ArrowsDownUp {...ic} size={13} />Last updated</span></div>
        <div className="mt-3 grid grid-cols-6 gap-3">{LIB.map(([t, v, st, d, b], i) => { const hv = hover === 0 && i === 1; return <m.div key={t} initial={false} animate={{ opacity: on ? 1 : 0, y: on ? (hv ? -3 : 0) : 14 }} transition={{ delay: on && !hv ? i * .06 : 0, duration: .5, ease }} className={`overflow-hidden ${panel} transition-[border-color] ${hv ? "!border-flame/60" : ""}`} style={{ background: S2 }}>
          <div className="relative aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(/video/${v}.webp)` }}>
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className={`absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-lg transition-all duration-300 ${hv ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}><Play size={13} weight="fill" className="ml-0.5" /></span>
            <span className="absolute bottom-1.5 right-1.5 rounded-[4px] bg-black/70 px-1 text-xs font-medium tabular-nums text-white">{d}</span></div>
          <div className="px-2.5 py-2"><p className="truncate text-xs font-medium tracking-[-.01em]">{t}</p>
            <div className="mt-1 flex items-center justify-between"><span className="text-xs tabular-nums text-white/70">{st} steps</span><span className={`rounded-full px-1.5 py-[1px] text-xs font-medium ring-1 ${BADGE[b]}`}>{b}</span></div></div></m.div>; })}</div>
        <div className="mt-4 grid grid-cols-[1.6fr_1fr] gap-4">
          <div className={`overflow-hidden ${panel}`} style={{ background: S2 }}>
            <div className="flex items-center justify-between px-4 py-3"><p className="text-sm font-semibold tracking-[-.01em]">Orientation Data <span className="font-normal text-white/70">· by person</span></p>
              <span className="flex items-center gap-3 text-xs text-white/70">{[[1, "Viewed"], [2, "Quiz passed"]].map(([g, l]) => <span key={l} className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-[3px]" style={{ background: cellBg(g as number) }} />{l}</span>)}</span></div>
            <div className="relative">
              <div className="sticky top-0 grid grid-cols-[150px_repeat(5,1fr)_70px] gap-1.5 border-y border-white/[.06] bg-card px-4 py-2 text-xs font-medium text-white/70">
                <span className={`flex items-center gap-1 ${hover === 2 ? "text-white" : ""}`}>Person<CaretDown {...ic} size={12} /></span>{["Opening", "Allergen", "Knives", "Fryer", "Turnover"].map((t) => <span key={t} className="truncate">{t}</span>)}<span className="text-right">Ready</span></div>
              <div className="space-y-2 px-4 py-3">{PEOPLE.map(([p, ini, c], r) => { const sc = GRID[r].reduce((a, b) => a + b, 0) / 10; return <div key={p} className={`grid grid-cols-[150px_repeat(5,1fr)_70px] items-center gap-1.5 rounded-[6px] ${hover === 2 && r === 0 ? "bg-white/[.03]" : ""}`}>
                <span className="flex items-center gap-2 text-xs text-white/85"><Av i={ini} c={c} s={22} />{p}</span>
                {GRID[r].map((g, k) => <m.span key={k} initial={false} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : .6 }} transition={{ delay: .4 + (r * 5 + k) * .025, duration: .35 }} className={`relative h-[36px] rounded-[6px] shadow-[inset_0_1px_0_rgba(255,255,255,.08)] ${hover === 1 && r === 2 && k === 3 ? "ring-2 ring-white/80" : ""}`} style={{ background: cellBg(g) }}>
                  {hover === 1 && r === 2 && k === 3 && <m.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-[34px] left-1/2 z-10 w-[190px] -translate-x-1/2 rounded-[8px] whitespace-nowrap border border-white/10 bg-[#26262a] px-2.5 py-2 text-left text-xs leading-[1.3] shadow-[0_10px_30px_rgba(0,0,0,.6)]"><span className="block font-semibold">Prep cook · Fryer cleaning</span><span className="mt-0.5 flex items-center gap-1 text-flame"><Check size={11} />Viewed · Quiz passed</span><span className="absolute -bottom-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-[#26262a]" /></m.span>}</m.span>)}
                <span className="flex items-center justify-end gap-2"><span className="h-1 w-8 overflow-hidden rounded-full bg-white/[.08]"><m.span className="block h-full rounded-full" style={{ background: O }} initial={false} animate={{ width: on ? `${sc * 100}%` : 0 }} transition={{ delay: .8, duration: 1, ease }} /></span><span className="w-7 text-right text-xs tabular-nums text-white/70">{Math.round(sc * 100)}%</span></span></div>; })}</div></div></div>
          <div className={`flex flex-col p-4 ${panel}`} style={{ background: S2 }}>
            <div className="flex items-center justify-between"><p className="text-sm font-semibold tracking-[-.01em]">Quiz results</p><span className="flex h-6 items-center gap-1 rounded-[6px] border border-white/10 px-2 text-xs text-white/70">Opening checklist<CaretDown {...ic} size={12} /></span></div>
            <svg viewBox="0 0 300 170" className="mt-3 w-full">
              <defs><linearGradient id="qb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EC6726" /><stop offset="1" stopColor={O} stopOpacity=".7" /></linearGradient></defs>
              {[0, 1, 2, 3, 4, 5].map((g) => <g key={g}><line x1="22" x2="300" y1={130 - g * 24} y2={130 - g * 24} stroke="rgba(255,255,255,.06)" strokeDasharray={g ? "2 3" : undefined} /><text x="14" y={133 - g * 24} fontSize="9" fill="rgba(255,255,255,.6)" textAnchor="end" className="tabular-nums">{g}</text></g>)}
              {quiz.map(([q, v], k) => { const x = 40 + k * 54, hgt = v * 24, lo = hover === 3 && k === 3; return <g key={q}>
                <m.rect x={x} width="30" rx="5" fill={lo ? "#EC6726" : "url(#qb)"} initial={false} animate={{ y: on ? 130 - hgt : 130, height: on ? hgt : 0 }} transition={{ delay: .6 + k * .1, duration: .9, ease }} />
                <text x={x + 15} y="145" fontSize="12" fill="rgba(255,255,255,.65)" textAnchor="middle">{q}</text>
                {lo && <text x={x + 15} y={122 - hgt} fontSize="12" fontWeight="600" fill="#fff" textAnchor="middle">{v}/5</text>}</g>; })}
            </svg>
            <div className={`mt-auto flex items-start gap-2.5 rounded-[10px] border px-3 py-2.5 text-xs leading-[1.3] transition-colors ${hover === 3 ? "border-flame/40 bg-flame/[.08] text-white" : "border-white/[.06] bg-white/[.03] text-white/70"}`}><Warning {...ic} size={14} className="mt-0.5 shrink-0" style={{ color: O }} />Q4 is missed most. Review the step 3 video with the team.</div></div>
        </div>
      </div>
    </div>
    <m.svg className="pointer-events-none absolute z-20 drop-shadow-[0_2px_6px_rgba(0,0,0,.6)]" width="18" height="22" viewBox="0 0 18 22" initial={false} animate={{ left: cur[0], top: cur[1] }} transition={{ duration: 1.1, ease }}><path d="M1 1v17l4.5-4 3 7 3-1.3-3-6.8H15z" fill="#fff" stroke="#000" strokeWidth="1.2" strokeLinejoin="round"/></m.svg>
  </div>);
}

/** Dashboard scaled to its container. Loaded lazily by the home page (WebShowcase) when it nears the viewport. */
export function LazyDash({ on }: { on: boolean }) { return <Fit><Dashboard on={on} /></Fit>; }
