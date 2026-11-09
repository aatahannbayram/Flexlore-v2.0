"use client";
import { useEffect } from "react";

/* Gentle inertial scrolling for mouse wheels and trackpads, so the page glides like an app instead of jumping in steps.
 * No library. Off for touch, for reduced motion, while a dialog locks the page, and inside anything that scrolls on its
 * own (chat panel, menus, carousels), which keep their native scrolling. Keyboard, scrollbar and anchor jumps are left
 * alone; the target simply re-syncs to wherever the page is. */
export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    const el = document.documentElement;
    let target = window.scrollY, cur = window.scrollY, raf = 0, running = false;
    const max = () => el.scrollHeight - window.innerHeight;
    const scrollsItself = (node: EventTarget | null, dy: number) => {
      for (let n = node as HTMLElement | null; n && n !== document.body && n !== el; n = n.parentElement) {
        const st = getComputedStyle(n);
        if (/(auto|scroll)/.test(st.overflowY) && n.scrollHeight > n.clientHeight + 1) {
          if ((dy > 0 && n.scrollTop + n.clientHeight < n.scrollHeight - 1) || (dy < 0 && n.scrollTop > 0)) return true;
        }
        if (/(auto|scroll)/.test(st.overflowX) && n.scrollWidth > n.clientWidth + 1 && Math.abs(dy) === 0) return true;
      }
      return false;
    };
    const step = () => {
      cur += (target - cur) * 0.11;
      if (Math.abs(target - cur) < 0.5) { cur = target; running = false; }
      window.scrollTo({ top: cur, behavior: "instant" as ScrollBehavior });
      if (running) raf = requestAnimationFrame(step);
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented || el.style.overflow === "hidden" || document.body.style.overflow === "hidden") return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1;
      const dy = e.deltaY * unit;
      if (scrollsItself(e.target, dy)) return;
      e.preventDefault();
      if (!running) { cur = window.scrollY; target = cur; }
      target = Math.max(0, Math.min(max(), target + dy));
      if (!running) { running = true; raf = requestAnimationFrame(step); }
    };
    const onScroll = () => { if (!running) { target = cur = window.scrollY; } };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("wheel", onWheel); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
