import { PLANS, COMPARE, PRICING, SITE } from "./config";
import { I, Arr } from "./Icons";
import { Bar } from "./Blog";
import { Footer } from "./Sections";
import Copq from "./Copq";

export const PRICING_FAQ = [
  { q: "How much does Flexlore cost?", a: "Flexlore is priced per location, with unlimited operators at each one. The exact plan depends on your team and how you will use it. Book a demo and we will put together the right plan with you." },
  { q: "Do I pay per user?", a: "No. Pricing is per location. Every operator at that location can learn on Flexlore." },
  { q: "Can I try it before I commit?", a: "Ask us on the demo call. We will build one of your real jobs with you so you can see it working on your floor." },
  { q: "Do I need technical skills to set it up?", a: "No. If you can film with a phone, you can create a step-by-step video SOP." },
  { q: "Which devices does it run on?", a: "iOS and Android for your team, plus a web platform for managers." },
  { q: "Who checks what the AI writes?", a: "You do. Steps, instructions and quizzes are drafts until your team approves them." },
  { q: "Does it work across several locations?", a: "Yes. Assign jobs and see readiness by team, shift and location. Control who can view, edit or complete each job by role and location." },
  { q: "Can it carry our branding?", a: "Custom branding is coming soon. Ask us on the demo call how it will fit your plan." },
  { q: "Can we connect Flexlore to our own tools?", a: "An API, connections to the BI tools you already use and an MCP server for AI assistants are coming soon. Tell us what you would connect and we will keep you posted." },
  { q: "How does billing and cancellation work?", a: "See our Subscription & Billing policy, or ask us on the demo call." },
  { q: "Where can I read about data and security?", a: "Our Privacy Policy, Data Processing, Sub-processors and Security pages cover it. Still have questions? Ask on the demo call." },
];

const Cell = ({ v }: { v: boolean | string }) => v === true ? <I.check size={18} className="mx-auto text-white" /> : v === false ? <span className="text-[14px] text-white/70">Not included</span> :
  <span className={`text-[14px] ${v.startsWith("Coming") ? "text-white/75" : "text-white"}`}>{v}</span>;

export default function Pricing() {
  return (<>
    <Bar />
    <main id="main" className="px-6 pt-36 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">Pricing</p>
        <h1 className="display mt-4 max-w-[15ch] text-[clamp(3rem,8vw,7.5rem)]">Pricing that fits your floor.</h1>
        <p className="mt-4 max-w-xl text-lg leading-[1.4] text-white/65">Start with one job. Grow to every team, shift and site. Priced per location, with unlimited operators.</p>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3" aria-label="Plans">
          {PLANS.map((p) => (<li key={p.id} className={`flex flex-col p-7 md:p-8 ${p.featured ? "bg-[#191919]" : "bg-black"}`}>
            <div className="flex items-baseline justify-between"><h2 className="text-[20px] font-semibold tracking-tight">{p.name}</h2>{p.featured && <span className="mono text-[12px] uppercase tracking-[.18em] text-flame">For multi-site teams</span>}</div>
            <p className="mt-1.5 text-[14px] leading-[1.4] text-white/70">{p.for}</p>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-[clamp(1.8rem,3vw,2.4rem)] font-bold tracking-[-.03em]">{p.price ?? "Price on request"}</p>
              <p className="mt-1 text-[14px] text-white/75">{p.price ? PRICING.unit : "Per location"} · {PRICING.operators}</p>
            </div>
            <ul className="mt-6 space-y-2.5 text-[14px] text-white/80">{p.points.map((x) => <li key={x} className="flex gap-2.5"><I.check size={16} className="mt-0.5 shrink-0 text-white/70" />{x}</li>)}</ul>
            <a href={p.checkout ?? SITE.demo} className={`${p.featured ? "btn-p" : "btn-g"} mt-auto self-start`} style={{ marginTop: "2rem" }}>{p.cta} <Arr className="ml-1" /></a>
          </li>))}
        </ul>
        <p className="mono mt-3 text-[14px] uppercase tracking-[.12em] text-white/75">Plan names and contents are indicative. Final plans and prices are confirmed on the demo call.</p>

        <section aria-labelledby="cmp-h" className="mt-28">
          <h2 id="cmp-h" className="display text-[clamp(2.2rem,4.4vw,4rem)]">Compare plans</h2>
          <div className="no-sb mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
              <thead><tr className="border-b border-white/25"><th className="py-3 pr-4 font-normal text-white/70">Feature</th>{PLANS.map((p) => <th key={p.id} className="w-[18%] py-3 text-center font-semibold">{p.name}</th>)}</tr></thead>
              <tbody>{COMPARE.map((r) => <tr key={r.f} className="border-b border-white/10"><td className="py-3.5 pr-4 text-white/80">{r.f}</td>{r.v.map((v, i) => <td key={i} className="py-3.5 text-center">{<Cell v={v} />}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
    <div className="mt-12"><Copq lang="en" /></div>
    <section aria-labelledby="pfaq-h" className="px-6 py-24 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12">
        <h2 id="pfaq-h" className="display text-[clamp(2.2rem,4.4vw,4rem)] md:col-span-4">Pricing questions</h2>
        <div className="border-t border-white/15 md:col-span-8">{PRICING_FAQ.map((f) => (
          <details key={f.q} className="group border-b border-white/15 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-semibold tracking-tight">{f.q}<span className="text-white/70 transition group-open:rotate-45">+</span></summary>
            <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.45] text-white/65">{f.a}</p></details>))}</div>
      </div>
    </section>
    <section className="px-6 pb-24 md:px-10"><div className="mx-auto max-w-[1400px] border-t border-white/15 pt-12">
      <p className="display max-w-[18ch] text-[clamp(2rem,4vw,3.6rem)]">Not sure which plan fits?</p>
      <p className="mt-3 text-[17px] text-white/70">Twenty minutes, one of your real jobs.</p>
      <a href={SITE.demo} className="btn-p mt-6">Book a demo <Arr className="ml-1" /></a></div></section>
    <Footer />
  </>);
}
