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
import { HERO_TAG } from "../i18n/hero-tag";
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
        <div className="grid-12 items-center gap-y-8 pb-12 pt-5 lg:min-h-[min(calc(100svh-var(--header-h)),860px)] lg:gap-y-12 lg:py-10">
          <div className="col-span-12 lg:col-span-6">
            <div className="hs-in flex items-center gap-3">
              <span aria-hidden="true" className="flex -space-x-2 rtl:space-x-reverse">
                {["chef-plating", "safety", "hotel-desk", "huddle"].map((n) => <img key={n} src={`/photos/${n}-800.webp`} alt="" className="h-8 w-8 rounded-full object-cover ring-2 ring-bg" />)}
              </span>
              <p className="text-[14px] text-ink-muted">{HERO_TAG[locale]}</p>
            </div>
            <h1 id="hero-h" className="mt-7 max-w-[16ch] text-[clamp(34px,1rem+2.2vw,56px)] font-semibold leading-[1.02] tracking-[-0.04em] [text-wrap:balance]">
              <span className="block">{h.h1a}</span><span className="block text-ink-faint">{h.h1b}</span>
            </h1>
            <p className="hs-in mt-6 max-w-[30rem] text-[18px] leading-[1.6] text-ink-muted" style={{ animationDelay: "200ms" }}>{h.sub}</p>
            <div className="hs-in mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "300ms" }}>
              <MagneticButton href={SITE.demo}>{d.nav.cta}</MagneticButton>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-secondary"><Play size={14} weight="fill" aria-hidden="true" />{h.watch}</button>
            </div>
            <div className="hs-in mt-9 hidden flex-wrap items-center gap-x-4 gap-y-3 sm:flex" style={{ animationDelay: "380ms" }}>
              <StoreButtons small lang={lang} className="opacity-80 transition-opacity hover:opacity-100 [&_img]:!h-8 [&_a]:!rounded-[6px]" />
            </div>
          </div>
          {/* One scene: the kitchen, one phone in front of it, one status card. */}
          <div className="col-span-12 lg:col-span-6">
            <div className="hs-device relative mx-auto aspect-[4/5] max-w-[560px] lg:me-0" style={{ animationDelay: "250ms" }}>
              <div className="dark absolute inset-y-0 end-0 w-[86%] overflow-hidden rounded-[32px] bg-[#2a2622]">
                <Pic n="kitchenline" eager sizes="(min-width:1024px) 40vw, 90vw" className="absolute inset-0 h-full w-full object-cover object-[35%_center]" />
                <SmartVideo name="kitchen" poster="/photos/kitchenline-1600.webp" threshold={0.2} className="absolute inset-0 h-full w-full object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(200deg,rgb(17_17_17/0)_40%,rgb(17_17_17/0.55)_100%)]" />
              </div>
              <div className="absolute bottom-[7%] start-0 w-[44%] max-w-[250px]" dir="ltr"><Device label={h.chip.t}><WorkScreen active lang={lang} /></Device></div>
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
  // Each problem gets its own picture: a kitchen under pressure, a shift handover, a desk of binders.
  const media = [{ src: "/photos/chef-fire-1600", big: true }, { src: "/photos/huddle-1600" }, { src: "/blog/u4tKa64TvA30VsBSRquOU6Vjk-1600" }];
  const Tile = ({ i }: { i: number }) => { const [h, p] = c.points[i]; const I = icons[i]; const m = media[i]; return (
    <RevealItem as="li" className={`dark group relative overflow-hidden rounded-[28px] bg-[#1a1816] text-white ${m.big ? "min-h-[420px] lg:row-span-2 lg:min-h-0" : "min-h-[260px]"}`}>
      <picture><source srcSet={`${m.src}.avif`} type="image/avif" /><img src={`${m.src}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" /></picture>
      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.1)_20%,rgb(17_17_17/0.55)_55%,rgb(17_17_17/0.92)_100%)]" />
      <span className="absolute start-5 top-5 inline-flex items-center gap-2 rounded-full bg-[rgb(17_17_17/0.55)] py-1.5 pe-3.5 ps-1.5 text-[12px] font-medium text-white/85 ring-1 ring-white/10 backdrop-blur-md">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15"><I size={13} /></span>{String(i + 1).padStart(2, "0")}</span>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <h3 className={`font-semibold tracking-[-0.02em] ${m.big ? "text-[clamp(22px,1rem+1vw,30px)]" : "text-[20px]"}`}>{h}</h3>
        <p className="mt-2 max-w-[30rem] text-[15px] leading-[1.55] text-white/75">{p}</p>
      </div>
    </RevealItem>); };
  return (
    <section aria-labelledby="prob-h" className="section-y">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-4">
          <div className="col-span-12 lg:col-span-8"><Label icon={Books}>{c.k}</Label><H2 id="prob-h" className="max-w-[22ch]">{c.h} <span className="text-ink-faint">{c.h2}</span></H2></div>
        </div>
        <Reveal as="ul" stagger={0.1} className="mt-10 grid gap-3 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-2 lg:h-[560px]">
          <Tile i={0} /><Tile i={1} /><Tile i={2} />
        </Reveal>
      </div>
    </section>);
}

