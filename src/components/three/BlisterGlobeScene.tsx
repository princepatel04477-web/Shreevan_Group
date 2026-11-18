"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { useJourney } from "@/lib/journey";
import { BlisterPack } from "./BlisterPack";
import { Tablets } from "./Tablets";
import { Globe } from "./Globe";

export function BlisterGlobeScene() {
  const progressRef = useRef(0);
  const heroGroupRef = useRef<THREE.Group>(null);
  const tiltGroupRef = useRef<THREE.Group>(null);

  // Subscribe directly to Zustand journey store without re-rendering the Three.js tree
  useEffect(() => {
    progressRef.current = useJourney.getState().heroProgress;
    const unsub = useJourney.subscribe((state) => {
      progressRef.current = state.heroProgress;
    });
    return unsub;
  }, []);

  useFrame(({ pointer }) => {
    const p = progressRef.current;

    // Pointer tilt on pack (max 8 deg = 0.14 rad), damped lerp 0.08
    if (tiltGroupRef.current) {
      const maxTilt = (8 * Math.PI) / 180;
      // Damps out pointer tilt as flight progresses
      const tiltMultiplier = Math.max(0, 1 - p * 2.5);
      const targetRotY = pointer.x * maxTilt * tiltMultiplier;
      const targetRotX = -pointer.y * maxTilt * tiltMultiplier;

      tiltGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        tiltGroupRef.current.rotation.y,
        targetRotY,
        0.08
      );
      tiltGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        tiltGroupRef.current.rotation.x,
        targetRotX,
        0.08
      );
    }
  });

  return (
    <>
      {/* 1. Studio Lighting Rig (Zero external network dependencies) */}
      <ambientLight intensity={0.95} color="#F7F6F2" />
      <hemisphereLight
        color="#FFFFFF"
        groundColor="#D8DCDD"
        intensity={0.7}
      />
      <directionalLight
        position={[6, 8, 7]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-5, 3, 3]}
        intensity={1.0}
        color="#E2E6E8"
      />
      <directionalLight
        position={[0, -4, -3]}
        intensity={0.6}
        color="#CAD0D1"
      />

      {/* 2. Soft Contact Shadows under the blister pack */}
      <ContactShadows
        position={[0, -1.25, 0]}
        opacity={0.32}
        scale={8}
        blur={2.4}
        far={4}
      />

      {/* 3. Main Scene Group */}
      <group ref={heroGroupRef} position={[0, 0, 0]}>
        {/* Floating, Tiltable Blister Pack Container */}
        <group ref={tiltGroupRef}>
          <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.12}>
            <BlisterPack progressRef={progressRef} />
          </Float>
        </group>

        {/* 10 Flying Tablets */}
        <Tablets
          progressRef={progressRef}
          globeRadius={1.35}
        />

        {/* Paper-Textured Export Globe */}
        <Globe
          progressRef={progressRef}
          radius={1.35}
        />
      </group>
    </>
  );
}
