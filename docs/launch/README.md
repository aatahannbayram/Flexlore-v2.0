# Launch checklist: new flexlore.com

Branch `feat/trust-turkiye`, checked on 12 November 2026 against the static build (`out/`). Nothing here has been
deployed. Merge, deploy and DNS changes need Ata's approval.

## 1. Done and verified in the repo

| Area | Result | How it was checked |
|---|---|---|
| Pages | 53 pages (sitemap plus noindex pages) return 200, one H1 each, no console errors | Playwright audit over the sitemap |
| Links | No broken internal links | Every `href` on every page resolved against `out/` |
| SEO basics | Every indexable page has a unique title, a unique description (50 to 160 characters), a canonical URL and an `og:image` | Same audit |
| Structured data | Organization (with `sameAs`: LinkedIn, Instagram, YouTube, App Store, Google Play), WebSite, SoftwareApplication, FAQPage, ItemList on the home page | Read from `out/index.html` |
| llms.txt | Generated on every build (`scripts/llms.mjs`) | `out/llms.txt` |
| AI crawlers | Explicit policy in `app/robots.ts`: search and AI assistants may read the public site (FLE-59) | Code |
| Images | Every image has `alt` (empty where decorative) | Audit |
| Tap targets | 44 x 44 px minimum on every page, every language | `tests/responsive.spec.ts` |
| Brand | No blue outside the approved exceptions; contrast checks pass | `tests/no-blue.spec.ts`, `scripts/check-brand.mjs`, `scripts/contrast.mjs` |
| Tests | 487 Playwright tests pass | `npx playwright test` |
| JS budget | Home page 168 kB gzip (budget 180 kB) | `scripts/budget.mjs` after every build |
| Speed (phone, 4x slower CPU) | LCP 0.8 to 1.1 s on home, pricing, features, sector, support and KVKK pages; CLS 0 except features (0.018) | Chrome performance observers, median of 3 loads |

## 2. Launch day, in this order

1. **Turn indexing on:** `components/config.ts`, `SITE.noindex: false`. This changes `robots.txt` and the robots meta on every page. Do this only in the launch build, never on preprod.
2. **Redirects:** load `redirects.json` into the host (nginx, Amplify or CloudFront, whichever is chosen in FLE-144). 23 entries only add the trailing slash. 4 need a decision first (see section 3).
3. **DNS:** lower the TTL a day ahead. Do not touch MX or TXT records (email and domain verification).
4. **Search Console:** submit `https://www.flexlore.com/sitemap.xml`, then check for 404s daily for two weeks.
5. **Framer:** cancel the subscription only after the new site has run for two weeks without problems.

## 3. Open decisions (not done, need an answer)

| Item | Question | Proposal |
|---|---|---|
| `/careers`, `/careers/product-designer-ui-ux`, `/careers/senior-software-engineer` | No careers page on the new site. Are the two roles still open? | Redirect to `/company/`, or add a careers page if the roles are open |
| `/download` | No download page on the new site | Redirect to `/` (store badges are in every footer) |
| Legal drafts | Acceptable use, DPA, sub-processors, security, billing and cookies are marked `draft: true` | Counsel review before launch |
| KVKK page | `TRUST_TR.approved` is `false`: noindex and out of the sitemap | Counsel review |
| Customer pages | Names and descriptors are approved for the carousel; stories, quotes and logos are not | Pages stay noindex until approved (`components/v3/cases.ts`) |
| AI crawlers | `robots.ts` also allows `CCBot` (Common Crawl, used to train models) | Keep, or remove it if training use is not wanted |
| Security headers | CSP, HSTS and similar are set by the server, not the site | Set on the chosen host; nothing on the shared VPS was touched |

## 4. Known and accepted

- Blog posts and legal documents are English only; sector, AI, integrations and use-case pages are English and Turkish.
- On `/features/` the Turkish feature copy arrives a moment after the page shows (CLS 0.018, the good limit is 0.1).
- The home page needs JavaScript for its hero animation; without JS the text still shows.
