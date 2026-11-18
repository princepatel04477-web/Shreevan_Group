import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-body text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-700 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-[2px]",
      md: "h-10 px-4 py-2 text-sm rounded-[2px]",
      lg: "h-12 px-6 text-base rounded-[2px]",
    };

    const variantStyles = {
      // Primary CTA: The single filled accent button permitted by AGENTS.md
      primary:
        "bg-accent-700 text-porcelain hover:bg-accent-500 shadow-sm",
      // Secondary outline: Clean hairline rule border
      secondary:
        "border border-rule bg-transparent text-ink hover:bg-mist hover:border-ink-3/40",
      // Text link: Underlined on hover
      link: "text-accent-700 underline-offset-4 hover:underline p-0 h-auto rounded-none active:scale-100",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            baseStyles,
            variant !== "link" && sizeStyles[size],
            variantStyles[variant],
            className
          )
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
