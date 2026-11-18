import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, rows = 4, ...props }, ref) => {
    const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-mono uppercase tracking-[0.14em] text-ink-2"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={twMerge(
            clsx(
              "w-full px-3.5 py-2.5 text-sm bg-porcelain text-ink placeholder:text-ink-3 rounded-[2px] border transition-colors outline-none resize-y",
              error
                ? "border-signal focus:border-signal focus:ring-1 focus:ring-signal"
                : "border-rule focus:border-accent-700 focus:ring-1 focus:ring-accent-700",
              "disabled:bg-mist disabled:text-ink-3 disabled:cursor-not-allowed",
              className
            )
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-signal font-mono mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
