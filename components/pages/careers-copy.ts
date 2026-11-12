/* Careers page copy (/careers/). English and Turkish; every other language shows the English page.
 * Written for people who might work at Flexlore, not for customers. Sources: the Notion page "Flexlore Araç Pipeline'ı
 * ve Onboarding Rehberi" (where information lives, meetings to decisions, Claude use, security rules, first day and first
 * week). Rules: no invented roles, benefits, salaries, office details, team size or hiring process; no names of people.
 * Roles appear only when added to ROLES below (real, open, approved by Flexlore). The live Framer /careers pages were
 * template leftovers from another company and are not reused (checked 13 November 2026). */

/** Where applications go. Change to a dedicated careers address once it exists. */
export const CAREERS_EMAIL = "support@flexlore.com";

export type Role = { title: string; team: string; place: string; type: string; summary: string };
/** Open roles. Empty means the page shows the general application card only. */
export const ROLES: Role[] = [];

export type CareersCopy = {
  k: string; h: [string, string]; p: string; facts: [string, string][]; programs: string;
  why: { k: string; h: string; items: [string, string][] };
  how: { k: string; h: string; p: string; items: [string, string][] };
  week: { k: string; h: string; p: string; steps: [string, string, string][]; tools: string; toolList: string[] };
  roles: { k: string; h: string; none: string; noneP: string; apply: string };
  send: { h: string; p: string; items: string[]; cta: string; subject: string; privacy: [string, string] };
};

export const CAREERS: { en: CareersCopy; tr: CareersCopy } = {
  en: {
    k: "Careers at Flexlore",
    h: ["A small team", "where your work reaches the floor"],
    p: "At Flexlore everyone owns a part of the company: product, design, sales or infrastructure. What you build is used by people on shift in restaurants, factories and hotels.",
    facts: [["Company", "Flexlore Inc."], ["Headquarters", "Delaware, USA"], ["Working languages", "Turkish and English"]],
    programs: "Programs that back us",
    why: { k: "Why join", h: "What working here is like",
      items: [["You own it", "No layers between you and the decision. You pick up a piece of work, you see it through, and your name is on it."],
        ["Close to the users", "The people we build for wear gloves and work shifts. Their feedback decides what we build next."],
        ["AI in daily work", "We use Claude every day for research, writing, analysis and code, connected to our own tools. A person approves anything that is sent, submitted or deleted."]] },
    how: { k: "How we work", h: "Information lives in one place", p: "A short set of rules keeps a small team fast. Nobody chases a message to find out what was decided.",
      items: [["Work and owner", "Linear. Every task has one record, one owner and a date."],
        ["Decisions and notes", "Notion. Meeting agendas are written before the meeting; every decision becomes a task in Linear."],
        ["Files", "Google Drive. Contracts, decks and finance stay there, not in chat."],
        ["Code", "GitHub. The product, infrastructure and technical notes."],
        ["Security by default", "Company accounts only, two-step sign-in everywhere, and only the access your work needs."]] },
    week: { k: "Your first week", h: "Productive in your first week", p: "We build onboarding software, so we hold ourselves to it. The goal: by the end of your first week you can ship work on your own.",
      steps: [["Day 1", "Accounts and context", "Your company email, Slack, Notion and Linear, and Claude connected to your own accounts. Your first tasks are already waiting in Linear."],
        ["Week 1", "Tools for your role", "Figma, GitHub or the marketing and sales tools, depending on what you will work on. Wider access only when the work needs it."],
        ["After that", "Your own area", "You own a part of the product or the business, and you bring it to the team in the regular sync."]],
      tools: "What we use", toolList: ["Linear", "Notion", "GitHub", "Figma", "Claude", "Slack", "Google Workspace", "AWS"] },
    roles: { k: "Open roles", h: "Join the team", none: "No open roles right now",
      noneP: "We still like to meet people who care about frontline work. Send a short note and tell us what you would like to work on.", apply: "Apply" },
    send: { h: "What to send", p: "A short email is enough. Please include:",
      items: ["Your CV or LinkedIn profile", "Work you are proud of: a portfolio, GitHub or a project", "Two or three sentences on what you would like to work on"],
      cta: "Write to us", subject: "Careers: general application", privacy: ["How we handle personal data", "/legal/privacy/"] },
  },
  tr: {
    k: "Flexlore'da kariyer",
    h: ["Küçük bir ekip,", "yaptığınız iş sahaya çıkar"],
    p: "Flexlore'da herkes şirketin bir parçasının sahibidir: ürün, tasarım, satış ya da altyapı. Geliştirdiğiniz şeyi restoranlarda, fabrikalarda ve otellerde vardiyadaki insanlar kullanır.",
    facts: [["Şirket", "Flexlore Inc."], ["Merkez", "Delaware, ABD"], ["Çalışma dilleri", "Türkçe ve İngilizce"]],
    programs: "Bizi destekleyen programlar",
    why: { k: "Neden Flexlore", h: "Burada çalışmak nasıl",
      items: [["İşin sahibi sizsiniz", "Sizinle karar arasında katman yok. Bir işi alırsınız, sonuna kadar götürürsünüz, üzerinde sizin adınız olur."],
        ["Kullanıcıya yakın", "Ürünü kullananlar eldiven takan, vardiyalı çalışan insanlar. Geri bildirimleri bir sonraki işi belirler."],
        ["Günlük işte yapay zekâ", "Araştırma, yazı, analiz ve kod için her gün Claude kullanırız, kendi araçlarımıza bağlı. Gönderme, başvurma ve silme her zaman bir insanın onayıyla olur."]] },
    how: { k: "Nasıl çalışırız", h: "Bilgi tek yerde yaşar", p: "Birkaç basit kural küçük bir ekibi hızlı tutar. Kimse neye karar verildiğini öğrenmek için mesaj kovalamaz.",
      items: [["İş ve sorumlu", "Linear. Her işin tek kaydı, tek sorumlusu ve bir tarihi var."],
        ["Karar ve not", "Notion. Toplantı gündemi önceden yazılır, çıkan her karar Linear'da bir işe dönüşür."],
        ["Dosya", "Google Drive. Sözleşme, sunum ve finans orada durur, sohbette değil."],
        ["Kod", "GitHub. Ürün, altyapı ve teknik notlar."],
        ["Varsayılan güvenlik", "Sadece şirket hesapları, her yerde iki adımlı giriş, işinizin gerektirdiği kadar yetki."]] },
    week: { k: "İlk haftanız", h: "İlk haftada üretken", p: "İşe alıştırma yazılımı yapıyoruz, bu yüzden aynı ölçüyü kendimize de uygularız. Hedef: ilk haftanın sonunda tek başınıza iş çıkarabilmeniz.",
      steps: [["1. gün", "Hesaplar ve bağlam", "Şirket e-postanız, Slack, Notion ve Linear, kendi hesaplarınıza bağlı Claude. İlk işleriniz Linear'da sizi bekliyor olur."],
        ["1. hafta", "Rolünüze göre araçlar", "Ne üzerinde çalışacağınıza göre Figma, GitHub ya da pazarlama ve satış araçları. Daha geniş erişim sadece iş gerektirdiğinde."],
        ["Sonrası", "Kendi alanınız", "Ürünün ya da işin bir parçasının sahibi olursunuz ve onu düzenli ekip toplantısında ekibe taşırsınız."]],
      tools: "Kullandıklarımız", toolList: ["Linear", "Notion", "GitHub", "Figma", "Claude", "Slack", "Google Workspace", "AWS"] },
    roles: { k: "Açık pozisyonlar", h: "Ekibe katılın", none: "Şu an açık pozisyon yok",
      noneP: "Saha işine önem veren insanlarla tanışmak yine de isteriz. Kısa bir not gönderin, ne üzerinde çalışmak istediğinizi anlatın.", apply: "Başvurun" },
    send: { h: "Ne göndermelisiniz", p: "Kısa bir e-posta yeterli. Şunları ekleyin:",
      items: ["Özgeçmişiniz ya da LinkedIn profiliniz", "Gurur duyduğunuz bir işiniz: portfolyo, GitHub ya da bir proje", "Ne üzerinde çalışmak istediğinizi anlatan iki üç cümle"],
      cta: "Bize yazın", subject: "Kariyer: genel başvuru", privacy: ["Kişisel verileri nasıl işlediğimiz", "/legal/privacy/"] },
  },
};
