"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { Chapter } from "@/components/journey/Chapter";
import { company } from "@/config/company";

const INCOTERMS = [
  {
    term: "EXW",
    title: "Ex Works",
    scope: "Factory Floor Handover",
    description: "Goods made available at manufacturing facility with export packaging. Buyer handles export documentation, freight, and customs.",
  },
  {
    term: "FOB",
    title: "Free on Board",
    scope: "Indian Port Rail Lading",
    description: "Export customs clearance at Nhava Sheva or Mundra, port terminal handling, and loading over vessel rail included.",
  },
  {
    term: "CIF",
    title: "Cost, Insurance & Freight",
    scope: "Destination Seaport Terminal",
    description: "Marine ocean freight prepaid to named destination port with transit insurance (Institute Cargo Clauses A) included.",
  },
  {
    term: "CIP",
    title: "Carriage & Insurance Paid",
    scope: "Destination Airport / ICD",
    description: "Multi-modal air/ocean transit prepaid with comprehensive cargo insurance to named international airport or inland dry port.",
  },
];

export function CH05Shipment() {
  const containerGlyphRef = useRef<SVGGElement>(null);
  const routePathRef = useRef<SVGPathElement>(null);

  const setupTimeline = (tl: gsap.core.Timeline) => {
    const glyph = containerGlyphRef.current;
    if (!glyph) return;

    // Move cargo vessel along the shipping route curve
    tl.to(
      glyph,
      {
        x: 320,
        y: 60,
        rotation: 12,
        duration: 0.7,
        ease: "power1.inOut",
      },
      0
    );
  };

  return (
    <Chapter
      index={5}
      id="chapter-shipment"
      title="Shipment"
      docId="invoice"
      length="+=140%"
      setupTimeline={setupTimeline}
    >
      <div className="w-full h-full flex flex-col justify-between">
        {/* Chapter Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-05 / SHIPMENT
            </span>
            <span className="text-rule">|</span>
            <h2 className="font-display text-2xl lg:text-3xl font-light text-ink">
              Export Logistics &amp; Incoterms
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-700" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              INDIAN OUTBOUND HUBS: JNPT / MUNDRA / BOM
            </span>
          </div>
        </div>

        {/* Middle Section: Route Graphic & Incoterms Cards */}
        <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          {/* Maritime / Air Export Route Schematic (5 cols) */}
          <div className="lg:col-span-5 bg-paper border border-rule p-6 relative rounded-[2px] shadow-[0_2px_8px_rgba(15,27,36,0.03)] space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-semibold">
                MARITIME &amp; AIR CORRIDOR
              </span>
              <span className="font-mono text-[10px] text-ink-3 uppercase">
                LAT/LONG TRACKING
              </span>
            </div>

            {/* SVG Corridor */}
            <div className="relative h-44 w-full bg-mist/40 border border-rule overflow-hidden flex items-center justify-center">
              <svg
                viewBox="0 0 400 160"
                className="w-full h-full text-ink"
                aria-hidden="true"
              >
                {/* Background grid lines */}
                <line x1="0" y1="40" x2="400" y2="40" stroke="#D9DDDA" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="400" y2="80" stroke="#D9DDDA" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="400" y2="120" stroke="#D9DDDA" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="100" y1="0" x2="100" y2="160" stroke="#D9DDDA" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="200" y1="0" x2="200" y2="160" stroke="#D9DDDA" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="300" y1="0" x2="300" y2="160" stroke="#D9DDDA" strokeWidth="1" strokeDasharray="4 4" />

                {/* Shipping Route Path */}
                <path
                  ref={routePathRef}
                  d="M 40 110 C 140 120, 220 50, 360 60"
                  fill="none"
                  stroke="#0F1B24"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />

                {/* Origin Port Node: India */}
                <circle cx="40" cy="110" r="5" fill="#B4532A" />
                <text x="40" y="132" fill="#0F1B24" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  INDIA (JNPT / BOM)
                </text>

                {/* Destination Port Node */}
                <circle cx="360" cy="60" r="5" fill="#0F1B24" />
                <text x="360" y="82" fill="#0F1B24" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  DESTINATION PORT
                </text>

                {/* Moving Container Cargo Glyph */}
                <g ref={containerGlyphRef} transform="translate(40, 110)">
                  <rect x="-14" y="-10" width="28" height="14" fill="#B4532A" rx="1" />
                  <line x1="-7" y1="-10" x2="-7" y2="4" stroke="#FFFFFF" strokeWidth="1" />
                  <line x1="0" y1="-10" x2="0" y2="4" stroke="#FFFFFF" strokeWidth="1" />
                  <line x1="7" y1="-10" x2="7" y2="4" stroke="#FFFFFF" strokeWidth="1" />
                </g>
              </svg>
            </div>

            {/* Cold Chain & Packaging Safeguards */}
            <div className="space-y-2 pt-2">
              <span className="font-mono text-xs text-ink font-semibold block uppercase tracking-wider">
                TRANSIT INTEGRITY SAFEGUARDS
              </span>
              <ul className="space-y-1 font-body text-xs text-ink-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-700 font-bold">•</span>
                  <span>Temperature data loggers embedded in all sensitive consignments (2°C–8°C / 15°C–25°C).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-700 font-bold">•</span>
                  <span>Heavy-gauge export-grade 7-ply corrugated cartons with moisture barrier liners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-700 font-bold">•</span>
                  <span>ISPM-15 heat-treated fumigated wooden pallets with plastic stretch wrapping.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 4 Incoterms Checkpoint Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INCOTERMS.map((term) => (
              <div
                key={term.term}
                className="bg-paper border border-rule p-5 space-y-3 hover:border-accent-700/60 transition-colors shadow-[0_2px_8px_rgba(15,27,36,0.03)]"
              >
                <div className="flex items-baseline justify-between border-b border-rule pb-2">
                  <span className="font-mono text-lg font-bold text-accent-700">
                    {term.term}
                  </span>
                  <span className="font-mono text-[10px] text-ink-3 uppercase tracking-wider">
                    INCOTERMS® 2020
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-light text-ink">
                    {term.title}
                  </h3>
                  <span className="font-mono text-[11px] text-ink-3 block">
                    {term.scope}
                  </span>
                </div>
                <p className="font-body text-xs text-ink-2 leading-relaxed">
                  {term.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Markets Served Footnote (strictly conditional per Honesty Rule) */}
        <div className="border-t border-rule pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink-3">
          <span>Incoterms® 2020 standard contracts with Lloyd&apos;s / ICICI Lombard marine coverage</span>
          {company.marketsServed && company.marketsServed.length > 0 ? (
            <span>
              Markets served: {company.marketsServed.map((m) => m.country).join(", ")}
            </span>
          ) : (
            <span>Global export clearance through licensed port customs brokers</span>
          )}
        </div>
      </div>
    </Chapter>
  );
}
