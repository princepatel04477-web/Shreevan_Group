/**
 * Geographic mathematics and market centroid definitions for Shreevan Group export routes.
 */

export interface MarketNode {
  id: string;
  label: string;
  lat: number;
  lon: number;
  countryCode?: string;
}

// Origin node for all Shreevan Group export batches
export const INDIA_ORIGIN: MarketNode = {
  id: "india-origin",
  label: "INDIA · ORIGIN",
  lat: 20.5937,
  lon: 78.9629,
  countryCode: "IN",
};

// Five primary export corridors per company charter when specific marketsServed is not populated
export const DEFAULT_REGION_MARKETS: MarketNode[] = [
  {
    id: "region-africa",
    label: "AFRICA",
    lat: 1.2921,
    lon: 36.8219, // Nairobi corridor
  },
  {
    id: "region-cis",
    label: "CIS",
    lat: 41.2995,
    lon: 69.2401, // Tashkent / Central Asia corridor
  },
  {
    id: "region-sea",
    label: "SOUTH-EAST ASIA",
    lat: 10.8231,
    lon: 106.6297, // Ho Chi Minh / ASEAN corridor
  },
  {
    id: "region-latam",
    label: "LATIN AMERICA",
    lat: -12.0464,
    lon: -77.0428, // Lima / Andean corridor
  },
  {
    id: "region-mideast",
    label: "MIDDLE EAST",
    lat: 25.2048,
    lon: 55.2708, // Dubai / GCC corridor
  },
];

/**
 * Converts Latitude and Longitude to 3D Cartesian coordinates on a sphere of radius R.
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

/**
 * Computes a 3D curved flight arc between two points on the sphere.
 * Uses a midpoint elevated above the sphere along its surface normal.
 */
export function createFlightArcPoints(
  start: [number, number, number],
  end: [number, number, number],
  altitude: number = 0.45,
  segments: number = 40
): [number, number, number][] {
  const points: [number, number, number][] = [];

  // Midpoint between start and end
  const mx = (start[0] + end[0]) / 2;
  const my = (start[1] + end[1]) / 2;
  const mz = (start[2] + end[2]) / 2;

  // Elevate control point along radial normal
  const mLen = Math.sqrt(mx * mx + my * my + mz * mz) || 1;
  const midNormal: [number, number, number] = [
    mx / mLen,
    my / mLen,
    mz / mLen,
  ];

  const control: [number, number, number] = [
    mx + midNormal[0] * altitude,
    my + midNormal[1] * altitude,
    mz + midNormal[2] * altitude,
  ];

  // Quadratic Bezier interpolation: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const invT = 1 - t;
    const px = invT * invT * start[0] + 2 * invT * t * control[0] + t * t * end[0];
    const py = invT * invT * start[1] + 2 * invT * t * control[1] + t * t * end[1];
    const pz = invT * invT * start[2] + 2 * invT * t * control[2] + t * t * end[2];
    points.push([px, py, pz]);
  }

  return points;
}
