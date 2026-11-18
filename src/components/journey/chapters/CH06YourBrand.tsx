"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Chapter } from "@/components/journey/Chapter";
import { useJourney } from "@/lib/journey";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { LinkUnderline } from "@/components/motion/LinkUnderline";

const LABEL_ZONES = [
  {
    id: "language",
    zone: "Zone 01",
    title: "Destination Language & Typography",
    desc: "Bilingual regulatory typography tailored for MOH requirements across Francophone Africa, Latin America (Spanish), and CIS (Russian).",
  },
  {
    id: "pack",
    zone: "Zone 02",
    title: "Primary Pack Format",
    desc: "Alu-Alu blister foils, PVC/PVDC, amber glass bottles, or moisture-barrier HDPE containers matched to climatic stability requirements.",
  },
  {
    id: "security",
    zone: "Zone 03",
    title: "Security & Serialization",
    desc: "GS1-compliant 2D DataMatrix barcodes, pharmacode indexing, and tamper-evident carton seals preventing counterfeit diversion.",
  },
  {
    id: "dossier",
    zone: "Zone 04",
    title: "Dossier Alignment",
    desc: "Artwork artwork and packaging specifications aligned word-for-word with the approved national marketing authorization dossier.",
  },
];

export function CH06YourBrand() {
  const boxRef = useRef<HTMLDivElement>(null);
  const docsCollected = useJourney((s) => s.docsCollected);
  const isComplete = docsCollected.length >= 6;

  const setupTimeline = (tl: gsap.core.Timeline) => {
    const box = boxRef.current;
    if (!box) return;

    // Rotate and fold 3D carton box on scroll
    tl.to(
      box,
      {
        rotateY: 35,
        rotateX: -10,
        scale: 1.05,
        duration: 0.7,
        ease: "power1.inOut",
      },
      0
    );
  };

  return (
    <Chapter
      index={6}
      id="chapter-brand"
      title="Your Brand"
      docId="origin"
      length="+=140%"
      setupTimeline={setupTimeline}
    >
      <div className="w-full h-full flex flex-col justify-between">
        {/* Chapter Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-06 / YOUR BRAND
            </span>
            <span className="text-rule">|</span>
            <h2 className="font-display text-2xl lg:text-3xl font-light text-ink">
              Private Label &amp; Custom Packaging
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-700" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              {isComplete ? "DOSSIER COMPLETE (6/6)" : "FINAL JOURNEY STAGE"}
            </span>
          </div>
        </div>

        {/* Middle: 3D Carton Net + 4 Label Zones */}
        <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Left Column: 3D Packaging Carton Net (5 cols) */}
          <div className="lg:col-span-5 bg-paper border border-rule p-6 relative rounded-[2px] shadow-[0_2px_8px_rgba(15,27,36,0.03)] flex flex-col items-center justify-center min-h-[360px]">
            <div className="w-full flex items-center justify-between border-b border-rule pb-2 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-semibold">
                PHARMACEUTICAL PACKAGING NET
              </span>
              <span className="font-mono text-[10px] text-ink-3">
                300 GSM VIRGIN FBB
              </span>
            </div>

            {/* 3D Box Perspective Container */}
            <div
              className="relative w-48 h-56 flex items-center justify-center"
              style={{ perspective: 900 }}
            >
              <div
                ref={boxRef}
                className="relative w-36 h-48 border-2 border-accent-700 bg-porcelain p-3 flex flex-col justify-between shadow-[0_12px_32px_rgba(15,27,36,0.12)] will-change-transform rounded-[1px]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateY(-15deg) rotateX(5deg)",
                  transition: "transform 0.4s ease-out",
                }}
              >
                {/* Simulated carton artwork */}
                <div className="border-b border-rule/80 pb-2">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-accent-700 block font-bold">
                    YOUR BRAND NAME
                  </span>
                  <span className="font-display text-xs text-ink font-normal block leading-tight">
                    Custom Generic Formulation
                  </span>
                </div>

                <div className="my-auto space-y-1 py-1">
                  <div className="h-2 w-16 bg-rule rounded-[1px]" />
                  <div className="h-1.5 w-24 bg-rule/70 rounded-[1px]" />
                  <div className="h-1.5 w-20 bg-rule/60 rounded-[1px]" />
                </div>

                <div className="border-t border-rule/80 pt-1.5 flex items-end justify-between font-mono text-[7px] text-ink-3">
                  <div>
                    <span>10 × 10 TABLETS</span>
                    <span className="block text-accent-700">ZONE IVB STABLE</span>
                  </div>
                  <div className="w-5 h-5 border border-ink/40 flex items-center justify-center text-[6px]">
                    2D
                  </div>
                </div>

                {/* Carton Flap Outline */}
                <div
                  className="absolute -top-6 left-0 right-0 h-6 border border-dashed border-rule bg-mist/60 flex items-center justify-center text-[7px] font-mono text-ink-3"
                  aria-hidden="true"
                >
                  TUCK FLAP
                </div>
              </div>
            </div>

            <span className="font-mono text-[11px] text-ink-3 text-center mt-6">
              Custom die-lines, security varnishing, and bilingual artwork rendered for your market.
            </span>
          </div>

          {/* Right Column: 4 Label Zones (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                COMPLIANT BRAND ENGINEERING
              </span>
              <p className="font-body text-sm text-ink-2 leading-relaxed">
                Whether supplying under your registered private label or national tender specifications,
                we manufacture formulations with packaging that meets your health ministry&apos;s labelling directives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LABEL_ZONES.map((z) => (
                <div
                  key={z.id}
                  className="bg-paper border border-rule p-4 space-y-1.5 hover:border-accent-700/60 transition-colors"
                >
                  <span className="font-mono text-[10px] text-accent-700 font-bold uppercase tracking-wider block">
                    {z.zone}
                  </span>
                  <h3 className="font-display text-sm font-light text-ink">
                    {z.title}
                  </h3>
                  <p className="font-body text-xs text-ink-2 leading-relaxed">
                    {z.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Closing CTA Band */}
            <div className="border border-rule bg-paper p-6 space-y-4 rounded-[2px] shadow-[0_2px_12px_rgba(15,27,36,0.04)]">
              <div>
                <h3 className="font-display text-2xl lg:text-3xl font-light text-ink tracking-tight">
                  Send us your tender list.
                </h3>
                <p className="font-body text-xs sm:text-sm text-ink-2 leading-relaxed mt-1">
                  Upload your product requisition list or formulation requirements. Our export desk
                  returns verified regulatory documentation and CIF quotations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link href="/contact?type=tender">
                  <MagneticButton>
                    Request Tender Quotation
                  </MagneticButton>
                </Link>
                <LinkUnderline
                  href="/formulary"
                  className="font-mono text-xs text-accent-700 uppercase tracking-wider"
                >
                  Explore the formulary →
                </LinkUnderline>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-rule pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink-3">
          <span>Minimum order quantities (MOQs) depend on batch size and packaging format</span>
          <span>All packaging manufactured under cGMP licensed conditions</span>
        </div>
      </div>
    </Chapter>
  );
}
