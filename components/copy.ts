export type Lang = "en" | "tr";
type C = {
  nav: string[]; app: string; talk: string; skip: string; langLabel: string;
  heroA: string; heroB: string; heroSub: string; heroCap: string;
  st1: string; st2: string;
  howK: string; steps: { n: string; h: string; p: string }[];
  readyK: string; readyH: string; readyP: string; cols: string[]; rows: { t: string; s: string; v: number; note: string }[]; illus: string;
  langK: string; langH: string; langP: string; subs: { l: string; t: string }[]; langList: string[];
  secK: string; secH: string; sectors: { h: string; p: string }[];
  intK: string; intH: string; ints: { h: string; p: string }[];
  endH: string; endP: string; foot: string; credits: string;
};
export const copy: Record<Lang, C> = {
  en: {
    nav: ["Method", "Readiness", "Languages", "Sectors"], app: "Download for iPhone", talk: "Talk to us", skip: "Skip to content", langLabel: "Language",
    heroA: "Video SOPs that show", heroB: "which team is actually ready.",
    heroSub: "Flexlore turns the way your best people do the job into short videos, checks understanding with a quiz, and shows you who is ready, per team, shift and site.",
    heroCap: "The kitchen line at the start of service. Most of what matters here is never written down.",
    st1: "Every shift, someone is learning the job", st2: "from someone who is too busy to teach it.",
    howK: "The method",
    steps: [
      { n: "01", h: "Film it once.", p: "Your most experienced person records the task on a phone, exactly as it is done on the floor. No studio, no script." },
      { n: "02", h: "Flexlore writes the steps.", p: "The recording is split into steps with written instructions, and a short quiz is drafted from what the video shows. You review and approve." },
      { n: "03", h: "Assign, then see who's ready.", p: "Send it to a team, a shift or a location. Understanding is checked, not just viewing, so you know before the shift starts." },
    ],
    readyK: "Readiness", readyH: "Completion is not the same as knowing.",
    readyP: "One quiet view of who has learned what. Gaps surface by site and by step, so you can re-assign before it becomes a mistake on the floor.",
    cols: ["Team", "Ready", "Needs attention"],
    rows: [
      { t: "Kitchen", s: "Opening shift", v: 92, note: "—" },
      { t: "Assembly line 2", s: "Morning", v: 78, note: "Step 4 · torque check" },
      { t: "Front desk", s: "Night", v: 64, note: "Late check-in procedure" },
      { t: "Warehouse", s: "Picking", v: 51, note: "Two new starters" },
    ],
    illus: "Illustrative figures.",
    langK: "Languages · V2.0", langH: "One procedure, in every language spoken on your floor.",
    langP: "Recordings are transcribed, translated step by step and subtitled. A shared glossary and an approval flow keep your own terms intact, and readiness is tracked per language.",
    subs: [
      { l: "EN", t: "Hold the dough with both hands and stretch it from the centre." },
      { l: "TR", t: "Hamuru iki elinizle tutun ve ortadan dışa doğru açın." },
      { l: "DE", t: "Halten Sie den Teig mit beiden Händen und ziehen Sie ihn von der Mitte aus." },
      { l: "ES", t: "Sostenga la masa con ambas manos y estírela desde el centro." },
    ],
    langList: ["Transcription into steps", "Glossary and approval", "Subtitles", "Readiness per language"],
    secK: "Where it's used", secH: "Built for work that happens with your hands.",
    sectors: [
      { h: "Restaurants", p: "Prep, plating, allergens, opening and closing." },
      { h: "Manufacturing", p: "Changeovers, quality checks, line safety." },
      { h: "Hotels", p: "Room turnover, front desk, guest requests." },
      { h: "Franchises", p: "One standard, carried to every location." },
    ],
    intK: "For your systems", intH: "Your training data belongs in your own tools.",
    ints: [
      { h: "API", p: "Readiness and training records, available to your internal systems." },
      { h: "Reporting", p: "Exports shaped for the BI tools you already use." },
      { h: "QR on the floor", p: "A code at the station opens the right procedure." },
      { h: "Your brand", p: "The experience adapted to your organisation." },
    ],
    endH: "See which team is actually ready.", endP: "Start with a single procedure. Expand when it proves itself.",
    foot: "Demo build for internal review.", credits: "Photo credits",
  },
  tr: {
    nav: ["Yöntem", "Hazırlık durumu", "Diller", "Sektörler"], app: "iPhone için indirin", talk: "Bize yazın", skip: "İçeriğe geç", langLabel: "Dil",
    heroA: "Hangi ekibin gerçekten hazır", heroB: "olduğunu gösteren video SOP'lar.",
    heroSub: "Flexlore, en deneyimli çalışanlarınızın işi nasıl yaptığını kısa videolara dönüştürür, anlaşıldığını bir quizle ölçer ve kimin hazır olduğunu ekip, vardiya ve şube bazında gösterir.",
    heroCap: "Servis başında mutfak hattı. Buradaki önemli bilgilerin çoğu hiçbir yere yazılmaz.",
    st1: "Her vardiyada biri işi,", st2: "öğretmeye vakti olmayan birinden öğreniyor.",
    howK: "Yöntem",
    steps: [
      { n: "01", h: "Bir kez çekin.", p: "En deneyimli kişiniz işi telefonla, sahada nasıl yapılıyorsa öyle kaydeder. Stüdyo yok, senaryo yok." },
      { n: "02", h: "Adımları Flexlore yazar.", p: "Kayıt adımlara bölünür, her adıma yazılı talimat eklenir ve videoda gösterilenden kısa bir quiz hazırlanır. Siz kontrol edip onaylarsınız." },
      { n: "03", h: "Atayın, kimin hazır olduğunu görün.", p: "Bir ekibe, vardiyaya ya da şubeye gönderin. İzlenmesi değil anlaşılması ölçülür; vardiya başlamadan bilirsiniz." },
    ],
    readyK: "Hazırlık durumu", readyH: "Tamamlamak, bilmek demek değil.",
    readyP: "Kimin neyi öğrendiğini sade bir görünümde izleyin. Eksikler şube ve adım bazında ortaya çıkar; sahada hataya dönüşmeden yeniden atayabilirsiniz.",
    cols: ["Ekip", "Hazır", "Dikkat gereken"],
    rows: [
      { t: "Mutfak", s: "Açılış vardiyası", v: 92, note: "—" },
      { t: "Montaj hattı 2", s: "Sabah", v: 78, note: "4. adım · tork kontrolü" },
      { t: "Resepsiyon", s: "Gece", v: 64, note: "Geç giriş prosedürü" },
      { t: "Depo", s: "Toplama", v: 51, note: "İki yeni çalışan" },
    ],
    illus: "Örnek değerlerdir.",
    langK: "Diller · V2.0", langH: "Tek prosedür, sahada konuşulan her dilde.",
    langP: "Kayıtlar yazıya dökülür, adım adım çevrilir ve altyazılanır. Ortak sözlük ve onay akışı kendi terimlerinizi korur; hazırlık durumu dil bazında izlenir.",
    subs: [
      { l: "EN", t: "Hold the dough with both hands and stretch it from the centre." },
      { l: "TR", t: "Hamuru iki elinizle tutun ve ortadan dışa doğru açın." },
      { l: "DE", t: "Halten Sie den Teig mit beiden Händen und ziehen Sie ihn von der Mitte aus." },
      { l: "ES", t: "Sostenga la masa con ambas manos y estírela desde el centro." },
    ],
    langList: ["Adımlara bölünmüş transkripsiyon", "Sözlük ve onay akışı", "Altyazı", "Dil bazında hazırlık durumu"],
    secK: "Kullanım alanları", secH: "Elle yapılan işler için tasarlandı.",
    sectors: [
      { h: "Restoranlar", p: "Hazırlık, tabaklama, alerjenler, açılış ve kapanış." },
      { h: "Üretim", p: "Ürün değişimi, kalite kontrol, hat güvenliği." },
      { h: "Oteller", p: "Oda hazırlığı, resepsiyon, misafir talepleri." },
      { h: "Franchise", p: "Tek bir standart, her şubeye aynı şekilde." },
    ],
    intK: "Sistemleriniz için", intH: "Eğitim verileriniz kendi araçlarınızda durmalı.",
    ints: [
      { h: "API", p: "Hazırlık ve eğitim kayıtları iç sistemlerinizin erişiminde." },
      { h: "Raporlama", p: "Kullandığınız BI araçlarına uygun dışa aktarımlar." },
      { h: "Sahada QR", p: "İstasyondaki kod doğru prosedürü açar." },
      { h: "Sizin markanız", p: "Deneyim kurumunuza göre uyarlanır." },
    ],
    endH: "Hangi ekibin gerçekten hazır olduğunu görün.", endP: "Tek bir prosedürle başlayın. Kendini kanıtladığında genişletin.",
    foot: "İç inceleme için demo sürümü.", credits: "Fotoğraf kaynakları",
  },
};
