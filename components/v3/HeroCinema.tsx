"use client";
import { SmartVideo } from "../ui/SmartVideo";
import { useLocale } from "../i18n/LocaleProvider";
import { HOME2 } from "../i18n/home2";
import { SITE } from "../config";
import { CaretDown } from "../ui/icons";

/** /home2 trial hero: one full-bleed film (our own clip: a phone filming the line in a kitchen), bottom-anchored content,
 *  headline and one call to action on the start side, two glass cards on the end side. White text throughout because
 *  the clip is dark; a low scrim under the content keeps it at AA. Card data is the hero's labelled sample, no new
 *  numbers or quotes. Single font (Schibsted Grotesk), orange only as a dot. */
const GRAD = "linear-gradient(to bottom, #2B2B2B, #101010)";
export function HeroCinema({ children }: { children?: React.ReactNode }) {
  const { d, locale } = useLocale(); const h = d.hero; const s = HOME2[locale].steps; const r = HOME2[locale].roles;
  const nums = (h.chip.v.match(/\d+/g) ?? ["12", "14"]).map(Number); const done = Math.min(...nums), of = Math.max(...nums); // word order differs by language
  const pct = Math.round((100 * done) / of);
  const flow: [string, string][] = [[s[0][0], r[0]], [s[2][0], r[1]], [s[4][0], r[0]]];
  return (
    <>
      <section aria-labelledby="hero-h" className="dark relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#111] text-white">
        {/* The phone held upright, filming the pass (still with a slow push-in; static under reduced motion). */}
        <picture className="absolute inset-0 -z-20 overflow-hidden"><source type="image/avif" srcSet="/photos/hero-dikey-1024.avif 1024w, /photos/hero-dikey-2048.avif 2048w" sizes="100vw" />
          <img src="/photos/hero-dikey-2048.webp" srcSet="/photos/hero-dikey-1024.webp 1024w, /photos/hero-dikey-2048.webp 2048w" sizes="100vw" alt="" fetchPriority="high" decoding="async"
            className="kb h-full w-full object-cover object-[72%_50%]" /></picture>
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[62%] bg-[linear-gradient(to_top,rgb(10_10_10/0.82),rgb(10_10_10/0.35)_55%,transparent)]" />
        <span aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-[linear-gradient(to_bottom,rgb(10_10_10/0.55),transparent)]" />
        <div className="container-x mt-auto flex w-full flex-col gap-6 pb-8 pt-[calc(var(--header-h)+48px)] sm:gap-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
          <div className="max-w-[40rem]">
            <p className="mb-4 flex items-center gap-2 text-[13px] font-medium text-white/75"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-flame" />{h.rot.slice(0, 4).join(" · ")}</p>
            <h1 id="hero-h" className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-[3.5rem]">{h.h1a} <span className="text-white/65">{h.h1b}</span></h1>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:inline-flex sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-white sm:p-1.5">
              <a href="#how" className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-[#111] sm:bg-transparent sm:px-4">
                {d.process.k}<CaretDown size={14} aria-hidden="true" /></a>
              <a href={SITE.demo} target="_blank" rel="noopener" className="flex min-h-11 items-center justify-center rounded-full px-6 text-[14px] font-medium text-white transition-opacity hover:opacity-90" style={{ background: GRAD }}>{d.nav.cta}</a>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5">
            {/* Readiness: the hero's sample chip, read as one number. */}
            <div className="flex flex-col justify-between rounded-2xl bg-white/10 p-5 backdrop-blur-lg sm:w-64 sm:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-4xl font-semibold tabular-nums tracking-[-0.04em]">{done}/{of}</span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[12px] text-white/80">{h.sample}</span>
              </div>
              <span className="mt-4 block h-1 overflow-hidden rounded-full bg-white/15"><span className="block h-full rounded-full bg-white" style={{ width: `${pct}%` }} /></span>
              <p className="mt-3 text-[14px] leading-relaxed text-white/75">{h.chip.t} · {h.chip.s}</p>
            </div>
            {/* The loop in three lines, who does what. */}
            <div className="hidden rounded-2xl bg-white/10 p-5 backdrop-blur-lg sm:block sm:w-72 sm:p-6">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <img src="/brand/icon-32.png" alt="" width={24} height={24} className="h-6 w-6 rounded-md" />
                <span className="text-[14px] font-semibold">Flexlore</span>
              </div>
              <ol className="flex flex-col gap-2.5">
                {flow.map(([t, who], k) => (
                  <li key={t} className="flex items-center gap-3 text-[14px]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15 text-[12px] font-semibold tabular-nums">{k + 1}</span>
                    <span className="min-w-0 flex-1 leading-snug text-white/85">{t}</span>
                    <span className="shrink-0 text-[12px] text-white/60">{who}</span>
                  </li>))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      {children}
    </>);
}

/** /home2 closing: the hero's language again, full-bleed film with the last call to action at the bottom. */
export function EndCinema() {
  const { d } = useLocale(); const c = d.end;
  return (
    <section aria-labelledby="end-h" className="dark relative isolate flex min-h-[82svh] w-full flex-col overflow-hidden bg-[#111] text-white">
      <SmartVideo name="warehouse2" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(10_10_10/0.88),rgb(10_10_10/0.4)_55%,rgb(10_10_10/0.7))]" />
      <div className="container-x mt-auto flex w-full flex-col gap-6 pb-12 pt-28 sm:pb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-20">
        <div className="max-w-[40rem]">
          <h2 id="end-h" className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-[3.5rem]">{c.h}</h2>
          <p className="mt-4 max-w-[30rem] text-[16px] leading-[1.6] text-white/75">{c.p}</p>
        </div>
        <div className="flex flex-col gap-3 sm:inline-flex sm:flex-row sm:items-center sm:gap-0 sm:self-start sm:rounded-full sm:bg-white sm:p-1.5 lg:self-end">
          <a href="/see-it/" className="flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-[14px] font-medium text-[#111] sm:bg-transparent sm:px-4">{d.ind.more}</a>
          <a href={SITE.demo} target="_blank" rel="noopener" className="flex min-h-11 items-center justify-center rounded-full px-6 text-[14px] font-medium text-white transition-opacity hover:opacity-90" style={{ background: GRAD }}>{c.cta}</a>
        </div>
      </div>
    </section>);
}
