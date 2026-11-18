"use client";

import React, { useState } from "react";
import { CARTON_ZONES } from "@/content/export";

export function CartonInteractive() {
  const [activeZoneId, setActiveZoneId] = useState<string>(CARTON_ZONES[0]?.id ?? "language");

  const activeZone = CARTON_ZONES.find((z) => z.id === activeZoneId) ?? CARTON_ZONES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column (6 cols): Interactive SVG Carton Net */}
      <div className="lg:col-span-6 bg-porcelain border border-rule p-6 sm:p-8 rounded-[2px] shadow-[0_2px_12px_rgba(15,27,36,0.03)] space-y-4">
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-700 font-semibold">
            INTERACTIVE DIE-CUT NET
          </span>
          <span className="font-mono text-[10px] text-ink-3">
            SELECT OR HOVER ANY ZONE
          </span>
        </div>

        {/* SVG Carton Die-Cut */}
        <div className="relative w-full aspect-[4/3] bg-paper border border-rule flex items-center justify-center p-4">
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full text-ink"
            aria-label="Interactive pharmaceutical carton packaging die-line diagram"
          >
            {/* Top Dust Flap */}
            <rect x="130" y="20" width="140" height="40" fill="#EEF1F0" stroke="#D9DDDA" strokeDasharray="3 3" />
            <text x="200" y="45" fill="#5E6B74" fontSize="10" fontFamily="monospace" textAnchor="middle">
              TOP TUCK FLAP
            </text>

            {/* Zone 1: Language / Side Panel */}
            <g
              tabIndex={0}
              role="button"
              onClick={() => setActiveZoneId("language")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveZoneId("language");
                }
              }}
              onMouseEnter={() => setActiveZoneId("language")}
              className="cursor-pointer focus:outline-none"
            >
              <rect
                x="30"
                y="60"
                width="100"
                height="160"
                fill={activeZoneId === "language" ? "#E2ECE7" : "#FFFFFF"}
                stroke={activeZoneId === "language" ? "#1B4231" : "#D9DDDA"}
                strokeWidth={activeZoneId === "language" ? "2" : "1"}
                className="transition-colors"
              />
              <text x="80" y="130" fill="#0F1B24" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ZONE 01
              </text>
              <text x="80" y="150" fill="#5E6B74" fontSize="9" fontFamily="monospace" textAnchor="middle">
                LANGUAGE &amp; COPY
              </text>
            </g>

            {/* Zone 2: Primary Pack / Front Main Face */}
            <g
              tabIndex={0}
              role="button"
              onClick={() => setActiveZoneId("pack")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveZoneId("pack");
                }
              }}
              onMouseEnter={() => setActiveZoneId("pack")}
              className="cursor-pointer focus:outline-none"
            >
              <rect
                x="130"
                y="60"
                width="140"
                height="160"
                fill={activeZoneId === "pack" ? "#E2ECE7" : "#FFFFFF"}
                stroke={activeZoneId === "pack" ? "#1B4231" : "#D9DDDA"}
                strokeWidth={activeZoneId === "pack" ? "2" : "1"}
                className="transition-colors"
              />
              <text x="200" y="125" fill="#0F1B24" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ZONE 02
              </text>
              <text x="200" y="145" fill="#5E6B74" fontSize="9" fontFamily="monospace" textAnchor="middle">
                BRAND &amp; PACK FORMAT
              </text>
              <text x="200" y="165" fill="#1B4231" fontSize="9" fontFamily="monospace" textAnchor="middle">
                10 × 10 BLISTER / ALU-ALU
              </text>
            </g>

            {/* Zone 3: Security & Serialization / Reverse Panel */}
            <g
              tabIndex={0}
              role="button"
              onClick={() => setActiveZoneId("security")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveZoneId("security");
                }
              }}
              onMouseEnter={() => setActiveZoneId("security")}
              className="cursor-pointer focus:outline-none"
            >
              <rect
                x="270"
                y="60"
                width="100"
                height="160"
                fill={activeZoneId === "security" ? "#E2ECE7" : "#FFFFFF"}
                stroke={activeZoneId === "security" ? "#1B4231" : "#D9DDDA"}
                strokeWidth={activeZoneId === "security" ? "2" : "1"}
                className="transition-colors"
              />
              <text x="320" y="130" fill="#0F1B24" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ZONE 03
              </text>
              <text x="320" y="150" fill="#5E6B74" fontSize="9" fontFamily="monospace" textAnchor="middle">
                2D BARCODE / GS1
              </text>
            </g>

            {/* Zone 4: Dossier Alignment / Bottom Flap */}
            <g
              tabIndex={0}
              role="button"
              onClick={() => setActiveZoneId("dossier")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveZoneId("dossier");
                }
              }}
              onMouseEnter={() => setActiveZoneId("dossier")}
              className="cursor-pointer focus:outline-none"
            >
              <rect
                x="130"
                y="220"
                width="140"
                height="50"
                fill={activeZoneId === "dossier" ? "#E2ECE7" : "#FFFFFF"}
                stroke={activeZoneId === "dossier" ? "#1B4231" : "#D9DDDA"}
                strokeWidth={activeZoneId === "dossier" ? "2" : "1"}
                className="transition-colors"
              />
              <text x="200" y="245" fill="#0F1B24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ZONE 04: DOSSIER ALIGNMENT
              </text>
              <text x="200" y="260" fill="#5E6B74" fontSize="8" fontFamily="monospace" textAnchor="middle">
                LICENCE &amp; IMPORTER REFS
              </text>
            </g>
          </svg>
        </div>

        <p className="font-mono text-[11px] text-ink-3 text-center">
          Keyboard users can press Tab and Enter/Space to inspect each carton zone.
        </p>
      </div>

      {/* Right Column (6 cols): Live Region Details */}
      <div
        aria-live="polite"
        className="lg:col-span-6 bg-porcelain border border-rule p-8 space-y-6 shadow-[0_2px_12px_rgba(15,27,36,0.03)] rounded-[2px]"
      >
        {activeZone && (
          <div className="space-y-6">
            <div className="border-b border-rule pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold block">
                {activeZone.zone} / PACKAGING SPECIFICATION
              </span>
              <h3 className="font-display text-2xl font-light text-ink mt-1">
                {activeZone.title}
              </h3>
            </div>

            <p className="font-body text-sm sm:text-base text-ink-2 leading-relaxed">
              {activeZone.description}
            </p>

            <div className="space-y-3 pt-2">
              <span className="font-mono text-xs uppercase tracking-wider text-ink block font-semibold">
                AVAILABLE MARKET ADAPTATIONS:
              </span>
              <ul className="space-y-2 font-mono text-xs text-ink-2">
                {activeZone.adaptableOptions.map((opt) => (
                  <li key={opt} className="flex items-center gap-2 bg-paper p-2.5 border border-rule">
                    <span className="text-accent-700 font-bold">✓</span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-rule font-mono text-[11px] text-ink-3">
              <span>Artwork files provided in Adobe Illustrator (AI) and print-ready PDF formats</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
