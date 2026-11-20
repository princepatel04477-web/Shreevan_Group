"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getCategories, getPublicProducts, categoryToSlug } from "@/lib/catalogue";
import { Chapter } from "@/components/journey/Chapter";
import { LinkUnderline } from "@/components/motion/LinkUnderline";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { CountUp } from "@/components/motion/CountUp";
import { DecryptedText } from "@/components/motion/DecryptedText";
import { clsx } from "clsx";

export function CH02Portfolio() {
  const categoryStats = getCategories();
  const allProducts = getPublicProducts();

  // Prepare category items with stats and top generics
  const categoryData = categoryStats.map((catItem) => {
    const productsInCat = allProducts.filter((p) => p.category === catItem.category);
    const sampleGenerics = Array.from(new Set(productsInCat.map((p) => p.generic))).slice(0, 6);
    const dosageForms = Array.from(new Set(productsInCat.map((p) => p.dosageForm))).slice(0, 4);
    const slug = categoryToSlug(catItem.category);
    return {
      title: catItem.category,
      slug,
      count: catItem.count,
      sampleGenerics,
      dosageForms,
    };
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeCategory = categoryData[selectedIndex] ?? categoryData[0];
  if (!activeCategory) return null;

  return (
    <Chapter
      index={2}
      id="chapter-portfolio"
      title="Portfolio"
      docId="coa"
    >
      <div className="w-full flex flex-col justify-between gap-8">
        {/* Chapter Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-02 / PORTFOLIO &amp; FORMULARY
            </span>
            <span className="text-rule">|</span>
            <h2 className="font-display text-2xl lg:text-3xl font-light text-ink">
              Therapeutic Portfolio &amp; Monograph Index
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
              {categoryStats.length} CATEGORIES · {allProducts.length} FORMULATIONS
            </span>
            <LinkUnderline
              href="/formulary"
              className="font-mono text-xs text-accent-700 uppercase tracking-wider hidden sm:inline-block"
            >
              Full Formulary →
            </LinkUnderline>
          </div>
        </div>

        {/* Category Horizontal Filter Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-rule/50">
          {categoryData.map((cat, idx) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={clsx(
                "px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border",
                selectedIndex === idx
                  ? "bg-accent-700 text-porcelain border-accent-700 shadow-xs"
                  : "bg-paper text-ink-2 border-rule hover:border-accent-700/60 hover:text-ink"
              )}
            >
              <span>{cat.title}</span>
              <span
                className={clsx(
                  "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                  selectedIndex === idx ? "bg-porcelain text-accent-700" : "bg-mist text-ink-3"
                )}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Asymmetric Specimen Drawer & Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-2">
          {/* Left Column (7 cols): Spotlight Specimen Card */}
          <div className="lg:col-span-7">
            <SpotlightCard
              spotlightColor="rgba(198, 156, 109, 0.12)"
              className="p-6 sm:p-8 space-y-6 shadow-[0_4px_24px_rgba(15,27,36,0.04)]"
            >
              {/* Category Specimen Header */}
              <div className="flex items-start justify-between border-b border-rule pb-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="font-mono text-xs text-accent-700 font-bold tracking-widest">
                      <DecryptedText
                        text={`CAT-${String(selectedIndex + 1).padStart(2, "0")}`}
                        animateOn="view"
                      />
                    </span>
                    <span className="text-rule">|</span>
                    <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">
                      SPECIMEN DOSSIER
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-ink">
                    {activeCategory.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-data text-2xl sm:text-3xl font-light text-accent-700 block leading-tight">
                    <CountUp to={activeCategory.count} />
                  </span>
                  <span className="font-mono text-[10px] text-ink-3 uppercase tracking-wider">
                    Formulations
                  </span>
                </div>
              </div>

              {/* Dosage Forms & Standards Rail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-rule pb-5 font-mono text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-ink-3 block mb-1">
                    PRIMARY DOSAGE FORMS
                  </span>
                  <span className="font-medium text-ink">
                    {activeCategory.dosageForms.length > 0
                      ? activeCategory.dosageForms.join(" · ")
                      : "Tablets · Capsules · Syrups"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-ink-3 block mb-1">
                    COMPENDIAL MONOGRAPHS
                  </span>
                  <span className="font-medium text-ink">
                    BP · USP · IP · In-House
                  </span>
                </div>
              </div>

              {/* Representative Generics Pills */}
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-ink-3 block">
                  REPRESENTATIVE ACTIVE PHARMACEUTICAL INGREDIENTS (APIs)
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeCategory.sampleGenerics.map((generic) => (
                    <span
                      key={generic}
                      className="px-3 py-1.5 bg-paper rounded-[2px] border border-rule/80 text-xs font-mono text-ink-2 hover:border-accent-700/50 hover:text-ink transition-colors"
                    >
                      {generic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category Call-to-Action Footer */}
              <div className="pt-4 border-t border-rule flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={`/formulary/${activeCategory.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-paper rounded-[2px] font-mono text-xs uppercase tracking-wider hover:bg-accent-700 transition-colors font-semibold"
                >
                  <span>Explore {activeCategory.title} ({activeCategory.count})</span>
                  <span>→</span>
                </Link>

                <Link
                  href={`/contact?type=quotation&category=${encodeURIComponent(activeCategory.title)}`}
                  className="font-mono text-xs text-accent-700 hover:underline uppercase tracking-wider font-semibold"
                >
                  Request Category Price Docket →
                </Link>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column (5 cols): Interactive Category Roster List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-3 font-semibold">
                ALL 12 THERAPEUTIC DIVISIONS
              </span>
              <span className="font-mono text-[10px] text-ink-3">
                SELECT TO INSPECT
              </span>
            </div>

            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {categoryData.map((cat, idx) => (
                <button
                  key={cat.title}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={clsx(
                    "w-full text-left p-3 rounded-[2px] border transition-all duration-150 flex items-center justify-between group cursor-pointer",
                    selectedIndex === idx
                      ? "bg-paper border-accent-700 shadow-2xs"
                      : "bg-paper/40 border-rule/70 hover:border-rule hover:bg-paper"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={clsx(
                        "font-mono text-xs font-bold",
                        selectedIndex === idx ? "text-accent-700" : "text-ink-3"
                      )}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={clsx(
                        "font-display text-base transition-colors",
                        selectedIndex === idx
                          ? "text-ink font-normal"
                          : "text-ink-2 group-hover:text-ink font-light"
                      )}
                    >
                      {cat.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-ink-3">
                      {cat.count}
                    </span>
                    <span
                      className={clsx(
                        "text-xs transition-transform duration-150",
                        selectedIndex === idx
                          ? "text-accent-700 translate-x-0.5"
                          : "text-ink-3/40 group-hover:translate-x-0.5"
                      )}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-3 bg-mist/40 border border-rule/70 rounded-[2px] font-mono text-xs text-ink-3 flex items-center justify-between">
              <span>Looking for bulk tender schedules?</span>
              <Link href="/formulary" className="text-accent-700 font-semibold hover:underline">
                Tabular Grid →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-rule pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink-3">
          <span>
            As of {allProducts.length > 0 ? "current published catalogue" : "N/A"}
          </span>
          <span>
            Every formulation sourced from licensed GMP-certified partner facilities.
          </span>
        </div>
      </div>
    </Chapter>
  );
}
