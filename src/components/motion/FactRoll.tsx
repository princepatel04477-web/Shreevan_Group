"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Footnote } from "@/components/ui/Footnote";
import { clsx } from "clsx";

export interface FactRollProps {
  value: number;
  unit?: string;
  label: string;
  asOf: string;
  source?: string;
  className?: string;
}

export function FactRoll({
  value,
  unit,
  label,
  asOf,
  source,
  className,
}: FactRollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => {
        setDisplayValue(value);
      });
      return () => cancelAnimationFrame(frame);
    }

    const start = 0;
    const duration = 1400; // ms
    const startTime = performance.now();
    let frameId = 0;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (value - start) * ease);

      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <div ref={ref} className={clsx("space-y-1.5", className)}>
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3 block">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-3xl md:text-4xl font-bold text-accent-700 tracking-tight">
          {displayValue}
        </span>
        {unit && (
          <span className="font-mono text-sm text-ink-2 font-medium">
            {unit}
          </span>
        )}
      </div>
      <Footnote asOf={asOf} source={source} />
    </div>
  );
}
