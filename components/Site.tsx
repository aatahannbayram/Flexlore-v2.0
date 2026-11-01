"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { copy, Lang, C } from "./copy";
import Link from "next/link";
import { sectors } from "./sectors";

export function Video({ name, eager = false, className = "" }: { name: string; eager?: boolean; className?: string }) {
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
  const cls = `grade absolute inset-0 h-full w-full object-cover ${className}`;
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
  useEffect(() => { const t = setTimeout(() => setDone(true), reduce ? 0 : 1900); return () => clearTimeout(t); }, [reduce]);
  if (reduce) return null;
  return (
    <motion.div aria-hidden="true" initial={{ y: 0 }} animate={{ y: done ? "-100%" : 0 }} transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#0b0b0c]">
      <motion.img src="/brand/mark.png" alt="" initial={{ scale: 0.6, opacity: 0, rotate: -90 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="h-12 w-12" />
      <div className="mt-6 overflow-hidden"><motion.p initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="display text-5xl">Flexlore</motion.p></div>
      <div className="mt-8 h-px w-40 overflow-hidden bg-white/10"><motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }} className="h-full origin-left bg-flame" /></div>
      <p className="mono mt-4 text-[11px] uppercase tracking-[.2em] text-white/40">Video SOP · AI quiz · Readiness</p>
    </motion.div>);
}

function Hero({ t }: { t: C }) {
  const { ref, p } = useSec();
  const ms = useTransform(p, [0, 0.75], [1, 9]);
  const mo = useTransform(p, [0.45, 0.75], [1, 0]);
  const so = useTransform(p, [0.7, 0.9], [0, 1]);
  const sy = useTransform(p, [0.7, 0.9], [40, 0]);
  const io = useTransform(p, [0, 0.12], [1, 0]);
  const words = t.hero.split(" ");
  return (
    <section ref={ref} className="relative h-[260vh]" aria-label={t.hero}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0" style={{ filter: "brightness(1.9) contrast(1.05)" }}><Video name="plating" eager /></div>
        <motion.div style={{ opacity: so }} className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/60" />
        {/* signature: video lives inside the letters, then the mask opens up */}
        <motion.div style={{ opacity: mo }} className="absolute inset-0 flex items-center justify-center bg-black mix-blend-multiply">
          <motion.h1 style={{ scale: ms }} className="display origin-[50%_55%] px-4 text-center text-[clamp(6.4rem,17vw,19rem)] leading-[.82] text-white">
            {words.map((w, i) => (<span key={w + i} className="inline-block overflow-hidden pb-[.06em] align-bottom"><motion.span initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 2.1 + i * 0.12, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className={`inline-block ${i === words.length - 1 ? "it" : ""}`}>{w}&nbsp;</motion.span></span>))}
            <span className="sr-only"> {t.h1seo}</span></motion.h1>
        </motion.div>
        <motion.div aria-hidden="true" style={{ opacity: mo }} className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.p style={{ scale: ms }} className="display origin-[50%_55%] px-4 text-center text-[clamp(6.4rem,17vw,19rem)] leading-[.82] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.28)]">
            {words.map((w, i) => (<span key={w + i} className="inline-block overflow-hidden pb-[.06em] align-bottom"><motion.span initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 2.1 + i * 0.12, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className={`inline-block ${i === words.length - 1 ? "it" : ""}`}>{w}&nbsp;</motion.span></span>))}</motion.p>
        </motion.div>
        <motion.div style={{ opacity: io }} className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1400px] items-end justify-between px-6 pb-8 md:px-10">
          <p className="mono text-[11px] uppercase tracking-[.2em] text-white/70">● {t.heroK}</p>
          <p className="mono hidden text-[11px] uppercase tracking-[.2em] text-white/70 md:block">Scroll ↓</p>
        </motion.div>
        <motion.div style={{ opacity: so, y: sy }} className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-6 pb-[12vh] md:px-10">
          <p className="mono mb-6 text-[11px] uppercase tracking-[.2em] text-flame">01 — {t.heroK}</p>
          <p className="display max-w-[16ch] text-[clamp(2.6rem,6vw,6rem)] [text-shadow:0_2px_30px_rgba(0,0,0,.5)]">{t.heroSub}</p>
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
  const [a, setA] = useState(0);
  useEffect(() => p.on("change", (v) => setA(Math.min(3, Math.max(0, Math.floor(v * 4.2 - 0.1))))), [p]);
  const shots = ["/brand/app3.png", "/brand/app2.png", "/brand/app4.png", "/brand/app1.png"];
  const qz = sectors[0].quiz;
  const bar = useTransform(p, [0, 1], [0, 1]);
  return (
    <section ref={ref} className="relative h-[460vh]" id="method" aria-label={t.pK}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0 opacity-25"><Video name="line" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
        <div className="relative mx-auto grid h-full max-w-[1400px] grid-cols-12 items-center gap-6 px-6 md:px-10">
          <div className="col-span-12 self-end pb-6 md:col-span-6 md:self-center md:pb-0">
            <p className="mono text-[11px] uppercase tracking-[.2em] text-flame">02 — {t.pK}</p>
            <div className="mt-6 flex items-start gap-6 md:mt-10">
              <span className="num text-[clamp(5rem,13vw,13rem)] text-white/90 tabular-nums">0{a + 1}</span>
              <div className="relative mt-3 h-[9.5rem] flex-1 md:h-[14rem]">
                {t.steps.map((s, i) => (
                  <motion.div key={i + lang} initial={false} animate={{ opacity: a === i ? 1 : 0, y: a === i ? 0 : a > i ? -24 : 24 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0" aria-hidden={a !== i}>
                    <h2 className="display text-[clamp(2.6rem,5.5vw,5.5rem)]">{s.h}</h2>
                    <p className="mt-3 max-w-sm text-[15px] leading-snug text-white/70 md:text-lg">{s.p}</p>
                  </motion.div>))}
              </div>
            </div>
            <ol className="mono mt-8 grid max-w-md grid-cols-4 gap-2 text-[10px] uppercase tracking-[.16em] md:mt-14">
              {t.steps.map((s, i) => (<li key={i} className={`border-t pt-2 transition-colors duration-500 ${a >= i ? "border-flame text-white" : "border-white/20 text-white/40"}`}>{s.h.replace(".", "")}</li>))}
            </ol>
          </div>
          <div className="col-span-12 row-start-1 flex justify-center pt-20 md:col-span-5 md:col-start-8 md:row-auto md:pt-0">
            <div className="relative w-[min(42vw,180px)] md:w-[300px]">
              {shots.map((s, i) => (
                <motion.div key={s} initial={false} animate={{ opacity: a === i ? 1 : 0, scale: a === i ? 1 : 0.97 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={i ? "absolute inset-0" : ""}><Phone src={s} alt={t.alts[i]} /></motion.div>))}
              <motion.div initial={false} animate={{ opacity: a === 2 ? 1 : 0, x: a === 2 ? 0 : 30 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} aria-hidden={a !== 2}
                className="absolute -left-10 bottom-10 w-[240px] rounded-2xl border border-white/10 bg-[#141416]/95 p-4 shadow-[0_30px_80px_rgba(0,0,0,.6)] backdrop-blur md:-left-48 md:w-[280px]">
                <p className="mono text-[9px] uppercase tracking-[.2em] text-flame">{lang === "tr" ? "Örnek quiz" : "Sample quiz"}</p>
                <p className="mt-2 text-[13px] leading-snug text-white">{qz.q}</p>
                <ul className="mt-3 space-y-1.5 text-[12px]">{qz.a.map((x, i) => <li key={x} className={`rounded-lg border px-2.5 py-1.5 ${i === qz.ok ? "border-flame/60 text-white" : "border-white/10 text-white/55"}`}>{x}</li>)}</ul>
              </motion.div>
              <motion.div style={{ scaleY: bar }} className="absolute -right-6 top-0 hidden h-full w-px origin-top bg-flame md:block" />
            </div>
          </div>
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

function Sectors({ t, lang }: { t: C; lang: Lang }) {
  const { ref, p } = useSec();
  const x = useTransform(p, [0.05, 0.95], ["0%", "-72%"]);
  return (
    <section ref={ref} id="sectors" className="relative h-[420vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1400px] items-end justify-between px-6 md:px-10">
          <div><p className="mono text-[11px] uppercase tracking-[.2em] text-flame">05 — {t.whereK}</p><h2 className="display mt-4 text-[clamp(3rem,7vw,7rem)]">{t.where}</h2></div>
          <p className="mono hidden text-[11px] uppercase tracking-[.2em] text-white/50 md:block">{lang === "tr" ? "Altı sektör · açmak için tıklayın" : "Six sectors · click to open"}</p>
        </div>
        <motion.ul style={{ x }} className="mt-10 flex w-max gap-5 pl-6 md:gap-8 md:pl-10">
          {sectors.map((s) => (
            <li key={s.slug} className="w-[78vw] md:w-[34vw]">
              <Link href={`/sektor/${s.slug}/`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 md:aspect-[5/6]">
                  <div className="absolute inset-0 transition duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"><Video name={s.v} /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
                  <span className="num absolute left-5 top-4 text-[4.5rem] text-white/85">{s.idx}</span>
                  <span className="absolute right-5 top-6 flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-flame text-black opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100">→</span>
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                    <p className="mono text-[10px] uppercase tracking-[.2em] text-flame">{s.kicker}</p>
                    <p className="display mt-2 text-[clamp(2.4rem,3.6vw,3.6rem)]">{lang === "tr" ? s.tr : s.en}</p>
                    <p className="mt-2 max-w-sm text-[14px] leading-snug text-white/70">{s.h}</p>
                  </div>
                </div>
              </Link>
            </li>))}
        </motion.ul>
        <div className="mx-auto mt-8 w-full max-w-[1400px] px-6 md:px-10"><div className="h-px bg-white/10"><motion.div style={{ scaleX: p }} className="h-full origin-left bg-white/70" /></div></div>
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
    <section id="demo" className="relative flex min-h-svh items-end overflow-hidden">
      <Video name="hotel" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 md:px-10">
        <p className="mono text-[11px] uppercase tracking-[.2em] text-flame">06 — Flexlore</p>
        <h2 className="display mt-6 max-w-[11ch] text-[clamp(4rem,11vw,12rem)] leading-[.85]">{t.endH}</h2>
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-xl leading-snug text-white/75">{t.endP}</p>
          <Magnetic href="mailto:hello@flexlore.com" className="h-40 w-40 items-center justify-center rounded-full bg-flame text-center text-[17px] font-medium tracking-tight text-black md:h-48 md:w-48">{t.endCta} <span aria-hidden="true">→</span></Magnetic>
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
  const links = t.nav.map((n, i) => ({ n, h: ["#method", "#languages", "#readiness", "#sectors"][i] }));
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
            <Magnetic href="#demo" className="btn-p hidden sm:inline-flex">{t.cta}</Magnetic>
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
      <Loader /><Nav t={t} lang={lang} setLang={setLang} />
      <main id="main">
        <Hero t={t} /><Statement t={t} /><Product t={t} lang={lang} /><Languages t={t} /><Ready t={t} /><Sectors t={t} lang={lang} /><Faq t={t} /><End t={t} />
      </main>
      <footer className="px-6 pb-8 pt-0 text-[13px] text-white/55 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-12">
            <p className="text-white/75 md:col-span-4">{t.foot}</p>
            <div className="md:col-span-3 md:col-start-6"><p className="mono mb-4 text-[10px] uppercase tracking-[.2em] text-white/35">{t.nav[3]}</p>
              <ul className="space-y-2">{sectors.map((s) => <li key={s.slug}><Link className="link-u hover:text-white" href={`/sektor/${s.slug}/`}>{lang === "tr" ? s.tr : s.en}</Link></li>)}</ul></div>
            <div className="md:col-span-2"><p className="mono mb-4 text-[10px] uppercase tracking-[.2em] text-white/35">App</p>
              <ul className="space-y-2"><li><a className="link-u hover:text-white" href="https://apps.apple.com/tr/app/flexlore/id6751126206" target="_blank" rel="noopener">App Store</a></li><li><a className="link-u hover:text-white" href="https://play.google.com/store/apps/details?id=com.flexlore.app" target="_blank" rel="noopener">Google Play</a></li></ul></div>
            <div className="md:col-span-2"><p className="mono mb-4 text-[10px] uppercase tracking-[.2em] text-white/35">Contact</p>
              <a className="link-u hover:text-white" href="mailto:hello@flexlore.com">hello@flexlore.com</a></div>
          </div>
          <p aria-hidden="true" className="display mt-16 select-none text-center text-[23vw] leading-[.75] text-white/[0.92]">Flexlore</p>
          <div className="mono mt-8 flex flex-col justify-between gap-2 text-[10px] uppercase tracking-[.2em] text-white/35 md:flex-row"><span>© 2026 Flexlore</span><span>{t.credits}</span></div>
        </div>
      </footer>
    </>
  );
}
