/* Analytics and error tracking, switched on by environment variables at build time (static export, so they are read
 * when `next build` runs, not at request time):
 *   NEXT_PUBLIC_POSTHOG_KEY   PostHog project API key. Unset = no PostHog.
 *   NEXT_PUBLIC_POSTHOG_HOST  PostHog API host, default https://eu.i.posthog.com (EU cloud).
 *   NEXT_PUBLIC_SENTRY_DSN    Sentry DSN for browser errors. Unset = no Sentry.
 * With none set this renders nothing and ships no code. When set, one small inline script waits for the page to load and
 * the browser to go idle, then pulls the vendor script from its CDN, so neither adds to the page's own JS bundle.
 * PostHog does not load at all until the visitor allows analytics in the consent banner (components/ConsentBanner.tsx,
 * record "flx-consent"); then it loads with its normal storage. Declining later in "Cookie settings" stops capturing at
 * once. Sentry (error reports, no cookies) is not gated.
 * GA4 (SITE.ga4) and HubSpot tracking (SITE.hubspot), both carried over from the old site and set only in the launch build,
 * follow the same consent record: nothing loads before "allow"; withdrawing consent turns GA4 storage off and stops
 * HubSpot tracking (its cookies are removed by HubSpot's own opt-out call). */
import { SITE } from "./config";
const SENTRY_CDN = "https://browser.sentry-cdn.com/8.38.0/bundle.tracing.min.js";
export function Analytics() {
  const ph = process.env.NEXT_PUBLIC_POSTHOG_KEY; const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  const ga = SITE.ga4; const hs = SITE.hubspot;
  if (!ph && !dsn && !ga && !hs) return null;
  const J = JSON.stringify;
  const posthog = ph ? `function ph(){!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify alias reset set_config opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_distinct_id getFeatureFlag isFeatureEnabled onFeatureFlags group".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init(${J(ph)},{api_host:${J(host)},person_profiles:"identified_only",persistence:"localStorage+cookie"})}function ok(){try{var c=JSON.parse(localStorage.getItem("flx-consent")||"null");return !!(c&&c.analytics)}catch(e){return false}}var on=false;function ap(){if(ok()){if(!on){on=true;ph()}else{window.posthog.opt_in_capturing()}}else if(on){window.posthog.opt_out_capturing()}}ap();addEventListener("flx-consent",ap);` : "";
  /* GA4 in consent mode: storage denied by default, granted when the visitor allows analytics. */
  const ga4 = ga ? `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});var gon=false;function ga(){var y=ok();gtag("consent","update",{analytics_storage:y?"granted":"denied"});window["ga-disable-"+${J(ga)}]=!y;if(y&&!gon){gon=true;var g=document.createElement("script");g.async=true;g.src="https://www.googletagmanager.com/gtag/js?id="+${J(ga)};document.head.appendChild(g);gtag("js",new Date());gtag("config",${J(ga)})}}ga();addEventListener("flx-consent",ga);` : "";
  /* HubSpot tracking (EU portal): loads only after consent; a later "decline" calls HubSpot's opt-out. Its chat bubble stays
     off (loadImmediately:false): Flex AI is the site assistant and both would sit in the same corner. */
  const hub = hs ? `var hon=false;function hb(){var y=ok();if(y&&!hon){hon=true;window.hsConversationsSettings={loadImmediately:false};var h=document.createElement("script");h.id="hs-script-loader";h.async=true;h.defer=true;h.src="https://js-eu1.hs-scripts.com/"+${J(hs)}+".js";document.head.appendChild(h)}else if(!y&&hon){(window._hsq=window._hsq||[]).push(["doNotTrack"])}}hb();addEventListener("flx-consent",hb);` : "";
  const okFn = `function ok(){try{var c=JSON.parse(localStorage.getItem("flx-consent")||"null");return !!(c&&c.analytics)}catch(e){return false}}`;
  const sentry = dsn ? `var s=document.createElement("script");s.src=${J(SENTRY_CDN)};s.async=true;s.crossOrigin="anonymous";s.onload=function(){window.Sentry&&window.Sentry.init({dsn:${J(dsn)},tracesSampleRate:0.1})};document.head.appendChild(s);` : "";
  const code = `(function(){${okFn}function go(){try{${posthog}${ga4}${hub}${sentry}}catch(e){}}function idle(){var r=window.requestIdleCallback;r?r(go,{timeout:4000}):setTimeout(go,1500)}if(document.readyState==="complete")idle();else addEventListener("load",idle,{once:true})})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
