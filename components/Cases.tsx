"use client";
import { motion } from "framer-motion";
import { Arr } from "@/components/Icons";
import { Video } from "./Site";
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
    { id: "case-master-apprentice", k: "Master \u2192 apprentice", h: "\u201cWatch how I do it. Then do it again.\u201d", bg: { img: "/photos/factory.webp" },
      pov: "The master operator records the job once, at the workstation, the way it has always been done right. The apprentice can replay any step as often as they need.",
      steps: [["Master records once", "One phone video of the real job. No studio, no script."], ["AI splits it into steps", "Flexlore cuts the video into steps and drafts the instructions. The master approves."], ["Apprentice replays", "Step by step, at their own pace, until it sticks."]],
      out: "Knowledge transfer that doesn\u2019t need the same shift.", ui: "sop" },
    { id: "case-installation", k: "Installation at a customer site", h: "\u201cThe installers left. The know-how stayed.\u201d", bg: { img: "/video/warehouse.jpg" },
      pov: "Your team installs equipment at a customer site and runs the orientation. The installer films start-up, cleaning and daily checks on that exact machine, so every step stays after the team leaves.",
      steps: [["Filmed on the installed unit", "The installer records the job on the machine the customer will run."], ["One step at a time", "Start-up, changeover, cleaning, the checks: each one its own step."], ["Stays after install", "New shifts and new hires see the same orientation months later."]],
      out: "Orientation that lasts.", ba: ["Before: orientation lives in the installers\u2019 heads and leaves with them. Questions become support calls.", "After: every step is on video, filmed on that machine, for every new shift."] },
    { id: "case-quality", k: "Quality defect \u2192 retraining", h: "\u201cThat\u2019s the step that went wrong.\u201d", bg: { img: "/photos/factory.jpg" },
      pov: "A defect is traced back to one step. Instead of retraining the whole process, the operator gets exactly that step again.",
      steps: [["Faulty step identified", "Pinpoint which step in the work instruction caused the defect."], ["Step video assigned", "The operator re-watches that one step, filmed the right way."], ["Quiz confirms it", "A short quiz checks the step is understood before the next run."]],
      out: "Lower cost of poor quality: fix the step, not just the part.",
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
      pov: "Ekibiniz müşteri sahasında ekipmanı kurar ve oryantasyonu verir. Kurulum ekibi o makinede devreye almayı, temizliği ve günlük kontrolleri çeker; ekip gidince her adım kalır.",
      steps: [["Kurulan makinede çekilir", "Kurulum ekibi işi müşterinin kullanacağı makinede kaydeder."], ["Adım adım", "Devreye alma, ürün değişimi, temizlik, kontroller: her biri ayrı adım."], ["Kurulumdan sonra da kalır", "Yeni vardiyalar ve yeni çalışanlar aylar sonra aynı oryantasyonu görür."]],
      out: "Oryantasyon tek günlük bir etkinlik değil, kalıcı hale gelir.", ba: ["Önce: oryantasyon kurulum ekibinin kafasındadır ve onlarla gider. Sorular destek çağrısına dönüşür.", "Sonra: her adım o makinede çekilmiş videoda, her yeni vardiya için."] },
    { ...en.cases[3], k: "Kalite hatası \u2192 yeniden eğitim", h: "\u201cHatalı adım buydu.\u201d",
      pov: "Bir hata tek bir adıma kadar izlenir. Tüm süreci yeniden öğretmek yerine operatöre tam o adım yeniden atanır.",
      steps: [["Hatalı adım bulunur", "İş talimatındaki hangi adımın hataya yol açtığı belirlenir."], ["Adım videosu atanır", "Operatör o adımı doğru yapılışıyla yeniden izler."], ["Quiz doğrular", "Kısa bir quiz, sonraki üretimden önce adımın anlaşıldığını kontrol eder."]],
      out: "Parçayı değil adımı düzelterek kalitesizlik maliyetini azaltır.",
      note: "Yalnızca örnektir: ayda 25 kez tekrarlanan, 40 € yeniden işleme maliyetli bir hata ayda 1.000 € eder. Müşteri verisi değildir." },
  ],
};
const LINK: Record<string, string> = { "case-master-apprentice": "/use-cases/master-apprentice-skills-transfer/", "case-installation": "/use-cases/installation-training-on-site-orientation/" };
export default function Cases({ lang }: { lang: "en" | "tr" }) {
  const t = lang === "tr" ? tr : en;
  return (
    <section id="cases" aria-label={t.k} className="px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7"><p className="mono text-xs uppercase tracking-[.2em] text-flame">{t.k}</p>
            <h2 className="display mt-3 text-h2">{t.h}</h2></div>
          <p className="max-w-md text-base leading-[1.3] text-white/65 md:col-span-5">{t.p}</p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.cases.map((c, i) => (
            <motion.article key={c.id} id={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7, delay: i * .06, ease }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-bg2">
              <div className="relative aspect-[16/10] overflow-hidden">
                {c.bg.img ? <img src={c.bg.img} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.03]" /> : <Video name={c.bg.v!} className="opacity-80" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="mono absolute bottom-3 left-4 text-xs uppercase tracking-[.18em] text-white/85">0{i + 1} / {c.k}</p>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-semibold leading-[1.15] tracking-tight">{c.h}</h3>
                <p className="mt-2 text-sm leading-[1.35] text-white/70">{c.steps.map((x) => x[0]).join(" → ")}</p>
                <p className="mt-3 text-sm font-semibold text-white">{c.out}</p>
                {c.note && <p className="mt-2 text-xs leading-[1.35] text-white/70">{c.note}</p>}
                {LINK[c.id] && <a href={LINK[c.id]} className="mt-auto pt-4 text-sm text-flame hover:underline">{lang === "tr" ? (c.id === "case-installation" ? "Kurulum eğitimi senaryosu" : "Usta-çırak senaryosu") : (c.id === "case-installation" ? "Installation training use case" : "Master to apprentice use case")} <Arr className="ml-1" /></a>}
              </div>
            </motion.article>))}
        </div>
      </div>
    </section>);
}
