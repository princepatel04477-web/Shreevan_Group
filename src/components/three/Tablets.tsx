"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { CAVITY_POSITIONS } from "./BlisterPack";
import { DEFAULT_REGION_MARKETS, latLonToVector3 } from "@/lib/geo";

export interface TabletsProps {
  progressRef: React.MutableRefObject<number>;
  globeRadius?: number;
}

// 10 destination coordinates on the globe (5 primary regions + 5 strategic import hubs)
const DESTINATIONS = [
  { lat: DEFAULT_REGION_MARKETS[0]?.lat ?? 1.2, lon: DEFAULT_REGION_MARKETS[0]?.lon ?? 36.8 },  // Africa
  { lat: DEFAULT_REGION_MARKETS[1]?.lat ?? 41.3, lon: DEFAULT_REGION_MARKETS[1]?.lon ?? 69.2 }, // CIS
  { lat: DEFAULT_REGION_MARKETS[2]?.lat ?? 10.8, lon: DEFAULT_REGION_MARKETS[2]?.lon ?? 106.6 },// SE Asia
  { lat: DEFAULT_REGION_MARKETS[3]?.lat ?? -12.0, lon: DEFAULT_REGION_MARKETS[3]?.lon ?? -77.0 },// LatAm
  { lat: DEFAULT_REGION_MARKETS[4]?.lat ?? 25.2, lon: DEFAULT_REGION_MARKETS[4]?.lon ?? 55.2 }, // MidEast
  // Secondary regional hubs
  { lat: 6.5244, lon: 3.3792 },    // West Africa (Lagos)
  { lat: 43.222, lon: 76.8512 },   // Central Asia (Almaty)
  { lat: 13.7563, lon: 100.5018 }, // ASEAN (Bangkok)
  { lat: 4.711, lon: -74.0721 },   // Latin America (Bogota)
  { lat: 23.588, lon: 58.3829 },   // GCC (Muscat)
];

export function Tablets({
  progressRef,
  globeRadius = 1.15,
}: TabletsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tabletRefs = useRef<(THREE.Group | null)[]>([]);

  // Precompute 3D Bezier flight paths from each popped blister cavity to the globe target
  const flightCurves = useMemo(() => {
    return CAVITY_POSITIONS.map((cavity, idx) => {
      const destGeo = DESTINATIONS[idx] ?? { lat: 20, lon: 40 };
      const [gx, gy, gz] = latLonToVector3(destGeo.lat, destGeo.lon, globeRadius);

      // Start: Popped position in front of blister pack
      const p0 = new THREE.Vector3(cavity[0], cavity[1], 0.45);

      // Mid-flight control points arching forward toward the camera into the open center
      const p1 = new THREE.Vector3(
        cavity[0] * 0.4,
        cavity[1] * 0.4 + 0.65,
        2.2
      );
      const p2 = new THREE.Vector3(
        0.5 + gx * 0.4,
        gy * 0.5 + 0.4,
        1.8
      );
      // Final target on the globe at [1.15, 0, -0.4]
      const p3 = new THREE.Vector3(1.15 + gx, gy, -0.4 + gz);

      return new THREE.CubicBezierCurve3(p0, p1, p2, p3);
    });
  }, [globeRadius]);

  // Shared porcelain tablet material
  const tabletMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#FFFFFF"),
        roughness: 0.28,
        metalness: 0.04,
      }),
    []
  );

  // Score crease material (subtle shadowed grey line)
  const creaseMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#CAD0D4"),
      }),
    []
  );

  useFrame(() => {
    const p = progressRef.current;

    tabletRefs.current.forEach((tablet, idx) => {
      if (!tablet) return;
      const curve = flightCurves[idx];
      if (!curve) return;

      const staggerStart = idx * 0.025;

      if (p <= staggerStart) {
        // Idle inside blister cavity
        const cavity = CAVITY_POSITIONS[idx] ?? [0, 0, 0];
        tablet.position.set(cavity[0], cavity[1], cavity[2] + 0.04);
        tablet.rotation.set(Math.PI / 2, 0, 0);
        tablet.scale.set(1, 1, 1);
        tablet.visible = true;
      } else if (p < 0.35 + staggerStart) {
        // Phase 1: Pop forward out of foil with small spin
        const localT = Math.min(1, (p - staggerStart) / 0.32);
        const eased = Math.sin(localT * Math.PI * 0.5);

        const cavity = CAVITY_POSITIONS[idx] ?? [0, 0, 0];
        tablet.position.set(
          cavity[0],
          cavity[1],
          cavity[2] + 0.04 + eased * 0.42
        );
        tablet.rotation.set(
          Math.PI / 2 + localT * 0.5,
          localT * 0.7,
          localT * 0.3
        );
        tablet.scale.set(1, 1, 1);
        tablet.visible = true;
      } else if (p < 0.75 + staggerStart * 0.2) {
        // Phase 2: Transcontinental flight along 3D cubic Bezier curve
        const flightStart = 0.35 + staggerStart;
        const flightEnd = 0.75 + staggerStart * 0.2;
        const flightT = Math.min(1, Math.max(0, (p - flightStart) / (flightEnd - flightStart)));
        // easeInOutCubic
        const eased =
          flightT < 0.5
            ? 4 * flightT * flightT * flightT
            : 1 - Math.pow(-2 * flightT + 2, 3) / 2;

        const pos = curve.getPoint(eased);
        tablet.position.copy(pos);

        // Continuous aerodynamic flight rotation
        tablet.rotation.x = Math.PI / 2 + eased * Math.PI * 2.5;
        tablet.rotation.y = eased * Math.PI * 2;
        tablet.rotation.z = eased * Math.PI * 1.2;

        // Tablet maintains high visibility during flight
        const scale = 1 - eased * 0.25;
        tablet.scale.set(scale, scale, scale);
        tablet.visible = true;
      } else {
        // Phase 3: Touchdown! Tablet dissolves into glowing target node
        const landStart = 0.75 + staggerStart * 0.2;
        const landT = Math.min(1, (p - landStart) / 0.12);
        const finalPoint = curve.getPoint(1);
        tablet.position.copy(finalPoint);

        const landScale = Math.max(0, (1 - landT) * 0.75);
        tablet.scale.set(landScale, landScale, landScale);
        tablet.visible = landScale > 0.01;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {CAVITY_POSITIONS.map((pos, idx) => (
        <group
          key={idx}
          ref={(el) => {
            tabletRefs.current[idx] = el;
          }}
          position={[pos[0], pos[1], pos[2] + 0.04]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          {/* Porcelain Scored Tablet Cylinder */}
          <mesh material={tabletMaterial} castShadow>
            <cylinderGeometry args={[0.165, 0.165, 0.065, 32]} />
          </mesh>

          {/* Embossed Score Line Crease across Tablet Top Face */}
          <mesh
            material={creaseMaterial}
            position={[0, 0.033, 0]}
            rotation={[0, idx % 2 === 0 ? 0 : Math.PI / 4, 0]}
          >
            <boxGeometry args={[0.26, 0.006, 0.012]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
