// Home page copy for the redesigned sections, EN and TR in parity. Facts only from the existing site and the brief.
// Anything we could not verify is left out of the copy and marked TODO(ata) in a comment.
import type { Lang } from "../copy";

export type HomeCopy = {
  trust: { live: string; ios: string; android: string; ph: string; programs: string };
  problem: { k: string; h: [string, string]; p: string; points: { h: string; p: string }[] };
  story: { k: string; h: string; lead: string; hint: string; chips: [string, string][]; sample: string };
  web: { k: string; h: string; lead: string; callouts: { h: string; p: string }[]; sample: string };
  bento: { k: string; h: string; lead: string; tiles: Record<"ai" | "ready" | "quiz" | "access" | "devices" | "sites", { h: string; p: string }> };
  ind: { k: string; h: string; lead: string; open: string; more: string; picker: string; pickerLead: string; see: string; areas: [string, string | null][] };
  caps: { k: string; h: string; lead: string; cards: { h: string; p: string }[]; sample: string };
  pricing: { k: string; h: string; lead: string; all: string; demo: string };
  faq: { k: string; h: string; items: { q: string; a: string }[] };
  end: { h: [string, string]; p: string; cta: string };
  footer: { tag: string; app: string; product: string; industries: string; company: string; follow: string; how: string; web: string; scenario: string; pricing: string; blog: string; support: string };
};

export const home: Record<Lang, HomeCopy> = {
  en: {
    trust: { live: "Available now", ios: "iPhone app on the App Store", android: "Android app on Google Play", ph: "Launched on Product Hunt", programs: "Member of" },
    problem: {
      k: "Why it matters", h: ["Know-how lives", "in someone's hands."],
      p: "It leaves when they do. New people copy whoever is on shift.",
      points: [
        { h: "Scrap and rework", p: "Guesswork comes back as remakes and returns." },
        { h: "Uneven across shifts", p: "Every shift learns it from someone else." },
        { h: "Binders nobody reads", p: "Written down. Never opened on the floor." },
      ],
    },
    story: { k: "How it works", h: "Film it. Approve it. Know who's ready.", lead: "One job, from a phone video to a readiness score.", hint: "Swipe to see each step",
      chips: [["Recording", "Line cook 1 · 00:58"], ["AI split it", "6 steps, instructions drafted"], ["Quiz drafted", "5 questions from the steps"], ["Morning shift", "12 of 14 ready"]], sample: "Sample data" },
    web: {
      k: "Flexlore Web", h: "Record on the phone. Manage from the desk.",
      lead: "The same library and readiness data on a big screen, for the people running the operation.",
      callouts: [
        { h: "One library", p: "Every job your team has filmed, with steps, status and who it is assigned to." },
        { h: "Readiness at a glance", p: "Who has watched and passed each job, person by person." },
        { h: "The question most people miss", p: "See which step needs a better video before it becomes a mistake on the floor." },
      ],
      sample: "Sample data, for illustration",
    },
    bento: {
      k: "What you get", h: "Built for the floor, run from the office.", lead: "Everything a frontline team needs to learn a job the same way, every shift.",
      tiles: {
        ai: { h: "AI drafts, you approve", p: "Flexlore drafts the steps, the written instructions and the quiz. Nothing goes out until your team approves it." },
        ready: { h: "Readiness by shift and location", p: "See who is ready for which job, by person, team, shift and site." },
        quiz: { h: "Quizzes from the job itself", p: "Short checks drafted from the steps, so you know who understood, not just who pressed play." },
        access: { h: "Role- and location-based access", p: "People see only what their role and site need. Managers decide who sees what." },
        devices: { h: "iOS, Android and web", p: "Record and learn on the phone. Assign and track in the browser." },
        sites: { h: "One standard, many sites", p: "Send the same job to every branch on the same day and compare readiness side by side." },
      },
    },
    ind: {
      k: "Industries", h: "Wherever the job is learned by doing.", lead: "Kitchens, production lines, hotels and every place where a new person learns from the one next to them.",
      open: "See how it works", more: "Where teams use Flexlore", picker: "See Flexlore in your business", pickerLead: "Pick your industry to see one real job, start to finish.", see: "Open the full scenario",
      areas: [["Restaurants", "restoran"], ["Coffee shops and bakeries", "firin"], ["Manufacturing", "uretim"], ["Hotels", "otel"], ["Franchises", "franchise"], ["Warehouses", "depo"], ["Healthcare and clinics", null], ["Education", null], ["Training providers", null], ["Wellness and sport", null], ["Entertainment", null], ["And more", null]],
    },
    caps: {
      k: "What you get", h: "Built for the floor, run from the office.", lead: "Three things every frontline team gets on day one.",
      cards: [
        { h: "AI drafts, you approve", p: "Steps, instructions and the quiz are drafted for you. Nothing goes out until your team approves it." },
        { h: "Readiness by shift and site", p: "See who is ready for which job, by person, team, shift and location." },
        { h: "The right job for each role", p: "People see only what their role and site need. Managers decide who sees what." },
      ],
      sample: "Sample data",
    },
    pricing: { k: "Pricing", h: "Priced by the size of your team.", lead: "Start free with up to 3 users. Enterprise starts at 30+ users.", all: "See all plans", demo: "Book a demo" },
    faq: {
      k: "Questions", h: "Asked, answered.",
      items: [
        { q: "How does Flexlore use AI?", a: "It splits a recorded video into steps, drafts written instructions and creates a short quiz from the content. Every draft is reviewed and approved by your team before it goes out." },
        { q: "Who is Flexlore for?", a: "Teams where the job is learned by doing: restaurants and café chains, production lines, hotels, franchises, warehouses and bakeries." },
        { q: "Do I need technical skills?", a: "No. If you can film with a phone, you can create a step-by-step video SOP." },
        // TODO(ata): add a setup time here only if we have a real number.
        { q: "What does it take to get started?", a: "A phone and one real job. Film it, check what the AI drafted, then assign it. On the demo call we build one of your jobs with you." },
        // TODO(ata): confirm offline behaviour before mentioning it.
        { q: "Which devices does it run on?", a: "iOS and Android for your team, plus a web platform for managers." },
        { q: "Who can see our content?", a: "You decide. Access is set by role and location, so people see only the jobs meant for them. Our Privacy, Security and Sub-processors pages cover how data is handled." },
        // TODO(ata): list app languages once confirmed.
        { q: "Which languages are supported?", a: "Multilingual content is coming soon. Tell us which languages your team speaks and we will keep you posted." },
        { q: "How is it priced?", a: "Plans are priced by number of users: Free covers 3, Pro 10 and ProPlus 30. Enterprise starts at 30+ users." },
      ],
    },
    end: { h: ["See it on", "your floor."], p: "Twenty minutes. One of your real jobs.", cta: "Book a demo" },
    footer: { tag: "Every job, step by step. Through the eyes of the person who does it.", app: "Get the app", product: "Product", industries: "Industries", company: "Company", follow: "Follow", how: "How it works", web: "Flexlore Web", scenario: "Your business", pricing: "Pricing", blog: "Blog", support: "Support" },
  },
  tr: {
    trust: { live: "Şimdi indirin", ios: "App Store'da iPhone uygulaması", android: "Google Play'de Android uygulaması", ph: "Product Hunt'ta yayınlandı", programs: "Üyesi olduğumuz programlar" },
    problem: {
      k: "Neden önemli", h: ["Bilgi birinin", "ellerinde yaşar."],
      p: "O kişi gidince bilgi de gider. Yeni gelen, vardiyada kim varsa onu taklit eder.",
      points: [
        { h: "Fire ve yeniden işleme", p: "Tahmin, yeniden yapım ve iade olarak geri döner." },
        { h: "Vardiyadan vardiyaya fark", p: "Her vardiya işi başka birinden öğrenir." },
        { h: "Kimsenin açmadığı klasörler", p: "Yazılı ama sahada hiç açılmıyor." },
      ],
    },
    story: { k: "Nasıl çalışır", h: "Çek. Onayla. Kimin hazır olduğunu gör.", lead: "Tek bir iş: telefon videosundan hazırlık skoruna.", hint: "Adımları görmek için kaydırın",
      chips: [["Kayıt", "Hat aşçısı 1 · 00:58"], ["Yapay zekâ böldü", "6 adım, talimatlar hazır"], ["Quiz hazır", "Adımlardan 5 soru"], ["Sabah vardiyası", "14 kişiden 12'si hazır"]], sample: "Örnek veri" },
    web: {
      k: "Flexlore Web", h: "Telefonda kaydedin. Masadan yönetin.",
      lead: "Aynı kütüphane ve hazırlık verisi, operasyonu yöneten ekip için büyük ekranda.",
      callouts: [
        { h: "Tek kütüphane", p: "Ekibinizin çektiği her iş; adımları, durumu ve kime atandığıyla." },
        { h: "Hazırlık tek bakışta", p: "Her işi kimin izlediği ve geçtiği, kişi kişi." },
        { h: "En çok kaçırılan soru", p: "Sahada hataya dönüşmeden önce hangi adımın daha iyi bir videoya ihtiyacı olduğunu görün." },
      ],
      sample: "Örnek veriler, gösterim amaçlı",
    },
    bento: {
      k: "Neler var", h: "Sahada kullanılır, ofisten yönetilir.", lead: "Saha ekibinin bir işi her vardiyada aynı şekilde öğrenmesi için gereken her şey.",
      tiles: {
        ai: { h: "Yapay zekâ hazırlar, siz onaylarsınız", p: "Adımları, yazılı talimatları ve quizi Flexlore hazırlar. Ekibiniz onaylamadan hiçbir şey yayınlanmaz." },
        ready: { h: "Vardiya ve şube bazında hazırlık", p: "Kimin hangi işe hazır olduğunu kişi, ekip, vardiya ve şube bazında görün." },
        quiz: { h: "İşin kendisinden quiz", p: "Adımlardan hazırlanan kısa kontroller; kimin izlediğini değil, kimin anladığını görürsünüz." },
        access: { h: "Rol ve şubeye göre erişim", p: "Herkes yalnızca kendi rolü ve şubesi için gerekeni görür. Kimin neyi göreceğini yöneticiler belirler." },
        devices: { h: "iOS, Android ve web", p: "Telefonda kaydedin ve öğrenin. Tarayıcıda atayın ve takip edin." },
        sites: { h: "Tek standart, çok şube", p: "Aynı işi aynı gün her şubeye gönderin, hazırlığı yan yana karşılaştırın." },
      },
    },
    ind: {
      k: "Sektörler", h: "İşin yaparak öğrenildiği her yerde.", lead: "Mutfaklar, üretim hatları, oteller ve yeni gelenin yanındakinden öğrendiği her yer.",
      open: "Nasıl çalıştığını görün", more: "Flexlore'un kullanıldığı alanlar", picker: "Flexlore'u kendi işinizde görün", pickerLead: "Sektörünüzü seçin, gerçek bir işi baştan sona görün.", see: "Senaryonun tamamını açın",
      areas: [["Restoranlar", "restoran"], ["Kafe ve fırınlar", "firin"], ["Üretim", "uretim"], ["Oteller", "otel"], ["Franchise", "franchise"], ["Depolar", "depo"], ["Sağlık ve klinikler", null], ["Eğitim", null], ["Eğitim sağlayıcılar", null], ["Wellness ve spor", null], ["Eğlence", null], ["Ve dahası", null]],
    },
    caps: {
      k: "Neler var", h: "Sahada kullanılır, ofisten yönetilir.", lead: "Her saha ekibinin ilk günden aldığı üç şey.",
      cards: [
        { h: "Yapay zekâ hazırlar, siz onaylarsınız", p: "Adımlar, talimatlar ve quiz sizin için hazırlanır. Ekibiniz onaylamadan hiçbir şey yayınlanmaz." },
        { h: "Vardiya ve şube bazında hazırlık", p: "Kimin hangi işe hazır olduğunu kişi, ekip, vardiya ve şube bazında görün." },
        { h: "Her role doğru iş", p: "Herkes yalnızca kendi rolü ve şubesi için gerekeni görür. Kimin neyi göreceğini yöneticiler belirler." },
      ],
      sample: "Örnek veri",
    },
    pricing: { k: "Fiyatlandırma", h: "Ekibinizin büyüklüğüne göre fiyat.", lead: "3 kullanıcıya kadar ücretsiz başlayın. Enterprise 30+ kullanıcıdan başlar.", all: "Tüm planları görün", demo: "Demo isteyin" },
    faq: {
      k: "Sorular", h: "Soruldu, yanıtlandı.",
      items: [
        { q: "Flexlore yapay zekâyı nasıl kullanır?", a: "Kaydedilen videoyu adımlara böler, yazılı talimatları ve içerikten kısa bir quiz taslağı hazırlar. Her taslak, gönderilmeden önce ekibiniz tarafından incelenip onaylanır." },
        { q: "Flexlore kimler için?", a: "İşin yaparak öğrenildiği ekipler için: restoran ve kafe zincirleri, üretim hatları, oteller, franchise'lar, depolar ve fırınlar." },
        { q: "Teknik bilgi gerekir mi?", a: "Hayır. Telefonla video çekebiliyorsanız adım adım bir video SOP oluşturabilirsiniz." },
        { q: "Başlamak için ne gerekir?", a: "Bir telefon ve gerçek bir iş. Çekin, yapay zekânın hazırladığı taslağı kontrol edin, sonra atayın. Demo görüşmesinde işlerinizden birini sizinle birlikte hazırlarız." },
        { q: "Hangi cihazlarda çalışır?", a: "Ekibiniz için iOS ve Android, yöneticiler için web platformu." },
        { q: "İçeriğimizi kimler görebilir?", a: "Siz karar verirsiniz. Erişim rol ve şubeye göre belirlenir; herkes yalnızca kendisi için olan işleri görür. Verinin nasıl işlendiği Gizlilik, Güvenlik ve Alt İşleyenler sayfalarımızda yer alır." },
        { q: "Hangi diller destekleniyor?", a: "Çok dilli içerik yakında geliyor. Ekibinizin hangi dilleri konuştuğunu bize söyleyin, sizi haberdar edelim." },
        { q: "Fiyatlandırma nasıl?", a: "Planlar kullanıcı sayısına göre fiyatlanır: Free 3, Pro 10, ProPlus 30 kullanıcıyı kapsar. Enterprise 30+ kullanıcıdan başlar." },
      ],
    },
    end: { h: ["Kendi sahanızda", "görün."], p: "Yirmi dakika. Gerçek işlerinizden biri.", cta: "Demo isteyin" },
    footer: { tag: "Her iş, adım adım. İşi yapan kişinin gözünden.", app: "Uygulamayı indirin", product: "Ürün", industries: "Sektörler", company: "Şirket", follow: "Takip edin", how: "Nasıl çalışır", web: "Flexlore Web", scenario: "Sizin işiniz", pricing: "Fiyatlar", blog: "Blog", support: "Destek" },
  },
};

/** Sector cards on the home page. Featured three get a video loop; the rest are compact. */
export const IND_CARDS: { slug: string; v?: string; still: string; en: string; tr: string; lineEn: string; lineTr: string; featured: boolean }[] = [
  { slug: "restoran", v: "kitchen", still: "/video/kitchen.webp", en: "Restaurants", tr: "Restoranlar", lineEn: "Same plate, every shift.", lineTr: "Her vardiyada aynı tabak.", featured: true },
  { slug: "uretim", v: "line", still: "/video/line.webp", en: "Manufacturing", tr: "Üretim", lineEn: "Changeover, without the guesswork.", lineTr: "Tahmin yürütmeden kalıp değişimi.", featured: true },
  { slug: "otel", v: "hotel", still: "/video/hotel.webp", en: "Hotels", tr: "Oteller", lineEn: "Every room to your house standard.", lineTr: "Her oda sizin standardınızda.", featured: true },
  { slug: "franchise", still: "/video/plating.webp", en: "Franchises", tr: "Franchise", lineEn: "One launch, every branch.", lineTr: "Tek lansman, her şube.", featured: false },
  { slug: "depo", still: "/video/warehouse.webp", en: "Warehouses", tr: "Depolar", lineEn: "Picking and safety, learned the same way.", lineTr: "Toplama ve güvenlik, herkes aynı şekilde.", featured: false },
  { slug: "firin", still: "/video/coffee.webp", en: "Bakeries & cafés", tr: "Fırın ve kafeler", lineEn: "The recipe, not a guess.", lineTr: "Tahmin değil, tarif.", featured: false },
];
