"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { Chapter } from "@/components/journey/Chapter";

const EXPORT_DOCUMENTS = [
  {
    id: "invoice",
    title: "Commercial Invoice & Packing List",
    code: "SG-DOC-05",
    issuer: "Shreevan Export Logistics Desk",
    purpose: "Statutory customs declaration detailing HS codes, batch numbers, net/gross weights, and FOB/CIF valuations.",
    scatter: { rotate: -3.8, x: -28, y: 16 },
  },
  {
    id: "origin",
    title: "Certificate of Origin",
    code: "SG-DOC-06",
    issuer: "Chamber of Commerce / DGFT Authority",
    purpose: "Authoritative certification of Indian nationality required for preferential import tariff assessment.",
    scatter: { rotate: 2.6, x: 24, y: -22 },
  },
  {
    id: "coa",
    title: "Certificate of Analysis (COA)",
    code: "SG-DOC-02",
    issuer: "QC Laboratory (Licensed Partner)",
    purpose: "Batch-wise analytical release showing assay, dissolution, related substances, and microbial limits.",
    scatter: { rotate: -2.2, x: 18, y: 26 },
  },
  {
    id: "copp",
    title: "Certificate of Pharmaceutical Product (COPP)",
    code: "SG-DOC-04",
    issuer: "CDSCO (WHO Format Guidelines)",
    purpose: "Ministry of Health submission proving product registration and marketing authorization in the exporting country.",
    scatter: { rotate: 3.5, x: -20, y: -14 },
  },
  {
    id: "fsc",
    title: "Free Sale Certificate (FSC)",
    code: "SG-DOC-07",
    issuer: "State Licensing Authority",
    purpose: "Attestation that the pharmaceutical formulation is freely sold in the Indian domestic market without restriction.",
    scatter: { rotate: -3.1, x: 16, y: 18 },
  },
  {
    id: "gmp",
    title: "Manufacturer GMP Certificate",
    code: "SG-DOC-03",
    issuer: "State Licensing Authority / WHO Inspectorate",
    purpose: "Current Good Manufacturing Practices certification validating partner production facility compliance.",
    scatter: { rotate: 2.1, x: -14, y: -24 },
  },
];

export function CH04Documentation() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setupTimeline = (tl: gsap.core.Timeline) => {
    // Collect non-null card elements
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Set initial scattered positions
    cards.forEach((card, idx) => {
      const s = EXPORT_DOCUMENTS[idx]?.scatter;
      if (s && card) {
        gsap.set(card, {
          rotation: s.rotate,
          x: s.x,
          y: s.y,
        });
      }
    });

    // Animate from scattered pile to aligned ruled grid
    tl.to(cards, {
      rotation: 0,
      x: 0,
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
      duration: 0.6,
    }, 0);
  };

  return (
    <Chapter
      index={4}
      id="chapter-documentation"
      title="Documentation"
      docId="copp"
      length="+=140%"
      setupTimeline={setupTimeline}
    >
      <div className="w-full h-full flex flex-col justify-between">
        {/* Chapter Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-04 / DOCUMENTATION
            </span>
            <span className="text-rule">|</span>
            <h2 className="font-display text-2xl lg:text-3xl font-light text-ink">
              The Regulatory Export Dossier
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-700" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              6 STATUTORY INSTRUMENTS
            </span>
          </div>
        </div>

        {/* Intro Text */}
        <div className="py-2 max-w-3xl">
          <p className="font-body text-sm sm:text-base text-ink-2 leading-relaxed">
            International pharmaceutical imports require flawless regulatory paperwork. We coordinate
            the complete export documentation stack required by drug regulatory authorities and port customs
            officers worldwide.
          </p>
        </div>

        {/* 3x2 Ruled Paper Grid (Scatters on desktop and snaps into place on scroll) */}
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-auto">
          {EXPORT_DOCUMENTS.map((doc, idx) => (
            <div
              key={doc.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="bg-paper border border-rule p-5 flex flex-col justify-between shadow-[0_2px_8px_rgba(15,27,36,0.04)] hover:border-accent-700/60 transition-colors will-change-transform"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <span className="font-mono text-xs text-accent-700 font-bold">
                    {doc.code}
                  </span>
                  <span className="font-mono text-[10px] text-ink-3 uppercase">
                    DOC 0{idx + 1}/06
                  </span>
                </div>
                <h3 className="font-display text-lg font-light text-ink leading-snug">
                  {doc.title}
                </h3>
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-ink-3 block">
                    ISSUING AUTHORITY:
                  </span>
                  <span className="font-mono text-xs text-ink-2 block font-medium">
                    {doc.issuer}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-rule mt-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-3 block mb-1">
                  REGULATORY PURPOSE:
                </span>
                <p className="font-body text-xs text-ink-2 leading-relaxed">
                  {doc.purpose}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="border-t border-rule pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink-3">
          <span>COPP issued in WHO Format by the Indian Drug Regulatory Authority (CDSCO)</span>
          <span>Apostille / Embassy legalization arranged upon buyer request</span>
        </div>
      </div>
    </Chapter>
  );
}
