"use client";

import React from "react";
import Link from "next/link";
import { company } from "@/config/company";
import { getPublicProducts } from "@/lib/catalogue";
import { BlisterGlobeContainer } from "@/components/three/BlisterGlobeContainer";
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
      length="+=120%"
    >
      <div className="relative w-full h-full flex flex-col justify-between">
        {/* Top Bar / Category stamp */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-01 / FORMULATION
            </span>
            <span className="text-rule">|</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
              PHARMACEUTICAL EXPORTS · INDIA{yearString}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-700" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              BATCH STAGE: FORMULATION DOCKET
            </span>
          </div>
        </div>

        {/* Main Grid: Left 5/12 Editorial Content, Right 7/12 3D Blister/Globe Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 lg:py-10 my-auto">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 z-10">
            <div className="space-y-4">
              <SplitHeading
                text="Medicines made in India, documented for the world."
                as="h1"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight leading-[1.08]"
              />
              <p className="font-body text-base lg:text-lg text-ink-2 leading-relaxed max-w-xl">
                Quality-assured formulations and Ayurveda, supplied with the paperwork your
                regulator asks for. Sourced from licensed GMP-certified manufacturing partners.
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

          {/* Right Column (7 cols): 3D Blister to Globe interactive canvas */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[460px] lg:h-[540px] w-full border border-rule bg-mist/30 overflow-hidden rounded-[2px]">
            <BlisterGlobeContainer className="w-full h-full" />
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
