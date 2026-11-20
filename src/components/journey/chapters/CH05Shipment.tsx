"use client";

import React, { useState } from "react";
import { Chapter } from "@/components/journey/Chapter";
import { company } from "@/config/company";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { DecryptedText } from "@/components/motion/DecryptedText";
import { clsx } from "clsx";

const INCOTERMS = [
  {
    term: "CIF",
    title: "Cost, Insurance & Freight",
    scope: "Destination Seaport Terminal",
    recommended: true,
    description: "Marine ocean freight prepaid to named destination port with comprehensive transit insurance (Institute Cargo Clauses A) included.",
    details: [
      "Preferred standard for West African & Latin American ports",
      "Full container load (FCL) & consolidated LCL shipping",
      "Transit risk covered from Indian port until destination terminal discharge",
    ],
  },
  {
    term: "FOB",
    title: "Free on Board",
    scope: "Indian Port Rail Lading",
    recommended: false,
    description: "Export customs clearance at Nhava Sheva or Mundra, port terminal handling, and loading over vessel rail included.",
    details: [
      "Buyer arranges ocean carriage and transit insurance directly",
      "Shreevan manages all Indian customs export documentation & EDI filing",
      "Clean mate receipt and bill of lading transferred upon loading",
    ],
  },
  {
    term: "CIP",
    title: "Carriage & Insurance Paid",
    scope: "Destination Airport / ICD",
    recommended: false,
    description: "Multi-modal air/ocean transit prepaid with comprehensive cargo insurance to named international airport or inland dry port.",
    details: [
      "Ideal for high-value emergency antibiotics and cold chain biologics",
      "Temperature-controlled air freight via Mumbai (BOM) or Delhi (DEL)",
      "Continuous data-logger monitoring throughout transit",
    ],
  },
  {
    term: "EXW",
    title: "Ex Works",
    scope: "Factory Floor Handover",
    recommended: false,
    description: "Goods made available at manufacturing facility with export packaging. Buyer handles export documentation, freight, and customs.",
    details: [
      "Goods prepared in UN-certified export secondary packaging",
      "Inspection and lot release sign-off prior to collection",
      "Available upon buyer request for domestic consolidation hubs",
    ],
  },
];

export function CH05Shipment() {
  const [selectedTermIndex, setSelectedTermIndex] = useState(0);
  const activeTerm = INCOTERMS[selectedTermIndex] ?? INCOTERMS[0];
  if (!activeTerm) return null;

  return (
    <Chapter
      index={5}
      id="chapter-shipment"
      title="Shipment"
      docId="invoice"
    >
      <div className="w-full flex flex-col justify-between gap-8">
        {/* Chapter Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-05 / SHIPMENT &amp; LOGISTICS
            </span>
            <span className="text-rule">|</span>
            <h2 className="font-display text-2xl lg:text-3xl font-light text-ink">
              Export Logistics &amp; Incoterms
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-700 animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              INDIAN OUTBOUND HUBS: JNPT / MUNDRA / BOM
            </span>
          </div>
        </div>

        {/* Middle Section: Multimodal Hubs + Interactive Incoterms Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-2">
          {/* Maritime / Air Export Route Schematic (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-paper border border-rule p-6 rounded-[2px] shadow-[0_1px_4px_rgba(15,27,36,0.02)] space-y-4">
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-semibold">
                  MULTIMODAL EXPORT CORRIDORS
                </span>
                <span className="font-mono text-[10px] text-ink-3 uppercase">
                  DIRECT GATEWAYS
                </span>
              </div>

              {/* Hub Specifications */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 bg-porcelain border border-rule rounded-[2px] space-y-1">
                  <span className="text-[10px] text-accent-700 block uppercase font-bold">
                    OCEAN FREIGHT CORRIDORS
                  </span>
                  <span className="text-ink font-semibold block text-sm">
                    <DecryptedText text="JNPT (INNSA) · Mundra (INMUN)" animateOn="view" />
                  </span>
                  <p className="font-body text-xs text-ink-3">
                    Full Container Load (FCL) &amp; LCL consolidated cargo to Africa, LatAm, CIS &amp; SE Asia.
                  </p>
                </div>

                <div className="p-3.5 bg-porcelain border border-rule rounded-[2px] space-y-1">
                  <span className="text-[10px] text-accent-700 block uppercase font-bold">
                    AIR CARGO DISPATCH
                  </span>
                  <span className="text-ink font-semibold block text-sm">
                    <DecryptedText text="Mumbai Air (BOM) · Delhi (DEL)" animateOn="view" />
                  </span>
                  <p className="font-body text-xs text-ink-3">
                    Temperature-controlled air freight for emergency orders, vaccines, and cold-chain injectables.
                  </p>
                </div>
              </div>

              {/* Cold Chain & Packaging Safeguards */}
              <div className="space-y-2 pt-2 border-t border-rule">
                <span className="font-mono text-xs text-ink font-semibold block uppercase tracking-wider">
                  TRANSIT INTEGRITY SAFEGUARDS
                </span>
                <ul className="space-y-2 font-body text-xs text-ink-2">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-700 font-bold">•</span>
                    <span>Continuous temperature data loggers (2°C–8°C / 15°C–25°C) in cold-chain consignments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-700 font-bold">•</span>
                    <span>Heavy-gauge 7-ply export corrugated cartons with inner moisture barrier liners.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-700 font-bold">•</span>
                    <span>ISPM-15 fumigated heat-treated pallets with heavy gauge stretch shrink wrapping.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Incoterms Inspector & Interactive Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Horizontal Incoterm Tabs */}
            <div className="grid grid-cols-4 gap-2">
              {INCOTERMS.map((term, idx) => (
                <button
                  key={term.term}
                  type="button"
                  onClick={() => setSelectedTermIndex(idx)}
                  className={clsx(
                    "p-3 rounded-[2px] border text-center transition-all cursor-pointer font-mono",
                    selectedTermIndex === idx
                      ? "bg-accent-700 text-porcelain border-accent-700 shadow-xs"
                      : "bg-paper text-ink-2 border-rule hover:border-accent-700/60 hover:text-ink"
                  )}
                >
                  <span className="text-base font-bold block">{term.term}</span>
                  <span className="text-[10px] uppercase opacity-80 block truncate">
                    {term.scope.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* SpotlightCard for Active Incoterm */}
            <SpotlightCard
              spotlightColor="rgba(198, 156, 109, 0.12)"
              className="p-6 sm:p-8 space-y-5 shadow-[0_4px_24px_rgba(15,27,36,0.04)]"
            >
              <div className="flex items-start justify-between border-b border-rule pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-lg font-bold text-accent-700">
                      {activeTerm.term}
                    </span>
                    <span className="text-rule">|</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-3">
                      INCOTERMS® 2020
                    </span>
                    {activeTerm.recommended && (
                      <span className="font-mono text-[9px] bg-accent-700/10 text-accent-700 font-bold px-2 py-0.5 rounded-[1px]">
                        RECOMMENDED FOR EXPORT
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-light text-ink">
                    {activeTerm.title}
                  </h3>
                  <span className="font-mono text-xs text-ink-3 block mt-0.5">
                    Terminal Point: {activeTerm.scope}
                  </span>
                </div>
              </div>

              <p className="font-body text-sm text-ink-2 leading-relaxed">
                {activeTerm.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-rule">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-3 block font-semibold">
                  OPERATIONAL COMMITMENTS:
                </span>
                <ul className="space-y-2">
                  {activeTerm.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs font-body text-ink-2">
                      <span className="w-4 h-4 rounded-full bg-accent-700/10 text-accent-700 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Markets Served Footnote */}
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
