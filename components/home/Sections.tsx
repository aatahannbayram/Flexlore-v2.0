"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowCounterClockwise, UsersThree, BookOpen, ArrowRight, Sparkle, CheckCircle, LockSimple, MapPin, Plus,
} from "../ui/icons";
import { copy, type Lang } from "../copy";

const LANG_CODES: Record<string, string> = { English: "en", "Türkçe": "tr", Deutsch: "de", "العربية": "ar", "Español": "es", "Русский": "ru", "Français": "fr", Polski: "pl" };
import { home, IND_CARDS } from "./home-copy";
import { SITE, PLANS, PLAN_TR } from "../config";
import { INDUSTRIES, type Ind } from "../seeit-data";
import { Heading } from "../ui/Layout";
import { Reveal, RevealItem, EASE } from "../ui/Reveal";
import { SmartVideo } from "../ui/SmartVideo";
import { DotGlobe } from "../ui/DotGlobe";
import { MagneticButton } from "../ui/MagneticButton";
import { Device, SopScreen } from "../AppScreens";
import { BillingToggle, PriceBlock, PL } from "../PriceUI";
import { StoreBadge, AppStoreBadge } from "../Icons";

// The dashboard mockup is below the fold: its code loads only when the section nears the viewport.
// The placeholder keeps the same 1180:720 ratio, so nothing shifts when it arrives.
const LazyDash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="aspect-[1180/720] w-full" /> });


/* 3. Trust strip: confirmed facts only. Official artwork where the owner provides it (Apple badge, NVIDIA badge, Google's
   Cloud Program identifier), each linking to its source; plain text where no official mark exists (see config.ts). */
export function TrustStrip({ lang }: { lang: Lang }) {
  const c = home[lang].trust; const tr = lang === "tr";
  return (
    <section aria-label={c.programs} className="bg-bg">
      <div className="container-x grid-12 items-start gap-y-10 py-16 md:py-20">
        <div className="col-span-12 lg:col-span-5">
          <p className="eyebrow">{c.live}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <AppStoreBadge lang={lang} />
            <StoreBadge href={SITE.googlePlay} top={tr ? "ŞURADAN ALIN" : "GET IT ON"} name="Google Play" />
            {/* Product Hunt's official featured badge (post 1077441, light theme), self-hosted: their embed URL sets a
                third-party cookie (__cf_bm) and sends no CORS headers. Upvote count is a snapshot; re-download to refresh. */}
            <a href="https://www.producthunt.com/products/flexlore-app?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-flexlore-app" target="_blank" rel="noopener noreferrer" className="inline-block transition-opacity hover:opacity-85">
              <img src="/brand/stores/producthunt-featured-light.svg" alt="Flexlore App on Product Hunt" width={204} height={44} style={{ height: 44 }} className="block w-auto" loading="lazy" />
            </a>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p className="eyebrow">{c.programs}</p>
          <ul className="mt-5 flex flex-wrap items-start gap-4">
            {SITE.programs.map((p) => (
              <li key={p.name}>
                <a href={p.href} target="_blank" rel="noopener" className="group block">
                  {p.badge
                    ? <span className="flex h-[72px] items-center bg-white px-3 transition-opacity group-hover:opacity-90">
                        <img src={p.badge} alt={p.name} width={p.badgeW} height={p.badgeH} style={{ height: p.badgeH }} className="block w-auto" />
                      </span>
                    : <span className="flex h-[72px] flex-col justify-center rounded-[14px] bg-surface-1 px-5 transition-colors group-hover:bg-surface-2">
                        <span className="text-[18px] font-semibold leading-tight tracking-[-.02em] text-ink">{p.name}</span>
                        <span className="text-[13px] leading-tight text-ice-400">by {p.org}</span>
                      </span>}
                  {p.caption && <span className="mt-2 block text-[13px] text-ice-400">{p.caption}</span>}
                </a>
              </li>))}
          </ul>
        </div>
      </div>
    </section>);
}

/* 4. Problem: short statement left; right, a real kitchen loop with the three consequences rising over it in turn.
   Less copy, more picture. */
export function Problem({ lang }: { lang: Lang }) {
  const c = home[lang].problem;
  const icons = [ArrowCounterClockwise, UsersThree, BookOpen];
  return (
    <section id="problem" aria-labelledby="problem-h" className="section-y bg-bg">
      <div className="container-x grid-12 items-center gap-y-12">
        <Reveal className="col-span-12 lg:col-span-5">
          <p className="eyebrow">{c.k}</p>
          <h2 id="problem-h" className="h2 mt-4">{c.h[0]} <span className="text-ice-400">{c.h[1]}</span></h2>
          <p className="lead mt-6 max-w-[26rem]">{c.p}</p>
        </Reveal>
        <div className="col-span-12 lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-surface-1 sm:aspect-[16/12]">
            <picture><source srcSet="/video/plating.avif" type="image/avif" /><img src="/video/plating.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>
            <SmartVideo name="plating" poster="/video/plating.webp" threshold={0.4} />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_30%,rgb(17_17_17/0.88)_100%)]" />
            <Reveal as="ul" stagger={0.12} delay={0.15} className="absolute inset-x-4 bottom-4 space-y-2 sm:inset-x-6 sm:bottom-6 sm:max-w-[25rem]">
              {c.points.map((x, i) => { const Ic = icons[i]; return (
                <RevealItem as="li" key={x.h} className="flex items-center gap-3.5 rounded-2xl bg-[rgb(17_17_17/0.72)] px-4 py-3 backdrop-blur-md">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[.08] text-ink"><Ic size={18} aria-hidden="true" /></span>
                  <span><span className="block text-[15px] font-semibold tracking-[-.01em]">{x.h}</span><span className="block text-[13px] text-ice-300">{x.p}</span></span>
                </RevealItem>); })}
            </Reveal>
          </div>
        </div>
      </div>
    </section>);
}

/* 6. Flexlore Web: big browser frame, three numbered callouts that light up in turn, phone over the corner. */
export function WebShowcase({ lang }: { lang: Lang }) {
  const c = home[lang].web;
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { amount: 0.35, once: true });
  const near = useInView(frame, { margin: "600px 0px", once: true });
  const [step, setStep] = useState(-1);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView) return; if (reduce) { setStep(2); return; }
    setStep(0); const a = setTimeout(() => setStep(1), 1400), b = setTimeout(() => setStep(2), 2800);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [inView, reduce]);
  // callout anchor points on the 1180x720 dashboard (percent of the frame)
  const pins = [[38, 26], [30, 66], [86, 62]];
  return (
    <section id="web" aria-labelledby="web-h" className="section-y overflow-hidden bg-surface-1">
      <div className="container-x">
        <Heading id="web-h" eyebrow={c.k} title={c.h} lead={c.lead} />
        <div className="relative mt-14 lg:pr-36">
          <div ref={frame} role="img" aria-label={`Flexlore Web. ${c.sample}`} className="relative overflow-hidden rounded-[24px] bg-bg">
            <div className="flex h-9 items-center gap-2 bg-surface-2 px-4" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="mx-auto hidden h-6 w-[min(60%,360px)] items-center justify-center rounded-md bg-bg text-xs text-ink-faint sm:flex">app.flexlore.com</span>
            </div>
            {near ? <LazyDash on={inView} /> : <div className="aspect-[1180/720] w-full" />}
            {pins.map(([x, y], i) => (
              <m.span key={i} aria-hidden="true" initial={false} animate={{ opacity: step >= i ? 1 : 0, scale: step >= i ? 1 : 0.6 }} transition={{ duration: 0.35, ease: EASE }}
                className="absolute hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ice-100 text-xs font-bold text-bg md:grid" style={{ left: `${x}%`, top: `${y}%` }}>{i + 1}</m.span>))}
          </div>
          <div aria-hidden="true" className="absolute -bottom-10 right-0 hidden w-[190px] lg:block"><Device label=""><SopScreen active={inView} /></Device></div>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3 lg:mr-36">
          {c.callouts.map((x, i) => (
            <li key={x.h} className={`transition-colors duration-500 ${step >= i ? "" : "[&_h3]:text-ink-muted [&_p]:text-ink-faint"}`}>
              <div className="flex items-center gap-3"><span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-colors ${step >= i ? "bg-ice-100 text-bg" : "bg-surface-2 text-ink-muted"}`}>{i + 1}</span>
                <h3 className="text-lg font-semibold tracking-[-.01em]">{x.h}</h3></div>
              <p className="mt-2 text-base text-ink-muted">{x.p}</p>
            </li>))}
        </ol>
        <p className="mt-6 text-caption text-ink-faint">{c.sample}</p>
      </div>
    </section>);
}

/* 8. Industries: three featured media cards with loops, three compact cards, then the scenario picker. */
function MediaCard({ card, lang, cta }: { card: typeof IND_CARDS[number]; lang: Lang; cta: string }) {
  const [hover, setHover] = useState(false);
  const [fine, setFine] = useState(false);
  useEffect(() => { setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches); }, []);
  const tr = lang === "tr";
  return (
    <Link href={`/sektor/${card.slug}/`} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}
      className="group relative block overflow-hidden rounded-[24px]">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-1 md:aspect-[3/4]">
        <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
          <picture><source srcSet={card.still.replace(".webp", ".avif")} type="image/avif" /><img src={card.still} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>
          {card.v && <SmartVideo name={card.v} poster={card.still} threshold={0.6} play={fine ? hover : undefined} />}
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_35%,rgb(17_17_17/0.92)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1">
          <h3 className="h3">{tr ? card.tr : card.en}</h3>
          <p className="mt-1 text-base text-ink-muted">{tr ? card.lineTr : card.lineEn}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">{cta}<ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></span>
        </div>
      </div>
    </Link>);
}

export function Industries({ lang }: { lang: Lang }) {
  const c = home[lang].ind; const tr = lang === "tr";
  const featured = IND_CARDS.filter((x) => x.featured);
  return (
    <section id="industries" aria-labelledby="ind-h" className="section-y bg-bg">
      <div className="container-x">
        <Heading id="ind-h" eyebrow={c.k} title={c.h} lead={c.lead} />
        <Reveal as="ul" stagger={0.08} className="no-sb -mx-[var(--pad-x)] mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad-x)] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {featured.map((card) => <RevealItem as="li" key={card.slug} className="w-[78%] shrink-0 snap-start md:w-auto"><MediaCard card={card} lang={lang} cta={c.open} /></RevealItem>)}
        </Reveal>
        {/* Where teams use Flexlore: every area as a calm chip; sector pages link through. A dot horizon sits underneath. */}
        <div className="relative mt-20 overflow-hidden rounded-[28px] bg-surface-1 px-5 pb-0 pt-14 text-center md:pt-16">
          <p className="eyebrow">{c.more}</p>
          <Reveal as="ul" stagger={0.04} className="relative z-10 mx-auto mt-6 flex max-w-[52rem] flex-wrap justify-center gap-2.5">
            {c.areas.map(([name, slug]) => (
              <RevealItem as="li" key={name}>
                {slug
                  ? <Link href={`/sektor/${slug}/`} className="inline-flex min-h-11 items-center rounded-full bg-white/[.08] px-4 text-[15px] font-medium text-ink transition-colors hover:bg-white/[.14]">{name}</Link>
                  : <span className="inline-flex min-h-11 items-center rounded-full bg-white/[.04] px-4 text-[15px] text-ice-300">{name}</span>}
              </RevealItem>))}
          </Reveal>
          {/* Languages in their own script, one quiet row. Flags are left out on purpose: most carry blue. */}
          <div className="relative z-10 mt-12">
            <p className="text-[15px] font-medium text-ink">{copy[lang].lP}</p>
            <p className="mx-auto mt-3 flex max-w-[44rem] flex-wrap justify-center gap-x-5 gap-y-2 text-[15px] text-ice-400">
              {copy[lang].langs.map((l) => <span key={l} lang={LANG_CODES[l]} dir={l === "العربية" ? "rtl" : undefined}>{l}</span>)}
            </p>
          </div>
          <div className="relative -mt-6 h-[220px] md:h-[300px]"><DotGlobe /></div>
        </div>
        <ScenarioPicker lang={lang} />
      </div>
    </section>);
}

function ScenarioPicker({ lang }: { lang: Lang }) {
  const c = home[lang].ind; const [id, setId] = useState<Ind>("cafe-restaurant"); const reduce = useReducedMotion();
  const cur = INDUSTRIES.find((x) => x.id === id)!; const L = cur[lang];
  return (
    <div className="panel mt-16 p-5 md:p-8">
      <h3 className="h3">{c.picker}</h3>
      <p className="mt-2 text-base text-ink-muted">{c.pickerLead}</p>
      <div role="tablist" aria-label={c.picker} className="no-sb -mx-1 mt-6 flex gap-1 overflow-x-auto px-1">
        {INDUSTRIES.map((x) => (
          <button key={x.id} role="tab" type="button" aria-selected={id === x.id} aria-controls="scenario-panel" id={`tab-${x.id}`} onClick={() => setId(x.id)}
            className={`relative h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${id === x.id ? "text-bg" : "text-ink-muted hover:text-ink"}`}>
            {id === x.id && <m.span layoutId="scn-pill" className="absolute inset-0 -z-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 260, damping: 30 }} />}
            <span className="relative">{x[lang].label}</span>
          </button>))}
      </div>
      <div id="scenario-panel" role="tabpanel" aria-labelledby={`tab-${id}`} className="mt-6 grid gap-6 lg:grid-cols-12">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={id} className="contents" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="relative aspect-video overflow-hidden rounded-2xl lg:col-span-5">
              <img src={`/video/${cur.v}.webp`} alt={L.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg font-medium leading-snug">{L.job}</p>
              <ol className="mt-5 space-y-3">
                {L.flow.map(([h, p], i) => (
                  <li key={h} className="flex gap-4"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface-2 text-xs font-semibold tabular-nums">{i + 1}</span>
                    <span><span className="block text-base font-semibold">{h}</span><span className="block text-base text-ink-muted">{p}</span></span></li>))}
              </ol>
              <Link href={`/see-it/?industry=${id}`} className="btn btn-secondary mt-6">{c.see}<ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>);
}

/* 9. Proof: structure only. Hidden by SITE.flags.proof until real results or quotes exist. */
// TODO(ata): supply 1 to 3 real results or quotes (with permission), then set SITE.flags.proof = true.
const PROOF: { quote: string; who: string; role: string }[] = [];
export function Proof() {
  if (!SITE.flags.proof || PROOF.length === 0) return null;
  return (
    <section aria-label="Results" className="section-y bg-bg"><div className="container-x grid gap-4 md:grid-cols-3">
      {PROOF.map((p) => <figure key={p.who} className="panel p-6"><blockquote className="text-lg">{p.quote}</blockquote><figcaption className="mt-4 text-sm text-ink-muted">{p.who}, {p.role}</figcaption></figure>)}
    </div></section>);
}

/* 10. Pricing preview on a light ground. Real plan numbers from config.ts. */
export function PricingPreview({ lang }: { lang: Lang }) {
  const c = home[lang].pricing; const t = PL[lang]; const tr = lang === "tr"; const [yearly, setYearly] = useState(false);
  const users: Record<string, string> = { free: "3", pro: "10", proplus: "30" };
  return (
    <section id="pricing" aria-labelledby="pp-h" className="section-y bg-light-bg text-light-ink">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-7"><Heading id="pp-h" eyebrow={c.k} title={c.h} lead={c.lead} light /></div>
          <div className="col-span-12 lg:col-span-5 lg:justify-self-end"><BillingToggle yearly={yearly} setYearly={setYearly} lang={lang} light id="pp" /></div>
        </div>
        <ul className="no-sb -mx-[var(--pad-x)] mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad-x)] pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4">
          {PLANS.map((p) => { const rec = p.featured; const name = tr ? PLAN_TR[p.id]?.name ?? p.name : p.name; return (
            <li key={p.id} className={`relative flex w-[80%] shrink-0 snap-start flex-col rounded-[24px] p-6 sm:w-auto ${rec ? "bg-bg text-ice-100" : "bg-white"}`}>
              <div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold">{name}</h3>
                {rec && <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-ice-100">{tr ? p.badgeTr : p.badge}</span>}</div>
              <p className={`mt-1 text-sm ${rec ? "text-ice-300" : "text-light-muted"}`}>{tr ? PLAN_TR[p.id]?.for ?? p.for : p.for}</p>
              <div className="mt-6"><PriceBlock p={p} yearly={yearly} lang={lang} small light={!rec} /></div>
              <p className={`mt-3 text-sm ${rec ? "text-ice-300" : "text-light-muted"}`}>{p.id === "enterprise" ? t.entB : t.unit(users[p.id])}</p>
              <div className="mt-auto pt-6">
                {p.id === "enterprise"
                  ? <a href={SITE.demo} className="btn w-full bg-light-surface text-light-ink hover:bg-ice-200">{t.talk}</a>
                  : <Link href="/pricing/" className={`btn w-full ${rec ? "btn-primary" : "bg-light-surface text-light-ink hover:bg-ice-200"}`}>{p.id === "free" ? t.start : t.choose}</Link>}
              </div>
            </li>); })}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/pricing/" className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-light-ink underline decoration-ice-300 underline-offset-4 hover:decoration-light-ink">{c.all}<ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>);
}

/* 11. FAQ: accordion, keyboard accessible (real buttons, aria-expanded/controls), height animated by measured content. */
export function Faq({ lang }: { lang: Lang }) {
  const c = home[lang].faq; const [open, setOpen] = useState<number | null>(0); const reduce = useReducedMotion();
  return (
    <section id="faq" aria-labelledby="faq-h" className="section-y bg-bg">
      <div className="container-x grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-4"><p className="eyebrow">{c.k}</p><h2 id="faq-h" className="h2 mt-4">{c.h}</h2></div>
        <ul className="col-span-12 space-y-2 lg:col-span-8">
          {c.items.map((q, i) => { const on = open === i; return (
            <li key={q.q} className={`rounded-[20px] px-5 transition-colors md:px-6 ${on ? "bg-surface-1" : "bg-surface-1/50 hover:bg-surface-1"}`}>
              <h3>
                <button type="button" id={`faq-q-${i}`} aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}
                  className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-lg font-semibold tracking-[-.01em]">
                  {q.q}
                  <m.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.3, ease: EASE }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[.06] text-ink-muted"><Plus size={14} aria-hidden="true" /></m.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {on && (
                  <m.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.35, ease: EASE }} className="overflow-hidden">
                    <p className="measure pb-6 text-base text-ink-muted">{q.a}</p>
                  </m.div>)}
              </AnimatePresence>
            </li>); })}
        </ul>
      </div>
    </section>);
}

/* 12. Final CTA: one calm panel, one orange element (the button). */
export function FinalCta({ lang }: { lang: Lang }) {
  const c = home[lang].end;
  return (
    <section id="demo" aria-labelledby="end-h" className="bg-bg pb-[var(--section-y)]">
      <div className="container-x">
        <div className="grid-12 -mx-[var(--pad-x)] items-end gap-y-8 bg-surface-1 px-[var(--pad-x)] py-16 md:rounded-[28px] md:py-24">
          <div className="col-span-12 lg:col-span-8"><h2 id="end-h" className="display text-display">{c.h[0]} <span className="text-ice-400">{c.h[1]}</span></h2><p className="lead mt-5">{c.p}</p></div>
          <div className="col-span-12 flex lg:col-span-4 lg:justify-end">
            <MagneticButton href={SITE.demo}>{c.cta}</MagneticButton>
          </div>
        </div>
      </div>
    </section>);
}
