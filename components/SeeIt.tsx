"use client";
/* See it in your business (2026-11-15 redesign, the site's current style): a thin, wide entrance; slim glass pills to
 * pick the work; one large photo stage with the job written on it; the three moves (film, steps and quiz, ready) as
 * glass cards under it. Phones: pills in a 2 x 2 grid (no sideways row), the still frame instead of the clip (lighter
 * on data and battery), the three moves as a hairline list. Copy and data unchanged (components/seeit-data.ts). */
import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useLocale } from "./i18n/LocaleProvider";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SITE } from "./config";
import { INDUSTRIES, Ind } from "./seeit-data";
import { track } from "./track";
import { playOnly } from "./media";
import { ArrowRight } from "./ui/icons";
import Link from "./i18n/Link";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SeeIt() {
  const { lang } = useLocale();
  const [id, setId] = useState<Ind>("cafe-restaurant");
  const reduce = useReducedMotion();
  /* Clips only from tablets up; phones get the still frame. */
  const [wide, setWide] = useState(false);
  useEffect(() => { const q = matchMedia("(min-width: 768px)"); const f = () => setWide(q.matches); f(); q.addEventListener("change", f); return () => q.removeEventListener("change", f); }, []);
  useEffect(() => { const q = new URLSearchParams(location.search).get("industry"); if (INDUSTRIES.some((x) => x.id === q)) setId(q as Ind); }, []);
  const pick = (n: Ind) => { setId(n); track("seeit_industry", { industry: n }); const u = new URL(location.href); u.searchParams.set("industry", n); history.replaceState(null, "", u); };
  const tr = lang === "tr";
  const o = INDUSTRIES.find((x) => x.id === id)!; const c = o[lang];
  return (<>
    <Header />
    <main id="main" className="pb-[var(--section-y)]">
      {/* Entrance: centred, thin and wide, with a soft warm light from above. */}
      <section aria-labelledby="see-h" className="relative isolate overflow-hidden pt-[calc(var(--header-h)+56px)] md:pt-[calc(var(--header-h)+96px)]">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_70%_at_50%_0%,rgb(236_103_38/0.12),transparent_70%)]" />
        <div className="container-x text-center">
          <p className="inline-flex items-center gap-2.5 text-[13px] font-medium text-ink-faint"><span aria-hidden="true" className="kick-line" />{tr ? "Kendi işinizde görün" : "See it in your business"}<span aria-hidden="true" className="kick-line" /></p>
          <h1 id="see-h" className="mx-auto mt-5 max-w-[16ch] text-[clamp(40px,1rem+4.4vw,96px)] !font-normal leading-[1] tracking-[-0.045em] [text-wrap:balance]">
            <span className="t-ink">{tr ? "İşinizi seçin." : "Pick your work."}</span> <span className="text-ink-faint">{tr ? "Flexlore'da görün." : "See it in Flexlore."}</span></h1>
          {/* Slim glass pills; phones get a 2 x 2 grid so nothing scrolls sideways. */}
          <div role="radiogroup" aria-label={tr ? "Sektör" : "Industry"}
            className="mx-auto mt-10 grid max-w-[420px] grid-cols-2 gap-1.5 rounded-[22px] bg-white/[.05] p-1.5 ring-1 ring-white/[.08] backdrop-blur-md md:mt-12 md:inline-flex md:max-w-none md:rounded-full">
            {INDUSTRIES.map((x) => { const on = x.id === id; return (
              <button key={x.id} type="button" role="radio" aria-checked={on} onClick={() => pick(x.id)}
                className={`relative min-h-11 rounded-[16px] px-3 text-[13px] font-medium leading-tight md:text-[14px] transition-colors duration-300 md:rounded-full md:px-5 ${on ? "text-[#111]" : "text-ink-muted hover:text-ink"}`}>
                {on && <m.span layoutId="see-pill" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} className="absolute inset-0 rounded-[inherit] bg-[#F4F0EB]" />}
                <span className="relative">{x[lang].label}</span></button>); })}
          </div>
        </div>
      </section>

      {/* The stage: one large frame, the job written on it. */}
      <section aria-label={c.label} className="container-x mt-8 md:mt-12">
        <div className="dark relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#171717] text-white sm:aspect-[16/10] md:aspect-[16/8] md:rounded-[32px]">
          <AnimatePresence initial={false}>
            <m.div key={o.id} className="absolute inset-0" initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.7, ease }}>
              <img src={`/video/${o.v}.jpg`} alt={c.alt} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              {wide && !reduce && <video className="absolute inset-0 h-full w-full object-cover" poster={`/video/${o.v}.jpg`} muted loop playsInline preload="metadata" aria-hidden="true"
                ref={(el) => { if (el) playOnly(el); }}><source src={`/video/${o.v}.webm`} type="video/webm" /><source src={`/video/${o.v}.mp4`} type="video/mp4" /></video>}
            </m.div>
          </AnimatePresence>
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.25)_0%,rgb(16_16_16/0)_30%,rgb(16_16_16/0.35)_60%,rgb(16_16_16/0.92)_100%)]" />
          <span className="absolute start-4 top-4 rounded-full bg-[rgb(17_17_17/0.55)] px-3 py-1 text-[12px] text-white/75 ring-1 ring-white/10 backdrop-blur-md md:start-6 md:top-6">{tr ? "Örnek senaryo" : "Example scenario"}</span>
          <AnimatePresence mode="wait" initial={false}>
            <m.p key={o.id + lang} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.4, ease }}
              className="absolute inset-x-5 bottom-5 max-w-[34ch] text-[clamp(22px,0.9rem+1.6vw,40px)] font-normal leading-[1.12] tracking-[-0.03em] [text-wrap:balance] md:inset-x-10 md:bottom-10">{c.job}</m.p>
          </AnimatePresence>
        </div>

        {/* The three moves. Phones: a hairline list; tablets and up: three glass cards. */}
        <AnimatePresence mode="wait" initial={false}>
          <m.ol key={o.id + lang} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.3 }}
            className="mt-6 grid md:mt-6 md:grid-cols-3 md:gap-4">
            {c.flow.map((f, i) => (
              <li key={i} className="glass-card m-flat border-t border-line py-5 first:border-t-0 md:rounded-[24px] md:border-0 md:p-6">
                <span className="flex items-center gap-2.5 text-[13px] font-medium tabular-nums text-ink-faint"><span aria-hidden="true" className="kick-line" />0{i + 1}</span>
                <p className="mt-3 text-[19px] font-semibold leading-tight tracking-[-0.02em] md:text-[20px]">{f[0]}</p>
                <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{f[1]}</p>
              </li>))}
          </m.ol>
        </AnimatePresence>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:mt-16">
          <a href={SITE.demo} className="grid min-h-11 place-items-center"><span className="btn btn-cta !h-[38px] !min-h-[38px] !px-4 !text-[14px]">{tr ? "Demo isteyin" : "Book a demo"}</span></a>
          <Link href="/features/" className="grid min-h-11 place-items-center"><span className="btn btn-glass-2 !h-[38px] !min-h-[38px] !px-4 !text-[14px]">{tr ? "Tüm özellikler" : "All features"}<ArrowRight size={13} aria-hidden="true" className="rtl:-scale-x-100" /></span></Link>
        </div>
      </section>
    </main>
    <Footer />
  </>);
}
