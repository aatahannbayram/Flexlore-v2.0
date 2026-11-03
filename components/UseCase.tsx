import Link from "next/link";
import { Bar } from "./Blog";
import { Footer } from "./Sections";
import { I, Arr } from "./Icons";
import { SITE } from "./config";

export type UC = { slug: string; crumb: string; k: string; h1: string; lede: string; img: string; alt: string; quote: string;
  problem: [string, string][]; steps: [string, string][]; out: string[]; faq: { q: string; a: string }[]; related: string };
export const USE_CASES: UC[] = [
  { slug: "master-apprentice-skills-transfer", crumb: "Master-apprentice skills transfer", k: "Use case · Master → apprentice",
    h1: "Master-apprentice skills transfer, on video, step by step.",
    lede: "Your master records the job once, the way it has always been done right. Apprentices replay any step as often as they need, pass a quiz and get signed off. The know-how no longer depends on being on the same shift.",
    img: "/photos/factory.webp", alt: "Technician working at a production line", quote: "\u201cWatch how I do it. Then do it again.\u201d",
    problem: [["Learned by shadowing", "Apprentices copy whoever is on shift. Every handover bends the standard a little."], ["The master is a bottleneck", "One person can only show one apprentice at a time, and only when they are both on shift."], ["Gone on their day off", "When the master is on leave or retires, setups drift and small errors repeat."]],
    steps: [["Master records once", "One phone video of the real job, filmed from the doer's side. No studio, no script."], ["Flexlore splits it into steps", "Each step gets its own clip and a drafted instruction. The master edits and approves."], ["Apprentice replays", "Step by step, at their own pace, at the workstation, until it sticks."], ["Quiz and sign-off", "A short quiz drafted from the steps confirms the order and the checks. The supervisor sees who's ready."]],
    out: ["The master's way, available on every shift", "Apprentices learn without pulling the master off the job", "Readiness by person and by job, not a signature on a form"],
    faq: [{ q: "Does the master need to write anything?", a: "No. The master films the job. Flexlore drafts the steps, the instructions and the quiz; the master reviews and approves them." }, { q: "Can the apprentice rewatch a single step?", a: "Yes. Every step is its own clip, so the apprentice can replay exactly the step they are on." }, { q: "How do we know the apprentice is ready?", a: "Flexlore shows who watched, who completed the work and who passed the quiz, by person, team, shift and location." }],
    related: "installation-training-on-site-orientation" },
  { slug: "installation-training-on-site-orientation", crumb: "Installation training and on-site orientation", k: "Use case · Installation at a customer site",
    h1: "Installation training that stays after your team leaves.",
    lede: "Your team installs a machine at a customer site, runs the orientation and drives away. With Flexlore, the installer films start-up, cleaning and daily checks on that exact machine, so every step is still there for the next shift, months later.",
    img: "/video/warehouse.jpg", alt: "Equipment on site after an installation", quote: "\u201cThe installers left. The know-how stayed.\u201d",
    problem: [["Orientation is a one-day event", "The customer's team sees it once, on install day. New shifts never do."], ["Know-how leaves with the installers", "What the installer explained lives in their head and drives away with them."], ["Questions become support calls", "Every forgotten step turns into a call, a ticket or a site visit."]],
    steps: [["Filmed on the installed unit", "The installer records start-up, changeover, cleaning and daily checks on the machine the customer will run."], ["One step at a time", "Flexlore cuts the video into steps with drafted instructions. Your team approves them."], ["A quiz on the checks that matter", "A short quiz confirms the critical steps are understood."], ["Orientation that stays", "New shifts learn it the same way months later. Linking a QR on the machine to its steps is coming soon."]],
    out: ["Orientation becomes permanent, not a one-day event", "The same standard for every shift at the customer site", "Fewer repeat questions after installation"],
    faq: [{ q: "Can we film on the customer's machine?", a: "Yes, if the customer agrees. All you need is a phone and the installed unit." }, { q: "Is there a QR code on the machine?", a: "QR codes and shareable job links are coming soon. They are on our roadmap, not available today." }, { q: "Who can see the steps?", a: "Access is controlled by role and location. Ask us on the demo call how to set it up for your customers." }],
    related: "master-apprentice-skills-transfer" },
];

export default function UseCase({ c }: { c: UC }) {
  const r = USE_CASES.find((x) => x.slug === c.related)!;
  return (<>
    <Bar />
    <main id="main">
      <section className="relative flex min-h-[88svh] items-end overflow-hidden px-6 pb-14 pt-36 md:px-10">
        <img src={c.img} alt={c.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="relative mx-auto w-full max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="mono text-[12px] uppercase tracking-[.18em] text-white/70"><Link href="/" className="link-u hover:text-white">Home</Link> / <span>Use cases</span> / <span className="text-white/80">{c.crumb}</span></nav>
          <p className="mono mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[.2em] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-flame" />{c.k}</p>
          <h1 className="display mt-4 max-w-[17ch] text-[clamp(2.8rem,7vw,6.8rem)]">{c.h1}</h1>
          <p className="mt-5 max-w-[58ch] text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.4] text-white/80">{c.lede}</p>
          <div className="mt-6 flex flex-wrap gap-3"><a href={SITE.demo} className="btn-p">Book a demo <Arr className="ml-1" /></a><Link href="/pricing/" className="btn-g">See pricing</Link></div>
        </div>
      </section>
      <section className="px-6 py-24 md:px-10" aria-labelledby="uc-p">
        <div className="mx-auto max-w-[1400px]">
          <p className="display text-[clamp(2rem,4.4vw,4.2rem)] text-white/90">{c.quote}</p>
          <h2 id="uc-p" className="eyebrow mt-16">The problem</h2>
          <ul className="mt-6 grid border-t border-white/15 md:grid-cols-3">{c.problem.map(([h, p], i) => <li key={h} className="border-b border-white/15 py-6 md:border-r md:pr-6 md:[&:not(:first-child)]:pl-6 md:last:border-r-0"><span className="mono text-[12px] text-white/70">0{i + 1}</span><p className="mt-3 text-[20px] font-semibold tracking-tight">{h}</p><p className="mt-1.5 text-[16px] leading-[1.4] text-white/70">{p}</p></li>)}</ul>
        </div>
      </section>
      <section className="px-6 pb-24 md:px-10" aria-labelledby="uc-s">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12">
          <div className="md:col-span-4"><h2 id="uc-s" className="display text-[clamp(2.2rem,4.4vw,4rem)]">How it works</h2><p className="mt-3 text-[16px] leading-[1.4] text-white/70">Film it. Approve it. Assign it.</p></div>
          <ol className="border-t border-white/15 md:col-span-8">{c.steps.map(([h, p], i) => <li key={h} className="grid grid-cols-[3rem_1fr] gap-3 border-b border-white/15 py-6"><span className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/15 text-white/80">{[<I.record key="a" size={20} />, <I.split key="b" size={20} />, <I.quiz key="c" size={20} />, <I.ready key="d" size={20} />][i]}</span><div><p className="text-[19px] font-semibold tracking-tight">{h}</p><p className="mt-1.5 text-[16px] leading-[1.4] text-white/70">{p}</p></div></li>)}</ol>
        </div>
      </section>
      <section className="px-6 pb-24 md:px-10" aria-labelledby="uc-o">
        <div className="mx-auto max-w-[1400px] border-t border-white/15 pt-12"><h2 id="uc-o" className="eyebrow">What changes</h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">{c.out.map((o) => <li key={o} className="flex gap-3 text-[20px] font-semibold leading-[1.2] tracking-tight"><I.check size={22} className="mt-0.5 shrink-0 text-white/70" />{o}</li>)}</ul></div>
      </section>
      <section className="px-6 pb-24 md:px-10" aria-labelledby="uc-f">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12"><h2 id="uc-f" className="display text-[clamp(2rem,4vw,3.4rem)] md:col-span-4">Questions</h2>
          <div className="border-t border-white/15 md:col-span-8">{c.faq.map((f) => <details key={f.q} className="group border-b border-white/15 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-semibold tracking-tight">{f.q}<span className="text-white/70 transition group-open:rotate-45">+</span></summary><p className="mt-2 max-w-[62ch] text-[16px] leading-[1.45] text-white/65">{f.a}</p></details>)}</div></div>
      </section>
      <section className="px-6 pb-24 md:px-10"><div className="mx-auto max-w-[1400px] border-t border-white/15 pt-10">
        <p className="mono text-[12px] uppercase tracking-[.2em] text-white/70">Related use case</p>
        <Link href={`/use-cases/${r.slug}/`} className="link-u mt-3 inline-block text-[clamp(1.4rem,2.6vw,2.2rem)] font-semibold tracking-tight">{r.crumb} <Arr className="ml-1" /></Link></div></section>
    </main>
    <Footer />
  </>);
}
