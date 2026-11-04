"use client";
/* v3 light direction for the home page: warm neutral ground, large tight headlines, real work photography with the
 * product inside it, one contained dark band for the manager view. Orange is used once per view: the hero payoff,
 * the kicker dot and step numbers. App screens are recreations of the Flexlore app with sample content and are
 * labelled as such. Dark by default; every colour is a theme token, so the header toggle turns it light. Claims stay inside what the existing site and docs already state (see report). */
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useInView } from "framer-motion";
import type { C, Lang } from "../copy";
import { SITE } from "../config";
import { home } from "./home-copy";
import { Device, WorkScreen } from "../AppScreens";
import { StoreButtons } from "../Icons";
import { Rotator } from "../ui/Rotator";
import { VideoModal } from "../ui/VideoModal";
import { Reveal, RevealItem } from "../ui/Reveal";
import { ArrowRight, Play } from "../ui/icons";
import { MountShot } from "./MountShot";
import { CtaDuo } from "./CtaDuo";

const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Dash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="aspect-[1180/720] w-full" /> });

const V3 = {
  en: {
    h1: ["Film the job once.", "Train every shift the same way."],
    sub: "Flexlore turns a phone video of real work into step-by-step video instructions and a short quiz. Managers see who has completed each job, at every location.",
    app: "Get the app",
    card: { t: "Opening routine", s: "Morning shift", v: "12 of 14 completed" },
    sample: "Sample data",
    prob: { k: "The problem", h: "Know-how lives in someone's hands.", h2: "When they leave, it leaves with them." },
    steps: {
      k: "How it works", h: "From one video to a team that knows the job.", lead: "Four steps. No studio, no slide decks.",
      items: [
        { h: "Film the job", p: "Record it on a phone, the way your best person does it." },
        { h: "Check the draft", p: "Flexlore drafts the steps, instructions and quiz. Your team edits and approves." },
        { h: "Learn at the station", p: "People follow each step on video, at their own pace, on their own phone." },
        { h: "See who completed it", p: "Who watched each job and passed its quiz, by person, shift and site." },
      ],
      note: "App screens recreated with sample content.",
      quiz: "A quiz shows who understood the steps. Signing someone off on the floor stays with your supervisor.",
      q: "Raw chicken was prepped on a board. What comes next?", a: ["Rinse and reuse for salad", "Clean, sanitise, then switch to the right colour board", "Wipe with a dry cloth"],
    },
    field: {
      k: "On the floor", h: "Made for the line, not the meeting room.",
      pts: [["Film where the work happens", "A phone on the machine, the counter or the cart. Nothing to set up."], ["One standard for every site", "Send the same job to every branch on the same day."], ["In the language of the team", "The app is available in 8 languages."]] as [string, string][],
    },
    mgr: { k: "For managers", h: "Know where every location stands.", lead: "Assign jobs, follow completion and spot the step people get wrong, in one web dashboard.", sample: "Sample data, for illustration" },
    ind: { k: "Industries", h: "For teams that learn by doing.", more: "See Flexlore in your business",
      cards: [["Restaurants and cafés", "/sektor/restoran/", "chef-plating"], ["Manufacturing", "/sektor/uretim/", "field"], ["Hotels", "/sektor/otel/", "hotel-desk"], ["Franchises", "/sektor/franchise/", "huddle"]] as [string, string, string][] },
    end: { h: "See it on your floor.", p: "Twenty minutes, one of your real jobs. We build it with you on the call.", cta: "Book a demo" },
  },
  tr: {
    h1: ["İşi bir kez çekin.", "Her vardiyayı aynı şekilde eğitin."],
    sub: "Flexlore, gerçek işin telefonla çekilmiş videosunu adım adım video talimatlara ve kısa bir quize dönüştürür. Yöneticiler her işi kimin tamamladığını, her şubede görür.",
    app: "Uygulamayı indirin",
    card: { t: "Açılış rutini", s: "Sabah vardiyası", v: "14 kişiden 12'si tamamladı" },
    sample: "Örnek veri",
    prob: { k: "Sorun", h: "İş bilgisi birinin ellerinde yaşar.", h2: "O kişi gidince bilgi de gider." },
    steps: {
      k: "Nasıl çalışır", h: "Tek videodan işi bilen bir ekibe.", lead: "Dört adım. Stüdyo yok, sunum yok.",
      items: [
        { h: "İşi çekin", p: "En iyi çalışanınız nasıl yapıyorsa öyle, telefonla kaydedin." },
        { h: "Taslağı kontrol edin", p: "Adımları, talimatları ve quizi Flexlore hazırlar. Ekibiniz düzenler ve onaylar." },
        { h: "İstasyonda öğrenin", p: "Herkes adımları kendi telefonunda, kendi hızında videodan izler." },
        { h: "Kimin tamamladığını görün", p: "Her işi kimin izlediği ve quizini geçtiği; kişi, vardiya ve şube bazında." },
      ],
      note: "Uygulama ekranları örnek içerikle yeniden oluşturuldu.",
      quiz: "Quiz, adımları kimin anladığını gösterir. Sahada yetkinlik onayı yine sorumlunuzdadır.",
      q: "Tahtada çiğ tavuk hazırlandı. Sırada ne var?", a: ["Durulayıp salata için kullan", "Temizle, dezenfekte et, doğru renkli tahtaya geç", "Kuru bezle sil"],
    },
    field: {
      k: "Sahada", h: "Toplantı odası için değil, hat için yapıldı.",
      pts: [["İşin yapıldığı yerde çekin", "Makinede, tezgâhta ya da arabada bir telefon. Kurulum yok."], ["Her şube için tek standart", "Aynı işi aynı gün her şubeye gönderin."], ["Ekibin dilinde", "Uygulama 8 dilde kullanılabilir."]] as [string, string][],
    },
    mgr: { k: "Yöneticiler için", h: "Her şubenin nerede olduğunu bilin.", lead: "İş atayın, tamamlanmayı takip edin ve en çok hata yapılan adımı tek bir web panelinde görün.", sample: "Örnek veriler, gösterim amaçlı" },
    ind: { k: "Sektörler", h: "İşi yaparak öğrenen ekipler için.", more: "Flexlore'u kendi işletmenizde görün",
      cards: [["Restoran ve kafeler", "/sektor/restoran/", "chef-plating"], ["Üretim", "/sektor/uretim/", "field"], ["Oteller", "/sektor/otel/", "hotel-desk"], ["Franchise'lar", "/sektor/franchise/", "huddle"]] as [string, string, string][] },
    end: { h: "Kendi sahanızda görün.", p: "Yirmi dakika, gerçek işlerinizden biri. Görüşmede birlikte hazırlıyoruz.", cta: "Demo planlayın" },
  },
};

function Photo({ name, sizes, className = "", eager = false, big = false }: { name: string; sizes: string; className?: string; eager?: boolean; big?: boolean }) {
  const w = big ? [800, 1600, 2400] : [800, 1600];
  return (<picture>
    <source srcSet={w.map((x) => `/photos/${name}-${x}.avif ${x}w`).join(", ")} sizes={sizes} type="image/avif" />
    <img src={`/photos/${name}-1600.webp`} srcSet={w.map((x) => `/photos/${name}-${x}.webp ${x}w`).join(", ")} sizes={sizes} alt="" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} className={className} />
  </picture>);
}

/* 1. Hero: centred statement, then the product inside a real kitchen. */
export function HeroV3({ t, lang }: { t: C; lang: Lang }) {
  const c = V3[lang]; const [demo, setDemo] = useState(false);
  return (
    <section aria-labelledby="hero-h" className="pt-[var(--header-h)]">
      <div className="container-x pt-10 text-center md:pt-14">
        <p className="hs-in v3-kicker rounded-full bg-surface-1 px-4 py-1.5 ring-1 ring-line"><span>{t.rotPre}<Rotator words={t.rot} />{t.rotPost}</span></p>
        <h1 id="hero-h" className="v3-h1 mx-auto mt-7 max-w-[17ch]">
          <span className="block">{c.h1[0]}</span><span className="block text-accent">{c.h1[1]}</span>
        </h1>
        <p className="hs-in mx-auto mt-6 max-w-[38rem] text-[17px] leading-[1.55] text-ink-muted md:text-[19px]" style={{ animationDelay: "200ms" }}>{c.sub}</p>
        <div className="hs-in mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "300ms" }}>
          <a href={SITE.demo} className="btn btn-primary h-12 px-6 text-[16px]">{t.cta}<ArrowRight size={15} aria-hidden="true" /></a>
          <button type="button" onClick={() => setDemo(true)} className="btn btn-secondary h-12 px-6 text-[16px]"><Play size={14} weight="fill" aria-hidden="true" />{t.watch}</button>
        </div>
        <div className="hs-in mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2" style={{ animationDelay: "380ms" }}>
          <span className="text-[13px] text-ink-faint">{c.app}</span>
          <StoreButtons small lang={lang} className="[&_img]:!h-9 [&_a]:!rounded-[7px]" />
        </div>
      </div>

      <div className="container-x mt-10 md:mt-12">
        <div className="hs-device relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#2a2622] sm:aspect-[16/10] lg:aspect-[16/8.4]" style={{ animationDelay: "250ms" }}>
          <Photo name="kitchenline" eager sizes="(min-width:1280px) 1240px, 100vw" className="kenburns absolute inset-0 h-full w-full object-cover object-[30%_center]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(20_17_14/0.05)_0%,rgb(20_17_14/0.15)_55%,rgb(20_17_14/0.45)_100%)]" />
          <div className="dark absolute left-1/2 top-[34%] w-[min(54%,230px)] -translate-x-1/2 sm:left-auto sm:right-[7%] sm:top-[7%] sm:w-[clamp(190px,22%,262px)] sm:translate-x-0">
            <Device label={t.alts[1]}><WorkScreen active lang={lang} /></Device>
          </div>
          <div className="absolute bottom-5 left-5 hidden w-[17rem] rounded-[18px] bg-[rgb(var(--bg-rgb)/0.88)] p-4 text-left text-ink ring-1 ring-line backdrop-blur-md sm:block md:bottom-7 md:left-7">
            <div className="flex items-center justify-between"><p className="text-[14px] font-semibold">{c.card.t}</p><span className="text-[12px] text-ink-faint">{c.sample}</span></div>
            <p className="mt-0.5 text-[13px] text-ink-muted">{c.card.s}</p>
            <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-surface-2"><span className="block h-full w-[86%] rounded-full bg-ink" /></span>
            <p className="mt-2 text-[13px] font-medium tabular-nums">{c.card.v}</p>
          </div>
        </div>
      </div>
      <VideoModal open={demo} onClose={() => setDemo(false)} title={t.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={t.close} />
    </section>);
}

/* 3. Problem: one statement, three consequences. Type does the work. */
export function ProblemV3({ lang }: { lang: Lang }) {
  const c = V3[lang].prob; const pts = home[lang].problem.points;
  return (
    <section aria-labelledby="prob-h" className="section-y">
      <div className="container-x">
        <p className="v3-kicker">{c.k}</p>
        <h2 id="prob-h" className="v3-h2 mt-5 max-w-[22ch]">{c.h} <span className="text-ink-faint">{c.h2}</span></h2>
        <Reveal as="ol" stagger={0.08} className="mt-14 grid gap-3 md:grid-cols-3">
          {pts.map((p, i) => (
            <RevealItem as="li" key={p.h} className="rounded-[22px] bg-surface-1 p-6 md:p-7">
              <span className="text-[14px] font-semibold tabular-nums text-accent-text">0{i + 1}</span>
              <h3 className="mt-8 text-[20px] font-semibold tracking-[-0.02em]">{p.h}</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{p.p}</p>
            </RevealItem>))}
        </Reveal>
      </div>
    </section>);
}

/* 4. How it works: four cards, each with the matching app screen rising from the bottom edge. */
function StepScreen({ i, active, lang }: { i: number; active: boolean; lang: Lang }) {
  const s = V3[lang].steps;
  return i === 0 ? <Editor active={active} lang={lang} /> : i === 1 ? <WorkScreen active={active} lang={lang} />
    : i === 2 ? <Quiz active={active} lang={lang} q={s.q} a={s.a} /> : <Ready active={active} lang={lang} />;
}
export function StepsV3({ t, lang }: { t: C; lang: Lang }) {
  const c = V3[lang].steps; const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "300px 0px", once: true }); const on = useInView(ref, { amount: 0.2 });
  return (
    <section id="how" aria-labelledby="how-h" className="band section-y">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-5">
          <div className="col-span-12 lg:col-span-8"><p className="v3-kicker">{c.k}</p><h2 id="how-h" className="v3-h2 mt-5 max-w-[20ch]">{c.h}</h2></div>
          <p className="col-span-12 text-[17px] text-ink-muted lg:col-span-4 lg:justify-self-end lg:text-right">{c.lead}</p>
        </div>
        <div ref={ref} className="no-sb -mx-[var(--pad-x)] mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--pad-x)] pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {c.items.map((it, i) => (
            <article key={it.h} className="flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] bg-[var(--band-card)] sm:w-[46%] md:w-auto">
              <div className="p-6 pb-0">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-[13px] font-semibold text-bg">{i + 1}</span>
                <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.02em]">{it.h}</h3>
                <p className="mt-2 min-h-[4.6rem] text-[15px] leading-[1.5] text-ink-muted">{it.p}</p>
              </div>
              <div className="relative mt-6 h-[300px] overflow-hidden bg-[var(--band-stage)]">
                <div className="dark absolute left-1/2 top-6 w-[210px] -translate-x-1/2">
                  <Device label={t.alts[i] ?? it.h}>{near ? <StepScreen i={i} active={on} lang={lang} /> : <div className="absolute inset-0 bg-[#111]" />}</Device>
                </div>
              </div>
            </article>))}
        </div>
        <div className="mt-6 flex flex-col gap-2 text-[14px] text-ink-faint md:flex-row md:justify-between">
          <p>{c.quiz}</p><p>{c.note}</p>
        </div>
      </div>
    </section>);
}

/* 5. Field: the product on a real machine, three plain points. */
export function FieldV3({ lang }: { lang: Lang }) {
  const c = V3[lang].field; const ref = useRef<HTMLDivElement>(null); const on = useInView(ref, { amount: 0.3 });
  return (
    <section aria-labelledby="field-h" className="section-y">
      <div className="container-x grid-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="v3-kicker">{c.k}</p>
          <h2 id="field-h" className="v3-h2 mt-5 max-w-[16ch]">{c.h}</h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {c.pts.map(([h, p]) => <li key={h} className="py-5"><p className="text-[17px] font-semibold tracking-[-0.01em]">{h}</p><p className="mt-1 text-[15px] text-ink-muted">{p}</p></li>)}
          </ul>
        </div>
        <div ref={ref} className="col-span-12 lg:col-span-7">
          <div className="dark relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#1a1816]"><MountShot active={on} lang={lang} /></div>
        </div>
      </div>
    </section>);
}

/* 6. Manager view: the one dark band, with the web dashboard. */
export function ManagerV3({ lang }: { lang: Lang }) {
  const c = V3[lang].mgr; const w = home[lang].web; const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "400px 0px", once: true }); const on = useInView(ref, { amount: 0.25 });
  return (
    <section aria-labelledby="mgr-h" className="pb-[var(--section-y)]">
      <div className="container-x">
        <div className="dark overflow-hidden rounded-[32px] bg-surface-1 ring-1 ring-white/[.06] px-5 py-14 sm:px-10 md:py-20 lg:px-16">
          <div className="grid-12 items-end gap-y-5">
            <div className="col-span-12 lg:col-span-7"><p className="v3-kicker !text-ice-300">{c.k}</p><h2 id="mgr-h" className="v3-h2 mt-5 max-w-[16ch]">{c.h}</h2></div>
            <p className="col-span-12 text-[17px] leading-[1.55] text-ink-muted lg:col-span-5">{c.lead}</p>
          </div>
          <div ref={ref} className="relative mt-12 overflow-hidden rounded-[18px] bg-[#1b1b1b] ring-1 ring-white/[.08]">
            <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-white/[.06] px-4"><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="ml-4 h-5 w-56 rounded-md bg-white/[.06]" /></div>
            <div role="img" aria-label={c.sample}>{near ? <Dash on={on} /> : <div className="aspect-[1180/720] w-full" />}</div>
          </div>
          <p className="mt-3 text-[13px] text-ice-400">{c.sample}</p>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {w.callouts.map((x) => <li key={x.h}><p className="text-[17px] font-semibold">{x.h}</p><p className="mt-1.5 text-[15px] leading-[1.55] text-ink-muted">{x.p}</p></li>)}
          </ul>
        </div>
      </div>
    </section>);
}

/* 7. Industries: four photographs, each opening its sector page. */
export function IndustriesV3({ lang }: { lang: Lang }) {
  const c = V3[lang].ind;
  return (
    <section id="industries" aria-labelledby="ind-h" className="section-y pt-0">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="v3-kicker">{c.k}</p><h2 id="ind-h" className="v3-h2 mt-5 max-w-[16ch]">{c.h}</h2></div>
          <Link href="/see-it/" className="btn btn-secondary">{c.more}<ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {c.cards.map(([label, href, img]) => (
            <li key={href}>
              <Link href={href} className="dark group relative block aspect-[3/4] overflow-hidden rounded-[22px] bg-[#2a2622]">
                <Photo name={img} sizes="(min-width:1024px) 25vw, 50vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_45%,rgb(17_17_17/0.78)_100%)]" />
                <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-white md:inset-x-5 md:bottom-5">
                  <span className="text-[16px] font-semibold leading-tight tracking-[-0.01em] md:text-[19px]">{label}</span>
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur transition-colors group-hover:bg-white group-hover:text-[#161616]"><ArrowRight size={14} /></span>
                </span>
              </Link>
            </li>))}
        </ul>
      </div>
    </section>);
}

/* 10. Closing: a contained dark card with the device photograph. */
export function EndV3({ lang }: { lang: Lang }) {
  const c = V3[lang].end;
  return (
    <section aria-labelledby="end-h" className="pb-[var(--section-y)] pt-[calc(var(--section-y)*0.6)]">
      <div className="container-x">
        <div className="dark grid-12 items-center gap-y-10 overflow-hidden rounded-[32px] bg-surface-1 ring-1 ring-white/[.06] px-6 py-12 sm:px-10 md:py-16 lg:px-16">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="end-h" className="v3-h2 max-w-[12ch]">{c.h}</h2>
            <p className="mt-5 max-w-[26rem] text-[17px] leading-[1.55] text-ink-muted">{c.p}</p>
            <a href={SITE.demo} className="btn btn-primary mt-8 h-12 px-6 text-[16px]">{c.cta}<ArrowRight size={15} aria-hidden="true" /></a>
          </div>
          <div className="col-span-12 lg:col-span-7"><CtaDuo lang={lang} /></div>
        </div>
      </div>
    </section>);
}
