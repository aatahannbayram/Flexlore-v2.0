"use client";
/* Reference-led sections (Opus bento, people trio, statement photo, Doinstruct workspace tree and web split).
 * Every colour is a theme token: dark by default, light through the header toggle. Product fragments are drawn
 * in HTML with sample content and labelled; no customer names, quotes or numbers we cannot back up. */
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useInView } from "framer-motion";
import type { Lang } from "../copy";
import { SITE } from "../config";
import { Device } from "../AppScreens";
import { ArrowRight, Check, Users, BookOpen } from "../ui/icons";

const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Dash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="aspect-[1180/720] w-full" /> });

const C = {
  en: {
    sample: "Sample data",
    bento: {
      k: "The product", h: "Everything a shift needs to learn the job.",
      a: { h: "Training built in minutes,", m: "from one phone video.", jobs: [["Opening routine", "kitchenline"], ["Allergen handling", "chef-plating"], ["Fryer cleaning", "chef-fire"]] as [string, string][], view: "View", assigned: "Assigned to", who: ["Kitchen team", "All locations"], cursor: "Manager", cta: "Approve and publish" },
      b: { h: "Standards", m: "that hold on every shift." },
      c: { h: "Quiz.", m: "Drafted from the job itself.", q: "Raw chicken was prepped on a board. What comes next?", a: ["Rinse and reuse it", "Clean, sanitise, switch board", "Wipe with a dry cloth"] },
      d: { h: "One standard", m: "to every location at once.", job: "Opening routine", sent: "Sent to 12 locations", by: "Today, 07:30", card: "Kadıköy", cardP: "12 of 14 completed" },
      e: { h: "Completion.", m: "Know which locations need you next.", rows: [["Downtown", 92], ["Airport", 78], ["Harbour", 64]] as [string, number][], note: "Allergen handling" },
    },
    roles: {
      k: "Who it is for", h: "Built for the people who keep every location running.",
      items: [
        { h: "Managers and area leads", p: "Assign jobs by role and site, and see who has completed each one before the shift starts.", img: "restaurant" },
        { h: "Frontline teams", p: "Short video steps on their own phone. Replay any step at the station, as often as it takes. The app works in 8 languages.", img: "food-qa" },
        { h: "Head office", p: "One library and one standard for every location, with completion side by side.", img: "office" },
      ],
    },
    statement: { h: "Your best person's way of working, on every phone.", p: "Film it once. Every new starter learns it the same way, on any shift, at any site.", cta: "See how it works" },
    ws: {
      k: "Workspaces", h: "Organised the way your business runs.",
      p: "Set up a workspace for each site or team. Assign jobs to the right roles and see what is still due, without chasing anyone.",
      pts: ["A workspace per site, team or department", "Jobs assigned by role and location", "What is due, per team, at a glance"],
      top: ["Head office", "office", 7, 48, 0] as [string, string, number, number, number], kids: [["Kitchen", "chef-fire", 12, 64, 5], ["Front of house", "cafe-opening", 9, 41, 3], ["Production", "safety", 13, 93, 8]] as [string, string, number, number, number][],
      due: (n: number) => `${n} due`, jobs: "jobs", people: "people",
    },
    web: { n: "01", k: "Flexlore Web", h: "Manage and track training from the desk.", p: "The same library and completion data on a big screen. Create, assign and follow every job across teams and locations.", cta: "Book a demo", sample: "Sample data, for illustration" },
  },
  tr: {
    sample: "Örnek veri",
    bento: {
      k: "Ürün", h: "Bir vardiyanın işi öğrenmek için ihtiyacı olan her şey.",
      a: { h: "Dakikalar içinde eğitim,", m: "tek bir telefon videosundan.", jobs: [["Açılış rutini", "kitchenline"], ["Alerjen yönetimi", "chef-plating"], ["Fritöz temizliği", "chef-fire"]] as [string, string][], view: "Aç", assigned: "Atanan", who: ["Mutfak ekibi", "Tüm şubeler"], cursor: "Yönetici", cta: "Onayla ve yayınla" },
      b: { h: "Standartlar", m: "her vardiyada aynı kalır." },
      c: { h: "Quiz.", m: "İşin kendisinden hazırlanır.", q: "Tahtada çiğ tavuk hazırlandı. Sırada ne var?", a: ["Durulayıp tekrar kullan", "Temizle, dezenfekte et, tahtayı değiştir", "Kuru bezle sil"] },
      d: { h: "Tek standart,", m: "aynı anda her şubeye.", job: "Açılış rutini", sent: "12 şubeye gönderildi", by: "Bugün, 07:30", card: "Kadıköy", cardP: "14 kişiden 12'si tamamladı" },
      e: { h: "Tamamlanma.", m: "Hangi şubenin size ihtiyacı olduğunu bilin.", rows: [["Merkez", 92], ["Havalimanı", 78], ["Liman", 64]] as [string, number][], note: "Alerjen yönetimi" },
    },
    roles: {
      k: "Kimler için", h: "Her şubeyi ayakta tutan insanlar için yapıldı.",
      items: [
        { h: "Yöneticiler ve bölge sorumluları", p: "İşleri rol ve şubeye göre atayın, vardiya başlamadan kimin tamamladığını görün.", img: "restaurant" },
        { h: "Saha ekipleri", p: "Kendi telefonlarında kısa video adımlar. İstasyonda istedikleri adımı istedikleri kadar tekrar izlerler. Uygulama 8 dilde kullanılabilir.", img: "food-qa" },
        { h: "Merkez ofis", p: "Her şube için tek kütüphane ve tek standart, tamamlanma yan yana.", img: "office" },
      ],
    },
    statement: { h: "En iyi çalışanınızın iş yapış şekli, her telefonda.", p: "Bir kez çekin. Her yeni gelen, hangi vardiyada ve şubede olursa olsun işi aynı şekilde öğrenir.", cta: "Nasıl çalıştığını görün" },
    ws: {
      k: "Çalışma alanları", h: "İşletmeniz nasıl çalışıyorsa öyle düzenlenir.",
      p: "Her şube veya ekip için bir çalışma alanı kurun. İşleri doğru rollere atayın ve kimseyi kovalamadan neyin beklediğini görün.",
      pts: ["Şube, ekip veya departman başına çalışma alanı", "Rol ve lokasyona göre atanan işler", "Ekip başına bekleyen işler tek bakışta"],
      top: ["Merkez ofis", "office", 7, 48, 0] as [string, string, number, number, number], kids: [["Mutfak", "chef-fire", 12, 64, 5], ["Salon", "cafe-opening", 9, 41, 3], ["Üretim", "safety", 13, 93, 8]] as [string, string, number, number, number][],
      due: (n: number) => `${n} bekliyor`, jobs: "iş", people: "kişi",
    },
    web: { n: "01", k: "Flexlore Web", h: "Eğitimi masadan yönetin ve takip edin.", p: "Aynı kütüphane ve tamamlanma verisi büyük ekranda. Her işi ekipler ve şubeler genelinde oluşturun, atayın ve takip edin.", cta: "Demo planlayın", sample: "Örnek veriler, gösterim amaçlı" },
  },
};

const thumb = (n: string) => <picture><source srcSet={`/photos/${n}-800.avif`} type="image/avif" /><img src={`/photos/${n}-800.webp`} alt="" loading="lazy" className="h-full w-full object-cover" /></picture>;
const Corner = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} aria-label={label} className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-[var(--band-card)] text-ink transition-transform duration-300 hover:scale-105 md:right-6 md:top-6">
    <ArrowRight size={16} aria-hidden="true" className="-rotate-45" /></Link>);
const card = "relative overflow-hidden rounded-[28px] bg-[var(--band)]";
const row = "rounded-[18px] bg-[var(--band-card)]";

/* Opus-style bento: two wide cards, then three. */
export function BentoV4({ lang }: { lang: Lang }) {
  const c = C[lang].bento; const s = C[lang].sample; const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "300px 0px", once: true }); const on = useInView(ref, { amount: 0.2 });
  return (
    <section id="product" aria-labelledby="bento-h" className="section-y">
      <div className="container-x">
        <p className="eyebrow">{c.k}</p>
        <h2 id="bento-h" className="v3-h2 mt-5 max-w-[18ch]">{c.h}</h2>
        <div ref={ref} className="mt-12 grid gap-3 lg:grid-cols-2">
          {/* A: list of jobs with an approval */}
          <article className={`${card} min-h-[520px] p-6 md:p-8`}>
            <h3 className="max-w-[18ch] text-[24px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[28px]">{c.a.h} <span className="text-ink-faint">{c.a.m}</span></h3>
            <Corner href="/ai/" label={c.a.h} />
            <div aria-hidden="true" className="mx-auto mt-10 max-w-[26rem] space-y-2.5">
              {c.a.jobs.map(([j, img], i) => (
                <div key={j} className={row}>
                  <div className="flex items-center gap-3.5 p-2.5 pr-3">
                    <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">{thumb(img)}</span>
                    <span className="flex-1 text-[16px] font-medium tracking-[-0.01em]">{j}</span>
                    <span className="rounded-full bg-[var(--band)] px-3.5 py-1.5 text-[13px] font-medium">{c.a.view}</span>
                  </div>
                  {i > 0 && <div className="flex justify-between border-t border-line px-4 py-2.5 text-[13px]"><span className="text-ink-faint">{c.a.assigned}</span><span className="text-ink-muted">{c.a.who[i - 1]}</span></div>}
                </div>))}
              <div className="relative flex justify-center pt-5">
                <span className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-bg">{c.a.cta}</span>
                <span className="absolute left-[62%] top-[-14px] flex items-end gap-1">
                  <svg width="22" height="22" viewBox="0 0 24 24" className="text-ink"><path fill="currentColor" d="M4 2l16 9-7 2-3 7z" /></svg>
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[12px] font-semibold text-bg">{c.a.cursor}</span>
                </span>
              </div>
            </div>
          </article>
          {/* B: phone with the step editor */}
          <article className={`${card} min-h-[520px] p-6 md:p-8`}>
            <h3 className="max-w-[18ch] text-[24px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[28px]">{c.b.h} <span className="text-ink-faint">{c.b.m}</span></h3>
            <Corner href="/#how" label={c.b.h} />
            <div className="absolute bottom-[-120px] left-1/2 w-[250px] -translate-x-1/2 md:w-[270px]">
              <Device label={c.b.h}>{near ? <Editor active={on} lang={lang} /> : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
          </article>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {/* C: the one orange card */}
          <article className="relative min-h-[440px] overflow-hidden rounded-[28px] bg-accent p-6 text-[#111111] md:p-7">
            <h3 className="max-w-[14ch] text-[24px] font-semibold leading-[1.15] tracking-[-0.025em]">{c.c.h} <span className="text-[#111111]/65">{c.c.m}</span></h3>
            <div aria-hidden="true" className="absolute inset-x-6 bottom-6 md:inset-x-7 md:bottom-7">
              <p className="rounded-[16px] bg-white/90 p-4 text-[14px] font-medium leading-snug">{c.c.q}</p>
              <ul className="mt-2 space-y-2 text-[14px]">
                {c.c.a.map((a, i) => <li key={a} className={`flex items-center justify-between rounded-[14px] px-4 py-3 ${i === 1 ? "bg-[#111111] text-[#fff]" : "bg-[rgb(255_255_255/0.45)]"}`}>{a}{i === 1 && <Check size={15} />}</li>)}
              </ul>
            </div>
          </article>
          {/* D: one standard to every location */}
          <article className={`${card} min-h-[440px] p-6 md:p-7`}>
            <h3 className="max-w-[14ch] text-[24px] font-semibold leading-[1.15] tracking-[-0.025em]">{c.d.h} <span className="text-ink-faint">{c.d.m}</span></h3>
            <Corner href="/sektor/franchise/" label={c.d.h} />
            <div aria-hidden="true" className="absolute inset-x-6 bottom-0 rounded-t-[20px] bg-[var(--band-card)] p-3 pb-5 md:inset-x-7">
              <div className="h-24 overflow-hidden rounded-[14px] [mask-image:linear-gradient(180deg,#000_55%,transparent)]">{thumb("cafe-opening")}</div>
              <div className="mt-3 flex items-center justify-between px-1"><p className="text-[15px] font-semibold">{c.d.job}</p><span className="text-[12px] text-ink-faint">{c.d.by}</span></div>
              <p className="px-1 text-[13px] text-ink-muted">{c.d.sent}</p>
              <div className="mt-3 flex items-center gap-3 rounded-[14px] bg-[var(--band)] p-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[rgb(104_210_185/0.16)] text-calm-aqua"><Users size={17} /></span>
                <span><span className="block text-[14px] font-semibold">{c.d.card}</span><span className="block text-[12px] text-ink-muted">{c.d.cardP}</span></span>
              </div>
            </div>
          </article>
          {/* E: completion by location */}
          <article className={`${card} min-h-[440px] p-6 md:p-7`}>
            <h3 className="max-w-[14ch] text-[24px] font-semibold leading-[1.15] tracking-[-0.025em]">{c.e.h} <span className="text-ink-faint">{c.e.m}</span></h3>
            <Corner href="/#web" label={c.e.h} />
            <div aria-hidden="true" className="absolute inset-x-6 bottom-6 rotate-[-2deg] rounded-[20px] bg-[var(--band-card)] p-5 md:inset-x-7">
              <p className="flex items-center justify-between text-[13px] text-ink-muted"><span>{c.e.note}</span><span>{s}</span></p>
              <ul className="mt-4 space-y-3.5">
                {c.e.rows.map(([n, v]) => <li key={n}><p className="flex justify-between text-[14px]"><span className="font-medium">{n}</span><span className="tabular-nums text-ink-muted">{v}%</span></p>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-[var(--band)]"><span className={`block h-full rounded-full ${v < 70 ? "bg-accent" : "bg-ink"}`} style={{ width: `${v}%` }} /></span></li>)}
              </ul>
            </div>
          </article>
        </div>
        <p className="mt-4 text-[13px] text-ink-faint">{s}.</p>
      </div>
    </section>);
}

/* Opus-style people trio: the active card widens and shows its line. */
export function RolesV4({ lang }: { lang: Lang }) {
  const c = C[lang].roles; const [on, setOn] = useState(1);
  return (
    <section aria-labelledby="roles-h" className="section-y pt-0">
      <div className="container-x">
        <p className="eyebrow">{c.k}</p>
        <h2 id="roles-h" className="v3-h2 mt-5 max-w-[20ch]">{c.h}</h2>
        <ul className="mt-12 flex flex-col gap-6 md:flex-row md:gap-3">
          {c.items.map((it, i) => (
            <li key={it.h} onMouseEnter={() => setOn(i)} className={`transition-[flex-grow] duration-500 ease-[var(--ease-out-expo)] md:basis-0 ${on === i ? "md:grow-[2]" : "md:grow"}`}>
              <button type="button" onClick={() => setOn(i)} onFocus={() => setOn(i)} aria-expanded={on === i} className="block w-full text-left">
                <span className={`block aspect-[4/3] overflow-hidden rounded-[24px] ring-2 ring-offset-4 ring-offset-bg transition md:aspect-auto md:h-[440px] ${on === i ? "ring-ink/80" : "ring-transparent"}`}>
                  <picture><source srcSet={`/photos/${it.img}-800.avif 800w, /photos/${it.img}-1600.avif 1600w`} sizes="(min-width:768px) 50vw, 100vw" type="image/avif" />
                    <img src={`/photos/${it.img}-1600.webp`} srcSet={`/photos/${it.img}-800.webp 800w, /photos/${it.img}-1600.webp 1600w`} sizes="(min-width:768px) 50vw, 100vw" alt="" loading="lazy" className="h-full w-full object-cover" /></picture>
                </span>
                <span className="mt-5 block text-[22px] font-semibold leading-tight tracking-[-0.02em]">{it.h}</span>
                <span className={`mt-2 block max-w-[34rem] text-[16px] leading-[1.5] text-ink-muted ${on === i ? "" : "md:hidden"}`}>{it.p}</span>
              </button>
            </li>))}
        </ul>
      </div>
    </section>);
}

/* Full-bleed photograph with one statement (no customer quote until we have a real, approved one). */
export function StatementV4({ lang }: { lang: Lang }) {
  const c = C[lang].statement;
  return (
    <section aria-labelledby="st-h" className="pb-[var(--section-y)]">
      <div className="container-x">
        <div className="dark relative grid min-h-[560px] place-items-center overflow-hidden rounded-[32px] px-6 py-20 text-center md:min-h-[680px]">
          <picture aria-hidden="true"><source srcSet="/photos/chef-fire-800.avif 800w, /photos/chef-fire-1600.avif 1600w" sizes="100vw" type="image/avif" />
            <img src="/photos/chef-fire-1600.webp" srcSet="/photos/chef-fire-800.webp 800w, /photos/chef-fire-1600.webp 1600w" sizes="100vw" alt="" loading="lazy" className="kenburns absolute inset-0 h-full w-full object-cover" /></picture>
          <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(17_17_17/0.55),rgb(17_17_17/0.75))]" />
          <div className="relative">
            <h2 id="st-h" className="mx-auto max-w-[18ch] text-[clamp(32px,1rem+3vw,64px)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">{c.h}</h2>
            <p className="mx-auto mt-5 max-w-[34rem] text-[17px] leading-[1.55] text-white/80">{c.p}</p>
            <a href="#how" className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-[rgb(17_17_17/0.75)] pl-6 pr-2 text-[15px] font-semibold text-white backdrop-blur">{c.cta}<span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#111]"><ArrowRight size={14} aria-hidden="true" /></span></a>
          </div>
        </div>
      </div>
    </section>);
}

/* Doinstruct-style workspace tree. */
export function WorkspaceV4({ lang }: { lang: Lang }) {
  const c = C[lang].ws; const s = C[lang].sample;
  const Node = ({ n }: { n: [string, string, number, number, number] }) => (
    <div className="overflow-hidden rounded-[18px] bg-[var(--band-card)]">
      <div className="relative h-20 md:h-24">{thumb(n[1])}{n[4] > 0 && <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[#A8491B]">{c.due(n[4])}</span>}</div>
      <p className="px-3 py-3 text-center text-[14px] font-semibold md:text-[15px]">{n[0]}</p>
      <div className="grid grid-cols-2 border-t border-line text-[13px] text-ink-muted">
        <span className="flex items-center justify-center gap-1.5 py-2.5" title={c.jobs}><BookOpen size={14} aria-hidden="true" />{n[2]}<span className="sr-only"> {c.jobs}</span></span>
        <span className="flex items-center justify-center gap-1.5 border-l border-line py-2.5" title={c.people}><Users size={14} aria-hidden="true" />{n[3]}<span className="sr-only"> {c.people}</span></span>
      </div>
    </div>);
  return (
    <section aria-labelledby="ws-h" className="section-y pt-0">
      <div className="container-x grid-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-[32px] bg-[var(--band)] p-5 md:p-10">
            <div className="mx-auto w-[46%] min-w-[150px] max-w-[220px]"><Node n={c.top} /></div>
            <svg aria-hidden="true" viewBox="0 0 300 40" preserveAspectRatio="none" className="mx-auto block h-10 w-[68%] text-line-strong"><path d="M150 0 V18 M150 18 H40 Q30 18 30 28 V40 M150 18 H260 Q270 18 270 28 V40 M150 18 V40" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>
            <div className="grid grid-cols-3 gap-2 md:gap-3">{c.kids.map((k) => <Node key={k[0]} n={k} />)}</div>
            <p className="mt-4 text-center text-[12px] text-ink-faint">{s}</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:pl-6">
          <p className="eyebrow">{c.k}</p>
          <h2 id="ws-h" className="v3-h2 mt-5 max-w-[14ch]">{c.h}</h2>
          <p className="mt-5 text-[17px] leading-[1.55] text-ink-muted">{c.p}</p>
          <ul className="mt-8 space-y-3 border-t border-line pt-7">
            {c.pts.map((p) => <li key={p} className="flex items-start gap-3 text-[15px]"><Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-ink-muted" />{p}</li>)}
          </ul>
        </div>
      </div>
    </section>);
}

/* Doinstruct-style web split: copy left, the dashboard in a bezel running off the right edge. */
export function WebV4({ lang }: { lang: Lang }) {
  const c = C[lang].web; const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "400px 0px", once: true }); const on = useInView(ref, { amount: 0.25 });
  return (
    <section id="web" aria-labelledby="web-h" className="section-y pt-0">
      <div className="container-x grid-12 items-center gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <p className="flex items-center gap-2.5 text-[15px] text-ink-faint"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-ink-faint" />{c.n} · {c.k}</p>
          <h2 id="web-h" className="v3-h2 mt-5 max-w-[14ch]">{c.h}</h2>
          <p className="mt-5 max-w-[30rem] text-[17px] leading-[1.55] text-ink-muted">{c.p}</p>
          <a href={SITE.demo} className="btn btn-primary mt-8 h-12 px-6 text-[16px]">{c.cta}</a>
        </div>
        <div ref={ref} className="col-span-12 lg:col-span-7">
          <div className="relative overflow-hidden rounded-[32px] bg-[var(--band)] pl-6 pt-8 md:pl-12 md:pt-14 lg:-mr-[max(0px,calc((100vw-var(--container))/2-var(--pad-x)))]">
            <div className="dark w-[130%] overflow-hidden rounded-tl-[22px] border-l-[10px] border-t-[10px] border-[#0b0b0b] md:w-[120%]">
              <div role="img" aria-label={c.sample}>{near ? <Dash on={on} /> : <div className="aspect-[1180/720] w-full" />}</div>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-ink-faint">{c.sample}</p>
        </div>
      </div>
    </section>);
}
