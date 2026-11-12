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
    tiles: [["Access by role and site", "Access is set by role and location, so people see only the jobs meant for them."], ["No technical skills", "If you can film with a phone, you can create a step-by-step video SOP."], ["Every AI draft is approved", "Every draft is reviewed and approved by your team before it goes out."], ["AI agents and MCP", "Routine assigning on autopilot; ask Claude or ChatGPT about your own data."]] },
  tr: { k: "Kısaca", h: "Her vardiyada, her şubede aynı standart.", p: "Bir işi bir kez çekin. Ekibiniz kendi telefonunda, kendi dilinde öğrensin.", more: "Tüm özellikler", soon: "Yakında", slide: "Fotoğraf",
    tiles: [["Rol ve şubeye göre erişim", "Erişim rol ve şubeye göre belirlenir; herkes yalnızca kendisi için olan işleri görür."], ["Teknik bilgi gerekmez", "Telefonla video çekebiliyorsanız adım adım bir video SOP oluşturabilirsiniz."], ["Her yapay zekâ taslağı onaydan geçer", "Her taslak, gönderilmeden önce ekibiniz tarafından incelenip onaylanır."], ["Yapay zekâ ajanları ve MCP", "Rutin atamalar kendiliğinden; Claude veya ChatGPT'ye kendi verinizi sorun."]] },
  de: { k: "Auf einen Blick", h: "Derselbe Standard in jeder Schicht, an jedem Standort.", p: "Filmen Sie eine Aufgabe einmal. Ihr Team lernt sie auf dem eigenen Handy, in der eigenen Sprache.", more: "Alle Funktionen", soon: "Demnächst", slide: "Foto",
    tiles: [["Zugriff nach Rolle und Standort", "Der Zugriff wird nach Rolle und Standort festgelegt, sodass alle nur die für sie bestimmten Aufgaben sehen."], ["Keine Technikkenntnisse", "Wenn Sie mit dem Handy filmen können, können Sie eine Video-SOP in Schritten erstellen."], ["Jeder KI-Entwurf wird freigegeben", "Jeder Entwurf wird von Ihrem Team geprüft und freigegeben, bevor er rausgeht."], ["KI-Agenten und MCP", "Routinezuweisungen laufen von selbst; fragen Sie Claude oder ChatGPT zu Ihren eigenen Daten."]] },
  ar: { k: "باختصار", h: "المعيار نفسه في كل وردية وكل موقع.", p: "صوّر المهمة مرة واحدة. يتعلمها فريقك على هاتفه وبلغته.", more: "جميع الميزات", soon: "قريبًا", slide: "صورة",
    tiles: [["صلاحيات حسب الدور والموقع", "تُحدد الصلاحيات حسب الدور والموقع، فلا يرى كل شخص إلا المهام المخصصة له."], ["لا حاجة إلى خبرة تقنية", "إذا كنت تستطيع التصوير بالهاتف، فبإمكانك إنشاء إجراء تشغيل قياسي بالفيديو خطوة بخطوة."], ["كل مسودة ذكاء اصطناعي تُعتمد أولًا", "يراجع فريقك كل مسودة ويعتمدها قبل نشرها."], ["وكلاء الذكاء الاصطناعي وMCP", "إسناد المهام الروتينية تلقائيًا؛ واسأل Claude أو ChatGPT عن بياناتك."]] },
  es: { k: "En resumen", h: "El mismo estándar en cada turno y en cada sede.", p: "Grabe una tarea una vez. Su equipo la aprende en su propio móvil y en su idioma.", more: "Todas las funciones", soon: "Próximamente", slide: "Foto",
    tiles: [["Acceso por puesto y ubicación", "El acceso se define por puesto y ubicación, de modo que cada persona ve solo las tareas que le corresponden."], ["Sin conocimientos técnicos", "Si sabe grabar con un móvil, puede crear un SOP en video paso a paso."], ["Cada borrador de IA se aprueba", "Su equipo revisa y aprueba cada borrador antes de publicarlo."], ["Agentes de IA y MCP", "Las asignaciones rutinarias, automáticas; pregunte a Claude o ChatGPT por sus propios datos."]] },
  ru: { k: "Коротко", h: "Один стандарт в каждой смене и на каждой точке.", p: "Снимите работу один раз. Команда изучит её на своём телефоне и на своём языке.", more: "Все функции", soon: "Скоро", slide: "Фото",
    tiles: [["Доступ по ролям и точкам", "Доступ настраивается по ролям и точкам, поэтому сотрудники видят только предназначенные им работы."], ["Без технических навыков", "Если вы умеете снимать на телефон, вы сможете создать пошаговую видеоинструкцию (SOP)."], ["Каждый черновик ИИ утверждается", "Каждый черновик проверяет и утверждает ваша команда до публикации."], ["ИИ-агенты и MCP", "Рутинные назначения автоматически; спрашивайте Claude или ChatGPT о своих данных."]] },
  fr: { k: "En bref", h: "Le même standard à chaque poste, sur chaque site.", p: "Filmez une tâche une fois. Votre équipe l'apprend sur son propre téléphone, dans sa langue.", more: "Toutes les fonctionnalités", soon: "Bientôt disponible", slide: "Photo",
    tiles: [["Accès par rôle et par site", "L'accès est défini par rôle et par site, chacun ne voit donc que les tâches qui lui sont destinées."], ["Aucune compétence technique", "Si vous savez filmer avec un téléphone, vous savez créer une procédure vidéo étape par étape."], ["Chaque brouillon IA est validé", "Chaque brouillon est relu et validé par votre équipe avant diffusion."], ["Agents IA et MCP", "Les attributions de routine en automatique ; interrogez Claude ou ChatGPT sur vos propres données."]] },
  pl: { k: "W skrócie", h: "Ten sam standard na każdej zmianie, w każdej lokalizacji.", p: "Nagraj zadanie raz. Twój zespół nauczy się go na własnym telefonie, we własnym języku.", more: "Wszystkie funkcje", soon: "Wkrótce", slide: "Zdjęcie",
    tiles: [["Dostęp według roli i lokalizacji", "Dostęp ustawia się według roli i lokalizacji, więc każdy widzi tylko przeznaczone dla siebie zadania."], ["Bez wiedzy technicznej", "Jeśli potrafisz nagrywać telefonem, możesz stworzyć wideoinstrukcję SOP krok po kroku."], ["Każda wersja robocza AI jest zatwierdzana", "Każda wersja robocza jest sprawdzana i zatwierdzana przez Twój zespół przed publikacją."], ["Agenci AI i MCP", "Rutynowe przypisania automatycznie; pytaj Claude lub ChatGPT o własne dane."]] },
} as const;
/* The photo behind the frame changes like a slide show (existing photos of the floor), paused on hover and under
   reduced motion; dots let the visitor pick one. */
const SLIDES = [["ws-j-vinc", "60% 40%"], ["ws-j-hat", "55% 45%"], ["ws-j-brifing", "50% 40%"], ["ws-mutfak", "55% 40%"]] as const;

export function FactsV3({ H2, Ch }: { H2: (p: { id: string; a: string; b?: string; className?: string }) => React.ReactNode; Ch: (p: { n: string; children: React.ReactNode }) => React.ReactNode }) {
  const { locale, d } = useLocale(); const t = T[locale]; const reduce = useReducedMotion();
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
        {/* The blurred copy fades in and out at the top and bottom, so the band melts into the page instead of starting
            and ending in hard lines. */}
        <div aria-hidden="true" className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)]">{stack("h-full w-full scale-110 object-cover blur-[24px] brightness-[0.4]")}</div>
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] ring-1 ring-white/15" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
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
                <a href={SITE.demo} target="_blank" rel="noopener" className="btn btn-cta h-12 px-6"><Play size={14} weight="fill" aria-hidden="true" />{d.nav.cta}</a>
                <a href="/features/" className="btn btn-secondary h-12 px-5">{t.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>
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
