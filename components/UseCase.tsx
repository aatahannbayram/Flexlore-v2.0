import { Bar } from "./Blog";
import { Footer } from "./Sections";
import UseCaseView from "./UseCaseView";

/* Two photo bands per use case (the problem, the closing), none the same as its hero photo. */
export const UC_BANDS: Record<string, [string, string]> = { "master-apprentice-skills-transfer": ["saha-eldiven-makro", "bakery"], "installation-training-on-site-orientation": ["field", "phone-mount"] };

export type UC = { slug: string; crumb: string; k: string; h1: string; lede: string; img: string; alt: string; quote: string;
  problem: [string, string][]; steps: [string, string][]; out: string[]; faq: { q: string; a: string }[]; related: string };
export const USE_CASES: UC[] = [
  { slug: "master-apprentice-skills-transfer", crumb: "Master-apprentice skills transfer", k: "Use case · Master → apprentice",
    h1: "Master-apprentice skills transfer, on video, step by step.",
    lede: "Your master records the job once, the way it has always been done right. Apprentices replay any step as often as they need, pass a quiz and get signed off. The know-how no longer depends on being on the same shift.",
    img: "/photos/factory.webp", alt: "Technician working at a production line", quote: "\u201cWatch how I do it. Then do it again.\u201d",
    problem: [["Learned by shadowing", "Apprentices copy whoever is on shift. Every handover bends the standard a little."], ["The master is a bottleneck", "One person can only show one apprentice at a time, and only when they are both on shift."], ["Gone on their day off", "When the master is on leave or retires, setups drift and small errors repeat."]],
    steps: [["Master records once", "One phone video of the real job, filmed from the doer's side. No studio, no script."], ["Flexlore splits it into steps", "Each step gets its own clip and a drafted instruction. The master edits and approves."], ["Apprentice replays", "Step by step, at their own pace, at the workstation, until it sticks."], ["Quiz and sign-off", "A short quiz drafted from the steps confirms the order and the checks. The supervisor sees who's ready."]],
    out: ["The master's way, available on every shift", "Apprentices learn without pulling the master off the job", "Readiness by person and by job, not a signature on a form"],
    faq: [{ q: "Does the master need to write anything?", a: "No. The master films the job. Flexlore drafts the steps, the instructions and the quiz; the master reviews and approves them." }, { q: "Can the apprentice rewatch a single step?", a: "Yes. Every step is its own clip, so the apprentice can replay exactly the step they are on." }, { q: "How do we know the apprentice is ready?", a: "Flexlore shows who watched, who completed the work and who passed the quiz, by person, team, shift and location." }],
    related: "installation-training-on-site-orientation" },
  { slug: "installation-training-on-site-orientation", crumb: "Installation training and on-site orientation", k: "Use case · Installation at a customer site",
    h1: "Installation training that stays after your team leaves.",
    lede: "Your team installs a machine at a customer site, runs the orientation and drives away. With Flexlore, the installer films start-up, cleaning and daily checks on that exact machine, so every step is still there for the next shift, months later.",
    img: "/video/warehouse.jpg", alt: "Equipment on site after an installation", quote: "\u201cThe installers left. The know-how stayed.\u201d",
    problem: [["Orientation is a one-day event", "The customer's team sees it once, on install day. New shifts never do."], ["Know-how leaves with the installers", "What the installer explained lives in their head and drives away with them."], ["Questions become support calls", "Every forgotten step turns into a call, a ticket or a site visit."]],
    steps: [["Filmed on the installed unit", "The installer records start-up, changeover, cleaning and daily checks on the machine the customer will run."], ["One step at a time", "Flexlore cuts the video into steps with drafted instructions. Your team approves them."], ["A quiz on the checks that matter", "A short quiz confirms the critical steps are understood."], ["Orientation that stays", "New shifts learn it the same way months later. Linking a QR on the machine to its steps is coming soon."]],
    out: ["Orientation becomes permanent, not a one-day event", "The same standard for every shift at the customer site", "Fewer repeat questions after installation"],
    faq: [{ q: "Can we film on the customer's machine?", a: "Yes, if the customer agrees. All you need is a phone and the installed unit." }, { q: "Is there a QR code on the machine?", a: "QR codes and shareable job links are coming soon. They are on our roadmap, not available today." }, { q: "Who can see the steps?", a: "Access is controlled by role and location. Ask us on the demo call how to set it up for your customers." }],
    related: "master-apprentice-skills-transfer" },
];

/* Turkish copy, same meaning as the English above (no added claims). Every other locale shows English. */
export type UCText = Omit<UC, "slug" | "img" | "related">;
export const USE_CASES_TR: Record<string, UCText> = {
  "master-apprentice-skills-transfer": { crumb: "Ustadan çırağa beceri aktarımı", k: "Kullanım alanı · Usta → çırak",
    h1: "Ustadan çırağa beceri aktarımı, videoyla, adım adım.",
    lede: "Ustanız işi bir kez, hep doğru yapıldığı şekilde kaydeder. Çıraklar istedikleri adımı gerektiği kadar tekrar izler, quizi geçer ve onay alır. Bilgi artık aynı vardiyada olmaya bağlı kalmaz.",
    alt: "Üretim hattında çalışan bir teknisyen", quote: "\u201cNasıl yaptığımı izle. Sonra sen de yap.\u201d",
    problem: [["Yanında durarak öğrenilir", "Çıraklar o vardiyada kim varsa onu taklit eder. Her devir teslimde standart biraz daha kayar."], ["Usta darboğaz olur", "Bir kişi aynı anda yalnızca bir çırağa gösterebilir, o da ikisi aynı vardiyadaysa."], ["İzin gününde bilgi de yok", "Usta izne çıktığında ya da emekli olduğunda ayarlar kayar, küçük hatalar tekrarlanır."]],
    steps: [["Usta bir kez kaydeder", "Gerçek işin tek bir telefon videosu, işi yapanın gözünden çekilir. Stüdyo yok, senaryo yok."], ["Flexlore adımlara böler", "Her adımın kendi klibi ve taslak bir talimatı olur. Usta düzenler ve onaylar."], ["Çırak tekrar izler", "Adım adım, kendi hızında, iş istasyonunda, iyice oturana kadar."], ["Quiz ve onay", "Adımlardan hazırlanan kısa bir quiz, sıranın ve kontrollerin anlaşıldığını doğrular. Sorumlu kişi kimin hazır olduğunu görür."]],
    out: ["Ustanın yöntemi her vardiyada elinizin altında", "Çıraklar ustayı işinden alıkoymadan öğrenir", "Formdaki bir imza değil, kişi ve iş bazında kimin hazır olduğu"],
    faq: [{ q: "Ustanın bir şey yazması gerekiyor mu?", a: "Hayır. Usta işi çeker. Adımları, talimatları ve quizi Flexlore taslak olarak hazırlar; usta inceler ve onaylar." }, { q: "Çırak tek bir adımı tekrar izleyebilir mi?", a: "Evet. Her adım ayrı bir klip olduğu için çırak tam olarak üzerinde çalıştığı adımı tekrar izleyebilir." }, { q: "Çırağın hazır olduğunu nasıl anlarız?", a: "Flexlore kimin izlediğini, kimin işi tamamladığını ve kimin quizi geçtiğini kişi, ekip, vardiya ve şube bazında gösterir." }] },
  "installation-training-on-site-orientation": { crumb: "Kurulum eğitimi ve sahada oryantasyon", k: "Kullanım alanı · Müşteri sahasında kurulum",
    h1: "Ekibiniz ayrıldıktan sonra da kalan kurulum eğitimi.",
    lede: "Ekibiniz müşteri sahasında bir makine kurar, oryantasyonu yapar ve ayrılır. Flexlore ile kurulumu yapan kişi devreye alma, temizlik ve günlük kontrolleri tam o makinede çeker; böylece her adım aylar sonra bile bir sonraki vardiya için orada olur.",
    alt: "Kurulumdan sonra sahadaki ekipman", quote: "\u201cKurulum ekibi gitti. Bilgi kaldı.\u201d",
    problem: [["Oryantasyon tek günlük bir etkinlik", "Müşterinin ekibi bunu kurulum günü bir kez görür. Yeni vardiyalar hiç görmez."], ["Bilgi kurulum ekibiyle birlikte gider", "Kurulumcunun anlattıkları onun aklında kalır ve onunla birlikte sahadan ayrılır."], ["Sorular destek çağrısına dönüşür", "Unutulan her adım bir telefona, bir destek talebine ya da bir saha ziyaretine dönüşür."]],
    steps: [["Kurulan makinede çekilir", "Kurulumcu devreye alma, ürün değişimi, temizlik ve günlük kontrolleri müşterinin kullanacağı makinede kaydeder."], ["Her seferinde bir adım", "Flexlore videoyu taslak talimatlarla adımlara böler. Ekibiniz onaylar."], ["Önemli kontroller için bir quiz", "Kısa bir quiz kritik adımların anlaşıldığını doğrular."], ["Kalıcı oryantasyon", "Yeni vardiyalar aylar sonra da aynı şekilde öğrenir. Makinedeki bir QR kodu adımlarına bağlamak yakında mümkün olacak."]],
    out: ["Oryantasyon tek günlük bir etkinlik olmaktan çıkar, kalıcı olur", "Müşteri sahasındaki her vardiya için aynı standart", "Kurulumdan sonra daha az tekrar eden soru"],
    faq: [{ q: "Müşterinin makinesinde çekim yapabilir miyiz?", a: "Evet, müşteri kabul ederse. Gereken tek şey bir telefon ve kurulan makine." }, { q: "Makinede QR kod var mı?", a: "QR kodlar ve paylaşılabilir iş bağlantıları yakında. Yol haritamızda, bugün kullanılabilir değil." }, { q: "Adımları kimler görebilir?", a: "Erişim role ve konuma göre kontrol edilir. Müşterileriniz için nasıl kuracağınızı demo görüşmesinde bize sorun." }] },
};

/* Server wrapper: passes both languages to the client view, which picks one from the visitor's locale. */
export default function UseCase({ c }: { c: UC }) {
  const r = USE_CASES.find((x) => x.slug === c.related)!;
  return (<><Bar /><UseCaseView c={c} tr={USE_CASES_TR[c.slug]} band={UC_BANDS[c.slug] ?? ["huddle", "office"]} rel={{ slug: r.slug, en: r.crumb, tr: USE_CASES_TR[r.slug]?.crumb ?? r.crumb }} /><Footer /></>);
}
