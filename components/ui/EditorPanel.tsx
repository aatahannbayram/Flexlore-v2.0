/* The real Flexlore video editor panel (screenshot from the app: start step, stop step, step duration,
 * stickers, text, steps). Shown as an image, never redrawn. */
export function EditorPanel({ className = "", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <picture>
      <source srcSet="/photos/editor-ui.avif" type="image/avif" />
      <img src="/photos/editor-ui.webp" width={802} height={650} loading={eager ? "eager" : "lazy"} decoding="async"
        alt="Flexlore video editor: start step, stop step, step duration, stickers, text and steps"
        className={`block h-auto w-full rounded-[22px] ${className}`} />
    </picture>);
}
