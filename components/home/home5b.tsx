"use client";
/* Home sections below the fold. Split from home5.tsx so their code loads after the first paint; their HTML is still
 * rendered on the server. Page order (8 sections in all, see Site.tsx): how it works, industries, before and after,
 * integrations, pricing, FAQ with the closing call to action. Same visual rules as home5.tsx. */
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { SITE, PLANS, savePct } from "../config";
import { useLocale, fmt } from "../i18n/LocaleProvider";
import { COMPARE5 } from "../i18n/extra";
import { StoreButtons } from "../Icons";
import { SmartVideo } from "../ui/SmartVideo";
import { EASE } from "../ui/Reveal";
import { Pic, Label, H2, card, type Ic } from "./home5";
import { ArrowRight, Check, Users, Sparkle, Question, Plus, X, ArrowsLeftRight, Tag, Lightning, Buildings } from "../ui/icons";


/* ---------- Before and after: one frame, a handle to drag between the usual way and Flexlore ----------
 * The usual way (an empty training room, greyscale) lies over Flexlore (filming at the station, in colour) and is
 * clipped at the handle. When the frame first comes into view the handle sweeps across once; after that the visitor
 * drags it (pointer, touch or arrow keys through a native range input). The glass card lists the side that covers
 * more of the frame. Reduced motion: no sweep, the Flexlore side shows. `short` keeps four rows (home). */
export function Compare5({ short = false }: { short?: boolean }) {
  const { locale } = useLocale(); const c = COMPARE5[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const seen = useInView(ref, { amount: 0.5, once: true });
  const rows = short ? [0, 1, 4, 5].map((i) => c.rows[i]) : c.rows;
  const [pos, setPos] = useState(88); const [touched, setTouched] = useState(false); const raf = useRef(0);
  useEffect(() => {
    if (!seen || touched) return;
    if (reduce) { setPos(12); return; }
    const from = 88, to = 12, dur = 1800; let t0 = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (t: number) => { if (!t0) t0 = t; const k = Math.min(1, (t - t0) / dur); setPos(from + (to - from) * ease(k)); if (k < 1) raf.current = requestAnimationFrame(tick); };
    const start = window.setTimeout(() => { raf.current = requestAnimationFrame(tick); }, 400);
    return () => { window.clearTimeout(start); cancelAnimationFrame(raf.current); };
  }, [seen, touched, reduce]);
  const old = pos > 50; const rtl = locale === "ar";
  // Physical clip: the usual way always sits on the left of the handle (also in Arabic, where the arrow keys follow the input).
  const clip = { clipPath: `inset(0 ${100 - pos}% 0 0)` };
  return (
    <section aria-labelledby="cmp5-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-5">
          <div className="col-span-12 lg:col-span-7"><Label icon={ArrowsLeftRight}>{c.k}</Label><H2 id="cmp5-h" className="max-w-[20ch]">{c.h}</H2></div>
          <p className="col-span-12 max-w-[34rem] text-[16px] leading-[1.6] text-ink-muted md:text-[17px] lg:col-span-5">{c.lead}</p>
        </div>
        <div ref={ref} dir="ltr" className="dark relative mt-8 aspect-[4/5] select-none outline-offset-4 has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-ink overflow-hidden rounded-[28px] bg-[#141414] text-white sm:aspect-[16/10] md:mt-10 lg:aspect-[16/8] lg:rounded-[32px]">
          {/* Flexlore, underneath */}
          <div aria-hidden="true" className="absolute inset-0">
            <Pic n="food-qa" sizes="(min-width:1024px) 80vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.35)_0%,rgb(17_17_17/0)_30%,rgb(17_17_17/0.15)_55%,rgb(17_17_17/0.85)_100%)]" />
            <span className="absolute end-4 top-4 inline-flex items-center gap-2 rounded-full bg-[rgb(17_17_17/0.6)] py-1.5 pe-3.5 ps-2 text-[13px] font-semibold ring-1 ring-white/10 backdrop-blur-md md:end-6 md:top-6 md:text-[14px]"><img src="/brand/symbol-main.svg" alt="" className="h-4 w-4" />{c.now}</span>
          </div>
          {/* The usual way, on top, clipped at the handle */}
          <div aria-hidden="true" className="absolute inset-0" style={clip}>
            <picture><source srcSet="/blog/5Gqy3sTtza69mfyNDeoj3TAXg-800.avif 800w, /blog/5Gqy3sTtza69mfyNDeoj3TAXg-1600.avif 1600w" sizes="(min-width:1024px) 80vw, 100vw" type="image/avif" />
              <img src="/blog/5Gqy3sTtza69mfyNDeoj3TAXg-1600.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale" /></picture>
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.45)_0%,rgb(17_17_17/0.25)_40%,rgb(17_17_17/0.9)_100%)]" />
            <span className="absolute start-4 top-4 inline-flex items-center gap-2 rounded-full bg-[rgb(17_17_17/0.6)] py-1.5 pe-3.5 ps-2.5 text-[13px] font-medium text-white/80 ring-1 ring-white/10 backdrop-blur-md md:start-6 md:top-6 md:text-[14px]"><X size={13} />{c.old}</span>
          </div>
          {/* Handle */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-10 w-0" style={{ left: `${pos}%` }}>
            <span className="absolute inset-y-0 -left-px w-[2px] bg-white/85 shadow-[0_0_24px_rgb(0_0_0/0.5)]" />
            <span className={`absolute left-0 top-[30%] grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white md:top-[40%] text-[#111] shadow-[0_8px_30px_rgb(0_0_0/0.45)] ${touched || reduce ? "" : "cmp-pulse"}`}><ArrowsLeftRight size={20} /></span>
          </div>
          {/* The list of the side that covers more of the frame */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 md:inset-x-auto md:bottom-6 md:start-6 md:w-[25rem]" dir={rtl ? "rtl" : "ltr"}>
            <AnimatePresence mode="wait" initial={false}>
              <m.ul key={old ? "old" : "now"} aria-live="polite" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -4 }} transition={{ duration: 0.25, ease: EASE }}
                className="space-y-1 rounded-[20px] bg-[rgb(17_17_17/0.72)] p-2 ring-1 ring-white/10 backdrop-blur-md">
                <li className="px-2.5 pb-1 pt-1 text-[12px] font-medium uppercase tracking-[.08em] text-white/55">{old ? c.old : c.now}</li>
                {rows.map(([o, n]) => (
                  <li key={o} className={`flex items-center gap-3 rounded-[14px] px-2.5 py-2 text-[14px] md:text-[15px] ${old ? "text-white/60" : "bg-[rgb(255_255_255/0.06)] font-medium text-white"}`}>
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${old ? "bg-[rgb(255_255_255/0.08)] text-white/55" : "bg-white text-[#111]"}`}>{old ? <X size={12} aria-hidden="true" /> : <Check size={12} aria-hidden="true" />}</span>
                    {old ? o : n}</li>))}
              </m.ul>
            </AnimatePresence>
          </div>
          <input type="range" min={0} max={100} step={1} value={Math.round(pos)} aria-label={`${c.old} / ${c.now}`} aria-valuetext={old ? c.old : c.now}
            onChange={(e) => { setTouched(true); cancelAnimationFrame(raf.current); setPos(Number(e.target.value)); }}
            className="cmp-range absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0 [touch-action:pan-y]" />
        </div>
        {/* Screen readers get both columns as one plain list. */}
        <ul className="sr-only">{rows.map(([o, n]) => <li key={o}>{c.old}: {o}. {c.now}: {n}.</li>)}</ul>
      </div>
    </section>);
}

/* ---------- Pricing preview (yearly by default) ---------- */
export function BillingSwitch({ yearly, setYearly, id }: { yearly: boolean; setYearly: (v: boolean) => void; id: string }) {
  const { d } = useLocale(); const c = d.pricing; const best = Math.max(...PLANS.map((p) => savePct(p) ?? 0));
  const b = (on: boolean) => `relative z-10 inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors ${on ? "text-bg" : "text-ink-muted hover:text-ink"}`;
  const pill = <m.span layoutId={`${id}-pill`} className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 260, damping: 30 }} />;
  return (
    <div role="group" aria-label={c.billing} className="inline-flex rounded-full bg-[var(--card)] p-1 ring-1 ring-line">
      <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)} className={b(!yearly)}>{!yearly && pill}{c.monthly}</button>
      <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)} className={b(yearly)}>{yearly && pill}{c.yearly}
        {best > 0 && <span className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${yearly ? "bg-bg/15 text-bg" : "bg-[var(--card-2)] text-ink-muted"}`}>{fmt(c.upTo, { pct: best })}</span>}</button>
    </div>);
}
const PLAN_IC: Record<string, Ic> = { free: Sparkle, pro: Lightning, proplus: Users, enterprise: Buildings };
/* Plans are bought in the app (or through a Stripe link once set). Phones go straight to their store; on a desktop the
   button opens a small panel with both store badges, so nobody lands on the same price cards again. */
function GetApp({ checkout, label, cls }: { checkout: string | null; label: string; cls: string }) {
  const { lang } = useLocale(); const [open, setOpen] = useState(false); const box = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; const off = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", off); return () => document.removeEventListener("mousedown", off); }, [open]);
  const go = (e: React.MouseEvent) => { if (checkout) return; e.preventDefault(); const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua)) window.location.href = SITE.appStore; else if (/Android/i.test(ua)) window.location.href = SITE.googlePlay; else setOpen((o) => !o); };
  return (<div ref={box} className="relative"><a href={checkout ?? SITE.appStore} onClick={go} aria-expanded={checkout ? undefined : open} className={cls}>{label}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>
    {open && <div className="absolute inset-x-0 top-full z-20 mt-2 flex flex-col items-center gap-2 rounded-[18px] bg-surface-1 p-3 ring-1 ring-line"><StoreButtons small lang={lang} /></div>}</div>);
}
export function PlanCard({ id, yearly, full = false, className = "" }: { id: string; yearly: boolean; full?: boolean; className?: string }) {
  const { d } = useLocale(); const c = d.pricing; const p = PLANS.find((x) => x.id === id)!; const rec = !!p.featured; const I = PLAN_IC[id];
  const [name, forWho] = c.plans[id as keyof typeof c.plans]; const pr = yearly ? p.yearly : p.monthly; const save = yearly ? savePct(p) : null;
  const users: Record<string, string> = { free: "3", pro: "10", proplus: "30" };
  const pts = full ? d.pricingPage.points[id as keyof typeof d.pricingPage.points] : c.feats[id as keyof typeof c.feats];
  const prev = { pro: "free", proplus: "pro", enterprise: "proplus" }[id as "pro"] as keyof typeof c.plans | undefined;
  const checkout = (yearly ? (p as { checkoutYearly?: string | null }).checkoutYearly : p.checkout) ?? null;
  const reduce = useReducedMotion();
  return (
    <li id={`plan-${id}`} className={`relative flex-col rounded-[28px] p-5 md:p-7 ${rec ? "bg-ink text-bg" : "bg-[var(--card)]"} ${className || "flex"}`}>
      {/* Phones: no icon row (only the "recommended" badge), so the price sits higher. */}
      <div className={`${rec ? "flex" : "hidden md:flex"} items-center justify-between gap-3`}>
        <span aria-hidden="true" className={`hidden h-11 w-11 place-items-center rounded-[14px] md:grid ${rec ? "bg-bg/10" : "bg-[var(--card-2)]"}`}><I size={20} /></span>
        {rec && <span className="rounded-full bg-bg/10 px-3 py-1 text-[12px] font-semibold">{c.recommended}</span>}
      </div>
      <h3 className={`text-[20px] font-semibold md:mt-6 ${rec ? "mt-3" : ""}`}>{name}</h3>
      <p className={`mt-1 text-[14px] md:min-h-[2.6rem] leading-snug ${rec ? "text-bg/70" : "text-ink-muted"}`}>{forWho}</p>
      <div className="mt-4 md:mt-6 md:min-h-[5.5rem]">
        {pr ? <>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <AnimatePresence mode="popLayout" initial={false}><m.span key={pr.now} className="text-[40px] font-bold leading-none tracking-[-.03em]" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>{pr.now}</m.span></AnimatePresence>
            <span className={`text-[14px] ${rec ? "text-bg/70" : "text-ink-muted"}`}>{c.perMo}</span>
            {save && <span className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${rec ? "bg-bg/10" : "bg-[var(--card-2)] text-ink-muted"}`}>{fmt(c.save, { pct: save })}</span>}
          </div>
          <p className={`mt-2 text-[13px] ${rec ? "text-bg/70" : "text-ink-faint"}`}>{id === "free" ? c.free : yearly ? fmt(c.yrNote, { total: `$${(parseFloat(pr.now.replace(/[^0-9.]/g, "")) * 12).toFixed(2)}` }) : c.moNote}</p>
        </> : <><p className="text-[34px] font-bold leading-none tracking-[-.03em]">{c.contact}</p><p className={`mt-2 text-[13px] ${rec ? "text-bg/70" : "text-ink-faint"}`}>{c.custom}</p></>}
      </div>
      {id === "enterprise"
        ? <a href={SITE.demo} className={`btn mt-5 w-full md:mt-6 ${rec ? "bg-bg text-ink" : "btn-secondary"}`}>{c.talk}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>
        : <GetApp checkout={checkout} label={id === "free" ? c.start : c.choose} cls={`btn mt-5 w-full md:mt-6 ${rec ? "bg-bg text-ink hover:opacity-90" : "btn-secondary"}`} />}
      <div className={`mt-5 flex-1 rounded-[20px] p-4 md:mt-6 ${rec ? "bg-bg/[.08]" : "bg-[var(--card-2)]"}`}>
        <p className="flex items-center gap-2 text-[14px] font-semibold"><Users size={16} aria-hidden="true" />{id === "enterprise" ? c.enterpriseUsers : fmt(c.users, { n: users[id] })}</p>
        {prev && <p className={`mt-3 text-[13px] ${rec ? "text-bg/70" : "text-ink-faint"}`}>{fmt(c.plus, { plan: c.plans[prev][0] })}</p>}
        <ul className="mt-3 space-y-2 text-[14px]">{pts.map((f) => <li key={f} className={`flex items-start gap-2.5 ${rec ? "text-bg/85" : "text-ink-muted"}`}><Check size={15} aria-hidden="true" className="mt-0.5 shrink-0" />{f}</li>)}</ul>
      </div>
    </li>);
}
/* FAQ: heading and contact on the left (sticky on desktop), numbered questions in one card on the right.
 * The open question gets an orange number and icon; its answer lines up under the question text. */
export function Faq5({ children, openFirst = true }: { children?: React.ReactNode; openFirst?: boolean }) {
  const { d } = useLocale(); const c = d.faq; const [open, setOpen] = useState<number | null>(openFirst ? 0 : null); const reduce = useReducedMotion();
  return (
    <section id="faq" aria-labelledby="faq-h" className="section-y pt-0">
      <div className="container-x grid-12 gap-y-6 md:gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Label icon={Question}>{c.k}</Label><H2 id="faq-h">{c.h}</H2>
            <p className="mt-4 max-w-[24rem] text-[16px] leading-[1.55] text-ink-muted">{c.moreP}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <Link href="/pricing/" className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[var(--card)] px-4 text-[14px] font-semibold hover:bg-[var(--card-2)]"><Tag size={14} aria-hidden="true" />{d.pricing.all}</Link>
              <a href="mailto:support@flexlore.com" className="inline-flex min-h-11 items-center px-2 text-[14px] text-ink-muted underline-offset-4 hover:text-ink hover:underline">support@flexlore.com</a>
            </div>
          </div>
        </div>
        <ul className="col-span-12 overflow-hidden rounded-[24px] bg-[var(--card)] lg:col-span-8">
          {c.items.map(([q, a], i) => { const on = open === i; return (
            <li key={q} className={`border-line transition-colors duration-300 [&:not(:first-child)]:border-t ${on ? "bg-[var(--card-2)]" : ""}`}>
              <h3><button type="button" id={`faq-q-${i}`} aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}
                className="group grid min-h-14 w-full grid-cols-[2rem_1fr_auto] items-center gap-3 px-4 py-4 text-start md:min-h-[72px] md:grid-cols-[2.75rem_1fr_auto] md:px-7">
                <span aria-hidden="true" className={`text-[13px] font-semibold tabular-nums transition-colors md:text-[14px] ${on ? "text-accent" : "text-ink-faint"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`text-[16px] font-semibold leading-snug tracking-[-.01em] transition-colors md:text-[18px] ${on ? "text-ink" : "text-ink/85 group-hover:text-ink"}`}>{q}</span>
                <m.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.3, ease: EASE }} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${on ? "bg-accent text-white" : "bg-[var(--card-2)] text-ink-muted group-hover:text-ink"}`}><Plus size={15} aria-hidden="true" /></m.span>
              </button></h3>
              <AnimatePresence initial={false}>{on && (
                <m.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35, ease: EASE }} className="overflow-hidden">
                  <p className="max-w-[40rem] pb-6 pe-14 ps-[3.75rem] text-[15px] leading-[1.6] text-ink-muted md:pe-20 md:ps-[5.25rem] md:text-[16px]">{a}</p></m.div>)}</AnimatePresence>
            </li>); })}
        </ul>
        {children && <div className="col-span-12 mt-4 md:mt-6">{children}</div>}
      </div>
    </section>);
}
