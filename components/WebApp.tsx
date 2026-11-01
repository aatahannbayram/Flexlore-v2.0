"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Device, SopScreen } from "./AppScreens";
const O = "#f5580a";
const ease = [0.22, 1, 0.36, 1] as const;
const W = 1180, H = 720;

function Fit({ children }: { children: React.ReactNode }) {
  const r = useRef<HTMLDivElement>(null); const [k, setK] = useState(0.5);
  useEffect(() => { const el = r.current; if (!el) return; const ro = new ResizeObserver(() => setK(el.clientWidth / W)); ro.observe(el); return () => ro.disconnect(); }, []);
  return (<div ref={r} className="relative w-full overflow-hidden" style={{ height: H * k }}><div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})` }}>{children}</div></div>);
}
const NAV = [["Home", "M3 9.5 10 4l7 5.5V17H3z"], ["Library", "M4 4h5v12H4zM11 4h5v12h-5z"], ["Notices", "M4 5h12v8H8l-4 3z"], ["Orientation Analyzer", "M4 16V9M10 16V4M16 16v-5"], ["Quizzes", "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 10v.01M8 8a2 2 0 1 1 3 1.7c-.6.4-1 .8-1 1.3"], ["Manage Access", "M7 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 8a5 5 0 0 1 10 0M14 6h4M16 4v4"]] as const;
const LIB = [["Opening checklist", "line", "6 steps"], ["Allergen handling", "plating", "4 steps"], ["Knife safety", "steam", "5 steps"], ["Fryer cleaning", "kitchen", "7 steps"], ["Room turnover", "hotel", "8 steps"], ["Pallet receiving", "warehouse", "5 steps"]] as const;
const PEOPLE = ["Line cook 1", "Line cook 2", "Prep cook", "Server", "New starter"];
// 0 none, 1 viewed, 2 viewed + quiz passed  (sample grid)
const GRID = [[2, 2, 2, 1, 0], [2, 1, 2, 2, 1], [1, 1, 0, 2, 0], [2, 2, 1, 1, 2], [1, 0, 0, 0, 0]];

function Dashboard({ on }: { on: boolean }) {
  const [hover, setHover] = useState(0);
  useEffect(() => { if (!on) return; const id = setInterval(() => setHover((h) => (h + 1) % 3), 2200); return () => clearInterval(id); }, [on]);
  const cur = [[520, 250], [720, 520], [1030, 470]][hover];
  return (<div className="relative flex h-full w-full bg-[#0b0b0c] font-sans text-white antialiased">
    <aside className="flex w-[220px] flex-col border-r border-white/[.06] bg-[#111113] px-4 py-5">
      <div className="flex items-center gap-2 px-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={O} strokeWidth="3" strokeLinecap="round"><path d="M4 4l16 16M20 4 4 20"/></svg><span className="text-[15px] font-semibold tracking-[-.01em]">Flexlore</span><span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-white/80">PRO</span></div>
      <div className="mt-6 rounded-xl bg-[#1c1c1e] px-3 py-2.5 text-[12px] text-white/85">Sample Kitchen · Main ▾</div>
      <nav className="mt-5 space-y-1">{NAV.map(([n, d], i) => <div key={n} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] ${i === 1 ? "bg-white/[.07] text-white" : "text-white/60"}`}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke={i === 1 ? O : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>{n}</div>)}</nav>
      <div className="mt-auto rounded-xl border border-white/[.06] p-3 text-[11px] text-white/55">Sample workspace<br /><span className="text-white/35">All data shown is illustrative</span></div>
    </aside>
    <main className="flex-1 overflow-hidden px-7 py-5">
      <div className="flex items-center gap-3"><h3 className="text-[20px] font-semibold tracking-[-.02em]">Library</h3>
        <div className="ml-6 flex h-9 flex-1 items-center gap-2 rounded-xl bg-[#1c1c1e] px-3 text-[12px] text-white/40"><svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="4.5"/><path d="m9.5 9.5 3 3"/></svg>Search in the workspaces</div>
        <span className="rounded-xl px-4 py-2 text-[12px] font-medium text-white" style={{ background: O }}>+ Record new</span></div>
      <div className="mt-4 flex gap-2 text-[11.5px]">{["All", "Kitchen", "Front of house", "Cleaning"].map((x, i) => <span key={x} className={`rounded-full px-3 py-1.5 ${i ? "bg-[#1c1c1e] text-white/65" : "bg-white text-black"}`}>{x}</span>)}</div>
      <div className="mt-4 grid grid-cols-6 gap-3">{LIB.map(([t, v, s], i) => <motion.div key={t} initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 14 }} transition={{ delay: i * .07, duration: .6, ease }} className={`overflow-hidden rounded-2xl bg-[#1a1a1c] transition-shadow ${hover === 0 && i === 1 ? "ring-1 ring-[#f5580a]/70" : ""}`}>
        <div className="relative aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(/video/${v}.jpg)` }}><span className="absolute bottom-1.5 left-1.5 grid h-5 w-5 place-items-center rounded-full bg-black/60"><span className="ml-[1px] h-0 w-0 border-y-[3.5px] border-l-[5px] border-y-transparent border-l-white" /></span></div>
        <div className="px-2.5 py-2"><p className="truncate text-[11.5px] font-medium">{t}</p><p className="text-[10px] text-white/45">{s} · Updated 14.03</p></div></motion.div>)}</div>
      <div className="mt-5 grid grid-cols-[1.55fr_1fr] gap-4">
        <div className="rounded-2xl bg-[#141416] p-4">
          <div className="flex items-center justify-between"><p className="text-[13px] font-medium">Orientation Data · by person</p><span className="flex items-center gap-3 text-[10px] text-white/50"><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm bg-white/25" />Viewed</span><span className="flex items-center gap-1"><i className="h-2 w-2 rounded-sm" style={{ background: O }} />Quiz passed</span></span></div>
          <div className="mt-3 grid grid-cols-[110px_repeat(5,1fr)] gap-1.5 text-[10.5px]">
            <span />{LIB.slice(0, 5).map(([t]) => <span key={t} className="truncate text-white/45">{t}</span>)}
            {PEOPLE.map((p, r) => [<span key={p} className="self-center text-white/80">{p}</span>, ...GRID[r].map((g, c) => <motion.span key={p + c} initial={false} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : .6 }} transition={{ delay: .5 + (r * 5 + c) * .03, duration: .4 }} className={`h-7 rounded-md ${hover === 1 && r === 2 ? "ring-1 ring-white/30" : ""}`} style={{ background: g === 2 ? O : g === 1 ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.05)" }} />)])}
          </div></div>
        <div className="rounded-2xl bg-[#141416] p-4">
          <p className="text-[13px] font-medium">Quiz results · Opening checklist</p>
          <div className="mt-3 space-y-2.5">{[["1. Question", 4], ["2. Question", 3], ["3. Question", 5], ["4. Question", 2]].map(([q, v], i) => <div key={q as string} className="text-[11px]"><div className="flex justify-between text-white/70"><span>{q}</span><span className="tabular-nums">{v}/5</span></div>
            <span className="mt-1 block h-[4px] overflow-hidden rounded-full bg-white/10"><motion.span className="block h-full rounded-full" style={{ background: O }} initial={false} animate={{ width: on ? `${(v as number) * 20}%` : "0%" }} transition={{ delay: .7 + i * .12, duration: 1.1, ease }} /></span></div>)}</div>
          <div className={`mt-4 rounded-xl px-3 py-2.5 text-[11px] text-white/70 transition-colors ${hover === 2 ? "bg-white/[.08]" : "bg-white/[.04]"}`}>Question 4 is missed most. Review step 3 video.</div></div>
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
        <p className="max-w-sm text-[17px] leading-snug text-white/65 md:pb-3">{tr ? "Telefonda kaydedin, masada yönetin. Aynı kütüphane, aynı oryantasyon verisi, büyük ekranda." : "Record on the phone, manage from the desk. The same library and orientation data, on a big screen."}</p>
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

export function Platforms({ lang, langs }: { lang: "en" | "tr"; langs: string[] }) {
  const tr = lang === "tr";
  const items: [string, string, string][] = [
    ["iOS", tr ? "iPhone uygulaması" : "iPhone app", "M12 3c.9 0 2-.6 2.5-1.5M8.5 7c-2.5 0-4 2-4 5 0 3.5 2.3 8 4.2 8 1 0 1.5-.6 2.8-.6s1.7.6 2.8.6c1.6 0 3.4-3.3 3.9-5.1-1.6-.7-2.4-2-2.4-3.6 0-1.4.8-2.6 2-3.3-.8-1.1-2-1.7-3.3-1.7-1.3 0-2 .7-3 .7s-1.7-.7-3-.7Z"],
    ["Android", tr ? "Google Play" : "Google Play", "M6 9h12v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zM7 9a5 5 0 0 1 10 0M9 6 7.5 4M15 6l1.5-2M3.5 10v5M20.5 10v5"],
    ["Web", tr ? "Tarayıcıda yönetim" : "Manage in the browser", "M3 5h18v12H3zM8 21h8M12 17v4"],
    [`${langs.length} ${tr ? "dil" : "languages"}`, langs.slice(0, 4).join(" · ") + " …", "M4 5h9M8.5 3v2M6 5c.5 3 2.5 5.5 5 7M11 5c-.6 3.6-3 6.5-6.5 8M13 21l4-10 4 10M14.5 17.5h5"],
  ];
  return (<section aria-label={tr ? "Platformlar" : "Platforms"} className="relative px-5 pb-28 md:px-10 md:pb-36">
    <div className="mx-auto max-w-[1400px]">
      <ul className="grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
        {items.map(([h, s, d], i) => <motion.li key={h} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .6 }} transition={{ delay: i * .08, duration: .7, ease }}
          className={`group flex items-center gap-4 py-7 md:py-9 ${i % 2 ? "pl-5" : ""} ${i ? "md:border-l md:border-white/10 md:pl-8" : ""} ${i > 1 ? "border-t border-white/10 md:border-t-0" : ""}`}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/[.06] text-white/80 ring-1 ring-white/10 transition duration-500 group-hover:bg-flame group-hover:text-black group-hover:ring-flame">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg></span>
          <span><span className="block text-[17px] font-semibold tracking-[-.02em]">{h}</span><span className="block text-[12.5px] text-white/50">{s}</span></span></motion.li>)}
      </ul>
    </div></section>);
}
