"use client";
/* Feature dictionary handed in by a page that already has it (TrProvider on /tr/ pages), so feature pages render in that
 * language during the static build instead of loading it after hydration. */
import { createContext } from "react";
import type { FDict } from "../i18n/features/en";
export const FeatPre = createContext<FDict | null>(null);
