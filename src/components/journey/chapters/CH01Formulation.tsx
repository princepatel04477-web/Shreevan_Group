"use client";

import React from "react";
import Link from "next/link";
import { company } from "@/config/company";
import { getPublicProducts } from "@/lib/catalogue";
import { LogoMark } from "@/components/brand/LogoMark";
import { BlurText } from "@/components/motion/BlurText";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { CountUp } from "@/components/motion/CountUp";
import { DecryptedText } from "@/components/motion/DecryptedText";
import { Marquee } from "@/components/motion/Marquee";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { LinkUnderline } from "@/components/motion/LinkUnderline";
import { Chapter } from "@/components/journey/Chapter";

const MARQUEE_FORMS = [
  "TABLETS & SOLID ORALS",
  "HARD & SOFT GELATIN CAPSULES",
  "ORAL LIQUIDS & SUSPENSIONS",
  "DRY SYRUPS & SUSPENSIONS",
  "STERILE SMALL VOLUME PARENTERALS",
  "TOPICAL OINTMENTS & GELS",
  "AYURVEDA & CLASSICAL HERBAL EXTRACTS",
];

const MARQUEE_STANDARDS = [
  "BRITISH PHARMACOPOEIA (BP)",
  "UNITED STATES PHARMACOPEIA (USP)",
  "INDIAN PHARMACOPOEIA (IP)",
  "EUROPEAN PHARMACOPOEIA (PH. EUR.)",
  "SCHEDULE M (cGMP) STANDARDS",
  "WHO-GMP COMPLIANT PARTNER FACILITIES",
  "CDSCO EXPORT CERTIFIED",
  "DGFT LICENSED MERCHANT EXPORTER",
];

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
              CH-01 / FORMULATION &amp; SOURCING
            </span>
            <span className="text-rule">|</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
              PHARMACEUTICAL EXPORTS · INDIA{yearString}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-700 animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              BATCH STAGE: REGULATORY DOCKET
            </span>
          </div>
        </div>

        {/* Brand Logo Highlight Centerpiece for Hero */}
        <div className="flex justify-start sm:justify-center lg:justify-start pt-2">
          <LogoMark variant="hero" priority />
        </div>

        {/* Main Grid: Left 5/12 Editorial Content, Right 7/12 Technical Dossier Specification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-2">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <BlurText
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

          {/* Right Column (7 cols): SpotlightCard Dossier Specification Board */}
          <div className="lg:col-span-7">
            <SpotlightCard
              spotlightColor="rgba(198, 156, 109, 0.12)"
              className="p-6 sm:p-8 space-y-6 shadow-[0_4px_24px_rgba(15,27,36,0.04)]"
            >
              {/* Spec Sheet Header */}
              <div className="flex items-center justify-between border-b border-rule pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold">
                  EXPORT SPECIFICATION DOCKET
                </span>
                <span className="font-mono text-[11px] text-ink-3 uppercase tracking-wider">
                  <DecryptedText text="REF: SG-SPEC-2024-CH01" animateOn="view" />
                </span>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 border-l-2 border-accent-700 pl-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent-700 block font-semibold">
                    01 / PHARMACOPOEIA STANDARDS
                  </span>
                  <p className="font-mono text-sm font-semibold text-ink">
                    IP · BP · USP · Ph. Eur.
                  </p>
                  <p className="font-body text-xs text-ink-3 leading-normal">
                    Analytical testing verified against destination country compendial monographs.
                  </p>
                </div>

                <div className="space-y-1.5 border-l-2 border-[#C69C6D] pl-3.5">
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

                <div className="space-y-1.5 border-l-2 border-rule pl-3.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-3 block">
                    03 / DOSSIER COMPILATION
                  </span>
                  <p className="font-mono text-sm font-semibold text-ink">
                    CTD &amp; ACTD Modules
                  </p>
                  <p className="font-body text-xs text-ink-3 leading-normal">
                    Technical dossier packages ready for health ministry submission.
                  </p>
                </div>

                <div className="space-y-1.5 border-l-2 border-rule pl-3.5">
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
              <div className="border-t border-rule pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-ink-2 bg-paper/60 p-3.5 rounded-[2px] border border-rule/70">
                <div>
                  <span className="text-ink-3 mr-2">OUTBOUND PORTS:</span>
                  <span className="font-semibold text-ink">Nhava Sheva (INNSA) · Mundra (INMUN)</span>
                </div>
                <div>
                  <span className="text-ink-3 mr-2">TERMS:</span>
                  <span className="font-semibold text-accent-700">CIF · FOB · EXW · CIP</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Dynamic Typography Marquee Ribbons */}
        <div className="pt-2 space-y-1">
          <Marquee items={MARQUEE_FORMS} speed={32} direction="left" />
          <Marquee items={MARQUEE_STANDARDS} speed={36} direction="right" separator="|" />
        </div>

        {/* Bottom Fact Rail with CountUp animations */}
        <div className="border-t border-rule pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 block mb-1">
              FORMULATIONS IN CATALOGUE
            </span>
            <span className="font-data text-2xl lg:text-3xl font-light text-ink">
              <CountUp to={productCount} /> Formulations
            </span>
            <span className="block font-mono text-[10px] text-ink-3 mt-1">
              As of {asOfDate}
            </span>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 block mb-1">
              DOSAGE FORMS
            </span>
            <span className="font-data text-2xl lg:text-3xl font-light text-ink">
              7 Dosage Forms
            </span>
            <span className="block font-mono text-[10px] text-ink-3 mt-1">
              Solid, Liquid &amp; Sterile
            </span>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 block mb-1">
              QUALITY REGIME
            </span>
            <span className="font-data text-xl lg:text-2xl font-light text-ink">
              WHO-GMP Partners
            </span>
            <span className="block font-mono text-[10px] text-ink-3 mt-1">
              Inspected facilities
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
