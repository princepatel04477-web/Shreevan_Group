"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Chapter } from "@/components/journey/Chapter";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { LinkUnderline } from "@/components/motion/LinkUnderline";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { DecryptedText } from "@/components/motion/DecryptedText";

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
            <span className="w-2 h-2 rounded-full bg-accent-700 animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              EXPORT DESK SPECIFICATION
            </span>
          </div>
        </div>

        {/* Middle: Packaging Specs + 4 Label Zones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-2">
          {/* Left Column: Packaging Standards with SpotlightCard (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard
              spotlightColor="rgba(198, 156, 109, 0.12)"
              className="p-6 space-y-5 shadow-[0_4px_24px_rgba(15,27,36,0.04)]"
            >
              <div className="border-b border-rule pb-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-semibold">
                  PACKAGING SPECIFICATIONS
                </span>
                <span className="font-mono text-[10px] text-ink-3">
                  <DecryptedText text="300 GSM VIRGIN FBB" animateOn="view" />
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
                    <span className="font-semibold text-ink">Drip-off UV / Braille</span>
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
            </SpotlightCard>
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
          </div>
        </div>

        {/* Luxury High-Contrast Closing CTA Banner (inspired by cta.gallery & taste-skill) */}
        <div className="relative overflow-hidden rounded-[2px] bg-ink text-porcelain p-8 sm:p-10 border border-[#C69C6D]/40 shadow-[0_8px_32px_rgba(15,27,36,0.12)]">
          {/* Subtle Golden Ambient Glow & Watermark Logo */}
          <div
            className="pointer-events-none absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.06] select-none"
            aria-hidden="true"
          >
            <Image
              src="/brand/logo.png"
              alt=""
              width={320}
              height={204}
              className="w-full h-auto object-contain filter invert"
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C69C6D]" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C69C6D] font-bold">
                  DIRECT EXPORT DESK ACTION
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-porcelain tracking-tight leading-tight">
                Send us your tender or formulation list.
              </h3>
              <p className="font-body text-sm sm:text-base text-paper/80 leading-relaxed max-w-xl">
                Submit your requisition schedule or target molecule requirements. Our export desk
                returns verified regulatory documentation dockets and commercial CIF quotations.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/contact?type=tender">
                <MagneticButton className="w-full sm:w-auto justify-center bg-accent-700 text-porcelain hover:bg-accent-500 shadow-md">
                  Request Tender Quotation
                </MagneticButton>
              </Link>
              <LinkUnderline
                href="/formulary"
                textClassName="text-[#E4C9A8] hover:text-porcelain font-mono uppercase tracking-wider text-xs"
                underlineClassName="bg-[#E4C9A8]"
                className="text-center py-2"
              >
                Explore the Formulary →
              </LinkUnderline>
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
