"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { COUNTRIES } from "@/content/countries";
import { INCOTERMS } from "@/content/export";
import { useEnquiryBasket } from "@/lib/basket";
import {
  EnquiryPayload,
  EnquiryType,
  ENQUIRY_TYPES,
  ENQUIRY_TYPE_LABELS,
  isFreeEmailDomain,
  EnquiryResponse,
  FileAttachment,
  EnquiryBasketItem,
} from "@/lib/enquiry";
import { SealedEnvelope } from "./SealedEnvelope";

const STEPS = [
  { id: 1, label: "WHO YOU ARE", short: "Identity" },
  { id: 2, label: "WHAT YOU NEED", short: "Molecules" },
  { id: 3, label: "COMMERCIAL TERMS", short: "Terms" },
  { id: 4, label: "DOCUMENT REVIEW", short: "Review" },
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const { items: basketItems, removeItem, clearBasket } = useEnquiryBasket();

  // Initial enquiry type from ?type=
  const paramType = searchParams.get("type") as EnquiryType | null;
  const initialType: EnquiryType = paramType && ENQUIRY_TYPES.includes(paramType)
    ? paramType
    : "rfq";

  const [currentStep, setCurrentStep] = useState(1);
  const [customItems, setCustomItems] = useState<EnquiryBasketItem[]>([]);
  const [hasInitializedBasket, setHasInitializedBasket] = useState(false);

  // Initialize basket items into local state once on client mount without synchronous effect error
  if (!hasInitializedBasket && basketItems.length > 0) {
    setCustomItems(
      basketItems.map((item) => ({
        id: item.id,
        generic: item.generic,
        strength: "",
        dosageForm: item.dosageForm,
        quantity: item.quantity,
        unit: (item.unit === "boxes" || item.unit === "units" || item.unit === "cartons" || item.unit === "containers"
          ? item.unit
          : "boxes") as "boxes" | "units" | "cartons" | "containers",
      }))
    );
    setHasInitializedBasket(true);
  }

  const [formData, setFormData] = useState<Omit<EnquiryPayload, "basketItems">>({
    type: initialType,
    company: "",
    country: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    moleculesText: "",
    incoterm: "CIF",
    destinationPort: "",
    targetDeliveryMonth: "",
    hasImportLicence: "yes",
    registrationStatus: "registered",
    notes: "",
    hp_email: "",
  });

  const [fileAttachment, setFileAttachment] = useState<FileAttachment | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submissionReference, setSubmissionReference] = useState("");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);

  // Focus step heading on step change
  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [currentStep]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.company.trim()) newErrors.company = "Company name is required.";
      if (!formData.country.trim()) newErrors.country = "Destination country is required.";
      if (!formData.name.trim()) newErrors.name = "Contact person name is required.";
      if (!formData.role.trim()) newErrors.role = "Professional role is required.";
      if (!formData.email.trim() || !formData.email.includes("@")) {
        newErrors.email = "A valid business email address is required.";
      }
      if (!formData.phone.trim() || formData.phone.length < 6) {
        newErrors.phone = "Phone number with international country code is required.";
      }
    } else if (step === 2) {
      if (customItems.length === 0 && !formData.moleculesText?.trim() && !fileAttachment) {
        newErrors.molecules = "Please specify at least one molecule, select from the catalogue, or upload a tender list.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedExtensions = [".pdf", ".xlsx", ".csv", ".xls"];
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      setFileError("Invalid format. Only PDF, XLSX, or CSV files are permitted.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError("File exceeds 10 MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Str = (reader.result as string).split(",")[1];
      const attachment: FileAttachment = {
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        base64: base64Str,
      };
      setFileAttachment(attachment);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload: EnquiryPayload = {
      ...formData,
      basketItems: customItems,
      file: fileAttachment ?? undefined,
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: EnquiryResponse = await res.json();

      if (res.ok && data.ok) {
        setSubmissionReference(data.reference || "SG-CONFIRMED");
        setIsComplete(true);
        clearBasket();
      } else {
        setIsSubmitting(false);
        setSubmissionError(data.message || "Failed to submit enquiry. Please review your entries.");
        if (data.errors) {
          const flatErrors: Record<string, string> = {};
          for (const [k, v] of Object.entries(data.errors)) {
            flatErrors[k] = v.join(", ");
          }
          setErrors(flatErrors);
        }
      }
    } catch {
      setIsSubmitting(false);
      setSubmissionError("Network error connecting to the export desk API.");
    }
  };

  const handleReset = () => {
    setIsComplete(false);
    setIsSubmitting(false);
    setCurrentStep(1);
    setFormData({
      type: initialType,
      company: "",
      country: "",
      name: "",
      role: "",
      email: "",
      phone: "",
      moleculesText: "",
      incoterm: "CIF",
      destinationPort: "",
      targetDeliveryMonth: "",
      hasImportLicence: "yes",
      registrationStatus: "registered",
      notes: "",
      hp_email: "",
    });
    setCustomItems([]);
    setFileAttachment(null);
  };

  const fullPayload: EnquiryPayload = {
    ...formData,
    basketItems: customItems,
    file: fileAttachment ?? undefined,
  };

  return (
    <div className="w-full">
      {/* Honeypot field for bot suppression */}
      <input
        type="text"
        name="hp_email"
        value={formData.hp_email}
        onChange={(e) => setFormData((prev) => ({ ...prev, hp_email: e.target.value }))}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Enquiry Type Segmented Bar */}
      <div className="mb-8" role="region" aria-label="Enquiry Type Selection">
        <label className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-3)] mb-3">
          Select Enquiry Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 border border-[var(--rule)] p-1 bg-[var(--mist)]/40 rounded-[2px]">
          {ENQUIRY_TYPES.map((t) => {
            const active = formData.type === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, type: t }))}
                className={`px-3 py-2 text-xs font-mono tracking-wider transition-colors text-center rounded-[2px] ${
                  active
                    ? "bg-[var(--porcelain)] text-[var(--ink)] font-semibold shadow-xs border border-[var(--rule)]"
                    : "text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--paper)]"
                }`}
              >
                {ENQUIRY_TYPE_LABELS[t]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Ticket Stubs */}
      <nav aria-label="RFQ Progress Steps" className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-[var(--rule)] pb-4">
          {STEPS.map((s) => {
            const isActive = currentStep === s.id;
            const isDone = currentStep > s.id;
            return (
              <div
                key={s.id}
                className={`p-3 border transition-colors ${
                  isActive
                    ? "border-[var(--accent-700)] bg-[var(--porcelain)] shadow-xs"
                    : isDone
                    ? "border-[var(--rule)] bg-[var(--mist)]/40 text-[var(--ink-2)]"
                    : "border-dashed border-[var(--rule)] text-[var(--ink-2)]"
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono tracking-widest uppercase mb-1">
                  <span>STEP 0{s.id}</span>
                  {isDone && <span className="text-[var(--accent-700)] font-bold">✓ CLEARED</span>}
                </div>
                <div className={`text-xs font-mono font-medium ${isActive ? "text-[var(--ink)] font-semibold" : "text-[var(--ink-2)]"}`}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Submission Sealed Envelope Screen */}
      {(isSubmitting || isComplete) && (
        <SealedEnvelope
          payload={fullPayload}
          reference={submissionReference}
          isSubmitting={isSubmitting}
          isComplete={isComplete}
          onReset={handleReset}
        />
      )}

      {/* Multi-Step Form Body */}
      {!isSubmitting && !isComplete && (
        <form onSubmit={handleSubmit} noValidate>
          {submissionError && (
            <div
              role="alert"
              className="p-4 mb-6 border border-[var(--signal)] bg-[var(--signal)]/10 text-[var(--signal)] text-sm font-mono"
            >
              {submissionError}
            </div>
          )}

          <AnimatePresence mode="wait" initial={false}>
            {/* STEP 1: WHO YOU ARE */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.26 }}
                className="space-y-6"
              >
                <div>
                  <h2
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="font-serif text-2xl md:text-3xl text-[var(--ink)] mb-1 outline-hidden"
                  >
                    Identity &amp; Institutional Profile
                  </h2>
                  <p className="text-sm text-[var(--ink-3)]">
                    Specify your corporate entity and destination jurisdiction.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Company / Institutional Name <span className="text-[var(--accent-700)]">*</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="e.g. AfriPharma Distribution SARL"
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                      aria-invalid={Boolean(errors.company)}
                      aria-describedby={errors.company ? "err-company" : undefined}
                    />
                    {errors.company && (
                      <p id="err-company" className="text-xs text-[var(--signal)] font-mono mt-1">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Destination Country <span className="text-[var(--accent-700)]">*</span>
                    </label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                      aria-invalid={Boolean(errors.country)}
                      aria-describedby={errors.country ? "err-country" : undefined}
                    >
                      <option value="">Select country...</option>
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.name} ({c.region})
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p id="err-country" className="text-xs text-[var(--signal)] font-mono mt-1">{errors.country}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Contact Person Name <span className="text-[var(--accent-700)]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Dr. Jean-Paul Diallo"
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "err-name" : undefined}
                    />
                    {errors.name && (
                      <p id="err-name" className="text-xs text-[var(--signal)] font-mono mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Professional Role / Title <span className="text-[var(--accent-700)]">*</span>
                    </label>
                    <input
                      id="role"
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Chief Procurement Officer"
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                      aria-invalid={Boolean(errors.role)}
                      aria-describedby={errors.role ? "err-role" : undefined}
                    />
                    {errors.role && (
                      <p id="err-role" className="text-xs text-[var(--signal)] font-mono mt-1">{errors.role}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Business Email Address <span className="text-[var(--accent-700)]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="procurement@company.com"
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "err-email" : isFreeEmailDomain(formData.email) ? "warn-email" : undefined}
                    />
                    {errors.email && (
                      <p id="err-email" className="text-xs text-[var(--signal)] font-mono mt-1">{errors.email}</p>
                    )}
                    {isFreeEmailDomain(formData.email) && !errors.email && (
                      <p id="warn-email" role="note" className="text-xs text-[var(--ink-2)] font-mono mt-1">
                        Notice: Institutional domain recommended for accelerated verification.
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Phone Number (with Country Code) <span className="text-[var(--accent-700)]">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+221 77 000 0000"
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                    />
                    {errors.phone && (
                      <p id="err-phone" className="text-xs text-[var(--signal)] font-mono mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-[var(--accent-700)] hover:bg-[var(--accent-500)] text-[var(--paper)] text-xs font-mono uppercase tracking-widest transition-colors rounded-[2px]"
                  >
                    Continue to Molecules →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: WHAT YOU NEED */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.26 }}
                className="space-y-6"
              >
                <div>
                  <h2
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="font-serif text-2xl md:text-3xl text-[var(--ink)] mb-1 outline-hidden"
                  >
                    Formulations &amp; Bill of Quantities
                  </h2>
                  <p className="text-sm text-[var(--ink-3)]">
                    Items selected from the Formulary, custom molecule lists, or uploaded tender documents.
                  </p>
                </div>

                {errors.molecules && (
                  <p className="text-xs text-[var(--signal)] font-mono">{errors.molecules}</p>
                )}

                {/* Attached Basket Items */}
                {customItems.length > 0 && (
                  <div className="border border-[var(--rule)] bg-[var(--porcelain)] p-4 rounded-[2px]">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-[var(--rule)]">
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--ink-2)]">
                        Catalogue Items Attached ({customItems.length})
                      </span>
                    </div>
                    <div className="space-y-3">
                      {customItems.map((item, idx) => (
                        <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 text-sm py-2 border-b border-[var(--rule)]/50 last:border-0">
                          <div className="flex-1 min-w-[200px]">
                            <span className="font-mono font-medium text-[var(--ink)]">{item.generic}</span>
                            <span className="text-xs font-mono text-[var(--ink-3)] ml-2">({item.dosageForm})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 1;
                                setCustomItems((prev) =>
                                  prev.map((b, i) => (i === idx ? { ...b, quantity: val } : b))
                                );
                              }}
                              className="w-20 px-2 py-1 text-xs font-mono border border-[var(--rule)] bg-[var(--paper)] text-right"
                              aria-label={`Quantity for ${item.generic}`}
                            />
                            <select
                              value={item.unit}
                              onChange={(e) => {
                                const val = e.target.value as "boxes" | "units" | "cartons" | "containers";
                                setCustomItems((prev) =>
                                  prev.map((b, i) => (i === idx ? { ...b, unit: val } : b))
                                );
                              }}
                              className="px-2 py-1 text-xs font-mono border border-[var(--rule)] bg-[var(--paper)]"
                              aria-label={`Unit for ${item.generic}`}
                            >
                              <option value="boxes">boxes</option>
                              <option value="units">units</option>
                              <option value="cartons">cartons</option>
                              <option value="containers">containers</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => {
                                removeItem(item.id);
                                setCustomItems((prev) => prev.filter((_, i) => i !== idx));
                              }}
                              className="text-xs text-[var(--signal)] hover:underline px-2"
                              aria-label={`Remove ${item.generic}`}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Free Text Molecules Textarea */}
                <div>
                  <label htmlFor="moleculesText" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                    Free-Text Formulation Requirements / Molecules
                  </label>
                  <textarea
                    id="moleculesText"
                    rows={4}
                    value={formData.moleculesText}
                    onChange={(e) => setFormData((prev) => ({ ...prev, moleculesText: e.target.value }))}
                    placeholder="List specific molecules, strengths, desired packaging, and approximate batch quantities (e.g. Paracetamol 500mg tablets, 100,000 blister packs)..."
                    className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                  />
                </div>

                {/* File Upload */}
                <div className="border border-dashed border-[var(--rule)] p-6 bg-[var(--mist)]/20 text-center rounded-[2px]">
                  <label htmlFor="tender-file" className="block cursor-pointer">
                    <span className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--accent-700)] mb-1">
                      Upload Tender Schedule / BoQ Document
                    </span>
                    <span className="block text-xs text-[var(--ink-3)] font-mono mb-3">
                      Accepted: PDF, XLSX, CSV (Maximum file size: 10 MB)
                    </span>
                    <input
                      id="tender-file"
                      type="file"
                      accept=".pdf,.xlsx,.csv,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <span className="inline-block px-4 py-2 text-xs font-mono border border-[var(--rule)] bg-[var(--porcelain)] hover:bg-[var(--mist)] text-[var(--ink)] transition-colors">
                      Choose File
                    </span>
                  </label>

                  {fileAttachment && (
                    <div className="mt-3 text-xs font-mono text-[var(--accent-700)]">
                      Selected: {fileAttachment.name} ({(fileAttachment.size / 1024).toFixed(1)} KB)
                    </div>
                  )}

                  {fileError && (
                    <div className="mt-2 text-xs font-mono text-[var(--signal)]">
                      {fileError}
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 border border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] text-xs font-mono uppercase tracking-widest hover:bg-[var(--mist)] transition-colors rounded-[2px]"
                  >
                    ← Identity
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-[var(--accent-700)] hover:bg-[var(--accent-500)] text-[var(--paper)] text-xs font-mono uppercase tracking-widest transition-colors rounded-[2px]"
                  >
                    Continue to Terms →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: COMMERCIAL TERMS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.26 }}
                className="space-y-6"
              >
                <div>
                  <h2
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="font-serif text-2xl md:text-3xl text-[var(--ink)] mb-1 outline-hidden"
                  >
                    Shipping Terms &amp; Regulatory Status
                  </h2>
                  <p className="text-sm text-[var(--ink-3)]">
                    Define freight terms and local registration parameters for export clearance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="incoterm" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Incoterms 2020 Preference
                    </label>
                    <select
                      id="incoterm"
                      value={formData.incoterm}
                      onChange={(e) => setFormData((prev) => ({ ...prev, incoterm: e.target.value as "EXW" | "FOB" | "CIF" | "CIP" }))}
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                    >
                      {INCOTERMS.map((term) => (
                        <option key={term.term} value={term.term}>
                          {term.term} — {term.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="destinationPort" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Destination Port / Airport
                    </label>
                    <input
                      id="destinationPort"
                      type="text"
                      value={formData.destinationPort}
                      onChange={(e) => setFormData((prev) => ({ ...prev, destinationPort: e.target.value }))}
                      placeholder="e.g. Port of Mombasa, JKR Airport"
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="targetDeliveryMonth" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Target Delivery Window / Month
                    </label>
                    <input
                      id="targetDeliveryMonth"
                      type="text"
                      value={formData.targetDeliveryMonth}
                      onChange={(e) => setFormData((prev) => ({ ...prev, targetDeliveryMonth: e.target.value }))}
                      placeholder="e.g. Q2 2027 / May 2027"
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="hasImportLicence" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Import Licence Holder Status
                    </label>
                    <select
                      id="hasImportLicence"
                      value={formData.hasImportLicence}
                      onChange={(e) => setFormData((prev) => ({ ...prev, hasImportLicence: e.target.value as "yes" | "no" }))}
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                    >
                      <option value="yes">Yes — Company holds active drug import licence</option>
                      <option value="no">No — Applying / Partnering with local licensee</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="registrationStatus" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Product Registration Status in Destination Country
                    </label>
                    <select
                      id="registrationStatus"
                      value={formData.registrationStatus}
                      onChange={(e) => setFormData((prev) => ({ ...prev, registrationStatus: e.target.value as "registered" | "need_dossier" | "not_sure" }))}
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                    >
                      <option value="registered">Already Registered / Fast-Track Tender Waiver</option>
                      <option value="need_dossier">Registration Required — Need CTD/ACTD Dossier Support</option>
                      <option value="not_sure">Not Sure — Request Regulatory Consultation</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-xs font-mono uppercase tracking-[0.14em] text-[var(--ink-2)] mb-2">
                      Special Handling or Packaging Instructions
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="e.g. Temperature monitoring requirements (2°C–8°C), palletized air cargo, bilingual labeling in English/French..."
                      className="w-full px-4 py-3 bg-[var(--porcelain)] border border-[var(--rule)] focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[var(--accent-700)] text-sm font-sans text-[var(--ink)]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 border border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] text-xs font-mono uppercase tracking-widest hover:bg-[var(--mist)] transition-colors rounded-[2px]"
                  >
                    ← Molecules
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-[var(--accent-700)] hover:bg-[var(--accent-500)] text-[var(--paper)] text-xs font-mono uppercase tracking-widest transition-colors rounded-[2px]"
                  >
                    Review RFQ Document →
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REVIEW STEP */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.26 }}
                className="space-y-6"
              >
                <div>
                  <h2
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="font-serif text-2xl md:text-3xl text-[var(--ink)] mb-1 outline-hidden"
                  >
                    Export Dossier Pre-Submission Review
                  </h2>
                  <p className="text-sm text-[var(--ink-3)]">
                    Verify all parameters before sealing and dispatching to the export desk.
                  </p>
                </div>

                {/* Printed Document Layout */}
                <div className="bg-[var(--porcelain)] border border-[var(--rule)] p-6 md:p-8 shadow-xs font-mono text-xs text-[var(--ink-2)] space-y-6">
                  {/* Document Header */}
                  <div className="flex justify-between items-start border-b border-[var(--rule)] pb-4">
                    <div>
                      <div className="font-bold text-sm tracking-wider text-[var(--ink)]">
                        SHREEVAN GROUP · EXPORT DESK
                      </div>
                      <div className="text-[10px] text-[var(--ink-3)]">
                        COMMERCIAL DOSSIER SPECIFICATION · {ENQUIRY_TYPE_LABELS[formData.type]}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-[var(--ink-3)]">
                      STATUS: PENDING SEAL
                    </div>
                  </div>

                  {/* Identity Block */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-[var(--rule)]">
                    <div>
                      <span className="text-[var(--ink-3)] block text-[10px] uppercase">Corporate Entity</span>
                      <span className="font-semibold text-[var(--ink)]">{formData.company}</span>
                    </div>
                    <div>
                      <span className="text-[var(--ink-3)] block text-[10px] uppercase">Destination Jurisdiction</span>
                      <span className="font-semibold text-[var(--ink)]">{formData.country}</span>
                    </div>
                    <div>
                      <span className="text-[var(--ink-3)] block text-[10px] uppercase">Contact Authority</span>
                      <span className="text-[var(--ink)]">{formData.name} ({formData.role})</span>
                    </div>
                    <div>
                      <span className="text-[var(--ink-3)] block text-[10px] uppercase">Email &amp; Phone</span>
                      <span className="text-[var(--ink)]">{formData.email} · {formData.phone}</span>
                    </div>
                  </div>

                  {/* Requirements Block */}
                  <div className="pb-4 border-b border-[var(--rule)] space-y-2">
                    <span className="text-[var(--ink-3)] block text-[10px] uppercase">Molecules &amp; Formulations</span>
                    {customItems.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {customItems.map((item) => (
                          <li key={item.id}>
                            <span className="font-medium text-[var(--ink)]">{item.generic}</span> ({item.dosageForm}) — {item.quantity} {item.unit}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[var(--ink-3)] italic">No catalogue items attached</span>
                    )}

                    {formData.moleculesText && (
                      <div className="mt-2 text-[var(--ink)] whitespace-pre-wrap">
                        {formData.moleculesText}
                      </div>
                    )}

                    {fileAttachment && (
                      <div className="mt-2 text-[var(--accent-700)]">
                        Attached Document: {fileAttachment.name} ({(fileAttachment.size / 1024).toFixed(1)} KB)
                      </div>
                    )}
                  </div>

                  {/* Terms Block */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-[var(--rule)]">
                    <div>
                      <span className="text-[var(--ink-3)] block text-[10px] uppercase">Shipping Incoterm</span>
                      <span className="font-semibold text-[var(--ink)]">{formData.incoterm || "Not specified"}</span>
                    </div>
                    <div>
                      <span className="text-[var(--ink-3)] block text-[10px] uppercase">Destination Port</span>
                      <span className="text-[var(--ink)]">{formData.destinationPort || "Not specified"}</span>
                    </div>
                    <div>
                      <span className="text-[var(--ink-3)] block text-[10px] uppercase">Target Window</span>
                      <span className="text-[var(--ink)]">{formData.targetDeliveryMonth || "Not specified"}</span>
                    </div>
                  </div>

                  {/* Declaration Note */}
                  <div className="text-[10px] text-[var(--ink-3)] leading-relaxed">
                    Declaration: This enquiry represents a commercial or regulatory request for formulations manufactured by licensed GMP-certified Indian partners. Shreevan Group complies with Indian export regulations and destination country statutory requirements.
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 border border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)] text-xs font-mono uppercase tracking-widest hover:bg-[var(--mist)] transition-colors rounded-[2px]"
                  >
                    ← Terms
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[var(--accent-700)] hover:bg-[var(--accent-500)] text-[var(--paper)] text-xs font-mono uppercase tracking-widest transition-colors rounded-[2px] shadow-sm font-semibold"
                  >
                    Seal Envelope &amp; Submit RFQ
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      )}
    </div>
  );
}
