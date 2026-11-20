"use client";

import React from "react";
import Link from "next/link";
import { company } from "@/config/company";
import { getPublicProducts } from "@/lib/catalogue";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { LinkUnderline } from "@/components/motion/LinkUnderline";
import { FactRoll } from "@/components/motion/FactRoll";
import { Chapter } from "@/components/journey/Chapter";

export function CH01Formulation() {
  const products = getPublicProducts();
  const productCount = products.length;
  const yearString = company.foundedYear ? ` · EST. ${company.foundedYear}` : "";
  const asOfDate = company.lastUpdated || "Catalogue Index";

  return (
    <Chapter
      index={1}
      id="chapter-formulation"
      title="Formulation"
      docId="product-list"
    >
      <div className="relative w-full flex flex-col justify-between gap-10">
        {/* Top Bar / Category stamp */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-01 / FORMULATION & SOURCING
            </span>
            <span className="text-rule">|</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
              PHARMACEUTICAL EXPORTS · INDIA{yearString}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-700" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              BATCH STAGE: REGULATORY DOCKET
            </span>
          </div>
        </div>

        {/* Main Grid: Left 5/12 Editorial Content, Right 7/12 Technical Dossier Specification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-2">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <SplitHeading
                text="Medicines made in India, documented for the world."
                as="h1"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight leading-[1.08]"
              />
              <p className="font-body text-base lg:text-lg text-ink-2 leading-relaxed max-w-xl">
                Quality-assured formulations and Ayurveda, supplied with the paperwork your
                regulator asks for. Sourced exclusively from licensed GMP-certified manufacturing partners.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-5">
              <Link href="/contact?type=quotation">
                <MagneticButton>
                  Request a Quotation
                </MagneticButton>
              </Link>
              <LinkUnderline
                href="/formulary"
                className="font-mono text-xs tracking-wider text-ink-2 hover:text-accent-700 uppercase py-2"
              >
                Open the formulary →
              </LinkUnderline>
            </div>

            <p className="font-mono text-[11px] text-ink-3 pt-2">
              Manufactured by licensed GMP-certified partner facilities across India.
            </p>
          </div>

          {/* Right Column (7 cols): Editorial Technical Specification Board */}
          <div className="lg:col-span-7 bg-paper border border-rule p-6 sm:p-8 rounded-[2px] shadow-[0_2px_8px_rgba(15,27,36,0.03)] space-y-6">
            {/* Spec Sheet Header */}
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold">
                EXPORT SPECIFICATION DOCKET
              </span>
              <span className="font-mono text-[11px] text-ink-3 uppercase tracking-wider">
                REF: SG-SPEC-INDEX
              </span>
            </div>

            {/* Specification Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5 border-l-2 border-accent-700 pl-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3 block">
                  01 / PHARMACOPOEIA STANDARDS
                </span>
                <p className="font-mono text-sm font-semibold text-ink">
                  IP · BP · USP · Ph. Eur.
                </p>
                <p className="font-body text-xs text-ink-3 leading-normal">
                  Analytical testing verified against destination country compendial monographs.
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-rule pl-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3 block">
                  02 / MANUFACTURING COMPLIANCE
                </span>
                <p className="font-mono text-sm font-semibold text-ink">
                  Licensed GMP Partners
                </p>
                <p className="font-body text-xs text-ink-3 leading-normal">
                  Inspected facilities adhering to Schedule M / WHO-GMP quality guidelines.
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-rule pl-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3 block">
                  03 / DOSSIER COMPILATION
                </span>
                <p className="font-mono text-sm font-semibold text-ink">
                  CTD & ACTD Modules
                </p>
                <p className="font-body text-xs text-ink-3 leading-normal">
                  Technical dossier packages ready for health ministry submission.
                </p>
              </div>

              <div className="space-y-1.5 border-l-2 border-rule pl-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3 block">
                  04 / CLIMATIC STABILITY
                </span>
                <p className="font-mono text-sm font-semibold text-ink">
                  Zone IVb Verified
                </p>
                <p className="font-body text-xs text-ink-3 leading-normal">
                  Stability data supporting 36-month shelf life in tropical export corridors.
                </p>
              </div>
            </div>

            {/* Spec Sheet Footer Bar */}
            <div className="border-t border-rule pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-ink-2 bg-porcelain p-3 rounded-[2px] border">
              <div>
                <span className="text-ink-3 mr-2">PRIMARY PORTS:</span>
                <span className="font-semibold text-ink">Nhava Sheva (INNSA) · Mundra (INMUN)</span>
              </div>
              <div>
                <span className="text-ink-3 mr-2">TERMS:</span>
                <span className="font-semibold text-accent-700">CIF · FOB · EXW · CIP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fact Rail */}
        <div className="border-t border-rule pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <FactRoll
              value={productCount}
              label="Formulations in catalogue"
              asOf={asOfDate}
            />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 block mb-1">
              DOSAGE FORMS
            </span>
            <span className="font-data text-2xl lg:text-3xl font-light text-ink">
              7 Forms
            </span>
            <span className="block font-mono text-[10px] text-ink-3 mt-1">
              Tablets, Caps, Liquids, Injections
            </span>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 block mb-1">
              QUALITY REGIME
            </span>
            <span className="font-data text-xl lg:text-2xl font-light text-ink">
              GMP Certified
            </span>
            <span className="block font-mono text-[10px] text-ink-3 mt-1">
              Licensed partner units
            </span>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 block mb-1">
              EXPORT DOSSIER
            </span>
            <span className="font-data text-xl lg:text-2xl font-light text-accent-700">
              6 Documents
            </span>
            <span className="block font-mono text-[10px] text-ink-3 mt-1">
              COA, COPP, GMP, Origin, Inv, Spec
            </span>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
