/* Customer stories. A card or a /musteriler/<slug>/ page is published only when every field below is filled AND
 * approved is true (written approval from the customer for name, logo and quote). Never invent a quote or a number.
 * Until then the fields stay null: [ONAY BEKLİYOR]. */
import type M from "./media.json";
export type Case = {
  slug: string; company: string; img: keyof typeof M; approved: boolean;
  quote: string | null; name: string | null; title: string | null; logo: string | null;
  story: { problem: string | null; solution: string | null; result: string | null };
};
const empty = { quote: null, name: null, title: null, logo: null, story: { problem: null, solution: null, result: null } };
export const CASES: Case[] = [
  { slug: "eat-well-drink-joy", company: "Eat Well Drink Joy", img: "case-eatwell", approved: false, ...empty },
  { slug: "bambu-smoothie-bar", company: "Bambu Smoothie Bar", img: "case-bambu", approved: false, ...empty },
  { slug: "gastrofab", company: "Gastrofab", img: "case-gastrofab", approved: false, ...empty },
  { slug: "sistem-teknik", company: "Sistem Teknik Fırınları A.Ş.", img: "case-sistemteknik", approved: false, ...empty },
  { slug: "istinye-insaat", company: "İstinye İnşaat", img: "case-istinye", approved: false, ...empty },
];
export const published = () => CASES.filter((c) => c.approved && c.quote && c.name && c.title && c.logo);
