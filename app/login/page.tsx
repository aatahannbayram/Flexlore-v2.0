import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginPage } from "@/components/pages/Help";
import { meta } from "@/components/seo";
// A handoff into the web app and the mobile apps; kept out of search results and the sitemap like any log-in page.
export const metadata = { ...meta({ title: "Log in to Flexlore", description: "Log in to your Flexlore account in the web app, or open the Flexlore app on iOS and Android.", path: "/login/" }),
  robots: { index: false, follow: true } };
export default function Page() {
  return (<><Header /><main id="main" className="overflow-x-clip"><LoginPage /></main><Footer /></>);
}
