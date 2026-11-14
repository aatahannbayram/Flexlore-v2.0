/* Named product events from React code (the script lives in components/Analytics.tsx). Does nothing without consent,
 * without an analytics build, or during prerender. Keep names short and stable: they become report dimensions. */
type Props = Record<string, string | number | boolean>;
export function track(name: string, props?: Props) {
  try { (window as Window & { flxTrack?: (n: string, p?: Props) => void }).flxTrack?.(name, props); } catch {}
}
