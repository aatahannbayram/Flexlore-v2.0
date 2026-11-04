/* Home use cases. Plain data (no "use client") so the page can also emit it as JSON-LD.
 * Titles are written as the thing people search for or ask an assistant ("health and safety training on video"),
 * and each line answers it in one sentence. Only capabilities the product has today; no customer names or results. */
export type Case = { id: string; href: string; icon: "safety" | "site" | "recipe" | "apprentice" | "onboard" | "franchise";
  tag: { en: string; tr: string }; h: { en: string; tr: string }; p: { en: string; tr: string } };

export const CASES: Case[] = [
  { id: "safety", href: "/sektor/uretim/", icon: "safety",
    tag: { en: "Health & safety", tr: "İş sağlığı ve güvenliği" },
    h: { en: "Health and safety training on video", tr: "Video ile iş sağlığı ve güvenliği eğitimi" },
    p: { en: "Film PPE, lockout and machine checks once. Every worker learns the same steps, passes a short quiz, and you see who is ready before the shift.",
         tr: "KKD, kilitleme ve makine kontrollerini bir kez çekin. Herkes aynı adımları öğrenir, kısa bir quizi geçer ve vardiyadan önce kimin hazır olduğunu görürsünüz." } },
  { id: "site", href: "/use-cases/installation-training-on-site-orientation/", icon: "site",
    tag: { en: "On-site orientation", tr: "Sahada oryantasyon" },
    h: { en: "Training that stays on site after installation", tr: "Kurulumdan sonra sahada kalan eğitim" },
    p: { en: "Installers film start-up, cleaning and daily checks on the machine itself, so the next shift can learn them months later.",
         tr: "Kurulum ekibi çalıştırma, temizlik ve günlük kontrolleri makinenin üzerinde çeker; aylar sonraki vardiya da aynı şekilde öğrenir." } },
  { id: "recipe", href: "/sektor/restoran/", icon: "recipe",
    tag: { en: "Recipes & plating", tr: "Tarifler ve sunum" },
    h: { en: "Recipes and plating, the same in every branch", tr: "Her şubede aynı tarif, aynı sunum" },
    p: { en: "The chef records a recipe once. Every cook follows the same steps and portions, and a quick quiz confirms it stuck.",
         tr: "Şef tarifi bir kez kaydeder. Her aşçı aynı adımları ve porsiyonları izler, kısa bir quiz öğrenildiğini doğrular." } },
  { id: "apprentice", href: "/use-cases/master-apprentice-skills-transfer/", icon: "apprentice",
    tag: { en: "Skills transfer", tr: "Beceri aktarımı" },
    h: { en: "Master to apprentice skills transfer", tr: "Ustadan çırağa beceri aktarımı" },
    p: { en: "The master’s way, filmed at the workstation and replayed step by step, without pulling the master off the job.",
         tr: "Ustanın yöntemi tezgâhta çekilir ve adım adım tekrar izlenir; usta işinden alıkonmaz." } },
  { id: "onboard", href: "/see-it/", icon: "onboard",
    tag: { en: "New-hire onboarding", tr: "İşe alım oryantasyonu" },
    h: { en: "New-hire onboarding without shadowing", tr: "Yanında dolaştırmadan işe başlatma" },
    p: { en: "New starters learn each job from video steps on their phone, and you see by person who has watched, passed and is ready.",
         tr: "Yeni başlayanlar her işi telefonda video adımlarla öğrenir; kimin izlediğini, geçtiğini ve hazır olduğunu kişi bazında görürsünüz." } },
  { id: "franchise", href: "/sektor/franchise/", icon: "franchise",
    tag: { en: "Multi-location", tr: "Çok lokasyonlu" },
    h: { en: "One standard across every franchise location", tr: "Tüm franchise şubelerinde tek standart" },
    p: { en: "Launch a process once, roll it out to every branch, and compare readiness by location.",
         tr: "Bir süreci bir kez hazırlayın, tüm şubelere yayın ve hazır olma durumunu lokasyona göre karşılaştırın." } },
];

export const CASES_HEAD = {
  en: { k: "Use cases", h: "Video training for every job on the floor.", lead: "From safety checks and recipes to installation handovers: how frontline teams use Flexlore to train staff and know who is ready to work.", more: "See the use case" },
  tr: { k: "Kullanım alanları", h: "Sahadaki her iş için video eğitim.", lead: "Güvenlik kontrollerinden tariflere, kurulum devirlerine kadar: saha ekipleri Flexlore ile çalışanlarını nasıl eğitiyor ve kimin işe hazır olduğunu nasıl görüyor.", more: "Ayrıntılar" },
};
