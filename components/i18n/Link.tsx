"use client";
/* Internal links that follow the page language: on a Turkish page (/tr/...) an English path with a Turkish twin becomes
 * that twin (/pricing/ -> /tr/pricing/, /industries/restaurants/ -> /tr/sektor/restoran/); everything else is unchanged.
 * Works during static prerender (usePathname), so the Turkish HTML already carries Turkish links for crawlers. */
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { isTrPath, localHref } from "./routes";

/** Maps an internal href for the current page's language. */
export function useHref() {
  const tr = isTrPath(usePathname() || "/");
  return (href: string) => localHref(href, tr);
}

type Props = React.ComponentProps<typeof NextLink>;
const Link = forwardRef<HTMLAnchorElement, Props>(function Link({ href, ...rest }, ref) {
  const h = useHref();
  return <NextLink ref={ref} href={typeof href === "string" ? h(href) : href} {...rest} />;
});
export default Link;
