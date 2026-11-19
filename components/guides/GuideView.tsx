/* Guide / template page and the guides hub. Server components: the HTML is complete in the static export (crawlers and
 * AI engines read it without running scripts). Labels follow the guide's own language, not the visitor's locale. */
import Link from "../i18n/Link";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Arr } from "../Icons";
import { CopyButton } from "./CopyButton";
import { type Guide, guidePath, hubPath, prep, words } from "./data";
import { GUIDES_UPDATED } from "./data";

export const GL = {
  en: { home: "Home", hub: "Guides and templates", crumbs: "Breadcrumb", short: "Short answer", toc: "On this page", min: "min read",
    updated: "Updated", copy: "Copy template", copied: "Copied", faq: "Questions", related: "Keep reading", demo: "Book a demo",
    pricing: "See plans", ctaH: "Turn this into training your team actually watches", ctaP: "Film the job once on a phone. Flexlore drafts the steps and a short quiz, your team approves, and you see who is ready at every location.",
    hubH: "Guides and templates for frontline training", hubP: "Practical guides, SOP and work instruction templates, checklists and a skills matrix you can copy and use today. Written for restaurants, cafés, hotels, manufacturers, warehouses and franchise teams.",
    kinds: { guide: "Guide", template: "Template", checklist: "Checklist" }, open: "Open" },
  tr: { home: "Ana sayfa", hub: "Rehberler ve şablonlar", crumbs: "Sayfa yolu", short: "Kısa cevap", toc: "Bu sayfada", min: "dk okuma",
    updated: "Güncelleme", copy: "Şablonu kopyala", copied: "Kopyalandı", faq: "Sorular", related: "Devamını okuyun", demo: "Demo isteyin",
    pricing: "Planları görün", ctaH: "Bunu ekibinizin gerçekten izlediği bir eğitime dönüştürün", ctaP: "İşi bir kez telefonla çekin. Flexlore adımları ve kısa bir quiz taslağını hazırlar, ekibiniz onaylar, her şubede kimin hazır olduğunu görürsünüz.",
    hubH: "Saha eğitimi için rehberler ve şablonlar", hubP: "Bugün kopyalayıp kullanabileceğiniz pratik rehberler, SOP ve iş talimatı şablonları, kontrol listeleri ve beceri matrisi. Restoran, kafe, otel, üretim, depo ve franchise ekipleri için yazıldı.",
    kinds: { guide: "Rehber", template: "Şablon", checklist: "Kontrol listesi" }, open: "Aç" },
};
const fmt = (lang: "en" | "tr") => new Date(GUIDES_UPDATED + "T12:00:00Z").toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", { year: "numeric", month: "long", day: "numeric" });
const kick = (t: string) => <p className="inline-flex items-center gap-2.5 text-[13px] font-medium text-ink-faint"><span aria-hidden="true" className="kick-line" />{t}</p>;

/** Related card: a guide (title from data) or any other internal page (title passed in). */
export type Rel = { href: string; title: string; kind: string };

export function GuideView({ g, rel }: { g: Guide; rel: Rel[] }) {
  const t = GL[g.lang]; const mins = Math.max(1, Math.round(words(g) / 220));
  return (<>
    <Header />
    <main id="main" lang={g.lang} className="relative isolate overflow-x-clip pt-[calc(var(--header-h)+40px)] md:pt-[calc(var(--header-h)+72px)]">
      <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 -z-10 h-[460px] w-[min(760px,100vw)] bg-[radial-gradient(40%_70%_at_100%_0%,rgba(236,103,38,.28),transparent_72%)]" />
      <div className="mx-auto max-w-[calc(1160px+2*var(--pad-x))] px-[var(--pad-x)]">
        <nav aria-label={t.crumbs} className="text-[13px] font-medium text-ink-faint">
          <Link href={g.lang === "tr" ? "/tr/" : "/"} className="inline-flex min-h-11 min-w-11 items-center hover:text-ink">{t.home}</Link> / <Link href={hubPath(g.lang)} className="inline-flex min-h-11 items-center hover:text-ink">{t.hub}</Link>
        </nav>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,760px)_260px] lg:justify-between">
          <article className="min-w-0">
            <div className="mt-4">{kick(g.kicker)}</div>
            <h1 className="kh kh-md mt-4 [text-wrap:balance]">{g.h1}</h1>
            <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-[14px] text-ink-faint"><span>{t.updated}: <time dateTime={GUIDES_UPDATED}>{fmt(g.lang)}</time></span><span aria-hidden="true">·</span><span>{mins} {t.min}</span><span aria-hidden="true">·</span><span>Flexlore</span></p>
            <div className="g-answer mt-8 rounded-[22px] border border-[rgba(236,103,38,.35)] bg-[linear-gradient(180deg,rgba(236,103,38,.12),rgba(236,103,38,.02))] p-6 md:p-7">
              <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#FF8652]">{t.short}</p>
              <p className="mt-3 text-[18px] leading-[1.6] text-ink">{g.answer}</p>
            </div>
            <nav aria-label={t.toc} className="mt-8 rounded-[22px] bg-[var(--card)] p-6 lg:hidden">
              <p className="text-[14px] font-semibold text-ink">{t.toc}</p>
              <ol className="mt-3 grid gap-1 text-[15px]">{g.sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="inline-flex min-h-11 items-center text-ink-muted hover:text-ink">{s.h2}</a></li>)}{g.template && <li><a href="#template" className="inline-flex min-h-11 items-center text-ink-muted hover:text-ink">{g.template.title}</a></li>}<li><a href="#faq" className="inline-flex min-h-11 items-center text-ink-muted hover:text-ink">{t.faq}</a></li></ol>
            </nav>
            <div className="prose-blog prose-guide mt-6">
              {g.sections.map((s, i) => (<section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id} className="scroll-mt-28">{s.h2}</h2>
                <div dangerouslySetInnerHTML={{ __html: prep(s.html) }} />
                {g.template && i === Math.min(1, g.sections.length - 1) && <Template g={g} />}
              </section>))}
            </div>
            <section aria-labelledby="faq" className="mt-20">
              <h2 id="faq" className="scroll-mt-28 text-[30px] font-semibold tracking-[-0.025em] text-ink">{t.faq}</h2>
              <div className="mt-6 grid gap-2">{g.faq.map((f) => <details key={f.q} className="group rounded-[22px] bg-[var(--card)] px-5 py-4 md:px-6"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-semibold tracking-[-0.01em] text-ink">{f.q}<span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--card-2)] text-ink-muted transition-transform group-open:rotate-45">+</span></summary><p className="pb-2 pt-3 text-[16px] leading-[1.65] text-ink-muted">{f.a}</p></details>)}</div>
            </section>
            <section className="relative mt-20 overflow-hidden rounded-[28px] p-7 md:p-10" aria-labelledby="g-cta">
              <img src="/photos/ws-mutfak-1600.webp" alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" loading="lazy" />
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(17,17,17,.94)_0%,rgba(17,17,17,.82)_55%,rgba(17,17,17,.6)_100%)]" />
              <h2 id="g-cta" className="max-w-[22ch] text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] text-white md:text-[34px]">{t.ctaH}</h2>
              <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-white/80">{t.ctaP}</p>
              <div className="mt-7 flex flex-wrap gap-3"><Link href="/demo/" className="btn btn-cta">{t.demo}</Link><Link href={g.lang === "tr" ? "/tr/pricing/" : "/pricing/"} className="btn btn-glass-2">{t.pricing}</Link></div>
            </section>
          </article>
          <aside className="hidden lg:block">
            <nav aria-label={t.toc} className="sticky top-[calc(var(--header-h)+32px)] mt-28">
              <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-faint">{t.toc}</p>
              <ol className="mt-4 grid gap-0.5 border-l border-white/10 text-[14px]">{g.sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="-ml-px flex min-h-11 items-center border-l border-transparent py-1 pl-4 leading-[1.35] text-ink-muted hover:border-[#EC6726] hover:text-ink">{s.h2}</a></li>)}{g.template && <li><a href="#template" className="-ml-px flex min-h-11 items-center border-l border-transparent py-1 pl-4 text-ink-muted hover:border-[#EC6726] hover:text-ink">{g.template.title}</a></li>}<li><a href="#faq" className="-ml-px flex min-h-11 items-center border-l border-transparent py-1 pl-4 text-ink-muted hover:border-[#EC6726] hover:text-ink">{t.faq}</a></li></ol>
              <Link href="/demo/" className="btn btn-cta mt-8 w-full">{t.demo}</Link>
            </nav>
          </aside>
        </div>
        {rel.length > 0 && <section aria-labelledby="g-rel" className="mt-28">
          {kick(t.related)}
          <h2 id="g-rel" className="sr-only">{t.related}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{rel.map((r) => <li key={r.href}><Link href={r.href} className="group flex h-full min-h-[148px] flex-col rounded-[22px] bg-[var(--card)] p-6 ring-1 ring-white/[.06] transition-colors hover:ring-white/20"><span className="text-[13px] font-medium text-ink-faint">{r.kind}</span><span className="mt-3 text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">{r.title}</span><span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-ink-muted group-hover:text-ink">{t.open}<Arr /></span></Link></li>)}</ul>
        </section>}
      </div>
    </main>
    <div className="mt-32"><Footer /></div>
  </>);
}

function Template({ g }: { g: Guide }) {
  const t = GL[g.lang]; const x = g.template!;
  return (
    <div id="template" className="g-template not-prose my-12 scroll-mt-28 rounded-[26px] border border-white/10 bg-[var(--card)] p-5 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 max-w-[46ch]"><p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#FF8652]">{g.kicker}</p><p className="mt-2 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">{x.title}</p><p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{x.intro}</p></div>
        <CopyButton text={x.text} label={t.copy} done={t.copied} id={g.slug} />
      </div>
      <div className="g-tpl-body mt-6" dangerouslySetInnerHTML={{ __html: prep(x.html) }} />
    </div>
  );
}

export function GuidesHub({ lang, list }: { lang: "en" | "tr"; list: Guide[] }) {
  const t = GL[lang];
  return (<>
    <Header />
    <main id="main" lang={lang} className="relative isolate overflow-x-clip pt-[calc(var(--header-h)+48px)] md:pt-[calc(var(--header-h)+88px)]">
      <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 -z-10 h-[460px] w-[min(760px,100vw)] bg-[radial-gradient(40%_70%_at_100%_0%,rgba(236,103,38,.3),transparent_72%)]" />
      <div className="container-x">
        {kick(t.hub)}
        <h1 className="kh kh-md mt-4 max-w-[20ch] [text-wrap:balance]">{t.hubH}</h1>
        <p className="mt-5 max-w-[44rem] text-[17px] leading-[1.6] text-ink-muted md:text-[19px]">{t.hubP}</p>
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{list.map((g) => <li key={g.slug}><Link href={guidePath(g)} className="group flex h-full min-h-[240px] flex-col rounded-[26px] bg-[var(--card)] p-7 ring-1 ring-white/[.06] transition-colors hover:ring-white/20">
          <span className="inline-flex w-fit items-center rounded-full bg-white/[.06] px-3 py-1 text-[13px] font-medium text-ink-muted">{t.kinds[g.kind]}</span>
          <h2 className="mt-5 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink [text-wrap:balance]">{g.h1}</h2>
          <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-ink-muted">{g.description}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-ink-muted group-hover:text-ink">{t.open}<Arr /></span>
        </Link></li>)}</ul>
      </div>
    </main>
    <div className="mt-32"><Footer /></div>
  </>);
}
