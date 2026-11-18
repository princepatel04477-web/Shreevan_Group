"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EXPORT_DOCUMENTS, ExportDocumentItem } from "@/content/export";
import { clsx } from "clsx";

export function DocRowDrawer() {
  const [selectedId, setSelectedId] = useState<string>(EXPORT_DOCUMENTS[0]?.code ?? "");

  const selectedDoc = EXPORT_DOCUMENTS.find((d) => d.code === selectedId) ?? EXPORT_DOCUMENTS[0];

  const toggleDoc = (code: string) => {
    setSelectedId(code);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column (7 cols): Ruled Document Rows */}
      <div className="lg:col-span-7 border border-rule bg-porcelain divide-y divide-rule rounded-[2px] shadow-[0_2px_8px_rgba(15,27,36,0.03)]">
        {EXPORT_DOCUMENTS.map((doc: ExportDocumentItem, idx: number) => {
          const isSelected = selectedId === doc.code;
          const panelId = `doc-panel-${doc.code.toLowerCase()}`;
          const triggerId = `doc-trigger-${doc.code.toLowerCase()}`;

          return (
            <div key={doc.code} className="transition-colors">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isSelected}
                aria-controls={panelId}
                onClick={() => toggleDoc(doc.code)}
                className={clsx(
                  "w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 outline-none focus-visible:ring-2 focus-visible:ring-accent-700 transition-colors",
                  isSelected
                    ? "bg-mist/40 border-l-4 border-accent-700"
                    : "hover:bg-paper/60 border-l-4 border-transparent"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-accent-700 font-bold">
                      {doc.code}
                    </span>
                    <span className="text-rule">|</span>
                    <span className="font-mono text-[10px] text-ink-3 uppercase">
                      DOC 0{idx + 1}/07
                    </span>
                  </div>
                  <span className="font-display text-base sm:text-lg text-ink font-normal block">
                    {doc.title}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block font-mono text-xs text-ink-3">
                    {isSelected ? "Active Sheet" : "Inspect"}
                  </span>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "font-mono text-xs transition-transform duration-200",
                      isSelected ? "text-accent-700 font-bold rotate-90" : "text-ink-3"
                    )}
                  >
                    →
                  </span>
                </div>
              </button>

              {/* Mobile View: Inline expandable detail below 1024px */}
              <div className="lg:hidden">
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden border-t border-rule bg-paper p-5 space-y-4 text-xs font-mono"
                    >
                      <div>
                        <span className="text-[10px] text-ink-3 uppercase block mb-1">
                          ISSUING AUTHORITY:
                        </span>
                        <span className="text-ink font-medium text-sm">
                          {doc.issuer}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-ink-3 uppercase block mb-1">
                          WHEN REQUIRED:
                        </span>
                        <p className="font-body text-ink-2">
                          {doc.whenNeeded}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-ink-3 uppercase block mb-1">
                          REGULATORY PURPOSE:
                        </span>
                        <p className="font-body text-ink-2">
                          {doc.purpose}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column (5 cols, Desktop): Active Document Sheet View */}
      <div className="hidden lg:block lg:col-span-5 sticky top-28">
        <AnimatePresence mode="wait">
          {selectedDoc && (
            <motion.div
              key={selectedDoc.code}
              id={`doc-panel-${selectedDoc.code.toLowerCase()}`}
              role="region"
              aria-labelledby={`doc-trigger-${selectedDoc.code.toLowerCase()}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="bg-porcelain border-2 border-accent-700/80 p-8 shadow-[0_12px_32px_rgba(15,27,36,0.08)] space-y-6 rounded-[2px]"
            >
              {/* Paper Document Header */}
              <div className="border-b border-rule pb-4 flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-700 font-bold block">
                    STATUTORY EXPORT INSTRUMENT
                  </span>
                  <span className="font-display text-2xl font-light text-ink block mt-1">
                    {selectedDoc.title}
                  </span>
                </div>
                <span className="font-mono text-xs text-accent-700 font-bold bg-mist px-2 py-1">
                  {selectedDoc.code}
                </span>
              </div>

              {/* Metadata Fields */}
              <div className="space-y-4 font-mono text-xs">
                <div className="border-b border-rule/60 pb-3">
                  <span className="text-[10px] text-ink-3 uppercase tracking-wider block mb-1">
                    ISSUING ENTITY
                  </span>
                  <span className="text-ink font-semibold text-sm">
                    {selectedDoc.issuer}
                  </span>
                </div>

                <div className="border-b border-rule/60 pb-3">
                  <span className="text-[10px] text-ink-3 uppercase tracking-wider block mb-1">
                    DEPLOYMENT TIMING
                  </span>
                  <p className="font-body text-ink-2 leading-relaxed text-sm">
                    {selectedDoc.whenNeeded}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-ink-3 uppercase tracking-wider block mb-1">
                    REGULATORY FUNCTION
                  </span>
                  <p className="font-body text-ink-2 leading-relaxed text-sm">
                    {selectedDoc.purpose}
                  </p>
                </div>
              </div>

              {/* Document Seal Line */}
              <div className="pt-4 border-t border-rule flex items-center justify-between font-mono text-[10px] text-ink-3">
                <span>VERIFIED BATCH DOSSIER</span>
                <span className="text-accent-700">SHREEVAN GROUP EXPORT DESK</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
