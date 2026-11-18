"use client";

import React, { useState, useMemo, useCallback, Suspense } from "react";
import Link from "next/link";
import { ArrowRight, FileQuestion } from "lucide-react";
import type { Product } from "@/lib/catalogue";
import { FormularyFilters } from "./FormularyFilters";
import { PeriodicGrid } from "./PeriodicGrid";
import { ProcurementTable } from "./ProcurementTable";

interface FormularyExplorerProps {
  initialProducts: Product[];
  categories: { value: string; label: string; count: number }[];
  dosageForms: { value: string; label: string; count: number }[];
  initialCategory?: string;
}

function normalizeStr(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function FormularyExplorer({
  initialProducts,
  categories,
  dosageForms,
  initialCategory,
}: FormularyExplorerProps) {
  const [filters, setFilters] = useState<{
    q: string;
    area: string;
    form: string;
    seg: string;
    view: "grid" | "table";
  }>({
    q: "",
    area: initialCategory ?? "",
    form: "",
    seg: "",
    view: "grid",
  });

  const handleFilterChange = useCallback(
    (newFilters: {
      q: string;
      area: string;
      form: string;
      seg: string;
      view: "grid" | "table";
    }) => {
      setFilters(newFilters);
    },
    []
  );

  // Filtered and searched formulations
  const filteredProducts = useMemo(() => {
    let result = initialProducts;

    // Segment filter
    if (filters.seg) {
      result = result.filter((p) => p.segment === filters.seg);
    }

    // Therapeutic area filter
    if (filters.area) {
      result = result.filter(
        (p) => normalizeStr(p.category) === normalizeStr(filters.area)
      );
    }

    // Dosage form filter
    if (filters.form) {
      result = result.filter(
        (p) => normalizeStr(p.dosageForm) === normalizeStr(filters.form)
      );
    }

    // Search query filter (generic name and category)
    if (filters.q.trim()) {
      const queryNorm = normalizeStr(filters.q.trim());
      result = result.filter((p) => {
        const genNorm = normalizeStr(p.generic);
        const catNorm = normalizeStr(p.category);
        return genNorm.includes(queryNorm) || catNorm.includes(queryNorm);
      });
    }

    return result;
  }, [initialProducts, filters]);

  return (
    <div>
      {/* Filter and View Controls wrapped in Suspense for useSearchParams */}
      <Suspense
        fallback={
          <div className="h-24 bg-paper/50 animate-pulse border border-rule rounded-[2px] mb-8" />
        }
      >
        <FormularyFilters
          categories={categories}
          dosageForms={dosageForms}
          totalCount={initialProducts.length}
          filteredCount={filteredProducts.length}
          defaultArea={initialCategory}
          onFilterChange={handleFilterChange}
        />
      </Suspense>

      {/* Content Area */}
      {filteredProducts.length === 0 ? (
        <div
          data-testid="formulary-empty-state"
          className="border border-rule rounded-[2px] bg-porcelain p-10 md:p-14 text-center my-8 space-y-6"
        >
          <div className="w-14 h-14 mx-auto rounded-[2px] bg-mist border border-rule flex items-center justify-center text-ink-3">
            <FileQuestion className="w-7 h-7" aria-hidden="true" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-serif text-2xl text-ink font-light">
              Not in the published list. We can source it.
            </h3>
            <p className="font-sans text-sm text-ink-3 leading-relaxed">
              If the specific active pharmaceutical ingredient, dosage form, or release profile you require is not listed above, our merchant export desk sources through our network of licensed GMP-certified manufacturing partners.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={`/contact?type=sourcing${filters.q ? `&q=${encodeURIComponent(filters.q)}` : ""}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[2px] bg-accent-700 hover:bg-accent-500 text-porcelain font-mono text-xs uppercase tracking-widest font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
            >
              <span>Request custom sourcing {filters.q ? `for "${filters.q}"` : ""}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : filters.view === "grid" ? (
        <PeriodicGrid products={filteredProducts} groupByCategory={true} />
      ) : (
        <ProcurementTable products={filteredProducts} />
      )}
    </div>
  );
}
