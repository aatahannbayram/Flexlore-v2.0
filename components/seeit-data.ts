export type Ind = "cafe-restaurant" | "franchise" | "manufacturing" | "hotel";
type L = { label: string; job: string; alt: string; flow: [string, string][] };
export const INDUSTRIES: { id: Ind; v: string; en: L; tr: L }[] = [
  { id: "cafe-restaurant", v: "kitchen",
    en: { label: "Cafe & restaurant chains", alt: "Cooks working a busy restaurant line", job: "A new line cook has to plate your signature dish exactly like the head chef, during Friday rush.",
      flow: [["Chef films it", "The head chef records the plating at the pass, from the cook's side of the counter."], ["Steps and a quiz", "Flexlore cuts it into build order, sauce and garnish, then drafts a quiz on the allergen step."], ["Cleared for the station", "The kitchen manager sees who passed before service starts."]] },
    tr: { label: "Kafe ve restoran zincirleri", alt: "Yoğun bir restoran mutfağında çalışan aşçılar", job: "Yeni bir aşçı, imza tabağınızı cuma yoğunluğunda şefin yaptığı gibi hazırlamalı.",
      flow: [["Şef kaydeder", "Şef tabak hazırlığını pasta, aşçının durduğu taraftan çeker."], ["Adımlar ve quiz", "Flexlore videoyu diziliş, sos ve garnitür adımlarına böler, alerjen adımı için bir quiz taslağı hazırlar."], ["İstasyona hazır", "Mutfak müdürü servis başlamadan kimin geçtiğini görür."]] } },
  { id: "franchise", v: "plating",
    en: { label: "Franchise", alt: "A dish being plated", job: "A new menu item goes live Monday in every branch, and it has to look the same everywhere.",
      flow: [["Filmed at the flagship", "The training team records the build once."], ["Sent to every branch", "Same steps, same quiz, same day."], ["Compared side by side", "Head office sees readiness branch by branch before launch."]] },
    tr: { label: "Franchise", alt: "Tabağa servis edilen bir yemek", job: "Yeni bir menü ürünü pazartesi tüm şubelerde başlıyor ve her yerde aynı görünmeli.",
      flow: [["Merkez şubede çekilir", "Eğitim ekibi hazırlığı bir kez kaydeder."], ["Her şubeye gider", "Aynı adımlar, aynı quiz, aynı gün."], ["Yan yana karşılaştırma", "Genel merkez lansmandan önce hazırlığı şube şube görür."]] } },
  { id: "manufacturing", v: "line",
    en: { label: "Manufacturing", alt: "Operator at a production line", job: "The changeover on press 2 depends on one senior operator, and that operator is on leave next week.",
      flow: [["Filmed at the machine", "The lead operator records lock-out, tooling swap and the check on the first part."], ["Approved by engineering", "Steps and a safety quiz are reviewed before anyone is assigned."], ["Shifts planned on facts", "The supervisor sees who's cleared for which machine, by line and shift."]] },
    tr: { label: "Üretim", alt: "Üretim hattında çalışan operatör", job: "2 numaralı presteki kalıp değişimi tek bir kıdemli operatöre bağlı ve o operatör gelecek hafta izinde.",
      flow: [["Makinede çekilir", "Usta operatör kilitleme, kalıp değişimi ve ilk parça kontrolünü kaydeder."], ["Mühendislik onaylar", "Adımlar ve iş güvenliği quizi kimseye atanmadan önce gözden geçirilir."], ["Vardiya verilerle planlanır", "Vardiya amiri kimin hangi makineye hazır olduğunu hat ve vardiya bazında görür."]] } },
  { id: "hotel", v: "hotel",
    en: { label: "Hotel", alt: "Hotel room being prepared", job: "Seasonal housekeepers arrive the week before opening and need to turn a room to your house standard.",
      flow: [["One perfect room turn", "The head housekeeper films it, top to bottom, bathroom to bed."], ["Short steps, quick check", "Each step gets a note; a short quiz confirms the standard landed."], ["Ready before the guest", "The duty manager sees who's ready, by property and shift."]] },
    tr: { label: "Otel", alt: "Hazırlanan bir otel odası", job: "Sezonluk kat görevlileri açılıştan bir hafta önce geliyor ve odayı sizin standardınızda hazırlamaları gerekiyor.",
      flow: [["Kusursuz bir oda hazırlığı", "Kat şefi odayı baştan sona, banyodan yatağa kadar çeker."], ["Kısa adımlar, hızlı kontrol", "Her adıma bir not eklenir; kısa bir quiz standardın oturduğunu doğrular."], ["Misafirden önce hazır", "Nöbetçi müdür kimin hazır olduğunu tesis ve vardiya bazında görür."]] } },
];
