// Strings for the restructured home page (8 sections). Same 8 locales as the main dictionaries.
// steps: one timeline in five moves, each [title, text]: manager films, splits and publishes; the team watches, then takes the quiz; the manager sees who is ready. roles: [manager, team member]. Step 4 carries what used to be "Keep your standard",
// "Workspaces" and "Who it is for"; step 5 carries "Completion" and "Flexlore Web".
// web: the manager web panel block (status "soon" in components/features/data.ts; drop the chip when it ships).
// sectors: one tab per industry, [role sentence, three examples]. Only capabilities the product has today.
import type { Locale } from "./locales";
type Tab = [string, [string, string, string]];
type H = { steps: [string, string][]; roles: [string, string]; tabs: [Tab, Tab, Tab, Tab]; go: string;
  web: { k: string; h: string; h2: string; p: string; points: [string, string, string]; go: string; soon: string } };
export const HOME2: Record<Locale, H> = {
  en: {
    steps: [
      ["Film the job", "Your best person records the job on a phone, where it happens. No studio, no script."],
      ["Split it and publish", "Cut the video into steps in the editor. AI drafts the instructions and a quiz; you approve and assign by role and location."],
      ["Watches step by step", "Your team watches on their own phone, in their own language, and replays any step."],
      ["Takes the quiz", "Once every step is watched, a short quiz opens. The result goes straight to the manager."],
      ["Track who is ready", "See who watched each job and passed its quiz, by person, shift and location, and which locations need you next."],
    ],
    roles: ["Manager", "Team member"],
    tabs: [
      ["The chef films it once. Every cook follows the same steps at the station.", ["Recipes and plating, the same in every branch", "Opening and closing routines", "Hygiene and allergen steps"]],
      ["Your best operator's way of working becomes the standard on every shift.", ["Health and safety on video: PPE, lockout, machine checks", "Machine changeover and daily start-up", "Master to apprentice skills transfer"]],
      ["Housekeeping and front desk work to your house standard in every room.", ["Housekeeping room turn", "Front desk check-in", "New-hire onboarding without shadowing"]],
      ["Head office launches a process once and compares completion by location.", ["One standard across every location", "New menu and product launches", "Store opening checklist"]],
    ],
    go: "Explore the industry", web: { k: "Web panel", h: "Your team learns on the phone.", h2: "You run it from the desk.", p: "Build the library, assign jobs and see who is ready, by person, team and site.", points: ["Library and assignments in one place", "Readiness by person, team and site", "The question people miss most"], go: "See the web panel", soon: "Coming soon" },
  },
  tr: {
    steps: [
      ["İşi çekin", "En iyi çalışanınız işi, yapıldığı yerde telefonla kaydeder. Stüdyo yok, senaryo yok."],
      ["Adımlara bölün, yayınlayın", "Editörde videoyu adımlara bölün. Yapay zekâ talimatları ve quizi taslak olarak hazırlar; siz onaylayıp role ve şubeye atarsınız."],
      ["Adım adım izler", "Personel işi kendi telefonunda, kendi dilinde adım adım izler; istediği adımı tekrar açar."],
      ["Quizi çözer", "Tüm adımlar izlendikten sonra kısa quiz açılır. Sonuç doğrudan yöneticiye gider."],
      ["Kimin hazır olduğunu takip edin", "Her işi kimin izlediğini ve quizini geçtiğini kişi, vardiya ve şube bazında görün; hangi şubenin size ihtiyacı olduğunu bilin."],
    ],
    roles: ["Yönetici", "Personel"],
    tabs: [
      ["Şef işi bir kez çeker. Her aşçı istasyonda aynı adımları izler.", ["Her şubede aynı tarif ve sunum", "Açılış ve kapanış rutinleri", "Hijyen ve alerjen adımları"]],
      ["En iyi operatörünüzün yöntemi her vardiyanın standardı olur.", ["Video ile iş sağlığı ve güvenliği: KKD, kilitleme, makine kontrolleri", "Kalıp değişimi ve günlük devreye alma", "Ustadan çırağa beceri aktarımı"]],
      ["Kat hizmetleri ve ön büro her odada sizin standardınızla çalışır.", ["Oda hazırlığı", "Ön büroda giriş işlemi", "Yanında dolaştırmadan işe başlatma"]],
      ["Merkez bir süreci bir kez hazırlar, tamamlanmayı şube bazında karşılaştırır.", ["Tüm şubelerde tek standart", "Yeni menü ve ürün lansmanı", "Mağaza açılış kontrolü"]],
    ],
    go: "Sektör sayfasını inceleyin", web: { k: "Web paneli", h: "Ekip telefonda öğrenir.", h2: "Siz masadan yönetirsiniz.", p: "Kütüphaneyi kurun, işleri atayın, kimin hazır olduğunu kişi, ekip ve şube bazında görün.", points: ["Kütüphane ve atamalar tek yerde", "Kişi, ekip ve şube bazında hazırlık", "En çok kaçırılan soru"], go: "Web panelini inceleyin", soon: "Yakında" },
  },
  de: {
    steps: [
      ["Aufgabe filmen", "Ihre beste Fachkraft filmt die Aufgabe mit dem Handy, direkt vor Ort. Kein Studio, kein Skript."],
      ["Teilen und veröffentlichen", "Teilen Sie das Video im Editor in Schritte. Die KI entwirft Anleitungen und ein Quiz; Sie geben frei und weisen nach Rolle und Standort zu."],
      ["Schaut Schritt für Schritt", "Ihr Team schaut auf dem eigenen Handy, in der eigenen Sprache, und wiederholt jeden Schritt nach Bedarf."],
      ["Macht das Quiz", "Sind alle Schritte angesehen, öffnet sich ein kurzes Quiz. Das Ergebnis geht direkt an die Führungskraft."],
      ["Sehen, wer bereit ist", "Sehen Sie, wer jede Aufgabe angesehen und ihr Quiz bestanden hat, nach Person, Schicht und Standort, und welcher Standort Sie als Nächstes braucht."],
    ],
    roles: ["Führungskraft", "Mitarbeitende"],
    tabs: [
      ["Die Küchenchefin filmt es einmal. Jede Köchin, jeder Koch folgt am Posten denselben Schritten.", ["Rezepte und Anrichten, in jeder Filiale gleich", "Öffnungs- und Schließroutinen", "Hygiene- und Allergenschritte"]],
      ["Die Arbeitsweise Ihrer besten Fachkraft wird zum Standard jeder Schicht.", ["Arbeitsschutz per Video: PSA, Lockout, Maschinenchecks", "Rüsten und täglicher Anlauf", "Wissenstransfer vom Meister zum Lehrling"]],
      ["Housekeeping und Rezeption arbeiten in jedem Zimmer nach Ihrem Hausstandard.", ["Zimmerreinigung", "Check-in an der Rezeption", "Einarbeitung ohne Mitlaufen"]],
      ["Die Zentrale startet einen Ablauf einmal und vergleicht Abschlüsse nach Standort.", ["Ein Standard für alle Standorte", "Neue Menüs und Produkte einführen", "Checkliste zur Filialöffnung"]],
    ],
    go: "Zur Branchenseite", web: { k: "Web-Panel", h: "Ihr Team lernt am Handy.", h2: "Sie steuern vom Schreibtisch.", p: "Bauen Sie die Bibliothek auf, weisen Sie Aufgaben zu und sehen Sie, wer bereit ist: nach Person, Team und Standort.", points: ["Bibliothek und Zuweisungen an einem Ort", "Einsatzbereitschaft nach Person, Team und Standort", "Die am häufigsten verpasste Frage"], go: "Web-Panel ansehen", soon: "Bald" },
  },
  ar: {
    steps: [
      ["صوّر المهمة", "يسجّل أفضل موظفيك المهمة بالهاتف في مكان أدائها. لا حاجة إلى استوديو أو نص مكتوب."],
      ["قسّمه وانشره", "قسّم الفيديو إلى خطوات في المحرر. يصوغ الذكاء الاصطناعي التعليمات واختبارًا قصيرًا، ثم تعتمدها وتسندها حسب الدور والموقع."],
      ["يشاهد خطوة بخطوة", "يشاهد فريقك على هاتفه وبلغته، ويعيد أي خطوة متى شاء."],
      ["يجيب عن الاختبار", "بعد مشاهدة جميع الخطوات يُفتح اختبار قصير، وتصل النتيجة مباشرة إلى المدير."],
      ["تابع من أصبح جاهزًا", "اعرف من شاهد كل مهمة واجتاز اختبارها حسب الشخص والمناوبة والموقع، وأي المواقع تحتاجك أولًا."],
    ],
    roles: ["المدير", "الموظف"],
    tabs: [
      ["يصوّر الطاهي المهمة مرة واحدة، ويتبع كل طاهٍ الخطوات نفسها في محطته.", ["الوصفة والتقديم نفسهما في كل فرع", "روتين الافتتاح والإغلاق", "خطوات النظافة ومسببات الحساسية"]],
      ["تصبح طريقة عمل أفضل مشغّل لديك معيار كل مناوبة.", ["الصحة والسلامة بالفيديو: معدات الوقاية والعزل وفحص الآلات", "تغيير القوالب والتشغيل اليومي", "نقل المهارة من المعلّم إلى المتدرّب"]],
      ["يعمل فريق الإشراف الداخلي والاستقبال وفق معيارك في كل غرفة.", ["تجهيز الغرفة", "تسجيل الوصول في الاستقبال", "تأهيل الموظف الجديد دون مرافقة"]],
      ["يطلق المقر الرئيسي العملية مرة واحدة ويقارن الإكمال حسب الموقع.", ["معيار واحد في كل المواقع", "إطلاق قائمة أو منتج جديد", "قائمة فحص افتتاح الفرع"]],
    ],
    go: "استكشف صفحة القطاع", web: { k: "لوحة الويب", h: "فريقك يتعلم على الهاتف.", h2: "وأنت تدير من المكتب.", p: "أنشئ المكتبة، ووزّع المهام، واعرف من هو جاهز حسب الشخص والفريق والموقع.", points: ["المكتبة والمهام في مكان واحد", "الجاهزية حسب الشخص والفريق والموقع", "السؤال الذي يُخطئ فيه الفريق أكثر"], go: "تعرّف على لوحة الويب", soon: "قريبًا" },
  },
  es: {
    steps: [
      ["Grabe la tarea", "Su mejor profesional graba la tarea con el móvil, en el lugar donde se realiza. Sin estudio ni guion."],
      ["Divídalo y publíquelo", "Divida el vídeo en pasos en el editor. La IA redacta las instrucciones y un cuestionario; usted aprueba y asigna por puesto y ubicación."],
      ["Lo ve paso a paso", "Su equipo lo ve en su propio móvil, en su idioma, y repite cualquier paso."],
      ["Responde el cuestionario", "Cuando ha visto todos los pasos, se abre un cuestionario corto. El resultado llega directamente al responsable."],
      ["Vea quién está listo", "Vea quién vio cada tarea y aprobó su cuestionario, por persona, turno y ubicación, y qué ubicación le necesita primero."],
    ],
    roles: ["Responsable", "Empleado"],
    tabs: [
      ["El chef la graba una vez. Cada cocinero sigue los mismos pasos en su puesto.", ["Recetas y emplatado, iguales en cada local", "Rutinas de apertura y cierre", "Pasos de higiene y alérgenos"]],
      ["La forma de trabajar de su mejor operario se convierte en el estándar de cada turno.", ["Seguridad y salud en video: EPI, bloqueo, revisión de máquinas", "Cambio de formato y arranque diario", "Transmisión de oficio de maestro a aprendiz"]],
      ["Pisos y recepción trabajan con su estándar en cada habitación.", ["Preparación de habitaciones", "Check-in en recepción", "Incorporación sin acompañamiento constante"]],
      ["La central lanza un proceso una vez y compara la finalización por ubicación.", ["Un estándar en todas las ubicaciones", "Lanzamiento de menús y productos", "Lista de apertura de tienda"]],
    ],
    go: "Ver la página del sector", web: { k: "Panel web", h: "Su equipo aprende en el móvil.", h2: "Usted lo gestiona desde la oficina.", p: "Cree la biblioteca, asigne tareas y vea quién está listo, por persona, equipo y sede.", points: ["Biblioteca y asignaciones en un solo lugar", "Preparación por persona, equipo y sede", "La pregunta que más se falla"], go: "Ver el panel web", soon: "Pronto" },
  },
  ru: {
    steps: [
      ["Снимите работу", "Ваш лучший сотрудник записывает работу на телефон прямо на месте. Без студии и сценария."],
      ["Разбейте и опубликуйте", "Разбейте видео на шаги в редакторе. ИИ готовит черновик инструкций и теста; вы утверждаете и назначаете по роли и локации."],
      ["Смотрит шаг за шагом", "Сотрудник смотрит на своём телефоне, на своём языке, и повторяет любой шаг."],
      ["Проходит тест", "Когда все шаги просмотрены, открывается короткий тест. Результат сразу уходит руководителю."],
      ["Следите, кто готов", "Смотрите, кто посмотрел каждую работу и сдал тест, по сотрудникам, сменам и точкам, и какой точке вы нужны в первую очередь."],
    ],
    roles: ["Руководитель", "Сотрудник"],
    tabs: [
      ["Шеф снимает один раз. Каждый повар выполняет те же шаги на своей станции.", ["Рецепты и подача, одинаковые в каждом заведении", "Открытие и закрытие смены", "Гигиена и аллергены"]],
      ["Метод вашего лучшего оператора становится стандартом каждой смены.", ["Охрана труда на видео: СИЗ, блокировка, проверка станков", "Переналадка и ежедневный пуск", "Передача навыков от мастера ученику"]],
      ["Хаускипинг и ресепшен работают по вашему стандарту в каждом номере.", ["Уборка номера", "Заселение на ресепшене", "Адаптация новичков без постоянного сопровождения"]],
      ["Головной офис запускает процесс один раз и сравнивает прохождение по точкам.", ["Один стандарт во всех точках", "Запуск нового меню и продуктов", "Чек-лист открытия точки"]],
    ],
    go: "Страница отрасли", web: { k: "Веб-панель", h: "Команда учится в телефоне.", h2: "Вы управляете с рабочего места.", p: "Создавайте библиотеку, назначайте задачи и смотрите, кто готов, по сотрудникам, командам и точкам.", points: ["Библиотека и назначения в одном месте", "Готовность по сотрудникам, командам и точкам", "Вопрос, в котором ошибаются чаще всего"], go: "Подробнее о веб-панели", soon: "Скоро" },
  },
  fr: {
    steps: [
      ["Filmez la tâche", "Votre meilleur collaborateur filme la tâche au téléphone, sur place. Pas de studio, pas de script."],
      ["Découpez et publiez", "Découpez la vidéo en étapes dans l'éditeur. L'IA rédige les consignes et un quiz ; vous validez et attribuez par rôle et par site."],
      ["Regarde étape par étape", "Votre équipe regarde sur son propre téléphone, dans sa langue, et revoit n'importe quelle étape."],
      ["Répond au quiz", "Une fois toutes les étapes vues, un court quiz s'ouvre. Le résultat part directement au responsable."],
      ["Suivez qui est prêt", "Voyez qui a regardé chaque tâche et réussi son quiz, par personne, équipe et site, et quel site a besoin de vous en premier."],
    ],
    roles: ["Responsable", "Employé"],
    tabs: [
      ["Le chef la filme une fois. Chaque cuisinier suit les mêmes étapes à son poste.", ["Recettes et dressage, identiques dans chaque établissement", "Routines d'ouverture et de fermeture", "Étapes d'hygiène et allergènes"]],
      ["La méthode de votre meilleur opérateur devient le standard de chaque équipe.", ["Santé et sécurité en vidéo : EPI, consignation, contrôles machine", "Changement de série et démarrage quotidien", "Transmission du savoir-faire du maître à l'apprenti"]],
      ["L'étage et la réception travaillent selon votre standard dans chaque chambre.", ["Préparation des chambres", "Check-in à la réception", "Intégration sans accompagnement permanent"]],
      ["Le siège lance un processus une fois et compare la complétion par site.", ["Un standard pour tous les sites", "Lancement de menus et de produits", "Checklist d'ouverture de magasin"]],
    ],
    go: "Voir la page du secteur", web: { k: "Panneau web", h: "Votre équipe apprend sur le téléphone.", h2: "Vous pilotez depuis le bureau.", p: "Créez la bibliothèque, attribuez les tâches et voyez qui est prêt, par personne, équipe et site.", points: ["Bibliothèque et attributions au même endroit", "Préparation par personne, équipe et site", "La question la plus souvent ratée"], go: "Découvrir le panneau web", soon: "Bientôt" },
  },
  pl: {
    steps: [
      ["Nagraj zadanie", "Najlepszy pracownik nagrywa zadanie telefonem tam, gdzie je wykonuje. Bez studia i bez scenariusza."],
      ["Podziel i opublikuj", "Podziel wideo na kroki w edytorze. AI przygotowuje szkic instrukcji i quizu; Ty zatwierdzasz i przypisujesz według roli i lokalizacji."],
      ["Ogląda krok po kroku", "Pracownik ogląda na własnym telefonie, we własnym języku, i powtarza dowolny krok."],
      ["Rozwiązuje quiz", "Po obejrzeniu wszystkich kroków otwiera się krótki quiz. Wynik trafia prosto do kierownika."],
      ["Sprawdzaj, kto jest gotowy", "Zobacz, kto obejrzał każde zadanie i zdał quiz, według osoby, zmiany i lokalizacji, oraz która lokalizacja potrzebuje Cię najpierw."],
    ],
    roles: ["Kierownik", "Pracownik"],
    tabs: [
      ["Szef kuchni nagrywa raz. Każdy kucharz wykonuje te same kroki na stanowisku.", ["Te same receptury i podanie w każdym lokalu", "Rutyny otwarcia i zamknięcia", "Kroki higieny i alergenów"]],
      ["Sposób pracy najlepszego operatora staje się standardem każdej zmiany.", ["BHP na wideo: ŚOI, blokada, kontrola maszyn", "Przezbrojenie i codzienny rozruch", "Przekazywanie umiejętności od mistrza do ucznia"]],
      ["Housekeeping i recepcja pracują według Twojego standardu w każdym pokoju.", ["Przygotowanie pokoju", "Zameldowanie w recepcji", "Wdrożenie bez ciągłego towarzyszenia"]],
      ["Centrala uruchamia proces raz i porównuje ukończenie według lokalizacji.", ["Jeden standard we wszystkich lokalizacjach", "Wprowadzenie nowego menu i produktów", "Lista kontrolna otwarcia sklepu"]],
    ],
    go: "Zobacz stronę branży", web: { k: "Panel webowy", h: "Zespół uczy się na telefonie.", h2: "Ty zarządzasz zza biurka.", p: "Twórz bibliotekę, przydzielaj zadania i sprawdzaj, kto jest gotowy: według osoby, zespołu i lokalizacji.", points: ["Biblioteka i przydziały w jednym miejscu", "Gotowość według osoby, zespołu i lokalizacji", "Pytanie, na którym ludzie mylą się najczęściej"], go: "Zobacz panel webowy", soon: "Wkrótce" },
  },
};
