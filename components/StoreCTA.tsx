"use client";
import { useEffect, useState } from "react";
import { SITE } from "./config";
import { Arr, GooglePlayBadge, AppStoreBadge } from "./Icons";

export const APP_STORE_URL = "https://apps.apple.com/app/flexlore/id6751126206";
type OS = "ios" | "android" | "other";

function detect(): OS {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return "ios";
  return "other";
}

/** Plan CTA: iOS -> App Store, Android -> Google Play, desktop/unknown -> both store links. */
export function StoreCTA({ label, primary, tr, className = "" }: { label: string; primary?: boolean; tr?: boolean; className?: string }) {
  const [os, setOs] = useState<OS>("other");
  useEffect(() => setOs(detect()), []);
  const btn = `${primary ? "btn-p" : "btn-g"} self-start`;
  if (os === "ios") return <a href={APP_STORE_URL} target="_blank" rel="noopener" className={`${btn} ${className}`}>{label} <Arr className="ml-1" /></a>;
  if (os === "android") return <a href={SITE.googlePlay} target="_blank" rel="noopener" className={`${btn} ${className}`}>{label} <Arr className="ml-1" /></a>;
  return (
    <div className={`self-start ${className}`} role="group" aria-label={tr ? `${label}: uygulamayı indirin` : `${label}: get the app`}>
      <p className="text-sm font-semibold text-ink">{label}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2.5">
        <AppStoreBadge lang={tr ? "tr" : "en"} height={40} />
        <GooglePlayBadge lang={tr ? "tr" : "en"} height={40} />
      </div>
    </div>
  );
}
