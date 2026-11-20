"use client";

import React from "react";
import Image from "next/image";
import { Chapter } from "@/components/journey/Chapter";
import { Loupe } from "@/components/motion/Loupe";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { DecryptedText } from "@/components/motion/DecryptedText";

const CHECKPOINTS = [
  {
    id: "batch",
    label: "Batch Traceability",
    ref: "SG-EXP-24-0891",
    desc: "Direct audit trail to approved active pharmaceutical ingredient (API) lots and retained counter-samples.",
  },
  {
    id: "dates",
    label: "Shelf Life & Climatic Zones",
    ref: "36 Months (Zone IVb)",
    desc: "Stability data verifying formulation integrity in hot and humid export markets across Africa and SE Asia.",
  },
  {
    id: "assay",
    label: "HPLC Potency Assay",
    ref: "99.8% (BP: 95–105%)",
    desc: "High-performance liquid chromatography assay confirming finished formulation potency within international limits.",
  },
  {
    id: "dissolution",
    label: "Dissolution Profile",
    ref: "> 88% in 30 min (NLT 80%)",
    desc: "In vitro release kinetics ensuring predictable therapeutic bioavailability after administration.",
  },
  {
    id: "microbial",
    label: "Microbial Purity",
    ref: "TAMC < 10² CFU/g",
    desc: "Total aerobic microbial count and pathogen screening compliant with destination pharmacopoeias.",
  },
];

export function CH03Quality() {
  return (
    <Chapter
      index={3}
      id="chapter-quality"
      title="Quality"
      docId="gmp"
    >
      <div className="w-full flex flex-col justify-between gap-8">
        {/* Chapter Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-03 / QUALITY ASSURANCE
            </span>
            <span className="text-rule">|</span>
            <h2 className="font-display text-2xl lg:text-3xl font-light text-ink">
              Batch-Wise Analytical Verification
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              QC PROTOCOL: 5 CHECKPOINTS VERIFIED
            </span>
          </div>
        </div>

        {/* Main Content Grid: COA Sheet (Left 7) and Explanatory Checklist (Right 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-2">
          {/* Left Column: Sample Certificate of Analysis with SpotlightCard */}
          <div className="lg:col-span-7">
            <SpotlightCard
              spotlightColor="rgba(198, 156, 109, 0.12)"
              className="p-6 relative shadow-[0_4px_24px_rgba(15,27,36,0.04)]"
            >
              {/* Background Logo Watermark Seal */}
              <div
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.04] select-none"
                aria-hidden="true"
              >
                <Image
                  src="/brand/logo.png"
                  alt=""
                  width={200}
                  height={128}
                  className="w-full h-auto object-contain"
                />
              </div>

              <Loupe>
                <div className="space-y-4">
                  {/* Document Header */}
                  <div className="border-b border-rule pb-3 flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-700 block font-semibold">
                        QC LABORATORY · CERTIFICATE OF ANALYSIS
                      </span>
                      <span className="font-display text-lg text-ink font-light">
                        Amoxicillin &amp; Potassium Clavulanate Tablets BP
                      </span>
                    </div>
                    <div className="text-right font-mono text-[11px] text-ink-3">
                      <span>
                        <DecryptedText text="COA NO: SG-COA-891" animateOn="view" />
                      </span>
                      <span className="block text-emerald-800 font-bold tracking-wider">RELEASED</span>
                    </div>
                  </div>

                  {/* Batch Metadata Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-rule pb-3 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-ink-3 block">BATCH NUMBER</span>
                      <span className="text-ink font-semibold">
                        <DecryptedText text="SG-EXP-24-0891" animateOn="view" />
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-3 block">MFG DATE</span>
                      <span className="text-ink">03/2024</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-3 block">EXP DATE</span>
                      <span className="text-ink">02/2027</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-3 block">BATCH SIZE</span>
                      <span className="text-ink">100,000 Strips</span>
                    </div>
                  </div>

                  {/* Analytical Test Results Table */}
                  <div
                    tabIndex={0}
                    role="region"
                    aria-label="Certificate of Analysis analytical test results table"
                    className="overflow-x-auto focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent-700"
                  >
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-rule text-ink-3 text-[10px] uppercase tracking-wider">
                          <th className="py-1.5 font-normal">Test Parameter</th>
                          <th className="py-1.5 font-normal">Specification (BP)</th>
                          <th className="py-1.5 font-normal">Found Result</th>
                          <th className="py-1.5 font-normal text-right">Verdict</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rule/60 text-ink-2">
                        <tr>
                          <td className="py-2 text-ink font-medium">Assay (Amoxicillin)</td>
                          <td className="py-2">95.0% – 105.0%</td>
                          <td className="py-2 font-semibold text-accent-700">99.8%</td>
                          <td className="py-2 text-right text-emerald-800 font-bold">Pass</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-ink font-medium">Assay (Clavulanic Acid)</td>
                          <td className="py-2">90.0% – 110.0%</td>
                          <td className="py-2 font-semibold text-accent-700">101.2%</td>
                          <td className="py-2 text-right text-emerald-800 font-bold">Pass</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-ink font-medium">Dissolution (30 min)</td>
                          <td className="py-2">NLT 80%</td>
                          <td className="py-2 font-semibold text-accent-700">88.4%</td>
                          <td className="py-2 text-right text-emerald-800 font-bold">Pass</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-ink font-medium">Uniformity of Dosage</td>
                          <td className="py-2">AV &lt; 15.0</td>
                          <td className="py-2">AV = 4.2</td>
                          <td className="py-2 text-right text-emerald-800 font-bold">Pass</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-ink font-medium">Microbial Limit (TAMC)</td>
                          <td className="py-2">&lt; 10³ CFU/g</td>
                          <td className="py-2">&lt; 10² CFU/g</td>
                          <td className="py-2 text-right text-emerald-800 font-bold">Pass</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-rule font-mono text-[10px] text-ink-3">
                    <span>Authorized QC Signatory: Licensed Partner QC Head</span>
                    <span>Methodology: British Pharmacopoeia (BP)</span>
                  </div>
                </div>
              </Loupe>
            </SpotlightCard>
          </div>

          {/* Right Column: Laboratory Checklist Ledger */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold">
                MANDATORY BATCH VERIFICATION
              </span>
              <h3 className="font-display text-xl text-ink font-light">
                Every Consignment Re-Tested Before Port Lading
              </h3>
              <p className="font-body text-sm text-ink-2 leading-relaxed">
                We bridge Indian manufacturing standards with the specific regulatory pharmacopeias required by recipient health ministries.
              </p>
            </div>

            {/* Checkpoint Checklist Ledger */}
            <div className="space-y-2.5">
              {CHECKPOINTS.map((cp, idx) => (
                <div
                  key={cp.id}
                  className="p-3.5 bg-paper/60 border border-rule hover:border-accent-700/60 transition-colors rounded-[2px] flex items-start gap-3 group"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-600/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700 font-mono text-[11px] font-bold">
                    ✓
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-ink font-semibold group-hover:text-accent-700 transition-colors">
                        0{idx + 1} / {cp.label}
                      </span>
                      <span className="font-mono text-xs text-accent-700 font-medium">
                        {cp.ref}
                      </span>
                    </div>
                    <p className="font-body text-xs text-ink-3 leading-normal">
                      {cp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-rule pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink-3">
          <span>
            Testing performed in partner QC facilities audited under Good Laboratory Practices (cGLP).
          </span>
          <span>
            Original counter-signed COA dispatched inside shipping document packet.
          </span>
        </div>
      </div>
    </Chapter>
  );
}
