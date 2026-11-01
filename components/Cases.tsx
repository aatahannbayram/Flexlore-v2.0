"use client";
import { motion } from "framer-motion";
import { Video } from "./Site";
import { Device, SopScreen, QuizScreen } from "./AppScreens";
const ease = [0.22, 1, 0.36, 1] as const;
type Case = { id: string; k: string; h: string; pov: string; steps: [string, string][]; out: string; bg: { img?: string; v?: string }; note?: string; ba?: [string, string]; ui?: "sop" | "quiz" };
const en: { k: string; h: string; p: string; cases: Case[] } = {
  k: "Four cases", h: "Seen from the operator's side.",
  p: "Same idea every time: the job is shown the way the person doing it sees it, one step at a time, on their phone.",
  cases: [
    { id: "case-first-shift", k: "New hire · first shift", h: "\u201cI\u2019ve never done this job before.\u201d", bg: { v: "line" },
      pov: "Day one. Instead of shadowing whoever is free, the new operator opens the task on a phone and watches it done from their own position at the station.",
      steps: [["Video SOP", "Watch the task split into short steps, each with a written instruction."], ["AI quiz", "Answer a few questions drafted from those steps."], ["Readiness", "The supervisor sees they passed before the first solo run."]],
      out: "Easy onboarding, faster training.", ui: "quiz" },
    { id: "case-master-apprentice", k: "Master \u2192 apprentice", h: "\u201cWatch how I do it. Then do it again.\u201d", bg: { img: "/photos/operators.webp" },
      pov: "The master operator records the job once, at the workstation, the way it has always been done right. The apprentice can replay any step as often as they need.",
      steps: [["Master records once", "One phone video of the real job. No studio, no script."], ["AI splits it into steps", "Flexlore cuts the video into steps and drafts the instructions. The master approves."], ["Apprentice replays", "Step by step, at their own pace, until it sticks."]],
      out: "Master\u2013apprentice knowledge transfer that doesn\u2019t depend on being in the same shift.", ui: "sop" },
    { id: "case-installation", k: "Installation at a customer site", h: "\u201cThe installers left. The know-how stayed.\u201d", bg: { img: "/photos/after-install.webp" },
      pov: "Your team installs equipment at a customer site and runs the orientation. When they leave, the customer\u2019s operators still have every step, right at the machine.",
      steps: [["QR on the equipment", "Each QR code opens the step-by-step videos for that machine."], ["Step links", "Start-up, changeover, cleaning, the checks: each one its own step."], ["Stays after install", "New shifts and new hires see the same orientation months later."]],
      out: "Orientation becomes permanent instead of a one-day event.", ba: ["Before: orientation lives in the installers\u2019 heads and leaves with them. Questions become support calls.", "After: every step is a QR scan away at the machine, for every new shift."] },
    { id: "case-quality", k: "Quality defect \u2192 retraining", h: "\u201cThat\u2019s the step that went wrong.\u201d", bg: { img: "/photos/factory.jpg" },
      pov: "A defect is traced back to one step. Instead of retraining the whole process, the operator gets exactly that step again.",
      steps: [["Faulty step identified", "Pinpoint which step in the work instruction caused the defect."], ["Step video assigned", "The operator re-watches that one step, filmed the right way."], ["Quiz confirms it", "A short quiz checks the step is understood before the next run."]],
      out: "Lower cost of poor quality, by fixing the step, not just the part.",
      note: "Example, for illustration only: a defect costing \u20ac40 in rework that recurs 25 times a month is \u20ac1,000 a month. Not customer data." },
  ],
};
const tr: typeof en = {
  k: "Dört örnek", h: "Operatörün tarafından bakın.",
  p: "Her seferinde aynı fikir: iş, onu yapan kişinin gördüğü gibi, adım adım, telefonunda gösterilir.",
  cases: [
    { ...en.cases[0], k: "Yeni çalışan · ilk vardiya", h: "\u201cBu işi daha önce hiç yapmadım.\u201d",
      pov: "İlk gün. Boşta kim varsa onu izlemek yerine yeni operatör görevi telefonda açar ve işi istasyondaki kendi konumundan yapılırken izler.",
      steps: [["Video SOP", "Görevi kısa adımlara bölünmüş, her adımı yazılı talimatlı izler."], ["AI quiz", "Bu adımlardan hazırlanmış birkaç soruyu yanıtlar."], ["Hazırlık", "Yönetici, ilk tek başına çalışmadan önce geçtiğini görür."]],
      out: "Kolay işe alışma, hızlı eğitim." },
    { ...en.cases[1], k: "Usta \u2192 çırak", h: "\u201cNasıl yaptığımı izle. Sonra tekrar yap.\u201d",
      pov: "Usta işi bir kez, tezgâhta, hep doğru yapıldığı gibi kaydeder. Çırak istediği adımı istediği kadar tekrar izler.",
      steps: [["Usta bir kez kaydeder", "Gerçek işin tek bir telefon videosu. Stüdyo yok, senaryo yok."], ["AI adımlara böler", "Flexlore videoyu adımlara ayırır, talimatları hazırlar. Usta onaylar."], ["Çırak tekrar izler", "Adım adım, kendi hızında, oturana kadar."]],
      out: "Aynı vardiyada olmaya bağlı kalmayan usta\u2013çırak bilgi aktarımı." },
    { ...en.cases[2], k: "Müşteri lokasyonunda kurulum", h: "\u201cKurulum ekibi gitti. Bilgi kaldı.\u201d",
      pov: "Ekibiniz müşteri sahasında ekipmanı kurar ve oryantasyonu verir. Onlar gidince müşterinin operatörleri her adıma makinenin başında ulaşmaya devam eder.",
      steps: [["Ekipmanda QR", "Her QR kod o makinenin adım adım videolarını açar."], ["Adım linkleri", "Devreye alma, ürün değişimi, temizlik, kontroller: her biri ayrı adım."], ["Kurulumdan sonra da kalır", "Yeni vardiyalar ve yeni çalışanlar aylar sonra aynı oryantasyonu görür."]],
      out: "Oryantasyon tek günlük bir etkinlik değil, kalıcı hale gelir.", ba: ["Önce: oryantasyon kurulum ekibinin kafasındadır ve onlarla gider. Sorular destek çağrısına dönüşür.", "Sonra: her adım makinenin başında bir QR uzaklıkta, her yeni vardiya için."] },
    { ...en.cases[3], k: "Kalite hatası \u2192 yeniden eğitim", h: "\u201cHatalı adım buydu.\u201d",
      pov: "Bir hata tek bir adıma kadar izlenir. Tüm süreci yeniden öğretmek yerine operatöre tam o adım yeniden atanır.",
      steps: [["Hatalı adım bulunur", "İş talimatındaki hangi adımın hataya yol açtığı belirlenir."], ["Adım videosu atanır", "Operatör o adımı doğru yapılışıyla yeniden izler."], ["Quiz doğrular", "Kısa bir quiz, sonraki üretimden önce adımın anlaşıldığını kontrol eder."]],
      out: "Parçayı değil adımı düzelterek kalitesizlik maliyetini azaltır.",
      note: "Yalnızca örnektir: ayda 25 kez tekrarlanan, 40 € yeniden işleme maliyetli bir hata ayda 1.000 € eder. Müşteri verisi değildir." },
  ],
};
export default function Cases({ lang }: { lang: "en" | "tr" }) {
  const t = lang === "tr" ? tr : en;
  return (
    <section id="cases" aria-label={t.k} className="relative">
      <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pt-44">
        <p className="mono text-[11px] uppercase tracking-[.2em] text-flame">03 — {t.k}</p>
        <h2 className="display mt-4 max-w-[14ch] text-[clamp(3rem,7vw,7rem)]">{t.h}</h2>
        <p className="mt-6 max-w-xl text-xl leading-snug text-white/70">{t.p}</p>
      </div>
      {t.cases.map((c, i) => (
        <article key={c.id} id={c.id} className="relative flex min-h-svh items-end overflow-hidden">
          <div className="absolute inset-0">{c.bg.v ? <Video name={c.bg.v} /> : <img src={c.bg.img} alt="" loading="lazy" className="grade absolute inset-0 h-full w-full object-cover" />}</div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black to-transparent" /><div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
          <div className="relative mx-auto grid w-full max-w-[1400px] gap-10 px-6 pb-20 pt-40 md:grid-cols-12 md:px-10 md:pb-24">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: 1, ease }} className="md:col-span-6">
              <p className="mono text-[11px] uppercase tracking-[.2em] text-flame">0{i + 1} / {c.k}</p>
              <h3 className="display mt-5 text-[clamp(2.4rem,5vw,5rem)] leading-[.95]">{c.h}</h3>
              <p className="mt-6 max-w-lg text-lg leading-snug text-white/80">{c.pov}</p>
              <p className="mt-6 max-w-lg text-[17px] font-semibold tracking-tight text-white">{c.out}</p>
              {c.ba && <div className="mt-8 grid max-w-lg grid-cols-2 border-y border-white/20 text-[14px] leading-snug">
                <div className="py-4 pr-4 text-white/55"><p className="mono mb-2 text-[10px] uppercase tracking-[.2em] text-white/40">{lang === "tr" ? "Önce" : "Before"}</p><span className="block first-letter:uppercase">{c.ba[0].replace(/^(Before|Önce): /, "")}</span></div>
                <div className="border-l border-white/20 py-4 pl-4 text-white"><p className="mono mb-2 text-[10px] uppercase tracking-[.2em] text-flame">{lang === "tr" ? "Sonra" : "After"}</p><span className="block first-letter:uppercase">{c.ba[1].replace(/^(After|Sonra): /, "")}</span></div></div>}
            </motion.div>
            <motion.ol initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: 1, delay: .15, ease }} className="self-end md:col-span-5 md:col-start-8">
              {c.ui && <li className="mb-8 hidden list-none md:block"><div className="ml-auto w-[210px]"><Device label={c.ui === "sop" ? "Flexlore step-by-step SOP screen" : "Flexlore quiz screen"}>{c.ui === "sop" ? <SopScreen active /> : <QuizScreen active q="Which step comes first at this station?" a={["Start the machine", "Check the safety guard", "Load the part"]} ok={1} />}</Device></div></li>}
              {c.steps.map(([h, p], k) => (
                <li key={h} className="grid grid-cols-[3rem_1fr] border-t border-white/20 py-5 last:border-b">
                  <span className="mono pt-1 text-[12px] text-flame">{String(k + 1).padStart(2, "0")}</span>
                  <span><span className="block text-xl font-semibold tracking-tight">{h}</span><span className="mt-1 block text-[15px] leading-snug text-white/65">{p}</span></span>
                </li>))}
              {c.note && <li className="mono mt-5 list-none text-[10.5px] uppercase leading-relaxed tracking-[.14em] text-white/45">{c.note}</li>}
            </motion.ol>
          </div>
        </article>))}
    </section>);
}
