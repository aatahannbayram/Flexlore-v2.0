import { Check, Play, Question } from "../ui/icons";

/* Before and after ("Make it memorable" #2). Left: a scanned PDF instruction with a sticky note. Right: the same job
 * in Flexlore as numbered steps, a quiz chip and a Ready badge. Static, server-rendered, flat tones only.
 * Sticky-note yellow is an illustrative paper colour, not a brand colour. */

type Lang = "en" | "tr";

const L = {
  en: {
    k: "Before and after", h: "The same job, before and after.",
    lead: "Most opening routines live in a PDF nobody opens. Here is the same routine in Flexlore.",
    before: "Before", beforeCap: "A long PDF. The real answer lives in one person's head.",
    after: "With Flexlore", afterCap: "Filmed once, split into steps, checked with a short quiz.",
    docCode: "SOP-014 · Rev. 7", docTitle: "Store opening procedure", docPage: "Page 3 of 12",
    docLines: ["3.1 Equipment start-up. Refer to section 5.4 for", "machine settings and to appendix B for exceptions.", "3.2 Cold storage. Rotate stock per policy 2.7."],
    note: "ask Ayşe",
    job: "Opening routine", meta: "3 steps",
    steps: ["Turn on the espresso machine and wait for the ready light.", "Restock the milk fridge. Oldest dates go to the front.", "Wipe the counter and set out clean cups."],
    clip: (n: number) => `Clip for step ${n}`,
    quiz: "Quiz · 2 questions", ready: "Ready",
    docAlt: "A scanned instruction document with dense small text and a sticky note that says ask Ayşe.",
  },
  tr: {
    k: "Önce ve sonra", h: "Aynı iş, önce ve sonra.",
    lead: "Çoğu açılış rutini kimsenin açmadığı bir PDF'te durur. Aynı rutin Flexlore'da böyle görünür.",
    before: "Önce", beforeCap: "Uzun bir PDF. Asıl cevap tek bir kişinin aklında.",
    after: "Flexlore ile", afterCap: "Bir kez çekilir, adımlara bölünür, kısa bir testle kontrol edilir.",
    docCode: "SOP-014 · Rev. 7", docTitle: "Mağaza açılış prosedürü", docPage: "Sayfa 3 / 12",
    docLines: ["3.1 Ekipmanın çalıştırılması. Makine ayarları için", "bölüm 5.4'e, istisnalar için ek B'ye bakınız.", "3.2 Soğuk depo. Stok rotasyonu politika 2.7'ye göre."],
    note: "Ayşe'ye sor",
    job: "Açılış rutini", meta: "3 adım",
    steps: ["Espresso makinesini açın ve hazır ışığının yanmasını bekleyin.", "Süt dolabını doldurun. Tarihi en eski olanlar öne.", "Tezgahı silin ve temiz bardakları dizin."],
    clip: (n: number) => `Adım ${n} videosu`,
    quiz: "Test · 2 soru", ready: "Hazır",
    docAlt: "Yoğun küçük yazılı, taranmış bir talimat belgesi ve üzerinde Ayşe'ye sor yazan bir yapışkan not.",
  },
};

// Flat paper tones (warm greys, no hue toward blue).
const PAPER = "#D6D4CE", PAPER_DARK = "#C9C6BF", INK = "#3A3936", BAR = "#AEABA4", NOTE = "#F2D45C";

export function BeforeAfter({ lang }: { lang: Lang }) {
  const t = L[lang];
  return (
    <section id="before-after" aria-labelledby="ba-h" className="section-y bg-bg">
      <div className="container-x">
        <div className="max-w-[40rem]">
          <p className="eyebrow">{t.k}</p>
          <h2 id="ba-h" className="h2 mt-4">{t.h}</h2>
          <p className="lead mt-6">{t.lead}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Before */}
          <figure className="flex flex-col">
            <div className="relative flex min-h-[440px] flex-1 items-center justify-center overflow-hidden rounded-[20px] bg-surface-1 p-6 sm:p-10">
              <div role="img" aria-label={t.docAlt} className="relative w-full max-w-[340px] -rotate-1 rounded-[3px] p-6" style={{ background: PAPER, color: INK }}>
                {/* scan band: a slightly darker flat strip, like an uneven photocopy */}
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-3" style={{ background: PAPER_DARK }} />
                <span aria-hidden="true" className="absolute left-[18%] top-0 h-full w-px" style={{ background: PAPER_DARK }} />
                <div aria-hidden="true" className="relative">
                  <div className="flex items-baseline justify-between text-[12px] font-medium">
                    <span>{t.docCode}</span><span>{t.docPage}</span>
                  </div>
                  <p className="mt-3 text-[16px] font-semibold tracking-[-.01em]">{t.docTitle}</p>
                  <div className="mt-3 space-y-1 text-[12px] leading-[1.45]">
                    {t.docLines.map((x) => <p key={x}>{x}</p>)}
                  </div>
                  <div className="mt-3 space-y-2">
                    {[100, 92, 97, 64, 100, 88, 95, 72, 100, 83].map((w, i) => (
                      <span key={i} className="block h-[5px] rounded-[1px]" style={{ width: `${w}%`, background: BAR }} />))}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-1.5">
                    {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className="block h-3" style={{ background: i < 3 ? BAR : PAPER_DARK }} />)}
                  </div>
                </div>
                {/* sticky note */}
                <div aria-hidden="true" className="absolute -right-4 bottom-6 w-[120px] rotate-[5deg] rounded-[2px] px-3 py-4 text-center text-[17px] font-semibold leading-tight text-[#2A2A2A] sm:-right-6" style={{ background: NOTE }}>
                  {t.note}
                </div>
              </div>
            </div>
            <figcaption className="mt-4">
              <span className="block text-[15px] font-semibold text-ink">{t.before}</span>
              <span className="mt-1 block text-[15px] text-ink-muted">{t.beforeCap}</span>
            </figcaption>
          </figure>

          {/* With Flexlore */}
          <figure className="flex flex-col">
            <div className="flex min-h-[440px] flex-1 items-center justify-center rounded-[20px] bg-surface-1 p-6 sm:p-10">
              <div className="w-full max-w-[380px] rounded-[16px] bg-surface-2 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[17px] font-semibold tracking-[-.01em] text-ink">{t.job}</p>
                    <p className="text-[13px] text-ice-400">{t.meta}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[rgb(104_210_185/0.14)] px-2.5 py-1 text-[12px] font-semibold text-calm-aqua">
                    <Check size={12} aria-hidden="true" />{t.ready}
                  </span>
                </div>
                <ol className="mt-4 space-y-2.5">
                  {t.steps.map((s, i) => (
                    <li key={s} className="group flex items-center gap-3 rounded-xl bg-bg/60 p-2 transition-colors duration-[250ms] ease-out hover:bg-bg">
                      <span role="img" aria-label={t.clip(i + 1)} className="relative grid h-12 w-[72px] shrink-0 place-items-center rounded-lg bg-white/[.06]">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/[.1] text-ice-200"><Play size={12} weight="fill" aria-hidden="true" /></span>
                      </span>
                      <span className="flex min-w-0 gap-2 text-[14px] leading-snug text-ink">
                        <span className="tabular-nums text-ice-400">{i + 1}.</span><span>{s}</span>
                      </span>
                    </li>))}
                </ol>
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[.07] px-3 py-1.5 text-[13px] font-medium text-ice-200">
                    <Question size={14} aria-hidden="true" />{t.quiz}
                  </span>
                </div>
              </div>
            </div>
            <figcaption className="mt-4">
              <span className="block text-[15px] font-semibold text-ink">{t.after}</span>
              <span className="mt-1 block text-[15px] text-ink-muted">{t.afterCap}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
