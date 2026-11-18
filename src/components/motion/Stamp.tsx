"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function Stamp({ children }: { children: React.ReactNode }) {
  const [showStamp, setShowStamp] = useState(false);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    // Skip on first load
    const hasVisited = sessionStorage.getItem("shreevan_stamp_visited");
    if (!hasVisited) {
      sessionStorage.setItem("shreevan_stamp_visited", "true");
      return;
    }

    // Trigger stamp on subsequent route navigations
    let timer: NodeJS.Timeout | undefined;
    const animFrame = requestAnimationFrame(() => {
      setShowStamp(true);
      timer = setTimeout(() => {
        setShowStamp(false);
      }, isReducedMotion ? 150 : 580);
    });

    return () => {
      cancelAnimationFrame(animFrame);
      if (timer) clearTimeout(timer);
    };
  }, [isReducedMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showStamp && (
          <motion.div
            key="stamp-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0.15 : 0.2 }}
            onClick={() => setShowStamp(false)}
            className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center bg-paper/80 backdrop-blur-[2px] cursor-pointer"
            aria-hidden="true"
          >
            {/* SVG Filter for Ink Bleed */}
            <svg className="absolute w-0 h-0" aria-hidden="true">
              <filter id="ink-bleed-filter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.05"
                  numOctaves="2"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="5"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </svg>

            {/* Circular Stamp Graphic */}
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 0 }
                  : { scale: 1.4, opacity: 0 }
              }
              animate={
                isReducedMotion
                  ? { opacity: 1 }
                  : {
                      scale: [1.4, 1, 1, 1.05],
                      opacity: [0, 1, 1, 0],
                    }
              }
              transition={
                isReducedMotion
                  ? { duration: 0.15 }
                  : {
                      duration: 0.55,
                      times: [0, 0.35, 0.7, 1],
                      ease: [0.7, 0, 0.84, 0],
                    }
              }
              style={{ filter: "url(#ink-bleed-filter)" }}
              className="relative w-56 h-56 flex items-center justify-center text-ink-stamp"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Circular path for ring text */}
                <path
                  id="stampCirclePath"
                  d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                  fill="none"
                />
                {/* Outer and Inner Hairline Rings */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                {/* Text on Circular Path */}
                <text
                  className="font-mono text-[9.5px] uppercase tracking-[0.2em] font-bold"
                  fill="currentColor"
                >
                  <textPath href="#stampCirclePath" startOffset="0%">
                    SHREEVAN GROUP · EXPORT DESK · CLEARED ·
                  </textPath>
                </text>
                {/* Center Monogram / Logo */}
                <text
                  x="100"
                  y="96"
                  textAnchor="middle"
                  className="font-display text-2xl font-bold"
                  fill="currentColor"
                >
                  SG
                </text>
                <text
                  x="100"
                  y="114"
                  textAnchor="middle"
                  className="font-mono text-[8px] uppercase tracking-widest font-semibold"
                  fill="currentColor"
                >
                  INSPECTED
                </text>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
