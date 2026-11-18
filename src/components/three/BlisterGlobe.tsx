"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { BlisterGlobeScene } from "./BlisterGlobeScene";
import { BlisterGlobePoster } from "./BlisterGlobePoster";

export interface BlisterGlobeProps {
  className?: string;
  isIntersecting?: boolean;
}

export default function BlisterGlobe({
  className,
  isIntersecting = true,
}: BlisterGlobeProps) {
  return (
    <div className={className ?? "relative w-full h-full min-h-[500px] md:min-h-[640px]"}>
      <Suspense fallback={<BlisterGlobePoster />}>
        <Canvas
          frameloop={isIntersecting ? "always" : "demand"}
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ fov: 30, position: [0, 0, 7.5] }}
          className="w-full h-full"
        >
          <BlisterGlobeScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
