import { Picture } from "./ui/Picture";
import Link from "./i18n/Link";
import { SITE } from "./config";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Arr } from "@/components/Icons";
import { GuideLinks } from "./guides/GuideLinks";
import NextLink from "next/link";
import enPosts from "@/lib/blog.json";
import trPosts from "@/lib/blog.tr.json";

/* Posts: lib/blog.json (English, /blog/) and lib/blog.tr.json (Turkish, /tr/blog/). Both are committed and can be refreshed
 * from the CMS with `npm run cms:pull`. Translations are paired in lib/blog-map.json (components/i18n/routes.ts). */
export type Post = { slug: string; title: string; h1: string; date: string; author: string; cover: string; coverAlt: string; card: string;
  body: string; inline: unknown[]; links: unknown[]; cardDate: string; cardTitle: string; lang?: string; translationGroup?: string;
  translation?: string; description?: string; publishedAt?: string };
export type Lang = "en" | "tr";
export const posts: Post[] = enPosts;
export const trBlogPosts: Post[] = trPosts as Post[];
export const postsOf = (lang: Lang) => (lang === "tr" ? trBlogPosts : posts);
export const blogBase = (lang: Lang) => (lang === "tr" ? "/tr/blog/" : "/blog/");
export const cardTitle = (p: Post) => p.cardTitle || p.h1 || p.title;

const T = {
  en: { kick: "Blog", h1a: "Training on the floor,", h1b: "in practice.", read: "min read", moreA: "More from", moreB: "the floor." },
  tr: { kick: "Blog", h1a: "Sahada eğitim,", h1b: "pratikte.", read: "dk okuma", moreA: "Sahadan", moreB: "diğer yazılar." },
};
/** Card and article date: as written for English; Turkish posts show a Turkish date ("6 Eylül 2026"). */
function when(p: Post, lang: Lang, card = false) {
  const raw = card ? p.cardDate || p.date : p.date;
  if (lang !== "tr") return raw;
  const d = new Date(p.publishedAt || `${p.date} 12:00 UTC`);
  return Number.isNaN(d.getTime()) ? raw : d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function Bar() { return <Header />; }
const Foot = () => <div className="mt-32"><Footer /></div>;

/** Reading time at 220 words a minute. */
const mins = (p: Post) => Math.max(1, Math.round(p.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220));
const Meta = ({ p, lang }: { p: Post; lang: Lang }) => <p className="text-[13px] text-ink-faint">{when(p, lang, true)} · {mins(p)} {T[lang].read}</p>;

function Card({ p, lang, eager = false }: { p: Post; lang: Lang; eager?: boolean }) {
  return (
    <Link href={`${blogBase(lang)}${p.slug}/`} className="group flex flex-col">
      <div className="aspect-[16/10] overflow-hidden rounded-[20px] bg-[var(--card)]">
        <Picture src={p.card} alt={p.coverAlt || cardTitle(p)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" priority={eager} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
      </div>
      <h2 className="mt-5 text-[19px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink [text-wrap:balance] group-hover:text-ink-muted">{cardTitle(p)}</h2>
      <div className="mt-2"><Meta p={p} lang={lang} /></div>
    </Link>
  );
}

/* Blog index: straight into the articles, newest first, three to a row. The page title is the small label above the
 * grid (the only H1). English at /blog/, Turkish at /tr/blog/ (empty state until the first Turkish post). */
export function BlogIndex({ lang = "en" }: { lang?: Lang }) {
  const list = postsOf(lang); const t = T[lang];
  return (
    <>
      <Header />
      <main id="main" className="container-x relative isolate overflow-x-clip pt-[calc(var(--header-h)+56px)] md:pt-[calc(var(--header-h)+88px)]">
        <span aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-0 -z-10 h-[560px] w-[min(820px,90vw)] rounded-full bg-[radial-gradient(closest-side,rgb(236_103_38/0.22),transparent_75%)]" />
        <p className="inline-flex items-center gap-2.5 text-[13px] font-medium text-ink-faint"><span aria-hidden="true" className="kick-line" />{t.kick}</p>
        <h1 className="kh kh-md mt-5 max-w-[18ch]"><span className="t-ink">{t.h1a}</span> <span className="t-accent">{t.h1b}</span></h1>
        {list.length ? <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{list.map((p, k) => <Card key={p.slug} p={p} lang={lang} eager={k < 3} />)}</div> : <Empty />}
      </main>
      <Foot />
    </>
  );
}

/* Turkish blog before its first post. The English link is a plain NextLink: the i18n Link would turn /blog/ into /tr/blog/. */
function Empty() {
  return (
    <div className="mt-12 max-w-[52ch] rounded-[20px] bg-[var(--card)] p-6 md:p-8">
      <p className="text-[19px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">Türkçe yazılar yakında burada.</p>
      <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">O zamana kadar İngilizce yazılara göz atabilirsiniz.</p>
      <NextLink href="/blog/" hrefLang="en" className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-ink hover:text-ink-muted">İngilizce blog<Arr /></NextLink>
    </div>
  );
}

export function Article({ p, lang = "en" }: { p: Post; lang?: Lang }) {
  const t = T[lang];
  const more = postsOf(lang).filter((x) => x.slug !== p.slug);
  const body = p.title && p.h1 === p.title ? p.body.replace(/^<h1>[\s\S]*?<\/h1>/, "") : p.body;
  // Drop a leading <h2> that only repeats the title (duplicate heading in the DOM).
  const body2 = p.title ? body.replace(/^\s*<h2>([\s\S]*?)<\/h2>/, (m, t) => (t.replace(/<[^>]+>/g, "").trim() === p.title.trim() ? "" : m)) : body;
  return (
    <>
      <Bar />
      <main id="main" className="relative isolate overflow-x-clip pt-[calc(var(--header-h)+48px)] md:pt-[calc(var(--header-h)+80px)]">
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[min(900px,100vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(236_103_38/0.18),transparent_75%)]" />
        <article className="mx-auto max-w-[calc(760px+2*var(--pad-x))] px-[var(--pad-x)]">
          <Link href={blogBase(lang)} className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-ink-muted hover:text-ink"><Arr dir="l" />Blog</Link>
          {p.title && <h1 className="kh kh-md mt-4 [text-wrap:balance]">{p.title}</h1>}
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-ink-faint"><span>{when(p, lang)}</span>{p.author && <><span aria-hidden="true">·</span><span>{p.author}</span></>}<span aria-hidden="true">·</span><span>{mins(p)} {t.read}</span></p>
        </article>
        <div className="mx-auto mt-12 max-w-[calc(1100px+2*var(--pad-x))] px-[var(--pad-x)] md:mt-14"><div className="overflow-hidden rounded-[28px]"><Picture src={p.cover} alt={p.coverAlt || cardTitle(p)} sizes="(min-width: 1100px) 1100px, 100vw" className="block w-full" priority /></div></div>
        <div className="prose-blog mx-auto mt-16 max-w-[calc(760px+2*var(--pad-x))] px-[var(--pad-x)]" dangerouslySetInnerHTML={{ __html: body2 }} />
        {more.length > 0 && <section className="mt-32 container-x">
          <p className="inline-flex items-center gap-2.5 text-[13px] font-medium mb-6 text-ink-faint"><span aria-hidden="true" className="kick-line" />{t.kick}</p>
          <h2 className="v4-h2 mb-10 max-w-[18ch]"><span className="t-ink">{t.moreA}</span> <span className="t-accent">{t.moreB}</span></h2>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{more.map((x) => <Card key={x.slug} p={x} lang={lang} />)}</div>
        </section>}
        <div className="mt-16"><GuideLinks /></div>
      </main>
      <Foot />
    </>
  );
}
