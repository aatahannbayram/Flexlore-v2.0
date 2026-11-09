# Flexlore site assistant (Claude)

The chat button on flexlore.com answers questions in two modes:

1. **Local (default, no server).** When `NEXT_PUBLIC_ASSISTANT_URL` is not set at build time, the widget searches the
   site's knowledge base in the browser (`public/knowledge/<locale>.json`) and quotes the closest entry with a link to
   its page. It says plainly when it has no answer and offers a demo call and support.
2. **Claude.** When `NEXT_PUBLIC_ASSISTANT_URL` points at this handler, the widget streams answers written by Claude,
   grounded only in the same knowledge base. If the handler fails, the widget falls back to local answers.

## Knowledge management

There is one source of truth: the site itself. `scripts/knowledge.mjs` runs before every site build (`npm run build`,
prebuild) and collects, for all 8 languages, how it works, why Flexlore, industries, the home FAQ, every feature page
(with its FAQ), the web panel, pricing plans and pricing FAQ, the sector pages and the support contact. It writes:

- `public/knowledge/<locale>.json` for the browser (small, one language at a time),
- `server/assistant/knowledge.json` for this handler (all languages).

To change what the assistant knows, change the site copy, then rebuild. Do not edit the JSON files by hand.

## Run locally

```bash
cd server/assistant
npm install
ANTHROPIC_API_KEY=... ALLOWED_ORIGINS=http://localhost:4322 npm start   # listens on :8787
```

Then build the site with `NEXT_PUBLIC_ASSISTANT_URL=http://localhost:8787 npm run build` and open it.

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | (required) | Claude API key. Keep it on the server only; never in the site build. |
| `ASSISTANT_MODEL` | `claude-opus-5-5` | Model id. |
| `ALLOWED_ORIGINS` | `https://www.flexlore.com,https://flexlore.com` | CORS allow list (comma separated). Add the preprod origin when testing there. |
| `PORT` | `8787` | Listen port. |
| `RATE_MAX` / `RATE_WINDOW_MS` | `20` / `600000` | Questions per IP per window (in memory, one process). |

Site build: `NEXT_PUBLIC_ASSISTANT_URL=https://<assistant host>/` enables Claude answers in the widget.

## How a request works

- Body: `{ messages: [{ role, content }], locale, page }`. Only the last 12 turns are kept, each up to 2,000 characters.
- System prompt: the rules (answer only from the knowledge base, cite page URLs, reply in the visitor's language, hand
  off to demo or support, never invent numbers, names or features) plus the knowledge entries for the visitor's language
  and English. That block is identical for every request in a language, so it is prompt-cached.
- Model call: streaming, `output_config.effort: "low"` (short chat answers), server-side refusal fallbacks
  (`fallbacks: "default"` with the `server-side-fallback-2026-07-01` beta). A declined request ends with a hand-off line.
- Reply: plain text, streamed in chunks.

## Deploy notes (not deployed)

- Any Node 20+ host works (a small VM, a container, a serverless function that supports streaming responses).
  Do not put it on the Hostinger VPS that serves other live sites without checking with the owner first.
- Put it behind HTTPS, keep `ALLOWED_ORIGINS` to the real site origins, and pass the client IP in `X-Forwarded-For`.
- The in-memory rate limit is per process; with more than one instance, move it to a shared store (for example Redis).
- Later: send errors to Sentry and events (question asked, answered locally or by Claude, hand-off clicked) to PostHog.
