// Flexlore icon set: 24px grid, 1.25 stroke, square-ish joins, one optional orange accent stroke.
type P = { size?: number; className?: string; accent?: boolean };
const S = ({ size = 24, className = "", children }: { size?: number; className?: string; children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{children}</svg>);
const A = "#ff6a1a";
export const I = {
  eye: ({ accent = true, ...p }: P) => <S {...p}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.6" stroke={accent ? A : "currentColor"} /></S>,
  steps: ({ accent = true, ...p }: P) => <S {...p}><path d="M4 18h5v-4h5v-4h6" /><path d="M4 21h16" opacity=".35" /><circle cx="20" cy="10" r="1.2" stroke={accent ? A : "currentColor"} /></S>,
  record: ({ accent = true, ...p }: P) => <S {...p}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /><circle cx="9.5" cy="12" r="2" stroke={accent ? A : "currentColor"} /></S>,
  split: ({ accent = true, ...p }: P) => <S {...p}><rect x="3" y="4" width="18" height="4" rx="1" /><path d="M3 12h4M10 12h4M17 12h4M3 17h4M10 17h4" /><path d="M17 17h4" stroke={accent ? A : "currentColor"} /></S>,
  quiz: ({ accent = true, ...p }: P) => <S {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h5" /><path d="m8 16.5 1.6 1.5 3-3" stroke={accent ? A : "currentColor"} /></S>,
  ready: ({ accent = true, ...p }: P) => <S {...p}><circle cx="12" cy="12" r="9" opacity=".35" /><path d="M12 3a9 9 0 0 1 9 9" stroke={accent ? A : "currentColor"} /><path d="m8.5 12 2.4 2.4 4.6-4.8" /></S>,
  hand: ({ accent = true, ...p }: P) => <S {...p}><path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11M10 10V5a1.5 1.5 0 0 1 3 0v5M13 10V6a1.5 1.5 0 0 1 3 0v6" /><path d="M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5A6.5 6.5 0 0 1 6 17.8L3.8 14a1.5 1.5 0 0 1 2.5-1.6L7 13.5" /><path d="M19 4.5 21 3" stroke={accent ? A : "currentColor"} /></S>,
  qr: ({ accent = true, ...p }: P) => <S {...p}><rect x="3.5" y="3.5" width="6" height="6" rx=".8" /><rect x="14.5" y="3.5" width="6" height="6" rx=".8" /><rect x="3.5" y="14.5" width="6" height="6" rx=".8" /><path d="M14.5 14.5h2.5v2.5M20.5 14.5v6h-3.5" /><rect x="5.8" y="5.8" width="1.4" height="1.4" stroke={accent ? A : "currentColor"} /></S>,
  defect: ({ accent = true, ...p }: P) => <S {...p}><path d="M12 3.5 21 19.5H3Z" /><path d="M12 10v4" stroke={accent ? A : "currentColor"} /><path d="M12 16.8v.01" stroke={accent ? A : "currentColor"} /></S>,
  brand: ({ accent = true, ...p }: P) => <S {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 16V8h6M8 12h4.5" /><circle cx="17" cy="16" r="1" stroke={accent ? A : "currentColor"} /></S>,
  plug: ({ accent = true, ...p }: P) => <S {...p}><path d="M9 3v4M15 3v4" /><path d="M6 7h12v3a6 6 0 0 1-12 0Z" /><path d="M12 16v5" stroke={accent ? A : "currentColor"} /></S>,
  chart: ({ accent = true, ...p }: P) => <S {...p}><path d="M3.5 20.5h17" /><path d="M6.5 17v-5M11 17V8M15.5 17v-3" /><path d="M20 17V5" stroke={accent ? A : "currentColor"} /></S>,
  chat: ({ accent = true, ...p }: P) => <S {...p}><path d="M4 5h16v11H9l-5 4Z" /><path d="M8.5 10.5h7" stroke={accent ? A : "currentColor"} /></S>,
  hook: ({ accent = true, ...p }: P) => <S {...p}><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><circle cx="12" cy="6" r="2.5" stroke={accent ? A : "currentColor"} /><path d="m10.8 8.2-3.6 7.6M13.2 8.2l3.6 7.6M8.5 18h7" /></S>,
  lang: ({ accent = true, ...p }: P) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.5 3.8 5.5 3.8 9s-1.2 6.5-3.8 9c-2.6-2.5-3.8-5.5-3.8-9S9.4 5.5 12 3" opacity=".6" /><circle cx="12" cy="12" r="1" stroke={accent ? A : "currentColor"} /></S>,
  phone: ({ accent = true, ...p }: P) => <S {...p}><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" stroke={accent ? A : "currentColor"} /></S>,
  web: ({ accent = true, ...p }: P) => <S {...p}><rect x="2.5" y="4.5" width="19" height="14" rx="1.6" /><path d="M2.5 8h19" /><path d="M8 21h8" /><circle cx="5" cy="6.3" r=".3" stroke={accent ? A : "currentColor"} /></S>,
  arrow: (p: P) => <S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>,
  check: (p: P) => <S {...p}><path d="m5 12.5 4.2 4.2L19 7" /></S>,
  dash: (p: P) => <S {...p}><path d="M7 12h10" opacity=".4" /></S>,
  apple: ({ size = 18, className = "" }: P) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9c-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.6 1.3 10.1.8 1.2 1.8 2.6 3.1 2.5 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-.9-2.4-3.2ZM14 5.3c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4Z" /></svg>,
  play: ({ size = 18, className = "" }: P) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M4.2 2.6 13.6 12l-9.4 9.4c-.3-.2-.5-.6-.5-1V3.6c0-.4.2-.8.5-1Zm10.4 10.4 2.3 2.3-10.6 6 8.3-8.3Zm3.3-3.3 3 1.7c.8.5.8 1.6 0 2.1l-3 1.7-2.6-2.6 2.6-2.9ZM6.3 2.7l10.6 6-2.3 2.3-8.3-8.3Z" /></svg>,
};
export function StoreButtons({ className = "", small = false }: { className?: string; small?: boolean }) {
  const c = `inline-flex items-center gap-2 rounded-full border border-white/25 ${small ? "px-3 py-1.5 text-[12px]" : "px-4 py-2 text-[13px]"} font-medium text-white transition hover:border-white/60 hover:bg-white/5`;
  return (<div className={`flex flex-wrap gap-2 ${className}`}>
    <a className={c} href="https://apps.apple.com/app/flexlore/id6751126206" target="_blank" rel="noopener" aria-label="Download Flexlore on the App Store"><I.apple size={small ? 14 : 16} /><span><span className="sr-only">Download on the </span>App Store</span></a>
    <a className={c} href="https://play.google.com/store/apps/details?id=com.flexlore.app" target="_blank" rel="noopener" aria-label="Get Flexlore on Google Play"><I.play size={small ? 13 : 15} /><span><span className="sr-only">Get it on </span>Google Play</span></a>
  </div>);
}
