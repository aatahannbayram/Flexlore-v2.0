"use client";
import { LazyMotion, MotionConfig } from "framer-motion";
const features = () => import("./motion-features").then((r) => r.default);
/** Site-wide: honours prefers-reduced-motion and loads animation features after first paint (smaller initial JS).
 *  Components use `m.*` instead of `motion.*` so the full motion bundle stays out of the first load. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={features}><MotionConfig reducedMotion="user">{children}</MotionConfig></LazyMotion>;
}
