/* Analytics and error tracking, switched on by environment variables at build time (static export, so they are read
 * when `next build` runs, not at request time):
 *   NEXT_PUBLIC_POSTHOG_KEY   PostHog project API key. Unset = no PostHog.
 *   NEXT_PUBLIC_POSTHOG_HOST  PostHog API host, default https://eu.i.posthog.com (EU cloud).
 *   NEXT_PUBLIC_SENTRY_DSN    Sentry DSN for browser errors. Unset = no Sentry.
 * With none set this renders nothing and ships no code. When set, one small inline script waits for the page to load and
 * the browser to go idle, then pulls the vendor script from its CDN, so neither adds to the page's own JS bundle.
 * PostHog starts in memory-only persistence (no cookies) until a consent banner exists; switch it after consent. */
const SENTRY_CDN = "https://browser.sentry-cdn.com/8.38.0/bundle.tracing.min.js";
export function Analytics() {
  const ph = process.env.NEXT_PUBLIC_POSTHOG_KEY; const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!ph && !dsn) return null;
  const J = JSON.stringify;
  const posthog = ph ? `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify alias reset set_config opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_distinct_id getFeatureFlag isFeatureEnabled onFeatureFlags group".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init(${J(ph)},{api_host:${J(host)},person_profiles:"identified_only",persistence:"memory"});` : "";
  const sentry = dsn ? `var s=document.createElement("script");s.src=${J(SENTRY_CDN)};s.async=true;s.crossOrigin="anonymous";s.onload=function(){window.Sentry&&window.Sentry.init({dsn:${J(dsn)},tracesSampleRate:0.1})};document.head.appendChild(s);` : "";
  const code = `(function(){function go(){try{${posthog}${sentry}}catch(e){}}function idle(){var r=window.requestIdleCallback;r?r(go,{timeout:4000}):setTimeout(go,1500)}if(document.readyState==="complete")idle();else addEventListener("load",idle,{once:true})})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
