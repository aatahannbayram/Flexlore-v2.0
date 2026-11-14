import Link from "../i18n/Link";
import { LEGAL, type LegalDoc } from "./docs";
import { LegalLangNote } from "./LegalLangNote";
import { Article, ArrowUpRight } from "../ui/icons";

/* Same page language as the support and Türkiye pages: icon label, big heading, hairline-separated sections. */
const Kicker = ({ children }: { children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
    <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[var(--card)] text-ink"><Article size={15} aria-hidden="true" /></span>{children}</p>);

const id = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function LegalNav({ active }: { active?: string }) {
  return (
    <nav aria-label="Legal" className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
      <ul className="-mx-1 flex gap-1 overflow-x-auto pb-2 lg:mx-0 lg:block lg:space-y-0.5 lg:overflow-visible lg:pb-0">
        {LEGAL.map((d) => (
          <li key={d.slug} className="shrink-0"><Link href={`/legal/${d.slug}/`} aria-current={active === d.slug ? "page" : undefined}
            className={`flex min-h-11 items-center whitespace-nowrap rounded-full px-4 text-[15px] transition-colors lg:rounded-xl ${active === d.slug ? "bg-[var(--card)] font-semibold text-ink" : "text-ink-muted hover:bg-[var(--card)]/60 hover:text-ink"}`}>{d.title}</Link></li>))}
      </ul>
    </nav>);
}

export function LegalArticle({ doc }: { doc: LegalDoc }) {
  return (
    <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-8 pb-24 pt-32 md:pt-44 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
      <LegalNav active={doc.slug} />
      <article className="min-w-0 max-w-[46rem]" lang="en" dir="ltr">
        <Kicker><Link href="/legal/" className="inline-flex min-h-11 items-center hover:text-ink">Legal</Link></Kicker>
        <h1 className="mt-6 text-[clamp(36px,1rem+2.6vw,60px)] font-semibold leading-[1] tracking-[-0.045em] [text-wrap:balance]">{doc.title}</h1>
        <p className="mt-4 text-[14px] text-ink-faint">Last updated {doc.updated}</p>
        <LegalLangNote />
        {doc.draft && <p className="mt-5 rounded-[14px] bg-[var(--card)] px-4 py-3 text-[14px] text-ink-muted">Draft under legal review. Until it is final, your agreement with Flexlore and our Terms &amp; Conditions apply. Questions: <a href="mailto:support@flexlore.com" className="underline">support@flexlore.com</a></p>}
        <p className="lead mt-6">{doc.intro}</p>
        {doc.sections.length > 3 && (
          <details className="mt-8 rounded-[18px] bg-[var(--card)] px-5 py-4 lg:hidden"><summary className="flex min-h-11 cursor-pointer items-center text-[15px] font-semibold">On this page</summary>
            <ol className="mt-1 text-[15px] text-ink-muted">{doc.sections.map(([h]) => <li key={h}><a href={`#${id(h)}`} className="flex min-h-11 items-center hover:text-ink">{h}</a></li>)}</ol></details>)}
        <div className="mt-10">
          {doc.sections.map(([h, ps]) => (
            <section key={h} aria-labelledby={id(h)} className="scroll-mt-[calc(var(--header-h)+24px)] border-t border-line py-8">
              <h2 id={id(h)} className="text-[22px] font-semibold tracking-[-.025em] md:text-[24px]">{h}</h2>
              {ps.length > 1 && ps.every((p) => p.length < 200)
                ? <ul className="mt-3 list-disc space-y-2 ps-5 text-[16px] leading-[1.65] text-ink-muted marker:text-ink-faint">{ps.map((p) => <li key={p}>{p}</li>)}</ul>
                : ps.map((p) => <p key={p} className="mt-3 text-[16px] leading-[1.65] text-ink-muted">{p}</p>)}
            </section>))}
        </div>
      </article>
    </div>);
}

export function LegalIndex() {
  return (
    <div className="container-x pb-24 pt-32 md:pt-44">
      <Kicker>Legal</Kicker>
      <h1 className="mt-6 max-w-[14ch] text-[clamp(40px,1rem+3.6vw,76px)] font-semibold leading-[0.98] tracking-[-0.05em] [text-wrap:balance]">Policies and <span className="t-accent">agreements.</span></h1>
      <LegalLangNote />
      <ul className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
        {LEGAL.map((d) => (
          <li key={d.slug}><Link href={`/legal/${d.slug}/`} className="group flex h-full min-h-[180px] flex-col rounded-[24px] bg-[var(--card)] p-6 transition-colors hover:bg-[var(--card-2)]">
            <span className="flex items-start justify-between gap-3 text-[18px] font-semibold tracking-[-.015em]">{d.title}<ArrowUpRight size={16} aria-hidden="true" className="mt-1 shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" /></span>
            <span className="mt-2 flex-1 text-[14px] leading-[1.5] text-ink-muted">{d.desc}</span>
            <span className="mt-4 text-[13px] text-ink-faint">{d.draft ? "Draft · " : ""}Updated {d.updated}</span></Link></li>))}
      </ul>
    </div>);
}
