"use client";
import { useEffect, useState } from "react";
import { PLANS, COMPARE, PRICING_FAQ, PRICING_FAQ_TR, SITE, ENTERPRISE_TIERS, PLAN_TR } from "./config";
import { I, Arr } from "./Icons";
import { Header } from "./Header";
import { Footer } from "./Sections";
import Copq from "./Copq";
import { PL, BillingToggle, PriceBlock } from "./PriceUI";
import type { Lang } from "./copy";

const CELL_TR: Record<string, string> = { "Talk to sales": "Satışla görüşün", "Standard": "Standart", "Premium": "Premium", "3 quizzes": "3 quiz", "10 quizzes": "10 quiz", "Unlimited": "Sınırsız", "Coming soon": "Yakında", "Per location": "Lokasyon başına", "By user count (30+ users)": "Kullanıcı sayısına göre (30+ kullanıcı)" };
const Cell = ({ v, tr }: { v: boolean | string; tr?: boolean }) => v === true ? <I.check size={18} className="mx-auto text-white" /> : v === false ? <span className="text-[14px] text-white/70">{tr ? "Dahil değil" : "Not included"}</span> :
  <span className={`text-[14px] ${v.startsWith("Coming") ? "text-white/75" : "text-white"}`}>{tr ? CELL_TR[v] ?? v : v}</span>;

export default function Pricing() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const [yearly, setYearly] = useState(false);
  const t = { ...PL[lang], ...(lang === "tr" ? { eyebrow: "Fiyatlandırma", h1: "İşletmenize uyan fiyatlandırma.", sub: "Tek bir işle başlayın. Her ekibe, vardiyaya ve lokasyona büyüyün.", entK: "30+ kullanıcı", entH: "Enterprise", entP: "30 ve üzeri kullanıcılı ekipler için. Kullanıcı sayısına göre kademeli fiyatlanır, lokasyonlar arası yaygınlaştırma desteğiyle.", sales: "Satış ekibiyle görüşün" } : { eyebrow: "Pricing", h1: "Pricing that fits your floor.", sub: "Start with one job. Grow to every team, shift and site.", entK: "30+ users", entH: "Enterprise", entP: "For teams of 30 or more users. Priced by user count, in tiers, with rollout support across sites.", sales: "Talk to sales" }) };
  const tr = lang === "tr";
  const members = PLANS;
  const pl = (p: typeof PLANS[number]) => tr && PLAN_TR[p.id] ? { ...p, ...PLAN_TR[p.id] } : p;
  return (<>
    <Header lang={lang} setLang={setLang} />
    <main id="main" className="px-6 pt-36 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="display mt-4 max-w-[15ch] text-[clamp(3rem,8vw,7.5rem)]">{t.h1}</h1>
        <p className="mt-4 max-w-xl text-lg leading-[1.4] text-white/65">{t.sub}</p>

        <div className="mt-12"><BillingToggle yearly={yearly} setYearly={setYearly} lang={lang} /></div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Plans">
          {members.map((p0, i) => { const p = pl(p0); const prev = i > 0 ? pl(members[i - 1]) : null; const pts = prev ? p.points.slice(1) : p.points; const badge = tr ? p0.badgeTr : p0.badge; return (
          <li key={p.id} className={`relative flex flex-col rounded-2xl p-7 ${p.featured ? "bg-[#191919] ring-2 ring-[#EC6726]" : "bg-black ring-1 ring-white/10"}`}>
            {badge && <span className={`absolute -top-3 left-7 rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[.1em] ${p.featured ? "bg-[#EC6726] text-black" : "bg-black text-white ring-1 ring-white/40"}`}>{badge}</span>}
            <h2 className="text-[20px] font-semibold tracking-tight">{p.name}</h2>
            <p className="mt-1.5 text-[14px] leading-[1.4] text-white/70">{p.for}</p>
            <div className="mt-6 border-t border-white/10 pt-6">
              <PriceBlock p={p0} yearly={yearly} lang={lang} />
              {/* Kept on purpose: "per location" wording awaits Ata Han's decision (app plans are user-limited). */}
              <p className="mt-1 text-[13px] text-white/70">{p.id === "enterprise" ? t.entB : t.unit}</p>
            </div>
            {prev && <p className="mt-6 text-[14px] font-semibold text-white">{t.plus(prev.name)}</p>}
            <ul className={`${prev ? "mt-3" : "mt-6"} space-y-2.5 text-[14px] text-white/80`}>{pts.map((x) => <li key={x} className="flex gap-2.5"><I.check size={16} className="mt-0.5 shrink-0 text-white/70" />{x}</li>)}</ul>
            <a href={p.checkout ?? SITE.demo} className={`${p.featured ? "btn-p" : "btn-g"} mt-auto self-start`} style={{ marginTop: "2rem" }}>{p.id === "enterprise" ? t.contact : p.id === "free" ? t.start : t.choose} <Arr className="ml-1" /></a>
          </li>); })}
        </ul>

        <section aria-labelledby="ent-h" className="mt-16 rounded-2xl bg-white/[.03] p-7 ring-1 ring-white/10 md:p-10">
          <p className="mono text-[12px] uppercase tracking-[.18em] text-[#EC6726]">{t.entK}</p>
          <h2 id="ent-h" className="display mt-3 text-[clamp(2rem,4vw,3.4rem)]">{t.entH}</h2>
          <p className="mt-3 max-w-xl text-[16px] leading-[1.45] text-white/70">{t.entP}</p>
          <ul className="mt-8 grid gap-3 md:grid-cols-3">{ENTERPRISE_TIERS.map((x) => (
            <li key={x.id} className="flex flex-col rounded-xl bg-black/40 p-5 ring-1 ring-white/10"><p className="text-[16px] font-semibold">Enterprise {x.name}</p>
              <p className="mt-3 text-[22px] font-bold">{x.custom ? t.custom : <>{x.price}<span className="text-[14px] font-normal text-white/70">{t.perMo}</span></>}</p>
              <p className="mt-1 text-[13px] text-white/70">{t.users(tr ? x.usersTr : x.users)}</p>
              <ul className="mt-4 space-y-2 text-[14px] text-white/80">{(tr ? x.pointsTr : x.points).map((y) => <li key={y} className="flex gap-2.5"><I.check size={16} className="mt-0.5 shrink-0 text-white/70" />{y}</li>)}</ul></li>))}</ul>
          <a href={SITE.demo} className="btn-p mt-8">{t.sales} <Arr className="ml-1" /></a>
        </section>

<section aria-labelledby="cmp-h" className="mt-28">
          <h2 id="cmp-h" className="display text-[clamp(2.2rem,4.4vw,4rem)]">{tr ? "Planları karşılaştırın" : "Compare plans"}</h2>
          <div className="no-sb mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
              <thead><tr className="border-b border-white/25"><th className="py-3 pr-4 font-normal text-white/70">{tr ? "Özellik" : "Feature"}</th>{PLANS.map((p) => <th key={p.id} className="w-[18%] py-3 text-center font-semibold">{tr ? PLAN_TR[p.id]?.name ?? p.name : p.name}</th>)}</tr></thead>
              <tbody>{COMPARE.map((r) => <tr key={r.f} className="border-b border-white/10"><td className="py-3.5 pr-4 text-white/80">{tr ? r.tr : r.f}</td>{r.v.map((v, i) => <td key={i} className="py-3.5 text-center">{<Cell v={v} tr={tr} />}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
    <div className="mt-12"><Copq lang={lang} /></div>
    <section aria-labelledby="pfaq-h" className="px-6 py-24 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12">
        <h2 id="pfaq-h" className="display text-[clamp(2.2rem,4.4vw,4rem)] md:col-span-4">{tr ? "Fiyatlandırma soruları" : "Pricing questions"}</h2>
        <div className="border-t border-white/15 md:col-span-8">{(tr ? PRICING_FAQ_TR : PRICING_FAQ).map((f) => (
          <details key={f.q} className="group border-b border-white/15 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-semibold tracking-tight">{f.q}<span className="text-white/70 transition group-open:rotate-45">+</span></summary>
            <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.45] text-white/65">{f.a}</p></details>))}</div>
      </div>
    </section>
    <section className="px-6 pb-24 md:px-10"><div className="mx-auto max-w-[1400px] border-t border-white/15 pt-12">
      <p className="display max-w-[18ch] text-[clamp(2rem,4vw,3.6rem)]">{tr ? "Hangi plan size uygun, emin değil misiniz?" : "Not sure which plan fits?"}</p>
      <p className="mt-3 text-[17px] text-white/70">{tr ? "Yirmi dakika, gerçek işlerinizden biriyle." : "Twenty minutes, one of your real jobs."}</p>
      <a href={SITE.demo} className="btn-p mt-6">{tr ? "Demo ayarlayın" : "Book a demo"} <Arr className="ml-1" /></a></div></section>
    <Footer />
  </>);
}
