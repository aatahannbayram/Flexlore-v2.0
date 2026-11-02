"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Device } from "./AppScreens";
import { Video } from "./Site";
import { I, Arr } from "./Icons";
import { SITE } from "./config";

type L = "tr" | "en";
const ease = [0.22, 1, 0.36, 1] as const;
const O = "#EC6726";
const Rev = ({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: .9, delay: d, ease }} className={className}>{children}</motion.div>);
const t2 = (l: L, tr: string, en: string) => (l === "tr" ? tr : en);

/* ---------- content: coffee only ---------- */
type Drink = { k: string; tr: string; en: string; steps: [string, string, string][] }; // [tr, en, cue]
const DRINKS: Drink[] = [
  { k: "fesp", tr: "Freddo Espresso", en: "Freddo Espresso", steps: [
    ["Portafiltreyi kurula, öğüt, sıkıştır", "Dry, grind, tamp", "Düz yüzey · Level bed"],
    ["Çift shot'u çek", "Pull the double shot", "Reçetedeki süre · Recipe time"],
    ["Şeker tercihini sor, shot'a ekle", "Ask sugar preference, add to the shot", "Sade · Orta · Şekerli"],
    ["Buzla mikserde köpürt", "Froth with ice in the mixer", "Reçetedeki süre · Recipe time"],
    ["Taze buzlu bardağa süz", "Strain over fresh ice", "Köpük üstte · Foam on top"] ] },
  { k: "fcap", tr: "Freddo Cappuccino", en: "Freddo Cappuccino", steps: [
    ["Freddo Espresso tabanını hazırla", "Build the Freddo Espresso base", "Önceki reçete · Previous recipe"],
    ["Soğuk sütü ayrı pitcher'da köpürt", "Froth cold milk in its own pitcher", "Yoğun soğuk köpük · Dense cold foam"],
    ["Köpüğü kaşıkla üstüne koy", "Spoon the foam on top", "Katlar ayrı · Distinct layers"],
    ["Mikser başlığını yıka", "Rinse the frother head", "Her içecekten sonra · Every drink"] ] },
  { k: "latte", tr: "Latte", en: "Latte", steps: [
    ["Shot'u çek, akışı izle", "Pull the shot, watch the flow", "Reçetedeki süre · Recipe time"],
    ["Buhar çubuğunu boşalt, sütü buharla", "Purge the wand, steam the milk", "İpeksi köpük · Silky foam"],
    ["Pitcher'ı vur, döndür, dök", "Tap, swirl, pour", "Orta, sonra kenar · Centre, then edge"],
    ["Çubuğu sil ve tekrar boşalt", "Wipe and purge the wand", "Her içecekten sonra · Every drink"] ] },
  { k: "turk", tr: "Türk kahvesi", en: "Turkish coffee", steps: [
    ["Cezveye soğuk su ve kahveyi koy", "Cold water and coffee into the cezve", "Reçetedeki ölçü · Recipe measure"],
    ["Şeker tercihini sor ve ekle", "Ask and add sugar preference", "Sade · Orta · Şekerli"],
    ["Kısık ateşte karıştırmadan pişir", "Brew low, without stirring", "Köpük yükselsin · Let foam rise"],
    ["Köpüğü fincana paylaştır", "Share the foam into the cup", "Önce köpük · Foam first"],
    ["Su ve lokumla servis et", "Serve with water and lokum", "Servis standardı · Serve standard"] ] },
  { k: "filter", tr: "Filtre kahve", en: "Batch brew", steps: [
    ["Filtreyi yerleştir, ıslat", "Place and rinse the filter", "Kâğıt tadı gitsin · No paper taste"],
    ["Kahveyi tart ve düzle", "Weigh and level the coffee", "Reçeteye göre · Per recipe"],
    ["Demlemeyi başlat, saati yaz", "Start the brew, log the time", "Tazelik etiketi · Freshness label"],
    ["Süresi dolanı dök, yenisini kur", "Discard when expired, rebrew", "Bekleme sınırı · Hold limit"] ] },
  { k: "poli", tr: "Açılış–kapanış poli", en: "Open–close clean", steps: [
    ["Grupları kör filtreyle backflush et", "Backflush the groups with a blind basket", "Deterjan · Reçetedeki tur · Detergent cycle"],
    ["Buhar çubuğunu sil, boşalt, beklet", "Wipe, purge and soak the steam wand", "Süt kalıntısı kalmasın · No milk residue"],
    ["Mikser başlıklarını ve pitcher'ları yıka", "Wash frother heads and pitchers", "Süte göre ayrı · Separate per milk"],
    ["Tezgâh, damlama tepsisi ve dolap polisi", "Counter, drip tray and fridge clean", "Dezenfektan · Sanitiser"],
    ["Poli kontrol listesini imzala", "Sign off the clean checklist", "Fotoğraflı kayıt · Photo log"] ] },
];
const OPEN: [string, string][] = [
  ["Makineyi aç, ısınmasını bekle", "Switch on, let the machine heat"],
  ["Grupları boş çalıştır", "Flush the group heads"],
  ["Öğütücüyü kalibre et: test shot'u", "Dial in the grinder: test shot"],
  ["Sütleri ve alternatifleri kontrol et, tarihleri oku", "Check milks and alternatives, read dates"],
  ["Açılış polisi: tezgâh, pitcher, bezler", "Opening clean: counter, pitchers, cloths"],
  ["Alerjen kartını vitrinde kontrol et", "Check the allergen card at the counter"],
  ["Unlu mamül vitrinini ve etiketleri diz", "Set the bakery case and its labels"],
];
const ALLERGEN: [string, string, string, string][] = [
  ["Süt ve alternatifleri", "Milk and alternatives", "Her süt için ayrı pitcher. Hangi pitcher'ın hangi süte ait olduğu videoda gösterilir.", "A separate pitcher per milk. The video shows which pitcher belongs to which milk."],
  ["Buhar çubuğu", "Steam wand", "Bitki bazlı sütten sonra sil ve boşalt; bir sonraki müşteri güvende kalsın.", "Wipe and purge after plant milk, so the next guest stays safe."],
  ["Şuruplar ve soslar", "Syrups and sauces", "İçerik etiketleri ve hangi soruda müşteriye ne söyleneceği tek adımda.", "Ingredient labels and what to say when a guest asks, in one step."],
  ["Kapanış temizliği", "Closing clean", "Backflush, öğütücü haznesi, süt soğutucusu: aynı sırayla, her akşam.", "Backflush, grinder hopper, milk fridge: same order, every night."],
];
const MASTER: [string, string, string, string][] = [
  ["Usta barista bir kez çeker", "The lead barista films once", "Telefonla, gerçek tezgâhta, barista gözünden.", "On a phone, at the real counter, from the barista's eye."],
  ["Flexlore adımlara böler", "Flexlore splits it into steps", "Her adıma kısa klip ve taslak talimat. Usta düzeltir, onaylar.", "A short clip and drafted instruction per step. The lead edits and approves."],
  ["Yeni barista tezgâhta izler", "The new barista watches at the counter", "QR'ı okutur, sıradaki adımı açar, kendi hızında tekrarlar.", "Scans the QR, opens the next step, repeats at their own pace."],
  ["Kısa quiz, sonra tezgâha", "Short quiz, then onto the bar", "Sırayı ve alerjen adımını soran quiz. Sorumlu kimin hazır olduğunu görür.", "A quiz on the order and the allergen step. The lead sees who is ready."],
];

const CLIPS: Record<string, string[]> = {
  fesp: ["tamp", "shot", "sugar", "froth", "pour"],
  fcap: ["froth", "milk", "pour", "shot"],
  latte: ["shot", "milk", "pour", "tamp"],
  turk: ["cezve", "sugar", "cezve", "pour", "sugar"],
  filter: ["tamp", "sugar", "shot", "pour"],
  poli: ["backflush", "wand", "froth", "counter", "checklist"],
};
const clip = (k: string, i: number) => (CLIPS[k] || CLIPS.fesp)[i] || "shot";

/* ---------- phone screens (Flexlore app style) ---------- */
function Fav() { return <img src="/brand/app-icon.png" alt="Flexlore" className="pointer-events-none absolute right-3.5 top-[51px] z-10 h-[22px] w-[22px] rounded-[6px] shadow-[0_2px_10px_rgba(0,0,0,.5)] ring-1 ring-white/10" />; }
function Status() { return <div className="flex h-[44px] items-center justify-between px-6 pt-1 text-[13px] font-semibold text-white"><span>09:41</span><span className="flex gap-1 opacity-90"><i className="h-[9px] w-[14px] rounded-[2px] bg-white" /></span></div>; }
const FILM = ["tamp","tamp","shot","shot","froth","pour","pour","milk"];
function EdTools({ l, big }: { l: L; big?: boolean }) {
  const ic = big ? "text-[15px]" : "text-[11px]";
  return (<div className={big ? "p-6" : "px-3 pb-3"}>
    <div className={`flex items-center justify-between text-white/80 ${big ? "border-b border-white/10 pb-5 text-[20px]" : "pb-2 text-[13px]"}`}><span>↶</span><span>↷</span><span className={`grid place-items-center rounded-full ring-2 ring-white/80 ${big ? "h-9 w-9 text-[13px]" : "h-5 w-5 text-[8px]"}`}>▶</span><span className="mono">‹1s</span><span className="mono">1s›</span></div>
    <div className={`mono flex justify-between text-white/60 ${big ? "mt-5 text-[13px]" : "text-[8.5px]"}`}><span>{t2(l,"Adım başı","Start Step")}: 00:15</span><span>{t2(l,"Adım sonu","Stop Step")}: 01:25</span><span>{t2(l,"Süre","Duration")}: 01:10</span></div>
    <div className={`relative mt-2 flex overflow-hidden rounded-lg ring-1 ring-white/25 ${big ? "h-14" : "h-8"}`}>{FILM.map((f,k)=><img key={k} src={`/video/steps/${f}.jpg`} alt="" className="h-full min-w-0 flex-1 object-cover opacity-80" />)}
      <i className="absolute inset-y-0 left-[10%] w-[18%] border-x-2 border-[#EC6726] bg-[#EC6726]/15" /><i className="absolute inset-y-[-2px] left-[47%] w-[2px] bg-white" /></div>
    <div className={`mt-3 grid grid-cols-[3fr_1fr] gap-2 ${ic} text-white/80`}><div className="grid grid-cols-3 rounded-xl bg-white/[.07] py-2 text-center"><span>◫<br/>{t2(l,"Çıkartma","Stickers")}</span><span>Ⓐ<br/>{t2(l,"Metin","Text")}</span><span>☰<br/>{t2(l,"Adımlar","Steps")}</span></div>
      <div className="rounded-xl bg-white/[.07] py-2 text-center"><span className="text-[#EC6726]">◉</span><br/>{t2(l,"Adım başlat","Start Step")}</div></div>
  </div>);
}
function EditorScreen({ l }: { l: L }) {
  return (<div className="flex h-full flex-col bg-[#111] text-white"><Status /><Fav />
    <div className="flex items-center gap-3 px-4 pb-2 pr-12 text-[11px] text-white/70"><span>{t2(l,"Bitti","Done")}</span><span className="flex-1 truncate text-center font-medium text-white">{t2(l,"Makineyi aç ve ısıt","Power on and warm up")}</span><span>☰</span></div>
    <div className="relative mx-2 flex-1 overflow-hidden rounded-lg bg-black">
      <video src="/video/steps/tamp.mp4" poster="/video/steps/tamp.jpg" autoPlay muted loop playsInline className="h-full w-full object-cover" />
      <span className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 text-[10px]">Barista · Ayşe K.</span>
      <div className="absolute bottom-3 right-2 grid gap-2 text-[10px] font-semibold"><span className="rounded-full bg-[#e5484d] px-3 py-1.5">{t2(l,"Adımı iptal et","Cancel Step")}</span><span className="rounded-full bg-[#EC6726] px-3 py-1.5">{t2(l,"Adımı tamamla","Complete Step")}</span></div>
      <span className="mono absolute bottom-3 left-2 text-[9px] text-white/80">{t2(l,"Video","Video")}: <b className="text-[#EC6726]">04:15</b> / 10:00</span>
    </div>
    <div className="pt-2"><EdTools l={l} /></div>
  </div>);
}
function RecipeScreen({ d, i, l }: { d: Drink; i: number; l: L }) {
  const s = d.steps[i];
  return (<div className="absolute inset-0 flex flex-col bg-[#0e0b09]">
    <Status /><Fav />
    <div className="flex h-[40px] items-center px-3 text-[14px]"><span style={{ color: O }}>‹ {t2(l, "Reçeteler", "Recipes")}</span><span className="absolute left-1/2 -translate-x-1/2 font-semibold text-white">{t2(l, d.tr, d.en)}</span></div>
    <div className="relative mx-3 h-[170px] overflow-hidden rounded-[14px] bg-black">
      <AnimatePresence mode="popLayout"><motion.video key={d.k + i} src={`/video/steps/${clip(d.k, i)}.mp4`} poster={`/video/steps/${clip(d.k, i)}.jpg`} autoPlay muted loop playsInline initial={{ opacity: 0 }} animate={{ opacity: .9 }} exit={{ opacity: 0 }} transition={{ duration: .45 }} className="absolute inset-0 h-full w-full object-cover" /></AnimatePresence>
      <span className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">{t2(l, "Adım", "Step")} {i + 1}/{d.steps.length}</span>
      <div className="absolute inset-x-2 bottom-2 flex gap-1">{d.steps.map((_, k) => <span key={k} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/20">{k <= i && <motion.span layout className="block h-full" style={{ background: O, width: k < i ? "100%" : "60%" }} />}</span>)}</div>
    </div>
    <AnimatePresence mode="wait"><motion.div key={d.k + i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .35 }} className="mx-3 mt-3 rounded-[14px] bg-[#1a1512] p-3">
      <p className="text-[15px] font-semibold leading-tight text-white">{t2(l, s[0], s[1])}</p>
      <p className="mt-1.5 text-[11px] text-white/50">{s[2].split(" · ")[l === "tr" ? 0 : 1] ?? s[2]}</p>
    </motion.div></AnimatePresence>
    <div className="mx-3 mt-2 space-y-1">{d.steps.map((x, k) => <div key={k} className={`flex items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-[11.5px] ${k === i ? "bg-white/[.06] text-white" : "text-white/40"}`}>
      <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[8px] font-semibold ${k < i ? "bg-[#EC6726] text-[#1b1410]" : k === i ? "text-black" : "ring-1 ring-white/20"}`} style={k === i ? { background: O } : {}}>{k < i ? "✓" : k + 1}</span><span className="truncate">{t2(l, x[0], x[1])}</span></div>)}</div>
  </div>);
}
function OpenScreen({ n, l }: { n: number; l: L }) {
  return (<div className="absolute inset-0 flex flex-col bg-[#0e0b09]"><Status /><Fav />
    <div className="px-4 pt-1"><p className="text-[11px] uppercase tracking-[.14em] text-white/40">{t2(l, "Kahve istasyonu · Elif D.", "Coffee station · Elif D.")}</p><p className="text-[20px] font-semibold tracking-tight text-white">{t2(l, "Açılış ve poli", "Opening and clean")}</p>
      <div className="mt-3 h-[4px] overflow-hidden rounded-full bg-white/[.08]"><motion.div className="h-full" style={{ background: O }} animate={{ width: `${(n / OPEN.length) * 100}%` }} transition={{ duration: .6, ease }} /></div>
      <p className="mt-1.5 text-[11px] tabular-nums text-white/45">{n}/{OPEN.length} {t2(l, "tamamlandı", "done")}</p></div>
    <div className="mt-3 space-y-1.5 px-3">{OPEN.map((x, k) => <div key={k} className={`flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-[12.5px] transition ${k < n ? "bg-[#1a1512] text-white/45 line-through decoration-white/20" : k === n ? "bg-[#241d18] text-white ring-1 ring-white/10" : "bg-[#1a1512]/60 text-white/60"}`}>
      <span className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ${k < n ? "bg-[#EC6726]" : "ring-1 ring-white/25"}`}>{k < n && <I.check size={11} strokeWidth={2.5} className="text-[#1b1410]" />}</span>{t2(l, x[0], x[1])}</div>)}</div>
  </div>);
}
function QuizScreen({ pick, setPick, l }: { pick: number | null; setPick: (n: number) => void; l: L }) {
  const opts = [t2(l, "Aynı pitcher'la devam et", "Carry on with the same pitcher"), t2(l, "Ayrı pitcher kullan, çubuğu sil ve boşalt", "Use a separate pitcher, wipe and purge the wand"), t2(l, "Sadece pitcher'ı suyla çalkala", "Just rinse the pitcher with water")];
  return (<div className="absolute inset-0 flex flex-col bg-[#0e0b09]"><Status /><Fav />
    <div className="px-4 pt-1"><p className="text-[11px] uppercase tracking-[.14em] text-white/40">Quiz · {t2(l, "Alerjen", "Allergen")}</p>
      <p className="mt-2 text-[16px] font-semibold leading-snug text-white">{t2(l, "Müşteri süt alerjisi olduğunu söylüyor ve yulaf sütlü latte istiyor. Az önce inek sütü buharladın. Ne yaparsın?", "A guest says they have a milk allergy and orders an oat latte. You just steamed dairy. What do you do?")}</p></div>
    <div className="mt-4 space-y-2 px-3">{opts.map((o, k) => { const sel = pick === k, ok = k === 1; return (
      <button key={k} onClick={() => setPick(k)} className={`flex w-full items-start gap-2.5 rounded-[12px] px-3 py-2.5 text-left text-[12.5px] leading-snug transition ${sel ? (ok ? "bg-[#EC6726]/[.10] text-white ring-1 ring-[#EC6726]/50" : "bg-[#b4532a]/[.12] text-white ring-1 ring-[#b4532a]/45") : "bg-[#1a1512] text-white/80 hover:bg-[#241d18]"}`}>
        <span className={`mt-0.5 h-[14px] w-[14px] shrink-0 rounded-full ${sel ? (ok ? "bg-[#EC6726]" : "bg-[#b4532a]") : "ring-1 ring-white/25"}`} />{o}</button>); })}</div>
    {pick !== null && <p className="mx-4 mt-3 text-[11.5px] leading-snug text-white/55">{pick === 1 ? t2(l, "Doğru. Bu adımın videosu reçetede 6. adım olarak duruyor.", "Correct. This step has its own video in the recipe.") : t2(l, "Tekrar bak: çapraz temas riski var. Adım videosu açılıyor.", "Look again: cross-contact risk. Opening the step video.")}</p>}
  </div>);
}


const MW = { gross: 33030, employer: 40874.63, hours: 225 }; // ÇSGB 2026, monthly; 225 h = 30 days × 7.5 h
function Roi({ l }: { l: L }) {
  const [v, setV] = useState({ br: 100, st: 6, to: 50, h: 24, sv: 30, mx: 1, rm: 3, cc: 60, rr: 25 });
  const hr = (MW.employer / MW.hours) * v.mx;
  type K = keyof typeof v;
  const G: [string, string, [K, string, string, number, number, number, (x: number) => string][]][] = [
    ["Ölçek", "Scale", [
      ["br", "Şube sayısı", "Branches", 50, 300, 10, (x) => `${x}`],
      ["st", "Şube başına ortalama çalışan", "Average staff per branch", 3, 12, 1, (x) => `${x}`],
      ["to", "Yıllık yeni çalışan oranı", "Annual new-hire rate", 10, 120, 5, (x) => `%${x}`]]],
    ["Eğitim", "Onboarding", [
      ["h", "Yeni çalışan başına eğitim saati", "Training hours per new hire", 8, 80, 2, (x) => `${x} ${t2(l, "sa", "h")}`],
      ["sv", "Video adımlarla azalan süre", "Time saved with video steps", 0, 60, 5, (x) => `%${x}`],
      ["mx", "Saat maliyeti (asgari ücretin katı)", "Hourly cost (× minimum wage)", 1, 2.5, .1, (x) => `${x.toFixed(1)}×`]]],
    ["Fire ve yeniden yapım", "Waste and remakes", [
      ["rm", "Şube başına günlük yeniden yapılan içecek", "Remade drinks per branch / day", 0, 15, 1, (x) => `${x}`],
      ["cc", "Yeniden yapılan içeceğin malzeme maliyeti", "Ingredient cost per remade drink", 20, 200, 5, (x) => `${x} ₺`],
      ["rr", "Standartla azalan yeniden yapım", "Remakes avoided by the standard", 0, 60, 5, (x) => `%${x}`]]],
  ];
  const hires = v.br * v.st * v.to / 100;
  const hrs = hires * v.h * 2 * v.sv / 100; // trainee + trainer
  const lab = hrs * hr, waste = v.br * v.rm * 360 * v.rr / 100 * v.cc;
  const fmt = (x: number) => Math.round(x).toLocaleString(l === "tr" ? "tr-TR" : "en-US");
  const rows: [string, string, string][] = [
    [t2(l, "Yılda yeni çalışan", "New hires / year"), fmt(hires), t2(l, "şube × çalışan × oran", "branches × staff × rate")],
    [t2(l, "Geri kazanılan eğitim saati", "Training hours recovered"), `${fmt(hrs)} ${t2(l, "sa", "h")}`, t2(l, "yeni çalışan × saat × 2 kişi × azalma", "hires × hours × 2 people × saving")],
    [t2(l, "Eğitim zamanının karşılığı", "Value of training time"), `${fmt(lab)} ₺`, `${t2(l, "saat", "hours")} × ${fmt(hr)} ₺`],
    [t2(l, "Önlenen yeniden yapım", "Remakes avoided"), `${fmt(waste)} ₺`, t2(l, "şube × günlük × 360 × azalma × maliyet", "branches × daily × 360 × saving × cost")],
  ];
  return (<section id="roi" className="relative px-6 py-24 md:px-10 md:py-32 before:absolute before:inset-x-6 md:before:inset-x-10 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#e9dcc6]/[.16] before:to-transparent"><div className="mx-auto max-w-[1400px]">
    <div className="grid gap-10 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7"><p className="mono text-[11px] uppercase tracking-[.22em] text-[#EC6726]">06 · {t2(l, "Örnek getiri çerçevesi", "Example return framework")}</p>
        <h2 className="mt-5 max-w-[18ch] text-[clamp(2.2rem,4.4vw,4.2rem)] font-medium leading-[1.02] tracking-[-.035em] text-[#f4efe8]">{t2(l, "Yüz şubede, aynı standardın değeri.", "The value of one standard across a hundred branches.")}</h2></div>
      <p className="text-[14.5px] leading-[1.6] text-[#f4efe8]/55 md:col-span-5">{t2(l, "Planlama varsayımlarıyla hazırlanmış bir çerçevedir. Mikel Coffee tarafından doğrulanmış veri, müşteri sonucu ya da Flexlore taahhüdü değildir. Lisans bedeli hesaba dahil değildir. Gerçek değerleri pilotta birlikte ölçeriz.", "A framework built on planning assumptions. It is not data confirmed by Mikel Coffee, a customer result or a Flexlore promise. No licence cost is included. We measure the real values together in a pilot.")}</p>
    </div>
    <div className="mt-20 grid gap-16 md:grid-cols-12">
      <div className="md:col-span-6">{G.map(([ga, gb, fs]) => <div key={ga} className="mb-12 last:mb-0">
        <p className="mono border-b border-[#e9dcc6]/[.14] pb-3 text-[10.5px] uppercase tracking-[.22em] text-[#f4efe8]/40">{t2(l, ga, gb)} · {t2(l, "planlama varsayımı", "planning assumption")}</p>
        {fs.map(([k, a, b, mn, mx, st, f]) => <label key={k} className="block border-b border-[#e9dcc6]/[.06] py-4">
          <span className="flex items-baseline justify-between gap-4 text-[13.5px] text-[#f4efe8]/65"><span>{t2(l, a, b)}</span><span className="tabular-nums text-[15px] text-[#f4efe8]">{f(v[k])}</span></span>
          <input type="range" min={mn} max={mx} step={st} value={v[k]} onChange={(e) => setV({ ...v, [k]: +e.target.value })} className="rng rng-cream mt-3 w-full" style={{ ["--p" as string]: `${((v[k] - mn) / (mx - mn)) * 100}%` }} aria-label={t2(l, a, b)} /></label>)}
      </div>)}</div>
      <div className="md:col-span-5 md:col-start-8"><div className="md:sticky md:top-28">
        <p className="mono border-b border-[#e9dcc6]/[.14] pb-3 text-[10.5px] uppercase tracking-[.22em] text-[#f4efe8]/40">{t2(l, "Yıllık örnek tahmin", "Annual example estimate")}</p>
        {rows.map(([a, b, c]) => <div key={a} className="flex items-baseline justify-between gap-6 border-b border-[#e9dcc6]/[.06] py-5"><div><p className="text-[14px] text-[#f4efe8]/75">{a}</p><p className="mt-1 text-[11.5px] text-[#f4efe8]/35">{c}</p></div><p className="shrink-0 tabular-nums text-[20px] font-medium tracking-[-.02em] text-[#f4efe8]">{b}</p></div>)}
        <div className="border-b border-[#e9dcc6]/[.14] py-8"><p className="text-[13px] text-[#EC6726]">{t2(l, "Toplam örnek tahmin / yıl", "Total example estimate / year")}</p><p className="mt-3 tabular-nums text-[clamp(2.8rem,5vw,4.4rem)] font-medium leading-none tracking-[-.045em] text-[#f4efe8]">{fmt(lab + waste)} ₺</p></div>
        <p className="mt-6 text-[11.5px] leading-[1.6] text-[#f4efe8]/35">{t2(l, `İşçilik bazı: 2026 asgari ücreti, brüt ${fmt(MW.gross)} ₺/ay, işverene maliyet (indirimsiz) ${fmt(MW.employer)} ₺/ay; 225 saat/ay ile ${fmt(MW.employer / MW.hours)} ₺/saat. Kaynak: T.C. Çalışma ve Sosyal Güvenlik Bakanlığı, Resmî Gazete 26.12.2025/33119. Kamuya açık referanstır, Mikel Coffee ücret verisi değildir. Eğitim saati, eğiten ve eğitilen için iki kez sayılır.`, `Labour basis: Turkey's 2026 minimum wage, gross ${fmt(MW.gross)} ₺/month, employer cost (no incentives) ${fmt(MW.employer)} ₺/month; at 225 h/month that is ${fmt(MW.employer / MW.hours)} ₺/h. Source: Turkish Ministry of Labour and Social Security, Official Gazette 26.12.2025/33119. A public reference, not Mikel Coffee wage data. Training hours count twice: trainer and trainee.`)}</p>
        <a href={SITE.demo} className="mt-8 inline-flex items-center gap-2 border-b border-[#e9dcc6]/40 pb-1 text-[14px] text-[#f4efe8] transition hover:border-[#f4efe8]">{t2(l, "Bu çerçeveyi kendi verinizle doğrulayalım", "Validate this with your own data")} <Arr /></a>
      </div></div>
    </div>
    <p className="mt-24 border-t border-[#e9dcc6]/[.08] pt-6 text-[11.5px] text-[#f4efe8]/30">{t2(l, "Bu sayfa Mikel Coffee ekibi için Flexlore Inc. tarafından hazırlanmış bir demodur. Mikel Coffee'nin resmi bir yayını değildir; reçete adımları, ekran içerikleri ve hesaplamalar örnektir.", "This page is a demo prepared by Flexlore Inc. for the Mikel Coffee team. It is not an official Mikel Coffee publication; recipe steps, screen contents and calculations are examples.")}</p>
  </div></section>);
}

/* ---------- page ---------- */
export default function MikelCoffee() {
  const [l, setL] = useState<L>("tr");
  const reduce = useReducedMotion();
  const [d, setD] = useState(0); const [i, setI] = useState(0); const [play, setPlay] = useState(true);
  const [n, setN] = useState(0); const [pick, setPick] = useState<number | null>(null);
  const drink = DRINKS[d];
  useEffect(() => { if (!play || reduce) return; const id = setInterval(() => setI((x) => (x + 1) % drink.steps.length), 2600); return () => clearInterval(id); }, [play, reduce, drink]);
  useEffect(() => { if (reduce) { setN(OPEN.length); return; } const id = setInterval(() => setN((x) => (x >= OPEN.length ? 0 : x + 1)), 1500); return () => clearInterval(id); }, [reduce]);
  useEffect(() => { document.documentElement.lang = l; }, [l]);
  const sec = "relative px-6 py-20 md:px-10 md:py-28 before:absolute before:inset-x-6 md:before:inset-x-10 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#e9dcc6]/[.16] before:to-transparent";
  return (<>
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-gradient-to-b from-black/85 to-transparent px-6 py-4 pb-10 md:px-10">
      <Link href="/" className="flex items-center gap-3"><img src="/brand/wordmark-light.png" alt="Flexlore" className="h-7 w-auto" /><span className="text-[13px] text-white/35">×</span><img src="/brand/mikel/mikel-mark.svg" alt="Mikel Coffee" className="h-9 w-auto" /></Link>
      <div className="flex items-center gap-3">
        <div className="flex rounded-full bg-white/[.07] p-0.5 text-[11px] font-medium ring-1 ring-white/10" role="group" aria-label="Language">{(["tr", "en"] as L[]).map((x) => <button key={x} onClick={() => setL(x)} aria-pressed={l === x} className={`rounded-full px-2.5 py-1 uppercase ${l === x ? "bg-white text-black" : "text-white/60"}`}>{x}</button>)}</div>
        <a href={SITE.demo} className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black">{t2(l, "Görüşme planla", "Book a call")}</a></div>
    </header>
    <main id="main" className="bg-[#0c0a09] text-[#f4efe8]">
      {/* hero */}
      <section className="relative h-svh overflow-hidden">
        <Video name="coffee" eager /><div className="absolute inset-0 bg-black/50" /><div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/70 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-[11vh] md:px-10">
          <motion.img initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .9, ease }} src="/brand/mikel/mikel-mark.svg" alt="Mikel Coffee" className="mb-7 mr-auto block h-16 w-auto self-start md:h-20" style={{ marginLeft: 0 }} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }} className="mono text-[11px] uppercase tracking-[.22em] text-[#EC6726]">{t2(l, "Mikel Coffee için hazırlanmış demo · Kahve operasyonu", "Prepared for Mikel Coffee · Coffee operations")}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: 1, ease }} className="display mt-5 max-w-[14ch] text-[clamp(2.9rem,7.6vw,7.6rem)] !font-medium !leading-[.98] !tracking-[-.045em]">{t2(l, "Her franchise'ta,", "In every franchise,")}<br />{t2(l, "aynı ", "the same ")}<span className="text-[#EC6726]">{t2(l, "standart.", "standard.")}</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }} className="mt-6 max-w-[52ch] text-[18px] leading-[1.4] text-white/75">{t2(l, "Usta baristanızın elini bir kez telefonla çekin. Flexlore onu adım adım video reçeteye, açılış listesine ve kısa quize çevirsin. Yeni barista tezgâhta izler, uygular, sorumlu kimin hazır olduğunu görür.", "Film your lead barista's hands once on a phone. Flexlore turns it into step-by-step video recipes, an opening checklist and a short quiz. New baristas watch at the counter, do it, and the lead sees who is ready.")}</motion.p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#recete" className="btn-p">{t2(l, "Simülasyonu izle", "See the simulation")} <Arr dir="d" className="ml-1" /></a><a href={SITE.demo} className="btn-g">{t2(l, "Kendi reçetenizle deneyelim", "Try it with your recipe")}</a></div>
        </div>
      </section>

      {/* problem */}
      <section className={sec}><div className="mx-auto max-w-[1400px]">
        <Rev><p className="mono text-[11px] uppercase tracking-[.22em] text-[#EC6726]">{t2(l, "Tezgâhta olan", "What happens at the bar")}</p><h2 className="display mt-4 max-w-[18ch] text-[clamp(2.4rem,5vw,5rem)]">{t2(l, "Reçete kâğıtta aynı. Fincan şubeden şubeye değişiyor.", "The recipe is the same on paper. The cup changes branch to branch.")}</h2><p className="mt-5 max-w-[56ch] text-[17px] leading-[1.45] text-white/60">{t2(l, "Freddo bunun en net örneği: aynı espresso, aynı köpük, aynı buz oranı; hangi şubeye girerseniz girin, aynı bardak. Standart, bir kişinin elinde değil sistemde durmalı.", "Freddo is the clearest example: same espresso, same foam, same ice ratio; whichever branch you walk into, the same cup. The standard should live in the system, not in one person's hands.")}</p></Rev>
        <div className="mt-14 grid border-t border-white/[.07] md:grid-cols-3">{[
          [t2(l, "Yoğun saatte yeni barista", "A new barista at rush hour"), t2(l, "Gösterecek kimse yok; reçeteyi duvardaki çıktıdan okumaya çalışıyor.", "Nobody free to show them; they try to read the recipe off a printout.")],
          [t2(l, "Usta tek kişi", "One lead barista"), t2(l, "Doğru süt dokusu, doğru döküm, doğru temizlik onun elinde. İzinde olduğunda standart kayıyor.", "The right foam, the right pour, the right clean live in their hands. On their day off the standard drifts.")],
          [t2(l, "Alerjen sorusu", "The allergen question"), t2(l, "Bitki bazlı süt, şurup içerikleri, çapraz temas: müşteri sorduğunda cevap kişiye göre değişiyor.", "Plant milk, syrup ingredients, cross-contact: the answer depends on who is on shift.")],
        ].map(([h, p], k) => <Rev key={h} d={k * .08} className={`relative py-9 md:px-8 ${k ? "border-t border-white/[.07] md:border-l md:border-t-0" : "md:pl-0"}`}><span aria-hidden className={`absolute top-[-1px] h-px w-10 bg-[#EC6726] ${k ? "left-0 md:left-8" : "left-0"}`} /><span className="mono text-[11px] tracking-[.18em] text-[#EC6726]">0{k + 1}</span><h3 className="mt-3 text-[22px] font-semibold tracking-tight">{h}</h3><p className="mt-2 text-[15px] leading-[1.45] text-white/60">{p}</p></Rev>)}</div>
      </div></section>

      {/* recipe simulator */}
      <section id="recete" className={`${sec} border-t border-[#e9dcc6]/[.08]`}><div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <p className="mono text-[11px] uppercase tracking-[.22em] text-[#EC6726]">01 · {t2(l, "İçecek reçeteleri, video adımlar", "Drink recipes as video steps")}</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,4.8vw,4.6rem)]">{t2(l, "Barista gözünden, adım adım.", "Through the barista's eyes, step by step.")}</h2>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.5] text-white/60">{t2(l, "Bir içecek seçin. Telefon, yeni bir baristanın tezgâhta gördüğünü gösterir. Adımlar örnektir; gerçek demoda sizin reçeteniz ve ölçüleriniz kullanılır.", "Pick a drink. The phone shows what a new barista sees at the counter. Steps are examples; in a real demo we use your recipe and measures.")}</p>
          <div className="mt-8 flex flex-wrap gap-2">{DRINKS.map((x, k) => <button key={x.k} onClick={() => { setD(k); setI(0); setPlay(true); }} aria-pressed={d === k} className={`rounded-full px-4 py-2 text-[14px] font-medium ring-1 transition ${d === k ? "bg-white text-black ring-white" : "text-white/75 ring-white/20 hover:ring-white/50"}`}>{t2(l, x.tr, x.en)}</button>)}</div>
          <ol className="mt-8 ">{drink.steps.map((s, k) => <li key={k}><button onClick={() => { setI(k); setPlay(false); }} className={`grid w-full grid-cols-[2.5rem_1fr] items-baseline border-b border-[#e9dcc6]/[.08] py-3 text-left transition ${k === i ? "text-white" : "text-white/45 hover:text-white/80"}`}>
            <span className="mono text-[11px] tabular-nums" style={k === i ? { color: O } : {}}>{String(k + 1).padStart(2, "0")}</span><span className="text-[17px] font-medium tracking-tight">{t2(l, s[0], s[1])}</span></button></li>)}</ol>
          <button onClick={() => setPlay((p) => !p)} className="mono mt-4 text-[11px] uppercase tracking-[.18em] text-white/50 hover:text-white">{play ? t2(l, "Duraklat", "Pause") : t2(l, "Otomatik oynat", "Autoplay")}</button>
        </div>
        <div className="mx-auto w-[min(78vw,330px)] md:col-span-5 md:col-start-8"><Device label={t2(l, "Flexlore uygulamasında içecek reçetesi", "Drink recipe in the Flexlore app")}><RecipeScreen d={drink} i={i} l={l} /></Device></div>
      </div></section>

      {/* editor */}
      <section id="editor" className={`${sec} border-t border-[#e9dcc6]/[.08]`}><div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <p className="mono text-[11px] uppercase tracking-[.22em] text-[#EC6726]">{t2(l,"Video editörü · Usta kaydeder","Video editor · The lead records")}</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,4.8vw,4.6rem)]">{t2(l,"Tek çekim, ","One take, ")}<span className="text-[#EC6726]">{t2(l,"net adımlar.","clear steps.")}</span></h2>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.5] text-white/60">{t2(l,"Usta baristanız istasyonu bir kez çeker; Flexlore editöründe başlangıç ve bitişi işaretleyip uzun videoyu adım adım izlenen bir akışa böler. Metin ve çıkartma ekler, yayınlar.","Your lead films the station once; in the Flexlore editor they mark start and stop and cut the long video into a step-by-step flow, add text and stickers, and publish.")}</p>
          <div className="mt-10 hidden max-w-[520px] rounded-2xl bg-white/[.04] ring-1 ring-white/10 backdrop-blur md:block"><EdTools l={l} big /></div>
        </div>
        <div className="mx-auto w-[min(78vw,330px)] md:col-span-5 md:col-start-8"><Device label={t2(l,"Flexlore video editörü","Flexlore video editor")}><EditorScreen l={l} /></Device></div>
      </div></section>

      {/* shift opening */}
      <section className={`${sec} border-t border-[#e9dcc6]/[.08]`}><div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12 md:items-center">
        <div className="order-2 mx-auto w-[min(78vw,330px)] md:order-1 md:col-span-5"><Device label={t2(l, "Kahve istasyonu açılış listesi", "Coffee station opening checklist")}><OpenScreen n={n} l={l} /></Device></div>
        <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
          <p className="mono text-[11px] uppercase tracking-[.22em] text-[#EC6726]">02 · {t2(l, "Açılış, kapanış ve poli", "Opening, closing and clean")}</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,4.8vw,4.6rem)]">{t2(l, "Kepenk açılmadan istasyon hazır.", "The station is ready before the shutters open.")}</h2>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.5] text-white/60">{t2(l, "Açılışı yapan kim olursa olsun, aynı sıra. Her maddenin arkasında ustanın 20 saniyelik videosu var; takılan kişi dokunur, izler, devam eder.", "Whoever opens, the same order. Behind each item is a short clip from your lead; whoever gets stuck taps, watches, carries on.")}</p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 text-[15px] text-white/75 sm:grid-cols-2">{OPEN.map((x) => <li key={x[0]} className="flex gap-2.5"><I.check size={18} className="mt-0.5 shrink-0 text-white/40" />{t2(l, x[0], x[1])}</li>)}</ul>
        </div>
      </div></section>

      {/* allergen / hygiene */}
      <section className={`${sec} border-t border-[#e9dcc6]/[.08]`}><div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12 md:items-start">
        <div className="md:col-span-6">
          <p className="mono text-[11px] uppercase tracking-[.22em] text-[#EC6726]">03 · {t2(l, "Alerjen ve hijyen", "Allergen and hygiene")}</p>
          <h2 className="display mt-4 text-[clamp(2.4rem,4.8vw,4.6rem)]">{t2(l, "Müşteri sorduğunda herkes aynı cevabı verir.", "When a guest asks, everyone gives the same answer.")}</h2>
          <div className="mt-10 ">{ALLERGEN.map(([a, b, c, e], k) => <Rev key={a} d={k * .05} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-[#e9dcc6]/[.08] py-5"><span className="mono pt-1 text-[11px] text-white/35">0{k + 1}</span><div><h3 className="text-[19px] font-semibold tracking-tight">{t2(l, a, b)}</h3><p className="mt-1 text-[15px] leading-[1.45] text-white/60">{t2(l, c, e)}</p></div></Rev>)}</div>
          <p className="mt-5 text-[13px] text-white/40">{t2(l, "İçerik ve alerjen bilgisi sizin onaylı listenizden gelir; Flexlore onu tezgâhta gösterilebilir hale getirir.", "Ingredient and allergen facts come from your approved list; Flexlore makes them showable at the counter.")}</p>
        </div>
        <div className="mx-auto w-[min(78vw,330px)] md:col-span-5 md:col-start-8 md:sticky md:top-24"><Device label={t2(l, "Alerjen quiz ekranı", "Allergen quiz screen")}><QuizScreen pick={pick} setPick={setPick} l={l} /></Device>
          <p className="mt-4 text-center text-[12px] text-white/40">{t2(l, "Dokunun: bir cevap seçin.", "Tap: pick an answer.")}</p></div>
      </div></section>

      {/* master-apprentice */}
      <section className={`${sec} border-t border-[#e9dcc6]/[.08]`}><div className="mx-auto max-w-[1400px]">
        <Rev><p className="mono text-[11px] uppercase tracking-[.22em] text-[#EC6726]">04 · {t2(l, "Usta–çırak", "Master–apprentice")}</p><h2 className="display mt-4 max-w-[16ch] text-[clamp(2.4rem,5vw,5rem)]">{t2(l, "Ustanın eli, her şubede.", "Your lead's hands, in every branch.")}</h2></Rev>
        <ol className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-4">{MASTER.map(([a, b, c, e], k) => <Rev key={a} d={k * .08}><li className="flex h-full flex-col border-t border-[#e9dcc6]/[.14] pt-7 pr-4">
          <span className="grid h-10 w-10 place-items-center rounded-full text-white/80 ring-1 ring-[#e9dcc6]/20">{[<I.record key="a" size={20} />, <I.split key="b" size={20} />, <I.qr key="c" size={20} />, <I.ready key="d" size={20} />][k]}</span>
          <span className="mono mt-8 text-[11px]" style={{ color: O }}>0{k + 1}</span><h3 className="mt-2 text-[20px] font-semibold leading-tight tracking-tight">{t2(l, a, b)}</h3><p className="mt-2 text-[14.5px] leading-[1.45] text-white/60">{t2(l, c, e)}</p></li></Rev>)}</ol>
      </div></section>

      {/* manager view */}
      <section className={`${sec} border-t border-[#e9dcc6]/[.08]`}><div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5"><p className="mono text-[11px] uppercase tracking-[.22em] text-[#EC6726]">05 · {t2(l, "Bölge ve şube sorumlusu", "Area and branch leads")}</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,4.2vw,4rem)]">{t2(l, "Kim hangi içeceğe hazır, tek ekranda.", "Who is ready for which drink, on one screen.")}</h2>
          <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.5] text-white/60">{t2(l, "Web panelinde reçeteleri şubelere atayın, quiz sonuçlarını görün, yeni reçeteyi tek seferde tüm kahve noktalarına gönderin.", "In the web panel, assign recipes to branches, see quiz results and send a new recipe to every coffee point at once.")}</p></div>
        <div className="md:col-span-7"><Rev className="overflow-hidden rounded-[6px] bg-[#120e0c]/80 ring-[.5px] ring-[#e9dcc6]/[.12]">
          <div className="flex items-center justify-between border-b border-[#e9dcc6]/[.07] px-5 py-3 text-[12px] text-white/50"><span>{t2(l, "Hazırlık · Kahve istasyonu", "Readiness · Coffee station")}</span><span className="mono text-[10px] uppercase tracking-[.16em] text-white/35">{t2(l, "Örnek görünüm", "Sample view")}</span></div>
          <table className="w-full text-left text-[13px]"><thead className="text-[11px] uppercase tracking-[.12em] text-white/35"><tr><th className="px-5 py-3 font-medium">{t2(l, "Barista", "Barista")}</th>{DRINKS.map((x) => <th key={x.k} className="px-3 py-3 font-medium">{t2(l, x.tr, x.en)}</th>)}</tr></thead>
            <tbody>{[["Ayşe K.", [2, 2, 1, 2, 2, 2]], ["Mehmet Y.", [2, 1, 0, 2, 1, 2]], ["Elif D.", [1, 0, 0, 1, 2, 1]], ["Can A.", [2, 2, 2, 1, 0, 2]], ["Zeynep S.", [1, 1, 0, 0, 1, 1]]].map(([nm, v]) => <tr key={nm as string} className="border-t border-[#e9dcc6]/[.06]"><td className="px-5 py-3 text-white/85">{nm as string}</td>{(v as number[]).map((x, k) => <td key={k} className="px-3 py-3"><span className={`inline-flex items-center gap-1.5 text-[12px] ${x === 2 ? "text-white" : x === 1 ? "text-white/60" : "text-white/35"}`}><span className={`h-1.5 w-1.5 rounded-full ${x === 2 ? "bg-[#EC6726]" : x === 1 ? "" : "ring-1 ring-white/30"}`} style={x === 1 ? { background: O } : {}} />{x === 2 ? t2(l, "Hazır", "Ready") : x === 1 ? t2(l, "Eğitimde", "In training") : t2(l, "Atanmadı", "Not assigned")}</span></td>)}</tr>)}</tbody></table>
        </Rev></div>
      </div></section>

      {/* cta */}
      <section className={`${sec} border-t border-[#e9dcc6]/[.08]`}><div className="mx-auto max-w-[1400px]">
        <h2 className="display max-w-[14ch] text-[clamp(3rem,8vw,8rem)]">{t2(l, "Bir reçeteyle başlayalım.", "Let's start with one recipe.")}</h2>
        <p className="mt-6 max-w-[50ch] text-[18px] leading-[1.4] text-white/65">{t2(l, "Bir kahve noktanızdan tek bir içeceği birlikte çekelim. Aynı gün adımlar, açılış listesi ve quiz hazır olsun; ekibiniz kendi tezgâhında denesin.", "Let's film one drink at one of your coffee points together. Same day: steps, opening checklist and quiz ready for your team to try at their own bar.")}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3"><a href={SITE.demo} className="btn-p">{t2(l, "Görüşme planla", "Book a call")} <Arr className="ml-1" /></a><Link href="/" className="btn-g">{t2(l, "Flexlore'u tanı", "About Flexlore")}</Link></div>
        <div className="mt-12 border-t border-white/[.07] pt-8"><p className="mono text-[11px] uppercase tracking-[.22em] text-[#EC6726]">{t2(l, "Uygulamayı indirin", "Get the app")}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a href="https://apps.apple.com/tr/app/flexlore/id6751126206" target="_blank" rel="noopener" aria-label="App Store'dan indirin" className="transition-opacity hover:opacity-80"><img src="/brand/stores/appstore-tr.svg" alt="App Store'dan İndirin" className="h-[48px] w-auto" /></a>
            <a href="https://play.google.com/store/apps/details?id=com.flexlore.app" target="_blank" rel="noopener" aria-label="Google Play'den alın" className="transition-opacity hover:opacity-80"><img src="/brand/stores/googleplay-tr.png" alt="Google Play'den Alın" className="-my-[11px] h-[70px] w-auto" /></a>
          </div></div>
      </div></section>
      <Roi l={l} />
    </main>
  </>);
}
