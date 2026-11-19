"use client";
/* /home2 trial (2026-11-19): the home page in the Sana Learn manner, for comparison with /. Same hero, customers and
 * closing card as the live home; in between, every section follows one pattern: a pill eyebrow, a short headline, one
 * line, one button, then a large photo with the product on a phone. Few words; the photos and screens carry it.
 * English and Turkish copy; other site languages fall back to English (trial page, noindex). */
import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "../i18n/Link";
import { useInView } from "framer-motion";
import { useLocale } from "../i18n/LocaleProvider";
import { Device } from "../AppScreens";
import { HeroV3 } from "../v3/Top";
import { CasesV3, EndV3 } from "../v3/Home";
import { TrustStrip } from "../home/TrustStrip";
import { FilmSlate, ListChecks, Question, ChartBar, ArrowRight } from "../ui/icons";

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
    web: { pre: "Flexlore", pill: "Web panelde", h: "Masanızdan yönetin", p: "Eğitimleri web panelden hazırlayın, atayın ve ilerlemeyi takip edin.", cta: "Web paneline bakın", href: "/features/web-panel/" },
    sec: { h: "Sahada çalışan ekipler için", items: [["Restoran", "/industries/restaurants/", "sec-restoran"], ["Üretim", "/industries/manufacturing/", "sec-uretim"], ["Otel", "/industries/hotels/", "sec-otel"], ["Franchise", "/industries/franchises/", "sec-franchise"]] },
  },
};
const ICONS = [FilmSlate, ListChecks, Question, ChartBar];

/** A /photos still, full size inside its frame. */
function Still({ n, pos = "50% 50%", sizes = "(min-width:1280px) 1200px, 100vw" }: { n: string; pos?: string; sizes?: string }) {
  return (<picture><source type="image/avif" srcSet={`/photos/${n}-800.avif 800w, /photos/${n}-1600.avif 1600w`} sizes={sizes} />
    <img src={`/photos/${n}-1600.webp`} srcSet={`/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w`} sizes={sizes} alt="" decoding="async" loading="lazy"
      style={{ objectPosition: pos }} className="absolute inset-0 h-full w-full object-cover" /></picture>);
}

/** Sana's eyebrow: plain words, then the audience in a quiet pill. */
const Eyebrow = ({ pre, pill }: { pre: string; pill: string }) => (
  <p className="flex items-center justify-center gap-2 text-[14px] text-ink-faint">{pre}<span className="rounded-full bg-white/[.07] px-3 py-1 font-[450] text-ink">{pill}</span></p>);

function Head({ s, id }: { s: Show; id: string }) {
  return (
    <div className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
      <Eyebrow pre={s.pre} pill={s.pill} />
      <h2 id={id} className="v4-h2 mt-5">{s.h}</h2>
      <p className="mt-4 max-w-[34rem] text-[17px] leading-[1.55] text-ink-muted">{s.p}</p>
      <Link href={s.href} className="mt-6 inline-grid min-h-11 place-items-center"><span className="btn btn-glass-2 btn-38">{s.cta}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></span></Link>
    </div>);
}

/* One showcase: the head, then a wide photo with the phone standing in front of it. The screen plays only in view. */
function Showcase({ s, i, photo, pos }: { s: Show; i: number; photo: string; pos?: string }) {
  const { d, lang } = useLocale(); const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { amount: 0.35 }); const near = useInView(ref, { margin: "400px 0px", once: true });
  const screen = i === 0 ? <Editor active={on} lang={lang} clip="how-editor" /> : i === 1 ? <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} /> : <Ready active={on} lang={lang} />;
  return (
    <section aria-labelledby={`lite-${i}`} className="section-y pt-0">
      <div className="container-x">
        <Head s={s} id={`lite-${i}`} />
        <div ref={ref} className="relative mt-12 aspect-[4/5] overflow-hidden rounded-[28px] bg-[#1a1a1a] sm:aspect-[16/10] lg:aspect-[16/8]">
          <Still n={photo} pos={pos} />
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(17_17_17/0.55),rgb(17_17_17/0)_55%)]" />
          <div className="absolute inset-x-0 bottom-0 flex justify-center" dir="ltr">
            <div className="w-[58%] max-w-[300px] translate-y-[14%] sm:w-[34%] lg:w-[24%]">
              <div className="rounded-[42px] shadow-[0_60px_90px_-35px_rgb(0_0_0/0.85),0_20px_40px_-20px_rgb(0_0_0/0.6)]">
                <Device max label={s.h}>{near ? screen : <div className="absolute inset-0 bg-[#111]" />}</Device>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}

function Web({ s }: { s: Show }) {
  const { lang } = useLocale(); const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { amount: 0.3 }); const near = useInView(ref, { margin: "400px 0px", once: true });
  return (
    <section aria-labelledby="lite-web" className="section-y pt-0">
      <div className="container-x">
        <Head s={s} id="lite-web" />
        <div ref={ref} className="relative mt-12 aspect-[4/5] overflow-hidden rounded-[28px] bg-[#1a1a1a] sm:aspect-[16/10] lg:aspect-[16/8]">
          <Still n="office" pos="50% 40%" />
          <span aria-hidden="true" className="absolute inset-0 bg-[rgb(17_17_17/0.35)]" />
          <div className="absolute inset-x-[6%] bottom-0 top-[14%] sm:inset-x-[12%] lg:inset-x-[16%]" dir="ltr">
            <div className="h-full overflow-hidden rounded-t-[18px] bg-[#111] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/10">
              <div aria-hidden="true" className="flex h-7 items-center gap-1.5 border-b border-white/[.06] px-3"><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /></div>
              <div className="relative h-[calc(100%-1.75rem)]">{near ? <Dash on={on} lang={lang} /> : null}</div>
            </div>
          </div>
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
        <ul className="container-x grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4">
          {t.pillars.map(([w, l], k) => { const I = ICONS[k]; return (
            <li key={w} className="flex flex-col items-center">
              <I size={22} aria-hidden="true" className="text-ink" />
              <p className="mt-3 text-[16px] font-semibold tracking-[-0.01em]">{w}</p>
              <p className="mt-1 max-w-[16rem] text-[15px] leading-[1.45] text-ink-muted">{l}</p>
            </li>); })}
        </ul>
      </section>

      <Showcase s={t.show[0]} i={0} photo="how-restoran" pos="60% 40%" />
      <Showcase s={t.show[1]} i={1} photo="huddle" pos="50% 40%" />
      <Showcase s={t.show[2]} i={2} photo="how-otel" pos="70% 40%" />
      <Web s={t.web} />

      {/* Industries: four photos with one word each. */}
      <section aria-labelledby="lite-sec" className="section-y pt-0">
        <div className="container-x">
          <h2 id="lite-sec" className="v4-h2 text-center">{t.sec.h}</h2>
          <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {t.sec.items.map(([w, href, n]) => (
              <li key={href}><Link href={href} className="group relative block aspect-[3/4] overflow-hidden rounded-[22px] bg-[#1a1a1a]">
                <Still n={n} sizes="(min-width:1024px) 25vw, 50vw" />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(17_17_17/0.7),rgb(17_17_17/0)_50%)] transition-opacity duration-500 group-hover:opacity-80" />
                <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[17px] font-semibold text-white">{w}<ArrowRight size={16} aria-hidden="true" className="rtl:-scale-x-100" /></span>
              </Link></li>))}
          </ul>
        </div>
      </section>

      <CasesV3 />
      <EndV3 />
    </>);
}
