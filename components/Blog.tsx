import Link from "next/link";
import { Footer } from "./Sections";
import { Arr } from "@/components/Icons";
import posts from "@/lib/blog.json";
export type Post = (typeof posts)[number];
export { posts };
export const cardTitle = (p: Post) => p.cardTitle || p.h1;

export function Bar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent px-6 py-4 pb-10 md:px-10">
      <Link href="/" className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.04em]"><img src="/brand/wordmark-light.png" alt="Flexlore" width={166} height={36} className="h-8 w-auto" /></Link>
      <nav aria-label="Primary" className="flex items-center gap-6 text-[13px]">
        <Link href="/#imagine" className="link-u hidden text-white/60 hover:text-white sm:inline">Your business</Link>
        <Link href="/pricing/" className="link-u text-white/70 hover:text-white">Pricing</Link>
        <Link href="/blog/" className="link-u text-white/70 hover:text-white">Blog</Link>
        <a href="https://app-eu1.hubspot.com/meetings/alper-kalip?uuid=6feee1d8-83b2-400a-b3f2-929119a9047d" className="btn-p">Book a demo</a>
      </nav>
    </header>
  );
}
const Foot = () => <div className="mt-32"><Footer /></div>;

function Card({ p, big = false }: { p: Post; big?: boolean }) {
  return (
    <Link href={`/blog/${p.slug}/`} className="group block">
      <div className={`overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 ${big ? "aspect-[16/9]" : "aspect-[16/9]"}`}>
        <img src={p.card} alt={p.coverAlt || cardTitle(p)} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
      </div>
      <h2 className={`mt-5 font-semibold tracking-[-0.03em] text-white ${big ? "text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.05]" : "text-[20px] leading-[1.2]"}`}>{cardTitle(p)}</h2>
      <p className="mono mt-3 text-[11px] uppercase tracking-[.18em] text-white/45">{p.cardDate}</p>
    </Link>
  );
}

export function BlogIndex() {
  const [first, ...rest] = posts;
  return (
    <>
      <Bar />
      <main id="main" className="mx-auto max-w-[1400px] px-6 pt-36 md:px-10">
        <p className="mono text-[12px] uppercase tracking-[.18em] text-flame">Flexlore</p>
        <h1 className="display mt-4 text-[clamp(3.2rem,9vw,8rem)]">Articles</h1>
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
  return (
    <>
      <Bar />
      <main id="main" className="px-6 pt-36 md:px-10">
        <article className="mx-auto max-w-[760px]">
          <Link href="/blog/" className="mono text-[11px] uppercase tracking-[.18em] text-white/45 hover:text-white"><Arr dir="l" className="mr-1.5" />Articles</Link>
          {p.title && <h1 className="display mt-6 text-[clamp(2.4rem,6vw,4.6rem)] leading-[1]">{p.title}</h1>}
          <p className="mono mt-6 flex gap-4 text-[11px] uppercase tracking-[.18em] text-white/45"><span>{p.date}</span>{p.author && <span className="text-white/70">{p.author}</span>}</p>
        </article>
        <div className="mx-auto mt-12 max-w-[1100px] overflow-hidden rounded-3xl ring-1 ring-white/10"><img src={p.cover} alt={p.coverAlt || cardTitle(p)} className="w-full" /></div>
        <div className="prose-blog mx-auto mt-16 max-w-[760px]" dangerouslySetInnerHTML={{ __html: body }} />
        <section className="mx-auto mt-32 max-w-[1400px]">
          <p className="mono mb-10 text-[11px] uppercase tracking-[.18em] text-white/45">Articles</p>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{more.map((x) => <Card key={x.slug} p={x} />)}</div>
        </section>
      </main>
      <Foot />
    </>
  );
}
