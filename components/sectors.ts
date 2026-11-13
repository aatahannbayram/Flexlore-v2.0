export type Sop = { t: string; steps: string[] };
export type Sector = {
  slug: string; v: string; still: string; en: string; tr: string; idx: string;
  kicker: string; h: string; lede: string;
  problem: { h: string; p: string[] };
  sops: Sop[];
  how: { k: string; h: string; p: string }[];
  quiz: { q: string; a: string[]; ok: number };
  flow: { when: string; what: string }[];
  ready: string;
};
/** English URL slug per sector (Turkish slug stays the key and is used for the Turkish /tr/sektor/ pages). */
export const SECTOR_EN: Record<string, string> = {"restoran": "restaurants", "uretim": "manufacturing", "otel": "hotels", "franchise": "franchises", "depo": "warehouses", "firin": "bakeries-cafes"};
/** Public path of a sector page: /industries/<english-slug>/ (English). */
export const sectorPath = (slug: string) => `/industries/${SECTOR_EN[slug] ?? slug}/`;
export const sectors: Sector[] = [
  {
    slug: "restoran", v: "kitchen", still: "/photos/restaurant-1600.webp", en: "Restaurants", tr: "Restoranlar", idx: "01",
    kicker: "Restaurants & kitchens", h: "Same plate. Every shift.",
    lede: "Your head chef knows exactly how the line should open, how the walk-in is checked and how a plate leaves the pass. Flexlore puts that knowledge on every phone in the kitchen.",
    problem: { h: "The recipe card is not the recipe.", p: ["New cooks learn by watching whoever is on shift. Every handover bends the standard a little.", "Hygiene and allergen steps are written down somewhere. Under pressure, nobody checks the binder."] },
    sops: [
      { t: "Opening checklist", steps: ["Fridge and walk-in temperatures logged", "Hand-wash station stocked", "Mise en place by station", "Fryer oil checked and filtered"] },
      { t: "Hygiene steps from your HACCP plan", steps: ["Colour-coded boards by product", "Probe, clean, sanitise, record", "Cooling: label, date, rotate", "Allergen separation at the pass"] },
      { t: "Plating a signature dish", steps: ["Warm plate, wiped rim", "Base, protein, garnish in order", "Sauce weight, not by eye", "Photo check against the standard"] },
      { t: "Closing down", steps: ["Label and date everything stored", "Degrease and sanitise surfaces", "Floor, drains, bins", "Final temperature log"] },
    ],
    how: [
      { k: "Video SOP", h: "Filmed at the pass.", p: "The chef records the real task on a phone. Flexlore splits it into short steps with written instructions." },
      { k: "AI quiz", h: "Checked, not assumed.", p: "A short quiz is drafted from the steps. You edit it. New cooks answer before their first solo shift." },
      { k: "Readiness", h: "Know the line is ready.", p: "See who has learned the opening, the hygiene steps and each station, by shift and location." },
    ],
    quiz: { q: "Raw chicken was prepped on a board. What comes next?", a: ["Rinse and reuse for salad", "Clean, sanitise, then switch to the right colour board", "Wipe with a dry cloth"], ok: 1 },
    flow: [ { when: "Day 0", what: "Chef films opening, hygiene and plating at the pass" }, { when: "Day 1", what: "Steps, text and quizzes drafted, chef approves" }, { when: "Week 1", what: "New cooks watch on their phone and take the quiz" }, { when: "Every shift", what: "Manager sees who is ready for which station" } ],
    ready: "Ready for station: grill, cold, pass.",
  },
  {
    slug: "uretim", v: "line", still: "/photos/factory.jpg", en: "Manufacturing", tr: "Üretim", idx: "02",
    kicker: "Manufacturing & production", h: "Changeover, without the guesswork.",
    lede: "The fastest changeover on your floor lives in one operator's hands. Film it once, and every shift runs it the same way.",
    problem: { h: "Work instructions that nobody opens.", p: ["PDF instructions sit on a shared drive while operators learn from the person next to them.", "When that person is on leave, setup times drift and small errors repeat."] },
    sops: [
      { t: "Machine changeover", steps: ["Isolate and lock out", "Remove and stage the previous tooling", "Fit, align and torque new tooling", "First-off part checked and signed"] },
      { t: "Daily start-up", steps: ["Guards and e-stops checked", "Lubrication points", "Air and pressure readings", "Warm-up cycle"] },
      { t: "Quality check at station", steps: ["Gauge zeroed", "Measure the critical dimensions", "Visual defects by reference photo", "Record and flag out-of-spec"] },
      { t: "5S end of shift", steps: ["Sort and return tools to shadow board", "Clean chips and spills", "Restock consumables", "Handover note for next shift"] },
    ],
    how: [
      { k: "Video SOP", h: "Filmed at the machine.", p: "Your best operator records the changeover as it happens. Each step becomes a clip with clear text." },
      { k: "AI quiz", h: "Safety steps, confirmed.", p: "Quiz questions are drafted from the lock-out and setup steps. Supervisors approve before assigning." },
      { k: "Readiness", h: "Skills matrix that updates itself.", p: "See which operators have learned which machine, by line and shift, before you plan the rota." },
    ],
    quiz: { q: "Before removing the old tooling, what must happen first?", a: ["Run one more cycle", "Isolate the machine and apply your lock", "Ask the next shift"], ok: 1 },
    flow: [ { when: "Day 0", what: "Lead operator films changeover and start-up" }, { when: "Day 1", what: "Engineering reviews steps and the quiz" }, { when: "Week 1", what: "Operators learn at the line, on their phone" }, { when: "Every shift", what: "Supervisor sees who is cleared for which machine" } ],
    ready: "Cleared for: press 2, line B changeover.",
  },
  {
    slug: "otel", v: "hotel", still: "/photos/hotel-room.jpg", en: "Hotels", tr: "Oteller", idx: "03",
    kicker: "Hotels & hospitality", h: "Every room, turned the same way.",
    lede: "Guests notice the details your best housekeeper never misses. Flexlore turns those details into a standard every new team member can follow.",
    problem: { h: "Seasonal teams, every season.", p: ["New staff arrive in waves and learn in a rush. The video shows what words can't.", "Standards for room turn, front desk and breakfast drift from one property to the next."] },
    sops: [
      { t: "Housekeeping room turn", steps: ["Strip, ventilate, check for left items", "Bathroom top to bottom", "Bed made to the house standard", "Amenities placed by reference photo"] },
      { t: "Front desk check-in", steps: ["Greeting and ID", "Room features and Wi-Fi", "Breakfast and checkout times", "Escalation for special requests"] },
      { t: "Breakfast buffet set-up", steps: ["Hot and cold zones", "Allergen labels", "Refill rhythm", "Closing and storage"] },
      { t: "Minibar and amenity audit", steps: ["Count and record", "Expiry check", "Restock to the plan", "Report damages"] },
    ],
    how: [
      { k: "Video SOP", h: "Filmed in a real room.", p: "Your head housekeeper records one perfect turn. It becomes short steps with photo references." },
      { k: "AI quiz", h: "Checked, step by step.", p: "A short quiz follows the steps, so you know the standard was understood, not just watched." },
      { k: "Readiness", h: "Ready before the guest arrives.", p: "See who has learned room turn, check-in and breakfast, by property and shift." },
    ],
    quiz: { q: "You find a guest's item while stripping the room. What do you do?", a: ["Leave it on the bed", "Log it and hand it to lost and found", "Bin it"], ok: 1 },
    flow: [ { when: "Day 0", what: "Head housekeeper films room turn and amenities" }, { when: "Day 1", what: "Steps and quiz approved" }, { when: "Arrival day", what: "Seasonal staff learn before their first floor" }, { when: "Every shift", what: "Duty manager sees who is ready, by property" } ],
    ready: "Ready for: room turn, breakfast.",
  },
  {
    slug: "franchise", v: "plating", still: "/photos/chef-plating.jpg", en: "Franchises", tr: "Franchise", idx: "04",
    kicker: "Franchises & multi-site", h: "One brand. Every branch.",
    lede: "Your brand standard is only as strong as the newest branch. Flexlore sends the same video standard to every location, and shows you who has learned it.",
    problem: { h: "The manual stops at head office.", p: ["Brand standards are written centrally and interpreted locally.", "Field visits find the gap months after it opened."] },
    sops: [
      { t: "Brand standard for the signature product", steps: ["Portion and build order", "Packaging and presentation", "Hold times", "Reference photo check"] },
      { t: "Store opening", steps: ["Front of house walkthrough", "Equipment start-up", "Display and signage", "Cash and system check"] },
      { t: "Guest service script", steps: ["Greeting", "Upsell the way the brand does it", "Handling a complaint", "Goodbye"] },
      { t: "New menu launch", steps: ["What changes", "Prep and build", "Allergen notes", "Go-live day checks"] },
    ],
    how: [
      { k: "Video SOP", h: "Filmed once, at the flagship.", p: "Head office records the standard. Every branch gets the same steps, the same day." },
      { k: "AI quiz", h: "Proof per branch.", p: "Each branch team answers the same short quiz, so the standard is checked everywhere." },
      { k: "Readiness", h: "See every location.", p: "Compare readiness by branch, region and shift before a launch or a field visit." },
    ],
    quiz: { q: "A new item launches Monday. When should the branch team learn it?", a: ["On launch day", "Before launch, with the video and quiz", "When a guest asks"], ok: 1 },
    flow: [ { when: "Day 0", what: "Training team films the new standard at the flagship" }, { when: "Day 1", what: "Steps and quiz approved centrally" }, { when: "Before launch", what: "Every branch is assigned the same standard" }, { when: "Launch day", what: "Head office sees readiness, branch by branch" } ],
    ready: "Ready branches: compared side by side.",
  },
  {
    slug: "depo", v: "warehouse", still: "/photos/warehouse-1600.webp", en: "Warehouses & logistics", tr: "Depo ve lojistik", idx: "05",
    kicker: "Warehouses & logistics", h: "Pick it right the first time.",
    lede: "Peak season brings new hands to the dock. Flexlore gets them picking, packing and moving safely, the way your site does it.",
    problem: { h: "Peak season, every year.", p: ["Temporary staff need to be productive in days, not weeks.", "Safety and handling steps get skipped when induction is a quick walk around."] },
    sops: [
      { t: "Receiving at the dock", steps: ["Check paperwork against the delivery", "Inspect for damage", "Scan and label", "Put away to location"] },
      { t: "Pick and pack", steps: ["Read the pick list", "Scan location and item", "Pack to the standard", "Seal, label, stage"] },
      { t: "Equipment pre-use check", steps: ["Visual inspection", "Brakes, horn, lights", "Forks and chains", "Report and tag faults"] },
      { t: "Safe manual handling", steps: ["Plan the lift", "Stance and grip", "Lift with the legs", "Team lift above the limit"] },
    ],
    how: [
      { k: "Video SOP", h: "Filmed on your floor.", p: "Your shift lead records receiving, picking and pre-use checks in the aisles they happen in." },
      { k: "AI quiz", h: "Safety confirmed.", p: "Short quizzes check the handling and equipment steps before anyone starts." },
      { k: "Readiness", h: "Staff the shift with confidence.", p: "See who is ready for which zone and task before peak days." },
    ],
    quiz: { q: "Your pre-use check finds a fault. What do you do?", a: ["Use it carefully", "Tag it out and report it", "Swap with a colleague"], ok: 1 },
    flow: [ { when: "Day 0", what: "Shift lead films receiving, picking and checks" }, { when: "Day 1", what: "Steps and quiz approved" }, { when: "Induction", what: "New staff learn on their phone before the floor" }, { when: "Every shift", what: "Lead sees who is ready, by zone" } ],
    ready: "Ready for: receiving, zone C picking.",
  },
  {
    slug: "firin", v: "steam", still: "/photos/bakery-1600.webp", en: "Bakeries & cafés", tr: "Fırın ve kafeler", idx: "06",
    kicker: "Bakeries & coffee", h: "The morning bake, taught by hand.",
    lede: "Dough, milk, timing. The craft is in the hands, so the training should be too.",
    problem: { h: "Craft is hard to write down.", p: ["How the dough should feel or how milk should sound is learned by watching.", "Early shifts often have no one experienced on hand to show."] },
    sops: [
      { t: "Morning bake", steps: ["Oven pre-heat and steam", "Proof check by touch", "Score and load", "Bake, cool, display"] },
      { t: "Espresso and milk", steps: ["Dose, level, tamp", "Shot time and taste", "Steam and texture", "Pour and serve"] },
      { t: "Daily cleaning", steps: ["Group heads and wands", "Mixer and benches", "Display cases", "Log and sign"] },
    ],
    how: [
      { k: "Video SOP", h: "Filmed at the bench.", p: "Your best baker films the craft close up. Each step gets its own clip and note." },
      { k: "AI quiz", h: "Ready before 6 a.m.", p: "A short quiz checks the key steps before the first early shift." },
      { k: "Readiness", h: "Every shop, the same bake.", p: "See who can open, bake and run the bar, by shop and shift." },
    ],
    quiz: { q: "How do you know the dough is ready to bake?", a: ["When the timer ends", "It springs back slowly when pressed", "When it smells done"], ok: 1 },
    flow: [ { when: "Day 0", what: "Head baker films bake and bar routines" }, { when: "Day 1", what: "Steps and quiz approved" }, { when: "Week 1", what: "New staff learn before the early shift" }, { when: "Every morning", what: "Owner sees who can open which shop" } ],
    ready: "Ready to open: bake, bar.",
  },
];

/* Turkish copy, same structure as the English fields above. Shown when base(locale) is "tr"; every other language keeps
   English. Same meaning as the English source: no added claims, numbers or features. */
export type SectorCopy = Pick<Sector, "kicker" | "h" | "lede" | "problem" | "sops" | "how" | "quiz" | "flow" | "ready">;
export const sectorsTr: Record<string, SectorCopy> = {
  restoran: {
    kicker: "Restoranlar ve mutfaklar", h: "Aynı tabak. Her vardiyada.",
    lede: "Mutfak şefiniz hattın nasıl açılacağını, soğuk odanın nasıl kontrol edileceğini ve bir tabağın pas tezgâhından nasıl çıkacağını çok iyi bilir. Flexlore bu bilgiyi mutfaktaki her telefona taşır.",
    problem: { h: "Reçete kartı, reçetenin tamamı değil.", p: ["Yeni aşçılar o vardiyada kim varsa onu izleyerek öğrenir. Her devir teslimde standart biraz daha kayar.", "Hijyen ve alerjen adımları bir yerde yazılıdır. Yoğunlukta kimse klasöre bakmaz."] },
    sops: [
      { t: "Açılış kontrol listesi", steps: ["Buzdolabı ve soğuk oda sıcaklıkları kaydedilir", "El yıkama istasyonu eksiksiz hazırlanır", "İstasyon bazında mizanplas", "Fritöz yağı kontrol edilir ve süzülür"] },
      { t: "HACCP planınızdaki hijyen adımları", steps: ["Ürüne göre renk kodlu kesme tahtaları", "Termometreyle ölç, temizle, dezenfekte et, kaydet", "Soğutma: etiketle, tarih at, FIFO uygula", "Pas tezgâhında alerjen ayrımı"] },
      { t: "İmza tabağın hazırlanması", steps: ["Ilık tabak, silinmiş kenar", "Sırayla taban, protein, garnitür", "Sos göz kararı değil, tartıyla", "Standart fotoğrafla karşılaştırma"] },
      { t: "Kapanış", steps: ["Saklanan her şey etiketlenir ve tarihlenir", "Yüzeylerin yağı alınır ve dezenfekte edilir", "Zemin, giderler, çöp kutuları", "Son sıcaklık kaydı"] },
    ],
    how: [
      { k: "Video iş talimatı", h: "Pas tezgâhında çekilir.", p: "Şef gerçek işi telefonla kaydeder. Flexlore bunu yazılı talimatları olan kısa adımlara böler." },
      { k: "Yapay zekâ ile quiz", h: "Varsayılmaz, kontrol edilir.", p: "Adımlardan kısa bir quiz taslağı hazırlanır. Siz düzenlersiniz. Yeni aşçılar ilk kez tek başlarına vardiyaya girmeden önce cevaplar." },
      { k: "Hazırlık", h: "Hattın hazır olduğunu bilin.", p: "Kimin açılışı, hijyen adımlarını ve her istasyonu öğrendiğini vardiya ve şube bazında görün." },
    ],
    quiz: { q: "Bir tahtada çiğ tavuk hazırlandı. Sırada ne var?", a: ["Durulayıp salata için tekrar kullanmak", "Temizleyip dezenfekte etmek, sonra doğru renkteki tahtaya geçmek", "Kuru bir bezle silmek"], ok: 1 },
    flow: [ { when: "Gün 0", what: "Şef açılışı, hijyeni ve tabak hazırlığını pas tezgâhında çeker" }, { when: "Gün 1", what: "Adımlar, metin ve quizler hazırlanır, şef onaylar" }, { when: "1. hafta", what: "Yeni aşçılar telefonlarında izler ve quizi çözer" }, { when: "Her vardiya", what: "Müdür kimin hangi istasyona hazır olduğunu görür" } ],
    ready: "İstasyona hazır: ızgara, soğuk, pas.",
  },
  uretim: {
    kicker: "Üretim ve imalat", h: "Kalıp değişimi, tahmine yer bırakmadan.",
    lede: "Sahanızdaki en hızlı kalıp değişimi tek bir operatörün elinde. Bir kez çekin, her vardiya aynı şekilde yapsın.",
    problem: { h: "Kimsenin açmadığı iş talimatları.", p: ["PDF talimatlar ortak klasörde dururken operatörler yanındaki kişiden öğrenir.", "O kişi izne çıktığında ayar süreleri uzar, küçük hatalar tekrarlanır."] },
    sops: [
      { t: "Kalıp değişimi", steps: ["Enerjiyi kes ve kilitle", "Eski takımı sök ve kenara hazırla", "Yeni takımı tak, hizala, torkla", "İlk parça kontrol edilir ve imzalanır"] },
      { t: "Günlük devreye alma", steps: ["Koruyucular ve acil stop butonları kontrol edilir", "Yağlama noktaları", "Hava ve basınç değerleri", "Isınma çevrimi"] },
      { t: "İstasyonda kalite kontrol", steps: ["Ölçü aleti sıfırlanır", "Kritik ölçüler alınır", "Referans fotoğrafla görsel hata kontrolü", "Kaydet, tolerans dışını işaretle"] },
      { t: "Vardiya sonu 5S", steps: ["Takımları ayıkla, gölge panoya geri koy", "Talaşları ve dökülenleri temizle", "Sarf malzemelerini tamamla", "Sonraki vardiya için devir notu"] },
    ],
    how: [
      { k: "Video iş talimatı", h: "Makinenin başında çekilir.", p: "En iyi operatörünüz kalıp değişimini yaparken kaydeder. Her adım, açık bir metinle kısa bir klibe dönüşür." },
      { k: "Yapay zekâ ile quiz", h: "Güvenlik adımları teyit edilir.", p: "Quiz soruları kilitleme ve ayar adımlarından taslak olarak hazırlanır. Atamadan önce vardiya amirleri onaylar." },
      { k: "Hazırlık", h: "Kendini güncelleyen yetkinlik matrisi.", p: "Vardiya planını yapmadan önce hangi operatörün hangi makineyi öğrendiğini hat ve vardiya bazında görün." },
    ],
    quiz: { q: "Eski takımı sökmeden önce ilk ne yapılmalı?", a: ["Bir çevrim daha çalıştırmak", "Makinenin enerjisini kesip kendi kilidinizi takmak", "Sonraki vardiyaya sormak"], ok: 1 },
    flow: [ { when: "Gün 0", what: "Usta operatör kalıp değişimini ve devreye almayı çeker" }, { when: "Gün 1", what: "Mühendislik adımları ve quizi gözden geçirir" }, { when: "1. hafta", what: "Operatörler hatta, kendi telefonlarında öğrenir" }, { when: "Her vardiya", what: "Vardiya amiri kimin hangi makineye yetkili olduğunu görür" } ],
    ready: "Yetkili: pres 2, B hattı kalıp değişimi.",
  },
  otel: {
    kicker: "Oteller ve konaklama", h: "Her oda, aynı standartta.",
    lede: "Misafirler, en iyi kat görevlinizin hiç atlamadığı ayrıntıları fark eder. Flexlore bu ayrıntıları her yeni ekip üyesinin uygulayabileceği bir standarda dönüştürür.",
    problem: { h: "Her sezon, yeni bir sezonluk ekip.", p: ["Yeni personel dalga dalga gelir ve aceleyle öğrenir. Video, kelimelerin anlatamadığını gösterir.", "Oda hazırlığı, resepsiyon ve kahvaltı standartları bir tesisten diğerine kayar."] },
    sops: [
      { t: "Kat hizmetleri oda hazırlığı", steps: ["Çarşafları topla, havalandır, unutulan eşyaya bak", "Banyo yukarıdan aşağıya", "Yatak otelin standardında yapılır", "Buklet ürünler referans fotoğrafa göre yerleştirilir"] },
      { t: "Resepsiyonda check-in", steps: ["Karşılama ve kimlik", "Oda özellikleri ve Wi-Fi", "Kahvaltı ve check-out saatleri", "Özel talepleri doğru kişiye iletme"] },
      { t: "Açık büfe kahvaltı hazırlığı", steps: ["Sıcak ve soğuk bölümler", "Alerjen etiketleri", "Tazeleme sıklığı", "Kapanış ve saklama"] },
      { t: "Minibar ve buklet kontrolü", steps: ["Say ve kaydet", "Son kullanma tarihi kontrolü", "Plana göre tamamla", "Hasarları bildir"] },
    ],
    how: [
      { k: "Video iş talimatı", h: "Gerçek bir odada çekilir.", p: "Kat şefiniz kusursuz bir oda hazırlığını kaydeder. Bu kayıt, fotoğraf referanslı kısa adımlara dönüşür." },
      { k: "Yapay zekâ ile quiz", h: "Adım adım kontrol.", p: "Adımların ardından kısa bir quiz gelir. Böylece standardın yalnızca izlenmediğini, anlaşıldığını bilirsiniz." },
      { k: "Hazırlık", h: "Misafir gelmeden hazır.", p: "Kimin oda hazırlığını, check-in'i ve kahvaltıyı öğrendiğini tesis ve vardiya bazında görün." },
    ],
    quiz: { q: "Odayı toplarken misafire ait bir eşya buldunuz. Ne yaparsınız?", a: ["Yatağın üstüne bırakırım", "Kayda geçirip kayıp eşya birimine teslim ederim", "Çöpe atarım"], ok: 1 },
    flow: [ { when: "Gün 0", what: "Kat şefi oda hazırlığını ve buklet yerleşimini çeker" }, { when: "Gün 1", what: "Adımlar ve quiz onaylanır" }, { when: "Geliş günü", what: "Sezonluk personel ilk katına çıkmadan öğrenir" }, { when: "Her vardiya", what: "Nöbetçi müdür kimin hazır olduğunu tesis bazında görür" } ],
    ready: "Hazır: oda hazırlığı, kahvaltı.",
  },
  franchise: {
    kicker: "Franchise ve çok şubeli işletmeler", h: "Tek marka. Her şubede.",
    lede: "Marka standardınız en yeni şubeniz kadar güçlüdür. Flexlore aynı video standardını her şubeye gönderir ve kimin öğrendiğini size gösterir.",
    problem: { h: "Kılavuz genel merkezde kalıyor.", p: ["Marka standartları merkezde yazılır, şubede yorumlanır.", "Saha ziyaretleri aradaki farkı, oluştuktan aylar sonra görür."] },
    sops: [
      { t: "İmza ürün için marka standardı", steps: ["Porsiyon ve hazırlama sırası", "Ambalaj ve sunum", "Bekletme süreleri", "Referans fotoğrafla kontrol"] },
      { t: "Şube açılışı", steps: ["Salon turu", "Ekipmanların çalıştırılması", "Teşhir ve tabelalar", "Kasa ve sistem kontrolü"] },
      { t: "Misafir karşılama akışı", steps: ["Karşılama", "Markanın yaptığı gibi ek satış", "Şikâyetle ilgilenme", "Uğurlama"] },
      { t: "Yeni menü lansmanı", steps: ["Neler değişiyor", "Ön hazırlık ve ürünün hazırlanması", "Alerjen notları", "Lansman günü kontrolleri"] },
    ],
    how: [
      { k: "Video iş talimatı", h: "Bir kez, merkez şubede çekilir.", p: "Genel merkez standardı kaydeder. Her şube aynı adımları aynı gün alır." },
      { k: "Yapay zekâ ile quiz", h: "Her şube için kanıt.", p: "Her şube ekibi aynı kısa quizi cevaplar, böylece standart her yerde kontrol edilir." },
      { k: "Hazırlık", h: "Tüm şubeleri görün.", p: "Bir lansmandan veya saha ziyaretinden önce hazırlığı şube, bölge ve vardiya bazında karşılaştırın." },
    ],
    quiz: { q: "Yeni bir ürün pazartesi satışa çıkıyor. Şube ekibi bunu ne zaman öğrenmeli?", a: ["Lansman günü", "Lansmandan önce, video ve quizle", "Bir misafir sorduğunda"], ok: 1 },
    flow: [ { when: "Gün 0", what: "Eğitim ekibi yeni standardı merkez şubede çeker" }, { when: "Gün 1", what: "Adımlar ve quiz merkezde onaylanır" }, { when: "Lansmandan önce", what: "Aynı standart her şubeye atanır" }, { when: "Lansman günü", what: "Genel merkez hazırlığı şube şube görür" } ],
    ready: "Hazır şubeler: yan yana karşılaştırmalı.",
  },
  depo: {
    kicker: "Depo ve lojistik", h: "İlk seferde doğru toplama.",
    lede: "Yoğun sezon rampaya yeni eller getirir. Flexlore onların toplama, paketleme ve taşıma işlerini sahanızdaki yöntemle ve güvenle yapmasını sağlar.",
    problem: { h: "Her yıl aynı yoğun sezon.", p: ["Geçici personelin haftalar içinde değil, günler içinde verimli olması gerekir.", "İşe giriş eğitimi kısa bir turdan ibaret olunca güvenlik ve elleçleme adımları atlanır."] },
    sops: [
      { t: "Rampada mal kabul", steps: ["Evrakı teslimatla karşılaştır", "Hasar kontrolü yap", "Okut ve etiketle", "Adrese yerleştir"] },
      { t: "Toplama ve paketleme", steps: ["Toplama listesini oku", "Adresi ve ürünü okut", "Standarda göre paketle", "Kapat, etiketle, sevkiyata hazırla"] },
      { t: "Ekipman kullanım öncesi kontrol", steps: ["Gözle kontrol", "Fren, korna, ışıklar", "Çatallar ve zincirler", "Arızayı bildir ve etiketle"] },
      { t: "Güvenli elle taşıma", steps: ["Kaldırmayı planla", "Duruş ve tutuş", "Bacaklarınla kaldır", "Limitin üstünde ekip halinde kaldır"] },
    ],
    how: [
      { k: "Video iş talimatı", h: "Kendi sahanızda çekilir.", p: "Vardiya sorumlunuz mal kabulü, toplamayı ve kullanım öncesi kontrolleri, işin yapıldığı koridorlarda kaydeder." },
      { k: "Yapay zekâ ile quiz", h: "Güvenlik teyit edilir.", p: "Kısa quizler, kimse işe başlamadan elleçleme ve ekipman adımlarını kontrol eder." },
      { k: "Hazırlık", h: "Vardiyayı güvenle planlayın.", p: "Yoğun günlerden önce kimin hangi bölge ve göreve hazır olduğunu görün." },
    ],
    quiz: { q: "Kullanım öncesi kontrolde bir arıza buldunuz. Ne yaparsınız?", a: ["Dikkatli kullanırım", "Kullanım dışı etiketleyip bildiririm", "Bir iş arkadaşımınkiyle değiştiririm"], ok: 1 },
    flow: [ { when: "Gün 0", what: "Vardiya sorumlusu mal kabulü, toplamayı ve kontrolleri çeker" }, { when: "Gün 1", what: "Adımlar ve quiz onaylanır" }, { when: "İşe giriş", what: "Yeni personel sahaya çıkmadan telefonunda öğrenir" }, { when: "Her vardiya", what: "Sorumlu kimin hazır olduğunu bölge bazında görür" } ],
    ready: "Hazır: mal kabul, C bölgesi toplama.",
  },
  firin: {
    kicker: "Fırın ve kahve", h: "Sabahın ilk ekmeği, usta elinden.",
    lede: "Hamur, süt, zamanlama. Ustalık ellerdedir, eğitim de öyle olmalı.",
    problem: { h: "Ustalığı yazıya dökmek zor.", p: ["Hamurun elde nasıl durması, sütün nasıl ses çıkarması gerektiği izleyerek öğrenilir.", "Erken vardiyalarda çoğu zaman gösterecek deneyimli biri olmaz."] },
    sops: [
      { t: "Sabah pişirimi", steps: ["Fırını ısıt, buharı ayarla", "Mayalanmayı dokunarak kontrol et", "Çiz ve fırına ver", "Pişir, soğut, vitrine koy"] },
      { t: "Espresso ve süt", steps: ["Doz, düzleme, tamp", "Shot süresi ve tadım", "Buharlama ve süt dokusu", "Döküm ve servis"] },
      { t: "Günlük temizlik", steps: ["Grup başlıkları ve buhar çubukları", "Mikser ve tezgâhlar", "Vitrinler", "Kaydet ve imzala"] },
    ],
    how: [
      { k: "Video iş talimatı", h: "Tezgâhta çekilir.", p: "En iyi fırıncınız işi yakından çeker. Her adımın kendi klibi ve notu olur." },
      { k: "Yapay zekâ ile quiz", h: "Sabah 6'dan önce hazır.", p: "Kısa bir quiz, ilk erken vardiyadan önce temel adımları kontrol eder." },
      { k: "Hazırlık", h: "Her dükkânda aynı pişirim.", p: "Kimin dükkânı açabildiğini, pişirim yapabildiğini ve barı yürütebildiğini dükkân ve vardiya bazında görün." },
    ],
    quiz: { q: "Hamurun pişmeye hazır olduğunu nasıl anlarsınız?", a: ["Zamanlayıcı bittiğinde", "Bastırınca yavaşça geri geliyorsa", "Pişmiş gibi koktuğunda"], ok: 1 },
    flow: [ { when: "Gün 0", what: "Usta fırıncı pişirim ve bar rutinlerini çeker" }, { when: "Gün 1", what: "Adımlar ve quiz onaylanır" }, { when: "1. hafta", what: "Yeni personel erken vardiyadan önce öğrenir" }, { when: "Her sabah", what: "İşletme sahibi kimin hangi dükkânı açabileceğini görür" } ],
    ready: "Açılışa hazır: pişirim, bar.",
  },
};
/** The copy to show for a sector: Turkish when lang is "tr" and a Turkish copy exists, English otherwise. */
export const sectorCopy = (s: Sector, lang: "en" | "tr"): SectorCopy => (lang === "tr" && sectorsTr[s.slug]) || s;
