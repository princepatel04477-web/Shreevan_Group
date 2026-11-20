"use client";

import React from "react";
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
            <span className="w-2 h-2 rounded-full bg-accent-700" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              INDIAN OUTBOUND HUBS: JNPT / MUNDRA / BOM
            </span>
          </div>
        </div>

        {/* Middle Section: Route Graphic & Incoterms Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-2">
          {/* Maritime / Air Export Route Schematic (5 cols) */}
          <div className="lg:col-span-5 bg-paper border border-rule p-6 rounded-[2px] shadow-[0_1px_4px_rgba(15,27,36,0.02)] space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-semibold">
                MULTIMODAL EXPORT CORRIDORS
              </span>
              <span className="font-mono text-[10px] text-ink-3 uppercase">
                DIRECT PORTS
              </span>
            </div>

            {/* Hub Specifications */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-porcelain border border-rule rounded-[2px]">
                <span className="text-[10px] text-accent-700 block uppercase font-bold">OCEAN FREIGHT</span>
                <span className="text-ink font-semibold">Nhava Sheva (JNPT) · Mundra Port</span>
                <p className="font-body text-[11px] text-ink-3 mt-1">Full Container Load (FCL) &amp; LCL consolidated cargo to Africa, LatAm, CIS &amp; SE Asia.</p>
              </div>

              <div className="p-3 bg-porcelain border border-rule rounded-[2px]">
                <span className="text-[10px] text-accent-700 block uppercase font-bold">AIR CARGO DISPATCH</span>
                <span className="text-ink font-semibold">Mumbai Air Cargo (BOM) · Delhi (DEL)</span>
                <p className="font-body text-[11px] text-ink-3 mt-1">Temperature-controlled air freight for emergency orders, vaccines, and cold-chain injectables.</p>
              </div>
            </div>

            {/* Cold Chain & Packaging Safeguards */}
            <div className="space-y-2 pt-2 border-t border-rule">
              <span className="font-mono text-xs text-ink font-semibold block uppercase tracking-wider">
                TRANSIT INTEGRITY SAFEGUARDS
              </span>
              <ul className="space-y-1.5 font-body text-xs text-ink-2">
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
                className="bg-paper border border-rule p-5 space-y-3 hover:border-accent-700/60 transition-colors shadow-[0_1px_4px_rgba(15,27,36,0.02)] rounded-[2px]"
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
