"use client";
/* At a glance: a framed photo of the floor (softened copy behind, sharp inside a glass frame), the promise on the start
 * side and four plain facts as tiles on the end side. Only facts that are true today: 8 languages, the team app on iOS
 * and Android, the web panel for managers (coming soon, as on its page), and that a phone is all it takes to start.
 * No user counts, ratings or invented numbers. One tile in orange; the rest are glass. */
import { m, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleProvider";
import { SITE } from "../config";
import { rise } from "./Top";
import { Translate, UsersThree, Browser, FilmSlate, Play, ArrowRight } from "../ui/icons";

const T = {
  en: { k: "At a glance", h: "The same standard on every shift, at every site.", p: "Film a job once. Your team learns it on their own phone, in their own language.", more: "All features",
    tiles: [["8", "languages", "Every person learns in their own."], ["iOS + Android", "team app", "On the phone they already carry."], ["Web", "manager panel", "Coming soon, for the desk."], ["1", "phone to start", "No studio, no script."]] },
  tr: { k: "Kısaca", h: "Her vardiyada, her şubede aynı standart.", p: "Bir işi bir kez çekin. Ekibiniz kendi telefonunda, kendi dilinde öğrensin.", more: "Tüm özellikler",
    tiles: [["8", "dil", "Herkes kendi dilinde öğrenir."], ["iOS + Android", "ekip uygulaması", "Zaten taşıdığı telefonda."], ["Web", "yönetici paneli", "Yakında, masanız için."], ["1", "telefon yeter", "Stüdyo, senaryo gerekmez."]] },
} as const;
const IMG = "ws-j-vinc";

export function FactsV3({ H2, Ch }: { H2: (p: { id: string; a: string; b?: string; className?: string }) => React.ReactNode; Ch: (p: { n: string; children: React.ReactNode }) => React.ReactNode }) {
  const { lang, d } = useLocale(); const t = T[lang === "tr" ? "tr" : "en"]; const reduce = useReducedMotion();
  const icons = [Translate, UsersThree, Browser, FilmSlate];
  const pic = (cls: string, eager = false) => (
    <picture className="absolute inset-0"><source type="image/avif" srcSet={`/photos/${IMG}-800.avif 800w, /photos/${IMG}-1600.avif 1600w`} sizes="100vw" />
      <img src={`/photos/${IMG}-1600.webp`} srcSet={`/photos/${IMG}-800.webp 800w, /photos/${IMG}-1600.webp 1600w`} sizes="100vw" alt="" loading={eager ? "eager" : "lazy"} decoding="async" className={cls} /></picture>);
  return (
    <section aria-labelledby="facts-h" className="section-y">
      <div className="dark relative isolate overflow-hidden px-2 py-8 text-white sm:px-5 sm:py-12 lg:px-7 lg:py-16">
        {pic("h-full w-full scale-110 object-cover blur-[24px] brightness-[0.4]")}
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] ring-1 ring-white/35">
          {pic("h-full w-full object-cover object-[60%_40%]")}
          {/* Darken only where the words sit: the start side and the foot. */}
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_10_10/0.82)_0%,rgb(10_10_10/0.5)_42%,rgb(10_10_10/0.18)_70%,rgb(10_10_10/0.3)_100%)] rtl:-scale-x-100" />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgb(10_10_10/0.7),transparent)]" />
          <div className="relative grid min-h-[560px] items-end gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-8 lg:p-14">
            <div className="lg:col-span-6">
              <Ch n="03">{t.k}</Ch>
              <H2 id="facts-h" a={t.h} className="max-w-[16ch]" />
              <p className="rv intro mt-4 max-w-[26rem] !text-white/80">{t.p}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={SITE.demo} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#F4F0EB] px-6 text-[15px] font-semibold text-[#111] transition-transform duration-200 hover:-translate-y-0.5"><Play size={14} weight="fill" aria-hidden="true" />{d.nav.cta}</a>
                <a href="/features/" className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-[15px] font-medium text-white/85 ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10">{t.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>
              </div>
            </div>
            {/* Facts as a description list: the value is the term, the label and line describe it. */}
            <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-6">
              {t.tiles.map(([v, l, line], k) => { const I = icons[k]; const hot = k === 0; return (
                <m.div key={l} {...rise(reduce, k)} className={`flex min-h-[150px] flex-col justify-between rounded-[20px] p-4 sm:p-5 ${hot ? "bg-[#EC6726] text-white" : "bg-[rgb(10_10_10/0.5)] ring-1 ring-white/12 backdrop-blur-md"}`}>
                  <I size={20} aria-hidden="true" className={hot ? "text-white" : "text-white/70"} />
                  <div className="mt-4">
                    <dt><span className="block text-[26px] font-semibold leading-none tracking-[-0.03em] sm:text-[30px]">{v}</span><span className={`mt-1.5 block text-[15px] font-medium ${hot ? "text-white/90" : "text-white/80"}`}>{l}</span></dt>
                    <dd className={`mt-2 text-[13px] leading-[18px] ${hot ? "text-white/85" : "text-white/60"}`}>{line}</dd>
                  </div>
                </m.div>); })}
            </dl>
          </div>
        </div>
      </div>
    </section>);
}
