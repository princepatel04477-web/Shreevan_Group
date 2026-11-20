"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { clsx } from "clsx";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number; // base delay in seconds
  animateBy?: "words" | "letters";
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

/**
 * BlurText (React Bits pattern)
 * Staggered text reveal with blur and opacity interpolation.
 */
export function BlurText({
  text,
  className,
  delay = 0.05,
  animateBy = "words",
  as: Component = "span",
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  return (
    <Component className={clsx("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span ref={ref} className="inline-block" aria-hidden="true">
        {elements.map((segment, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: "blur(10px)", y: 6 }}
            animate={
              isInView
                ? { opacity: 1, filter: "blur(0px)", y: 0 }
                : { opacity: 0, filter: "blur(10px)", y: 6 }
            }
            transition={{
              duration: 0.45,
              delay: index * delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
            aria-hidden="true"
          >
            {segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </span>
    </Component>
  );
}
