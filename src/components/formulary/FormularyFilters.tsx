"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X, LayoutGrid, Table as TableIcon } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FormularyFiltersProps {
  categories: FilterOption[];
  dosageForms: FilterOption[];
  totalCount: number;
  filteredCount: number;
  defaultArea?: string;
  onFilterChange: (filters: {
    q: string;
    area: string;
    form: string;
    seg: string;
    view: "grid" | "table";
  }) => void;
}

export function FormularyFilters({
  categories,
  dosageForms,
  totalCount,
  filteredCount,
  defaultArea,
  onFilterChange,
}: FormularyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const initialQ = searchParams.get("q") ?? "";
  const initialArea = searchParams.get("area") ?? defaultArea ?? "";
  const initialForm = searchParams.get("form") ?? "";
  const initialSeg = searchParams.get("seg") ?? "";
  const initialView = (searchParams.get("view") as "grid" | "table") || "grid";

  const [q, setQ] = useState(initialQ);
  const [area, setArea] = useState(initialArea);
  const [form, setForm] = useState(initialForm);
  const [seg, setSeg] = useState(initialSeg);
  const [view, setView] = useState<"grid" | "table">(initialView);

  // Sync state with parent and debounced URL updates
  useEffect(() => {
    onFilterChange({ q, area, form, seg, view });

    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (area) params.set("area", area);
      if (form) params.set("form", form);
      if (seg) params.set("seg", seg);
      if (view !== "grid") params.set("view", view);

      const qs = params.toString();
      const targetUrl = qs ? `${pathname}?${qs}` : pathname;

      startTransition(() => {
        router.replace(targetUrl, { scroll: false });
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [q, area, form, seg, view, pathname, router, onFilterChange]);

  const handleClearSearch = () => {
    setQ("");
  };

  const handleResetAll = () => {
    setQ("");
    setArea("");
    setForm("");
    setSeg("");
  };

  const isFiltered = Boolean(q || area || form || seg);

  return (
    <div className="space-y-4 mb-8">
      {/* Search and Main Toolbar */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        {/* Search input with debounced clear */}
        <div className="relative flex-1 max-w-lg">
          <label htmlFor="formulary-search" className="sr-only">
            Search formulations by generic name or category
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-3">
            <Search className="w-4 h-4" aria-hidden="true" />
          </div>
          <input
            id="formulary-search"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by generic molecule, salt, or area (e.g. Cefixime)..."
            autoComplete="off"
            spellCheck="false"
            suppressHydrationWarning
            className="w-full pl-10 pr-9 py-2.5 bg-porcelain border border-rule rounded-[2px] font-sans text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-accent-700"
          />
          {q && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search query"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-3 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 rounded-[2px]"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* View Mode Toggle & Status Count */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-ink-3">
            Showing <strong className="font-semibold text-ink">{filteredCount}</strong> of {totalCount}
          </span>

          <div
            className="flex items-center border border-rule rounded-[2px] bg-porcelain p-0.5"
            role="group"
            aria-label="View presentation toggle"
          >
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              title="Periodic Table Grid View"
              className={`p-1.5 rounded-[2px] flex items-center gap-1.5 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 ${
                view === "grid"
                  ? "bg-paper text-accent-700 font-semibold shadow-xs"
                  : "text-ink-3 hover:text-ink"
              }`}
            >
              <LayoutGrid className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setView("table")}
              aria-pressed={view === "table"}
              title="Ruled Procurement Table View"
              className={`p-1.5 rounded-[2px] flex items-center gap-1.5 text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 ${
                view === "table"
                  ? "bg-paper text-accent-700 font-semibold shadow-xs"
                  : "text-ink-3 hover:text-ink"
              }`}
            >
              <TableIcon className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Row: Segment, Category, Dosage Form, Reset */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        {/* Segment Filter (All, Allopathic, Ayurveda) */}
        <div className="flex items-center border border-rule rounded-[2px] bg-porcelain p-0.5" role="group" aria-label="Segment filter">
          <button
            type="button"
            onClick={() => setSeg("")}
            aria-pressed={seg === ""}
            className={`px-2.5 py-1 text-xs font-mono rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 ${
              seg === ""
                ? "bg-paper text-accent-700 font-semibold"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setSeg("Allopathic")}
            aria-pressed={seg === "Allopathic"}
            className={`px-2.5 py-1 text-xs font-mono rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 ${
              seg === "Allopathic"
                ? "bg-paper text-accent-700 font-semibold"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            Allopathic
          </button>
          <button
            type="button"
            onClick={() => setSeg("Ayurveda")}
            aria-pressed={seg === "Ayurveda"}
            className={`px-2.5 py-1 text-xs font-mono rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 ${
              seg === "Ayurveda"
                ? "bg-paper text-accent-700 font-semibold"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            Ayurveda
          </button>
        </div>

        {/* Therapeutic Area Select */}
        <div className="relative">
          <label htmlFor="area-filter" className="sr-only">
            Filter by therapeutic area
          </label>
          <select
            id="area-filter"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="px-3 py-1.5 text-xs font-mono bg-porcelain border border-rule rounded-[2px] text-ink focus:outline-none focus:border-accent-700"
          >
            <option value="">All Therapeutic Areas</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label} {c.count !== undefined ? `(${c.count})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Dosage Form Select */}
        <div className="relative">
          <label htmlFor="form-filter" className="sr-only">
            Filter by dosage form
          </label>
          <select
            id="form-filter"
            value={form}
            onChange={(e) => setForm(e.target.value)}
            className="px-3 py-1.5 text-xs font-mono bg-porcelain border border-rule rounded-[2px] text-ink focus:outline-none focus:border-accent-700"
          >
            <option value="">All Dosage Forms</option>
            {dosageForms.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label} {f.count !== undefined ? `(${f.count})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button
            type="button"
            onClick={handleResetAll}
            className="text-xs font-mono text-accent-700 hover:text-accent-500 underline underline-offset-2 ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 rounded-[2px]"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}
