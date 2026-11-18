import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getPublicProducts } from "@/lib/catalogue";
import { TechnicalDataSheet } from "@/components/formulary";
import { JsonLd } from "@/components/seo/JsonLd";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const products = getPublicProducts();
  return products.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found · Shreevan Group",
    };
  }

  return {
    title: `${product.generic} (${product.dosageForm}) · Technical Data Sheet`,
    description: `Export technical specification, formulation composition, and regulatory documentation availability for ${product.generic}. Sourced from licensed GMP-certified manufacturing partners.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  // Schema.org Product JSON-LD (strictly Product schema, zero medical or curative claims, zero unbacked offers)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.generic,
    category: product.category,
    description: `Pharmaceutical finished formulation: ${product.generic} (${product.dosageForm}). Export documentation and Certificate of Analysis available upon request.`,
    sku: `SG-${product.id}`,
  };

  return (
    <main className="min-h-screen py-12 md:py-16">
      {/* Product JSON-LD Script */}
      <JsonLd data={productJsonLd} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnicalDataSheet product={product} />
      </div>
    </main>
  );
}
