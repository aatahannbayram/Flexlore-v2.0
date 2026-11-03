"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { copy, Lang, C } from "./copy";
import Link from "next/link";
import { sectors } from "./sectors";
import { K } from "./Kinetic";
import { WebSection } from "./WebApp";
import { PricingTeaser, Footer } from "./Sections";
import { StoreButtons, Arr } from "./Icons";
import { SITE } from "./config";
import { Header } from "./Header";
import { Hero } from "./home/Hero";
import { SmartVideo, VideoPause } from "./ui/SmartVideo";
import { Device, RecordScreen, SopScreen, QuizScreen, ReadyScreen } from "./AppScreens";

/** Kept for sector, demo and legacy pages: a muted loop driven by SmartVideo (max 2 playing, poster under reduced motion). */
export function Video({ name, className = "" }: { name: string; eager?: boolean; className?: string }) {
  return <SmartVideo name={name} className={className} threshold={0.35} />;
}

function useSec() { const ref = useRef<HTMLElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] }); return { ref, p: scrollYProgress }; }

function Line({ p, r, children }: { p: MotionValue<number>; r: [number, number]; children: React.ReactNode }) {
  const o = useTransform(p, [r[0], r[1]], [0.12, 1]);
  return <motion.span style={{ opacity: o }} className="block">{children}</motion.span>;
}

function Statement({ t }: { t: C }) {
  const { ref, p } = useSec();
  const vo = useTransform(p, [0, 0.15, 0.85, 1], [0.15, 0.6, 0.6, 0]);
  const so = useTransform(p, [0.55, 0.75], [0, 1]);
  return (
    <section ref={ref} className="relative h-[170vh]" id="problem">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div style={{ opacity: vo }} className="absolute inset-0"><Video name="kitchen" /></motion.div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto w-full max-w-6xl px-6">
          <p className="eyebrow mb-6">{t.stK}</p><h2 className="display text-h1"><Line p={p} r={[0.1, 0.3]}>{t.st[0]}</Line><Line p={p} r={[0.3, 0.5]}>{t.st[1]}</Line></h2>
          <motion.p style={{ opacity: so }} className="mt-10 max-w-lg text-lg leading-[1.3] text-white/75">{t.stSub}</motion.p>
        </div>
      </div>
    </section>
  );
}

function Product({ t, lang }: { t: C; lang: Lang }) {
  const { ref, p } = useSec();
  const [a, setA] = useState(0);
  useEffect(() => p.on("change", (v) => setA(Math.min(3, Math.max(0, Math.floor(v * 4.2 - 0.1))))), [p]);
  const qz = sectors[0].quiz;
  return (
    <section ref={ref} className="relative h-[380vh] bg-bg2" id="method" aria-label={t.pK}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="relative mx-auto grid h-full max-w-[1400px] grid-cols-12 items-center gap-6 px-6 md:px-10">
          <div className="col-span-12 self-end pb-6 md:col-span-6 md:self-center md:pb-0">
            <p className="mono text-xs uppercase tracking-[.16em] text-white/70">{t.pK}</p>
            <div className="mt-6 flex items-start gap-5 md:mt-10 md:gap-10">
              <span className="num text-h1 text-white/90 tabular-nums">0{a + 1}</span>
              <div className="relative mt-3 h-[9.5rem] flex-1 md:h-[14rem]">
                {t.steps.map((s, i) => (
                  <motion.div key={i + lang} initial={false} animate={{ opacity: a === i ? 1 : 0, y: a === i ? 0 : a > i ? -24 : 24 }} transition={{ duration: 0.35, delay: a === i ? 0.3 : 0, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0" aria-hidden={a !== i}>
                    <h2 className="display text-h1"><K text={s.h} /></h2>
                    <p className="mt-3 max-w-sm text-base leading-[1.3] text-white/70 md:text-lg">{s.p}</p>
                  </motion.div>))}
              </div>
            </div>
            <ol className="mono mt-8 grid max-w-md grid-cols-4 gap-2 text-xs uppercase tracking-[.12em] md:mt-14">
              {t.steps.map((s, i) => (<li key={i}><button type="button" onClick={() => { const el = ref.current; if (!el) return; const top = el.getBoundingClientRect().top + window.scrollY; const span = el.offsetHeight - window.innerHeight; window.scrollTo({ top: top + span * ((i + 0.35) / 4.2), behavior: "smooth" }); }} aria-current={a === i ? "step" : undefined} className={`w-full  pt-2 text-left uppercase transition-colors duration-500 hover:text-white ${a >= i ? "border-white text-white" : " text-white/70"}`}>{s.h.replace(".", "")}</button></li>))}
            </ol>
          </div>
          <div className="col-span-12 row-start-1 flex justify-center pt-20 md:col-span-5 md:col-start-8 md:row-auto md:pt-0">
            <div className="relative w-[min(52vw,230px)] md:w-[330px]">
              <Device label={t.alts[a]}>{[0, 1, 2, 3].map((i) => (
                <motion.div key={i} initial={false} animate={{ opacity: a === i ? 1 : 0, x: a === i ? 0 : a > i ? -36 : 36, scale: a === i ? 1 : 0.98, filter: a === i ? "blur(0px)" : "blur(4px)" }} transition={{ duration: 0.35, delay: a === i ? 0.3 : 0, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0" aria-hidden={a !== i} style={{ zIndex: a === i ? 2 : 1 }}>
                  {i === 0 ? <RecordScreen active={a === 0} /> : i === 1 ? <SopScreen active={a === 1} /> : i === 2 ? <QuizScreen active={a === 2} q={qz.q} a={qz.a} ok={qz.ok} /> : <ReadyScreen active={a === 3} />}
                </motion.div>))}</Device>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


const SEE_CHIPS: [string, string, string][] = [["cafe-restaurant", "Cafe & restaurant chains", "Kafe ve restoran zincirleri"], ["franchise", "Franchise", "Franchise"], ["manufacturing", "Manufacturing", "Üretim"], ["hotel", "Hotel", "Otel"]];
function SeeItCard({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  return (
    <div className="mt-12 rounded-2xl bg-card p-8 md:p-10">
      <h3 className="text-h3 font-semibold tracking-tight">{tr ? "Flexlore'u kendi işinde gör" : "See Flexlore in your business"}</h3>
      <ul className="mt-5 flex flex-wrap gap-2">{SEE_CHIPS.map(([id, en, t]) => <li key={id}><Link href={`/see-it/?industry=${id}`} className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white/85 transition-colors hover:bg-white/15 hover:text-white">{tr ? t : en}</Link></li>)}</ul>
      <Link href="/see-it/" className="btn-p mt-7 inline-flex">{tr ? "Kendi senaryonu gör" : "See your scenario"} <Arr className="ml-1" /></Link>
    </div>
  );
}

function Sectors({ t, lang }: { t: C; lang: Lang }) {
  return (
    <section id="industries" aria-labelledby="sec-h2" className="bg-bg2 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">{t.whereK}</p><h2 id="sec-h2" className="display mt-4 max-w-[16ch] text-h2">{t.where}</h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <li key={s.slug}><Link href={`/sektor/${s.slug}/`} className="group block overflow-hidden rounded-2xl bg-card">
              <div className="relative aspect-[16/10] overflow-hidden"><img src={`/video/${s.v}.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>
              <div className="p-6"><p className="text-xs uppercase tracking-[.16em] text-white/60">{s.kicker}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{lang === "tr" ? s.tr : s.en}</h3>
                <p className="mt-2 text-base leading-[1.45] text-white/70">{s.h}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-flame">{lang === "tr" ? "Sektörü aç" : "Open sector"} <Arr className="transition-transform group-hover:translate-x-1" /></span></div>
            </Link></li>))}
        </ul>
        <SeeItCard lang={lang} />
      </div>
    </section>
  );
}

function Faq({ t }: { t: C }) {
  return (
    <section id="faq" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <div><p className="eyebrow">{t.faqK}</p><h2 className="display mt-4 text-h2">{t.faqH}</h2></div>
        <div className="space-y-3">{t.faq.map((q) => (
          <details key={q.q} className="group rounded-2xl bg-bg2 px-6 py-5">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-lg font-medium tracking-tight text-white/90 group-open:text-white"><h3>{q.q}</h3><span aria-hidden="true" className="shrink-0 text-white/60 transition group-open:rotate-45">+</span></summary>
            <p className="mt-3 max-w-xl text-base leading-[1.5] text-white/70">{q.a}</p>
          </details>))}
        </div>
      </div>
      <div id="demo" className="mx-auto mt-24 max-w-6xl rounded-3xl bg-bg2 px-8 py-14 md:mt-32 md:px-14 md:py-20">
        <h2 className="display max-w-[14ch] text-h1">{t.endH}</h2>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-lg leading-[1.4] text-white/75">{t.endP}</p>
          <div className="flex flex-wrap items-center gap-3"><a href={SITE.demo} className="btn-p">{t.endCta} <Arr className="ml-1" /></a><StoreButtons small /></div>
        </div>
      </div>
    </section>
  );
}

function ProductSuite({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const lines = tr
    ? [["Yapay zekâ taslak, siz onay", "Adımları, talimatları ve quizi yapay zekâ taslak olarak hazırlar. Ekibiniz onaylamadan hiçbir şey yayınlanmaz."],
       ["Rol ve lokasyona göre erişim", "Herkes yalnızca kendi rolü ve lokasyonu için gerekeni görür. Kimin neyi göreceğini yöneticiler belirler."],
       ["iOS, Android ve web", "Telefonda kaydedin ve öğrenin, tarayıcıda atayın ve takip edin."]]
    : [["AI drafts, you approve", "AI drafts the steps, instructions and quiz. Nothing goes out until your team approves it."],
       ["Role- and location-based access", "People see only what their role and site need. Managers decide who sees what."],
       ["iOS, Android and web", "Record and learn on the phone, assign and track in the browser."]];
  return (
    <div id="product">
      <WebSection lang={lang} />
      <div className="px-6 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <ul className="grid gap-4 md:grid-cols-3">{lines.map(([h, p]) => <li key={h} className="rounded-2xl bg-bg2 p-7"><h3 className="text-lg font-semibold tracking-tight">{h}</h3><p className="mt-2 text-base leading-[1.5] text-white/70">{p}</p></li>)}</ul>
          <p className="mt-8 text-sm text-white/60"><span className="mr-2 font-semibold uppercase tracking-[.14em] text-white/80">{tr ? "Yol haritası" : "Roadmap"}</span>{tr ? "Henüz tarih yok: çok dilli içerik, kendi markanız, QR ile iş bağlantıları, BI araçları, MCP sunucusu, REST API ve webhook'lar." : "No dates yet: multilingual content, your own branding, QR job links, BI tools, an MCP server, REST API and webhooks."}</p>
        </div>
      </div>
    </div>);
}

export default function Site() {
  const [lang, setLang] = useState<Lang>("en");
  const [paused, setPaused] = useState(false);
  const t = copy[lang];
  const reduce = useReducedMotion();
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-3 focus:text-bg">{t.skip}</a>
      <Header home lang={lang} setLang={setLang} paused={paused} setPaused={setPaused} motionOk={!reduce} />
      <VideoPause.Provider value={paused}>
      <main id="main">
        <Hero t={t} lang={lang} /><Statement t={t} /><Product t={t} lang={lang} /><ProductSuite lang={lang} /><Sectors t={t} lang={lang} /><PricingTeaser lang={lang} /><Faq t={t} />
      </main>
      </VideoPause.Provider>
      <Footer />
    </>
  );
}
