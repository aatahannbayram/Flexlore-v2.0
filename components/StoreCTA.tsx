"use client";
import { useEffect, useState } from "react";
import { SITE } from "./config";
import { I, Arr } from "./Icons";

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
  const s = "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] font-medium ring-1 ring-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EC6726]";
  return (
    <div className={`self-start ${className}`} role="group" aria-label={tr ? `${label}: uygulamayı indirin` : `${label}: get the app`}>
      <p className="text-[14px] font-semibold text-white">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <a href={APP_STORE_URL} target="_blank" rel="noopener" className={s} aria-label={tr ? "App Store'dan indirin" : "Download on the App Store"}><I.apple size={14} /><span>App Store</span></a>
        <a href={SITE.googlePlay} target="_blank" rel="noopener" className={s} aria-label={tr ? "Google Play'den alın" : "Get it on Google Play"}><I.play size={13} /><span>Google Play</span></a>
      </div>
    </div>
  );
}
