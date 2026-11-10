/** Heading in the house style: silver words, the last third in orange. */
export function Split({ text }: { text: string }) {
  const w = text.split(" ");
  if (w.length < 2) return <span className="t-ink">{text}</span>;
  const n = w.length - Math.max(1, Math.ceil(w.length / 3));
  return <><span className="t-ink">{w.slice(0, n).join(" ")}</span> <span className="t-accent">{w.slice(n).join(" ")}</span></>;
}
