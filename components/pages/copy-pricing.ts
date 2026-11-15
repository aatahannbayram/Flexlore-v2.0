/* Pricing page content, plan packaging approved 2026-11-15 (English and Turkish). Prices themselves live in config.ts
 * (PLANS). Rules this copy follows: only live features are listed; "Coming soon" items appear only on the Enterprise
 * card; unlimited items carry a fair use note; no compliance words for safety content; no customer names or figures;
 * add-on prices are not shown (the sales team sets them). Other locales keep the previous plan lists until translated. */
export type Cell = boolean | string;
export type PricingCopy = {
  h1: string; sub: string; help: string; see: string;
  badge: string; saveAmt: string; includes: string; soonH: string; soon: string[]; fair: string;
  for: Record<string, string>; points: Record<string, string[]>;
  addonsH: string; addons: [string, string][]; addonsNote: string;
  addonsP: string; opts: Record<"enterprise" | "users" | "storage" | "setup", [string, string]>; formH: string; send: string; sent: string; sentMail: string; direct: string;
  teamsH: string; entP: string; entCta: string; entAlt: string; custom: string;
  compareH: string; feature: string; groups: { h: string; rows: [string, Cell, Cell, Cell, Cell][] }[];
  faqH: string; faq: [string, string][];
  endH: string; endP: string;
};

export const PRICING2: Partial<Record<string, PricingCopy>> = {
  en: {
    h1: "Pick your plan", sub: "Start with one job. Grow to every team, shift and location.", help: "Need help choosing a plan?", see: "See all features",
    badge: "Up to 50% off", saveAmt: "Save {amt} compared to monthly", includes: "Includes:", soonH: "Coming soon", fair: "Fair use applies to unlimited items.",
    soon: ["Steps from a PDF", "Company rules and introduction", "SSO", "AI assistant for managers"],
    for: {
      free: "For a small team trying Flexlore on its first jobs.",
      pro: "For a small business putting its jobs on video.",
      proplus: "For growing teams that train every day, in several languages.",
      enterprise: "For 30+ users across locations, set up with our team.",
    },
    points: {
      free: ["AI splits a video into steps and writes titles and descriptions", "AI setup wizard: describe your business, get a ready structure", "1 industry template pack", "Automatic subtitles, translated into 1 language", "AI quiz generator: 3 quizzes", "Voice typing and a cover image library", "2 workspaces, 5 jobs, 1 GB storage"],
      pro: ["All industry templates: restaurant, hotel, manufacturing, construction, onboarding, health and safety", "Assign content by position", "Subtitles translated into 3 languages", "AI quiz generator: 10 quizzes", "Unlimited jobs", "5 workspaces", "5 GB storage"],
      proplus: ["Unlimited subtitle languages", "Unlimited AI quizzes", "Unlimited workspaces", "10 GB storage", "Premium support"],
      enterprise: ["Automatic translation on upload", "Use your own AI key", "All templates plus a custom pack for your business", "Storage and user count set with our team"],
    },
    addonsP: "Pick what you need and tell us about your team. Our team prices it for you and replies by email.",
    opts: { enterprise: ["Enterprise quote", "30+ users, rolled out across your locations"], users: ["Extra users", "Add seats to your paid plan without changing plans"], storage: ["Extra storage", "Add space for more video to your paid plan"], setup: ["Setup service", "We prepare your first SOPs with you"] },
    formH: "Send your request", send: "Send request", sent: "Thank you. Your request has reached our team and we will reply by email.", sentMail: "Your email app opened with the request. Send it from there and we will reply.", direct: "Your request goes straight to our team.",
    addonsH: "Add-ons and Enterprise", addonsNote: "Available on the web. Our team sets the price for your needs.",
    addons: [["Extra users and extra storage", "Add seats or space to any paid plan without changing plans."], ["Setup service", "We prepare your first SOPs with you."]],
    teamsH: "For teams of 30 or more", entP: "Pricing by number of users, with support for rolling out across locations. Tell us about your teams and we will send a quote.",
    entCta: "Get a quote", entAlt: "Book a demo", custom: "Custom pricing",
    compareH: "Compare plans", feature: "Feature",
    groups: [
      { h: "Plan", rows: [["Users", "3", "10", "30", "30+"], ["Billing basis", "By number of users", "By number of users", "By number of users", "By number of users"]] },
      { h: "Create", rows: [["AI video to steps", true, true, true, true], ["AI setup wizard", true, true, true, true], ["Industry templates", "1 pack", "All", "All", "All + custom pack"], ["Cover image library", true, true, true, true], ["Voice typing", true, true, true, true], ["AI quiz generator", "3 quizzes", "10 quizzes", "Unlimited", "Unlimited"]] },
      { h: "Languages", rows: [["Automatic subtitles", true, true, true, true], ["Subtitle translation languages", "1", "3", "Unlimited", "Unlimited"], ["Automatic translation on upload", false, false, false, true]] },
      { h: "Manage", rows: [["Orientation Analysis", true, true, true, true], ["Assign content by position", false, true, true, true], ["Workspaces", "2", "5", "Unlimited", "Unlimited"], ["Folders", "Unlimited", "Unlimited", "Unlimited", "Unlimited"], ["Jobs", "5", "Unlimited", "Unlimited", "Unlimited"], ["Cloud storage", "1 GB", "5 GB", "10 GB", "Talk to sales"], ["Use your own AI key", false, false, false, true]] },
      { h: "Support", rows: [["Support", "Standard", "Standard", "Premium", "Premium"]] },
    ],
    faqH: "Pricing questions",
    faq: [
      ["How is Flexlore priced?", "By number of users. Free covers 3 users, Pro 10 and ProPlus 30. Enterprise starts at 30+ users with custom pricing. Monthly and yearly prices are listed on this page."],
      ["What does unlimited mean?", "Unlimited items are subject to fair use and are meant for your own team's normal use. If your usage is unusually high, our team will contact you to talk about the right plan."],
      ["Do AI features cost extra?", "The AI features listed for each plan are included in its price, within the limits shown, such as the number of quizzes and subtitle languages."],
      ["Can I add users or storage?", "Yes. Extra users and extra storage are available on the web. Our team sets the price for your needs, so contact us."],
      ["Can I change plans later?", "Yes. Tell us which plan you want to move to. How a change is billed is set out in our Subscription & Billing policy."],
      ["How do I cancel?", "You can cancel at any time. How cancellation works for monthly and yearly billing is set out in our Subscription & Billing policy."],
      ["Where is our data stored?", "Our Privacy Policy, Data Processing and Sub-processors pages list where data is processed and by whom. Still have questions? Ask us on the demo call."],
      ["Who checks what the AI writes?", "You do. Steps, instructions and quizzes stay drafts until your team approves them."],
    ],
    endH: "Not sure which plan fits?", endP: "We will build one of your real jobs with you on a demo call.",
  },
  tr: {
    h1: "Planınızı seçin", sub: "Tek bir işle başlayın. Her ekibe, vardiyaya ve lokasyona büyüyün.", help: "Plan seçmekte yardım mı lazım?", see: "Tüm özellikleri görün",
    badge: "%50'ye varan indirim", saveAmt: "Aylık ödemeye göre {amt} tasarruf", includes: "Şunları içerir:", soonH: "Yakında", fair: "Sınırsız kalemlerde adil kullanım geçerlidir.",
    soon: ["PDF'den adım", "Şirket kuralları ve tanıtımı", "SSO", "Yöneticiler için yapay zekâ asistanı"],
    for: {
      free: "İlk işlerinde Flexlore'u deneyen küçük ekipler için.",
      pro: "İşlerini videoya alan küçük işletmeler için.",
      proplus: "Her gün, birden fazla dilde eğitim veren büyüyen ekipler için.",
      enterprise: "Lokasyonlar arasında 30+ kullanıcı için, ekibimizle birlikte kurulur.",
    },
    points: {
      free: ["Yapay zekâ videoyu adımlara böler, başlık ve açıklama yazar", "Yapay zekâ kurulum sihirbazı: işinizi anlatın, hazır yapı önersin", "1 sektör şablon paketi", "Otomatik altyazı, 1 dile çeviri", "Yapay zekâ quiz oluşturucu: 3 quiz", "Sesle yazdırma ve kapak görseli kütüphanesi", "2 çalışma alanı, 5 iş, 1 GB depolama"],
      pro: ["Tüm sektör şablonları: restoran, otel, üretim, inşaat, oryantasyon, İSG", "Pozisyona göre içerik atama", "Altyazı 3 dile çeviri", "Yapay zekâ quiz oluşturucu: 10 quiz", "Sınırsız iş", "5 çalışma alanı", "5 GB depolama"],
      proplus: ["Sınırsız altyazı dili", "Sınırsız yapay zekâ quizi", "Sınırsız çalışma alanı", "10 GB depolama", "Premium destek"],
      enterprise: ["Yüklemede otomatik çeviri", "Kendi yapay zekâ anahtarınızı kullanın", "Tüm şablonlar ve işinize özel paket", "Depolama ve kullanıcı sayısı ekibimizle belirlenir"],
    },
    addonsP: "İhtiyacınızı seçin, ekibinizi anlatın. Fiyatı ekibimiz sizin için çıkarır ve e-postayla döner.",
    opts: { enterprise: ["Enterprise teklifi", "30+ kullanıcı, lokasyonlarınız arasında kurulum"], users: ["Ek kullanıcı", "Plan değiştirmeden ücretli planınıza kullanıcı ekleyin"], storage: ["Ek depolama", "Ücretli planınıza daha fazla video için alan ekleyin"], setup: ["Kurulum hizmeti", "İlk SOP'larınızı birlikte hazırlayalım"] },
    formH: "Talebinizi iletin", send: "Talebi gönder", sent: "Teşekkürler. Talebiniz ekibimize ulaştı, size e-postayla döneceğiz.", sentMail: "E-posta uygulamanız talebinizle açıldı. Oradan gönderin, size dönelim.", direct: "Talebiniz doğrudan ekibimize iletilir.",
    addonsH: "Ek hizmetler ve Enterprise", addonsNote: "Web üzerinden alınır. Fiyatı ihtiyacınıza göre ekibimiz belirler.",
    addons: [["Ek kullanıcı ve ek depolama", "Plan değiştirmeden ücretli planınıza kullanıcı veya alan ekleyin."], ["Kurulum hizmeti", "İlk SOP'larınızı birlikte hazırlayalım."]],
    teamsH: "30 ve üzeri kullanıcılı ekipler için", entP: "Kullanıcı sayısına göre fiyatlanır, lokasyonlar arası yaygınlaştırma desteğiyle. Ekiplerinizi anlatın, size teklif gönderelim.",
    entCta: "Teklif alın", entAlt: "Demo isteyin", custom: "Özel fiyat",
    compareH: "Planları karşılaştırın", feature: "Özellik",
    groups: [
      { h: "Plan", rows: [["Kullanıcı", "3", "10", "30", "30+"], ["Fiyatlandırma esası", "Kullanıcı sayısına göre", "Kullanıcı sayısına göre", "Kullanıcı sayısına göre", "Kullanıcı sayısına göre"]] },
      { h: "Oluşturma", rows: [["Yapay zekâ ile videodan adım", true, true, true, true], ["Yapay zekâ kurulum sihirbazı", true, true, true, true], ["Sektör şablonları", "1 paket", "Tümü", "Tümü", "Tümü + özel paket"], ["Kapak görseli kütüphanesi", true, true, true, true], ["Sesle yazdırma", true, true, true, true], ["Yapay zekâ quiz oluşturucu", "3 quiz", "10 quiz", "Sınırsız", "Sınırsız"]] },
      { h: "Dil", rows: [["Otomatik altyazı", true, true, true, true], ["Altyazı çeviri dili", "1", "3", "Sınırsız", "Sınırsız"], ["Yüklemede otomatik çeviri", false, false, false, true]] },
      { h: "Yönetim", rows: [["Oryantasyon Analizi", true, true, true, true], ["Pozisyona göre içerik atama", false, true, true, true], ["Çalışma alanları", "2", "5", "Sınırsız", "Sınırsız"], ["Klasörler", "Sınırsız", "Sınırsız", "Sınırsız", "Sınırsız"], ["İşler", "5", "Sınırsız", "Sınırsız", "Sınırsız"], ["Bulut depolama", "1 GB", "5 GB", "10 GB", "Satışla görüşün"], ["Kendi yapay zekâ anahtarınız", false, false, false, true]] },
      { h: "Destek", rows: [["Destek", "Standart", "Standart", "Premium", "Premium"]] },
    ],
    faqH: "Fiyatlandırma soruları",
    faq: [
      ["Flexlore nasıl fiyatlanıyor?", "Kullanıcı sayısına göre. Free 3, Pro 10, ProPlus 30 kullanıcıyı kapsar. Enterprise 30+ kullanıcıdan başlar ve özel fiyatlanır. Aylık ve yıllık fiyatlar bu sayfada yer alır."],
      ["Sınırsız ne demek?", "Sınırsız kalemler adil kullanım koşuluna bağlıdır ve ekibinizin olağan kullanımı içindir. Kullanımınız olağandışı yüksekse ekibimiz uygun planı konuşmak için sizinle iletişime geçer."],
      ["Yapay zekâ özellikleri ek ücretli mi?", "Her planda listelenen yapay zekâ özellikleri, gösterilen sınırlar içinde (örneğin quiz sayısı ve altyazı dili) plan fiyatına dahildir."],
      ["Ek kullanıcı veya depolama alabilir miyim?", "Evet. Ek kullanıcı ve ek depolama web üzerinden alınır. Fiyatı ihtiyacınıza göre ekibimiz belirler, bize ulaşın."],
      ["Planımı sonra değiştirebilir miyim?", "Evet. Hangi plana geçmek istediğinizi bize söyleyin. Değişikliğin nasıl faturalandığı Abonelik ve Faturalandırma politikamızda yer alır."],
      ["Nasıl iptal ederim?", "İstediğiniz zaman iptal edebilirsiniz. Aylık ve yıllık faturalamada iptalin nasıl işlediği Abonelik ve Faturalandırma politikamızda yer alır."],
      ["Verilerimiz nerede saklanıyor?", "Verinin nerede ve kimler tarafından işlendiği Gizlilik Politikası, Veri İşleme ve Alt İşleyenler sayfalarımızda yer alır. Başka sorunuz varsa demo görüşmesinde sorun."],
      ["Yapay zekânın yazdıklarını kim kontrol ediyor?", "Siz. Adımlar, talimatlar ve quizler ekibiniz onaylayana kadar taslak olarak kalır."],
    ],
    endH: "Hangi plan size uygun, emin değil misiniz?", endP: "Demo görüşmesinde gerçek işlerinizden birini sizinle birlikte hazırlayalım.",
  },
};
