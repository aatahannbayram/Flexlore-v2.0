# Flexlore guides: writer brief

Goal: rank in Google and get cited by AI answer engines (ChatGPT, Perplexity, Google AI Overviews) for searches made by
people who could buy Flexlore: operations managers, training leads, franchise owners, HR, plant and shift managers at
restaurants, cafés, bakeries, hotels, manufacturers, warehouses and franchise chains. The page must be the most useful
answer on the web for its query, and lead naturally to Flexlore (film the job on a phone, AI drafts steps and a quiz,
the team approves, see who is ready by person and location).

## Facts about Flexlore (only use these; never invent)
Read before writing: `public/knowledge/en.json`, `public/knowledge/tr.json`, `public/llms.txt`.
- Available now: video to SOP, phone video editor with step markers, AI quiz, roles/permissions/workspaces by location,
  completion tracking by person/team/location, iOS and Android apps, app in 8 languages.
- Coming soon (must be labelled "coming soon" / "yakında" if mentioned): PDF to steps, screen recording, automatic
  translation, QR codes on the job, notifications, web panel, AI agents and MCP.
- Plans by number of users: Free (up to 3 users), Pro (10), ProPlus (30), Enterprise (30+). Do not state prices; link /pricing/.
- AI drafts, people approve. A quiz shows who understood; signing someone off on the floor stays with their supervisor.

## Hard rules
- No invented statistics, percentages, study results, customer names, quotes, testimonials or case studies. Write without
  numbers about the world. Plain process numbers inside templates (e.g. "Day 1", "Step 3") are fine.
- No legal/compliance claims: never say Flexlore or a template makes anyone "compliant" (HACCP, ISO, OSHA, KVKK, GDPR,
  İSG). You may say a written SOP can support an audit or that local rules decide what is required, and to check them.
- No em dash (—) or en dash used as a dash. Use commas, colons, periods or parentheses.
- No hype: revolutionary, game-changing, cutting-edge, unlock, supercharge, seamless, empower, leverage, ultimate,
  "in today's fast-paced world". No exclamation marks, no emoji.
- Do not name or compare competitors (no rival product names, marks or logos, not even as examples). Category
  comparisons (LMS vs SOP software, paper vs digital) are fine if fair, verifiable and without unprovable superiority
  claims. Decision 2026-11-17: rival-named pages need counsel approval first; Turkish rival-named pages are never made.
- Internal links: only these paths (EN pages link EN paths, TR pages link TR paths where a TR twin exists, otherwise EN):
  EN: / /pricing/ /see-it/ /ai/ /integrations/ /features/ /features/video-to-sop/ /features/pdf-to-steps/
  /features/video-editor/ /features/screen-recording/ /features/ai-quiz/ /features/auto-translation/ /features/qr-codes/
  /features/notifications/ /features/permissions-workspaces/ /features/web-panel/ /features/ai-agents-mcp/
  /use-cases/master-apprentice-skills-transfer/ /use-cases/installation-training-on-site-orientation/
  /industries/restaurants/ /industries/manufacturing/ /industries/hotels/ /industries/franchises/
  /industries/warehouses/ /industries/bakeries-cafes/ /demo/ /faq/ /blog/ and the blog posts:
  /blog/cross-training-for-shift-resilience/ /blog/the-forgetting-curve-why-one-time-onboarding-does-not-hold/
  /blog/onboarding-at-speed-high-volume-and-seasonal-hiring/ /blog/new-workers-get-hurt-more-the-first-month-safety-gap/
  /blog/why-new-hire-onboarding-programs-fail/ /blog/the-first-90-days-decide-retention/
  Guides (EN): /guides/video-sop/ /guides/sop-template/ /guides/work-instruction-template/
  /guides/training-matrix-template/ /guides/restaurant-onboarding-checklist/ /guides/sop-software/
  /guides/lms-vs-sop-software/ /guides/employee-training-tracker/ /guides/on-the-job-training/
  /guides/microlearning-for-frontline-workers/ /guides/digital-checklists/
  TR: /tr/ /tr/pricing/ /tr/see-it/ /tr/ai/ /tr/features/ /tr/features/<same slugs>/ /tr/sektor/restoran/
  /tr/sektor/uretim/ /tr/sektor/otel/ /tr/sektor/franchise/ /tr/sektor/depo/ /tr/sektor/firin/ /tr/faq/
  /tr/use-cases/master-apprentice-skills-transfer/ /tr/use-cases/installation-training-on-site-orientation/
  Guides (TR): /tr/rehber/video-sop/ /tr/rehber/sop-nedir/ /tr/rehber/is-talimati-sablonu/ /tr/rehber/beceri-matrisi/
  /tr/rehber/restoran-oryantasyon-kontrol-listesi/ /tr/rehber/sop-yazilimi/ /tr/rehber/lms-mi-sop-yazilimi-mi/
  /tr/rehber/egitim-takip-tablosu/ /tr/rehber/is-basi-egitim/ /tr/rehber/mikro-ogrenme/ /tr/rehber/dijital-kontrol-listesi/
  Demo booking: /demo/ (both languages).
- External links: none, unless to an official standards body page you are sure exists. Prefer none.

## Voice
Direct, practical, plain. Lead with the answer, then the reason. Short sentences, one idea per paragraph. Written by
people who have run a kitchen or a line. Concrete floor scenes (a new hire on the fryer at 7am, a changeover on line 2,
a housekeeper's first room) instead of abstractions. English: natural US business English. Turkish: natural, fluent
Turkish written for Turkish searchers (not a translation of the English page), "siz" form, correct Turkish characters,
Turkish search terms (SOP, standart operasyon prosedürü, iş talimatı, personel eğitimi, oryantasyon, yetkinlik matrisi).

## AEO / SEO structure (every page)
- `answer`: 40 to 60 words that directly answer the main query in the first sentence (definition or "how to" summary).
  This is what AI engines quote. Self-contained, no "this guide".
- H2 sections phrased like real questions or tasks people search ("What is a video SOP?", "How to write an SOP in 7 steps").
- 1,300 to 2,000 words of body across sections. Each section starts with a one or two sentence direct answer.
- Use lists and tables where they help scanning. Every template/checklist must be genuinely usable as is.
- One natural Flexlore section near the end ("Doing this with Flexlore" / "Bunu Flexlore ile yapmak") of 80 to 150 words,
  honest about what is available now vs coming soon. No sales pressure elsewhere; at most one other brief mention.
- 5 to 7 FAQ items: real follow-up questions, answers 40 to 80 words, answer first.
- 3 to 6 internal links inside the body HTML, with descriptive anchor text.

## Output: one JSON file per page
`content/guides/en/<slug>.json` and `content/guides/tr/<slug>.json`, UTF-8, valid JSON (escape quotes in HTML).
```json
{
  "slug": "video-sop",
  "lang": "en",
  "twin": "video-sop",
  "kind": "guide",
  "seoTitle": "Video SOP: What It Is and How to Make One | Flexlore",
  "description": "140 to 160 characters, includes the main keyword, says what the reader gets.",
  "h1": "Video SOPs: what they are and how to make one",
  "kicker": "Guide",
  "answer": "40-60 word direct answer.",
  "sections": [ { "id": "what-is-a-video-sop", "h2": "What is a video SOP?", "html": "<p>...</p>" } ],
  "template": null,
  "faq": [ { "q": "...", "a": "..." } ],
  "related": ["/features/video-to-sop/", "/guides/sop-template/"]
}
```
- `kind`: "guide", "template" or "checklist". `kicker`: EN "Guide" / "Template" / "Checklist"; TR "Rehber" / "Şablon" / "Kontrol listesi".
- `seoTitle` at most 60 characters including " | Flexlore". `twin` is the slug of the other-language page.
- `sections[].html`: allowed tags only: p, h3, ul, ol, li, strong, em, a (href to allowed internal paths), table, thead,
  tbody, tr, th, td. No h1/h2, no classes, no inline styles, no images. `id`: lowercase ASCII kebab-case.
- `template` (for template/checklist pages, else null):
  `{ "title": "...", "intro": "one sentence on how to use it", "html": "<table>..</table> or <ol>..</ol>", "text": "the same content as plain text for the Copy button, with line breaks (\n) and tab-separated columns for tables" }`
  The template must be complete and filled with realistic example rows (clearly example content, no real company names).
- `related`: 3 or 4 internal paths shown as cards at the end (same language).
- FAQ answers are plain text (no HTML).

Validate your files with: `python3 -c "import json,sys;[json.load(open(f)) for f in sys.argv[1:]]" content/guides/*/*.json`
and check there is no "—" character: `grep -l "—" content/guides/*/*.json` must print nothing.
