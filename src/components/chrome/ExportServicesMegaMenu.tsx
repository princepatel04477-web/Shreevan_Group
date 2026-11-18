"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, FileCheck, Anchor, ShieldCheck, ThermometerSnowflake } from "lucide-react";

interface ExportServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ExportServicesMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: ExportServicesMegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      id="export-services-mega-menu"
      role="region"
      aria-label="Export Services Directory"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 right-0 w-full bg-porcelain border-b border-rule shadow-xl z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Incoterms & Dispatch */}
          <div className="p-4 bg-paper rounded-[2px] border border-rule/70 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-[2px] bg-mist flex items-center justify-center text-accent-700 mb-3 border border-rule/80">
                <Anchor className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink mb-2">
                Incoterms & Freight
              </h3>
              <p className="text-xs text-ink-2 leading-relaxed mb-3">
                EXW, FOB, CIF, and CIP commercial terms with ocean and air dispatch from Indian commercial trade ports.
              </p>
              <ul className="space-y-1 text-xs text-ink-3 font-mono">
                <li>· FCL / LCL Ocean Cargo</li>
                <li>· Expedited Air Freight</li>
                <li>· Palletized & Shrink-Wrapped</li>
              </ul>
            </div>
            <Link
              href="/export-services#freight"
              onClick={onClose}
              className="mt-4 pt-3 border-t border-rule/60 text-xs font-mono text-accent-700 hover:underline flex items-center gap-1"
            >
              <span>Shipping terms</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

          {/* Card 2: Regulatory Documentation */}
          <div className="p-4 bg-paper rounded-[2px] border border-rule/70 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-[2px] bg-mist flex items-center justify-center text-accent-700 mb-3 border border-rule/80">
                <FileCheck className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink mb-2">
                Export Documentation
              </h3>
              <p className="text-xs text-ink-2 leading-relaxed mb-3">
                Complete compliance dossier accompanying every export consignment for customs release and regulatory clearance.
              </p>
              <ul className="space-y-1 text-xs text-ink-3 font-mono">
                <li>· Batch-wise COA & Specs</li>
                <li>· Licensed GMP & COPP (WHO format)</li>
                <li>· Free Sale Certificates (FSC)</li>
                <li>· CTD / ACTD Technical Dossiers</li>
              </ul>
            </div>
            <Link
              href="/quality#documents"
              onClick={onClose}
              className="mt-4 pt-3 border-t border-rule/60 text-xs font-mono text-accent-700 hover:underline flex items-center gap-1"
            >
              <span>Inspect documents</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

          {/* Card 3: Institutional Tenders */}
          <div className="p-4 bg-paper rounded-[2px] border border-rule/70 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-[2px] bg-mist flex items-center justify-center text-accent-700 mb-3 border border-rule/80">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink mb-2">
                Tenders & Institutions
              </h3>
              <p className="text-xs text-ink-2 leading-relaxed mb-3">
                Bulk pharmaceutical supply structured for Ministry of Health tenders, NGO emergency aid, and regional hospital formularies.
              </p>
              <ul className="space-y-1 text-xs text-ink-3 font-mono">
                <li>· Tender Documentation Packets</li>
                <li>· Institutional Bulk Packaging</li>
                <li>· Destination Language Labelling</li>
              </ul>
            </div>
            <Link
              href="/contact?type=rfq"
              onClick={onClose}
              className="mt-4 pt-3 border-t border-rule/60 text-xs font-mono text-accent-700 hover:underline flex items-center gap-1"
            >
              <span>Submit tender RFP</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

          {/* Card 4: Cold Chain & Logistics */}
          <div className="p-4 bg-paper rounded-[2px] border border-rule/70 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-[2px] bg-mist flex items-center justify-center text-accent-700 mb-3 border border-rule/80">
                <ThermometerSnowflake className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink mb-2">
                Cold Chain Assurance
              </h3>
              <p className="text-xs text-ink-2 leading-relaxed mb-3">
                Continuous temperature monitoring and validated insulation for biologics, injectables, and heat-sensitive formulations.
              </p>
              <ul className="space-y-1 text-xs text-ink-3 font-mono">
                <li>· 2°C – 8°C & 15°C – 25°C Monitoring</li>
                <li>· Single/Multi-Use Data Loggers</li>
                <li>· Validated Cold Boxes & Reefers</li>
              </ul>
            </div>
            <Link
              href="/quality#coldchain"
              onClick={onClose}
              className="mt-4 pt-3 border-t border-rule/60 text-xs font-mono text-accent-700 hover:underline flex items-center gap-1"
            >
              <span>Cold chain specs</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-8 pt-4 border-t border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ink-2">
          <span className="font-medium">
            Every shipment leaves with verified paperwork and complete batch traceability.
          </span>
          <Link
            href="/quality"
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-wider text-accent-700 hover:text-accent-500 flex items-center gap-1.5 font-semibold"
          >
            <span>Review Quality & Documentation Framework</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
