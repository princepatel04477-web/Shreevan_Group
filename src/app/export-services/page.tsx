import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { DocRowDrawer } from "@/components/export/DocRowDrawer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { BUYER_SEGMENTS, INCOTERMS, SHIPPING_MODES } from "@/content/export";

export const metadata: Metadata = {
  title: "Export Services | Shreevan Group — Indian Pharmaceutical Exporter",
  description:
    "Comprehensive pharmaceutical merchant export operations: buyer procurement solutions, Incoterms 2020 shipping logistics, and statutory regulatory export dossiers.",
};

export default function ExportServicesPage() {
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
        name: "Export Services",
        item: "https://shreevangroup.com/export-services",
      },
    ],
  };

  return (
    <main id="main-content" className="w-full bg-paper text-ink min-h-screen">
      <JsonLd data={breadcrumbs} />

      {/* Page Header */}
      <ContentPageHeader
        index="07"
        label="EXPORT SERVICES"
        title="Complete pharmaceutical export operations."
        subtitle="From regulatory dossier preparation to international freight customs release. Sourced exclusively from licensed GMP-certified manufacturing partners across India."
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 space-y-20">
        {/* Section 1: Who We Supply */}
        <section aria-labelledby="heading-buyers" className="space-y-8">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                PROCUREMENT PARTNERS
              </span>
              <h2 id="heading-buyers" className="font-display text-3xl font-light text-ink mt-1">
                Who We Supply
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              INSTITUTIONAL &amp; COMMERCIAL PROCUREMENT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BUYER_SEGMENTS.map((segment) => (
              <div
                key={segment.id}
                className="bg-porcelain border border-rule p-6 space-y-4 shadow-[0_2px_8px_rgba(15,27,36,0.02)]"
              >
                <div className="border-b border-rule pb-3">
                  <h3 className="font-display text-xl font-light text-ink">
                    {segment.title}
                  </h3>
                  <span className="font-mono text-xs text-accent-700 font-medium block mt-0.5">
                    {segment.subtitle}
                  </span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-ink-3 uppercase block mb-0.5">OPERATIONAL REQUIREMENTS:</span>
                    <p className="font-body text-ink-2 text-sm leading-relaxed">{segment.requirements}</p>
                  </div>
                  <div className="pt-2">
                    <span className="text-ink-3 uppercase block mb-0.5">OUR SUPPLY SOLUTION:</span>
                    <p className="font-body text-ink-2 text-sm leading-relaxed">{segment.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Incoterms Table (with #freight anchor) */}
        <section id="freight" aria-labelledby="heading-incoterms" className="space-y-8 scroll-mt-24">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                COMMERCIAL FREIGHT
              </span>
              <h2 id="heading-incoterms" className="font-display text-3xl font-light text-ink mt-1">
                Incoterms® 2020 Shipping Modes
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              INTERNATIONAL TRADE TERMS
            </span>
          </div>

          <div
            tabIndex={0}
            role="region"
            aria-label="Incoterms 2020 shipping terms comparison table"
            className="overflow-x-auto border border-rule bg-porcelain shadow-[0_2px_8px_rgba(15,27,36,0.02)] outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
          >
            <table className="w-full text-left font-mono text-xs">
              <caption className="sr-only">Incoterms 2020 Shipping Terms and Responsibility Breakdown</caption>
              <thead>
                <tr className="border-b border-rule bg-mist/40 text-ink-3 text-[11px] uppercase tracking-wider">
                  <th scope="col" className="py-3 px-6 font-semibold">Term</th>
                  <th scope="col" className="py-3 px-6 font-semibold">Title</th>
                  <th scope="col" className="py-3 px-6 font-semibold">Handover Scope</th>
                  <th scope="col" className="py-3 px-6 font-semibold">Operational Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule font-body text-sm text-ink-2">
                {INCOTERMS.map((term) => (
                  <tr key={term.term} className="hover:bg-paper/40 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-accent-700 text-base">
                      {term.term}
                    </td>
                    <td className="py-4 px-6 font-medium text-ink">
                      {term.title}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-ink-3">
                      {term.scope}
                    </td>
                    <td className="py-4 px-6 text-xs leading-relaxed max-w-md">
                      {term.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Shipping Modes */}
        <section aria-labelledby="heading-shipping-modes" className="space-y-8">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                LOGISTICS CHANNELS
              </span>
              <h2 id="heading-shipping-modes" className="font-display text-3xl font-light text-ink mt-1">
                Outbound Export Logistics
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              SEA · AIR · COURIER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHIPPING_MODES.map((mode) => (
              <div
                key={mode.mode}
                className="bg-porcelain border border-rule p-6 space-y-4 shadow-[0_2px_8px_rgba(15,27,36,0.02)] flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs text-accent-700 font-bold uppercase tracking-wider block">
                    {mode.mode} TRANSIT
                  </span>
                  <h3 className="font-display text-lg font-light text-ink">
                    {mode.title}
                  </h3>
                  <span className="font-mono text-xs text-ink-3 block">
                    {mode.scope}
                  </span>
                  <p className="font-body text-xs text-ink-2 leading-relaxed pt-2">
                    {mode.transitNote}
                  </p>
                </div>

                <div className="pt-3 border-t border-rule font-mono text-[11px] text-ink-3">
                  <span className="uppercase block font-semibold mb-0.5">TEMPERATURE CONTROL:</span>
                  <p className="font-body text-ink-2">{mode.temperatureControl}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Regulatory Export Dossier Suite */}
        <section id="documentation" aria-labelledby="heading-documentation" className="space-y-8 scroll-mt-24">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                STATUTORY INSTRUMENTS
              </span>
              <h2 id="heading-documentation" className="font-display text-3xl font-light text-ink mt-1">
                Regulatory Export Documentation
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              SELECT ANY INSTRUMENT TO INSPECT
            </span>
          </div>

          <DocRowDrawer />
        </section>

        {/* Section 5: Government Tender Support Block */}
        <section aria-labelledby="heading-tender" className="border-2 border-rule bg-porcelain p-8 sm:p-12 space-y-6 rounded-[2px] shadow-[0_4px_20px_rgba(15,27,36,0.04)]">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold block">
              INSTITUTIONAL TENDER SUPPORT
            </span>
            <h2 id="heading-tender" className="font-display text-3xl sm:text-4xl font-light text-ink tracking-tight">
              We respond to tenders with the documents asked for, in the format asked for.
            </h2>
            <p className="font-body text-sm sm:text-base text-ink-2 leading-relaxed">
              Tender submissions cannot tolerate documentation deficiencies or specification variances.
              We provide formal manufacturer authorization letters, WHO-format COPPs, stability test summaries,
              and legalized certificates of origin tailored to Ministry of Health tender requirements.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link href="/contact?type=tender">
              <Button variant="primary">
                Submit Tender Requisition
              </Button>
            </Link>
            <Link href="/formulary">
              <Button variant="secondary">
                Search Published Formulations →
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
