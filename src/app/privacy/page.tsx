import React from "react";
import { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Privacy Policy | Shreevan Group",
  description:
    "Information handling practices, data retention, and privacy policy for export enquiries submitted to Shreevan Group.",
};

export default function PrivacyPage() {
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
        name: "Privacy Policy",
        item: "https://shreevangroup.com/privacy",
      },
    ],
  };

  const companyName = company.legalName || company.tradeName || "Shreevan Group";

  return (
    <LegalLayout
      label="STATUTORY POLICY"
      title="Privacy Policy"
      description={`This Privacy Policy outlines how ${companyName} handles corporate contact details, commercial requisitions, and technical documentation transmitted through this website.`}
    >
      <JsonLd data={breadcrumbs} />

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          1. Data Collection Scope
        </h2>
        <p>
          We collect information strictly when submitted voluntarily through our export requisition and quotation forms. This includes:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Corporate entity name and country of incorporation</li>
          <li>Authorized contact person name, professional email address, and telephone number</li>
          <li>Product formulation specifications, required quantities, and destination port details</li>
          <li>Attached tender documents, product lists, or regulatory import permits</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          2. Technical Infrastructure &amp; Security
        </h2>
        <p>
          Enquiry transmissions are routed over encrypted HTTPS channels (TLS 1.3) directly to our export operations desk via transaction email infrastructure (Resend). We apply strict in-memory IP rate limiting to prevent automated spam and abuse.
        </p>
        <p>
          We do not deploy third-party advertising tracking cookies, behavioral ad pixels, or commercial tracking networks on this website. Session states (such as your active enquiry basket) are retained strictly in your browser&apos;s local storage.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          3. Use of Commercial Data
        </h2>
        <p>
          Commercial and regulatory details provided are used solely to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Generate accurate FOB/CIF export quotations and batch proforma invoices</li>
          <li>Verify import licensing and documentation requirements for target jurisdictions</li>
          <li>Respond to formal quality complaints or pharmacovigilance reports</li>
        </ul>
        <p>
          We do not sell, rent, or lease commercial buyer lists or requisition data to third-party marketing brokers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-light text-ink">
          4. Legal Review Notice
        </h2>
        <p className="border-l-2 border-accent-700 pl-4 italic text-ink-3">
          Note: This privacy statement describes current technical operations and data flows. Prior to commercial contract execution, formal non-disclosure agreements (NDAs) and bilateral supply contracts govern all commercial engagements.
        </p>
      </section>
    </LegalLayout>
  );
}
