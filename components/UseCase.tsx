import Link from "next/link";
import { Bar } from "./Blog";
import { Footer } from "./Sections";
import { I, Arr } from "./Icons";
import { SITE } from "./config";
import { Split } from "./ui/Split";
import { PhotoBand, glassTile } from "./ui/PhotoBand";

/* Two photo bands per use case (the problem, the closing), none the same as its hero photo. */
const UC_BANDS: Record<string, [string, string]> = { "master-apprentice-skills-transfer": ["saha-eldiven-makro", "bakery"], "installation-training-on-site-orientation": ["field", "phone-mount"] };

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
  const r = USE_CASES.find((x) => x.slug === c.related)!; const band = UC_BANDS[c.slug] ?? ["huddle", "office"];
  return (<>
    <Bar />
    <main id="main">
      <section className="dark relative flex min-h-[88svh] items-end overflow-hidden pb-14 pt-36">
        <img src={c.img} alt={c.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="relative w-full container-x">
          <nav aria-label="Breadcrumb" className="mono text-xs uppercase tracking-[.18em] text-white/70"><Link href="/" className="inline-flex min-h-11 items-center hover:text-white">Home</Link> / <span>Use cases</span> / <span className="text-white/80">{c.crumb}</span></nav>
          <p className="mono mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[.2em] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-ice-100" />{c.k}</p>
          <h1 className="display mt-4 max-w-[17ch] text-h1"><Split text={c.h1} /></h1>
          <p className="mt-5 max-w-[58ch] text-lg leading-[1.4] text-white/80">{c.lede}</p>
          <div className="mt-6 flex flex-wrap gap-3"><a href={SITE.demo} className="btn btn-cta">Book a demo <Arr className="ml-1" /></a><Link href="/pricing/" className="btn-g">See pricing</Link></div>
        </div>
      </section>
      <section className="section-y" aria-labelledby="uc-p">
        <div className="container-x">
          <p className="v4-h2 max-w-[22ch]"><span className="t-ink">{c.quote}</span></p>
          <PhotoBand img={band[0]} className="mt-12 p-5 sm:p-8 md:mt-16 md:p-12">
            <h2 id="uc-p" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">The problem</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">{c.problem.map(([h, p], i) => <li key={h} className={`${glassTile} p-6 md:p-7`}><span className="text-[13px] font-semibold tabular-nums text-white/45">0{i + 1}</span><p className="mt-6 text-[19px] font-semibold tracking-[-0.02em]">{h}</p><p className="mt-2 text-[15px] leading-[1.55] text-white/70">{p}</p></li>)}</ul>
          </PhotoBand>
        </div>
      </section>
      <section className="section-y pt-0" aria-labelledby="uc-s">
        <div className="grid container-x gap-10 md:grid-cols-12">
          <div className="md:col-span-4"><h2 id="uc-s" className="v4-h2"><span className="t-ink">How it</span> <span className="t-accent">works</span></h2><p className="mt-3 text-[16px] leading-[1.5] text-ink-muted">Film it. Approve it. Assign it.</p></div>
          <ol className="grid gap-2 md:col-span-8">{c.steps.map(([h, p], i) => <li key={h} className="grid grid-cols-[3rem_1fr] gap-4 rounded-[22px] bg-[var(--card)] p-5 md:p-6"><span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[var(--card-2)] text-ink">{[<I.record key="a" size={20} />, <I.split key="b" size={20} />, <I.quiz key="c" size={20} />, <I.ready key="d" size={20} />][i]}</span><div><p className="text-[18px] font-semibold tracking-[-0.015em]">{h}</p><p className="mt-1.5 text-[15px] leading-[1.55] text-ink-muted">{p}</p></div></li>)}</ol>
        </div>
      </section>
      <section className="section-y pt-0" aria-labelledby="uc-f">
        <div className="grid container-x gap-10 md:grid-cols-12"><h2 id="uc-f" className="v4-h2 md:col-span-4"><span className="t-ink">Questions</span></h2>
          <div className="grid gap-2 md:col-span-8">{c.faq.map((f) => <details key={f.q} className="group rounded-[22px] bg-[var(--card)] px-5 py-4 md:px-6"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-semibold tracking-[-0.01em]">{f.q}<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--card-2)] text-ink-muted transition group-open:rotate-45">+</span></summary><p className="mt-2 max-w-[62ch] pb-2 text-[15px] leading-[1.6] text-ink-muted">{f.a}</p></details>)}</div></div>
      </section>
      <section className="pb-[var(--section-y)]" aria-labelledby="uc-o"><div className="container-x">
        <PhotoBand img={band[1]} tone="center" className="px-5 py-12 text-center sm:px-10 md:py-20">
          <h2 id="uc-o" className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">What changes</h2>
          <ul className="mx-auto mt-6 grid max-w-[60rem] gap-3 text-start md:grid-cols-3">{c.out.map((o) => <li key={o} className={`${glassTile} flex gap-3 p-5 text-[17px] font-semibold leading-[1.3] tracking-[-0.01em]`}><I.check size={20} className="tick mt-0.5 shrink-0" />{o}</li>)}</ul>
          <div className="mt-10 flex flex-wrap justify-center gap-3"><a href={SITE.demo} className="btn btn-cta h-11 px-5 text-[15px]">Book a demo <Arr className="ms-1" /></a>
            <Link href={`/use-cases/${r.slug}/`} className="btn btn-glass-2 h-11 px-5 text-[15px]">{r.crumb}</Link></div>
        </PhotoBand>
      </div></section>
    </main>
    <Footer />
  </>);
}
