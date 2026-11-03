"use client";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import type { Lang } from "./copy";
import { PLANS, savePct } from "./config";
import { EASE } from "./ui/Reveal";

export const PL = {
  en: { mo: "Monthly", yr: "Yearly", bill: "Billing period", perMo: "/mo", yrNote: "per month, billed yearly", moNote: "per month, billed monthly", save: (n: number) => `Save ${n}%`, upTo: (n: number) => `Save up to ${n}%`, plus: (x: string) => `Everything in ${x}, plus:`, unit: (n: string) => `Up to ${n} users`, contact: "Contact us", custom: "Custom pricing", users: (n: string) => `${n} users`, entB: "Priced by user count", choose: "Choose plan", start: "Start free", talk: "Talk to sales", free: "Free forever" },
  tr: { mo: "Aylık", yr: "Yıllık", bill: "Faturalama dönemi", perMo: "/ay", yrNote: "aylık, yıllık faturalanır", moNote: "aylık, aylık faturalanır", save: (n: number) => `%${n} tasarruf`, upTo: (n: number) => `En fazla %${n} tasarruf`, plus: (x: string) => `${x} planındaki her şey, ayrıca:`, unit: (n: string) => `${n} kullanıcıya kadar`, contact: "Bize ulaşın", custom: "Özel fiyat", users: (n: string) => `${n} kullanıcı`, entB: "Kullanıcı sayısına göre fiyatlanır", choose: "Planı seçin", start: "Ücretsiz başlayın", talk: "Satışla görüşün", free: "Süresiz ücretsiz" },
};

/** Monthly / Yearly switch with a sliding pill (shared layoutId). `light` for the light pricing section. */
export function BillingToggle({ yearly, setYearly, lang, light = false, id = "bill" }: { yearly: boolean; setYearly: (v: boolean) => void; lang: Lang; light?: boolean; id?: string }) {
  const t = PL[lang];
  const best = Math.max(...PLANS.map((p) => savePct(p) ?? 0));
  const b = (on: boolean) => `relative z-10 inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${on ? (light ? "text-white" : "text-bg") : light ? "text-light-muted hover:text-light-ink" : "text-ink-muted hover:text-ink"}`;
  const pill = <m.span layoutId={`${id}-pill`} className={`absolute inset-0 -z-10 rounded-full ${light ? "bg-light-ink" : "bg-ink"}`} transition={{ type: "spring", stiffness: 260, damping: 30 }} />;
  return (
    <div role="group" aria-label={t.bill} className={`inline-flex rounded-full p-1 ${light ? "bg-light-surface" : "bg-surface-1"}`}>
      <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)} className={b(!yearly)}>{!yearly && pill}{t.mo}</button>
      <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)} className={b(yearly)}>{yearly && pill}{t.yr}
        {best > 0 && <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${yearly ? (light ? "bg-white/15 text-white" : "bg-bg/10 text-bg") : light ? "bg-light-surface text-light-ink" : "bg-white/10 text-ice-100"}`}>{t.upTo(best)}</span>}
      </button>
    </div>);
}

/** Price, plainly. Monthly view: monthly price. Yearly view: per-month equivalent plus a "Save X%" chip from the real numbers. */
export function PriceBlock({ p, yearly, lang, small, light = false }: { p: typeof PLANS[number]; yearly: boolean; lang: Lang; small?: boolean; light?: boolean }) {
  const t = PL[lang]; const pr = yearly ? p.yearly : p.monthly; const reduce = useReducedMotion();
  const muted = light ? "text-light-muted" : "text-ink-muted";
  if (!pr) return <p className={`${small ? "text-h3" : "text-h3"} font-bold tracking-[-.03em]`}>{t.contact}</p>;
  const save = yearly ? savePct(p) : null;
  return (<div>
    <div className="flex flex-wrap items-baseline gap-x-2">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span key={pr.now} className={`${small ? "text-[32px]" : "text-[40px]"} font-bold leading-none tracking-[-.03em]`}
          initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>{pr.now}</m.span>
      </AnimatePresence>
      <span className={`text-sm ${muted}`}>{t.perMo}</span>
      {save && <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${light ? "bg-light-surface text-light-ink" : "bg-white/10 text-ice-100"}`}>{t.save(save)}</span>}
    </div>
    <p className={`mt-2 text-sm ${muted}`}>{p.id === "free" ? t.free : yearly ? t.yrNote : t.moNote}</p>
  </div>);
}
