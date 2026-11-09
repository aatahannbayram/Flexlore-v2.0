"use client";
/* 404: header, one line, two ways back, footer. */
import Link from "next/link";
import { Header } from "../Header";
import { Footer } from "../Sections";
import { useLocale } from "../i18n/LocaleProvider";
import { Chev } from "./Chevron";
const T = { en: { k: "404", h: "This page is not here.", p: "The link may be old or mistyped.", home: "Go to the home page", help: "Support" },
  tr: { k: "404", h: "Bu sayfa burada değil.", p: "Bağlantı eski ya da hatalı yazılmış olabilir.", home: "Ana sayfaya dönün", help: "Destek" } };
export default function NotFoundPage() {
  const { lang } = useLocale(); const t = T[lang];
  return (<>
    <Header />
    <main id="main" className="pt-[var(--header-h)]">
      <section aria-labelledby="nf-h" className="container-x flex min-h-[60svh] flex-col justify-center py-16">
        <p className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink-muted"><Chev className="h-2.5 w-4 text-accent" />{t.k}</p>
        <h1 id="nf-h" className="v4-h2 mt-4 max-w-[18ch]">{t.h}</h1>
        <p className="mt-4 text-[17px] text-ink-muted">{t.p}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary group h-11 px-5">{t.home}<Chev dir="end" className="chev-go h-2.5 w-3.5" /></Link>
          <Link href="/support/" className="btn btn-secondary h-11">{t.help}</Link>
        </div>
      </section>
    </main>
    <Footer />
  </>);
}
