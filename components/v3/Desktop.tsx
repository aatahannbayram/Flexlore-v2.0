"use client";
/* Flexlore Web, the desktop app: the promise and the manager's three steps on the start side, a browser window running
 * the real web panel (sample data) on the end side, bleeding to the page edge on large screens. Copy is the approved web-panel
 * feature page text (TR and EN; other languages read English). The panel is marked "Coming soon" as on that page. */
import { useRef } from "react";
import dynamic from "next/dynamic";
import { m, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "../i18n/LocaleProvider";
import { rise } from "./Top";
import { Books, UsersThree, ChartBar } from "../ui/icons";

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
    <section id="desktop" aria-labelledby="desk-h" className="section-y overflow-x-clip [--bleed:calc(var(--pad-x)+max(0px,(100vw-var(--container)-2*var(--pad-x))/2))]">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Start side: the promise, then the manager's week in three steps. */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3"><Ch n="05">{t.k}</Ch><span className="rounded-full bg-[var(--card)] px-2.5 py-0.5 text-[12px] font-medium text-ink-muted">{t.soon}</span></div>
          <H2 id="desk-h" a={t.h} className="max-w-[16ch]" />
          <p className="rv intro mt-4 max-w-[28rem]">{t.p}</p>
          <ol className="mt-8 flex flex-col gap-5 md:mt-10">
            {t.steps.map(([h, p], k) => { const I = icons[k]; return (
              <m.li key={h} {...rise(reduce, k)} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[var(--card)] text-ink"><I size={18} aria-hidden="true" /></span>
                <span className="block"><span className="block text-[17px] font-semibold leading-[24px] tracking-[-0.015em] text-ink">{h}</span>
                  <span className="mt-1 block text-[15px] leading-[22px] text-ink-muted">{p}</span></span>
              </m.li>); })}
          </ol>
        </div>
        {/* End side: the desktop app in a quiet browser frame, running past the container to the page edge. */}
        <div ref={ref} className="relative lg:col-span-7">
          <m.div {...rise(reduce)} className="card-pro overflow-hidden rounded-[20px] bg-[#0E0E0E] ring-1 ring-white/10 lg:w-[calc(100%+var(--bleed))] lg:rounded-e-none">
            <div className="flex h-10 items-center gap-2 border-b border-white/[.06] px-4" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ms-4 rounded-full bg-white/[.06] px-4 py-1 text-[12px] font-medium text-white/60">{t.title}</span>
            </div>
            <div aria-hidden="true" dir="ltr" className="lg:w-[max(100%,860px)]">{near ? <Dash on={on} lang={lang} /> : <div className="aspect-[1180/720] w-full bg-[#111]" />}</div>
          </m.div>
          <p className="mt-3 text-[12px] text-ink-faint">{t.sample}</p>
        </div>
      </div>
    </section>);
}
