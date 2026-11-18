import React from "react";
import { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Regulatory Disclaimer | Shreevan Group",
  description:
    "Statutory regulatory disclaimer regarding pharmaceutical formulations, AYUSH products, and international regulatory licensing.",
};

export default function DisclaimerPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://shreevangroup.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Regulatory Disclaimer",
        item: "https://shreevangroup.com/disclaimer",
      },
    ],
  };

  const companyName = company.legalName || company.tradeName || "Shreevan Group";

  return (
    <LegalLayout
      label="STATUTORY POLICY"
      title="Regulatory Disclaimer"
      description={`Statutory disclosures, pharmaceutical licensing frameworks, and regulatory notices for international buyers reviewing ${companyName} formulations.`}
    >
      <JsonLd data={breadcrumbs} />

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          1. No Medical Advice
        </h2>
        <p>
          The contents of this website—including technical data sheets, generic molecule compositions, and dosage presentations—are published solely for regulatory documentation and commercial procurement review by licensed healthcare professionals and pharmaceutical importers.
        </p>
        <p>
          This website does not provide medical diagnoses, treatment recommendations, clinical consultations, or dosage guidance for individual patients.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          2. Destination Country Regulatory Compliance
        </h2>
        <p>
          Importation of pharmaceutical formulations is subject to the national drug regulatory authorities of the importing country (e.g., FDA, Ministry of Health, Pharmacy Board).
        </p>
        <p>
          While Shreevan Group assists with standard WHO-format documentation (including Certificates of Pharmaceutical Product, batch-wise COAs, and stability summaries), obtaining required marketing authorizations, import permits, and customs quotas in the destination territory remains the legal responsibility of the registered importer.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          3. Ayurveda &amp; Traditional Herbal Formulations
        </h2>
        <p>
          All Ayurvedic and botanical formulations listed on this platform are manufactured in accordance with the Ayurvedic Pharmacopoeia of India (API) under licensed AYUSH facilities. We present active herbal compositions and dosage presentations without therapeutic claims or disease cures.
        </p>
        <p>
          Classification of these formulations (whether as herbal medicines, dietary supplements, traditional remedies, or complementary health products) varies by jurisdiction and is the statutory responsibility of the importing entity.
        </p>
      </section>
    </LegalLayout>
  );
}
