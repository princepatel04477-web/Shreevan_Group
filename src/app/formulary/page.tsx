import React from "react";
import type { Metadata } from "next";
import { getPublicProducts, getCategories, getDosageForms } from "@/lib/catalogue";
import { company } from "@/config/company";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Footnote } from "@/components/ui/Footnote";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FormularyExplorer } from "@/components/formulary";

export const metadata: Metadata = {
  title: "The Formulary · Pharmaceutical Molecules & Export Catalogue",
  description:
    "Periodic table and procurement formulary of export-grade finished formulations and traditional Ayurveda products sourced from licensed GMP-certified manufacturing partners.",
};

export default function FormularyPage() {
  const publicProducts = getPublicProducts();
  const categories = getCategories().map((c) => ({
    value: c.category,
    label: c.category,
    count: c.count,
  }));
  const dosageForms = getDosageForms().map((d) => ({
    value: d.dosageForm,
    label: d.dosageForm,
    count: d.count,
  }));

  const publicCount = publicProducts.length;
  const categoryCount = categories.length;
  const asOfDate = company.lastUpdated;

  return (
    <main className="min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Formulary Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <SectionLabel number="02" label="THE FORMULARY" />

          <SplitHeading
            text="Formulations, by molecule."
            as="h1"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink font-light tracking-tight leading-[1.08]"
          />

          <div className="flex flex-wrap items-baseline gap-2 pt-1">
            <p className="font-sans text-lg sm:text-xl text-ink-2">
              <strong className="font-semibold text-ink">{publicCount}</strong> formulations across{" "}
              <strong className="font-semibold text-ink">{categoryCount}</strong> therapeutic areas
            </p>
            {asOfDate && <Footnote asOf={asOfDate} />}
          </div>

          <p className="font-sans text-sm text-ink-3 max-w-2xl leading-relaxed">
            All finished formulations are sourced from licensed GMP-certified manufacturing partners. Explore by periodic molecule symbol, therapeutic category, or dosage form.
          </p>
        </header>

        {/* Interactive Explorer (Filters, Grid, Table, Search) */}
        <section aria-label="Catalogue molecules explorer">
          <FormularyExplorer
            initialProducts={publicProducts}
            categories={categories}
            dosageForms={dosageForms}
          />
        </section>
      </div>
    </main>
  );
}
