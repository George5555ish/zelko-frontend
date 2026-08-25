/**
 * Client-side MediaPipe Face Landmarker.
 * The task model returns 478 points (468 face mesh + 10 iris). We keep the
 * classic 468-point mesh per PRODUCT.md.
 *
 * Also tries 90° rotations when the first pass fails or the face is heavily
 * tilted — phone photos often arrive sideways / Dutch-tilted.
 */

import type { FaceLandmarker } from "@mediapipe/tasks-vision";

const FACE_MESH_COUNT = 468;
/** MediaPipe eye outer corners — used to score “how upright” a detection is. */
const LEFT_EYE_OUTER = 33;
const RIGHT_EYE_OUTER = 263;

let faceLandmarkerPromise: Promise<FaceLandmarker> | null = null;

async function getFaceLandmarker(): Promise<FaceLandmarker> {
  if (!faceLandmarkerPromise) {
    faceLandmarkerPromise = (async () => {
      const { FaceLandmarker, FilesetResolver } = await import(
        "@mediapipe/tasks-vision"
      );

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm",
      );

      const baseOptions = {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      } as const;

      const shared = {
        runningMode: "IMAGE" as const,
        numFaces: 1,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
      };

      try {
        return await FaceLandmarker.createFromOptions(vision, {
          ...shared,
          baseOptions: { ...baseOptions, delegate: "GPU" },
        });
      } catch {
        return FaceLandmarker.createFromOptions(vision, {
          ...shared,
          baseOptions: { ...baseOptions, delegate: "CPU" },
        });
      }
    })();
  }

  return faceLandmarkerPromise;
}

export interface LandmarkPoint {
  x: number;
  y: number;
  z: number;
}

export interface FaceExtractionResult {
  landmarks: LandmarkPoint[] | null;
  /** File to upload — may be a re-encoded JPEG after rotation */
  fileForUpload: File;
  /** New preview URL when we rotated (caller should revoke the old one) */
  previewUrl: string | null;
  /** Clockwise quarter-turns applied (0–3) */
  rotationQuarters: number;
}

/**
 * Run face landmark detection on an HTMLImageElement / ImageBitmap / HTMLCanvasElement.
 * Returns the 468-point face mesh for the first face, or null if none detected.
 */
export async function extractFaceLandmarks(
  image: HTMLImageElement | HTMLCanvasElement | ImageBitmap,
): Promise<LandmarkPoint[] | null> {
  const landmarker = await getFaceLandmarker();
  const result = landmarker.detect(image);
  const raw = result.faceLandmarks[0] ?? null;
  const landmarks = raw ? raw.slice(0, FACE_MESH_COUNT) : null;

  console.log("[MediaPipe] face landmark output (468-point mesh):", {
    faceCount: result.faceLandmarks.length,
    rawLandmarkCount: raw?.length ?? 0,
    landmarkCount: landmarks?.length ?? 0,
  });

  return landmarks;
}

/** Absolute roll (degrees) from eye line — 0 is level. */
function eyeLineRollAbs(landmarks: LandmarkPoint[]): number {
  const L = landmarks[LEFT_EYE_OUTER];
  const R = landmarks[RIGHT_EYE_OUTER];
  if (!L || !R) return 90;
  return Math.abs(Math.atan2(R.y - L.y, R.x - L.x) * (180 / Math.PI));
}

function eyeSpan(landmarks: LandmarkPoint[]): number {
  const L = landmarks[LEFT_EYE_OUTER];
  const R = landmarks[RIGHT_EYE_OUTER];
  if (!L || !R) return 0;
  return Math.hypot(R.x - L.x, R.y - L.y);
}

function drawRotated(
  source: ImageBitmap,
  quarterTurns: 0 | 1 | 2 | 3,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const w = source.width;
  const h = source.height;
  const turns = ((quarterTurns % 4) + 4) % 4;

  if (turns % 2 === 0) {
    canvas.width = w;
    canvas.height = h;
  } else {
    canvas.width = h;
    canvas.height = w;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas for rotation.");

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((turns * Math.PI) / 2);
  ctx.drawImage(source, -w / 2, -h / 2);
  return canvas;
}

function canvasToJpegFile(
  canvas: HTMLCanvasElement,
  originalName: string,
  suffix = "oriented",
): Promise<File> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to encode rotated image."));
          return;
        }
        const base = originalName.replace(/\.[^.]+$/, "") || "photo";
        resolve(
          new File([blob], `${base}-${suffix}.jpg`, { type: "image/jpeg" }),
        );
      },
      "image/jpeg",
      0.92,
    );
  });
}

/**
 * Crop a region and upscale so small faces in full-body shots become
 * large enough for MediaPipe (normalized landmarks stay relative to crop).
 */
function cropAndUpscale(
  source: ImageBitmap | HTMLCanvasElement,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  minSide = 720,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const scale = Math.max(1, minSide / Math.min(sw, sh));
  canvas.width = Math.max(1, Math.round(sw * scale));
  canvas.height = Math.max(1, Math.round(sh * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas for face crop.");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/** Upper-body / face crops for fashion & full-length reference photos. */
function faceSearchCrops(
  width: number,
  height: number,
): Array<{ sx: number; sy: number; sw: number; sh: number; label: string }> {
  const crops: Array<{
    sx: number;
    sy: number;
    sw: number;
    sh: number;
    label: string;
  }> = [];

  const push = (
    cx: number,
    cy: number,
    fracW: number,
    fracH: number,
    label: string,
  ) => {
    const sw = Math.min(width, Math.max(64, width * fracW));
    const sh = Math.min(height, Math.max(64, height * fracH));
    const sx = Math.max(0, Math.min(width - sw, cx - sw / 2));
    const sy = Math.max(0, Math.min(height - sh, cy - sh / 2));
    crops.push({ sx, sy, sw, sh, label });
  };

  // Full-length portraits: face sits in the top band.
  push(width * 0.5, height * 0.18, 0.55, 0.32, "upper-tight");
  push(width * 0.5, height * 0.2, 0.7, 0.4, "upper-mid");
  push(width * 0.5, height * 0.22, 0.85, 0.48, "upper-wide");
  push(width * 0.5, height * 0.15, 0.42, 0.28, "head-zoom");
  // Slight left/right for off-center subjects.
  push(width * 0.42, height * 0.18, 0.5, 0.34, "upper-left");
  push(width * 0.58, height * 0.18, 0.5, 0.34, "upper-right");

  return crops;
}

/**
 * Detect a face, trying upright + 90° rotations, then upper-body crops
 * when the face is too small (common for full-length reference looks).
 * Successful crops are re-encoded so uploaded pixels match landmarks.
 */
export async function extractFaceLandmarksFromFile(
  file: File,
): Promise<FaceExtractionResult> {
  const bitmap = await createImageBitmap(file);

  try {
    type Candidate = {
      landmarks: LandmarkPoint[];
      quarters: 0 | 1 | 2 | 3;
      canvas: HTMLCanvasElement | null;
      roll: number;
      span: number;
      fromCrop: boolean;
      label: string;
    };

    const candidates: Candidate[] = [];
    const turns: Array<0 | 1 | 2 | 3> = [0, 1, 3, 2];

    for (const q of turns) {
      const canvas = q === 0 ? null : drawRotated(bitmap, q);
      const source = canvas ?? bitmap;
      const landmarks = await extractFaceLandmarks(source);
      if (!landmarks || landmarks.length < 100) continue;

      candidates.push({
        landmarks,
        quarters: q,
        canvas,
        roll: eyeLineRollAbs(landmarks),
        span: eyeSpan(landmarks),
        fromCrop: false,
        label: `full-q${q}`,
      });

      if (q === 0 && eyeLineRollAbs(landmarks) < 25 && eyeSpan(landmarks) > 0.08) {
        break;
      }
    }

    const bestFull = candidates.length
      ? [...candidates].sort((a, b) => {
          const rollDiff = a.roll - b.roll;
          if (Math.abs(rollDiff) > 8) return rollDiff;
          return b.span - a.span;
        })[0]
      : null;

    // Full-body / distant faces: eye span under ~8% of frame usually fails
    // downstream quality — try zoomed upper crops.
    const needsCrop =
      !bestFull || bestFull.span < 0.08 || bestFull.roll > 35;

    if (needsCrop) {
      const oriented: ImageBitmap | HTMLCanvasElement =
        bestFull?.canvas && bestFull.quarters > 0
          ? bestFull.canvas
          : bitmap;
      const w = oriented.width;
      const h = oriented.height;

      for (const region of faceSearchCrops(w, h)) {
        const crop = cropAndUpscale(
          oriented,
          region.sx,
          region.sy,
          region.sw,
          region.sh,
        );
        const landmarks = await extractFaceLandmarks(crop);
        if (!landmarks || landmarks.length < 100) continue;

        const span = eyeSpan(landmarks);
        const roll = eyeLineRollAbs(landmarks);
        candidates.push({
          landmarks,
          quarters: bestFull?.quarters ?? 0,
          canvas: crop,
          roll,
          span,
          fromCrop: true,
          label: region.label,
        });

        // Strong face fill in crop — stop early.
        if (span > 0.18 && roll < 30) break;
      }
    }

    if (candidates.length === 0) {
      console.info("[MediaPipe] no face in full frame or upper crops");
      return {
        landmarks: null,
        fileForUpload: file,
        previewUrl: null,
        rotationQuarters: 0,
      };
    }

    // Prefer larger face (crops win for full-body), then level eyes.
    candidates.sort((a, b) => {
      const spanDiff = b.span - a.span;
      if (Math.abs(spanDiff) > 0.03) return spanDiff;
      return a.roll - b.roll;
    });

    const best = candidates[0]!;
    console.info("[MediaPipe] chose face pass", {
      label: best.label,
      fromCrop: best.fromCrop,
      quarters: best.quarters,
      roll: Math.round(best.roll),
      eyeSpan: Number(best.span.toFixed(3)),
      tried: candidates.length,
    });

    if (!best.fromCrop && (best.quarters === 0 || !best.canvas)) {
      return {
        landmarks: best.landmarks,
        fileForUpload: file,
        previewUrl: null,
        rotationQuarters: 0,
      };
    }

    if (!best.canvas) {
      return {
        landmarks: best.landmarks,
        fileForUpload: file,
        previewUrl: null,
        rotationQuarters: best.quarters,
      };
    }

    const fileForUpload = await canvasToJpegFile(
      best.canvas,
      file.name,
      best.fromCrop ? "face-crop" : "oriented",
    );
    const previewUrl = URL.createObjectURL(fileForUpload);

    return {
      landmarks: best.landmarks,
      fileForUpload,
      previewUrl,
      rotationQuarters: best.quarters,
    };
  } finally {
    bitmap.close();
  }
}

