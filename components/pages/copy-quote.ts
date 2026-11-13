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
  nl: { cta: "Offerte aanvragen", k: "Enterprise-offerte", h: "Vertel ons over uw team.", p: "Laat ons weten hoe groot uw team is en hoe u werkt. We komen terug met een offerte die past bij uw locaties, rollen en uitrol.",
    name: "Volledige naam", email: "Zakelijk e-mailadres", company: "Bedrijf", size: "Aantal gebruikers", sizes: ["30 tot 50", "51 tot 100", "101 tot 250", "Meer dan 250"],
    sector: "Sector", sectors: ["Restaurant en café", "Productie", "Hotel", "Franchise", "Anders"], sites: "Aantal locaties", msg: "Wat wilt u als eerste trainen?", msgPh: "Bijvoorbeeld: openingsroutine in 12 vestigingen, matrijswissel op twee lijnen",
    send: "Offerte aanvragen", alt: "Of plan een gesprek", note: "Bij verzenden opent uw e-mailapp met dit bericht klaar om te versturen.", subject: "Aanvraag Enterprise-offerte",
    bullets: ["Prijs op basis van uw aantal gebruikers", "Uitrol samen met u gepland", "Eén contract voor elke locatie"] },
  pt: { cta: "Pedir orçamento", k: "Orçamento Enterprise", h: "Conte sobre sua equipe.", p: "Informe o tamanho da sua equipe e como vocês trabalham. Voltaremos com um orçamento pensado para suas unidades, funções e implantação.",
    name: "Nome completo", email: "E-mail corporativo", company: "Empresa", size: "Número de usuários", sizes: ["30 a 50", "51 a 100", "101 a 250", "Mais de 250"],
    sector: "Setor", sectors: ["Restaurante e café", "Indústria", "Hotel", "Franquia", "Outro"], sites: "Número de unidades", msg: "O que você gostaria de treinar primeiro?", msgPh: "Por exemplo: rotina de abertura em 12 unidades, setup de máquinas em duas linhas",
    send: "Pedir orçamento", alt: "Ou agende uma chamada", note: "Ao enviar, seu app de e-mail abre com esta mensagem pronta.", subject: "Pedido de orçamento Enterprise",
    bullets: ["Preço conforme o número de usuários", "Implantação planejada com você", "Um contrato para todas as unidades"] },
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
