"use client";

import React, { useState } from "react";
import { company } from "@/config/company";
import { clsx } from "clsx";

export function RegistryCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Check if any registry numbers exist in config
  const hasRegistryData = Boolean(
    company.cin ||
    company.gstin ||
    company.iec ||
    company.rcmcNumber ||
    company.drugLicenceNumbers.length > 0
  );

  const foundingYearString = company.foundedYear ? `EST. ${company.foundedYear}` : "FOUNDED IN INDIA";

  return (
    <div className="space-y-4">
      {/* 3D Perspective Card Wrapper */}
      <div
        className="relative w-full max-w-xl mx-auto h-[320px] select-none"
        style={{ perspective: 1200 }}
      >
        <div
          className={clsx(
            "relative w-full h-full transition-transform duration-700 will-change-transform",
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Face: Company Overview */}
          <div
            aria-hidden={isFlipped}
            className="absolute inset-0 bg-porcelain border-2 border-accent-700/80 p-8 flex flex-col justify-between shadow-[0_12px_32px_rgba(15,27,36,0.08)] rounded-[2px]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-start justify-between border-b border-rule pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold block">
                  CORPORATE REGISTRY CARD
                </span>
                <h3 className="font-display text-2xl font-light text-ink mt-1">
                  {company.tradeName || "Shreevan Group"}
                </h3>
              </div>
              <span className="font-mono text-xs text-ink-3 bg-mist px-2.5 py-1">
                {foundingYearString}
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs text-ink-2">
              <p>
                <span className="text-ink-3 uppercase block text-[10px]">LEGAL ENTITY:</span>
                {company.legalName || company.tradeName}
              </p>
              <p>
                <span className="text-ink-3 uppercase block text-[10px]">OPERATIONS HUB:</span>
                {company.operationsAddress || "Mumbai, Maharashtra, India"}
              </p>
              <p>
                <span className="text-ink-3 uppercase block text-[10px]">EXPORT DESK:</span>
                {company.exportDeskEmail || company.email || "export@shreevangroup.com"}
              </p>
            </div>

            <div className="pt-3 border-t border-rule flex items-center justify-between font-mono text-[10px] text-ink-3">
              <span>MERCHANT EXPORTER STATUS</span>
              <span className="text-accent-700 font-bold">REPUBLIC OF INDIA</span>
            </div>
          </div>

          {/* Back Face: Statutory Registry Numbers */}
          <div
            aria-hidden={!isFlipped}
            className="absolute inset-0 bg-paper border-2 border-accent-700/80 p-8 flex flex-col justify-between shadow-[0_12px_32px_rgba(15,27,36,0.08)] [transform:rotateY(180deg)] rounded-[2px]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-start justify-between border-b border-rule pb-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold block">
                  STATUTORY FILINGS
                </span>
                <span className="font-display text-xl font-light text-ink mt-0.5 block">
                  Official Verification Codes
                </span>
              </div>
              <span className="font-mono text-xs text-accent-700 font-bold">
                DGFT / CDSCO
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div>
                <span className="text-[10px] text-ink-3 block">CIN</span>
                <span className="text-ink font-semibold">{company.cin || "On file"}</span>
              </div>
              <div>
                <span className="text-[10px] text-ink-3 block">GSTIN</span>
                <span className="text-ink font-semibold">{company.gstin || "On file"}</span>
              </div>
              <div>
                <span className="text-[10px] text-ink-3 block">IEC NUMBER</span>
                <span className="text-ink font-semibold">{company.iec || "On file"}</span>
              </div>
              <div>
                <span className="text-[10px] text-ink-3 block">RCMC NUMBER</span>
                <span className="text-ink font-semibold">{company.rcmcNumber || "On file"}</span>
              </div>
              {company.drugLicenceNumbers.length > 0 && (
                <div className="col-span-2">
                  <span className="text-[10px] text-ink-3 block">DRUG LICENCE NUMBERS</span>
                  <span className="text-ink">{company.drugLicenceNumbers.join(", ")}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-rule flex items-center justify-between font-mono text-[10px] text-ink-3">
              <span>STATUTORY VERIFICATION DESK</span>
              <span className="text-accent-700">ACTIVE CREDENTIALS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real Button Flip Control */}
      {hasRegistryData && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            aria-expanded={isFlipped}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-700 hover:text-ink font-semibold py-2 px-4 border border-accent-700/40 hover:bg-mist/60 transition-colors rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
          >
            <span>{isFlipped ? "← View Front Face" : "Flip to View Statutory Registry Numbers →"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
