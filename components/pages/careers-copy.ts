/* Careers page copy (/careers/). English and Turkish; every other language shows the English page.
 * Rules: no invented roles, benefits, salaries, office details or hiring process. Roles appear only when added to
 * ROLES below (real, open, approved by Flexlore). The live Framer /careers pages were template leftovers from another
 * company and are not reused (checked 13 November 2026). */

/** Where applications go. Change to a dedicated careers address once it exists. */
export const CAREERS_EMAIL = "support@flexlore.com";

export type Role = { title: string; team: string; place: string; type: string; summary: string };
/** Open roles. Empty means the page shows the general application card only. */
export const ROLES: Role[] = [];

export type CareersCopy = {
  k: string; h: [string, string]; p: string; facts: [string, string][];
  work: { k: string; h: string; items: [string, string][] };
  how: { k: string; h: string; items: [string, string][] };
  roles: { k: string; h: string; none: string; noneP: string; apply: string };
  send: { h: string; p: string; items: string[]; cta: string; subject: string; privacy: [string, string] };
  band: { h: string; p: string; a: [string, string]; b: [string, string] };
};

export const CAREERS: { en: CareersCopy; tr: CareersCopy } = {
  en: {
    k: "Careers",
    h: ["Help frontline teams", "learn the job faster"],
    p: "Flexlore turns how the best people do a job into short video steps and a quiz, so new staff get up to speed and every site works the same way. We are a small team building it for restaurants, factories, hotels and franchise chains.",
    facts: [["Company", "Flexlore Inc."], ["Headquarters", "Delaware, USA"], ["Working languages", "English and Turkish"]],
    work: { k: "What you would work on", h: "One product, three jobs",
      items: [["Video steps", "A phone video becomes step-by-step instructions that anyone on the floor can follow."],
        ["AI drafts, people approve", "AI writes the first draft of the steps and the quiz. Someone on the customer's team approves it before it goes out."],
        ["Readiness", "Managers see who has watched, who passed and who still needs help, at every site."]] },
    how: { k: "How we work", h: "What we care about",
      items: [["The floor comes first", "We design for someone on a shift, wearing gloves, with two minutes to spare."],
        ["Simple beats clever", "If a cook or an operator needs help to use it, we are not done."],
        ["People stay in charge", "AI saves time. It never publishes anything on its own."],
        ["Write it down", "Decisions and notes live in one place, so anyone can pick up the work."]] },
    roles: { k: "Open roles", h: "Join the team", none: "No open roles right now",
      noneP: "We still like to meet people who care about frontline work. Send a short note and tell us what you would like to work on.", apply: "Apply" },
    send: { h: "What to send", p: "A short email is enough. Please include:",
      items: ["Your CV or LinkedIn profile", "Work you are proud of: a portfolio, GitHub or a project", "Two or three sentences on why frontline work interests you"],
      cta: "Write to us", subject: "Careers: general application", privacy: ["How we handle personal data", "/legal/privacy/"] },
    band: { h: "Built for the people on the floor", p: "Cooks, operators, housekeepers and site crews. They are who we build for.",
      a: ["See the product", "/features/"], b: ["About Flexlore", "/company/"] },
  },
  tr: {
    k: "Kariyer",
    h: ["Saha ekipleri işi", "daha hızlı öğrensin"],
    p: "Flexlore, en iyi çalışanların işi nasıl yaptığını kısa video adımlara ve bir quize çevirir. Böylece yeni gelenler hızla işe alışır, her şube aynı standartta çalışır. Bunu restoranlar, fabrikalar, oteller ve franchise zincirleri için küçük bir ekip olarak geliştiriyoruz.",
    facts: [["Şirket", "Flexlore Inc."], ["Merkez", "Delaware, ABD"], ["Çalışma dilleri", "Türkçe ve İngilizce"]],
    work: { k: "Ne üzerinde çalışırsınız", h: "Tek ürün, üç iş",
      items: [["Video adımlar", "Telefonla çekilen bir video, sahadaki herkesin izleyebileceği adım adım talimata dönüşür."],
        ["Yapay zekâ taslak yazar, insan onaylar", "Adımların ve quizin ilk taslağını yapay zekâ hazırlar. Yayına çıkmadan önce müşterinin ekibinden biri onaylar."],
        ["Hazır olma durumu", "Yöneticiler her şubede kimin izlediğini, kimin geçtiğini ve kimin desteğe ihtiyacı olduğunu görür."]] },
    how: { k: "Nasıl çalışırız", h: "Neye önem veririz",
      items: [["Önce saha", "Vardiyadaki, eldiven takan, iki dakikası olan biri için tasarlarız."],
        ["Sade olan kazanır", "Bir aşçı ya da operatör kullanmak için yardıma ihtiyaç duyuyorsa işimiz bitmemiştir."],
        ["Karar insanda kalır", "Yapay zekâ zaman kazandırır. Hiçbir şeyi kendi başına yayınlamaz."],
        ["Yazıya dökeriz", "Kararlar ve notlar tek yerde durur, böylece işi herkes devralabilir."]] },
    roles: { k: "Açık pozisyonlar", h: "Ekibe katılın", none: "Şu an açık pozisyon yok",
      noneP: "Saha işine önem veren insanlarla tanışmak yine de isteriz. Kısa bir not gönderin, ne üzerinde çalışmak istediğinizi anlatın.", apply: "Başvurun" },
    send: { h: "Ne göndermelisiniz", p: "Kısa bir e-posta yeterli. Şunları ekleyin:",
      items: ["Özgeçmişiniz ya da LinkedIn profiliniz", "Gurur duyduğunuz bir işiniz: portfolyo, GitHub ya da bir proje", "Saha işinin sizi neden ilgilendirdiğini anlatan iki üç cümle"],
      cta: "Bize yazın", subject: "Kariyer: genel başvuru", privacy: ["Kişisel verileri nasıl işlediğimiz", "/legal/privacy/"] },
    band: { h: "Sahadaki insanlar için yapıldı", p: "Aşçılar, operatörler, kat görevlileri ve şantiye ekipleri. Biz onlar için üretiyoruz.",
      a: ["Ürünü görün", "/features/"], b: ["Flexlore hakkında", "/company/"] },
  },
};
