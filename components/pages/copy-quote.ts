// Enterprise quote request on the pricing page, in the site's 8 locales. The form opens the visitor's email app with a
// filled message to support@flexlore.com (same pattern as the support form); no data is sent anywhere by the site.
// [ONAY BEKLİYOR]: all copy below.
import type { Locale } from "../i18n/locales";
export type QuoteCopy = {
  cta: string; k: string; h: string; p: string; name: string; email: string; company: string; size: string; sizes: [string, string, string, string];
  sector: string; sectors: [string, string, string, string, string]; sites: string; msg: string; msgPh: string; send: string; alt: string; note: string;
  subject: string; bullets: [string, string, string];
};
export const QUOTE: Record<Locale, QuoteCopy> = {
  en: { cta: "Get a quote", k: "Enterprise quote", h: "Tell us about your team.", p: "Share the size of your team and how you work. We will come back with a quote shaped around your sites, roles and rollout.",
    name: "Full name", email: "Work email", company: "Company", size: "Number of users", sizes: ["30 to 50", "51 to 100", "101 to 250", "More than 250"],
    sector: "Industry", sectors: ["Restaurant and café", "Manufacturing", "Hotel", "Franchise", "Other"], sites: "Number of locations", msg: "What would you like to train first?", msgPh: "For example: opening routine in 12 branches, machine changeover on two lines",
    send: "Request a quote", alt: "Or book a call", note: "Sending opens your email app with this message ready to go.", subject: "Enterprise quote request",
    bullets: ["Pricing set to your user count", "Rollout planned with you", "One contract for every site"] },
  tr: { cta: "Teklif alın", k: "Enterprise teklif", h: "Ekibinizi bize anlatın.", p: "Ekibinizin büyüklüğünü ve nasıl çalıştığınızı paylaşın. Şubelerinize, rollerinize ve yayılım planınıza göre şekillenmiş bir teklifle dönelim.",
    name: "Ad soyad", email: "İş e-postası", company: "Şirket", size: "Kullanıcı sayısı", sizes: ["30 ile 50 arası", "51 ile 100 arası", "101 ile 250 arası", "250'den fazla"],
    sector: "Sektör", sectors: ["Restoran ve kafe", "Üretim", "Otel", "Franchise", "Diğer"], sites: "Lokasyon sayısı", msg: "İlk olarak hangi işi öğretmek istersiniz?", msgPh: "Örneğin: 12 şubede açılış rutini, iki hatta kalıp değişimi",
    send: "Teklif isteyin", alt: "Ya da görüşme planlayın", note: "Gönder'e bastığınızda e-posta uygulamanız bu mesajla hazır açılır.", subject: "Enterprise teklif talebi",
    bullets: ["Kullanıcı sayınıza göre fiyat", "Yayılımı sizinle planlarız", "Tüm şubeler için tek sözleşme"] },
  de: { cta: "Angebot anfordern", k: "Enterprise-Angebot", h: "Erzählen Sie uns von Ihrem Team.", p: "Teilen Sie uns die Größe Ihres Teams und Ihre Arbeitsweise mit. Wir melden uns mit einem Angebot, das zu Ihren Standorten, Rollen und Ihrem Rollout passt.",
    name: "Vollständiger Name", email: "Geschäftliche E-Mail", company: "Unternehmen", size: "Anzahl der Nutzer", sizes: ["30 bis 50", "51 bis 100", "101 bis 250", "Mehr als 250"],
    sector: "Branche", sectors: ["Restaurant und Café", "Produktion", "Hotel", "Franchise", "Andere"], sites: "Anzahl der Standorte", msg: "Was möchten Sie zuerst schulen?", msgPh: "Zum Beispiel: Öffnungsroutine in 12 Filialen, Formwechsel an zwei Linien",
    send: "Angebot anfragen", alt: "Oder Termin buchen", note: "Beim Senden öffnet sich Ihr E-Mail-Programm mit dieser Nachricht.", subject: "Anfrage Enterprise-Angebot",
    bullets: ["Preis nach Ihrer Nutzerzahl", "Rollout gemeinsam geplant", "Ein Vertrag für alle Standorte"] },
  ar: { cta: "اطلب عرض سعر", k: "عرض سعر للمؤسسات", h: "أخبرنا عن فريقك.", p: "شاركنا حجم فريقك وطريقة عملك. سنعود إليك بعرض سعر مصمم حسب مواقعك وأدوارك وخطة الإطلاق.",
    name: "الاسم الكامل", email: "البريد الإلكتروني للعمل", company: "الشركة", size: "عدد المستخدمين", sizes: ["من 30 إلى 50", "من 51 إلى 100", "من 101 إلى 250", "أكثر من 250"],
    sector: "القطاع", sectors: ["مطعم ومقهى", "تصنيع", "فندق", "امتياز تجاري", "أخرى"], sites: "عدد المواقع", msg: "ما الذي تريد تدريبه أولًا؟", msgPh: "مثال: روتين الافتتاح في 12 فرعًا، تغيير القوالب على خطين",
    send: "اطلب عرض السعر", alt: "أو احجز مكالمة", note: "عند الإرسال يُفتح تطبيق البريد لديك مع هذه الرسالة جاهزة.", subject: "طلب عرض سعر للمؤسسات",
    bullets: ["سعر حسب عدد المستخدمين", "نخطط للإطلاق معك", "عقد واحد لكل المواقع"] },
  es: { cta: "Pedir presupuesto", k: "Presupuesto Enterprise", h: "Cuéntenos sobre su equipo.", p: "Indique el tamaño de su equipo y cómo trabajan. Le enviaremos un presupuesto adaptado a sus locales, roles y despliegue.",
    name: "Nombre completo", email: "Correo de trabajo", company: "Empresa", size: "Número de usuarios", sizes: ["De 30 a 50", "De 51 a 100", "De 101 a 250", "Más de 250"],
    sector: "Sector", sectors: ["Restaurante y cafetería", "Fabricación", "Hotel", "Franquicia", "Otro"], sites: "Número de locales", msg: "¿Qué le gustaría formar primero?", msgPh: "Por ejemplo: rutina de apertura en 12 locales, cambio de molde en dos líneas",
    send: "Solicitar presupuesto", alt: "O reserve una llamada", note: "Al enviar se abre su aplicación de correo con este mensaje listo.", subject: "Solicitud de presupuesto Enterprise",
    bullets: ["Precio según su número de usuarios", "Despliegue planificado con usted", "Un contrato para todos los locales"] },
  ru: { cta: "Запросить предложение", k: "Предложение Enterprise", h: "Расскажите о своей команде.", p: "Сообщите размер команды и как вы работаете. Мы вернёмся с предложением под ваши площадки, роли и план внедрения.",
    name: "Имя и фамилия", email: "Рабочий e-mail", company: "Компания", size: "Число пользователей", sizes: ["От 30 до 50", "От 51 до 100", "От 101 до 250", "Более 250"],
    sector: "Отрасль", sectors: ["Ресторан и кафе", "Производство", "Отель", "Франшиза", "Другое"], sites: "Число площадок", msg: "Чему вы хотите обучить в первую очередь?", msgPh: "Например: открытие смены в 12 филиалах, смена пресс-формы на двух линиях",
    send: "Запросить предложение", alt: "Или запланируйте звонок", note: "При отправке откроется ваша почта с готовым письмом.", subject: "Запрос предложения Enterprise",
    bullets: ["Цена по числу пользователей", "Внедрение планируем вместе", "Один договор для всех площадок"] },
  fr: { cta: "Demander un devis", k: "Devis Enterprise", h: "Parlez-nous de votre équipe.", p: "Indiquez la taille de votre équipe et votre façon de travailler. Nous reviendrons avec un devis adapté à vos sites, vos rôles et votre déploiement.",
    name: "Nom complet", email: "E-mail professionnel", company: "Entreprise", size: "Nombre d'utilisateurs", sizes: ["De 30 à 50", "De 51 à 100", "De 101 à 250", "Plus de 250"],
    sector: "Secteur", sectors: ["Restaurant et café", "Industrie", "Hôtel", "Franchise", "Autre"], sites: "Nombre de sites", msg: "Que souhaitez-vous former en premier ?", msgPh: "Par exemple : routine d'ouverture dans 12 restaurants, changement de moule sur deux lignes",
    send: "Demander le devis", alt: "Ou réservez un appel", note: "L'envoi ouvre votre messagerie avec ce message prêt à partir.", subject: "Demande de devis Enterprise",
    bullets: ["Prix selon votre nombre d'utilisateurs", "Déploiement planifié avec vous", "Un contrat pour tous les sites"] },
  pl: { cta: "Poproś o wycenę", k: "Wycena Enterprise", h: "Opowiedz nam o swoim zespole.", p: "Podaj wielkość zespołu i sposób pracy. Wrócimy z wyceną dopasowaną do Twoich lokalizacji, ról i planu wdrożenia.",
    name: "Imię i nazwisko", email: "Służbowy e-mail", company: "Firma", size: "Liczba użytkowników", sizes: ["Od 30 do 50", "Od 51 do 100", "Od 101 do 250", "Ponad 250"],
    sector: "Branża", sectors: ["Restauracja i kawiarnia", "Produkcja", "Hotel", "Franczyza", "Inna"], sites: "Liczba lokalizacji", msg: "Czego chcesz nauczyć najpierw?", msgPh: "Na przykład: otwarcie zmiany w 12 oddziałach, zmiana formy na dwóch liniach",
    send: "Poproś o wycenę", alt: "Lub umów rozmowę", note: "Wysłanie otworzy Twoją pocztę z gotową wiadomością.", subject: "Prośba o wycenę Enterprise",
    bullets: ["Cena według liczby użytkowników", "Wdrożenie planujemy razem", "Jedna umowa dla wszystkich lokalizacji"] },
};
