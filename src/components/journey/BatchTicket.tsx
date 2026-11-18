"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useJourney } from "@/lib/journey";
import { company } from "@/config/company";
import { useLenis } from "@/components/motion/SmoothScroll";
import { clsx } from "clsx";

const CHAPTERS = [
  { index: 1, id: "chapter-formulation", title: "Formulation", doc: "Product list" },
  { index: 2, id: "chapter-portfolio", title: "Portfolio", doc: "Certificate of Analysis" },
  { index: 3, id: "chapter-quality", title: "Quality", doc: "GMP Certificate" },
  { index: 4, id: "chapter-documentation", title: "Documentation", doc: "COPP (WHO Format)" },
  { index: 5, id: "chapter-shipment", title: "Shipment", doc: "Invoice & Packing List" },
  { index: 6, id: "chapter-brand", title: "Your Brand", doc: "Certificate of Origin" },
];

export function BatchTicket({ className }: { className?: string }) {
  const chapter = useJourney((s) => s.chapter);
  const docsCollected = useJourney((s) => s.docsCollected);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const yearString = company.foundedYear ? String(company.foundedYear) : "2023";
  const activeChapterInfo = CHAPTERS.find((c) => c.index === chapter) ?? CHAPTERS[0];

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const scrollToChapter = (id: string) => {
    setIsOpen(false);
    const target = document.getElementById(id);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={popoverRef}
      className={clsx("hidden lg:block fixed top-20 right-6 z-30 select-none", className)}
    >
      {/* Perforated Batch Ticket Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title="Click to view export chapter navigation menu"
        className="relative bg-porcelain border border-rule shadow-[0_2px_8px_rgba(15,27,36,0.06)] hover:border-accent-700/60 transition-colors p-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent-700 rounded-[2px] group"
      >
        {/* Perforated Notches */}
        <div
          className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-paper border-r border-rule"
          aria-hidden="true"
        />
        <div
          className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-paper border-l border-rule"
          aria-hidden="true"
        />

        <div className="flex items-center gap-2 font-mono text-xs text-ink font-semibold">
          <span className="text-accent-700">SG</span>
          <span className="text-rule">/</span>
          <span>{yearString}</span>
          <span className="text-rule">/</span>
          <span className="inline-flex overflow-hidden h-4 text-accent-700">
            <span className="mr-0.5">CH-0</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={chapter}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {chapter}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <div className="mt-1 pt-1 border-t border-dashed border-rule flex items-center justify-between gap-4 font-mono text-[10px] text-ink-3">
          <span className="uppercase tracking-wider text-ink font-medium">
            {activeChapterInfo?.title}
          </span>
          <span className="text-accent-700 font-bold">
            {docsCollected.length}/6 DOCS
          </span>
        </div>
      </button>

      {/* Chapter Index Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Chapter Index"
            className="absolute top-full right-0 mt-2 w-80 bg-porcelain border border-rule shadow-[0_12px_28px_rgba(15,27,36,0.12)] p-4 rounded-[2px]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold">
                BATCH PROGRESSION
              </span>
              <span className="font-mono text-[11px] text-ink-3">
                {docsCollected.length} OF 6 CLEARED
              </span>
            </div>

            <nav className="mt-3 divide-y divide-rule/60">
              {CHAPTERS.map((ch) => {
                const isCurrent = ch.index === chapter;
                const isCollected = docsCollected.includes(
                  ch.doc === "Product list"
                    ? "product-list"
                    : ch.doc === "Certificate of Analysis"
                    ? "coa"
                    : ch.doc === "GMP Certificate"
                    ? "gmp"
                    : ch.doc === "COPP (WHO Format)"
                    ? "copp"
                    : ch.doc === "Invoice & Packing List"
                    ? "invoice"
                    : "origin"
                );

                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => scrollToChapter(ch.id)}
                    className={clsx(
                      "w-full py-2.5 px-2 flex items-center justify-between text-left transition-colors font-mono text-xs rounded-[2px]",
                      isCurrent
                        ? "bg-accent-100/70 text-accent-700 font-bold"
                        : "text-ink hover:bg-mist"
                    )}
                  >
                    <div>
                      <span className="text-ink-3 mr-2">CH-0{ch.index}</span>
                      <span className="font-body font-medium">{ch.title}</span>
                    </div>
                    <span
                      className={clsx(
                        "text-[10px] font-mono tracking-wider",
                        isCollected
                          ? "text-accent-700 font-semibold"
                          : "text-ink-3"
                      )}
                    >
                      {isCollected ? "CLEARED ✓" : "PENDING"}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-3 pt-3 border-t border-dashed border-rule flex justify-between items-center text-[11px] font-mono text-ink-3">
              <span>Press Esc to close</span>
              <span className="text-accent-700">Lenis Smooth Nav</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
