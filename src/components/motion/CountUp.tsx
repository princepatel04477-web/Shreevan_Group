"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number; // in seconds
  separator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * CountUp (React Bits pattern)
 * Numbers increment smoothly upon entering the viewport with ease-out curve.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.8,
  separator = ",",
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      const frame = requestAnimationFrame(() => setCount(to));
      return () => cancelAnimationFrame(frame);
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(from + (to - from) * easeOut);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(to);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration, reducedMotion]);

  const formatted = count.toLocaleString("en-US").replace(/,/g, separator);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
