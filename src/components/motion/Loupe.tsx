"use client";

import React, { useRef, useState, useSyncExternalStore } from "react";
import { clsx } from "clsx";

export interface LoupeProps {
  children: React.ReactNode;
  zoom?: number;
  size?: number;
  className?: string;
}

function subscribePointerFine(callback: () => void) {
  const media = window.matchMedia("(pointer: fine)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getPointerFineSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getPointerFineServerSnapshot() {
  return false;
}

export function Loupe({
  children,
  zoom = 2,
  size = 130,
  className,
}: LoupeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dims, setDims] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const isFinePointer = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
    setDims({ width: rect.width, height: rect.height });
  };

  const handleMouseLeave = () => {
    setPos(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx("relative select-none", className)}
    >
      {/* Primary Content */}
      {children}

      {/* Loupe Lens (active only on pointer: fine hover) */}
      {isFinePointer && pos && (
        <div
          className="pointer-events-none absolute z-30 rounded-full border-2 border-accent-700 bg-porcelain shadow-[0_8px_24px_rgba(15,27,36,0.2)] overflow-hidden"
          style={{
            width: size,
            height: size,
            left: pos.x - size / 2,
            top: pos.y - size / 2,
          }}
          aria-hidden="true"
        >
          {/* Subtle crosshair in lens */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-full h-[1px] bg-ink" />
            <div className="absolute h-full w-[1px] bg-ink" />
          </div>

          {/* Scaled mirror content */}
          <div
            className="absolute origin-top-left"
            style={{
              width: dims.width || "100%",
              height: dims.height || "100%",
              transform: `scale(${zoom})`,
              transformOrigin: `${pos.x}px ${pos.y}px`,
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
