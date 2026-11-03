import { Lang } from "./copy";
import { SITE } from "./config";
// Only what the product does today (see PLANS/COMPARE in config.ts and the AI copy). No certification, SLA or hosting-region claims.
export default function Security({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const items = tr
    ? [["Rol ve lokasyona göre erişim", "Herkes yalnızca kendi rolünün ve lokasyonunun içeriğini görür. Yöneticiler kimin neye eriştiğini belirler."],
       ["İnsan onayı olmadan yayın yok", "Yapay zekânın hazırladığı adımlar, metinler ve quizler ekibiniz düzenleyip onaylayana kadar kimseye gitmez."],
       ["İçerik sizin ekibinizden", "Videoları kendi ekibiniz çeker. Hangi işin kaydedileceğine ve kimin izleyeceğine siz karar verirsiniz."]]
    : [["Role- and location-based access", "People see the content for their own role and location. Managers decide who can see what."],
       ["Nothing goes out without human approval", "AI-drafted steps, text and quizzes reach nobody until your team has edited and approved them."],
       ["Your team creates the content", "Your own people film the videos. You decide which jobs are recorded and who watches them."]];
  const sec = SITE.legal.find(([k]) => k === "Security")?.[1];
  return (
    <section id="security" aria-labelledby="sec-h" className="px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px] border-t border-white/15 pt-12">
        <p className="mono text-[12px] uppercase tracking-[.2em] text-flame">{tr ? "Güvenlik ve veri" : "Security & data"}</p>
        <h2 id="sec-h" className="display mt-4 max-w-[18ch] text-[clamp(2.2rem,4.4vw,4rem)]">{tr ? "Kim neyi görür, siz belirlersiniz." : "You decide who sees what."}</h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {items.map(([h, p]) => (<li key={h} className="border-t border-white/10 pt-5"><h3 className="text-[20px] font-semibold tracking-tight">{h}</h3><p className="mt-2 max-w-[44ch] text-[16px] leading-[1.45] text-white/70">{p}</p></li>))}
        </ul>
        {sec && <a href={sec} className="link-u mt-8 inline-block text-[16px] text-white/80 hover:text-white">{tr ? "Güvenlik sayfası" : "Security page"}</a>}
      </div>
    </section>);
}
