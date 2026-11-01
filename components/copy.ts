export type Lang = "en" | "tr";
export type C = {
  skip: string; cta: string; langLabel: string;
  hero: string; heroSub: string;
  st: string[]; stK: string; whereK: string; stSub: string;
  pK: string; pH: string[]; pP: string;
  steps: { h: string; p: string }[];
  lK: string; lH: string; lP: string; langs: string[]; sub: string;
  rK: string; rH: string; rP: string;
  where: string; sectors: { h: string; v: string }[];
  endH: string; endP: string; endCta: string; foot: string; credits: string;
};
export const copy: Record<Lang, C> = {
  en: {
    skip: "Skip to content", cta: "Book a demo", langLabel: "Language",
    hero: "Teach it once.",
    heroSub: "Your best people, on film. Your whole floor, trained.",
    stK: "The problem", whereK: "Where it works", st: ["Nobody reads", "the binder."], stSub: "The real procedure lives in someone's hands. Flexlore puts it on every phone.",
    pK: "How it works", pH: ["Film it.", "Approve it.", "Assign it."],
    pP: "Record the task on a phone. Flexlore splits it into steps, writes the instructions and drafts a quiz. You check it and send it out.",
    steps: [
      { h: "Film it.", p: "Your most experienced person records the job as it is done. No studio. No script." },
      { h: "Approve it.", p: "Steps, written instructions and a short quiz are drafted from the video. You stay the editor." },
      { h: "Assign it.", p: "Send it to a team, a shift or a site. Understanding is checked, not just viewing." },
    ],
    lK: "Languages", lH: "Every language. Same standard.",
    lP: "Recordings are transcribed, translated step by step and subtitled. Your glossary keeps your own terms intact.",
    langs: ["English", "Türkçe", "Deutsch", "العربية", "Español", "Русский", "Français", "Polski"],
    sub: "Hold the dough with both hands. Stretch from the centre.",
    rK: "Readiness", rH: "Ready, every shift.",
    rP: "See who has learned what, by team, shift and site. Fix the gap before it reaches the floor.",
    where: "Built for the floor.",
    sectors: [
      { h: "Kitchens", v: "kitchen" }, { h: "Production", v: "line" }, { h: "Hotels", v: "hotel" }, { h: "Warehouses", v: "warehouse" },
    ],
    endH: "See it on your floor.", endP: "Twenty minutes. One of your real procedures.", endCta: "Book a demo",
    foot: "Flexlore. Video SOPs for frontline teams.", credits: "Footage: Mixkit. Demo build.",
  },
  tr: {
    skip: "İçeriğe geç", cta: "Demo isteyin", langLabel: "Dil",
    hero: "Bir kez öğret.",
    heroSub: "En iyi çalışanlarınız kamerada. Tüm ekibiniz eğitimde.",
    stK: "Sorun", whereK: "Nerede çalışır", st: ["Klasörü", "kimse okumaz."], stSub: "Gerçek prosedür birinin ellerinde yaşar. Flexlore onu her telefona taşır.",
    pK: "Nasıl çalışır", pH: ["Çek.", "Onayla.", "Ata."],
    pP: "Görevi telefonla kaydedin. Flexlore adımlara böler, talimatları yazar ve bir quiz hazırlar. Siz kontrol edip gönderirsiniz.",
    steps: [
      { h: "Çek.", p: "En deneyimli kişiniz işi yapıldığı gibi kaydeder. Stüdyo yok. Senaryo yok." },
      { h: "Onayla.", p: "Adımlar, yazılı talimatlar ve kısa bir quiz videodan hazırlanır. Son söz sizde." },
      { h: "Ata.", p: "Bir ekibe, vardiyaya ya da şubeye gönderin. İzlenmesi değil, anlaşılması ölçülür." },
    ],
    lK: "Diller", lH: "Her dilde. Aynı standart.",
    lP: "Kayıtlar yazıya dökülür, adım adım çevrilir ve altyazılanır. Sözlüğünüz kendi terimlerinizi korur.",
    langs: ["English", "Türkçe", "Deutsch", "العربية", "Español", "Русский", "Français", "Polski"],
    sub: "Hamuru iki elinizle tutun. Ortadan dışa doğru açın.",
    rK: "Hazırlık", rH: "Her vardiya hazır.",
    rP: "Kim neyi öğrendi, ekip, vardiya ve şube bazında görün. Açığı sahaya ulaşmadan kapatın.",
    where: "Saha için yapıldı.",
    sectors: [
      { h: "Mutfaklar", v: "kitchen" }, { h: "Üretim", v: "line" }, { h: "Oteller", v: "hotel" }, { h: "Depolar", v: "warehouse" },
    ],
    endH: "Kendi sahanızda görün.", endP: "Yirmi dakika. Gerçek prosedürlerinizden biri.", endCta: "Demo isteyin",
    foot: "Flexlore. Saha ekipleri için video SOP.", credits: "Görüntüler: Mixkit. Demo sürümü.",
  },
};
