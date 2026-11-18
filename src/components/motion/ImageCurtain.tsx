"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { clsx } from "clsx";

export interface ImageCurtainProps {
  children: React.ReactNode;
  className?: string;
}

export function ImageCurtain({ children, className }: ImageCurtainProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={clsx("relative overflow-hidden", className)}>
      {children}
      {/* Paper-colored curtain that wipes vertically */}
      <motion.div
        initial={{ y: "0%" }}
        animate={isInView ? { y: "-101%" } : { y: "0%" }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 bg-paper z-20 pointer-events-none border-b border-rule"
      />
    </div>
  );
}
