/* Page-wide video registry: at most MAX_PLAYING loops play at once; starting one pauses the oldest. */
const MAX_PLAYING = 2;
const playing: HTMLVideoElement[] = [];
export function playOnly(el: HTMLVideoElement) {
  const i = playing.indexOf(el); if (i >= 0) playing.splice(i, 1);
  playing.push(el);
  while (playing.length > MAX_PLAYING) playing.shift()?.pause();
  el.play().catch(() => {});
}
export function stopVideo(el: HTMLVideoElement) { const i = playing.indexOf(el); if (i >= 0) playing.splice(i, 1); el.pause(); }
export function pauseAll() { playing.splice(0); document.querySelectorAll("video").forEach((v) => v.pause()); }
