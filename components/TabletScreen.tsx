"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Scaled, Clip, Track, PlayRing } from "./AppScreens";
import { MagnifyingGlass, MapPin, UsersThree, Sparkle, Check } from "./ui/icons";

/* Flexlore on an iPad held in landscape: the job's footage fills the screen and the work sits on glass panels over it
 * (steps, readiness, the AI draft, the player). Sample data only. Loaded on demand (next/dynamic) by the Duo section. */
const BASE = 1024; // design width in pt; the frame is 1194:834 (iPad Pro 11" landscape)
const T = {
  en: { site: "Downtown kitchen", shift: "Morning shift · 07:00", on: "6 on shift", search: "Search jobs, people", job: "Opening routine", steps: "Steps",
    list: ["Wash hands and put on gloves", "Check walk-in temperature", "Sanitise boards and knives", "Set up the line by station", "Label and date prep", "Final check with the lead"],
    ready: "Ready to work", week: "+6 pts this week", ai: "AI draft", aiLine: "Video split into 6 steps", quiz: "Draft quiz", review: "Review steps", step: "Step" },
  tr: { site: "Merkez mutfak", shift: "Sabah vardiyası · 07:00", on: "Vardiyada 6 kişi", search: "İş veya kişi arayın", job: "Açılış rutini", steps: "Adımlar",
    list: ["Elleri yıka, eldiven giy", "Soğuk oda sıcaklığını kontrol et", "Tahta ve bıçakları dezenfekte et", "Hattı istasyonlara göre kur", "Hazırlıkları etiketle ve tarihle", "Şefle son kontrol"],
    ready: "İşe hazır", week: "Bu hafta +6 puan", ai: "Yapay zekâ taslağı", aiLine: "Video 6 adıma bölündü", quiz: "Quiz taslağı", review: "Adımları incele", step: "Adım" },
};
const CLIPS = ["kitchen", "steam", "plating", "kitchen", "plating", "steam"];
const glass = "rounded-[18px] bg-[rgb(20_20_20/0.55)] ring-1 ring-white/[.09]";

export function TabletScreen({ active, lang = "en" }: { active: boolean; lang?: "en" | "tr" }) {
  const t = T[lang]; const reduce = useReducedMotion();
  const [s, setS] = useState(2); const [sec, setSec] = useState(3);
  useEffect(() => {
    if (!active || reduce) return;
    const id = setInterval(() => setSec((v) => { if (v >= 11) { setS((x) => (x + 1) % t.list.length); return 0; } return v + 1; }), 380);
    return () => clearInterval(id);
  }, [active, reduce, t.list.length]);
  const ready = 74 + s * 2;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d0d0d] text-white">
      {/* Footage */}
      <AnimatePresence initial={false}>
        <m.div key={CLIPS[s] + s} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <Clip name={CLIPS[s]} active={active} />
        </m.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(13_13_13/0.15)_0%,rgb(13_13_13/0.05)_45%,rgb(13_13_13/0.55)_75%,rgb(13_13_13/0.8)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,rgb(13_13_13/0.85),rgb(13_13_13/0))]" />

      {/* Top bar */}
      <div className="absolute inset-x-6 top-5 flex items-center gap-2 text-[13px]">
        <span className={`${glass} flex items-center gap-1.5 !rounded-full px-3 py-1.5`}><MapPin size={13} />{t.site}</span>
        <span className={`${glass} !rounded-full px-3 py-1.5 text-white/85`}>{t.shift}</span>
        <span className={`${glass} flex items-center gap-1.5 !rounded-full px-3 py-1.5 text-white/85`}><UsersThree size={13} />{t.on}</span>
        <span className={`${glass} ml-auto flex w-[220px] items-center gap-2 !rounded-full px-3 py-1.5 text-white/60`}><MagnifyingGlass size={13} />{t.search}</span>
        <span className="pl-2 text-[13px] font-semibold tabular-nums">9:41</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-[11px] font-semibold ring-1 ring-white/20">AK</span>
      </div>

      {/* Right column */}
      <div className="absolute bottom-6 right-6 top-[70px] flex w-[300px] flex-col gap-3">
        <div className={`${glass} p-4`}>
          <div className="flex items-baseline justify-between"><p className="text-[15px] font-semibold">{t.job}</p><p className="text-[12px] text-white/55">{t.steps} {s + 1}/{t.list.length}</p></div>
          <ul className="mt-3 space-y-1">
            {t.list.map((x, i) => (
              <li key={x} className={`flex items-center gap-2.5 rounded-[10px] px-2 py-[7px] text-[13px] transition-colors duration-500 ${i === s ? "bg-white/[.12] text-white" : i < s ? "text-white/60" : "text-white/80"}`}>
                <span className="w-4 text-[11px] tabular-nums text-white/45">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate">{x}</span>
                <span className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ring-[1.5px] transition-colors duration-500 ${i < s ? "ring-[#EC6726] text-[#EC6726]" : "ring-white/30 text-transparent"}`}><Check size={11} /></span>
              </li>))}
          </ul>
        </div>
        <div className={`${glass} flex-1 p-4`}>
          <p className="text-[12px] text-white/60">{t.ready}</p>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-[34px] font-semibold leading-none tracking-[-.03em] tabular-nums">{ready}<span className="text-[18px] text-white/60">%</span></p>
            <p className="pb-1 text-[12px] text-white/60">{t.week}</p>
          </div>
          <svg viewBox="0 0 260 60" className="mt-3 h-[54px] w-full" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 50 L37 46 L74 47 L111 38 L148 35 L185 27 L222 22 L260 14" fill="none" stroke="rgb(231 235 235 / .85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0 50 L37 46 L74 47 L111 38 L148 35 L185 27 L222 22 L260 14 L260 60 L0 60 Z" fill="rgb(231 235 235 / .08)" />
            <circle cx="260" cy="14" r="3.5" fill="#fff" />
          </svg>
        </div>
      </div>

      {/* AI draft (bottom left) */}
      <div className={`${glass} absolute left-6 top-[68px] w-[270px] p-4`}>
        <p className="flex items-center gap-2 text-[12px] text-white/65"><Sparkle size={13} weight="fill" />{t.ai}</p>
        <p className="mt-1.5 text-[15px] font-semibold">{t.aiLine}</p>
        <div className="mt-3 flex gap-2 text-[12px] font-medium">
          <span className="rounded-full bg-white px-3 py-1.5 text-[#111]">{t.quiz}</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5">{t.review}</span>
        </div>
      </div>

      {/* Player (bottom) */}
      <div className="absolute bottom-6 left-[170px] right-[330px]">
        <p className="text-[13px] text-white/60">{t.step} {s + 1}</p>
        <AnimatePresence mode="wait" initial={false}>
          <m.p key={s} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4 }} className="text-[20px] font-semibold tracking-[-.02em]">{t.list[s]}</m.p>
        </AnimatePresence>
        <div className="mt-3 flex items-center gap-3 text-[13px] tabular-nums">
          <PlayRing /><span>00:{String(sec).padStart(2, "0")}</span><span className="flex flex-1 items-center"><Track v={sec / 12} /></span><span>00:12</span>
        </div>
      </div>
    </div>);
}

/** iPad Pro 11" in landscape: thin black bezel, rounded rim, camera on the top edge. */
export function DeviceTablet({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div role="img" aria-label={label} className="dark relative aspect-[1194/834] w-full">
      <div className="absolute inset-0 rounded-[2.4rem] bg-[#2a2a2d] p-[2px] ring-1 ring-white/10">
        <div className="h-full w-full rounded-[2.3rem] bg-black p-[14px]">
          <span className="absolute left-1/2 top-[7px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#1b1b1d]" />
          <div className="h-full w-full overflow-hidden rounded-[1.5rem] [&>div]:!rounded-[1.5rem]"><Scaled base={BASE}>{children}</Scaled></div>
        </div>
      </div>
    </div>);
}
