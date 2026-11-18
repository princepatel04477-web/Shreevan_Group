"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ArrowRight, PackageOpen } from "lucide-react";
import { useEnquiryBasket, BasketItem } from "@/lib/basket";
import { moleculeCode } from "@/lib/catalogue";

export function EnquiryBasketDrawer() {
  const {
    items,
    destinationCountry,
    isOpen,
    closeBasket,
    removeItem,
    updateQuantity,
    updateUnit,
    setDestinationCountry,
    clearBasket,
  } = useEnquiryBasket();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeBasket();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeBasket]);

  // Trap focus inside drawer
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];

    firstEl?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    drawer.addEventListener("keydown", handleTab);
    return () => drawer.removeEventListener("keydown", handleTab);
  }, [isOpen, items.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="basket-title">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onClick={closeBasket}
            className="fixed inset-0 bg-ink/60"
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-paper border-l border-rule shadow-2xl flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-rule bg-paper/90 backdrop-blur-xs flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-accent-700 block mb-0.5">
                  Export Desk Dossier
                </span>
                <h2 id="basket-title" className="font-serif text-2xl text-ink font-light">
                  Enquiry Basket
                </h2>
              </div>
              <button
                type="button"
                onClick={closeBasket}
                aria-label="Close enquiry basket"
                className="p-2 rounded-[2px] border border-rule hover:bg-mist text-ink-2 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-[2px] bg-mist border border-rule flex items-center justify-center text-ink-3">
                    <PackageOpen className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif text-lg text-ink">No items in your enquiry dossier</p>
                    <p className="font-sans text-sm text-ink-3 max-w-xs mx-auto">
                      Explore the formulary and select formulations to compile a customized export quotation.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeBasket}
                    className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-accent-700 hover:text-accent-500 font-medium underline underline-offset-4"
                  >
                    Browse Formulary &rarr;
                  </button>
                </div>
              ) : (
                <>
                  {/* Destination Country Input */}
                  <div className="bg-porcelain p-4 rounded-[2px] border border-rule space-y-2">
                    <label htmlFor="basket-destination-country" className="block font-mono text-[11px] uppercase tracking-wider text-ink-3">
                      Destination Country / Port
                    </label>
                    <input
                      id="basket-destination-country"
                      type="text"
                      value={destinationCountry}
                      onChange={(e) => setDestinationCountry(e.target.value)}
                      placeholder="e.g. Kenya, Vietnam, Uzbekistan"
                      className="w-full px-3 py-2 text-sm font-sans bg-paper border border-rule rounded-[2px] focus:outline-none focus:border-accent-700 text-ink"
                    />
                    <p className="text-[11px] text-ink-3 font-sans">
                      Enables registration verification and regulatory dossier matching.
                    </p>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3" role="list" aria-label="Enquiry items">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        role="listitem"
                        className="bg-porcelain border border-rule p-4 rounded-[2px] space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <span className="font-mono text-xs font-semibold px-1.5 py-0.5 rounded-[2px] bg-paper border border-rule text-accent-700">
                              {moleculeCode(item.generic)}
                            </span>
                            <div>
                              <h3 className="font-sans text-sm font-medium text-ink leading-snug">
                                {item.generic}
                              </h3>
                              <p className="font-mono text-[11px] text-ink-3 mt-0.5">
                                {item.dosageForm} &bull; {item.category}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.generic} from enquiry`}
                            className="text-ink-3 hover:text-signal p-1 transition-colors rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Quantity and Unit controls */}
                        <div className="flex items-center gap-2 pt-2 border-t border-rule/60">
                          <div className="flex-1">
                            <label htmlFor={`qty-${item.id}`} className="sr-only">
                              Quantity
                            </label>
                            <input
                              id={`qty-${item.id}`}
                              type="number"
                              min="1"
                              step="100"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                              className="w-full px-2 py-1 text-xs font-mono bg-paper border border-rule rounded-[2px] focus:outline-none focus:border-accent-700 text-ink text-right"
                            />
                          </div>
                          <div className="w-32">
                            <label htmlFor={`unit-${item.id}`} className="sr-only">
                              Unit
                            </label>
                            <select
                              id={`unit-${item.id}`}
                              value={item.unit}
                              onChange={(e) => updateUnit(item.id, e.target.value as BasketItem["unit"])}
                              className="w-full px-2 py-1 text-xs font-mono bg-paper border border-rule rounded-[2px] focus:outline-none focus:border-accent-700 text-ink"
                            >
                              <option value="boxes">Boxes</option>
                              <option value="packs">Packs</option>
                              <option value="cartons">Cartons</option>
                              <option value="containers">Containers</option>
                              <option value="units">Units</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer with Actions */}
            {items.length > 0 && (
              <div className="p-6 border-t border-rule bg-paper space-y-3">
                <Link
                  href={`/contact?type=quotation${destinationCountry ? `&country=${encodeURIComponent(destinationCountry)}` : ""}`}
                  onClick={closeBasket}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[2px] bg-accent-700 hover:bg-accent-500 text-porcelain text-xs font-mono uppercase tracking-widest transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
                >
                  <span>Continue to Quotation ({items.length})</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <div className="flex items-center justify-between text-xs font-mono text-ink-3">
                  <span>Export Desk Cleared</span>
                  <button
                    type="button"
                    onClick={clearBasket}
                    className="hover:text-signal transition-colors underline underline-offset-2"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
