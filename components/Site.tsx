"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { copy, Lang, C } from "./copy";

function Video({ name, eager = false, className = "" }: { name: string; eager?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(eager);
  useEffect(() => {
    if (eager || reduce) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "60% 0px" });
    io.observe(el); return () => io.disconnect();
  }, [eager, reduce]);
  useEffect(() => { const el = ref.current; if (!el || !on || reduce) return;
    const io = new IntersectionObserver(([e]) => { e.isIntersecting ? el.play().catch(() => {}) : el.pause(); });
    io.observe(el); return () => io.disconnect(); }, [on, reduce]);
  const cls = `absolute inset-0 h-full w-full object-cover ${className}`;
  if (reduce) return <img src={`/video/${name}.jpg`} alt="" className={cls} />;
  return (
    <video ref={ref} className={cls} poster={`/video/${name}.jpg`} muted loop playsInline autoPlay={eager}
      preload={eager ? "auto" : "none"} aria-hidden="true">
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

function Hero({ t }: { t: C }) {
  const { ref, p } = useSec();
  const scale = useTransform(p, [0, 1], [1, 0.82]);
  const op = useTransform(p, [0, 0.7], [1, 0]);
  const y = useTransform(p, [0, 1], ["0%", "-12%"]);
  const dim = useTransform(p, [0, 1], [0.35, 0.85]);
  const vs = useTransform(p, [0, 1], [1.08, 1]);
  return (
    <section ref={ref} className="relative h-[200vh]" aria-label={t.hero}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={{ scale: vs }} className="absolute inset-0"><Video name="plating" eager /></motion.div>
        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-black" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
        <motion.div style={{ scale, opacity: op, y }} className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow mb-6">{t.heroK}</p><h1 className="display text-[clamp(4rem,13vw,13rem)]">{t.hero}<span className="sr-only"> {t.h1seo}</span></h1>
          <p className="mt-8 max-w-xl text-[clamp(1.15rem,1.8vw,1.6rem)] font-medium leading-snug tracking-tight text-white/85">{t.heroSub}</p>
        </motion.div>
      </div>
    </section>
  );
}

function Line({ p, r, children }: { p: MotionValue<number>; r: [number, number]; children: React.ReactNode }) {
  const o = useTransform(p, [r[0], r[1]], [0.12, 1]);
  return <motion.span style={{ opacity: o }} className="block">{children}</motion.span>;
}

function Statement({ t }: { t: C }) {
  const { ref, p } = useSec();
  const vo = useTransform(p, [0, 0.15, 0.85, 1], [0.15, 0.6, 0.6, 0]);
  const so = useTransform(p, [0.55, 0.75], [0, 1]);
  return (
    <section ref={ref} className="relative h-[220vh]" id="problem">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div style={{ opacity: vo }} className="absolute inset-0"><Video name="kitchen" /></motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6">
          <p className="eyebrow mb-6">{t.stK}</p><h2 className="display text-[clamp(3.2rem,9vw,9rem)]"><Line p={p} r={[0.1, 0.3]}>{t.st[0]}</Line><Line p={p} r={[0.3, 0.5]}>{t.st[1]}</Line></h2>
          <motion.p style={{ opacity: so }} className="mt-10 max-w-lg text-xl leading-snug text-white/75">{t.stSub}</motion.p>
        </div>
      </div>
    </section>
  );
}

function Product({ t, lang }: { t: C; lang: Lang }) {
  const { ref, p } = useSec();
  const py = useTransform(p, [0, 0.25], ["70vh", "0vh"]);
  const ps = useTransform(p, [0, 0.25], [0.9, 1]);
  const vo = useTransform(p, [0, 0.3], [0.7, 0.3]);
  const shots = ["/brand/app2.png", "/brand/app3.png", "/brand/app4.png"];
  const idx = [useTransform(p, [0.12, 0.22, 0.48, 0.55], [0, 1, 1, 0]), useTransform(p, [0.48, 0.55, 0.72, 0.78], [0, 1, 1, 0]), useTransform(p, [0.72, 0.78], [0, 1])];
  return (
    <section ref={ref} className="relative h-[400vh]" id="method" aria-label={t.pK}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={{ opacity: vo }} className="absolute inset-0"><Video name="line" /></motion.div>
        <div className="relative mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
          <div className="relative order-2 h-[13rem] md:order-1 md:h-[22rem]">
            <p className="eyebrow">{t.pK}</p>
            {t.steps.map((s, i) => (
              <motion.div key={i + lang} style={{ opacity: idx[i] }} className="absolute inset-x-0 top-8">
                <h2 className="display text-[clamp(2.8rem,7vw,6.5rem)]">{s.h}</h2>
                <p className="mt-4 max-w-md text-base md:mt-6 md:text-lg leading-snug text-white/75">{s.p}</p>
              </motion.div>
            ))}
          </div>
          <motion.div style={{ y: py, scale: ps }} className="order-1 mx-auto w-[min(44vw,300px)] pt-16 md:order-2 md:pt-0">
            <div className="relative">
              {shots.map((s, i) => (
                <motion.div key={s} style={{ opacity: i === 0 ? 1 : idx[i] }} className={i ? "absolute inset-0" : ""}><Phone src={s} alt={t.alts[i]} /></motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Languages({ t }: { t: C }) {
  const { ref, p } = useSec();
  const x = useTransform(p, [0, 1], ["10%", "-55%"]);
  const ho = useTransform(p, [0.05, 0.25], [0, 1]);
  const hs = useTransform(p, [0.05, 0.35], [1.15, 1]);
  return (
    <section ref={ref} className="relative h-[250vh]" id="languages" aria-label={t.lK}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <Video name="steam" className="opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="relative flex h-full flex-col justify-center">
          <motion.div style={{ opacity: ho, scale: hs }} className="mx-auto max-w-6xl px-6 text-center">
            <p className="eyebrow">{t.lK}</p>
            <h2 className="display mt-4 text-[clamp(3rem,8vw,8rem)]">{t.lH}</h2>
          </motion.div>
          <motion.div style={{ x }} className="mt-14 flex gap-14 whitespace-nowrap text-[clamp(2rem,4.5vw,4rem)] font-medium tracking-tight text-white/25" aria-hidden="true">
            {t.langs.concat(t.langs).map((l, i) => <span key={i}>{l}</span>)}
          </motion.div>
          <motion.div style={{ opacity: ho }} className="mx-auto mt-14 max-w-xl px-6 text-center">
            <p className="inline bg-black/70 px-2 py-1 text-lg">{t.sub}</p>
            <p className="mt-8 text-white/70">{t.lP}</p>
          </motion.div>
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
    <section ref={ref} className="relative h-[260vh]" id="readiness" aria-label={t.rK}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0" style={{ filter: "brightness(1.25) contrast(1.1)" }}><Video name="kitchen" /></div>
        <div className="absolute inset-0 flex items-center justify-center bg-black mix-blend-multiply">
          <motion.h2 style={{ scale: s }} className="display px-4 text-center text-[clamp(3.6rem,13vw,14rem)] text-white">{t.rH}</motion.h2>
        </div>
        <motion.div style={{ opacity: po }} className="absolute inset-x-0 bottom-[12vh] mx-auto max-w-lg px-6 text-center">
          <p className="eyebrow">{t.rK}</p>
          <p className="mt-3 text-xl leading-snug text-white/80">{t.rP}</p>
        </motion.div>
      </div>
    </section>
  );
}

function Sectors({ t }: { t: C }) {
  return (
    <section id="sectors" className="px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl"><p className="eyebrow">{t.whereK}</p><h2 className="display mt-4 text-[clamp(3rem,7vw,6.5rem)]">{t.where}</h2></div>
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-[2px] md:grid-cols-4">
        {t.sectors.map((s) => (
          <div key={s.v} className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
            <Video name={s.v} className="opacity-80" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-20"><h3 className="text-2xl font-semibold tracking-tight">{s.h}</h3></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq({ t }: { t: C }) {
  return (
    <section id="faq" className="px-6 py-32 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <div><p className="eyebrow">{t.faqK}</p><h2 className="display mt-4 text-[clamp(2.8rem,5.5vw,5rem)]">{t.faqH}</h2></div>
        <div>{t.faq.map((q) => (
          <details key={q.q} className="group border-t border-white/10 py-6 last:border-b">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-xl font-medium tracking-tight"><h3>{q.q}</h3><span aria-hidden="true" className="text-white/40 transition group-open:rotate-45">+</span></summary>
            <p className="mt-4 max-w-xl leading-relaxed text-white/65">{q.a}</p>
          </details>))}
        </div>
      </div>
    </section>
  );
}

function End({ t }: { t: C }) {
  return (
    <section id="demo" className="relative flex h-svh items-center justify-center overflow-hidden text-center">
      <Video name="hotel" className="opacity-50" />
      <div className="relative px-6">
        <p className="eyebrow">Flexlore</p>
        <h2 className="display text-[clamp(3.4rem,9vw,9rem)]">{t.endH}</h2>
        <p className="mt-6 text-xl text-white/75">{t.endP}</p>
        <a href="mailto:hello@flexlore.com" className="mt-10 inline-block rounded-full bg-white px-7 py-3.5 text-[17px] font-medium tracking-tight text-black transition duration-300 hover:scale-[1.03] hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{t.endCta}</a>
        <div className="mt-6 flex justify-center gap-6 text-[14px] text-white/70">
          <a className="link-u" href="https://apps.apple.com/tr/app/flexlore/id6751126206" target="_blank" rel="noopener">App Store</a>
          <a className="link-u" href="https://play.google.com/store/apps/details?id=com.flexlore.app" target="_blank" rel="noopener">Google Play</a>
        </div>
      </div>
    </section>
  );
}

function Nav({ t, lang, setLang }: { t: C; lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [open]);
  const links = t.nav.map((n, i) => ({ n, h: ["#method", "#languages", "#readiness", "#faq"][i] }));
  const Lang2 = (
    <div role="group" aria-label={t.langLabel} className="relative flex rounded-full bg-white/[0.07] p-0.5 text-[12px]">
      {(["en", "tr"] as Lang[]).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`relative z-10 rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? "text-black" : "text-white/55 hover:text-white"}`}>
          {lang === l && <motion.span layoutId="langpill" className="absolute inset-0 -z-10 rounded-full bg-white" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}{l}
        </button>))}
    </div>);
  return (
    <>
      <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3">
        <motion.nav aria-label="Main" layout transition={{ type: "spring", stiffness: 260, damping: 32 }}
          className={`relative flex items-center justify-between overflow-hidden transition-[background,border-color,box-shadow] duration-500 ${scrolled ? "h-12 w-[min(100%,820px)] rounded-full border border-white/10 bg-[rgba(20,20,22,0.66)] pl-5 pr-2 shadow-[0_10px_40px_rgba(0,0,0,.45)] backdrop-blur-2xl backdrop-saturate-150" : "h-14 w-[min(100%,1200px)] rounded-none border border-transparent bg-transparent px-3"}`}>
          <a href="#main" className="flex items-center gap-2" aria-label="Flexlore">
            <motion.img src="/brand/mark.png" alt="" className="h-5 w-5" animate={{ rotate: scrolled ? 90 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} />
            <span className="wordmark flex overflow-hidden text-[17px] font-semibold tracking-[-0.04em]">
              {"Flexlore".split("").map((c, i) => (
                <motion.span key={i} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.25 + i * 0.04, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="inline-block">{c}</motion.span>))}
            </span>
          </a>
          <ul className="hidden items-center gap-7 text-[13px] text-white/70 md:flex">
            {links.map((l) => <li key={l.h}><a href={l.h} className="link-u hover:text-white">{l.n}</a></li>)}
          </ul>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">{Lang2}</div>
            <a href="#demo" className="btn-p hidden sm:inline-flex">{t.cta}</a>
            <button onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu" className="rounded-full px-3 py-1.5 text-[13px] text-white/85 hover:text-white md:hidden">{t.menu}</button>
          </div>
          <motion.span aria-hidden="true" style={{ scaleX: scrollYProgress }} className={`absolute bottom-0 left-0 h-px w-full origin-left bg-flame/80 transition-opacity ${scrolled ? "opacity-100" : "opacity-0"}`} />
        </motion.nav>
      </motion.header>
      {open && (
        <motion.div id="menu" role="dialog" aria-modal="true" aria-label={t.menu} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/90 px-6 pb-10 pt-5 backdrop-blur-2xl">
          <div className="flex items-center justify-between"><span className="text-[17px] font-semibold tracking-[-0.04em]">Flexlore</span>
            <button onClick={() => setOpen(false)} className="rounded-full px-3 py-1.5 text-[13px]" autoFocus>{t.close}</button></div>
          <ul className="mt-16 space-y-3">
            {links.map((l, i) => (
              <motion.li key={l.h} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}>
                <a href={l.h} onClick={() => setOpen(false)} className="display block text-[3.4rem]">{l.n}</a></motion.li>))}
          </ul>
          <div className="mt-auto flex items-center justify-between">{Lang2}<a href="#demo" onClick={() => setOpen(false)} className="btn-p">{t.cta}</a></div>
        </motion.div>)}
    </>
  );
}

export default function Site() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];
  const reduce = useReducedMotion();
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { if (reduce) return; const l = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9 }); let r = 0; const f = (x: number) => { l.raf(x); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f); return () => { cancelAnimationFrame(r); l.destroy(); }; }, [reduce]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-black">{t.skip}</a>
      <Nav t={t} lang={lang} setLang={setLang} />
      <main id="main">
        <Hero t={t} /><Statement t={t} /><Product t={t} lang={lang} /><Languages t={t} /><Ready t={t} /><Sectors t={t} /><Faq t={t} /><End t={t} />
      </main>
      <footer className="border-t border-white/[0.08] px-6 pb-10 pt-14 text-[12px] text-ash">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-white/[0.08] pb-10 md:flex-row md:items-center">
            <Image src="/brand/logo.png" alt="Flexlore logo" width={110} height={24} />
            <p className="max-w-sm text-[14px] leading-snug text-white/60">{t.foot}</p>
          </div>
          <div className="flex flex-col justify-between gap-2 pt-6 md:flex-row"><span>© 2026 Flexlore</span><span>{t.credits}</span></div>
        </div>
      </footer>
    </>
  );
}
