import { guideMeta, GuideRoute, params } from "@/components/guides/routes";
export const dynamicParams = false;
export function generateStaticParams() { return params("tr"); }
export async function generateMetadata({ params: p }: { params: Promise<{ slug: string }> }) { return guideMeta("tr", (await p).slug); }
export default async function Page({ params: p }: { params: Promise<{ slug: string }> }) { return <GuideRoute lang="tr" slug={(await p).slug} />; }
