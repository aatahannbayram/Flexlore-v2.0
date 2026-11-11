"use client";
/* At a glance: a framed photo of the floor (softened copy behind, sharp inside a glass frame), the promise on the start
 * side, four values the page has not said yet on the end side (from the approved FAQ and feature pages; AI agents
 * marked Coming soon). The photos change like a slide show. No user counts, ratings or invented numbers. */
import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleProvider";
import { SITE } from "../config";
import { rise } from "./Top";
import { LockSimple, FilmSlate, CheckCircle, Robot, Play, ArrowRight } from "../ui/icons";

const T = {
  en: { k: "At a glance", h: "The same standard on every shift, at every site.", p: "Film a job once. Your team learns it on their own phone, in their own language.", more: "All features", soon: "Coming soon", slide: "Photo",
    tiles: [["Access by role and site", "People see only the jobs meant for them."], ["No technical skills", "If you can film with a phone, you can make a step-by-step SOP."], ["Every AI draft is approved", "Your team reviews each step and quiz before it goes out."], ["AI agents and MCP", "Routine assigning on autopilot; ask Claude or ChatGPT about your own data."]] },
  tr: { k: "Kısaca", h: "Her vardiyada, her şubede aynı standart.", p: "Bir işi bir kez çekin. Ekibiniz kendi telefonunda, kendi dilinde öğrensin.", more: "Tüm özellikler", soon: "Yakında", slide: "Fotoğraf",
    tiles: [["Rol ve şubeye göre erişim", "Herkes yalnızca kendisi için olan işleri görür."], ["Teknik bilgi gerekmez", "Telefonla video çekebiliyorsanız adım adım bir SOP oluşturabilirsiniz."], ["Her yapay zekâ taslağı onaydan geçer", "Adımları ve quizi gönderilmeden önce ekibiniz inceler."], ["Yapay zekâ ajanları ve MCP", "Rutin atamalar kendiliğinden; Claude veya ChatGPT'ye kendi verinizi sorun."]] },
} as const;
/* The photo behind the frame changes like a slide show (existing photos of the floor), paused on hover and under
   reduced motion; dots let the visitor pick one. */
const SLIDES = [["ws-j-vinc", "60% 40%"], ["ws-j-hat", "55% 45%"], ["ws-j-brifing", "50% 40%"], ["ws-mutfak", "55% 40%"]] as const;

export function FactsV3({ H2, Ch }: { H2: (p: { id: string; a: string; b?: string; className?: string }) => React.ReactNode; Ch: (p: { n: string; children: React.ReactNode }) => React.ReactNode }) {
  const { lang, d } = useLocale(); const t = T[lang === "tr" ? "tr" : "en"]; const reduce = useReducedMotion();
  const icons = [LockSimple, FilmSlate, CheckCircle, Robot];
  const [i, setI] = useState(0); const [hold, setHold] = useState(false);
  useEffect(() => { if (reduce || hold) return; const id = window.setTimeout(() => setI((k) => (k + 1) % SLIDES.length), 5000); return () => window.clearTimeout(id); }, [reduce, hold, i]);
  const pic = (n: string, pos: string, cls: string) => (
    <picture className="absolute inset-0"><source type="image/avif" srcSet={`/photos/${n}-800.avif 800w, /photos/${n}-1600.avif 1600w`} sizes="100vw" />
      <img src={`/photos/${n}-1600.webp`} srcSet={`/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w`} sizes="100vw" alt="" loading="lazy" decoding="async" style={{ objectPosition: pos }} className={cls} /></picture>);
  const stack = (cls: string) => SLIDES.map(([n, pos], k) => <div key={n} className={`absolute inset-0 transition-opacity duration-700 ease-out ${k === i ? "opacity-100" : "opacity-0"}`}>{pic(n, pos, cls)}</div>);
  return (
    <section aria-labelledby="facts-h" className="section-y">
      <div className="dark relative isolate overflow-hidden px-2 py-8 text-white sm:px-5 sm:py-12 lg:px-7 lg:py-16">
        {stack("h-full w-full scale-110 object-cover blur-[24px] brightness-[0.4]")}
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] ring-1 ring-white/35" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {stack("h-full w-full object-cover")}
          {/* Darken only where the words sit: the start side and the foot. */}
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_10_10/0.82)_0%,rgb(10_10_10/0.5)_42%,rgb(10_10_10/0.18)_70%,rgb(10_10_10/0.3)_100%)] rtl:-scale-x-100" />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgb(10_10_10/0.7),transparent)]" />
          <div className="relative grid min-h-[560px] items-end gap-10 p-6 pb-16 sm:p-10 sm:pb-16 lg:grid-cols-12 lg:gap-8 lg:p-14 lg:pb-16">
            <div className="lg:col-span-6">
              <Ch n="03">{t.k}</Ch>
              <H2 id="facts-h" a={t.h} className="max-w-[16ch]" />
              <p className="rv intro mt-4 max-w-[26rem] !text-white/80">{t.p}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={SITE.demo} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#F4F0EB] px-6 text-[15px] font-semibold text-[#111] transition-transform duration-200 hover:-translate-y-0.5"><Play size={14} weight="fill" aria-hidden="true" />{d.nav.cta}</a>
                <a href="/features/" className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-[15px] font-medium text-white/85 ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10">{t.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>
              </div>
            </div>
            {/* Four things the page has not said yet, as a description list. */}
            <dl className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-6">
              {t.tiles.map(([h, line], k) => { const I = icons[k]; const hot = k === 0; const soon = k === 3; return (
                <m.div key={h} {...rise(reduce, k)} className={`flex min-h-[150px] flex-col justify-between rounded-[20px] p-5 ${hot ? "bg-[#EC6726] text-white" : "bg-[rgb(10_10_10/0.5)] ring-1 ring-white/12 backdrop-blur-md"}`}>
                  <span className="flex items-center justify-between"><I size={20} aria-hidden="true" className={hot ? "text-white" : "text-white/75"} />{soon && <span className="rounded-full bg-white/15 px-2 py-0.5 text-[12px] font-medium text-white/85">{t.soon}</span>}</span>
                  <div className="mt-4">
                    <dt className="text-[18px] font-semibold leading-[24px] tracking-[-0.015em]">{h}</dt>
                    <dd className={`mt-1.5 text-[14px] leading-[20px] ${hot ? "text-white/90" : "text-white/70"}`}>{line}</dd>
                  </div>
                </m.div>); })}
            </dl>
          </div>
          {/* Slide dots: which photo is showing; a click picks one. */}
          <div className="absolute bottom-5 start-6 z-10 flex gap-1 sm:start-10 lg:start-14">
            {SLIDES.map(([n], k) => <button key={n} type="button" onClick={() => setI(k)} aria-label={`${t.slide} ${k + 1}`} aria-pressed={k === i} className="grid h-11 w-11 place-items-center"><span className={`h-1.5 rounded-full transition-all duration-200 ${k === i ? "w-6 bg-white" : "w-1.5 bg-white/45"}`} /></button>)}
          </div>
        </div>
      </div>
    </section>);
}
