// Strings for the restructured home page (8 sections). Same 8 locales as the main dictionaries.
// why (chapter 02): what Flexlore is for, told without repeating the other chapters: know-how stays, video not paper, built for the floor.
// steps: one timeline in five moves, told to the business owner ("you" and "your team"), each [title, text]: manager films, splits and publishes; the team watches, then takes the quiz; the manager sees who is ready. roles: [manager, team member]. Step 4 carries what used to be "Keep your standard",
// "Workspaces" and "Who it is for"; step 5 carries "Completion" and "Flexlore Web".
// web: the manager web panel block (status "soon" in components/features/data.ts; drop the chip when it ships).
// sectors: one tab per industry, [role sentence, three examples]. Only capabilities the product has today.
import type { Locale } from "./locales";
type Tab = [string, [string, string, string]];
type H = { steps: [string, string][]; roles: [string, string];
  why: { k: string; h: string; h2: string; lead: string; cards: [string, string][]; a: [string, string]; b: [string, string]; c: [string, string, string] }; tabs: [Tab, Tab, Tab, Tab]; go: string;
  web: { k: string; h: string; h2: string; p: string; points: [string, string, string]; go: string; soon: string } };
export const HOME2: Record<Locale, H> = {
  en: {
    steps: [
      ["Film the job once", "Film your best person doing the job, right where it happens. No studio, no script."],
      ["Split it and publish", "Cut the video into steps in the editor. AI drafts the instructions and a quiz; you approve and assign by role and location."],
      ["Watches step by step", "Your team watches on their own phone, in their own language, and replays any step."],
      ["Takes the quiz", "Once every step is watched, a short quiz opens. The result comes straight to you."],
      ["See who is ready", "See who watched each job and passed its quiz, by person, shift and location, and know first which location needs you."],
    ],
    roles: ["You", "Your team"],
    why: { k: "Why Flexlore", h: "Know-how stays with the company,", h2: "not with one person.", lead: "Flexlore records how your best person does the job, on a phone video, and teaches every new hire the same way. Built for teams who work on the floor, not at a desk.",
      cards: [["Expertise stays with you", "Your best person's method is recorded once. Whether they are on leave or move on, the know-how stays."], ["Video instead of paper", "Short steps watched at the job, instead of manuals nobody reads."], ["Built for the floor", "Filmed on a phone, watched on a phone. Made for teams who are not at a computer."]],
      a: ["Your expert's method", "Your company standard"], b: ["Paper manual", "Short video steps"], c: ["On the phone", "In their language", "At the job"] },
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
      ["İşi bir kez çekin", "İşi en iyi yapan kişiyi, işin yapıldığı yerde telefonla çekin. Stüdyo da senaryo da gerekmez."],
      ["Adımlara bölün, ekibe gönderin", "Editörde videoyu adımlara ayırın. Yapay zekâ talimatları ve quizi taslak olarak hazırlar; siz onaylar, role ve şubeye göre atarsınız."],
      ["Adım adım izler", "Ekibiniz işi kendi telefonunda, kendi dilinde izler; takıldığı adımı yeniden açar."],
      ["Quizi çözer", "Tüm adımlar izlenince kısa bir quiz açılır. Sonuç doğrudan size gelir."],
      ["Kimin hazır olduğunu görün", "Kimin izlediğini ve quizi geçtiğini kişi, vardiya ve şube bazında görün. Hangi şubenin size ihtiyacı olduğunu ilk siz bilin."],
    ],
    roles: ["Siz", "Ekibiniz"],
    why: { k: "Neden Flexlore", h: "Bilgi kişide değil,", h2: "şirkette kalsın.", lead: "Flexlore, işi en iyi yapan kişinin yöntemini telefon videosuyla kayda alır ve her yeni çalışana aynı şekilde öğretir. Masa başında değil, sahada çalışan ekipler için yapıldı.",
      cards: [["Ustalık şirkette kalır", "En iyi çalışanınızın yöntemi bir kez kaydedilir. O kişi izne çıksa da ayrılsa da bilgi sizde kalır."], ["Kâğıt yerine video", "Kimsenin okumadığı kılavuzlar yerine, işin başında izlenen kısa adımlar."], ["Saha için yapıldı", "Telefonla çekilir, telefonda izlenir. Bilgisayar başında olmayan ekipler için tasarlandı."]],
      a: ["Ustanın yöntemi", "Şirketin standardı"], b: ["Kâğıt kılavuz", "Kısa video adımları"], c: ["Telefonda", "Kendi dilinde", "İşin başında"] },
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
      ["Aufgabe einmal filmen", "Filmen Sie Ihre beste Fachkraft bei der Aufgabe, direkt vor Ort. Kein Studio, kein Skript."],
      ["Teilen und verteilen", "Teilen Sie das Video im Editor in Schritte. Die KI entwirft Anleitungen und ein Quiz; Sie geben frei und weisen nach Rolle und Standort zu."],
      ["Schaut Schritt für Schritt", "Ihr Team schaut auf dem eigenen Handy, in der eigenen Sprache, und wiederholt jeden Schritt nach Bedarf."],
      ["Macht das Quiz", "Sind alle Schritte angesehen, öffnet sich ein kurzes Quiz. Das Ergebnis kommt direkt zu Ihnen."],
      ["Sehen, wer bereit ist", "Sehen Sie, wer jede Aufgabe angesehen und das Quiz bestanden hat, nach Person, Schicht und Standort, und wissen Sie zuerst, welcher Standort Sie braucht."],
    ],
    roles: ["Sie", "Ihr Team"],
    why: { k: "Warum Flexlore", h: "Wissen bleibt im Unternehmen,", h2: "nicht bei einer Person.", lead: "Flexlore hält per Handyvideo fest, wie Ihre beste Fachkraft die Aufgabe erledigt, und bringt sie jeder neuen Person gleich bei. Gemacht für Teams, die vor Ort arbeiten, nicht am Schreibtisch.",
      cards: [["Know-how bleibt bei Ihnen", "Die Methode Ihrer besten Fachkraft wird einmal aufgenommen. Ob Urlaub oder Wechsel: Das Wissen bleibt."], ["Video statt Papier", "Kurze Schritte, direkt bei der Arbeit angesehen, statt Handbücher, die niemand liest."], ["Gemacht für vor Ort", "Mit dem Handy gefilmt, auf dem Handy angesehen. Für Teams, die nicht am Computer sitzen."]],
      a: ["Methode der Fachkraft", "Standard des Unternehmens"], b: ["Papierhandbuch", "Kurze Videoschritte"], c: ["Am Handy", "In der eigenen Sprache", "Direkt bei der Arbeit"] },
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
      ["صوّر المهمة مرة واحدة", "صوّر أفضل موظفيك بالهاتف وهو يؤدي المهمة في مكانها. لا حاجة إلى استوديو أو نص مكتوب."],
      ["قسّمها وأرسلها", "قسّم الفيديو إلى خطوات في المحرر. يصوغ الذكاء الاصطناعي التعليمات واختبارًا قصيرًا، ثم تعتمدها وتسندها حسب الدور والموقع."],
      ["يشاهد خطوة بخطوة", "يشاهد فريقك على هاتفه وبلغته، ويعيد أي خطوة متى شاء."],
      ["يجيب عن الاختبار", "بعد مشاهدة جميع الخطوات يُفتح اختبار قصير، وتصلك النتيجة مباشرة."],
      ["اعرف من أصبح جاهزًا", "اعرف من شاهد كل مهمة واجتاز اختبارها حسب الشخص والمناوبة والموقع، وكن أول من يعرف أي موقع يحتاجك."],
    ],
    roles: ["أنت", "فريقك"],
    why: { k: "لماذا Flexlore", h: "تبقى الخبرة في الشركة،", h2: "لا عند شخص واحد.", lead: "يسجّل Flexlore بفيديو من الهاتف طريقة أفضل موظفيك في أداء المهمة، ويعلّمها لكل موظف جديد بالطريقة نفسها. صُمّم للفرق التي تعمل في الميدان، لا خلف المكاتب.",
      cards: [["الخبرة تبقى لديك", "تُسجَّل طريقة أفضل موظفيك مرة واحدة. سواء كان في إجازة أو غادر، تبقى المعرفة."], ["فيديو بدل الورق", "خطوات قصيرة تُشاهَد في موقع العمل بدل أدلة لا يقرؤها أحد."], ["صُمّم للميدان", "يُصوَّر بالهاتف ويُشاهَد على الهاتف. للفرق التي لا تعمل أمام الحاسوب."]],
      a: ["طريقة الخبير", "معيار الشركة"], b: ["دليل ورقي", "خطوات فيديو قصيرة"], c: ["على الهاتف", "بلغته", "في موقع العمل"] },
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
      ["Grabe la tarea una vez", "Grabe con el móvil a su mejor profesional haciendo la tarea, donde se realiza. Sin estudio ni guion."],
      ["Divídala y envíela", "Divida el vídeo en pasos en el editor. La IA redacta las instrucciones y un cuestionario; usted aprueba y asigna por puesto y ubicación."],
      ["Lo ve paso a paso", "Su equipo lo ve en su propio móvil, en su idioma, y repite cualquier paso."],
      ["Responde el cuestionario", "Cuando ha visto todos los pasos, se abre un cuestionario corto. El resultado le llega directamente a usted."],
      ["Vea quién está listo", "Vea quién vio cada tarea y aprobó su cuestionario, por persona, turno y ubicación, y sepa primero qué ubicación le necesita."],
    ],
    roles: ["Usted", "Su equipo"],
    why: { k: "Por qué Flexlore", h: "El conocimiento se queda en la empresa,", h2: "no en una persona.", lead: "Flexlore graba con el móvil cómo su mejor profesional hace la tarea y la enseña igual a cada nueva incorporación. Hecho para equipos que trabajan en planta, no en una oficina.",
      cards: [["La experiencia se queda con usted", "El método de su mejor profesional se graba una vez. Aunque esté de vacaciones o se vaya, el conocimiento se queda."], ["Vídeo en lugar de papel", "Pasos cortos que se ven en el puesto, en lugar de manuales que nadie lee."], ["Hecho para el terreno", "Se graba con el móvil y se ve en el móvil. Pensado para equipos que no están frente a un ordenador."]],
      a: ["Método del experto", "Estándar de la empresa"], b: ["Manual en papel", "Pasos cortos en vídeo"], c: ["En el móvil", "En su idioma", "En el puesto"] },
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
      ["Снимите работу один раз", "Снимите на телефон, как лучший сотрудник выполняет работу, прямо на месте. Без студии и сценария."],
      ["Разбейте и отправьте", "Разбейте видео на шаги в редакторе. ИИ готовит черновик инструкций и теста; вы утверждаете и назначаете по роли и локации."],
      ["Смотрит шаг за шагом", "Команда смотрит на своих телефонах, на своём языке, и повторяет любой шаг."],
      ["Проходит тест", "Когда все шаги просмотрены, открывается короткий тест. Результат сразу приходит вам."],
      ["Смотрите, кто готов", "Смотрите, кто посмотрел каждую работу и сдал тест, по сотрудникам, сменам и точкам, и первыми узнавайте, какой точке вы нужны."],
    ],
    roles: ["Вы", "Ваша команда"],
    why: { k: "Почему Flexlore", h: "Знания остаются в компании,", h2: "а не у одного человека.", lead: "Flexlore записывает на видео с телефона, как ваш лучший сотрудник выполняет работу, и одинаково обучает каждого новичка. Создан для команд, которые работают на площадке, а не за столом.",
      cards: [["Опыт остаётся у вас", "Метод вашего лучшего сотрудника записывается один раз. В отпуске он или ушёл, знания остаются."], ["Видео вместо бумаги", "Короткие шаги, которые смотрят прямо на рабочем месте, вместо инструкций, которые никто не читает."], ["Создан для площадки", "Снимается на телефон, смотрится на телефоне. Для команд, которые не сидят за компьютером."]],
      a: ["Метод мастера", "Стандарт компании"], b: ["Бумажная инструкция", "Короткие видеошаги"], c: ["В телефоне", "На своём языке", "На рабочем месте"] },
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
      ["Filmez la tâche une fois", "Filmez au téléphone votre meilleur collaborateur en train de faire la tâche, sur place. Pas de studio, pas de script."],
      ["Découpez et diffusez", "Découpez la vidéo en étapes dans l'éditeur. L'IA rédige les consignes et un quiz ; vous validez et attribuez par rôle et par site."],
      ["Regarde étape par étape", "Votre équipe regarde sur son propre téléphone, dans sa langue, et revoit n'importe quelle étape."],
      ["Répond au quiz", "Une fois toutes les étapes vues, un court quiz s'ouvre. Le résultat vous arrive directement."],
      ["Voyez qui est prêt", "Voyez qui a regardé chaque tâche et réussi son quiz, par personne, équipe et site, et sachez en premier quel site a besoin de vous."],
    ],
    roles: ["Vous", "Votre équipe"],
    why: { k: "Pourquoi Flexlore", h: "Le savoir-faire reste dans l'entreprise,", h2: "pas chez une seule personne.", lead: "Flexlore enregistre en vidéo, au téléphone, la façon dont votre meilleur collaborateur fait la tâche, puis l'enseigne de la même façon à chaque nouvel arrivant. Conçu pour les équipes de terrain, pas de bureau.",
      cards: [["Le savoir-faire vous reste", "La méthode de votre meilleur collaborateur est filmée une fois. Congé ou départ, le savoir-faire reste."], ["La vidéo plutôt que le papier", "De courtes étapes vues au poste, plutôt que des manuels que personne ne lit."], ["Conçu pour le terrain", "Filmé au téléphone, regardé au téléphone. Pensé pour les équipes qui ne sont pas devant un ordinateur."]],
      a: ["Méthode de l'expert", "Standard de l'entreprise"], b: ["Manuel papier", "Courtes étapes vidéo"], c: ["Sur le téléphone", "Dans sa langue", "Au poste"] },
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
      ["Nagraj zadanie raz", "Nagraj telefonem najlepszego pracownika przy pracy, tam gdzie ją wykonuje. Bez studia i bez scenariusza."],
      ["Podziel i wyślij", "Podziel wideo na kroki w edytorze. AI przygotowuje szkic instrukcji i quizu; Ty zatwierdzasz i przypisujesz według roli i lokalizacji."],
      ["Ogląda krok po kroku", "Zespół ogląda na własnych telefonach, we własnym języku, i powtarza dowolny krok."],
      ["Rozwiązuje quiz", "Po obejrzeniu wszystkich kroków otwiera się krótki quiz. Wynik trafia prosto do Ciebie."],
      ["Sprawdzaj, kto jest gotowy", "Zobacz, kto obejrzał każde zadanie i zdał quiz, według osoby, zmiany i lokalizacji, i jako pierwszy wiedz, która lokalizacja Cię potrzebuje."],
    ],
    roles: ["Ty", "Twój zespół"],
    why: { k: "Dlaczego Flexlore", h: "Wiedza zostaje w firmie,", h2: "a nie u jednej osoby.", lead: "Flexlore nagrywa telefonem, jak Twój najlepszy pracownik wykonuje zadanie, i uczy go tak samo każdą nową osobę. Stworzony dla zespołów pracujących w terenie, nie przy biurku.",
      cards: [["Doświadczenie zostaje u Ciebie", "Metoda najlepszego pracownika jest nagrywana raz. Urlop czy odejście, wiedza zostaje."], ["Wideo zamiast papieru", "Krótkie kroki oglądane przy pracy zamiast instrukcji, których nikt nie czyta."], ["Stworzony do pracy w terenie", "Nagrywany telefonem, oglądany na telefonie. Dla zespołów, które nie siedzą przy komputerze."]],
      a: ["Metoda eksperta", "Standard firmy"], b: ["Instrukcja papierowa", "Krótkie kroki wideo"], c: ["Na telefonie", "W swoim języku", "Przy pracy"] },
    tabs: [
      ["Szef kuchni nagrywa raz. Każdy kucharz wykonuje te same kroki na stanowisku.", ["Te same receptury i podanie w każdym lokalu", "Rutyny otwarcia i zamknięcia", "Kroki higieny i alergenów"]],
      ["Sposób pracy najlepszego operatora staje się standardem każdej zmiany.", ["BHP na wideo: ŚOI, blokada, kontrola maszyn", "Przezbrojenie i codzienny rozruch", "Przekazywanie umiejętności od mistrza do ucznia"]],
      ["Housekeeping i recepcja pracują według Twojego standardu w każdym pokoju.", ["Przygotowanie pokoju", "Zameldowanie w recepcji", "Wdrożenie bez ciągłego towarzyszenia"]],
      ["Centrala uruchamia proces raz i porównuje ukończenie według lokalizacji.", ["Jeden standard we wszystkich lokalizacjach", "Wprowadzenie nowego menu i produktów", "Lista kontrolna otwarcia sklepu"]],
    ],
    go: "Zobacz stronę branży", web: { k: "Panel webowy", h: "Zespół uczy się na telefonie.", h2: "Ty zarządzasz zza biurka.", p: "Twórz bibliotekę, przydzielaj zadania i sprawdzaj, kto jest gotowy: według osoby, zespołu i lokalizacji.", points: ["Biblioteka i przydziały w jednym miejscu", "Gotowość według osoby, zespołu i lokalizacji", "Pytanie, na którym ludzie mylą się najczęściej"], go: "Zobacz panel webowy", soon: "Wkrótce" },
  },
};
