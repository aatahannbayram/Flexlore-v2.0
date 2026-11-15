/* Lead requests from the pricing page (Enterprise quote, extra users, extra storage, setup service).
 *
 * Where a request goes:
 *   1. HubSpot: posted to the HubSpot Forms API (EU portal SITE.hubspot) when NEXT_PUBLIC_HS_LEAD_FORM holds the form's
 *      GUID. The form needs five fields: email, firstname, lastname, company, message. The request type, team size,
 *      sector and locations go into `message`, so no custom HubSpot properties are needed. The HubSpot cookie (hutk) is
 *      sent when present, which ties the request to the visitor's page history in HubSpot.
 *   2. PostHog and GA4: `lead_submit` (type, team size, sector, page) and `lead_sent` (type, channel) through flxTrack,
 *      plus a PostHog identify by email so the request joins the visitor's earlier events. Both only run after the
 *      visitor allows analytics (the scripts are not loaded before that).
 *   3. Sentry: a failed HubSpot post is reported (tag area=lead_form), then the visitor falls back to email.
 *   4. Flexlore backend: also posted to SITE.leadApi (Django, admin panel) when set.
 *   Without either (or if both fail) the request opens the visitor's email app to support@flexlore.com. */
import { SITE } from "./config";
import { track } from "./track";

export type LeadType = "enterprise" | "users" | "storage" | "setup";
export type Lead = { type: LeadType; typeLabel: string; name: string; email: string; company: string; size: string; sector: string; sites: string; msg: string;
  labels: { size: string; sector: string; sites: string; msg: string }; subject: string };

type W = Window & { posthog?: { identify?: (id: string, props?: Record<string, string>) => void }; Sentry?: { captureException?: (e: unknown, ctx?: unknown) => void } };
const cookie = (k: string) => document.cookie.split("; ").find((c) => c.startsWith(k + "="))?.slice(k.length + 1);
const report = (e: unknown) => { try { (window as W).Sentry?.captureException?.(e, { tags: { area: "lead_form" } }); } catch {} };

export const leadDirect = () => !!((SITE.hsLeadForm && SITE.hubspot) || SITE.leadApi);

/* The Flexlore backend keeps its own copy of every request (admin panel, filter by type). The honeypot field is sent empty. */
async function toBackend(l: Lead): Promise<boolean> {
  if (!SITE.leadApi) return false;
  try {
    const r = await fetch(SITE.leadApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      type: l.type, full_name: l.name.trim(), email: l.email.trim(), company: l.company, team_size: l.size, sector: l.sector,
      locations: l.sites, message: l.msg, locale: document.documentElement.lang || "", page: location.pathname, website: "" }) });
    if (!r.ok) throw new Error(`Lead API ${r.status}: ${(await r.text()).slice(0, 300)}`);
    return true;
  } catch (e) { report(e); return false; }
}

export async function sendLead(l: Lead): Promise<"hubspot" | "mail"> {
  track("lead_submit", { type: l.type, size: l.size, sector: l.sector, page: location.pathname });
  try { (window as W).posthog?.identify?.(l.email.trim().toLowerCase(), { email: l.email.trim(), company: l.company, team_size: l.size, sector: l.sector, last_request: l.type }); } catch {}
  const message = [`[${l.typeLabel}]`, `${l.labels.size}: ${l.size}`, `${l.labels.sector}: ${l.sector}`, l.sites ? `${l.labels.sites}: ${l.sites}` : "", "", l.msg].filter((x, i) => x || i === 4).join("\n").trim();
  const backend = toBackend(l);
  if (SITE.hsLeadForm && SITE.hubspot) {
    try {
      const [first, ...rest] = l.name.trim().split(/\s+/);
      const r = await fetch(`https://api-eu1.hsforms.com/submissions/v3/integration/submit/${SITE.hubspot}/${SITE.hsLeadForm}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [["email", l.email.trim()], ["firstname", first || ""], ["lastname", rest.join(" ")], ["company", l.company], ["message", message]].map(([name, value]) => ({ objectTypeId: "0-1", name, value })),
          context: { hutk: cookie("hubspotutk"), pageUri: location.href, pageName: document.title },
        }),
      });
      if (!r.ok) throw new Error(`HubSpot form submit ${r.status}: ${(await r.text()).slice(0, 300)}`);
      await backend;
      track("lead_sent", { type: l.type, via: "hubspot" });
      return "hubspot";
    } catch (e) { report(e); }
  }
  if (await backend) { track("lead_sent", { type: l.type, via: "backend" }); return "hubspot"; }
  const body = [`${l.name}`, `${l.email}`, `${l.company}`, "", message].join("\n");
  window.location.href = `mailto:support@flexlore.com?subject=${encodeURIComponent(`${l.subject}: ${l.company}`)}&body=${encodeURIComponent(body)}`;
  track("lead_sent", { type: l.type, via: "mail" });
  return "mail";
}
