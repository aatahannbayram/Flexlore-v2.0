"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, m, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowCounterClockwise, UsersThree, BookOpen, ArrowRight, Check, Plus,
  ForkKnife, Coffee, Factory, Bed, Storefront, Package, FirstAid, GraduationCap, ChalkboardTeacher, Barbell, FilmSlate, DotsThreeCircle,
} from "../ui/icons";
import { copy, type Lang } from "../copy";

const LANG_CODES: Record<string, string> = { English: "en", "Türkçe": "tr", Deutsch: "de", "العربية": "ar", "Español": "es", "Русский": "ru", "Français": "fr", Polski: "pl" };
import { home, IND_CARDS } from "./home-copy";
import { SITE, PLANS, PLAN_TR } from "../config";
import { Heading } from "../ui/Layout";
import { Reveal, RevealItem, EASE } from "../ui/Reveal";
import { SmartVideo } from "../ui/SmartVideo";
import { MagneticButton } from "../ui/MagneticButton";
import { Device, WorkScreen } from "../AppScreens";
import { BillingToggle, PriceBlock, PL } from "../PriceUI";
import { CtaDuo } from "./CtaDuo";
const MountShot = dynamic(() => import("./MountShot").then((x) => x.MountShot), { ssr: false });

// One icon per area, in the order of home-copy.ts ind.areas.
const AREA_ICONS = [ForkKnife, Coffee, Factory, Bed, Storefront, Package, FirstAid, GraduationCap, ChalkboardTeacher, Barbell, FilmSlate, DotsThreeCircle];

// The dashboard mockup is below the fold: its code loads only when the section nears the viewport.
// The placeholder keeps the same 1180:720 ratio, so nothing shifts when it arrives.
const LazyDash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="aspect-[1180/720] w-full" /> });


/* 3. Trust band, frameless: a small label, a hairline, then each program as its own mark with no plate around the row.
   NVIDIA's member badge is official artwork and stays as supplied (it carries its own white field); the others are
   set as plain text. Each links to its source. */
/** Programs and launch badges. `as="div"` renders it inside another section (the home hero, over its photo). */
export function TrustStrip({ lang = "en", label, as: T = "section" }: { lang?: Lang; label?: string; as?: "section" | "div" }) {
  const c = { programs: label ?? home[lang].trust.programs };
  const list = SITE.programs.filter((p) => !p.flag || SITE.flags[p.flag]); const ph = SITE.flags.productHunt;
  return (
    <T id="main-next" aria-label={c.programs} {...(T === "div" ? { role: "region" } : {})} className={`scroll-mt-[var(--header-h)] ${T === "div" ? "" : "bg-bg"}`}>
      <div className="container-x pt-2 md:pt-4">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-7">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">{c.programs}</p>
          <span aria-hidden="true" className="hidden h-7 w-px bg-white/15 lg:block" />
          <Reveal as="ul" stagger={0.06} className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
            {list.map((p) => (
              <RevealItem as="li" key={p.name}>
                <a href={p.href} target="_blank" rel="noopener" aria-label={p.name} className="group inline-flex min-h-11 items-center opacity-80 transition-opacity duration-300 hover:opacity-100">
                  {p.badge
                    ? <span className="flex flex-col items-center"><img src={p.badge} alt={p.name} width={p.badgeW} height={p.badgeH} className={`block w-auto max-w-none rounded-[4px] ${p.caption ? "h-[14px]" : "h-[36px]"}`} />
                        {p.caption && <span className="mt-1 text-[12px] font-medium text-white/60">{p.caption}</span>}</span>
                    : <span className="flex flex-col leading-tight"><span className="text-[16px] font-semibold tracking-[-0.02em] text-white">{p.name}</span><span className="text-[12px] text-white/55">by {p.org}</span></span>}
                </a>
              </RevealItem>))}
            {ph && <RevealItem as="li">
              {/* Product Hunt's official featured badge (post 1077441, light theme), self-hosted: their embed URL sets a
                  third-party cookie (__cf_bm) and sends no CORS headers. Upvote count is a snapshot; re-download to refresh. */}
              <a href="https://www.producthunt.com/products/flexlore-app?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-flexlore-app" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center opacity-80 transition-opacity hover:opacity-100">
                <img src="/brand/stores/producthunt-featured-light.svg" alt="Flexlore App on Product Hunt" width={186} height={40} className="block h-[30px] w-auto" loading="lazy" /></a>
            </RevealItem>}
          </Reveal>
        </div>
      </div>
    </T>);
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
          <div className="dark relative aspect-[4/5] overflow-hidden rounded-[28px] bg-surface-1 sm:aspect-[16/12]">
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
  const { scrollYProgress: tp } = useScroll({ target: frame, offset: ["start end", "center center"] });
  const tiltX = useTransform(tp, [0, 1], [22, 0]); const tiltS = useTransform(tp, [0, 1], [0.92, 1]);
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
          <m.div ref={frame} role="img" aria-label={`Flexlore Web. ${c.sample}`} style={reduce ? undefined : { rotateX: tiltX, scale: tiltS, transformPerspective: 1600, transformOrigin: "50% 0%" }} className="relative overflow-hidden rounded-[24px] bg-bg">
            <div className="flex h-9 items-center gap-2 bg-surface-2 px-4" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="mx-auto hidden h-6 w-[min(60%,360px)] items-center justify-center rounded-md bg-bg text-xs text-ink-faint sm:flex">app.flexlore.com</span>
            </div>
            {near ? <LazyDash on={inView} /> : <div className="aspect-[1180/720] w-full" />}
            {pins.map(([x, y], i) => (
              <m.span key={i} aria-hidden="true" initial={false} animate={{ opacity: step >= i ? 1 : 0, scale: step >= i ? 1 : 0.6 }} transition={{ duration: 0.35, ease: EASE }}
                className="absolute hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ice-100 text-xs font-bold text-bg md:grid" style={{ left: `${x}%`, top: `${y}%` }}>{i + 1}</m.span>))}
          </m.div>
          <div aria-hidden="true" className="absolute -bottom-10 right-0 hidden w-[190px] lg:block"><Device label=""><WorkScreen active={inView} lang={lang} /></Device></div>
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
/* 8. Industries: one calm list of the six sectors that have a page, with the matching still beside it on desktop.
   Hover or focus a row and the picture crossfades (CSS only). The capabilities section above already carries the
   video cards, so this section stays quiet: list, picture, then the other areas and languages. */
export function Industries({ lang }: { lang: Lang }) {
  const c = home[lang].ind; const tr = lang === "tr";
  const [on, setOn] = useState(0);
  const others = c.areas.filter(([, slug]) => !slug);
  return (
    <section id="industries" aria-labelledby="ind-h" className="section-y bg-bg">
      <div className="container-x">
        <Heading id="ind-h" eyebrow={c.k} title={c.h} lead={c.lead} />
        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:items-stretch">
          <Reveal as="ul" stagger={0.05} className="lg:col-span-6">
            {IND_CARDS.map((x, i) => (
              <RevealItem as="li" key={x.slug}>
                <Link href={`/sektor/${x.slug}/`} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} data-on={on === i || undefined}
                  className="group flex items-center gap-4 rounded-2xl px-2 py-3 transition-colors duration-300 hover:bg-white/[.04] focus-visible:bg-white/[.04] sm:px-4 sm:py-4 lg:data-[on]:bg-white/[.05]">
                  <picture className="shrink-0 lg:hidden"><source srcSet={x.still.replace(".webp", ".avif")} type="image/avif" />
                    <img src={x.still} alt="" loading="lazy" width={64} height={64} className="h-14 w-14 rounded-xl object-cover sm:h-16 sm:w-16" /></picture>
                  <span className="hidden w-7 text-[13px] tabular-nums text-ice-500 lg:block">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[19px] font-semibold leading-tight tracking-[-.02em] sm:text-[22px]">{tr ? x.tr : x.en}</span>
                    <span className="mt-1 block truncate text-[15px] text-ice-400">{tr ? x.lineTr : x.lineEn}</span>
                  </span>
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[.06] text-ice-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-ink group-hover:text-bg lg:group-data-[on]:bg-ink lg:group-data-[on]:text-bg">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </RevealItem>))}
          </Reveal>
          <div aria-hidden="true" className="dark relative hidden overflow-hidden rounded-[28px] bg-surface-1 lg:col-span-6 lg:block">
            {IND_CARDS.map((x, i) => (
              <div key={x.slug} className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${on === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}>
                {x.slug === "uretim" ? <MountShot active={on === i} lang={lang} /> : <>
                <picture><source srcSet={x.still.replace(".webp", ".avif")} type="image/avif" />
                  <img src={x.still} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></picture>
                {x.v && on === i && <SmartVideo name={x.v} poster={x.still} threshold={0.3} />}
                </>}
              </div>))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_55%,rgb(17_17_17/0.85)_100%)]" />
            <p className="absolute bottom-6 left-7 text-[15px] font-medium text-ink">{tr ? IND_CARDS[on].tr : IND_CARDS[on].en}</p>
          </div>
        </div>
        {/* Other areas (no page yet) and languages, over a slow, darkened kitchen loop. */}
        <div className="dark relative mt-16 overflow-hidden rounded-[28px] bg-surface-1 px-5 py-14 text-center md:mt-20 md:py-20">
          <div aria-hidden="true" className="absolute inset-0">
            <SmartVideo name="kitchen-bg" poster="/video/kitchen-bg.webp" threshold={0.2} className="absolute inset-0 h-full w-full scale-105 object-cover opacity-45 blur-[2px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(17_17_17/0.55)_0%,rgb(17_17_17/0.88)_70%,#111111_100%)]" />
          </div>
          <p className="eyebrow relative">{tr ? "Ayrıca kullanıldığı alanlar" : "Also used in"}</p>
          <Reveal as="ul" stagger={0.04} className="relative z-10 mx-auto mt-6 flex max-w-[52rem] flex-wrap justify-center gap-2.5">
            {others.map(([name]) => { const Ic = AREA_ICONS[c.areas.findIndex(([n]) => n === name)] ?? DotsThreeCircle; return (
              <RevealItem as="li" key={name}>
                <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[rgb(255_255_255/0.08)] pl-3 pr-4 text-[15px] text-ice-100 ring-1 ring-white/[.06] backdrop-blur-md"><Ic size={17} className="text-ice-300" />{name}</span>
              </RevealItem>); })}
          </Reveal>
          {/* Languages in their own script, one quiet row. Flags are left out on purpose: most carry blue. */}
          <div className="relative z-10 mt-12">
            <p className="text-[clamp(22px,1rem+1.2vw,32px)] font-semibold tracking-[-.03em] text-ink">{copy[lang].lP}</p>
            <p className="mx-auto mt-4 flex max-w-[44rem] flex-wrap justify-center gap-x-5 gap-y-2 text-[15px] text-ice-300">
              {copy[lang].langs.map((l) => <span key={l} lang={LANG_CODES[l]} dir={l === "العربية" ? "rtl" : undefined}>{l}</span>)}
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center"><Link href="/see-it/" className="btn btn-secondary">{c.picker}<ArrowRight size={14} aria-hidden="true" /></Link></div>
      </div>
    </section>);
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

/* 10. Pricing preview on a light ground. One structure per card so prices, users and features line up across all four.
   Real plan numbers and features from config.ts. */
export function PricingPreview({ lang }: { lang: Lang }) {
  const c = home[lang].pricing; const t = PL[lang]; const tr = lang === "tr"; const [yearly, setYearly] = useState(false);
  const users: Record<string, string> = { free: "3", pro: "10", proplus: "30" };
  // Plans are bought in the app: on a phone the plan buttons open the right store, on desktop the full pricing page.
  const [store, setStore] = useState<string | null>(null);
  useEffect(() => { const ua = navigator.userAgent; setStore(/iPhone|iPad|iPod/i.test(ua) ? SITE.appStore : /Android/i.test(ua) ? SITE.googlePlay : null); }, []);
  return (
    <section id="pricing" aria-labelledby="pp-h" className="section-y bg-light-bg text-light-ink">
      <div className="container-x">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-7"><Heading id="pp-h" eyebrow={c.k} title={c.h} lead={c.lead} light /></div>
          <div className="col-span-12 lg:col-span-5 lg:justify-self-end"><BillingToggle yearly={yearly} setYearly={setYearly} lang={lang} light id="pp" /></div>
        </div>
        {/* Each card reads top to bottom: who it is for, price, action, then what is included on a nested tile.
            The recommended plan is the only dark card and stands a little taller on wide screens. */}
        <ul className="no-sb -mx-[var(--pad-x)] mt-12 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-[var(--pad-x)] py-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4">
          {PLANS.map((p) => { const rec = !!p.featured; const name = tr ? PLAN_TR[p.id]?.name ?? p.name : p.name; const sub = rec ? "text-ice-300" : "text-light-muted"; return (
            <li key={p.id} className={`flex w-[84%] shrink-0 snap-start flex-col rounded-[24px] p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] sm:w-auto md:p-7 ${rec ? "bg-bg text-ice-100 xl:-my-3 xl:py-10" : "bg-white hover:-translate-y-1"}`}>
              <div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold">{name}</h3>
                {rec && <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-ice-100">{tr ? p.badgeTr : p.badge}</span>}</div>
              <p className={`mt-1 min-h-[2.6rem] text-sm leading-snug ${sub}`}>{tr ? PLAN_TR[p.id]?.for ?? p.for : p.for}</p>
              <div className="mt-6 min-h-[4.75rem]"><PriceBlock p={p} yearly={yearly} lang={lang} small light={!rec} /></div>
              <div className="mt-5">
                {p.id === "enterprise"
                  ? <a href={SITE.demo} className="btn group w-full bg-light-surface text-light-ink hover:bg-ice-200">{t.talk}<ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></a>
                  : <Link href={store ?? "/pricing/"} {...(store ? { target: "_blank", rel: "noopener" } : {})} className={`btn group w-full ${rec ? "btn-primary" : "bg-light-surface text-light-ink hover:bg-ice-200"}`}>{p.id === "free" ? t.start : t.choose}<ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></Link>}
              </div>
              <div className={`mt-6 flex-1 rounded-2xl p-4 ${rec ? "bg-white/[.06]" : "bg-light-bg"}`}>
                <p className={`flex items-center gap-2 text-sm font-semibold ${rec ? "text-ice-100" : "text-light-ink"}`}>
                  <UsersThree size={17} aria-hidden="true" />{p.id === "enterprise" ? "30+ " + (tr ? "kullanıcı" : "users") : t.unit(users[p.id])}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {c.feats[p.id].map((f) => <li key={f} className={`flex items-center gap-2.5 ${sub}`}><Check size={15} aria-hidden="true" className={rec ? "text-ice-200" : "text-light-ink"} />{f}</li>)}
                </ul>
              </div>
            </li>); })}
        </ul>
        <div className="mt-8 flex justify-center">
          <Link href="/pricing/" className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-light-ink underline decoration-ice-300 underline-offset-4 hover:decoration-light-ink">{c.all}<ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>);
}

/* 11. FAQ: light rows (no fills until open), keyboard accessible, with a way out for anything not covered. */
export function Faq({ lang }: { lang: Lang }) {
  const c = home[lang].faq; const [open, setOpen] = useState<number | null>(0); const reduce = useReducedMotion();
  return (
    <section id="faq" aria-labelledby="faq-h" className="section-y bg-bg">
      <div className="container-x grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <p className="eyebrow">{c.k}</p><h2 id="faq-h" className="h2 mt-4">{c.h}</h2>
          <div className="mt-10 hidden max-w-[20rem] lg:block">
            <p className="text-lg font-semibold tracking-[-.01em]">{c.more}</p>
            <p className="mt-2 text-base text-ink-muted">{c.moreP}</p>
            <a href={SITE.demo} className="btn btn-primary mt-5">{home[lang].end.cta}</a>
            <p className="mt-4 text-sm text-ink-faint"><a href="mailto:support@flexlore.com" className="underline decoration-white/20 underline-offset-4 hover:text-ink">{c.email}</a></p>
          </div>
        </div>
        <ul className="col-span-12 space-y-1 lg:col-span-7 lg:col-start-6">
          {c.items.map((q, i) => { const on = open === i; return (
            <li key={q.q} className={`rounded-[20px] transition-colors duration-300 ${on ? "bg-surface-1" : "hover:bg-surface-1/40"}`}>
              <h3>
                <button type="button" id={`faq-q-${i}`} aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}
                  className="flex min-h-16 w-full items-center justify-between gap-6 px-5 py-4 text-left text-[18px] font-semibold tracking-[-.01em] md:px-6">
                  <span className={on ? "text-ink" : "text-ink/85"}>{q.q}</span>
                  <m.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.3, ease: EASE }} className="grid h-8 w-8 shrink-0 place-items-center text-ice-400"><Plus size={16} aria-hidden="true" /></m.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {on && (
                  <m.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.35, ease: EASE }} className="overflow-hidden">
                    <p className="measure px-5 pb-6 text-base text-ink-muted md:px-6">{q.a}</p>
                  </m.div>)}
              </AnimatePresence>
            </li>); })}
        </ul>
        <div className="col-span-12 lg:hidden">
          <p className="text-lg font-semibold">{c.more}</p><p className="mt-2 text-base text-ink-muted">{c.moreP}</p>
          <a href={SITE.demo} className="btn btn-primary mt-5">{home[lang].end.cta}</a>
        </div>
      </div>
    </section>);
}

/* 12. Final CTA: calm copy on the left; behind it on the right, the real product (phone and web, static captures of the
   mockups) set in perspective for depth, fading into the panel. One action. */
export function FinalCta({ lang }: { lang: Lang }) {
  const c = home[lang].end;
  return (
    <section id="demo" aria-labelledby="end-h" className="bg-bg pb-[var(--section-y)]">
      <div className="container-x">
        <div className="relative -mx-[var(--pad-x)] grid items-center gap-10 overflow-hidden bg-surface-1 px-[var(--pad-x)] py-14 md:rounded-[32px] md:py-20 lg:grid-cols-12 lg:gap-8 lg:py-16 lg:pr-8">
          <div className="relative lg:col-span-5">
            <h2 id="end-h" className="text-[clamp(38px,1.1rem+2.8vw,68px)] font-semibold leading-[1.0] tracking-[-0.045em]">{c.h[0]} <span className="text-ice-400">{c.h[1]}</span></h2>
            <p className="lead mt-5">{c.p}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton href={SITE.demo}>{c.cta}</MagneticButton>
            </div>
          </div>
          <div className="lg:col-span-7"><CtaDuo lang={lang} /></div>
        </div>
      </div>
    </section>);
}
