"use client";

import React, { useState, useEffect } from "react";
import { Loupe } from "@/components/motion/Loupe";
import { CertificationHeld } from "@/config/company";

export interface CertificateViewerProps {
  certifications: CertificationHeld[];
}

export function CertificateViewer({ certifications }: CertificateViewerProps) {
  const [activeCert, setActiveCert] = useState<CertificationHeld | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeCert) {
        setActiveCert(null);
      }
    };
    if (activeCert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCert]);

  if (certifications.length === 0) {
    return (
      <div className="bg-porcelain border border-rule p-8 text-center space-y-2 rounded-[2px]">
        <p className="font-display text-lg font-light text-ink">
          Manufacturer Compliance Registry
        </p>
        <p className="font-body text-xs text-ink-3 max-w-lg mx-auto">
          Every formulation is sourced from licensed manufacturing facilities holding current Good Manufacturing Practice (cGMP) certifications. Certificates are provided directly to authorized regulatory buyers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="bg-porcelain border border-rule p-6 space-y-4 shadow-[0_2px_8px_rgba(15,27,36,0.02)] flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="font-mono text-xs text-accent-700 font-bold uppercase tracking-wider block">
                STATUTORY ACCREDITATION
              </span>
              <h3 className="font-display text-lg font-light text-ink">
                {cert.name}
              </h3>
              <div className="font-mono text-xs text-ink-3 space-y-1 pt-1">
                <p>ISSUER: <span className="text-ink font-medium">{cert.issuer}</span></p>
                {cert.number && <p>CERT NO: <span className="text-ink font-medium">{cert.number}</span></p>}
                {cert.validTill && <p>VALID TILL: <span className="text-ink">{cert.validTill}</span></p>}
              </div>
            </div>

            {cert.documentUrl ? (
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="w-full mt-4 font-mono text-xs uppercase tracking-wider text-accent-700 font-semibold py-2 px-3 border border-accent-700/40 hover:bg-mist/60 text-center transition-colors rounded-[1px]"
              >
                Inspect Certificate Sheet →
              </button>
            ) : (
              <span className="font-mono text-[11px] text-ink-3 pt-2 block border-t border-rule">
                Original copy on file with export desk
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Modal Document Viewer with Loupe */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-viewer-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-3xl bg-porcelain border border-rule shadow-[0_16px_48px_rgba(15,27,36,0.2)] p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-rule pb-4">
              <div>
                <span className="font-mono text-xs text-accent-700 font-bold uppercase tracking-wider block">
                  REGULATORY CERTIFICATE INSPECTION
                </span>
                <h3 id="cert-viewer-title" className="font-display text-2xl font-light text-ink mt-1">
                  {activeCert.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                aria-label="Close certificate inspector"
                className="font-mono text-xs uppercase tracking-wider text-ink-3 hover:text-ink p-2 border border-rule rounded-[2px]"
              >
                ✕ Close (ESC)
              </button>
            </div>

            {/* Loupe Louped Paper Sheet Preview */}
            <Loupe>
              <div className="bg-paper border border-rule p-8 space-y-6 shadow-inner rounded-[2px]">
                <div className="border-b border-rule pb-4 flex justify-between items-center text-xs font-mono">
                  <span>OFFICIAL ACCREDITATION CERTIFICATE</span>
                  <span className="text-accent-700 font-bold">STATE LICENSING AUTHORITY</span>
                </div>
                <div className="space-y-4 py-4 text-center max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full border-2 border-accent-700/60 mx-auto flex items-center justify-center font-mono text-xs text-accent-700 font-bold">
                    SEAL
                  </div>
                  <h4 className="font-display text-xl text-ink font-normal">
                    {activeCert.name}
                  </h4>
                  <p className="font-body text-xs text-ink-2">
                    Issued by {activeCert.issuer}. Verified under current Good Manufacturing Practice directives.
                  </p>
                  {activeCert.number && (
                    <span className="font-mono text-xs text-ink font-semibold block bg-mist/60 py-1">
                      Registration Ref: {activeCert.number}
                    </span>
                  )}
                </div>
                <div className="border-t border-rule pt-4 flex justify-between text-[11px] font-mono text-ink-3">
                  <span>Hover to zoom into security stamp</span>
                  <span>Validity: {activeCert.validTill || "Current cGMP Cycle"}</span>
                </div>
              </div>
            </Loupe>

            <div className="flex justify-between items-center pt-2 font-mono text-xs text-ink-3">
              <span>Verified partner document</span>
              {activeCert.documentUrl && (
                <a
                  href={activeCert.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 hover:underline font-medium"
                >
                  Download Official PDF ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
