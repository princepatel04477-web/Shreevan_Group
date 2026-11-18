"use client";

import React, { useId } from "react";

interface MoleculeGlyphProps {
  code: string;
  className?: string;
  animated?: boolean;
}

// Simple deterministic hash from string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function MoleculeGlyph({ code, className, animated = false }: MoleculeGlyphProps) {
  const maskId = useId();
  const seed = hashString(code);
  const variant = seed % 4; // 0: single ring + branches, 1: fused 6-6 ring, 2: fused 6-5 ring, 3: zigzag aliphatic chain

  // Coordinates centered in a 100x100 viewBox
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={maskId}>
          <rect width="100" height="100" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${maskId})`}>
        {variant === 0 && (
          // Benzene ring with 3 substituents
          <g className={animated ? "transition-transform duration-500 group-hover:scale-105 origin-center" : ""}>
            {/* Hexagon ring */}
            <polygon points="50,22 74,36 74,64 50,78 26,64 26,36" className="stroke-accent-700/60" />
            {/* Inner double bonds */}
            <line x1="50" y1="28" x2="69" y2="39" className="stroke-accent-700/40" />
            <line x1="69" y1="61" x2="50" y2="72" className="stroke-accent-700/40" />
            <line x1="31" y1="61" x2="31" y2="39" className="stroke-accent-700/40" />
            {/* Branches */}
            <line x1="50" y1="22" x2="50" y2="8" className="stroke-accent-700/50" />
            <line x1="74" y1="64" x2="88" y2="72" className="stroke-accent-700/50" />
            <line x1="26" y1="36" x2="12" y2="28" className="stroke-accent-700/50" />
            {/* End group dots */}
            <circle cx="50" cy="8" r="1.5" className="fill-accent-700/70 stroke-none" />
            <circle cx="88" cy="72" r="1.5" className="fill-accent-700/70 stroke-none" />
            <circle cx="12" cy="28" r="1.5" className="fill-accent-700/70 stroke-none" />
          </g>
        )}

        {variant === 1 && (
          // Fused 6-6 bicyclic system (Naphthalene core)
          <g className={animated ? "transition-transform duration-500 group-hover:scale-105 origin-center" : ""}>
            <polygon points="35,26 56,26 66,44 56,62 35,62 25,44" className="stroke-accent-700/60" />
            <polygon points="56,26 77,26 87,44 77,62 56,62" className="stroke-accent-700/60" />
            {/* Double bonds */}
            <line x1="37" y1="31" x2="54" y2="31" className="stroke-accent-700/40" />
            <line x1="64" y1="44" x2="56" y2="58" className="stroke-accent-700/40" />
            <line x1="75" y1="31" x2="83" y2="44" className="stroke-accent-700/40" />
            <line x1="29" y1="44" x2="37" y2="58" className="stroke-accent-700/40" />
            {/* Side chains */}
            <line x1="87" y1="44" x2="96" y2="44" className="stroke-accent-700/50" />
            <line x1="25" y1="44" x2="14" y2="38" className="stroke-accent-700/50" />
            <line x1="35" y1="62" x2="28" y2="76" className="stroke-accent-700/50" />
            <circle cx="96" cy="44" r="1.5" className="fill-accent-700/70 stroke-none" />
            <circle cx="14" cy="38" r="1.5" className="fill-accent-700/70 stroke-none" />
            <circle cx="28" cy="76" r="1.5" className="fill-accent-700/70 stroke-none" />
          </g>
        )}

        {variant === 2 && (
          // Fused 6-5 hetero ring (Indole/Purine core)
          <g className={animated ? "transition-transform duration-500 group-hover:scale-105 origin-center" : ""}>
            <polygon points="26,30 48,30 59,48 48,66 26,66 15,48" className="stroke-accent-700/60" />
            <polygon points="59,48 76,36 88,54 74,72 48,66" className="stroke-accent-700/60" />
            {/* Conjugated bonds */}
            <line x1="28" y1="35" x2="46" y2="35" className="stroke-accent-700/40" />
            <line x1="55" y1="49" x2="46" y2="62" className="stroke-accent-700/40" />
            <line x1="75" y1="42" x2="83" y2="54" className="stroke-accent-700/40" />
            {/* Substituents */}
            <line x1="26" y1="30" x2="18" y2="18" className="stroke-accent-700/50" />
            <line x1="88" y1="54" x2="98" y2="58" className="stroke-accent-700/50" />
            <circle cx="18" cy="18" r="1.5" className="fill-accent-700/70 stroke-none" />
            <circle cx="98" cy="58" r="1.5" className="fill-accent-700/70 stroke-none" />
          </g>
        )}

        {variant === 3 && (
          // Aliphatic zigzag carbon backbone with terminal carboxyl/amide group
          <g className={animated ? "transition-transform duration-500 group-hover:scale-105 origin-center" : ""}>
            <polyline
              points="14,64 28,40 44,64 60,40 76,64 90,40"
              className="stroke-accent-700/60"
            />
            {/* Carbonyl double bond */}
            <line x1="60" y1="40" x2="60" y2="24" className="stroke-accent-700/50" />
            <line x1="63" y1="40" x2="63" y2="24" className="stroke-accent-700/50" />
            <circle cx="61.5" cy="20" r="2" className="stroke-accent-700/60 fill-transparent" />
            {/* Hydroxyl/Amino branch */}
            <line x1="44" y1="64" x2="44" y2="78" className="stroke-accent-700/50" />
            <circle cx="44" cy="80" r="1.5" className="fill-accent-700/70 stroke-none" />
            <circle cx="14" cy="64" r="1.5" className="fill-accent-700/70 stroke-none" />
            <circle cx="90" cy="40" r="1.5" className="fill-accent-700/70 stroke-none" />
          </g>
        )}
      </g>
    </svg>
  );
}
