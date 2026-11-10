"use client";
import { useState } from "react";
const fmt = (n: number, tr: boolean) => Math.round(n).toLocaleString(tr ? "tr-TR" : "en-US");
const F = ({ l, v, set, min, max, step, unit }: { l: string; v: number; set: (n: number) => void; min: number; max: number; step: number; unit: string }) => (
    <label className="block py-5 first:pt-0">
      <span className="flex items-baseline justify-between gap-4"><span className="text-[14px] text-ink-muted">{l}</span>
        <span className="flex items-baseline gap-1">{unit === "€" && <span className="text-ink-muted">€</span>}<input type="number" min={min} max={max} step={step} value={v} onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))} className="w-20 bg-transparent text-right text-lg font-semibold tracking-tight text-ink outline-none" />{unit === "%" && <span className="text-ink-muted">%</span>}</span></span>
      <input type="range" min={min} max={max} step={step} value={Math.min(v, max)} onChange={(e) => set(Number(e.target.value))} className="mt-3 w-full accent-ice-300" style={{ ["--p" as string]: `${(Math.min(v, max) / max) * 100}%` }} aria-label={l} />
    </label>);
export default function Copq({ lang }: { lang: "en" | "tr" }) {
  const tr = lang === "tr";
  const [d, setD] = useState(20); const [c, setC] = useState(50); const [r, setR] = useState(30);
  const month = d * c; const saved = month * (r / 100);
  return (
    <section id="cost-of-poor-quality" aria-label={tr ? "Kalitesizlik maliyeti hesaplayıcı" : "Cost of poor quality calculator"} className="scroll-mt-28">
      <div className="container-x">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{tr ? "Kalitesizlik maliyeti" : "Cost of poor quality"}</p>
        <h2 className="v4-h2 mt-4 max-w-[18ch]">{tr ? <><span className="t-ink">Hatalı adımın</span> <span className="t-accent">size maliyeti.</span></> : <><span className="t-ink">What a wrong step</span> <span className="t-accent">costs you.</span></>}</h2>
        <div className="mt-10 grid overflow-hidden rounded-[28px] bg-[var(--card)] md:grid-cols-12">
          <div className="p-7 md:col-span-7 md:p-10">
            <F l={tr ? "Eğitim kaynaklı hata / ay" : "Training-related defects per month"} v={d} set={setD} min={0} max={500} step={1} unit="" />
            <F l={tr ? "Hata başına maliyet" : "Cost per defect (scrap, rework, returns)"} v={c} set={setC} min={0} max={2000} step={5} unit="€" />
            <F l={tr ? "Önlenebileceğini düşündüğünüz pay" : "Share you think step retraining could prevent"} v={r} set={setR} min={0} max={100} step={5} unit="%" />
          </div>
          <div className="flex flex-col justify-between gap-8 bg-[var(--card-2)] p-7 md:col-span-5 md:p-10">
            <div><p className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-faint">{tr ? "Bugünkü maliyet / yıl" : "Current cost / year"}</p><p className="mt-2 text-[clamp(26px,1rem+1.2vw,36px)] font-semibold tracking-[-0.03em] text-ink">€{fmt(month * 12, tr)}</p></div>
            <div><p className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-faint">{tr ? "Önlenebilir / yıl" : "Preventable / year"}</p><p className="mt-2 text-[clamp(40px,1rem+2.6vw,64px)] font-semibold leading-none tracking-[-0.045em] text-ink">€{fmt(saved * 12, tr)}</p></div>
            <p className="text-[12px] leading-[1.5] text-ink-faint">{tr ? "Tahmin. Yalnızca sizin girdilerinize dayanır; varsayılan değerler örnektir, müşteri verisi ya da Flexlore vaadi değildir." : "Estimate based only on your inputs. Default values are examples, not customer data or a Flexlore promise."}</p>
          </div>
        </div>
      </div>
    </section>);
}
