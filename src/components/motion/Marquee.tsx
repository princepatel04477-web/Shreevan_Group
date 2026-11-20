"use client";

import React from "react";
import { clsx } from "clsx";

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds per cycle
  direction?: "left" | "right";
  className?: string;
  separator?: string;
}

/**
 * Marquee (React Bits ScrollVelocity / Vengeance UI Marquee)
 * Infinite seamless typography / logo ribbon.
 */
export function Marquee({
  items,
  speed = 28,
  direction = "left",
  className,
  separator = "◆",
}: MarqueeProps) {
  const content = items.map((item, idx) => (
    <span key={idx} className="inline-flex items-center gap-4 mx-3">
      <span className="font-mono text-xs uppercase tracking-[0.18em] font-medium text-ink">
        {item}
      </span>
      <span className="text-[9px] text-accent-700/60" aria-hidden="true">
        {separator}
      </span>
    </span>
  ));

  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden select-none py-3 border-y border-rule/80 bg-paper/60 backdrop-blur-xs",
        className
      )}
      aria-hidden="true"
    >
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-paper to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-paper to-transparent z-10" />

      <div
        className="flex w-max will-change-transform"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0">{content}</div>
        <div className="flex shrink-0">{content}</div>
        <div className="flex shrink-0">{content}</div>
        <div className="flex shrink-0">{content}</div>
      </div>
    </div>
  );
}
