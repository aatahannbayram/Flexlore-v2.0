"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise, Check, MapPin, Play } from "../ui/icons";

/* Interactive mini demo ("Make it memorable" #3). A visitor opens a sample job, steps through 3 steps, answers a
 * 2-question quiz and sees their own name turn Ready in the manager panel. No network, no sign-up.
 * The first state (name field + manager panel) is plain markup, so it renders in server HTML; load it with
 * next/dynamic WITHOUT ssr:false to keep that. Motion: colour and transform transitions only, 250ms ease-out;
 * the global reduced-motion rule in globals.css turns them off. */

type Lang = "en" | "tr";
type Status = "ready" | "training" | "not";

const L = {
  en: {
    k: "Try it", h: "Try a sample job in 30 seconds.",
    lead: "Step through it, answer two questions and watch your name turn Ready on the manager's screen. No sign-up.",
    sample: "Sample job, for illustration",
    nameLabel: "Your name (optional)", nameDefault: "You",
    job: "Opening routine", jobMeta: "3 steps · 2 questions", open: "Open sample job",
    stepOf: (a: number, b: number) => `Step ${a} of ${b}`, clip: (n: number) => `Clip for step ${n}`,
    markDone: "Mark done", back: "Back", toQuiz: "Start quiz",
    steps: [
      "Turn on the espresso machine and wait for the ready light.",
      "Restock the milk fridge. Oldest dates go to the front.",
      "Wipe the counter and set out clean cups.",
    ],
    quiz: "Quiz", qOf: (a: number, b: number) => `Question ${a} of ${b}`,
    qs: [
      { q: "Where do the oldest milk cartons go?", o: ["At the back", "At the front", "Anywhere there is space"], a: 1 },
      { q: "When can you start making coffee?", o: ["Right after switching on", "After the first order", "When the ready light is on"], a: 2 },
    ],
    right: "Correct.", retry: "Not quite. You have one more try.", reveal: (x: string) => `The answer is: ${x}.`,
    next: "Next question", finish: "See result",
    passH: "You are ready for this job.", passP: "Your manager sees it right away, on the right.",
    failH: "Almost there.", failP: "Review the steps and take the quiz again.", retryQuiz: "Take the quiz again",
    again: "Start again",
    mgr: "Manager view", loc: "Downtown location", ofReady: (a: number, b: number) => `${a} of ${b} ready`,
    st: { ready: "Ready", training: "In training", not: "Not started" } as Record<Status, string>,
    you: "you", nowReady: (n: string) => `${n} is now Ready in the manager view.`,
    people: [["Maya K.", "ready"], ["Jon T.", "training"], ["Leyla B.", "ready"], ["Omar R.", "not"]] as [string, Status][],
  },
  tr: {
    k: "Deneyin", h: "Örnek bir işi 30 saniyede deneyin.",
    lead: "Adımları geçin, iki soruyu yanıtlayın ve adınızın yönetici ekranında Hazır olduğunu görün. Kayıt gerekmez.",
    sample: "Örnek iş, gösterim amaçlı",
    nameLabel: "Adınız (isteğe bağlı)", nameDefault: "Siz",
    job: "Açılış rutini", jobMeta: "3 adım · 2 soru", open: "Örnek işi aç",
    stepOf: (a: number, b: number) => `Adım ${a}/${b}`, clip: (n: number) => `Adım ${n} videosu`,
    markDone: "Tamamlandı", back: "Geri", toQuiz: "Teste başla",
    steps: [
      "Espresso makinesini açın ve hazır ışığının yanmasını bekleyin.",
      "Süt dolabını doldurun. Tarihi en eski olanlar öne.",
      "Tezgahı silin ve temiz bardakları dizin.",
    ],
    quiz: "Test", qOf: (a: number, b: number) => `Soru ${a}/${b}`,
    qs: [
      { q: "Tarihi en eski sütler nereye konur?", o: ["Arkaya", "Öne", "Boş olan herhangi bir yere"], a: 1 },
      { q: "Kahve yapmaya ne zaman başlanır?", o: ["Makineyi açar açmaz", "İlk siparişten sonra", "Hazır ışığı yanınca"], a: 2 },
    ],
    right: "Doğru.", retry: "Tam değil. Bir hakkınız daha var.", reveal: (x: string) => `Doğru cevap: ${x}.`,
    next: "Sonraki soru", finish: "Sonucu gör",
    passH: "Bu iş için hazırsınız.", passP: "Yöneticiniz bunu hemen görür, sağ tarafta.",
    failH: "Az kaldı.", failP: "Adımlara tekrar göz atın ve testi yeniden çözün.", retryQuiz: "Testi yeniden çöz",
    again: "Baştan başla",
    mgr: "Yönetici görünümü", loc: "Kadıköy şubesi", ofReady: (a: number, b: number) => `${a}/${b} hazır`,
    st: { ready: "Hazır", training: "Eğitimde", not: "Başlamadı" } as Record<Status, string>,
    you: "siz", nowReady: (n: string) => `${n} yönetici görünümünde artık Hazır.`,
    people: [["Elif K.", "ready"], ["Mert T.", "training"], ["Zeynep B.", "ready"], ["Can R.", "not"]] as [string, Status][],
  },
};

const ease = "duration-[250ms] ease-out";
const btnBase = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold tracking-[-.01em] transition-[transform,background-color] ${ease} active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-50`;
const btnPrimary = `${btnBase} bg-flame text-[#111111] hover:bg-accent-strong`;
const btnSecondary = `${btnBase} bg-white/[.07] text-ink hover:bg-white/[.12]`;

const chip: Record<Status, string> = {
  ready: "bg-[rgb(104_210_185/0.14)] text-calm-aqua",
  training: "bg-white/[.08] text-ice-200",
  not: "bg-transparent text-ice-400 ring-1 ring-inset ring-white/[.12]",
};

const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("") || "?";

export function MiniDemo({ lang }: { lang: Lang }) {
  const t = L[lang];
  const [phase, setPhase] = useState<"intro" | "steps" | "quiz" | "result">("intro");
  const [name, setName] = useState("");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(0);
  const [q, setQ] = useState(0);
  const [wrong, setWrong] = useState<number[]>([]);
  const [fb, setFb] = useState<"right" | "retry" | "reveal" | null>(null);
  const [score, setScore] = useState(0);

  const headRef = useRef<HTMLHeadingElement>(null);
  const touched = useRef(false);
  // Move focus to the learner pane heading after each screen change (not on first render).
  useEffect(() => { if (touched.current) headRef.current?.focus(); }, [phase, step, q]);
  const go = (fn: () => void) => { touched.current = true; fn(); };

  const display = name.trim() || t.nameDefault;
  const passed = phase === "result" && score === t.qs.length;
  const me: Status = passed ? "ready" : phase === "intro" ? "not" : "training";
  const people: [string, Status, boolean][] = [[display, me, true], ...t.people.map(([n, s]) => [n, s, false] as [string, Status, boolean])];
  const readyCount = people.filter((p) => p[1] === "ready").length;

  const start = () => go(() => { setPhase("steps"); setStep(0); setDone(0); });
  const markDone = () => go(() => {
    const d = Math.max(done, step + 1); setDone(d);
    if (step < t.steps.length - 1) setStep(step + 1); else { setPhase("quiz"); setQ(0); setWrong([]); setFb(null); setScore(0); }
  });
  const answer = (i: number) => {
    if (fb === "right" || fb === "reveal") return;
    if (i === t.qs[q].a) { setFb("right"); setScore((s) => s + 1); }
    else if (wrong.length === 0) { setWrong([i]); setFb("retry"); }
    else { setWrong([...wrong, i]); setFb("reveal"); }
  };
  const nextQ = () => go(() => {
    if (q < t.qs.length - 1) { setQ(q + 1); setWrong([]); setFb(null); } else setPhase("result");
  });
  const retryQuiz = () => go(() => { setPhase("quiz"); setQ(0); setWrong([]); setFb(null); setScore(0); });
  const reset = () => go(() => { setPhase("intro"); setStep(0); setDone(0); setQ(0); setWrong([]); setFb(null); setScore(0); });

  const cur = t.qs[q];
  const settled = fb === "right" || fb === "reveal";

  return (
    <section id="try" aria-labelledby="try-h" className="section-y bg-bg">
      <div className="container-x">
        <div className="max-w-[40rem]">
          <p className="eyebrow">{t.k}</p>
          <h2 id="try-h" className="h2 mt-4">{t.h}</h2>
          <p className="lead mt-6">{t.lead}</p>
        </div>

        <p className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/[.06] px-3 py-1.5 text-[13px] font-medium text-ice-300">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ice-400" />{t.sample}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Learner: phone-like card */}
          <div className="lg:col-span-5">
            <div className="mx-auto w-full max-w-[380px] rounded-[32px] bg-surface-1 p-2.5 ring-1 ring-white/[.08]">
              <div className="flex min-h-[460px] flex-col rounded-[24px] bg-bg p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium text-ice-400">{phase === "quiz" ? t.quiz : t.job}</p>
                  {phase !== "intro" && (
                    <button type="button" onClick={reset} className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-ice-300 transition-colors ${ease} hover:bg-white/[.06] hover:text-ink`}>
                      <ArrowCounterClockwise size={16} aria-hidden="true" />{t.again}
                    </button>)}
                </div>

                {/* Step progress: fills as steps complete */}
                <div className="mt-3 flex gap-1.5" aria-hidden="true">
                  {t.steps.map((_, i) => (
                    <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/[.1]">
                      <span className={`block h-full origin-left rounded-full bg-flame transition-transform ${ease}`} style={{ transform: `scaleX(${i < done ? 1 : 0})` }} />
                    </span>))}
                </div>

                {phase === "intro" && (
                  <div className="mt-6 flex flex-1 flex-col">
                    <h3 ref={headRef} tabIndex={-1} className="text-[24px] font-semibold tracking-[-.02em] text-ink">{t.job}</h3>
                    <p className="mt-1 text-[14px] text-ice-400">{t.jobMeta}</p>
                    <form className="mt-auto pt-8" onSubmit={(e) => { e.preventDefault(); start(); }}>
                      <label htmlFor="try-name" className="block text-[14px] font-medium text-ice-200">{t.nameLabel}</label>
                      <input id="try-name" type="text" autoComplete="given-name" maxLength={24} value={name} placeholder={t.nameDefault}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 block min-h-[44px] w-full rounded-xl bg-surface-2 px-4 text-[16px] text-ink ring-1 ring-inset ring-white/[.1] placeholder:text-ice-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" />
                      <button type="submit" className={`${btnPrimary} mt-4 w-full`}>{t.open}</button>
                    </form>
                  </div>)}

                {phase === "steps" && (
                  <div className="mt-6 flex flex-1 flex-col">
                    <p className="text-[13px] font-medium text-ice-400">{t.stepOf(step + 1, t.steps.length)}</p>
                    <div className="mt-3 grid aspect-[16/10] place-items-center rounded-2xl bg-surface-2" role="img" aria-label={t.clip(step + 1)}>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/[.08] text-ice-200"><Play size={20} weight="fill" aria-hidden="true" /></span>
                    </div>
                    <h3 ref={headRef} tabIndex={-1} className="mt-4 flex gap-3 text-[18px] font-semibold leading-snug tracking-[-.01em] text-ink">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/[.08] text-[13px] tabular-nums text-ice-200">{step + 1}</span>
                      <span>{t.steps[step]}</span>
                    </h3>
                    <div className="mt-auto flex gap-3 pt-6">
                      <button type="button" onClick={() => go(() => setStep(step - 1))} disabled={step === 0} className={btnSecondary}>{t.back}</button>
                      <button type="button" onClick={markDone} className={`${btnPrimary} flex-1`}>
                        <Check size={18} aria-hidden="true" />{step === t.steps.length - 1 ? t.toQuiz : t.markDone}
                      </button>
                    </div>
                  </div>)}

                {phase === "quiz" && (
                  <div className="mt-6 flex flex-1 flex-col">
                    <p className="text-[13px] font-medium text-ice-400">{t.qOf(q + 1, t.qs.length)}</p>
                    <h3 ref={headRef} tabIndex={-1} id="try-q" className="mt-2 text-[20px] font-semibold leading-snug tracking-[-.01em] text-ink">{cur.q}</h3>
                    <ul className="mt-4 space-y-2" aria-labelledby="try-q">
                      {cur.o.map((o, i) => {
                        const isRight = settled && i === cur.a; const isWrong = wrong.includes(i);
                        return (
                          <li key={o}>
                            <button type="button" onClick={() => answer(i)} disabled={settled || isWrong} aria-pressed={isRight || isWrong}
                              className={`flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-[15px] transition-colors ${ease} ${
                                isRight ? "bg-[rgb(104_210_185/0.14)] text-ink ring-1 ring-inset ring-calm-aqua/60"
                                : isWrong ? "bg-white/[.03] text-ice-400 line-through"
                                : "bg-surface-2 text-ink hover:bg-white/[.1] disabled:hover:bg-surface-2"}`}>
                              <span>{o}</span>
                              {isRight && <Check size={18} className="shrink-0 text-calm-aqua" aria-hidden="true" />}
                            </button>
                          </li>);
                      })}
                    </ul>
                    <p role="status" aria-live="polite" className="mt-3 min-h-[22px] text-[14px] font-medium text-ice-200">
                      {fb === "right" ? t.right : fb === "retry" ? t.retry : fb === "reveal" ? t.reveal(cur.o[cur.a]) : ""}
                    </p>
                    <div className="mt-auto pt-4">
                      <button type="button" onClick={nextQ} disabled={!settled} className={`${btnPrimary} w-full`}>{q < t.qs.length - 1 ? t.next : t.finish}</button>
                    </div>
                  </div>)}

                {phase === "result" && (
                  <div className="mt-6 flex flex-1 flex-col">
                    <span className={`grid h-12 w-12 place-items-center rounded-full ${passed ? "bg-[rgb(104_210_185/0.14)] text-calm-aqua" : "bg-white/[.08] text-ice-200"}`}>
                      {passed ? <Check size={24} aria-hidden="true" /> : <ArrowCounterClockwise size={22} aria-hidden="true" />}
                    </span>
                    <h3 ref={headRef} tabIndex={-1} className="mt-4 text-[22px] font-semibold tracking-[-.02em] text-ink">{passed ? t.passH : t.failH}</h3>
                    <p className="mt-2 text-[15px] text-ice-300">{passed ? t.passP : t.failP}</p>
                    <div className="mt-auto flex flex-col gap-3 pt-6">
                      {!passed && <button type="button" onClick={retryQuiz} className={btnPrimary}>{t.retryQuiz}</button>}
                      <button type="button" onClick={reset} className={btnSecondary}><ArrowCounterClockwise size={16} aria-hidden="true" />{t.again}</button>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>

          {/* Manager panel */}
          <div className="lg:col-span-7">
            <div className="rounded-[20px] bg-surface-1 p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-[13px] font-medium text-ice-400">{t.mgr}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-[18px] font-semibold tracking-[-.01em] text-ink">
                    <MapPin size={18} className="text-ice-300" aria-hidden="true" />{t.loc}
                  </p>
                </div>
                <p className="text-[14px] font-medium tabular-nums text-ice-200">{t.ofReady(readyCount, people.length)}</p>
              </div>
              <span aria-hidden="true" className="mt-4 block h-1.5 overflow-hidden rounded-full bg-white/[.08]">
                <span className={`block h-full origin-left rounded-full bg-ice-200 transition-transform ${ease}`} style={{ transform: `scaleX(${readyCount / people.length})` }} />
              </span>
              <p className="mt-4 text-[13px] font-medium text-ice-400">{t.job}</p>
              <ul className="mt-2 space-y-1.5">
                {people.map(([n, s, self]) => (
                  <li key={self ? "self" : n} className={`flex min-h-[52px] items-center gap-3 rounded-xl px-3 py-2 transition-colors ${ease} ${self ? "bg-surface-2 ring-1 ring-inset ring-white/[.08]" : ""}`}>
                    <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[.08] text-[12px] font-semibold text-ice-200">{initials(n)}</span>
                    <span className="min-w-0 flex-1 truncate text-[15px] text-ink">
                      {n}{self && <span className="ml-1.5 text-[13px] text-ice-400">({t.you})</span>}
                    </span>
                    <span className={`inline-flex min-w-[96px] items-center justify-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold transition-[background-color,color,box-shadow] ${ease} ${chip[s]}`}>
                      {s === "ready" && <Check size={12} aria-hidden="true" />}{t.st[s]}
                    </span>
                  </li>))}
              </ul>
              <p role="status" aria-live="polite" className="sr-only">{passed ? t.nowReady(display) : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
