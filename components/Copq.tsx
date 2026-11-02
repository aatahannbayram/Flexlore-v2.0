"use client";
import { useState } from "react";
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
const F = ({ l, v, set, min, max, step, unit }: { l: string; v: number; set: (n: number) => void; min: number; max: number; step: number; unit: string }) => (
    <label className="block border-t border-white/15 py-6">
      <span className="flex items-baseline justify-between gap-4"><span className="text-[15px] text-white/70">{l}</span>
        <span className="flex items-baseline gap-1"><input type="number" min={min} max={max} step={step} value={v} onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))} className="w-24 bg-transparent text-right text-2xl font-semibold tracking-tight outline-none focus:text-flame" /><span className="text-white/50">{unit}</span></span></span>
      <input type="range" min={min} max={max} step={step} value={Math.min(v, max)} onChange={(e) => set(Number(e.target.value))} className="mt-4 w-full accent-[#ff6a1a]" aria-label={l} />
    </label>);
export default function Copq({ lang }: { lang: "en" | "tr" }) {
  const tr = lang === "tr";
  const [d, setD] = useState(20); const [c, setC] = useState(50); const [r, setR] = useState(30);
  const month = d * c; const saved = month * (r / 100);
  return (
    <section id="cost-of-poor-quality" aria-label={tr ? "Kalitesizlik maliyeti hesaplayıcı" : "Cost of poor quality calculator"} className="px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mono text-[11px] uppercase tracking-[.2em] text-flame">{tr ? "Kalitesizlik maliyeti" : "Cost of poor quality"}</p>
          <h2 className="display mt-4 text-[clamp(2.8rem,5.5vw,5.2rem)]">{tr ? "Hatalı adımın size maliyeti." : "What a wrong step costs you."}</h2>
          <p className="mt-4 max-w-md text-lg leading-[1.3] text-white/70">{tr ? "Kendi rakamlarınızı girin. Hesap tamamen sizin girdilerinize dayanır; Flexlore'un bir vaadi değildir." : "Enter your own numbers. The result is based only on your inputs. It is not a Flexlore promise or benchmark."}</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <F l={tr ? "Eğitim kaynaklı hata / ay" : "Training-related defects per month"} v={d} set={setD} min={0} max={500} step={1} unit="" />
          <F l={tr ? "Hata başına maliyet (fire, yeniden işleme, iade)" : "Cost per defect (scrap, rework, returns)"} v={c} set={setC} min={0} max={2000} step={5} unit="€" />
          <F l={tr ? "Doğru adım eğitimiyle önlenebileceğini düşündüğünüz pay" : "Share you think step retraining could prevent"} v={r} set={setR} min={0} max={100} step={5} unit="%" />
          <div className="grid grid-cols-2 border-y border-white/15">
            <div className="py-6"><p className="mono text-[10px] uppercase tracking-[.2em] text-white/45">{tr ? "Bugünkü maliyet / yıl" : "Current cost / year"}</p><p className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight tabular-nums">€{fmt(month * 12)}</p></div>
            <div className="border-l border-white/15 py-6 pl-6"><p className="mono text-[10px] uppercase tracking-[.2em] text-white/45">{tr ? "Önlenebilir / yıl" : "Preventable / year"}</p><p className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-tight tabular-nums text-flame">€{fmt(saved * 12)}</p></div>
          </div>
          <p className="mono mt-4 text-[10px] uppercase leading-[1.4] tracking-[.16em] text-white/40">{tr ? "Tahmin · varsayılan değerler yalnızca örnektir · müşteri verisi değildir" : "Estimate · default values are examples only · not customer data"}</p>
        </div>
      </div>
    </section>);
}
