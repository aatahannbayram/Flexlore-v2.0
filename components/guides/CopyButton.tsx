"use client";
import { useState } from "react";
import { track } from "../track";

/** Copies a template as plain text (tab-separated tables paste straight into a spreadsheet). */
export function CopyButton({ text, label, done, id }: { text: string; label: string; done: string; id: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" className="btn btn-cta" aria-live="polite"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); } catch {
          const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove();
        }
        setOk(true); setTimeout(() => setOk(false), 2200); track("template_copy", { guide: id });
      }}>{ok ? done : label}</button>
  );
}
