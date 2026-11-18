"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useJourney } from "@/lib/journey";
import { getPaperGrainTexture } from "@/lib/textures";
import {
  INDIA_ORIGIN,
  DEFAULT_REGION_MARKETS,
  latLonToVector3,
  createFlightArcPoints,
  MarketNode,
} from "@/lib/geo";

export interface GlobeProps {
  progressRef: React.MutableRefObject<number>;
  radius?: number;
  markets?: MarketNode[];
}

export function Globe({
  progressRef,
  radius = 1.15,
  markets = DEFAULT_REGION_MARKETS,
}: GlobeProps) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const rotatingSphereRef = useRef<THREE.Group>(null);
  const arcLinesRef = useRef<THREE.LineSegments>(null);
  const [showLabels, setShowLabels] = useState(false);

  // Procedural paper grain texture
  const paperTexture = useMemo(() => getPaperGrainTexture(), []);

  // Subscribe to journey store for label mounting
  useEffect(() => {
    const unsub = useJourney.subscribe((s) => {
      const landed = s.heroProgress >= 0.7;
      setShowLabels((prev) => (prev !== landed ? landed : prev));
    });
    return unsub;
  }, []);

  // Precompute India 3D Vector on the sphere
  const indiaPos = useMemo(
    () => latLonToVector3(INDIA_ORIGIN.lat, INDIA_ORIGIN.lon, radius),
    [radius]
  );

  // Precompute 3D vectors and distinct non-overlapping offsets for each market node
  const marketPositions = useMemo(() => {
    const labelOffsets: Record<string, [number, number, number]> = {
      "region-africa": [-0.14, -0.14, 0.05],
      "region-cis": [0.12, 0.15, 0.05],
      "region-sea": [0.18, 0.02, 0.05],
      "region-latam": [-0.2, -0.2, 0.05],
      "region-mideast": [-0.14, 0.1, 0.05],
    };

    return markets.map((m) => ({
      ...m,
      pos: latLonToVector3(m.lat, m.lon, radius),
      offset: labelOffsets[m.id] ?? [0, 0.14, 0],
    }));
  }, [markets, radius]);

  // Generate Hairline Meridian and Parallel Lines
  const gridGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 48;

    // 1. Meridians (Longitudes every 30 deg)
    for (let lon = 0; lon < 360; lon += 30) {
      const rad = (lon * Math.PI) / 180;
      for (let i = 0; i < segments; i++) {
        const phi1 = (i / segments) * Math.PI;
        const phi2 = ((i + 1) / segments) * Math.PI;

        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi1) * Math.sin(rad),
            radius * Math.cos(phi1),
            radius * Math.sin(phi1) * Math.cos(rad)
          ),
          new THREE.Vector3(
            radius * Math.sin(phi2) * Math.sin(rad),
            radius * Math.cos(phi2),
            radius * Math.sin(phi2) * Math.cos(rad)
          )
        );
      }
    }

    // 2. Parallels (Latitudes every 30 deg from -60 to +60)
    for (let lat = -60; lat <= 60; lat += 30) {
      const phi = ((90 - lat) * Math.PI) / 180;
      const ringRadius = radius * Math.sin(phi);
      const ringY = radius * Math.cos(phi);

      for (let i = 0; i < segments; i++) {
        const theta1 = (i / segments) * Math.PI * 2;
        const theta2 = ((i + 1) / segments) * Math.PI * 2;

        points.push(
          new THREE.Vector3(
            ringRadius * Math.sin(theta1),
            ringY,
            ringRadius * Math.cos(theta1)
          ),
          new THREE.Vector3(
            ringRadius * Math.sin(theta2),
            ringY,
            ringRadius * Math.cos(theta2)
          )
        );
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  // Precompute 3D Great-Circle Flight Arcs from India to all Markets
  const arcGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    marketPositions.forEach((dest) => {
      const arc = createFlightArcPoints(indiaPos, dest.pos, 0.42, 32);
      for (let i = 0; i < arc.length - 1; i++) {
        const p1 = arc[i];
        const p2 = arc[i + 1];
        if (p1 && p2) {
          points.push(
            new THREE.Vector3(p1[0], p1[1], p1[2]),
            new THREE.Vector3(p2[0], p2[1], p2[2])
          );
        }
      }
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [indiaPos, marketPositions]);

  useFrame(() => {
    if (!globeGroupRef.current || !rotatingSphereRef.current) return;
    const p = progressRef.current;

    // Scale & Position transition:
    // Before p=0.25: globe rests in background at scale 0.55
    // 0.25 -> 0.75: globe moves from [2.5, 0, -3.2] to [0.9, 0, 0.2] and scales to 1.25
    if (p < 0.25) {
      globeGroupRef.current.position.set(2.4, 0, -3.2);
      globeGroupRef.current.scale.set(0.55, 0.55, 0.55);
      rotatingSphereRef.current.rotation.y = -0.5;
      rotatingSphereRef.current.rotation.x = 0.2;
      if (arcLinesRef.current) arcLinesRef.current.visible = false;
    } else {
      const transT = Math.min(1, (p - 0.25) / 0.5);
      const eased = 1 - Math.pow(1 - transT, 3);

      const posX = 2.4 - eased * 1.25; // 2.4 -> 1.15
      const posZ = -3.2 + eased * 2.8; // -3.2 -> -0.4
      const scale = 0.55 + eased * 0.45; // 0.55 -> 1.0

      globeGroupRef.current.position.set(posX, 0, posZ);
      globeGroupRef.current.scale.set(scale, scale, scale);

      // Smooth axial rotation to reveal India and export markets
      const rotationY = -0.5 + (p - 0.25) * 1.9;
      rotatingSphereRef.current.rotation.y = rotationY;
      rotatingSphereRef.current.rotation.x = 0.22 + Math.sin(p * Math.PI) * 0.06;

      // Show flight arcs when p >= 0.55
      if (arcLinesRef.current) {
        arcLinesRef.current.visible = p >= 0.55;
      }
    }
  });

  return (
    <group ref={globeGroupRef} position={[2.4, 0, -3.2]}>
      <group ref={rotatingSphereRef}>
        {/* 1. Paper-Textured Sphere Base */}
        <mesh receiveShadow>
          <sphereGeometry args={[radius, 48, 48]} />
          <meshStandardMaterial
            color="#F7F6F2"
            roughness={0.85}
            metalness={0.02}
            map={paperTexture ?? undefined}
          />
        </mesh>

        {/* 2. Hairline Grid Latitudes & Longitudes */}
        <lineSegments geometry={gridGeometry}>
          <lineBasicMaterial color="#D9DDDA" transparent opacity={0.7} />
        </lineSegments>

        {/* 3. Golden Connecting Flight Arcs from India to Markets */}
        <lineSegments ref={arcLinesRef} geometry={arcGeometry}>
          <lineBasicMaterial color="#B99A55" transparent opacity={0.9} />
        </lineSegments>

        {/* 4. India Origin Node (Forest Green) */}
        <group position={indiaPos}>
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#204D39" />
          </mesh>
          <mesh>
            <ringGeometry args={[0.06, 0.085, 24]} />
            <meshBasicMaterial color="#204D39" transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
          {showLabels && (
            <Html
              position={[0, 0.16, 0.05]}
              center
              distanceFactor={8}
              className="pointer-events-none select-none transition-opacity duration-300"
            >
              <div className="bg-porcelain/95 border border-accent-700 px-2 py-0.5 rounded-[2px] shadow-sm whitespace-nowrap">
                <span className="font-mono text-[9px] font-bold text-accent-700 tracking-wider">
                  INDIA · ORIGIN
                </span>
              </div>
            </Html>
          )}
        </group>

        {/* 5. Destination Market Nodes & Staggered HTML Caps Labels */}
        {marketPositions.map((dest) => (
          <group key={dest.id} position={dest.pos}>
            <mesh>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#B99A55" />
            </mesh>
            <mesh>
              <ringGeometry args={[0.055, 0.075, 24]} />
              <meshBasicMaterial color="#B99A55" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>

            {/* Caps Tag rendered only at landing */}
            {showLabels && (
              <Html
                position={dest.offset}
                center
                distanceFactor={8}
                className="pointer-events-none select-none transition-opacity duration-300"
              >
                <div className="bg-porcelain/95 border border-rule px-2 py-0.5 rounded-[2px] shadow-sm whitespace-nowrap">
                  <span className="font-mono text-[8.5px] uppercase font-semibold text-ink-2 tracking-[0.14em]">
                    {dest.label}
                  </span>
                </div>
              </Html>
            )}
          </group>
        ))}
      </group>
    </group>
  );
}
