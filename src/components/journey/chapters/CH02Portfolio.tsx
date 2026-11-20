"use client";

import React from "react";
import Link from "next/link";
import { getCategories, getPublicProducts, categoryToSlug } from "@/lib/catalogue";
import { Chapter } from "@/components/journey/Chapter";
import { LinkUnderline } from "@/components/motion/LinkUnderline";

export function CH02Portfolio() {
  const categoryStats = getCategories();
  const allProducts = getPublicProducts();

  // Prepare category items with stats and top 4 generics
  const categoryData = categoryStats.map((catItem) => {
    const productsInCat = allProducts.filter((p) => p.category === catItem.category);
    const sampleGenerics = Array.from(new Set(productsInCat.map((p) => p.generic))).slice(0, 4);
    const slug = categoryToSlug(catItem.category);
    return {
      title: catItem.category,
      slug,
      count: catItem.count,
      sampleGenerics,
    };
  });

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
              CH-02 / PORTFOLIO
            </span>
            <span className="text-rule">|</span>
            <h2 className="font-display text-2xl lg:text-3xl font-light text-ink">
              Therapeutic Formulary Index
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

        {/* Clean Responsive Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categoryData.map((cat, idx) => (
            <div
              key={cat.title}
              className="bg-paper border border-rule hover:border-accent-700/60 p-5 flex flex-col justify-between rounded-[2px] transition-colors shadow-[0_1px_4px_rgba(15,27,36,0.02)] group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <span className="font-mono text-xs text-accent-700 font-bold">
                    CAT-{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-ink-3">
                    {cat.count} items
                  </span>
                </div>
                <h3 className="font-display text-xl font-light text-ink group-hover:text-accent-700 transition-colors">
                  {cat.title}
                </h3>
                <p className="font-mono text-xs text-ink-3 line-clamp-2 leading-relaxed">
                  {cat.sampleGenerics.join(", ")}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-rule/60">
                <Link
                  href={`/formulary/${cat.slug}`}
                  className="font-mono text-xs text-accent-700 uppercase tracking-wider font-semibold group-hover:underline inline-flex items-center gap-1"
                >
                  View Category <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Formulary Callout Banner */}
        <div className="bg-mist/30 border border-rule p-4 sm:p-6 rounded-[2px] flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold">
              NEED FULL PROCUREMENT DATA?
            </span>
            <p className="font-body text-sm text-ink-2">
              Browse the interactive periodic table or switch to the tabular procurement view for bulk dossier downloads.
            </p>
          </div>
          <Link
            href="/formulary"
            className="px-5 py-2.5 bg-ink text-paper font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-ink-2 transition-colors inline-block"
          >
            Explore All {allProducts.length} Formulations →
          </Link>
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
