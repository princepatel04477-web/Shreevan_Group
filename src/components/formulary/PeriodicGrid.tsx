"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Product } from "@/lib/catalogue";
import { MoleculeTile } from "./MoleculeTile";

interface PeriodicGridProps {
  products: Product[];
  groupByCategory?: boolean;
}

export function PeriodicGrid({ products, groupByCategory = true }: PeriodicGridProps) {
  // If grouping by category
  if (groupByCategory) {
    // Group products deterministically by category
    const grouped = new Map<string, Product[]>();
    for (const p of products) {
      const list = grouped.get(p.category) || [];
      list.push(p);
      grouped.set(p.category, list);
    }

    const categories = Array.from(grouped.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    return (
      <div className="space-y-10">
        {categories.map(([category, items]) => (
          <div key={category} className="space-y-4">
            {/* Category Section Header Row */}
            <div className="flex items-center gap-3 pb-2 border-b border-rule">
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent-700 font-semibold">
                {category}
              </h2>
              <span className="font-mono text-[11px] text-ink-3">
                ({items.length} {items.length === 1 ? "molecule" : "molecules"})
              </span>
              <div className="flex-1 h-[1px] bg-rule/50" />
            </div>

            {/* Grid of Molecule Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
              <AnimatePresence>
                {items.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.24 }}
                  >
                    <MoleculeTile product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Flat grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.24 }}
          >
            <MoleculeTile product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
