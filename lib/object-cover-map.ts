/**
 * Map a normalized image-space point (0–1) into CSS percent of a box
 * that displays the image with object-fit: cover and object-position.
 */
export function mapNormToCoverPercent(
  nx: number,
  ny: number,
  imgW: number,
  imgH: number,
  boxW: number,
  boxH: number,
  objectPosX = 0.5,
  objectPosY = 0.18,
): { left: number; top: number } {
  return mapNormToFittedPercent(
    nx,
    ny,
    imgW,
    imgH,
    boxW,
    boxH,
    "cover",
    objectPosX,
    objectPosY,
  );
}

/**
 * Map a normalized image-space point (0–1) into CSS percent of a box
 * that displays the image with object-fit: contain and object-position.
 */
export function mapNormToContainPercent(
  nx: number,
  ny: number,
  imgW: number,
  imgH: number,
  boxW: number,
  boxH: number,
  objectPosX = 0.5,
  objectPosY = 0.5,
): { left: number; top: number } {
  return mapNormToFittedPercent(
    nx,
    ny,
    imgW,
    imgH,
    boxW,
    boxH,
    "contain",
    objectPosX,
    objectPosY,
  );
}

function mapNormToFittedPercent(
  nx: number,
  ny: number,
  imgW: number,
  imgH: number,
  boxW: number,
  boxH: number,
  fit: "cover" | "contain",
  objectPosX: number,
  objectPosY: number,
): { left: number; top: number } {
  if (imgW <= 0 || imgH <= 0 || boxW <= 0 || boxH <= 0) {
    return { left: nx * 100, top: ny * 100 };
  }

  const scale =
    fit === "cover"
      ? Math.max(boxW / imgW, boxH / imgH)
      : Math.min(boxW / imgW, boxH / imgH);
  const drawnW = imgW * scale;
  const drawnH = imgH * scale;
  const offsetX = (boxW - drawnW) * objectPosX;
  const offsetY = (boxH - drawnH) * objectPosY;

  const px = nx * drawnW + offsetX;
  const py = ny * drawnH + offsetY;

  return {
    left: (px / boxW) * 100,
    top: (py / boxH) * 100,
  };
}
