// Copy for /company/ and /support/ in all 8 site languages. Company facts come from the previous flexlore.com/company page.
import type { Locale } from "../i18n/locales";

type Company = {
  k: string; h: [string, string]; p: string;
  cards: [string, string][]; tl: string; timeline: [string, string, string][];
  facts: [string, string][]; programs: string;
};
type Support = {
  k: string; h: string; p: string; name: string; email: string; phone: string; topic: string; topicPh: string; topics: string[];
  message: string; send: string; note: string; sent: string; demoH: string; demoP: string; legalH: string; legalP: string; mailH: string;
};

export const COMPANY: Record<Locale, Company> = {
  en: { k: "Company", h: ["Work knowledge should not", "leave with the person."], p: "Flexlore turns how your best people do the job into video steps everyone can follow, then checks what was learned.",
    cards: [["Story", "Critical know-how gets lost, duplicated or taught differently on every shift. We built Flexlore to give it one shape: video steps and a short quiz."],
      ["Vision", "A world where operational knowledge is never lost and never depends on one person."],
      ["Mission", "Help teams turn their know-how into video-based standard work, so onboarding is faster, training is measurable and knowledge scales."]],
    tl: "How we got here", timeline: [["2024", "The problem", "Know-how was scattered, undocumented and impossible to measure. Flexlore started there."], ["2025", "Video-based standard work", "The core platform: videos and descriptions become repeatable work instructions."], ["2025", "AI-assisted quizzes", "Quizzes drafted from the job itself, so training can be measured."], ["2026", "Scaling know-how", "Flexlore grows into the operational memory of a whole organisation."]],
    facts: [["Company", "Flexlore Inc."], ["Based in", "Delaware, United States"], ["Contact", "support@flexlore.com"]], programs: "Startup programs" },
  tr: { k: "Şirket", h: ["İş bilgisi, kişiyle birlikte", "kapıdan çıkmamalı."], p: "Flexlore, en iyi çalışanlarınızın işi nasıl yaptığını herkesin izleyebileceği video adımlara çevirir, sonra ne öğrenildiğini ölçer.",
    cards: [["Hikâye", "Kritik iş bilgisi kayboluyor, tekrarlanıyor ya da her vardiyada farklı öğretiliyor. Flexlore'u bu bilgiye tek bir biçim vermek için kurduk: video adımlar ve kısa bir quiz."],
      ["Vizyon", "Operasyonel bilginin hiç kaybolmadığı ve tek bir kişiye bağlı kalmadığı bir dünya."],
      ["Misyon", "Ekiplerin bilgisini video tabanlı standart işe dönüştürmek; böylece işe alıştırma hızlansın, eğitim ölçülebilsin, bilgi büyüyebilsin."]],
    tl: "Buraya nasıl geldik", timeline: [["2024", "Sorun", "Bilgi dağınıktı, yazıya dökülmemişti ve ölçülemiyordu. Flexlore buradan başladı."], ["2025", "Video tabanlı standart iş", "Temel platform: videolar ve açıklamalar tekrarlanabilir iş talimatlarına dönüşür."], ["2025", "Yapay zekâ destekli quizler", "İşin kendisinden hazırlanan quizler; eğitim artık ölçülebilir."], ["2026", "Bilgiyi büyütmek", "Flexlore, bütün bir kurumun operasyonel hafızasına dönüşüyor."]],
    facts: [["Şirket", "Flexlore Inc."], ["Merkez", "Delaware, ABD"], ["İletişim", "support@flexlore.com"]], programs: "Girişim programları" },
  de: { k: "Unternehmen", h: ["Arbeitswissen sollte nicht", "mit der Person gehen."], p: "Flexlore macht aus der Arbeitsweise Ihrer besten Leute Videoschritte, denen alle folgen können, und prüft, was gelernt wurde.",
    cards: [["Geschichte", "Wichtiges Know-how geht verloren, wird doppelt gepflegt oder in jeder Schicht anders vermittelt. Flexlore gibt ihm eine Form: Videoschritte und ein kurzes Quiz."],
      ["Vision", "Eine Welt, in der Betriebswissen nie verloren geht und nie von einer einzelnen Person abhängt."],
      ["Mission", "Teams helfen, ihr Know-how in videobasierte Standardarbeit zu verwandeln: schnelleres Onboarding, messbare Schulung, skalierbares Wissen."]],
    tl: "Wie wir hierher kamen", timeline: [["2024", "Das Problem", "Know-how war verstreut, undokumentiert und nicht messbar. Dort hat Flexlore angefangen."], ["2025", "Videobasierte Standardarbeit", "Die Kernplattform: Videos und Beschreibungen werden zu wiederholbaren Arbeitsanweisungen."], ["2025", "KI-gestützte Quizze", "Quizze aus der Aufgabe selbst, damit Schulung messbar wird."], ["2026", "Wissen skalieren", "Flexlore wird zum Betriebsgedächtnis ganzer Organisationen."]],
    facts: [["Unternehmen", "Flexlore Inc."], ["Sitz", "Delaware, USA"], ["Kontakt", "support@flexlore.com"]], programs: "Startup-Programme" },
  ar: { k: "الشركة", h: ["لا ينبغي أن تغادر معرفة العمل", "مع صاحبها."], p: "يحوّل Flexlore طريقة أداء أفضل موظفيك للعمل إلى خطوات فيديو يتبعها الجميع، ثم يتحقق مما تم تعلّمه.",
    cards: [["قصتنا", "المعرفة المهمة تضيع أو تتكرر أو تُدرَّس بشكل مختلف في كل مناوبة. أنشأنا Flexlore لنمنحها شكلًا واحدًا: خطوات فيديو واختبار قصير."],
      ["رؤيتنا", "عالم لا تضيع فيه المعرفة التشغيلية ولا تعتمد على شخص واحد."],
      ["رسالتنا", "مساعدة الفرق على تحويل معرفتها إلى عمل قياسي قائم على الفيديو، لتأهيل أسرع وتدريب قابل للقياس ومعرفة قابلة للتوسع."]],
    tl: "كيف وصلنا إلى هنا", timeline: [["2024", "المشكلة", "كانت المعرفة مبعثرة وغير موثقة ولا يمكن قياسها. من هنا بدأ Flexlore."], ["2025", "العمل القياسي بالفيديو", "المنصة الأساسية: الفيديوهات والأوصاف تتحول إلى تعليمات عمل قابلة للتكرار."], ["2025", "اختبارات بمساعدة الذكاء الاصطناعي", "اختبارات مستمدة من المهمة نفسها ليصبح التدريب قابلًا للقياس."], ["2026", "توسيع المعرفة", "يتحول Flexlore إلى الذاكرة التشغيلية للمؤسسة بأكملها."]],
    facts: [["الشركة", "Flexlore Inc."], ["المقر", "ديلاوير، الولايات المتحدة"], ["التواصل", "support@flexlore.com"]], programs: "برامج الشركات الناشئة" },
  es: { k: "Empresa", h: ["El conocimiento del trabajo no debería", "irse con la persona."], p: "Flexlore convierte la forma de trabajar de sus mejores personas en pasos en video que todos pueden seguir, y comprueba lo aprendido.",
    cards: [["Historia", "El conocimiento clave se pierde, se duplica o se enseña distinto en cada turno. Creamos Flexlore para darle una sola forma: pasos en video y un cuestionario breve."],
      ["Visión", "Un mundo donde el conocimiento operativo nunca se pierde y nunca depende de una sola persona."],
      ["Misión", "Ayudar a los equipos a convertir su conocimiento en trabajo estándar en video: incorporación más rápida, formación medible y conocimiento que escala."]],
    tl: "Cómo llegamos aquí", timeline: [["2024", "El problema", "El conocimiento estaba disperso, sin documentar e imposible de medir. Ahí empezó Flexlore."], ["2025", "Trabajo estándar en video", "La plataforma base: videos y descripciones se convierten en instrucciones repetibles."], ["2025", "Cuestionarios con IA", "Cuestionarios a partir de la propia tarea, para que la formación se pueda medir."], ["2026", "Escalar el conocimiento", "Flexlore se convierte en la memoria operativa de toda la organización."]],
    facts: [["Empresa", "Flexlore Inc."], ["Sede", "Delaware, Estados Unidos"], ["Contacto", "support@flexlore.com"]], programs: "Programas para startups" },
  ru: { k: "Компания", h: ["Знания о работе не должны", "уходить вместе с человеком."], p: "Flexlore превращает то, как работают ваши лучшие сотрудники, в видеошаги для всех и проверяет, что усвоено.",
    cards: [["История", "Важные знания теряются, дублируются или в каждую смену объясняются по-разному. Мы создали Flexlore, чтобы дать им одну форму: видеошаги и короткий тест."],
      ["Видение", "Мир, где операционные знания никогда не теряются и не зависят от одного человека."],
      ["Миссия", "Помогать командам превращать знания в стандартную работу на видео: быстрее адаптация, измеримое обучение, масштабируемые знания."]],
    tl: "Как мы к этому пришли", timeline: [["2024", "Проблема", "Знания были разрознены, не записаны и не поддавались измерению. С этого начался Flexlore."], ["2025", "Стандартная работа на видео", "Базовая платформа: видео и описания становятся повторяемыми инструкциями."], ["2025", "Тесты с ИИ", "Тесты по самой задаче, чтобы обучение можно было измерить."], ["2026", "Масштабирование знаний", "Flexlore становится операционной памятью всей организации."]],
    facts: [["Компания", "Flexlore Inc."], ["Штаб-квартира", "Делавэр, США"], ["Контакт", "support@flexlore.com"]], programs: "Программы для стартапов" },
  fr: { k: "Entreprise", h: ["Le savoir-faire ne devrait pas", "partir avec la personne."], p: "Flexlore transforme la façon de travailler de vos meilleurs collaborateurs en étapes vidéo que tous peuvent suivre, puis vérifie ce qui a été appris.",
    cards: [["Histoire", "Le savoir-faire clé se perd, se duplique ou s'enseigne différemment à chaque poste. Nous avons créé Flexlore pour lui donner une seule forme : des étapes vidéo et un court quiz."],
      ["Vision", "Un monde où le savoir opérationnel ne se perd jamais et ne dépend jamais d'une seule personne."],
      ["Mission", "Aider les équipes à transformer leur savoir-faire en travail standard vidéo : intégration plus rapide, formation mesurable, savoir qui passe à l'échelle."]],
    tl: "Notre parcours", timeline: [["2024", "Le problème", "Le savoir-faire était dispersé, non documenté et impossible à mesurer. Flexlore est né là."], ["2025", "Le travail standard en vidéo", "La plateforme de base : vidéos et descriptions deviennent des instructions reproductibles."], ["2025", "Quiz assistés par IA", "Des quiz tirés de la tâche elle-même, pour mesurer la formation."], ["2026", "Faire grandir le savoir", "Flexlore devient la mémoire opérationnelle de toute l'organisation."]],
    facts: [["Entreprise", "Flexlore Inc."], ["Siège", "Delaware, États-Unis"], ["Contact", "support@flexlore.com"]], programs: "Programmes startups" },
  pl: { k: "Firma", h: ["Wiedza o pracy nie powinna", "odchodzić razem z człowiekiem."], p: "Flexlore zamienia sposób pracy Twoich najlepszych ludzi w kroki wideo, które każdy może powtórzyć, i sprawdza, czego się nauczono.",
    cards: [["Historia", "Kluczowa wiedza ginie, dubluje się albo na każdej zmianie jest przekazywana inaczej. Stworzyliśmy Flexlore, by nadać jej jedną formę: kroki wideo i krótki quiz."],
      ["Wizja", "Świat, w którym wiedza operacyjna nigdy nie ginie i nie zależy od jednej osoby."],
      ["Misja", "Pomagać zespołom zamieniać wiedzę w standardową pracę opartą na wideo: szybsze wdrożenie, mierzalne szkolenia, skalowalna wiedza."]],
    tl: "Jak tu dotarliśmy", timeline: [["2024", "Problem", "Wiedza była rozproszona, nieudokumentowana i niemierzalna. Od tego zaczął się Flexlore."], ["2025", "Standardowa praca na wideo", "Podstawowa platforma: filmy i opisy stają się powtarzalnymi instrukcjami."], ["2025", "Quizy wspierane przez AI", "Quizy z samego zadania, by szkolenie dało się zmierzyć."], ["2026", "Skalowanie wiedzy", "Flexlore staje się pamięcią operacyjną całej organizacji."]],
    facts: [["Firma", "Flexlore Inc."], ["Siedziba", "Delaware, USA"], ["Kontakt", "support@flexlore.com"]], programs: "Programy dla startupów" },
};

const T = {
  en: ["Account and login", "Payments and billing", "Security and data", "Technical issues and bugs", "API and developer questions", "Other"],
  tr: ["Hesap ve giriş", "Ödeme ve faturalama", "Güvenlik ve veri", "Teknik sorunlar ve hatalar", "API ve geliştirici soruları", "Diğer"],
  de: ["Konto und Anmeldung", "Zahlung und Abrechnung", "Sicherheit und Daten", "Technische Probleme und Fehler", "API- und Entwicklerfragen", "Sonstiges"],
  ar: ["الحساب وتسجيل الدخول", "الدفع والفوترة", "الأمان والبيانات", "مشكلات تقنية وأخطاء", "أسئلة API والمطورين", "أخرى"],
  es: ["Cuenta e inicio de sesión", "Pagos y facturación", "Seguridad y datos", "Problemas técnicos y errores", "API y desarrolladores", "Otro"],
  ru: ["Аккаунт и вход", "Оплата и счета", "Безопасность и данные", "Технические проблемы и ошибки", "API и вопросы разработчиков", "Другое"],
  fr: ["Compte et connexion", "Paiement et facturation", "Sécurité et données", "Problèmes techniques et bugs", "API et développeurs", "Autre"],
  pl: ["Konto i logowanie", "Płatności i rozliczenia", "Bezpieczeństwo i dane", "Problemy techniczne i błędy", "API i pytania deweloperskie", "Inne"],
};

export const SUPPORT: Record<Locale, Support> = {
  en: { k: "Support", h: "Talk to our team.", p: "Account, billing or the app. Write to us and a person answers.", name: "Name and surname", email: "Work email", phone: "Phone (optional)", topic: "Topic", topicPh: "Choose a topic", topics: T.en,
    message: "Message", send: "Send message", note: "Sending opens your email app with the message filled in.", sent: "Your email app should be open with the message ready. If not, write to support@flexlore.com.",
    demoH: "See it on one of your jobs", demoP: "Twenty minutes, one real job.", legalH: "Security and legal", legalP: "Privacy, data processing, sub-processors.", mailH: "Prefer email?" },
  tr: { k: "Destek", h: "Ekibimizle konuşun.", p: "Hesap, faturalama ya da uygulama. Bize yazın, bir insan yanıtlasın.", name: "Ad soyad", email: "İş e-postası", phone: "Telefon (isteğe bağlı)", topic: "Konu", topicPh: "Bir konu seçin", topics: T.tr,
    message: "Mesaj", send: "Mesajı gönder", note: "Gönder'e bastığınızda e-posta uygulamanız mesaj doldurulmuş olarak açılır.", sent: "E-posta uygulamanız mesaj hazır şekilde açılmış olmalı. Açılmadıysa support@flexlore.com adresine yazın.",
    demoH: "Kendi işlerinizden birinde görün", demoP: "Yirmi dakika, gerçek bir iş.", legalH: "Güvenlik ve yasal", legalP: "Gizlilik, veri işleme, alt işleyenler.", mailH: "E-postayı mı tercih edersiniz?" },
  de: { k: "Support", h: "Sprechen Sie mit unserem Team.", p: "Konto, Abrechnung oder App. Schreiben Sie uns, ein Mensch antwortet.", name: "Vor- und Nachname", email: "Geschäftliche E-Mail", phone: "Telefon (optional)", topic: "Thema", topicPh: "Thema wählen", topics: T.de,
    message: "Nachricht", send: "Nachricht senden", note: "Beim Senden öffnet sich Ihre E-Mail-App mit der fertigen Nachricht.", sent: "Ihre E-Mail-App sollte jetzt mit der Nachricht geöffnet sein. Falls nicht, schreiben Sie an support@flexlore.com.",
    demoH: "An einer Ihrer Aufgaben sehen", demoP: "Zwanzig Minuten, eine echte Aufgabe.", legalH: "Sicherheit und Recht", legalP: "Datenschutz, Auftragsverarbeitung, Unterauftragsverarbeiter.", mailH: "Lieber per E-Mail?" },
  ar: { k: "الدعم", h: "تحدّث مع فريقنا.", p: "الحساب أو الفوترة أو التطبيق. اكتب لنا وسيرد عليك شخص حقيقي.", name: "الاسم واللقب", email: "البريد الإلكتروني للعمل", phone: "الهاتف (اختياري)", topic: "الموضوع", topicPh: "اختر موضوعًا", topics: T.ar,
    message: "الرسالة", send: "إرسال الرسالة", note: "عند الإرسال يُفتح تطبيق البريد لديك والرسالة جاهزة.", sent: "يُفترض أن تطبيق البريد مفتوح الآن والرسالة جاهزة. إن لم يُفتح، راسلنا على support@flexlore.com.",
    demoH: "شاهده على إحدى مهامك", demoP: "عشرون دقيقة ومهمة حقيقية.", legalH: "الأمان والشؤون القانونية", legalP: "الخصوصية ومعالجة البيانات والمعالجون الفرعيون.", mailH: "تفضّل البريد الإلكتروني؟" },
  es: { k: "Soporte", h: "Hable con nuestro equipo.", p: "Cuenta, facturación o la app. Escríbanos y le responde una persona.", name: "Nombre y apellidos", email: "Correo de trabajo", phone: "Teléfono (opcional)", topic: "Tema", topicPh: "Elija un tema", topics: T.es,
    message: "Mensaje", send: "Enviar mensaje", note: "Al enviar se abre su app de correo con el mensaje listo.", sent: "Su app de correo debería estar abierta con el mensaje listo. Si no, escriba a support@flexlore.com.",
    demoH: "Véalo en una de sus tareas", demoP: "Veinte minutos, una tarea real.", legalH: "Seguridad y legal", legalP: "Privacidad, tratamiento de datos, subencargados.", mailH: "¿Prefiere el correo?" },
  ru: { k: "Поддержка", h: "Поговорите с нашей командой.", p: "Аккаунт, оплата или приложение. Напишите нам, ответит человек.", name: "Имя и фамилия", email: "Рабочий email", phone: "Телефон (необязательно)", topic: "Тема", topicPh: "Выберите тему", topics: T.ru,
    message: "Сообщение", send: "Отправить", note: "При отправке откроется ваше почтовое приложение с готовым письмом.", sent: "Почтовое приложение должно открыться с готовым письмом. Если нет, напишите на support@flexlore.com.",
    demoH: "Посмотрите на одной из ваших задач", demoP: "Двадцать минут, одна реальная задача.", legalH: "Безопасность и право", legalP: "Конфиденциальность, обработка данных, субподрядчики.", mailH: "Удобнее по почте?" },
  fr: { k: "Support", h: "Parlez à notre équipe.", p: "Compte, facturation ou application. Écrivez-nous, une personne vous répond.", name: "Nom et prénom", email: "E-mail professionnel", phone: "Téléphone (facultatif)", topic: "Sujet", topicPh: "Choisissez un sujet", topics: T.fr,
    message: "Message", send: "Envoyer", note: "L'envoi ouvre votre messagerie avec le message prêt.", sent: "Votre messagerie devrait être ouverte avec le message prêt. Sinon, écrivez à support@flexlore.com.",
    demoH: "Voyez-le sur l'une de vos tâches", demoP: "Vingt minutes, une vraie tâche.", legalH: "Sécurité et juridique", legalP: "Confidentialité, traitement des données, sous-traitants.", mailH: "Vous préférez l'e-mail ?" },
  pl: { k: "Wsparcie", h: "Porozmawiaj z naszym zespołem.", p: "Konto, rozliczenia lub aplikacja. Napisz do nas, odpowie człowiek.", name: "Imię i nazwisko", email: "Służbowy e-mail", phone: "Telefon (opcjonalnie)", topic: "Temat", topicPh: "Wybierz temat", topics: T.pl,
    message: "Wiadomość", send: "Wyślij wiadomość", note: "Wysłanie otworzy aplikację pocztową z gotową wiadomością.", sent: "Aplikacja pocztowa powinna być otwarta z gotową wiadomością. Jeśli nie, napisz na support@flexlore.com.",
    demoH: "Zobacz na jednym z Twoich zadań", demoP: "Dwadzieścia minut, jedno prawdziwe zadanie.", legalH: "Bezpieczeństwo i prawo", legalP: "Prywatność, przetwarzanie danych, podprocesorzy.", mailH: "Wolisz e-mail?" },
};
