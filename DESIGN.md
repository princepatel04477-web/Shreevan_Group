# DESIGN.md — Shreevan Group Design System

## 1. Palette & Design Tokens
Tinted archival paper neutrals with deep botanical pharmaceutical ink accents.

```css
/* Surfaces */
--paper: #F7F6F2;       /* Archival parchment sheet background */
--porcelain: #FFFFFF;   /* Crisp paper sheet / card surface */
--mist: #EEF1F0;        /* Subtle secondary backing / table rows */
--rule: #D9DDDA;        /* Ruled ledger lines & hairline dividers */

/* Inks */
--ink: #0F1B24;         /* Primary deep soot typographic ink */
--ink-2: #33424D;       /* Secondary body & label ink */
--ink-3: #5E6B74;       /* Metadata, captions, and mono specs */

/* Accents */
--accent-700: #1B4231;  /* Deep pine green (7.8:1 contrast on paper - AAA) */
--accent-500: #204D39;  /* Interactive hover green */
--accent-100: #E2ECE7;  /* Subtle tinted green wash */
--accent-gold: #B99A55; /* Refined seal gold */
--signal: #B4532A;      /* Terracotta red for warnings & alerts only */
--ink-stamp: #143326;   /* Rich ink stamp seal tone */
```

---

## 2. Typography
A classic editorial hierarchy combining high-contrast serif display, legible humanist body text, and technical monospace data tables.

- **Display Serif**: `Fraunces` (300 weight, -0.02em letter-spacing).
  - Huge Hero / Pinned Chapter Titles: 56px → 112px clamp.
  - Page Titles (H1): 44px → 72px clamp.
  - Section Heads (H2): 32px → 48px clamp.
- **Body Text**: `Instrument Sans` (400 / 500 weight, 1.65 line-height).
  - Primary prose: 17px on 28px line-height, max-w-[65ch] to 75ch.
- **Technical & Data**: `JetBrains Mono` (400 / 500 / 700 weight).
  - Molecules, batch numbers, strengths, Incoterms, metadata labels: 11px–14px.
- **Caps Labels**: 10px–12px uppercase, letter-spacing `0.14em` to `0.18em`.
- **Fallback Indic Type**: `Noto Sans Devanagari`.

---

## 3. Spatial System & Layout Rules
- **Base Unit**: 8px spatial rhythm.
- **Container**: Max width 1320px (12-column grid with 24px/32px gutters).
- **Section Padding**: 128px vertical on desktop (≥1024px), 80px on tablet/mobile.
- **Editorial Asymmetry**: Prefer 5/7 or 7/5 asymmetrical splits over symmetrical split columns.
- **Corner Radii**:
  - Controls, inputs, and interactive buttons: `rounded-[2px]`.
  - Paper sheets, panels, and images: `rounded-none` (0px sharp paper cut edges).
- **Texture**: 1.5% SVG paper grain overlay across all viewport layers.

---

## 4. Motion Ownership & Library Boundaries
- **GSAP + ScrollTrigger**:
  - Scrubbed home chapter transitions and desk-sheet stacking.
  - SVG dotted shipping route drawing and container motion.
  - Document pile to grid layout convergence.
- **Three.js + React Three Fiber (R3F)**:
  - 3D Blister Pack foil pressing and tablet arcing.
  - Interactive textured globe with market corridor coordinate nodes.
  - Driven strictly by journey scroll store (never its own scroll listener).
- **Framer Motion**:
  - Layout morphs (grid tile to technical data sheet).
  - Route changes, mount/exit transitions, and drawers.
- **CSS 3D Transforms**:
  - 3D carton box net folding in CH06 and Private Label.
  - Registry card flip in About page.
  - RFQ document folding in Sealed Envelope.
- **Accessibility Gate**:
  - Every motion effect strictly checks `prefers-reduced-motion` and provides an instantaneous, complete static alternative.
