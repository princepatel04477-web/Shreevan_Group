import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const checkboxId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex items-start gap-3">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className={twMerge(
              clsx(
                "h-4 w-4 rounded-[2px] border border-rule bg-porcelain text-accent-700 transition duration-150 cursor-pointer",
                "focus:ring-2 focus:ring-accent-700 focus:ring-offset-1 focus:outline-none",
                "checked:bg-accent-700 checked:border-accent-700",
                error && "border-signal",
                className
              )
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="text-sm">
            {label && (
              <label
                htmlFor={checkboxId}
                className="font-medium text-ink cursor-pointer select-none leading-none"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-ink-3 mt-1 leading-normal select-none">
                {description}
              </p>
            )}
            {error && (
              <p className="text-xs text-signal font-mono mt-1" role="alert">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
