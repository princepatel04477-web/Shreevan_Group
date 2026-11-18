import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ContentPageHeader } from "@/components/layout/ContentPageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Commercial Enquiry & RFQ · Shreevan Group",
  description:
    "Submit a formal Request for Quotation (RFQ), molecule sourcing inquiry, tender schedule, or commercial partnership request to the Shreevan Group export desk.",
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://shreevangroup.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact & RFQ",
        item: "https://shreevangroup.com/contact",
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <JsonLd data={breadcrumbJsonLd} />

      <ContentPageHeader
        index="08"
        label="COMMERCIAL ENQUIRY & RFQ"
        title="Direct export desk communication."
        subtitle="Initiate formal procurement, submit tender bills of quantities, or request custom molecule sourcing from licensed Indian manufacturing partners."
        badge="EXPORT PROTOCOL"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Form Island */}
          <div className="lg:col-span-8">
            <Suspense
              fallback={
                <div className="p-8 text-center font-mono text-xs text-[var(--ink-3)] bg-[var(--porcelain)] border border-[var(--rule)]">
                  Loading export desk requisition portal...
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 sticky top-28">
            <ContactSidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
