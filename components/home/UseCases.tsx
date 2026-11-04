import Link from "next/link";
import { Reveal, RevealItem } from "../ui/Reveal";
import { ArrowRight, ShieldCheck, MapPin, CookingPot, GraduationCap, UserPlus, Storefront } from "../ui/icons";
import { CASES, CASES_HEAD } from "./cases";

/* Use cases: calm, text-first cards (icon, tag, a title people search for, one answering line, link).
   Server component: the copy ships as HTML, not JS. Both languages are rendered; CSS shows the one matching
   <main lang> (see .l-en / .l-tr in globals.css), so the client language toggle still works. */
const ICONS = { safety: ShieldCheck, site: MapPin, recipe: CookingPot, apprentice: GraduationCap, onboard: UserPlus, franchise: Storefront };
const T = ({ en, tr }: { en: string; tr: string }) => <><span className="l-en">{en}</span><span className="l-tr" lang="tr">{tr}</span></>;

export function UseCases() {
  const e = CASES_HEAD.en, r = CASES_HEAD.tr;
  return (
    <section id="use-cases" aria-labelledby="uc-h" className="section-y bg-bg">
      <div className="container-x">
        <div className="max-w-[46rem]">
          <p className="eyebrow"><T en={e.k} tr={r.k} /></p>
          <h2 id="uc-h" className="h2 mt-4"><T en={e.h} tr={r.h} /></h2>
          <p className="lead measure mt-5"><T en={e.lead} tr={r.lead} /></p>
        </div>
        <Reveal as="ul" stagger={0.05} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => { const Ic = ICONS[c.icon]; return (
            <RevealItem as="li" key={c.id}>
              <Link href={c.href} className="group flex h-full flex-col rounded-[22px] bg-surface-1 p-6 transition-colors duration-300 hover:bg-surface-2 md:p-7">
                <span className="flex items-center justify-between gap-3">
                  <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-xl bg-white/[.06] text-ice-200 transition-colors duration-300 group-hover:bg-white/[.1] group-hover:text-ink"><Ic size={20} /></span>
                  <span className="text-[13px] text-ice-400"><T {...c.tag} /></span>
                </span>
                <h3 className="mt-7 text-[19px] font-semibold leading-[1.25] tracking-[-.015em] text-ink"><T {...c.h} /></h3>
                <p className="mt-2.5 text-[15px] leading-[1.55] text-ice-400"><T {...c.p} /></p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-[14px] font-medium text-ice-200 transition-colors group-hover:text-ink">
                  <T en={e.more} tr={r.more} /><ArrowRight size={13} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealItem>); })}
        </Reveal>
      </div>
    </section>);
}
