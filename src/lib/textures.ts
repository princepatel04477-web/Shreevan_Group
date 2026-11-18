import * as THREE from "three";

/**
 * Procedural texture generators for realistic foil, paper, and tablet materials.
 * Generates lightweight canvas textures in memory without external network assets.
 */

let cachedFoilTexture: THREE.CanvasTexture | null = null;
let cachedPaperTexture: THREE.CanvasTexture | null = null;

export function getFoilRoughnessTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  if (cachedFoilTexture) return cachedFoilTexture;

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base metallic roughness tone
  ctx.fillStyle = "#888888";
  ctx.fillRect(0, 0, 256, 256);

  // Brushed micro-streaks along horizontal axis
  const imgData = ctx.getImageData(0, 0, 256, 256);
  const data = imgData.data;

  for (let y = 0; y < 256; y++) {
    const lineNoise = (Math.random() - 0.5) * 35;
    for (let x = 0; x < 256; x++) {
      const idx = (y * 256 + x) * 4;
      const grain = (Math.random() - 0.5) * 20;
      const val = Math.min(255, Math.max(0, 136 + lineNoise + grain));
      data[idx] = val;     // R
      data[idx + 1] = val; // G
      data[idx + 2] = val; // B
      data[idx + 3] = 255; // A
    }
  }

  ctx.putImageData(imgData, 0, 0);

  // Subtle diamond knurl grid embossed on pharmaceutical foil
  ctx.strokeStyle = "rgba(40, 40, 40, 0.12)";
  ctx.lineWidth = 1;
  const step = 8;
  for (let i = -256; i < 512; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 256, 256);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i + 256, 0);
    ctx.lineTo(i, 256);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);
  texture.needsUpdate = true;
  cachedFoilTexture = texture;
  return texture;
}

export function getPaperGrainTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  if (cachedPaperTexture) return cachedPaperTexture;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Paper base color #F7F6F2
  ctx.fillStyle = "#F7F6F2";
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 14;
    data[i] = Math.min(255, Math.max(0, 247 + noise));     // R
    data[i + 1] = Math.min(255, Math.max(0, 246 + noise)); // G
    data[i + 2] = Math.min(255, Math.max(0, 242 + noise)); // B
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;
  cachedPaperTexture = texture;
  return texture;
}
