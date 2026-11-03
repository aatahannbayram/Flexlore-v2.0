"use client";
import type { Lang } from "./copy";
import { PLANS } from "./config";

export const PL = {
  en: { mo: "Monthly", yr: "Yearly", bill: "Billing period", perMo: "/mo", yrNote: "per month, yearly plan", moNote: "per month, monthly plan", save: "Save with yearly", plus: (x: string) => `Everything in ${x}, plus:`, unit: "per location / month", contact: "Contact us", custom: "Custom pricing", users: (n: string) => `${n} users`, entB: "Priced by user count", choose: "Choose plan", start: "Start free" },
  tr: { mo: "Aylık", yr: "Yıllık", bill: "Faturalama dönemi", perMo: "/ay", yrNote: "aylık, yıllık planda", moNote: "aylık, aylık planda", save: "Yıllıkta tasarruf edin", plus: (x: string) => `${x} planındaki her şey, ayrıca:`, unit: "lokasyon başına / aylık", contact: "Bize ulaşın", custom: "Özel fiyat", users: (n: string) => `${n} kullanıcı`, entB: "Kullanıcı sayısına göre fiyatlanır", choose: "Planı seçin", start: "Ücretsiz başlayın" },
};
export function BillingToggle({ yearly, setYearly, lang }: { yearly: boolean; setYearly: (v: boolean) => void; lang: Lang }) {
  const t = PL[lang];
  const b = (on: boolean) => `rounded-full px-4 py-1.5 text-[14px] font-semibold transition ${on ? "bg-white text-black" : "text-white/80 hover:text-white"}`;
  return (<div role="group" aria-label={t.bill} className="inline-flex rounded-full p-1 ring-1 ring-white/20">
    <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)} className={b(!yearly)}>{t.mo}</button>
    <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)} className={b(yearly)}>{t.yr}</button></div>);
}
export function PriceBlock({ p, yearly, lang, small }: { p: typeof PLANS[number]; yearly: boolean; lang: Lang; small?: boolean }) {
  const t = PL[lang]; const pr = yearly ? p.yearly : p.monthly;
  if (!pr) return <p className={`${small ? "text-[22px]" : "text-[clamp(1.8rem,3vw,2.4rem)]"} font-bold tracking-[-.03em]`}>{t.contact}</p>;
  return (<div>
    <p className="flex flex-wrap items-baseline gap-x-2">{pr.was && <s className="text-[16px] font-medium text-white/60" aria-label={`was ${pr.was}`}>{pr.was}</s>}<span className={`${small ? "text-[22px]" : "text-[clamp(1.8rem,3vw,2.4rem)]"} font-bold tracking-[-.03em]`}>{pr.now}</span><span className="text-[14px] text-white/70">{t.perMo}</span></p>
    {p.id !== "free" && <p className="mt-1 text-[13px] text-white/75">{yearly ? t.yrNote : t.moNote}</p>}
    {p.id !== "free" && !yearly && <p className="mt-1 text-[13px] font-semibold text-[#EC6726]">{t.save}</p>}
  </div>);
}

