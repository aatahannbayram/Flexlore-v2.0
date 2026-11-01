"use client";
import { useEffect, useRef, useState } from "react";
import { Footer } from "./Sections";
import Link from "next/link";
import { K } from "./Kinetic";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { sectors } from "./sectors";
import { Video } from "./Site";
const ease = [0.22, 1, 0.36, 1] as const;
const Rev = ({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, delay: d, ease }} className={className}>{children}</motion.div>);

export default function SectorPage({ i }: { i: number }) {
  const s = sectors[i]; const next = sectors[(i + 1) % sectors.length];
  const reduce = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const vs = useTransform(p, [0, 1], [1, 1.15]); const ty = useTransform(p, [0, 1], ["0%", "30%"]);
  const [pick, setPick] = useState<number | null>(null);
  const [sop, setSop] = useState(0);
  useEffect(() => { if (reduce) return; const l = new Lenis({ lerp: 0.075 }); let r = 0; const f = (x: number) => { l.raf(x); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => { cancelAnimationFrame(r); l.destroy(); }; }, [reduce]);
  return (
    <>
      <motion.div aria-hidden="true" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.9, ease }} className="pointer-events-none fixed inset-0 z-50 origin-top bg-flame" />
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/85 to-transparent pb-10 md:px-10">
        <Link href="/" className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.04em]"><img src="/brand/wordmark-light.png" alt="Flexlore" className="h-8 w-auto" /></Link>
        <nav aria-label="Sectors" className="mono hidden gap-5 text-[11px] uppercase tracking-[.18em] md:flex">
          {sectors.map((x) => <Link key={x.slug} href={`/sektor/${x.slug}/`} aria-current={x.slug === s.slug ? "page" : undefined} className={x.slug === s.slug ? "text-white" : "text-white/45 hover:text-white"}>{x.idx} {x.en.split(" ")[0]}</Link>)}
        </nav>
        <span className="flex gap-6 text-[13px]"><Link href="/blog/" className="link-u">Blog</Link><a href="https://app-eu1.hubspot.com/meetings/alper-kalip?troubleshoot=true&uuid=6feee1d8-83b2-400a-b3f2-929119a9047d" className="link-u">Book a demo</a></span>
      </header>
      <main id="main">
        <section ref={hero} className="relative h-svh overflow-hidden">
          <motion.div style={{ scale: vs }} className="absolute inset-0"><Video name={s.v} eager /></motion.div>
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/75 to-transparent" />
          <motion.div style={{ y: ty }} className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-[10vh] md:px-10">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mono text-[12px] uppercase tracking-[.18em] text-flame">{s.idx} / {s.kicker}</motion.p>
            <h1 className="display mt-5 max-w-[14ch] text-[clamp(3.2rem,9vw,9.5rem)] [text-shadow:0_4px_40px_rgba(0,0,0,.6)]">
              {s.h.split(" ").map((w, k) => <span key={k} className="inline-block overflow-hidden pb-[.08em] align-bottom"><motion.span initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.5 + k * 0.08, duration: 1, ease }} className="inline-block">{w}&nbsp;</motion.span></span>)}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease }} className="mt-8 max-w-2xl text-[clamp(1.1rem,1.6vw,1.45rem)] font-medium leading-snug text-white">{s.lede}</motion.p>
          </motion.div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-32 md:grid-cols-[1fr_1.3fr] md:px-10 md:py-44">
          <Rev><p className="eyebrow">The problem</p><h2 className="display mt-4 text-[clamp(2.6rem,5.5vw,5.2rem)]"><K text={s.problem.h} /></h2></Rev>
          <div className="space-y-6 self-end text-xl leading-snug text-white/75">{s.problem.p.map((x, k) => <Rev key={k} d={k * 0.1}><p>{x}</p></Rev>)}</div>
        </section>

        <section className="border-t border-white/10 px-6 py-32 md:px-10">
          <div className="mx-auto max-w-7xl">
            <Rev><p className="eyebrow">From the operator's eyes</p><h2 className="display mt-4 text-[clamp(2.6rem,5.5vw,5.2rem)]"><K text="Real tasks. Step by step." /></h2><p className="mt-6 max-w-xl text-lg leading-snug text-white/70">Each task is filmed from where the person doing it stands, then split into steps they can replay on their phone: for onboarding, for passing the master's know-how on, and for retraining the exact step behind a quality issue.</p></Rev>
            <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.2fr]">
              <ul className="border-t border-white/15">
                {s.sops.map((o, k) => (
                  <li key={o.t} className="border-b border-white/15">
                    <button onClick={() => setSop(k)} onMouseEnter={() => setSop(k)} aria-pressed={sop === k} className="group flex w-full items-baseline gap-4 py-5 text-left">
                      <span className="mono text-[12px] text-white/40">{String(k + 1).padStart(2, "0")}</span>
                      <span className={`text-[clamp(1.5rem,2.6vw,2.3rem)] font-semibold tracking-tight transition ${sop === k ? "text-white" : "text-white/40 group-hover:text-white/80"}`}>{o.t}</span>
                    </button>
                  </li>))}
              </ul>
              <div className="relative min-h-[22rem] overflow-hidden bg-neutral-950 p-8 ring-1 ring-white/10 md:p-10">
                <img src={s.still} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/50" />
                <motion.div key={sop} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="relative">
                  <p className="mono text-[11px] uppercase tracking-[.18em] text-flame">Video SOP · {s.sops[sop].steps.length} steps</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight">{s.sops[sop].t}</h3>
                  <ol className="mt-8 space-y-4">
                    {s.sops[sop].steps.map((st, k) => <li key={st} className="flex gap-4 border-t border-white/10 pt-4 text-lg"><span className="mono w-14 shrink-0 text-[12px] text-white/45">0:{String(k * 12 + 8).padStart(2, "0")}</span>{st}</li>)}
                  </ol>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-6 py-32 md:px-10">
          <div className="mx-auto max-w-7xl">
            <Rev><p className="eyebrow">How Flexlore solves it</p></Rev>
            <div className="mt-10 grid gap-8 border-t border-white/15 md:grid-cols-3">
              {s.how.map((h, k) => (
                <Rev key={h.k} d={k * 0.12} className="bg-black p-0 md:pr-10">
                  <div className="py-10 md:py-4"><p className="mono text-[12px] uppercase tracking-[.18em] text-white/45">0{k + 1} — {h.k}</p>
                    <h3 className="display mt-5 text-[clamp(2rem,3.2vw,3rem)]"><K text={h.h} /></h3>
                    <p className="mt-5 max-w-sm text-lg leading-snug text-white/70">{h.p}</p></div>
                </Rev>))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/10 px-6 py-32 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
            <Rev><p className="eyebrow">Sample quiz</p><h2 className="display mt-4 text-[clamp(2.4rem,4.5vw,4.4rem)]"><K text={s.quiz.q} /></h2><p className="mt-6 text-white/55">Drafted from the video. Edited and approved by your team.</p></Rev>
            <div className="space-y-3 self-end">
              {s.quiz.a.map((a, k) => {
                const st = pick === null ? "" : k === s.quiz.ok ? "border-flame bg-flame text-black" : pick === k ? "border-white/30 text-white/40 line-through" : "opacity-40";
                return <button key={a} onClick={() => setPick(k)} className={`flex w-full items-center justify-between border border-white/20 px-6 py-5 text-left text-lg transition duration-300 hover:border-white ${st}`}>{a}<span className="mono text-[12px]">{String.fromCharCode(65 + k)}</span></button>;
              })}
              <p className="mono h-5 text-[12px] uppercase tracking-[.18em] text-white/55" aria-live="polite">{pick === null ? "Tap an answer" : pick === s.quiz.ok ? "Correct. Logged to readiness." : "Not quite. The clip replays this step."}</p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-6 py-32 md:px-10">
          <div className="mx-auto max-w-7xl">
            <Rev><p className="eyebrow">A sample rollout</p><h2 className="display mt-4 text-[clamp(2.6rem,5.5vw,5.2rem)]"><K text="From one phone to every shift." /></h2></Rev>
            <ol className="mt-16 grid gap-8 border-t border-white/15 md:grid-cols-4">
              {s.flow.map((f, k) => (
                <Rev key={k} d={k * 0.1} className="bg-black">
                  <li className="list-none border-t-2 border-flame/0 py-8 md:pr-8"><span className="mono text-[12px] uppercase tracking-[.18em] text-flame">{f.when}</span><p className="mt-4 text-xl leading-snug">{f.what}</p></li>
                </Rev>))}
            </ol>
            <Rev><p className="mono mt-16 text-[12px] uppercase tracking-[.18em] text-white/50">Readiness view · {s.ready}</p></Rev>
          </div>
        </section>

        <Link href={`/sektor/${next.slug}/`} className="group relative flex h-[80svh] items-end overflow-hidden px-6 pb-16 md:px-10">
          <div className="absolute inset-0 opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-80"><Video name={next.v} /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="relative mx-auto w-full max-w-7xl"><p className="mono text-[12px] uppercase tracking-[.18em] text-flame">Next sector · {next.idx}</p>
            <p className="display mt-4 text-[clamp(3rem,10vw,10rem)] transition group-hover:translate-x-4">{next.en} →</p></div>
        </Link>
      </main>
      <Footer />
    </>
  );
}
