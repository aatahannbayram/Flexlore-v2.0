import { Picture } from "./ui/Picture";
import Link from "next/link";
import { SITE } from "./config";
import { Footer } from "./Sections";
import { Header } from "./Header";
import { Arr } from "@/components/Icons";
import posts from "@/lib/blog.json";
export type Post = (typeof posts)[number];
export { posts };
export const cardTitle = (p: Post) => p.cardTitle || p.h1;

export function Bar() { return <Header />; }
const Foot = () => <div className="mt-32"><Footer /></div>;

function Card({ p, big = false }: { p: Post; big?: boolean }) {
  return (
    <Link href={`/blog/${p.slug}/`} className="group block">
      <div className={`overflow-hidden rounded-2xl bg-white/5   ${big ? "aspect-[16/9]" : "aspect-[16/9]"}`}>
        <Picture src={p.card} alt={p.coverAlt || cardTitle(p)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
      </div>
      <h2 className={`mt-5 font-semibold tracking-[-0.03em] text-white ${big ? "text-h3 leading-[1.05]" : "text-lg leading-[1.2]"}`}>{cardTitle(p)}</h2>
      <p className="mono mt-3 text-xs uppercase tracking-[.18em] text-white/70">{p.cardDate}</p>
    </Link>
  );
}

export function BlogIndex() {
  const [first, ...rest] = posts;
  return (
    <>
      <Bar />
      <main id="main" className="container-x pt-36">
        <p className="mono text-xs uppercase tracking-[.18em] text-ice-400">Flexlore</p>
        <h1 className="display mt-4 text-h1">Articles</h1>
        <div className="mt-16"><Card p={first} big /></div>
        <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">{rest.map((p) => <Card key={p.slug} p={p} />)}</div>
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
          <Link href="/blog/" className="mono text-xs uppercase tracking-[.18em] text-white/70 hover:text-white"><Arr dir="l" className="mr-1.5" />Articles</Link>
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
