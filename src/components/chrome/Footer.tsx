"use client";

import React from "react";
import Link from "next/link";
import { company, hasValue, IfFact } from "@/config/company";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";

const CURRENT_YEAR = 2026;

export function Footer() {
  const copyrightYear = company.foundedYear
    ? `${company.foundedYear}–${CURRENT_YEAR}`
    : `${CURRENT_YEAR}`;
  const companyName = company.legalName || company.tradeName;

  // Determine export desk contact action (honest link from config)
  const exportDeskHref = company.exportDeskEmail
    ? `mailto:${company.exportDeskEmail}`
    : company.email
    ? `mailto:${company.email}`
    : company.whatsapp
    ? `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`
    : "/contact";

  // Check if any registry fact is verified and non-empty
  const hasRegistryFacts =
    hasValue(company.legalName) ||
    hasValue(company.foundedYear) ||
    hasValue(company.cin) ||
    hasValue(company.gstin) ||
    hasValue(company.iec) ||
    hasValue(company.rcmcNumber) ||
    (company.drugLicenceNumbers && company.drugLicenceNumbers.length > 0);

  return (
    <footer
      id="main-footer"
      role="contentinfo"
      className="bg-paper border-t border-rule text-ink relative z-20 pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Colophon Statement & Secondary CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-rule">
          <div className="max-w-2xl space-y-4">
            <LogoMark variant="horizontal" size="lg" />
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-ink-3 block mb-2">
                Export Dossier · Colophon
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.15]">
                Every shipment leaves with its paperwork.
              </h2>
            </div>
          </div>

          <div className="shrink-0">
            <a
              href={exportDeskHref}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[2px] border border-rule hover:border-ink-3/40 bg-porcelain hover:bg-mist text-ink text-sm font-medium transition-all shadow-2xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
            >
              <span>Talk to the export desk</span>
              <ArrowUpRight
                className="w-4 h-4 text-accent-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* 4 Structural Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Column 1: Formulary */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-3 mb-4">
              Formulary
            </h3>
            <ul className="space-y-2.5 text-xs text-ink-2">
              <li>
                <Link href="/formulary" className="hover:text-accent-700 transition-colors">
                  All Formulations (Periodic Grid)
                </Link>
              </li>
              <li>
                <Link
                  href="/formulary?area=Antibiotics"
                  className="hover:text-accent-700 transition-colors"
                >
                  Antibiotics &amp; Antimicrobials
                </Link>
              </li>
              <li>
                <Link
                  href="/formulary?form=Tablets"
                  className="hover:text-accent-700 transition-colors"
                >
                  Tablets &amp; Solid Orals
                </Link>
              </li>
              <li>
                <Link
                  href="/formulary?form=Injections"
                  className="hover:text-accent-700 transition-colors"
                >
                  Injectables &amp; Dry Powders
                </Link>
              </li>
              <li>
                <Link
                  href="/formulary?seg=Ayurveda"
                  className="hover:text-accent-700 transition-colors"
                >
                  Traditional AYUSH Formulations
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?type=sourcing"
                  className="hover:text-accent-700 transition-colors text-accent-700 font-medium"
                >
                  Custom Molecule Sourcing →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-3 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs text-ink-2">
              <li>
                <Link href="/about" className="hover:text-accent-700 transition-colors">
                  Origin &amp; Export Mission
                </Link>
              </li>
              <li>
                <Link href="/about#manufacturing" className="hover:text-accent-700 transition-colors">
                  Manufacturing Partners (GMP)
                </Link>
              </li>
              <li>
                <Link href="/private-label" className="hover:text-accent-700 transition-colors">
                  Private Label &amp; OEM Packaging
                </Link>
              </li>
              <li>
                <Link href="/export-services" className="hover:text-accent-700 transition-colors">
                  Export Services &amp; Logistics
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-700 transition-colors">
                  Export Desk Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Compliance & Quality */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-3 mb-4">
              Compliance
            </h3>
            <ul className="space-y-2.5 text-xs text-ink-2">
              <li>
                <Link href="/quality" className="hover:text-accent-700 transition-colors">
                  Quality Assurance Policy
                </Link>
              </li>
              <li>
                <Link href="/quality#documents" className="hover:text-accent-700 transition-colors">
                  Export Documentation (COA / COPP)
                </Link>
              </li>
              <li>
                <Link
                  href="/quality#pharmacovigilance"
                  className="hover:text-accent-700 transition-colors"
                >
                  Pharmacovigilance &amp; Complaints
                </Link>
              </li>
              <li>
                <Link
                  href="/quality#anti-counterfeit"
                  className="hover:text-accent-700 transition-colors"
                >
                  Anti-Counterfeit &amp; Batch Traceability
                </Link>
              </li>
              <li>
                <Link href="/quality#coldchain" className="hover:text-accent-700 transition-colors">
                  Cold Chain Protocols
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Export Desk (Wrapped in IfFact) */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink-3 mb-4">
              Contact Desk
            </h3>
            <div className="space-y-2.5 text-xs text-ink-2">
              <IfFact when={company.operationsAddress || company.registeredAddress}>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-ink-3 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{company.operationsAddress || company.registeredAddress}</span>
                </div>
              </IfFact>

              <IfFact when={company.phone}>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-ink-3 shrink-0" aria-hidden="true" />
                  <a href={`tel:${company.phone}`} className="hover:text-accent-700 transition-colors">
                    {company.phone}
                  </a>
                </div>
              </IfFact>

              <IfFact when={company.whatsapp}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-ink-3 shrink-0">WA:</span>
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                    className="hover:text-accent-700 transition-colors"
                  >
                    {company.whatsapp}
                  </a>
                </div>
              </IfFact>

              <IfFact when={company.email}>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-ink-3 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${company.email}`} className="hover:text-accent-700 transition-colors">
                    {company.email}
                  </a>
                </div>
              </IfFact>

              <IfFact when={company.exportDeskEmail}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-ink-3 shrink-0">Desk:</span>
                  <a
                    href={`mailto:${company.exportDeskEmail}`}
                    className="hover:text-accent-700 transition-colors"
                  >
                    {company.exportDeskEmail}
                  </a>
                </div>
              </IfFact>

              {/* If no contact details are verified yet in config, provide an honest link */}
              {!hasValue(company.email) &&
                !hasValue(company.phone) &&
                !hasValue(company.registeredAddress) && (
                  <p className="text-ink-3 leading-relaxed">
                    Direct your inquiries via our{" "}
                    <Link href="/contact" className="text-accent-700 underline underline-offset-2 hover:text-accent-500">
                      official RFQ portal
                    </Link>
                    .
                  </p>
                )}
            </div>
          </div>
        </div>

        {/* Monospace Ruled Registry Strip (Shown only if verified facts exist) */}
        {hasRegistryFacts && (
          <div className="border-y border-rule py-3.5 my-4 font-mono text-[11px] text-ink-3 uppercase tracking-wider">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <IfFact when={company.legalName}>
                <span>Legal: {company.legalName}</span>
              </IfFact>
              <IfFact when={company.foundedYear}>
                <span>Est. {company.foundedYear}</span>
              </IfFact>
              <IfFact when={company.cin}>
                <span>CIN: {company.cin}</span>
              </IfFact>
              <IfFact when={company.gstin}>
                <span>GSTIN: {company.gstin}</span>
              </IfFact>
              <IfFact when={company.iec}>
                <span>IEC: {company.iec}</span>
              </IfFact>
              <IfFact when={company.rcmcNumber}>
                <span>RCMC (Pharmexcil): {company.rcmcNumber}</span>
              </IfFact>
              <IfFact when={company.drugLicenceNumbers && company.drugLicenceNumbers.length > 0}>
                <span>DL No: {company.drugLicenceNumbers.join(", ")}</span>
              </IfFact>
            </div>
          </div>
        )}

        {/* Standing Regulatory Disclaimer */}
        <div className="border-t border-rule/60 pt-6 mt-6">
          <p className="text-[11px] leading-relaxed text-ink-3 max-w-4xl">
            Product information on this site is intended for healthcare and trade professionals.
            Availability and registration status vary by country. Products are supplied only to
            licensed importers in accordance with the regulations of the destination country.
          </p>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-8 pt-6 border-t border-rule/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-3 font-mono">
          <div>
            © {copyrightYear} {companyName}. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms of Export
            </Link>
            <Link href="/disclaimer" className="hover:text-ink transition-colors">
              Regulatory Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
