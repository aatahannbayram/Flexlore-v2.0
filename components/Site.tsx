"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { copy, Lang, C } from "./copy";
import Link from "next/link";
import { sectors } from "./sectors";
import { K } from "./Kinetic";
import { WebSection, Platforms } from "./WebApp";
import Programs from "./Programs";
import Cases from "./Cases";
import Copq from "./Copq";
import Imagine from "./Imagine";
import Security from "./Security";
import { AISection, Integrations, PricingTeaser, Footer } from "./Sections";
import { StoreButtons, Arr } from "./Icons";
import { SITE } from "./config";
import { Header } from "./Header";
import { Device, RecordScreen, SopScreen, QuizScreen, ReadyScreen } from "./AppScreens";

// Sayfadaki tüm döngülü videoları tek düğmeyle durdurur (WCAG 2.2.2). Sağlayıcı yoksa (ör. demo sayfaları) videolar oynar.
const VideoPause = createContext(false);

export function Video({ name, eager = false, className = "" }: { name: string; eager?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const paused = useContext(VideoPause);
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(eager);
  useEffect(() => {
    if (eager || reduce) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "60% 0px" });
    io.observe(el); return () => io.disconnect();
  }, [eager, reduce]);
  useEffect(() => { const el = ref.current; if (!el || !on || reduce) return;
    const io = new IntersectionObserver(([e]) => { e.isIntersecting && !paused ? el.play().catch(() => {}) : el.pause(); });
    io.observe(el); return () => io.disconnect(); }, [on, reduce, paused]);
  const cls = `grade absolute inset-0 h-full w-full object-cover ${className}`;
  if (reduce) return <img src={`/video/${name}.jpg`} alt="" className={cls} />;
  return (
    <video ref={ref} className={cls} poster={`/video/${name}.jpg`} muted loop playsInline autoPlay={eager && !paused}
      preload={eager ? "metadata" : "none"} aria-hidden="true">
      {on && <source src={`/video/${name}.webm`} type="video/webm" />}
      {on && <source src={`/video/${name}.mp4`} type="video/mp4" />}
    </video>
  );
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[390/820] w-full overflow-hidden rounded-[2.6rem] bg-black p-[7px] shadow-[0_40px_120px_rgba(0,0,0,.7)] ring-1 ring-white/15">
      <div className="relative h-full w-full overflow-hidden rounded-[2.2rem]"><Image src={src} alt={alt} fill sizes="320px" className="object-cover" /></div>
    </div>
  );
}

function useSec() { const ref = useRef<HTMLElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] }); return { ref, p: scrollYProgress }; }

export function Magnetic({ children, className = "", href, onClick }: { children: React.ReactNode; className?: string; href: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  return (
    <a ref={ref} href={href} onClick={onClick} className={`inline-flex will-change-transform ${className}`}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setM({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4 }); }}
      onMouseLeave={() => setM({ x: 0, y: 0 })}
      style={{ transform: `translate(${m.x}px, ${m.y}px)`, transition: "transform .5s cubic-bezier(.22,1,.36,1)" }}>
      <span style={{ transform: `translate(${m.x * 0.3}px, ${m.y * 0.3}px)`, transition: "transform .5s cubic-bezier(.22,1,.36,1)" }} className="inline-flex items-center gap-2">{children}</span>
    </a>);
}

function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), reduce ? 0 : 900); return () => clearTimeout(t); }, [reduce]);
  if (reduce) return null;
  return (
    <motion.div aria-hidden="true" initial={{ y: 0 }} animate={{ y: done ? "-100%" : 0 }} transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#111111]">
      <motion.img src="/brand/app-icon.webp" alt="Flexlore" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="h-12 w-12" />
      <div className="mt-6 overflow-hidden"><motion.p initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="display text-5xl"><img src="/brand/wordmark-tagline-light.png" alt="Flexlore" className="h-20 w-auto" /></motion.p></div>
      <div className="mt-8 h-px w-40 overflow-hidden bg-white/10"><motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }} className="h-full origin-left bg-flame" /></div>
      <p className="mono mt-4 text-[12px] uppercase tracking-[.2em] text-white/70">Step by step · from the operator's eyes</p>
    </motion.div>);
}

function Hero({ t }: { t: C }) {
  // P0: değer önerisi ilk ekranda. "Step by step." artık eyebrow; video karartması ≤%50.
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden" aria-label={t.hero}>
      <div className="absolute inset-0" style={{ filter: "brightness(.95) contrast(.9) saturate(.85)" }}><Video name="plating" eager /></div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/35 to-black/25" />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-[14vh] pt-28 md:px-10 md:pb-[16vh]">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="eyebrow">{t.hero}</motion.p>
        <h1 className="display mt-4 max-w-[20ch] text-[clamp(2.4rem,5.6vw,5.6rem)] [text-shadow:0_2px_30px_rgba(0,0,0,.5)]">{t.h1.map((s, i) => <span key={i} className={s.o ? "text-flame" : undefined}>{s.t}</span>)}</h1>
        <p className="mt-5 max-w-[52ch] text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.4] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,.6)] [text-wrap:pretty]">{t.heroLine}</p>
        <div className="mt-7 flex flex-wrap items-center gap-2"><a href={SITE.demo} className="btn-p">{t.cta} <Arr className="ml-1" /></a><StoreButtons small /></div>
      </div>
      <a href="#problem" aria-label="Scroll to content" className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/80 hover:text-white">
        <span className="mono text-[12px] uppercase tracking-[.2em]">Scroll</span>
        <motion.span aria-hidden="true" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} className="block h-6 w-px bg-white/80" />
      </a>
    </section>
  );
}

function Fade() { return <div aria-hidden="true" className="pointer-events-none relative z-10 -mt-px h-24 bg-gradient-to-b from-black to-transparent md:h-32" style={{ marginBottom: "-8rem" }} />; }

function Line({ p, r, children }: { p: MotionValue<number>; r: [number, number]; children: React.ReactNode }) {
  const o = useTransform(p, [r[0], r[1]], [0.12, 1]);
  return <motion.span style={{ opacity: o }} className="block">{children}</motion.span>;
}

function Statement({ t }: { t: C }) {
  const { ref, p } = useSec();
  const vo = useTransform(p, [0, 0.15, 0.85, 1], [0.15, 0.6, 0.6, 0]);
  const so = useTransform(p, [0.55, 0.75], [0, 1]);
  return (
    <section ref={ref} className="relative h-[170vh]" id="problem">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div style={{ opacity: vo }} className="absolute inset-0"><Video name="kitchen" /></motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" /><div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6">
          <p className="eyebrow mb-6">{t.stK}</p><h2 className="display text-[clamp(3.2rem,9vw,9rem)]"><Line p={p} r={[0.1, 0.3]}>{t.st[0]}</Line><Line p={p} r={[0.3, 0.5]}>{t.st[1]}</Line></h2>
          <motion.p style={{ opacity: so }} className="mt-10 max-w-lg text-xl leading-[1.3] text-white/75">{t.stSub}</motion.p>
        </div>
      </div>
    </section>
  );
}

function Product({ t, lang }: { t: C; lang: Lang }) {
  const { ref, p } = useSec();
  const [a, setA] = useState(0);
  useEffect(() => p.on("change", (v) => setA(Math.min(3, Math.max(0, Math.floor(v * 4.2 - 0.1))))), [p]);
  const qz = sectors[0].quiz;
  const bar = useTransform(p, [0, 1], [0, 1]);
  return (
    <section ref={ref} className="relative h-[380vh]" id="method" aria-label={t.pK}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0 opacity-25"><Video name="line" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" /><div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" /><div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="relative mx-auto grid h-full max-w-[1400px] grid-cols-12 items-center gap-6 px-6 md:px-10">
          <div className="col-span-12 self-end pb-6 md:col-span-6 md:self-center md:pb-0">
            <p className="mono text-[12px] uppercase tracking-[.16em] text-white/70">{t.pK}</p>
            <div className="mt-6 flex items-start gap-5 md:mt-10 md:gap-10">
              <span className="num text-[clamp(5rem,13vw,13rem)] text-white/90 tabular-nums">0{a + 1}</span>
              <div className="relative mt-3 h-[9.5rem] flex-1 md:h-[14rem]">
                {t.steps.map((s, i) => (
                  <motion.div key={i + lang} initial={false} animate={{ opacity: a === i ? 1 : 0, y: a === i ? 0 : a > i ? -24 : 24 }} transition={{ duration: 0.35, delay: a === i ? 0.3 : 0, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0" aria-hidden={a !== i}>
                    <h2 className="display text-[clamp(2.6rem,5.5vw,5.5rem)]"><K text={s.h} /></h2>
                    <p className="mt-3 max-w-sm text-[15px] leading-[1.3] text-white/70 md:text-lg">{s.p}</p>
                  </motion.div>))}
              </div>
            </div>
            <ol className="mono mt-8 grid max-w-md grid-cols-4 gap-2 text-[12px] uppercase tracking-[.12em] md:mt-14">
              {t.steps.map((s, i) => (<li key={i}><button type="button" onClick={() => { const el = ref.current; if (!el) return; const top = el.getBoundingClientRect().top + window.scrollY; const span = el.offsetHeight - window.innerHeight; window.scrollTo({ top: top + span * ((i + 0.35) / 4.2), behavior: "smooth" }); }} aria-current={a === i ? "step" : undefined} className={`w-full border-t pt-2 text-left uppercase transition-colors duration-500 hover:text-white ${a >= i ? "border-white text-white" : "border-white/20 text-white/70"}`}>{s.h.replace(".", "")}</button></li>))}
            </ol>
          </div>
          <div className="col-span-12 row-start-1 flex justify-center pt-20 md:col-span-5 md:col-start-8 md:row-auto md:pt-0">
            <div className="relative w-[min(52vw,230px)] md:w-[330px]">
              <Device label={t.alts[a]}>{[0, 1, 2, 3].map((i) => (
                <motion.div key={i} initial={false} animate={{ opacity: a === i ? 1 : 0, x: a === i ? 0 : a > i ? -36 : 36, scale: a === i ? 1 : 0.98, filter: a === i ? "blur(0px)" : "blur(4px)" }} transition={{ duration: 0.35, delay: a === i ? 0.3 : 0, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0" aria-hidden={a !== i} style={{ zIndex: a === i ? 2 : 1 }}>
                  {i === 0 ? <RecordScreen active={a === 0} /> : i === 1 ? <SopScreen active={a === 1} /> : i === 2 ? <QuizScreen active={a === 2} q={qz.q} a={qz.a} ok={qz.ok} /> : <ReadyScreen active={a === 3} />}
                </motion.div>))}</Device>
              <motion.div style={{ scaleY: bar }} className="absolute -right-6 top-0 hidden h-full w-px origin-top bg-white/50 md:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ready({ t }: { t: C }) {
  const { ref, p } = useSec();
  const s = useTransform(p, [0, 0.55], [1.9, 1]);
  const po = useTransform(p, [0.55, 0.75], [0, 1]);
  return (
    <section ref={ref} className="relative h-[200vh]" id="readiness" aria-label={t.rK}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0" style={{ filter: "brightness(1.45) contrast(1.1)" }}><Video name="kitchen" /></div>
        <div className="absolute inset-0 flex items-center justify-center bg-black mix-blend-multiply">
          <motion.h2 style={{ scale: s }} className="display px-4 text-center text-[clamp(3.6rem,13vw,14rem)] text-white">{t.rH}</motion.h2>
        </div>
        <motion.div style={{ opacity: po }} className="absolute inset-x-0 bottom-[12vh] mx-auto max-w-lg px-6 text-center">
          <p className="mono text-[12px] uppercase tracking-[.2em] text-flame">{t.rK}</p>
          <p className="mt-3 text-xl leading-[1.3] text-white/80">{t.rP}</p>
        </motion.div>
      </div>
    </section>
  );
}

function Sectors({ t, lang }: { t: C; lang: Lang }) {
  const { ref, p } = useSec();
  const n = sectors.length;
  // Hold each full-screen panel, then slide to the next (snap feel).
  const seg = 1 / n, ins: number[] = [], outs: string[] = [];
  for (let i = 0; i < n; i++) { ins.push(i * seg + seg * 0.15, i * seg + seg * 0.7); outs.push(`-${i * 100}vw`, `-${i * 100}vw`); }
  const x = useTransform(p, ins, outs);
  const [a, setA] = useState(0);
  useEffect(() => p.on("change", (v) => setA(Math.min(n - 1, Math.max(0, Math.floor(v * n - 0.2))))), [p, n]);
  return (
    <section ref={ref} id="sectors" aria-label={t.whereK} className="relative" style={{ height: `${n * 80}vh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.ul style={{ x }} className="flex h-full w-max">
          {sectors.map((s) => (
            <li key={s.slug} className="relative h-full w-screen shrink-0">
              <Link href={`/sektor/${s.slug}/`} className="group absolute inset-0 block">
                <div className="absolute inset-0 transition duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"><Video name={s.v} /></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-[14vh] md:px-10">
                  <span className="num text-[clamp(4rem,9vw,9rem)] leading-none text-white/85">{s.idx}</span>
                  <p className="mono mt-4 text-[12px] uppercase tracking-[.2em] text-flame">{s.kicker}</p>
                  <p className="display mt-3 text-[clamp(2.8rem,9vw,9rem)] leading-[.92] break-words">{lang === "tr" ? s.tr : s.en}</p>
                  <p className="mt-4 max-w-md text-[17px] leading-[1.3] text-white/75">{s.h}</p>
                  <span className="mono mt-6 inline-flex items-center gap-3 text-[12px] uppercase tracking-[.2em] text-white/70 transition group-hover:text-flame">{lang === "tr" ? "Sektörü aç" : "Open sector"} <Arr className="transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </li>))}
        </motion.ul>
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto flex max-w-[1400px] items-start justify-between px-6 pt-24 md:px-10 md:pt-28">
          <div><p className="mono text-[12px] uppercase tracking-[.2em] text-flame">{t.whereK}</p><h2 className="display mt-3 max-w-[16ch] text-[clamp(2rem,4vw,3.6rem)]"><K text={t.where} /></h2></div>
          <p className="mono hidden pt-1 text-[12px] uppercase tracking-[.2em] text-white/70 md:block tabular-nums">{String(a + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</p>
        </div>
        <div className="absolute inset-x-0 bottom-[6vh] mx-auto max-w-[1400px] px-6 md:px-10"><div className="h-px bg-white/15"><motion.div style={{ scaleX: p }} className="h-full origin-left bg-white/80" /></div></div>
      </div>
    </section>
  );
}

function Proof({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const items = [
    { k: "App Store", h: tr ? "iPhone uygulaması yayında" : "Live on the App Store", u: "https://apps.apple.com/tr/app/flexlore/id6751126206?l" },
    { k: "Product Hunt", h: tr ? "Product Hunt lansmanı" : "Launched on Product Hunt", u: "https://www.producthunt.com/products/flexlore-app/launches/flexlore-app" },
  ];
  return (
    <section id="proof" aria-label={tr ? "Kanıt" : "Proof"} className="px-6 pt-16 md:px-10 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <p className="mono text-[12px] uppercase tracking-[.2em] text-flame">{tr ? "Kendiniz görün" : "See for yourself"}</p>
        <ul className="mt-8 grid border-t border-white/10 md:grid-cols-2">
          {items.map((x, i) => (<li key={x.k} className={`border-b border-white/10 ${i ? "md:border-l md:pl-10" : ""}`}>
            <a href={x.u} target="_blank" rel="noopener" className="group flex items-baseline justify-between gap-6 py-5">
              <span><span className="mono block text-[12px] uppercase tracking-[.2em] text-white/70">{x.k}</span><span className="display mt-2 block text-[clamp(1.8rem,3vw,2.8rem)]">{x.h}</span></span>
              <span aria-hidden="true" className="text-2xl text-white/70 transition group-hover:translate-x-1 group-hover:text-white"><Arr dir="ur" /></span></a></li>))}
        </ul>
      </div>
    </section>);
}

function Faq({ t }: { t: C }) {
  return (
    <section id="faq" className="px-6 py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <div><p className="mono text-[12px] uppercase tracking-[.2em] text-flame">{t.faqK}</p><h2 className="display mt-4 text-[clamp(2.8rem,5.5vw,5rem)]"><K text={t.faqH} /></h2></div>
        <div>{t.faq.map((q) => (
          <details key={q.q} className="group border-t border-white/10 py-4 transition-colors duration-500 last:border-b hover:border-white/30">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-xl font-medium tracking-tight text-white/85 transition-colors group-hover:text-white group-open:text-white"><h3>{q.q}</h3><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/70 ring-1 ring-white/15 transition duration-500 group-hover:ring-white/40 group-open:rotate-45 group-open:bg-flame group-open:text-black group-open:ring-flame">+</span></summary>
            <p className="mt-4 max-w-xl leading-[1.4] text-white/65">{q.a}</p>
          </details>))}
        </div>
      </div>
    </section>
  );
}

function End({ t }: { t: C }) {
  return (
    <section id="demo" className="relative flex min-h-svh items-end overflow-hidden">
      <Video name="hotel" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 pt-24 md:px-10">
        <p className="mono text-[12px] uppercase tracking-[.2em] text-flame">Flexlore</p>
        <h2 className="display mt-6 max-w-[11ch] text-[clamp(4rem,11vw,12rem)] leading-[.85]"><K text={t.endH} accent={-1} /></h2>
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-xl leading-[1.3] text-white/75">{t.endP}</p>
          <Magnetic href={SITE.demo} className="h-40 w-40 items-center justify-center rounded-full bg-flame transition-[filter] hover:brightness-110 active:brightness-90 active:scale-95 text-center text-[17px] font-medium tracking-tight text-black md:h-48 md:w-48">{t.endCta} <Arr className="ml-1" /></Magnetic>
        </div>
      </div>
    </section>
  );
}

export default function Site() {
  const [lang, setLang] = useState<Lang>("en");
  const [paused, setPaused] = useState(false);
  const t = copy[lang];
  const reduce = useReducedMotion();
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { if (reduce) return; const l = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9 }); let r = 0; const f = (x: number) => { l.raf(x); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => { cancelAnimationFrame(r); l.destroy(); }; }, [reduce]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-black">{t.skip}</a>
      <Header home lang={lang} setLang={setLang} paused={paused} setPaused={setPaused} motionOk={!reduce} />
      <VideoPause.Provider value={paused}>
      <main id="main">
        <Hero t={t} /><Statement t={t} /><Product t={t} lang={lang} /><WebSection lang={lang} /><Platforms lang={lang} /><Cases lang={lang} /><Imagine /><Ready t={t} /><Sectors t={t} lang={lang} /><AISection /><Integrations /><Copq lang={lang} /><Programs lang={lang} /><PricingTeaser lang={lang} /><Security lang={lang} /><Faq t={t} /><End t={t} />
      </main>
      </VideoPause.Provider>
      <Footer />
    </>
  );
}
