"use client";
/* One template for every feature page and the /features/ index. Copy from components/i18n/features/<locale>.ts
 * (English ships with the page, other languages load when chosen). Responsive: stacked on phones, split on desktop. */
import { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { SmartVideo } from "../ui/SmartVideo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useLocale } from "../i18n/LocaleProvider";
import type { Locale } from "../i18n/locales";
import { fen, type FDict } from "../i18n/features/en";
import { SITE } from "../config";
import { FEATURES, GROUPS, FEAT_NAV, type Feature } from "./data";
import { FICON } from "./ficons";
import { FeatureVisual } from "./visuals";
import { Compare5 } from "../home/home5b";
import { Reveal, RevealItem } from "../ui/Reveal";
import { ArrowRight, Check, Plus, CheckCircle, Lightning, Users, Clock, Warning } from "../ui/icons";
import { Split } from "../ui/Split";
import { PhotoBand, glassTile } from "../ui/PhotoBand";

const LOAD: Record<Locale, () => Promise<FDict>> = {
  en: async () => fen,
  tr: () => import("../i18n/features/tr").then((m) => m.ftr), de: () => import("../i18n/features/de").then((m) => m.fde), ar: () => import("../i18n/features/ar").then((m) => m.far),
  es: () => import("../i18n/features/es").then((m) => m.fes), ru: () => import("../i18n/features/ru").then((m) => m.fru), fr: () => import("../i18n/features/fr").then((m) => m.ffr),
  pl: () => import("../i18n/features/pl").then((m) => m.fpl),
};
function useFeatDict() { const { locale } = useLocale(); const [d, setD] = useState<FDict>(fen); useEffect(() => { LOAD[locale]().then(setD).catch(() => setD(fen)); }, [locale]); return d; }

const card = "rounded-[28px] bg-[var(--card)]";
/** A feature photograph: a /photos name, or "v3:<name>" for the /media/v3 set (both ship 800 and 1600 in AVIF and WebP). */
const Pic = ({ n, className = "", sizes = "(min-width:1024px) 50vw, 100vw" }: { n: string; className?: string; sizes?: string }) => {
  const b = n.startsWith("v3:") ? `/media/v3/${n.slice(3)}` : `/photos/${n}`;
  return (<picture><source srcSet={`${b}-800.avif 800w, ${b}-1600.avif 1600w`} sizes={sizes} type="image/avif" />
    <img src={`${b}-1600.webp`} srcSet={`${b}-800.webp 800w, ${b}-1600.webp 1600w`} sizes={sizes} alt="" loading="lazy" decoding="async" className={className} /></picture>); };
function Status({ f, c }: { f: Feature; c: FDict["common"] }) {
  return f.status === "live"
    ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--card)] px-3 py-1 text-[12px] font-medium text-ink-muted"><span className="h-1.5 w-1.5 rounded-full bg-calm-aqua" />{c.live}</span>
    : <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--card)] px-3 py-1 text-[12px] font-medium text-ink-muted"><span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />{c.soon}</span>;
}

export function FeaturePage({ slug }: { slug: string }) {
  const { locale, lang } = useLocale(); const d = useFeatDict(); const c = d.common; const t = FEAT_NAV[locale];
  const f = FEATURES.find((x) => x.slug === slug)!; const it = d.items[slug as keyof FDict["items"]]; const Ic = FICON[f.icon];
  const [open, setOpen] = useState<number | null>(0);
  const related = FEATURES.filter((x) => x.slug !== slug && x.group === f.group).concat(FEATURES.filter((x) => x.group !== f.group)).slice(0, 3);
  const PAIN_IC = [Warning, Clock, Users];
  return (<>
    <Header />
    <main id="main" className="home-v3 overflow-x-clip pt-[var(--header-h)]">
      {/* Hero */}
      <section className="container-x pb-16 pt-10 md:pt-16">
        <div className="grid-12 items-center gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <Link href="/features/" className="inline-flex min-h-11 items-center gap-1.5 text-[13px] text-ink-faint hover:text-ink"><ArrowRight size={12} aria-hidden="true" className="rotate-180 rtl:rotate-0" />{c.all}</Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="inline-flex items-center gap-2.5 text-[15px] font-medium text-ink-muted"><span className="grid h-9 w-9 place-items-center rounded-[11px] bg-[var(--card)] text-ink"><Ic size={18} /></span>{it.k}</p>
              <Status f={f} c={c} />
            </div>
            <h1 className="mt-6 max-w-[16ch] text-[clamp(32px,1rem+2vw,52px)] font-semibold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]"><Split text={it.h1} /></h1>
            <p className="mt-6 max-w-[32rem] text-[18px] leading-[1.6] text-ink-muted">{it.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.demo} className="btn btn-cta h-11 px-5 text-[15px]">{c.demo}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></a>
              <a href="#how" className="btn btn-secondary h-11 px-5 text-[15px]">{c.how}</a>
            </div>
            {f.status === "soon" && <p className="mt-6 flex max-w-[32rem] items-start gap-2 text-[14px] text-ink-faint"><Lightning size={15} aria-hidden="true" className="mt-0.5 shrink-0" />{c.soonNote}</p>}
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Tilt>
            <span aria-hidden="true" className="feat-glow pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgb(231_235_235/0.10),transparent_60%)]" />
            <div className="dark relative aspect-[4/5] overflow-hidden rounded-[32px] bg-[#161616] text-white sm:aspect-[5/4] lg:aspect-[4/4.2]">
              <Pic n={f.photo} className="absolute inset-0 h-full w-full scale-105 object-cover opacity-45 blur-[3px]" />
              <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(17_17_17/0.25),rgb(17_17_17/0.8))]" />
              <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-5"><FeatureVisual v={f.visual} mock={it.mock} lang={lang} /></div>
              <span className="absolute bottom-4 start-4 rounded-full bg-[rgb(17_17_17/0.7)] px-3 py-1 text-[12px] text-white/70">{c.sample}</span>
            </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* Why it matters: glass cards over a slow, blurred loop */}
      <section aria-labelledby="why-h" className="container-x py-10 md:py-14">
        <div className="dark relative overflow-hidden rounded-[32px] bg-[#141414] p-4 text-white md:p-8">
          <div aria-hidden="true" className="absolute inset-0"><img src={`/video/${VID[f.group]}.webp`} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-[6px]" />
            <SmartVideo name={VID[f.group]} poster={`/video/${VID[f.group]}.webp`} threshold={0.2} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-[6px]" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.5),rgb(17_17_17/0.8))]" /></div>
          <h2 id="why-h" className="relative px-2 pt-2 text-[15px] font-medium text-white/70">{c.why}</h2>
          <Reveal as="ul" stagger={0.1} className="relative mt-5 grid gap-3 md:grid-cols-3">
            {it.pains.map(([h, p], k) => { const I = PAIN_IC[k]; return (
              <RevealItem as="li" key={h}><m.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="h-full rounded-[22px] bg-[rgb(24_24_24/0.62)] p-6 md:p-7">
                <span className="relative grid h-11 w-11 place-items-center rounded-[14px] bg-white/10"><span aria-hidden="true" className="feat-ring absolute inset-0 rounded-[14px] ring-1 ring-white/30" /><I size={20} /></span>
                <h3 className="mt-7 text-[19px] font-semibold tracking-[-0.02em]">{h}</h3><p className="mt-2 text-[15px] leading-[1.55] text-white/70">{p}</p>
              </m.div></RevealItem>); })}
          </Reveal>
        </div>
      </section>

      {/* How it works: a line that fills as you scroll, steps on glass over the feature photograph */}
      <Steps steps={it.steps} title={c.how} photo={f.photo} />

      {/* Detail: photograph with points */}
      <section aria-labelledby="det-h" className="container-x py-12 md:py-16">
        <div className="grid-12 items-center gap-y-8">
          <div className="dark relative col-span-12 aspect-[4/3] overflow-hidden rounded-[32px] bg-[#161616] lg:col-span-6">
            <Pic n={f.photo} className="absolute inset-0 h-full w-full object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_45%,rgb(17_17_17/0.7)_100%)]" />
            <div className="absolute inset-x-5 bottom-5 rounded-[18px] bg-[rgb(20_20_20/0.78)] p-4 text-white">
              <p className="flex items-center gap-2 text-[14px] font-semibold"><Ic size={16} />{it.k}</p>
              <p className="mt-1 text-[13px] text-white/70">{t.items[slug][1]}</p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <h2 id="det-h" className="v3-h2">{it.detail.h}</h2>
            <p className="mt-5 text-[17px] leading-[1.6] text-ink-muted">{it.detail.p}</p>
            <ul className="mt-8 space-y-3">{it.detail.points.map((p) => <li key={p} className="flex items-center gap-3 text-[16px]"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-bg"><Check size={14} aria-hidden="true" /></span>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="ffaq-h" className="container-x py-12 md:py-16">
        <div className="grid-12 gap-y-8">
          <h2 id="ffaq-h" className="v3-h2 col-span-12 lg:col-span-4">{c.faqH}</h2>
          <ul className="col-span-12 space-y-2 lg:col-span-7 lg:col-start-6">
            {it.faq.map(([q, a], i) => { const on = open === i; return (
              <li key={q} className={`rounded-[20px] transition-colors ${on ? "bg-[var(--card)]" : "hover:bg-[var(--card)]/60"}`}>
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="flex min-h-16 w-full items-center justify-between gap-6 px-5 py-4 text-start text-[17px] font-semibold md:px-6">
                  {q}<span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--card-2)] text-ink-muted transition-transform ${on ? "rotate-45" : ""}`}><Plus size={15} aria-hidden="true" /></span></button>
                {on && <p className="measure px-5 pb-6 text-[16px] leading-[1.6] text-ink-muted md:px-6">{a}</p>}
              </li>); })}
          </ul>
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="rel-h" className="container-x py-12 md:py-16">
        <h2 id="rel-h" className="text-[15px] font-medium text-ink-muted">{c.related}</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">{related.map((x) => <FeatureCard key={x.slug} f={x} />)}</ul>
      </section>

      <End c={c} />
    </main>
    <Footer />
  </>);
}

/** Feature card: photograph on top, name, one line, arrow. `wide` lays it out side by side (a lone last card in a row). */
function FeatureCard({ f, wide = false }: { f: Feature; wide?: boolean }) {
  const { locale } = useLocale(); const t = FEAT_NAV[locale]; const Ic = FICON[f.icon]; const [h, line] = t.items[f.slug];
  return (
    <li className={wide ? "md:col-span-2" : ""}><Link href={`/features/${f.slug}/`} className={`group flex h-full flex-col overflow-hidden rounded-[24px] bg-[var(--card)] ring-1 ring-transparent transition-[background-color,box-shadow] duration-300 hover:bg-[var(--card-2)] hover:ring-line focus-visible:ring-line ${wide ? "md:grid md:grid-cols-[1fr_1.1fr]" : ""}`}>
      <span className={`dark relative block overflow-hidden bg-[#1a1a1a] ${wide ? "aspect-[16/10] md:aspect-auto md:h-full md:min-h-[220px]" : "aspect-[16/10]"}`}>
        <Pic n={f.photo} sizes="(min-width:1024px) 30vw, 100vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.35)_0%,rgb(17_17_17/0)_40%)]" />
        <span className="absolute start-3 top-3 grid h-9 w-9 place-items-center rounded-[11px] bg-[rgb(17_17_17/0.72)] text-white backdrop-blur-sm"><Ic size={17} /></span>
        {f.status === "soon" && <span className="absolute end-3 top-3 rounded-full bg-[rgb(17_17_17/0.72)] px-2.5 py-1 text-[12px] font-medium text-white/85 backdrop-blur-sm">{t.soon}</span>}
      </span>
      <span className="flex flex-1 flex-col p-5 md:p-6"><span className="text-[18px] font-semibold tracking-[-0.015em]">{h}</span><span className="mt-1.5 text-[15px] leading-[1.5] text-ink-muted">{line}</span>
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-[14px] font-medium text-ink-faint transition-colors group-hover:text-ink">{t.how}<ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100" /></span></span>
    </Link></li>);
}

/** The lead feature of a stage: copy on one side, the live product visual over its photograph on the other. */
function LeadCard({ f, d }: { f: Feature; d: FDict }) {
  const { locale, lang } = useLocale(); const t = FEAT_NAV[locale]; const c = d.common; const Ic = FICON[f.icon]; const [h, line] = t.items[f.slug];
  const it = d.items[f.slug as keyof FDict["items"]];
  return (
    <li className="md:col-span-2"><Link href={`/features/${f.slug}/`} className="group grid overflow-hidden rounded-[28px] bg-[var(--card)] ring-1 ring-transparent transition-[background-color,box-shadow] duration-300 hover:bg-[var(--card-2)] hover:ring-line md:grid-cols-[0.85fr_1.15fr]">
      <span className="flex flex-col p-6 md:p-8">
        <span className="flex flex-wrap items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[var(--card-2)] text-ink transition-colors group-hover:bg-[var(--card)]"><Ic size={19} /></span><Status f={f} c={c} /></span>
        <span className="mt-8 text-[clamp(24px,1rem+0.8vw,30px)] font-semibold leading-[1.1] tracking-[-0.03em]">{h}</span>
        <span className="mt-3 text-[16px] leading-[1.55] text-ink-muted">{it?.sub ?? line}</span>
        <span className="mt-auto flex items-center gap-1.5 pt-8 text-[15px] font-medium text-ink">{t.how}<ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100" /></span>
      </span>
      <span className="dark relative block min-h-[340px] overflow-hidden bg-[#161616] text-white md:min-h-[420px]">
        <Pic n={f.photo} sizes="(min-width:1024px) 40vw, 100vw" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-55 blur-[3px] transition-transform duration-700 group-hover:scale-[1.08]" />
        <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(17_17_17/0.2),rgb(17_17_17/0.78))]" />
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-5 md:p-7"><FeatureVisual v={f.visual} mock={it?.mock ?? []} lang={lang} /></span>
        <span className="absolute bottom-3 start-3 rounded-full bg-[rgb(17_17_17/0.7)] px-3 py-1 text-[12px] text-white/70">{c.sample}</span>
      </span>
    </Link></li>);
}

/* Closing card: the text on glass beside the iPhone and iPad on one stand with the live Flexlore screens in them (the same
   CtaDuo as the home page), so the devices are never shown switched off. */
const Duo = dynamic(() => import("../home/CtaDuo").then((x) => x.CtaDuo), { ssr: false, loading: () => <div className="aspect-[2752/1536] w-full" /> });
function End({ c }: { c: FDict["common"] }) {
  const { lang } = useLocale();
  return (
    <section className="container-x pb-[var(--section-y)] pt-10">
      <PhotoBand img="saha-iskele-pov" pos="50% 45%" dim={0.4} className="grid items-center gap-6 p-4 md:p-6 lg:grid-cols-12 lg:gap-8">
        <div className={`order-last ${glassTile} p-6 md:p-8 lg:order-first lg:col-span-5`}>
          <p className="text-[clamp(26px,1rem+1.5vw,40px)] font-semibold leading-[1.06] tracking-[-0.04em]"><Split text={c.endH} /></p><p className="mt-4 text-[16px] leading-[1.55] text-white/70">{c.endP}</p>
          <a href={SITE.demo} className="btn btn-cta mt-7 h-11 px-5 text-[15px]">{c.demo}<ArrowRight size={15} aria-hidden="true" className="rtl:-scale-x-100" /></a>
        </div>
        <div className="lg:col-span-7"><Duo lang={lang} /></div>
      </PhotoBand>
    </section>);
}

const VID: Record<string, string> = { create: "kitchen", spread: "coffee", manage: "hotel2" };

/** Pointer tilt (a few degrees) for the hero visual; off under reduced motion and on touch. */
function Tilt({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion(); const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 18 }); const ry = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 18 });
  return (<m.div className="relative [perspective:1200px]" onPointerMove={(e) => { if (reduce || e.pointerType !== "mouse") return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
    onPointerLeave={() => { x.set(0); y.set(0); }}><m.div style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>{children}</m.div></m.div>);
}

function Steps({ steps, title, photo }: { steps: string[][]; title: string; photo: string }) {
  const ref = useRef<HTMLElement>(null); const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] }); const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [lit, setLit] = useState(reduce ? 3 : 0);
  useEffect(() => fill.on("change", (v) => setLit(Math.min(3, Math.floor(v * 3.2 + 0.4)))), [fill]);
  return (
    <section id="how" ref={ref} aria-labelledby="how-h" className="container-x py-10 md:py-14">
      <div className="dark relative overflow-hidden rounded-[32px] bg-[#141414] p-5 text-white md:p-10">
        <Pic n={photo} className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(17_17_17/0.4),rgb(17_17_17/0.9))]" />
        <h2 id="how-h" className="v3-h2 relative">{title}</h2>
        <div className="relative mt-10">
          <span aria-hidden="true" className="absolute start-[22px] top-[22px] hidden h-[2px] w-[calc(100%-44px)] bg-white/10 md:block" />
          <m.span aria-hidden="true" style={reduce ? undefined : { scaleX: fill }} className="absolute start-[22px] top-[22px] hidden h-[2px] w-[calc(100%-44px)] origin-left bg-[#E7EBEB] md:block rtl:origin-right" />
          <ol className="relative grid gap-3 md:grid-cols-3 md:gap-5">
            {steps.map(([h, p], k) => (
              <li key={h} className="md:pe-4">
                <span className={`relative z-10 grid h-11 w-11 place-items-center rounded-full text-[15px] font-semibold tabular-nums ring-1 transition-colors duration-500 ${lit > k ? "bg-[#E7EBEB] text-[#111] ring-transparent" : "bg-[#1c1c1c] text-white/70 ring-white/15"}`}>{k + 1}</span>
                <div className="mt-5 rounded-[22px] bg-[rgb(24_24_24/0.6)] p-6">
                  <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{h}</h3><p className="mt-2 text-[15px] leading-[1.55] text-white/70">{p}</p>
                </div>
              </li>))}
          </ol>
        </div>
      </div>
    </section>);
}

/* /features/: the product as one flow. A hero with the three stages in order (capture, roll out, manage), a sticky bar to
 * jump between them and filter by what is available today, then one section per stage: its purpose on the left, a lead
 * card with the live product visual and the other features in an even grid (a lone last card spans the row). */
const LEAD: Record<string, true> = { "video-to-sop": true, "auto-translation": true, "permissions-workspaces": true };
type Filter = "all" | "live" | "soon";
export function FeaturesIndex() {
  const { locale } = useLocale(); const d = useFeatDict(); const c = d.common; const t = FEAT_NAV[locale];
  const [filter, setFilter] = useState<Filter>("all"); const [cur, setCur] = useState<string>("");
  const shown = (g: string) => FEATURES.filter((f) => f.group === g && (filter === "all" || f.status === filter));
  const groups = GROUPS.filter((g) => shown(g).length > 0);
  /* Which stage is on screen, for the sticky bar. */
  useEffect(() => {
    const els = ["g-top", ...GROUPS.map((g) => `g-${g}`)].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) setCur(e.target.id === "g-top" ? "" : e.target.id.slice(2)); }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el)); return () => io.disconnect();
  }, [filter]);
  const count = (g: string, s?: "live" | "soon") => FEATURES.filter((f) => f.group === g && (!s || f.status === s)).length;
  const total = (s?: "live" | "soon") => FEATURES.filter((f) => !s || f.status === s).length;
  return (<>
    <Header />
    <main id="main" className="home-v3 overflow-x-clip pt-[var(--header-h)]">
      {/* Hero: the promise, then the three stages as a numbered flow. */}
      <section id="g-top" className="container-x pb-12 pt-12 md:pb-16 md:pt-20">
        <p className="inline-flex items-center gap-2 text-[15px] font-medium text-ink-muted"><CheckCircle size={16} />{c.indexK}</p>
        <h1 className="mt-5 max-w-[22ch] text-[clamp(34px,1rem+2.6vw,60px)] font-semibold leading-[1.02] tracking-[-0.045em] [text-wrap:balance]"><Split text={c.indexH} /></h1>
        <p className="mt-5 max-w-[40rem] text-[18px] leading-[1.6] text-ink-muted">{c.indexP}</p>
        <ol className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
          {GROUPS.map((g, k) => { const fs = FEATURES.filter((f) => f.group === g); return (
            <li key={g} className="relative">
              <a href={`#g-${g}`} className="group flex h-full flex-col rounded-[24px] bg-[var(--card)] p-6 ring-1 ring-transparent transition-[background-color,box-shadow] duration-300 hover:bg-[var(--card-2)] hover:ring-line md:p-7">
                <span className="flex items-center justify-between"><span className="text-[14px] font-semibold tabular-nums text-flame">0{k + 1}</span>
                  <ArrowRight size={16} aria-hidden="true" className="rotate-90 text-ink-faint transition-transform group-hover:translate-y-0.5" /></span>
                <span className="mt-6 text-[24px] font-semibold tracking-[-0.025em]">{t.groups[g]}</span>
                <span className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{t.lines[g]}</span>
                <span className="mt-auto flex items-center gap-3 pt-7">
                  <span aria-hidden="true" className="flex -space-x-2 rtl:space-x-reverse">{fs.slice(0, 4).map((f) => <span key={f.slug} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-[var(--card)] transition-[box-shadow] group-hover:ring-[var(--card-2)]"><Pic n={f.photo} sizes="72px" className="h-full w-full object-cover" /></span>)}</span>
                  <span className="flex flex-wrap gap-x-3 text-[13px] text-ink-faint">{count(g, "live") > 0 && <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-calm-aqua" />{count(g, "live")} {t.now.toLowerCase()}</span>}{count(g, "soon") > 0 && <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />{count(g, "soon")} {t.soon.toLowerCase()}</span>}</span>
                </span>
              </a>
              {k < 2 && <span aria-hidden="true" className="absolute -end-[14px] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-bg text-ink-faint ring-1 ring-line md:grid"><ArrowRight size={13} className="rtl:-scale-x-100" /></span>}
            </li>); })}
        </ol>
      </section>

      {/* Sticky bar: jump to a stage (from md up), filter by availability (always). */}
      <div className="sticky top-[var(--header-h)] z-30 border-y border-line bg-[rgb(var(--bg-rgb)/0.86)] backdrop-blur-xl">
        <div className="container-x flex items-center justify-center gap-4 overflow-x-auto py-2 [scrollbar-width:none] md:justify-between md:py-0">
          <nav aria-label={c.indexK} className="hidden shrink-0 items-center gap-1 py-2 md:flex">
            {groups.map((g) => { const k = GROUPS.indexOf(g); const on = cur === g; return (
              <a key={g} href={`#g-${g}`} aria-current={on ? "true" : undefined} className={`inline-flex h-11 items-center gap-2 rounded-full px-3.5 text-[14px] font-medium transition-colors ${on ? "bg-[var(--card-2)] text-ink" : "text-ink-muted hover:text-ink"}`}>
                <span className={`tabular-nums ${on ? "text-flame" : "text-ink-faint"}`}>0{k + 1}</span>{t.groups[g]}</a>); })}
          </nav>
          <div role="group" aria-label={`${t.every} / ${t.now} / ${t.soon}`} className="flex shrink-0 items-center gap-0.5 rounded-full bg-[var(--card)] p-0.5">
            {([["all", t.every, total()], ["live", t.now, total("live")], ["soon", t.soon, total("soon")]] as [Filter, string, number][]).map(([k, label, n]) => (
              <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}
                className={`inline-flex h-11 min-w-11 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors ${filter === k ? "bg-ink text-bg" : "text-ink-muted hover:text-ink"}`}>
                {k !== "all" && <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${k === "live" ? "bg-calm-aqua" : "bg-ink-faint"}`} />}{label}<span className={`tabular-nums ${filter === k ? "opacity-60" : "text-ink-faint"}`}>{n}</span></button>))}
          </div>
        </div>
      </div>

      {groups.map((g) => { const k = GROUPS.indexOf(g); const fs = shown(g); const lead = fs.find((f) => LEAD[f.slug]) ?? (fs.length > 1 && fs.length % 2 === 1 ? fs[0] : undefined);
        const rest = fs.filter((f) => f !== lead); return (
        <section key={g} id={`g-${g}`} aria-labelledby={`gh-${g}`} className="container-x scroll-mt-[calc(var(--header-h)+80px)] py-12 md:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4"><div className="lg:sticky lg:top-[calc(var(--header-h)+104px)]">
              <p className="text-[14px] font-semibold tabular-nums text-flame">0{k + 1}<span className="text-ink-faint"> / 03</span></p>
              <h2 id={`gh-${g}`} className="mt-3 text-[clamp(30px,1rem+1.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.035em]">{t.groups[g]}</h2>
              <p className="mt-4 max-w-[24rem] text-[17px] leading-[1.6] text-ink-muted">{t.lines[g]}</p>
              <p className="mt-6 flex flex-wrap gap-2 text-[13px] text-ink-muted">
                {count(g, "live") > 0 && <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--card)] px-3 py-1"><span className="h-1.5 w-1.5 rounded-full bg-calm-aqua" />{count(g, "live")} {t.now.toLowerCase()}</span>}
                {count(g, "soon") > 0 && <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--card)] px-3 py-1"><span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />{count(g, "soon")} {t.soon.toLowerCase()}</span>}
              </p>
            </div></div>
            <ul className="grid gap-3 md:grid-cols-2 md:gap-4 lg:col-span-8">
              {lead && <LeadCard f={lead} d={d} />}
              {rest.map((f, i) => <FeatureCard key={f.slug} f={f} wide={rest.length % 2 === 1 && i === rest.length - 1} />)}
            </ul>
          </div>
        </section>); })}
      <div className="pt-[var(--section-y)]"><Compare5 /></div>
      <End c={c} />
    </main>
    <Footer />
  </>);
}
