"use client";

import React from "react";
import Link from "next/link";
import { Chapter } from "@/components/journey/Chapter";
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
    desc: "Artwork specifications aligned word-for-word with the approved national marketing authorization dossier.",
  },
];

export function CH06YourBrand() {
  return (
    <Chapter
      index={6}
      id="chapter-brand"
      title="Your Brand"
      docId="origin"
    >
      <div className="w-full flex flex-col justify-between gap-8">
        {/* Chapter Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-06 / PRIVATE LABEL &amp; OEM
            </span>
            <span className="text-rule">|</span>
            <h2 className="font-display text-2xl lg:text-3xl font-light text-ink">
              Custom Packaging &amp; Brand Manufacturing
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-700" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              EXPORT DESK SPECIFICATION
            </span>
          </div>
        </div>

        {/* Middle: Packaging Specs + 4 Label Zones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-2">
          {/* Left Column: Packaging Standards (5 cols) */}
          <div className="lg:col-span-5 bg-paper border border-rule p-6 rounded-[2px] shadow-[0_1px_4px_rgba(15,27,36,0.02)] space-y-5">
            <div className="border-b border-rule pb-3 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-semibold">
                PACKAGING SPECIFICATIONS
              </span>
              <span className="font-mono text-[10px] text-ink-3">
                300 GSM VIRGIN FBB
              </span>
            </div>

            {/* Simulated carton specimen */}
            <div className="border border-rule bg-porcelain p-5 space-y-4 rounded-[2px]">
              <div className="border-b border-rule pb-3 flex items-start justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-accent-700 block font-bold">
                    SPECIMEN ARTWORK LAYOUT
                  </span>
                  <span className="font-display text-base text-ink font-normal block leading-tight mt-0.5">
                    Private Label / Distributor Brand
                  </span>
                </div>
                <span className="font-mono text-[10px] text-ink-3 border border-rule px-1.5 py-0.5 rounded-[1px]">
                  ZONE IVb
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs text-ink-2">
                <div className="flex justify-between py-1 border-b border-rule/60">
                  <span className="text-ink-3">Primary Blister:</span>
                  <span className="font-semibold text-ink">Alu-Alu / PVC-PVDC</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rule/60">
                  <span className="text-ink-3">Outer Carton:</span>
                  <span className="font-semibold text-ink">Drip-off UV / Braille Embossed</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rule/60">
                  <span className="text-ink-3">Serialization:</span>
                  <span className="font-semibold text-ink">GS1 2D DataMatrix</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-ink-3">Package Leaflet:</span>
                  <span className="font-semibold text-ink">Bilingual PIL / SmPC</span>
                </div>
              </div>
            </div>

            <p className="font-mono text-xs text-ink-3 leading-normal">
              Custom die-lines, security varnishing, and regulatory artwork prepared in accordance with recipient health ministry standards.
            </p>
          </div>

          {/* Right Column: 4 Label Zones (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                COMPLIANT BRAND ENGINEERING
              </span>
              <p className="font-body text-sm text-ink-2 leading-relaxed">
                Whether supplying under your registered private label or national tender specifications,
                we supply finished formulations with packaging that meets your health ministry&apos;s labelling directives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LABEL_ZONES.map((z) => (
                <div
                  key={z.id}
                  className="bg-paper border border-rule p-4 space-y-1.5 hover:border-accent-700/60 transition-colors rounded-[2px]"
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
            <div className="border border-rule bg-paper p-6 space-y-4 rounded-[2px] shadow-[0_1px_4px_rgba(15,27,36,0.02)]">
              <div>
                <h3 className="font-display text-2xl font-light text-ink tracking-tight">
                  Send us your tender or formulation list.
                </h3>
                <p className="font-body text-xs sm:text-sm text-ink-2 leading-relaxed mt-1">
                  Submit your requisition list or formulation requirements. Our export desk
                  returns verified regulatory documentation and commercial CIF quotations.
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
