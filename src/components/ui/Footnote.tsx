import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface FootnoteProps extends React.HTMLAttributes<HTMLParagraphElement> {
  asOf: string;
  source?: string;
  index?: number | string;
}

export function Footnote({
  asOf,
  source,
  index,
  className,
  children,
  ...props
}: FootnoteProps) {
  return (
    <p
      className={twMerge(
        clsx(
          "font-mono text-[11px] text-ink-3 leading-relaxed flex items-baseline gap-1.5",
          className
        )
      )}
      {...props}
    >
      {index !== undefined && (
        <span className="text-accent-700 font-semibold select-none">[{index}]</span>
      )}
      <span>
        {children ? (
          <>
            {children}{" "}
            <span className="text-ink-3/80 font-normal">
              (as of {asOf}{source ? ` · ${source}` : ""})
            </span>
          </>
        ) : (
          `As of ${asOf}${source ? ` · Source: ${source}` : ""}`
        )}
      </span>
    </p>
  );
}
