"use client";

import React from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { clsx } from "clsx";

export interface SplitHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  stagger?: number;
}

export function SplitHeading({
  text,
  as: Component = "h2",
  className,
  stagger = 0.04,
}: SplitHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  return (
    <Component ref={ref as React.Ref<never>} className={clsx("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em] leading-tight">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-[2px]">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: i * stagger,
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Component>
  );
}
