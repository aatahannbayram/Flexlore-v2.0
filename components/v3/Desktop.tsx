"use client";
/* Flexlore Web, the desktop app: one large browser window running the real web panel (sample data), three facts in a
 * row under it, and the three steps of the manager's week. Copy is the approved web-panel
 * feature page text (TR and EN; other languages read English). The panel is marked "Coming soon" as on that page. */
import { useRef } from "react";
import dynamic from "next/dynamic";
import { m, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleProvider";
import { rise } from "./Top";
import { Books, UsersThree, ChartBar, CheckCircle } from "../ui/icons";

const Dash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="aspect-[1180/720] w-full bg-[#111]" /> });

const T = {
  en: { k: "Flexlore Web", soon: "Coming soon", h: "One screen for every location.", p: "Start with the list of who is behind, then open the job or the person behind it.",
    points: ["Completion by person, team and site", "The question most people miss", "Library and assignments in one place"],
    steps: [["Build the library", "Organise jobs in folders and workspaces."], ["Assign and schedule", "Send jobs to roles, teams and locations."], ["Follow the exceptions", "See who has not finished and where people struggle."]],
    sample: "Sample data", title: "Flexlore Web" },
  tr: { k: "Flexlore Web", soon: "Yakında", h: "Her şube için tek ekran.", p: "Geride kalanların listesiyle başlayın, ardından ilgili işi veya kişiyi açın.",
    points: ["Kişi, ekip ve şube bazında tamamlanma", "En çok kaçırılan soru", "Kütüphane ve atamalar tek yerde"],
    steps: [["Kütüphaneyi oluşturun", "İşleri klasörlerde ve çalışma alanlarında düzenleyin."], ["Atayın ve planlayın", "İşleri rollere, ekiplere ve şubelere gönderin."], ["İstisnaları takip edin", "Kimin bitirmediğini ve insanların nerede zorlandığını görün."]],
    sample: "Örnek veri", title: "Flexlore Web" },
} as const;

export function DesktopV3({ H2, Ch }: { H2: (p: { id: string; a: string; b?: string; className?: string }) => React.ReactNode; Ch: (p: { n: string; children: React.ReactNode }) => React.ReactNode }) {
  const { lang } = useLocale(); const t = T[lang === "tr" ? "tr" : "en"]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const near = useInView(ref, { margin: "400px 0px", once: true }); const on = useInView(ref, { amount: 0.25 });
  const icons = [Books, UsersThree, ChartBar];
  return (
    <section id="desktop" aria-labelledby="desk-h" className="section-y">
      <div className="container-x">
        <div className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <div className="flex items-center gap-3"><Ch n="05">{t.k}</Ch><span className="rounded-full bg-[var(--card)] px-2.5 py-0.5 text-[12px] font-medium text-ink-muted">{t.soon}</span></div>
          <H2 id="desk-h" a={t.h} className="mx-auto max-w-[24ch]" />
          <p className="rv intro mt-4 max-w-[34rem]">{t.p}</p>
        </div>

        {/* The desktop app: a quiet browser frame (three neutral dots, the app name), the live panel inside. */}
        <div ref={ref} className="relative mx-auto mt-8 max-w-[1040px] md:mt-12">
          <m.div {...rise(reduce)} className="card-pro overflow-hidden rounded-[20px] bg-[#0E0E0E] ring-1 ring-white/10">
            <div className="flex h-10 items-center gap-2 border-b border-white/[.06] px-4" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="mx-auto rounded-full bg-white/[.06] px-4 py-1 text-[12px] font-medium text-white/60">{t.title}</span>
              <span className="w-[42px]" />
            </div>
            <div aria-hidden="true" dir="ltr">{near ? <Dash on={on} lang={lang} /> : <div className="aspect-[1180/720] w-full bg-[#111]" />}</div>
          </m.div>
          {/* Three facts under the window: a centred row on large screens, a list on phones. */}
          <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {t.points.map((x, k) => <m.li key={x} {...rise(reduce, k)} className="flex items-center gap-2.5 text-[15px] text-ink sm:rounded-full sm:bg-[var(--card)] sm:py-2 sm:pe-4 sm:ps-3"><CheckCircle size={16} weight="fill" aria-hidden="true" className="tick shrink-0" />{x}</m.li>)}
          </ul>
          <p className="mt-4 text-center text-[12px] text-ink-faint">{t.sample}</p>
        </div>

        {/* The manager's week in three steps. */}
        <ol className="mx-auto mt-12 grid max-w-[1040px] gap-4 md:grid-cols-3 md:gap-6">
          {t.steps.map(([h, p], k) => { const I = icons[k]; return (
            <m.li key={h} {...rise(reduce, k)} className="rounded-[20px] bg-[var(--card)] p-6">
              <span className="flex items-center justify-between text-ink-faint"><I size={20} aria-hidden="true" /><span className="text-[13px] tabular-nums">0{k + 1}</span></span>
              <h3 className="mt-6 text-[20px] font-semibold leading-[26px] tracking-[-0.02em] text-ink">{h}</h3>
              <p className="mt-2 text-[15px] leading-[22px] text-ink-muted">{p}</p>
            </m.li>); })}
        </ol>
      </div>
    </section>);
}
