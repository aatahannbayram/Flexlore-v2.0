"use client";
import { useEffect } from "react";
import { m } from "framer-motion";

// Route change crossfade (0.3 s). The first page load is never faded: server HTML stays visible without JS and LCP is untouched.
let navigated = false;
export default function Template({ children }: { children: React.ReactNode }) {
  const animate = navigated;
  useEffect(() => { navigated = true; }, []);
  if (!animate) return <>{children}</>;
  return <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>{children}</m.div>;
}
