"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { m } from "framer-motion";
import { NAV, navHref } from "../nav";
import type { Lang } from "../copy";
import { MagnifyingGlass, ArrowRight } from "./icons";
import { EASE } from "./Reveal";

/** ⌘K search over every page and section. Loaded on demand (next/dynamic) so it costs nothing until opened.
 *  Arrow keys move, Enter opens, Escape closes; focus stays in the dialog and returns to the opener. */
export default function CommandPalette({ lang, onHome, onClose }: { lang: Lang; onHome: boolean; onClose: () => void }) {
  const tr = lang === "tr";
  const [q, setQ] = useState(""); const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null); const box = useRef<HTMLDivElement>(null);
  const all = useMemo(() => NAV.flatMap((g) => g.items.map((it) => ({ g: g.label[lang], it }))), [lang]);
  const norm = (s: string) => s.toLocaleLowerCase(tr ? "tr" : "en");
  const list = useMemo(() => { const n = norm(q.trim()); return n ? all.filter(({ it, g }) => norm(`${it.t[lang]} ${it.d[lang]} ${g} ${it.t.en} ${it.t.tr}`).includes(n)) : all; }, [q, all, lang]);
  useEffect(() => { setI(0); }, [q]);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden"; input.current?.focus();
    return () => { document.documentElement.style.overflow = ""; opener?.focus?.(); };
  }, []);
  const go = (k: number) => { const r = list[k]; if (!r) return; onClose(); window.location.href = navHref(r.it, onHome); };
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(list.length - 1, v + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(0, v - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); go(i); }
    else if (e.key === "Tab") { e.preventDefault(); input.current?.focus(); }
  };
  useEffect(() => { box.current?.querySelector<HTMLElement>(`[data-i="${i}"]`)?.scrollIntoView({ block: "nearest" }); }, [i]);
  return (
    <m.div className="fixed inset-0 z-[90] flex items-start justify-center bg-bg/80 px-4 pt-[12vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} onKeyDown={key}>
      <m.div role="dialog" aria-modal="true" aria-label={tr ? "Sitede ara" : "Search the site"} className="w-full max-w-[600px] overflow-hidden rounded-[24px] bg-surface-1"
        initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease: EASE }}>
        <div className="flex items-center gap-3 px-5">
          <MagnifyingGlass size={18} className="text-ice-400" />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder={tr ? "Sayfa, sektör ya da konu arayın" : "Search pages, industries or topics"}
            aria-label={tr ? "Ara" : "Search"} aria-controls="cmdk-list" aria-activedescendant={list[i] ? `cmdk-${i}` : undefined} role="combobox" aria-expanded="true"
            className="cmdk-input h-16 flex-1 bg-transparent text-[17px] text-ink placeholder:text-ink-faint" />
          <kbd className="rounded-md bg-white/[.06] px-2 py-1 text-xs text-ice-400">esc</kbd>
        </div>
        <div ref={box} id="cmdk-list" role="listbox" className="max-h-[52vh] overflow-y-auto px-2 pb-2">
          {list.length === 0 && <p className="px-4 py-8 text-center text-ink-faint">{tr ? "Sonuç yok" : "No results"}</p>}
          {list.map(({ it, g }, k) => { const Ic = it.icon; const on = k === i; return (
            <button key={it.href + k} id={`cmdk-${k}`} data-i={k} role="option" aria-selected={on} type="button" onMouseMove={() => setI(k)} onClick={() => go(k)}
              className={`flex w-full items-center gap-3.5 rounded-2xl px-3 py-2.5 text-left transition-colors ${on ? "bg-white/[.07]" : ""}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[.06] text-ink"><Ic size={18} /></span>
              <span className="min-w-0 flex-1"><span className="block truncate text-[15px] font-medium">{it.t[lang]}</span><span className="block truncate text-[13px] text-ink-muted">{it.d[lang]}</span></span>
              <span className="text-xs text-ink-faint">{g}</span>
              {on && <ArrowRight size={14} className="text-ice-300" />}
            </button>); })}
        </div>
      </m.div>
    </m.div>);
}
