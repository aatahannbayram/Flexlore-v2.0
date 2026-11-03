"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X } from "./icons";
import { pauseAll } from "./SmartVideo";
import { EASE } from "./Reveal";

/** 2-minute demo. The YouTube iframe loads only when the modal opens. Focus is trapped, Escape closes,
 *  focus returns to the button that opened it. */
export function VideoModal({ open, onClose, title, youtubeId, closeLabel }: { open: boolean; onClose: () => void; title: string; youtubeId: string; closeLabel: string }) {
  const box = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement; pauseAll();
    document.documentElement.style.overflow = "hidden";
    const f = setTimeout(() => box.current?.querySelector<HTMLElement>("button")?.focus(), 30);
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && box.current) {
        const els = [...box.current.querySelectorAll<HTMLElement>("button, iframe, a[href]")];
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", k);
    return () => { clearTimeout(f); window.removeEventListener("keydown", k); document.documentElement.style.overflow = ""; (opener.current as HTMLElement | null)?.focus?.(); };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <m.div className="fixed inset-0 z-[80] grid place-items-center bg-bg/90 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <m.div ref={box} role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-[1100px]"
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35, ease: EASE }}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-base font-semibold">{title}</p>
              <button type="button" onClick={onClose} aria-label={closeLabel} className="grid h-11 w-11 place-items-center rounded-full border border-line-strong hover:bg-surface-1"><X size={18} aria-hidden="true" /></button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-surface-1">
              <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`} title={title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </m.div>
        </m.div>)}
    </AnimatePresence>);
}
