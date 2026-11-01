# Flexlore website v13: master brief

## North star
Visitors should be hooked within 5 seconds, should understand Flexlore, and should **imagine using it in their own business** ("I'd use it like this in my work"). We sell a dream to companies and to users. The site must feel like one coherent story from top to bottom.

## Core message (the user's own words)
Flexlore simulates a job step by step from the eyes of the operator who does it. This leads to:
- lower cost of poor quality,
- easy onboarding and fast training,
- a stronger master-to-apprentice relationship,
- orientation that stays in place after a team installs equipment at a customer site.

## Narrative order
1. **Hero:** a big logo, the outcome headline, a field video in the background, and a Book a demo button plus App Store download in the first view.
2. **The problem:** quality costs and lost knowledge, told visually with few words.
3. **How it works:** a clickable tour of one job seen through the operator's eyes, using the real app screens.
4. **"Imagine it in your business":** a sector selector that doesn't filter anyone out. Visitors pick their industry or role, or choose "my business is different". Each option shows a concrete picture of a job in that context, a photo or video, and a 3-step flow. Cover at least restaurants, manufacturing, hotels, franchises, warehouses, bakeries, field service and installation, healthcare and clinics, retail, construction, automotive service, and a generic "any repeatable job".
5. **Customer cases:** video- and visual-led, with very little text. Use the four cases from v12. No real customer names.
6. **AI:** what we do today and what is coming. Today: AI breaks a video into steps, writes quizzes, and supports multilingual content. Coming soon, as Linear confirms: FLE-122, FLE-123, FLE-124 (Claude MCP). Explain how each one makes the work easier.
7. **Integrations:** only real or planned ones confirmed in Notion or Linear, each labelled live or coming soon. Never invent one.
8. **Cost-of-poor-quality calculator:** keep it.
9. **Pricing teaser,** then a Book a demo CTA.
10. **Footer:** like the live flexlore.com footer (study its structure), but more refined. Include App Store and Google Play download badges if Play exists, social links (LinkedIn, Instagram @flexlore.inc, YouTube @FlexloreInc), the blog, and legal links.

## Pricing page (/pricing)
- A refined page with plan cards, a comparison table and an FAQ.
- It must connect to Flexlore's Stripe account. Use real Stripe products and prices if a Stripe connector or plugin is available. Never invent prices.
- If there's no Stripe access or no prices exist yet, build the page structure with clearly marked placeholders and "Contact sales / Book a demo" buttons. Wire the CTAs so Stripe Payment Links or Checkout URLs can be dropped in through a single config file, and report what's needed.

## Visual rules
- Icons: one custom, refined, consistent set with a thin stroke, monochrome, and an orange accent used sparingly. Nothing childish, generic or emoji-like. No decorative icon tiles.
- Lines, columns and grids must never feel AI-generated: no glow borders, no gradient hairlines, no generic bento grids. Use editorial and Swiss-style layout with real typography rhythm.
- Prefer video and images over text, especially in the cases. Use the user's photos in `public/photos`.
- Tighten the spacing between description sentences and paragraphs so the copy reads compact and refined.
- The logo should be bigger on load and while scrolling. Header logo at roughly 32–40px high, with a large logo moment in the hero. Use the original brand files only.
- Inter, with bold startup headlines. Keep the dark cinematic Apple-style look.

## SEO (must be excellent)
- A unique title and description on every page, plus canonical URLs.
- Open Graph and Twitter cards.
- JSON-LD: Organization, SoftwareApplication (with the App Store link), FAQPage, BlogPosting on articles, and BreadcrumbList.
- sitemap.xml and robots.txt. Keep noindex for the demo, behind one flag that can be flipped at launch.
- Semantic headings with a single h1 per page, alt text on images, fast LCP, lazy video and next/image-optimized webp.

## Hard constraints
- No customer names, invented metrics, testimonials or "#1/first/best" claims.
- No certification claims: KVKK, SOC 2, SLA.
- Example figures must be labelled as examples.
- Ata is always "Co-Founder & CEO".
- Keep all existing URLs working: the blog, `/sektor/*` and the HubSpot demo link.
- Don't touch the live Framer flexlore.com, other Vercel or Hostinger projects, or DNS.
