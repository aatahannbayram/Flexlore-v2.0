// Top-level menu labels only (no icons, no descriptions), so the header's first load stays small.
// The full menu content lives in nav.ts and loads on first interaction (see HeaderMenus.tsx).
export const NAV_LABELS: { id: string; label: { en: string; tr: string } }[] = [
  { id: "product", label: { en: "Product", tr: "Ürün" } },
  { id: "industries", label: { en: "Industries", tr: "Sektörler" } },
  { id: "resources", label: { en: "Resources", tr: "Kaynaklar" } },
];
