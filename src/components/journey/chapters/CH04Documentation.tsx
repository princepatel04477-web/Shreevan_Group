"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Chapter } from "@/components/journey/Chapter";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { DecryptedText } from "@/components/motion/DecryptedText";
import { clsx } from "clsx";

const EXPORT_DOCUMENTS = [
  {
    id: "copp",
    title: "Certificate of Pharmaceutical Product (COPP)",
    code: "SG-DOC-01",
    issuer: "CDSCO (WHO Format Guidelines)",
    authorityType: "GOVERNMENT REGULATOR",
    purpose: "Ministry of Health statutory submission certifying product registration and marketing authorization in India.",
    requirements: [
      "Issued in standard WHO model format with English translation",
      "Confirms manufacturer licensing under Schedule M / GMP",
      "Attests formulation formula and qualitative composition",
    ],
  },
  {
    id: "coa",
    title: "Certificate of Analysis (COA)",
    code: "SG-DOC-02",
    issuer: "QC Laboratory (Licensed Partner)",
    authorityType: "ACCREDITED LABORATORY",
    purpose: "Batch-wise analytical release showing assay, dissolution profile, related substances, and microbial limits.",
    requirements: [
      "Tested against BP, USP, or IP compendial monograph",
      "Signed by approved Government Quality Assurance Analyst",
      "Counter-samples retained for stability auditing",
    ],
  },
  {
    id: "gmp",
    title: "Manufacturer GMP Certificate",
    code: "SG-DOC-03",
    issuer: "State Licensing Authority / WHO Inspectorate",
    authorityType: "REGULATORY INSPECTORATE",
    purpose: "Current Good Manufacturing Practices certification validating partner production facility compliance.",
    requirements: [
      "Site master file reference included",
      "Clean inspection history with zero critical 483-equivalent observations",
      "Covers all authorized dosage formulation sections",
    ],
  },
  {
    id: "fsc",
    title: "Free Sale Certificate (FSC)",
    code: "SG-DOC-04",
    issuer: "State Licensing Authority / DCGI",
    authorityType: "STATUTORY HEALTH AUTHORITY",
    purpose: "Attestation that the pharmaceutical formulation is freely sold in the Indian domestic market without restriction.",
    requirements: [
      "Proves therapeutic commercial validity in country of origin",
      "Apostille / Embassy legalization arranged for target jurisdiction",
      "Indicates valid manufacturing license renewal status",
    ],
  },
  {
    id: "invoice",
    title: "Commercial Invoice & Packing List",
    code: "SG-DOC-05",
    issuer: "Shreevan Export Logistics Desk",
    authorityType: "EXPORT CUSTOMS ISSUER",
    purpose: "Statutory customs declaration detailing HS codes, batch numbers, net/gross weights, and FOB/CIF valuations.",
    requirements: [
      "Includes 8-digit ITC-HS codes for duty exemption",
      "Exact batch weight and carton dimension breakdown",
      "Certified under Indian Customs EDI shipping bill gateway",
    ],
  },
  {
    id: "origin",
    title: "Certificate of Origin (Non-Preferential)",
    code: "SG-DOC-06",
    issuer: "Chamber of Commerce / DGFT Authority",
    authorityType: "TRADE & COMMERCE DESK",
    purpose: "Authoritative certification of Indian nationality required for preferential import tariff assessment.",
    requirements: [
      "Digitally verified via DGFT trade facilitation portal",
      "Authorized Chamber of Commerce seal & signature",
      "Compliant with destination country bilateral trade treaties",
    ],
  },
];

export function CH04Documentation() {
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const activeDoc = EXPORT_DOCUMENTS[selectedDocIndex] ?? EXPORT_DOCUMENTS[0];
  if (!activeDoc) return null;

  return (
    <Chapter
      index={4}
      id="chapter-documentation"
      title="Documentation"
      docId="copp"
    >
      <div className="w-full flex flex-col justify-between gap-8">
        {/* Chapter Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-04 / DOCUMENTATION &amp; REGISTRATION
            </span>
            <span className="text-rule">|</span>
            <h2 className="font-display text-2xl lg:text-3xl font-light text-ink">
              The Regulatory Export Dossier Stack
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-700 animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              6 STATUTORY INSTRUMENTS COMPLETE
            </span>
          </div>
        </div>

        {/* Intro Text */}
        <div className="max-w-3xl">
          <p className="font-body text-sm sm:text-base text-ink-2 leading-relaxed">
            International pharmaceutical imports require flawless regulatory paperwork. We coordinate
            the complete export documentation stack required by drug regulatory authorities and port customs
            officers worldwide.
          </p>
        </div>

        {/* Asymmetric Dossier Desk: Left Document Roster, Right Spotlight Dossier View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-2">
          {/* Left Column: Interactive Document Docket Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-3 font-semibold">
                EXPORT DOSSIER REGISTRATION
              </span>
              <span className="font-mono text-[10px] text-ink-3">
                SELECT INSTRUMENT
              </span>
            </div>

            <div className="space-y-2">
              {EXPORT_DOCUMENTS.map((doc, idx) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setSelectedDocIndex(idx)}
                  className={clsx(
                    "w-full text-left p-3.5 rounded-[2px] border transition-all duration-150 flex items-center justify-between group cursor-pointer",
                    selectedDocIndex === idx
                      ? "bg-paper border-accent-700 shadow-2xs"
                      : "bg-paper/40 border-rule/70 hover:border-rule hover:bg-paper"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          "font-mono text-xs font-bold",
                          selectedDocIndex === idx ? "text-accent-700" : "text-ink-3"
                        )}
                      >
                        {doc.code}
                      </span>
                      <span className="text-rule font-mono text-xs">|</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3">
                        {doc.authorityType}
                      </span>
                    </div>
                    <span
                      className={clsx(
                        "font-display text-base block transition-colors leading-tight",
                        selectedDocIndex === idx
                          ? "text-ink font-normal"
                          : "text-ink-2 group-hover:text-ink font-light"
                      )}
                    >
                      {doc.title}
                    </span>
                  </div>

                  <span
                    className={clsx(
                      "text-xs transition-transform duration-150 shrink-0 ml-2",
                      selectedDocIndex === idx
                        ? "text-accent-700 translate-x-0.5"
                        : "text-ink-3/40 group-hover:translate-x-0.5"
                    )}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: SpotlightCard Detailed Dossier Instrument (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard
              spotlightColor="rgba(198, 156, 109, 0.12)"
              className="p-6 sm:p-8 space-y-6 relative shadow-[0_4px_24px_rgba(15,27,36,0.04)]"
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

              {/* Instrument Header */}
              <div className="flex items-start justify-between border-b border-rule pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-accent-700 tracking-wider">
                      <DecryptedText text={activeDoc.code} animateOn="view" />
                    </span>
                    <span className="text-rule">|</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-[1px] border border-emerald-600/30">
                      REGISTRATION READY
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-light text-ink">
                    {activeDoc.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-ink-3 uppercase block">
                    DOC 0{selectedDocIndex + 1}/06
                  </span>
                </div>
              </div>

              {/* Issuing Authority & Regulatory Scope */}
              <div className="p-4 bg-paper rounded-[2px] border border-rule/80 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3 block">
                  STATUTORY ISSUING AUTHORITY:
                </span>
                <span className="font-mono text-sm text-ink font-semibold block">
                  {activeDoc.issuer}
                </span>
                <p className="font-body text-xs text-ink-2 leading-relaxed pt-1">
                  {activeDoc.purpose}
                </p>
              </div>

              {/* Compliance & Audit Checkpoints */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-3 block font-semibold">
                  MANDATORY REGULATORY VERIFICATIONS:
                </span>
                <ul className="space-y-2">
                  {activeDoc.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 text-xs font-body text-ink-2">
                      <span className="w-4 h-4 rounded-full bg-accent-700/10 text-accent-700 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-rule flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/quality#documents"
                  className="font-mono text-xs text-accent-700 uppercase tracking-wider font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Quality Documentation Suite</span>
                  <span>→</span>
                </Link>

                <Link
                  href={`/contact?type=rfq&document=${encodeURIComponent(activeDoc.title)}`}
                  className="px-4 py-2 bg-ink text-paper rounded-[2px] font-mono text-xs uppercase tracking-wider hover:bg-accent-700 transition-colors font-semibold"
                >
                  Request Sample Specimen →
                </Link>
              </div>
            </SpotlightCard>
          </div>
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
