"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { getCategories, getDosageForms } from "@/lib/catalogue";
import { ArrowRight, Search, PlusCircle } from "lucide-react";

interface FormularyMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function FormularyMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: FormularyMegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const categories = getCategories();
  const dosageForms = getDosageForms();

  // Focus trap / escape key handling
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
      id="formulary-mega-menu"
      role="region"
      aria-label="Formulary Directory"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 right-0 w-full bg-porcelain border-b border-rule shadow-xl z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Therapeutic Areas (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-rule">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-3 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-accent-700" aria-hidden="true" />
                Therapeutic Areas ({categories.length})
              </span>
              <Link
                href="/formulary"
                onClick={onClose}
                className="font-mono text-xs text-accent-700 hover:underline flex items-center gap-1"
              >
                <span>Full Periodic Grid</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2.5">
              {categories.map(({ category, count }) => (
                <Link
                  key={category}
                  href={`/formulary?area=${encodeURIComponent(category)}`}
                  onClick={onClose}
                  className="group flex items-center justify-between py-1 px-1.5 rounded-[2px] hover:bg-mist transition-colors text-xs text-ink"
                >
                  <span className="group-hover:text-accent-700 font-medium truncate pr-2">
                    {category}
                  </span>
                  <span className="font-mono text-[11px] text-ink-3 tabular-nums shrink-0">
                    {count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Dosage Forms (4 cols) */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-rule pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-rule">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-3">
                Dosage Forms ({dosageForms.length})
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {dosageForms.map(({ dosageForm, count }) => (
                <Link
                  key={dosageForm}
                  href={`/formulary?form=${encodeURIComponent(dosageForm)}`}
                  onClick={onClose}
                  className="group flex items-center justify-between p-2 rounded-[2px] bg-paper hover:bg-mist border border-rule/60 hover:border-rule transition-all text-xs"
                >
                  <span className="font-medium text-ink group-hover:text-accent-700">
                    {dosageForm}
                  </span>
                  <span className="font-mono text-[11px] text-ink-3 tabular-nums">
                    {count}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6 p-3.5 bg-paper rounded-[2px] border border-rule/80">
              <div className="font-mono text-[11px] uppercase tracking-wider text-ink-3 mb-1">
                Custom Formulations
              </div>
              <p className="text-xs text-ink-2 leading-relaxed">
                Licensed contract manufacturing across tablets, injectables, softgels, and AYUSH-certified Ayurveda.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Prompt Line */}
        <div className="mt-8 pt-4 border-t border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ink-2">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-accent-700 shrink-0" aria-hidden="true" />
            <span className="font-medium">
              Can&apos;t find a molecule? We source on request.
            </span>
          </div>
          <Link
            href="/contact?type=sourcing"
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-wider text-accent-700 hover:text-accent-500 flex items-center gap-1.5 font-semibold"
          >
            <span>Submit Sourcing Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
