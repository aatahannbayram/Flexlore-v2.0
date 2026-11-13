import { Picture } from "./ui/Picture";
import Link from "next/link";
import { SITE } from "./config";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Arr } from "@/components/Icons";
import posts from "@/lib/blog.json";
export type Post = (typeof posts)[number];
export { posts };
export const cardTitle = (p: Post) => p.cardTitle || p.h1;

export function Bar() { return <Header />; }
const Foot = () => <div className="mt-32"><Footer /></div>;

/** First real paragraph of a post as plain text, cut on a word boundary. */
function excerpt(p: Post, n = 190) {
  const m = p.body.match(/<p>([\s\S]*?)<\/p>/); const t = (m ? m[1] : "").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, t.lastIndexOf(" ", n))}…` : t;
}
/** Reading time at 220 words a minute. */
const mins = (p: Post) => Math.max(1, Math.round(p.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220));
const Meta = ({ p }: { p: Post }) => <p className="text-[13px] text-ink-faint">{p.cardDate} · {mins(p)} min read</p>;

function Card({ p }: { p: Post }) {
  return (
    <Link href={`/blog/${p.slug}/`} className="group flex flex-col">
      <div className="aspect-[16/10] overflow-hidden rounded-[20px] bg-[var(--card)]">
        <Picture src={p.card} alt={p.coverAlt || cardTitle(p)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
      </div>
      <h2 className="mt-5 text-[19px] font-semibold leading-[1.25] tracking-[-0.02em] text-ink [text-wrap:balance] group-hover:text-ink-muted">{cardTitle(p)}</h2>
      <div className="mt-2"><Meta p={p} /></div>
    </Link>
  );
}

/* Blog index: the ember hero used on careers and KVKK (title, one line, article count), the newest post as a wide card
 * with its first paragraph, then the rest in a grid. Posts are English only. */
export function BlogIndex() {
  const [first, ...rest] = posts;
  return (
    <>
      <Header overDark />
      <main id="main" className="overflow-x-clip">
        <div>
          <header className="ember dark pb-16 pt-[calc(var(--header-h)+56px)] text-white md:pb-24 md:pt-[calc(var(--header-h)+96px)]">
            <div className="container-x">
              <p className="text-[14px] text-white/60">Blog</p>
              <h1 className="mt-8 max-w-[14ch] text-[clamp(44px,1rem+4.4vw,96px)] font-semibold leading-[0.97] tracking-[-0.05em] [text-wrap:balance]">
                <span className="t-ink">Field notes on</span> <span className="t-accent">frontline training</span></h1>
              <p className="mt-6 max-w-[36rem] text-[18px] leading-[1.6] text-white/70">Short reads on onboarding, standard work, cross-training and keeping new hires safe in their first weeks.</p>
              <span aria-hidden="true" className="ember-line mt-12 block md:mt-16" />
              <p className="pt-5 text-[14px] text-white/55">{posts.length} articles · English</p>
            </div>
          </header>
          <div className="container-x">
            <Link href={`/blog/${first.slug}/`} className="group -mt-0 grid items-center gap-8 pt-16 md:grid-cols-[1.25fr_1fr] md:gap-12 md:pt-24">
              <div className="aspect-[16/10] overflow-hidden rounded-[28px] bg-[var(--card)]">
                <Picture src={first.card} alt={first.coverAlt || cardTitle(first)} sizes="(min-width: 768px) 55vw, 100vw" priority className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]" />
              </div>
              <div>
                <span className="inline-flex rounded-full bg-[var(--card)] px-3 py-1 text-[13px] font-medium text-ink-muted">Latest</span>
                <h2 className="mt-5 text-[clamp(28px,1rem+1.6vw,42px)] font-semibold leading-[1.08] tracking-[-0.035em] text-ink [text-wrap:balance]">{cardTitle(first)}</h2>
                <p className="mt-4 text-[17px] leading-[1.6] text-ink-muted">{excerpt(first)}</p>
                <div className="mt-6 flex items-center justify-between gap-4"><Meta p={first} />
                  <span className="inline-flex items-center gap-2 text-[15px] font-medium text-ink">Read article<Arr className="transition-transform group-hover:translate-x-0.5" /></span></div>
              </div>
            </Link>
            <div className="mt-20 border-t border-line pt-14 md:mt-28">
              <p className="text-[14px] font-medium text-ink-faint">All articles</p>
              <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{rest.map((p) => <Card key={p.slug} p={p} />)}</div>
            </div>
          </div>
        </div>
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
      <main id="main" className="pt-36">
        <article className="mx-auto max-w-[calc(760px+2*var(--pad-x))] px-[var(--pad-x)]">
          <Link href="/blog/" className="mono inline-flex min-h-11 items-center text-xs uppercase tracking-[.18em] text-white/70 hover:text-white"><Arr dir="l" className="mr-1.5" />Articles</Link>
          {p.title && <h1 className="display mt-6 text-h2 leading-[1]">{p.title}</h1>}
          <p className="mono mt-6 flex gap-4 text-xs uppercase tracking-[.18em] text-white/70"><span>{p.date}</span>{p.author && <span className="text-white/70">{p.author}</span>}</p>
        </article>
        <div className="mx-auto mt-12 max-w-[1100px] overflow-hidden rounded-3xl"><Picture src={p.cover} alt={p.coverAlt || cardTitle(p)} sizes="(min-width: 1100px) 1100px, 100vw" className="w-full" priority /></div>
        <div className="prose-blog mx-auto mt-16 max-w-[760px]" dangerouslySetInnerHTML={{ __html: body2 }} />
        <section className="mt-32 container-x">
          <p className="mono mb-10 text-xs uppercase tracking-[.18em] text-white/70">Articles</p>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{more.map((x) => <Card key={x.slug} p={x} />)}</div>
        </section>
      </main>
      <Foot />
    </>
  );
}
