"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import { getFoilRoughnessTexture } from "@/lib/textures";

// 5x2 grid coordinates for the 10 blister compartments on a 3.4 x 1.8 card
export const CAVITY_POSITIONS: [number, number, number][] = [
  [-1.25, 0.45, 0],
  [-1.25, -0.45, 0],
  [-0.62, 0.45, 0],
  [-0.62, -0.45, 0],
  [0.0, 0.45, 0],
  [0.0, -0.45, 0],
  [0.62, 0.45, 0],
  [0.62, -0.45, 0],
  [1.25, 0.45, 0],
  [1.25, -0.45, 0],
];

export interface BlisterPackProps {
  progressRef: React.MutableRefObject<number>;
}

export function BlisterPack({ progressRef }: BlisterPackProps) {
  const groupRef = useRef<THREE.Group>(null);
  const foilMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const domeRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Procedural brushed metallic foil texture
  const foilRoughnessMap = useMemo(() => getFoilRoughnessTexture(), []);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = progressRef.current;

    // Phase 1: 0.0 -> 0.45 (domes compress sequentially)
    CAVITY_POSITIONS.forEach((_, idx) => {
      const dome = domeRefs.current[idx];
      if (!dome) return;

      const staggerStart = idx * 0.032;
      const staggerEnd = staggerStart + 0.12;
      const localProgress = Math.min(
        1,
        Math.max(0, (p - staggerStart) / (staggerEnd - staggerStart))
      );

      // Plastic dome compresses on Z as tablet pushes through
      dome.scale.z = 1 - localProgress * 0.65;
      dome.position.z = 0.02 + (1 - localProgress) * 0.04;
    });

    // Phase 2: 0.30 -> 0.75 (blister card recedes and dissolves to 0.18 opacity)
    let alpha = 1;
    if (p < 0.28) {
      groupRef.current.position.z = 0;
      groupRef.current.position.x = 0;
      alpha = 1;
    } else {
      const recedeT = Math.min(1, (p - 0.28) / 0.45);
      // Eases left and backward into the distance
      groupRef.current.position.z = -recedeT * 2.8;
      groupRef.current.position.x = -recedeT * 1.8;
      alpha = 1 - recedeT * 0.82; // fades down to ~0.18
    }

    if (foilMaterialRef.current) {
      foilMaterialRef.current.opacity = alpha;
      foilMaterialRef.current.transparent = alpha < 0.99;
    }

    // Update opacity on domes
    CAVITY_POSITIONS.forEach((_, idx) => {
      const dome = domeRefs.current[idx];
      if (dome && dome.material && !Array.isArray(dome.material)) {
        (dome.material as THREE.MeshPhysicalMaterial).opacity = alpha * 0.88;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* 1. Foil Card Base (RoundedBox 3.4 x 1.8 x 0.03) */}
      <RoundedBox
        args={[3.4, 1.8, 0.03]}
        radius={0.08}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          ref={foilMaterialRef}
          color="#E2E6E8"
          metalness={0.45}
          roughness={0.32}
          roughnessMap={foilRoughnessMap ?? undefined}
          clearcoat={0.6}
          clearcoatRoughness={0.18}
          reflectivity={0.9}
        />
      </RoundedBox>

      {/* 2. Printed Foil Text on Back Face */}
      <group position={[0, 0, -0.018]} rotation={[0, Math.PI, 0]}>
        <Text
          position={[0, 0.65, 0]}
          fontSize={0.08}
          color="#33424D"
          letterSpacing={0.16}
          anchorX="center"
          anchorY="middle"
        >
          SHREEVAN GROUP · EXPORT BATCH
        </Text>
        <Text
          position={[0, 0.52, 0]}
          fontSize={0.052}
          color="#5E6B74"
          letterSpacing={0.14}
          anchorX="center"
          anchorY="middle"
        >
          LICENSED GMP SOURCE · BATCH SPEC-01
        </Text>
      </group>

      {/* 3. Ten Thermoformed Clear Plastic Domes (5x2 grid) */}
      {CAVITY_POSITIONS.map((pos, idx) => (
        <group key={idx} position={[pos[0], pos[1], 0.02]}>
          {/* Subtle metallic rim ring around each cavity */}
          <mesh position={[0, 0, 0.005]}>
            <ringGeometry args={[0.22, 0.25, 32]} />
            <meshStandardMaterial
              color="#CAD0D2"
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>

          {/* Recessed foil indentation inside cavity */}
          <mesh position={[0, 0, 0.008]}>
            <circleGeometry args={[0.21, 32]} />
            <meshStandardMaterial
              color="#B0B8BA"
              metalness={0.4}
              roughness={0.45}
            />
          </mesh>

          {/* Clear Plastic Cavity Dome */}
          <mesh
            ref={(el) => {
              domeRefs.current[idx] = el;
            }}
            position={[0, 0, 0.06]}
            scale={[1, 1, 0.6]}
          >
            <sphereGeometry args={[0.22, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              transmission={0.98}
              thickness={0.08}
              roughness={0.04}
              clearcoat={1.0}
              clearcoatRoughness={0.05}
              ior={1.48}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
