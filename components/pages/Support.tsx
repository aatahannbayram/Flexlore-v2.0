"use client";
import { useState } from "react";
import { SITE } from "../config";
import { useLocale } from "../i18n/LocaleProvider";
import { SUPPORT } from "./copy";
import { Pic, Label, card } from "../home/home5";
import { Faq5 } from "../home/home5b";
import { Lifebuoy, ArrowRight, ShieldCheck, EnvelopeSimple, CalendarBlank, CheckCircle } from "../ui/icons";

const field = "block w-full rounded-[14px] bg-[var(--card-2)] px-4 text-[16px] text-ink ring-1 ring-line outline-none transition-shadow placeholder:text-ink-faint focus-visible:ring-2 focus-visible:ring-flame";

/* The site is static, so the form composes an email to support@flexlore.com instead of posting to a server. */
export function SupportPage() {
  const { locale } = useLocale(); const c = SUPPORT[locale]; const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget); const v = (k: string) => String(f.get(k) || "").trim();
    const subject = `[${v("topic") || "Support"}] ${v("name")}`;
    const body = `${v("message")}\n\n${v("name")}\n${v("email")}${v("phone") ? `\n${v("phone")}` : ""}`;
    window.location.href = `mailto:support@flexlore.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (<>
    <section aria-labelledby="sup-h" className="pb-16 pt-32 md:pt-40">
      <div className="container-x grid gap-3 lg:grid-cols-[1.05fr_1fr]">
        <div className={`${card} p-6 md:p-10`}>
          <Label icon={Lifebuoy}>{c.k}</Label>
          <h1 id="sup-h" className="v3-h1 mt-5">{c.h}</h1>
          <p className="lead mt-4 max-w-[30rem]">{c.p}</p>
          {sent ? (
            <p role="status" className="mt-8 flex items-start gap-3 rounded-[16px] bg-[var(--card-2)] p-5 text-[16px]"><CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-calm-aqua" />{c.sent}</p>
          ) : (
            <form onSubmit={submit} className="mt-8 grid gap-3 sm:grid-cols-2">
              <label className="sm:col-span-2"><span className="mb-1.5 block text-[14px] font-medium text-ink-muted">{c.name}</span><input name="name" required autoComplete="name" className={`${field} h-12`} /></label>
              <label><span className="mb-1.5 block text-[14px] font-medium text-ink-muted">{c.email}</span><input name="email" type="email" required autoComplete="email" className={`${field} h-12`} /></label>
              <label><span className="mb-1.5 block text-[14px] font-medium text-ink-muted">{c.phone}</span><input name="phone" type="tel" autoComplete="tel" className={`${field} h-12`} /></label>
              <label className="sm:col-span-2"><span className="mb-1.5 block text-[14px] font-medium text-ink-muted">{c.topic}</span>
                <select name="topic" required defaultValue="" className={`${field} h-12 appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat rtl:bg-[left_1rem_center]`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='%238A8A8A'%3E%3Cpath d='M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32z'/%3E%3C/svg%3E\")" }}>
                  <option value="" disabled>{c.topicPh}</option>{c.topics.map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
              <label className="sm:col-span-2"><span className="mb-1.5 block text-[14px] font-medium text-ink-muted">{c.message}</span><textarea name="message" required rows={5} className={`${field} resize-y py-3`} /></label>
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-ink-faint">{c.note}</p>
                <button type="submit" className="btn btn-primary shrink-0">{c.send}<ArrowRight size={15} aria-hidden="true" className="ms-1 rtl:-scale-x-100" /></button>
              </div>
            </form>)}
        </div>
        <div className="dark relative min-h-[460px] overflow-hidden rounded-[28px] bg-[#1a1a1a] text-white">
          <Pic n="warehouse" eager sizes="(min-width:1024px) 45vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0)_35%,rgb(17_17_17/0.85)_100%)]" />
          <div className="absolute inset-x-4 bottom-4 grid gap-2 md:inset-x-6 md:bottom-6">
            <a href="mailto:support@flexlore.com" className="flex min-h-14 items-center gap-3 rounded-[18px] bg-[rgb(20_20_20/0.72)] px-4 ring-1 ring-white/10 backdrop-blur-md transition-colors hover:bg-[rgb(20_20_20/0.85)]">
              <EnvelopeSimple size={18} /><span className="min-w-0 flex-1"><span className="block text-[12px] text-white/60">{c.mailH}</span><span className="block text-[15px] font-semibold">support@flexlore.com</span></span></a>
            <a href={SITE.demo} className="flex min-h-14 items-center gap-3 rounded-[18px] bg-[rgb(20_20_20/0.72)] px-4 ring-1 ring-white/10 backdrop-blur-md transition-colors hover:bg-[rgb(20_20_20/0.85)]">
              <CalendarBlank size={18} /><span className="min-w-0 flex-1"><span className="block text-[15px] font-semibold">{c.demoH}</span><span className="block text-[12px] text-white/60">{c.demoP}</span></span><ArrowRight size={15} className="rtl:-scale-x-100" /></a>
            <a href="/legal/" className="flex min-h-14 items-center gap-3 rounded-[18px] bg-[rgb(20_20_20/0.72)] px-4 ring-1 ring-white/10 backdrop-blur-md transition-colors hover:bg-[rgb(20_20_20/0.85)]">
              <ShieldCheck size={18} /><span className="min-w-0 flex-1"><span className="block text-[15px] font-semibold">{c.legalH}</span><span className="block text-[12px] text-white/60">{c.legalP}</span></span><ArrowRight size={15} className="rtl:-scale-x-100" /></a>
          </div>
        </div>
      </div>
    </section>
    <Faq5 />
  </>);
}
