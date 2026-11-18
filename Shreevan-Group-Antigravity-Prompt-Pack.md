# Shreevan Group — Antigravity Prompt Pack (Gemini 3.8 Flash)

Concept: **MOLECULE TO MANIFEST** · Next.js 15 App Router · TypeScript strict · Tailwind v4 · Framer Motion (`motion`) · GSAP + ScrollTrigger · Lenis · React Three Fiber · React Bits

---

## How to run this pack

1. Create an empty folder, e.g. `C:\Users\rebel\Projects\shreevan-group`, and open it in Antigravity as the workspace.
2. Put these files in the workspace before Round 0:
   - `assets/logo.svg` (or `.png`): the Shreevan logo
   - `assets/shreevan-catalogue.json`: copy it from your `Shreevan Group` folder
   - `assets/docs/`: any real document samples you have (COA, COPP, GMP certificate, with sensitive numbers blurred if needed)
3. Select **Gemini 3.8 Flash** and use **Planning** mode. For every round, read the Implementation Plan it produces, then approve. Don't let it skip the verification step at the end of each round.
4. Run rounds in order. Start a **new conversation per round** so Flash keeps a clean context. Every round starts with "Read AGENTS.md first", and that file carries all the rules.
5. If a round's result is weak (especially Round 3, the 3D hero), reject it and run the same round again. Don't patch a bad result.
6. Before launch, fill `src/config/company.ts` with real values. Empty fields hide themselves on the site.

---

## ROUND 0 — Workspace, skills, project constitution

```
You are setting up the workspace for the SHREEVAN GROUP corporate website. Work step by step and verify each step in the terminal.

STEP 1 — Scaffold
- Run: npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack
- Install: npm i motion gsap @gsap/react lenis three @react-three/fiber @react-three/drei @react-three/postprocessing zustand zod clsx tailwind-merge lucide-react
- Install dev: npm i -D @types/three prettier prettier-plugin-tailwindcss
- tsconfig: "strict": true, "noUncheckedIndexedAccess": true. ESLint rules: "@typescript-eslint/no-explicit-any": "error", "no-console": "error".

STEP 2 — Install design skills for Antigravity (workspace scope, into .agents/skills)
Run each and confirm the folder appears under .agents/skills:
  npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend" -a antigravity -y
  npx skills add https://github.com/pbakaus/impeccable --skill impeccable -a antigravity -y
  npx skills add elayadesign/ai-design-skills --skill landing-page-design -a antigravity -y
  npx skills add Jakubantalik/transitions.dev -a antigravity -y
  npx transitions-dev add --free
If an install fails, clone the repo into a temp folder and copy the skill folder (the one containing SKILL.md) into .agents/skills/<skill-name>/ manually. Then list .agents/skills and read every SKILL.md once.

STEP 3 — Assets
- Move assets/logo.* to public/brand/ and create an optimized SVG version if the source is PNG (trace only if clean; otherwise keep a 2x PNG).
- Extract the logo's dominant brand colour(s) and report the hex values.
- Copy assets/shreevan-catalogue.json to src/data/catalogue.json.

STEP 4 — Write AGENTS.md at the workspace root (and an identical GEMINI.md). This is the project constitution every later round reads first. Write it in full with these sections:

# Shreevan Group — Project Constitution

## Company
Shreevan Group is a young (founded 2–3 years ago) Indian pharmaceutical merchant exporter supplying formulations (tablets, capsules, softgels, oral liquids, dry syrups, injections, topicals) and Ayurveda products, sourced from licensed GMP-certified manufacturing partners, to importers, distributors, hospitals, NGOs and tender buyers in Africa, CIS, South-East Asia, Latin America and the Middle East.

## Creative concept: MOLECULE TO MANIFEST
The site is the journey of one export batch told as an interactive dossier. Award-level (Awwwards SOTD bar), not an ordinary scrolling site.
Signature systems:
1. 3D BLISTER → GLOBE hero (R3F): tablets press out of a foil blister pack, arc through the air and land as nodes on a paper-textured globe at real markets.
2. CHAPTERS: the home page is six pinned full-viewport chapters (Formulation, Portfolio, Quality, Documentation, Shipment, Your Brand). Each new chapter slides over the previous like a sheet placed on a desk.
3. BATCH TICKET: fixed perforated ticket `SG / {foundedYear} / CH-0n` = progress indicator + chapter menu.
4. DOSSIER STACK: fixed paper pile; finishing a chapter drops a real export document onto it (Product list, COA, GMP certificate, COPP, Invoice & packing list, Certificate of Origin). Clicking fans them out with explanations.
5. STAMP TRANSITION between routes: ink seal "SHREEVAN GROUP · EXPORT DESK · CLEARED" presses, bleeds, lifts.
6. FORMULARY: catalogue as a periodic-table grid of formulation tiles; tile morphs into a technical data sheet; table view toggle for procurement.
7. SEALED ENVELOPE: RFQ form folds into an envelope, wax-sealed with the logo mark, returns a reference number.
8. LOUPE cursor on data sheets only.

## Honesty rules (non-negotiable)
- Never invent numbers, years, clients, testimonials, awards, certificate numbers or country counts. Every fact comes from src/config/company.ts or is computed from src/data/catalogue.json.
- Every displayed fact carries an "as of {date}" footnote.
- Components whose fact is empty render nothing (no placeholder, no "coming soon").
- Never display partner brand names (catalogue.sourceBrandRef), prices, MRP or GST.
- Never list products whose `flags` are non-empty in the Allopathic segment.
- Ayurveda products: names and dosage forms only, no disease or cure claims.
- Banned copy words: leading, world-class, cutting-edge, revolutionary, seamless, trusted by, best-in-class, #1.

## Stack
Next.js 15 App Router, React 19, TypeScript strict, no `any`, no console.log (errors surface in UI or a typed logger). Tailwind v4 tokens in globals.css @theme. motion (Framer Motion), GSAP + ScrollTrigger + @gsap/react, Lenis, three + @react-three/fiber + drei, zustand, zod. Fonts via next/font: Fraunces (display), Instrument Sans (text), JetBrains Mono (data), Noto Sans Devanagari (fallback).

## Design tokens
--paper #F7F6F2 · --porcelain #FFFFFF · --mist #EEF1F0 · --rule #D9DDDA · --ink #0F1B24 · --ink-2 #33424D · --ink-3 #5E6B74 · --accent-700 / --accent-500 / --accent-100 from the logo colour (700 must pass AA on paper) · --signal #B4532A (warnings only) · --ink-stamp (deep version of accent for the stamp/seal).
Type: display 56→112px Fraunces 300 -0.02em; h1 44→72; h2 32→48; body 17/1.65 Instrument Sans; caps labels 12px 0.14em; data 14px JetBrains Mono.
Layout: 8px base, 12-col 1320px grid, 128px section padding desktop / 80px mobile, asymmetric editorial splits.
Shape: 2px radius on controls, 0 on images/panels. Paper grain overlay 1.5%.
Accent restraint: hairlines, icon strokes, caps labels, link underlines, ONE filled button style (primary CTA).
Forbidden: gradients, glassmorphism, glow, neon, purple, emoji, icon-in-circle grids, identical card rows, centered-everything heroes, pill badges, fake stats, stock handshake photos.

## Motion ownership
GSAP: scroll timelines, pinning, SVG drawing. R3F: 3D, driven by the shared journey store (never its own scroll listener). Framer Motion: mount/exit, layout, hover, shared elements. CSS: colour and underline. Never animate one property from two libraries. Everything honours prefers-reduced-motion with a complete static version.

## Component sources (restyle everything to tokens)
React Bits (SplitText, CountUp, ScrollVelocity, Magnet): install via `npx shadcn@latest add https://reactbits.dev/r/<Name>-TS-TW`, hand-build if the registry fails.
Vengeance UI (`npx shadcn@latest add @vengeanceui/<name>`): morph-text for chapter titles; logo-slider only with ≥4 real partner/membership logos.
Skiper UI free components and transitions.dev transitions where they upgrade a transition.
navbar.gallery, cta.gallery, supahero.io: pattern study only, never copy.
Animmaster: only if /vendor/animmaster exists.

## Quality floor
Semantic HTML, keyboard + focus-visible on everything, alt text, next/image with sizes, LCP < 2.5s, CLS < 0.05, INP < 200ms, WCAG 2.2 AA, verified at 360/768/1280/1440.

## Verification (every round)
1. npm run lint && npm run build: zero errors.
2. Start dev server, open the changed routes in the browser at 1440×900 and 390×844, take screenshots, check console for errors.
3. Compare against this constitution and the taste-skill + impeccable rules; fix and re-verify (max 3 loops).
4. Report: files changed, screenshots, anything that needs real client data.

STEP 5 — Verify: lint + build pass, AGENTS.md exists, skills listed, logo colours reported.
```

---

## ROUND 1 — Design system, verifiable-facts config, style guide

```
Read AGENTS.md first and follow it strictly.

1. src/app/globals.css: implement every token from AGENTS.md in Tailwind v4 @theme, using the logo colours reported in Round 0 for --accent-700/500/100 and --ink-stamp. Check contrast of every text token against its background and adjust the accent lightness until AA passes. Add the paper-grain overlay (inline SVG feTurbulence, 1.5% opacity, fixed, pointer-events none).
2. src/app/layout.tsx: next/font setup for Fraunces (opsz axis, 300–600), Instrument Sans, JetBrains Mono, Noto Sans Devanagari. Metadata base, lang="en".
3. src/config/company.ts: zod schema + exported `company` object, all values empty by default:
   legalName, tradeName ("Shreevan Group"), entityType, foundedYear (number | null), cin, gstin, iec, rcmcNumber, drugLicenceNumbers[], registeredAddress, operationsAddress, phone, whatsapp, email, exportDeskEmail, story[] (paragraphs), qualityPolicy, facts[{label, value, unit, asOf, source}], manufacturingPartners[{name, city, certifications[], verifiedUrl}], certificationsHeld[{name, issuer, number, validTill, documentUrl}], marketsServed[{country, iso2}], memberships[{name, logo}], directors[{name, role, photo, linkedinUrl}], groupEntities[{name, role, url}], lastUpdated.
   Export helpers: hasValue(), <IfFact when={...}> wrapper, and getFacts() that returns only facts with value and asOf.
4. src/lib/catalogue.ts: zod-validated loader for src/data/catalogue.json. Type Product = { id: string; generic: string; dosageForm: string; category: string; packs: string[]; flags: string[]; segment: "Allopathic" | "Ayurveda"; sourceBrandRef: string }. Export getPublicProducts() (excludes Allopathic items with flags), getCategories() with counts, getDosageForms() with counts, getProduct(id), and moleculeCode(generic) (2-letter periodic-style code, e.g. Azithromycin → "Az", collisions resolved deterministically).
5. UI primitives in src/components/ui: Button (primary filled, secondary outline, text link), Input, Select, Textarea, Checkbox, SectionLabel (numbered caps label + double rule), RuledTable, Footnote, Ticket (perforated SVG mask container), Sheet (paper sheet with shadow levels 1–3).
6. /style-guide route: shows all tokens, type scale, primitives in all states (hover, focus, active, disabled, error), and the heritage devices.

Verify per AGENTS.md.
```

---

## ROUND 2 — Journey engine: chapters, batch ticket, dossier stack, stamp transition

```
Read AGENTS.md first and follow it strictly. This round builds the interaction engine; no final home content yet (use the style-guide page plus a temporary /lab route to demo).

1. src/components/motion/SmoothScroll.tsx: Lenis (duration 1.2, easeOutExpo) driven by gsap.ticker, ScrollTrigger.update on Lenis scroll. Off under reduced motion. Expose useLenis() for programmatic scrolling.
2. src/components/motion/MotionProvider.tsx: MotionConfig reducedMotion="user", default transition { duration: 0.7, ease: [0.22, 1, 0.36, 1] }.
3. src/lib/journey.ts (zustand): { chapter: number; chapterProgress: number; heroProgress: number; docsCollected: DocId[]; collect(doc): void; setChapter(n): void }. DocId = "product-list" | "coa" | "gmp" | "copp" | "invoice" | "origin". Persist docsCollected in sessionStorage inside try/catch.
4. <Chapter index id title docId> (src/components/journey/Chapter.tsx): full-viewport scene, ScrollTrigger pin on desktop (≥1024px) with scrub; children receive a timeline via render prop or context. On timeline complete → collect(docId), setChapter(index).
   Between chapters: the outgoing scene rotates X 4deg, scales to 0.94, darkens shadow; the incoming scene translates from 100vh to 0 like a sheet placed on a desk. Mobile/tablet: no pin, stacked sheets with sticky chapter header, collection on 60% intersection.
5. <BatchTicket> (fixed top-right below header): perforated ticket, mono `SG / {company.foundedYear ?? current year} / CH-0{n}` with per-digit roll animation, chapter title beneath. Click opens a chapter index popover (keyboard accessible) that scrolls via Lenis.
6. <DossierStack> (fixed right edge desktop, bottom-right mini on mobile): collected docs as 120×156 paper sheets with seeded rotation ±3deg, title, faux text lines, small ink stamp. New sheet: spring drop (stiffness 260, damping 22). Counter "n/6 documents". Click → full-screen fan-out overlay using shared layoutId; each sheet expands to its explanation (what the document is, who issues it, when an importer needs it). If a real sample image exists in public/docs/<docId>.jpg, show it blurred-to-sharp. Esc closes, focus trap, aria-modal.
7. Stamp route transition: src/app/template.tsx + <Stamp>. Circular SVG seal (logo mark centre, ring text on a textPath "SHREEVAN GROUP · EXPORT DESK · CLEARED ·"), press scale 1.4→1 with ease [0.7,0,0.84,0], ink bleed via animated feTurbulence + feDisplacementMap for 200ms, then seal and an --ink-stamp overlay lift away. Total ≤ 600ms, interruptible, skipped on first load. Reduced motion: 150ms crossfade.
8. Micro-primitives: SplitHeading (React Bits SplitText behaviour, line mask reveal), FactRoll (CountUp behaviour, only real values, always with Footnote "as of"), ImageCurtain, MagneticButton (primary CTA only, pointer:fine), LinkUnderline, Loupe (circular magnifier that follows the pointer over a target element, 2× zoom via CSS transform on a cloned layer; disabled on touch).
9. /lab route demonstrating three dummy chapters with all of the above working together.

Verify per AGENTS.md, plus: record that scroll scrubbing stays smooth (no long tasks > 50ms in the Performance panel while scrolling).
```

---

## ROUND 3 — 3D hero: Blister → Globe

```
Read AGENTS.md first and follow it strictly. Build src/components/three/BlisterGlobe.tsx and its fallback. This is the signature moment of the site; quality matters more than speed.

SCENE
- Single <Canvas> (dynamic import, ssr:false), dpr [1, 1.75], gl { antialias: true, powerPreference: "high-performance" }, camera fov 30.
- Lighting: drei <Environment preset="studio" />, one key directional light with soft shadows, <ContactShadows opacity 0.35 blur 2.6>. Background transparent over --paper.
- Blister pack (procedural, no external model): foil card = RoundedBox 3.2×1.6×0.03, MeshPhysicalMaterial (color #D8DCDD, metalness 0.9, roughness 0.32, with a subtle procedural brushed normal or noise roughnessMap). Ten cavity domes in a 5×2 grid: MeshPhysicalMaterial transmission 0.9, thickness 0.2, roughness 0.15, clearcoat 1. Tablets inside: capsule or flattened cylinder geometry, porcelain white with slight roughness, a tiny embossed score line.
- Printed foil text on the back face via drei <Text> in Instrument Sans: "SHREEVAN GROUP · EXPORT BATCH".
- Globe: sphere radius 1.4 behind the pack, material with a paper-grain canvas texture and hairline meridians/parallels drawn as <Line> segments in --rule; India marked with an --accent-500 node.

CHOREOGRAPHY (driven by journey.heroProgress, set by a GSAP ScrollTrigger on the hero section, scrub 1)
- Idle (progress 0): pack floats (drei <Float speed 1.2 floatIntensity 0.4>), tilts toward the pointer (max 8deg, damped lerp 0.08).
- 0.00–0.45: tablets press out sequentially (stagger 0.035): dome compresses on Z, tablet pops forward with a small spin, foil behind it shows a torn opening.
- 0.30–0.75: each tablet travels on a cubic bezier arc to the globe; the pack recedes and fades to 0.2 opacity; the globe scales in and rotates so India faces the camera, then turns slowly as tablets land.
- 0.65–1.00: each tablet lands, shrinks into a glowing node at its target, and a thin arc connects India to it. Targets = company.marketsServed (lat/long from a small ISO2 centroid table in src/lib/geo.ts). If marketsServed is empty, targets are five region centroids labelled AFRICA, CIS, SOUTH-EAST ASIA, LATIN AMERICA, MIDDLE EAST (labels via drei <Html> in caps style, and the hero footnote reads "Regions we are developing").
- If there are more than 10 markets, extra nodes fade in without tablets.

PERFORMANCE & FALLBACK
- frameloop "demand" when the hero is off-screen (IntersectionObserver), invalidate on store change.
- No postprocessing below 1024px. Max 1 shadow-casting light.
- Static fallback component <BlisterGlobePoster>: an SVG illustration of the pack and meridian globe with the same nodes, used when prefers-reduced-motion, navigator.hardwareConcurrency <= 4, WebGL unavailable, or before the Canvas is ready (Suspense fallback). No layout shift between poster and canvas.
- Target: 60fps on a mid-range laptop, ≥ 40fps on a mid-range Android; JS for the 3D chunk loaded after LCP.

Demo it on /lab with a scroll track. Verify per AGENTS.md, plus capture 4 screenshots at progress 0, 0.3, 0.6, 1.0.
```

---

## ROUND 4 — Global chrome: header, mega menu, footer

```
Read AGENTS.md first and follow it strictly. Study 3–4 restrained corporate navbars on navbar.gallery for patterns (do not copy).

HEADER (src/components/chrome/Header.tsx)
- 76px, --paper, 1px --rule border after 8px scroll, hides on scroll down / returns on scroll up (Framer Motion 240ms). The BatchTicket sits just below it on the right on the home page only.
- Left: logo. Nav: Formulary · Export Services · Quality & Compliance · Private Label · About · Contact. Right: "Documents" text link (→ /quality#documents) and the one primary button "Request a Quotation" (→ /contact?type=rfq).
- Formulary mega panel: left column therapeutic areas with live counts from getCategories(); right column dosage forms with counts; footer line "Can't find a molecule? We source on request." → /contact?type=sourcing. Export Services panel: Incoterms, documentation, tenders, shipping modes.
- Panels open on hover-intent (120ms delay) and on Enter/Space/ArrowDown; Esc closes; roving focus; height + opacity 320ms.
- Mobile (<1024px): full-screen paper sheet that slides up like a document; links in Fraunces 36px numbered 01–06, staggered; focus trap; Lenis stopped while open.

FOOTER (src/components/chrome/Footer.tsx), styled like the colophon of an annual report
- Top: large Fraunces line "Every shipment leaves with its paperwork." + secondary CTA "Talk to the export desk" (mailto/WhatsApp plain <a> from config).
- Columns: Formulary · Company · Compliance (Quality policy, Documentation, Pharmacovigilance & complaints, Anti-counterfeit) · Contact (each line wrapped in IfFact).
- Registry strip (mono, ruled): Legal name · Est. year · CIN · GSTIN · IEC · RCMC (Pharmexcil) · Drug licence no(s), each only if present; whole strip hidden if all empty.
- Bottom: © {foundedYear}–{current year} {legalName || tradeName} · Privacy · Terms · Disclaimer.
- Standing disclaimer: "Product information on this site is intended for healthcare and trade professionals. Availability and registration status vary by country. Products are supplied only to licensed importers in accordance with the regulations of the destination country."

Verify per AGENTS.md, plus an axe accessibility scan of header and footer with zero violations, and a keyboard-only walkthrough of both mega menus.
```

---

## ROUND 5 — The Formulary (catalogue)

```
Read AGENTS.md first and follow it strictly. Use src/lib/catalogue.ts (public products only).

/formulary (index)
- Hero: caps label "THE FORMULARY", SplitHeading "Formulations, by molecule.", subline computed: `${publicCount} formulations across ${categoryCount} therapeutic areas` with Footnote "as of {company.lastUpdated || build date}".
- Default view GRID ("periodic table"): tiles grouped by therapeutic area with an area header row. Tile (square, ruled border): large mono molecule code (moleculeCode), generic name (2 lines max, strengths unbroken), dosage form caps label, pack count. Hover: tile lifts 4px, accent hairline top, and an SVG molecule line drawing (simple stylised ring/chain generated from the code, deterministic) draws in.
- Click a tile: shared-element morph (layoutId) into the data sheet, opened as an intercepting route modal (/formulary/item/[id] via @modal parallel route); direct visit renders the full page.
- Toggle "Table view": ruled procurement table (Composition · Dosage form · Packs · Add to enquiry), th scope, caption, row hover --mist + accent left hairline.
- Filters: therapeutic area, dosage form, segment (Allopathic / Ayurveda), search (debounced 150ms, accent- and case-insensitive over generic + category). URL-synced (?area=&form=&seg=&q=&view=). Filter changes animate with FLIP (Framer Motion layout, 280ms). Works without JS via query-string links.
- Empty state: "Not in the published list. We can source it." → /contact?type=sourcing&q=...

/formulary/[category]: same views pre-filtered + 2-sentence factual intro (no claims).

/formulary/item/[id] — TECHNICAL DATA SHEET
- Styled like a printed spec sheet: header with molecule code, generic composition (strength numbers in mono), dosage form, packs, segment.
- "Documents available on request" list: COA, Product specification, Stability data summary, COPP (where applicable), Free Sale Certificate (where applicable), CTD/ACTD dossier (where available), with note "Availability depends on product and destination country."
- Loupe cursor active over the composition block.
- Actions: primary "Request quotation for this product", secondary "Add to enquiry".
- Ayurveda items: no claims, show "Traditional AYUSH formulation. Classification depends on the destination country."

ENQUIRY BASKET: right drawer (transitions.dev drawer pattern or Framer Motion 360ms) with selected products, quantity + unit (boxes / units / per container), destination country; "Continue to quotation" pre-fills /contact. Persist in localStorage inside try/catch. Badge on header CTA shows count.

SEO: generateStaticParams for categories and items; Product JSON-LD with name, category, brand = tradeName (no Drug schema, no claims).

Verify per AGENTS.md, plus test: filter combinations, search "cefixime", grid→sheet morph, back navigation restores scroll and filters.
```

---

## ROUND 6 — Home: six chapters

```
Read AGENTS.md first and follow it strictly. Build "/" with the Round 2 engine and Round 3 BlisterGlobe. Study 3 story-driven heroes on supahero.io and 2 typographic CTAs on cta.gallery for pattern ideas only.

CH-01 FORMULATION (hero, docId "product-list")
- BlisterGlobe full-viewport. Overlay left 5/12: caps label "PHARMACEUTICAL EXPORTS · INDIA" + " · EST. {foundedYear}" if set; SplitHeading "Medicines made in India, documented for the world."; subline "Quality-assured formulations and Ayurveda, supplied with the paperwork your regulator asks for."; MagneticButton "Request a Quotation"; LinkUnderline "Open the formulary →".
- Bottom fact rail: FactRoll for computed formulation count + each getFacts() item, each with Footnote. Rail reflows when facts are missing.

CH-02 PORTFOLIO (docId "coa" — collected here because the buyer has now seen what we supply)
- Horizontal "specimen drawer": one tall column per therapeutic area, translated sideways by scrubbed scroll. Column: area name vertical (writing-mode vertical-rl, Fraunces 120px), live count, 4 sample generic names in mono, link to /formulary/[category]. Hover widens the column (flex-grow) and draws a molecule line illustration.

CH-03 QUALITY (docId "gmp")
- A large Certificate of Analysis sheet centred (built in HTML as a realistic but clearly labelled "Sample COA layout"). As scroll progresses, a loupe glides over fields (Batch no., Mfg/Exp date, Assay, Dissolution, Microbial limits) and callout lines draw to plain-language explanations.
- Statement "We only supply what we can document." + 3 commitments: batch-wise COA with every shipment; destination-appropriate packing and labelling; complaint and recall procedure on file.
- Partner + certification register from config (hidden if empty).

CH-04 DOCUMENTATION (docId "copp")
- Six document sheets start as a scattered pile (random seeded rotations/positions, like papers thrown on a desk) and, with scroll, align into a ruled 3×2 grid. Each: document name, issuer, when it's needed (Commercial invoice & packing list, Certificate of Origin, COA per batch, COPP in WHO format, Free Sale Certificate, Manufacturer GMP certificate).

CH-05 SHIPMENT (docId "invoice")
- SVG route: Indian port → destination regions/markets from config. A dotted path draws; a small container glyph rides it; stops along the path explain EXW, FOB, CIF, CIP in one line each. Market labels only from config.

CH-06 YOUR BRAND (docId "origin")
- Private label: an unfolded carton net (SVG) folds into a box with CSS 3D transforms on scroll; label zones light up (destination language, pack size, artwork, dossier support).
- Closing CTA band: Fraunces "Send us your tender list." + primary button → /contact?type=tender. When this chapter completes, the dossier stack is full: it pulses once and shows "Dossier complete. Ready when you are."

Rules: one clear idea and one interaction per chapter; all text readable without animation; full journey usable by keyboard via the batch ticket index; at 390px chapters become stacked sheets.

Verify per AGENTS.md, plus a screen recording or screenshot sequence of a full scroll-through on desktop and mobile.
```

---

## ROUND 7 — Content pages: Export Services, Quality, Private Label, About

```
Read AGENTS.md first and follow it strictly. Tone: a regulatory-affairs lead explaining process to a foreign importer. Short sentences, concrete nouns, no claims. Each page opens with a numbered caps label, SplitHeading and an asymmetric editorial layout; each page has one signature interaction listed below. BreadcrumbList JSON-LD on all.

/export-services — interaction: documentation rows expand (layout animation) and the matching mini document sheet slides in beside the row.
- Who we supply (importers & distributors, hospital groups, NGOs & aid agencies, government & tenders); Incoterms ruled table (EXW, FOB, CIF, CIP, one line each); shipping modes (air, sea, courier for samples); documentation table with "When it's needed" column; tender support block "We respond to tenders with the documents asked for, in the format asked for."

/quality (#documents anchor) — interaction: certificate register rows open the real document (from documentUrl) in a paper-sheet viewer with the Loupe.
- Quality policy (company.qualityPolicy or a neutral statement about sourcing only from licensed GMP-certified partners); manufacturing partner register; certification register; pharmacovigilance & complaints (how to report, acknowledgement within 2 business days, link to /contact?type=complaint); anti-counterfeit (verify batch + invoice with the export desk); Ayurveda note (AYUSH traditional formulations, no therapeutic claims, destination classification is the buyer's responsibility).

/private-label — interaction: interactive carton: hovering each label zone on the SVG carton shows what can be adapted.
- What's included, MOQ note ("MOQs depend on product and pack; ask us"), artwork & language adaptation, timeline stages (no day counts unless in config).

/about — interaction: a "registry card" that flips (3D CSS) from the front (name, Est. year, city) to the back (all registry numbers from config).
- Opening "An export house built on paperwork that holds up." Story from company.story; if empty, a neutral 3-paragraph description of what the company does (no dates, no numbers, no origin myth). Leadership from directors (hidden if empty). Group entities list if present.

Legal: /privacy, /terms, /disclaimer with 62ch measure and last-updated date from config.

Verify per AGENTS.md, plus grep the built pages for any banned word from AGENTS.md.
```

---

## ROUND 8 — Contact / RFQ with sealed-envelope submit

```
Read AGENTS.md first and follow it strictly.

/contact — multi-step RFQ on one page
- ?type= rfq | sourcing | tender | partnership | complaint preselects the enquiry type (segmented control).
- Step 1 Who you are: company, country (searchable select with ISO list), name, role, business email (soft warning for free-mail domains, never block), phone with country code.
- Step 2 What you need: products from the enquiry basket (editable quantities/units), free-text molecule list, file upload (PDF/XLSX/CSV, ≤10 MB, validated client-side).
- Step 3 Terms: Incoterm, destination port, target delivery month, import licence holder (yes/no), registration status in destination (registered / need dossier / not sure).
- Review step: shows everything as a printed "Request for Quotation" document.
- Step transitions: 24px slide + fade 260ms, focus moves to step heading, progress shown as ticket stubs being torn off.
- Side panel: export desk contacts as plain <a href="tel:">, <a href="mailto:">, <a href="https://wa.me/...">.

SUBMIT ANIMATION "Sealed envelope"
- On submit: the RFQ document folds into thirds (CSS 3D), slides into an envelope (SVG), the flap closes, a wax seal with the logo mark presses on (scale + slight squash + drip edge), then the envelope slides out. The success view shows the reference number in mono and "Our export desk will reply within 2 business days."
- Reduced motion: direct success view.

API
- POST /api/enquiry (Route Handler, runtime nodejs): zod validation with field-level errors, honeypot field, in-memory IP rate limit (5/10min), returns { ok: true, reference: "SG-YYMMDD-XXXX" }.
- If RESEND_API_KEY and ENQUIRY_TO_EMAIL env vars exist, send a formatted email via the Resend REST API (fetch, no SDK) including attachments; otherwise return ok and keep the payload out of logs. Typed error handling, no console.log.
- Add .env.example with RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL.

Verify per AGENTS.md, plus submit valid and invalid payloads via the browser and via curl; keyboard-complete the whole form; test at 390px.
```

---

## ROUND 9 — Skills pass: impeccable + taste-skill + transitions

```
Read AGENTS.md first. Use the installed skills in .agents/skills.

1. Run impeccable setup (init/teach) for this project: lane = brand, audience = international pharma importers, tender officers and distributors, voice = precise, regulatory-literate, calm, anti-references = SaaS landing pages, crypto sites, glassmorphism, fake stats. Write PRODUCT.md and DESIGN.md from the existing tokens (do not change tokens).
2. Run impeccable audit on every route. Then polish on /, /formulary, /formulary/item/[id], /contact. Apply "bolder" only where a chapter feels timid; keep every signature system from AGENTS.md.
3. Run the design-taste-frontend checker across 360, 768, 1280, 1440 and fix everything it flags (up to three fix rounds).
4. transitions.dev: replace hand-rolled versions where the library's is better for: mega-menu open/close, enquiry drawer, form step change, dossier sheet arrival, success check, invalid-field shake. Keep reduced-motion behaviour.
5. Component review: confirm React Bits / Vengeance / Skiper usages follow AGENTS.md; remove any component that adds an effect without adding meaning.
6. Report changes grouped by route with before/after screenshots.

Verify per AGENTS.md.
```

---

## ROUND 10 — SEO, performance, accessibility, deploy

```
Read AGENTS.md first. Hardening round: change nothing about the concept or brand; make it faster, cleaner and more accessible.

1. SEO: metadata per route (title template "%s · Shreevan Group"), canonical URLs, OG images via next/og (paper background, Fraunces headline, logo, molecule code for product pages), sitemap.ts (all formulary items), robots.ts. JSON-LD: Organization (populated fields only), WebSite with SearchAction → /formulary?q=, BreadcrumbList.
2. Performance: 3D chunk and GSAP/Lenis loaded client-side after LCP; Canvas paused off-screen; textures ≤ 1024px; fonts subset; next/image sizes everywhere. Run Lighthouse on / and /formulary (mobile + desktop): targets LCP < 2.5s, CLS < 0.05, INP < 200ms, performance ≥ 85 mobile. Fix until met.
3. Accessibility: WCAG 2.2 AA on every route: contrast, focus order, skip link, form labels, aria-live errors, reduced motion, 200% zoom, touch targets ≥ 44px. Run axe on each route; zero serious/critical issues.
4. Honesty sweep: grep src for hard-coded years, "+" next to numbers, "since", "countries", and every banned word; route any fact through config or remove it.
5. Deploy: add vercel.json if needed and prepare for Vercel deployment; recommend connecting a custom domain through Cloudflare DNS (some Indian ISPs filter *.vercel.app).
6. Final report: checklist of passes, Lighthouse scores, and the list of company.ts fields still empty that the client must provide.

Verify per AGENTS.md.
```

---

## Client facts to collect before launch (feeds `company.ts`)

| Field | Why it matters |
|---|---|
| Exact legal name and entity type | Footer registry, must match IEC |
| Founding year (real, 2023/2024) | "Est. {year}" in hero, ticket and footer |
| IEC, GSTIN, CIN | Importers verify these on DGFT / MCA |
| Pharmexcil RCMC number | Required for pharma exporters; buyers ask for it |
| Drug licence numbers | Needed to trade in drugs |
| Manufacturing partner(s) + WHO-GMP / Schedule M certificates | The main trust signal for a merchant exporter |
| Real dated numbers: shipments done, countries shipped to, partner sites | Fact rail, each with "as of" date |
| Markets actually served | Globe nodes and shipment route |
| Sample COA / COPP / GMP certificate images | Dossier stack and Quality chapter |
| Address, phone, WhatsApp, export desk email | Contact blocks and RFQ emails |
| Directors' names and photos | A visible team is the strongest legitimacy signal for a young exporter |
