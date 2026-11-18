"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { type Product, moleculeCode } from "@/lib/catalogue";
import { useEnquiryBasket } from "@/lib/basket";
import { MoleculeGlyph } from "./MoleculeGlyph";

interface MoleculeTileProps {
  product: Product;
}

const emptySubscribe = () => () => {};

export function MoleculeTile({ product }: MoleculeTileProps) {
  const code = moleculeCode(product.generic);
  const { items, addItem } = useEnquiryBasket();
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isInBasket = isClient && items.some((i) => i.id === product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div
      data-testid="molecule-tile"
      data-product-id={product.id}
      data-segment={product.segment}
      data-category={product.category}
      className="group relative bg-porcelain border border-rule rounded-[2px] transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between overflow-hidden p-4 min-h-[190px]"
    >
      {/* Top Accent Hairline on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-accent-700 transition-colors duration-200" />

      {/* Background Stylized Chemical Drawing */}
      <div className="absolute -right-3 -bottom-3 w-28 h-28 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-300 text-accent-700">
        <MoleculeGlyph code={code} animated={true} />
      </div>

      {/* Tile Header: Code and Segment / Add CTA */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-2xl font-bold tracking-tight text-accent-700">
            {code}
          </span>
          <span className="font-mono text-[10px] text-ink-3 uppercase">
            {product.segment === "Ayurveda" ? "AYU" : "RX"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          title={isInBasket ? "In export enquiry basket" : "Add to enquiry basket"}
          aria-label={`${isInBasket ? "Added" : "Add"} ${product.generic} to enquiry`}
          className={`p-1.5 rounded-[2px] border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 ${
            isInBasket
              ? "bg-accent-700 text-porcelain border-accent-700"
              : "bg-paper/80 border-rule text-ink-2 hover:bg-mist hover:text-ink"
          }`}
        >
          {isInBasket ? (
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Main Generic Formulation Name */}
      <div className="my-3 relative z-10">
        <Link
          href={`/formulary/item/${product.id}`}
          className="block group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 rounded-[2px]"
        >
          <h3 className="font-sans text-sm font-semibold text-ink group-hover/link:text-accent-700 transition-colors line-clamp-2 leading-snug">
            {product.generic}
          </h3>
        </Link>
      </div>

      {/* Footer: Dosage Form & Packaging */}
      <div className="pt-2 border-t border-rule/50 flex items-center justify-between font-mono text-[11px] text-ink-3 relative z-10">
        <span className="uppercase tracking-wider font-medium text-ink-2">
          {product.dosageForm}
        </span>
        <span className="truncate max-w-[110px]" title={product.packs.join(" / ")}>
          {product.packs.length > 0 ? product.packs[0] : "Bulk"}
        </span>
      </div>
    </div>
  );
}
