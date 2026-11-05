"use client";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Lang } from "./copy";
import { Article, CaretDown, CaretLeft, CaretRight, Check, CheckCircle, Eye, EyeSlash, GraduationCap, Info, List, MagnifyingGlass, Pause, Play, Plus, Sticker, TextT, Users, X } from "./ui/icons";
import { BackArrow, Bar, CheckRing, Clip, G1, G2, HL, Kebab, Nav, O, Player, Scaled, S0, S1, S2, Status, Toast, WorkScreen, card, ease, ic, mm, useTick, type ScreenProps } from "./AppScreens";

/* Story-only phone screens. Loaded with next/dynamic (ssr: false) from ScrollStory and the hero's decorative back phone,
   so none of this ships in the home route's first-load JS. */

const PlusRing = ({ size = 20 }: { size?: number }) => (<span className="grid place-items-center rounded-full ring-[1.6px] ring-white/85" style={{ width: size, height: size }}><Plus size={size * .6} /></span>);

/* ---------- Real screen: Library (folder list) ---------- */
const LIB = {
  en: { title: "Operations", search: "Search folders", folders: ["Kitchen", "Front of house", "Quality", "Safety", "Maintenance", "Onboarding", "Cleaning", "Deliveries"] },
  tr: { title: "Operasyon", search: "Klasörlerde ara", folders: ["Mutfak", "Salon", "Kalite", "Güvenlik", "Bakım", "Oryantasyon", "Temizlik", "Teslimat"] },
} as const;
const LIB_META: [string | null, number, number, string][] = [["kitchen", 4, 0, "03.11.2026"], ["hotel", 2, 1, "03.11.2026"], ["plating", 3, 0, "31.10.2026"], ["steam", 1, 2, "28.10.2026"], ["warehouse", 2, 0, "28.10.2026"], [null, 1, 0, "27.10.2026"], [null, 0, 0, "27.10.2026"], [null, 2, 0, "21.10.2026"]];
export function LibraryScreen({ active, lang = "en" }: ScreenProps) {
  const L = LIB[lang]; const reduce = useReducedMotion(); const run = active && !reduce;
  const n = useTick(run, 1300, 8); const hi = run ? [0, 1, 2, 3, 4, 3, 1, 0][n] : -1; const y = run ? [0, 0, -20, -60, -96, -60, -20, 0][n] : 0;
  return (<div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: S0 }}>
    <Status /><Nav title={L.title} right={<><GraduationCap size={19} /><PlusRing /><Kebab /></>} />
    <div className="mx-3 mt-3 flex items-center gap-2.5 rounded-[14px] px-3.5 py-[10px] text-[13px]" style={{ background: S1, color: G1 }}><MagnifyingGlass size={16} />{L.search}</div>
    <div className="relative mt-3 flex-1 overflow-hidden">
      <m.ul initial={false} animate={{ y }} transition={{ duration: 1.1, ease }} className="px-2">
        {L.folders.map((f, i) => { const [img, w, fo, d] = LIB_META[i]; return (
          <li key={f} className="relative flex items-center gap-3 rounded-[14px] px-1.5 py-[7px]">
            <m.span className="absolute inset-0 rounded-[14px] bg-white/[.05]" initial={false} animate={{ opacity: hi === i ? 1 : 0 }} transition={{ duration: .45 }} />
            {img ? <span className="relative h-[52px] w-[52px] shrink-0 rounded-[12px] bg-cover bg-center" style={{ backgroundImage: `url(/video/${img}.webp)` }} />
              : <span className="relative grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[12px] text-[16px] text-white/75" style={{ background: S1 }}>{f.slice(0, 2)}</span>}
            <span className="relative min-w-0 flex-1 leading-[1.3]">
              <span className="flex items-center gap-1.5 text-[14.5px] font-semibold tracking-[-.01em] text-white"><Users size={13} className="text-white/60" /><span className="truncate">{f}</span></span>
              <span className="block text-[11.5px]" style={{ color: G1 }}>{w} Work - {fo} Folder</span>
              <span className="block text-[11.5px] tabular-nums" style={{ color: G1 }}>Last Updated: {d}</span></span>
            <Kebab size={17} className="relative text-white/80" /></li>); })}
      </m.ul>
      <span className="absolute bottom-[26px] right-3 grid h-[52px] w-[52px] place-items-center rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,.6)]" style={{ background: S2 }}><PlusRing size={24} /></span>
    </div></div>);
}

/* ---------- Real screen: Step editor (mark a step on the recorded clip, then name it) ---------- */
const ED = {
  en: { done: "Done", tools: ["Stickers", "Text", "Steps"], start: "Start step", stop: "Stop step", vd: "Video Duration", ss: "Start Step", st: "Stop Step", sd: "Step Duration",
    modal: "Step details (Step - 1)", ft: "Standard work step title", fd: "Description", cancel: "Cancel", save: "Save changes", title: "Switch on the main power", saved: "Step 1 saved" },
  tr: { done: "Tamam", tools: ["Çıkartmalar", "Metin", "Adımlar"], start: "Adımı Başlat", stop: "Adımı Durdur", vd: "Video süresi", ss: "Başlangıç", st: "Bitiş", sd: "Adım süresi",
    modal: "İş Adımı Detayları (Step - 1)", ft: "Standart İş Adımı Başlığı", fd: "Açıklama", cancel: "İptal", save: "Değişiklikleri Kaydet", title: "Ana şalteri aç", saved: "Adım 1 kaydedildi" },
} as const;
/* Timeline in quarter seconds (64 = 16 s loop):
   0-3 paused at 00:00 · 3 play · 7 Start step (marks 00:01) · 23 Stop step (00:05), pause · 26 modal up ·
   28-42 title types · 46 Save pressed · 49 modal closes · 50-60 toast · 64 loop. */
const DUR = 13, Q = 4;
export function EditorScreen({ active, lang = "en" }: ScreenProps) {
  const L = ED[lang]; const reduce = useReducedMotion(); const run = active && !reduce;
  const q = useTick(run, 250, 64);
  // Reduced motion / inactive: the marked step, paused, no modal.
  const playing = run && q >= 3 && q < 23;
  const v = run ? Math.min(Math.max(q - 3, 0), 20) / Q : 5;                 // video time, s (0..5)
  const marking = run && q >= 7 && q < 23;
  const marked = !run || q >= 23;
  const start = run ? (q >= 7 ? 1 : 0) : 1, stop = marked ? 5 : marking ? v : 0, dur = marking || marked ? Math.max(stop - start, 0) : 0;
  const modal = run && q >= 26 && q < 49; const typed = run ? Math.round(Math.min(Math.max(q - 28, 0) / 14, 1) * L.title.length) : 0;
  const pressed = run && q >= 46 && q < 48; const press = (a: number) => run && q >= a && q < a + 2;
  const frames = ["kitchen", "kitchen", "kitchen", "kitchen", "kitchen"];
  return (<div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: S0 }}>
    <Status /><Nav left={<><BackArrow /><span className="text-[16px] text-white/90">{L.done}</span></>} right={<><GraduationCap size={19} /><List size={19} /><Kebab /></>} />
    {/* Clip: vertical video, black pillar boxes */}
    <div className="relative h-[292px] shrink-0 bg-black">
      <div className="absolute inset-y-0 left-1/2 w-[62%] -translate-x-1/2 overflow-hidden"><Clip name="kitchen" active={playing} /></div>
      <span className="absolute left-2.5 top-2.5 rounded-[11px] bg-white/[.14] px-3 py-[7px] text-[12px] text-white backdrop-blur-md">Operator 1</span>
      <span className="absolute bottom-2.5 left-2 rounded-[10px] bg-black/70 px-2.5 py-[6px] text-[11.5px] tabular-nums text-white backdrop-blur">{L.vd}: <span style={{ color: O }}>{mm(v)}</span> / {mm(DUR)}</span>
    </div>
    {/* Controls */}
    <div className="flex h-[48px] shrink-0 items-center justify-between px-3 text-[14px] text-white" style={{ borderBottom: `1px solid ${HL}` }}>
      <span className="flex items-center"><CaretLeft size={18} />1s</span>
      <span className="grid h-[30px] w-[30px] place-items-center rounded-full ring-2 ring-white/90">{playing ? <Pause size={13} weight="fill" /> : <Play size={13} weight="fill" className="ml-0.5" />}</span>
      <span className="flex items-center">1s<CaretRight size={18} /></span></div>
    <div className="mt-3 flex justify-between px-3 text-[10px] tabular-nums" style={{ color: G1 }}>
      <span>{L.ss}: {mm(start)}</span><span>{L.st}: {mm(stop)}</span><span>{L.sd}: {mm(dur)}</span></div>
    {/* Filmstrip + playhead */}
    <div className="relative mx-3 mt-4 h-[48px] shrink-0">
      <div className="absolute inset-0 flex overflow-hidden rounded-[12px] ring-1 ring-white/10">{frames.map((f, i) => <span key={i} className="h-full flex-1 bg-cover" style={{ backgroundImage: `url(/video/${f}.webp)`, backgroundPosition: `${i * 25}% 50%` }} />)}</div>
      {(marking || marked) && <m.span className="absolute inset-y-0 rounded-[4px] bg-white/[.22] ring-1 ring-white/50" initial={false} animate={{ left: `${(start / DUR) * 100}%`, width: `${(dur / DUR) * 100}%` }} transition={{ duration: .25, ease: "linear" }} />}
      <m.span className="absolute -inset-y-[9px] w-0" initial={false} animate={{ left: `${(v / DUR) * 100}%` }} transition={{ duration: .25, ease: "linear" }}>
        <span className="absolute -left-[5px] top-0 h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-white" />
        <span className="absolute -left-[1.5px] top-[8px] bottom-[8px] w-[3px] rounded-full bg-white shadow-[0_0_6px_rgba(0,0,0,.8)]" />
        <span className="absolute -left-[5px] bottom-0 h-0 w-0 border-x-[5px] border-b-[6px] border-x-transparent border-b-white" /></m.span>
    </div>
    {/* Toolbar + Start/Stop step */}
    <div className="mx-3 mb-[26px] mt-auto flex gap-2">
      <div className="flex flex-[2.8] rounded-[14px] py-2.5" style={{ background: S2 }}>{([[Sticker, L.tools[0]], [TextT, L.tools[1]], [Article, L.tools[2]]] as const).map(([Icon, l]) => <span key={l} className="flex flex-1 flex-col items-center gap-1 text-[10.5px]" style={{ color: G1 }}><Icon size={20} />{l}</span>)}</div>
      <m.div animate={{ scale: press(7) || press(23) ? .94 : 1 }} transition={{ duration: .15 }} className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-[14px] py-2 ${marking ? "ring-[1.5px] ring-white/80" : ""}`} style={{ background: S2 }}>
        <span className={`grid h-[20px] w-[20px] place-items-center rounded-full ring-[1.6px] ${marking ? "ring-white/85" : "ring-white/45"}`}>
          <span className={`h-[11px] w-[11px] rounded-full transition-colors duration-300 ${marking ? "bg-danger" : "bg-white/45"}`} /></span>
        <span className={`whitespace-nowrap text-[10.5px] ${marking ? "font-semibold text-white" : ""}`} style={marking ? undefined : { color: G1 }}>{marking ? L.stop : L.start}</span></m.div>
    </div>
    {/* Step details modal */}
    <AnimatePresence>{modal && <m.div key="dim" className="absolute inset-0 z-20 bg-black/65" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }} />}</AnimatePresence>
    <AnimatePresence>{modal && <m.div key="modal" className="absolute inset-x-3 top-[62px] z-20 rounded-[22px] px-4 pb-4 pt-4 shadow-[0_20px_60px_rgba(0,0,0,.7)]" style={{ background: S2 }}
      initial={{ y: 420, opacity: .6 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 420, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 32 }}>
      <div className="flex items-center justify-between text-[13.5px] font-medium" style={{ color: "#BDBDBD" }}>{L.modal}<span className="grid h-[22px] w-[22px] place-items-center rounded-full ring-[1.5px] ring-white/50"><X size={11} className="text-white/70" /></span></div>
      <p className="mt-4 text-[12px]" style={{ color: G1 }}>{L.ft}</p>
      <div className="mt-1.5 flex h-[38px] items-center rounded-[12px] px-3 text-[13px] text-white" style={{ background: S1 }}>
        {L.title.slice(0, typed)}<m.span className="ml-px inline-block h-[16px] w-[1.5px] bg-white/80" animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} /></div>
      <p className="mt-3.5 text-[12px]" style={{ color: G1 }}>{L.fd}</p>
      <div className="mt-1.5 h-[84px] rounded-[12px]" style={{ background: S1 }} />
      <div className="mt-4 flex items-center justify-end gap-5 text-[13px]"><span style={{ color: G1 }}>{L.cancel}</span>
        <m.span animate={{ scale: pressed ? .92 : 1, opacity: pressed ? .6 : 1 }} transition={{ duration: .12 }} className="font-medium" style={{ color: O }}>{L.save}</m.span></div>
    </m.div>}</AnimatePresence>
    <Toast show={run && q >= 50 && q < 61} text={L.saved} sub={`${mm(1)} - ${mm(5)}`} />
  </div>);
}

/* ---------- Real screen: Standard Work Quiz ---------- */
const QZ = {
  en: { title: "Opening routine", q: "Question", single: "Single choice", extra: "Leave it for the next shift", q2: "Which order is right when starting the line?", o2: ["Valve → Power → Gauge", "Power → Gauge → Valve", "Gauge → Valve → Power"], ok: "Correct", okS: "Answer saved", pass: "Quiz passed", passS: "Results sent to your lead" },
  tr: { title: "Açılış rutini", q: "Soru", single: "Tek seçim", extra: "Sonraki vardiyaya bırak", q2: "Hattı başlatırken doğru sıra hangisi?", o2: ["Vana → Şalter → Gösterge", "Şalter → Gösterge → Vana", "Gösterge → Vana → Şalter"], ok: "Doğru", okS: "Cevap kaydedildi", pass: "Quiz geçildi", passS: "Sonuçlar yöneticine gönderildi" },
} as const;
export function QuizScreen({ active, q, a, lang = "en" }: ScreenProps & { q: string; a: readonly string[]; ok?: number }) {
  const L = QZ[lang]; const reduce = useReducedMotion(); const run = active && !reduce;
  const t = useTick(run, 900, 10); const n = run ? t : 9; const pick = n < 2 ? -1 : n < 4 ? 0 : 1;
  const opts = [...a, L.extra].slice(0, 4);
  const Qc = ({ k, t, o, sel }: { k: number; t: string; o: readonly string[]; sel: number }) => (
    <div className={`px-3.5 py-3 ${card}`} style={{ background: S1 }}><div className="flex items-center justify-between"><span className="rounded-full bg-white/[.06] px-2 py-0.5 text-xs font-medium tabular-nums text-white/60">{L.q} {k}</span><span className="text-xs text-white/60">{L.single}</span></div>
      <p className="mt-2 text-sm font-medium leading-[1.35] tracking-[-.01em] text-white">{t}</p>
      <ul className="mt-2.5 space-y-1.5">{o.map((x, i) => <li key={x} className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-[7px] text-xs leading-snug transition-colors duration-300 ${sel === i ? "bg-flame/[.12] text-white ring-1 ring-flame/60" : "bg-white/[.03] text-white/70 ring-1 ring-white/[.06]"}`}>
        <span className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] text-xs font-semibold ${sel === i ? "text-white" : "bg-white/[.06] text-white/55"}`} style={sel === i ? { background: O } : {}}>{String.fromCharCode(65 + i)}</span>
        <span className="flex-1">{x}</span>{sel === i && <m.span layoutId={`r${k}`}><CheckCircle {...ic} size={14} style={{ color: O }} /></m.span>}</li>)}</ul></div>);
  return (<div className="absolute inset-0 flex flex-col" style={{ background: S0 }}>
    <Status /><Nav title={L.title} right={<span className="text-sm tabular-nums text-white/50">{n >= 6 ? 2 : 1}/6</span>} />
    <div className="flex items-center gap-3 px-4 pb-3 pt-3"><Bar v={(n >= 6 ? 2 : 1) / 6} /></div>
    <div className="space-y-2.5 px-3"><Qc k={1} t={q} o={opts} sel={pick} /><Qc k={2} t={L.q2} o={L.o2} sel={n >= 6 ? 1 : -1} /></div>
    <Toast show={run && n >= 4 && n < 6} text={L.ok} sub={L.okS} />
    <Toast show={run && n >= 8} text={L.pass} sub={L.passS} /></div>);
}

/* ---------- Real screen: step video player (kept for reference, unused on the site) ---------- */
const Arrow = ({ up }: { up?: boolean }) => <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={up ? "" : "rotate-180"}><path d="M3 2h10M8 14V5M4.5 8.5 8 5l3.5 3.5" /></svg>;
export function PlayerScreen({ active }: ScreenProps) {
  const reduce = useReducedMotion(); const s = useTick(active && !reduce, 1000, 13); const t = active && !reduce ? s : 9;
  return (<div className="absolute inset-0 flex flex-col" style={{ background: S0 }}>
    <Status /><Nav left={<><BackArrow /><span className="text-sm">Back</span></>} title="Plate the chicken salad" />
    <div className="relative flex-1 overflow-hidden bg-black">
      <Clip name="plating" active={active} className="scale-[1.02]" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black via-black/70 to-transparent" />
      <span className="absolute bottom-[104px] right-3 flex flex-col items-center gap-2 rounded-full bg-black/35 px-1.5 py-2 text-white backdrop-blur"><Arrow up /><span className="h-px w-3 bg-white/30" /><Arrow /></span>
      <div className="absolute inset-x-4 bottom-[26px]"><Player t={t} text="Fan the sliced chicken over the greens, add the eggs and wipe the rim before" /></div></div></div>);
}

/* ---------- Real screen: Orientation Analyzer (matches the app; "Standart Work" is the app's own label) ---------- */
const RD = {
  en: { title: "Orientation Analyzer", sw: "Standart Work", person: "Person", od: "Orientation Data", view: "View", quiz: "Quiz", access: "Standart Work With Access", upd: "Updated",
    work: ["Opening routine", "Allergen handling", "Knife safety", "Fryer cleaning", "Coffee station"] },
  tr: { title: "Oryantasyon Analizi", sw: "Standart İş", person: "Kişi", od: "Oryantasyon Verisi", view: "İzledi", quiz: "Quiz", access: "Erişimi Olan Standart İşler", upd: "Güncellendi",
    work: ["Açılış rutini", "Alerjen yönetimi", "Bıçak güvenliği", "Fritöz temizliği", "Kahve istasyonu"] },
} as const;
const WORK = [["line", 1, 1], ["plating", 1, 0], ["steam", 0, 0], ["kitchen", 1, 0], ["coffee", 1, 1]] as const;
const flat = "rounded-[14px] border border-white/[.04]";
export function ReadyScreen({ active, lang = "en" }: ScreenProps) {
  const L = RD[lang];
  return (<div className="absolute inset-0 flex flex-col" style={{ background: S0 }}>
    <Status /><Nav title={L.title} right={<span />} />
    <div className="mx-3 mt-3 flex gap-1.5 text-sm tracking-[-.01em]"><span className="rounded-[10px] border border-white/20 px-3 py-[7px] text-white/85">{L.sw}</span><span className="flex-1 rounded-[10px] bg-[#252525] py-[7px] text-center text-white">{L.person}</span></div>
    <div className={`mx-3 mt-2 flex items-center px-4 py-3.5 text-sm text-white ${flat}`} style={{ background: S1 }}><span className="flex-1">Jordan Kim</span><CaretDown size={11} weight="fill" style={{ color: "#D96E39" }} /></div>
    <div className={`mx-3 mt-2 px-4 py-3 ${flat}`} style={{ background: S1 }}>
      <div className="flex items-center gap-2 text-sm text-white"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/[.06]"><CaretDown size={12} className="text-white/70" /></span>{L.od}<Info size={15} className="text-white/50" /></div>
      {([[L.view, 4], [L.quiz, 2]] as const).map(([k, v]) => <div key={k} className="mt-3 flex items-center gap-3 text-xs tabular-nums text-white/70"><span className="w-11">{k}</span>
        <span className="relative h-[3px] flex-1 rounded-full bg-[#252525]"><m.span className="absolute inset-y-0 left-0 rounded-full" style={{ background: "linear-gradient(90deg,#A8562E,#C9632F)" }} initial={false} animate={{ width: `${active ? v * 20 : 0}%` }} transition={{ duration: .9, ease }} /></span><span>{v}/5</span></div>)}</div>
    <div className="mx-4 mb-1 mt-5 flex text-xs text-white/70"><span className="flex-1">{L.access}</span><span className="w-9 text-center">{L.view}</span><span className="w-9 text-center">{L.quiz}</span></div>
    <ul className="mx-3">{WORK.map(([v, e, q], i) => <m.li key={v} initial={false} animate={{ opacity: active ? 1 : .3, x: active ? 0 : 8 }} transition={{ delay: .3 + i * .08, duration: .5, ease }} className="flex h-[56px] items-center gap-2.5 px-1">
      <span className="h-11 w-11 shrink-0 rounded-[10px] bg-cover bg-center ring-1 ring-white/10" style={{ backgroundImage: `url(/video/${v}.webp)` }} />
      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold tracking-[-.01em] text-white">{L.work[i]}</span><span className="block truncate whitespace-nowrap text-[11px] tabular-nums" style={{ color: G2 }}>{L.upd} : 14.03.2026</span></span>
      <span className="grid w-9 place-items-center">{e ? <Eye size={18} className="text-white" /> : <EyeSlash size={18} className="text-white/30" />}</span>
      <span className="grid w-9 place-items-center"><Check size={15} className={q ? "text-white" : "text-white/25"} /></span></m.li>)}</ul></div>);
}

/* ---------- Landscape frame + landscape step player ("iPhone duo" shots) ---------- */
/** Same iPhone frame as Device, turned to landscape: Dynamic Island on the left edge, side buttons on the top and
 *  bottom edges. Content renders at a 693pt landscape design width. */
export function DeviceLandscape({ children, label }: { children: React.ReactNode; label: string }) {
  const btn = "absolute h-[3px] bg-[#3b3b3e]";
  return (<div role="img" aria-label={label} className="dark relative aspect-[852/393] w-full">
    <span className={`${btn} -top-[2px] left-[16%] w-[4%] rounded-t-sm`} /><span className={`${btn} -top-[2px] left-[23%] w-[7.5%] rounded-t-sm`} /><span className={`${btn} -top-[2px] left-[32%] w-[7.5%] rounded-t-sm`} /><span className={`${btn} -bottom-[2px] left-[26%] w-[11%] rounded-b-sm`} />
    <div className="absolute inset-0 rounded-[3.2rem] bg-[#2a2a2d] p-[2.5px] ring-1 ring-white/10">
      <div className="h-full w-full rounded-[3.05rem] bg-[#050506] p-[1px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]">
        <div className="h-full w-full rounded-[3rem] bg-black p-[8px]">
          <Scaled base={693}>
            {children}
            <div className="absolute left-[11px] top-1/2 z-30 flex h-[96px] w-[29px] -translate-y-1/2 flex-col items-center justify-end rounded-full bg-black pb-[10px] shadow-[0_0_0_.5px_rgba(255,255,255,.04)]"><span className="h-[9px] w-[9px] rounded-full bg-bg2 ring-1 ring-white/[.04]" /></div>
            <div className="absolute bottom-[7px] left-1/2 z-30 h-[5px] w-[150px] -translate-x-1/2 rounded-full bg-white/90 mix-blend-difference" />
          </Scaled></div></div></div>
  </div>);
}
const LP = {
  en: { back: "Back", title: "Opening routine", steps: "Steps", list: [["Switch on the main power", "line"], ["Check the pressure gauge", "warehouse"], ["Open the air valve", "steam"], ["Start the compressor", "kitchen"], ["Log the start time", "coffee"]],
    text: ["Turn the main switch on the control panel to ON and wait for the green light.", "The needle should sit in the green band before you go on.", "Turn the valve a slow quarter turn until the line holds pressure.", "Press start and listen for a steady run.", "Write the time on the shift sheet."] },
  tr: { back: "Geri", title: "Açılış rutini", steps: "Adımlar", list: [["Ana şalteri aç", "line"], ["Basınç göstergesini kontrol et", "warehouse"], ["Hava vanasını aç", "steam"], ["Kompresörü çalıştır", "kitchen"], ["Başlangıç saatini kaydet", "coffee"]],
    text: ["Kontrol panelindeki ana şalteri AÇIK konumuna getir ve yeşil ışığı bekle.", "Devam etmeden önce ibre yeşil bölgede olmalı.", "Hat basıncı tutana kadar vanayı yavaşça çeyrek tur çevir.", "Başlat tuşuna bas ve düzenli çalıştığını dinle.", "Saati vardiya formuna yaz."] },
} as const;
/** Landscape step player: full-bleed clip, real-app player along the bottom, step rail on the right. When active it
 *  advances one step every 4 s (clip changes, rail highlight moves, the finished step's check ticks on). */
const LP_T = 4;
export function LandscapePlayerScreen({ active, lang = "en" }: ScreenProps) {
  const L = LP[lang]; const reduce = useReducedMotion(); const run = active && !reduce; const N = L.list.length;
  const n = useTick(run, 1000, LP_T * N); const k = run ? Math.floor(n / LP_T) : 1; const w = run ? n % LP_T : 2;
  const clip = L.list[k][1];
  return (<div className="absolute inset-0 overflow-hidden bg-black">
    <AnimatePresence initial={false}><m.div key={clip} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .6 }}><Clip name={clip} active={run} /></m.div></AnimatePresence>
    <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.55),rgba(0,0,0,0)_45%),linear-gradient(0deg,rgba(0,0,0,.85),rgba(0,0,0,0)_45%),linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,0)_28%)]" />
    <div className="absolute left-[56px] top-[18px] flex items-center gap-2 text-[14px] text-white"><BackArrow /><span>{L.back}</span><span className="text-white/40">·</span><span className="font-medium">{L.title}</span></div>
    <div className="absolute bottom-[24px] left-[56px] right-[240px]">
      <p className="mb-2 text-[15px] font-medium tracking-[-.01em] text-white">{k + 1} - {L.list[k][0]}</p>
      <Player t={run ? w * 3 + 1 : 7} text={L.text[k]} more={lang === "tr" ? "Devamı..." : undefined} /></div>
    <div className="absolute bottom-[18px] right-[16px] top-[16px] w-[212px] rounded-[18px] bg-black/55 p-2 backdrop-blur-md ring-1 ring-white/[.06]">
      <p className="px-2 pb-1.5 pt-1 text-[11px]" style={{ color: G1 }}>{L.steps}</p>
      <ul className="space-y-1">{L.list.map(([t], i) => <li key={t} className="relative flex items-center gap-2 rounded-[11px] px-2 py-[7px]">
        {i === k && <m.span layoutId="lp-hl" className="absolute inset-0 rounded-[11px] bg-white/[.10]" transition={{ duration: reduce ? 0 : .45, ease }} />}
        <span className={`relative flex-1 truncate text-[11.5px] ${i === k ? "text-white" : "text-white/60"}`}>{i + 1} - {t}</span>
        <span className="relative scale-[.82]"><CheckRing on={i < k || (i === k && w >= 3)} reduce={reduce} /></span></li>)}</ul></div>
  </div>);
}

/** @deprecated alias: the editor used to be called RecordScreen. */
export const RecordScreen = EditorScreen;

/* ---------- Story switch (ScrollStory loads this whole module on demand) ---------- */
const QUIZ: Record<Lang, { q: string; a: readonly string[] }> = {
  en: { q: "Raw chicken was prepped on a board. What comes next?", a: ["Rinse and reuse for salad", "Clean, sanitise, then switch to the right colour board", "Wipe with a dry cloth"] },
  tr: { q: "Tahtada çiğ tavuk hazırlandı. Sırada ne var?", a: ["Durulayıp salata için kullan", "Temizle, dezenfekte et, doğru renkli tahtaya geç", "Kuru bezle sil"] },
};
export function StoryScreen({ i, active, lang = "en" }: { i: number } & ScreenProps) {
  return i === 0 ? <EditorScreen active={active} lang={lang} /> : i === 1 ? <WorkScreen active={active} lang={lang} />
    : i === 2 ? <QuizScreen active={active} lang={lang} q={QUIZ[lang].q} a={QUIZ[lang].a} /> : <ReadyScreen active={active} lang={lang} />;
}
