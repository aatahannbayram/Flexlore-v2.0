import { Picture } from "./ui/Picture";
import Link from "./i18n/Link";
import { SITE } from "./config";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Arr } from "@/components/Icons";
import { GuideLinks } from "./guides/GuideLinks";
import posts from "@/lib/blog.json";
export type Post = (typeof posts)[number];
export { posts };
export const cardTitle = (p: Post) => p.cardTitle || p.h1;

export function Bar() { return <Header />; }
const Foot = () => <div className="mt-32"><Footer /></div>;

/** Reading time at 220 words a minute. */
const mins = (p: Post) => Math.max(1, Math.round(p.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220));
const Meta = ({ p }: { p: Post }) => <p className="text-[13px] text-ink-faint">{p.cardDate} · {mins(p)} min read</p>;

function Card({ p, eager = false }: { p: Post; eager?: boolean }) {
  return (
    <Link href={`/blog/${p.slug}/`} className="group flex flex-col">
      <div className="aspect-[16/10] overflow-hidden rounded-[20px] bg-[var(--card)]">
        <Picture src={p.card} alt={p.coverAlt || cardTitle(p)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" priority={eager} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
      </div>
      <h2 className="mt-5 text-[19px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink [text-wrap:balance] group-hover:text-ink-muted">{cardTitle(p)}</h2>
      <div className="mt-2"><Meta p={p} /></div>
    </Link>
  );
}

/* Blog index: straight into the articles, newest first, three to a row. The page title is the small label above the
 * grid (the only H1). Posts are English only. */
export function BlogIndex() {
  return (
    <>
      <Header />
      <main id="main" className="container-x relative isolate overflow-x-clip pt-[calc(var(--header-h)+56px)] md:pt-[calc(var(--header-h)+88px)]">
        <span aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-0 -z-10 h-[560px] w-[min(820px,90vw)] rounded-full bg-[radial-gradient(closest-side,rgb(236_103_38/0.22),transparent_75%)]" />
        <p className="inline-flex items-center gap-2.5 text-[13px] font-medium text-ink-faint"><span aria-hidden="true" className="kick-line" />Blog</p>
        <h1 className="kh kh-md mt-5 max-w-[18ch]"><span className="t-ink">Training on the floor,</span> <span className="t-accent">in practice.</span></h1>
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p, k) => <Card key={p.slug} p={p} eager={k < 3} />)}</div>
      </main>
      <Foot />
    </>
  );
}

export function Article({ p }: { p: Post }) {
  const more = posts.filter((x) => x.slug !== p.slug);
  const body = p.title && p.h1 === p.title ? p.body.replace(/^<h1>[\s\S]*?<\/h1>/, "") : p.body;
  // Drop a leading <h2> that only repeats the title (duplicate heading in the DOM).
  const body2 = p.title ? body.replace(/^\s*<h2>([\s\S]*?)<\/h2>/, (m, t) => (t.replace(/<[^>]+>/g, "").trim() === p.title.trim() ? "" : m)) : body;
  return (
    <>
      <Bar />
      <main id="main" className="relative isolate overflow-x-clip pt-[calc(var(--header-h)+48px)] md:pt-[calc(var(--header-h)+80px)]">
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[min(900px,100vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(236_103_38/0.18),transparent_75%)]" />
        <article className="mx-auto max-w-[calc(760px+2*var(--pad-x))] px-[var(--pad-x)]">
          <Link href="/blog/" className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-ink-muted hover:text-ink"><Arr dir="l" />Blog</Link>
          {p.title && <h1 className="kh kh-md mt-4 [text-wrap:balance]">{p.title}</h1>}
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-ink-faint"><span>{p.date}</span>{p.author && <><span aria-hidden="true">·</span><span>{p.author}</span></>}<span aria-hidden="true">·</span><span>{mins(p)} min read</span></p>
        </article>
        <div className="mx-auto mt-12 max-w-[calc(1100px+2*var(--pad-x))] px-[var(--pad-x)] md:mt-14"><div className="overflow-hidden rounded-[28px]"><Picture src={p.cover} alt={p.coverAlt || cardTitle(p)} sizes="(min-width: 1100px) 1100px, 100vw" className="block w-full" priority /></div></div>
        <div className="prose-blog mx-auto mt-16 max-w-[760px]" dangerouslySetInnerHTML={{ __html: body2 }} />
        <section className="mt-32 container-x">
          <p className="inline-flex items-center gap-2.5 text-[13px] font-medium mb-6 text-ink-faint"><span aria-hidden="true" className="kick-line" />Blog</p>
          <h2 className="v4-h2 mb-10 max-w-[18ch]"><span className="t-ink">More from</span> <span className="t-accent">the floor.</span></h2>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{more.map((x) => <Card key={x.slug} p={x} />)}</div>
        </section>
        <div className="mt-16"><GuideLinks /></div>
      </main>
      <Foot />
    </>
  );
}
