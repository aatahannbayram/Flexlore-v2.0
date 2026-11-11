"use client";
/* /home2 trial, built from scratch (2026-11-11). Principle taken from the competitor review (Opus, 7taps, DeepHow), not
 * their layouts: the product is the proof, so every block shows a real app screen on a bright photo of the work it
 * belongs to. Dark #111 ground, no dark video, no glass-on-film. Copy comes from the approved site strings; the only
 * numbers are the hero's labelled sample. Order: hero with product tabs, programs, four product blocks, roles,
 * industries, questions, closing call. */
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleProvider";
import { HOME2 } from "../i18n/home2";
import { SITE } from "../config";
import { Device } from "../AppScreens";
import { CameraScreen, StepPlayerScreen, STILL } from "../v3/Home";
import { EASE } from "../ui/Reveal";
import { TrustStrip } from "../home/Sections";
import { ArrowRight, Check, CaretDown, ForkKnife, Factory, Bed, Storefront } from "../ui/icons";

const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });

/* Strings new to this page; every other line is the site's own copy. Other locales read English. */
const T = {
  en: {
    tabs: ["Film", "Teach", "Check", "See"],
    k: ["Film and split", "Watch on the floor", "Quiz", "Readiness"],
    ticks: [["No studio, no script", "AI drafts steps and quiz", "You approve and assign"], ["On their own phone", "In their own language", "Replay any step"],
      ["Opens after every step is watched", "You edit and approve it", "Result comes straight to you"], ["By person, shift and location", "No chasing anyone", "Know which site needs you"]],
    rolesK: "Who it is for", rolesH: "One loop, three people.",
    roles: [["Managers", "Film the job once, approve the draft, assign it by role and site."], ["Frontline teams", "Learn the job on their own phone, at the station, in their language."], ["Head office", "One standard across every site, and one view of who is ready."]],
    indK: "Industries", faqK: "Questions", sample: "Sample data", ready: "ready", step: "Step 3 of 6", more: "All questions",
  },
  tr: {
    tabs: ["Çek", "Öğret", "Ölç", "Gör"],
    k: ["Çek ve böl", "Sahada izle", "Quiz", "Hazırlık"],
    ticks: [["Stüdyo, senaryo gerekmez", "Adımları ve quizi AI taslaklar", "Siz onaylar, siz atarsınız"], ["Kendi telefonunda", "Kendi dilinde", "Her adımı yeniden açar"],
      ["Tüm adımlar izlenince açılır", "Siz düzenler, siz onaylarsınız", "Sonuç doğrudan size gelir"], ["Kişi, vardiya ve şube bazında", "Kimseyi kovalamadan", "Hangi şubenin size ihtiyacı var"]],
    rolesK: "Kimler için", rolesH: "Tek döngü, üç kişi.",
    roles: [["Yöneticiler", "İşi bir kez çeker, taslağı onaylar, role ve şubeye göre atar."], ["Saha ekipleri", "İşi kendi telefonunda, işin başında, kendi dilinde öğrenir."], ["Merkez ofis", "Her şubede tek standart, kimin hazır olduğuna tek bakış."]],
    indK: "Sektörler", faqK: "Sorular", sample: "Örnek veri", ready: "hazır", step: "Adım 3 / 6", more: "Tüm sorular",
  },
} as const;

const pic = (n: string, sizes: string, cls: string, pos = "50% 50%", eager = false) => (
  <picture className="absolute inset-0"><source type="image/avif" srcSet={`/photos/${n}-800.avif 800w, /photos/${n}-1600.avif 1600w`} sizes={sizes} />
    <img src={`/photos/${n}-1600.webp`} srcSet={`/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w`} sizes={sizes} alt="" decoding="async" loading={eager ? "eager" : "lazy"}
      style={{ objectPosition: pos }} className={cls} /></picture>);

/** A bright photo of the work with the app standing in it: the visual every block on this page shares. */
function Stage({ photo, pos, children, label, className = "" }: { photo: string; pos?: string; children: React.ReactNode; label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-[#1A1A1A] ${className}`}>
      {pic(photo, "(min-width:1024px) 50vw, 100vw", "h-full w-full object-cover", pos)}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgb(17_17_17/0.35),transparent)]" />
      <div className="absolute left-1/2 top-1/2 h-[86%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_24px_36px_rgba(0,0,0,0.45)]" style={{ aspectRatio: "393 / 852" }} dir="ltr">
        <Device label={label}>{children}</Device>
      </div>
    </div>);
}
const Tick = ({ t }: { t: string }) => (
  <li className="flex items-center gap-2.5 text-[15px] text-ink"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[.08]"><Check size={12} aria-hidden="true" className="tick" /></span>{t}</li>);
const Kick = ({ children }: { children: React.ReactNode }) => (
  <p className="flex items-center gap-2 text-[13px] font-medium text-ink-muted"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame" />{children}</p>);

/* ---------- Hero: the promise on the start side, the product on the end side, four tabs that walk the loop ---------- */
function Hero({ x }: { x: (typeof T)["en"] | (typeof T)["tr"] }) {
  const { d, lang } = useLocale(); const h = d.hero; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const on = useInView(ref, { amount: 0.3 });
  const [i, setI] = useState(0); const [hold, setHold] = useState(false);
  useEffect(() => { if (!on || hold || reduce) return; const t = window.setTimeout(() => setI((k) => (k + 1) % 4), 5500); return () => window.clearTimeout(t); }, [on, hold, reduce, i]);
  const photos = ["stage-firin", "stage-uretim", "stage-restoran", "stage-otel"]; const pos = ["50% 40%", "50% 10%", "50% 5%", "50% 5%"];
  const screen = i === 0 ? <CameraScreen active={on && !reduce} lang={lang} /> : i === 1 ? <StepPlayerScreen active={on} lang={lang} />
    : i === 2 ? <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} /> : <Ready active={on} lang={lang} />;
  const nums = (h.chip.v.match(/\d+/g) ?? ["12", "14"]).map(Number); const done = Math.min(...nums), of = Math.max(...nums);
  return (
    <section aria-labelledby="hero-h" className="pb-14 pt-[calc(var(--header-h)+40px)] md:pb-20 md:pt-[calc(var(--header-h)+64px)]">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Kick>{h.rot.slice(0, 4).join(" · ")}</Kick>
          <h1 id="hero-h" className="mt-5 text-[36px] font-semibold leading-[1.04] tracking-[-0.045em] text-ink sm:text-[46px] lg:text-[54px]">{h.h1a} <span className="text-ink-faint">{h.h1b}</span></h1>
          <p className="mt-5 max-w-[30rem] text-[16px] leading-[1.6] text-ink-muted">{h.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={SITE.demo} target="_blank" rel="noopener" className="btn btn-accent h-12 px-6 text-[15px]">{d.nav.cta}</a>
            <a href="#loop" className="btn btn-secondary h-12 px-5 text-[15px]">{d.process.k}<CaretDown size={14} aria-hidden="true" /></a>
          </div>
        </div>
        <div ref={ref} className="lg:col-span-7" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div className="relative aspect-[4/5] sm:aspect-[16/12] lg:aspect-auto lg:h-[min(620px,calc(100svh-var(--header-h)-170px))]">
            <AnimatePresence initial={false}>
              <m.div key={i} className="absolute inset-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                <Stage photo={photos[i]} pos={pos[i]} label={x.tabs[i]} className="h-full">{screen}</Stage>
              </m.div>
            </AnimatePresence>
            {/* The sample readiness, floating on the photo. */}
            <div className="pointer-events-none absolute bottom-4 end-4 w-[176px] rounded-[18px] bg-[rgb(17_17_17/0.78)] p-3.5 text-white backdrop-blur-md md:bottom-6 md:end-6 md:w-[200px]">
              <div className="flex items-baseline justify-between"><span className="text-[26px] font-semibold tabular-nums tracking-[-0.04em]">{done}/{of}</span><span className="text-[12px] text-white/70">{x.ready}</span></div>
              <span className="mt-2 block h-1 overflow-hidden rounded-full bg-white/15"><span className="block h-full rounded-full bg-white" style={{ width: `${(100 * done) / of}%` }} /></span>
              <p className="mt-2 truncate text-[12px] text-white/70">{h.chip.t} · {x.sample}</p>
            </div>
          </div>
          <div role="tablist" aria-label={d.process.k} className="mt-3 grid grid-cols-4 gap-1 rounded-full bg-white/[.05] p-1">
            {x.tabs.map((t, k) => (
              <button key={t} type="button" role="tab" aria-selected={i === k} onClick={() => setI(k)}
                className={`relative h-11 rounded-full text-[14px] font-medium transition-colors ${i === k ? "bg-[#F4F0EB] text-[#111]" : "text-ink-muted hover:text-ink"}`}>
                <span className="tabular-nums opacity-50">0{k + 1}</span> {t}</button>))}
          </div>
        </div>
      </div>
    </section>);
}

/* ---------- The loop as four product blocks: copy on one side, the real screen on a bright photo on the other ---------- */
function Block({ n, k, h, p, ticks, photo, pos, flip, children }: { n: number; k: string; h: string; p: string; ticks: readonly string[]; photo: string; pos: string; flip: boolean; children: (on: boolean) => React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null); const on = useInView(ref, { amount: 0.35 }); const near = useInView(ref, { margin: "400px 0px", once: true }); const reduce = useReducedMotion();
  return (
    <m.article ref={ref} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.7, ease: EASE }}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-5 ${flip ? "lg:order-last" : ""}`}>
        <Kick><span className="tabular-nums text-ink">0{n}</span> {k}</Kick>
        <h3 className="mt-4 text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-ink md:text-[36px]">{h}</h3>
        <p className="mt-4 max-w-[28rem] text-[16px] leading-[1.6] text-ink-muted">{p}</p>
        <ul className="mt-6 flex flex-col gap-3">{ticks.map((t) => <Tick key={t} t={t} />)}</ul>
      </div>
      <div className="lg:col-span-7">
        <Stage photo={photo} pos={pos} label={h} className="aspect-[4/5] sm:aspect-[16/12] lg:aspect-[16/11]">{near ? children(on) : <div className="absolute inset-0 bg-[#111]" />}</Stage>
      </div>
    </m.article>);
}

export default function Home2() {
  const { d, lang, locale } = useLocale(); const x = T[lang === "tr" ? "tr" : "en"]; const s = HOME2[locale].steps; const tabs = HOME2[locale].tabs;
  const IND = [["/sektor/restoran/", "stage-restoran", ForkKnife, "50% 10%"], ["/sektor/uretim/", "stage-uretim", Factory, "50% 15%"], ["/sektor/otel/", "stage-otel", Bed, "50% 10%"], ["/sektor/franchise/", "stage-franchise", Storefront, "50% 15%"]] as const;
  const faq = (d.faq as unknown as { items: [string, string][] }).items.slice(0, 5);
  return (
    <>
      <Hero x={x} />
      {/* Programs: the logos stay as they are on the home page. */}
      <div className="container-x"><TrustStrip as="div" label={d.trust.programs} /></div>
      <section id="loop" aria-labelledby="loop-h" className="section-y">
        <div className="container-x">
          <div className="mx-auto max-w-[44rem] text-center">
            <div className="flex justify-center"><Kick>{d.process.k}</Kick></div>
            <h2 id="loop-h" className="v4-h2 mt-4">{d.process.h}</h2>
          </div>
          <div className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28">
            <Block n={1} k={x.k[0]} h={s[0][0]} p={s[1][1]} ticks={x.ticks[0]} photo="stage-franchise" pos="50% 15%" flip={false}>{(on) => <Editor active={on} lang={lang} still={STILL[1]} />}</Block>
            <Block n={2} k={x.k[1]} h={s[2][0]} p={s[2][1]} ticks={x.ticks[1]} photo="stage-uretim" pos="50% 10%" flip>{(on) => <StepPlayerScreen active={on} lang={lang} />}</Block>
            <Block n={3} k={x.k[2]} h={s[3][0]} p={s[3][1]} ticks={x.ticks[2]} photo="stage-restoran" pos="50% 5%" flip={false}>{(on) => <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} />}</Block>
            <Block n={4} k={x.k[3]} h={s[4][0]} p={s[4][1]} ticks={x.ticks[3]} photo="stage-otel" pos="50% 5%" flip>{(on) => <Ready active={on} lang={lang} />}</Block>
          </div>
        </div>
      </section>

      {/* Roles: who does what in the loop, on bright photos. */}
      <section aria-labelledby="roles-h" className="section-y pt-0">
        <div className="container-x">
          <Kick>{x.rolesK}</Kick><h2 id="roles-h" className="v4-h2 mt-4">{x.rolesH}</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {x.roles.map(([h, p], k) => (
              <li key={h} className="overflow-hidden rounded-[24px] bg-[#1A1A1A]">
                <div className="relative aspect-[4/3]">{pic(["stage-firin", "stage-depo", "office"][k], "(min-width:768px) 33vw, 100vw", "h-full w-full object-cover", ["50% 30%", "50% 20%", "50% 40%"][k])}</div>
                <div className="p-5 md:p-6"><h3 className="text-[20px] font-semibold tracking-[-0.025em] text-ink">{h}</h3><p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{p}</p></div>
              </li>))}
          </ul>
        </div>
      </section>

      {/* Industries: four bright cards with the first use of each. */}
      <section aria-labelledby="ind-h" className="section-y pt-0">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><Kick>{x.indK}</Kick><h2 id="ind-h" className="v4-h2 mt-4 max-w-[22ch]">{d.ind.h}</h2></div>
            <Link href="/see-it/" className="btn btn-secondary h-11">{d.ind.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link></div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IND.map(([href, img, Ic, pos], k) => (
              <li key={href}><Link href={href} className="group block overflow-hidden rounded-[24px] bg-[#1A1A1A]">
                <div className="relative aspect-[4/3] overflow-hidden">{pic(img, "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw", "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]", pos)}</div>
                <div className="p-5"><span className="flex items-center gap-2 text-[17px] font-semibold text-ink"><Ic size={17} aria-hidden="true" />{d.ind.cards[k]}</span>
                  <p className="mt-2 text-[14px] leading-[1.5] text-ink-muted">{tabs[k][1][0]}</p></div>
              </Link></li>))}
          </ul>
        </div>
      </section>

      {/* Questions: the five most asked, open by click. */}
      <section aria-labelledby="faq-h" className="section-y pt-0">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4"><Kick>{x.faqK}</Kick><h2 id="faq-h" className="v4-h2 mt-4">{(d.faq as unknown as { h: string }).h}</h2>
            <Link href="/faq/" className="btn btn-secondary mt-6 h-11">{x.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link></div>
          <div className="flex flex-col gap-2 lg:col-span-8">
            {faq.map(([q, a]) => (
              <details key={q} className="group rounded-[18px] bg-[#1A1A1A] px-5 open:bg-[#1E1E1E]">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium text-ink">{q}<CaretDown size={14} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180" /></summary>
                <p className="pb-5 text-[15px] leading-[1.6] text-ink-muted">{a}</p>
              </details>))}
          </div>
        </div>
      </section>

      {/* Closing: one bright photo, the last call to action. */}
      <section aria-labelledby="end-h" className="section-y pt-0">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[28px] bg-[#1A1A1A]">
            <div className="absolute inset-0">{pic("stage-depo", "100vw", "h-full w-full object-cover", "50% 30%")}</div>
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(17_17_17/0.88)_0%,rgb(17_17_17/0.6)_45%,rgb(17_17_17/0.1)_80%)] rtl:-scale-x-100" />
            <div className="relative max-w-[34rem] p-8 md:p-14">
              <h2 id="end-h" className="v4-h2 text-white">{d.end.h}</h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-white/80">{d.end.p}</p>
              <a href={SITE.demo} target="_blank" rel="noopener" className="btn btn-accent mt-8 h-12 px-6 text-[15px]">{d.end.cta}</a>
            </div>
          </div>
        </div>
      </section>
    </>);
}
