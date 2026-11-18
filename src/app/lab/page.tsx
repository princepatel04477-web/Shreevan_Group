"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Chapter } from "@/components/journey/Chapter";
import { BatchTicket } from "@/components/journey/BatchTicket";
import { DossierStack } from "@/components/journey/DossierStack";
import { BlisterGlobeContainer } from "@/components/three/BlisterGlobeContainer";
import { useJourney } from "@/lib/journey";
import {
  SplitHeading,
  FactRoll,
  MagneticButton,
  Loupe,
  ImageCurtain,
} from "@/components/motion";
import { RuledTable, Footnote, SectionLabel, Button } from "@/components/ui";
import { getPublicProducts } from "@/lib/catalogue";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LabPage() {
  const sampleProducts = getPublicProducts().slice(0, 4);
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const setHeroProgress = useJourney((s) => s.setHeroProgress);
  const heroProgress = useJourney((s) => s.heroProgress);

  // GSAP ScrollTrigger to scrub heroProgress over the scroll track
  useEffect(() => {
    if (!heroTrackRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroTrackRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          setHeroProgress(Number(self.progress.toFixed(3)));
        },
      });
    }, heroTrackRef);

    return () => ctx.revert();
  }, [setHeroProgress]);

  return (
    <main className="relative min-h-screen bg-paper text-ink selection:bg-accent-100 selection:text-accent-700">
      {/* Batch Ticket (Fixed Progress & Nav) */}
      <BatchTicket />

      {/* Dossier Stack (Fixed Document Pile & Fan-out) */}
      <DossierStack />

      {/* Lab Header Strip */}
      <header className="sticky top-0 z-40 bg-porcelain/90 backdrop-blur-sm border-b border-rule py-3 px-6 md:px-12 flex justify-between items-center text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-700 animate-pulse" />
          <span className="font-bold text-accent-700 uppercase tracking-widest">
            LAB ENVIRONMENT · ROUND 3 3D HERO
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/style-guide" className="text-ink-2 hover:text-ink underline">
            Style Guide
          </Link>
          <Link href="/" className="text-ink-2 hover:text-ink underline">
            Home
          </Link>
        </div>
      </header>

      {/* =========================================================================
          SECTION: 3D BLISTER -> GLOBE HERO (ROUND 3 SIGNATURE EXPERIENCE)
          ========================================================================= */}
      <section className="relative border-b border-rule bg-paper">
        {/* Interactive Scrubbing Toolbar for Round 3 Milestones */}
        <div className="bg-porcelain border-b border-rule py-3 px-6 md:px-12 pr-28 md:pr-12 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider text-ink-3">Hero Progress:</span>
            <span className="font-bold text-accent-700 w-12 text-right">
              {(heroProgress * 100).toFixed(0)}%
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={heroProgress}
              onChange={(e) => setHeroProgress(parseFloat(e.target.value))}
              aria-label="3D Hero Progress Scrubbing Slider"
              className="w-32 md:w-48 accent-accent-700 cursor-pointer"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-ink-3 uppercase text-[11px] hidden sm:inline">Milestones:</span>
            {[
              { label: "0.0 Idle Blister", val: 0.0 },
              { label: "0.3 Press-Out", val: 0.3 },
              { label: "0.6 Flight Arc", val: 0.6 },
              { label: "1.0 Globe Landing", val: 1.0 },
            ].map((m) => (
              <button
                key={m.val}
                type="button"
                onClick={() => setHeroProgress(m.val)}
                className={`px-2.5 py-1 text-[11px] font-mono border rounded-[2px] transition-colors ${
                  Math.abs(heroProgress - m.val) < 0.05
                    ? "bg-accent-700 text-porcelain border-accent-700 font-bold"
                    : "bg-paper text-ink border-rule hover:border-ink-2"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Canvas Stage Container (Pinned or Floating) */}
        <div className="relative w-full max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-3 mb-6">
            <SectionLabel number="00" label="SIGNATURE 3D HERO · MOLECULE TO MANIFEST" />
            <SplitHeading
              as="h1"
              text="From foil blister pack to global export markets."
              className="font-display text-3xl md:text-5xl font-light text-ink tracking-tight max-w-3xl"
            />
            <p className="font-body text-base text-ink-2 max-w-2xl leading-relaxed">
              Every export consignment begins as laboratory-verified formulations pressed in
              licensed GMP facilities, dispatched across international maritime and air corridors.
            </p>
          </div>

          {/* 3D Scene Viewport */}
          <div className="relative w-full h-[520px] md:h-[660px] bg-porcelain border border-rule shadow-sm overflow-hidden rounded-[2px]">
            <BlisterGlobeContainer force3D className="w-full h-full" />

            {/* In-Canvas Dynamic Status Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none text-xs font-mono">
              <div className="bg-porcelain/90 border border-rule p-2 rounded-[2px] backdrop-blur-sm pointer-events-auto space-y-1">
                <span className="text-[10px] text-ink-3 uppercase tracking-wider block">
                  3D Render State
                </span>
                <p className="text-ink font-semibold">
                  {heroProgress < 0.25
                    ? "Idle Pack Float & Pointer Tilt (Max 8°)"
                    : heroProgress < 0.55
                    ? "Tablets Ejecting Sequential Stagger (Foil Ruptured)"
                    : heroProgress < 0.8
                    ? "Transcontinental Flight Along 3D Bezier Arcs"
                    : "Touchdown at Regional Corridors (India Arcs Active)"}
                </p>
                <Footnote
                  asOf="18 November 2026"
                  source="Regions we are developing (Africa · CIS · SE Asia · LatAm · MidEast)"
                />
              </div>

              <div className="bg-porcelain/90 border border-rule px-3 py-1.5 rounded-[2px] backdrop-blur-sm text-right">
                <span className="text-accent-700 font-bold">R3F PROCEDURAL MESH</span>
                <span className="text-ink-3 block text-[10px]">Zero External 3D Assets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Track to Scrub 3D Hero */}
        <div
          ref={heroTrackRef}
          className="h-[140vh] relative pointer-events-none flex items-center justify-center"
        >
          <div className="sticky top-1/2 -translate-y-1/2 font-mono text-xs text-ink-3 bg-paper/80 border border-rule px-4 py-2 rounded-[2px]">
            Scroll through track to scrub 3D Hero Progress ({(heroProgress * 100).toFixed(0)}%)
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: CHAPTERS & JOURNEY ENGINE (FROM ROUND 2)
          ========================================================================= */}
      <div className="w-full">
        {/* Chapter 01 — Formulation */}
        <Chapter
          index={1}
          id="chapter-formulation"
          title="Formulation"
          docId="product-list"
        >
          {({ progress }) => (
            <div className="flex flex-col justify-between h-full space-y-12">
              <div className="space-y-4">
                <SectionLabel number="01" label="CHAPTER 01 · FORMULATION DESK" />
                <SplitHeading
                  as="h2"
                  text="Medicines made in India, documented for the world."
                  className="font-display text-4xl md:text-6xl font-light text-ink tracking-tight max-w-4xl"
                />
                <p className="font-body text-base md:text-lg text-ink-2 max-w-2xl leading-relaxed">
                  Quality-assured formulations and Ayurveda, supplied with the regulatory
                  paperwork your health authority asks for.
                </p>
              </div>

              {/* Interactive Micro-primitives Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-rule">
                <div>
                  <FactRoll
                    value={229}
                    label="Verified Public Formulations"
                    unit="SKUs"
                    asOf="18 November 2026"
                    source="Internal Master Index"
                  />
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 block">
                    Magnetic Primary CTA
                  </span>
                  <div>
                    <MagneticButton>
                      Request a Quotation
                    </MagneticButton>
                  </div>
                  <p className="text-xs text-ink-3 font-mono">
                    Pulls toward cursor on pointer:fine
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 block">
                    Technical Loupe Magnifier
                  </span>
                  <Loupe zoom={2.2} size={120}>
                    <div className="p-3 bg-mist border border-rule font-mono text-[11px] text-ink space-y-1">
                      <p className="font-bold text-accent-700">SPEC: AMOXICILLIN 500MG</p>
                      <p>BP/USP GRADE · BATCH: 2026-EXP</p>
                      <p className="text-ink-3">Hover to magnify 2.2x</p>
                    </div>
                  </Loupe>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-ink-3">
                <span>PIN PROGRESS: {Math.round(progress * 100)}%</span>
                <span>Scroll down to advance to Chapter 02</span>
              </div>
            </div>
          )}
        </Chapter>

        {/* Chapter 02 — Portfolio */}
        <Chapter
          index={2}
          id="chapter-portfolio"
          title="Portfolio"
          docId="coa"
        >
          {({ progress }) => (
            <div className="flex flex-col justify-between h-full space-y-8">
              <div className="space-y-4">
                <SectionLabel number="02" label="CHAPTER 02 · PORTFOLIO REGISTER" />
                <SplitHeading
                  as="h2"
                  text="Formulations categorized for global tenders."
                  className="font-display text-4xl md:text-5xl font-light text-ink tracking-tight max-w-4xl"
                />
                <p className="font-body text-base text-ink-2 max-w-2xl leading-relaxed">
                  Every product is sourced strictly from licensed GMP-certified manufacturing
                  partners with complete batch documentation.
                </p>
              </div>

              {/* Sample Product Table */}
              <div className="border border-rule bg-porcelain p-4 shadow-sm">
                <RuledTable
                  columns={[
                    { key: "generic", header: "Generic Molecule", render: (p) => p.generic },
                    { key: "dosageForm", header: "Dosage Form", render: (p) => p.dosageForm },
                    { key: "category", header: "Category", render: (p) => p.category },
                    { key: "segment", header: "Segment", render: (p) => p.segment },
                  ]}
                  data={sampleProducts}
                  keyExtractor={(p) => p.id}
                />
                <div className="mt-3 flex justify-between items-center text-xs font-mono text-ink-3">
                  <span>SAMPLE BATCH SPECIMENS</span>
                  <Link href="/style-guide" className="text-accent-700 hover:underline">
                    View All Design Tokens →
                  </Link>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-ink-3">
                <span>PIN PROGRESS: {Math.round(progress * 100)}%</span>
                <span>Scroll down to advance to Chapter 03</span>
              </div>
            </div>
          )}
        </Chapter>

        {/* Chapter 03 — Quality */}
        <Chapter
          index={3}
          id="chapter-quality"
          title="Quality"
          docId="gmp"
        >
          {({ progress }) => (
            <div className="flex flex-col justify-between h-full space-y-8">
              <div className="space-y-4">
                <SectionLabel number="03" label="CHAPTER 03 · QUALITY ASSURANCE" />
                <SplitHeading
                  as="h2"
                  text="We only supply what we can document."
                  className="font-display text-4xl md:text-5xl font-light text-ink tracking-tight max-w-4xl"
                />
                <p className="font-body text-base text-ink-2 max-w-2xl leading-relaxed">
                  Batch-wise Certificate of Analysis, destination-appropriate labelling,
                  and authentic manufacturer GMP certifications with every export release.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <ImageCurtain className="border border-rule bg-porcelain p-6 shadow-sm">
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-rule pb-2">
                      <span className="font-bold text-accent-700">SAMPLE COA PARAMETERS</span>
                      <span className="text-[10px] text-ink-3">PH. EUR / USP</span>
                    </div>
                    <div className="space-y-1 text-ink-2">
                      <p>Description: White crystalline powder</p>
                      <p>Identification (IR): Conforms</p>
                      <p>Assay: 99.8% (Limit: 98.5% – 101.5%)</p>
                      <p>Dissolution: 96% at 30 min (Q &gt; 80%)</p>
                      <p>Microbial Count: &lt; 100 CFU/g</p>
                    </div>
                    <Footnote asOf="18 November 2026" source="GMP Certified Testing Laboratory" />
                  </div>
                </ImageCurtain>

                <div className="space-y-4 font-body text-sm text-ink-2">
                  <h3 className="font-display text-xl text-ink font-medium">
                    Complete Traceability Chain
                  </h3>
                  <p className="leading-relaxed">
                    Finished goods are tested at accredited laboratories before release.
                    Consignments ship with all batch records sealed and verified.
                  </p>
                  <div>
                    <Button variant="secondary">
                      Download Sample Certificate
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-ink-3 border-t border-rule pt-4">
                <span>PIN PROGRESS: {Math.round(progress * 100)}%</span>
                <span className="text-accent-700 font-bold">
                  Dossier Stack Updated (Check right edge)
                </span>
              </div>
            </div>
          )}
        </Chapter>
      </div>

      {/* Lab Footer */}
      <footer className="py-12 px-6 border-t border-rule text-center font-mono text-xs text-ink-3 bg-paper">
        <p>SHREEVAN GROUP · ROUND 3 LAB TESTING HARNESS · 3D BLISTER-GLOBE ENGINE VERIFIED</p>
      </footer>
    </main>
  );
}
