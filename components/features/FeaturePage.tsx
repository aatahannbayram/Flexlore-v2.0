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

/** Feature card: glass card with the photograph inset on top, name, one line, and an arrow chip. `wide` lays it out side
 *  by side (a lone last card in a row). */
function FeatureCard({ f, wide = false }: { f: Feature; wide?: boolean }) {
  const { locale } = useLocale(); const t = FEAT_NAV[locale]; const Ic = FICON[f.icon]; const [h, line] = t.items[f.slug];
  return (
    <li className={wide ? "md:col-span-2" : ""}><Link href={`/features/${f.slug}/`} className={`glass-card group flex h-full flex-col rounded-[26px] p-2 ${wide ? "md:grid md:grid-cols-[1fr_1fr] md:gap-2" : ""}`}>
      <span className={`dark relative block overflow-hidden rounded-[20px] bg-[#1a1a1a] ${wide ? "aspect-[16/10] md:aspect-auto md:h-full md:min-h-[230px]" : "aspect-[16/10]"}`}>
        <Pic n={f.photo} sizes="(min-width:1024px) 30vw, 100vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.4)_0%,rgb(17_17_17/0)_38%,rgb(17_17_17/0)_70%,rgb(17_17_17/0.3)_100%)]" />
        <span className="absolute start-3 top-3 grid h-9 w-9 place-items-center rounded-[11px] bg-[rgb(17_17_17/0.55)] text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] backdrop-blur-md"><Ic size={17} /></span>
        {f.status === "soon" && <span className="absolute end-3 top-3 rounded-full bg-[rgb(17_17_17/0.55)] px-2.5 py-1 text-[12px] font-medium text-white/85 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] backdrop-blur-md">{t.soon}</span>}
      </span>
      <span className="flex flex-1 flex-col px-4 pb-4 pt-5 md:px-5">
        <span className="text-[18px] font-semibold tracking-[-0.02em]">{h}</span><span className="mt-1.5 text-[15px] leading-[1.5] text-ink-muted">{line}</span>
        <span className="mt-auto flex items-center justify-between pt-5 text-[13px] font-medium text-ink-faint transition-colors group-hover:text-ink">{t.how}
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--card-2)] text-ink-muted shadow-[inset_0_0_0_1px_var(--color-line)] transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-ink rtl:group-hover:-translate-x-0.5"><ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></span></span>
      </span>
    </Link></li>);
}

/** The lead feature of a stage: copy on one side, the live product visual over its photograph on the other, in one glass card. */
function LeadCard({ f, d }: { f: Feature; d: FDict }) {
  const { locale, lang } = useLocale(); const t = FEAT_NAV[locale]; const c = d.common; const Ic = FICON[f.icon]; const [h, line] = t.items[f.slug];
  const it = d.items[f.slug as keyof FDict["items"]];
  return (
    <li className="md:col-span-2"><Link href={`/features/${f.slug}/`} className="glass-card group grid gap-2 rounded-[30px] p-2 md:grid-cols-[0.85fr_1.15fr]">
      <span className="flex flex-col p-5 md:p-7">
        <span className="flex flex-wrap items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[var(--card-2)] text-ink shadow-[inset_0_0_0_1px_var(--color-line)]"><Ic size={19} /></span><Status f={f} c={c} /></span>
        <span className="mt-8 text-[clamp(24px,1rem+0.8vw,30px)] font-semibold leading-[1.1] tracking-[-0.03em]">{h}</span>
        <span className="mt-3 text-[16px] leading-[1.55] text-ink-muted">{it?.sub ?? line}</span>
        <span className="mt-auto flex items-center gap-2 pt-8 text-[14px] font-medium text-ink">{t.how}
          <span className="grid h-8 w-8 place-items-center rounded-full bg-flame text-white transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"><ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></span></span>
      </span>
      <span className="dark relative block min-h-[340px] overflow-hidden rounded-[24px] bg-[#161616] text-white md:min-h-[430px]">
        <Pic n={f.photo} sizes="(min-width:1024px) 40vw, 100vw" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-60 blur-[3px] transition-transform duration-700 group-hover:scale-[1.08]" />
        <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(17_17_17/0.15),rgb(17_17_17/0.75))]" />
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-5 md:p-7"><FeatureVisual v={f.visual} mock={it?.mock ?? []} lang={lang} /></span>
        <span className="absolute bottom-3 start-3 rounded-full bg-[rgb(17_17_17/0.6)] px-3 py-1 text-[12px] text-white/70 backdrop-blur-md">{c.sample}</span>
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
          <a href={SITE.demo} className="mt-6 inline-grid min-h-11 place-items-center"><span className="btn btn-cta !h-[38px] !min-h-[38px] !px-4 !text-[14px]">{c.demo}<ArrowRight size={14} aria-hidden="true" className="rtl:-scale-x-100" /></span></a>
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

/* /features/: the product as one flow. An ember hero with the promise and the three stages as glass cards (capture, roll
 * out, manage), a sticky bar to jump between them and filter by what is available today, then one section per stage: its
 * purpose on the left, glass cards on the right over a soft glow of the stage's photographs. Buttons are slim, like the header. */
const LEAD: Record<string, true> = { "video-to-sop": true, "auto-translation": true, "permissions-workspaces": true };
type Filter = "all" | "live" | "soon";
export function FeaturesIndex() {
  const { locale } = useLocale(); const d = useFeatDict(); const c = d.common; const t = FEAT_NAV[locale];
  const [filter, setFilter] = useState<Filter>("all"); const [cur, setCur] = useState<string>("");
  const shown = (g: string) => FEATURES.filter((f) => f.group === g && (filter === "all" || f.status === filter));
  const groups = GROUPS.filter((g) => shown(g).length > 0);
  /* Which stage is on screen, for the sticky bar (none while the hero is in view). */
  useEffect(() => {
    const els = ["g-top", ...GROUPS.map((g) => `g-${g}`)].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) setCur(e.target.id === "g-top" ? "" : e.target.id.slice(2)); }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el)); return () => io.disconnect();
  }, [filter]);
  const count = (g: string, s?: "live" | "soon") => FEATURES.filter((f) => f.group === g && (!s || f.status === s)).length;
  const total = (s?: "live" | "soon") => FEATURES.filter((f) => !s || f.status === s).length;
  const Dots = ({ g, glass = false }: { g: string; glass?: boolean }) => (<span className="flex flex-wrap gap-2 text-[13px]">
    {count(g, "live") > 0 && <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${glass ? "bg-white/[.07] text-white/75" : "bg-[var(--card)] text-ink-muted"}`}><span className="h-1.5 w-1.5 rounded-full bg-calm-aqua" />{count(g, "live")} {t.now.toLowerCase()}</span>}
    {count(g, "soon") > 0 && <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${glass ? "bg-white/[.07] text-white/75" : "bg-[var(--card)] text-ink-muted"}`}><span className={`h-1.5 w-1.5 rounded-full ${glass ? "bg-white/40" : "bg-ink-faint"}`} />{count(g, "soon")} {t.soon.toLowerCase()}</span>}</span>);
  return (<>
    <Header overDark />
    <main id="main" className="home-v3 overflow-x-clip">
      <div>
      {/* Hero: ember ground, a large two-tone headline, slim buttons, then the three stages as glass cards in order. */}
      <header id="g-top" className="ember dark pb-14 pt-[calc(var(--header-h)+56px)] text-white md:pb-20 md:pt-[calc(var(--header-h)+96px)]">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/[.07] py-1 pe-3 ps-2 text-[13px] font-medium text-white/75 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)] backdrop-blur-md"><span className="grid h-5 w-5 place-items-center rounded-full bg-flame text-white"><CheckCircle size={12} weight="fill" /></span>{c.indexK} · {total()}</p>
          <h1 className="mt-7 max-w-[17ch] text-[clamp(40px,1rem+4vw,88px)] font-semibold leading-[0.98] tracking-[-0.05em] [text-wrap:balance]"><Split text={c.indexH} /></h1>
          <p className="mt-6 max-w-[38rem] text-[18px] leading-[1.6] text-white/65">{c.indexP}</p>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <a href={SITE.demo} className="grid min-h-11 place-items-center"><span className="btn btn-cta !h-[38px] !min-h-[38px] !px-4 !text-[14px]">{c.demo}</span></a>
            <a href="#g-create" className="grid min-h-11 place-items-center"><span className="btn btn-glass-2 !h-[38px] !min-h-[38px] !px-4 !text-[14px]">{t.how}<ArrowRight size={13} aria-hidden="true" className="rotate-90" /></span></a>
          </div>
          </div>
          {/* Desktop: the lead feature of each stage as three overlapping photo cards with a glass label. */}
          <div aria-hidden="true" className="relative hidden h-[480px] lg:col-span-5 lg:block">
            {GROUPS.map((g, k) => { const f = FEATURES.find((x) => x.group === g && LEAD[x.slug])!; const Ic = FICON[f.icon];
              const pos = ["start-0 top-0 z-[1] -rotate-[4deg]", "end-0 top-[26%] z-[2] rotate-[3deg]", "start-[12%] bottom-0 z-[3] -rotate-[1deg]"][k];
              return (
              <div key={g} className={`absolute w-[54%] ${pos} glass-card rounded-[24px] p-1.5`}>
                <div className="dark relative aspect-[4/3] overflow-hidden rounded-[19px]"><Pic n={f.photo} sizes="360px" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(17_17_17/0.7))]" />
                  <span className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-2 rounded-[14px] bg-[rgb(17_17_17/0.55)] px-3 py-2 text-[13px] font-medium text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)] backdrop-blur-md">
                    <Ic size={15} /><span className="truncate">{t.items[f.slug][0]}</span><span className="ms-auto shrink-0 text-[12px] tabular-nums text-flame">0{k + 1}</span></span></div>
              </div>); })}
          </div>
          </div>
          <ol className="mt-14 grid gap-3 md:mt-20 md:grid-cols-3 md:gap-4 lg:mt-24">
            {GROUPS.map((g, k) => { const fs = FEATURES.filter((f) => f.group === g); return (
              <li key={g} className="relative">
                <a href={`#g-${g}`} className="glass-card group relative flex h-full flex-col overflow-hidden rounded-[26px] p-6 md:p-7">
                  <span aria-hidden="true" className="pointer-events-none absolute -bottom-7 -end-1 select-none text-[120px] font-semibold leading-none tracking-[-0.06em] text-white/[.04]">0{k + 1}</span>
                  <span className="relative flex items-center justify-between"><span className="text-[13px] font-semibold tabular-nums text-flame">0{k + 1}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/[.07] text-white/60 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)] transition-[transform,color] group-hover:translate-y-0.5 group-hover:text-white"><ArrowRight size={13} aria-hidden="true" className="rotate-90" /></span></span>
                  <span className="relative mt-8 text-[26px] font-semibold tracking-[-0.03em]">{t.groups[g]}</span>
                  <span className="relative mt-2 text-[15px] leading-[1.55] text-white/60">{t.lines[g]}</span>
                  <span className="relative mt-auto flex flex-wrap items-center gap-3 pt-8">
                    <span aria-hidden="true" className="flex -space-x-2.5 rtl:space-x-reverse">{fs.slice(0, 4).map((f) => <span key={f.slug} className="relative block h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#1d1d1d]"><Pic n={f.photo} sizes="72px" className="h-full w-full object-cover" /></span>)}</span>
                    <Dots g={g} glass />
                  </span>
                </a>
                {k < 2 && <span aria-hidden="true" className="absolute -end-[15px] top-1/2 z-10 hidden h-[30px] w-[30px] -translate-y-1/2 place-items-center rounded-full bg-[#1a1a1a] text-white/60 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12),0_6px_16px_rgb(0_0_0/0.5)] md:grid"><ArrowRight size={13} className="rtl:-scale-x-100" /></span>}
              </li>); })}
          </ol>
        </div>
      </header>
      </div>

      {/* Sticky bar: jump to a stage (from md up), filter by availability (always). Slim pills, 44 px tap areas. */}
      <div className="sticky top-[var(--header-h)] z-30 border-b border-line bg-[rgb(var(--bg-rgb)/0.78)] backdrop-blur-xl">
        <div className="container-x flex items-center justify-center gap-4 overflow-x-auto [scrollbar-width:none] md:justify-between">
          <nav aria-label={c.indexK} className="hidden shrink-0 items-center md:flex">
            {groups.map((g) => { const k = GROUPS.indexOf(g); const on = cur === g; return (
              <a key={g} href={`#g-${g}`} aria-current={on ? "true" : undefined} className="seg"><span><span className={`tabular-nums ${on ? "text-flame" : "text-ink-faint"}`}>0{k + 1}</span>{t.groups[g]}</span></a>); })}
          </nav>
          <div role="group" aria-label={`${t.every} / ${t.now} / ${t.soon}`} className="flex shrink-0 items-center">
            {([["all", t.every, total()], ["live", t.now, total("live")], ["soon", t.soon, total("soon")]] as [Filter, string, number][]).map(([k, label, n]) => (
              <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)} className="seg min-w-11"><span>
                {k !== "all" && <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${k === "live" ? "bg-calm-aqua" : "bg-ink-faint"}`} />}{label}<span className="tabular-nums text-ink-faint">{n}</span></span></button>))}
          </div>
        </div>
      </div>

      {groups.map((g) => { const k = GROUPS.indexOf(g); const fs = shown(g); const lead = fs.find((f) => LEAD[f.slug]) ?? (fs.length > 1 && fs.length % 2 === 1 ? fs[0] : undefined);
        const rest = fs.filter((f) => f !== lead); const glow = (lead ?? fs[0]).photo; return (
        <section key={g} id={`g-${g}`} aria-labelledby={`gh-${g}`} className="container-x relative scroll-mt-[calc(var(--header-h)+60px)] py-14 md:py-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4"><div className="lg:sticky lg:top-[calc(var(--header-h)+100px)]">
              <p className="text-[13px] font-semibold tabular-nums text-flame">0{k + 1}<span className="text-ink-faint"> / 03</span></p>
              <h2 id={`gh-${g}`} className="mt-3 text-[clamp(32px,1rem+2vw,52px)] font-semibold leading-[1.02] tracking-[-0.04em]">{t.groups[g]}</h2>
              <p className="mt-4 max-w-[24rem] text-[17px] leading-[1.6] text-ink-muted">{t.lines[g]}</p>
              <div className="mt-6"><Dots g={g} /></div>
            </div></div>
            <div className="relative lg:col-span-8">
              {/* A soft glow of the stage's photograph behind the glass. */}
              <span aria-hidden="true" className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 overflow-hidden opacity-[.22] blur-[70px] [mask-image:radial-gradient(closest-side,#000,transparent)]"><Pic n={glow} sizes="400px" className="h-full w-full scale-110 object-cover" /></span>
              <span aria-hidden="true" className="pointer-events-none absolute -end-10 top-10 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(236_103_38/0.16),transparent_65%)] blur-2xl" />
              <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
                {lead && <LeadCard f={lead} d={d} />}
                {rest.map((f, i) => <FeatureCard key={f.slug} f={f} wide={rest.length % 2 === 1 && i === rest.length - 1} />)}
              </ul>
            </div>
          </div>
        </section>); })}
      <div className="pt-[var(--section-y)]"><Compare5 /></div>
      <End c={c} />
    </main>
    <Footer />
  </>);
}
