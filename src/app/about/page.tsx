import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { company } from "@/config/company";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { RegistryCard } from "@/components/about/RegistryCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us | Shreevan Group — Indian Pharmaceutical Merchant Exporter",
  description:
    "Indian pharmaceutical merchant exporter supplying finished formulations and Ayurveda, sourced from licensed GMP-certified manufacturing partners, to international markets.",
};

export default function AboutPage() {
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
        name: "About Us",
        item: "https://shreevangroup.com/about",
      },
    ],
  };

  // Build Organization JSON-LD with populated fields only
  const orgData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName || company.tradeName,
    alternateName: company.tradeName,
    url: "https://shreevangroup.com",
  };
  if (company.email) orgData.email = company.email;
  if (company.phone) orgData.telephone = company.phone;
  if (company.operationsAddress) {
    orgData.address = {
      "@type": "PostalAddress",
      streetAddress: company.operationsAddress,
      addressCountry: "IN",
    };
  }

  const defaultStory = [
    "Shreevan Group operates as an Indian pharmaceutical merchant exporter supplying finished pharmaceutical formulations and classical Ayurveda products to international markets. Sourced exclusively from licensed partner facilities operating under current Good Manufacturing Practices (cGMP), our portfolio encompasses tablets, capsules, softgels, oral suspensions, dry syrups, injections, and topical preparations.",
    "Our operational model is built around regulatory defensibility. In international pharmaceutical trade, delivery delays and cargo quarantines stem primarily from documentary variances. We coordinate complete statutory export dossiers—including batch-specific Certificates of Analysis (COA), WHO-format Certificates of Pharmaceutical Product (COPP), Certificates of Origin, and Free Sale Certificates—verifying that every consignment satisfies destination health ministry directives.",
    "We supply private pharmaceutical importers, regional distributors, hospital procurement networks, humanitarian relief organizations, and national tender authorities. Every batch is traceable through retained control samples and audited production logs, ensuring therapeutic bioequivalence and regulatory compliance across international markets.",
  ];

  const storyParagraphs = company.story && company.story.length > 0 ? company.story : defaultStory;

  return (
    <main id="main-content" className="w-full bg-paper text-ink min-h-screen">
      <JsonLd data={[breadcrumbs, orgData]} />

      <ContentPageHeader
        index="10"
        label="ABOUT SHREEVAN"
        title="An export house built on paperwork that holds up."
        subtitle="Connecting licensed Indian pharmaceutical manufacturing partner facilities with international procurement authorities and distributors worldwide."
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 space-y-20">
        {/* Section 1: 3D Registry Card */}
        <section aria-labelledby="heading-registry" className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold block">
              CORPORATE VERIFICATION
            </span>
            <h2 id="heading-registry" className="font-display text-3xl font-light text-ink">
              Statutory Company Registration
            </h2>
            <p className="font-body text-xs text-ink-3">
              Official Indian merchant export credentials and regulatory registrations maintained on file.
            </p>
          </div>

          <RegistryCard />
        </section>

        {/* Section 2: Company Story */}
        <section aria-labelledby="heading-story" className="space-y-8 max-w-4xl mx-auto">
          <div className="border-b border-rule pb-4 flex items-baseline justify-between">
            <h2 id="heading-story" className="font-display text-3xl font-light text-ink">
              Operational Focus &amp; Principles
            </h2>
            <span className="font-mono text-xs text-ink-3">
              MERCHANT EXPORT HOUSE
            </span>
          </div>

          <div className="space-y-6 font-body text-base lg:text-lg text-ink-2 leading-relaxed">
            {storyParagraphs.map((para, i) => (
              <p key={i}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Section 3: Manufacturing Partners (#manufacturing anchor) */}
        <section id="manufacturing" aria-labelledby="heading-manufacturing" className="space-y-8 scroll-mt-24">
          <div className="border-b border-rule pb-4 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                PRODUCTION NETWORK
              </span>
              <h2 id="heading-manufacturing" className="font-display text-3xl font-light text-ink mt-1">
                Licensed Manufacturing Partners
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-3">
              AUDITED cGMP FACILITIES
            </span>
          </div>

          {company.manufacturingPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {company.manufacturingPartners.map((partner) => (
                <div key={partner.name} className="bg-porcelain border border-rule p-6 space-y-3">
                  <h3 className="font-display text-lg text-ink font-light">{partner.name}</h3>
                  <p className="font-mono text-xs text-ink-3">City: {partner.city}</p>
                  <div className="flex flex-wrap gap-1">
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
                GMP-Certified Partner Facilities Across India
              </p>
              <p className="font-body text-xs text-ink-3 max-w-xl mx-auto">
                Formulations are sourced from licensed manufacturing facilities in pharmaceutical clusters across Gujarat, Himachal Pradesh, and Maharashtra holding valid cGMP and State Drug Controller accreditations.
              </p>
            </div>
          )}
        </section>

        {/* Section 4: Directors & Leadership (conditionally rendered per Honesty Rule) */}
        {company.directors && company.directors.length > 0 && (
          <section aria-labelledby="heading-leadership" className="space-y-8">
            <div className="border-b border-rule pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-bold block">
                MANAGEMENT
              </span>
              <h2 id="heading-leadership" className="font-display text-3xl font-light text-ink mt-1">
                Company Leadership
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {company.directors.map((director) => (
                <div key={director.name} className="bg-porcelain border border-rule p-6 space-y-2">
                  <h3 className="font-display text-xl text-ink font-light">{director.name}</h3>
                  <span className="font-mono text-xs text-accent-700 block">{director.role}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Group Entities (conditionally rendered) */}
        {company.groupEntities && company.groupEntities.length > 0 && (
          <section aria-labelledby="heading-entities" className="space-y-8">
            <div className="border-b border-rule pb-4">
              <h2 id="heading-entities" className="font-display text-2xl font-light text-ink">
                Group Entities
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {company.groupEntities.map((entity) => (
                <div key={entity.name} className="bg-porcelain border border-rule p-6 space-y-1">
                  <h3 className="font-display text-lg text-ink">{entity.name}</h3>
                  <span className="font-mono text-xs text-ink-3">{entity.role}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Closing Contact CTA */}
        <section className="border-2 border-rule bg-porcelain p-8 sm:p-12 space-y-6 rounded-[2px] shadow-[0_4px_20px_rgba(15,27,36,0.04)] text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold block">
              EXPORT DESK ENQUIRY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-ink tracking-tight">
              Connect with our export operations team.
            </h2>
            <p className="font-body text-sm text-ink-2 leading-relaxed">
              We provide prompt commercial quotations, regulatory documentation checklists, and formulation specifications for foreign importers and tender participants.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary">
                Open Export Requisition Form →
              </Button>
            </Link>
            <Link href="/formulary">
              <Button variant="secondary">
                View All Formulations
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
