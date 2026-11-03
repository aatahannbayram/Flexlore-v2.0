# Redesign 00: repo analysis and plan

Branch `p0-site-improvements` at `b1e47ef`. Analysis date 2026-11-04. No code changed in this phase.

## 1. Build

| Check | Result |
|---|---|
| `npm ci && npm run build` on Node 18.18 (local default) | Fails: `@tailwindcss/oxide` needs Node >= 20 ("Cannot find native binding"). Environment issue, not code. |
| Same on Node 22.23 | Passes. 30 static pages, export to `out/`. |
| CI (`.github/workflows/deploy-preprod.yml`) | Node 24. |
| Warning | Next picks `/Users/macbookpro/package-lock.json` as workspace root (stray lockfile outside the repo). Fix: set `outputFileTracingRoot` in `next.config.mjs`. |

Proposal: add `"engines": { "node": ">=20" }` and an `.nvmrc` (`24`) so this cannot recur.

## 2. Stack

| Item | Finding | File |
|---|---|---|
| Next.js | 15.5.28, App Router, `output: 'export'`, `trailingSlash: true`, `images.unoptimized` | `next.config.mjs` |
| React | 19.3 | `package.json` |
| Styling | Tailwind v4 (`@theme` in CSS), a few hand-written classes (`.btn-p`, `.display`, `.eyebrow`) | `app/globals.css` |
| Font | `next/font/google` Schibsted Grotesk, `display: swap`, latin + latin-ext | `app/layout.tsx` |
| Animation | `framer-motion` (already a dependency, so we keep it rather than adding `motion`), plus `lenis` smooth scroll, CSS keyframes (grain, marquee) | `components/Site.tsx`, `Kinetic.tsx`, `Header.tsx` |
| Icons | `lucide-react` (5 imports) + hand-drawn SVGs in `components/Icons.tsx` | |
| i18n | **No routes.** EN/TR is a client `useState` toggle per page (`Site.tsx`, `Pricing.tsx`). Static HTML is English only; `<html lang="en">`; Footer and several sections are EN-only strings in JSX. | `components/copy.ts`, `config.ts` (`PLAN_TR`, `PRICING_FAQ_TR`), inline `tr ? … : …` |
| Copy | Split across `copy.ts`, `config.ts`, `sectors.ts`, `seeit-data.ts`, `lib/seo.json`, `lib/blog.json`, and inline strings in components | |
| Config/flags | `components/config.ts`: `SITE.noindex: true`, `SITE.login: ""`, `SITE.programBadges: false`, demo link = HubSpot meetings URL | |
| Video | `Video` in `Site.tsx` (lazy source on IO, plays at 35% visible, `playOnly` = one at a time), `AppScreens.tsx` own `<video>`, `HeroMedia.tsx` (AV1/VP9/H.264 picker, `HERO.video = null` so poster only) | |
| Images | Plain `<img>` and `<picture>`; hero has AVIF/WebP at 1080x1920, 1920, 2560. Other images are single JPG/PNG/WebP. | |
| SEO | `lib/seo.json` per route, `components/seo.tsx`, `app/sitemap.ts`, `app/robots.ts`, JSON-LD Organization + SoftwareApplication (no ratings) | |

## 3. Routes and components

| Route | Page component | Uses |
|---|---|---|
| `/` | `Site` | Header, HeroMedia, Intro (YouTube modal-less embed), Statement, Product (sticky story), WebSection (`WebApp.tsx`), ProductSuite, Sectors + SeeItCard, PricingTeaser (`Sections.tsx`), Faq + end CTA, Footer |
| `/pricing/` | `Pricing` | Header, PriceUI, StoreCTA, Copq, Footer |
| `/see-it/` | `SeeIt` | Header, seeit-data, Footer |
| `/sektor/[slug]/` (restoran, uretim, otel, franchise, depo, firin) | `SectorPage` | Header, Kinetic, Video, Footer |
| `/use-cases/[slug]/` (2) | `UseCase` | Blog layout, Footer |
| `/blog/`, `/blog/[slug]/` (10 posts) | `Blog` | Header, Footer |
| `/ai/`, `/integrations/` | `Sections.tsx` (AIDetail, IntegrationsDetail) | |
| `/demo/mikel-coffee/` | `MikelCoffee` | Header, AppScreens, Video |
| Legal | **No routes in this repo.** Footer links go to `https://www.flexlore.com/legal/*` (the Framer site). | |

Unused components (no imports anywhere): `Cases.tsx`, `Imagine.tsx`, `Programs.tsx`, `Security.tsx`. Footer still links to `/#imagine`, `/#ai`, `/#integrations`, which no longer exist on the home page (dead anchors).

## 4. Weight

First Load JS (gzip, from build output):

| Route | Page | First Load |
|---|---|---|
| `/` | 169 B | **201 kB** (budget 180 kB) |
| `/pricing/` | 3.89 kB | 171 kB |
| `/see-it/` | 3.62 kB | 173 kB |
| `/sektor/[slug]` | 2.9 kB | 204 kB |
| `/demo/mikel-coffee` | 13.5 kB | 215 kB |
| `/blog`, `/ai`, `/integrations`, `/use-cases` | ~0.2 kB | 167 kB |
| Shared | | 103 kB |

Media: `public/` 24 MB (video 10 MB, blog 7.4 MB, brand 2.8 MB, photos 2.3 MB, hero 0.3 MB). 103 files: 18 mp4, 7 webm, 22 jpg, 30 png, 19 webp, 4 avif, 3 svg. Biggest: blog PNGs at 1.1 to 1.7 MB each (should be AVIF/WebP). `out/` is 27 MB.
Repo: `.git` is 284 MB, mostly `screenshots/` (205 MB committed). Not part of the build, but it makes clones slow.

All site footage is 6 Mixkit stock clips, 720p, 5 to 8 s (`CREDITS.md`). The production line clip is robotic, not people.

## 5. Audit items, verified

| # | Item | Verdict | Where |
|---|---|---|---|
| 1 | Hero unreadable | **Confirmed.** Full-bleed poster of app screenshots (`HeroMedia`), text overlaid with only `bg-black/25` + text-shadow. | `Site.tsx` Hero, `HeroMedia.tsx`, `config.ts` HERO |
| 2 | Header has no background | **Partly.** Transparent only for the first 40 px. After that it shrinks to a 900 px opaque pill (`#111113`, no blur, no border). Content scrolls visibly on both sides of the pill, and the shrink animates `width/height` (layout). | `Header.tsx` |
| 3 | No shared grid | **Confirmed.** Containers: `max-w-[1400px]`, `max-w-6xl` (1152), `max-w-[1100px]`, header 1200/900, padding `px-6 md:px-10`. | `Site.tsx`, `Sections.tsx`, `WebApp.tsx` |
| 4 | No rhythm | **Confirmed.** Statement is `h-[170vh]` sticky, Product ("Follow one job") is `h-[380vh]` sticky with the same layout for 4 steps. Most headings use `text-h1`/`text-h2`, body `text-white/70`. | `Site.tsx` |
| 5 | Few trust signals, roadmap line | **Confirmed.** Proof = 3 store/PH links in `PricingTeaser`. "Roadmap: No dates yet…" in `ProductSuite`. Program badges gated off (`SITE.programBadges = false`, "unverified"). | `Sections.tsx`, `Site.tsx`, `config.ts` |
| 6 | Pricing confusing | **Confirmed, and one more problem.** `was` prices in `PLANS`. On the monthly view `PriceBlock` also prints "Save with yearly" in orange. Free and paid plans both go to `StoreCTA` (app stores). Two badges ("Recommended for Small Business" on Pro, "Most popular" on ProPlus). | `config.ts`, `PriceUI.tsx`, `Pricing.tsx` |
| 7 | Industry section flat | **Confirmed.** 6 equal cards, video poster JPGs, no motion. | `Site.tsx` Sectors |
| 8 | FAQ thin | **Confirmed** on home (3). Pricing page has 11 good ones we can reuse. | `copy.ts`, `config.ts` |
| 9 | Accessibility | **Corrected.** No `<img>` lacks `alt`. 7 of 10 have `alt=""` (decorative), and some of them carry meaning (intro poster, sector photos). Duplicate titles: `K` renders an `sr-only` copy plus an `aria-hidden` animated copy, so screen readers read once, but crawlers and copy/paste get it twice. Product also renders all 4 step `h2`s at once. | `Kinetic.tsx`, `Site.tsx` |
| 10 | 14 videos | **Confirmed.** 2 in Statement, 12 from `AppScreens` (mockup screens across the story + web section, all `line`). Also: 900 ms splash `Loader` before content, full-screen animated `grain` overlay, Lenis. All hurt LCP/INP. | `Site.tsx`, `AppScreens.tsx`, `globals.css` |
| 11 | Mobile | **Confirmed** by structure: 170vh + 380vh sticky sections, hero text over busy UI. | `Site.tsx` |

## 6. Findings not in the audit

| # | Finding | Impact |
|---|---|---|
| A | Background token is `#0b0b0c`, comment calls it "Flexlore Hyper bg-dark". The design system says `bg-dark` is `#111111`. | Brand drift. Fix in tokens. |
| B | Logo is `wordmark-light.png`. The design system has `wordmark-dark-main.svg` (for dark grounds). | Use the real SVG. |
| C | Design system icons are PNG sprite sheets only (`ui-icons.png`), not a usable web set. | Phosphor becomes the set; replace `lucide-react` and hand-drawn icons so we do not mix libraries. |
| D | TR has no URL. Crawlers and shared links only see English; `hreflang` is impossible. | Needs `/tr/` routes (decision below). |
| E | OG image is 526x526, not 1200x630. | New OG images. |
| F | Demo CTA is a HubSpot meetings link for one person, not a form. | Brief asks for a form with validation (decision below). |
| G | `/demo/mikel-coffee/` uses a prospect/customer name on a public (noindex) URL, and the CI health check and the server publish script require it to exist. | Out of redesign scope. I will not touch it, only flag it. |
| H | Footer links to anchors that no longer exist (`/#imagine`, `/#ai`, `/#integrations`). | Fix in footer. |
| I | **Deploy conflict (Part B).** See section 9. | Must be decided before Part B. |

## 7. Brand conflicts between the brief and the design system

| Brief | Design system | My proposal |
|---|---|---|
| `--ink` #F2F2F0 | `ink` dark = #FFFFFF | Use #F2F2F0 for long text (still 16.9:1 on #111111). Small extension; your call. |
| `--line` rgba(255,255,255,.08) | `border` dark = grey-700 #333333 | Brief value for hairlines (softer), #333333 kept for control borders. |
| Display 56 to 96 px | DS type scale is product UI (h1 20 px) | Marketing display scale is outside the DS; it already says "brand display moments use the same family at Bold/ExtraBold". No conflict. |
| Aqua/lilac pastel tints | Support colours carry meaning only | Agree: product visuals and status chips only. |

## 8. Plan

### 8.1 Home page order

| # | Section | Notes |
|---|---|---|
| 1 | Header | Full container width, 64 px, `rgba(17,17,17,.72)` + blur, hairline after 8 px, hides on scroll down after 400 px. No width animation. |
| 2 | Hero | 12-col split: text cols 1 to 6, device frame with product loop cols 7 to 12. Never overlaps. Store badges small under CTAs. Background loop at 15 to 25% behind a #111111 fade, poster in reduced motion. Splash loader removed. |
| 3 | Trust strip | Text-only proof until you confirm marks: App Store live, Google Play live, Product Hunt launch. NVIDIA Inception and Claude for Startups only behind `programBadges` and after you confirm acceptance and usage rules. |
| 4 | Problem | "Know-how lives in someone's hands." Statement left, 3 consequences right. One viewport, no sticky. |
| 5 | How it works (`ScrollStory`) | One sticky section, max 250vh desktop. Step list + progress left, one device right, 4 states crossfade. Mobile: swipe carousel with snap and dots. |
| 6 | Flexlore Web | Large browser frame near full width, 3 callouts in sequence, phone overlapping the corner. Marked "Sample data". |
| 7 | Capabilities bento | 6 tiles, 3 sizes, each with an animated UI fragment (CSS/motion, not video, to stay inside the video budget). |
| 8 | Industries | 3 featured media cards (restaurants, manufacturing, hotels) with loops, 3 compact cards in a row, then the scenario picker (segmented control, animated preview, links to `/see-it/?industry=`). |
| 9 | Proof | Built, but off by default behind `SITE.flags.proof`. Never ships empty. |
| 10 | Pricing preview | **Light section** (#FFFFFF ground, #E6E6E6 cards, ink #333333, orange text #A8491B). Breaks the dark run in the middle of the page. |
| 11 | FAQ | 8 questions, drawn from the existing home and pricing FAQs. Custom accordion (motion, keyboard). |
| 12 | Final CTA | "See it on your floor." / "Twenty minutes. One of your real jobs." One orange area. |
| 13 | Footer | Same grid, 4 columns + legal row, dead anchors fixed, EN/TR. |

Removed from the home page: the "Roadmap: no dates yet" line, the splash `Loader`, the `grain` overlay, Lenis, the separate Intro section (the 2-minute video moves into a modal from the hero "Watch 2-min demo" button).

### 8.2 Components

Create (`components/ui/` and `components/home/`):

| Component | Purpose |
|---|---|
| `tokens.css` (in `globals.css`) | Brief 3.2 palette, type scale, grid, radii, as Tailwind `@theme` tokens |
| `Container`, `Section` | One 12-col container (max 1240 px, gutters 24/16, side padding `clamp(16px,4vw,48px)`), section padding `clamp(80px,12vh,160px)`, `tone="dark" or "light"` |
| `Reveal` | Fade + 20 px rise on view, stagger, initial state applied only after hydration |
| `HeroSequence` | Word reveal, then device settles in |
| `ScrollStory` (+ `StoryCarousel` for mobile) | Section 5 |
| `MagneticButton` | Primary CTA, max 6 px spring, off on touch |
| `CountUp` | Only for numbers you supply |
| `MediaCard` | Hover scale 1.03, caption lift, video on hover/60% visible |
| `SmartVideo` | Replaces `Video` + `AppScreens` video: `preload="none"`, plays at 50% visible, max 2 playing, poster + play button on reduced motion or Save-Data |
| `VideoModal` | 2-minute demo, focus trap, Escape, loads YouTube only on open |
| `PageTransition` | 0.3 s crossfade |
| `BillingToggle` (rewrite) | `layoutId` pill, price crossfade |
| `Accordion` | FAQ |
| `Picture` | `<picture>` with AVIF/WebP 1x/2x from the image script |
| `Icon` | Thin wrapper over Phosphor so the set can be swapped in one place |
| `TrustStrip`, `ProblemSection`, `WebShowcase`, `Bento`, `Industries`, `ScenarioPicker`, `Proof`, `PricingPreview`, `FinalCta` | Home sections |

Change: `Header.tsx`, `Sections.tsx` (Footer, PricingTeaser to PricingPreview), `PriceUI.tsx`, `Pricing.tsx`, `config.ts` (pricing data, flags), `copy.ts` (new strings EN + TR), `AppScreens.tsx` (use SmartVideo, fewer instances), `SectorPage.tsx` and `SeeIt.tsx` (new grid, header, tokens; layout otherwise kept), `app/layout.tsx` (OG, `outputFileTracingRoot`), `globals.css`.

Delete: `Cases.tsx`, `Imagine.tsx`, `Programs.tsx`, `Security.tsx` (unused), `Kinetic.tsx` (replaced by `HeroSequence`/`Reveal`), `HeroMedia.tsx` (replaced), `lenis` and `lucide-react` dependencies.

Not touched: `/demo/mikel-coffee/` and `MikelCoffee.tsx` beyond what shared components force, `ops/`, the deploy workflow.

### 8.3 Scripts and checks

| Script | What |
|---|---|
| `scripts/check-brand.mjs` | Fails the build on `blue-*`, `sky-*`, `indigo-*`, `cyan-*`, blue-cast `slate-*` classes, hex/rgb/hsl values with hue 190 to 260 deg and saturation above 15%, em dashes in copy, and font families other than Schibsted Grotesk. Runs as `prebuild`. |
| `scripts/contrast.mjs` | Prints every token text/background pair with its ratio, fails under 4.5:1 (3:1 for large). |
| `scripts/encode-media.mjs` | ffmpeg: `media-src/` to AV1 WebM + H.264 MP4 (720p cards, 1080p hero), no audio, AVIF/WebP posters. |
| `scripts/images.mjs` | sharp: AVIF + WebP at 1x/2x for every image in `public/`, including blog PNGs. |
| `scripts/budget.mjs` | Reads the build manifest, fails if home JS > 180 kB gzip or hero media > 1.5 MB. |

Lighthouse runs locally against `out/` at each checkpoint (not wired into CI unless you want it).

## 9. Deploy conflict (Part B)

The repo already has an automated deploy that does not match Part B:

| | In the repo today | Part B in the brief |
|---|---|---|
| Trigger | Every push to `main` (and `mikel-coffee`) runs `.github/workflows/deploy-preprod.yml` | Manual, after merge |
| Transport | `ssh flexlore-deploy@host < out.tgz` (forced command, key in GitHub secrets) | `tar` over ssh by me |
| Target | `/var/www/preprod2a4` via `ops/preprod2a4/flexlore-publish` | `/opt/sites/flexlore-preprod/html` (nginx container `flexlore-preprod`) |
| Method | Unpacks to `.new`, **atomic swap** (`renameat2`), deletes the old version | Copy into the existing folder, **never swap** (breaks the bind mount) |

Consequences: merging PR #1 into `main` will start the CI deploy by itself, before any of my manual steps. If the live site is the nginx container on `/opt/sites/flexlore-preprod/html`, the CI job either writes somewhere that is no longer served, or, if `/var/www/preprod2a4` is that bind mount, its swap is exactly what Part B forbids. I have not touched the server; this is from the repo only.

## 10. Open questions

See the CHECKPOINT 1 message. Items marked `TODO(ata)` in code will be listed at CHECKPOINT 3.

## 11. Definition of done tracker

| # | Item | Status |
|---|---|---|
| 1 | Hero readable, no overlap 320 to 1920 px | Open |
| 2 | Header background, blur, never collides | Open |
| 3 | One grid, one left edge | Open |
| 4 | Rhythm, light section, no dead space | Open |
| 5 | Trust strip, roadmap line removed | Open |
| 6 | Pricing fixed | Open |
| 7 | Industries hierarchy | Open |
| 8 | FAQ 6 to 8 | Open |
| 9 | A11y (alt, duplicate text, focus, landmarks) | Open |
| 10 | Video count and budgets | Open |
| 11 | Mobile length and hero | Open |
