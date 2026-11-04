"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowCounterClockwise, UsersThree, BookOpen, ArrowRight, Sparkle, CheckCircle, LockSimple, MapPin, Plus,
} from "../ui/icons";
import type { Lang } from "../copy";
import { home, IND_CARDS } from "./home-copy";
import { SITE, PLANS, PLAN_TR } from "../config";
import { INDUSTRIES, type Ind } from "../seeit-data";
import { Heading } from "../ui/Layout";
import { Reveal, RevealItem, EASE } from "../ui/Reveal";
import { SmartVideo } from "../ui/SmartVideo";
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
            {/* TODO(ata): swap for Product Hunt's official embed badge once we have the post id (maker dashboard, Embed). */}
            <StoreBadge href={SITE.productHunt} top={tr ? "YAYINLANDI" : "LAUNCHED ON"} name="Product Hunt" />
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
        <ol className="mt-10 grid gap-3 md:grid-cols-3 lg:mr-36">
          {c.callouts.map((x, i) => (
            <li key={x.h} className={`rounded-[20px] p-5 transition-colors duration-500 ${step === i ? "bg-surface-2" : "bg-bg/40"}`}>
              <div className="flex items-center gap-3"><span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-colors ${step >= i ? "bg-ice-100 text-bg" : "bg-surface-2 text-ink-muted"}`}>{i + 1}</span>
                <h3 className="text-lg font-semibold tracking-[-.01em]">{x.h}</h3></div>
              <p className="mt-2 text-base text-ink-muted">{x.p}</p>
            </li>))}
        </ol>
        <p className="mt-6 text-caption text-ink-faint">{c.sample}</p>
      </div>
    </section>);
}

/* 7. Capabilities bento: six tiles in three sizes, each with a small live UI fragment (CSS/motion, no video). */
export function Bento({ lang }: { lang: Lang }) {
  const c = home[lang].bento; const T = c.tiles; const tr = lang === "tr";
  const Tile = ({ k, className = "", children }: { k: keyof typeof T; className?: string; children: React.ReactNode }) => (
    <RevealItem as="li" className={`panel flex flex-col overflow-hidden ${className}`}>
      <div className="relative flex-1 p-5 pb-0" aria-hidden="true">{children}</div>
      <div className="p-5"><h3 className="text-lg font-semibold tracking-[-.01em]">{T[k].h}</h3><p className="mt-1.5 text-base text-ink-muted">{T[k].p}</p></div>
    </RevealItem>);
  return (
    <section aria-labelledby="bento-h" className="section-y bg-bg">
      <div className="container-x">
        <Heading id="bento-h" eyebrow={c.k} title={c.h} lead={c.lead} />
        <Reveal as="ul" stagger={0.06} className="mt-14 grid gap-4 md:grid-cols-6">
          <Tile k="ai" className="md:col-span-4">
            <div className="max-w-md space-y-2">
              {(tr ? ["Elleri yıkayın, eldiven takın", "Soğuk oda sıcaklığını kontrol edin", "Kesme tahtalarını ve bıçakları dezenfekte edin", "Hattı istasyonlara göre kurun", "Hazırlıkları etiketleyip tarihleyin"] : ["Wash hands and put on gloves", "Check walk-in temperature", "Sanitise boards and knives", "Set up the line by station", "Label and date prep"]).map((s, i) => (
                <div key={s} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3.5 py-2.5 text-sm">
                  <span className="tabular-nums text-ink-faint">{i + 1}</span><span className="flex-1 truncate">{s}</span>
                  <span className="bento-swap relative h-6 w-[5.5rem] text-xs font-semibold" style={{ animationDelay: `${i * 0.6}s` }}>
                    <span className="bento-a absolute inset-0 grid place-items-center rounded-full bg-white/[.06] text-ice-300"><span className="flex items-center gap-1"><Sparkle size={12} weight="fill" />{tr ? "Taslak" : "Draft"}</span></span>
                    <span className="bento-b absolute inset-0 grid place-items-center rounded-full bg-ice-100 text-bg"><span className="flex items-center gap-1"><CheckCircle size={12} weight="fill" />{tr ? "Onaylı" : "Approved"}</span></span>
                  </span>
                </div>))}
            </div>
          </Tile>
          <Tile k="ready" className="md:col-span-2">
            <div className="grid grid-cols-6 gap-1.5">
              {Array.from({ length: 24 }).map((_, i) => { const g = [2, 2, 1, 2, 0, 2, 1, 2, 2, 2, 1, 0, 2, 0, 1, 2, 2, 1, 2, 2, 0, 1, 2, 2][i];
                return <span key={i} className="bento-cell aspect-square rounded-md" style={{ animationDelay: `${i * 0.05}s`, background: g === 2 ? "#D2D8D9" : g === 1 ? "rgb(210 216 217 / .32)" : "rgb(255 255 255 / .05)" }} />; })}
            </div>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-faint"><span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-ice-200" />{tr ? "Geçti" : "Passed"}</span><span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-ice-200/30" />{tr ? "İzledi" : "Watched"}</span><span>{tr ? "Örnek veri" : "Sample data"}</span></p>
          </Tile>
          <Tile k="quiz" className="md:col-span-2">
            <p className="text-sm font-medium">{tr ? "Çiğ tavuk bir tahtada hazırlandı. Sırada ne var?" : "Raw chicken was prepped on a board. What comes next?"}</p>
            <ul className="mt-3 space-y-1.5 text-xs">
              {(tr ? ["Durulayıp salata için kullan", "Temizle, dezenfekte et, doğru renkli tahtaya geç", "Kuru bezle sil"] : ["Rinse and reuse for salad", "Clean, sanitise, switch to the right colour board", "Wipe with a dry cloth"]).map((o, i) => (
                <li key={o} className={`rounded-lg px-3 py-2 ${i === 1 ? "bento-pick bg-surface-2 text-ink" : "bg-surface-2/60 text-ink-muted"}`}>{o}</li>))}
            </ul>
          </Tile>
          <Tile k="access" className="md:col-span-2">
            <ul className="space-y-2 text-sm">
              {(tr ? [["Hat aşçısı", "Kadıköy", true], ["Barista", "Beşiktaş", true], ["Kat görevlisi", "Tüm şubeler", false]] : [["Line cook", "Downtown", true], ["Barista", "Airport", true], ["Housekeeping", "All sites", false]]).map(([r, l, open]) => (
                <li key={r as string} className="flex items-center gap-3 rounded-xl bg-surface-2 px-3.5 py-2.5">
                  <span className="flex-1">{r as string}</span><span className="flex items-center gap-1 text-xs text-ink-faint"><MapPin size={12} />{l as string}</span>
                  {open ? <CheckCircle size={16} weight="fill" className="text-ice-200" /> : <LockSimple size={16} className="text-ink-faint" />}
                </li>))}
            </ul>
          </Tile>
          <Tile k="devices" className="md:col-span-2">
            <ul className="space-y-1 py-2">
              {(tr ? [["iPhone", "Kaydet, izle, quiz çöz"], ["Android", "Aynı uygulama, aynı adımlar"], ["Web", "Ata, takip et, raporla"]] : [["iPhone", "Record, watch, take the quiz"], ["Android", "Same app, same steps"], ["Web", "Assign, track, report"]]).map(([d, l]) => (
                <li key={d} className="flex items-baseline justify-between gap-3"><span className="text-[26px] font-semibold tracking-[-.03em] text-ice-100">{d}</span><span className="text-xs text-ink-faint">{l}</span></li>))}
            </ul>
          </Tile>
          <Tile k="sites" className="md:col-span-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {(tr ? [["Kadıköy", 92], ["Beşiktaş", 78], ["Ankara", 64]] : [["Downtown", 92], ["Airport", 78], ["Harbour", 64]]).map(([n, v]) => (
                <div key={n as string} className="rounded-xl bg-surface-2 px-4 py-3">
                  <div className="flex items-baseline justify-between text-sm"><span>{n as string}</span><span className="font-semibold tabular-nums">{v as number}%</span></div>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-surface-2"><span className="bento-bar block h-full rounded-full bg-ice-200" style={{ width: `${v}%` }} /></span>
                </div>))}
            </div>
            <p className="mt-3 text-xs text-ink-faint">{tr ? "Şube bazında hazırlık, örnek veri" : "Readiness by site, sample data"}</p>
          </Tile>
        </Reveal>
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
  const featured = IND_CARDS.filter((x) => x.featured), compact = IND_CARDS.filter((x) => !x.featured);
  return (
    <section id="industries" aria-labelledby="ind-h" className="section-y bg-bg">
      <div className="container-x">
        <Heading id="ind-h" eyebrow={c.k} title={c.h} lead={c.lead} />
        <Reveal as="ul" stagger={0.08} className="no-sb -mx-[var(--pad-x)] mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad-x)] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {featured.map((card) => <RevealItem as="li" key={card.slug} className="w-[78%] shrink-0 snap-start md:w-auto"><MediaCard card={card} lang={lang} cta={c.open} /></RevealItem>)}
        </Reveal>
        <p className="eyebrow mt-12">{c.more}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {compact.map((x) => (
            <li key={x.slug}><Link href={`/sektor/${x.slug}/`} className="group panel flex min-h-[84px] items-center gap-4 p-3 pr-5 transition-colors hover:bg-surface-2">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"><img src={x.still} alt="" loading="lazy" className="h-full w-full object-cover" /></span>
              <span className="flex-1"><span className="block text-base font-semibold">{tr ? x.tr : x.en}</span><span className="block text-sm text-ink-muted">{tr ? x.lineTr : x.lineEn}</span></span>
              <ArrowRight size={16} aria-hidden="true" className="text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-ink" />
            </Link></li>))}
        </ul>
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
