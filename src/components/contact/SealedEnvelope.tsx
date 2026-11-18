"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EnquiryPayload } from "@/lib/enquiry";

interface SealedEnvelopeProps {
  payload: EnquiryPayload;
  reference: string;
  isSubmitting: boolean;
  isComplete: boolean;
  onReset: () => void;
}

export function SealedEnvelope({
  payload,
  reference,
  isSubmitting,
  isComplete,
  onReset,
}: SealedEnvelopeProps) {
  const shouldReduceMotion = useReducedMotion();
  const [animPhase, setAnimPhase] = useState<"idle" | "folding" | "inserting" | "sealing" | "sliding" | "finished">("idle");

  useEffect(() => {
    if (!isSubmitting) return;

    const t0 = setTimeout(() => setAnimPhase("folding"), 50);
    const t1 = setTimeout(() => setAnimPhase("inserting"), 800);
    const t2 = setTimeout(() => setAnimPhase("sealing"), 1600);
    const t3 = setTimeout(() => setAnimPhase("sliding"), 2400);
    const t4 = setTimeout(() => setAnimPhase("finished"), 3200);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isSubmitting]);

  // If reduced motion is requested and completion is confirmed, show receipt directly
  const showReceipt = (shouldReduceMotion && isComplete) || animPhase === "finished";

  if (showReceipt) {
    return (
      <div
        className="w-full bg-[var(--porcelain)] border border-[var(--rule)] p-8 md:p-12 shadow-sm text-center relative overflow-hidden"
        role="region"
        aria-live="polite"
      >
        {/* Subtle decorative background watermarks */}
        <div aria-hidden="true" className="absolute top-4 right-4 text-xs font-mono tracking-widest text-[var(--ink-3)] uppercase select-none">
          OFFICIAL RECEIPT · SG-EX-REC
        </div>

        <div className="w-16 h-16 rounded-full bg-[var(--mist)] border border-[var(--accent-500)] text-[var(--accent-700)] flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--accent-700)] mb-2">
          ENQUIRY CLEARED &amp; SEALED
        </p>

        <h2 className="font-serif text-3xl md:text-4xl text-[var(--ink)] mb-4 font-light">
          Request Logged Successfully
        </h2>

        <div className="inline-block bg-[var(--mist)] border border-[var(--rule)] px-6 py-3 my-4 rounded-sm">
          <span className="text-xs uppercase font-mono text-[var(--ink-3)] block mb-1">
            Tracking Reference
          </span>
          <span className="font-mono text-xl md:text-2xl font-bold tracking-wider text-[var(--ink)]">
            {reference}
          </span>
        </div>

        <p className="text-[var(--ink-2)] text-base md:text-lg max-w-[48ch] mx-auto mt-2 mb-6">
          Our export desk will review your requirements and reply within 2 business days.
        </p>

        <div className="pt-6 border-t border-[var(--rule)] flex flex-wrap justify-center gap-4 text-xs font-mono text-[var(--ink-3)]">
          <div>Destination: <span className="text-[var(--ink)] font-medium">{payload.country}</span></div>
          <div>•</div>
          <div>Company: <span className="text-[var(--ink)] font-medium">{payload.company}</span></div>
          <div>•</div>
          <div>Sender: <span className="text-[var(--ink)] font-medium">{payload.name}</span></div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={onReset}
            className="px-6 py-3 text-xs font-mono uppercase tracking-widest bg-[var(--paper)] hover:bg-[var(--mist)] border border-[var(--rule)] text-[var(--ink)] transition-colors rounded-[2px]"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  // Animation Stage view
  return (
    <div
      className="w-full min-h-[420px] flex flex-col items-center justify-center p-8 bg-[var(--mist)]/40 border border-[var(--rule)] rounded-[2px] relative overflow-hidden"
      aria-label="Enquiry sealing animation"
    >
      <div className="w-72 md:w-80 h-52 relative [perspective:1200px]">
        {/* Step 1: Folding Sheet */}
        <motion.div
          className="absolute inset-0 bg-[var(--paper)] border border-[var(--rule)] shadow-md p-4 text-[10px] font-mono [transform-style:preserve-3d]"
          initial={false}
          animate={
            animPhase === "folding" || animPhase === "inserting" || animPhase === "sealing" || animPhase === "sliding"
              ? {
                  rotateX: [0, 45, 90, 140, 180],
                  scale: [1, 0.9, 0.75, 0.6],
                  y: [0, -20, 20, 50],
                  opacity: [1, 1, 0.8, 0],
                }
              : { rotateX: 0, scale: 1, y: 0, opacity: 1 }
          }
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div className="border-b border-[var(--rule)] pb-1 mb-2 font-bold text-[var(--ink)] flex justify-between">
            <span>REQUEST FOR QUOTATION</span>
            <span>SG-EX</span>
          </div>
          <div className="text-[var(--ink-3)] space-y-1">
            <div>Company: {payload.company || "Pending"}</div>
            <div>Market: {payload.country || "Global"}</div>
            <div>Applicant: {payload.name || "Commercial Officer"}</div>
          </div>
          <div className="mt-4 pt-2 border-t border-dashed border-[var(--rule)] text-[var(--accent-700)]">
            [CONFIDENTIAL COMMODITY DOSSIER]
          </div>
        </motion.div>

        {/* Step 2: SVG Envelope */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, y: 30 }}
          animate={
            animPhase === "inserting" || animPhase === "sealing"
              ? { opacity: 1, y: 0 }
              : animPhase === "sliding"
              ? { opacity: 0, x: 200, y: -20 }
              : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6 }}
        >
          <svg className="w-72 h-44 drop-shadow-lg" viewBox="0 0 320 200" fill="none">
            {/* Envelope Body */}
            <rect x="10" y="10" width="300" height="180" rx="4" fill="#F7F6F2" stroke="#D9DDDA" strokeWidth="2" />
            
            {/* Interior shadow */}
            <path d="M10 190L160 90L310 190" stroke="#D9DDDA" strokeWidth="2" fill="#EEF1F0" />
            
            {/* Flap */}
            <motion.path
              d="M10 10L160 110L310 10Z"
              fill="#F7F6F2"
              stroke="#D9DDDA"
              strokeWidth="2"
              animate={
                animPhase === "sealing" || animPhase === "sliding"
                  ? { transform: "scaleY(-1) translateY(-20px)" }
                  : { transform: "scaleY(1)" }
              }
              style={{ transformOrigin: "160px 10px" }}
              transition={{ duration: 0.4 }}
            />
          </svg>
        </motion.div>

        {/* Step 3: Wax Seal Stamp pressing */}
        {animPhase === "sealing" && (
          <motion.div
            className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ scale: 2.2, opacity: 0, y: -40 }}
            animate={{ scale: [2.2, 0.9, 1], opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="w-16 h-16 rounded-full bg-[var(--accent-700)] border-2 border-[var(--accent-500)] shadow-xl flex items-center justify-center text-[var(--paper)] text-center p-1">
              <div className="w-13 h-13 rounded-full border border-dashed border-[var(--paper)]/60 flex flex-col items-center justify-center text-[7px] font-mono leading-tight tracking-wider uppercase">
                <span className="font-bold">SG</span>
                <span>SEALED</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <p className="mt-8 text-xs font-mono uppercase tracking-widest text-[var(--ink-2)]">
        {animPhase === "folding" && "Folding export documentation..."}
        {animPhase === "inserting" && "Inserting into security envelope..."}
        {animPhase === "sealing" && "Applying Shreevan wax seal..."}
        {animPhase === "sliding" && "Dispatching to export desk..."}
      </p>
    </div>
  );
}
