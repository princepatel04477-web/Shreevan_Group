"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { clsx } from "clsx";

interface LogoMarkProps {
  variant?: "full" | "emblem" | "horizontal" | "hero";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}

export function LogoMark({
  variant = "horizontal",
  className,
  size = "md",
  priority = false,
}: LogoMarkProps) {
  if (variant === "hero") {
    return (
      <div className={clsx("flex flex-col items-center text-center", className)}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-pointer"
        >
          {/* Subtle Golden Ambient Aura */}
          <div
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-accent-700/15 via-[#C69C6D]/20 to-accent-700/15 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden="true"
          />

          {/* Golden Circular Seal Frame */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-porcelain border-2 border-[#C69C6D]/50 shadow-[0_8px_28px_rgba(15,27,36,0.08)] flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/brand/logo.png"
              alt="Shreevan Group Seal"
              width={180}
              height={115}
              className="w-full h-auto object-contain drop-shadow-xs"
              priority={priority}
            />
          </div>
        </motion.div>

        <div className="mt-4 space-y-1">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent-700 font-bold block">
            SHREEVAN GROUP
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 block">
            PHARMACEUTICAL MERCHANT EXPORTERS · INDIA
          </span>
        </div>
      </div>
    );
  }

  if (variant === "emblem") {
    const dim = size === "sm" ? "w-9 h-9" : size === "lg" ? "w-16 h-16" : "w-12 h-12";
    return (
      <div
        className={clsx(
          "relative rounded-full bg-porcelain border border-[#C69C6D]/40 p-1.5 shadow-xs flex items-center justify-center overflow-hidden",
          dim,
          className
        )}
      >
        <Image
          src="/brand/logo.png"
          alt="Shreevan Logo"
          width={90}
          height={58}
          className="w-full h-auto object-contain"
          priority={priority}
        />
      </div>
    );
  }

  // Full / Horizontal Logo presentation
  const heightClass =
    size === "sm" ? "h-9" : size === "lg" ? "h-14" : size === "xl" ? "h-20" : "h-11";

  return (
    <Link
      href="/"
      className={clsx(
        "group inline-flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-700 rounded-[2px]",
        className
      )}
      aria-label="Shreevan Group — Home"
    >
      <div className={`relative ${heightClass} w-auto flex items-center transition-transform duration-200 group-hover:scale-[1.02]`}>
        <Image
          src="/brand/logo.png"
          alt="Shreevan Group"
          width={240}
          height={153}
          className={`w-auto ${heightClass} object-contain`}
          priority={priority}
        />
      </div>
      <div className="hidden sm:flex flex-col border-l border-rule pl-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-700 font-bold leading-none">
          EXPORT DESK
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink-3 mt-1 leading-none">
          PHARMACEUTICALS
        </span>
      </div>
    </Link>
  );
}
