"use client";
/* Wraps every /tr/ page (app/tr/layout.tsx): Turkish dictionaries are bundled here (not loaded later), so the static
 * HTML of a Turkish page is Turkish for search engines and there is no English flash. */
import { LocaleProvider } from "./LocaleProvider";
import { tr } from "./home/tr";
import { ftr } from "./features/tr";
import { FeatPre } from "../features/featCtx";
export function TrProvider({ children }: { children: React.ReactNode }) {
  return <LocaleProvider fixed="tr" dict={tr}><FeatPre.Provider value={ftr}>{children}</FeatPre.Provider></LocaleProvider>;
}
