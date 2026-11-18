import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: string | number;
  label: string;
}

export function SectionLabel({
  number,
  label,
  className,
  ...props
}: SectionLabelProps) {
  const formattedNumber =
    typeof number === "number" ? String(number).padStart(2, "0") : number;

  return (
    <div className={twMerge(clsx("w-full py-2", className))} {...props}>
      <div className="flex items-center gap-3">
        {formattedNumber && (
          <span className="font-mono text-xs tracking-[0.14em] text-accent-700 font-medium">
            {formattedNumber}
          </span>
        )}
        {formattedNumber && <span className="text-rule">/</span>}
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-2 font-medium">
          {label}
        </span>
      </div>
      {/* Signature double hairline rule in --rule */}
      <div className="mt-2.5 space-y-[2px]" aria-hidden="true">
        <div className="h-[1px] w-full bg-rule" />
        <div className="h-[1px] w-full bg-rule/50" />
      </div>
    </div>
  );
}
