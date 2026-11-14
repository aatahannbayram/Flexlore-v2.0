/* Copy for the Türkiye data and KVKK page (TurkiyePage.tsx) and the assistant knowledge base (scripts/knowledge.mjs).
 * Plain data, no JSX, so the build scripts can load it. Rules for this copy: see TurkiyePage.tsx.
 * 14 November 2026: rewritten as a draft KVKK Article 10 notice (aydınlatma metni) from the founder's data inventory.
 * [DOĞRULANACAK] / [TO BE CONFIRMED] mark facts still to be confirmed; the transfer mechanism is counsel's decision. */
import { TRUST_TR, TRUST_TR_PATH } from "./config";

export type L = "tr" | "en";
export const SUBJECT = "KVKK belge talebi";

export const C = {
  tr: {
    crumb: "Güven", other: ["English", TRUST_TR_PATH.en] as const,
    h1a: "Türkiye'de veri", h1b: "ve KVKK",
    lead: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) madde 10 kapsamında aydınlatma metni taslağı: hangi kişisel verileri hangi amaçla ve hangi hukuki sebeple işlediğimiz, kimlere aktardığımız, yurt dışına aktarım ve haklarınız.",
    facts: [["Veri sorumlusu", "Uygulamadaki çalışan verilerinde işvereniniz; web sitesinde Flexlore Inc."], ["Konum", "ABD, Amazon Web Services [DOĞRULANACAK: bölge]"], ["Yurt dışına aktarım", "KVKK m.9; yöntem [DOĞRULANACAK]"]],
    s1: { h: "Veri sorumlusu ve roller", p: [
      "Flexlore Inc., Amerika Birleşik Devletleri'nin Delaware eyaletinde kurulu bir şirkettir. Adres: [DOĞRULANACAK: şirket adresi]. İletişim: support@flexlore.com. VERBİS kaydı: [DOĞRULANACAK]. Veri sorumlusu temsilcisi: [DOĞRULANACAK].",
      "Uygulamadaki çalışan verileri: Flexlore hesabını genellikle işvereniniz açar veya sizi davet eder. Bu verilerde işvereniniz veri sorumlusu, Flexlore ise işverenin adına ve talimatıyla çalışan veri işleyendir. Verileri yalnızca işverenin eğitim amacıyla işleriz; pazarlama, demo veya yapay zekâ modeli eğitimi gibi kendi amaçlarımızla kullanmayız. Çalışansanız aydınlatma yükümlülüğü ve başvurularınızın ilk muhatabı işvereninizdir.",
      "Flexlore'un veri sorumlusu olduğu durumlar: web sitesi ziyaretçileri, bize yazan veya demo planlayan kişiler, sitedeki Flex AI asistanını kullananlar ve oturum güvenliği, abonelik ve müşteri ilişkisi gibi kendi amaçlarımızla işlediğimiz hesap ve iletişim verileri."] },
    s2: { h: "İşlenen veriler, amaçlar ve hukuki sebepler", p: [
      "Veriler web uygulaması, mobil uygulamalar ve web sitesi üzerinden elektronik ortamda; sizden, sizi davet eden işvereninizden ve kullanım sırasında otomatik olarak toplanır.",
      "Amaçlar: hizmeti sunmak (eğitim içeriği, quiz ve hazırlık takibi), hesapları korumak ve hataları gidermek, abonelikleri yönetmek, sorulara yanıt vermek ve yasal yükümlülükleri yerine getirmek. Web sitesi analitiği yalnızca izninizle çalışır.",
      "Hukuki sebepler: KVKK m.5/2 kapsamında sözleşmenin kurulması veya ifası (c), hukuki yükümlülük (ç) ve meşru menfaat (f); web sitesi analitiği için m.5/1 kapsamında açık rıza. Flexlore'un veri işleyen olduğu durumlarda hukuki sebebi işvereniniz belirler. [DOĞRULANACAK: amaç ve hukuki sebep eşleştirmesi]",
      "İşlenen kişisel veri kategorileri:"],
      list: [
        "Hesap: ad, soyad, e-posta, telefon (isteğe bağlı), doğum tarihi, ülke, profil fotoğrafı, şifre (açık metin olarak değil, hash olarak saklanır).",
        "İş verisi: çalışma alanı, klasör ve iş içerikleri, yüklenen video ve fotoğraflar, adım metinleri, duyurular.",
        "Kullanım ve öğrenme: izleme oturumları, adım görüntülemeleri, quiz sonuçları, pozisyon ataması, rol (Owner, Manager, Editor, Viewer).",
        "Davetler: davet edilen kişinin e-postası, kişi kaydolana kadar. Davetler 60 gün saklanır.",
        "Cihaz: push bildirim anahtarı (token), çökme ve hata raporları.",
        "Ödeme: mobil abonelik bilgisi. Kart bilgisi Flexlore'da tutulmaz; Apple veya Google tarafından işlenir.",
        "Web sitesi: dil ve tema tercihi, varsa analitik izni; Flex AI ile yazışma veya sesli görüşme içeriği."] },
    s3: { h: "Yurt dışına aktarım (KVKK m.9)", p: "Flexlore Inc. ABD'dedir ve hizmet sağlayıcılarımızın çoğu ABD merkezlidir. Bu nedenle Türkiye'den toplanan kişisel veriler yurt dışına aktarılır. Hangi aktarım yönteminin kullanılacağına henüz karar verilmedi; bu karar hukuk danışmanına aittir. KVKK m.9'da öngörülen seçenekler aşağıdadır. [DOĞRULANACAK: seçilecek yöntem]",
      steps: [
        ["Yeterlilik kararı", "Kurulun, aktarımın yapılacağı ülke için verdiği yeterlilik kararı. [DOĞRULANACAK: ABD için güncel durum]"],
        ["Standart sözleşme", "Kurulun ilan ettiği standart sözleşme. Kanuna göre imzadan sonra 5 iş günü içinde Kurula bildirilir. Müşteri verilerinde aktaran taraf işveren, alan taraf Flexlore Inc. olabilir."],
        ["Diğer uygun güvenceler", "Kurulca onaylanan bağlayıcı şirket kuralları veya Kurulun izniyle yazılı taahhütname."],
        ["Arızi aktarım", "Aktarımın arızi olduğu sınırlı hâllerde, örneğin olası riskler hakkında bilgilendirilmiş kişinin açık rızası."],
        ["Karar ve belgeler", "Seçilen yöntem ve gereken belgeler bu sayfada açıklanacak. [DOĞRULANACAK]"]] },
    s4: { h: "Verilerin aktarıldığı alıcılar", p: "Flexlore'u çalıştırmak için kullandığımız ve bugün kullanımda olan hizmet sağlayıcılar (alt işleyenler) aşağıdadır. Veriler ayrıca işverenin belirlediği rol ve yetkilere göre aynı çalışma alanındaki kullanıcılarla ve kanunen zorunlu olduğunda yetkili kurumlarla paylaşılır. Planlanan, henüz kullanılmayan sağlayıcılar: Stripe (web abonelik ödemeleri), Resend (e-posta gönderimi, Amazon SES'in yerine geçecek) ve Anthropic (altyazı çevirisi ve metin önerileri; bugün yalnızca test ortamında). Videodaki konuşmanın metne çevrilmesi Flexlore'un kendi sunucusunda yapılır; ses dışarıya gönderilmez.", th: ["Hizmet", "Ne için"],
      rows: [
        ["Amazon Web Services", "Sunucu, veritabanı, dosya ve video depolama, e-posta gönderimi (Amazon SES). Bölge: [DOĞRULANACAK]"],
        ["Google Firebase", "Push bildirimi (Cloud Messaging) ve uygulama çökme raporu (Crashlytics)"],
        ["Sentry", "Mobil uygulama ve sunucu hata takibi"],
        ["RevenueCat", "Mobil abonelik durumu (satın alma Apple App Store veya Google Play üzerinden)"],
        ["OpenAI", "Yapay zekâ ile quiz üretimi. [DOĞRULANACAK: hangi içeriklerin gönderildiği]"],
        ["Google ile giriş", "Google hesabıyla oturum açma. [DOĞRULANACAK: canlıda kullanılıyor mu]"],
        ["ElevenLabs", "Yalnızca web sitesi: Flex AI asistanında ziyaretçi yazışmaları ve sesli görüşmeler"],
        ["PostHog", "Yalnızca web sitesi, yalnızca etkinse ve izninizle: ziyaret analitiği. [DOĞRULANACAK: canlıda etkin mi]"]],
      more: "Alt işleyenler sayfası (İngilizce)" },
    s5: { h: "Videoda görünen çalışanlar", p: "Yüzün göründüğü veya sesin duyulduğu bir eğitim videosu kişisel veridir. Çalışanlarınızı bilgilendirmek işveren olarak sizin yükümlülüğünüzdür.",
      list: [["Bilgilendirme her zaman gerekir.", "Videoda görünecek her çalışan, çekimden önce bilgilendirilmelidir. Talep ederseniz bir bilgilendirme metni şablonu gönderebiliriz."], ["İzin her durumda zorunlu değildir.", "Açık rıza, veri işleme şartlarından yalnızca biridir. Rızaya dayanacaksanız aydınlatma metninden ayrı bir belgeyle, amaca özel olarak ve iş şartı yapmadan alın. Eğitim videosu için alınan izin pazarlama, yapay zekâ eğitimi veya ses klonlamayı kapsamaz."], ["Kayıt tutun.", "Bilgilendirmeyi ve varsa izni; kim, ne zaman ve hangi metin sürümüyle olduğunu yazılı veya elektronik olarak saklayın."], ["Yüz tanıma yok.", "Flexlore yüz tanıma yapmaz; yüzü veya sesi kişiyi tanımak ya da kimlik doğrulamak için kullanmaz. Videodaki konuşma, örneğin altyazı için, Flexlore'un kendi sunucusunda metne çevrilebilir; ses dışarıdaki bir hizmete gönderilmez."], ["Üçüncü kişileri kadraja almayın.", "Müşteri, misafir veya hasta gibi kişileri mümkün olduğunca çekmeyin ve yalnızca eğitim için gereken kadar çekin."], ["Çıkarılma isteği.", "Bir çalışan videodan çıkarılmak isterse videoyu kaldırabilir veya yeniden çekebilirsiniz."]] },
    s6: { h: "Belgeleri talep edin", p: "Sözleşme ve şablonları sitede yayınlamıyoruz. Talep edin, şirketinize göre hazırlayıp gönderelim.",
      docs: ["Veri İşleme Sözleşmesi", "Yurt dışına aktarım belgeleri", "Çalışan bilgilendirme metni şablonu"], cta: "Belgeleri talep edin", alt: "Destek sayfası",
      body: "Merhaba,\n\nAşağıdaki belgeleri talep ediyoruz:\n- Veri İşleme Sözleşmesi\n- Yurt dışına aktarım belgeleri\n- Çalışan bilgilendirme metni şablonu\n\nŞirket unvanı:\nYetkili kişi:\n" },
    s7: { h: "Haklarınız ve sık sorulanlar", items: [
      ["KVKK m.11 kapsamında haklarınız nelerdir?", "Kişisel verinizin işlenip işlenmediğini öğrenme; işlenmişse buna ilişkin bilgi talep etme; işleme amacını ve verinin amacına uygun kullanılıp kullanılmadığını öğrenme; yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme; eksik veya yanlış işlenmişse düzeltilmesini isteme; KVKK m.7 çerçevesinde silinmesini veya yok edilmesini isteme; bu işlemlerin verinin aktarıldığı üçüncü kişilere bildirilmesini isteme; münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme ve kanuna aykırı işleme nedeniyle zarara uğrarsanız zararın giderilmesini talep etme."],
      ["Nasıl başvurabilirim?", "Başvurunuzu support@flexlore.com adresine e-postayla veya [DOĞRULANACAK: posta adresi] adresine yazılı olarak iletebilirsiniz. Kimliğinizi doğrulamamız gerekebilir. Başvurular en geç 30 gün içinde yanıtlanır. Yanıtı yetersiz bulursanız Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz. Uygulamadaki çalışan verileri için önce işvereninize başvurun; bize gelen bu tür talepleri işverene iletiriz."],
      ["Veriler ne kadar süre saklanır?", "Davetler 60 gün saklanır. Hesap silindikten sonraki süre, videolar ve kayıtlar (log) için saklama süreleri: [DOĞRULANACAK]. Süre dolduğunda veriler, kanunen saklanması gerekmedikçe silinir veya anonim hâle getirilir."],
      ["Türkiye'de sunucu gerekiyor mu?", "Veriler bugün ABD'de tutulur ve Türkiye'den aktarım KVKK m.9'a göre yapılır; yöntem henüz kesinleşmedi. Banka, sigorta şirketi, kamu kurumu veya kritik altyapı işletmecisiyseniz kendi mevzuatınız verinin yurt içinde tutulmasını isteyebilir. Bize yazın, durumunuzu konuşalım."]] },
    updated: `Son güncelleme: ${TRUST_TR.updated.tr}`, note: "Bu metin taslaktır ve yayından önce hukuk danışmanı tarafından gözden geçirilecektir. Bilgilendirme amaçlıdır, hukuki görüş değildir.",
  },
  en: {
    crumb: "Trust", other: ["Türkçe", TRUST_TR_PATH.tr] as const,
    h1a: "Data and KVKK", h1b: "in Türkiye",
    lead: "A draft privacy notice under Article 10 of Türkiye's Law No. 6698 on the Protection of Personal Data (KVKK): which personal data we process, for what purpose and on what legal basis, who receives it, transfers abroad and your rights.",
    facts: [["Data controller", "Your employer for employee data in the app; Flexlore Inc. on the website"], ["Location", "United States, Amazon Web Services [TO BE CONFIRMED: region]"], ["Transfer abroad", "KVKK Article 9; mechanism [TO BE CONFIRMED]"]],
    s1: { h: "Data controller and roles", p: [
      "Flexlore Inc. is a company incorporated in Delaware, United States. Address: [TO BE CONFIRMED: company address]. Contact: support@flexlore.com. VERBIS registration: [TO BE CONFIRMED]. Data controller representative: [TO BE CONFIRMED].",
      "Employee data in the app: the employer usually opens the Flexlore account or invites you. For this data your employer is the data controller, and Flexlore is the data processor acting on the employer's behalf and instructions. We process the data only for the employer's training purpose and do not use it for our own purposes, such as marketing, demos or training AI models. If you are an employee, your employer owes you the notice and is the first contact for your requests.",
      "Where Flexlore is the data controller: website visitors, people who write to us or book a demo, people who use the Flex AI assistant on the site, and the account and contact data we process for our own purposes, such as sign-in security, subscriptions and the customer relationship."] },
    s2: { h: "Data, purposes and legal bases", p: [
      "Data is collected electronically through the web app, the mobile apps and the website: from you, from the employer who invites you, and automatically while you use the service.",
      "Purposes: providing the service (training content, quizzes and readiness tracking), protecting accounts and fixing errors, managing subscriptions, answering questions and meeting legal obligations. Website analytics runs only with your consent.",
      "Legal bases: under KVKK Article 5(2), the formation or performance of a contract (c), a legal obligation (ç) and legitimate interest (f); for website analytics, explicit consent under Article 5(1). Where Flexlore is the processor, your employer sets the legal basis. [TO BE CONFIRMED: mapping of purposes to legal bases]",
      "Categories of personal data processed:"],
      list: [
        "Account: first and last name, email, phone (optional), date of birth, country, profile photo, password (stored hashed, not in plain text).",
        "Work data: workspace, folder and job content, uploaded videos and photos, step texts, announcements.",
        "Usage and learning: watch sessions, step views, quiz results, position assignment, role (Owner, Manager, Editor, Viewer).",
        "Invitations: the invited person's email until they sign up. Invitations are kept for 60 days.",
        "Device: push notification token, crash and error reports.",
        "Payments: mobile subscription information. Card data is not held by Flexlore; Apple or Google process it.",
        "Website: language and theme preference, your analytics choice where asked; Flex AI text or voice conversations."] },
    s3: { h: "Transfers abroad (KVKK Article 9)", p: "Flexlore Inc. is in the United States and most of our providers are based there, so personal data collected in Türkiye is transferred abroad. The transfer mechanism has not been decided yet; that decision is for counsel. The options in KVKK Article 9 are listed below. [TO BE CONFIRMED: chosen mechanism]",
      steps: [
        ["Adequacy decision", "An adequacy decision by the Board for the destination country. [TO BE CONFIRMED: current status for the United States]"],
        ["Standard contract", "The standard contract announced by the Board. By law it is notified to the Board within 5 business days of signing. For customer data, the employer could be the exporter and Flexlore Inc. the importer."],
        ["Other appropriate safeguards", "Binding corporate rules approved by the Board, or a written undertaking with the Board's permission."],
        ["Occasional transfers", "In limited cases where the transfer is occasional, for example the explicit consent of a person informed of the possible risks."],
        ["Decision and documents", "The chosen mechanism and the documents needed will be described on this page. [TO BE CONFIRMED]"]] },
    s4: { h: "Who receives the data", p: "The service providers (sub-processors) we use to run Flexlore that are live today are listed below. Data is also shared with users in the same workspace according to the roles and permissions the employer sets, and with authorities where the law requires it. Planned, not yet live: Stripe (web subscription payments), Resend (email sending, to replace Amazon SES) and Anthropic (subtitle translation and text suggestions; today only in our test environment). Speech in videos is converted to text on Flexlore's own server; the audio is not sent out.", th: ["Service", "Used for"],
      rows: [
        ["Amazon Web Services", "Servers, database, file and video storage, email sending (Amazon SES). Region: [TO BE CONFIRMED]"],
        ["Google Firebase", "Push notifications (Cloud Messaging) and app crash reports (Crashlytics)"],
        ["Sentry", "Error tracking for the mobile apps and the backend"],
        ["RevenueCat", "Mobile subscription status (purchases through the Apple App Store or Google Play)"],
        ["OpenAI", "AI quiz generation. [TO BE CONFIRMED: which content is sent]"],
        ["Sign in with Google", "Signing in with a Google account. [TO BE CONFIRMED: whether live]"],
        ["ElevenLabs", "Website only: visitor text and voice conversations with the Flex AI assistant"],
        ["PostHog", "Website only, only if enabled and with your consent: visit analytics. [TO BE CONFIRMED: whether enabled on the live site]"]],
      more: "Sub-processors page" },
    s5: { h: "Employees who appear in videos", p: "A training video that shows a face or records a voice is personal data. Informing your employees is your obligation as the employer.",
      list: [["Informing is always required.", "Every employee who will appear in a video should be informed before filming. On request we can send a template notice."], ["Consent is not required in every case.", "Explicit consent is only one of the legal grounds for processing. If you rely on consent, collect it in a document separate from the notice, for a specific purpose and never as a condition of employment. Consent for a training video does not cover marketing, AI training or voice cloning."], ["Keep a record.", "Keep the notice and any consent on file, in writing or electronically: who, when and which version of the text."], ["No face recognition.", "Flexlore does not perform face recognition and does not use faces or voices to identify or verify people. Speech in a video may be converted to text, for example for subtitles, on Flexlore's own server; the audio is not sent to an outside service."], ["Keep third parties out of frame.", "Avoid filming customers, guests or patients where you can, and film only what the training needs."], ["Requests to be removed.", "If an employee asks to be removed from a video, you can take the video down or film it again."]] },
    s6: { h: "Request the documents", p: "We do not publish the agreement and templates on the site. Request them and we will prepare them for your company.",
      docs: ["Data Processing Agreement", "Transfer abroad documents", "Employee notice template"], cta: "Request the documents", alt: "Support page",
      body: "Hello,\n\nWe would like to request the following documents:\n- Data Processing Agreement\n- Transfer abroad documents\n- Employee notice template\n\nCompany name:\nContact person:\n" },
    s7: { h: "Your rights and common questions", items: [
      ["What are my rights under KVKK Article 11?", "To learn whether your personal data is processed; to request information about it if so; to learn the purpose of processing and whether the data is used for that purpose; to know the third parties in Türkiye or abroad to whom it is transferred; to ask for correction if it is incomplete or wrong; to ask for deletion or destruction under KVKK Article 7; to ask that these steps are notified to the third parties who received the data; to object to a result against you that arises only from automated analysis; and to claim compensation if unlawful processing causes you damage."],
      ["How do I make a request?", "Send your request by email to support@flexlore.com or in writing to [TO BE CONFIRMED: postal address]. We may need to verify your identity. Requests are answered within 30 days at the latest. If you find the answer insufficient, you can complain to the Personal Data Protection Board. For employee data in the app, contact your employer first; we pass such requests on to the employer."],
      ["How long is data kept?", "Invitations are kept for 60 days. Retention after account deletion, and for videos and logs: [TO BE CONFIRMED]. When a period ends, data is deleted or anonymised unless the law requires us to keep it."],
      ["Do we need servers in Türkiye?", "Data is kept in the United States today and transfers from Türkiye follow KVKK Article 9; the mechanism has not been decided yet. If you are a bank, an insurer, a public body or a critical infrastructure operator, your own regulations may require data to stay in Türkiye. Write to us and we will discuss your situation."]] },
    updated: `Last updated: ${TRUST_TR.updated.en}`, note: "This text is a draft and will be reviewed by counsel before publication. It is for information only and is not legal advice.",
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
