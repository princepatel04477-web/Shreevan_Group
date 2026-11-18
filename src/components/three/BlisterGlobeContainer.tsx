"use client";

import React, { useRef, useState, useEffect, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { BlisterGlobePoster } from "./BlisterGlobePoster";

const DynamicBlisterGlobe = dynamic(
  () => import("@/components/three/BlisterGlobe"),
  {
    ssr: false,
    loading: () => <BlisterGlobePoster />,
  }
);

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

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export interface BlisterGlobeContainerProps {
  className?: string;
  force3D?: boolean;
}

export function BlisterGlobeContainer({
  className,
  force3D = false,
}: BlisterGlobeContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [canRender3D, setCanRender3D] = useState(false);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    const hasWebGL = checkWebGLSupport();
    const isLowPower =
      typeof navigator !== "undefined" &&
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 2; // only disable for extreme low-end (<=2 cores) unless force3D is true

    if (force3D || (hasWebGL && (!isLowPower || force3D))) {
      const frame = requestAnimationFrame(() => {
        setCanRender3D(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [force3D]);

  // IntersectionObserver to pause rendering when scrolled out of view
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Use pure SVG fallback if user prefers reduced motion or lacks WebGL
  if (isReducedMotion && !force3D) {
    return <BlisterGlobePoster className={className} />;
  }

  return (
    <div ref={containerRef} className={className ?? "relative w-full h-full"}>
      {canRender3D ? (
        <DynamicBlisterGlobe
          className={className}
          isIntersecting={isIntersecting}
        />
      ) : (
        <BlisterGlobePoster className={className} />
      )}
    </div>
  );
}
