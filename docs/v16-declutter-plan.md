# v16 — Home declutter plan

Principle: the home page shows one calm summary per idea. Detail lives on its own page and the home section links to it. No decorative icons: numbers and type do the work. Live items are bright, coming-soon items are muted.

| Home section | v15 problem | v16 on home | Detail moved to |
|---|---|---|---|
| Imagine / Your business | A wall of 12 pills and dense text next to a large video | A single industry dropdown, one image with the scenario line, and 3 numbered steps without icons | All industries: `/sektor/*` (unchanged) |
| AI | Two long lists, 7 icons and many divider lines | Two cards: Today (3 titles) and Coming soon (4 muted titles), no icons | Full AI roadmap with descriptions: `/ai/` |
| Integrations | Five category rows, mostly empty, and an uneven APPS row | 3 equal live cards (iOS, Android, Web) and one muted "Coming soon" line | Full directory by category: `/integrations/` |
| COPQ calculator | Big black void and default browser sliders | One contained card: inputs on the left, results panel on the right, custom thin sliders | Full method and caveats: `/pricing/#cost-of-poor-quality` (calculator kept there too) |
| Proof + Pricing | Two separate sections with weak hierarchy | One section: plans on top, proof links as a small row underneath | Full pricing: `/pricing/` |
| WebApp mockup | Phone overlapping the dashboard, orange glow | Dashboard and phone side by side with no overlap and no glow; phone hidden on small screens | — |
| Hero | Video brightness 1.9 inside the letters made the headline hard to read | Video graded down (brightness 0.95, contrast 0.9) plus a dark veil inside the mask | — |

Kept: full-screen horizontal sector panels, compact 4-card cases, fixed hero layout, blog, /pricing, use-cases, HubSpot "Book a demo", noindex, original logos, and the hidden badge strip.

## Reference: getdesign.md
getdesign.md is a catalogue of DESIGN.md files: design-system briefs for AI coders covering colours, type, spacing and components. Patterns from its dark, editorial entries (Vercel, Tesla, Linear, SpaceX) applied here:
- One accent colour (Flexlore orange) used only for state: live dots, step numbers, the preventable result.
- Surfaces as soft ring cards (white 3–7% fill, 1px white/10 ring, 16px radius) instead of rule lines.
- Display type plus mono kickers; numbers instead of icons.
- Radical subtraction on home: one idea per section, with detail on its own page.
