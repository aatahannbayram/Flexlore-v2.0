/* Customer stories. The home carousel shows company name, sector and a one-line descriptor (requested by Flexlore,
 * 2026-11-05; written permission to name each customer must be on file). Quotes, names of people, logos and the
 * /musteriler/<slug>/ page appear only when filled in AND approved is true. Never invent a quote or a number.
 * Until then those fields stay null: [ONAY BEKLİYOR]. */
import type M from "./media.json";
export type Case = {
  slug: string; company: string; img: keyof typeof M; approved: boolean;
  /** Sector and descriptor keys into HOME4.cases (sec / desc). Shown on the home carousel with the company name. */
  sec: "food" | "franchise" | "mfg" | "build"; desc: "eatwell" | "bambu" | "gastrofab" | "sistemteknik" | "istinye";
  quote: string | null; name: string | null; title: string | null; logo: string | null;
  story: { problem: string | null; solution: string | null; result: string | null };
};
const empty = { quote: null, name: null, title: null, logo: null, story: { problem: null, solution: null, result: null } };
export const CASES: Case[] = [
  { slug: "eat-well-drink-joy", company: "Eat Well Drink Joy", img: "case-eatwell", sec: "food", desc: "eatwell", approved: false, ...empty },
  { slug: "bambu-smoothie-bar", company: "Bambu Smoothie Bar", img: "case-bambu", sec: "franchise", desc: "bambu", approved: false, ...empty },
  { slug: "gastrofab", company: "Gastrofab", img: "case-gastrofab", sec: "mfg", desc: "gastrofab", approved: false, ...empty },
  { slug: "sistem-teknik", company: "Sistem Teknik Fırınları A.Ş.", img: "case-sistemteknik", sec: "mfg", desc: "sistemteknik", approved: false, ...empty },
  { slug: "istinye-insaat", company: "İstinye İnşaat", img: "case-istinye", sec: "build", desc: "istinye", approved: false, ...empty },
];
export const published = () => CASES.filter((c) => c.approved && c.quote && c.name && c.title && c.logo);
