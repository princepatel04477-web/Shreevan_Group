import React from "react";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { clsx } from "clsx";

export interface ContentPageHeaderProps {
  index: string;
  label: string;
  title: string;
  subtitle: string;
  badge?: string;
  className?: string;
}

export function ContentPageHeader({
  index,
  label,
  title,
  subtitle,
  badge = "EXPORT SPECIFICATION",
  className,
}: ContentPageHeaderProps) {
  return (
    <div className={clsx("border-b border-rule bg-porcelain pt-12 pb-10 px-6 sm:px-10 lg:px-16", className)}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Category Label and Stage Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent-700 font-bold">
              {index} / {label}
            </span>
            <span className="text-rule">|</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
              SHREEVAN GROUP EXPORT DESK
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-700" aria-hidden="true" />
            <span className="font-mono text-[11px] text-ink-3 uppercase tracking-wider">
              {badge}
            </span>
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-2">
          <div className="lg:col-span-7">
            <SplitHeading
              text={title}
              as="h1"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight leading-[1.08]"
            />
          </div>
          <div className="lg:col-span-5 lg:pl-6 border-l-0 lg:border-l border-rule">
            <p className="font-body text-base lg:text-lg text-ink-2 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
