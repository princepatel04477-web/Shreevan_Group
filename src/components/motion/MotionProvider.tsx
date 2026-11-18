"use client";

import React from "react";
import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./SmoothScroll";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
