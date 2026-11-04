"use client";
/* Home sections below the fold (5 to 16). Split from home5.tsx so their code loads after the first paint;
 * their HTML is still rendered on the server. Same rules as home5.tsx. */
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { SITE, PLANS, savePct } from "../config";
import { useLocale, fmt } from "../i18n/LocaleProvider";
import { LOCALES } from "../i18n/locales";
import { EXTRA, INTEG, COMPARE5 } from "../i18n/extra";
import { Device, WorkScreen } from "../AppScreens";
import { SmartVideo } from "../ui/SmartVideo";
import { Reveal, RevealItem, EASE } from "../ui/Reveal";
import { Pic, Label, H2, card, inner, Corner, Title, type Ic } from "./home5";
import {
  ArrowRight, Check, CheckCircle, Users, BookOpen, Sparkle, MapPin, LockSimple, FilmSlate, Question, ChartBar,
  Plus, ShieldCheck, ListChecks, Pause, Play, X, ArrowsLeftRight, CookingPot, GraduationCap, UserPlus, Storefront, FirstAid, ChalkboardTeacher, Barbell, Ticket, DotsThreeCircle,
  PlugsConnected, ChatCircle, Tag, Lightning, Buildings, ForkKnife, Factory, Bed, Code, DeviceMobile, Browser,
} from "../ui/icons";

const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Dash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="aspect-[1180/720] w-full" /> });

/* ---------- 3b. Before and after: the usual way vs Flexlore, row by row ---------- */
export function Compare5() {
  const { locale } = useLocale(); const c = COMPARE5[locale];
  return (
    <section aria-labelledby="cmp5-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-5">
          <div className="col-span-12 lg:col-span-7"><Label icon={ArrowsLeftRight}>{c.k}</Label><H2 id="cmp5-h" className="max-w-[18ch]">{c.h}</H2></div>
          <p className="col-span-12 max-w-[34rem] text-[17px] leading-[1.6] text-ink-muted lg:col-span-5">{c.lead}</p>
        </div>
        <div className={`${card} mt-12 p-2 md:p-3`}>
          <div className="hidden grid-cols-[1fr_44px_1fr] items-center px-5 pb-3 pt-4 text-[13px] font-medium md:grid">
            <span className="text-ink-faint">{c.old}</span><span />
            <span className="flex items-center gap-2 text-ink"><img src="/brand/symbol-main.svg" alt="" className="h-4 w-4" />{c.now}</span>
          </div>
          <Reveal as="ul" stagger={0.07} className="space-y-1.5">
            {c.rows.map(([o, n]) => (
              <RevealItem as="li" key={o} className="grid items-center gap-2 rounded-[18px] bg-[var(--card-2)] p-4 md:grid-cols-[1fr_44px_1fr] md:gap-0 md:px-5">
                <span className="flex items-center gap-3 text-[15px] text-ink-faint"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--card)]"><X size={13} aria-hidden="true" /></span><span><span className="sr-only">{c.old}: </span>{o}</span></span>
                <ArrowRight size={16} aria-hidden="true" className="hidden justify-self-center text-ink-faint md:block rtl:-scale-x-100" />
                <span className="flex items-center gap-3 text-[15px] font-medium text-ink"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-bg"><Check size={13} aria-hidden="true" /></span><span><span className="sr-only">{c.now}: </span>{n}</span></span>
              </RevealItem>))}
          </Reveal>
        </div>
      </div>
    </section>);
}

/* ---------- 4. Process: one story, four steps, one stage ---------- */
const STAGE = [{ v: "kitchen", icon: FilmSlate }, { v: "line", icon: Sparkle }, { v: "plating", icon: ListChecks }, { v: "coffee", icon: ChartBar }] as const;
export function Process5() {
  const { d, lang, locale } = useLocale(); const c = d.process; const x = EXTRA[locale]; const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null); const on = useInView(ref, { amount: 0.35 }); const near = useInView(ref, { margin: "300px 0px", once: true });
  const [i, setI] = useState(0); const [hold, setHold] = useState(false); const [paused, setPaused] = useState(false);
  const run = on && !hold && !paused && !reduce;
  useEffect(() => { if (!run) return; const t = window.setTimeout(() => setI((k) => (k + 1) % 4), 6000); return () => window.clearTimeout(t); }, [run, i]);
  const screen = i === 0 ? <Editor active={on} lang={lang} /> : i === 1 ? <WorkScreen active={on} lang={lang} />
    : i === 2 ? <Quiz active={on} lang={lang} q={d.bento.q} a={d.bento.qa} /> : <Ready active={on} lang={lang} />;
  const ChipIc = [FilmSlate, Sparkle, Play, CheckCircle][i];
  return (
    <section id="how" aria-labelledby="how-h" className="section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label icon={Lightning}>{c.k}</Label><H2 id="how-h" className="max-w-[20ch]">{c.h}</H2></div>
          {!reduce && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? c.play : c.pause} className="grid h-11 w-11 place-items-center rounded-full bg-[var(--card)] text-ink-muted transition-colors hover:text-ink">{paused ? <Play size={15} weight="fill" aria-hidden="true" /> : <Pause size={15} weight="fill" aria-hidden="true" />}</button>}
        </div>
        <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <ol className="no-sb flex gap-2 overflow-x-auto lg:col-span-5 lg:flex-col lg:justify-center lg:gap-1 lg:overflow-visible" role="tablist" aria-label={c.k}>
            {c.steps.map(([h, p], k) => { const I = STAGE[k].icon; const act = i === k; return (
              <li key={h} className="shrink-0 basis-[80%] sm:basis-[46%] lg:basis-auto">
                <button type="button" role="tab" aria-selected={act} onClick={() => setI(k)} onFocus={() => setI(k)}
                  className={`relative block h-full w-full rounded-[22px] p-5 text-start transition-colors duration-300 ${act ? "bg-[var(--card)]" : "hover:bg-[var(--card)]/50"}`}>
                  <span className="flex items-center gap-4">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[14px] transition-colors duration-300 ${act ? "bg-[var(--card-2)] text-ink" : "text-ink-faint"}`}><I size={20} /></span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-medium uppercase tracking-[.08em] text-ink-faint">{String(k + 1).padStart(2, "0")}</span>
                      <span className={`block text-[19px] font-semibold tracking-[-0.015em] transition-colors ${act ? "text-ink" : "text-ink-muted"}`}>{h}</span>
                    </span>
                  </span>
                  <span className={`mt-3 block text-[15px] leading-[1.6] text-ink-muted lg:ps-[3.75rem] ${act ? "" : "lg:hidden"}`}>{p}</span>
                  {act && <span aria-hidden="true" className="mt-4 block h-[2px] overflow-hidden rounded-full bg-[var(--card-2)] lg:ms-[3.75rem]">
                    <span key={`${i}-${run}`} className="block h-full origin-left rounded-full bg-ink/70 rtl:origin-right" style={{ animation: run ? "procbar 6s linear forwards" : "none", transform: run ? undefined : "scaleX(1)" }} /></span>}
                </button>
              </li>); })}
          </ol>
          <div className="dark relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#141414] sm:aspect-[16/11] lg:col-span-7 lg:aspect-auto lg:min-h-[620px]">
            <AnimatePresence initial={false}>
              <m.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}>
                <img src={`/video/${STAGE[i].v}.webp`} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-[6px]" />
                {near && <SmartVideo name={STAGE[i].v} poster={`/video/${STAGE[i].v}.webp`} threshold={0.3} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-[6px]" />}
              </m.div>
            </AnimatePresence>
            <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgb(20_20_20/0)_0%,rgb(20_20_20/0.75)_75%)]" />
            <div className="absolute left-1/2 top-[17%] w-[min(50%,280px)] -translate-x-1/2" dir="ltr">
              <Device label={c.steps[i][0]}>{near ? screen : <div className="absolute inset-0 bg-[#111]" />}</Device>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}
                className="absolute start-5 top-5 flex w-max max-w-[80%] items-center gap-3 rounded-full bg-[rgb(30_30_30/0.85)] py-2 pe-5 ps-2 text-[14px] font-medium text-white ring-1 ring-white/10 backdrop-blur-md">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#111]"><ChipIc size={15} /></span>{x.chips[i]}
              </m.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-[13px] text-ink-faint sm:flex-row sm:justify-between">
          <p className="flex items-start gap-2"><ShieldCheck size={15} aria-hidden="true" className="mt-px shrink-0" />{c.note}</p><p>{c.sample}</p>
        </div>
      </div>
    </section>);
}

/* ---------- 5. Capabilities (video cards, restored) ---------- */
const CAP_MEDIA = ["steam", "warehouse", "hotel"];
const glass = "rounded-2xl bg-[rgb(17_17_17/0.74)] p-3 backdrop-blur-md";
export function Caps5() {
  const { d } = useLocale(); const c = d.caps; const f = c.frag;
  const frag = (i: number) => i === 0 ? (
    <div className={`${glass} space-y-1.5`}>{[f.s1, f.s2].map((s, k) => (
      <div key={s} className="flex items-center gap-3 rounded-xl bg-[rgb(255_255_255/0.06)] px-3 py-2 text-[13px] text-white">
        <span className="tabular-nums text-white/55">{k + 3}</span><span className="flex-1 truncate">{s}</span>
        {k === 0 ? <span className="bento-swap relative h-6 w-[6.2rem] shrink-0 text-xs font-semibold">
          <span className="bento-a absolute inset-0 grid place-items-center rounded-full bg-[rgb(255_255_255/0.1)] text-white/75"><span className="flex items-center gap-1"><Sparkle size={12} weight="fill" />{f.draft}</span></span>
          <span className="bento-b absolute inset-0 grid place-items-center rounded-full bg-[#E7EBEB] text-[#111]"><span className="flex items-center gap-1"><CheckCircle size={12} weight="fill" />{f.ok}</span></span></span>
          : <span className="grid h-6 w-[6.2rem] shrink-0 place-items-center rounded-full bg-[#E7EBEB] text-xs font-semibold text-[#111]"><span className="flex items-center gap-1"><CheckCircle size={12} weight="fill" />{f.ok}</span></span>}
      </div>))}</div>
  ) : i === 1 ? (
    <div className={`${glass} space-y-2.5 px-4 py-3.5 text-white`}>{f.sites.map((n, k) => { const v = [92, 78, 64][k]; return (
      <div key={n}><div className="flex items-baseline justify-between text-[13px]"><span>{n}</span><span className="font-semibold tabular-nums">{v}%</span></div>
        <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-[rgb(255_255_255/0.1)]"><span className="bento-bar block h-full rounded-full bg-[#D2D8D9]" style={{ width: `${v}%` }} /></span></div>); })}</div>
  ) : (
    <div className={`${glass} space-y-1.5`}>{f.roles.map(([r, l], k) => (
      <div key={r} className="flex items-center gap-3 rounded-xl bg-[rgb(255_255_255/0.06)] px-3 py-2 text-[13px] text-white">
        <span className="flex-1">{r}</span><span className="flex items-center gap-1 text-xs text-white/55"><MapPin size={12} />{l}</span>
        {k < 2 ? <CheckCircle size={15} weight="fill" className="text-[#D2D8D9]" /> : <LockSimple size={15} className="text-white/55" />}
      </div>))}</div>);
  return (
    <section aria-labelledby="caps-h" className="section-y pt-0">
      <div className="container-x">
        <Label icon={ShieldCheck}>{c.k}</Label>
        <H2 id="caps-h" className="max-w-[18ch]">{c.h} <span className="text-ink-faint">{c.h2}</span></H2>
        <p className="mt-5 max-w-[36rem] text-[17px] leading-[1.55] text-ink-muted">{c.lead}</p>
        <Reveal as="ul" stagger={0.1} className="no-sb -mx-[var(--pad-x)] mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--pad-x)] pb-1 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {c.cards.map(([h, p], i) => (
            <RevealItem as="li" key={h} className="w-[82%] shrink-0 snap-start md:w-auto">
              <article className="dark relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[28px] bg-[#1a1816] p-4 sm:p-5">
                <picture aria-hidden="true"><source srcSet={`/video/${CAP_MEDIA[i]}.avif`} type="image/avif" /><img src={`/video/${CAP_MEDIA[i]}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>
                <SmartVideo name={CAP_MEDIA[i]} poster={`/video/${CAP_MEDIA[i]}.webp`} threshold={0.6} />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.25)_0%,rgb(17_17_17/0)_35%,rgb(17_17_17/0.9)_100%)]" />
                <div aria-hidden="true" className="relative">{frag(i)}</div>
                <div className="relative text-white"><h3 className="text-[21px] font-semibold leading-tight tracking-[-.02em]">{h}</h3><p className="mt-2 text-[15px] leading-snug text-white/75">{p}</p></div>
              </article>
            </RevealItem>))}
        </Reveal>
        <p className="mt-4 text-[13px] text-ink-faint">{c.sample}</p>
      </div>
    </section>);
}

/* ---------- 6. Bento: the product in five moves, animated once in view (final state under reduced motion) ---------- */
const BLOG = (id: string) => <picture><source srcSet={`/blog/${id}-800.avif`} type="image/avif" /><img src={`/blog/${id}-800.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>;
const gl = "rounded-[18px] bg-[rgb(20_20_20/0.72)] ring-1 ring-white/10 backdrop-blur-md";
export function Bento5() {
  const { d, lang } = useLocale(); const c = d.bento; const ref = useRef<HTMLDivElement>(null); const reduce = useReducedMotion();
  const near = useInView(ref, { margin: "300px 0px", once: true }); const on = useInView(ref, { amount: 0.2 }); const seen = useInView(ref, { amount: 0.25, once: true });
  const go = seen || !!reduce;
  const thumbs = ["kitchenline", "chef-plating", "chef-fire"];
  const st = (delay: number) => (reduce ? {} : { animationDelay: `${delay}ms` });
  return (
    <section id="product" aria-labelledby="bento-h" className="section-y pt-0">
      <div className="container-x">
        <Label icon={Sparkle}>{c.k}</Label>
        <H2 id="bento-h" className="max-w-[18ch]">{c.h}</H2>
        <div ref={ref} className={`mt-12 grid gap-3 lg:grid-cols-[1.15fr_1fr] ${go ? "bx-go" : ""}`}>
          {/* A: drafts arrive and get approved */}
          <article className={`${card} min-h-[500px] p-6 md:p-8`}>
            <Title a={c.a[0]} b={c.a[1]} /><Corner href="/ai/" label={c.a[0]} />
            <div aria-hidden="true" className="mx-auto mt-10 max-w-[27rem] space-y-2">
              {c.jobs.map((j, k) => (
                <div key={j} className={`${inner} bx-rise flex items-center gap-3.5 p-2.5 pe-3`} style={st(150 + k * 220)}>
                  <span className="h-11 w-11 shrink-0 overflow-hidden rounded-xl"><Pic n={thumbs[k]} sizes="44px" className="h-full w-full object-cover" /></span>
                  <span className="min-w-0 flex-1"><span className="block truncate text-[15px] font-medium">{j}</span><span className="block text-[12px] text-ink-faint">{c.assigned} · {c.who[k % 2]}</span></span>
                  <span className="relative grid h-7 w-[6.6rem] shrink-0 text-[12px] font-semibold">
                    <span className="bx-out absolute inset-0 grid place-items-center rounded-full bg-[var(--card)] text-ink-muted" style={st(1100 + k * 260)}><span className="flex items-center gap-1"><Sparkle size={12} weight="fill" />{d.caps.frag.draft}</span></span>
                    <span className="bx-in absolute inset-0 grid place-items-center rounded-full bg-ink text-bg" style={st(1100 + k * 260)}><span className="flex items-center gap-1"><CheckCircle size={12} weight="fill" />{d.caps.frag.ok}</span></span>
                  </span>
                </div>))}
              <div className="relative flex justify-center pt-6">
                <span className="bx-press inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-bg" style={st(2100)}><CheckCircle size={16} weight="fill" />{c.approve}</span>
                <span className="bx-cursor absolute start-[62%] top-0 flex items-end gap-1" dir="ltr" style={st(1700)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" className="text-ink"><path fill="currentColor" d="M4 2l16 9-7 2-3 7z" /></svg>
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[12px] font-semibold text-bg">{c.cursor}</span></span>
              </div>
            </div>
          </article>
          {/* B: the phone, the standard on every shift */}
          <article className={`${card} min-h-[500px] p-6 md:p-8`}>
            <Title a={c.b[0]} b={c.b[1]} /><Corner href="/#how" label={c.b[0]} />
            <div className="absolute left-1/2 top-[170px] w-[240px] -translate-x-1/2 md:w-[256px]" dir="ltr"><Device label={c.b[0]}>{near ? <Editor active={on} lang={lang} /> : <div className="absolute inset-0 bg-[#111]" />}</Device></div>
          </article>
        </div>
        <div className={`mt-3 grid gap-3 md:grid-cols-3 ${go ? "bx-go" : ""}`}>
          {/* C: the quiz picks its answer */}
          <article className={`${card} min-h-[440px] p-6 md:p-7`}>
            <h3 className="max-w-[14ch] text-[23px] font-semibold leading-[1.15] tracking-[-0.025em]">{c.c[0]} <span className="text-ink-faint">{c.c[1]}</span></h3>
            <div aria-hidden="true" className="absolute inset-x-6 bottom-6 md:inset-x-7 md:bottom-7">
              <p className="flex items-start gap-2.5 rounded-[16px] bg-[var(--card-2)] p-4 text-[14px] font-medium leading-snug"><Question size={17} className="mt-px shrink-0 text-ink-muted" />{c.q}</p>
              <ul className="mt-2 space-y-2 text-[14px]">{c.qa.map((q, k) => (
                <li key={q} className={`bx-rise relative overflow-hidden rounded-[14px] bg-[var(--card-2)]/60 px-4 py-3 text-ink-muted`} style={st(300 + k * 150)}>
                  {k === 1 && <span className="bx-fill absolute inset-0 rounded-[14px] bg-ink" style={st(1300)} />}
                  <span className={`relative flex items-center justify-between ${k === 1 ? "bx-ink" : ""}`} style={k === 1 ? st(1300) : undefined}>{q}{k === 1 && <Check size={15} />}</span>
                </li>))}</ul>
            </div>
          </article>
          {/* D: one standard sent to every location (glass over a photograph) */}
          <article className="dark relative min-h-[440px] overflow-hidden rounded-[28px] bg-[#1a1a1a] p-6 text-white md:p-7">
            {BLOG("Gwdo8HCLd9MKZb2aJJ3vh2EgM")}<span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.75)_0%,rgb(17_17_17/0.2)_45%,rgb(17_17_17/0.6)_100%)]" />
            <h3 className="relative max-w-[14ch] text-[23px] font-semibold leading-[1.15] tracking-[-0.025em]">{c.d[0]} <span className="text-white/60">{c.d[1]}</span></h3>
            <Corner href="/sektor/franchise/" label={c.d[0]} />
            <div aria-hidden="true" className={`${gl} absolute inset-x-6 bottom-6 space-y-1.5 p-2.5 md:inset-x-7`}>
              <p className="flex items-center justify-between px-2 pb-1 pt-0.5 text-[12px] text-white/70"><span className="flex items-center gap-1.5"><Storefront size={13} />{c.jobs[0]}</span><span>{c.today}</span></p>
              {[c.branch, ...c.locs].slice(0, 3).map((n, k) => (
                <div key={n} className="bx-rise flex items-center gap-3 rounded-xl bg-[rgb(255_255_255/0.07)] px-3 py-2.5 text-[13px]" style={st(400 + k * 350)}>
                  <MapPin size={13} className="text-white/60" /><span className="flex-1">{n}</span>
                  <CheckCircle size={15} weight="fill" className="bx-pop text-[#D2D8D9]" style={st(700 + k * 350)} />
                </div>))}
            </div>
          </article>
          {/* E: completion fills in, by location (glass over a photograph) */}
          <article className="dark relative min-h-[440px] overflow-hidden rounded-[28px] bg-[#1a1a1a] p-6 text-white md:p-7">
            {BLOG("vvyMkqyAHHEpN8ItawEya0MuNM")}<span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.75)_0%,rgb(17_17_17/0.2)_45%,rgb(17_17_17/0.6)_100%)]" />
            <h3 className="relative max-w-[14ch] text-[23px] font-semibold leading-[1.15] tracking-[-0.025em]">{c.e[0]} <span className="text-white/60">{c.e[1]}</span></h3>
            <Corner href="/#web" label={c.e[0]} />
            <div aria-hidden="true" className={`${gl} absolute inset-x-6 bottom-6 p-4 md:inset-x-7`}>
              <p className="flex items-center justify-between text-[12px] text-white/70"><span>{c.jobs[1]}</span><span>{c.sample}</span></p>
              <ul className="mt-3.5 space-y-3">{c.locs.map((n, k) => { const v = [92, 78, 64][k]; return (
                <li key={n}><p className="flex justify-between text-[13px]"><span className="flex items-center gap-1.5"><MapPin size={12} className="text-white/60" />{n}</span><span className="tabular-nums text-white/70">{v}%</span></p>
                  <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-[rgb(255_255_255/0.12)]"><span className="bx-bar block h-full origin-left rounded-full bg-[#E7EBEB] rtl:origin-right" style={{ width: `${v}%`, ...st(500 + k * 250) }} /></span></li>); })}</ul>
            </div>
          </article>
        </div>
        <p className="mt-4 text-[13px] text-ink-faint">{c.sample}</p>
      </div>
    </section>);
}

/* ---------- 7. Roles ---------- */
export function Roles5() {
  const { d } = useLocale(); const c = d.roles; const [on, setOn] = useState(1); const imgs = ["restaurant", "food-qa", "office"]; const icons: Ic[] = [Users, FilmSlate, Buildings];
  return (
    <section aria-labelledby="roles-h" className="section-y pt-0">
      <div className="container-x">
        <Label icon={Users}>{c.k}</Label>
        <H2 id="roles-h" className="max-w-[20ch]">{c.h}</H2>
        <ul className="mt-12 flex flex-col gap-6 md:flex-row md:gap-3">
          {c.items.map(([h, p], i) => { const I = icons[i]; return (
            <li key={h} onMouseEnter={() => setOn(i)} className={`transition-[flex-grow] duration-500 ease-[var(--ease-out-expo)] md:basis-0 ${on === i ? "md:grow-[2]" : "md:grow"}`}>
              <button type="button" onClick={() => setOn(i)} onFocus={() => setOn(i)} aria-expanded={on === i} className="block w-full text-start">
                <span className={`relative block aspect-[4/3] overflow-hidden rounded-[24px] md:aspect-auto md:h-[440px]`}>
                  <Pic n={imgs[i]} sizes="(min-width:768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute start-4 top-4 grid h-10 w-10 place-items-center rounded-[12px] bg-[rgb(17_17_17/0.6)] text-white backdrop-blur"><I size={18} /></span>
                </span>
                <span className="mt-5 block text-[22px] font-semibold leading-tight tracking-[-0.02em]">{h}</span>
                <span className={`mt-2 block max-w-[34rem] text-[16px] leading-[1.55] text-ink-muted ${on === i ? "" : "md:hidden"}`}>{p}</span>
              </button>
            </li>); })}
        </ul>
      </div>
    </section>);
}

/* ---------- 8. Workspaces ---------- */
export function Workspace5() {
  const { d } = useLocale(); const c = d.ws;
  const nodes: [string, string, number, number, number][] = [[c.nodes[0], "office", 7, 48, 0], [c.nodes[1], "chef-fire", 12, 64, 5], [c.nodes[2], "cafe-opening", 9, 41, 3], [c.nodes[3], "safety", 13, 93, 8]];
  const Node = ({ n }: { n: [string, string, number, number, number] }) => (
    <div className="overflow-hidden rounded-[18px] bg-[var(--card-2)]">
      <div className="relative h-20 md:h-24"><Pic n={n[1]} sizes="220px" className="h-full w-full object-cover" />{n[4] > 0 && <span className="absolute end-2 top-2 rounded-full bg-[rgb(255_255_255/0.92)] px-2 py-0.5 text-[11px] font-semibold text-[#A8491B]">{fmt(c.due, { n: n[4] })}</span>}</div>
      <p className="px-3 py-3 text-center text-[14px] font-semibold md:text-[15px]">{n[0]}</p>
      <div className="grid grid-cols-2 bg-[var(--card)]/40 text-[13px] text-ink-muted">
        <span className="flex items-center justify-center gap-1.5 py-2.5" title={c.jobs}><BookOpen size={14} aria-hidden="true" />{n[2]}<span className="sr-only"> {c.jobs}</span></span>
        <span className="flex items-center justify-center gap-1.5 py-2.5" title={c.people}><Users size={14} aria-hidden="true" />{n[3]}<span className="sr-only"> {c.people}</span></span>
      </div>
    </div>);
  return (
    <section aria-labelledby="ws-h" className="section-y pt-0">
      <div className="container-x grid-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <div className={`${card} p-5 md:p-10`}>
            <div className="mx-auto w-[46%] min-w-[150px] max-w-[220px]"><Node n={nodes[0]} /></div>
            <svg aria-hidden="true" viewBox="0 0 300 40" preserveAspectRatio="none" className="mx-auto block h-10 w-[68%] text-ink-faint/50"><path d="M150 0 V18 M150 18 H40 Q30 18 30 28 V40 M150 18 H260 Q270 18 270 28 V40 M150 18 V40" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>
            <div className="grid grid-cols-3 gap-2 md:gap-3">{nodes.slice(1).map((k) => <Node key={k[0]} n={k} />)}</div>
            <p className="mt-4 text-center text-[12px] text-ink-faint">{c.sample}</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:ps-6">
          <Label icon={Buildings}>{c.k}</Label>
          <H2 id="ws-h" className="max-w-[14ch]">{c.h}</H2>
          <p className="mt-5 text-[17px] leading-[1.55] text-ink-muted">{c.p}</p>
          <ul className="mt-8 space-y-3">{c.pts.map((p) => <li key={p} className="flex items-center gap-3 text-[15px]"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--card)] text-ink"><Check size={14} aria-hidden="true" /></span>{p}</li>)}</ul>
        </div>
      </div>
    </section>);
}

/* ---------- 9. Web ---------- */
export function Web5() {
  const { d } = useLocale(); const c = d.web; const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "400px 0px", once: true }); const on = useInView(ref, { amount: 0.25 });
  return (
    <section id="web" aria-labelledby="web-h" className="section-y pt-0">
      <div className="container-x grid-12 items-center gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <Label icon={ChartBar}>{c.k}</Label>
          <H2 id="web-h" className="max-w-[14ch]">{c.h}</H2>
          <p className="mt-5 max-w-[30rem] text-[17px] leading-[1.55] text-ink-muted">{c.p}</p>
          <a href={SITE.demo} className="btn btn-primary mt-8 h-12 px-6 text-[16px]">{c.cta}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></a>
        </div>
        <div ref={ref} className="col-span-12 lg:col-span-7">
          <div className={`${card} ps-6 pt-8 md:ps-12 md:pt-14`} dir="ltr">
            <div className="dark w-[130%] overflow-hidden rounded-tl-[22px] border-l-[10px] border-t-[10px] border-[#0b0b0b] md:w-[120%]">
              <div role="img" aria-label={c.sample}>{near ? <Dash on={on} /> : <div className="aspect-[1180/720] w-full" />}</div>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-ink-faint">{c.sample}</p>
        </div>
      </div>
    </section>);
}

/* ---------- 10. Integrations: Flexlore in the middle of the stack (roadmap labelled; only the apps are live) ---------- */
export function AI5() {
  const { d, locale } = useLocale(); const c = INTEG[locale];
  const soon = <span className="rounded-full bg-[var(--card-2)] px-2.5 py-0.5 text-[12px] font-medium text-ink-muted">{d.ai.soon}</span>;
  const SRC: Ic[] = [Users, BookOpen, Factory]; const DST: Ic[] = [ChartBar, ChatCircle, Code];
  const Tile = ({ I, t, s }: { I: Ic; t: string; s: string }) => (
    <div className={`${inner} flex items-center gap-3.5 p-3.5`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[var(--card)] text-ink"><I size={18} /></span>
      <span className="min-w-0"><span className="block text-[15px] font-semibold">{t}</span><span className="block text-[13px] text-ink-faint">{s}</span></span>
    </div>);
  const ys = [16.7, 50, 83.3];
  return (
    <section id="integrations" aria-labelledby="int-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-5">
          <div className="col-span-12 lg:col-span-7"><p className="inline-flex items-center gap-2.5 text-[15px] font-medium text-ink-muted"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--card)] text-ink"><PlugsConnected size={16} /></span>{c.k}</p>
            <H2 id="int-h" className="max-w-[18ch]">{c.h}</H2></div>
          <p className="col-span-12 max-w-[34rem] text-[17px] leading-[1.6] text-ink-muted lg:col-span-5">{c.p}</p>
        </div>

        <div className={`${card} mt-12 p-5 md:p-8`}>
          <div className="relative grid gap-4 lg:grid-cols-[1fr_minmax(220px,0.8fr)_1fr] lg:items-center lg:gap-14">
            {/* connectors (desktop): three in, three out, a dot travelling each way */}
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full text-ink-faint/35 lg:block">
              {ys.map((y, k) => <g key={k}>
                <path d={`M31 ${y} C 37 ${y}, 37 50, 41 50`} fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
                <path d={`M59 50 C 63 50, 63 ${y}, 69 ${y}`} fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
              </g>)}
            </svg>
            <div className="relative space-y-2.5">
              <p className="mb-1 flex items-center justify-between text-[13px] text-ink-faint"><span>{c.into}</span>{soon}</p>
              {c.sources.map(([t, x], k) => <Tile key={t} I={SRC[k]} t={t} s={x} />)}
            </div>
            <div className="relative mx-auto flex w-full max-w-[280px] flex-col items-center rounded-[24px] bg-[var(--card-2)] p-6 text-center">
              <span className="int-pulse grid h-16 w-16 place-items-center rounded-[20px] bg-[#111111] ring-1 ring-white/10"><img src="/brand/symbol-main.svg" alt="" className="h-8 w-8" /></span>
              <p className="mt-4 text-[17px] font-semibold">Flexlore</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-1.5">{["REST API", "Webhooks", "MCP"].map((x) => <li key={x} className="rounded-full bg-[var(--card)] px-3 py-1 text-[12px] font-medium text-ink-muted">{x}</li>)}</ul>
            </div>
            <div className="relative space-y-2.5">
              <p className="mb-1 flex items-center justify-between text-[13px] text-ink-faint"><span>{c.out}</span>{soon}</p>
              {c.dests.map(([t, x], k) => <Tile key={t} I={DST[k]} t={t} s={x} />)}
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1.2fr]">
          <div className={`${card} p-6 md:p-7`}>
            <p className="flex items-center gap-2 text-[14px] font-semibold"><span className="h-2 w-2 rounded-full bg-calm-aqua" />{c.live}</p>
            <ul className="mt-5 grid grid-cols-3 gap-2">{c.liveItems.map((x, k) => { const I = [DeviceMobile, DeviceMobile, Browser][k]; return (
              <li key={x} className={`${inner} flex flex-col items-center gap-2 px-2 py-4 text-center text-[13px] font-medium`}><I size={20} />{x}</li>); })}</ul>
            <p className="mt-5 text-[14px] leading-[1.55] text-ink-muted">{c.note}</p>
            <Link href="/integrations/" className="btn btn-secondary mt-6">{c.cta}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
          </div>
          <div className="dark overflow-hidden rounded-[28px] bg-[#0f0f0f] ring-1 ring-white/[.06]" aria-hidden="true">
            <div className="flex items-center justify-between px-5 py-3.5 text-[13px] text-white/60"><span className="flex items-center gap-2"><Code size={15} />{c.code}</span>{soon}</div>
            <pre dir="ltr" className="overflow-x-auto px-5 pb-6 font-sans text-[13px] tabular-nums leading-[1.75] text-white/80 [&_code]:font-sans"><code>{`POST https://your-app.example/hooks/flexlore
{
  "event":    "quiz.passed",
  "job":      "Allergen handling",
  "person":   "Operator 1",
  "location": "Harbour",
  "score":    "5/5"
}`}</code></pre>
          </div>
        </div>
      </div>
    </section>);
}

/* ---------- 11. Statement ---------- */
export function Statement5() {
  const { d } = useLocale(); const c = d.statement;
  return (
    <section aria-labelledby="st-h" className="pb-[var(--section-y)]">
      <div className="container-x">
        <div className="dark relative grid min-h-[540px] place-items-center overflow-hidden rounded-[32px] px-6 py-20 text-center md:min-h-[640px]">
          <img src="/video/gen-baker.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <SmartVideo name="gen-baker" poster="/video/gen-baker.webp" threshold={0.3} className="absolute inset-0 h-full w-full object-cover" />
          <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(17_17_17/0.5),rgb(17_17_17/0.72))]" />
          <div className="relative">
            <h2 id="st-h" className="mx-auto max-w-[18ch] text-[clamp(32px,1rem+3vw,64px)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">{c.h}</h2>
            <p className="mx-auto mt-5 max-w-[34rem] text-[17px] leading-[1.55] text-white/80">{c.p}</p>
            <a href="#how" className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-[rgb(17_17_17/0.75)] pe-2 ps-6 text-[15px] font-semibold text-white backdrop-blur">{c.cta}<span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#111]"><ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></span></a>
          </div>
        </div>
      </div>
    </section>);
}

/* ---------- 12. Industries + also used + 8 languages ---------- */
const IND = [["/sektor/restoran/", "chef-plating", ForkKnife], ["/sektor/uretim/", "field", Factory], ["/sektor/otel/", "hotel-desk", Bed], ["/sektor/franchise/", "huddle", Storefront]] as const;
const AREA_IC: Ic[] = [FirstAid, GraduationCap, ChalkboardTeacher, Barbell, Ticket, DotsThreeCircle];
export function Industries5() {
  const { d, setLocale, locale } = useLocale(); const c = d.ind;
  return (
    <section id="industries" aria-labelledby="ind-h" className="section-y pt-0">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label icon={Storefront}>{c.k}</Label><H2 id="ind-h" className="max-w-[16ch]">{c.h}</H2></div>
          <Link href="/see-it/" className="btn btn-secondary">{c.more}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {IND.map(([href, img, I], k) => (
            <li key={href}>
              <Link href={href} className="dark group relative block aspect-[3/4] overflow-hidden rounded-[24px] bg-[#2a2622]">
                <Pic n={img} sizes="(min-width:1024px) 25vw, 50vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_45%,rgb(17_17_17/0.8)_100%)]" />
                <span className="absolute start-4 top-4 grid h-10 w-10 place-items-center rounded-[12px] bg-[rgb(17_17_17/0.55)] text-white backdrop-blur"><I size={18} /></span>
                <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-white md:inset-x-5 md:bottom-5">
                  <span className="text-[16px] font-semibold leading-tight tracking-[-0.01em] md:text-[19px]">{c.cards[k]}</span>
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[rgb(255_255_255/0.2)] backdrop-blur transition-colors group-hover:bg-white group-hover:text-[#111]"><ArrowRight size={14} className="rtl:-scale-x-100" /></span>
                </span>
              </Link>
            </li>))}
        </ul>
        <div className="dark relative mt-3 overflow-hidden rounded-[28px] bg-[#161616] px-5 py-14 text-center md:py-20">
          <div aria-hidden="true" className="absolute inset-0">
            <SmartVideo name="kitchen-bg" poster="/video/kitchen-bg.webp" threshold={0.2} className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40 blur-[2px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(17_17_17/0.5)_0%,rgb(17_17_17/0.88)_70%,#111111_100%)]" />
          </div>
          <p className="relative text-[15px] text-white/70">{c.also}</p>
          <Reveal as="ul" stagger={0.04} className="relative z-10 mx-auto mt-6 flex max-w-[52rem] flex-wrap justify-center gap-2.5">
            {c.areas.map((name, k) => { const I = AREA_IC[k]; return (
              <RevealItem as="li" key={name}><span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[rgb(255_255_255/0.08)] pe-4 ps-3 text-[15px] text-white ring-1 ring-white/[.06] backdrop-blur-md"><I size={17} className="text-white/70" />{name}</span></RevealItem>); })}
          </Reveal>
          <div className="relative z-10 mt-12">
            <p className="text-[clamp(24px,1rem+1.4vw,36px)] font-semibold tracking-[-.03em] text-white">{c.langs}</p>
            <ul className="mx-auto mt-6 flex max-w-[48rem] flex-wrap justify-center gap-2">
              {LOCALES.map((l) => (
                <li key={l.code}><button type="button" onClick={() => setLocale(l.code)} lang={l.code} dir={l.dir} aria-pressed={locale === l.code}
                  className={`inline-flex min-h-11 items-center gap-2.5 rounded-full pe-4 ps-1.5 text-[15px] transition-colors ${locale === l.code ? "bg-white text-[#111]" : "bg-[rgb(255_255_255/0.08)] text-white hover:bg-[rgb(255_255_255/0.14)]"}`}>
                  <img src={`/flags/${l.flag}.svg`} alt="" width={28} height={28} className="h-7 w-7 rounded-full" />{l.name}</button></li>))}
            </ul>
          </div>
        </div>
      </div>
    </section>);
}

/* ---------- 13. Use cases, each with a photograph ---------- */
const CASE_META: [string, Ic, string][] = [["/sektor/uretim/", ShieldCheck, "safety"], ["/use-cases/installation-training-on-site-orientation/", MapPin, "phone-mount"], ["/sektor/restoran/", CookingPot, "chef-plating"], ["/use-cases/master-apprentice-skills-transfer/", GraduationCap, "chef-fire"], ["/see-it/", UserPlus, "brewery"], ["/sektor/franchise/", Storefront, "huddle"]];
/* A loop for each case on the large panel (poster first, video once in view). */
const CASE_VIDEO = ["warehouse2", "line", "plating", "steam", "coffee", "kitchen"];
export function Cases5() {
  const { d } = useLocale(); const c = d.cases; const [on, setOn] = useState(0); const reduce = useReducedMotion();
  const Overlay = ({ k, big }: { k: number; big?: boolean }) => { const [tag, h, p] = c.items[k]; const [href, I] = CASE_META[k]; return (
    <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(255_255_255/0.14)] py-1.5 pe-3 ps-2 text-[12px] font-medium backdrop-blur"><I size={14} />{tag}</span>
      <h3 className={`mt-4 max-w-[22ch] font-semibold leading-[1.15] tracking-[-0.02em] ${big ? "text-[clamp(24px,1rem+1.2vw,34px)]" : "text-[22px]"}`}>{h}</h3>
      <p className={`mt-3 max-w-[40rem] leading-[1.55] text-white/80 ${big ? "text-[16px]" : "text-[15px]"}`}>{p}</p>
      <Link href={href} className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white pe-2 ps-5 text-[14px] font-semibold text-[#111]">{c.more}<span className="grid h-7 w-7 place-items-center rounded-full bg-[#111] text-white"><ArrowRight size={13} aria-hidden="true" className="rtl:-scale-x-100" /></span></Link>
    </div>); };
  const shade = <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_30%,rgb(17_17_17/0.55)_58%,rgb(17_17_17/0.92)_100%)]" />;
  return (
    <section id="use-cases" aria-labelledby="uc-h" className="section-y pt-0">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-5">
          <div className="col-span-12 lg:col-span-7"><Label icon={BookOpen}>{c.k}</Label><H2 id="uc-h" className="max-w-[18ch]">{c.h}</H2></div>
          <p className="col-span-12 max-w-[34rem] text-[17px] leading-[1.55] text-ink-muted lg:col-span-5">{c.lead}</p>
        </div>

        {/* Desktop: a list of cases on one side, the chosen one large on the other. */}
        <div className="mt-12 hidden gap-4 lg:grid lg:grid-cols-12">
          <ul className="space-y-1.5 lg:col-span-5" role="tablist" aria-label={c.k}>
            {c.items.map(([tag, h], k) => { const I = CASE_META[k][1]; const act = on === k; return (
              <li key={h}>
                <button type="button" role="tab" aria-selected={act} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)} onClick={() => setOn(k)}
                  className={`flex w-full items-center gap-4 rounded-[20px] p-3 pe-5 text-start transition-colors duration-300 ${act ? "bg-[var(--card)]" : "hover:bg-[var(--card)]/50"}`}>
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[14px]"><img src={`/video/${CASE_VIDEO[k]}.webp`} alt="" loading="lazy" className={`h-full w-full object-cover transition-opacity ${act ? "" : "opacity-70"}`} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[12px] text-ink-faint"><I size={13} />{tag}</span>
                    <span className={`mt-0.5 block text-[16px] font-semibold leading-snug tracking-[-0.01em] ${act ? "text-ink" : "text-ink-muted"}`}>{h}</span>
                  </span>
                  <ArrowRight size={15} aria-hidden="true" className={`shrink-0 transition-all duration-300 rtl:-scale-x-100 ${act ? "text-ink" : "-translate-x-1 text-transparent"}`} />
                </button>
              </li>); })}
          </ul>
          <div className="dark relative min-h-[560px] overflow-hidden rounded-[32px] bg-[#1a1816] lg:col-span-7" role="tabpanel">
            <AnimatePresence initial={false}>
              <m.div key={on} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}>
                <img src={`/video/${CASE_VIDEO[on]}.webp`} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <SmartVideo name={CASE_VIDEO[on]} poster={`/video/${CASE_VIDEO[on]}.webp`} threshold={0.3} className="absolute inset-0 h-full w-full object-cover" />
                {shade}<Overlay k={on} big />
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Phone and tablet: swipeable photo cards. */}
        <ul className="no-sb -mx-[var(--pad-x)] mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--pad-x)] pb-1 lg:hidden">
          {c.items.map(([tag, h, p], k) => { const [href, I, img] = CASE_META[k]; return (
            <li key={h} className={`${card} flex w-[84%] shrink-0 snap-start flex-col p-2 sm:w-[58%]`}>
              <span className="dark relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-[#1a1816]">
                <Pic n={img} sizes="84vw" className="h-full w-full object-cover" />
                <span className="absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[rgb(17_17_17/0.65)] py-1.5 pe-3 ps-2 text-[12px] font-medium text-white backdrop-blur"><I size={14} />{tag}</span>
              </span>
              <span className="flex flex-1 flex-col px-3 pb-3 pt-4">
                <h3 className="text-[19px] font-semibold leading-[1.25] tracking-[-.015em]">{h}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{p}</p>
                <Link href={href} className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-semibold">{c.more}<ArrowRight size={13} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
              </span>
            </li>); })}
        </ul>
      </div>
    </section>);
}

/* ---------- 14. Pricing preview (yearly by default) ---------- */
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
export function PlanCard({ id, yearly, full = false }: { id: string; yearly: boolean; full?: boolean }) {
  const { d } = useLocale(); const c = d.pricing; const p = PLANS.find((x) => x.id === id)!; const rec = !!p.featured; const I = PLAN_IC[id];
  const [name, forWho] = c.plans[id as keyof typeof c.plans]; const pr = yearly ? p.yearly : p.monthly; const save = yearly ? savePct(p) : null;
  const users: Record<string, string> = { free: "3", pro: "10", proplus: "30" };
  const pts = full ? d.pricingPage.points[id as keyof typeof d.pricingPage.points] : c.feats[id as keyof typeof c.feats];
  const prev = { pro: "free", proplus: "pro", enterprise: "proplus" }[id as "pro"] as keyof typeof c.plans | undefined;
  const checkout = (yearly ? (p as { checkoutYearly?: string | null }).checkoutYearly : p.checkout) ?? null;
  const reduce = useReducedMotion();
  return (
    <li className={`relative flex flex-col rounded-[28px] p-6 md:p-7 ${rec ? "bg-ink text-bg" : "bg-[var(--card)]"}`}>
      <div className="flex items-center justify-between gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-[14px] ${rec ? "bg-bg/10" : "bg-[var(--card-2)]"}`}><I size={20} /></span>
        {rec && <span className="rounded-full bg-bg/10 px-3 py-1 text-[12px] font-semibold">{c.recommended}</span>}
      </div>
      <h3 className="mt-6 text-[20px] font-semibold">{name}</h3>
      <p className={`mt-1 min-h-[2.6rem] text-[14px] leading-snug ${rec ? "text-bg/70" : "text-ink-muted"}`}>{forWho}</p>
      <div className="mt-6 min-h-[5.5rem]">
        {pr ? <>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <AnimatePresence mode="popLayout" initial={false}><m.span key={pr.now} className="text-[40px] font-bold leading-none tracking-[-.03em]" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>{pr.now}</m.span></AnimatePresence>
            <span className={`text-[14px] ${rec ? "text-bg/70" : "text-ink-muted"}`}>{c.perMo}</span>
            {save && <span className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${rec ? "bg-bg/10" : "bg-[var(--card-2)] text-ink-muted"}`}>{fmt(c.save, { pct: save })}</span>}
          </div>
          <p className={`mt-2 text-[13px] ${rec ? "text-bg/70" : "text-ink-faint"}`}>{id === "free" ? c.free : yearly ? c.yrNote : c.moNote}</p>
        </> : <><p className="text-[34px] font-bold leading-none tracking-[-.03em]">{c.contact}</p><p className={`mt-2 text-[13px] ${rec ? "text-bg/70" : "text-ink-faint"}`}>{c.custom}</p></>}
      </div>
      {id === "enterprise"
        ? <a href={SITE.demo} className={`btn mt-6 w-full ${rec ? "bg-bg text-ink" : "btn-secondary"}`}>{c.talk}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>
        : <a href={checkout ?? "/pricing/"} className={`btn mt-6 w-full ${rec ? "bg-bg text-ink hover:opacity-90" : "btn-secondary"}`}>{id === "free" ? c.start : c.choose}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></a>}
      <div className={`mt-6 flex-1 rounded-[20px] p-4 ${rec ? "bg-bg/[.08]" : "bg-[var(--card-2)]"}`}>
        <p className="flex items-center gap-2 text-[14px] font-semibold"><Users size={16} aria-hidden="true" />{id === "enterprise" ? c.enterpriseUsers : fmt(c.users, { n: users[id] })}</p>
        {full && prev && <p className={`mt-3 text-[13px] ${rec ? "text-bg/70" : "text-ink-faint"}`}>{fmt(c.plus, { plan: c.plans[prev][0] })}</p>}
        <ul className="mt-3 space-y-2 text-[14px]">{pts.map((f) => <li key={f} className={`flex items-start gap-2.5 ${rec ? "text-bg/85" : "text-ink-muted"}`}><Check size={15} aria-hidden="true" className="mt-0.5 shrink-0" />{f}</li>)}</ul>
      </div>
    </li>);
}
export function Pricing5() {
  const { d } = useLocale(); const c = d.pricing; const [yearly, setYearly] = useState(true);
  return (
    <section id="pricing" aria-labelledby="pp-h" className="section-y pt-0">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><Label icon={Tag}>{c.k}</Label><H2 id="pp-h" className="max-w-[16ch]">{c.h}</H2><p className="mt-4 text-[17px] text-ink-muted">{c.lead}</p></div>
          <BillingSwitch yearly={yearly} setYearly={setYearly} id="pp" />
        </div>
        <ul className="no-sb -mx-[var(--pad-x)] mt-12 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-[var(--pad-x)] py-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4 [&>li]:w-[84%] [&>li]:shrink-0 [&>li]:snap-start sm:[&>li]:w-auto">
          {PLANS.map((p) => <PlanCard key={p.id} id={p.id} yearly={yearly} />)}
        </ul>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[14px] text-ink-faint">
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2"><span className="flex items-center gap-1.5"><LockSimple size={15} />{c.secure}</span><span className="flex items-center gap-1.5"><CheckCircle size={15} />{c.cancel}</span><span>{c.appNote}</span></span>
          <Link href="/pricing/" className="inline-flex items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">{c.all}<ArrowRight size={13} aria-hidden="true" className="rtl:-scale-x-100" /></Link>
        </div>
      </div>
    </section>);
}

/* ---------- 15. FAQ ---------- */
export function Faq5() {
  const { d } = useLocale(); const c = d.faq; const [open, setOpen] = useState<number | null>(0); const reduce = useReducedMotion();
  return (
    <section id="faq" aria-labelledby="faq-h" className="section-y pt-0">
      <div className="container-x grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <Label icon={Question}>{c.k}</Label><H2 id="faq-h">{c.h}</H2>
          <div className={`${card} mt-10 hidden max-w-[22rem] p-6 lg:block`}>
            <p className="text-[18px] font-semibold tracking-[-.01em]">{c.more}</p><p className="mt-2 text-[15px] text-ink-muted">{c.moreP}</p>
            <a href={SITE.demo} className="btn btn-primary mt-5">{d.end.cta}</a>
            <p className="mt-4 text-[13px] text-ink-faint"><a href="mailto:support@flexlore.com" className="hover:text-ink">{c.email}</a></p>
          </div>
        </div>
        <ul className="col-span-12 space-y-2 lg:col-span-7 lg:col-start-6">
          {c.items.map(([q, a], i) => { const on = open === i; return (
            <li key={q} className={`rounded-[20px] transition-colors duration-300 ${on ? "bg-[var(--card)]" : "hover:bg-[var(--card)]/60"}`}>
              <h3><button type="button" id={`faq-q-${i}`} aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 px-5 py-4 text-start text-[18px] font-semibold tracking-[-.01em] md:px-6">
                <span className={on ? "text-ink" : "text-ink/85"}>{q}</span>
                <m.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.3, ease: EASE }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--card-2)] text-ink-muted"><Plus size={15} aria-hidden="true" /></m.span>
              </button></h3>
              <AnimatePresence initial={false}>{on && (
                <m.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.35, ease: EASE }} className="overflow-hidden">
                  <p className="measure px-5 pb-6 text-[16px] leading-[1.6] text-ink-muted md:px-6">{a}</p></m.div>)}</AnimatePresence>
            </li>); })}
        </ul>
      </div>
    </section>);
}

/* ---------- 16. Closing ---------- */
export function End5() {
  const { d } = useLocale(); const c = d.end;
  return (
    <section aria-labelledby="end-h" className="pb-[var(--section-y)]">
      <div className="container-x">
        <div className={`${card} grid-12 items-center gap-y-10 px-6 py-12 sm:px-10 md:py-16 lg:px-16`}>
          <div className="col-span-12 lg:col-span-5">
            <H2 id="end-h" className="!mt-0 max-w-[12ch]">{c.h}</H2>
            <p className="mt-5 max-w-[26rem] text-[17px] leading-[1.55] text-ink-muted">{c.p}</p>
            <a href={SITE.demo} className="btn btn-primary mt-8 h-12 px-6 text-[16px]">{c.cta}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></a>
          </div>
          <div className="col-span-12 lg:col-span-7"><CtaDuoLazy /></div>
        </div>
      </div>
    </section>);
}
const CtaDuoInner = dynamic(() => import("./CtaDuo").then((x) => x.CtaDuo), { ssr: false, loading: () => <div className="aspect-[2752/1536] w-full" /> });
function CtaDuoLazy() { const { lang } = useLocale(); return <div dir="ltr"><CtaDuoInner lang={lang} /></div>; }

/** Everything below the process section, in page order. */
export default function Below() {
  return (<><Compare5 /><Process5 /><Caps5 /><Bento5 /><Roles5 /><Workspace5 /><Web5 /><AI5 /><Statement5 /><Industries5 /><Cases5 /><Pricing5 /><Faq5 /><End5 /></>);
}
