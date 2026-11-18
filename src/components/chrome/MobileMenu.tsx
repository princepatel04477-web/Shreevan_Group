"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { useLenis } from "@/components/motion/SmoothScroll";
import { getCategories } from "@/lib/catalogue";
import { company, IfFact } from "@/config/company";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const lenis = useLenis();
  const menuRef = useRef<HTMLDivElement>(null);
  const [formularyExpanded, setFormularyExpanded] = useState(false);
  const categories = getCategories();

  const handleClose = React.useCallback(() => {
    setFormularyExpanded(false);
    onClose();
  }, [onClose]);

  // Halt Lenis smooth scroll and lock body when open
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);

  // Trap focus & escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      // Simple focus trap
      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement && lastElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement && firstElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const navItems = [
    { number: "01", label: "Formulary", href: "/formulary", isExpandable: true },
    { number: "02", label: "Export Services", href: "/export-services" },
    { number: "03", label: "Quality & Compliance", href: "/quality" },
    { number: "04", label: "Private Label", href: "/private-label" },
    { number: "05", label: "About", href: "/about" },
    { number: "06", label: "Contact", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          initial={{ y: "100%", opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-paper flex flex-col justify-between overflow-y-auto"
        >
          <div className="paper-grain pointer-events-none" aria-hidden="true" />
          {/* Top Bar inside sheet */}
          <div className="h-[76px] px-6 flex items-center justify-between border-b border-rule shrink-0">
            <Link
              href="/"
              onClick={handleClose}
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
            >
              <Image
                src="/brand/logo.svg"
                alt=""
                width={36}
                height={36}
                style={{ width: "auto", height: "36px" }}
                priority
              />
              <span className="font-display font-light text-xl tracking-tight text-ink">
                SHREEVAN
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 -mr-2 rounded-[2px] border border-rule hover:bg-mist transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
            >
              <X className="w-5 h-5 text-ink" aria-hidden="true" />
            </button>
          </div>

          {/* Nav List with Fraunces 36px numbered links */}
          <div className="px-6 py-8 flex-1">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + idx * 0.04, duration: 0.28 }}
                  className="border-b border-rule/50 pb-3"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
                    >
                      <span className="font-mono text-xs text-ink-3 tracking-widest uppercase">
                        {item.number}
                      </span>
                      <span className="font-display text-3xl sm:text-4xl font-light text-ink group-hover:text-accent-700 transition-colors">
                        {item.label}
                      </span>
                    </Link>

                    {item.isExpandable && (
                      <button
                        type="button"
                        onClick={() => setFormularyExpanded(!formularyExpanded)}
                        aria-expanded={formularyExpanded}
                        aria-label="Expand therapeutic categories"
                        className="p-2 rounded-[2px] border border-rule/70 hover:bg-mist transition-colors text-ink-3"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            formularyExpanded ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>

                  {/* Expandable Categories in Formulary */}
                  {item.isExpandable && formularyExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pl-7 pr-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs"
                    >
                      {categories.slice(0, 8).map(({ category, count }) => (
                        <Link
                          key={category}
                          href={`/formulary?area=${encodeURIComponent(category)}`}
                          onClick={onClose}
                          className="flex items-center justify-between py-1 px-1.5 rounded-[2px] bg-porcelain border border-rule/60 text-ink-2"
                        >
                          <span className="truncate pr-1">{category}</span>
                          <span className="font-mono text-[10px] text-ink-3">{count}</span>
                        </Link>
                      ))}
                      <Link
                        href="/formulary"
                        onClick={onClose}
                        className="flex items-center gap-1 py-1 px-1.5 text-accent-700 font-mono text-[11px] hover:underline"
                      >
                        <span>View all categories</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Bottom Actions & Contact Info */}
          <div className="p-6 bg-porcelain border-t border-rule space-y-4 shrink-0">
            <div className="flex items-center justify-between text-xs font-mono">
              <Link
                href="/quality#documents"
                onClick={onClose}
                className="text-ink-3 hover:text-ink uppercase tracking-wider underline underline-offset-4"
              >
                Export Documents (COA, COPP)
              </Link>
              <IfFact when={company.exportDeskEmail || company.email}>
                <a
                  href={`mailto:${company.exportDeskEmail || company.email}`}
                  className="text-accent-700 hover:underline"
                >
                  Export Desk
                </a>
              </IfFact>
            </div>

            <Link href="/contact?type=rfq" onClick={onClose} className="block w-full">
              <Button variant="primary" size="lg" className="w-full">
                Request a Quotation
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
