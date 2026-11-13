"use client";
/* Motion lab: the proposed motion system next to what the site does today, so the team can choose by feel.
 * A tone switch (calm / lively) changes distances, durations, stagger and light strength in every demo at once.
 * Internal only (noindex, not linked). Turkish labels: the reviewers are the Flexlore team. */
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { m, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Play } from "../ui/icons";

type Tone = "calm" | "lively";
const EASE = [0.22, 1, 0.36, 1] as const;
const T = {
  calm: { dist: 12, dur: 0.7, stagger: 0.06, spot: 0.09, lift: 2, zoom: 1.04, par: 0.6, label: "Sakin ve premium" },
  lively: { dist: 32, dur: 0.9, stagger: 0.11, spot: 0.18, lift: 6, zoom: 1.08, par: 1.3, label: "Canlı ve gösterişli" },
};
const PHOTOS = ["phone-mount", "ws-j-brifing", "hotel-desk", "qr-scan", "huddle", "food-qa"];
const NAMES = ["Videodan SOP", "Otomatik çeviri", "Yetki ve çalışma alanları", "İş başında QR", "Bildirimler", "Yapay zekâ quiz"];
const img = (n: string, w = 800) => `/photos/${n}-${w}.webp`;

function Block({ n, title, note, children }: { n: string; title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-14 md:py-20">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[13px] font-semibold tabular-nums text-flame">{n}</p>
          <h2 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.03em]">{title}</h2>
          <p className="mt-3 max-w-[26rem] text-[15px] leading-[1.6] text-ink-muted">{note}</p>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>);
}
const Replay = ({ onClick, label = "Tekrar oynat" }: { onClick: () => void; label?: string }) => (
  <button type="button" onClick={onClick} className="grid min-h-11 place-items-center"><span className="btn btn-glass-2 !h-[34px] !min-h-[34px] !px-3.5 !text-[13px]"><Play size={11} weight="fill" aria-hidden="true" />{label}</span></button>);
const Tag = ({ children, on = false }: { children: React.ReactNode; on?: boolean }) => (
  <p className={`mb-3 inline-flex items-center gap-1.5 text-[12px] font-medium ${on ? "text-ink" : "text-ink-faint"}`}><span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-flame" : "bg-ink-faint"}`} />{children}</p>);

/* 1. Timing: same six tiles, today's mixed durations vs one duration and an even stagger. */
function Timing({ t }: { t: typeof T.calm }) {
  const [k, setK] = useState(0); const MIX = [0.22, 0.6, 0.3, 1.1, 0.4, 0.9];
  const row = (sys: boolean) => (
    <div className="grid grid-cols-6 gap-2">{PHOTOS.map((p, i) => (
      <m.div key={`${k}-${sys}-${i}`} initial={{ opacity: 0, y: sys ? t.dist : 18 }} animate={{ opacity: 1, y: 0 }}
        transition={sys ? { duration: t.dur, ease: EASE, delay: i * t.stagger } : { duration: MIX[i], ease: i % 2 ? "easeOut" : EASE, delay: [0, 0.2, 0.05, 0.4, 0.1, 0.3][i] }}
        className="aspect-square overflow-hidden rounded-[14px] bg-[var(--card)]"><img src={img(p)} alt="" className="h-full w-full object-cover" /></m.div>))}</div>);
  return (<div className="space-y-6">
    <div><Tag>Bugün: her öğe farklı süre ve gecikme (0.22 ile 1.1 sn)</Tag>{row(false)}</div>
    <div><Tag on>Sistem: tek süre ({t.dur} sn), eşit sıra ({t.stagger * 1000} ms)</Tag>{row(true)}</div>
    <Replay onClick={() => setK(k + 1)} />
  </div>);
}

/* 2. Hover: today's three different hovers vs one shared hover on glass cards. */
function Hover({ t }: { t: typeof T.calm }) {
  const old = ["hover:scale-[1.04]", "hover:bg-[var(--card-2)]", "hover:-translate-y-2"];
  return (<div className="space-y-8">
    <div><Tag>Bugün: büyüyen, rengi değişen, zıplayan kartlar</Tag>
      <div className="grid gap-3 sm:grid-cols-3">{[0, 1, 2].map((i) => (
        <div key={i} className={`rounded-[22px] bg-[var(--card)] p-2 transition-all duration-500 ${old[i]}`}>
          <div className="aspect-[16/10] overflow-hidden rounded-[16px]"><img src={img(PHOTOS[i])} alt="" className="h-full w-full object-cover" /></div>
          <p className="px-2 pb-2 pt-3 text-[15px] font-semibold">{NAMES[i]}</p></div>))}</div></div>
    <div><Tag on>Sistem: hepsi aynı; {t.lift} px yükselir, gölge açılır, fotoğraf %{Math.round((t.zoom - 1) * 100)} büyür</Tag>
      <div className="grid gap-3 sm:grid-cols-3">{[3, 4, 5].map((i) => (
        <m.div key={i} whileHover={{ y: -t.lift }} transition={{ duration: 0.18, ease: EASE }} className="glass-card group rounded-[22px] p-2 [&:hover]:!transform-none">
          <div className="aspect-[16/10] overflow-hidden rounded-[16px]"><m.img src={img(PHOTOS[i])} alt="" className="h-full w-full object-cover" style={{ transition: "transform .7s cubic-bezier(.22,1,.36,1)" }} whileHover={{ scale: t.zoom }} /></div>
          <p className="px-2 pb-2 pt-3 text-[15px] font-semibold">{NAMES[i]}</p></m.div>))}</div></div>
  </div>);
}

/* 3. Glass light: a soft light follows the pointer over the card. */
function Spot({ t }: { t: typeof T.calm }) {
  const move = (e: React.PointerEvent<HTMLDivElement>) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`); };
  return (<div className="relative">
    <span aria-hidden="true" className="pointer-events-none absolute -inset-6 -z-10 opacity-30 blur-[60px]"><img src={img("ws-j-brifing")} alt="" className="h-full w-full object-cover" /></span>
    <div className="grid gap-3 sm:grid-cols-3">{[0, 1, 2].map((i) => (
      <div key={i} onPointerMove={move} className="glass-card group relative overflow-hidden rounded-[22px] p-6 [&:hover]:!transform-none">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(260px circle at var(--x,50%) var(--y,50%), rgb(255 255 255 / ${t.spot}), transparent 60%)` }} />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(200px circle at var(--x,50%) var(--y,50%), rgb(236 103 38 / ${t.spot * 2.2}), transparent 70%)`, WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 1 }} />
        <p className="relative text-[13px] font-semibold text-flame">0{i + 1}</p>
        <p className="relative mt-8 text-[22px] font-semibold tracking-[-0.02em]">{["Oluştur", "Yaygınlaştır", "Yönet"][i]}</p>
        <p className="relative mt-2 text-[14px] leading-[1.5] text-ink-muted">Fareyi kartın üstünde gezdirin: ışık ve kenar parıltısı imleci izler.</p>
      </div>))}</div>
  </div>);
}

/* 4. Hero depth: in a scroll box, the headline rises faster than the phone, the photo zooms slightly. */
function Depth({ t }: { t: typeof T.calm }) {
  const box = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ container: box });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  const yText = useTransform(p, [0, 1], [0, -140 * t.par]); const yPhone = useTransform(p, [0, 1], [0, -50 * t.par]);
  const scale = useTransform(p, [0, 1], [1, 1 + 0.08 * t.par]); const fade = useTransform(p, [0, 0.8], [1, 0.2]);
  return (<div>
    <Tag on>Kutunun içinde aşağı kaydırın</Tag>
    <div ref={box} className="dark relative h-[420px] overflow-y-auto rounded-[24px] bg-[#111] [scrollbar-width:thin]">
      <div className="relative h-[900px]">
        <div className="sticky top-0 h-[420px] overflow-hidden">
          <m.img src={img("phone-mount", 1600)} alt="" style={{ scale }} className="absolute inset-0 h-full w-full object-cover opacity-40 blur-[2px]" />
          <span className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_10_10/0.95),rgb(10_10_10/0.3))]" />
          <m.div style={{ y: yText, opacity: fade }} className="absolute start-8 top-24 max-w-[60%] text-white">
            <p className="text-[40px] font-semibold leading-[1] tracking-[-0.045em] md:text-[52px]">İşi bir kez çekin <span className="text-flame">Kimin hazır olduğunu bilin</span></p>
          </m.div>
          <m.div style={{ y: yPhone }} className="absolute end-10 top-12 h-[300px] w-[140px] rounded-[26px] bg-[#1b1b1b] p-1.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9),inset_0_0_0_1px_rgb(255_255_255/0.12)]">
            <div className="h-full w-full overflow-hidden rounded-[21px]"><img src={img("food-qa")} alt="" className="h-full w-full object-cover" /></div>
          </m.div>
        </div>
      </div>
    </div>
  </div>);
}

/* 5. Story line: an orange line fills as you scroll; each step lights when the line reaches it. */
function Story({ t }: { t: typeof T.calm }) {
  const box = useRef<HTMLDivElement>(null); const { scrollYProgress } = useScroll({ container: box });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 }); const [lit, setLit] = useState(0);
  useEffect(() => fill.on("change", (v) => setLit(Math.min(4, Math.floor(v * 4.6)))), [fill]);
  const steps = [["İşi bir kez çekin", "En iyi çalışanınız işi telefonla çeker."], ["Adımlara bölün", "Yapay zekâ talimat ve quiz taslağı hazırlar."], ["Ekip izler", "Herkes kendi dilinde, istasyonda."], ["Quiz", "Kim anladı, görürsünüz."], ["Kim hazır", "Kişi, vardiya ve şube bazında."]];
  return (<div>
    <Tag on>Kutunun içinde aşağı kaydırın</Tag>
    <div ref={box} className="relative h-[420px] overflow-y-auto rounded-[24px] bg-[var(--card)] px-6 [scrollbar-width:thin]">
      <div className="relative py-10" style={{ height: 1000 }}>
        <span className="absolute start-[39px] top-10 h-[880px] w-[2px] bg-[var(--color-line-strong)]" />
        <m.span style={{ scaleY: fill }} className="absolute start-[39px] top-10 h-[880px] w-[2px] origin-top bg-flame" />
        {steps.map(([h, p], i) => (
          <div key={h} className="relative flex gap-5" style={{ marginTop: i ? 120 : 0 }}>
            <span className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold tabular-nums transition-colors duration-500 ${lit >= i ? "bg-flame text-white" : "bg-[var(--card-2)] text-ink-faint"}`}>{i + 1}</span>
            <m.div animate={{ opacity: lit >= i ? 1 : 0.35, x: lit >= i ? 0 : t.dist / 2 }} transition={{ duration: 0.35, ease: EASE }}>
              <p className="text-[19px] font-semibold tracking-[-0.02em]">{h}</p><p className="mt-1 text-[15px] text-ink-muted">{p}</p></m.div>
          </div>))}
      </div>
    </div>
  </div>);
}

/* 6. Card to page: the photo grows from the card into the page header (View Transitions API, no extra JS library). */
function Morph() {
  const [open, setOpen] = useState<number | null>(null);
  const go = (v: number | null) => { const d = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (d.startViewTransition) d.startViewTransition(() => flushSync(() => setOpen(v))); else setOpen(v); };
  return (<div>
    <Tag on>Bir karta tıklayın, sonra geri dönün</Tag>
    {open === null ? (
      <div className="grid gap-3 sm:grid-cols-3">{[0, 1, 2].map((i) => (
        <button key={i} type="button" onClick={() => go(i)} className="glass-card group rounded-[22px] p-2 text-start [&:hover]:!transform-none">
          <div className="aspect-[16/10] overflow-hidden rounded-[16px]" style={{ viewTransitionName: `lab-img-${i}` }}><img src={img(PHOTOS[i])} alt="" className="h-full w-full object-cover" /></div>
          <p className="px-2 pb-2 pt-3 text-[15px] font-semibold" style={{ viewTransitionName: `lab-h-${i}` }}>{NAMES[i]}</p></button>))}</div>
    ) : (
      <div className="overflow-hidden rounded-[24px] bg-[var(--card)]">
        <div className="relative aspect-[21/9]" style={{ viewTransitionName: `lab-img-${open}` }}><img src={img(PHOTOS[open], 1600)} alt="" className="h-full w-full object-cover" /></div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-6">
          <p className="text-[32px] font-semibold tracking-[-0.035em]" style={{ viewTransitionName: `lab-h-${open}` }}>{NAMES[open]}</p>
          <button type="button" onClick={() => go(null)} className="grid min-h-11 place-items-center"><span className="btn btn-glass-2 !h-[34px] !min-h-[34px] !px-3.5 !text-[13px]"><ArrowRight size={12} aria-hidden="true" className="rotate-180" />Geri</span></button>
        </div>
      </div>)}
  </div>);
}

/* 7. Buttons: a small press, and the orange button's glint on hover. */
function Buttons() {
  return (<div className="flex flex-wrap items-center gap-3">
    <m.a href="#" onClick={(e) => e.preventDefault()} whileTap={{ scale: 0.96 }} className="grid min-h-11 place-items-center"><span className="btn btn-cta !h-[38px] !min-h-[38px] !px-4 !text-[14px]">Demo isteyin</span></m.a>
    <m.a href="#" onClick={(e) => e.preventDefault()} whileTap={{ scale: 0.96 }} className="grid min-h-11 place-items-center"><span className="btn btn-glass-2 !h-[38px] !min-h-[38px] !px-4 !text-[14px]">Nasıl çalışır<ArrowRight size={13} aria-hidden="true" /></span></m.a>
    <p className="w-full text-[14px] text-ink-muted">Üzerine gelin (ışık geçer), basılı tutun (hafif içe basar).</p>
  </div>);
}

/* 8. Section entrance: heading, line and cards arrive in one rhythm. */
function Entrance({ t }: { t: typeof T.calm }) {
  const [k, setK] = useState(0);
  return (<div>
    <div key={k}>
      <m.p initial={{ opacity: 0, y: t.dist }} animate={{ opacity: 1, y: 0 }} transition={{ duration: t.dur, ease: EASE }} className="text-[13px] font-semibold text-flame">02 / 03</m.p>
      <m.p initial={{ opacity: 0, y: t.dist }} animate={{ opacity: 1, y: 0 }} transition={{ duration: t.dur, ease: EASE, delay: t.stagger }} className="mt-2 text-[36px] font-semibold tracking-[-0.04em]">Yaygınlaştır</m.p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">{[1, 3, 4].map((i, j) => (
        <m.div key={i} initial={{ opacity: 0, y: t.dist * 1.5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: t.dur, ease: EASE, delay: (j + 2) * t.stagger }} className="glass-card rounded-[22px] p-2 [&:hover]:!transform-none">
          <div className="aspect-[16/10] overflow-hidden rounded-[16px]"><img src={img(PHOTOS[i])} alt="" className="h-full w-full object-cover" /></div>
          <p className="px-2 pb-2 pt-3 text-[15px] font-semibold">{NAMES[i]}</p></m.div>))}</div>
    </div>
    <div className="mt-6"><Replay onClick={() => setK(k + 1)} /></div>
  </div>);
}

export function MotionLab() {
  const [tone, setTone] = useState<Tone>("calm"); const t = T[tone]; const reduce = useReducedMotion();
  return (<div className="container-x pb-24">
    <header className="pb-6 pt-12 md:pt-16">
      <p className="text-[13px] font-medium text-ink-faint">İç sayfa · arama motorlarına kapalı</p>
      <h1 className="mt-3 max-w-[18ch] text-[clamp(36px,1rem+3vw,64px)] font-semibold leading-[1] tracking-[-0.045em]">Hareket laboratuvarı</h1>
      <p className="mt-4 max-w-[40rem] text-[17px] leading-[1.6] text-ink-muted">Önerilen hareket sistemini bugünkü durumla yan yana deneyin. Üstteki düğmeyle tonu değiştirin; tüm örnekler aynı anda güncellenir.</p>
      {reduce && <p className="mt-4 rounded-[14px] bg-[var(--card)] p-4 text-[14px] text-ink-muted">Cihazınızda "hareketi azalt" açık. Sitede bu kullanıcılar animasyonsuz son hali görür; buradaki örnekleri görmek için ayarı geçici olarak kapatın.</p>}
    </header>
    <div className="sticky top-[var(--header-h)] z-20 -mx-4 flex flex-wrap items-center gap-2 border-b border-line bg-[rgb(var(--bg-rgb)/0.85)] px-4 py-1 backdrop-blur-xl">
      <span className="me-2 text-[13px] text-ink-faint">Ton</span>
      {(["calm", "lively"] as Tone[]).map((k) => (
        <button key={k} type="button" aria-pressed={tone === k} onClick={() => setTone(k)} className="seg"><span>{T[k].label}</span></button>))}
    </div>
    <Block n="01" title="Tek ritim" note="Bugün aynı tür hareket bir yerde 0.3, başka yerde 1.1 saniye sürüyor. Sistemde üç süre var ve bölüm girişleri hep aynı süre ve aralıkla geliyor."><Timing t={t} /></Block>
    <Block n="02" title="Bölüm girişi" note="Başlık, numara ve kartlar tek bir ritimle, sadece ilk görüldüğünde gelir. Hızlı kaydıran biri boş alan görmez."><Entrance t={t} /></Block>
    <Block n="03" title="Tek hover dili" note="Bugün bazı kartlar büyüyor, bazıları zıplıyor, bazıları sadece renk değiştiriyor. Sistemde hepsi aynı davranır."><Hover t={t} /></Block>
    <Block n="04" title="Camda ışık" note="İmleç cam kartın üstünde gezerken çok hafif bir ışık ve kenarda turuncu bir parıltı onu izler. Sadece fareyle; dokunmatikte yok."><Spot t={t} /></Block>
    <Block n="05" title="Hero'da derinlik" note="Aşağı kaydırırken başlık telefondan hızlı yükselir, fotoğraf hafifçe yakınlaşır. Sayfa kaydırması ele geçirilmez."><Depth t={t} /></Block>
    <Block n="06" title="Hikâye çizgisi" note="Nasıl çalışır bölümünde turuncu çizgi kaydırdıkça dolar, adımlar sırayla yanar."><Story t={t} /></Block>
    <Block n="07" title="Karttan sayfaya" note="Özellik kartına tıklayınca fotoğraf büyüyerek sayfanın başlığına yerleşir. Tarayıcının kendi geçiş özelliğiyle; desteklemeyen tarayıcıda normal sayfa açılır."><Morph /></Block>
    <Block n="08" title="Buton tepkisi" note="Tıklamada hafif içe basma; turuncu butonda üzerine gelince düz bir ışık geçişi."><Buttons /></Block>
  </div>);
}
