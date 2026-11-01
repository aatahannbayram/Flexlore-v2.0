"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Video } from "./Site";
import { I } from "./Icons";
import { SITE } from "./config";

type O = { k: string; media: { v?: string; img?: string; alt: string }; job: string; flow: [string, string][] };
export const IMAGINE: O[] = [
 {
  "k": "Restaurants",
  "media": {
   "v": "kitchen",
   "alt": "Cooks working a busy restaurant line"
  },
  "job": "A new line cook has to plate your signature dish exactly like the head chef, during Friday rush.",
  "flow": [
   [
    "Chef films it",
    "The head chef records the plating at the pass, from the cook's side of the counter."
   ],
   [
    "Steps and a quiz",
    "Flexlore cuts it into build order, sauce and garnish, then drafts a quiz on the allergen step."
   ],
   [
    "Cleared for the station",
    "The kitchen manager sees who passed before service starts."
   ]
  ]
 },
 {
  "k": "Manufacturing",
  "media": {
   "v": "line",
   "alt": "Operator at a production line"
  },
  "job": "The changeover on press 2 depends on one senior operator, and that operator is on leave next week.",
  "flow": [
   [
    "Filmed at the machine",
    "The lead operator records lock-out, tooling swap and the check on the opening part."
   ],
   [
    "Approved by engineering",
    "Steps and a safety quiz are reviewed before anyone is assigned."
   ],
   [
    "Shift planned on facts",
    "The supervisor sees who's cleared for which machine, by line and shift."
   ]
  ]
 },
 {
  "k": "Hotels",
  "media": {
   "v": "hotel",
   "alt": "Hotel room being prepared"
  },
  "job": "Seasonal housekeepers arrive the week before opening and need to turn a room to your house standard.",
  "flow": [
   [
    "One perfect room turn",
    "The head housekeeper films it, top to bottom, bathroom to bed."
   ],
   [
    "Short steps, quick check",
    "Each step gets a note; a short quiz confirms the standard landed."
   ],
   [
    "Ready before the guest",
    "The duty manager sees who's ready, by property and shift."
   ]
  ]
 },
 {
  "k": "Franchises",
  "media": {
   "img": "/photos/chef-plating.webp",
   "alt": "A dish being plated with care"
  },
  "job": "A new menu item goes live Monday in every branch, and it has to look the same everywhere.",
  "flow": [
   [
    "Filmed at the flagship",
    "The training team records the build once."
   ],
   [
    "Sent to every branch",
    "Same steps, same quiz, same day."
   ],
   [
    "Compared side by side",
    "Head office sees readiness branch by branch before launch."
   ]
  ]
 },
 {
  "k": "Warehouses",
  "media": {
   "v": "warehouse",
   "alt": "Warehouse aisle with pallets"
  },
  "job": "Peak season brings temporary pickers who need to work safely within days, not weeks.",
  "flow": [
   [
    "Filmed in the aisle",
    "The shift lead records receiving, picking and the equipment pre-use check."
   ],
   [
    "Safety confirmed",
    "A short quiz covers the handling steps before anyone drives a forklift."
   ],
   [
    "Zones staffed by readiness",
    "The lead sees who's ready for which zone and task."
   ]
  ]
 },
 {
  "k": "Bakeries & cafés",
  "media": {
   "v": "steam",
   "alt": "Steam rising from fresh bread"
  },
  "job": "Your early shift has nobody experienced on hand to show how the dough should feel.",
  "flow": [
   [
    "Close up at the bench",
    "The head baker films proofing, shaping and scoring."
   ],
   [
    "One clip per step",
    "Each cue gets its own clip and note, plus a quiz on the ones that matter."
   ],
   [
    "Ready to open",
    "The owner sees who can open which shop, bake and bar."
   ]
  ]
 },
 {
  "k": "Field service & installation",
  "media": {
   "img": "/photos/field.webp",
   "alt": "Technician measuring a metal frame"
  },
  "job": "Your team installs a machine at a customer's site, runs the orientation, and drives away.",
  "flow": [
   [
    "Filmed on the installed unit",
    "The installer records start-up, cleaning and daily checks on that exact machine."
   ],
   [
    "Handed over with the machine",
    "The steps and the quiz are set up for the people who will run it."
   ],
   [
    "Orientation that stays",
    "New shifts learn it the same way months later."
   ]
  ]
 },
 {
  "k": "Healthcare & clinics",
  "media": {
   "img": "/photos/health.webp",
   "alt": "Clinical team reviewing notes together"
  },
  "job": "A new assistant has to prepare a treatment room exactly the way your clinic's protocol says.",
  "flow": [
   [
    "Filmed by your senior staff",
    "Room prep and instrument handling, as your team really does it."
   ],
   [
    "Critical steps, checked",
    "Steps follow your protocol; a quiz confirms the ones that can't be skipped."
   ],
   [
    "Ready before working alone",
    "The clinic manager sees who has passed, by role and location."
   ]
  ]
 },
 {
  "k": "Retail",
  "media": {
   "img": "/photos/office.webp",
   "alt": "A team at work in a bright space"
  },
  "job": "A new associate starts the weekend of a promotion and needs the display, the till and returns down cold.",
  "flow": [
   [
    "Filmed on the shop floor",
    "The store lead records the display set-up and the returns process."
   ],
   [
    "Same standard, every store",
    "Steps and a quiz go out to every location at once."
   ],
   [
    "Ready for the weekend",
    "The area manager sees readiness, store by store."
   ]
  ]
 },
 {
  "k": "Construction",
  "media": {
   "img": "/photos/after-install.webp",
   "alt": "Site office with jackets and an orange hard hat"
  },
  "job": "A new crew joins mid-project and has to run the pre-start check the way your site does it.",
  "flow": [
   [
    "Filmed on site",
    "The foreman records the pre-start check and the task itself."
   ],
   [
    "Safety steps, confirmed",
    "A quiz covers the critical steps before work starts."
   ],
   [
    "Cleared by task",
    "The site manager sees who's cleared for which task, by crew."
   ]
  ]
 },
 {
  "k": "Auto service",
  "media": {
   "img": "/photos/operators.webp",
   "alt": "Two technicians working side by side"
  },
  "job": "A junior technician is about to service a model they've never worked on.",
  "flow": [
   [
    "Filmed in the bay",
    "The master technician records the job from the technician's side of the car."
   ],
   [
    "Every check in order",
    "Steps carry the checks and notes; a quiz confirms the order."
   ],
   [
    "Signed off by job",
    "The service manager sees who's ready for which job."
   ]
  ]
 },
 {
  "k": "My business is different",
  "media": {
   "img": "/photos/factory.webp",
   "alt": "Factory floor"
  },
  "job": "If someone on your team does it more than once, it can be filmed, stepped and checked.",
  "flow": [
   [
    "Film it",
    "Whoever does it well records it on a phone."
   ],
   [
    "Approve it",
    "Flexlore drafts the steps and a quiz. You edit and approve."
   ],
   [
    "Assign it",
    "Send it to the team and see who's ready."
   ]
  ]
 }
];

export default function Imagine() {
  const [a, setA] = useState(0);
  const o = IMAGINE[a];
  return (
    <section id="imagine" className="px-6 py-24 md:px-10 md:py-32" aria-labelledby="imagine-h">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">Imagine it in your business</p>
        <h2 id="imagine-h" className="display mt-4 max-w-[16ch] text-[clamp(2.8rem,6.4vw,6.4rem)]">Pick your work. See it in Flexlore.</h2>
        <p className="mt-4 max-w-xl text-lg leading-[1.4] text-white/65">Choose your industry. Don't see yours? Pick My business is different. Same idea everywhere: one job, filmed from the doer's side, cut into steps, checked with a quiz.</p>
        <div role="tablist" aria-label="Choose your industry" className="no-sb -mx-6 mt-10 flex gap-x-1 gap-y-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0">
          {IMAGINE.map((x, i) => (
            <button key={x.k} role="tab" aria-selected={a === i} aria-controls="imagine-panel" onClick={() => setA(i)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition ${a === i ? "border-white bg-white text-black" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"} ${i === IMAGINE.length - 1 ? "border-dashed" : ""}`}>{x.k}</button>))}
        </div>
        <div id="imagine-panel" role="tabpanel" className="mt-8 grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 md:col-span-7 md:aspect-auto md:min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div key={o.k} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
                {o.media.v ? <Video name={o.media.v} /> : <img src={o.media.img} alt={o.media.alt} loading="lazy" className="grade absolute inset-0 h-full w-full object-cover" />}
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[.18em] text-white/70"><I.eye size={16} /> Example scenario · {o.k}</p>
              <p className="mt-2 max-w-[30ch] text-[clamp(1.3rem,2.2vw,2rem)] font-semibold leading-[1.15] tracking-tight">{o.job}</p>
            </div>
          </div>
          <div className="flex flex-col md:col-span-5">
            <ol className="border-t border-white/15">
              {o.flow.map((f, i) => (
                <motion.li key={o.k + i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i, duration: 0.5 }} className="grid grid-cols-[2.5rem_1fr] items-start gap-2 border-b border-white/15 py-5">
                  <span className="text-white/80">{i === 0 ? <I.record /> : i === 1 ? <I.split /> : <I.ready />}</span>
                  <span><span className="block text-[17px] font-semibold tracking-tight">{f[0]}</span><span className="mt-1 block text-[15px] leading-[1.4] text-white/65">{f[1]}</span></span>
                </motion.li>))}
            </ol>
            <p className="mono mt-4 text-[10px] uppercase tracking-[.16em] text-white/35">Example scenario. Roles, machines and dishes are illustrative.</p>
            <div className="mt-auto pt-8"><a href={SITE.demo} className="btn-p">Book a demo →</a><p className="mt-2 text-[13px] text-white/50">Bring one of your real jobs. We'll build it with you.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
