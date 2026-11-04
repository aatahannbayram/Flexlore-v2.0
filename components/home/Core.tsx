import Link from "next/link";
import type { Lang } from "../copy";
import { Reveal, RevealItem } from "../ui/Reveal";
import { ArrowRight, ArrowCounterClockwise, UsersThree, MapPin, ForkKnife, Storefront, Factory, Bed } from "../ui/icons";

/* ---------- 2. Problem: three short parts on a calm ground. Each: a headline, one sentence and one small product-UI
   visual (sample, labelled). No footage, no numbers we cannot stand behind. ---------- */
const PROB = {
  en: { k: "Why it matters", h: "Know-how lives in someone's hands.", lead: "It leaves when they do. New people copy whoever is on shift.", sample: "Sample data, for illustration",
    parts: [
      { h: "Scrap and rework", p: "When the steps live in one person's head, guesswork comes back as remakes, waste and returns." },
      { h: "Slow onboarding", p: "New starters shadow whoever is on shift and wait for someone with time to show them." },
      { h: "Inconsistent quality", p: "Each shift learns the job a little differently, so it looks different at every site." },
    ] },
  tr: { k: "Neden önemli", h: "Bilgi birinin ellerinde yaşar.", lead: "O kişi gidince bilgi de gider. Yeni gelen, vardiyada kim varsa onu taklit eder.", sample: "Örnek veri, gösterim amaçlı",
    parts: [
      { h: "Fire ve yeniden iş", p: "Adımlar tek bir kişinin aklında kalınca tahmin, yeniden yapım, fire ve iade olarak geri döner." },
      { h: "Yavaş işe alıştırma", p: "Yeni başlayanlar vardiyada kim varsa onu izler, gösterecek vakti olan birini bekler." },
      { h: "Tutarsız kalite", p: "Her vardiya işi biraz farklı öğrenir, aynı iş her şubede farklı görünür." },
    ] },
};
const card = "rounded-[20px] bg-surface-1";

function ProbVisual({ i, tr }: { i: number; tr: boolean }) {
  if (i === 0) return (
    <ul className="space-y-1.5 text-[13px]">
      {(tr ? [["Masa 12", "Yanlış garnitür"], ["Masa 7", "Porsiyon eksik"], ["Paket 31", "Sos unutuldu"]] : [["Table 12", "Wrong garnish"], ["Table 7", "Short portion"], ["Order 31", "Sauce missing"]]).map(([a, b]) => (
        <li key={a} className="flex items-center gap-2.5 rounded-xl bg-white/[.04] px-3 py-2">
          <ArrowCounterClockwise size={14} className="text-ice-400" aria-hidden="true" />
          <span className="text-ink">{a}</span><span className="ml-auto text-ice-400">{b}</span>
        </li>))}
    </ul>);
  if (i === 1) return (
    <div className="text-[13px]">
      {(tr ? [["1. gün", "Elif'i izledi"], ["2. gün", "Mert'i izledi"], ["3. gün", "Bekliyor"]] : [["Day 1", "Shadowed Elif"], ["Day 2", "Shadowed Mert"], ["Day 3", "Waiting for someone"]]).map(([a, b], k) => (
        <div key={a} className="flex items-center gap-3 py-1.5">
          <span className={`h-2 w-2 rounded-full ${k === 2 ? "bg-white/20" : "bg-ice-300"}`} />
          <span className="w-12 text-ice-400">{a}</span><span className={k === 2 ? "text-ice-400" : "text-ink"}>{b}</span>
        </div>))}
    </div>);
  return (
    <div className="space-y-2.5 text-[13px]">
      {(tr ? [["Kadıköy", 8], ["Havalimanı", 5], ["Liman", 3]] : [["Downtown", 8], ["Airport", 5], ["Harbour", 3]]).map(([n, v]) => (
        <div key={n as string}>
          <div className="flex justify-between"><span className="text-ink">{n as string}</span><span className="tabular-nums text-ice-400">{v as number}/8 {tr ? "adım" : "steps"}</span></div>
          <span className="mt-1 block h-1 rounded-full bg-white/10"><span className="block h-full rounded-full bg-ice-300" style={{ width: `${((v as number) / 8) * 100}%` }} /></span>
        </div>))}
    </div>);
}

export function Problem3({ lang }: { lang: Lang }) {
  const c = PROB[lang]; const tr = lang === "tr";
  return (
    <section id="problem" aria-labelledby="problem-h" className="section-y bg-bg">
      <div className="container-x">
        <div className="max-w-[40rem]">
          <p className="eyebrow">{c.k}</p>
          <h2 id="problem-h" className="h2 mt-4">{c.h}</h2>
          <p className="lead mt-4">{c.lead}</p>
        </div>
        <Reveal as="ol" stagger={0.06} className="mt-12 grid gap-3 md:grid-cols-3">
          {c.parts.map((x, i) => (
            <RevealItem as="li" key={x.h} className={`${card} flex flex-col p-6 md:p-7`}>
              <span className="text-[13px] tabular-nums text-ice-400">0{i + 1}</span>
              <h3 className="mt-3 text-[20px] font-semibold tracking-[-.02em] text-ink">{x.h}</h3>
              <p className="mt-2 text-[16px] leading-[1.5] text-ink-muted">{x.p}</p>
              <div aria-hidden="true" className="mt-6 rounded-2xl bg-bg p-3">{<ProbVisual i={i} tr={tr} />}</div>
            </RevealItem>))}
        </Reveal>
        <p className="mt-4 text-[12px] text-ink-faint">{c.sample}</p>
      </div>
    </section>);
}

/* ---------- 5. Industries: four cards to /see-it?industry=..., plus the "See Flexlore in your business" card. ---------- */
const IND = {
  en: { k: "Industries", h: "Built for teams that learn by doing.", see: "See it",
    cards: [
      { id: "cafe-restaurant", i: ForkKnife, h: "Cafe and restaurant chains", p: "Same plate, every shift.", job: "Opening routine · 6 steps" },
      { id: "franchise", i: Storefront, h: "Franchise", p: "One launch, every branch.", job: "New menu item · all branches" },
      { id: "manufacturing", i: Factory, h: "Manufacturing", p: "Changeover, without the guesswork.", job: "Line changeover · 8 steps" },
      { id: "hotel", i: Bed, h: "Hotel", p: "Every room to your house standard.", job: "Room turnover · 7 steps" },
    ],
    pick: { h: "See Flexlore in your business", p: "Pick your industry and follow one real job, from the first recording to who is ready.", cta: "Open the walkthrough" } },
  tr: { k: "Sektörler", h: "Yaparak öğrenen ekipler için.", see: "İnceleyin",
    cards: [
      { id: "cafe-restaurant", i: ForkKnife, h: "Kafe ve restoran zincirleri", p: "Her vardiyada aynı tabak.", job: "Açılış rutini · 6 adım" },
      { id: "franchise", i: Storefront, h: "Franchise", p: "Tek lansman, her şube.", job: "Yeni menü ürünü · tüm şubeler" },
      { id: "manufacturing", i: Factory, h: "Üretim", p: "Tahmin yürütmeden kalıp değişimi.", job: "Hat değişimi · 8 adım" },
      { id: "hotel", i: Bed, h: "Otel", p: "Her oda sizin standardınızda.", job: "Oda hazırlığı · 7 adım" },
    ],
    pick: { h: "Flexlore'u kendi işinizde görün", p: "Sektörünüzü seçin, bir gerçek işi ilk çekimden kimin hazır olduğuna kadar izleyin.", cta: "Örneği açın" } },
};

export function IndustryCards({ lang }: { lang: Lang }) {
  const c = IND[lang];
  return (
    <section id="industries" aria-labelledby="ind-h" className="section-y bg-bg">
      <div className="container-x">
        <div className="max-w-[40rem]">
          <p className="eyebrow">{c.k}</p>
          <h2 id="ind-h" className="h2 mt-4">{c.h}</h2>
        </div>
        <Reveal as="ul" stagger={0.05} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {c.cards.map((x) => { const Ic = x.i; return (
            <RevealItem as="li" key={x.id}>
              <Link href={`/see-it/?industry=${x.id}`} className={`${card} group flex h-full min-h-[220px] flex-col p-6 transition-colors duration-200 hover:bg-surface-2`}>
                <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-xl bg-white/[.06] text-ice-200"><Ic size={20} /></span>
                <h3 className="mt-6 text-[20px] font-semibold tracking-[-.02em] text-ink">{x.h}</h3>
                <p className="mt-1.5 text-[16px] text-ink-muted">{x.p}</p>
                <span className="mt-auto flex items-center justify-between pt-6">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/[.05] px-3 py-1.5 text-[12px] text-ice-300"><MapPin size={12} aria-hidden="true" />{x.job}</span>
                  <ArrowRight size={16} aria-hidden="true" className="text-ice-400 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </RevealItem>); })}
        </Reveal>
        <Link href="/see-it/" className={`${card} group mt-3 flex flex-col gap-4 p-6 transition-colors duration-200 hover:bg-surface-2 md:flex-row md:items-center md:justify-between md:p-7`}>
          <span className="flex items-center gap-4">
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[.06] text-ice-200"><UsersThree size={20} /></span>
            <span><span className="block text-[20px] font-semibold tracking-[-.02em] text-ink">{c.pick.h}</span><span className="mt-1 block text-[16px] text-ink-muted">{c.pick.p}</span></span>
          </span>
          <span className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full bg-ink px-5 text-[15px] font-semibold text-bg md:self-auto">{c.pick.cta}<ArrowRight size={14} aria-hidden="true" /></span>
        </Link>
      </div>
    </section>);
}
