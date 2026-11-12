/* Data and KVKK for customers in Türkiye: /trust/turkiye/ (Turkish) and /trust/turkey/ (English, also for every other
 * language). Static page, no client JS of its own. Sources: the Notion research page and drafts 1 to 3 (12 November
 * 2026) and the Linear rules "Video, face and personal data (KVKK)". Until counsel approves it (TRUST_TR.approved):
 * no "KVKK compliant", no "data in Türkiye", no unverified security claims, no customer names or numbers.
 * The documents themselves (DPA, standard contract annexes, employee notice template) are never published here; the
 * request button opens an email to support with the subject "KVKK belge talebi". */
import Link from "next/link";
import { C, SUBJECT, type L } from "./turkiye-copy";
export { TURKIYE_TITLE } from "./turkiye-copy";
import { MapPin, UsersThree, ArrowsLeftRight, Buildings, EnvelopeSimple, ArrowRight, Check, Info, Plus } from "../ui/icons";

const card = "rounded-[24px] bg-[var(--card)]";
const H2 = ({ id, n, children }: { id: string; n: string; children: React.ReactNode }) => (
  <h2 id={id} className="flex items-baseline gap-3 text-[26px] font-semibold leading-tight tracking-[-0.03em] md:text-[32px]">
    <span aria-hidden="true" className="text-[15px] font-medium tabular-nums text-ink-faint">{n}</span>{children}</h2>);
const P = ({ children }: { children: React.ReactNode }) => <p className="mt-3 max-w-[44rem] text-[16px] leading-[1.65] text-ink-muted">{children}</p>;

export function TurkiyePage({ lang }: { lang: L }) {
  const c = C[lang]; const mail = `mailto:support@flexlore.com?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(c.s6.body)}`;
  const sec = "scroll-mt-[calc(var(--header-h)+24px)]";
  return (
    <article lang={lang} dir="ltr" className="container-x pb-24 pt-32 md:pt-40">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[14px] text-ink-faint">{c.crumb} · Türkiye</p>
        <Link href={c.other[1]} hrefLang={lang === "tr" ? "en" : "tr"} className="btn btn-secondary h-11 px-4 text-[14px]">{c.other[0]}</Link>
      </div>
      <h1 className="v3-h1 mt-4 max-w-[20ch]">{c.h1a} <span className="t-accent">{c.h1b}</span></h1>
      <p className="lead mt-5 max-w-[40rem]">{c.lead}</p>

      <ul className="mt-10 grid gap-3 md:grid-cols-3">
        {c.facts.map(([k, v], i) => { const I = [MapPin, UsersThree, ArrowsLeftRight][i]; return (
          <li key={k} className={`${card} flex items-start gap-4 p-5 md:p-6`}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[var(--card-2)] text-ink"><I size={18} aria-hidden="true" /></span>
            <span><span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-faint">{k}</span><span className="mt-1 block text-[16px] font-medium leading-snug text-ink">{v}</span></span>
          </li>); })}
      </ul>

      <div className="mt-16 grid gap-16 md:mt-20">
        <section id="konum" aria-labelledby="tr-s1" className={sec}>
          <H2 id="tr-s1" n="01">{c.s1.h}</H2>{c.s1.p.map((p) => <P key={p}>{p}</P>)}
        </section>

        <section id="roller" aria-labelledby="tr-s2" className={sec}>
          <H2 id="tr-s2" n="02">{c.s2.h}</H2>{c.s2.p.map((p) => <P key={p}>{p}</P>)}
          <ul className="mt-5 grid max-w-[44rem] gap-2.5">{c.s2.list.map((x) => (
            <li key={x} className="flex items-start gap-3 text-[16px] leading-[1.55] text-ink"><Check size={16} aria-hidden="true" className="mt-[4px] shrink-0 text-[#FF8A4C]" />{x}</li>))}</ul>
        </section>

        <section id="aktarim" aria-labelledby="tr-s3" className={sec}>
          <H2 id="tr-s3" n="03">{c.s3.h}</H2><P>{c.s3.p}</P>
          <ol className="mt-8 grid gap-3 md:grid-cols-5">{c.s3.steps.map(([t, p], i) => (
            <li key={t} className={`${card} flex flex-col p-5`}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#EC6726] text-[14px] font-semibold text-white">{i + 1}</span>
              <span className="mt-4 block text-[16px] font-semibold leading-snug tracking-[-0.01em] text-ink">{t}</span>
              <span className="mt-2 block text-[14px] leading-[1.55] text-ink-muted">{p}</span>
            </li>))}</ol>
        </section>

        <section id="alt-isleyenler" aria-labelledby="tr-s4" className={sec}>
          <H2 id="tr-s4" n="04">{c.s4.h}</H2><P>{c.s4.p}</P>
          <div className={`${card} mt-6 overflow-hidden`}>
            <table className="w-full border-collapse text-start text-[15px]">
              <thead><tr className="text-[13px] uppercase tracking-[0.12em] text-ink-faint"><th scope="col" className="px-5 py-4 text-start font-semibold md:px-6">{c.s4.th[0]}</th><th scope="col" className="px-5 py-4 text-start font-semibold md:px-6">{c.s4.th[1]}</th></tr></thead>
              <tbody>{c.s4.rows.map(([n, d]) => (
                <tr key={n} className="border-t border-line align-top"><th scope="row" className="w-[38%] px-5 py-4 text-start font-semibold text-ink md:w-[30%] md:px-6">{n}</th><td className="px-5 py-4 leading-[1.55] text-ink-muted md:px-6">{d}</td></tr>))}</tbody>
            </table>
          </div>
          <Link href="/legal/subprocessors/" className="group mt-4 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold">{c.s4.more}<ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></Link>
        </section>

        <section id="calisanlar" aria-labelledby="tr-s5" className={sec}>
          <H2 id="tr-s5" n="05">{c.s5.h}</H2><P>{c.s5.p}</P>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">{c.s5.list.map(([t, p]) => (
            <li key={t} className={`${card} p-5 md:p-6`}><span className="block text-[16px] font-semibold text-ink">{t}</span><span className="mt-1.5 block text-[15px] leading-[1.6] text-ink-muted">{p}</span></li>))}</ul>
        </section>

        <section id="belgeler" aria-labelledby="tr-s6" className={sec}>
          <div className="dark relative overflow-hidden rounded-[28px] bg-[#171717] p-6 text-white md:p-10">
            <span aria-hidden="true" className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(236_103_38/0.28),transparent_70%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-white/[.08]"><Buildings size={18} aria-hidden="true" /></span>
                <h2 id="tr-s6" className="mt-5 text-[26px] font-semibold tracking-[-0.03em] md:text-[32px]">{c.s6.h}</h2>
                <p className="mt-2 max-w-[34rem] text-[16px] leading-[1.6] text-white/70">{c.s6.p}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href={mail} className="btn btn-cta h-11 px-5"><EnvelopeSimple size={16} aria-hidden="true" />{c.s6.cta}</a>
                  <Link href="/support/" className="btn btn-glass-2 h-11 px-5">{c.s6.alt}</Link>
                </div>
              </div>
              <ul className="grid gap-2">{c.s6.docs.map((d) => (
                <li key={d} className="flex min-h-14 items-center gap-3 rounded-[16px] bg-white/[.06] px-4 text-[15px] font-medium ring-1 ring-white/[.08]"><Check size={16} aria-hidden="true" className="shrink-0 text-[#FF8A4C]" />{d}</li>))}</ul>
            </div>
          </div>
        </section>

        <section id="sss" aria-labelledby="tr-s7" className={sec}>
          <H2 id="tr-s7" n="06">{c.s7.h}</H2>
          <ul className={`${card} mt-6 overflow-hidden`}>{c.s7.items.map(([q, a]) => (
            <li key={q} className="border-line [&:not(:first-child)]:border-t">
              <details className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 px-5 py-4 md:px-7 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-[16px] font-semibold leading-snug md:text-[18px]">{q}</span>
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--card-2)] ring-1 ring-line transition-transform duration-300 group-open:rotate-45"><Plus size={14} /></span>
                </summary>
                <p className="max-w-[44rem] px-5 pb-6 text-[15px] leading-[1.65] text-ink-muted md:px-7 md:text-[16px]">{a}</p>
              </details>
            </li>))}</ul>
        </section>
      </div>

      <footer className="mt-16 flex items-start gap-3 border-t border-line pt-6 text-[14px] leading-[1.55] text-ink-faint">
        <Info size={16} aria-hidden="true" className="mt-[2px] shrink-0" />
        <p><span className="text-ink-muted">{c.updated}</span><br />{c.note}</p>
      </footer>
    </article>);
}

