// Flexlore Assistant on ElevenLabs, kept as code. Two jobs, both safe by default:
//
//   node --env-file=.env.local scripts/elevenlabs-sync.mjs pull
//       Saves the live agent (main branch) to elevenlabs/agent.snapshot.json, so every change made in the dashboard or by
//       another tool is versioned in git. Read-only.
//
//   node --env-file=.env.local scripts/elevenlabs-sync.mjs push --branch <branch_id> [--dry]
//       Sends ONLY the fields this repo owns to an existing agent branch (never to main): the system prompt
//       (elevenlabs/prompt.md) and the knowledge base built from the site's own content (public/knowledge/{en,tr}.json,
//       price table left out; the assistant points to the pricing page instead of quoting numbers). Every other setting
//       (tools, data collection, evaluation, privacy, language presets, widget) is left exactly as it is on the branch.
//       The branch's other knowledge documents (for example the flexlore.com page) are kept. Merging the branch into main
//       (publishing) is a separate, deliberate step in the dashboard or with `elevenlabs agents branches merge`.
//
// The API key comes from ELEVENLABS_API_KEY only. Knowledge documents are named after a hash of their content, so an
// unchanged site reuses them; nothing is ever deleted by this script.
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const ROOT = new URL("..", import.meta.url).pathname;
const API = "https://api.elevenlabs.io/v1";
const KEY = process.env.ELEVENLABS_API_KEY;
const AGENT = JSON.parse(readFileSync(ROOT + "elevenlabs/agent.json", "utf8")).agent_id;
const [cmd] = process.argv.slice(2);
const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : undefined; };
const DRY = process.argv.includes("--dry");
if (!KEY) { console.error("ELEVENLABS_API_KEY is not set. Run with: node --env-file=.env.local scripts/elevenlabs-sync.mjs <pull|push>"); process.exit(1); }

async function api(method, path, body) {
  const r = await fetch(API + path, { method, headers: { "xi-api-key": KEY, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const t = await r.text();
  if (!r.ok) throw new Error(`${method} ${path} -> ${r.status}: ${t.slice(0, 600)}`);
  return t ? JSON.parse(t) : {};
}

if (cmd === "pull") {
  const a = await api("GET", `/convai/agents/${AGENT}`);
  const keep = { agent_id: a.agent_id, name: a.name, version_id: a.version_id, branch_id: a.branch_id, conversation_config: a.conversation_config, platform_settings: a.platform_settings, workflow: a.workflow };
  writeFileSync(ROOT + "elevenlabs/agent.snapshot.json", JSON.stringify(keep, null, 2) + "\n");
  console.log(`saved ${a.version_id} to elevenlabs/agent.snapshot.json`);
  process.exit(0);
}
if (cmd !== "push") { console.error("usage: pull | push --branch <branch_id> [--dry]"); process.exit(1); }

const branch = arg("--branch");
const live = await api("GET", `/convai/agents/${AGENT}`);
if (!branch || branch === live.main_branch_id) { console.error("push needs --branch <id> of a non-main branch. Create one in the dashboard or with `elevenlabs agents branches create`."); process.exit(1); }

const SKIP = new Set(["pricing-plans"]);
function kbText(locale) {
  const { entries } = JSON.parse(readFileSync(ROOT + `public/knowledge/${locale}.json`, "utf8"));
  const out = [`Flexlore website content (${locale}). Source: www.flexlore.com. Each section is one page or answer on the site.`];
  for (const e of entries) { if (!SKIP.has(e.id.split(":")[1])) out.push(`## ${e.title}\n${e.body}\nPage: ${e.url}`); }
  return out.join("\n\n");
}
async function ensureDoc(locale) {
  const text = kbText(locale);
  const name = `Flexlore site ${locale.toUpperCase()} ${createHash("sha256").update(text).digest("hex").slice(0, 8)}`;
  if (DRY) return { type: "text", id: "(dry)", name, usage_mode: "auto" };
  const list = await api("GET", `/convai/knowledge-base?search=${encodeURIComponent(name)}&page_size=10`);
  let doc = (list.documents || []).find((d) => d.name === name);
  if (!doc) { doc = await api("POST", "/convai/knowledge-base/text", { name, text }); console.log(`created ${name} (${text.length} chars)`); }
  try { await api("POST", `/convai/knowledge-base/${doc.id}/rag-index`, { model: "e5_mistral_7b_instruct" }); } catch (e) { console.warn("rag index:", e.message); }
  return { type: "text", id: doc.id, name, usage_mode: "auto" };
}

const cur = await api("GET", `/convai/agents/${AGENT}?branch_id=${branch}`);
const others = (cur.conversation_config.agent.prompt.knowledge_base || []).filter((d) => !/^Flexlore site (EN|TR) /.test(d.name));
const kb = [await ensureDoc("en"), await ensureDoc("tr"), ...others];
const body = { conversation_config: { agent: { prompt: { prompt: readFileSync(ROOT + "elevenlabs/prompt.md", "utf8"), knowledge_base: kb } } } };
if (DRY) { console.log(JSON.stringify({ branch, body }, null, 2)); process.exit(0); }
await api("PATCH", `/convai/agents/${AGENT}?branch_id=${branch}`, body);
console.log(`pushed prompt and knowledge base to branch ${branch}`);
