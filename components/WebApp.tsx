"use client";
import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Bell, Books, CaretDown, CaretUpDown, ChartBar, Gear, House, ListChecks, MagnifyingGlass, Play, Users } from "./ui/icons";
const ease = [0.22, 1, 0.36, 1] as const;
const W = 1180, H = 720;

export function Fit({ children }: { children: React.ReactNode }) {
  const r = useRef<HTMLDivElement>(null); const [k, setK] = useState(0.5);
  useEffect(() => { const el = r.current; if (!el) return; const ro = new ResizeObserver(() => setK(el.clientWidth / W)); ro.observe(el); return () => ro.disconnect(); }, []);
  return (<div ref={r} className="relative w-full overflow-hidden" style={{ height: H * k }}><div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})` }}>{children}</div></div>);
}

// Palette mirrors the phone app: bg #111111, cards #161616, tracks #252525. Orange appears once: the "needs review" marker.
const CARD = "#161616", TRACK = "#252525", SIDE = "#0E0E0E";
const panel = "rounded-[12px] border border-white/[.06] shadow-[inset_0_1px_0_rgba(255,255,255,.03)]";
const NAV = [["Home", House], ["Library", Books], ["Readiness", ChartBar], ["Quizzes", ListChecks], ["Team", Users]] as const;
const KPI = [
  { l: "Ready to work", v: 82, s: "%", d: "+6 pts this month", p: [61, 64, 66, 70, 71, 75, 79, 82] },
  { l: "Jobs published", v: 24, s: "", d: "+3 this week", p: [12, 14, 15, 17, 18, 20, 21, 24] },
  { l: "Quizzes passed", v: 91, s: "%", d: "First try 74%", p: [84, 86, 85, 88, 87, 89, 90, 91] },
  { l: "Needs review", v: 3, s: "", d: "2 quizzes, 1 job", p: [6, 5, 7, 4, 5, 3, 4, 3], flag: true },
];
const LIB = [["Opening checklist", "line", 6, "0:48", "Published"], ["Allergen handling", "plating", 4, "0:36", "Published"], ["Fryer cleaning", "kitchen", 7, "1:04", "In review"], ["Room turnover", "hotel", 8, "1:12", "Draft"]] as const;
const LOC = [["Downtown", 92, 18], ["Airport", 86, 14], ["Harbor", 79, 11], ["Midtown", 64, 16], ["Riverside", 88, 9]] as const;
const NEW = [["Maya L.", "ML", "Kitchen", 2, 5], ["Omar S.", "OS", "Front of house", 4, 7], ["Lena K.", "LK", "Housekeeping", 1, 2]] as const;
const TEAM = [["Theo B.", "TB", "Shift lead", "Ready"], ["Ana R.", "AR", "Line cook", "Ready"], ["Sam T.", "ST", "Prep cook", "Training"], ["Jules P.", "JP", "Server", "Ready"], ["Kai M.", "KM", "Dishwasher", "Training"]] as const;
const TREND = [61, 64, 66, 70, 71, 75, 79, 82];

function Av({ i, s = 24, t = 0 }: { i: string; s?: number; t?: number }) {
  const g = ["#3A3A3A", "#2E2E2E", "#444444"][t % 3];
  return <span className="grid shrink-0 place-items-center rounded-full font-semibold text-ice-200 ring-1 ring-white/10" style={{ width: s, height: s, fontSize: s * 0.4, background: `linear-gradient(180deg,${g},#1E1E1E)` }}>{i}</span>;
}
function useCount(to: number, on: boolean, still: boolean) {
  const [v, setV] = useState(still ? to : 0);
  useEffect(() => {
    if (!on || still) { setV(still ? to : 0); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1200); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [on, still, to]);
  return v;
}
function Spark({ p, on }: { p: readonly number[]; on: boolean }) {
  const lo = Math.min(...p), hi = Math.max(...p), pts = p.map((v, i) => [i * 10, 22 - ((v - lo) / (hi - lo || 1)) * 18] as const);
  const [lx, ly] = pts[pts.length - 1];
  return <svg viewBox="-2 0 76 26" className="h-[26px] w-[76px] text-ice-400">
    <m.polyline points={pts.map((x) => x.join(",")).join(" ")} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 1.1, delay: .3, ease }} />
    <m.circle cx={lx} cy={ly} r="2.2" className="fill-ice-100" initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: 1.3 }} /></svg>;
}
function Kpi({ k, i, on, still }: { k: (typeof KPI)[number]; i: number; on: boolean; still: boolean }) {
  const v = useCount(k.v, on, still);
  return <m.div initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 10 }} transition={{ delay: i * .07, duration: .5, ease }} className={`flex flex-col justify-between px-4 py-3.5 ${panel}`} style={{ background: CARD }}>
    <p className="flex items-center gap-1.5 text-xs text-ice-400">{k.flag && <i className="h-1.5 w-1.5 rounded-full bg-accent" />}{k.l}</p>
    <div className="flex items-end justify-between">
      <div><p className="text-[28px] font-semibold leading-none tracking-[-.03em] tabular-nums text-ice-50">{v}<span className="text-lg text-ice-400">{k.s}</span></p><p className="mt-1.5 text-xs text-ice-500">{k.d}</p></div>
      <Spark p={k.p} on={on} /></div></m.div>;
}
function Head({ t, r }: { t: string; r?: React.ReactNode }) {
  return <div className="flex h-11 items-center justify-between px-4"><p className="text-sm font-medium tracking-[-.01em] text-ice-100">{t}</p>{r}</div>;
}

export function Dashboard({ on }: { on: boolean }) {
  const still = !!useReducedMotion();
  const [hover, setHover] = useState(-1);
  useEffect(() => { if (!on || still) return; const id = setInterval(() => setHover((h) => (h + 1) % 4), 2400); return () => clearInterval(id); }, [on, still]);
  const cur = ([[468, 262], [516, 470], [1010, 348], [1112, 28]] as const)[Math.max(0, hover)];
  const tx = (i: number) => 12 + i * 33.5, ty = (v: number) => 108 - ((v - 55) / 30) * 88;
  const line = TREND.map((v, i) => `${i ? "L" : "M"}${tx(i)},${ty(v)}`).join("");
  const last = [tx(7), ty(82)] as const;
  return (<div className="relative flex h-full w-full bg-bg font-sans text-ice-100 antialiased">
    <aside className="flex w-[216px] flex-col border-r border-white/[.05] px-3 py-3" style={{ background: SIDE }}>
      <div className="flex items-center gap-2.5 rounded-[10px] px-2 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-ice-100 text-xs font-bold text-bg">SK</span>
        <span className="flex-1 leading-tight"><span className="block text-sm font-medium tracking-[-.01em]">Sample Kitchen</span><span className="block text-xs text-ice-500">5 locations</span></span>
        <CaretUpDown size={14} className="text-ice-500" /></div>
      <nav className="mt-4 space-y-0.5">{NAV.map(([n, Icon], i) => <div key={n} className={`flex h-8 items-center gap-2.5 rounded-[8px] px-2.5 text-sm tracking-[-.01em] ${i ? "text-ice-400" : "bg-white/[.06] text-ice-50"}`}><Icon size={16} className={i ? "text-ice-500" : "text-ice-200"} /><span className="flex-1">{n}</span>{n === "Quizzes" && <span className="text-xs tabular-nums text-ice-500">12</span>}</div>)}</nav>
      <p className="mt-6 px-2.5 pb-1.5 text-xs text-ice-500">Locations</p>
      {LOC.slice(0, 4).map(([n]) => <div key={n} className="flex h-7 items-center gap-2.5 px-2.5 text-sm text-ice-400"><i className="h-1.5 w-1.5 rounded-full bg-ice-500" />{n}</div>)}
      <div className="mt-auto flex items-center gap-2.5 rounded-[10px] border border-white/[.05] p-2.5"><Av i="AM" s={28} /><span className="flex-1 leading-tight"><span className="block text-xs font-medium">Admin</span><span className="block text-xs text-ice-500">Sample data only</span></span><Gear size={14} className="text-ice-500" /></div>
    </aside>
    <div className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-[52px] items-center gap-3 border-b border-white/[.05] px-6">
        <span className="text-sm text-ice-500">Sample Kitchen <span className="px-1 text-ice-500/60">/</span><span className="font-medium text-ice-100">Overview</span></span>
        <span className="ml-6 flex h-8 w-[260px] items-center gap-2 rounded-[8px] border border-white/[.06] bg-white/[.02] px-2.5 text-sm text-ice-500"><MagnifyingGlass size={14} /><span className="flex-1">Search jobs, people</span><kbd className="rounded-[4px] border border-white/[.08] px-1.5 font-sans text-xs">⌘K</kbd></span>
        <span className="ml-auto flex h-8 items-center gap-1.5 rounded-[8px] border border-white/[.06] px-3 text-xs text-ice-300">This month<CaretDown size={12} /></span>
        <span className="relative grid h-8 w-8 place-items-center rounded-[8px] border border-white/[.06] text-ice-400"><Bell size={15} /></span>
        <m.span animate={{ scale: hover === 3 ? 0.96 : 1 }} className="flex h-8 items-center gap-2 rounded-[8px] bg-ice-100 px-3 text-xs font-semibold text-bg"><i className="h-2 w-2 rounded-full bg-bg ring-2 ring-bg/20" />New job</m.span>
      </header>
      <main className="flex-1 overflow-hidden px-6 pb-5 pt-5">
        <div className="grid h-[88px] grid-cols-4 gap-4">{KPI.map((k, i) => <Kpi key={k.l} k={k} i={i} on={on} still={still} />)}</div>
        <div className="mt-4 grid h-[524px] grid-cols-[1fr_300px] gap-4">
          <div className="flex min-w-0 flex-col gap-4">
            <section className={`pb-3.5 ${panel}`} style={{ background: CARD }}>
              <Head t="Library" r={<span className="flex items-center gap-3 text-xs text-ice-500">{["All 24", "Kitchen 11", "Front of house 7"].map((x, i) => <span key={x} className={i ? "" : "text-ice-100"}>{x}</span>)}</span>} />
              <div className="grid grid-cols-4 gap-3 px-3.5">{LIB.map(([t, v, st, d, b], i) => { const hv = hover === 0 && i === 1; return <m.div key={t} initial={false} animate={{ opacity: on ? 1 : 0, y: on ? (hv ? -2 : 0) : 10 }} transition={{ delay: on && !hv ? .2 + i * .06 : 0, duration: .5, ease }}>
                <div className={`relative aspect-[16/10] overflow-hidden rounded-[8px] bg-cover bg-center ring-1 transition-[box-shadow] ${hv ? "ring-white/30" : "ring-white/[.06]"}`} style={{ backgroundImage: `url(/video/${v}.webp)` }}>
                  <span className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/5" />
                  <span className={`absolute left-1/2 top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black transition-all duration-300 ${hv ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}><Play size={11} weight="fill" className="ml-0.5" /></span>
                  <span className="absolute bottom-1.5 right-1.5 rounded-[4px] bg-black/60 px-1 text-xs tabular-nums text-ice-100">{d}</span></div>
                <p className="mt-2 truncate text-xs font-medium text-ice-100">{t}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ice-500"><span className="tabular-nums">{st} steps</span><i className="h-[3px] w-[3px] rounded-full bg-ice-500" /><span className={b === "Published" ? "text-ice-300" : ""}>{b}</span></p></m.div>; })}</div>
            </section>
            <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
              <section className={`flex flex-col ${panel}`} style={{ background: CARD }}>
                <Head t="Readiness" r={<span className="text-xs text-ice-500">Last 8 weeks</span>} />
                <p className="px-4 text-xs text-ice-500"><span className="text-xl font-semibold tracking-[-.02em] tabular-nums text-ice-50">82%</span> <span className="ml-1 text-ice-300">+21 pts</span></p>
                <svg viewBox="0 0 260 128" className="mt-auto w-full px-2 pb-2 text-ice-200">
                  <defs><linearGradient id="wa-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".14" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
                  {[0, 1, 2, 3].map((g) => <line key={g} x1="0" x2="260" y1={20 + g * 29} y2={20 + g * 29} stroke="rgb(255 255 255 / .05)" strokeDasharray="2 4" />)}
                  <m.path d={`${line}L${tx(7)},120L${tx(0)},120Z`} fill="url(#wa-fill)" initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: 1, duration: .8 }} />
                  <m.path d={line} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ delay: .4, duration: 1.3, ease }} />
                  <line x1={last[0]} x2={last[0]} y1={last[1]} y2="120" stroke="rgb(255 255 255 / .18)" strokeDasharray="2 3" opacity={hover === 1 ? 1 : 0} className="transition-opacity" />
                  <m.circle cx={last[0]} cy={last[1]} r={hover === 1 ? 4 : 3} className="fill-ice-50" stroke={CARD} strokeWidth="2" initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: 1.6 }} />
                </svg>
              </section>
              <section className={panel} style={{ background: CARD }}>
                <Head t="Orientation" r={<span className="text-xs text-ice-500">3 new starters</span>} />
                <div className="space-y-3.5 px-4 pt-1">{NEW.map(([n, i, team, day, done], r) => <div key={n}>
                  <div className="flex items-center gap-2.5"><Av i={i} s={24} t={r} /><span className="flex-1 leading-tight"><span className="block text-xs font-medium text-ice-100">{n}</span><span className="block text-xs text-ice-500">Day {day} · {team}</span></span><span className="text-xs tabular-nums text-ice-400">{done}/8</span></div>
                  <div className="mt-2 grid grid-cols-8 gap-1">{Array.from({ length: 8 }, (_, s) => <m.i key={s} className="h-1 origin-left rounded-full" style={{ background: TRACK }} initial={false} animate={{ backgroundColor: on && s < done ? "#B3BCBE" : TRACK }} transition={{ delay: .6 + r * .15 + s * .05, duration: .3 }} />)}</div></div>)}</div>
              </section>
            </div>
          </div>
          <div className="flex min-h-0 flex-col gap-4">
            <section className={`pb-2 ${panel}`} style={{ background: CARD }}>
              <Head t="Readiness by location" r={<span className="text-xs text-ice-500">People</span>} />
              {LOC.map(([n, p, ppl], i) => <div key={n} className={`mx-2 flex h-9 items-center gap-3 rounded-[8px] px-2 transition-colors ${hover === 2 && i === 3 ? "bg-white/[.04]" : ""}`}>
                <span className="w-[74px] text-xs text-ice-200">{n}</span>
                <span className="h-1 flex-1 overflow-hidden rounded-full" style={{ background: TRACK }}><m.span className="block h-full rounded-full bg-ice-300" initial={false} animate={{ width: on ? `${p}%` : 0 }} transition={{ delay: .5 + i * .08, duration: 1, ease }} /></span>
                <span className="w-8 text-right text-xs tabular-nums text-ice-100">{p}%</span><span className="w-5 text-right text-xs tabular-nums text-ice-500">{ppl}</span></div>)}
            </section>
            <section className={`min-h-0 flex-1 ${panel}`} style={{ background: CARD }}>
              <Head t="On shift now" r={<span className="text-xs tabular-nums text-ice-500">5 of 12</span>} />
              <div className="space-y-1 px-2">{TEAM.map(([n, i, role, st], r) => <div key={n} className="flex h-[38px] items-center gap-2.5 px-2">
                <Av i={i} s={26} t={r} /><span className="flex-1 leading-tight"><span className="block text-xs font-medium text-ice-100">{n}</span><span className="block text-xs text-ice-500">{role}</span></span>
                <span className={`flex items-center gap-1.5 text-xs ${st === "Ready" ? "text-ice-300" : "text-ice-500"}`}><i className={`h-1.5 w-1.5 rounded-full ${st === "Ready" ? "bg-ice-300" : "border border-ice-500"}`} />{st}</span></div>)}</div>
            </section>
          </div>
        </div>
      </main>
    </div>
    {!still && <m.svg className="pointer-events-none absolute z-20 drop-shadow-[0_2px_6px_rgba(0,0,0,.6)]" width="16" height="20" viewBox="0 0 18 22" initial={false} animate={{ left: cur[0], top: cur[1], opacity: hover < 0 ? 0 : 1 }} transition={{ duration: 1.1, ease }}><path d="M1 1v17l4.5-4 3 7 3-1.3-3-6.8H15z" fill="#fff" stroke="#000" strokeWidth="1.2" strokeLinejoin="round" /></m.svg>}
  </div>);
}

/** Dashboard scaled to its container. Loaded lazily by the home page (WebShowcase) when it nears the viewport. */
export function LazyDash({ on }: { on: boolean }) { return <Fit><Dashboard on={on} /></Fit>; }
