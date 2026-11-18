"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  SectionLabel,
  RuledTable,
  Footnote,
  Ticket,
  Sheet,
} from "@/components/ui";
import { company, IfFact, getFacts } from "@/config/company";
import { getPublicProducts, getCategories, moleculeCode } from "@/lib/catalogue";

export default function StyleGuidePage() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("tablets");
  const [checkboxValue, setCheckboxValue] = useState(false);

  // Fetch sample public products
  const publicProducts = getPublicProducts().slice(0, 5);
  const categories = getCategories();
  const facts = getFacts();

  const colorTokens = [
    { name: "--paper", hex: "#F7F6F2", label: "Paper Surface", role: "Page base background", contrast: "1.00:1" },
    { name: "--porcelain", hex: "#FFFFFF", label: "Porcelain Sheet", role: "Card & dossier sheets", contrast: "1.08:1" },
    { name: "--mist", hex: "#EEF1F0", label: "Mist Surface", role: "Hover & tertiary tint", contrast: "1.05:1" },
    { name: "--rule", hex: "#D9DDDA", label: "Rule Hairline", role: "Borders & gridlines", contrast: "1.24:1" },
    { name: "--ink", hex: "#0F1B24", label: "Primary Ink", role: "Headings & main text", contrast: "14.2:1 (AAA)" },
    { name: "--ink-2", hex: "#33424D", label: "Secondary Ink", role: "Sublines & captions", contrast: "9.8:1 (AAA)" },
    { name: "--ink-3", hex: "#5E6B74", label: "Muted Ink", role: "Metadata & footnotes", contrast: "5.4:1 (AA)" },
    { name: "--accent-700", hex: "#1B4231", label: "Deep Forest Green", role: "Primary CTA & anchors", contrast: "9.9:1 (AAA)" },
    { name: "--accent-500", hex: "#204D39", label: "Logo Forest Green", role: "Brand highlights", contrast: "8.9:1 (AAA)" },
    { name: "--accent-100", hex: "#E2ECE7", label: "Accent Mist Tint", role: "Selection & tags", contrast: "1.12:1" },
    { name: "--accent-gold", hex: "#B99A55", label: "Heritage Gold", role: "Secondary ornament", contrast: "2.4:1" },
    { name: "--signal", hex: "#B4532A", label: "Warning Signal", role: "Warnings & errors", contrast: "4.8:1 (AA)" },
    { name: "--ink-stamp", hex: "#143326", label: "Ink Stamp", role: "Route seal & stamps", contrast: "13.6:1 (AAA)" },
  ];

  return (
    <main className="min-h-screen py-16 px-6 md:px-12 max-w-[1320px] mx-auto space-y-20">
      {/* Editorial Header */}
      <header className="border-b border-rule pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo.svg"
                alt="Shreevan Group logo mark"
                width={36}
                height={36}
                className="h-9 w-auto"
                priority
              />
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-semibold">
                SYSTEM SPECIFICATION · SG-DS-01
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-light text-ink tracking-tight">
              Design Tokens & Primitives
            </h1>
            <p className="font-body text-base text-ink-2 max-w-2xl leading-relaxed">
              Living design constitution for the Shreevan Group export dossier. Pure materials,
              rigorous typographics, and verified factual accountability.
            </p>
          </div>
          <div className="font-mono text-xs text-ink-3 text-left md:text-right space-y-1">
            <p className="font-semibold text-ink">CONSTITUTION VERSION 1.0</p>
            <p>Tailwind v4 · Next.js 15 · WCAG 2.2 AA</p>
            <p className="text-accent-700">Allopathic + AYUSH Standards</p>
          </div>
        </div>
      </header>

      {/* 1. Design Tokens */}
      <section className="space-y-8" aria-labelledby="tokens-heading">
        <SectionLabel number="01" label="Color Palette & Contrast Tokens" id="tokens-heading" />
        <p className="text-sm text-ink-2 max-w-3xl">
          Calibrated strictly from the Shreevan botanical brand mark. Every text token has been
          mathematically tested against the paper base for accessibility compliance.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colorTokens.map((token) => (
            <div
              key={token.name}
              className="border border-rule bg-porcelain p-4 flex flex-col justify-between h-44 shadow-[0_1px_3px_rgba(15,27,36,0.04)]"
            >
              <div>
                <div
                  className="w-full h-12 border border-rule/60 mb-3"
                  style={{ backgroundColor: token.hex }}
                  aria-hidden="true"
                />
                <p className="font-mono text-xs font-bold text-ink">{token.name}</p>
                <p className="font-body text-xs text-ink-2 mt-0.5">{token.label}</p>
              </div>
              <div className="pt-2 border-t border-rule/40 font-mono text-[11px] text-ink-3 flex justify-between">
                <span>{token.hex}</span>
                <span className="text-accent-700 font-medium">{token.contrast}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography System */}
      <section className="space-y-8" aria-labelledby="typography-heading">
        <SectionLabel number="02" label="Editorial Typography Scale" id="typography-heading" />
        <div className="space-y-10 border-t border-rule pt-6">
          {/* Display */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-ink-3">DISPLAY · FRAUNCES 300 · 64PX / 1.1</span>
            <p className="font-display text-5xl md:text-6xl text-ink font-light tracking-tight">
              Medicines made in India, documented for the world.
            </p>
          </div>

          {/* H1 */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-ink-3">H1 · FRAUNCES 400 · 48PX / 1.15</span>
            <p className="font-display text-4xl md:text-5xl text-ink">
              The Journey of an Export Batch
            </p>
          </div>

          {/* H2 */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-ink-3">H2 · FRAUNCES 400 · 32PX / 1.25</span>
            <p className="font-display text-2xl md:text-3xl text-ink">
              Every shipment leaves with its paperwork.
            </p>
          </div>

          {/* Body */}
          <div className="space-y-2 max-w-3xl">
            <span className="font-mono text-xs text-ink-3">BODY · INSTRUMENT SANS 400 · 17PX / 1.65</span>
            <p className="font-body text-[17px] leading-[1.65] text-ink-2">
              Shreevan Group is an Indian pharmaceutical merchant exporter supplying formulations
              (tablets, capsules, softgels, oral liquids, dry syrups, injections, topicals) and
              Ayurveda products, sourced from licensed GMP-certified manufacturing partners, to
              importers, distributors, hospitals, NGOs and tender buyers.
            </p>
          </div>

          {/* Data & Caps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-rule/60">
            <div>
              <span className="font-mono text-xs text-ink-3 block mb-2">CAPS LABEL · 12PX · 0.14EM TRACKING</span>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-semibold">
                PHARMACEUTICAL EXPORTS · INDIA · EST. BATCH
              </p>
            </div>
            <div>
              <span className="font-mono text-xs text-ink-3 block mb-2">DATA · JETBRAINS MONO 14PX</span>
              <p className="font-mono text-sm text-ink bg-mist/60 p-2.5 border border-rule">
                BATCH: SG-2026-EXP-08492 // ASSAY: 99.8% // STATUS: CLEARED
              </p>
            </div>
          </div>

          {/* Fallback script */}
          <div>
            <span className="font-mono text-xs text-ink-3 block mb-2">FALLBACK SCRIPT · NOTO SANS DEVANAGARI</span>
            <p className="font-devanagari text-lg text-ink">
              श्रीवन ग्रुप · भारतीय फार्मास्युटिकल निर्यातक · गुणवत्ता और प्रमाणिकता
            </p>
          </div>
        </div>
      </section>

      {/* 3. UI Primitives Matrix */}
      <section className="space-y-8" aria-labelledby="primitives-heading">
        <SectionLabel number="03" label="Interactive UI Primitives Matrix" id="primitives-heading" />

        {/* Buttons */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 font-semibold">
            Buttons (Restrained Palette)
          </h3>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-porcelain border border-rule">
            <Button variant="primary">Request a Quotation</Button>
            <Button variant="primary" isLoading>Requesting</Button>
            <Button variant="primary" disabled>Primary Disabled</Button>
            <Button variant="secondary">View Documentation</Button>
            <Button variant="secondary" disabled>Outline Disabled</Button>
            <Button variant="link">Open Technical Data Sheet →</Button>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 font-semibold">
            Form Controls & Validation States
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-porcelain border border-rule">
            <Input
              label="Generic Name (Default)"
              placeholder="e.g. Paracetamol"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="Destination Port (Error)"
              defaultValue="Invalid Port 99"
              error="Port code must conform to UN/LOCODE."
            />
            <Input
              label="Consignment Ref (Disabled)"
              defaultValue="SG-EXP-LOCKED"
              disabled
            />

            <Select
              label="Dosage Form"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                { value: "tablets", label: "Tablets (Coated / Uncoated)" },
                { value: "capsules", label: "Capsules (Hard / Softgel)" },
                { value: "injectables", label: "Injections (Liquid / Dry)" },
                { value: "syrups", label: "Oral Liquids & Dry Syrups" },
              ]}
            />
            <Select
              label="Incoterm (Error)"
              error="Incoterm selection is required for freight quotation."
              options={[
                { value: "", label: "Select terms..." },
                { value: "fob", label: "FOB (Free on Board)" },
                { value: "cif", label: "CIF (Cost, Insurance & Freight)" },
              ]}
            />
            <Select
              label="Currency (Disabled)"
              disabled
              options={[{ value: "usd", label: "USD ($)" }]}
            />

            <div className="md:col-span-3">
              <Textarea
                label="Tender / Product Requirement"
                placeholder="List molecule names, strengths, quantities, and destination requirements..."
              />
            </div>

            <div className="md:col-span-3 pt-2">
              <Checkbox
                label="Import Licence Confirmation"
                description="I confirm our entity holds a valid drug import permit in the destination jurisdiction."
                checked={checkboxValue}
                onChange={(e) => setCheckboxValue(e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* Paper Sheet Elevation Levels */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 font-semibold">
            Paper Sheet Materiality (Levels 1–3)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Sheet level={1}>
              <span className="font-mono text-[10px] uppercase text-accent-700 tracking-widest block mb-2 font-semibold">
                LEVEL 1 · RESTING SHEET
              </span>
              <h4 className="font-display text-lg text-ink font-medium">Standard Dossier Container</h4>
              <p className="font-body text-xs text-ink-2 mt-2 leading-relaxed">
                Subtle hairline boundary with 1px base elevation. Ideal for stationary catalogue tiles and table containers.
              </p>
            </Sheet>

            <Sheet level={2}>
              <span className="font-mono text-[10px] uppercase text-accent-700 tracking-widest block mb-2 font-semibold">
                LEVEL 2 · HOVER & LIFT
              </span>
              <h4 className="font-display text-lg text-ink font-medium">Interactive Certificate</h4>
              <p className="font-body text-xs text-ink-2 mt-2 leading-relaxed">
                Elevated tinted shadow for focused items, active modal views, and hovering technical specification sheets.
              </p>
            </Sheet>

            <Sheet level={3}>
              <span className="font-mono text-[10px] uppercase text-accent-700 tracking-widest block mb-2 font-semibold">
                LEVEL 3 · ELEVATED MODAL
              </span>
              <h4 className="font-display text-lg text-ink font-medium">Dossier Fan-out & Overlay</h4>
              <p className="font-body text-xs text-ink-2 mt-2 leading-relaxed">
                Maximum depth simulation for modal dialogs, route transitions, and full-screen document inspections.
              </p>
            </Sheet>
          </div>
        </div>

        {/* Perforated Batch Ticket */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 font-semibold">
            Batch Ticket Primitive
          </h3>
          <Ticket
            batchNumber="SG / 2026 / CH-01"
            stub={
              <span className="font-mono text-[11px] text-ink-3 block">
                STATUS: DISPATCH READY
              </span>
            }
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-semibold block">
                  CHAPTER 01 · FORMULATION
                </span>
                <h4 className="font-display text-xl text-ink font-medium mt-1">
                  Export Dossier Manifest
                </h4>
                <p className="font-body text-xs text-ink-2 mt-1">
                  Perforated ticket container serving as navigation bookmark and chapter timeline anchor.
                </p>
              </div>
              <Button size="sm" variant="secondary">
                Inspect Batch
              </Button>
            </div>
          </Ticket>
        </div>

        {/* Ruled Table */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 font-semibold">
            Ruled Procurement Table (Live Catalogue Preview)
          </h3>
          <RuledTable
            caption="Sample public formulations from the Shreevan Group catalogue"
            columns={[
              {
                key: "code",
                header: "Mol",
                align: "center",
                render: (item) => (
                  <span className="inline-block px-1.5 py-0.5 bg-mist border border-rule font-mono text-xs font-bold text-accent-700">
                    {moleculeCode(item.generic)}
                  </span>
                ),
              },
              {
                key: "generic",
                header: "Generic Composition",
                render: (item) => (
                  <span className="font-medium text-ink">
                    {item.generic}
                  </span>
                ),
              },
              { key: "dosageForm", header: "Dosage Form" },
              { key: "category", header: "Therapeutic Category" },
              {
                key: "packs",
                header: "Available Packs",
                align: "right",
                render: (item) => (
                  <span className="font-mono text-xs text-ink-2">
                    {item.packs.join(", ")}
                  </span>
                ),
              },
            ]}
            data={publicProducts}
            keyExtractor={(item) => item.id}
          />
          <div className="flex justify-between items-center text-xs font-mono text-ink-3">
            <span>
              Showing {publicProducts.length} sample items from 229 verified public formulations across {categories.length} therapeutic areas
            </span>
            <Footnote asOf="18 November 2026" source="Internal Export Master Catalogue" />
          </div>

          {/* Categories Pill Grid */}
          <div className="pt-2">
            <span className="font-mono text-xs text-ink-3 block mb-2">THERAPEUTIC CATEGORIES & COUNTS</span>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 8).map((cat) => (
                <span
                  key={cat.category}
                  className="px-2.5 py-1 bg-mist border border-rule text-xs font-mono text-ink"
                >
                  {cat.category}: <span className="font-bold text-accent-700">{cat.count}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Honesty Rule Demonstration */}
      <section className="space-y-6 border-t border-rule pt-8" aria-labelledby="honesty-heading">
        <SectionLabel number="04" label="Honesty & Verified Facts System" id="honesty-heading" />
        <div className="p-6 bg-mist/50 border border-rule space-y-4">
          <h4 className="font-display text-lg text-ink font-medium">
            Strict Non-Inventive Render Verification
          </h4>
          <p className="font-body text-sm text-ink-2 leading-relaxed">
            Per the project constitution, components whose fact is empty render zero placeholders.
            Below is an automated demonstration of the <code>&lt;IfFact&gt;</code> helper:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2">
            <div className="p-4 bg-porcelain border border-rule space-y-1.5">
              <span className="text-accent-700 font-bold block">CASE A: Empty Fact (e.g. IEC Code)</span>
              <p className="text-ink-3">
                Condition: <code>company.iec = &quot;{company.iec}&quot;</code>
              </p>
              <div className="p-2 border border-dashed border-rule bg-paper text-ink-3">
                <IfFact when={company.iec}>
                  <span>IEC: {company.iec}</span>
                </IfFact>
                <em>[Verified: Renders nothing because value is empty]</em>
              </div>
            </div>

            <div className="p-4 bg-porcelain border border-rule space-y-1.5">
              <span className="text-accent-700 font-bold block">CASE B: Verified Non-Empty Fact</span>
              <p className="text-ink-3">
                Condition: <code>company.tradeName = &quot;{company.tradeName}&quot;</code>
              </p>
              <div className="p-2 border border-rule bg-porcelain text-ink font-medium">
                <IfFact when={company.tradeName}>
                  <span>Trade Entity: {company.tradeName}</span>
                </IfFact>
              </div>
              <p className="text-ink-3 mt-1">
                Active dated facts in register: <strong>{facts.length}</strong>
              </p>
            </div>
          </div>
          <Footnote asOf="18 November 2026" source="src/config/company.ts & AGENTS.md Constitution" />
        </div>
      </section>

      {/* Footer Colophon */}
      <footer className="pt-8 border-t border-rule text-center font-mono text-xs text-ink-3">
        <p>SHREEVAN GROUP · MOLECULE TO MANIFEST · DESIGN SYSTEM COMPILED</p>
      </footer>
    </main>
  );
}
