/* Data and KVKK for customers in Türkiye: /trust/turkiye/ (Turkish) and /trust/turkey/ (English, also for every other
 * language). Static page, no client JS of its own. Sources: the Notion research page and drafts 1 to 3 (12 November
 * 2026) and the Linear rules "Video, face and personal data (KVKK)". Until counsel approves it (TRUST_TR.approved):
 * no "KVKK compliant", no "data in Türkiye", no unverified security claims, no customer names or numbers.
 * The documents themselves (DPA, standard contract annexes, employee notice template) are never published here; the
 * request button opens an email to support with the subject "KVKK belge talebi".
 * Layout follows the support page: icon label, big two-line heading, a divided facts row, then each section as a
 * heading on the start side and its content on the end side, separated by hairlines. */
import Link from "next/link";
import { C, SUBJECT, type L } from "./turkiye-copy";
export { TURKIYE_TITLE } from "./turkiye-copy";
import { MapPin, UsersThree, ArrowsLeftRight, EnvelopeSimple, ArrowRight, Check, Info, Plus, ShieldCheck } from "../ui/icons";

const h1 = "text-[clamp(40px,1rem+3.6vw,76px)] font-semibold leading-[0.98] tracking-[-0.05em] [text-wrap:balance]";
const muted = "text-[16px] leading-[1.65] text-ink-muted";
const Tick = () => <Check size={16} aria-hidden="true" className="mt-[4px] shrink-0 text-[#FF8A4C]" />;

/** One numbered section: label and heading on the start side (sticky on large screens), content on the end side. */
function Sec({ id, hid, n, h, children }: { id: string; hid: string; n: string; h: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={hid} className="scroll-mt-[calc(var(--header-h)+24px)] border-t border-line py-14 md:py-20">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <span aria-hidden="true" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint tabular-nums">{n}</span>
            <h2 id={hid} className="mt-3 text-[28px] font-semibold leading-[1.05] tracking-[-0.035em] [text-wrap:balance] md:text-[36px]">{h}</h2>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>);
}

export function TurkiyePage({ lang }: { lang: L }) {
  const c = C[lang]; const mail = `mailto:support@flexlore.com?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(c.s6.body)}`;
  const icons = [MapPin, UsersThree, ArrowsLeftRight];
  return (
    <article lang={lang} dir="ltr" className="pb-24">
      <header className="pb-4 pt-32 md:pt-44">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--card)] text-ink"><ShieldCheck size={15} aria-hidden="true" /></span>{c.crumb} · Türkiye</p>
            <Link href={c.other[1]} hrefLang={lang === "tr" ? "en" : "tr"} className="btn btn-secondary !px-4 !text-[14px]">{c.other[0]}</Link>
          </div>
          <h1 className={`${h1} mt-6 max-w-[14ch]`}>{c.h1a} <span className="t-accent">{c.h1b}</span></h1>
          <p className="lead mt-5 max-w-[36rem]">{c.lead}</p>
          <ul className="mt-10 grid border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-line md:mt-14">
            {c.facts.map(([k, v], i) => { const I = icons[i]; return (
              <li key={k} className="flex min-h-[92px] items-start gap-4 border-b border-line px-1 py-5 last:border-b-0 sm:border-b-0 sm:px-6 sm:first:ps-0">
                <I size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-ink-faint" />
                <span><span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-faint">{k}</span>
                  <span className="mt-1 block text-[16px] font-medium leading-snug text-ink">{v}</span></span>
              </li>); })}
          </ul>
        </div>
      </header>

      <div className="container-x mt-10 md:mt-16">
        <Sec id="konum" hid="tr-s1" n="01" h={c.s1.h}>
          <div className="space-y-4">{c.s1.p.map((p) => <p key={p} className={`${muted} max-w-[44rem]`}>{p}</p>)}</div>
        </Sec>

        <Sec id="roller" hid="tr-s2" n="02" h={c.s2.h}>
          <div className="space-y-4">{c.s2.p.map((p) => <p key={p} className={`${muted} max-w-[44rem]`}>{p}</p>)}</div>
          <ul className="mt-8 grid gap-3">{c.s2.list.map((x) => (
            <li key={x} className="flex items-start gap-3 rounded-[18px] bg-[var(--card)] px-5 py-4 text-[16px] leading-[1.55] text-ink"><Tick />{x}</li>))}</ul>
        </Sec>

        <Sec id="aktarim" hid="tr-s3" n="03" h={c.s3.h}>
          <p className={`${muted} max-w-[44rem]`}>{c.s3.p}</p>
          <ol className="mt-8 border-t border-line">{c.s3.steps.map(([t, p], i) => (
            <li key={t} className="flex gap-5 border-b border-line py-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EC6726] text-[14px] font-semibold text-[#111]">{i + 1}</span>
              <span className="min-w-0"><span className="block text-[18px] font-semibold leading-snug tracking-[-0.015em] text-ink">{t}</span>
                <span className="mt-1.5 block max-w-[40rem] text-[15px] leading-[1.6] text-ink-muted">{p}</span></span>
            </li>))}</ol>
        </Sec>

        <Sec id="alt-isleyenler" hid="tr-s4" n="04" h={c.s4.h}>
          <p className={`${muted} max-w-[44rem]`}>{c.s4.p}</p>
          <table className="mt-8 w-full border-collapse text-start text-[15px]">
            <thead><tr className="text-[13px] uppercase tracking-[0.12em] text-ink-faint">
              <th scope="col" className="pb-3 pe-4 text-start font-semibold">{c.s4.th[0]}</th><th scope="col" className="pb-3 text-start font-semibold">{c.s4.th[1]}</th></tr></thead>
            <tbody>{c.s4.rows.map(([n, d]) => (
              <tr key={n} className="border-t border-line align-top">
                <th scope="row" className="w-[40%] py-4 pe-4 text-start font-semibold text-ink md:w-[32%]">{n}</th>
                <td className="py-4 leading-[1.55] text-ink-muted">{d}</td></tr>))}</tbody>
          </table>
          <div className="border-t border-line pt-4"><Link href="/legal/subprocessors/" className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold">{c.s4.more}<ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></Link></div>
        </Sec>

        <Sec id="calisanlar" hid="tr-s5" n="05" h={c.s5.h}>
          <p className={`${muted} max-w-[44rem]`}>{c.s5.p}</p>
          <ul className="mt-8 grid gap-x-10 border-t border-line md:grid-cols-2">{c.s5.list.map(([t, p]) => (
            <li key={t} className="flex gap-3 border-b border-line py-5"><Tick />
              <span><span className="block text-[16px] font-semibold text-ink">{t}</span><span className="mt-1 block text-[15px] leading-[1.6] text-ink-muted">{p}</span></span></li>))}</ul>
        </Sec>

        <section id="belgeler" aria-labelledby="tr-s6" className="scroll-mt-[calc(var(--header-h)+24px)] py-6 md:py-10">
          <div className="dark relative overflow-hidden rounded-[28px] bg-[#171717] p-6 text-white md:p-12">
            <span aria-hidden="true" className="pointer-events-none absolute -end-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(236_103_38/0.25),transparent_70%)]" />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-7">
                <h2 id="tr-s6" className="text-[32px] font-semibold leading-[1.02] tracking-[-0.04em] md:text-[48px]">{c.s6.h}</h2>
                <p className="mt-4 max-w-[34rem] text-[16px] leading-[1.6] text-white/70">{c.s6.p}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={mail} className="btn btn-cta h-11 px-5"><EnvelopeSimple size={16} aria-hidden="true" />{c.s6.cta}</a>
                  <Link href="/support/" className="btn btn-glass-2 h-11 px-5">{c.s6.alt}</Link>
                </div>
              </div>
              <ul className="border-t border-white/10 lg:col-span-5">{c.s6.docs.map((d) => (
                <li key={d} className="flex min-h-14 items-center gap-3 border-b border-white/10 text-[16px] font-medium"><Check size={16} aria-hidden="true" className="shrink-0 text-[#FF8A4C]" />{d}</li>))}</ul>
            </div>
          </div>
        </section>

        <Sec id="sss" hid="tr-s7" n="06" h={c.s7.h}>
          <ul className="border-t border-line">{c.s7.items.map(([q, a]) => (
            <li key={q} className="border-b border-line">
              <details className="group">
                <summary className="flex min-h-[72px] cursor-pointer list-none items-center gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-[17px] font-semibold leading-snug md:text-[19px]">{q}</span>
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--card)] transition-transform duration-300 group-open:rotate-45"><Plus size={14} /></span>
                </summary>
                <p className="max-w-[44rem] pb-6 text-[15px] leading-[1.65] text-ink-muted md:text-[16px]">{a}</p>
              </details>
            </li>))}</ul>
        </Sec>

        <footer className="flex items-start gap-3 border-t border-line pt-6 text-[14px] leading-[1.55] text-ink-faint">
          <Info size={16} aria-hidden="true" className="mt-[2px] shrink-0" />
          <p><span className="text-ink-muted">{c.updated}</span><br />{c.note}</p>
        </footer>
      </div>
    </article>);
}
