"use client";
/* /home2 trial (2026-11-19): the home page in the Sana Learn manner, for comparison with /. Same hero, customers and
 * closing card as the live home; in between, every section follows one pattern: a pill eyebrow, a short headline, one
 * line, one button, then a large photo with the product on a phone. Few words; the photos and screens carry it.
 * English and Turkish copy; other site languages fall back to English (trial page, noindex). */
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "../i18n/Link";
import { m, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "../i18n/LocaleProvider";
import { Device } from "../AppScreens";
import { HeroV3 } from "../v3/Top";
import { CasesV3, EndV3 } from "../v3/Home";
import { TrustStrip } from "../home/TrustStrip";
import { FilmSlate, ListChecks, Question, ChartBar, ArrowRight, Check } from "../ui/icons";

const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Dash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="h-full w-full bg-[#111]" /> });

type Show = { pre: string; pill: string; h: string; p: string; cta: string; href: string };
const T = {
  en: {
    pillars: [["Film", "Record the job once on your phone"], ["Steps", "It becomes short video steps"], ["Quiz", "A quick check after every lesson"], ["Ready", "See who is ready at every location"]],
    show: [
      { pre: "Flexlore for", pill: "Managers", h: "Film it once", p: "Record a job on your phone. Flexlore turns it into steps your team can follow.", cta: "See how", href: "/features/video-to-sop/" },
      { pre: "Flexlore for", pill: "Teams", h: "Learn on the shift", p: "Short videos on their own phone, in their own language, with a quiz at the end.", cta: "See the quiz", href: "/features/ai-quiz/" },
      { pre: "Flexlore for", pill: "Every location", h: "Know who is ready", p: "Who watched, who passed, who needs help. One view for every site.", cta: "See readiness", href: "/features/web-panel/" },
    ] as Show[],
    tabs: [["Restaurants", "Manufacturing", "Bakeries"], ["Kitchens", "Factories", "Hotels"], ["Hotels", "Franchises", "Restaurants"]],
    chips: [[["Step 1 saved", "Open the main switch"], ["6 steps ready", "Sent to the kitchen team"]], [["Lesson done", "Fryer closing · 2 min"], ["Watched in Spanish", "Translated for Maria"]], [["Ayşe K. is ready", "All 6 lessons done"], ["92 % ready", "Kadıköy branch"]]] as [string, string][][],
    web: { pre: "Flexlore on", pill: "The web", h: "Run it from your desk", p: "Build trainings, assign them and follow progress from the web panel.", cta: "See the web panel", href: "/features/web-panel/" },
    sec: { h: "Made for frontline work", items: [["Restaurants", "/industries/restaurants/", "sec-restoran"], ["Manufacturing", "/industries/manufacturing/", "sec-uretim"], ["Hotels", "/industries/hotels/", "sec-otel"], ["Franchises", "/industries/franchises/", "sec-franchise"]] },
  },
  tr: {
    pillars: [["Çek", "İşi bir kez telefonla kaydedin"], ["Adımla", "Kısa video adımlarına dönüşsün"], ["Sına", "Her dersin sonunda kısa bir quiz"], ["Takip et", "Her şubede kim hazır, görün"]],
    show: [
      { pre: "Flexlore", pill: "Yöneticiler için", h: "Bir kez çekin", p: "İşi telefonla kaydedin. Flexlore ekibinizin izleyeceği adımlara dönüştürsün.", cta: "Nasıl çalışır", href: "/features/video-to-sop/" },
      { pre: "Flexlore", pill: "Ekipler için", h: "Vardiyada öğrensin", p: "Kendi telefonunda, kendi dilinde kısa videolar ve sonunda bir quiz.", cta: "Quize bakın", href: "/features/ai-quiz/" },
      { pre: "Flexlore", pill: "Her şube için", h: "Kim hazır, bilin", p: "Kim izledi, kim geçti, kime destek lazım. Tüm şubeler tek ekranda.", cta: "Hazırlık durumu", href: "/features/web-panel/" },
    ] as Show[],
    tabs: [["Restoran", "Üretim", "Fırın"], ["Mutfak", "Fabrika", "Otel"], ["Otel", "Franchise", "Restoran"]],
    chips: [[["1. adım kaydedildi", "Ana şalteri aç"], ["6 adım hazır", "Mutfak ekibine gönderildi"]], [["Ders tamamlandı", "Fritöz kapanışı · 2 dk"], ["İspanyolca izlendi", "Maria için çevrildi"]], [["Ayşe K. hazır", "6 dersin hepsi bitti"], ["%92 hazır", "Kadıköy şubesi"]]] as [string, string][][],
    web: { pre: "Flexlore", pill: "Web panelde", h: "Masanızdan yönetin", p: "Eğitimleri web panelden hazırlayın, atayın ve ilerlemeyi takip edin.", cta: "Web paneline bakın", href: "/features/web-panel/" },
    sec: { h: "Sahada çalışan ekipler için", items: [["Restoran", "/industries/restaurants/", "sec-restoran"], ["Üretim", "/industries/manufacturing/", "sec-uretim"], ["Otel", "/industries/hotels/", "sec-otel"], ["Franchise", "/industries/franchises/", "sec-franchise"]] },
  },
};
const ICONS = [FilmSlate, ListChecks, Question, ChartBar];
/** Three photos plus their tab labels as slider slides. */
const sl = (a: [string, string], b: [string, string], c: [string, string], tabs: string[]): [string, string, string][] => [[...a, tabs[0]], [...b, tabs[1]], [...c, tabs[2]]];

/** A /photos still, full size inside its frame. */
function Still({ n, pos = "50% 50%", sizes = "(min-width:1280px) 1200px, 100vw" }: { n: string; pos?: string; sizes?: string }) {
  return (<picture><source type="image/avif" srcSet={`/photos/${n}-800.avif 800w, /photos/${n}-1600.avif 1600w`} sizes={sizes} />
    <img src={`/photos/${n}-1600.webp`} srcSet={`/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w`} sizes={sizes} alt="" decoding="async" loading="lazy"
      style={{ objectPosition: pos }} className="absolute inset-0 h-full w-full object-cover" /></picture>);
}

/** Sana's eyebrow: plain words, then the audience in a quiet pill. */
const Eyebrow = ({ pre, pill }: { pre: string; pill: string }) => (
  <p className="flex items-center justify-center gap-2 text-[14px] text-ink-faint">{pre}<span className="rounded-full bg-white/[.07] px-3 py-1 font-[450] text-ink">{pill}</span></p>);

/* Motion (2026-11-19, calm like the rest of the site): heads come in as one soft stagger (12 px, blur to sharp, 0.7 s,
 * 0.07 s apart); photo frames grow into place and the photo drifts slower than the page; the phone rises out of the
 * frame; small glass cards pop beside it (Sana's floating UI). Reduced motion: everything rests in place. */
const EASE = [0.22, 1, 0.36, 1] as const;
const group = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 12, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } } };

function Head({ s, id }: { s: Show; id: string }) {
  return (
    <m.div variants={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
      <m.div variants={item}><Eyebrow pre={s.pre} pill={s.pill} /></m.div>
      <m.h2 variants={item} id={id} className="v4-h2 mt-5 [animation:none!important]">{s.h}</m.h2>
      <m.p variants={item} className="mt-4 max-w-[34rem] text-[17px] leading-[1.55] text-ink-muted">{s.p}</m.p>
      <m.div variants={item}><Link href={s.href} className="group mt-6 inline-grid min-h-11 place-items-center"><span className="btn btn-glass-2 btn-38">{s.cta}<ArrowRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100" /></span></Link></m.div>
    </m.div>);
}

/** The wide photo frame: grows from 92 % with softer corners to full size as it scrolls in; the photo inside drifts.
 *  With several photos it is a slider (Ata, 2026-11-19: "few words, let the pictures show it"): a frosted tray of tabs
 *  on top, the photos cross-fade every 5 s while the frame is in view, the open tab fills like a progress bar; pointer
 *  over the frame or keyboard focus on a tab pauses it. Reduced motion: no autoplay, tabs still switch. */
function Frame({ children, slides, shade }: { children?: React.ReactNode; slides: [string, string, string][]; shade: string }) {
  const ref = useRef<HTMLDivElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(enter, [0, 1], [0.92, 1]); const radius = useTransform(enter, [0, 1], [56, 28]);
  const drift = useTransform(pass, [0, 1], ["-5%", "5%"]);
  const [k, setK] = useState(0); const [hold, setHold] = useState(false); const seen = useInView(ref, { amount: 0.4 });
  const play = slides.length > 1 && seen && !hold && !reduce;
  useEffect(() => { if (!play) return; const id = window.setTimeout(() => setK((x) => (x + 1) % slides.length), 5000); return () => window.clearTimeout(id); }, [play, k, slides.length]);
  return (
    <m.div ref={ref} onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)} style={reduce ? { borderRadius: 28 } : { scale, borderRadius: radius }}
      className="relative mt-12 aspect-[4/5] overflow-hidden bg-[#1a1a1a] [transform-origin:50%_0%] sm:aspect-[16/10] lg:aspect-[16/8]">
      <m.div aria-hidden="true" style={reduce ? undefined : { y: drift }} className="absolute inset-[-6%_0]">
        {slides.map(([n, pos], j) => (
          <m.div key={n} initial={false} animate={{ opacity: j === k ? 1 : 0, scale: j === k ? 1 : 1.04 }} transition={{ duration: reduce ? 0 : 1.1, ease: EASE }} className="absolute inset-0">
            {(j === k || j === (k + 1) % slides.length || seen) && <Still n={n} pos={pos} />}
          </m.div>))}
      </m.div>
      <span aria-hidden="true" className={`absolute inset-0 ${shade}`} />
      {slides.length > 1 && (
        <div className="absolute start-3 top-3 z-20 max-w-[calc(100%-1.5rem)] sm:start-5 sm:top-5">
          <div role="tablist" className="seg-tray max-w-full overflow-x-auto !bg-[rgb(17_17_17/0.55)] !backdrop-blur-xl [scrollbar-width:none]" onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
            {slides.map(([n, , label], j) => (
              <button key={n} type="button" role="tab" aria-selected={j === k} aria-current={j === k ? "true" : undefined} onClick={() => setK(j)} className="seg relative">
                <span className="relative overflow-hidden">{label}
                  {j === k && play && <m.i key={k} aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5, ease: "linear" }} className="absolute inset-x-3 bottom-[5px] h-[2px] origin-left rounded-full bg-[#111]/25 rtl:origin-right" />}
                </span>
              </button>))}
          </div>
        </div>)}
      {children}
    </m.div>);
}

/** A small glass card beside the phone: springs in when the frame is in view. */
function Chip({ show, side, top, delay, title, sub, dot = false }: { show: boolean; side: "l" | "r"; top: string; delay: number; title: string; sub: string; dot?: boolean }) {
  return (
    <m.div aria-hidden="true" initial={false} animate={show ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.92, x: side === "l" ? 16 : -16 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: show ? delay : 0 }}
      style={{ top, [side === "l" ? "right" : "left"]: "calc(100% + 14px)" }}
      className="absolute z-10 hidden w-max items-center gap-2.5 rounded-[16px] bg-[rgb(17_17_17/0.72)] py-2.5 pe-4 ps-3 text-white shadow-[0_20px_40px_-18px_rgb(0_0_0/0.8)] ring-1 ring-white/10 backdrop-blur-xl sm:flex">
      <span className={`grid h-7 w-7 place-items-center rounded-full ${dot ? "bg-[#EC6726]" : "bg-white/10"}`}><Check size={14} className="text-white" /></span>
      <span className="leading-tight"><span className="block text-[14px] font-semibold">{title}</span><span className="block text-[12px] text-white/65">{sub}</span></span>
    </m.div>);
}

/* One showcase: the head, then the photo frame with the phone rising out of it and two cards beside it. */
function Showcase({ s, i, slides, chips }: { s: Show; i: number; slides: [string, string, string][]; chips: [string, string][] }) {
  const { d, lang } = useLocale(); const ref = useRef<HTMLDivElement>(null); const reduce = useReducedMotion();
  const on = useInView(ref, { amount: 0.35 }); const near = useInView(ref, { margin: "400px 0px", once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rise = useTransform(scrollYProgress, [0, 1], ["34%", "14%"]);
  const screen = i === 0 ? <Editor active={on} lang={lang} clip="how-editor" /> : i === 1 ? <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} /> : <Ready active={on} lang={lang} />;
  return (
    <section aria-labelledby={`lite-${i}`} className="section-y pt-0">
      <div className="container-x">
        <Head s={s} id={`lite-${i}`} />
        <div ref={ref}>
          <Frame slides={slides} shade="bg-[linear-gradient(to_top,rgb(17_17_17/0.55),rgb(17_17_17/0)_55%)]">
            <div className="absolute inset-x-0 bottom-0 flex justify-center" dir="ltr">
              <m.div style={{ y: reduce ? "14%" : rise }} className="relative w-[58%] max-w-[300px] sm:w-[34%] lg:w-[24%]">
                <div className="rounded-[42px] shadow-[0_60px_90px_-35px_rgb(0_0_0/0.85),0_20px_40px_-20px_rgb(0_0_0/0.6)]">
                  <Device max label={s.h}>{near ? screen : <div className="absolute inset-0 bg-[#111]" />}</Device>
                </div>
                <Chip show={on} side="l" top="22%" delay={0.5} title={chips[0][0]} sub={chips[0][1]} />
                <Chip show={on} side="r" top="40%" delay={0.85} title={chips[1][0]} sub={chips[1][1]} dot />
              </m.div>
            </div>
          </Frame>
        </div>
      </div>
    </section>);
}

/* The web panel: the browser window tilts up into place (a little perspective) as the frame scrolls in. */
function Web({ s }: { s: Show }) {
  const { lang } = useLocale(); const ref = useRef<HTMLDivElement>(null); const reduce = useReducedMotion();
  const on = useInView(ref, { amount: 0.3 }); const near = useInView(ref, { margin: "400px 0px", once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const tilt = useTransform(scrollYProgress, [0, 1], [16, 0]); const lift = useTransform(scrollYProgress, [0, 1], [70, 0]);
  return (
    <section aria-labelledby="lite-web" className="section-y pt-0">
      <div className="container-x">
        <Head s={s} id="lite-web" />
        <div ref={ref}>
          <Frame slides={[["office", "50% 40%", ""]]} shade="bg-[rgb(17_17_17/0.35)]">
            <div className="absolute inset-x-[6%] bottom-0 top-[14%] [perspective:1400px] sm:inset-x-[12%] lg:inset-x-[16%]" dir="ltr">
              <m.div style={reduce ? undefined : { rotateX: tilt, y: lift }} className="h-full overflow-hidden rounded-t-[18px] bg-[#111] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/10 [transform-origin:50%_100%]">
                <div aria-hidden="true" className="flex h-7 items-center gap-1.5 border-b border-white/[.06] px-3"><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /></div>
                <div className="relative h-[calc(100%-1.75rem)]">{near ? <Dash on={on} lang={lang} /> : null}</div>
              </m.div>
            </div>
          </Frame>
        </div>
      </div>
    </section>);
}

export default function HomeLite() {
  const { d, lang, locale } = useLocale(); const t = lang === "tr" ? T.tr : T.en;
  return (
    <>
      <HeroV3><TrustStrip as="div" lang={locale} label={d.trust.programs} /></HeroV3>

      {/* Sana's four-up: a line icon, one bold word, two short lines. */}
      <section aria-label={t.pillars.map((p) => p[0]).join(", ")} className="pb-[var(--section-y)] pt-6">
        <m.ul variants={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} className="container-x grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4">
          {t.pillars.map(([w, l], k) => { const I = ICONS[k]; return (
            <m.li variants={item} key={w} className="group flex flex-col items-center">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/[.05] ring-1 ring-white/[.06] transition-transform duration-500 group-hover:-translate-y-1"><I size={20} aria-hidden="true" className="text-ink" /></span>
              <p className="mt-3 text-[16px] font-semibold tracking-[-0.01em]">{w}</p>
              <p className="mt-1 max-w-[16rem] text-[15px] leading-[1.45] text-ink-muted">{l}</p>
            </m.li>); })}
        </m.ul>
      </section>

      <Showcase s={t.show[0]} i={0} slides={sl(["how-restoran", "60% 40%"], ["how-uretim", "60% 40%"], ["how-firin", "50% 50%"], t.tabs[0])} chips={t.chips[0]} />
      <Showcase s={t.show[1]} i={1} slides={sl(["huddle", "50% 40%"], ["stage-uretim", "50% 10%"], ["stage-otel", "50% 30%"], t.tabs[1])} chips={t.chips[1]} />
      <Showcase s={t.show[2]} i={2} slides={sl(["how-otel", "70% 40%"], ["stage-franchise", "50% 10%"], ["stage-restoran", "50% 5%"], t.tabs[2])} chips={t.chips[2]} />
      <Web s={t.web} />

      {/* Industries: four photos with one word each. */}
      <section aria-labelledby="lite-sec" className="section-y pt-0">
        <div className="container-x">
          <m.h2 variants={item} initial="hidden" whileInView="show" viewport={{ once: true }} id="lite-sec" className="v4-h2 text-center [animation:none!important]">{t.sec.h}</m.h2>
          <m.ul variants={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {t.sec.items.map(([w, href, n]) => (
              <m.li variants={item} key={href}><Link href={href} className="group relative block aspect-[3/4] overflow-hidden rounded-[22px] bg-[#1a1a1a]">
                <span className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"><Still n={n} sizes="(min-width:1024px) 25vw, 50vw" /></span>
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(17_17_17/0.7),rgb(17_17_17/0)_50%)] transition-opacity duration-500 group-hover:opacity-80" />
                <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[17px] font-semibold text-white">{w}<ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" /></span>
              </Link></m.li>))}
          </m.ul>
        </div>
      </section>

      <CasesV3 />
      <EndV3 />
    </>);
}
