import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getPublicProducts,
  getCategories,
  getDosageForms,
  categoryToSlug,
  slugToCategory,
  getCategoryIntro,
} from "@/lib/catalogue";
import { company } from "@/config/company";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Footnote } from "@/components/ui/Footnote";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FormularyExplorer } from "@/components/formulary";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((c) => ({
    category: categoryToSlug(c.category),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const categoryName = slugToCategory(slug);

  if (!categoryName) {
    return {
      title: "Category Not Found · Shreevan Group",
    };
  }

  return {
    title: `${categoryName} Formulations · The Formulary`,
    description: `Export-grade ${categoryName.toLowerCase()} pharmaceutical formulations and healthcare products sourced from licensed GMP-certified manufacturing partners.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const categoryName = slugToCategory(slug);

  if (!categoryName) {
    notFound();
  }

  const publicProducts = getPublicProducts();
  const categoryProducts = publicProducts.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

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

  const asOfDate = company.lastUpdated;
  const categoryIntro = getCategoryIntro(slug);

  return (
    <main className="min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb / Back Link */}
        <div>
          <Link
            href="/formulary"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink-3 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>All Therapeutic Areas</span>
          </Link>
        </div>

        {/* Category Hero Header */}
        <header className="space-y-4 max-w-3xl">
          <SectionLabel number="02" label={`FORMULARY · ${categoryName.toUpperCase()}`} />

          <SplitHeading
            text={categoryName}
            as="h1"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink font-light tracking-tight leading-[1.08]"
          />

          <div className="flex flex-wrap items-baseline gap-2 pt-1">
            <p className="font-sans text-lg sm:text-xl text-ink-2">
              <strong className="font-semibold text-ink">{categoryProducts.length}</strong> active formulations
              in this therapeutic segment
            </p>
            {asOfDate && <Footnote asOf={asOfDate} />}
          </div>

          <p className="font-sans text-sm text-ink-3 max-w-2xl leading-relaxed">
            {categoryIntro}
          </p>
        </header>

        {/* Interactive Explorer pre-filtered */}
        <section aria-label={`${categoryName} formulations explorer`}>
          <FormularyExplorer
            initialProducts={publicProducts}
            categories={categories}
            dosageForms={dosageForms}
            initialCategory={categoryName}
          />
        </section>
      </div>
    </main>
  );
}
