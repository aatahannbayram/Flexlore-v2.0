"use client";
/* /home2 trial (2026-11-11). Two parts only: the framed-scene hero, then one light "sheet" that rises over it with the
 * why in four bento cards and a sentence that reads the loop, word by word, with small pills and icons set into it.
 * Colours follow the brand (cream, ink, a little orange; no blue). Copy is the site's approved text; the only numbers
 * are the labelled sample ones already used on the home page. */
import { Fragment, useRef } from "react";
import dynamic from "next/dynamic";
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLocale } from "../i18n/LocaleProvider";
import { HOME2 } from "../i18n/home2";
import { SITE } from "../config";
import { TrustStrip } from "../home/Sections";
import { Check, Play, Translate, FilmSlate, Scissors, ArrowUpRight, ShieldCheck, ChartBar, ListChecks, UsersThree } from "../ui/icons";
import { Device } from "../AppScreens";
import { StoreButtons } from "../Icons";

const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });

/* ---------- Hero: a framed scene ----------
 * The same bright kitchen photo twice: softened full-bleed behind, sharp inside a rounded glass frame. The headline sits
 * in the middle with a small looping clip set into the line (the job being filmed) and a tick after the payoff; one
 * white call to action; the programs strip runs along the frame's foot. The site header floats over the frame's top. */
const HERO_IMG = "ws-mutfak";
function HeroPic({ cls }: { cls: string }) {
  return (<picture className="absolute inset-0"><source type="image/avif" srcSet={`/photos/${HERO_IMG}-800.avif 800w, /photos/${HERO_IMG}-1600.avif 1600w`} sizes="100vw" />
    <img src={`/photos/${HERO_IMG}-1600.webp`} srcSet={`/photos/${HERO_IMG}-800.webp 800w, /photos/${HERO_IMG}-1600.webp 1600w`} sizes="100vw" alt="" fetchPriority="high" decoding="async" className={cls} /></picture>);
}
function Hero() {
  const { d } = useLocale(); const h = d.hero; const reduce = useReducedMotion();
  const words = h.h1a.split(" "); const lastA = words.pop(); const sub = h.sub.split(/(?<=\.)\s/)[0];
  return (
    <section aria-labelledby="hero-h" className="dark relative isolate overflow-hidden bg-[#111] p-2 text-white sm:p-5 lg:p-7">
      <HeroPic cls="h-full w-full scale-110 object-cover blur-[20px] brightness-[0.45]" />
      <div className="relative flex min-h-[calc(100svh-16px)] flex-col overflow-hidden rounded-[28px] ring-1 ring-white/35 sm:min-h-[calc(100svh-40px)] sm:rounded-[36px] lg:min-h-[calc(100svh-56px)]">
        <HeroPic cls="h-full w-full object-cover object-[50%_40%]" />
        <span aria-hidden="true" className="absolute inset-0 bg-[rgb(10_10_10/0.6)]" />
        <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_45%,rgb(10_10_10/0.4),transparent)]" />
        <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgb(255_255_255/0.35),inset_0_0_0_1px_rgb(255_255_255/0.08)]" />
        <div className="relative mx-auto flex w-full max-w-[60rem] flex-1 flex-col items-center justify-center px-5 pb-10 pt-[calc(var(--header-h)+40px)] text-center">
          <m.h1 id="hero-h" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: "easeOut" }}
            className="text-[40px] font-semibold leading-[1.06] tracking-[-0.035em] [text-shadow:0_2px_24px_rgb(0_0_0/0.35)] sm:text-[56px] lg:text-[72px]">
            {words.join(" ")}{" "}
            {/* A short clip set into the line, slightly turned, like a photo laid on the page. */}
            <span aria-hidden="true" className="relative mx-1 inline-block h-[0.8em] w-[1.35em] -rotate-[4deg] overflow-hidden rounded-[0.16em] align-[-0.06em] ring-[3px] ring-white/90 shadow-[0_12px_30px_-10px_rgb(0_0_0/0.7)]">
              <video className="h-full w-full object-cover" src="/video/how-editor.mp4" poster="/video/how-editor.webp" muted loop playsInline autoPlay={!reduce} preload="metadata" />
            </span>{" "}{lastA}
            <br />
            <span className="text-white/85">{h.h1b}</span>
            <span aria-hidden="true" className="ms-2 inline-grid h-[0.62em] w-[0.62em] translate-y-[-0.05em] place-items-center rounded-full ring-[3px] ring-white/85 align-middle"><Check size={18} className="text-white" /></span>
          </m.h1>
          <p className="mt-6 max-w-[30rem] text-[16px] leading-[26px] text-white/80 md:text-[18px] md:leading-[28px]">{sub}</p>
          <a href={SITE.demo} target="_blank" rel="noopener" className="btn btn-cta mt-8 h-12 px-7">{d.nav.cta}</a>
        </div>
        {/* Programs along the frame's foot. */}
        <div className="relative pb-5 sm:pb-7"><TrustStrip as="div" label={d.trust.programs} /></div>
      </div>
    </section>);
}

/* ---------- The sheet: why Flexlore in four cards ---------- */
const S = {
  en: { tag: "Why", sample: "Sample data", ready: "ready", correct: "Correct", q: "Before you start the fryer, what do you check?", a: "Oil level and filter",
    cards: ["See who is ready", "Watches step by step", "Ready on the floor", "Takes the quiz"],
    line: [["Film the job", "Film"], ["split it into steps", "Split"], ["and send it to the team", "Send"]], tail: "Flexlore shows who watched, who passed the quiz and who is ready, on one screen." },
  tr: { tag: "Neden", sample: "Örnek veri", ready: "hazır", correct: "Doğru", q: "Fritözü çalıştırmadan önce neyi kontrol edersiniz?", a: "Yağ seviyesi ve filtre",
    cards: ["Kimin hazır olduğunu görün", "Adım adım izler", "Sahada hazır", "Quizi çözer"],
    line: [["İşi bir kez", "Çekin"], ["adımlara", "Bölün"], ["ve ekibe", "Gönderin"]], tail: "Flexlore kimin izlediğini, kimin quizi geçtiğini ve kimin hazır olduğunu tek ekranda gösterir." },
} as const;
const card = "relative flex min-h-[300px] flex-col sm:aspect-[4/5] sm:min-h-0 items-center overflow-hidden rounded-[28px] bg-[#ECE7E0] p-6 text-center text-[#111]";

/* Readiness by site as a ring (the sample numbers from the web panel). */
function Ring() {
  const seg = [["Merkez", 92, "#111111"], ["Havalimanı", 86, "#3A3A3A"], ["Liman", 79, "#8A847C"], ["Kadıköy", 64, "#EC6726"]] as const;
  const total = seg.reduce((a, x) => a + x[1], 0); let acc = 0; const R = 54, C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 160 160" className="h-[62%] w-auto" aria-hidden="true">
      {seg.map(([n, v, c]) => { const len = (v / total) * C - 6; const off = -acc; acc += (v / total) * C; return (
        <circle key={n} cx="80" cy="80" r={R} fill="none" stroke={c} strokeWidth="26" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={off} transform="rotate(-90 80 80)" strokeLinecap="butt" />); })}
      <circle cx="80" cy="80" r="9" fill="#111" /><circle cx="80" cy="80" r="3.5" fill="#ECE7E0" />
      {seg.map(([n, v], k) => { const a = ((seg.slice(0, k).reduce((x, y) => x + y[1], 0) + v / 2) / total) * 2 * Math.PI - Math.PI / 2; return (
        <g key={n + "l"} transform={`translate(${80 + Math.cos(a) * 70} ${80 + Math.sin(a) * 70})`}><rect x="-15" y="-8" width="30" height="16" rx="5" fill="#111" opacity=".78" /><text x="0" y="4" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#fff">%{v}</text></g>); })}
    </svg>);
}
function Sheet() {
  const { lang, locale, d } = useLocale(); const t = S[lang === "tr" ? "tr" : "en"]; const w = HOME2[locale].why; const reduce = useReducedMotion();
  const rise = (k: number) => (reduce ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-8% 0px" }, transition: { duration: 0.22, ease: "easeOut" as const, delay: k * 0.06 } });
  const nums = (d.hero.chip.v.match(/\d+/g) ?? ["12", "14"]).map(Number); const done = Math.min(...nums), of = Math.max(...nums);
  return (
    <section aria-labelledby="why-h" className="relative z-10 -mt-24 px-2 sm:-mt-28 sm:px-5 lg:px-7">
      {/* Two faint sheets behind the front one, so it reads as a stack rising over the hero. */}
      <span aria-hidden="true" className="absolute inset-x-[9%] -top-6 h-24 rounded-t-[40px] bg-[#F4F0EB]/30" />
      <span aria-hidden="true" className="absolute inset-x-[5%] -top-3 h-24 rounded-t-[40px] bg-[#F4F0EB]/55" />
      <div className="relative rounded-[32px] bg-[#F7F4EF] pb-24 pt-20 text-[#111] sm:rounded-[40px] md:pt-28">
        <div className="container-x">
          <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
            <span className="inline-flex -rotate-[6deg] items-center gap-1.5 rounded-[8px] bg-[#111] px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#F7F4EF]"><span className="text-[#F7F4EF]/55">01</span>{t.tag}</span>
            <h2 id="why-h" className="mt-6 text-[40px] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] sm:text-[56px] lg:text-[72px]">{w.h} {w.h2}</h2>
            <p className="mt-6 max-w-[40rem] text-[16px] leading-[26px] text-[#111]/70 md:text-[18px] md:leading-[28px]">{w.lead}</p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-[1120px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <m.li {...rise(0)} className={card}><Ring /><p className="mt-auto text-[18px] font-semibold leading-[24px]">{t.cards[0]}</p><p className="mt-1 text-[12px] text-[#111]/50">{t.sample}</p></m.li>
            <m.li {...rise(1)} className={card}>
              <p className="text-[18px] font-semibold leading-[24px]">{t.cards[1]}</p>
              <div className="mt-auto flex flex-col items-center gap-3">
                <span className="flex -space-x-2"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#111] text-white ring-4 ring-[#ECE7E0]"><Play size={20} weight="fill" /></span><span className="grid h-14 w-14 place-items-center rounded-full bg-[#EC6726] text-white ring-4 ring-[#ECE7E0]"><Translate size={20} /></span></span>
                <span className="h-0 w-0 border-x-[7px] border-b-[10px] border-x-transparent border-b-[#111]" aria-hidden="true" />
                <span className="h-20 w-20 overflow-hidden rounded-full ring-4 ring-white shadow-[0_14px_30px_-12px_rgb(0_0_0/0.45)]"><img src="/photos/sec-restoran-800.webp" alt="" loading="lazy" decoding="async" className="h-full w-full scale-[2.4] object-cover object-[62%_18%]" /></span>
              </div>
            </m.li>
            <m.li {...rise(2)} className={`${card} justify-end text-white`}>
              <img src="/photos/sec-uretim-800.webp" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[55%_40%]" />
              <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.05),rgb(17_17_17/0.55))]" />
              <span className="relative text-[52px] font-extrabold leading-none tracking-[-0.04em] tabular-nums">{done}/{of}</span>
              <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[13px] font-medium backdrop-blur-md"><Check size={13} />{t.ready} · {t.sample}</span>
              <p className="relative mt-4 text-[18px] font-semibold leading-[24px]">{t.cards[2]}</p>
            </m.li>
            <m.li {...rise(3)} className={card}>
              <p className="text-[18px] font-semibold leading-[24px]">{t.cards[3]}</p>
              <div className="mt-auto w-full rounded-t-[22px] bg-white px-4 pb-0 pt-5 text-start shadow-[0_-10px_40px_-20px_rgb(0_0_0/0.35)]">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#111] text-white"><ShieldCheck size={18} weight="fill" /></span>
                <p className="mt-3 text-[13px] font-semibold leading-[18px]">{t.q}</p>
                <span className="mt-3 flex items-center justify-between rounded-[12px] bg-[#111] px-3 py-2.5 text-[13px] text-white"><span>{t.a}</span><span className="flex items-center gap-1 text-[12px] text-white/75"><Check size={12} />{t.correct}</span></span>
                <span className="mt-2 block h-9 rounded-t-[12px] bg-[#ECE7E0]" />
              </div>
            </m.li>
          </ul>
        </div>
        <Loop t={t} cta={d.nav.cta} />
      </div>
    </section>);
}

/* ---------- The loop as one sentence: verbs as pills, small icon tiles floating, words light up as it scrolls ---------- */
function Word({ w, p, i, n }: { w: string; p: MotionValue<number>; i: number; n: number }) {
  const o = useTransform(p, [i / n, (i + 1) / n], [0.16, 1]);
  return <m.span style={{ opacity: o }}>{w}</m.span>;
}
function Loop({ t, cta }: { t: (typeof S)["en"] | (typeof S)["tr"]; cta: string }) {
  const ref = useRef<HTMLDivElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const tail = t.tail.split(" "); const n = tail.length;
  const pill = "ms-1 inline-flex -translate-y-[0.08em] items-center rounded-[0.5em] bg-white px-[0.5em] py-[0.12em] align-middle text-[0.62em] font-medium shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)] ring-1 ring-black/[.06]";
  const icons = [FilmSlate, Scissors, ArrowUpRight];
  return (
    <div ref={ref} className="container-x relative mt-28 md:mt-36">
      <span aria-hidden="true" className="absolute left-1/2 -top-16 grid h-14 w-14 -translate-x-1/2 rotate-[8deg] place-items-center rounded-[16px] bg-[#EC6726] text-white shadow-[0_18px_30px_-14px_rgb(236_103_38/0.7)]"><ChartBar size={24} weight="fill" /></span>
      <p className="relative mx-auto max-w-[56rem] text-center text-[30px] font-semibold leading-[1.22] tracking-[-0.03em] sm:text-[40px] lg:text-[52px]">
        {t.line.map(([pre, verb], k) => { const I = icons[k]; return (
          <Fragment key={verb}>{pre} <span className={pill}><I size={16} className="me-1.5 opacity-70" />{verb}</span>{k < t.line.length - 1 ? ", " : ". "}</Fragment>); })}
        {reduce ? <span>{t.tail}</span> : tail.map((w, i) => <Fragment key={i}>{i ? " " : ""}<Word w={w} p={scrollYProgress} i={i} n={n} /></Fragment>)}
      </p>
      <span aria-hidden="true" className="absolute -bottom-8 left-[18%] hidden h-12 w-12 -rotate-[10deg] place-items-center rounded-[14px] bg-[#111] text-white md:grid"><Play size={18} weight="fill" /></span>
      <span aria-hidden="true" className="absolute -bottom-2 right-[16%] hidden h-12 w-12 rotate-[12deg] place-items-center rounded-[14px] bg-[#111] text-white md:grid"><Check size={18} /></span>
      <div className="mt-14 flex justify-center"><a href={SITE.demo} target="_blank" rel="noopener" className="inline-flex h-12 items-center rounded-full bg-[#111] px-7 text-[15px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5">{cta}</a></div>
    </div>);
}


/* ---------- Facts: a framed photo with the promise on one side and four plain facts as tiles ----------
 * Only facts that are true today (languages, platforms, what it takes to start); no user counts or ratings. One tile in orange. */
const F = {
  en: { h: "The same standard on every shift, at every site.", p: "Film a job once; your team learns it on their own phone, in their own language.",
    tiles: [["8", "languages"], ["iOS · Android", "team app"], ["Web", "manager panel"], ["1", "phone is all it takes"]] },
  tr: { h: "Her vardiyada, her şubede aynı standart.", p: "Bir işi bir kez çekin; ekibiniz kendi telefonunda, kendi dilinde öğrensin.",
    tiles: [["8", "dilde kullanılabilir"], ["iOS · Android", "ekip uygulaması"], ["Web", "yönetici paneli"], ["1", "telefon yeter"]] },
} as const;
function Facts() {
  const { lang, d } = useLocale(); const t = F[lang === "tr" ? "tr" : "en"]; const img = "ws-j-vinc";
  return (
    <section aria-labelledby="facts-h" className="dark relative isolate mt-[var(--sp-section)] overflow-hidden px-2 py-10 text-white sm:px-5 lg:px-7 lg:py-16">
      <picture className="absolute inset-0 -z-10"><img src={`/photos/${img}-800.webp`} alt="" loading="lazy" decoding="async" className="h-full w-full scale-110 object-cover blur-[22px] brightness-[0.35]" /></picture>
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] ring-1 ring-white/40">
        <picture className="absolute inset-0"><source type="image/avif" srcSet={`/photos/${img}-800.avif 800w, /photos/${img}-1600.avif 1600w`} sizes="100vw" />
          <img src={`/photos/${img}-1600.webp`} srcSet={`/photos/${img}-800.webp 800w, /photos/${img}-1600.webp 1600w`} sizes="100vw" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-[60%_40%]" /></picture>
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_10_10/0.85)_0%,rgb(10_10_10/0.55)_45%,rgb(10_10_10/0.35)_100%)]" />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgb(10_10_10/0.8),transparent)]" />
        <div className="relative grid min-h-[560px] items-end gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-16">
          <div>
            <h2 id="facts-h" className="max-w-[16ch] text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[44px] lg:text-[52px]">{t.h}</h2>
            <p className="mt-5 max-w-[26rem] text-[16px] leading-[26px] text-white/80 md:text-[18px] md:leading-[28px]">{t.p}</p>
            <a href={SITE.demo} target="_blank" rel="noopener" className="mt-8 inline-flex h-12 items-center gap-2 rounded-[12px] bg-[#F7F4EF] px-5 text-[15px] font-semibold text-[#111]"><Play size={14} weight="fill" />{d.nav.cta}</a>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4">
            {t.tiles.map(([v, l], k) => (
              <li key={l} className={`flex min-h-[132px] flex-col items-center justify-center rounded-[18px] p-4 text-center ${k === 0 ? "bg-[#EC6726] text-white" : "bg-[rgb(10_10_10/0.45)] ring-1 ring-white/10 backdrop-blur-md"}`}>
                <span className="text-[28px] font-semibold leading-none tracking-[-0.03em] sm:text-[34px]">{v}</span>
                <span className={`mt-2 text-[14px] ${k === 0 ? "text-white/90" : "text-white/70"}`}>{l}</span>
              </li>))}
          </ul>
        </div>
      </div>
    </section>);
}

/* ---------- Bento: everything the floor needs, photo cards with one line each and one orange stat ---------- */
const B = {
  en: { k: "Built for the floor", h: "Everything learning on the floor needs.", p: "Short video steps, an AI-drafted quiz and one screen that shows who is ready.",
    a: "On their own phone, in their own language.", b: "Replays any step they get stuck on.", c: "people finished the opening routine", d: "AI drafts the quiz; you approve it.", sample: "Sample data" },
  tr: { k: "Saha için", h: "Sahada öğrenmek için gereken her şey.", p: "Kısa video adımları, yapay zekânın taslakladığı quiz ve kimin hazır olduğunu gösteren tek ekran.",
    a: "Kendi telefonunda, kendi dilinde.", b: "Takıldığı adımı yeniden açar.", c: "kişi açılış rutinini tamamladı", d: "Quiz taslağını yapay zekâ hazırlar, siz onaylarsınız.", sample: "Örnek veri" },
} as const;
function Photo({ n, pos, className = "" }: { n: string; pos: string; className?: string }) {
  return <img src={`/photos/${n}-800.webp`} srcSet={`/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w`} sizes="(min-width:1024px) 40vw, 100vw" alt="" loading="lazy" decoding="async" style={{ objectPosition: pos }} className={`absolute inset-0 h-full w-full object-cover ${className}`} />;
}
function Bento() {
  const { lang, d } = useLocale(); const t = B[lang === "tr" ? "tr" : "en"]; const reduce = useReducedMotion();
  const nums = (d.hero.chip.v.match(/\d+/g) ?? ["12", "14"]).map(Number); const done = Math.min(...nums), of = Math.max(...nums);
  const rise = (k: number) => (reduce ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-8% 0px" }, transition: { duration: 0.22, ease: "easeOut" as const, delay: k * 0.06 } });
  const foot = "relative mt-auto bg-[linear-gradient(to_top,#F7F4EF_55%,rgb(247_244_239/0))] px-5 pb-5 pt-16 text-[#111]";
  return (
    <section aria-labelledby="bento-h" className="section-y">
      <div className="container-x">
        <div className="mx-auto max-w-[44rem] text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#EC6726]">{t.k}</p>
          <h2 id="bento-h" className="mt-3 text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink [text-wrap:balance] sm:text-[44px]">{t.h}</h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[16px] leading-[26px] text-ink-muted md:text-[18px] md:leading-[28px]">{t.p}</p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-[1fr_1.6fr_1fr] md:grid-rows-[1fr_1fr] lg:gap-5">
          <m.li {...rise(0)} className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[24px] md:row-span-2"><Photo n="how-otel" pos="70% 30%" /><div className={foot}><Translate size={22} aria-hidden="true" /><p className="mt-3 text-[16px] font-medium leading-[22px]">{t.a}</p></div></m.li>
          <m.li {...rise(1)} className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[24px] md:row-span-2"><Photo n="ws-j-brifing" pos="50% 40%" /><div className={foot}><Play size={22} weight="fill" aria-hidden="true" /><p className="mt-3 text-[16px] font-medium leading-[22px]">{t.b}</p></div></m.li>
          <m.li {...rise(2)} className="flex min-h-[200px] flex-col justify-between rounded-[24px] bg-[#EC6726] p-6 text-white">
            <UsersThree size={24} aria-hidden="true" />
            <span><span className="block text-[52px] font-semibold leading-none tracking-[-0.04em] tabular-nums">{done}/{of}</span><span className="mt-2 block text-[15px] leading-[21px] text-white/90">{t.c}</span><span className="mt-1 block text-[12px] text-white/75">{t.sample}</span></span>
          </m.li>
          <m.li {...rise(3)} className="relative flex min-h-[200px] flex-col overflow-hidden rounded-[24px]"><Photo n="ws-j-alerjen" pos="50% 45%" /><div className={foot}><ListChecks size={22} aria-hidden="true" /><p className="mt-3 text-[15px] font-medium leading-[21px]">{t.d}</p></div></m.li>
        </ul>
      </div>
    </section>);
}

/* ---------- App: the team app on two phones, the store buttons under the promise ---------- */
const A = {
  en: { k: "Team app", h: "On every phone your team already has.", p: "Your team learns the job on the phone; you run it from the desk. Download it on iOS and Android." },
  tr: { k: "Ekip uygulaması", h: "Ekibinizin zaten taşıdığı telefonda.", p: "Ekip işi telefonda öğrenir, siz masadan yönetirsiniz. iOS ve Android'de indirin." },
} as const;
function AppPhones() {
  const { lang, d } = useLocale(); const t = A[lang === "tr" ? "tr" : "en"]; const ref = useRef<HTMLDivElement>(null);
  return (
    <section aria-labelledby="app-h" className="px-2 pb-[var(--sp-section)] sm:px-5 lg:px-7">
      <div className="overflow-hidden rounded-[32px] bg-[#F7F4EF] text-[#111] sm:rounded-[40px]">
        <div className="mx-auto max-w-[44rem] px-6 pt-16 text-center md:pt-24">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#EC6726]">{t.k}</p>
          <h2 id="app-h" className="mt-3 text-[34px] font-semibold leading-[1.1] tracking-[-0.03em] [text-wrap:balance] sm:text-[44px]">{t.h}</h2>
          <p className="mx-auto mt-4 max-w-[32rem] text-[16px] leading-[26px] text-[#111]/70 md:text-[18px] md:leading-[28px]">{t.p}</p>
          <div className="mt-8 flex justify-center"><StoreButtons className="!flex-row flex-wrap justify-center" lang={lang === "tr" ? "tr" : "en"} /></div>
        </div>
        {/* Two phones rising from the foot of the card, slightly turned toward each other. */}
        <div ref={ref} className="relative mx-auto mt-14 flex h-[380px] max-w-[760px] items-end justify-center gap-6 sm:h-[460px] md:mt-20" dir="ltr" aria-hidden="true">
          <div className="relative h-[86%] translate-y-[14%] -rotate-[5deg] drop-shadow-[0_30px_40px_rgb(0_0_0/0.25)]" style={{ aspectRatio: "393 / 852" }}><Device label={d.hero.chip.t}><Quiz active={false} lang={lang} q={d.bento.q} a={d.bento.qa} /></Device></div>
          <div className="relative h-full translate-y-[10%] rotate-[4deg] drop-shadow-[0_30px_40px_rgb(0_0_0/0.25)]" style={{ aspectRatio: "393 / 852" }}><Device label={d.hero.chip.t}><Ready active={false} lang={lang} /></Device></div>
        </div>
      </div>
    </section>);
}

export default function Home2() {
  return (<><Hero /><Sheet /><Facts /><Bento /><AppPhones /></>);
}
