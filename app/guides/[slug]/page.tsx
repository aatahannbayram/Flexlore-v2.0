import { guideMeta, GuideRoute, params } from "@/components/guides/routes";
export const dynamicParams = false;
export function generateStaticParams() { return params("en"); }
export async function generateMetadata({ params: p }: { params: Promise<{ slug: string }> }) { return guideMeta("en", (await p).slug); }
export default async function Page({ params: p }: { params: Promise<{ slug: string }> }) { return <GuideRoute lang="en" slug={(await p).slug} />; }
