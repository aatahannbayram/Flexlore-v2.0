/* Programs and launch strip, in its own module so the home page does not load the whole home copy (every language)
 * just for this row. The label comes from the caller's dictionary. */
import { SITE } from "../config";

/** Programs and launch badges. `as="div"` renders it inside another section (the home hero, over its photo). */
export function TrustStrip({ label, lang = "en", as: T = "section" }: { label: string; lang?: string; as?: "section" | "div" }) {
  const c = { programs: label };
  const list = SITE.programs.filter((p) => !p.flag || SITE.flags[p.flag]); const ph = SITE.flags.productHunt;
  return (
    <T id="main-next" aria-label={c.programs} {...(T === "div" ? { role: "region" } : {})} className={`scroll-mt-[var(--header-h)] ${T === "div" ? "" : "bg-bg"}`}>
      <div className="pt-2 md:pt-4">
        <div className="flex flex-col items-center gap-5">
          <p className="shrink-0 text-[13px] font-medium text-white/45">{c.programs}</p>
          {/* Wide screens: one static, centred row, so no mark is ever cut. Narrower screens: a slow endless row (paused on
              hover, still with reduced motion) with wide faded edges. Each mark sits in the same quiet tile so the row reads
              as one set; official plates (NVIDIA, Google) stay as supplied inside it. */}
          <div className="marquee relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]">
            <ul className="marquee-track flex w-max items-center gap-3">
              {[0, 1].map((copy) => [...list.map((p) => ({ p })), ...(ph ? [{ p: null }] : [])].map(({ p }, k) => (
                <li key={`${copy}-${k}`} aria-hidden={copy === 1 ? true : undefined}>
                  <a href={p ? p.href : "https://www.producthunt.com/products/flexlore-app"} target="_blank" rel="noopener" aria-label={p ? p.name : "Flexlore on Product Hunt"} tabIndex={copy === 1 ? -1 : undefined}
                    className="flex h-14 items-center rounded-[14px] bg-white/[.03] px-5 ring-1 ring-white/[.04] transition-colors duration-300 hover:bg-white/[.07]">
                    {!p ? <span className="flex items-center gap-2.5"><img src="/brand/programs/producthunt.svg" alt="" width={24} height={24} className="block h-6 w-6" /><span className="flex flex-col leading-tight"><span className="text-[14.5px] font-semibold tracking-[-0.02em] text-white">Product Hunt</span><span className="text-[12px] text-white/50">{lang === "tr" ? "Lansman" : "Launch"}</span></span></span>
                    : p.badge && (p.org === "NVIDIA" || p.org === "Google")
                      ? p.caption
                        ? <span className="flex h-9 flex-col items-center justify-center rounded-[6px] bg-[#EDEDED] px-2.5"><img src={p.badge} alt={p.name} width={p.badgeW} height={p.badgeH} className="block h-[11px] w-auto max-w-none" /><span className="mt-0.5 text-[12px] font-medium leading-none text-[#5F6368]">{p.caption}</span></span>
                        : <img src={p.badge} alt={p.name} width={p.badgeW} height={p.badgeH} className="block h-9 w-auto max-w-none rounded-[5px]" />
                      : p.badge && p.org === "Y Combinator"
                        ? <span className="flex items-center gap-2.5"><img src={p.badge} alt="" width={24} height={24} className="block h-6 w-6 rounded-[4px]" /><span className="flex flex-col leading-tight"><span className="text-[14.5px] font-semibold tracking-[-0.02em] text-white">{p.caption}</span><span className="text-[12px] text-white/50">Y Combinator</span></span></span>
                        : p.badge
                          ? <span className="flex flex-col items-start gap-1"><img src={p.badge} alt={p.org} width={p.badgeW} height={p.badgeH} className="block h-[14px] w-auto max-w-none" /><span className="text-[12px] leading-none text-white/50">{p.caption}</span></span>
                          : <span className="flex flex-col leading-tight"><span className="text-[14.5px] font-semibold tracking-[-0.02em] text-white">{p.name}</span><span className="text-[12px] text-white/50">by {p.org}</span></span>}
                  </a>
                </li>)))}
            </ul>
          </div>
        </div>
      </div>
    </T>);
}

