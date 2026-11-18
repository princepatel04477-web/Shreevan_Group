"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { X } from "lucide-react";

interface ModalWrapperProps {
  children: React.ReactNode;
}

export function ModalWrapper({ children }: ModalWrapperProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  // Lock body scroll while modal is mounted
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  // Trap focus inside modal
  useEffect(() => {
    if (!modalRef.current) return;
    const modal = modalRef.current;
    const focusable = modal.querySelectorAll<HTMLElement>(
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

    modal.addEventListener("keydown", handleTab);
    return () => modal.removeEventListener("keydown", handleTab);
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
    >
      {/* Flat Ink Scrim (no glassmorphism) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleClose}
        className="fixed inset-0 bg-ink/60"
        aria-hidden="true"
      />

      {/* Modal Dialog Content Container */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto my-auto"
      >
        <div className="absolute top-4 right-4 z-20">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close specification sheet"
            className="p-2 rounded-[2px] bg-paper/80 border border-rule hover:bg-mist text-ink-3 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {children}
      </motion.div>
    </div>
  );
}
