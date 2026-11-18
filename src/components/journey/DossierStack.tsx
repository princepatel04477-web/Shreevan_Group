"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useJourney, DocId } from "@/lib/journey";
import { clsx } from "clsx";

interface DocumentMeta {
  id: DocId;
  title: string;
  code: string;
  issuer: string;
  whenNeeded: string;
  seededRotation: number;
}

const ALL_DOCUMENTS: DocumentMeta[] = [
  {
    id: "product-list",
    title: "Product List & Specification",
    code: "SG-DOC-01",
    issuer: "Technical Directorate",
    whenNeeded: "Initial dossier review, regulatory cross-check, and tender qualification.",
    seededRotation: -2.4,
  },
  {
    id: "coa",
    title: "Certificate of Analysis (COA)",
    code: "SG-DOC-02",
    issuer: "QC Laboratory (GMP Certified Partner)",
    whenNeeded: "With every commercial batch for port quarantine clearance and release.",
    seededRotation: 1.8,
  },
  {
    id: "gmp",
    title: "Manufacturer GMP Certificate",
    code: "SG-DOC-03",
    issuer: "State Licensing Authority / WHO Inspectorate",
    whenNeeded: "Submitted to foreign Ministry of Health during initial product registration.",
    seededRotation: -1.2,
  },
  {
    id: "copp",
    title: "Certificate of Pharmaceutical Product",
    code: "SG-DOC-04",
    issuer: "CDSCO (WHO Format)",
    whenNeeded: "Authoritative proof of registration and marketing authorization in India.",
    seededRotation: 2.8,
  },
  {
    id: "invoice",
    title: "Commercial Invoice & Packing List",
    code: "SG-DOC-05",
    issuer: "Shreevan Export Logistics Desk",
    whenNeeded: "Required by customs for vessel lading, port clearance, and letter of credit.",
    seededRotation: -2.0,
  },
  {
    id: "origin",
    title: "Certificate of Origin",
    code: "SG-DOC-06",
    issuer: "Chamber of Commerce / DGFT Authority",
    whenNeeded: "Tariff preference verification and entry customs assessment.",
    seededRotation: 1.5,
  },
];

export function DossierStack({ className }: { className?: string }) {
  const docsCollected = useJourney((s) => s.docsCollected);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<DocId | null>(null);

  // Close overlay on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedDocId) {
          setSelectedDocId(null);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedDocId]);

  const collectedList = ALL_DOCUMENTS.filter((d) =>
    docsCollected.includes(d.id)
  );

  return (
    <>
      {/* Fixed Paper Pile Container */}
      <aside
        className={clsx(
          "fixed z-30 select-none",
          // Desktop: fixed right edge centered
          "hidden md:block right-6 top-1/2 -translate-y-1/2",
          className
        )}
        aria-label="Export Dossier Stack"
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 p-2"
        >
          {/* Paper pile container (120x156 sheets) */}
          <div className="relative w-[120px] h-[156px] flex items-center justify-center">
            {collectedList.length === 0 ? (
              // Empty stack wireframe
              <div className="w-full h-full border border-dashed border-rule bg-paper/60 p-3 flex flex-col justify-between rounded-[0px]">
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-3">
                  DOSSIER STACK
                </span>
                <span className="font-mono text-[10px] text-ink-3 text-center">
                  0/6 DOCS
                </span>
                <span className="font-mono text-[9px] text-ink-3 text-right">
                  PENDING
                </span>
              </div>
            ) : (
              collectedList.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  layoutId={`sheet-${doc.id}`}
                  initial={{ y: -80, opacity: 0, scale: 0.9 }}
                  animate={{
                    y: idx * -2,
                    opacity: 1,
                    scale: 1,
                    rotate: doc.seededRotation,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                  style={{
                    zIndex: idx + 1,
                    transformOrigin: "bottom center",
                  }}
                  className="absolute inset-0 bg-porcelain border border-rule shadow-[0_2px_8px_rgba(15,27,36,0.06)] p-2.5 flex flex-col justify-between overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-accent-700 font-bold">
                      {doc.code}
                    </span>
                    {/* Small Ink Stamp */}
                    <span className="w-3.5 h-3.5 rounded-full border border-ink-stamp/60 text-ink-stamp flex items-center justify-center text-[7px] font-mono font-bold">
                      ✓
                    </span>
                  </div>

                  {/* Faux text lines */}
                  <div className="space-y-1 my-1">
                    <div className="h-[2px] w-full bg-rule/70" />
                    <div className="h-[2px] w-4/5 bg-rule/60" />
                    <div className="h-[2px] w-2/3 bg-rule/50" />
                  </div>

                  <p className="font-body text-[9px] text-ink font-medium leading-tight truncate">
                    {doc.title}
                  </p>
                </motion.div>
              ))
            )}
          </div>

          {/* Dossier Counter Badge */}
          <div className="mt-2.5 text-center font-mono text-[11px] text-ink-2 bg-porcelain border border-rule py-1 px-2 shadow-xs group-hover:border-accent-700 transition-colors">
            <span className="text-accent-700 font-bold">
              {docsCollected.length}
            </span>
            <span className="text-ink-3">/6 documents</span>
          </div>
        </button>
      </aside>

      {/* Mobile Mini Sheet Button */}
      <aside
        className={clsx(
          "fixed md:hidden z-30 bottom-6 right-6",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-porcelain border border-rule px-3.5 py-2 shadow-md flex items-center gap-2 font-mono text-xs text-ink rounded-[2px]"
        >
          <span className="w-2 h-2 rounded-full bg-accent-700" />
          <span>DOSSIER:</span>
          <span className="text-accent-700 font-bold">{docsCollected.length}/6</span>
        </button>
      </aside>

      {/* Full-Screen Fan-out Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dossier-fanout-title"
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 overflow-y-auto"
          >
            <div className="relative w-full max-w-6xl bg-paper border border-rule shadow-[0_24px_64px_rgba(15,27,36,0.2)] p-6 md:p-12 rounded-[0px]">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-rule gap-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-semibold block">
                    EXPORT BATCH DOSSIER
                  </span>
                  <h2
                    id="dossier-fanout-title"
                    className="font-display text-2xl md:text-3xl text-ink font-light mt-1"
                  >
                    The Six Export Verification Documents
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-ink-3">
                    {docsCollected.length} of 6 Collected
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-xs uppercase tracking-wider text-ink-2 hover:text-ink border border-rule px-3 py-1.5 bg-porcelain rounded-[2px]"
                  >
                    Close (Esc)
                  </button>
                </div>
              </div>

              {/* Fan-out 6-sheet Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {ALL_DOCUMENTS.map((doc) => {
                  const isCollected = docsCollected.includes(doc.id);

                  return (
                    <motion.div
                      key={doc.id}
                      layoutId={`sheet-${doc.id}`}
                      className={clsx(
                        "relative bg-porcelain border p-6 flex flex-col justify-between transition-all duration-200",
                        isCollected
                          ? "border-rule shadow-[0_4px_16px_rgba(15,27,36,0.06)]"
                          : "border-dashed border-rule/70 opacity-60 bg-paper/40"
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-rule">
                          <span className="font-mono text-xs font-bold text-accent-700">
                            {doc.code}
                          </span>
                          <span
                            className={clsx(
                              "font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border rounded-[2px]",
                              isCollected
                                ? "bg-accent-100 text-accent-700 border-accent-700/30"
                                : "bg-mist text-ink-3 border-rule"
                            )}
                          >
                            {isCollected ? "CLEARED" : "AWAITING CHAPTER"}
                          </span>
                        </div>

                        <h3 className="font-display text-lg text-ink font-medium mt-4">
                          {doc.title}
                        </h3>

                        <div className="mt-4 space-y-3 font-body text-xs text-ink-2">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3 block">
                              ISSUING AUTHORITY
                            </span>
                            <span className="font-medium text-ink">{doc.issuer}</span>
                          </div>

                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3 block">
                              PURPOSE & TIMING
                            </span>
                            <p className="leading-relaxed">{doc.whenNeeded}</p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Stamp or Placeholder Line */}
                      <div className="mt-6 pt-4 border-t border-dashed border-rule flex items-center justify-between font-mono text-[11px] text-ink-3">
                        <span>SHREEVAN DESK</span>
                        {isCollected ? (
                          <span className="text-ink-stamp font-bold">
                            ✓ VERIFIED SAMPLE
                          </span>
                        ) : (
                          <span>NOT YET CLEARED</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer Note */}
              <div className="mt-8 pt-6 border-t border-rule flex flex-col md:flex-row justify-between items-center text-xs font-mono text-ink-3 gap-2">
                <p>
                  Documents are compiled per consignment in strict adherence to licensed GMP standards.
                </p>
                <p className="text-accent-700 font-medium">
                  Verified as of 18 November 2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
