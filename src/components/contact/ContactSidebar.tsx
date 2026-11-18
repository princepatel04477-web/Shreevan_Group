import React from "react";
import { company, hasValue } from "@/config/company";

export function ContactSidebar() {
  const hasPhone = hasValue(company.phone);
  const hasWhatsapp = hasValue(company.whatsapp);
  const hasEmail = hasValue(company.exportDeskEmail || company.email);
  const contactEmail = company.exportDeskEmail || company.email;
  const hasAddress = hasValue(company.operationsAddress || company.registeredAddress);
  const address = company.operationsAddress || company.registeredAddress;

  const hasAnyContact = hasPhone || hasWhatsapp || hasEmail || hasAddress;

  return (
    <aside
      className="w-full bg-[var(--porcelain)] border border-[var(--rule)] p-6 md:p-8 space-y-6 rounded-[2px]"
      aria-label="Direct Export Desk Contact Details"
    >
      <div>
        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--accent-700)] mb-1">
          COMMERCIAL DESK
        </div>
        <h3 className="font-serif text-xl text-[var(--ink)]">
          Direct Channels
        </h3>
        <p className="text-xs text-[var(--ink-3)] mt-1">
          Official communication channels for registered importers, distributors, and tender authorities.
        </p>
      </div>

      {hasAnyContact && (
        <div className="space-y-4 pt-4 border-t border-[var(--rule)] text-xs font-mono">
          {hasEmail && (
            <div>
              <span className="text-[var(--ink-3)] uppercase block text-[10px] tracking-wider mb-1">
                Official Email
              </span>
              <a
                href={`mailto:${contactEmail}`}
                className="text-[var(--ink)] hover:text-[var(--accent-700)] hover:underline break-all"
              >
                {contactEmail}
              </a>
            </div>
          )}

          {hasPhone && (
            <div>
              <span className="text-[var(--ink-3)] uppercase block text-[10px] tracking-wider mb-1">
                Telephone
              </span>
              <a
                href={`tel:${company.phone}`}
                className="text-[var(--ink)] hover:text-[var(--accent-700)] hover:underline"
              >
                {company.phone}
              </a>
            </div>
          )}

          {hasWhatsapp && (
            <div>
              <span className="text-[var(--ink-3)] uppercase block text-[10px] tracking-wider mb-1">
                WhatsApp Desk
              </span>
              <a
                href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ink)] hover:text-[var(--accent-700)] hover:underline"
              >
                {company.whatsapp}
              </a>
            </div>
          )}

          {hasAddress && (
            <div>
              <span className="text-[var(--ink-3)] uppercase block text-[10px] tracking-wider mb-1">
                Desk Location
              </span>
              <p className="text-[var(--ink-2)] leading-relaxed">
                {address}
              </p>
            </div>
          )}
        </div>
      )}

      {/* SLA & Service Commitment (Strictly factual) */}
      <div className="pt-4 border-t border-[var(--rule)] space-y-3">
        <div className="text-[11px] font-mono text-[var(--ink-2)] flex items-start gap-2">
          <span className="text-[var(--accent-700)] font-bold">✓</span>
          <span>Official enquiries acknowledged within 2 business days.</span>
        </div>
        <div className="text-[11px] font-mono text-[var(--ink-2)] flex items-start gap-2">
          <span className="text-[var(--accent-700)] font-bold">✓</span>
          <span>Batch COA and regulatory dossier support on request.</span>
        </div>
        <div className="text-[11px] font-mono text-[var(--ink-2)] flex items-start gap-2">
          <span className="text-[var(--accent-700)] font-bold">✓</span>
          <span>Formulations sourced exclusively from licensed GMP-certified manufacturing partners.</span>
        </div>
      </div>
    </aside>
  );
}
