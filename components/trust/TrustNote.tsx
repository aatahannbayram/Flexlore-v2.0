"use client";
/* One calm line for visitors counted as in Türkiye (see ./config.ts): pricing and support pages. Renders nothing otherwise. */
import Link from "../i18n/Link";
import { useTrustTR } from "./flags";
import { TRUST_TR_LABEL } from "./labels";
import { ArrowRight } from "../ui/icons";

export function TrustNote({ className = "" }: { className?: string }) {
  const t = useTrustTR(); if (!t) return null; const l = TRUST_TR_LABEL[t.tr ? "tr" : "en"];
  return (
    <p className={`text-[14px] text-ink-muted ${className}`}>
      <Link href={t.href} className="group inline-flex min-h-11 items-center gap-2 hover:text-ink">
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-flame" />{l.note}
        <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" /></Link>
    </p>);
}
