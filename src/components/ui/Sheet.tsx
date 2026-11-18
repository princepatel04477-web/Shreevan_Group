import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Sheet({
  level = 1,
  padding = "md",
  className,
  children,
  ...props
}: SheetProps) {
  // Shape rule from constitution: 0 radius on images/panels
  const levelStyles = {
    1: "bg-porcelain border border-rule shadow-[0_1px_3px_rgba(15,27,36,0.04)]",
    2: "bg-porcelain border border-rule shadow-[0_4px_16px_rgba(15,27,36,0.07),0_1px_3px_rgba(15,27,36,0.04)]",
    3: "bg-porcelain border border-rule shadow-[0_16px_36px_rgba(15,27,36,0.1),0_2px_8px_rgba(15,27,36,0.05)]",
  };

  const paddingStyles = {
    none: "p-0",
    sm: "p-4",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-12",
  };

  return (
    <div
      className={twMerge(
        clsx(
          "relative transition-shadow duration-200",
          levelStyles[level],
          paddingStyles[padding],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
