/** Only one page video plays at a time: starting one pauses the rest. */
export function playOnly(el: HTMLVideoElement) {
  document.querySelectorAll("video").forEach((v) => { if (v !== el && !v.paused) v.pause(); });
  el.play().catch(() => {});
}
