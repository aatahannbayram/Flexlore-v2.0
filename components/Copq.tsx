"use client";
import { useState } from "react";
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const F = ({ l, v, set, min, max, step, unit }: { l: string; v: number; set: (n: number) => void; min: number; max: number; step: number; unit: string }) => (
    <label className="block py-5 first:pt-0">
      <span className="flex items-baseline justify-between gap-4"><span className="text-sm text-white/65">{l}</span>
        <span className="flex items-baseline gap-1">{unit === "€" && <span className="text-white/70">€</span>}<input type="number" min={min} max={max} step={step} value={v} onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))} className="w-20 bg-transparent text-right text-lg font-semibold tabular-nums tracking-tight outline-none focus:text-ice-400" />{unit === "%" && <span className="text-white/70">%</span>}</span></span>
      <input type="range" min={min} max={max} step={step} value={Math.min(v, max)} onChange={(e) => set(Number(e.target.value))} className="mt-3 w-full accent-ice-300" style={{ ["--p" as string]: `${(Math.min(v, max) / max) * 100}%` }} aria-label={l} />
    </label>);
export default function Copq({ lang }: { lang: "en" | "tr" }) {
  const tr = lang === "tr";
  const [d, setD] = useState(20); const [c, setC] = useState(50); const [r, setR] = useState(30);
  const month = d * c; const saved = month * (r / 100);
  return (
    <section id="cost-of-poor-quality" aria-label={tr ? "Kalitesizlik maliyeti hesaplayıcı" : "Cost of poor quality calculator"} className="py-14 md:py-20">
      <div className="container-x">
        <p className="mono text-xs uppercase tracking-[.2em] text-ice-400">{tr ? "Kalitesizlik maliyeti" : "Cost of poor quality"}</p>
        <h2 className="display mt-4 max-w-[18ch] text-h2">{tr ? "Hatalı adımın size maliyeti." : "What a wrong step costs you."}</h2>
        <div className="mt-10 grid overflow-hidden rounded-2xl md:grid-cols-12">
          <div className="bg-white/[.03] p-7 md:col-span-7 md:p-9">
            <F l={tr ? "Eğitim kaynaklı hata / ay" : "Training-related defects per month"} v={d} set={setD} min={0} max={500} step={1} unit="" />
            <F l={tr ? "Hata başına maliyet" : "Cost per defect (scrap, rework, returns)"} v={c} set={setC} min={0} max={2000} step={5} unit="€" />
            <F l={tr ? "Önlenebileceğini düşündüğünüz pay" : "Share you think step retraining could prevent"} v={r} set={setR} min={0} max={100} step={5} unit="%" />
          </div>
          <div className="flex flex-col justify-between gap-8 bg-white/[.07] p-7 md:col-span-5 md:p-9">
            <div><p className="mono text-xs uppercase tracking-[.2em] text-white/70">{tr ? "Bugünkü maliyet / yıl" : "Current cost / year"}</p><p className="mt-2 text-h3 font-semibold tracking-tight tabular-nums">€{fmt(month * 12)}</p></div>
            <div><p className="mono text-xs uppercase tracking-[.2em] text-white/70">{tr ? "Önlenebilir / yıl" : "Preventable / year"}</p><p className="mt-2 text-h2 font-semibold tracking-tight tabular-nums text-ice-400">€{fmt(saved * 12)}</p></div>
            <p className="text-xs leading-[1.45] text-white/70">{tr ? "Tahmin. Yalnızca sizin girdilerinize dayanır; varsayılan değerler örnektir, müşteri verisi ya da Flexlore vaadi değildir." : "Estimate based only on your inputs. Default values are examples, not customer data or a Flexlore promise."}</p>
          </div>
        </div>
      </div>
    </section>);
}
