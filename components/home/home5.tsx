"use client";
/* Home page sections, all reading one dictionary (components/i18n/home/<locale>.ts) through useLocale().
 * Visual rules: one calm dark ground, slightly raised cards, icons instead of eyebrow rules, real work photos and
 * loops behind every product fragment, orange used once per view. Product fragments are drawn in HTML with sample
 * content and labelled. Planned features (MCP / AI assistants) are labelled "coming soon". */
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { SITE, PLANS, savePct } from "../config";
import { useLocale, fmt } from "../i18n/LocaleProvider";
import { LOCALES } from "../i18n/locales";
import { Device, WorkScreen } from "../AppScreens";
import { StoreButtons } from "../Icons";
import { Rotator } from "../ui/Rotator";
import { VideoModal } from "../ui/VideoModal";
import { SmartVideo } from "../ui/SmartVideo";
import { Reveal, RevealItem, EASE } from "../ui/Reveal";
import { MagneticButton } from "../ui/MagneticButton";
import {
  ArrowRight, Play, Pause, Check, CheckCircle, Users, BookOpen, Sparkle, MapPin, LockSimple, FilmSlate, ListChecks, Question, ChartBar,
  Recycle, ArrowsClockwise, Books, Plus, ShieldCheck, CookingPot, GraduationCap, UserPlus, Storefront, FirstAid, ChalkboardTeacher, Barbell, Ticket, DotsThreeCircle,
  PlugsConnected, ChatCircle, Tag, Lightning, Buildings, ForkKnife, Factory, Bed,
} from "../ui/icons";

const Editor = dynamic(() => import("../AppScreensStory").then((x) => x.EditorScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Quiz = dynamic(() => import("../AppScreensStory").then((x) => x.QuizScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });
const Ready = dynamic(() => import("../AppScreensStory").then((x) => x.ReadyScreen), { ssr: false, loading: () => <div className="absolute inset-0 bg-[#111]" /> });

/* ---------- shared bits ---------- */
export type Ic = (p: { size?: number; className?: string; weight?: "fill" | "regular" }) => React.ReactElement;
export const Pic = ({ n, sizes = "50vw", className = "", eager = false }: { n: string; sizes?: string; className?: string; eager?: boolean }) => (
  <picture><source srcSet={`/photos/${n}-800.avif 800w, /photos/${n}-1600.avif 1600w`} sizes={sizes} type="image/avif" />
    <img src={`/photos/${n}-1600.webp`} srcSet={`/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w`} sizes={sizes} alt="" loading={eager ? "eager" : "lazy"} className={className} /></picture>);
/** Section label: an icon chip and a word. Replaces the dot-and-rule eyebrows. */
export const Label = ({ icon: I, children }: { icon: Ic; children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2.5 text-[15px] font-medium text-ink-muted"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--card)] text-ink"><I size={16} /></span>{children}</p>);
export const H2 = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => <h2 id={id} className={`v3-h2 mt-5 ${className}`}>{children}</h2>;
export const card = "relative overflow-hidden rounded-[28px] bg-[var(--card)]";
export const inner = "rounded-[18px] bg-[var(--card-2)]";
export const Corner = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} aria-label={label} className="absolute end-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-[var(--card-2)] text-ink transition-transform duration-300 hover:scale-105 md:end-6 md:top-6">
    <ArrowRight size={16} aria-hidden="true" className="-rotate-45 rtl:-scale-x-100" /></Link>);
export const Title = ({ a, b }: { a: string; b: string }) => <h3 className="max-w-[18ch] text-[23px] font-semibold leading-[1.15] tracking-[-0.025em] md:text-[27px]">{a} <span className="text-ink-faint">{b}</span></h3>;

/* ---------- 1. Hero ---------- */
export function Hero5() {
  const { d, lang, locale } = useLocale(); const h = d.hero; const [demo, setDemo] = useState(false);
  return (
    <section aria-labelledby="hero-h" className="relative isolate overflow-hidden pt-[var(--header-h)]">
      <div className="container-x">
        <div className="grid-12 min-h-[min(calc(100svh-var(--header-h)),860px)] items-center gap-y-12 pb-14 pt-8 lg:py-10">
          <div className="col-span-12 lg:col-span-6">
            <p className="hs-in inline-flex items-center gap-2.5 rounded-full bg-[var(--card)] py-1.5 pe-4 ps-2.5 text-[13px] text-ink-muted ring-1 ring-line">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
              <span>{h.rotPre}<Rotator key={locale} words={h.rot} />{h.rotPost}</span>
            </p>
            <h1 id="hero-h" className="mt-7 max-w-[15ch] text-[clamp(40px,1rem+3vw,68px)] font-[620] leading-[0.98] tracking-[-0.045em] [text-wrap:balance]">
              <span className="block">{h.h1a}</span><span className="block text-ink-faint">{h.h1b}</span>
            </h1>
            <p className="hs-in mt-6 max-w-[30rem] text-[18px] leading-[1.6] text-ink-muted" style={{ animationDelay: "200ms" }}>{h.sub}</p>
            <div className="hs-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "300ms" }}>
              <MagneticButton href={SITE.demo}>{d.nav.cta}</MagneticButton>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-secondary"><Play size={14} weight="fill" aria-hidden="true" />{h.watch}</button>
            </div>
            <div className="hs-in mt-9 flex flex-wrap items-center gap-x-4 gap-y-3" style={{ animationDelay: "380ms" }}>
              <span className="text-[13px] text-ink-faint">{h.app}</span>
              <StoreButtons small lang={lang} className="[&_img]:!h-9 [&_a]:!rounded-[7px]" />
            </div>
          </div>
          {/* One scene: the kitchen, one phone in front of it, one status card. */}
          <div className="col-span-12 lg:col-span-6">
            <div className="hs-device relative mx-auto aspect-[4/5] max-w-[560px] lg:me-0" style={{ animationDelay: "250ms" }}>
              <div className="dark absolute inset-y-0 end-0 w-[86%] overflow-hidden rounded-[32px] bg-[#2a2622]">
                <Pic n="kitchenline" eager sizes="(min-width:1024px) 40vw, 90vw" className="absolute inset-0 h-full w-full object-cover object-[35%_center]" />
                <SmartVideo name="kitchen" poster="/photos/kitchenline-1600.webp" threshold={0.2} className="absolute inset-0 h-full w-full object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(200deg,rgb(17_17_17/0)_40%,rgb(17_17_17/0.55)_100%)]" />
                <span className="absolute end-4 top-4 inline-flex items-center gap-2 rounded-full bg-[rgb(17_17_17/0.7)] px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur"><span className="h-2 w-2 rounded-full bg-[#E54A4A]" />{h.live}</span>
              </div>
              <div className="absolute bottom-[6%] start-0 w-[46%] max-w-[250px]"><Device label={h.chip.t}><WorkScreen active lang={lang} /></Device></div>
              <div className="absolute bottom-[10%] end-[6%] w-[44%] max-w-[230px] rounded-[20px] bg-[rgb(var(--bg-rgb)/0.9)] p-4 ring-1 ring-line backdrop-blur-md">
                <div className="flex items-center justify-between gap-2"><p className="text-[14px] font-semibold">{h.chip.t}</p><span className="grid h-7 w-7 place-items-center rounded-full bg-[rgb(104_210_185/0.16)] text-calm-aqua"><CheckCircle size={15} weight="fill" /></span></div>
                <p className="text-[12px] text-ink-faint">{h.chip.s}</p>
                <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-[var(--card-2)]"><span className="block h-full w-[86%] rounded-full bg-ink" /></span>
                <p className="mt-2 text-[13px] font-medium tabular-nums">{h.chip.v}</p>
                <p className="mt-1 text-[11px] text-ink-faint">{h.sample}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoModal open={demo} onClose={() => setDemo(false)} title={h.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={d.nav.close} />
    </section>);
}

/* ---------- 3. Problem ---------- */
export function Problem5() {
  const { d } = useLocale(); const c = d.problem; const icons: Ic[] = [Recycle, ArrowsClockwise, Books];
  return (
    <section aria-labelledby="prob-h" className="section-y">
      <div className="container-x">
        <H2 id="prob-h" className="max-w-[22ch] !mt-0">{c.h} <span className="text-ink-faint">{c.h2}</span></H2>
        <Reveal as="ul" stagger={0.08} className="mt-12 grid gap-3 md:grid-cols-3">
          {c.points.map(([h, p], i) => { const I = icons[i]; return (
            <RevealItem as="li" key={h} className={`${card} p-6 md:p-7`}>
              <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[var(--card-2)] text-ink"><I size={21} /></span>
              <h3 className="mt-8 text-[20px] font-semibold tracking-[-0.02em]">{h}</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{p}</p>
            </RevealItem>); })}
        </Reveal>
      </div>
    </section>);
}

