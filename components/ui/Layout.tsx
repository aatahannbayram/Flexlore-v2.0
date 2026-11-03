/** One container and one section rhythm for every page: max 1240 px, 12 columns, gutters 24/16 px,
 *  side padding clamp(16px, 4vw, 48px). Every heading starts on the container's left edge. */
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container-x ${className}`}>{children}</div>;
}

export function Section({ id, tone = "dark", className = "", children, labelledBy, label }: {
  id?: string; tone?: "dark" | "raised" | "light"; className?: string; children: React.ReactNode; labelledBy?: string; label?: string;
}) {
  const bg = tone === "light" ? "bg-light-bg text-light-ink" : tone === "raised" ? "bg-surface-1" : "bg-bg";
  return (
    <section id={id} aria-labelledby={labelledBy} aria-label={label} data-tone={tone} className={`section-y ${bg} ${className}`}>
      <Container>{children}</Container>
    </section>);
}

/** Section heading block: eyebrow, h2, optional lead. Same left edge everywhere. */
export function Heading({ id, eyebrow, title, lead, light = false, className = "" }: {
  id?: string; eyebrow?: string; title: React.ReactNode; lead?: React.ReactNode; light?: boolean; className?: string;
}) {
  return (
    <div className={`max-w-[46rem] ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? "!text-light-muted" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className={`h2 ${eyebrow ? "mt-4" : ""}`}>{title}</h2>
      {lead && <p className={`lead mt-5 measure ${light ? "!text-light-muted" : ""}`}>{lead}</p>}
    </div>);
}
