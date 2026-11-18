import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { CartonInteractive } from "@/components/privatelabel/CartonInteractive";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { TIMELINE_STAGES } from "@/content/export";

export const metadata: Metadata = {
  title: "Private Label & Contract Manufacturing | Shreevan Group",
  description:
    "Contract manufacturing, custom packaging, bilingual artwork engineering, and regulatory dossier alignment for pharmaceutical importers and distributors.",
};

export default function PrivateLabelPage() {
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
        name: "Private Label",
        item: "https://shreevangroup.com/private-label",
      },
    ],
  };

  return (
    <main id="main-content" className="w-full bg-paper text-ink min-h-screen">
      <JsonLd data={breadcrumbs} />

      <ContentPageHeader
        index="09"
        label="PRIVATE LABEL"
        title="Your brand on licensed Indian formulations."
        subtitle="Custom primary blister foils, folding cartons, and destination language artwork engineered for national marketing authorization."
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 space-y-20">
        {/* Section 1: What's Included */}
        <section aria-labelledby="heading-included" className="space-y-8">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                TURNKEY SCOPE
              </span>
              <h2 id="heading-included" className="font-display text-3xl font-light text-ink mt-1">
                What Is Included
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              CONTRACT MANUFACTURING CAPABILITIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-porcelain border border-rule p-6 space-y-3 shadow-[0_2px_8px_rgba(15,27,36,0.02)]">
              <span className="font-mono text-xs text-accent-700 font-bold block">01. PACKAGING</span>
              <h3 className="font-display text-lg font-light text-ink">Custom Formats</h3>
              <p className="font-body text-xs text-ink-2 leading-relaxed">
                Primary blister foils (Alu-Alu, PVC/PVDC), amber bottles, and tamper-evident cartons designed for tropical humidity.
              </p>
            </div>

            <div className="bg-porcelain border border-rule p-6 space-y-3 shadow-[0_2px_8px_rgba(15,27,36,0.02)]">
              <span className="font-mono text-xs text-accent-700 font-bold block">02. ARTWORK</span>
              <h3 className="font-display text-lg font-light text-ink">Bilingual Compliance</h3>
              <p className="font-body text-xs text-ink-2 leading-relaxed">
                Complete artwork typesetting in French, Spanish, Russian, Portuguese, or Arabic conforming to health ministry directives.
              </p>
            </div>

            <div className="bg-porcelain border border-rule p-6 space-y-3 shadow-[0_2px_8px_rgba(15,27,36,0.02)]">
              <span className="font-mono text-xs text-accent-700 font-bold block">03. REGISTRATION</span>
              <h3 className="font-display text-lg font-light text-ink">Dossier Package</h3>
              <p className="font-body text-xs text-ink-2 leading-relaxed">
                Module 3 quality documentation, stability testing summaries, and process validation data supplied for marketing authorization.
              </p>
            </div>

            <div className="bg-porcelain border border-rule p-6 space-y-3 shadow-[0_2px_8px_rgba(15,27,36,0.02)]">
              <span className="font-mono text-xs text-accent-700 font-bold block">04. RELEASE</span>
              <h3 className="font-display text-lg font-light text-ink">Batch Testing</h3>
              <p className="font-body text-xs text-ink-2 leading-relaxed">
                Batch-wise analytical release under cGMP standards with Certificate of Analysis (COA) provided with each commercial shipment.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Carton Net */}
        <section aria-labelledby="heading-carton" className="space-y-8">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                PACKAGING ENGINEERING
              </span>
              <h2 id="heading-carton" className="font-display text-3xl font-light text-ink mt-1">
                Carton Adaptation Architecture
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              SELECT ANY ZONE TO INSPECT
            </span>
          </div>

          <CartonInteractive />
        </section>

        {/* Section 3: MOQ Notice */}
        <section aria-labelledby="heading-moq" className="border border-rule bg-porcelain p-8 sm:p-12 space-y-4 rounded-[2px] shadow-[0_2px_8px_rgba(15,27,36,0.02)]">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold block">
            BATCH PLANNING POLICY
          </span>
          <h2 id="heading-moq" className="font-display text-2xl sm:text-3xl font-light text-ink">
            Minimum Order Quantities (MOQs)
          </h2>
          <p className="font-body text-sm sm:text-base text-ink-2 leading-relaxed max-w-4xl">
            Minimum order quantities depend strictly on the active molecule, pack size, and production tooling at our partner facilities. Standard batch runs typically range from 50,000 to 100,000 blister strips or 5,000 to 10,000 bottles. Requisition volumes can be structured across scheduled consignments to align with foreign import quotas.
          </p>
        </section>

        {/* Section 4: Timeline Stages */}
        <section aria-labelledby="heading-timeline" className="space-y-8">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                PROCESS WORKFLOW
              </span>
              <h2 id="heading-timeline" className="font-display text-3xl font-light text-ink mt-1">
                Contract Manufacturing Milestones
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              PHASED EXECUTION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {TIMELINE_STAGES.map((stage) => (
              <div
                key={stage.step}
                className="bg-porcelain border border-rule p-5 space-y-3 flex flex-col justify-between shadow-[0_2px_8px_rgba(15,27,36,0.02)]"
              >
                <div className="space-y-2">
                  <span className="font-mono text-sm font-bold text-accent-700">
                    STAGE {stage.step}
                  </span>
                  <h3 className="font-display text-base font-light text-ink">
                    {stage.title}
                  </h3>
                  <p className="font-body text-xs text-ink-2 leading-relaxed">
                    {stage.action}
                  </p>
                </div>
                <div className="pt-3 border-t border-rule font-mono text-[10px] text-ink-3">
                  <span className="uppercase block font-semibold mb-0.5">DELIVERABLE:</span>
                  <p className="font-body text-ink-2">{stage.deliverable}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Closing CTA */}
        <section className="border-2 border-rule bg-porcelain p-8 sm:p-12 space-y-6 rounded-[2px] shadow-[0_4px_20px_rgba(15,27,36,0.04)]">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold block">
              PARTNERSHIP DESK
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-ink tracking-tight">
              Begin your private label formulation project.
            </h2>
            <p className="font-body text-sm sm:text-base text-ink-2 leading-relaxed">
              Send us your formulation specification, target pack presentations, and destination market requirements. Our technical team prepares packaging die-lines and production costings.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link href="/contact?type=partnership">
              <Button variant="primary">
                Inquire About Private Label →
              </Button>
            </Link>
            <Link href="/formulary">
              <Button variant="secondary">
                Explore Available Formulations
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
