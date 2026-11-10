"use client";
/* Cost of poor quality: three inputs on one glass tile, the yearly cost and the preventable share on another, over a
 * dimmed production photo (the PhotoBand shared with the Enterprise tiers). Only the visitor's inputs drive the numbers. */
import { useState } from "react";
import { PhotoBand, glassTile } from "./ui/PhotoBand";
const fmt = (n: number, tr: boolean) => Math.round(n).toLocaleString(tr ? "tr-TR" : "en-US");
const F = ({ l, v, set, min, max, step, unit }: { l: string; v: number; set: (n: number) => void; min: number; max: number; step: number; unit: string }) => (
    <label className="block py-5 first:pt-0 last:pb-0">
      <span className="flex items-baseline justify-between gap-4"><span className="text-[14px] text-white/70">{l}</span>
        <span className="flex items-baseline gap-1">{unit === "€" && <span className="text-white/60">€</span>}<input type="number" min={min} max={max} step={step} value={v} onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))} className="w-20 bg-transparent text-right text-lg font-semibold tracking-tight text-white outline-none" />{unit === "%" && <span className="text-white/60">%</span>}</span></span>
      <input type="range" min={min} max={max} step={step} value={Math.min(v, max)} onChange={(e) => set(Number(e.target.value))} className="mt-3 w-full accent-[#F4F0EB]" style={{ ["--p" as string]: `${(Math.min(v, max) / max) * 100}%` }} aria-label={l} />
    </label>);
export default function Copq({ lang }: { lang: "en" | "tr" }) {
  const tr = lang === "tr";
  const [d, setD] = useState(20); const [c, setC] = useState(50); const [r, setR] = useState(30);
  const month = d * c; const saved = month * (r / 100);
  return (
    <section id="cost-of-poor-quality" aria-labelledby="copq-h" className="container-x scroll-mt-28">
      <PhotoBand img="factory" pos="50% 40%" className="p-6 md:p-12">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/60">{tr ? "Kalitesizlik maliyeti" : "Cost of poor quality"}</p>
        <h2 id="copq-h" className="v4-h2 mt-4 max-w-[18ch]">{tr ? <><span className="t-ink">Hatalı adımın</span> <span className="t-accent">size maliyeti.</span></> : <><span className="t-ink">What a wrong step</span> <span className="t-accent">costs you.</span></>}</h2>
        <p className="mt-4 max-w-[34rem] text-[16px] leading-[1.6] text-white/70">{tr ? "Ayda kaç hata, her biri ne kadar ve ne kadarı önlenebilir? Kendi rakamlarınızla görün." : "How many defects a month, what each costs, and how much could be prevented? See it with your own numbers."}</p>
        <div className="mt-10 grid gap-3 md:grid-cols-12">
          <div className={`${glassTile} p-6 md:col-span-7 md:p-8`}>
            <F l={tr ? "Eğitim kaynaklı hata / ay" : "Training-related defects per month"} v={d} set={setD} min={0} max={500} step={1} unit="" />
            <F l={tr ? "Hata başına maliyet" : "Cost per defect (scrap, rework, returns)"} v={c} set={setC} min={0} max={2000} step={5} unit="€" />
            <F l={tr ? "Önlenebileceğini düşündüğünüz pay" : "Share you think step retraining could prevent"} v={r} set={setR} min={0} max={100} step={5} unit="%" />
          </div>
          <div className={`${glassTile} flex flex-col justify-between gap-8 p-6 md:col-span-5 md:p-8`}>
            <div><p className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/60">{tr ? "Bugünkü maliyet / yıl" : "Current cost / year"}</p><p className="mt-2 text-[clamp(26px,1rem+1.2vw,36px)] font-semibold tracking-[-0.03em]">€{fmt(month * 12, tr)}</p></div>
            <div><p className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/60">{tr ? "Önlenebilir / yıl" : "Preventable / year"}</p><p className="mt-2 text-[clamp(40px,1rem+2.6vw,64px)] font-semibold leading-none tracking-[-0.045em]">€{fmt(saved * 12, tr)}</p></div>
            <p className="text-[12px] leading-[1.5] text-white/60">{tr ? "Tahmin. Yalnızca sizin girdilerinize dayanır; varsayılan değerler örnektir, müşteri verisi ya da Flexlore vaadi değildir." : "Estimate based only on your inputs. Default values are examples, not customer data or a Flexlore promise."}</p>
          </div>
        </div>
      </PhotoBand>
    </section>);
}
