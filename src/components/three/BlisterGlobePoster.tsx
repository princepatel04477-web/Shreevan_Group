import React from "react";
import { clsx } from "clsx";

/**
 * Pure SVG static fallback for the 3D Blister -> Globe hero.
 * Rendered when:
 * 1. prefers-reduced-motion is active.
 * 2. Hardware concurrency <= 4 or WebGL is unavailable.
 * 3. Initial SSR / Suspense fallback (ensuring 0 CLS).
 */
export function BlisterGlobePoster({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "relative w-full h-full min-h-[500px] md:min-h-[640px] flex items-center justify-center bg-paper overflow-hidden select-none",
        className
      )}
      role="img"
      aria-label="Illustration of pharmaceutical foil blister pack and export destination globe"
    >
      <svg
        viewBox="0 0 1000 640"
        className="w-full h-full max-w-5xl object-contain text-ink"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Foil Gradient */}
          <linearGradient id="foilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECEEED" />
            <stop offset="35%" stopColor="#D8DCDD" />
            <stop offset="70%" stopColor="#CAD0D1" />
            <stop offset="100%" stopColor="#DFE3E4" />
          </linearGradient>

          {/* Thermoformed Clear Plastic Dome Gradient */}
          <radialGradient id="domeGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#E2E7E8" stopOpacity="0.25" />
            <stop offset="90%" stopColor="#9CA3AF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4B5563" stopOpacity="0.6" />
          </radialGradient>

          {/* Tablet Porcelain Gradient */}
          <linearGradient id="tabletGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EFEFEA" />
          </linearGradient>

          {/* Drop Shadows */}
          <filter id="packShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow
              dx="0"
              dy="16"
              stdDeviation="20"
              floodColor="#0F1B24"
              floodOpacity="0.14"
            />
          </filter>
        </defs>

        {/* --- 1. GLOBE WIREFRAME (BACKGROUND) --- */}
        <g transform="translate(680, 310)">
          {/* Globe Outline */}
          <circle cx="0" cy="0" r="180" stroke="#D9DDDA" strokeWidth="1.5" fill="#F7F6F2" />

          {/* Meridians (Longitudes) */}
          <ellipse cx="0" cy="0" rx="60" ry="180" stroke="#D9DDDA" strokeWidth="1" strokeDasharray="3 3" />
          <ellipse cx="0" cy="0" rx="120" ry="180" stroke="#D9DDDA" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="-180" x2="0" y2="180" stroke="#D9DDDA" strokeWidth="1" />

          {/* Parallels (Latitudes) */}
          <ellipse cx="0" cy="-90" rx="155" ry="35" stroke="#D9DDDA" strokeWidth="1" strokeDasharray="3 3" />
          <ellipse cx="0" cy="0" rx="180" ry="45" stroke="#D9DDDA" strokeWidth="1.2" />
          <ellipse cx="0" cy="90" rx="155" ry="35" stroke="#D9DDDA" strokeWidth="1" strokeDasharray="3 3" />

          {/* Flight Arcs from India */}
          {/* India Origin Node */}
          <g transform="translate(25, -20)">
            <circle cx="0" cy="0" r="5" fill="#204D39" />
            <circle cx="0" cy="0" r="10" stroke="#204D39" strokeWidth="1" strokeOpacity="0.4" />
            <text x="14" y="4" className="font-mono text-[9px] font-bold fill-accent-700 tracking-wider">
              INDIA (ORIGIN)
            </text>
          </g>

          {/* Destination Nodes & Arcs */}
          {/* Africa */}
          <path d="M 25,-20 Q -40,-60 -75, 10" stroke="#B99A55" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
          <circle cx="-75" cy="10" r="4" fill="#B99A55" />
          <text x="-125" y="14" className="font-mono text-[8px] font-semibold fill-ink-2 tracking-widest">
            AFRICA
          </text>

          {/* CIS */}
          <path d="M 25,-20 Q 20,-80 10,-95" stroke="#B99A55" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
          <circle cx="10" cy="-95" r="4" fill="#B99A55" />
          <text x="20" y="-95" className="font-mono text-[8px] font-semibold fill-ink-2 tracking-widest">
            CIS
          </text>

          {/* South-East Asia */}
          <path d="M 25,-20 Q 80,-40 95, 15" stroke="#B99A55" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
          <circle cx="95" cy="15" r="4" fill="#B99A55" />
          <text x="105" y="19" className="font-mono text-[8px] font-semibold fill-ink-2 tracking-widest">
            SE ASIA
          </text>

          {/* Middle East */}
          <path d="M 25,-20 Q -10,-40 -25,-15" stroke="#B99A55" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
          <circle cx="-25" cy="-15" r="4" fill="#B99A55" />
          <text x="-75" y="-12" className="font-mono text-[8px] font-semibold fill-ink-2 tracking-widest">
            MIDDLE EAST
          </text>
        </g>

        {/* --- 2. BLISTER PACK (FOREGROUND) --- */}
        <g transform="translate(180, 160)" filter="url(#packShadow)">
          {/* Foil Card Base (Rounded Rectangle 380x240) */}
          <rect
            x="0"
            y="0"
            width="380"
            height="240"
            rx="12"
            fill="url(#foilGrad)"
            stroke="#B5BCBD"
            strokeWidth="1.5"
          />

          {/* Perforated Center Line */}
          <line
            x1="190"
            y1="8"
            x2="190"
            y2="232"
            stroke="#9EA6A8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Back Printed Batch Info (Subtle) */}
          <text
            x="20"
            y="28"
            className="font-mono text-[8px] uppercase tracking-[0.18em] fill-ink-3 font-semibold"
          >
            SHREEVAN GROUP · EXPORT BATCH SPEC-01
          </text>

          {/* 10 Blister Domes & Scored Tablets (5x2 grid) */}
          {[
            // Column 1
            { x: 50, y: 75 },
            { x: 50, y: 165 },
            // Column 2
            { x: 120, y: 75 },
            { x: 120, y: 165 },
            // Column 3
            { x: 190, y: 75 },
            { x: 190, y: 165 },
            // Column 4
            { x: 260, y: 75 },
            { x: 260, y: 165 },
            // Column 5
            { x: 330, y: 75 },
            { x: 330, y: 165 },
          ].map((pos, idx) => (
            <g key={idx} transform={`translate(${pos.x}, ${pos.y})`}>
              {/* Embossed Ring on Foil */}
              <circle cx="0" cy="0" r="28" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" fill="none" />
              <circle cx="0" cy="0" r="27" stroke="#A0A8AA" strokeWidth="1" fill="none" />

              {/* Scored Tablet */}
              <circle cx="0" cy="0" r="20" fill="url(#tabletGrad)" stroke="#D1D5DB" strokeWidth="0.8" />
              {/* Tablet Score Line */}
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#CBD5E1" strokeWidth="1.2" />

              {/* Clear Thermoformed Dome */}
              <circle cx="0" cy="0" r="25" fill="url(#domeGrad)" />
              {/* Glare Arc */}
              <path
                d="M -14,-14 A 20 20 0 0 1 14,-14"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.75"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
