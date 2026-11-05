"use client";
/* Home page sections, all reading one dictionary (components/i18n/home/<locale>.ts) through useLocale().
 * Visual rules: one calm dark ground, slightly raised cards, icons instead of eyebrow rules, real work photos and
 * loops behind every product fragment, orange used once per view. Product fragments are drawn in HTML with sample
 * content and labelled. Planned features (MCP / AI assistants) are labelled "coming soon". */
import { useState } from "react";
import { SITE } from "../config";
import { useLocale } from "../i18n/LocaleProvider";
import { Device, WorkScreen } from "../AppScreens";
import { StoreButtons } from "../Icons";
import { HERO_TAG } from "../i18n/hero-tag";
import { VideoModal } from "../ui/VideoModal";
import { SmartVideo } from "../ui/SmartVideo";
import { Reveal, RevealItem } from "../ui/Reveal";
import { MagneticButton } from "../ui/MagneticButton";
import { Play, Recycle, ArrowsClockwise, Books } from "../ui/icons";

/* ---------- shared bits ---------- */
export type Ic = (p: { size?: number; className?: string; weight?: "fill" | "regular" }) => React.ReactElement;
export const Pic = ({ n, sizes = "50vw", className = "", eager = false }: { n: string; sizes?: string; className?: string; eager?: boolean }) => (
  <picture><source srcSet={`/photos/${n}-800.avif 800w, /photos/${n}-1600.avif 1600w`} sizes={sizes} type="image/avif" />
    <img src={`/photos/${n}-1600.webp`} srcSet={`/photos/${n}-800.webp 800w, /photos/${n}-1600.webp 1600w`} sizes={sizes} alt="" loading={eager ? "eager" : "lazy"} className={className} /></picture>);
/** Section label: an icon chip and a word. Replaces the dot-and-rule eyebrows. */
export const Label = ({ icon: I, children }: { icon: Ic; children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2.5 text-[15px] font-medium text-ink-muted"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--card)] text-ink"><I size={16} /></span>{children}</p>);
export const H2 = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => <h2 id={id} className={`v3-h2 mt-4 md:mt-5 ${className}`}>{children}</h2>;
export const card = "relative overflow-hidden rounded-[28px] bg-[var(--card)]";

/* ---------- 1. Hero ---------- */
export function Hero5({ children }: { children?: React.ReactNode }) {
  const { d, lang, locale } = useLocale(); const h = d.hero; const [demo, setDemo] = useState(false);
  return (
    <section aria-labelledby="hero-h" className="relative isolate overflow-hidden pt-[var(--header-h)]">
      <div className="container-x">
        <div className="grid-12 items-center gap-y-6 pb-8 pt-5 sm:gap-y-8 sm:pb-12 lg:min-h-[min(calc(100svh-var(--header-h)),860px)] lg:gap-y-12 lg:py-10">
          <div className="col-span-12 lg:col-span-6">
            <div className="hs-in flex items-center gap-3">
              <span aria-hidden="true" className="flex -space-x-2 rtl:space-x-reverse">
                {["chef-plating", "safety", "hotel-desk", "huddle"].map((n) => <img key={n} src={`/photos/${n}-96.webp`} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover ring-2 ring-bg" />)}
              </span>
              <p className="text-[14px] text-ink-muted">{HERO_TAG[locale]}</p>
            </div>
            <h1 id="hero-h" className="mt-7 max-w-[16ch] text-[clamp(34px,1rem+2.2vw,56px)] font-semibold leading-[1.02] tracking-[-0.04em] [text-wrap:balance]">
              <span className="block">{h.h1a}</span><span className="block text-ink-faint">{h.h1b}</span>
            </h1>
            <p className="hs-in mt-5 max-w-[30rem] text-[16px] leading-[1.6] text-ink-muted sm:mt-6 sm:text-[18px]" style={{ animationDelay: "200ms" }}>{h.sub}</p>
            <div className="hs-in mt-6 flex flex-wrap items-center gap-3 sm:mt-8" style={{ animationDelay: "300ms" }}>
              <MagneticButton href={SITE.demo}>{d.nav.cta}</MagneticButton>
              <button type="button" onClick={() => setDemo(true)} className="btn btn-secondary"><Play size={14} weight="fill" aria-hidden="true" />{h.watch}</button>
            </div>
            <div className="hs-in mt-9 hidden flex-wrap items-center gap-x-4 gap-y-3 sm:flex" style={{ animationDelay: "380ms" }}>
              <StoreButtons small lang={lang} className="opacity-80 transition-opacity hover:opacity-100 [&_img]:!h-8 [&_a]:!rounded-[6px] [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center" />
            </div>
          </div>
          {/* One scene: the kitchen, one phone in front of it, one status card. */}
          <div className="col-span-12 lg:col-span-6">
            <div className="hs-device relative mx-auto aspect-[4/3] max-w-[560px] sm:aspect-[4/5] lg:me-0" style={{ animationDelay: "250ms" }}>
              <div className="dark absolute inset-y-0 end-0 w-full overflow-hidden rounded-[24px] bg-[#2a2622] sm:w-[86%] sm:rounded-[32px]">
                <Pic n="kitchenline" eager sizes="(min-width:1024px) 40vw, 90vw" className="absolute inset-0 h-full w-full object-cover object-[35%_center]" />
                <SmartVideo name="kitchen" underlay threshold={0.2} className="absolute inset-0 h-full w-full object-cover" />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(200deg,rgb(17_17_17/0)_40%,rgb(17_17_17/0.55)_100%)]" />
              </div>
              <div className="absolute bottom-[6%] start-[4%] w-[30%] max-w-[250px] sm:bottom-[7%] sm:start-0 sm:w-[44%]" dir="ltr"><Device label={h.chip.t}><WorkScreen active lang={lang} /></Device></div>
            </div>
          </div>
        </div>
      </div>
      {children}
      <VideoModal open={demo} onClose={() => setDemo(false)} title={h.watchTitle} youtubeId="4CLIlnp0L28" closeLabel={d.nav.close} />
    </section>);
}

/* ---------- 3. Problem ---------- */
export function Problem5() {
  const { d } = useLocale(); const c = d.problem; const icons: Ic[] = [Recycle, ArrowsClockwise, Books];
  // Each problem gets its own picture: a kitchen under pressure, a shift handover, a desk of binders.
  const media = [{ src: "/photos/chef-fire-1600", big: true }, { src: "/photos/huddle-1600" }, { src: "/blog/u4tKa64TvA30VsBSRquOU6Vjk-1600" }];
  // Phone: a compact list (icon and two lines). From 768 px: the photo tiles, white text over each picture.
  const Tile = ({ i }: { i: number }) => { const [h, p] = c.points[i]; const I = icons[i]; const m = media[i]; return (
    <RevealItem as="li" className={`group relative flex items-start gap-4 overflow-hidden rounded-[20px] bg-[var(--card)] p-4 md:block md:min-h-[300px] md:rounded-[28px] md:bg-[#1a1816] md:p-0 md:text-white ${m.big ? "lg:row-span-2 lg:min-h-0" : "lg:min-h-0"}`}>
      <picture><source srcSet={`${m.src}.avif`} type="image/avif" /><img src={`${m.src}.webp`} alt="" loading="lazy" className="absolute inset-0 hidden h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05] md:block" /></picture>
      <span aria-hidden="true" className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgb(17_17_17/0.1)_20%,rgb(17_17_17/0.55)_55%,rgb(17_17_17/0.92)_100%)] md:block" />
      <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[var(--card-2)] text-ink md:hidden"><I size={18} /></span>
      <span aria-hidden="true" className="absolute start-5 top-5 hidden items-center gap-2 rounded-full bg-[rgb(17_17_17/0.55)] py-1.5 pe-3.5 ps-1.5 text-[12px] font-medium text-white/85 ring-1 ring-white/10 backdrop-blur-md md:inline-flex">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15"><I size={13} /></span>{String(i + 1).padStart(2, "0")}</span>
      <div className="min-w-0 md:absolute md:inset-x-0 md:bottom-0 md:p-7">
        <h3 className={`text-[17px] font-semibold leading-snug tracking-[-0.02em] ${m.big ? "md:text-[clamp(22px,1rem+1vw,30px)]" : "md:text-[20px]"}`}>{h}</h3>
        <p className="mt-1 max-w-[30rem] text-[14px] leading-[1.5] text-ink-muted md:mt-2 md:text-[15px] md:leading-[1.55] md:text-white/75">{p}</p>
      </div>
    </RevealItem>); };
  return (
    <section aria-labelledby="prob-h" className="section-y">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-4">
          <div className="col-span-12 lg:col-span-8"><Label icon={Books}>{c.k}</Label><H2 id="prob-h" className="max-w-[22ch]">{c.h} <span className="text-ink-faint">{c.h2}</span></H2></div>
        </div>
        <Reveal as="ul" stagger={0.1} className="mt-6 grid gap-2 md:mt-10 md:grid-cols-3 md:gap-3 lg:h-[560px] lg:grid-cols-[1.25fr_1fr] lg:grid-rows-2">
          <Tile i={0} /><Tile i={1} /><Tile i={2} />
        </Reveal>
      </div>
    </section>);
}

