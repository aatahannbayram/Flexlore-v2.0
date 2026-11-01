"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Device, SopScreen } from "./AppScreens";
import { Home, Library, Bell, BarChart3, ListChecks, Users, ChevronsUpDown, Search, Settings, ChevronRight, ChevronDown, Share2, Plus, ArrowUpDown, Play, Check, TriangleAlert } from "lucide-react";
const O = "#f5580a";
const ease = [0.22, 1, 0.36, 1] as const;
const W = 1180, H = 720;

function Fit({ children }: { children: React.ReactNode }) {
  const r = useRef<HTMLDivElement>(null); const [k, setK] = useState(0.5);
  useEffect(() => { const el = r.current; if (!el) return; const ro = new ResizeObserver(() => setK(el.clientWidth / W)); ro.observe(el); return () => ro.disconnect(); }, []);
  return (<div ref={r} className="relative w-full overflow-hidden" style={{ height: H * k }}><div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})` }}>{children}</div></div>);
}
const S1 = "#111113", S2 = "#161618", S3 = "#1f1f22";
const ic = { size: 16, strokeWidth: 1.5, absoluteStrokeWidth: true } as const;
const panel = "rounded-[12px] border border-white/[.07] shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_1px_2px_rgba(0,0,0,.4),0_12px_32px_-16px_rgba(0,0,0,.7)]";
const NAV: [string, [string, typeof Home, string?][]][] = [
  ["Workspace", [["Home", Home], ["Library", Library], ["Notices", Bell, "3"]]],
  ["Insights", [["Orientation Analyzer", BarChart3], ["Quizzes", ListChecks]]],
  ["Admin", [["Manage Access", Users]]],
];
const LIB = [["Opening checklist", "line", 6, "0:48", "Published"], ["Allergen handling", "plating", 4, "0:36", "Published"], ["Knife safety", "steam", 5, "0:52", "Draft"], ["Fryer cleaning", "kitchen", 7, "1:04", "Published"], ["Room turnover", "hotel", 8, "1:12", "In review"], ["Pallet receiving", "warehouse", 5, "0:44", "Published"]] as const;
const PEOPLE = [["Line cook 1", "LC", "#3b5bdb"], ["Line cook 2", "LK", "#0c8599"], ["Prep cook", "PC", "#7048e8"], ["Server", "SV", "#2b8a3e"], ["New starter", "NS", "#c2255c"]] as const;
// 0 none, 1 viewed, 2 viewed + quiz passed  (sample grid)
const GRID = [[2, 2, 2, 1, 0], [2, 1, 2, 2, 1], [1, 1, 0, 2, 0], [2, 2, 1, 1, 2], [1, 0, 0, 0, 0]];
const BADGE: Record<string, string> = { Published: "text-[#4cc38a] bg-[#30a46c]/12 ring-[#30a46c]/25", Draft: "text-white/60 bg-white/[.06] ring-white/10", "In review": "text-[#f5a524] bg-[#f5a524]/12 ring-[#f5a524]/25" };
function Av({ i, c, s = 24 }: { i: string; c: string; s?: number }) {
  return <span className="grid shrink-0 place-items-center rounded-full text-[10px] font-semibold text-white ring-2 ring-[#0b0b0c]" style={{ width: s, height: s, background: `linear-gradient(180deg,${c},${c}cc)` }}>{i}</span>;
}
const cellBg = (g: number) => g === 2 ? `linear-gradient(180deg,#ff7a2e,${O})` : g === 1 ? "rgba(245,88,10,.28)" : "rgba(255,255,255,.04)";

function Dashboard({ on }: { on: boolean }) {
  const [hover, setHover] = useState(0);
  useEffect(() => { if (!on) return; const id = setInterval(() => setHover((h) => (h + 1) % 4), 2300); return () => clearInterval(id); }, [on]);
  const cur = [[478, 200], [628, 520], [300, 382], [1012, 600]][hover];
  const quiz = [["Q1", 4], ["Q2", 3], ["Q3", 5], ["Q4", 2], ["Q5", 4]] as const;
  return (<div className="relative flex h-full w-full bg-[#0b0b0c] font-sans text-white antialiased [font-feature-settings:'cv11','ss01']">
    <aside className="flex w-[232px] flex-col border-r border-white/[.06] px-3 py-3" style={{ background: S1 }}>
      <div className="flex items-center gap-2.5 rounded-[10px] px-2 py-2 hover:bg-white/5">
        <span className="grid h-7 w-7 place-items-center rounded-[8px] text-[11px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.25)]" style={{ background: `linear-gradient(180deg,#ff7a2e,${O})` }}>SK</span>
        <span className="flex-1 leading-tight"><span className="block text-[13px] font-semibold tracking-[-.01em]">Sample Kitchen</span><span className="block text-[11px] text-white/45">Main · Pro</span></span>
        <ChevronsUpDown {...ic} size={14} className="text-white/40" /></div>
      <div className="mt-2 flex h-8 items-center gap-2 rounded-[8px] border border-white/[.07] bg-white/[.03] px-2.5 text-[13px] text-white/40"><Search {...ic} size={14} /><span className="flex-1">Search</span><kbd className="rounded-[4px] border border-white/10 bg-white/[.04] px-1.5 font-sans text-[10px] text-white/50">⌘K</kbd></div>
      {NAV.map(([sec, items]) => <div key={sec} className="mt-5"><p className="px-2.5 pb-1.5 text-[11px] font-medium text-white/35">{sec}</p>
        {items.map(([n, Icon, b]) => { const act = n === "Library"; return <div key={n} className={`relative flex h-8 items-center gap-2.5 rounded-[8px] px-2.5 text-[13px] tracking-[-.01em] ${act ? "bg-white/[.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.05)]" : "text-white/60"}`}>
          {act && <span className="absolute -left-3 top-1.5 h-5 w-[2px] rounded-r" style={{ background: O }} />}<Icon {...ic} size={16} style={act ? { color: O } : {}} /><span className="flex-1">{n}</span>{b && <span className="rounded-full bg-white/10 px-1.5 text-[10px] font-medium tabular-nums text-white/70">{b}</span>}</div>; })}</div>)}
      <div className="mt-auto flex items-center gap-2.5 rounded-[10px] border border-white/[.06] p-2.5"><Av i="AM" c="#495057" s={28} /><span className="flex-1 leading-tight"><span className="block text-[12px] font-medium">Admin</span><span className="block text-[10px] text-white/40">Sample data only</span></span><Settings {...ic} size={14} className="text-white/40" /></div>
    </aside>
    <main className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-[52px] items-center gap-3 border-b border-white/[.06] px-6">
        <span className="flex items-center gap-1.5 text-[13px] text-white/45">Sample Kitchen<ChevronRight {...ic} size={13} /><span className="font-medium text-white">Library</span></span>
        <span className="ml-auto flex -space-x-1.5">{PEOPLE.slice(0, 4).map(([n, i, c]) => <Av key={n} i={i} c={c} />)}<span className="grid h-6 w-6 place-items-center rounded-full bg-[#2a2a2e] text-[10px] font-medium text-white/70 ring-2 ring-[#0b0b0c]">+8</span></span>
        <span className="h-5 w-px bg-white/10" />
        <span className="flex h-8 items-center gap-1.5 rounded-[8px] border border-white/10 bg-white/[.03] px-3 text-[12px] text-white/80"><Share2 {...ic} size={13} />Share</span>
        <motion.span animate={{ scale: hover === 3 ? 0.97 : 1 }} className="flex h-8 items-center gap-1.5 rounded-[8px] px-3 text-[12px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_2px_8px_rgba(245,88,10,.35)]" style={{ background: O }}><Plus size={14} strokeWidth={2} />Record new</motion.span>
      </header>
      <div className="flex-1 overflow-hidden px-6 py-4">
        <div className="flex items-center gap-1 text-[12px]">{[["All", 24], ["Kitchen", 11], ["Front of house", 7], ["Cleaning", 6]].map(([x, c], k) => <span key={x} className={`relative flex h-7 items-center gap-1.5 rounded-full px-3 ${k ? "text-white/55" : "text-white"}`}>{!k && <span className="absolute inset-0 -z-0 rounded-full bg-white/[.08] ring-1 ring-white/10" />}<span className="relative">{x}</span><span className="relative tabular-nums text-white/35">{c}</span></span>)}
          <span className="ml-auto flex items-center gap-1.5 text-white/45"><ArrowUpDown {...ic} size={13} />Last updated</span></div>
        <div className="mt-3 grid grid-cols-6 gap-3">{LIB.map(([t, v, st, d, b], i) => { const hv = hover === 0 && i === 1; return <motion.div key={t} initial={false} animate={{ opacity: on ? 1 : 0, y: on ? (hv ? -3 : 0) : 14 }} transition={{ delay: on && !hv ? i * .06 : 0, duration: .5, ease }} className={`overflow-hidden ${panel} transition-[border-color] ${hv ? "!border-[#f5580a]/60" : ""}`} style={{ background: S2 }}>
          <div className="relative aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(/video/${v}.jpg)` }}>
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className={`absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow-lg transition-all duration-300 ${hv ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}><Play size={13} fill="currentColor" strokeWidth={0} className="ml-0.5" /></span>
            <span className="absolute bottom-1.5 right-1.5 rounded-[4px] bg-black/70 px-1 text-[10px] font-medium tabular-nums text-white">{d}</span></div>
          <div className="px-2.5 py-2"><p className="truncate text-[12px] font-medium tracking-[-.01em]">{t}</p>
            <div className="mt-1 flex items-center justify-between"><span className="text-[10px] tabular-nums text-white/40">{st} steps</span><span className={`rounded-full px-1.5 py-[1px] text-[9px] font-medium ring-1 ${BADGE[b]}`}>{b}</span></div></div></motion.div>; })}</div>
        <div className="mt-4 grid grid-cols-[1.6fr_1fr] gap-4">
          <div className={`overflow-hidden ${panel}`} style={{ background: S2 }}>
            <div className="flex items-center justify-between px-4 py-3"><p className="text-[13px] font-semibold tracking-[-.01em]">Orientation Data <span className="font-normal text-white/40">· by person</span></p>
              <span className="flex items-center gap-3 text-[11px] text-white/50">{[[1, "Viewed"], [2, "Quiz passed"]].map(([g, l]) => <span key={l} className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-[3px]" style={{ background: cellBg(g as number) }} />{l}</span>)}</span></div>
            <div className="relative">
              <div className="sticky top-0 grid grid-cols-[150px_repeat(5,1fr)_70px] gap-1.5 border-y border-white/[.06] bg-[#1a1a1c] px-4 py-2 text-[11px] font-medium text-white/45">
                <span className={`flex items-center gap-1 ${hover === 2 ? "text-white" : ""}`}>Person<ChevronDown {...ic} size={12} /></span>{["Opening", "Allergen", "Knives", "Fryer", "Turnover"].map((t) => <span key={t} className="truncate">{t}</span>)}<span className="text-right">Ready</span></div>
              <div className="space-y-2 px-4 py-3">{PEOPLE.map(([p, ini, c], r) => { const sc = GRID[r].reduce((a, b) => a + b, 0) / 10; return <div key={p} className={`grid grid-cols-[150px_repeat(5,1fr)_70px] items-center gap-1.5 rounded-[6px] ${hover === 2 && r === 0 ? "bg-white/[.03]" : ""}`}>
                <span className="flex items-center gap-2 text-[12px] text-white/85"><Av i={ini} c={c} s={22} />{p}</span>
                {GRID[r].map((g, k) => <motion.span key={k} initial={false} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : .6 }} transition={{ delay: .4 + (r * 5 + k) * .025, duration: .35 }} className={`relative h-[36px] rounded-[6px] shadow-[inset_0_1px_0_rgba(255,255,255,.08)] ${hover === 1 && r === 2 && k === 3 ? "ring-2 ring-white/80" : ""}`} style={{ background: cellBg(g) }}>
                  {hover === 1 && r === 2 && k === 3 && <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-[34px] left-1/2 z-10 w-[190px] -translate-x-1/2 rounded-[8px] whitespace-nowrap border border-white/10 bg-[#26262a] px-2.5 py-2 text-left text-[11px] leading-[1.3] shadow-[0_10px_30px_rgba(0,0,0,.6)]"><span className="block font-semibold">Prep cook · Fryer cleaning</span><span className="mt-0.5 flex items-center gap-1 text-[#4cc38a]"><Check size={11} strokeWidth={2.5} />Viewed · Quiz passed</span><span className="absolute -bottom-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-[#26262a]" /></motion.span>}</motion.span>)}
                <span className="flex items-center justify-end gap-2"><span className="h-1 w-8 overflow-hidden rounded-full bg-white/[.08]"><motion.span className="block h-full rounded-full" style={{ background: O }} initial={false} animate={{ width: on ? `${sc * 100}%` : 0 }} transition={{ delay: .8, duration: 1, ease }} /></span><span className="w-7 text-right text-[11px] tabular-nums text-white/60">{Math.round(sc * 100)}%</span></span></div>; })}</div></div></div>
          <div className={`flex flex-col p-4 ${panel}`} style={{ background: S2 }}>
            <div className="flex items-center justify-between"><p className="text-[13px] font-semibold tracking-[-.01em]">Quiz results</p><span className="flex h-6 items-center gap-1 rounded-[6px] border border-white/10 px-2 text-[11px] text-white/60">Opening checklist<ChevronDown {...ic} size={12} /></span></div>
            <svg viewBox="0 0 300 170" className="mt-3 w-full">
              <defs><linearGradient id="qb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff8a3d" /><stop offset="1" stopColor={O} stopOpacity=".7" /></linearGradient></defs>
              {[0, 1, 2, 3, 4, 5].map((g) => <g key={g}><line x1="22" x2="300" y1={130 - g * 24} y2={130 - g * 24} stroke="rgba(255,255,255,.06)" strokeDasharray={g ? "2 3" : undefined} /><text x="14" y={133 - g * 24} fontSize="9" fill="rgba(255,255,255,.35)" textAnchor="end" className="tabular-nums">{g}</text></g>)}
              {quiz.map(([q, v], k) => { const x = 40 + k * 54, hgt = v * 24, lo = hover === 3 && k === 3; return <g key={q}>
                <motion.rect x={x} width="30" rx="5" fill={lo ? "#ff9a55" : "url(#qb)"} initial={false} animate={{ y: on ? 130 - hgt : 130, height: on ? hgt : 0 }} transition={{ delay: .6 + k * .1, duration: .9, ease }} />
                <text x={x + 15} y="145" fontSize="10" fill="rgba(255,255,255,.5)" textAnchor="middle">{q}</text>
                {lo && <text x={x + 15} y={122 - hgt} fontSize="10" fontWeight="600" fill="#fff" textAnchor="middle">{v}/5</text>}</g>; })}
            </svg>
            <div className={`mt-auto flex items-start gap-2.5 rounded-[10px] border px-3 py-2.5 text-[12px] leading-[1.3] transition-colors ${hover === 3 ? "border-[#f5580a]/40 bg-[#f5580a]/[.08] text-white" : "border-white/[.06] bg-white/[.03] text-white/70"}`}><TriangleAlert {...ic} size={14} className="mt-0.5 shrink-0" style={{ color: O }} />Q4 is missed most. Review the step 3 video with the team.</div></div>
        </div>
      </div>
    </main>
    <motion.svg className="pointer-events-none absolute z-20 drop-shadow-[0_2px_6px_rgba(0,0,0,.6)]" width="18" height="22" viewBox="0 0 18 22" initial={false} animate={{ left: cur[0], top: cur[1] }} transition={{ duration: 1.1, ease }}><path d="M1 1v17l4.5-4 3 7 3-1.3-3-6.8H15z" fill="#fff" stroke="#000" strokeWidth="1.2" strokeLinejoin="round"/></motion.svg>
  </div>);
}

export function WebSection({ lang }: { lang: "en" | "tr" }) {
  const ref = useRef<HTMLDivElement>(null); const on = useInView(ref, { amount: 0.3 });
  const sec = useRef<HTMLElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: sec, offset: ["start end", "center center"] });
  const rx = useTransform(p, [0, 1], reduce ? [0, 0] : [22, 0]);
  const sc = useTransform(p, [0, 1], reduce ? [1, 1] : [0.86, 1]);
  const bo = useTransform(p, [0, 0.6], [0.2, 1]);
  const px = useTransform(p, [0.35, 1], reduce ? [0, 0] : [140, 0]);
  const po = useTransform(p, [0.35, 0.9], [0, 1]);
  const glow = useTransform(p, [0.3, 1], [0, 1]);
  const tr = lang === "tr";
  return (<section ref={sec} id="web" aria-label="Flexlore Web" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
    <motion.div aria-hidden="true" style={{ opacity: glow }} className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[60%] max-w-[1100px] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,106,26,.13),transparent)]" />
    <div className="relative mx-auto max-w-[1400px]">
      <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div><p className="mono text-[11px] uppercase tracking-[.2em] text-flame">03 — {tr ? "Web'de de" : "Also on the web"}</p>
          <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)] text-white">Flexlore Web.</h2></div>
        <p className="max-w-sm text-[17px] leading-[1.3] text-white/65 md:pb-3">{tr ? "Telefonda kaydedin, masada yönetin. Aynı kütüphane, aynı oryantasyon verisi, büyük ekranda." : "Record on the phone, manage from the desk. The same library and orientation data, on a big screen."}</p>
      </div>
      <div ref={ref} className="relative mt-14 [perspective:1800px] md:mt-20 lg:mr-[170px]">
        <motion.div style={{ rotateX: rx, scale: sc, opacity: bo, transformOrigin: "50% 100%" }} className="overflow-hidden rounded-[10px] bg-[#1a1a1c] shadow-[0_60px_160px_rgba(0,0,0,.8)] ring-1 ring-white/[.12] md:rounded-[14px]">
          <div className="flex h-7 items-center gap-1.5 border-b border-white/[.06] bg-[#222225] px-3 md:h-9 md:gap-2 md:px-4">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57] md:h-3 md:w-3" /><span className="h-2 w-2 rounded-full bg-[#febc2e] md:h-3 md:w-3" /><span className="h-2 w-2 rounded-full bg-[#28c840] md:h-3 md:w-3" />
            <span className="mx-auto flex h-5 w-[min(60%,380px)] items-center justify-center gap-1.5 rounded-md bg-black/30 text-[9px] text-white/55 md:h-6 md:text-[11px]"><svg width="9" height="10" viewBox="0 0 9 10" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1" y="4.5" width="7" height="5" rx="1"/><path d="M2.5 4.5V3a2 2 0 0 1 4 0v1.5"/></svg>app.flexlore.com/library</span><span className="w-6 md:w-12" /></div>
          <Fit><Dashboard on={on} /></Fit>
        </motion.div>
        <motion.div style={{ x: px, opacity: po }} className="absolute -bottom-20 right-2 w-[78px] sm:-bottom-12 sm:w-[130px] lg:-bottom-12 lg:-right-[170px] lg:w-[210px]" aria-hidden="true"><Device label="Flexlore mobile app"><SopScreen active={on} /></Device></motion.div>
      </div>
      <p className="mono mt-16 text-[10px] uppercase tracking-[.2em] text-white/35">{tr ? "Örnek veriler · gösterim amaçlı" : "Sample data · for illustration"}</p>
    </div></section>);
}

export function Platforms({ lang }: { lang: "en" | "tr" }) {
  const tr = lang === "tr";
  const items: [string, string, string][] = [
    ["iOS", tr ? "iPhone uygulaması" : "iPhone app", "M12 3c.9 0 2-.6 2.5-1.5M8.5 7c-2.5 0-4 2-4 5 0 3.5 2.3 8 4.2 8 1 0 1.5-.6 2.8-.6s1.7.6 2.8.6c1.6 0 3.4-3.3 3.9-5.1-1.6-.7-2.4-2-2.4-3.6 0-1.4.8-2.6 2-3.3-.8-1.1-2-1.7-3.3-1.7-1.3 0-2 .7-3 .7s-1.7-.7-3-.7Z"],
    ["Android", tr ? "Google Play" : "Google Play", "M6 9h12v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zM7 9a5 5 0 0 1 10 0M9 6 7.5 4M15 6l1.5-2M3.5 10v5M20.5 10v5"],
    ["Web", tr ? "Tarayıcıda yönetim" : "Manage in the browser", "M3 5h18v12H3zM8 21h8M12 17v4"],
  ];
  return (<section aria-label={tr ? "Platformlar" : "Platforms"} className="relative px-5 pb-28 md:px-10 md:pb-36">
    <div className="mx-auto max-w-[1400px]">
      <ul className="grid grid-cols-2 border-y border-white/10 md:grid-cols-3">
        {items.map(([h, s, d], i) => <motion.li key={h} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .6 }} transition={{ delay: i * .08, duration: .7, ease }}
          className={`group flex items-center gap-4 py-7 md:py-9 ${i % 2 ? "pl-5" : ""} ${i ? "md:border-l md:border-white/10 md:pl-8" : ""} ${i > 1 ? "border-t border-white/10 md:border-t-0" : ""}`}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/[.06] text-white/80 ring-1 ring-white/10 transition duration-500 group-hover:bg-flame group-hover:text-black group-hover:ring-flame">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg></span>
          <span><span className="block text-[17px] font-semibold tracking-[-.02em]">{h}</span><span className="block text-[12.5px] text-white/50">{s}</span></span></motion.li>)}
      </ul>
    </div></section>);
}
