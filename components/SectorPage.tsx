"use client";
/* Sector page (v4, warm premium like the home page). One story in five numbered chapters, more motion, less text:
 * hero video → 01 the problem (two cards) → 02 real tasks (pick a task, its steps check off one by one on a photo)
 * → 03 how Flexlore solves it (three cards with live progress) → 04 a sample quiz (tap an answer) → 05 a sample
 * rollout (timeline that draws in) → closing card → next sector. Content: components/sectors.ts (English). */
import { SITE } from "./config";
import { useEffect, useRef, useState } from "react";
import { Footer } from "./Sections";
import Link from "next/link";
import { m, LazyMotion, domAnimation, useScroll, useTransform, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
import { sectors } from "./sectors";
import { Video } from "./Site";
import { Header } from "./Header";
import { FilmSlate, Sparkle, ChartLineUp, CheckCircle, WarningCircle, ArrowRight } from "./ui/icons";
import { Chev } from "./v3/Chevron";
import { PhotoBand, glassTile } from "./ui/PhotoBand";

/* Two photo bands per sector (03 and the closing card), none shared with the sector's own hero video or task still. */
const SECTOR_BANDS: Record<string, [string, string]> = {
  restoran: ["problem-vardiya", "hero-sef"], uretim: ["safety", "phone-mount"], otel: ["restaurant", "/video/hotel2.jpg"],
  franchise: ["cafe-opening", "brewery"], depo: ["qr-scan", "saha-liman"], firin: ["problem-kagitlar", "/video/coffee.jpg"],
};

const ease = [0.22, 1, 0.36, 1] as const;
const Rise = ({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) => {
  const reduce = useReducedMotion();
  return <m.div initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.8, delay: d, ease }} className={className}>{children}</m.div>;
};
const Ch = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-3"><span className="text-[13px] font-semibold tabular-nums text-ink">{n}</span><span aria-hidden="true" className="h-px w-8 bg-[rgb(255_255_255/0.2)]" />
    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{children}</p></div>);
function H2({ text, className = "" }: { text: string; className?: string }) {
  const reduce = useReducedMotion(); const w = text.split(" ");
  if (reduce) return <h2 className={`v4-h2 mt-4 ${className}`}>{text}</h2>;
  return (
    <m.h2 aria-label={text} className={`v4-h2 mt-4 ${className}`} initial="h" whileInView="s" viewport={{ once: true, amount: 0.6 }} transition={{ staggerChildren: 0.045 }}>
      {w.map((x, k) => <span key={k} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom"><m.span className="inline-block" variants={{ h: { y: "105%" }, s: { y: 0 } }} transition={{ duration: 0.7, ease }}>{x}</m.span></span>)
        .flatMap((el, k) => (k ? [" ", el] : [el]))}
    </m.h2>);
}
const card = "rounded-[24px] bg-[var(--card)]";

export default function SectorPage({ i }: { i: number }) {
  const s = sectors[i]; const next = sectors[(i + 1) % sectors.length];
  const reduce = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const vs = useTransform(p, [0, 1], [1, 1.12]); const ty = useTransform(p, [0, 1], ["0%", "24%"]);
  const [pick, setPick] = useState<number | null>(null);
  const [sop, setSop] = useState(0);
  /* Steps of the picked task check off one by one while the panel is in view. */
  const stage = useRef<HTMLDivElement>(null); const live = useInView(stage, { amount: 0.4 });
  const [done, setDone] = useState(0);
  useEffect(() => { setDone(0); }, [sop]);
  useEffect(() => { if (!live || reduce) { if (reduce) setDone(s.sops[sop].steps.length); return; }
    const t = window.setTimeout(() => setDone((x) => (x >= s.sops[sop].steps.length ? 0 : x + 1)), done >= s.sops[sop].steps.length ? 2200 : 900);
    return () => window.clearTimeout(t); }, [live, reduce, done, sop, s.sops]);
  const tl = useRef<HTMLOListElement>(null); const tlOn = useInView(tl, { amount: 0.5, once: true });
  const HOW_IC = [FilmSlate, Sparkle, ChartLineUp];
  const [howImg, endImg] = SECTOR_BANDS[s.slug] ?? ["huddle", "office"];
  return (
    <LazyMotion features={domAnimation}>
      <Header />
      <main id="main" lang="en">
        <section ref={hero} className="dark relative h-svh min-h-[560px] overflow-hidden">
          <m.div style={{ scale: reduce ? 1 : vs }} className="absolute inset-0"><Video name={s.v} eager /></m.div>
          <div className="absolute inset-0 bg-[rgb(16_16_16/0.4)]" />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-[linear-gradient(0deg,#111111_0%,rgb(16_16_16/0.75)_45%,transparent_100%)]" />
          <m.div style={{ y: reduce ? 0 : ty }} className="container-x relative flex h-full flex-col justify-end pb-[9vh]">
            <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70">
              <span className="tabular-nums text-white">{s.idx}</span><span aria-hidden="true" className="h-px w-8 bg-white/30" />{s.kicker}</m.p>
            <h1 className="mt-5 max-w-[14ch] text-[clamp(44px,7vw,96px)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
              {s.h.split(" ").map((w, k) => <span key={k} className="inline-block overflow-hidden pb-[.08em] align-bottom"><m.span initial={reduce ? false : { y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.3 + k * 0.07, duration: 0.9, ease }} className="inline-block">{w}</m.span></span>)
                .flatMap((el, k) => (k ? [" ", el] : [el]))}
            </h1>
            <m.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8, ease }} className="mt-6 max-w-[38rem] text-[17px] leading-[1.5] text-white/80 md:text-[19px]">{s.lede}</m.p>
            <m.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.7, ease }} className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.demo} className="btn btn-accent group h-11 px-5 text-[15px]">Book a demo<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a>
              <a href="#tasks" className="btn h-11 rounded-full bg-white/10 px-5 text-[15px] font-semibold text-white backdrop-blur-md hover:bg-white/15">See the tasks</a>
            </m.div>
          </m.div>
        </section>

        {/* 01 The problem */}
        <section className="section-y">
          <div className="container-x grid-12 items-end gap-y-8">
            <div className="col-span-12 lg:col-span-6"><Ch n="01">The problem</Ch><H2 text={s.problem.h} className="max-w-[16ch]" /></div>
            <div className="col-span-12 grid gap-3 sm:grid-cols-2 lg:col-span-6">
              {s.problem.p.map((x, k) => (
                <Rise key={k} d={k * 0.1} className={`${card} p-5 md:p-6`}>
                  <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-white/[.06] text-ink"><WarningCircle size={19} aria-hidden="true" /></span>
                  <p className="mt-4 text-[16px] leading-[1.5] text-ink-muted">{x}</p>
                </Rise>))}
            </div>
          </div>
        </section>

        {/* 02 Real tasks: pick one, its steps check off on the photo */}
        <section id="tasks" className="section-y pt-0">
          <div className="container-x">
            <Ch n="02">From the operator's eyes</Ch><H2 text="Real tasks. Step by step." className="max-w-[18ch]" />
            <div className="mt-8 grid gap-4 md:mt-12 lg:grid-cols-12 lg:gap-8">
              <div role="tablist" aria-label="Tasks" className="no-sb -mx-[var(--pad-x)] flex gap-2 overflow-x-auto px-[var(--pad-x)] lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
                {s.sops.map((o, k) => { const act = sop === k; return (
                  <button key={o.t} type="button" role="tab" aria-selected={act} onClick={() => setSop(k)}
                    className={`group relative flex min-h-14 shrink-0 items-center gap-4 overflow-hidden rounded-[16px] px-4 py-3 text-start transition-colors duration-300 lg:w-full ${act ? "bg-[var(--card-2)] text-ink" : "text-ink-muted hover:bg-[var(--card)] hover:text-ink"}`}>
                    <span className="text-[13px] font-semibold tabular-nums">{String(k + 1).padStart(2, "0")}</span>
                    <span className="whitespace-nowrap text-[16px] font-semibold tracking-[-0.01em] lg:whitespace-normal lg:text-[19px]">{o.t}</span>
                    {act && <m.span layoutId="sop-bar" aria-hidden="true" className="absolute inset-y-3 start-0 hidden w-[3px] rounded-full bg-ink lg:block" />}
                  </button>); })}
              </div>
              <div ref={stage} className="dark relative min-h-[420px] overflow-hidden rounded-[28px] bg-[#171717] lg:col-span-8 lg:min-h-[520px]">
                <img src={s.still} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${reduce ? "" : "kenburns-slow"}`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgb(16_16_16/0.15),rgb(16_16_16/0.85)_75%)]" />
                <AnimatePresence mode="wait" initial={false}>
                  <m.div key={sop} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }}
                    className="absolute inset-x-4 bottom-4 rounded-[20px] bg-[rgb(24_24_24/0.7)] p-4 text-white backdrop-blur-xl md:inset-x-auto md:bottom-6 md:end-6 md:w-[min(420px,60%)] md:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">Video SOP · {s.sops[sop].steps.length} steps</p>
                      <p className="text-[12px] tabular-nums text-white/60">{Math.min(done, s.sops[sop].steps.length)}/{s.sops[sop].steps.length}</p>
                    </div>
                    <h3 className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em]">{s.sops[sop].t}</h3>
                    <span className="mt-3 block h-1 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-ink transition-[width] duration-700" style={{ width: `${(100 * Math.min(done, s.sops[sop].steps.length)) / s.sops[sop].steps.length}%` }} /></span>
                    <ol className="mt-3 space-y-1.5">
                      {s.sops[sop].steps.map((st, k) => { const ok = k < done; return (
                        <li key={st} className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] transition-colors duration-500 ${ok ? "bg-white/[.1]" : "bg-white/[.04]"}`}>
                          <span className="w-9 shrink-0 text-[12px] tabular-nums text-white/55">0:{String(k * 12 + 8).padStart(2, "0")}</span>
                          <span className={`min-w-0 flex-1 transition-colors duration-500 ${ok ? "text-white" : "text-white/70"}`}>{st}</span>
                          <CheckCircle size={16} weight="fill" aria-hidden="true" className={`shrink-0 transition-all duration-500 ${ok ? "scale-100 text-white opacity-100" : "scale-50 opacity-0"}`} />
                        </li>); })}
                    </ol>
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* 03 How Flexlore solves it */}
        <section className="section-y pt-0">
          <div className="container-x"><PhotoBand img={howImg} className="p-5 sm:p-8 md:p-12">
            <Ch n="03">How Flexlore solves it</Ch><H2 text="Film once. Check it. Know who is ready." className="max-w-[20ch]" />
            <div className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3">
              {s.how.map((h, k) => { const Ic = HOW_IC[k] ?? Sparkle; return (
                <Rise key={h.k} d={k * 0.1} className={`${glassTile} group relative overflow-hidden p-6 md:p-7`}>
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#F4F0EB] text-[#111] transition-transform duration-500 group-hover:-rotate-6"><Ic size={20} aria-hidden="true" /></span>
                    <span className="text-[13px] font-semibold tabular-nums text-ink-faint">{String(k + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{h.k}</p>
                  <h3 className="mt-2 text-[22px] font-semibold leading-[1.15] tracking-[-0.025em]">{h.h}</h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-white/70">{h.p}</p>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ink transition-transform duration-700 group-hover:scale-x-100 rtl:origin-right" />
                </Rise>); })}
            </div>
          </PhotoBand></div>
        </section>

        {/* 04 Sample quiz */}
        <section className="section-y pt-0">
          <div className="container-x">
            <div className={`${card} grid-12 items-center gap-y-8 overflow-hidden p-5 sm:p-8 md:p-12`}>
              <div className="col-span-12 lg:col-span-6">
                <Ch n="04">Sample quiz</Ch><H2 text={s.quiz.q} className="max-w-[20ch]" />
                <p className="mt-4 text-[15px] text-ink-muted">Drafted from the video. Edited and approved by your team.</p>
              </div>
              <div className="col-span-12 space-y-2.5 lg:col-span-6">
                {s.quiz.a.map((a, k) => {
                  const right = k === s.quiz.ok; const st = pick === null ? "bg-[var(--card-2)] hover:bg-white/[.08]" : right ? "bg-[#F4F0EB] text-[#111]" : pick === k ? "bg-[var(--card-2)] text-ink-faint line-through" : "bg-[var(--card-2)] opacity-45";
                  return (
                    <m.button key={a} type="button" onClick={() => setPick(k)} whileTap={reduce ? undefined : { scale: 0.98 }} animate={pick === k && !right && !reduce ? { x: [0, -6, 6, -4, 0] } : { x: 0 }} transition={{ duration: 0.35 }}
                      className={`flex min-h-14 w-full items-center justify-between gap-4 rounded-[16px] px-5 py-4 text-start text-[16px] font-medium transition-colors duration-300 ${st}`}>
                      {a}<span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black/10 text-[12px] font-semibold">{pick !== null && right ? <CheckCircle size={16} weight="fill" /> : String.fromCharCode(65 + k)}</span>
                    </m.button>);
                })}
                <p className="min-h-6 px-1 text-[13px] text-ink-muted" aria-live="polite">{pick === null ? "Tap an answer" : pick === s.quiz.ok ? "Correct. Logged to readiness." : "Not quite. The clip replays this step."}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 05 Sample rollout: the line draws in, the points light up one after another */}
        <section className="section-y pt-0">
          <div className="container-x">
            <Ch n="05">A sample rollout</Ch><H2 text="From one phone to every shift." className="max-w-[18ch]" />
            <ol ref={tl} className="relative mt-10 grid gap-6 md:mt-14 md:grid-cols-4 md:gap-4">
              <span aria-hidden="true" className="absolute start-[7px] top-2 h-[calc(100%-16px)] w-px bg-[rgb(255_255_255/0.12)] md:start-0 md:top-[7px] md:h-px md:w-full" />
              <span aria-hidden="true" className="tl-line absolute start-[7px] top-2 h-[calc(100%-16px)] w-px origin-top bg-ink transition-transform duration-[1600ms] ease-out md:start-0 md:top-[7px] md:h-px md:w-full md:origin-left rtl:md:origin-right"
                style={{ transform: tlOn || reduce ? "none" : "var(--tl-off)" }} />
              {s.flow.map((f, k) => (
                <li key={k} className="relative ps-8 md:ps-0 md:pt-9">
                  <span aria-hidden="true" className={`absolute start-0 top-1 h-[15px] w-[15px] rounded-full ring-4 ring-[#111111] transition-colors duration-500 md:top-0 ${tlOn || reduce ? "bg-ink" : "bg-[#3a342e]"}`} style={{ transitionDelay: `${300 + k * 350}ms` }} />
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{f.when}</p>
                  <p className="mt-2 max-w-[22ch] text-[17px] font-medium leading-[1.4]">{f.what}</p>
                </li>))}
            </ol>
            <Rise><p className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--card)] px-4 py-2 text-[14px] text-ink-muted"><CheckCircle size={15} weight="fill" className="text-ink" aria-hidden="true" />{s.ready}</p></Rise>
          </div>
        </section>

        <section className="section-y pt-0">
          <div className="container-x">
            <PhotoBand img={endImg} className="grid-12 items-center gap-y-6 px-5 py-10 sm:px-10 md:py-20 lg:px-14">
              <div className="col-span-12 lg:col-span-8">
                <h2 className="v4-h2 max-w-[18ch]"><span className="t-ink">See it with one of</span> <span className="t-accent">your own tasks.</span></h2>
                <p className="mt-3 max-w-[34rem] text-[17px] leading-[1.55] text-white/75">Twenty minutes, one real job from your {s.en.toLowerCase()}. We build it with you on the call.</p>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:text-end"><a href={SITE.demo} className="btn btn-primary group h-11 px-5 text-[15px]">Book a demo<Chev dir="end" className="chev-go h-2.5 w-3.5" /></a></div>
            </PhotoBand>
          </div>
        </section>

        <Link href={`/sektor/${next.slug}/`} className="dark group relative flex h-[56svh] min-h-[380px] items-end overflow-hidden pb-12 md:pb-16">
          <div className="absolute inset-0 opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-75"><Video name={next.v} /></div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#111111_0%,rgb(16_16_16/0.55)_55%,transparent_100%)]" />
          <div className="container-x relative w-full">
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70"><span className="tabular-nums text-white">{next.idx}</span><span aria-hidden="true" className="h-px w-8 bg-white/30" />Next sector</p>
            <p className="mt-4 flex items-center gap-4 text-[clamp(40px,6vw,84px)] font-semibold leading-none tracking-[-0.04em] text-white transition-transform duration-500 group-hover:translate-x-3 rtl:group-hover:-translate-x-3">{next.en}
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition-colors group-hover:bg-white group-hover:text-[#111] md:h-16 md:w-16"><ArrowRight size={22} aria-hidden="true" className="rtl:-scale-x-100" /></span></p>
          </div>
        </Link>
      </main>
      <Footer />
    </LazyMotion>
  );
}
