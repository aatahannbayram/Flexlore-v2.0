/* Data and KVKK for customers in Türkiye: /trust/turkiye/ (Turkish) and /trust/turkey/ (English, also for every other
 * language). Static page, no client JS of its own. Sources: the Notion research page and drafts 1 to 3 (12 November
 * 2026) and the Linear rules "Video, face and personal data (KVKK)". Until counsel approves it (TRUST_TR.approved):
 * no "KVKK compliant", no "data in Türkiye", no unverified security claims, no customer names or numbers.
 * The documents themselves (DPA, standard contract annexes, employee notice template) are never published here; the
 * request button opens an email to support with the subject "KVKK belge talebi".
 * Layout: a dark hero with the three facts, then one narrow reading column. Each section is a small number, a heading
 * and plain text; no cards, no icons in the body, numbers stay neutral (orange only on the one request button).
 * Hero and request box use the .ember background (app/globals.css), piloted here before any wider use. */
import Link from "next/link";
import { C, SUBJECT, type L } from "./turkiye-copy";
export { TURKIYE_TITLE } from "./turkiye-copy";
import { EnvelopeSimple, ArrowRight, Plus } from "../ui/icons";

const P = "text-[17px] leading-[1.7] text-ink-muted";

/** One section of the reading column: neutral number, heading, content. */
function Sec({ id, hid, n, h, children }: { id: string; hid: string; n: string; h: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={hid} className="scroll-mt-[calc(var(--header-h)+24px)] pt-16 md:pt-24">
      <p aria-hidden="true" className="text-[13px] font-medium tabular-nums text-ink-faint">{n}</p>
      <h2 id={hid} className="mt-2 text-[30px] font-semibold leading-[1.08] tracking-[-0.035em] [text-wrap:balance] md:text-[40px]">{h}</h2>
      <div className="mt-6">{children}</div>
    </section>);
}

export function TurkiyePage({ lang }: { lang: L }) {
  const c = C[lang]; const mail = `mailto:support@flexlore.com?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(c.s6.body)}`;
  return (
    <article lang={lang} dir="ltr" className="pb-24">
      <header className="ember dark pb-14 pt-[calc(var(--header-h)+56px)] text-white md:pb-20 md:pt-[calc(var(--header-h)+96px)]">
        <div className="container-x">
          <div className="flex items-center justify-between gap-4 text-[14px] text-white/60">
            <p>{c.crumb}</p>
            <Link href={c.other[1]} hrefLang={lang === "tr" ? "en" : "tr"} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline">{c.other[0]}</Link>
          </div>
          <h1 className="mt-8 max-w-[12ch] text-[clamp(48px,1rem+5vw,104px)] font-semibold leading-[0.95] tracking-[-0.055em] [text-wrap:balance]">
            {c.h1a} <span className="t-accent">{c.h1b}</span></h1>
          <p className="mt-6 max-w-[36rem] text-[18px] leading-[1.6] text-white/70">{c.lead}</p>
          <dl className="mt-12 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3 md:mt-16">
            {c.facts.map(([k, v]) => (
              <div key={k}><dt className="text-[13px] text-white/50">{k}</dt><dd className="mt-1 text-[16px] font-medium leading-snug text-white">{v}</dd></div>))}
          </dl>
        </div>
      </header>

      <div className="container-x">
        <div className="mx-auto max-w-[760px]">
          <Sec id="konum" hid="tr-s1" n="01" h={c.s1.h}>
            <div className="space-y-4">{c.s1.p.map((p) => <p key={p} className={P}>{p}</p>)}</div>
          </Sec>

          <Sec id="roller" hid="tr-s2" n="02" h={c.s2.h}>
            <div className="space-y-4">{c.s2.p.map((p) => <p key={p} className={P}>{p}</p>)}</div>
            <ul className="mt-8 space-y-3 border-s-2 border-line ps-5">{c.s2.list.map((x) => (
              <li key={x} className="text-[17px] font-medium leading-[1.55] text-ink">{x}</li>))}</ul>
          </Sec>

          <Sec id="aktarim" hid="tr-s3" n="03" h={c.s3.h}>
            <p className={P}>{c.s3.p}</p>
            <ol className="mt-8">{c.s3.steps.map(([t, p], i) => (
              <li key={t} className="relative flex gap-5 pb-8 last:pb-0">
                {i < c.s3.steps.length - 1 && <span aria-hidden="true" className="absolute start-[15px] top-9 bottom-1 w-px bg-line" />}
                <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-medium tabular-nums text-ink ring-1 ring-inset ring-line-strong">{i + 1}</span>
                <span className="min-w-0 pt-1"><span className="block text-[17px] font-semibold leading-snug text-ink">{t}</span>
                  <span className="mt-1.5 block text-[16px] leading-[1.65] text-ink-muted">{p}</span></span>
              </li>))}</ol>
          </Sec>

          <Sec id="alt-isleyenler" hid="tr-s4" n="04" h={c.s4.h}>
            <p className={P}>{c.s4.p}</p>
            <dl className="mt-8 border-t border-line">{c.s4.rows.map(([n, d]) => (
              <div key={n} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                <dt className="text-[16px] font-semibold text-ink">{n}</dt><dd className="text-[16px] leading-[1.6] text-ink-muted">{d}</dd></div>))}</dl>
            <Link href="/legal/subprocessors/" className="group mt-3 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-ink">{c.s4.more}<ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></Link>
          </Sec>

          <Sec id="calisanlar" hid="tr-s5" n="05" h={c.s5.h}>
            <p className={P}>{c.s5.p}</p>
            <dl className="mt-8 space-y-6">{c.s5.list.map(([t, p]) => (
              <div key={t}><dt className="text-[17px] font-semibold text-ink">{t}</dt><dd className="mt-1 text-[16px] leading-[1.65] text-ink-muted">{p}</dd></div>))}</dl>
          </Sec>

          <section id="belgeler" aria-labelledby="tr-s6" className="scroll-mt-[calc(var(--header-h)+24px)] pt-16 md:pt-24">
            <div className="ember ember-sm dark rounded-[28px] p-7 text-white md:p-10">
              <h2 id="tr-s6" className="text-[30px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[40px]">{c.s6.h}</h2>
              <p className="mt-3 max-w-[32rem] text-[16px] leading-[1.6] text-white/65">{c.s6.p}</p>
              <ul className="mt-6 flex flex-wrap gap-2">{c.s6.docs.map((d) => (
                <li key={d} className="rounded-full bg-white/[0.07] px-3.5 py-1.5 text-[14px] text-white/85 ring-1 ring-inset ring-white/10">{d}</li>))}</ul>
              <a href={mail} className="btn btn-cta mt-8 h-11 px-5"><EnvelopeSimple size={16} aria-hidden="true" />{c.s6.cta}</a>
            </div>
          </section>

          <Sec id="sss" hid="tr-s7" n="06" h={c.s7.h}>
            <ul className="border-t border-line">{c.s7.items.map(([q, a]) => (
              <li key={q} className="border-b border-line">
                <details className="group">
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-4 py-3 [&::-webkit-details-marker]:hidden">
                    <span className="flex-1 text-[17px] font-semibold leading-snug">{q}</span>
                    <Plus size={16} aria-hidden="true" className="shrink-0 text-ink-faint transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="pb-6 text-[16px] leading-[1.65] text-ink-muted">{a}</p>
                </details>
              </li>))}</ul>
          </Sec>

          <footer className="mt-16 text-[14px] leading-[1.6] text-ink-faint">
            <p>{c.updated}. {c.note}</p>
            <Link href="/support/" className="group mt-2 inline-flex min-h-11 items-center gap-2 font-medium text-ink-muted hover:text-ink">{c.s6.alt}<ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></Link>
          </footer>
        </div>
      </div>
    </article>);
}
