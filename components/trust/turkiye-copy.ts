/* Copy for the Türkiye data and KVKK page (TurkiyePage.tsx) and the assistant knowledge base (scripts/knowledge.mjs).
 * Plain data, no JSX, so the build scripts can load it. Rules for this copy: see TurkiyePage.tsx. */
import { TRUST_TR, TRUST_TR_PATH } from "./config";

export type L = "tr" | "en";
export const SUBJECT = "KVKK belge talebi";

export const C = {
  tr: {
    crumb: "Güven", other: ["English", TRUST_TR_PATH.en] as const,
    h1a: "Türkiye'deki müşteriler için", h1b: "veri ve KVKK",
    lead: "Verileriniz nerede tutuluyor, kim hangi rolde, Türkiye'den aktarım nasıl yapılıyor ve videoda görünen çalışanlar için neye dikkat etmelisiniz. Kısa ve sade.",
    facts: [["Konum", "ABD, Amazon Web Services (us-east-1)"], ["Roller", "Siz veri sorumlusu, Flexlore veri işleyen"], ["Aktarım", "KVKK m.9, Kurulun standart sözleşmesi"]],
    s1: { h: "Verileriniz nerede", p: ["Flexlore'daki veriler (hesaplar, iş talimatları, eğitim videoları, quiz sonuçları) Amerika Birleşik Devletleri'nde, Amazon Web Services'in us-east-1 (Kuzey Virginia) bölgesinde tutulur.", "Türkiye'den bu bölgeye aktarım, KVKK'nın yurt dışına aktarım kuralına (m.9) göre yapılır. Aşağıda adım adım anlattık."] },
    s2: { h: "Roller", p: ["Çalışan verilerini Flexlore'a siz yüklersiniz. Bu ilişkide şirketiniz veri sorumlusu, Flexlore veri işleyendir.", "Flexlore verileri yalnızca sizin adınıza ve sizin eğitim amacınızla işler: iş talimatlarının hazırlanması, çalışanlara atanması ve eğitimin tamamlanıp tamamlanmadığının takibi."],
      list: ["Videolarınızı kendi amacımızla kullanmayız: pazarlama, demo veya örnek içerik için kullanmayız.", "Videolarınızı AI modeli eğitmek için kullanmayız.", "Demolarımızı kendi çektiğimiz videolarla yaparız."] },
    s3: { h: "Yurt dışına aktarım: 5 adımda", p: "Türkiye'den ABD'ye aktarım için gerçekçi yol, Kurulun ilan ettiği \"veri sorumlusundan veri işleyene\" standart sözleşmedir. Bildirimi aktaran taraf olarak siz yaparsınız; biz her adımda yardımcı oluruz.",
      steps: [["Standart sözleşmeyi alın", "Kurulun ilan ettiği güncel metni kvkk.gov.tr'den alın. Ana metin değiştirilmeden imzalanır."], ["Ekleri birlikte doldurun", "Veri kategorileri, alt işleyenler ve verinin bulunduğu yer eklere yazılır. Taslak ekleri biz hazırlarız."], ["İmzalayın", "Sözleşmeyi şirketiniz (veri aktaran) ve Flexlore Inc. (veri alan, veri işleyen) imzalar."], ["5 iş günü içinde Kurula bildirin", "İmzadan sonra 5 iş günü içinde Kurula bildirim yapılır (KEP veya Kurulun bildirim sistemi). Bu bir izin başvurusu değil, bildirimdir."], ["Değişiklikte yeniden bildirin", "Taraflar veya sözleşmenin içeriği değişirse bildirim yenilenir."]] },
    s4: { h: "Alt işleyenler", p: "Flexlore'u çalıştırmak için kullandığımız hizmet sağlayıcıları. Yeni bir alt işleyen eklenmeden önce bu liste güncellenir.", th: ["Hizmet", "Ne için"],
      rows: [["Amazon Web Services", "Sunucu, veritabanı, video depolama ve dağıtımı"], ["OpenAI", "Quiz sorusu üretimi. Adımların yazılı açıklamaları gönderilir, video gönderilmez."], ["Resend", "Hesap e-postaları (doğrulama, şifre sıfırlama)"], ["Sentry", "Hata kaydı"], ["Google Firebase", "Push bildirimi ve uygulama çökme raporu"], ["RevenueCat", "Uygulama içi abonelik"]],
      more: "Alt işleyenler sayfası (İngilizce)" },
    s5: { h: "Videoda görünen çalışanlar", p: "Yüzün göründüğü bir eğitim videosu kişisel veridir. Çalışanlarınızı bilgilendirmek işveren olarak sizin yükümlülüğünüzdür.",
      list: [["Bilgilendirme her zaman gerekir.", "Videoda görünecek her çalışan, çekimden önce bilgilendirilmelidir. Bunun için bir aydınlatma metni şablonu hazırladık."], ["İzin her durumda zorunlu değildir.", "Açık rıza, veri işleme şartlarından yalnızca biridir. Rızaya dayanacaksanız aydınlatma metninden ayrı bir belgeyle, amaca özel olarak ve iş şartı yapmadan alın. Eğitim videosu için alınan izin pazarlama, AI eğitimi veya ses klonlamayı kapsamaz."], ["Kayıt tutun.", "Bilgilendirmeyi ve varsa izni; kim, ne zaman ve hangi metin sürümüyle olduğunu yazılı veya elektronik olarak saklayın."], ["Yüz tanıma yok.", "Flexlore yüz tanıma veya yüzle kimlik doğrulama yapmaz."], ["Üçüncü kişileri kadraja almayın.", "Müşteri, misafir veya hasta gibi kişileri mümkün olduğunca çekmeyin ve yalnızca eğitim için gereken kadar çekin."], ["Çıkarılma isteği.", "Bir çalışan videodan çıkarılmak isterse videoyu kaldırabilir veya yeniden çekebilirsiniz. Otomatik yüz bulanıklaştırma yol haritamızda."]] },
    s6: { h: "Belgeleri talep edin", p: "Sözleşme ve şablonları sitede yayınlamıyoruz. Talep edin, şirketinize göre hazırlayıp gönderelim.",
      docs: ["Veri İşleme Sözleşmesi", "KVKK standart sözleşme ekleri", "Çalışan bilgilendirme metni şablonu"], cta: "Belgeleri talep edin", alt: "Destek sayfası",
      body: "Merhaba,\n\nAşağıdaki belgeleri talep ediyoruz:\n- Veri İşleme Sözleşmesi\n- KVKK standart sözleşme ekleri\n- Çalışan bilgilendirme metni şablonu\n\nŞirket unvanı:\nYetkili kişi:\n" },
    s7: { h: "Sık sorulanlar", items: [
      ["Türkiye'de sunucu gerekiyor mu?", "Hayır. Restoran, otel, üretim ve franchise gibi sektörlerde veriler ABD'de tutulabilir; Türkiye'den aktarım standart sözleşmeyle yapılır. Banka, sigorta şirketi, kamu kurumu veya kritik altyapı işletmecisiyseniz kendi mevzuatınız verinin yurt içinde tutulmasını isteyebilir. Bize yazın, müşteriye özel kurulumu konuşalım."],
      ["Çalışandan izin almak zorunda mıyız?", "Her durumda değil. Bilgilendirme her zaman gerekir; açık rıza ise veri işleme şartlarından yalnızca biridir. Rızaya dayanacaksanız onu aydınlatma metninden ayrı bir belgeyle, amaca özel olarak ve iş şartı yapmadan alın. Hangi hukuki sebebin size uyduğuna hukuk danışmanınız karar verir."],
      ["Videolar AI eğitiminde kullanılıyor mu?", "Hayır. Videolarınızı yalnızca sizin eğitim amacınızla işleriz; AI modeli eğitmek, pazarlama veya demo için kullanmayız. Quiz üretimi için yalnızca adımların yazılı açıklamaları gönderilir, video gönderilmez."]] },
    updated: `Son güncelleme: ${TRUST_TR.updated.tr}`, note: "Bu sayfa bilgilendirme amaçlıdır, hukuki görüş değildir. Kendi durumunuz için hukuk danışmanınıza başvurun.",
  },
  en: {
    crumb: "Trust", other: ["Türkçe", TRUST_TR_PATH.tr] as const,
    h1a: "Data and KVKK for", h1b: "customers in Türkiye",
    lead: "Where your data is kept, who holds which role, how transfers from Türkiye work and what to keep in mind for employees who appear in videos. Short and plain.",
    facts: [["Location", "United States, Amazon Web Services (us-east-1)"], ["Roles", "You are the controller, Flexlore the processor"], ["Transfer", "KVKK Article 9, the Board's standard contract"]],
    s1: { h: "Where your data is", p: ["Data in Flexlore (accounts, work instructions, training videos, quiz results) is kept in the United States, in the us-east-1 (Northern Virginia) region of Amazon Web Services.", "Transfers from Türkiye to that region follow the KVKK rule on transfers abroad (Article 9). The steps are below."] },
    s2: { h: "Roles", p: ["You upload your employees' data to Flexlore. In this relationship your company is the data controller and Flexlore is the data processor.", "Flexlore processes the data only on your behalf and for your training purpose: preparing work instructions, assigning them to employees and tracking whether training is complete."],
      list: ["We do not use your videos for our own purposes: not for marketing, demos or sample content.", "We do not use your videos to train AI models.", "Our demos use videos we film ourselves."] },
    s3: { h: "Transfers abroad in 5 steps", p: "The practical route from Türkiye to the United States is the Board's \"controller to processor\" standard contract. As the transferring party you file the notification; we help at every step.",
      steps: [["Get the standard contract", "Take the current text published by the Board from kvkk.gov.tr. The main text is signed without changes."], ["Fill in the annexes together", "The annexes list the data categories, the sub-processors and where the data is kept. We prepare draft annexes."], ["Sign", "Your company (the exporter) and Flexlore Inc. (the importer, as processor) sign the contract."], ["Notify the Board within 5 business days", "Within 5 business days of signing, the Board is notified (by registered email, KEP, or the Board's notification system). This is a notification, not a request for permission."], ["Notify again after changes", "If the parties or the content of the contract change, the notification is renewed."]] },
    s4: { h: "Sub-processors", p: "The providers we use to run Flexlore. This list is updated before a new sub-processor is added.", th: ["Service", "Used for"],
      rows: [["Amazon Web Services", "Servers, database, video storage and delivery"], ["OpenAI", "Drafting quiz questions. The written step descriptions are sent; videos are not."], ["Resend", "Account emails (verification, password reset)"], ["Sentry", "Error logging"], ["Google Firebase", "Push notifications and app crash reports"], ["RevenueCat", "In-app subscriptions"]],
      more: "Sub-processors page" },
    s5: { h: "Employees who appear in videos", p: "A training video that shows a face is personal data. Informing your employees is your obligation as the employer.",
      list: [["Informing is always required.", "Every employee who will appear in a video should be informed before filming. We have prepared a template notice for this."], ["Consent is not required in every case.", "Explicit consent is only one of the legal grounds for processing. If you rely on consent, collect it in a document separate from the notice, for a specific purpose and never as a condition of employment. Consent for a training video does not cover marketing, AI training or voice cloning."], ["Keep a record.", "Keep the notice and any consent on file, in writing or electronically: who, when and which version of the text."], ["No face recognition.", "Flexlore does not do face recognition or face-based identity checks."], ["Keep third parties out of frame.", "Avoid filming customers, guests or patients where you can, and film only what the training needs."], ["Requests to be removed.", "If an employee asks to be removed from a video, you can take the video down or film it again. Automatic face blurring is on our roadmap."]] },
    s6: { h: "Request the documents", p: "We do not publish the agreement and templates on the site. Request them and we will prepare them for your company.",
      docs: ["Data Processing Agreement", "KVKK standard contract annexes", "Employee notice template"], cta: "Request the documents", alt: "Support page",
      body: "Hello,\n\nWe would like to request the following documents:\n- Data Processing Agreement\n- KVKK standard contract annexes\n- Employee notice template\n\nCompany name:\nContact person:\n" },
    s7: { h: "Frequently asked", items: [
      ["Do we need servers in Türkiye?", "No. In sectors such as restaurants, hotels, manufacturing and franchises, data can be kept in the United States, with transfers from Türkiye made under the standard contract. If you are a bank, an insurer, a public body or a critical infrastructure operator, your own regulations may require data to stay in Türkiye. Write to us and we will discuss a setup for you."],
      ["Do we have to get employees' consent?", "Not in every case. Informing employees is always required; explicit consent is only one of the legal grounds. If you rely on consent, collect it in a document separate from the notice, for a specific purpose and never as a condition of employment. Your legal adviser decides which ground fits you."],
      ["Are videos used to train AI?", "No. We process your videos only for your training purpose; we do not use them to train AI models, for marketing or for demos. For quiz drafting only the written step descriptions are sent, never the video."]] },
    updated: `Last updated: ${TRUST_TR.updated.en}`, note: "This page is for information only and is not legal advice. Consult your legal adviser about your situation.",
  },
} as const;

/** Plain-text version for the assistant's knowledge base (scripts/knowledge.mjs). */
export const TURKIYE_TEXT = (lang: L) => {
  const c = C[lang];
  return [c.lead, `${c.s1.h}: ${c.s1.p.join(" ")}`, `${c.s2.h}: ${c.s2.p.join(" ")} ${c.s2.list.join(" ")}`,
    `${c.s3.h}: ${c.s3.p} ${c.s3.steps.map(([t, p], i) => `${i + 1}. ${t}: ${p}`).join(" ")}`,
    `${c.s4.h}: ${c.s4.rows.map(([n, d]) => `${n}: ${d}`).join(". ")}.`, `${c.s5.h}: ${c.s5.p} ${c.s5.list.map(([t, p]) => `${t} ${p}`).join(" ")}`,
    `${c.s6.h}: ${c.s6.p} ${c.s6.docs.join(", ")}.`, ...c.s7.items.map(([q, a]) => `${q} ${a}`), c.note].join("\n");
};
export const TURKIYE_TITLE = { tr: "Türkiye'deki müşteriler için veri ve KVKK", en: "Data and KVKK for customers in Türkiye" };
