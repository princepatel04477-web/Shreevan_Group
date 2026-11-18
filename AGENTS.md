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

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
