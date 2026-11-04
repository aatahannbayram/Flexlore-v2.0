// Flexlore icon set v17: 24px grid, 2px live area, 1.5 stroke, round caps/joins, monochrome.
// Optical rules: circles r≈8.5, squares 16–17px, strokes land on .5 / whole px for crisp rendering. No accents in icons; colour comes from currentColor.
type P = { size?: number | string; className?: string; accent?: boolean; strokeWidth?: number };
const S = ({ size = 24, className = "", strokeWidth = 1.5, children }: { size?: number | string; className?: string; strokeWidth?: number; children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">{children}</svg>);
const f = (p: P) => { const { accent, ...r } = p; void accent; return r; };
export const I = {
  eye: (p: P) => <S {...f(p)}><path d="M3 12c2-3.6 5-5.5 9-5.5s7 1.9 9 5.5c-2 3.6-5 5.5-9 5.5S5 15.6 3 12Z" /><circle cx="12" cy="12" r="2.5" /></S>,
  steps: (p: P) => <S {...f(p)}><path d="M4.5 6.5h15M4.5 12h10M4.5 17.5h6" /></S>,
  record: (p: P) => <S {...f(p)}><rect x="3.5" y="6.5" width="12" height="11" rx="2.5" /><path d="m15.5 10.5 5-2.5v8l-5-2.5" /></S>,
  split: (p: P) => <S {...f(p)}><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="M9.5 5.5v13M14.5 5.5v13" /></S>,
  quiz: (p: P) => <S {...f(p)}><rect x="4.5" y="3.5" width="15" height="17" rx="2.5" /><path d="M8.5 8.5h7M8.5 12h4" /><path d="m8.5 16 1.6 1.5 3.4-3.5" /></S>,
  ready: (p: P) => <S {...f(p)}><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12.2 2.4 2.3 4.6-4.8" /></S>,
  hand: (p: P) => <S {...f(p)}><path d="M8 12V6.5a1.5 1.5 0 0 1 3 0V11m0-5.5V5a1.5 1.5 0 0 1 3 0v6m0-4.5a1.5 1.5 0 0 1 3 0V14a6.5 6.5 0 0 1-6.5 6.5h-.3a6 6 0 0 1-5-2.7L4.3 15a1.5 1.5 0 0 1 2.4-1.8L8 15" /></S>,
  qr: (p: P) => <S {...f(p)}><rect x="4" y="4" width="6" height="6" rx="1.2" /><rect x="14" y="4" width="6" height="6" rx="1.2" /><rect x="4" y="14" width="6" height="6" rx="1.2" /><path d="M14 14h2.5v2.5M20 14v.01M14 20h.01M17 20h3v-3" /></S>,
  defect: (p: P) => <S {...f(p)}><path d="M10.3 4.5a2 2 0 0 1 3.4 0l7 12a2 2 0 0 1-1.7 3H5a2 2 0 0 1-1.7-3Z" /><path d="M12 10v3.5M12 16.5v.01" /></S>,
  brand: (p: P) => <S {...f(p)}><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M9.5 16.5v-9h5.5M9.5 12h4" /></S>,
  plug: (p: P) => <S {...f(p)}><path d="M9 3.5v4M15 3.5v4M6.5 7.5h11v3a5.5 5.5 0 0 1-11 0ZM12 16v4.5" /></S>,
  chart: (p: P) => <S {...f(p)}><path d="M4 20h16M7 16.5v-4M12 16.5v-9M17 16.5v-6" /></S>,
  chat: (p: P) => <S {...f(p)}><path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3.5v-3.5h0a2 2 0 0 1-2-2Z" /><path d="M8.5 10.5h7" /></S>,
  hook: (p: P) => <S {...f(p)}><circle cx="12" cy="6.5" r="2.5" /><circle cx="6" cy="17.5" r="2.5" /><circle cx="18" cy="17.5" r="2.5" /><path d="m10.7 8.7-3.4 6.6M13.3 8.7l3.4 6.6M8.5 17.5h7" /></S>,
  lang: (p: P) => <S {...f(p)}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.1 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.1-3.5-8.5S9.7 5.8 12 3.5Z" /></S>,
  phone: (p: P) => <S {...f(p)}><rect x="6.5" y="3" width="11" height="18" rx="2.5" /><path d="M10.5 6h3" /></S>,
  ios: (p: P) => <S {...f(p)}><rect x="6.5" y="3" width="11" height="18" rx="3" /><path d="M10.5 5.8h3" /><path d="M10.8 18h2.4" /></S>,
  android: (p: P) => <S {...f(p)}><path d="M5.5 15a6.5 6.5 0 0 1 13 0Z" /><path d="m8 9.6-1.6-2.6M16 9.6l1.6-2.6" /><path d="M9.5 12.5v.01M14.5 12.5v.01" /><path d="M5.5 18h13" /></S>,
  web: (p: P) => <S {...f(p)}><rect x="3" y="4.5" width="18" height="12.5" rx="2" /><path d="M9 20.5h6M12 17v3.5" /></S>,
  arrow: (p: P) => <S {...f(p)}><path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5" /></S>,
  arrowL: (p: P) => <S {...f(p)}><path d="M19 12H5M10.5 6.5 5 12l5.5 5.5" /></S>,
  arrowD: (p: P) => <S {...f(p)}><path d="M12 5v14M6.5 13.5 12 19l5.5-5.5" /></S>,
  arrowUR: (p: P) => <S {...f(p)}><path d="M7 17 17 7M8.5 7H17v8.5" /></S>,
  chevD: (p: P) => <S {...f(p)}><path d="m6.5 9.5 5.5 5.5 5.5-5.5" /></S>,
  check: (p: P) => <S {...f(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></S>,
  dash: (p: P) => <S {...f(p)}><path d="M8 12h8" opacity=".4" /></S>,
  apple: ({ size = 18, className = "" }: P) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9c-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.6 1.3 10.1.8 1.2 1.8 2.6 3.1 2.5 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-.9-2.4-3.2ZM14 5.3c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z" /></svg>,
  play: ({ size = 18, className = "" }: P) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M4.2 2.6 13.6 12l-9.4 9.4c-.3-.2-.5-.6-.5-1V3.6c0-.4.2-.8.5-1Zm10.4 10.4 2.3 2.3-10.6 6 8.3-8.3Zm3.3-3.3 3 1.7c.8.5.8 1.6 0 2.1l-3 1.7-2.6-2.6 2.6-2.9ZM6.3 2.7l10.6 6-2.3 2.3-8.3-8.3Z" /></svg>,
};
/** Store and launch badges, all at the same 44 px height so they sit together as one row.
 *  - App Store: Apple's official artwork (black; EN and TR files from Apple), unaltered, with 1/4-height clear space.
 *  - Google Play: Google's official badge carries the multicolour Play logo (blue), which the Flexlore brand excludes, and Google
 *    does not allow a recoloured badge. So it is a plain black text badge in Apple's proportions, without Google's logo.
 *  - Product Hunt: same text style until Product Hunt's official embed badge (needs our post id) replaces it. */
export function AppStoreBadge({ lang = "en", height = 44 }: { lang?: "en" | "tr"; height?: number }) {
  const tr = lang === "tr";
  return (
    <a href="https://apps.apple.com/tr/app/flexlore/id6751126206" target="_blank" rel="noopener" className="inline-block rounded-[8px] transition-opacity hover:opacity-85">
      <img src={tr ? "/brand/stores/appstore-tr.svg" : "/brand/stores/appstore-en.svg"} alt={tr ? "App Store'dan indirin" : "Download on the App Store"} height={height} width={Math.round(height * (tr ? 3.78 : 2.99))} style={{ height }} className="block w-auto" />
    </a>);
}
/** Google Play badge in the official badge's geometry (646:192, black, #A6A6A6 hairline, small caps line over the
 *  wordmark), sized like the App Store badge next to it. The Play logo itself is left out: it contains blue, which the
 *  brand rules forbid, and Google does not allow it to be recoloured. */
export function StoreBadge({ href, top, name, size = "md" }: { href: string; top: string; name: string; size?: "sm" | "md" }) {
  const h = size === "sm" ? 40 : 44;
  return (
    <a href={href} target="_blank" rel="noopener" style={{ height: h, minWidth: Math.round(h * 3.0) }}
      className="inline-flex flex-col justify-center rounded-[8px] bg-black px-3.5 text-left ring-1 ring-inset ring-[#A6A6A6] transition-opacity hover:opacity-85">
      <span className="text-[9px] font-medium uppercase leading-none tracking-[.04em] text-white">{top}</span>
      <span className={`${size === "sm" ? "text-[17px]" : "text-[19px]"} mt-[3px] font-medium leading-none tracking-[-.015em] text-white`}>{name}</span>
    </a>);
}
export function StoreButtons({ className = "", small = false, lang = "en" }: { className?: string; small?: boolean; lang?: "en" | "tr" }) {
  const tr = lang === "tr";
  return (<div className={`flex flex-wrap items-center gap-3 ${className}`}>
    <AppStoreBadge lang={lang} height={small ? 40 : 44} />
    <StoreBadge href="https://play.google.com/store/apps/details?id=com.flexlore.app&hl=en" top={tr ? "ŞURADAN ALIN" : "GET IT ON"} name="Google Play" size={small ? "sm" : "md"} />
  </div>);
}

/** Inline arrow that sits on the text baseline and inherits colour. */
export const Arr = ({ dir = "r", className = "" }: { dir?: "r" | "l" | "d" | "ur"; className?: string }) => {
  const C = dir === "l" ? I.arrowL : dir === "d" ? I.arrowD : dir === "ur" ? I.arrowUR : I.arrow;
  return <C size="1em" strokeWidth={1.75} className={`inline-block shrink-0 align-[-.14em] transition-transform ${className}`} />; };
