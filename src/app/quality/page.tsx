import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { company } from "@/config/company";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { CertificateViewer } from "@/components/quality/CertificateViewer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Quality & Compliance | Shreevan Group — Pharmaceutical Verification",
  description:
    "Quality assurance framework, pharmacovigilance protocols, GMP partner registers, and Certificate of Analysis verification for export consignments.",
};

export default function QualityPage() {
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
        name: "Quality & Compliance",
        item: "https://shreevangroup.com/quality",
      },
    ],
  };

  const defaultQualityPolicy =
    company.qualityPolicy ||
    "Shreevan Group operates under a strict analytical compliance mandate: no commercial consignment is released for export without comprehensive batch-wise testing, complete analytical Certificates of Analysis (COA), and licensed Good Manufacturing Practice documentation.";

  return (
    <main id="main-content" className="w-full bg-paper text-ink min-h-screen">
      <JsonLd data={breadcrumbs} />

      <ContentPageHeader
        index="08"
        label="QUALITY & COMPLIANCE"
        title="Every formulation backed by verified analytical data."
        subtitle="We supply only what our partner laboratories can test, document, and certify. Sourced exclusively from licensed GMP-certified manufacturing partners across India."
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 space-y-20">
        {/* Section 1: Quality Policy */}
        <section aria-labelledby="heading-policy" className="space-y-6">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                COMPLIANCE MANDATE
              </span>
              <h2 id="heading-policy" className="font-display text-3xl font-light text-ink mt-1">
                Quality Policy
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              STATUTORY EXPORT STANDARD
            </span>
          </div>

          <div className="bg-porcelain border border-rule p-8 sm:p-12 space-y-4 shadow-[0_2px_8px_rgba(15,27,36,0.02)]">
            <p className="font-display text-xl sm:text-2xl font-light text-ink leading-relaxed">
              &ldquo;{defaultQualityPolicy}&rdquo;
            </p>
            <div className="pt-4 border-t border-rule flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-ink-3">
              <span>Testing Standard: British Pharmacopoeia (BP) / United States Pharmacopeia (USP)</span>
              <span>Audit Trail: Retained counter-samples maintained for entire shelf life</span>
            </div>
          </div>
        </section>

        {/* Section 2: Manufacturing Partners Register */}
        <section aria-labelledby="heading-partners" className="space-y-6">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                FACILITIES &amp; INFRASTRUCTURE
              </span>
              <h2 id="heading-partners" className="font-display text-3xl font-light text-ink mt-1">
                Licensed Manufacturing Partners
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              cGMP LICENSED SITES
            </span>
          </div>

          {company.manufacturingPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.manufacturingPartners.map((partner) => (
                <div key={partner.name} className="bg-porcelain border border-rule p-6 space-y-3">
                  <h3 className="font-display text-lg text-ink font-light">{partner.name}</h3>
                  <p className="font-mono text-xs text-ink-3">Location: {partner.city}</p>
                  <div className="pt-2 flex flex-wrap gap-1">
                    {partner.certifications.map((c) => (
                      <span key={c} className="bg-mist text-ink-2 font-mono text-[10px] px-2 py-0.5">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-porcelain border border-rule p-8 text-center space-y-2">
              <p className="font-display text-lg font-light text-ink">
                Partner Production Network
              </p>
              <p className="font-body text-xs text-ink-3 max-w-xl mx-auto">
                All finished formulations are contract manufactured at licensed partner facilities holding valid State Drug Controller manufacturing licenses and cGMP certifications. Specific site audits are facilitated for institutional tender buyers.
              </p>
            </div>
          )}
        </section>

        {/* Section 3: Statutory Certification Register (#documents anchor) */}
        <section id="documents" aria-labelledby="heading-certificates" className="space-y-8 scroll-mt-24">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                ACCREDITATION REGISTER
              </span>
              <h2 id="heading-certificates" className="font-display text-3xl font-light text-ink mt-1">
                Regulatory Certificates &amp; Licences
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              INSPECTION SHEETS
            </span>
          </div>

          <CertificateViewer certifications={company.certificationsHeld} />
        </section>

        {/* Section 4: Pharmacovigilance & Complaints (#pharmacovigilance anchor) */}
        <section id="pharmacovigilance" aria-labelledby="heading-pv" className="space-y-8 scroll-mt-24">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                SAFETY PROTOCOLS
              </span>
              <h2 id="heading-pv" className="font-display text-3xl font-light text-ink mt-1">
                Pharmacovigilance &amp; Complaints Handling
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              MANDATORY 2-BUSINESS-DAY SLA
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-porcelain border border-rule p-6 space-y-3 shadow-[0_2px_8px_rgba(15,27,36,0.02)]">
              <span className="font-mono text-xs text-accent-700 font-bold block">
                STEP 01: NOTIFICATION
              </span>
              <h3 className="font-display text-lg font-light text-ink">
                Formal Incident Logging
              </h3>
              <p className="font-body text-xs text-ink-2 leading-relaxed">
                Any suspected adverse event, physical defect, or transit packaging deviation must be reported
                with batch numbers and photographs directly to our dedicated pharmacovigilance desk.
              </p>
            </div>

            <div className="bg-porcelain border border-rule p-6 space-y-3 shadow-[0_2px_8px_rgba(15,27,36,0.02)]">
              <span className="font-mono text-xs text-accent-700 font-bold block">
                STEP 02: INVESTIGATION
              </span>
              <h3 className="font-display text-lg font-light text-ink">
                Counter-Sample Analysis
              </h3>
              <p className="font-body text-xs text-ink-2 leading-relaxed">
                Our export desk acknowledges all formal complaints within 2 business days. Control samples from the
                corresponding batch are retrieved from laboratory archives for re-assay and root-cause analysis.
              </p>
            </div>

            <div className="bg-porcelain border border-rule p-6 space-y-3 shadow-[0_2px_8px_rgba(15,27,36,0.02)]">
              <span className="font-mono text-xs text-accent-700 font-bold block">
                STEP 03: RESOLUTION &amp; RECALL
              </span>
              <h3 className="font-display text-lg font-light text-ink">
                Corrective Action &amp; CAPA
              </h3>
              <p className="font-body text-xs text-ink-2 leading-relaxed">
                A formal Corrective and Preventive Action (CAPA) report is issued to the importer. Where required,
                rapid quarantine and batch recall procedures are triggered in compliance with WHO guidelines.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/contact?type=complaint">
              <Button variant="secondary">
                Submit Quality Incident / Complaint Report →
              </Button>
            </Link>
          </div>
        </section>

        {/* Section 5: Anti-Counterfeit Verification (#anti-counterfeit anchor) */}
        <section id="anti-counterfeit" aria-labelledby="heading-counterfeit" className="space-y-6 scroll-mt-24">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                SUPPLY CHAIN AUTHENTICATION
              </span>
              <h2 id="heading-counterfeit" className="font-display text-3xl font-light text-ink mt-1">
                Anti-Counterfeit &amp; Batch Verification
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              LEGITIMATE CARGO SECURITY
            </span>
          </div>

          <div className="bg-porcelain border border-rule p-8 space-y-4">
            <h3 className="font-display text-xl font-light text-ink">
              Verify Consignments Directly With Our Export Desk
            </h3>
            <p className="font-body text-sm text-ink-2 leading-relaxed max-w-3xl">
              Foreign importers, customs authorities, and hospital procurement officers can verify any Shreevan Group
              commercial invoice and batch release certificate by transmitting the invoice number and product batch
              identifier to our export verification desk.
            </p>
            <div className="pt-3 font-mono text-xs text-ink-3 flex flex-wrap gap-6 border-t border-rule">
              <span>Verification Email: verification@shreevangroup.com</span>
              <span>Direct Hotline: Available on shipping manifest</span>
            </div>
          </div>
        </section>

        {/* Section 6: Cold Chain & Temperature Monitoring (#coldchain anchor) */}
        <section id="coldchain" aria-labelledby="heading-coldchain" className="space-y-6 scroll-mt-24">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                THERMAL CONTROL
              </span>
              <h2 id="heading-coldchain" className="font-display text-3xl font-light text-ink mt-1">
                Cold Chain &amp; Temperature Protocols
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              2°C–8°C / 15°C–25°C MONITORING
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-porcelain border border-rule p-6 space-y-3">
              <span className="font-mono text-xs text-accent-700 font-bold block">
                01. SENSITIVE LIQUIDS &amp; INJECTABLES
              </span>
              <h3 className="font-display text-lg font-light text-ink">
                2°C – 8°C Strict Cold Chain
              </h3>
              <p className="font-body text-xs text-ink-2 leading-relaxed">
                Temperature-validated shippers with Phase Change Materials (PCM) and active data loggers maintaining unbroken thermal integrity.
              </p>
            </div>

            <div className="bg-porcelain border border-rule p-6 space-y-3">
              <span className="font-mono text-xs text-accent-700 font-bold block">
                02. CONTROLLED ROOM TEMPERATURE
              </span>
              <h3 className="font-display text-lg font-light text-ink">
                15°C – 25°C CRT Maritime
              </h3>
              <p className="font-body text-xs text-ink-2 leading-relaxed">
                Insulated thermal pallet covers and refrigerated sea containers preventing heat degradation during tropical ocean transits.
              </p>
            </div>

            <div className="bg-porcelain border border-rule p-6 space-y-3">
              <span className="font-mono text-xs text-accent-700 font-bold block">
                03. AUDITABLE TRANSIT LOGS
              </span>
              <h3 className="font-display text-lg font-light text-ink">
                Digital USB Loggers
              </h3>
              <p className="font-body text-xs text-ink-2 leading-relaxed">
                Single-use and multi-use calibrated digital data loggers included with each consignment, generating instant PDF temperature audit trails.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Ayurveda Compliance Statement */}
        <section aria-labelledby="heading-ayush" className="border border-rule bg-mist/30 p-8 space-y-4 rounded-[2px]">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold block">
            REGULATORY NOTICE · AYUSH FORMULATIONS
          </span>
          <h2 id="heading-ayush" className="font-display text-2xl font-light text-ink">
            Ayurveda &amp; Traditional Herbal Formulations
          </h2>
          <p className="font-body text-xs sm:text-sm text-ink-2 leading-relaxed max-w-4xl">
            Ayurvedic formulations listed in our catalogue are manufactured in compliance with the Ayurvedic Pharmacopoeia
            of India (API) under licensed AYUSH facilities. We present names, compositions, and dosage forms without
            therapeutic or disease claims. Regulatory classification (as herbal medicine, traditional remedy, dietary
            supplement, or food product) varies by destination market; verification and compliance with destination
            ministry regulations remains the responsibility of the importing party.
          </p>
        </section>
      </div>
    </main>
  );
}
