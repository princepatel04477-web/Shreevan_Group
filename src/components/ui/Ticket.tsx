import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface TicketProps extends React.HTMLAttributes<HTMLDivElement> {
  batchNumber?: string;
  variant?: "horizontal" | "vertical";
  stub?: React.ReactNode;
}

export function Ticket({
  batchNumber,
  variant = "horizontal",
  stub,
  children,
  className,
  ...props
}: TicketProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "relative bg-porcelain border border-rule shadow-sm",
          variant === "horizontal"
            ? "flex flex-col md:flex-row items-stretch"
            : "flex flex-col",
          className
        )
      )}
      {...props}
    >
      {/* Top / Left Perforation Notches */}
      <div
        className={clsx(
          "relative p-4 bg-mist/40 flex flex-col justify-between",
          variant === "horizontal"
            ? "md:w-48 border-b md:border-b-0 md:border-r border-dashed border-rule"
            : "border-b border-dashed border-rule"
        )}
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-700 block font-semibold">
            EXPORT BATCH
          </span>
          {batchNumber && (
            <span className="font-mono text-xs text-ink font-bold tracking-wider mt-1 block">
              {batchNumber}
            </span>
          )}
        </div>
        {stub && <div className="mt-3">{stub}</div>}

        {/* Circular cutout punch marks */}
        {variant === "horizontal" ? (
          <>
            <div
              className="hidden md:block absolute -top-2 -right-2 w-4 h-4 rounded-full bg-paper border-b border-rule"
              aria-hidden="true"
            />
            <div
              className="hidden md:block absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-paper border-t border-rule"
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <div
              className="absolute -left-2 -bottom-2 w-4 h-4 rounded-full bg-paper border-r border-rule"
              aria-hidden="true"
            />
            <div
              className="absolute -right-2 -bottom-2 w-4 h-4 rounded-full bg-paper border-l border-rule"
              aria-hidden="true"
            />
          </>
        )}
      </div>

      {/* Main Ticket Body */}
      <div className="flex-1 p-5">{children}</div>
    </div>
  );
}
