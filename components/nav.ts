// One source for the site's navigation: the desktop mega menu, the mobile menu and the ⌘K search all read from here.
// Every item has an icon, a title and one plain line, in EN and TR.
import {
  PlayCircle, Browser, Sparkle, PlugsConnected, Eye, ForkKnife, Factory, Bed, Storefront, Package, Coffee,
  Article, Handshake, Wrench, Tag, Question, EnvelopeSimple,
} from "./ui/icons";

type L = { en: string; tr: string };
export type NavItem = { href: string; icon: (p: { size?: number; className?: string }) => React.ReactElement; t: L; d: L; home?: boolean };
export type NavGroup = { id: string; label: L; items: NavItem[]; more?: { href: string; t: L } };

export const NAV: NavGroup[] = [
  {
    id: "product", label: { en: "Product", tr: "Ürün" },
    items: [
      { href: "/#product", home: true, icon: PlayCircle, t: { en: "How it works", tr: "Nasıl çalışır" }, d: { en: "Film a job, get steps and a quiz", tr: "İşi çekin, adımlar ve quiz hazır" } },
      { href: "/#web", home: true, icon: Browser, t: { en: "Flexlore Web", tr: "Flexlore Web" }, d: { en: "Library and readiness on the desktop", tr: "Kütüphane ve hazırlık masaüstünde" } },
      { href: "/ai/", icon: Sparkle, t: { en: "AI", tr: "Yapay zekâ" }, d: { en: "Drafts that your team approves", tr: "Ekibinizin onayladığı taslaklar" } },
      { href: "/integrations/", icon: PlugsConnected, t: { en: "Integrations", tr: "Entegrasyonlar" }, d: { en: "Apps today, API and more next", tr: "Bugün uygulamalar, sırada API" } },
      { href: "/see-it/", icon: Eye, t: { en: "See it in your business", tr: "Kendi işinizde görün" }, d: { en: "One real job, start to finish", tr: "Gerçek bir iş, baştan sona" } },
    ],
  },
  {
    id: "industries", label: { en: "Industries", tr: "Sektörler" },
    items: [
      { href: "/sektor/restoran/", icon: ForkKnife, t: { en: "Restaurants", tr: "Restoranlar" }, d: { en: "Same plate, every shift", tr: "Her vardiyada aynı tabak" } },
      { href: "/sektor/uretim/", icon: Factory, t: { en: "Manufacturing", tr: "Üretim" }, d: { en: "Changeover without guesswork", tr: "Tahminsiz kalıp değişimi" } },
      { href: "/sektor/otel/", icon: Bed, t: { en: "Hotels", tr: "Oteller" }, d: { en: "Every room to your standard", tr: "Her oda sizin standardınızda" } },
      { href: "/sektor/franchise/", icon: Storefront, t: { en: "Franchises", tr: "Franchise" }, d: { en: "One launch, every branch", tr: "Tek lansman, her şube" } },
      { href: "/sektor/depo/", icon: Package, t: { en: "Warehouses", tr: "Depolar" }, d: { en: "Picking and safety, one way", tr: "Toplama ve güvenlik, tek yol" } },
      { href: "/sektor/firin/", icon: Coffee, t: { en: "Bakeries and cafés", tr: "Fırın ve kafeler" }, d: { en: "The recipe, not a guess", tr: "Tahmin değil, tarif" } },
    ],
    more: { href: "/see-it/", t: { en: "See Flexlore in your business", tr: "Flexlore'u kendi işinizde görün" } },
  },
  {
    id: "resources", label: { en: "Resources", tr: "Kaynaklar" },
    items: [
      { href: "/blog/", icon: Article, t: { en: "Blog", tr: "Blog" }, d: { en: "Training on the floor, in practice", tr: "Sahada eğitim, pratikte" } },
      { href: "/use-cases/master-apprentice-skills-transfer/", icon: Handshake, t: { en: "Master to apprentice", tr: "Ustadan çırağa" }, d: { en: "Pass on skills before people leave", tr: "Bilgiyi insanlar gitmeden aktarın" } },
      { href: "/use-cases/installation-training-on-site-orientation/", icon: Wrench, t: { en: "Installation training", tr: "Kurulum eğitimi" }, d: { en: "Hand over machines with the know-how", tr: "Makineyi bilgisiyle teslim edin" } },
      { href: "/pricing/", icon: Tag, t: { en: "Pricing", tr: "Fiyatlar" }, d: { en: "Priced by the size of your team", tr: "Ekip büyüklüğüne göre fiyat" } },
      { href: "/#faq", home: true, icon: Question, t: { en: "Questions", tr: "Sorular" }, d: { en: "AI, devices, languages, access", tr: "Yapay zekâ, cihaz, dil, erişim" } },
      { href: "mailto:support@flexlore.com", icon: EnvelopeSimple, t: { en: "Contact", tr: "İletişim" }, d: { en: "support@flexlore.com", tr: "support@flexlore.com" } },
    ],
  },
];

/** Resolve a nav href for the current page: in-page anchors stay local on the home page. */
export const navHref = (it: NavItem, onHome: boolean) => (it.home && onHome ? it.href.slice(1) : it.href);
