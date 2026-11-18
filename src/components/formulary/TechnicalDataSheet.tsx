"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Check, Plus, FileCheck2, ArrowLeft, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/catalogue";
import { moleculeCode } from "@/lib/catalogue";
import { useEnquiryBasket } from "@/lib/basket";
import { Loupe } from "@/components/motion/Loupe";
import { MoleculeGlyph } from "./MoleculeGlyph";

interface TechnicalDataSheetProps {
  product: Product;
  isModal?: boolean;
  onClose?: () => void;
}

const emptySubscribe = () => () => {};

export function TechnicalDataSheet({
  product,
  isModal = false,
  onClose,
}: TechnicalDataSheetProps) {
  const code = moleculeCode(product.generic);
  const { items, addItem } = useEnquiryBasket();
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isInBasket = isClient && items.some((i) => i.id === product.id);

  const handleAdd = () => {
    addItem(product);
  };

  return (
    <div
      data-testid="technical-data-sheet"
      className="bg-paper border border-rule shadow-lg rounded-[2px] overflow-hidden max-w-4xl mx-auto"
    >
      {/* Spec Sheet Header Bar */}
      <div className="bg-porcelain border-b border-rule p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-700 font-semibold">
              SG / SPEC / {product.id}
            </span>
            <span className="font-mono text-[10px] text-ink-3">
              &bull; EXPORT SPECIFICATION SHEET
            </span>
            {product.segment === "Ayurveda" ? (
              <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded-[2px] bg-accent-100 text-accent-700 font-medium">
                Ayurveda / AYUSH
              </span>
            ) : (
              <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded-[2px] bg-mist text-ink-2 font-medium">
                Allopathic Formulation
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-ink font-light leading-tight">
            {product.generic}
          </h1>
          <p className="font-mono text-xs text-ink-3">
            Therapeutic Area: <strong className="text-ink font-medium">{product.category}</strong>
          </p>
        </div>

        {/* 2-Letter Molecule Badge */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="w-16 h-16 rounded-[2px] border border-rule bg-paper flex flex-col items-center justify-center p-1 relative overflow-hidden shadow-xs">
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <MoleculeGlyph code={code} />
            </div>
            <span className="font-mono text-2xl font-bold text-accent-700 relative z-10 leading-none">
              {code}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink-3 mt-1 relative z-10">
              {product.dosageForm.substring(0, 3)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Spec Sheet Body */}
      <div className="p-6 md:p-8 space-y-8">
        {/* Loupe Cursor Area over Composition Block */}
        <section aria-labelledby="composition-heading" className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 id="composition-heading" className="font-mono text-xs uppercase tracking-widest text-accent-700 font-semibold">
              Generic Composition &amp; Strength
            </h2>
            <span className="hidden sm:inline font-mono text-[11px] text-ink-3 italic">
              (Hover to magnify with inspection loupe)
            </span>
          </div>

          <Loupe zoom={2.2} size={150} className="loupe-active">
            <div className="p-5 bg-porcelain border border-rule rounded-[2px] space-y-2">
              <div className="font-sans text-base text-ink leading-relaxed">
                <span className="font-medium">{product.generic}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-rule/50 text-xs font-mono">
                <div>
                  <span className="text-ink-3 block">Dosage Form:</span>
                  <span className="text-ink font-semibold">{product.dosageForm}</span>
                </div>
                <div>
                  <span className="text-ink-3 block">Segment Classification:</span>
                  <span className="text-ink font-semibold">{product.segment}</span>
                </div>
              </div>
            </div>
          </Loupe>
        </section>

        {/* Packaging Presentations */}
        <section aria-labelledby="packaging-heading" className="space-y-3">
          <h2 id="packaging-heading" className="font-mono text-xs uppercase tracking-widest text-accent-700 font-semibold">
            Export Packaging Presentations
          </h2>
          <div className="bg-porcelain border border-rule rounded-[2px] p-5">
            <div className="flex flex-wrap gap-2">
              {product.packs.map((pack) => (
                <span
                  key={pack}
                  className="px-3 py-1.5 rounded-[2px] bg-paper border border-rule font-mono text-xs text-ink-2"
                >
                  {pack}
                </span>
              ))}
              {product.packs.length === 0 && (
                <span className="font-mono text-xs text-ink-3">Standard export packing specifications</span>
              )}
            </div>
            <p className="font-sans text-xs text-ink-3 mt-3">
              Custom primary and secondary packaging (blisters, strips, bottles, cartons) available for private-label and institution tender contracts.
            </p>
          </div>
        </section>

        {/* Regulatory Documents Available on Request */}
        <section aria-labelledby="documents-heading" className="space-y-3">
          <h2 id="documents-heading" className="font-mono text-xs uppercase tracking-widest text-accent-700 font-semibold">
            Documents Available on Request
          </h2>
          <div className="bg-porcelain border border-rule rounded-[2px] divide-y divide-rule/60">
            {[
              { doc: "Certificate of Analysis (COA)", desc: "Batch-specific analytical release report with monograph compliance (USP/BP/IP)." },
              { doc: "Product Specification & MOA", desc: "Finished product specification and complete Method of Analysis." },
              { doc: "Stability Data Summary", desc: "Accelerated and real-time stability data according to ICH Zone IVb guidelines." },
              { doc: "Certificate of Pharmaceutical Product (COPP)", desc: "Issued in WHO format by state drug licensing authorities (where applicable)." },
              { doc: "Free Sale Certificate (FSC)", desc: "Issued by regulatory authorities for export clearance (where applicable)." },
              { doc: "CTD / ACTD Regulatory Dossier", desc: "Modules 1–5 technical dossiers compiled for health authority registration (where available)." },
            ].map((item) => (
              <div key={item.doc} className="p-4 flex items-start gap-3">
                <FileCheck2 className="w-4 h-4 text-accent-700 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="space-y-0.5">
                  <h3 className="font-sans text-sm font-medium text-ink">{item.doc}</h3>
                  <p className="font-sans text-xs text-ink-3">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-ink-3 italic">
            Note: Availability depends on product and destination country requirements.
          </p>
        </section>

        {/* AYUSH Regulatory Disclaimer if Ayurveda */}
        {product.segment === "Ayurveda" && (
          <div className="bg-accent-100/40 border border-accent-700/30 p-4 rounded-[2px] flex items-start gap-3 text-ink-2">
            <ShieldCheck className="w-5 h-5 text-accent-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <h3 className="font-mono text-xs uppercase font-semibold text-accent-700">
                AYUSH Regulatory Statement
              </h3>
              <p className="font-sans text-xs text-ink-2 leading-relaxed">
                Traditional AYUSH formulation. Classification depends on the destination country.
              </p>
            </div>
          </div>
        )}

        {/* Action Desk */}
        <div className="pt-6 border-t border-rule flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/contact?type=quotation&productId=${product.id}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-[2px] bg-accent-700 hover:bg-accent-500 text-porcelain font-mono text-xs uppercase tracking-widest font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
            >
              Request quotation for this product
            </Link>

            <button
              type="button"
              onClick={handleAdd}
              aria-label={
                isInBasket
                  ? `Added to Enquiry: ${product.generic}`
                  : `Add to enquiry: ${product.generic}`
              }
              className={`inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-[2px] font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 border ${
                isInBasket
                  ? "bg-accent-100 text-accent-700 border-accent-700/50"
                  : "bg-porcelain border-rule text-ink-2 hover:bg-mist hover:text-ink"
              }`}
            >
              {isInBasket ? (
                <>
                  <Check className="w-4 h-4 text-accent-700" aria-hidden="true" />
                  <span>Added to Enquiry</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>Add to enquiry</span>
                </>
              )}
            </button>
          </div>

          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-mono uppercase tracking-wider text-ink-3 hover:text-ink transition-colors underline underline-offset-4"
            >
              Close Dossier
            </button>
          )}

          {!isModal && (
            <Link
              href="/formulary"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink-3 hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Formulary</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
