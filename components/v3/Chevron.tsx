/* The Flexlore motif: the corner line of the flex_x symbol (public/brand/symbol-main.svg), used as a small graphic
 * in kickers, step lists, links and button hovers. Geometry copied from the symbol, not redrawn. */
const UP = "M34.79 34.64C30.78 34.70 26.94 36.21 24.20 38.51L0.00 57.31L0.00 69.64L30.42 46.74C31.34 46.06 32.31 45.47 33.34 45.00C34.26 44.56 35.35 44.56 36.27 45.00C37.30 45.47 38.27 46.06 39.19 46.74L69.61 69.64L69.61 57.31L45.41 38.51C42.67 36.21 38.83 34.70 34.82 34.64Z";
const V = "M44.50 13.69C42.73 15.34 40.60 17.14 38.86 18.80C36.83 20.63 35.82 21.57 34.79 21.57C33.76 21.57 32.75 20.66 30.72 18.80C28.95 17.140 26.82 15.31 25.08 13.69C17.91 7.08 9.32 2.86 0.00 0.00L0.00 11.12C8.38 12.95 15.93 20.24 22.84 26.14C26.47 29.66 30.63 31.54 34.82 31.57C39.01 31.57 43.14 29.66 46.80 26.14C53.68 20.24 61.26 12.95 69.64 11.12L69.64 0.00C60.32 2.83 51.73 7.05 44.56 13.69Z";
const ROT = { up: "", down: "rotate-180", end: "rotate-90 rtl:-rotate-90", start: "-rotate-90 rtl:rotate-90" } as const;
/** One chevron in currentColor. `end` points along the reading direction. */
export function Chev({ dir = "up", className = "" }: { dir?: keyof typeof ROT; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 34 70 36" fill="currentColor" className={`inline-block shrink-0 ${ROT[dir]} ${className}`}><path d={UP} /></svg>;
}
/** Both lines of the symbol: orange corner over the grey wave. */
export function ChevPair({ className = "", ...rest }: { className?: string; "aria-hidden"?: "true" }) {
  return <svg viewBox="0 0 70 70" className={className} {...rest}><path fill="#B2B2B2" d={V} /><path fill="#EC6726" d={UP} /></svg>;
}
