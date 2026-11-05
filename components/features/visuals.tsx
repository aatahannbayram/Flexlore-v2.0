"use client";
/* One product visual per feature. Real app screens where they exist (phone screens, web dashboard); HTML mocks with
 * sample content for the rest. All decorative (the page copy says the same), dark in both themes, LTR inside. */
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "framer-motion";
import { Device, WorkScreen } from "../AppScreens";
import type { Visual } from "./data";
import { EditorPanel } from "../ui/EditorPanel";
import { FilePdf, ArrowRight, CheckCircle, Sparkle, MapPin, LockSimple, Eye, PencilSimple, Bell, Check, ChatCircle, Lightning, QrCode, Translate } from "../ui/icons";

const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Dash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="aspect-[1180/720] w-full" /> });

const glass = "rounded-[18px] bg-[rgb(20_20_20/0.78)] ring-1 ring-white/10 backdrop-blur-md";
const row = "flex items-center gap-3 rounded-xl bg-[rgb(255_255_255/0.07)] px-3 py-2.5 text-[13px]";
const st = (ms: number) => ({ animationDelay: `${ms}ms` });

const SAMPLE_STEP: [string, string, string][] = [
  ["us", "English", "Sanitise the board, then switch to the green one."], ["tr", "Türkçe", "Tahtayı dezenfekte edin, sonra yeşil tahtaya geçin."],
  ["de", "Deutsch", "Brett desinfizieren, dann zum grünen wechseln."], ["ae", "العربية", "عقّم اللوح ثم انتقل إلى اللوح الأخضر."], ["es", "Español", "Desinfecte la tabla y cambie a la verde."],
];

function QR() { // decorative QR-like pattern (not scannable)
  const cells: [number, number][] = []; let seed = 7;
  for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) { seed = (seed * 9301 + 49297) % 233280; const corner = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13); if (!corner && seed / 233280 > 0.52) cells.push([x, y]); }
  const eye = (x: number, y: number) => <g key={`${x}${y}`}><rect x={x} y={y} width="7" height="7" fill="#111" /><rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" /><rect x={x + 2} y={y + 2} width="3" height="3" fill="#111" /></g>;
  return <svg viewBox="-1 -1 23 23" className="h-full w-full"><rect x="-1" y="-1" width="23" height="23" fill="#fff" />{cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#111" />)}{eye(0, 0)}{eye(14, 0)}{eye(0, 14)}</svg>;
}

export function FeatureVisual({ v, mock, lang }: { v: Visual; mock: string[]; lang: "en" | "tr" }) {
  const ref = useRef<HTMLDivElement>(null); const near = useInView(ref, { margin: "200px 0px", once: true }); const on = useInView(ref, { amount: 0.3 });
  const seen = useInView(ref, { amount: 0.3, once: true }); const reduce = useReducedMotion();
  const [k, setK] = useState(0);
  useEffect(() => { if (v !== "translate" || !on || reduce) return; const id = window.setInterval(() => setK((x) => (x + 1) % SAMPLE_STEP.length), 2600); return () => window.clearInterval(id); }, [v, on, reduce]);
  const phone = (screen: React.ReactNode) => <div className="w-[min(58%,270px)]"><Device label="">{near ? screen : <div className="absolute inset-0 bg-[#111]" />}</Device></div>;
  let body: React.ReactNode = null;
  if (v === "sop") body = (<div className="flex w-full items-center justify-center gap-4">{phone(<WorkScreen active={on} lang={lang} />)}
    <div className={`${glass} hidden w-[44%] space-y-1.5 p-2.5 sm:block`}>{mock.slice(0, 3).map((x, i) => (
      <div key={x} className={`${row} bx-rise`} style={st(300 + i * 250)}><span className="tabular-nums text-white/50">{i + 1}</span><span className="flex-1 truncate">{x}</span>
        <span className="flex items-center gap-1 rounded-full bg-[#E7EBEB] px-2 py-0.5 text-[11px] font-semibold text-[#111]"><CheckCircle size={11} weight="fill" />{mock[4]}</span></div>))}
      <p className="flex items-center gap-1.5 px-2 pt-1 text-[11px] text-white/55"><Sparkle size={11} weight="fill" />{mock[3]}</p></div></div>);
  if (v === "pdf") body = (<div className="flex w-full items-center justify-center gap-3 sm:gap-5">
    <div className="relative w-[38%] max-w-[190px] overflow-hidden rounded-[14px] bg-white p-3.5 text-[#111]">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold"><FilePdf size={14} className="text-[#A03434]" /><span className="truncate">{mock[0]}</span></p>
      <div className="mt-3 space-y-1.5">{[90, 70, 84, 60, 92, 50, 76, 66, 88, 40].map((w, i) => <span key={i} className="block h-1.5 rounded-full bg-[#111]/12" style={{ width: `${w}%` }} />)}</div>
      <span aria-hidden="true" className="pdf-scan absolute inset-x-0 top-0 h-10 bg-[linear-gradient(180deg,rgb(236_103_38/0)_0%,rgb(236_103_38/0.22)_70%,rgb(236_103_38/0.6)_100%)]" />
      <p className="mt-3 text-[10px] text-[#666]">{mock[1]}</p>
    </div>
    <ArrowRight size={18} className="shrink-0 text-white/50" />
    <div className={`${glass} w-[50%] max-w-[250px] space-y-1.5 p-2.5`}>{mock.slice(2, 5).map((x, i) => (
      <div key={x} className={`${row} bx-rise`} style={st(500 + i * 450)}><span className="tabular-nums text-white/50">{i + 1}</span><span className="truncate">{x}</span></div>))}
      <p className="flex items-center gap-1.5 px-2 pt-1 text-[11px] text-white/55"><Sparkle size={11} weight="fill" />{mock[5]}</p></div>
  </div>);
  if (v === "editor") body = <div className="bx-rise w-[88%] max-w-[440px]" style={st(150)}><EditorPanel /></div>;
  if (v === "quiz") body = phone(<Quiz active={on} lang={lang} q={mock[0] ?? ""} a={mock.slice(1, 4)} />);
  if (v === "panel") body = (<div className="w-[92%] overflow-hidden rounded-[14px] ring-1 ring-white/10"><div className="flex h-7 items-center gap-1.5 bg-[#1b1b1b] px-3"><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /></div>{near ? <Dash on={on} lang={lang} /> : <div className="aspect-[1180/720] w-full" />}</div>);
  if (v === "screen") body = (<div className="w-[92%] overflow-hidden rounded-[14px] bg-[#181818] ring-1 ring-white/10">
    <div className="flex h-8 items-center justify-between bg-[#1f1f1f] px-3"><span className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /></span>
      <span className="flex items-center gap-1.5 rounded-full bg-[rgb(229_74_74/0.16)] px-2.5 py-0.5 text-[11px] font-medium text-[#F3A3A3]"><span className="h-1.5 w-1.5 rounded-full bg-[#E54A4A]" />{mock[0]}</span></div>
    <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-4">
      <div className="space-y-2.5">{[0, 1, 2].map((i) => <div key={i} className="h-8 rounded-lg bg-white/[.06]" />)}<div className="h-9 w-28 rounded-lg bg-[#E7EBEB]" /></div>
      <div className={`${glass} space-y-1.5 p-2`}>{mock.slice(1, 5).map((x, i) => <div key={x} className={`${row} bx-rise`} style={st(300 + i * 350)}><span className="tabular-nums text-white/50">{i + 1}</span><span className="truncate">{x}</span></div>)}</div>
    </div></div>);
  if (v === "translate") { const [flag, name, text] = SAMPLE_STEP[k]; body = (<div className={`${glass} w-[86%] max-w-[420px] p-5`}>
    <p className="flex items-center gap-2 text-[12px] text-white/60"><Translate size={14} />{mock[0]}</p>
    <p key={k} className="rot-in mt-4 min-h-[3.5rem] text-[19px] font-medium leading-snug" dir={flag === "ae" ? "rtl" : "ltr"}>{text}</p>
    <div className="mt-5 flex flex-wrap gap-1.5">{SAMPLE_STEP.map(([f, n], i) => <span key={f} className={`inline-flex items-center gap-1.5 rounded-full py-1 pe-2.5 ps-1 text-[12px] transition-colors ${i === k ? "bg-white text-[#111]" : "bg-white/[.08] text-white/70"}`}><img src={`/flags/${f}.svg`} alt="" className="h-4 w-4 rounded-full" />{n}</span>)}</div>
    <p className="sr-only">{name}</p></div>); }
  if (v === "qr") body = (<div className="flex w-full items-center justify-center gap-4">
    <div className="w-[34%] max-w-[170px] rounded-[18px] bg-white p-3"><QR /><p className="mt-2 text-center text-[11px] font-semibold text-[#111]">{mock[1]}</p></div>
    <div className={`${glass} w-[50%] max-w-[260px] space-y-1.5 p-2.5`}><p className="flex items-center gap-1.5 px-1.5 pb-1 text-[12px] text-white/70"><QrCode size={13} />{mock[0]}</p>
      {mock.slice(2, 5).map((x, i) => <div key={x} className={`${row} bx-rise`} style={st(400 + i * 300)}><span className="tabular-nums text-white/50">{i + 1}</span><span className="truncate">{x}</span></div>)}</div></div>);
  if (v === "notify") body = (<div className="w-[80%] max-w-[360px] space-y-2">{[0, 1, 2].map((i) => (
    <div key={i} className={`${glass} bx-rise flex items-start gap-3 p-3.5`} style={st(300 + i * 450)}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#111]"><img src="/brand/symbol-main.svg" alt="" className="h-5 w-5" /></span>
      <span className="min-w-0"><span className="flex items-center gap-1.5 text-[13px] font-semibold"><Bell size={12} />{mock[i * 2]}</span><span className="block text-[13px] text-white/70">{mock[i * 2 + 1]}</span></span></div>))}</div>);
  if (v === "roles") body = (<div className={`${glass} w-[86%] max-w-[420px] space-y-1.5 p-2.5`}>{[0, 1, 2].map((i) => (
    <div key={i} className={`${row} bx-rise`} style={st(300 + i * 300)}><span className="flex-1 font-medium">{mock[i]}</span><span className="flex items-center gap-1 text-[12px] text-white/60"><MapPin size={12} />{mock[3 + Math.min(i, 2)]}</span>
      {i < 2 ? <span className="flex items-center gap-1 rounded-full bg-[#E7EBEB] px-2 py-0.5 text-[11px] font-semibold text-[#111]"><PencilSimple size={11} />{mock[6]}</span> : <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold"><Eye size={11} />{mock[7]}</span>}</div>))}
    <div className={`${row} opacity-60`}><span className="flex-1">{mock[8] ?? ""}</span><LockSimple size={14} /></div></div>);
  if (v === "agents") body = (<div className="w-[86%] max-w-[440px] space-y-2.5">
    <p className="ms-auto w-fit max-w-[88%] rounded-[16px] rounded-ee-md bg-[#E7EBEB] px-4 py-2.5 text-[13px] text-[#111]">{mock[0]}</p>
    <p className="flex w-fit items-center gap-1.5 rounded-full bg-white/[.08] px-3 py-1 text-[11px] text-white/70"><img src="/brand/symbol-main.svg" alt="" className="h-3.5 w-3.5" />{mock[1]}<Check size={11} /></p>
    <p className={`${glass} p-3.5 text-[13px] leading-[1.55]`}><ChatCircle size={13} className="me-1.5 inline" />{mock[2]}</p>
    <div className={`${glass} bx-rise flex items-start gap-3 p-3.5`} style={st(600)}><span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-white/10"><Lightning size={15} /></span>
      <span className="text-[13px]"><span className="block text-white/60">{mock[3]}</span><span className="block font-medium">{mock[4]}</span></span></div></div>);
  return <div ref={ref} dir="ltr" className={`relative flex h-full w-full items-center justify-center ${seen || reduce ? "bx-go" : ""}`}>{body}</div>;
}
