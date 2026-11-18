import React from "react";
import { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Terms & Conditions | Shreevan Group",
  description:
    "Terms and conditions governing web access, commercial catalogue review, and international export enquiries with Shreevan Group.",
};

export default function TermsPage() {
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
        name: "Terms & Conditions",
        item: "https://shreevangroup.com/terms",
      },
    ],
  };

  const companyName = company.legalName || company.tradeName || "Shreevan Group";

  return (
    <LegalLayout
      label="STATUTORY POLICY"
      title="Terms &amp; Conditions"
      description={`Terms and commercial parameters governing access to product catalogues, technical data sheets, and quotation services provided by ${companyName}.`}
    >
      <JsonLd data={breadcrumbs} />

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          1. Business-to-Business Commercial Scope
        </h2>
        <p>
          This website is intended exclusively for authorized commercial entities: licensed pharmaceutical importers, wholesale distributors, hospital procurement boards, humanitarian agencies, and governmental tender authorities.
        </p>
        <p>
          Nothing on this site constitutes a direct-to-consumer offer of sale, medical advice, retail pharmacy dispensing, or diagnosis.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          2. Formulation Information &amp; Availability
        </h2>
        <p>
          Formulation data sheets represent specifications available through our network of licensed cGMP manufacturing partner facilities. Product availability, regulatory registration status, and minimum order quantities (MOQs) depend on destination country import requirements and production schedules.
        </p>
        <p>
          All commercial transactions are finalized strictly upon written proforma invoice, bilateral contract execution, and verification of buyer import credentials.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          3. International Shipping &amp; Incoterms
        </h2>
        <p>
          Export sales are negotiated under Incoterms® 2020 rules (principally EXW, FOB, CIF, or CIP). Risk, title transfer, and marine insurance parameters are defined in formal commercial sale agreements and letters of credit.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          4. Jurisdiction &amp; Governing Law
        </h2>
        <p>
          All communications and commercial agreements initiated through this web platform are subject to the laws of the Republic of India.
        </p>
      </section>
    </LegalLayout>
  );
}
