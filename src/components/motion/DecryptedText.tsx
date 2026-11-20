"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover";
}

/**
 * DecryptedText (React Bits pattern)
 * Scrambles and decrypts characters into the target string.
 * Used for batch lot numbers, pharmacopoeia monograph references, and technical codes.
 */
export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = "start",
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789§#@$&*%",
  className,
  parentClassName,
  encryptedClassName = "opacity-60 text-accent-700",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  const scramble = useCallback(() => {
    if (reducedMotion) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    setIsScrambling(true);

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "/" || char === "-" || char === ".") return char;
            if (sequential) {
              const progress = iteration / maxIterations;
              let shouldReveal = false;
              if (revealDirection === "start") {
                shouldReveal = index / text.length < progress;
              } else if (revealDirection === "end") {
                shouldReveal = 1 - index / text.length < progress;
              } else {
                const mid = text.length / 2;
                shouldReveal = Math.abs(index - mid) / mid < progress;
              }
              if (shouldReveal) return text[index];
            } else {
              if (iteration >= maxIterations) return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      iteration++;
      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, maxIterations, speed, sequential, revealDirection, characters, reducedMotion]);

  useEffect(() => {
    if (animateOn === "view" && isInView) {
      const frame = requestAnimationFrame(() => {
        scramble();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [animateOn, isInView, scramble]);

  const handleMouseEnter = () => {
    if (animateOn === "hover" && !isScrambling) {
      scramble();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={parentClassName}
    >
      <span className="sr-only">{text}</span>
      <span className={isScrambling ? encryptedClassName : className} aria-hidden="true">
        {displayText}
      </span>
    </span>
  );
}
