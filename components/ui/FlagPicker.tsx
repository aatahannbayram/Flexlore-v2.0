"use client";
import { useEffect, useRef, useState } from "react";
import { CaretDown, Check } from "./icons";
import { LOCALES } from "../i18n/locales";
import { useLocale } from "../i18n/LocaleProvider";

/* Language picker: the current language as a round flag and its code; a small menu lists all 8 with their native names. */
/* compact: the header size (36 px, 16 px flag); the mobile menu keeps the 44 px default. */
export function FlagPicker({ up = false, compact = false, className = "" }: { up?: boolean; compact?: boolean; className?: string }) {
  const { locale, setLocale, d } = useLocale(); const [open, setOpen] = useState(false); const box = useRef<HTMLDivElement>(null);
  const cur = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", off); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", off); document.removeEventListener("keydown", esc); };
  }, [open]);
  return (
    <div ref={box} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open} aria-label={`${d.nav.language}: ${cur.name}`}
        className={`flex items-center rounded-full text-ink-muted ${compact ? "h-9 gap-1.5 pe-2.5 ps-2" : "h-11 min-w-11 gap-2 pe-3 ps-2.5"} transition-colors hover:bg-[var(--card-2)] hover:text-ink`}>
        <img src={`/flags/${cur.flag}.svg`} alt="" width={20} height={20} className={`${compact ? "h-4 w-4" : "h-5 w-5"} rounded-full object-cover`} />
        <span className={`${compact ? "text-[12px]" : "text-[13px]"} font-semibold uppercase tracking-[0.04em] text-ink`}>{cur.code}</span>
        <CaretDown size={10} aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="listbox" aria-label={d.nav.language} className={`absolute z-50 w-52 rounded-2xl bg-surface-1 p-1.5 ${up ? "bottom-full mb-2" : "top-full mt-2"} end-0`}>
          {LOCALES.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === locale}>
              <button type="button" lang={l.code} dir={l.dir} onClick={() => { setLocale(l.code); setOpen(false); }}
                className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-start text-[15px] transition-colors hover:bg-surface-2 ${l.code === locale ? "text-ink" : "text-ink-muted"}`}>
                <img src={`/flags/${l.flag}.svg`} alt="" width={20} height={20} className="h-[18px] w-[18px] rounded-full" />
                <span className="flex-1">{l.name}</span>{l.code === locale && <Check size={15} aria-hidden="true" />}
              </button>
            </li>))}
        </ul>)}
    </div>);
}
