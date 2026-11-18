import React from "react";
import { company } from "@/config/company";
import { clsx } from "clsx";

export interface LegalLayoutProps {
  title: string;
  label: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function LegalLayout({
  title,
  label,
  description,
  children,
  className,
}: LegalLayoutProps) {
  const hasLastUpdated = Boolean(company.lastUpdated && company.lastUpdated.trim().length > 0);

  return (
    <main id="main-content" className={clsx("w-full bg-paper py-16 px-6 sm:px-10 lg:px-16", className)}>
      <div className="max-w-[62ch] mx-auto space-y-10">
        {/* Document Header */}
        <header className="border-b border-rule pb-6 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-ink-3">
            <span className="uppercase tracking-[0.16em] text-accent-700 font-bold">
              {label}
            </span>
            {hasLastUpdated && (
              <span className="text-[11px]">
                LAST REVISED: {company.lastUpdated}
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-ink tracking-tight">
            {title}
          </h1>
          <p className="font-body text-base text-ink-2 leading-relaxed">
            {description}
          </p>
        </header>

        {/* Content Body */}
        <div className="prose font-body text-sm sm:text-base text-ink-2 leading-relaxed space-y-6">
          {children}
        </div>

        {/* Statutory Footnote */}
        <footer className="border-t border-rule pt-6 font-mono text-xs text-ink-3 space-y-1">
          <p>
            This document is governed by the statutory laws of the Republic of India.
          </p>
          <p>
            Shreevan Group operates as a licensed pharmaceutical merchant exporter.
          </p>
        </footer>
      </div>
    </main>
  );
}
