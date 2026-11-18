"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { getCategories, getPublicProducts, categoryToSlug, moleculeCode } from "@/lib/catalogue";
import { MoleculeGlyph } from "@/components/formulary/MoleculeGlyph";
import { Chapter } from "@/components/journey/Chapter";
import { LinkUnderline } from "@/components/motion/LinkUnderline";

export function CH02Portfolio() {
  const drawerRef = useRef<HTMLDivElement>(null);
  const categoryStats = getCategories();
  const allProducts = getPublicProducts();

  // Prepare category items with stats and top 4 generics
  const categoryData = categoryStats.map((catItem) => {
    const productsInCat = allProducts.filter((p) => p.category === catItem.category);
    // Take unique first 4 generic names
    const sampleGenerics = Array.from(new Set(productsInCat.map((p) => p.generic))).slice(0, 4);
    const slug = categoryToSlug(catItem.category);
    return {
      title: catItem.category,
      slug,
      count: catItem.count,
      sampleGenerics,
      firstProduct: productsInCat[0],
    };
  });

  // Setup scrubbed horizontal movement across the drawer on desktop
  const setupTimeline = (tl: gsap.core.Timeline) => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    // Calculate how far to shift the drawer horizontally
    tl.to(drawer, {
      x: () => -(drawer.scrollWidth - drawer.clientWidth + 60),
      ease: "none",
      duration: 0.7,
    }, 0);
  };

  return (
    <Chapter
      index={2}
      id="chapter-portfolio"
      title="Portfolio"
      docId="coa"
      length="+=200%"
      setupTimeline={setupTimeline}
    >
      <div className="w-full h-full flex flex-col justify-between overflow-hidden">
        {/* Chapter Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              CH-02 / PORTFOLIO
            </span>
            <span className="text-rule">|</span>
            <h2 className="font-display text-2xl lg:text-3xl font-light text-ink">
              Therapeutic Specimen Drawer
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

        {/* Drawer Content */}
        <div className="py-6 flex-1 flex flex-col justify-center overflow-hidden">
          {/* Desktop: Horizontal Specimen Drawer */}
          <div
            ref={drawerRef}
            className="hidden lg:flex items-stretch gap-4 h-[440px] will-change-transform pr-16"
          >
            {categoryData.map((cat, idx) => (
              <div
                key={cat.title}
                className="group relative flex-none w-[200px] hover:w-[280px] transition-all duration-300 ease-out bg-paper border border-rule hover:border-accent-700/60 p-5 flex flex-col justify-between shadow-[0_2px_8px_rgba(15,27,36,0.03)] cursor-pointer"
              >
                {/* Top Code and Count */}
                <div className="flex items-start justify-between border-b border-rule pb-2">
                  <span className="font-mono text-xs text-accent-700 font-bold">
                    C-{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-ink-3">
                    {cat.count} items
                  </span>
                </div>

                {/* Vertical Category Title */}
                <div className="my-auto py-4 flex items-center justify-center">
                  <span
                    className="font-display text-3xl font-light text-ink tracking-tight select-none [writing-mode:vertical-rl] rotate-180 text-center"
                    style={{ maxHeight: "220px" }}
                  >
                    {cat.title}
                  </span>
                </div>

                {/* Hover Reveal: Molecule Glyph & Top Generics */}
                <div className="space-y-3 pt-3 border-t border-rule">
                  {cat.firstProduct && (
                    <div className="h-10 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                      <MoleculeGlyph code={moleculeCode(cat.firstProduct.generic)} className="w-9 h-9" />
                    </div>
                  )}

                  <div className="hidden group-hover:block space-y-1 transition-all">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-ink-3 block">
                      KEY GENERICS:
                    </span>
                    <ul className="font-mono text-[11px] text-ink-2 space-y-0.5 line-clamp-3">
                      {cat.sampleGenerics.map((gen) => (
                        <li key={gen} className="truncate">
                          • {gen}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/formulary/${cat.slug}`}
                    className="block font-mono text-[11px] uppercase tracking-wider text-accent-700 font-medium group-hover:underline pt-1 text-center"
                  >
                    Explore Category →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / Tablet: Ruled Grid */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryData.slice(0, 6).map((cat, idx) => (
              <div
                key={cat.title}
                className="bg-paper border border-rule p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-rule pb-2">
                  <span className="font-mono text-xs text-accent-700 font-bold">
                    CAT-0{idx + 1}
                  </span>
                  <span className="font-mono text-xs text-ink-3">
                    {cat.count} Formulations
                  </span>
                </div>
                <h3 className="font-display text-xl font-light text-ink">
                  {cat.title}
                </h3>
                <p className="font-mono text-xs text-ink-2 truncate">
                  {cat.sampleGenerics.join(", ")}
                </p>
                <Link
                  href={`/formulary/${cat.slug}`}
                  className="inline-block font-mono text-xs text-accent-700 font-semibold"
                >
                  View Category →
                </Link>
              </div>
            ))}
            <div className="sm:col-span-2 text-center pt-2">
              <Link
                href="/formulary"
                className="inline-block font-mono text-xs uppercase tracking-wider text-accent-700 underline font-semibold"
              >
                View all {categoryStats.length} categories in the Formulary →
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
