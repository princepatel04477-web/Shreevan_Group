"use client";

import React from "react";
import Link from "next/link";
import { Plus, Check, FileText } from "lucide-react";
import { type Product, moleculeCode } from "@/lib/catalogue";
import { useEnquiryBasket } from "@/lib/basket";

interface ProcurementTableProps {
  products: Product[];
}

export function ProcurementTable({ products }: ProcurementTableProps) {
  const { items, addItem } = useEnquiryBasket();

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="Formulations procurement table"
      className="w-full overflow-x-auto border border-rule rounded-[2px] bg-porcelain focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-accent-700"
    >
      <table className="w-full text-left border-collapse text-sm">
        <caption className="sr-only">
          Pharmaceutical Formulation Export Procurement Formulary and Specifications
        </caption>
        <thead>
          <tr className="border-b border-rule bg-paper font-mono text-[11px] uppercase tracking-wider text-ink-3">
            <th scope="col" className="py-3 px-4 w-20">Code</th>
            <th scope="col" className="py-3 px-4 min-w-[220px]">Composition / Generic Name</th>
            <th scope="col" className="py-3 px-4">Dosage Form</th>
            <th scope="col" className="py-3 px-4">Therapeutic Area</th>
            <th scope="col" className="py-3 px-4">Standard Packaging</th>
            <th scope="col" className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule font-sans text-ink">
          {products.map((product) => {
            const code = moleculeCode(product.generic);
            const isInBasket = items.some((i) => i.id === product.id);

            return (
              <tr
                key={product.id}
                data-testid="procurement-row"
                className="group relative hover:bg-mist/70 transition-colors"
              >
                {/* Molecule Code */}
                <td className="py-3 px-4 font-mono text-xs font-semibold text-accent-700 relative">
                  {/* Left accent hairline on row hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-transparent group-hover:bg-accent-700 transition-colors" />
                  <span className="px-1.5 py-0.5 rounded-[2px] bg-paper border border-rule">
                    {code}
                  </span>
                </td>

                {/* Generic Name */}
                <td className="py-3 px-4 font-medium text-ink">
                  <Link
                    href={`/formulary/item/${product.id}`}
                    className="hover:text-accent-700 underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 rounded-[2px]"
                  >
                    {product.generic}
                  </Link>
                  {product.segment === "Ayurveda" && (
                    <span className="ml-2 font-mono text-[10px] uppercase px-1 py-0.2 bg-paper border border-rule text-ink-3">
                      AYUSH
                    </span>
                  )}
                </td>

                {/* Dosage Form */}
                <td className="py-3 px-4 font-mono text-xs text-ink-2">
                  {product.dosageForm}
                </td>

                {/* Category */}
                <td className="py-3 px-4 font-sans text-xs text-ink-3">
                  {product.category}
                </td>

                {/* Packs */}
                <td className="py-3 px-4 font-mono text-xs text-ink-3">
                  {product.packs.length > 0 ? product.packs.join(", ") : "Standard export packs"}
                </td>

                {/* Action Buttons */}
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/formulary/item/${product.id}`}
                      title="View Technical Data Sheet"
                      aria-label={`View technical data sheet for ${product.generic}`}
                      className="p-1.5 rounded-[2px] border border-rule bg-paper text-ink-3 hover:text-ink hover:bg-mist transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
                    >
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => addItem(product)}
                      title={isInBasket ? "In export enquiry basket" : "Add to enquiry basket"}
                      aria-label={
                        isInBasket
                          ? `Added: ${product.generic} in enquiry dossier`
                          : `Enquire: add ${product.generic} to enquiry dossier`
                      }
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 ${
                        isInBasket
                          ? "bg-accent-700 text-porcelain border border-accent-700"
                          : "bg-paper border border-rule text-ink-2 hover:bg-mist hover:text-ink"
                      }`}
                    >
                      {isInBasket ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Enquire</span>
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
