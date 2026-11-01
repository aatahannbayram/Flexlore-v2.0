"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { copy, Lang } from "./copy";

const APP = "https://apps.apple.com/app/flexlore/id6751126206";
const ease = [0.25, 0.1, 0.1, 1] as const;

function Fade({ children, className = "", d = 0 }: { children: React.ReactNode; className?: string; d?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12% 0px" }} transition={{ duration: 1.1, delay: d, ease }}>{children}</motion.div>;
}
const Label = ({ children }: { children: React.ReactNode }) => <p className="mb-8 text-[13px] tracking-wide text-mute">{children}</p>;

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[2.6rem] bg-ink p-[9px] shadow-[0_30px_60px_-30px_rgba(22,20,18,.45)] ${className}`}>
      <div className="relative aspect-[780/1640] overflow-hidden rounded-[2.1rem] bg-black">
        <AnimatePresence mode="popLayout"><motion.div key={src} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <Image src={src} alt={alt} fill sizes="320px" className="object-cover" />
        </motion.div></AnimatePresence>
      </div>
    </div>
  );
}

function Step({ s, i, onActive }: { s: { n: string; h: string; p: string }; i: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null); const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => { if (inView) onActive(i); }, [inView, i, onActive]);
  return (
    <div ref={ref} className="flex min-h-[70vh] flex-col justify-center lg:min-h-[85vh]">
      <p className="font-serif text-2xl text-flame">{s.n}</p>
      <h3 className="mt-3 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">{s.h}</h3>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">{s.p}</p>
    </div>
  );
}

export default function Site() {
  const [lang, setLang] = useState<Lang>("en"); const t = copy[lang];
  const [active, setActive] = useState(0);
  const [sub, setSub] = useState(0);
  const heroImg = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroImg, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ lerp: 0.1 }); let r = 0; const f = (x: number) => { l.raf(x); r = requestAnimationFrame(f); }; r = requestAnimationFrame(f);
    return () => { cancelAnimationFrame(r); l.destroy(); };
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { const id = setInterval(() => setSub((x) => (x + 1) % 4), 3200); return () => clearInterval(id); }, []);

  const shots = ["/brand/app3.png", "/brand/app2.png", "/brand/app1.png"];
  const ids = ["method", "readiness", "languages", "sectors"];
  const sectorImgs = ["/photos/chef-plating.jpg", "/photos/factory.jpg", "/photos/hotel-room.jpg", "/brand/brewery.png"];
  const wrap = "mx-auto max-w-[1240px] px-6 sm:px-10";

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">{t.skip}</a>
      <header className="fixed inset-x-0 top-0 z-50 border-b hair bg-paper/85 backdrop-blur-md">
        <nav aria-label="Main" className={`${wrap} flex h-16 items-center justify-between`}>
          <a href="#" aria-label="Flexlore"><Image src="/brand/logo-dark.png" alt="Flexlore" width={104} height={23} priority /></a>
          <ul className="hidden gap-9 text-[14px] text-mute md:flex">{t.nav.map((n, i) => <li key={n}><a className="transition-colors hover:text-ink" href={`#${ids[i]}`}>{n}</a></li>)}</ul>
          <div className="flex items-center gap-5 text-[14px]">
            <div role="group" aria-label={t.langLabel} className="flex gap-2">
              {(["en", "tr"] as const).map((l) => <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`uppercase transition-colors ${lang === l ? "text-ink underline underline-offset-4" : "text-mute hover:text-ink"}`}>{l}</button>)}
            </div>
            <a href={APP} className="hidden rounded-full bg-ink px-4 py-2 text-paper transition-opacity hover:opacity-85 sm:inline-block">{t.app}</a>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* Hero */}
        <section className={`${wrap} pt-40 pb-16 sm:pt-48`}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }} className="max-w-[16ch] font-serif text-[3.4rem] leading-[0.98] tracking-[-0.02em] sm:text-[5.5rem] lg:text-[7rem]">
            {t.heroA} <em>{t.heroB.replace(/\.$/, "")}</em><span className="text-flame">.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.35 }} className="mt-12 grid gap-8 border-t hair pt-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-mute">{t.heroSub}</p>
            <div className="flex gap-6 text-[15px]">
              <a href={APP} className="rounded-full bg-ink px-6 py-3 text-paper transition-opacity hover:opacity-85">{t.app}</a>
              <a href="mailto:hello@flexlore.com" className="py-3 underline decoration-1 underline-offset-[6px] hover:text-flame">{t.talk}</a>
            </div>
          </motion.div>
        </section>
        <figure className="px-3 sm:px-6">
          <div ref={heroImg} className="relative h-[70vh] min-h-[420px] overflow-hidden rounded-[4px] sm:h-[88vh]">
            <motion.div style={{ y: imgY }} className="absolute inset-[-6%_0]"><Image src="/photos/chef-fire.jpg" alt="A chef working the line in a restaurant kitchen" fill priority sizes="100vw" className="object-cover" /></motion.div>
            <div className="absolute bottom-8 right-8 hidden w-[230px] md:block"><Phone src="/brand/app4.png" alt="Flexlore showing a recorded step on iPhone" /></div>
          </div>
          <figcaption className={`${wrap} mt-4 text-[13px] text-mute`}>{t.heroCap}</figcaption>
        </figure>

        {/* Statement */}
        <section className={`${wrap} py-40 sm:py-56`}>
          <Fade><p className="max-w-[22ch] font-serif text-[2.6rem] leading-[1.08] tracking-tight sm:text-7xl">{t.st1} <span className="text-mute">{t.st2}</span></p></Fade>
        </section>

        {/* Method — sticky */}
        <section id="method" className="scroll-mt-16 border-t hair bg-paper2/60">
          <div className={`${wrap} grid gap-10 pt-24 lg:grid-cols-[1fr_380px] lg:gap-24`}>
            <div>
              <Label>{t.howK}</Label>
              {t.steps.map((s, i) => (
                <div key={s.n}>
                  <div className="mx-auto mb-4 w-[220px] lg:hidden"><Phone src={shots[i]} alt="" /></div>
                  <Step s={s} i={i} onActive={setActive} />
                </div>))}
            </div>
            <div className="hidden lg:block">
              <div className="sticky top-[12vh] pb-24">
                <Phone src={shots[active]} alt={t.steps[active].h} />
                <div className="mt-6 flex justify-center gap-2" aria-hidden>{shots.map((_, i) => <span key={i} className={`h-[3px] w-8 transition-colors ${i === active ? "bg-ink" : "bg-ink/15"}`} />)}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Readiness */}
        <section id="readiness" className={`${wrap} scroll-mt-16 py-32 sm:py-44`}>
          <div className="grid gap-16 lg:grid-cols-[5fr_7fr]">
            <Fade><Label>{t.readyK}</Label><h2 className="font-serif text-5xl leading-[1.03] tracking-tight sm:text-6xl">{t.readyH}</h2><p className="mt-8 max-w-md text-lg leading-relaxed text-mute">{t.readyP}</p></Fade>
            <Fade d={0.15}>
              <table className="w-full text-left text-[15px]">
                <thead><tr className="border-b border-ink text-[13px] text-mute">{t.cols.map((c, i) => <th key={c} scope="col" className={`pb-3 font-normal ${i === 1 ? "w-[34%]" : ""}`}>{c}</th>)}</tr></thead>
                <tbody>
                  {t.rows.map((r, i) => (
                    <tr key={r.t} className="border-b hair align-top">
                      <td className="py-6"><span className="block">{r.t}</span><span className="text-[13px] text-mute">{r.s}</span></td>
                      <td className="py-6 pr-6">
                        <span className="font-serif text-3xl">{r.v}%</span>
                        <div className="mt-2 h-px w-full bg-ink/15"><motion.div className={`h-px ${r.v < 60 ? "bg-flame" : "bg-ink"}`} initial={{ width: 0 }} whileInView={{ width: `${r.v}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.1 * i, ease }} /></div>
                      </td>
                      <td className={`py-6 text-[14px] ${r.v < 60 ? "text-flame" : "text-mute"}`}>{r.note}</td>
                    </tr>))}
                </tbody>
              </table>
              <p className="mt-4 text-[12px] text-mute">{t.illus}</p>
            </Fade>
          </div>
        </section>

        {/* Languages */}
        <section id="languages" className="scroll-mt-16 bg-ink text-paper">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[60vh]">
              <Image src="/brand/restaurant.png" alt="Restaurant staff during service" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-8 pt-24">
                <AnimatePresence mode="wait"><motion.p key={sub} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="max-w-md text-xl leading-snug" aria-live="off">
                  <span className="mr-3 text-[12px] tracking-wider text-paper/60">{t.subs[sub].l}</span>{t.subs[sub].t}</motion.p></AnimatePresence>
              </div>
            </div>
            <div className="px-6 py-24 sm:px-16 lg:py-36">
              <Fade><p className="mb-8 text-[13px] text-paper/55">{t.langK}</p><h2 className="max-w-[16ch] font-serif text-5xl leading-[1.04] tracking-tight sm:text-6xl">{t.langH}</h2>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/65">{t.langP}</p>
                <ul className="mt-12 max-w-md border-t border-paper/15 text-[15px]">{t.langList.map((x) => <li key={x} className="border-b border-paper/15 py-4">{x}</li>)}</ul></Fade>
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section id="sectors" className={`${wrap} scroll-mt-16 py-32 sm:py-44`}>
          <Fade><Label>{t.secK}</Label><h2 className="max-w-[18ch] font-serif text-5xl leading-[1.03] tracking-tight sm:text-6xl">{t.secH}</h2></Fade>
          <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2">
            {t.sectors.map((s, i) => (
              <Fade key={s.h} d={(i % 2) * 0.12} className={i % 2 ? "sm:mt-24" : ""}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]"><Image src={sectorImgs[i]} alt={s.h} fill sizes="(max-width:640px) 100vw, 50vw" className="object-cover" /></div>
                <div className="mt-5 flex items-baseline justify-between gap-6 border-t hair pt-4"><h3 className="font-serif text-3xl">{s.h}</h3><p className="max-w-[24ch] text-right text-[14px] text-mute">{s.p}</p></div>
              </Fade>))}
          </div>
        </section>

        {/* Integrations */}
        <section className="border-t hair">
          <div className={`${wrap} grid gap-16 py-32 lg:grid-cols-[5fr_7fr]`}>
            <Fade><Label>{t.intK}</Label><h2 className="max-w-[14ch] font-serif text-5xl leading-[1.03] tracking-tight">{t.intH}</h2></Fade>
            <dl className="border-t border-ink">
              {t.ints.map((x, i) => (
                <Fade key={x.h} d={i * 0.06}><div className="grid grid-cols-[1fr_1.4fr] gap-6 border-b hair py-7"><dt className="font-serif text-2xl">{x.h}</dt><dd className="text-[15px] leading-relaxed text-mute">{x.p}</dd></div></Fade>))}
            </dl>
          </div>
        </section>

        {/* Close */}
        <section className="px-3 pb-3 sm:px-6 sm:pb-6">
          <div className="relative overflow-hidden rounded-[4px]">
            <Image src="/photos/factory.jpg" alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/65" />
            <div className="relative px-6 py-40 text-center text-paper sm:py-52">
              <Fade><h2 className="mx-auto max-w-[18ch] font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">{t.endH}</h2>
                <p className="mt-6 text-lg text-paper/75">{t.endP}</p>
                <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-[15px]">
                  <a href={APP} className="rounded-full bg-paper px-7 py-3.5 text-ink transition-opacity hover:opacity-90">{t.app}</a>
                  <a href="mailto:hello@flexlore.com" className="underline decoration-1 underline-offset-[6px]">{t.talk}</a>
                </div></Fade>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${wrap} flex flex-col justify-between gap-4 py-10 text-[13px] text-mute sm:flex-row`}>
        <span>© {new Date().getFullYear()} Flexlore — {t.foot}</span>
        <span>{t.credits}: Unsplash, flexlore.com</span>
      </footer>
    </>
  );
}
