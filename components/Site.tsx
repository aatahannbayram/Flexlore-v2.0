"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, animate } from "framer-motion";
import { Video, Sparkles, Gauge, BookX, Users, EyeOff, Languages, UtensilsCrossed, Factory, BedDouble, Store, Code2, BarChart3, QrCode, Palette, ArrowRight, Apple, Check } from "lucide-react";
import { copy, Lang } from "./copy";

const APP = "https://apps.apple.com/app/flexlore/id6751126206";
const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 40, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay: d, ease }}>{children}</motion.div>;
}
function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-flame">{children}</p>;
}
function Counter({ to, suffix = "%" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true }); const [v, setV] = useState(0);
  useEffect(() => { if (inView) { const c = animate(0, to, { duration: 1.8, ease, onUpdate: (x) => setV(Math.round(x)) }); return () => c.stop(); } }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Hero({ t }: { t: (typeof copy)[Lang] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]); const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 20 });
  return (
    <section ref={ref} onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div className="absolute -top-40 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-flame/25 blur-[140px]" animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }} transition={{ duration: 9, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-[120px]" animate={{ x: [0, -60, 0] }} transition={{ duration: 14, repeat: Infinity }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_1fr]">
        <motion.div style={{ y, opacity: op }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/80"><Sparkles className="h-3.5 w-3.5 text-flame" />{t.eyebrow}</motion.p>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {[t.h1a, t.h1b].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-2"><motion.span className={`block ${i ? "text-gradient" : ""}`} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.15 + i * 0.15, ease }}>{line}</motion.span></span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">{t.sub}</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
            <a href={APP} className="group inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3.5 font-semibold text-ink shadow-[0_0_40px_-5px] shadow-flame/60 transition hover:bg-ember"><Apple className="h-5 w-5" />{t.cta}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
            <a href="#how" className="glass inline-flex items-center rounded-full px-6 py-3.5 font-medium text-white/90 transition hover:bg-white/10">{t.demo}</a>
          </motion.div>
        </motion.div>
        <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3, ease }} className="relative mx-auto h-[540px] w-full max-w-[460px]">
          <motion.div className="absolute left-0 top-10 w-[46%] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl" animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity }}><Image src="/brand/app4.png" alt="Flexlore video SOP step on mobile" width={780} height={1640} priority /></motion.div>
          <motion.div className="absolute right-0 top-0 z-10 w-[52%] overflow-hidden rounded-[2.2rem] border border-white/15 shadow-[0_40px_120px_-20px] shadow-flame/40" animate={{ y: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity }}><Image src="/brand/app3.png" alt="Flexlore video editor with AI-detected steps" width={780} height={1640} priority /></motion.div>
          <motion.div className="glass absolute bottom-6 left-6 z-20 w-60 rounded-2xl p-4" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
            <div className="mb-2 flex items-center justify-between text-xs text-white/60"><span>Line 2 · Morning shift</span><Gauge className="h-4 w-4 text-flame" /></div>
            <div className="font-display text-3xl font-semibold"><Counter to={86} /></div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-gradient-to-r from-flame to-ember" initial={{ width: 0 }} animate={{ width: "86%" }} transition={{ delay: 1.5, duration: 1.6, ease }} /></div>
            <p className="mt-2 text-[11px] text-white/45">Illustrative data</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Problem({ t }: { t: (typeof copy)[Lang] }) {
  const icons = [BookX, Users, EyeOff];
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
      <Reveal><Kicker>{t.probK}</Kicker><h2 className="max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">{t.probT}</h2></Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {t.probs.map(([h, p], i) => { const I = icons[i]; return (
          <Reveal key={h} d={i * 0.1}><div className="glass group h-full rounded-3xl p-8 transition hover:-translate-y-1 hover:border-flame/40"><I className="mb-6 h-7 w-7 text-flame" /><h3 className="text-xl font-semibold">{h}</h3><p className="mt-2 text-white/55">{p}</p></div></Reveal>); })}
      </div>
    </section>
  );
}

function How({ t }: { t: (typeof copy)[Lang] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const line = useTransform(scrollYProgress, [0.15, 0.6], ["0%", "100%"]);
  const icons = [Video, Sparkles, Gauge]; const shots = ["/brand/app3.png", "/brand/app2.png", "/brand/app1.png"];
  return (
    <section id="how" ref={ref} className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28">
      <Reveal className="text-center"><Kicker>{t.howK}</Kicker><h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{t.howT}</h2></Reveal>
      <div className="relative mt-20">
        <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-white/10 md:block"><motion.div style={{ width: line }} className="h-full bg-gradient-to-r from-flame to-ember shadow-[0_0_20px] shadow-flame" /></div>
        <div className="grid gap-12 md:grid-cols-3">
          {t.steps.map(([h, p], i) => { const I = icons[i]; return (
            <Reveal key={h} d={i * 0.15} className="relative">
              <div className="relative z-10 mx-auto mb-8 grid h-[6.5rem] w-[6.5rem] place-items-center rounded-full border border-flame/30 bg-ink shadow-[0_0_60px_-10px] shadow-flame/50"><I className="h-9 w-9 text-flame" /><span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-flame text-xs font-bold text-ink">{i + 1}</span></div>
              <h3 className="text-center text-2xl font-semibold">{h}</h3><p className="mx-auto mt-3 max-w-xs text-center text-white/55">{p}</p>
              <div className="mx-auto mt-8 w-40 overflow-hidden rounded-[1.6rem] border border-white/10 opacity-90"><Image src={shots[i]} alt="" width={390} height={820} /></div>
            </Reveal>); })}
        </div>
      </div>
    </section>
  );
}

function Dashboard({ t }: { t: (typeof copy)[Lang] }) {
  const rows = [["Kadıköy · Kitchen", 92], ["Line 2 · Assembly", 78], ["Front desk · Night", 64], ["Bakery · Opening", 88], ["Warehouse · Picking", 51]] as const;
  return (
    <section id="readiness" className="relative scroll-mt-24 overflow-hidden py-28">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.3fr]">
        <Reveal><Kicker>{t.dashK}</Kicker><h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{t.dashT}</h2><p className="mt-6 text-lg text-white/60">{t.dashS}</p></Reveal>
        <Reveal d={0.15}>
          <div className="glass rounded-3xl p-6 shadow-2xl sm:p-8" role="img" aria-label="Illustrative readiness dashboard by team">
            <div className="mb-6 flex items-center justify-between"><div><p className="text-sm text-white/50">Readiness · this week</p><p className="font-display text-4xl font-semibold"><Counter to={76} /></p></div>
              <div className="flex gap-2 text-xs">{["EN", "TR", "AR", "DE"].map((l, i) => <span key={l} className={`rounded-full px-3 py-1 ${i === 0 ? "bg-flame text-ink" : "bg-white/5 text-white/60"}`}>{l}</span>)}</div></div>
            <div className="space-y-4">
              {rows.map(([n, v], i) => (
                <div key={n}><div className="mb-1.5 flex justify-between text-sm"><span className="text-white/80">{n}</span><span className={v < 60 ? "text-amber-300" : "text-white/60"}>{v}%</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5"><motion.div className={`h-full rounded-full ${v < 60 ? "bg-amber-400" : "bg-gradient-to-r from-flame to-ember"}`} initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease }} /></div></div>))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-white/50">
              {[["Videos", 24], ["Quizzes", 61], ["Re-assigned", 7]].map(([k, v]) => <div key={k} className="rounded-xl bg-white/[.03] p-3"><p className="font-display text-xl text-white"><Counter to={v as number} suffix="" /></p>{k}</div>)}
            </div>
            <p className="mt-4 text-right text-[11px] text-white/35">Illustrative data — not a customer</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Multilingual({ t }: { t: (typeof copy)[Lang] }) {
  const subs = ["Hold the dough with both hands and stretch from the centre.", "Hamuru iki elinizle tutun ve ortadan dışa doğru açın.", "Halten Sie den Teig mit beiden Händen und ziehen Sie ihn von der Mitte aus.", "Sostenga la masa con ambas manos y estírela desde el centro."];
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((x) => (x + 1) % subs.length), 2600); return () => clearInterval(id); }, [subs.length]);
  return (
    <section id="languages" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <Image src="/brand/restaurant.png" alt="Restaurant team during service" width={1000} height={667} className="h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6"><div className="mb-3 flex items-center gap-2 text-xs text-white/60"><Languages className="h-4 w-4 text-flame" />Step 3 / 7 · auto-subtitled</div>
              <motion.p key={i} initial={{ opacity: 0, y: 12, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.6 }} className="rounded-xl bg-black/60 px-4 py-3 text-lg backdrop-blur" aria-live="polite">{subs[i]}</motion.p></div>
          </div>
        </Reveal>
        <Reveal className="order-1 lg:order-2"><Kicker>{t.langK}</Kicker><h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{t.langT}</h2><p className="mt-6 text-lg text-white/60">{t.langS}</p>
          <ul className="mt-8 space-y-3 text-white/75">{["Transcription → steps", "Glossary + approval flow", "WebVTT subtitles", "Readiness per language"].map((x) => <li key={x} className="flex items-center gap-3"><Check className="h-4 w-4 text-flame" />{x}</li>)}</ul></Reveal>
      </div>
    </section>
  );
}

function Sectors({ t }: { t: (typeof copy)[Lang] }) {
  const items = [[UtensilsCrossed, "/brand/brewery.png"], [Factory, "/brand/mfg.png"], [BedDouble, "/brand/office.png"], [Store, "/brand/field.png"]] as const;
  return (
    <section id="sectors" className="scroll-mt-24 py-28">
      <Reveal className="mx-auto max-w-7xl px-6"><Kicker>{t.secK}</Kicker><h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{t.secT}</h2></Reveal>
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([I, src], i) => (
          <Reveal key={src} d={i * 0.08}><div className="group relative h-80 overflow-hidden rounded-3xl border border-white/10">
            <Image src={src} alt="" fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover transition duration-[1.2s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-flame/90 text-ink"><I className="h-5 w-5" /></span><span className="text-xl font-semibold">{t.sectors[i]}</span></div>
          </div></Reveal>))}
      </div>
      <div className="mt-16 overflow-hidden border-y border-white/5 py-6" aria-hidden><div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-3xl text-white/15">
        {Array.from({ length: 2 }).flatMap((_, k) => ["Opening checklist", "Food safety", "Machine changeover", "Room turnover", "Allergen handling", "Line safety", "Cash close", "Quality check"].map((s) => <span key={k + s}>{s} ✦</span>))}</div></div>
    </section>
  );
}

function Integrations({ t }: { t: (typeof copy)[Lang] }) {
  const icons = [Code2, BarChart3, QrCode, Palette];
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal className="text-center"><Kicker>{t.intK}</Kicker><h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{t.intT}</h2></Reveal>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.ints.map(([h, p], i) => { const I = icons[i]; return (
          <Reveal key={h} d={i * 0.08}><div className="glass h-full rounded-3xl p-7 transition hover:border-flame/40"><I className="mb-5 h-6 w-6 text-flame" /><h3 className="font-semibold">{h}</h3><p className="mt-2 text-sm text-white/55">{p}</p></div></Reveal>); })}
      </div>
      <Reveal d={0.2}><pre className="glass mx-auto mt-10 max-w-2xl overflow-x-auto rounded-2xl p-5 text-sm text-white/70" aria-label="Example API response"><code>{`GET /v1/readiness?site=all&lang=tr
{ "team": "Kitchen", "readiness": 0.92, "updated": "…" }`}</code></pre></Reveal>
    </section>
  );
}

function Final({ t }: { t: (typeof copy)[Lang] }) {
  return (
    <section className="relative overflow-hidden px-6 py-36 text-center">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,26,.25),transparent_60%)]" />
      <Reveal className="relative">
        <Image src="/brand/mark.png" alt="" width={72} height={72} className="mx-auto mb-8 rounded-2xl" />
        <h2 className="mx-auto max-w-3xl font-display text-5xl font-semibold tracking-tight sm:text-6xl"><span className="text-gradient">{t.endT}</span></h2>
        <p className="mt-6 text-lg text-white/60">{t.endS}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4"><a href={APP} className="inline-flex items-center gap-2 rounded-full bg-flame px-7 py-4 font-semibold text-ink transition hover:bg-ember"><Apple className="h-5 w-5" />{t.cta}</a><a href="mailto:hello@flexlore.com" className="glass rounded-full px-7 py-4 font-medium">{t.demo}</a></div>
      </Reveal>
    </section>
  );
}

export default function Site() {
  const [lang, setLang] = useState<Lang>("en"); const t = copy[lang];
  const { scrollYProgress } = useScroll(); const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ lerp: 0.09 }); let r = 0; const f = (time: number) => { l.raf(time); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f);
    return () => { cancelAnimationFrame(r); l.destroy(); };
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const ids = ["how", "readiness", "languages", "sectors"];
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-flame focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>
      <motion.div style={{ scaleX: bar }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-flame" />
      <header className="fixed inset-x-0 top-0 z-50"><nav className="glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-5 py-3 sm:mx-6 lg:mx-auto" aria-label="Main">
        <a href="#" aria-label="Flexlore home"><Image src="/brand/logo.png" alt="Flexlore" width={120} height={26} priority /></a>
        <ul className="hidden gap-7 text-sm text-white/65 md:flex">{t.nav.map((n, i) => <li key={n}><a href={`#${ids[i]}`} className="transition hover:text-white">{n}</a></li>)}</ul>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-white/5 p-0.5 text-xs" role="group" aria-label="Language">{(["en", "tr"] as const).map((l) => <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-2.5 py-1 uppercase transition ${lang === l ? "bg-white text-ink" : "text-white/60"}`}>{l}</button>)}</div>
          <a href={APP} className="hidden rounded-full bg-flame px-4 py-2 text-sm font-semibold text-ink sm:inline-block">{t.cta}</a>
        </div>
      </nav></header>
      <main id="main"><Hero t={t} /><Problem t={t} /><How t={t} /><Dashboard t={t} /><Multilingual t={t} /><Sectors t={t} /><Integrations t={t} /><Final t={t} /></main>
      <footer className="border-t border-white/5 px-6 py-10 text-center text-sm text-white/40">© {new Date().getFullYear()} Flexlore · {t.foot}</footer>
    </>
  );
}
