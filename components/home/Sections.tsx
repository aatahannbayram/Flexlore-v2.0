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

// One icon per area, in the order of home-copy.ts ind.areas.
const AREA_ICONS = [ForkKnife, Coffee, Factory, Bed, Storefront, Package, FirstAid, GraduationCap, ChalkboardTeacher, Barbell, FilmSlate, DotsThreeCircle];

// The dashboard mockup is below the fold: its code loads only when the section nears the viewport.
// The placeholder keeps the same 1180:720 ratio, so nothing shifts when it arrives.
const LazyDash = dynamic(() => import("../WebApp").then((x) => x.LazyDash), { ssr: false, loading: () => <div className="aspect-[1180/720] w-full" /> });


/* 3. Trust band: one family only. Four equal white plates, each carrying the owner's official artwork (or plain text where no
   official mark exists), each linking to its source. Store badges live in the hero, where download intent is. */
const PROD = {
  en: { k: "Product", h: "On the phone for the floor. On the web for the desk.", lead: "The same library and readiness data, wherever the work happens and wherever it is managed.", langs: "Available in 8 languages:",
    lines: [["Phone for the floor", "Film a job, follow its steps and take the quiz at the station."], ["Web for the desk", "Assign jobs, review drafts and see readiness by person, team and location."],
      ["AI drafts, people approve", "Steps, instructions and quizzes are drafted from the video. Nothing goes out until your team approves it."], ["Access by role and site", "People see only the jobs their role and location need."]] },
  tr: { k: "Ürün", h: "Sahada telefonda. Masada web'de.", lead: "Aynı kütüphane ve hazır olma verisi, işin yapıldığı ve yönetildiği her yerde.", langs: "8 dilde kullanılabilir:",
    lines: [["Sahada telefon", "İşi çekin, adımları izleyin, quizi istasyonda çözün."], ["Masada web", "İş atayın, taslakları gözden geçirin, hazır olmayı kişi, ekip ve lokasyona göre görün."],
      ["Yapay zekâ hazırlar, siz onaylarsınız", "Adımlar, talimatlar ve quizler videodan hazırlanır. Ekibiniz onaylamadan hiçbir şey yayınlanmaz."], ["Rol ve lokasyona göre erişim", "Herkes yalnızca rolünün ve lokasyonunun gerektirdiği işleri görür."]] },
};

/* 4. Product: centred heading, the web app full width with the phone over its corner, four short lines and the languages. */
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
        <div className="mx-auto max-w-[44rem] text-center">
          <p className="eyebrow">{PROD[lang].k}</p>
          <h2 id="web-h" className="h2 mt-4">{PROD[lang].h}</h2>
          <p className="lead mx-auto mt-4 max-w-[36rem]">{PROD[lang].lead}</p>
        </div>
        <div className="relative mx-auto mt-14 max-w-[1120px]">
          <m.div ref={frame} role="img" aria-label={`Flexlore Web. ${c.sample}`} className="relative overflow-hidden rounded-[24px] bg-bg">
            <div className="flex h-9 items-center gap-2 bg-surface-2 px-4" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="mx-auto hidden h-6 w-[min(60%,360px)] items-center justify-center rounded-md bg-bg text-xs text-ink-faint sm:flex">app.flexlore.com</span>
            </div>
            {near ? <LazyDash on={inView} /> : <div className="aspect-[1180/720] w-full" />}
            {pins.map(([x, y], i) => (
              <m.span key={i} aria-hidden="true" initial={false} animate={{ opacity: step >= i ? 1 : 0, scale: step >= i ? 1 : 0.6 }} transition={{ duration: 0.35, ease: EASE }}
                className="absolute hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ice-100 text-xs font-bold text-bg md:grid" style={{ left: `${x}%`, top: `${y}%` }}>{i + 1}</m.span>))}
          </m.div>
          <div aria-hidden="true" className="absolute -bottom-10 -right-6 hidden w-[180px] lg:block"><Device label=""><WorkScreen active={inView} lang={lang} /></Device></div>
        </div>
        <ul className="mx-auto mt-16 grid max-w-[1120px] gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROD[lang].lines.map(([h, p]) => (
            <li key={h}><h3 className="text-[16px] font-semibold text-ink">{h}</h3><p className="mt-1.5 text-[16px] leading-[1.5] text-ink-muted">{p}</p></li>))}
        </ul>
        <p className="mx-auto mt-10 max-w-[1120px] text-[14px] text-ink-muted"><span className="font-semibold text-ink">{PROD[lang].langs}</span> {copy[lang].langs.join(", ")}.</p>
        <p className="mx-auto mt-4 max-w-[1120px] text-[12px] text-ink-faint">{c.sample}</p>
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
  // Plan buttons open the app store for the visitor's device (Google Play on Android, the App Store otherwise).
  const [store, setStore] = useState<string>(SITE.appStore);
  useEffect(() => { if (/android/i.test(navigator.userAgent)) setStore(SITE.googlePlay); }, []);
  const users: Record<string, string> = { free: "3", pro: "10", proplus: "30" };
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
                  : <a href={store} target="_blank" rel="noopener" className={`btn group w-full ${rec ? "btn-primary" : "bg-light-surface text-light-ink hover:bg-ice-200"}`}>{p.id === "free" ? t.start : t.choose}<ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></a>}
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
            <li key={q.q} className={`rounded-[20px] transition-colors duration-200 ${on ? "bg-white/[.035]" : "hover:bg-white/[.02]"}`}>
              <h3>
                <button type="button" id={`faq-q-${i}`} aria-expanded={on} aria-controls={`faq-a-${i}`} onClick={() => setOpen(on ? null : i)}
                  className="flex min-h-16 w-full items-center justify-between gap-6 px-5 py-4 text-left text-[18px] font-semibold tracking-[-.01em] md:px-6">
                  <span className={on ? "text-ink" : "text-ink/85"}>{q.q}</span>
                  <m.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.2, ease: EASE }} className="grid h-8 w-8 shrink-0 place-items-center text-ice-400"><Plus size={16} aria-hidden="true" /></m.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {on && (
                  <m.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.25, ease: EASE }} className="overflow-hidden">
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
        <div className="relative -mx-[var(--pad-x)] overflow-hidden bg-surface-1 px-[var(--pad-x)] py-16 text-center md:rounded-[32px] md:py-24">
          <div className="relative mx-auto max-w-[40rem]">
            <h2 id="end-h" className="text-[clamp(40px,1.6rem+3vw,64px)] font-[600] leading-[1.04] tracking-[-0.02em]">{c.h[0]} <span className="text-ice-400">{c.h[1]}</span></h2>
            <p className="lead mt-5">{c.p}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href={SITE.demo}>{c.cta}</MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
