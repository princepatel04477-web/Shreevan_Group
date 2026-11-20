"use client";

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/LogoMark";
import { FormularyMegaMenu } from "./FormularyMegaMenu";
import { ExportServicesMegaMenu } from "./ExportServicesMegaMenu";
import { MobileMenu } from "./MobileMenu";
import { useEnquiryBasket } from "@/lib/basket";

const emptySubscribe = () => () => {};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"formulary" | "services" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { items, openBasket } = useEnquiryBasket();
  const basketCount = isClient ? items.length : 0;

  const prevScrollY = useRef(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const formularyButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll detection for border-b and hide/show direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1px --rule border after 8px scroll
      setIsScrolled(currentScrollY > 8);

      // Hide on scroll down, return on scroll up (Framer Motion 240ms)
      if (activeMenu !== null || mobileMenuOpen) {
        setIsHidden(false);
      } else if (currentScrollY > 100 && currentScrollY > prevScrollY.current + 4) {
        setIsHidden(true);
      } else if (currentScrollY < prevScrollY.current - 4 || currentScrollY <= 8) {
        setIsHidden(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeMenu, mobileMenuOpen]);

  // Hover-intent (120ms delay) management
  const handleMouseEnterTrigger = useCallback((menu: "formulary" | "services") => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(menu);
    }, 120);
  }, []);

  const handleMouseLeaveTrigger = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 160);
  }, []);

  const handleMouseEnterPanel = useCallback(() => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  }, []);

  const handleMouseLeavePanel = useCallback(() => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 140);
  }, []);

  // Keyboard navigation for triggers
  const handleTriggerKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    menu: "formulary" | "services"
  ) => {
    if (
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "Space" ||
      e.key === "Spacebar" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
      if (activeMenu === menu) {
        setActiveMenu(null);
      } else {
        setActiveMenu(menu);
        // Roving focus into first link of opened menu
        requestAnimationFrame(() => {
          setTimeout(() => {
            const menuId =
              menu === "formulary"
                ? "#formulary-mega-menu"
                : "#export-services-mega-menu";
            const firstFocusable = document.querySelector<HTMLElement>(
              `${menuId} a, ${menuId} button`
            );
            firstFocusable?.focus();
          }, 50);
        });
      }
    } else if (e.key === "Tab" && activeMenu === menu && !e.shiftKey) {
      // If menu is already open and user tabs forward, rove focus into menu
      const menuId =
        menu === "formulary" ? "#formulary-mega-menu" : "#export-services-mega-menu";
      const firstFocusable = document.querySelector<HTMLElement>(
        `${menuId} a, ${menuId} button`
      );
      if (firstFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setActiveMenu(null);
    }
  };

  const handleCloseMenu = useCallback(() => {
    const prev = activeMenu;
    setActiveMenu(null);
    if (prev === "formulary") {
      formularyButtonRef.current?.focus();
    } else if (prev === "services") {
      servicesButtonRef.current?.focus();
    }
  }, [activeMenu]);

  return (
    <>
      <motion.header
        id="main-header"
        role="banner"
        animate={{ y: isHidden ? -76 : 0 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 h-[76px] ${
          mobileMenuOpen || activeMenu !== null ? "z-50" : "z-40"
        } bg-paper/95 backdrop-blur-xs transition-colors duration-200 ${
          isScrolled ? "border-b border-rule shadow-xs" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          {/* Left: Brand Logo & Wordmark Highlight */}
          <LogoMark variant="horizontal" size="md" priority />

          {/* Desktop Navigation Links */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium text-ink"
          >
            {/* 1. Formulary Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterTrigger("formulary")}
              onMouseLeave={handleMouseLeaveTrigger}
            >
              <button
                ref={formularyButtonRef}
                type="button"
                onClick={() => setActiveMenu(activeMenu === "formulary" ? null : "formulary")}
                onKeyDown={(e) => handleTriggerKeyDown(e, "formulary")}
                aria-expanded={activeMenu === "formulary"}
                aria-haspopup="true"
                aria-controls="formulary-mega-menu"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 ${
                  activeMenu === "formulary"
                    ? "text-accent-700 bg-mist"
                    : "hover:text-accent-700 hover:bg-mist/50"
                }`}
              >
                <span>Formulary</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === "formulary" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* 2. Export Services Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnterTrigger("services")}
              onMouseLeave={handleMouseLeaveTrigger}
            >
              <button
                ref={servicesButtonRef}
                type="button"
                onClick={() => setActiveMenu(activeMenu === "services" ? null : "services")}
                onKeyDown={(e) => handleTriggerKeyDown(e, "services")}
                aria-expanded={activeMenu === "services"}
                aria-haspopup="true"
                aria-controls="export-services-mega-menu"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 ${
                  activeMenu === "services"
                    ? "text-accent-700 bg-mist"
                    : "hover:text-accent-700 hover:bg-mist/50"
                }`}
              >
                <span>Export Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === "services" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* 3. Quality & Compliance */}
            <Link
              href="/quality"
              className="px-3 py-2 rounded-[2px] hover:text-accent-700 hover:bg-mist/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
            >
              Quality &amp; Compliance
            </Link>

            {/* 4. Private Label */}
            <Link
              href="/private-label"
              className="px-3 py-2 rounded-[2px] hover:text-accent-700 hover:bg-mist/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
            >
              Private Label
            </Link>

            {/* 5. About */}
            <Link
              href="/about"
              className="px-3 py-2 rounded-[2px] hover:text-accent-700 hover:bg-mist/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
            >
              About
            </Link>

            {/* 6. Contact */}
            <Link
              href="/contact"
              className="px-3 py-2 rounded-[2px] hover:text-accent-700 hover:bg-mist/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Desk: Documents, Basket Trigger & Primary CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/quality#documents"
              className="font-mono text-xs uppercase tracking-widest text-ink-3 hover:text-ink transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
            >
              Documents
            </Link>

            {basketCount > 0 && (
              <button
                type="button"
                onClick={openBasket}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border border-accent-700/40 bg-accent-100/50 hover:bg-accent-100 text-accent-700 text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
              >
                <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Basket</span>
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-accent-700 text-porcelain text-[10px] font-bold">
                  {basketCount}
                </span>
              </button>
            )}

            <Link href={basketCount > 0 ? "/contact?type=quotation" : "/contact?type=rfq"}>
              <Button variant="primary" size="md">
                <span>Request a Quotation</span>
                {basketCount > 0 && (
                  <span
                    data-testid="header-cta-badge"
                    className="ml-2 px-1.5 py-0.5 rounded-[2px] bg-porcelain text-accent-700 font-mono text-[11px] font-bold"
                  >
                    {basketCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Right Action Desk (<1024px) */}
          <div className="flex items-center space-x-2 lg:hidden">
            {basketCount > 0 && (
              <button
                type="button"
                onClick={openBasket}
                aria-label={`Open export enquiry basket with ${basketCount} items`}
                className="p-2 rounded-[2px] border border-accent-700/40 bg-accent-100/50 text-accent-700 relative hover:bg-accent-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-accent-700 text-porcelain font-mono text-[9px] font-bold">
                  {basketCount}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation menu"
              className="p-2.5 rounded-[2px] border border-rule hover:bg-mist transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 text-ink"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Formulary Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMenu === "formulary" && (
            <FormularyMegaMenu
              isOpen={true}
              onClose={handleCloseMenu}
              onMouseEnter={handleMouseEnterPanel}
              onMouseLeave={handleMouseLeavePanel}
            />
          )}
        </AnimatePresence>

        {/* Export Services Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMenu === "services" && (
            <ExportServicesMegaMenu
              isOpen={true}
              onClose={handleCloseMenu}
              onMouseEnter={handleMouseEnterPanel}
              onMouseLeave={handleMouseLeavePanel}
            />
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
