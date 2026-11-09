"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "./icons";

/* Dark is the default. The choice is stored per browser and applied before paint by the script in app/layout.tsx. */
export function ThemeToggle({ lang = "en", className = "", labels }: { lang?: "en" | "tr"; className?: string; labels?: [string, string] }) {
  const [light, setLight] = useState(false);
  useEffect(() => { setLight(document.documentElement.dataset.theme === "light"); }, []);
  const flip = () => {
    const next = !light; setLight(next);
    if (next) document.documentElement.dataset.theme = "light"; else delete document.documentElement.dataset.theme;
    try { localStorage.setItem("flx-theme", next ? "light" : "dark"); } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#FAF8F5" : "#111111");
  };
  const tr = lang === "tr";
  const label = labels ? (light ? labels[1] : labels[0]) : light ? (tr ? "Koyu moda geç" : "Switch to dark mode") : (tr ? "Açık moda geç" : "Switch to light mode");
  return (
    <button type="button" onClick={flip} aria-label={label} title={label}
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:text-ink ${className}`}>
      {light ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
    </button>);
}
