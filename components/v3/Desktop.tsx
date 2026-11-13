"use client";
/* Flexlore Web, the desktop app: the promise and the manager's four steps on the start side, a browser window running
 * the real web panel (sample data) on the end side, bleeding to the page edge on large screens. Copy is the approved web-panel
 * feature page text (TR and EN; other languages read English). The panel is marked "Coming soon" as on that page. */
import { useRef } from "react";
import dynamic from "next/dynamic";
import { m, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleProvider";
import { rise } from "./Top";
import { HOME4 } from "../i18n/home4";
import { MonitorPlay, Books, UsersThree, ChartBar, ArrowUpRight, LockSimple } from "../ui/icons";
import { SITE } from "../config";

const Dash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="aspect-[1180/720] w-full bg-[#111]" /> });

const T = {
  en: { open: "Open Flexlore Web", k: "Flexlore Web", soon: "Coming soon", h: "One screen for every location.", p: "Start with the list of who is behind, then open the job or the person behind it.", steps: [["Build the library", "Organise jobs in folders and workspaces."], ["Assign and schedule", "Send jobs to roles, teams and locations."], ["Follow the exceptions", "See who has not finished and where people struggle."]], title: "Flexlore Web" },
  tr: { open: "Flexlore Web'i açın", k: "Flexlore Web", soon: "Yakında", h: "Her şube için tek ekran.", p: "Geride kalanların listesiyle başlayın, ardından ilgili işi veya kişiyi açın.", steps: [["Kütüphaneyi oluşturun", "İşleri klasörlerde ve çalışma alanlarında düzenleyin."], ["Atayın ve planlayın", "İşleri rollere, ekiplere ve şubelere gönderin."], ["İstisnaları takip edin", "Kimin bitirmediğini ve insanların nerede zorlandığını görün."]], title: "Flexlore Web" },
  de: { open: "Flexlore Web öffnen", k: "Flexlore Web", soon: "Demnächst", h: "Ein Bildschirm für alle Standorte.", p: "Beginnen Sie mit der Liste derer, die zurückliegen, und öffnen Sie dann die Aufgabe oder die Person dahinter.", steps: [["Bibliothek aufbauen", "Aufgaben in Ordnern und Workspaces organisieren."], ["Zuweisen und planen", "Aufgaben an Rollen, Teams und Standorte senden."], ["Ausnahmen verfolgen", "Sehen, wer noch nicht fertig ist und wo es hakt."]], title: "Flexlore Web" },
  ar: { open: "افتح Flexlore Web", k: "Flexlore Web", soon: "قريبًا", h: "شاشة واحدة لكل المواقع.", p: "ابدأ بقائمة المتأخرين، ثم افتح المهمة أو الشخص المعني.", steps: [["أنشئ المكتبة", "نظّم المهام في مجلدات ومساحات عمل."], ["أسند وجدول", "أرسل المهام إلى الأدوار والفرق والمواقع."], ["تابع الاستثناءات", "اعرف من لم ينجز بعد وأين يواجه الموظفون صعوبة."]], title: "Flexlore Web" },
  es: { open: "Abrir Flexlore Web", k: "Flexlore Web", soon: "Próximamente", h: "Una pantalla para todas las ubicaciones.", p: "Empiece por la lista de quién va con retraso y abra después la tarea o la persona correspondiente.", steps: [["Cree la biblioteca", "Organice las tareas en carpetas y espacios de trabajo."], ["Asigne y programe", "Envíe tareas a puestos, equipos y ubicaciones."], ["Siga las excepciones", "Vea quién no ha terminado y dónde tienen dificultades."]], title: "Flexlore Web" },
  nl: { open: "Flexlore Web openen", k: "Flexlore Web", soon: "Binnenkort", h: "Eén scherm voor elke locatie.", p: "Begin met de lijst van wie achterloopt en open dan de taak of de persoon erachter.", steps: [["Bouw de bibliotheek", "Organiseer taken in mappen en workspaces."], ["Wijs toe en plan in", "Stuur taken naar rollen, teams en locaties."], ["Volg de uitzonderingen", "Zie wie nog niet klaar is en waar mensen vastlopen."]], title: "Flexlore Web" },
  pt: { open: "Abrir o Flexlore Web", k: "Flexlore Web", soon: "Em breve", h: "Uma tela para todas as unidades.", p: "Comece pela lista de quem está atrasado e depois abra a tarefa ou a pessoa por trás dela.", steps: [["Monte a biblioteca", "Organize tarefas em pastas e espaços de trabalho."], ["Atribua e programe", "Envie tarefas para funções, equipes e unidades."], ["Acompanhe as exceções", "Veja quem não terminou e onde as pessoas têm dificuldade."]], title: "Flexlore Web" },
  fr: { open: "Ouvrir Flexlore Web", k: "Flexlore Web", soon: "Bientôt disponible", h: "Un seul écran pour tous les sites.", p: "Commencez par la liste des personnes en retard, puis ouvrez la tâche ou la personne concernée.", steps: [["Créez la bibliothèque", "Organisez les tâches en dossiers et espaces de travail."], ["Attribuez et planifiez", "Envoyez les tâches aux rôles, équipes et sites."], ["Suivez les exceptions", "Voyez qui n'a pas terminé et où les difficultés apparaissent."]], title: "Flexlore Web" },
  pl: { open: "Otwórz Flexlore Web", k: "Flexlore Web", soon: "Wkrótce", h: "Jeden ekran dla wszystkich lokalizacji.", p: "Zacznij od listy osób z zaległościami, a potem otwórz zadanie lub osobę, której dotyczą.", steps: [["Zbuduj bibliotekę", "Porządkuj zadania w folderach i przestrzeniach roboczych."], ["Przypisuj i planuj", "Wysyłaj zadania do ról, zespołów i lokalizacji."], ["Śledź wyjątki", "Zobacz, kto nie ukończył i gdzie ludzie mają trudności."]], title: "Flexlore Web" },
} as const;

export function DesktopV3({ H2, Ch }: { H2: (p: { id: string; a: string; b?: string; className?: string }) => React.ReactNode; Ch: (p: { n: string; children: React.ReactNode }) => React.ReactNode }) {
  const { lang, locale } = useLocale(); const t = T[locale]; const sample = HOME4[locale].web.sample; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const near = useInView(ref, { margin: "400px 0px", once: true }); const on = useInView(ref, { amount: 0.25 });
  const icons = [MonitorPlay, Books, UsersThree, ChartBar];
  return (
    <section id="desktop" aria-labelledby="desk-h" className="section-y overflow-x-clip [--bleed:calc(var(--pad-x)+max(0px,(100vw-var(--container)-2*var(--pad-x))/2))]">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Start side: the promise, then the manager's week in four steps. */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3"><Ch n="05">{t.k}</Ch><span className="rounded-full bg-[var(--card)] px-2.5 py-0.5 text-[12px] font-medium text-ink-muted">{t.soon}</span></div>
          <H2 id="desk-h" a={t.h} className="max-w-[16ch]" />
          <p className="rv intro mt-4 max-w-[28rem]">{t.p}</p>
          <ol className="mt-8 border-t border-line md:mt-10">
            {t.steps.map(([h, p], k) => { const I = icons[k]; return (
              <m.li key={h} {...rise(reduce, k)} className="flex gap-4 border-b border-line py-4">
                <I size={18} aria-hidden="true" className="mt-[3px] shrink-0 text-ink-faint" />
                <span className="block"><span className="block text-[16px] font-semibold leading-[24px] tracking-[-0.015em] text-ink">{h}</span>
                  <span className="mt-0.5 block text-[15px] leading-[22px] text-ink-muted">{p}</span></span>
              </m.li>); })}
          </ol>
          <a href={SITE.login} target="_blank" rel="noopener" className="btn btn-primary mt-8 h-11 px-5">{t.open}<ArrowUpRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></a>
        </div>
        {/* End side: the desktop app in a quiet browser frame, running past the container to the page edge. */}
        <div ref={ref} className="relative lg:col-span-7">
          <m.div {...rise(reduce)} className="group relative overflow-hidden rounded-[20px] bg-[#0E0E0E] ring-1 ring-white/10 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:ring-white/20 lg:w-[calc(100%+var(--bleed))] lg:rounded-e-none">
            <a href={SITE.login} target="_blank" rel="noopener" aria-label={t.open} className="absolute inset-0 z-10" />
            <div className="flex h-11 items-center gap-2 border-b border-white/[.06] px-4" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="mx-auto inline-flex min-w-0 items-center gap-1.5 rounded-full bg-white/[.06] px-4 py-1 text-[12px] font-medium text-white/60 transition-colors group-hover:text-white/90" dir="ltr"><LockSimple size={11} />app.flexlore.com</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#111] opacity-0 transition-opacity duration-300 group-hover:opacity-100">{t.open}<ArrowUpRight size={12} /></span>
            </div>
            <div aria-hidden="true" dir="ltr" className="lg:w-[max(100%,860px)]">{near ? <Dash on={on} lang={lang} /> : <div className="aspect-[1180/720] w-full bg-[#111]" />}</div>
          </m.div>
          <p className="mt-3 text-[12px] text-ink-faint">{sample}</p>
        </div>
      </div>
    </section>);
}
