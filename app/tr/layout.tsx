import { TrProvider } from "@/components/i18n/TrProvider";
/* Every page under /tr/ is the English page's component rendered in Turkish (components/i18n/routes.ts). */
export default function TrLayout({ children }: { children: React.ReactNode }) { return <TrProvider>{children}</TrProvider>; }
