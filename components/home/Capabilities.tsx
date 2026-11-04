"use client";
import type { Lang } from "../copy";
import { home } from "./home-copy";
import { Heading } from "../ui/Layout";
import { Reveal, RevealItem } from "../ui/Reveal";
import { SmartVideo } from "../ui/SmartVideo";
import { Sparkle, CheckCircle, LockSimple, MapPin } from "../ui/icons";

/* One visual language with the problem section: real footage, one product fragment over it, one line under it. */
const MEDIA = ["steam", "warehouse", "hotel"];

const glass = "rounded-2xl bg-[rgb(17_17_17/0.74)] p-3 backdrop-blur-md";

function Fragment({ i, tr }: { i: number; tr: boolean }) {
  if (i === 0) return (
    <div className={`${glass} space-y-1.5`}>
      {(tr ? ["Tahtaları ve bıçakları dezenfekte edin", "Hazırlıkları etiketleyip tarihleyin"] : ["Sanitise boards and knives", "Label and date prep"]).map((s, k) => (
        <div key={s} className="flex items-center gap-3 rounded-xl bg-white/[.06] px-3 py-2 text-[13px]">
          <span className="tabular-nums text-ice-400">{k + 3}</span><span className="flex-1 truncate">{s}</span>
          {k === 0
            ? <span className="bento-swap relative h-6 w-[5.6rem] shrink-0 text-xs font-semibold">
                <span className="bento-a absolute inset-0 grid place-items-center rounded-full bg-white/[.08] text-ice-300"><span className="flex items-center gap-1"><Sparkle size={12} weight="fill" />{tr ? "Taslak" : "Draft"}</span></span>
                <span className="bento-b absolute inset-0 grid place-items-center rounded-full bg-ice-100 text-bg"><span className="flex items-center gap-1"><CheckCircle size={12} weight="fill" />{tr ? "Onaylı" : "Approved"}</span></span>
              </span>
            : <span className="grid h-6 w-[5.6rem] shrink-0 place-items-center rounded-full bg-ice-100 text-xs font-semibold text-bg"><span className="flex items-center gap-1"><CheckCircle size={12} weight="fill" />{tr ? "Onaylı" : "Approved"}</span></span>}
        </div>))}
    </div>);
  if (i === 1) return (
    <div className={`${glass} space-y-2.5 px-4 py-3.5`}>
      {(tr ? [["Kadıköy", 92], ["Beşiktaş", 78], ["Ankara", 64]] : [["Downtown", 92], ["Airport", 78], ["Harbour", 64]]).map(([n, v]) => (
        <div key={n as string}>
          <div className="flex items-baseline justify-between text-[13px]"><span>{n as string}</span><span className="font-semibold tabular-nums">{v as number}%</span></div>
          <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/10"><span className="bento-bar block h-full rounded-full bg-ice-200" style={{ width: `${v}%` }} /></span>
        </div>))}
    </div>);
  return (
    <div className={`${glass} space-y-1.5`}>
      {(tr ? [["Kat görevlisi", "Kadıköy", true], ["Resepsiyon", "Beşiktaş", true], ["Mutfak", "Tüm şubeler", false]] : [["Housekeeping", "Downtown", true], ["Front desk", "Airport", true], ["Kitchen", "All sites", false]]).map(([r, l, open]) => (
        <div key={r as string} className="flex items-center gap-3 rounded-xl bg-white/[.06] px-3 py-2 text-[13px]">
          <span className="flex-1">{r as string}</span><span className="flex items-center gap-1 text-xs text-ice-400"><MapPin size={12} />{l as string}</span>
          {open ? <CheckCircle size={15} weight="fill" className="text-ice-200" /> : <LockSimple size={15} className="text-ice-400" />}
        </div>))}
    </div>);
}

export function Capabilities({ lang }: { lang: Lang }) {
  const c = home[lang].caps; const tr = lang === "tr";
  return (
    <section aria-labelledby="caps-h" className="section-y bg-bg">
      <div className="container-x">
        <Heading id="caps-h" eyebrow={c.k} title={<>{c.h[0]} <span className="text-ice-400">{c.h[1]}</span></>} lead={c.lead} />
        <Reveal as="ul" stagger={0.1} className="no-sb -mx-[var(--pad-x)] mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad-x)] pb-1 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {c.cards.map((card, i) => (
            <RevealItem as="li" key={card.h} className="w-[82%] shrink-0 snap-start md:w-auto">
              <article className="relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[28px] bg-surface-1 p-4 sm:p-5">
                <picture aria-hidden="true"><source srcSet={`/video/${MEDIA[i]}.avif`} type="image/avif" /><img src={`/video/${MEDIA[i]}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>
                <SmartVideo name={MEDIA[i]} poster={`/video/${MEDIA[i]}.webp`} threshold={0.6} />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.25)_0%,rgb(17_17_17/0)_35%,rgb(17_17_17/0.9)_100%)]" />
                <div aria-hidden="true" className="relative"><Fragment i={i} tr={tr} /></div>
                <div className="relative">
                  <h3 className="text-[21px] font-semibold leading-tight tracking-[-.02em]">{card.h}</h3>
                  <p className="mt-2 text-[15px] leading-snug text-ice-300">{card.p}</p>
                </div>
              </article>
            </RevealItem>))}
        </Reveal>
        <p className="mt-5 text-xs text-ink-faint">{c.sample}</p>
      </div>
    </section>);
}
