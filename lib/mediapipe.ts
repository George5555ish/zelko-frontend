/**
 * Client-side MediaPipe Face Landmarker.
 * The task model returns 478 points (468 face mesh + 10 iris). We keep the
 * classic 468-point mesh per PRODUCT.md.
 *
 * Also tries 90° rotations when the first pass fails — phone photos often
 * arrive sideways without usable EXIF.
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
      } catch (gpuErr) {
        console.warn("[MediaPipe] GPU delegate failed, using CPU", gpuErr);
        return await FaceLandmarker.createFromOptions(vision, {
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

function toCanvas(
  source: ImageBitmap | HTMLCanvasElement | HTMLImageElement,
): HTMLCanvasElement {
  if (source instanceof HTMLCanvasElement) return source;
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas.");
  ctx.drawImage(source, 0, 0);
  return canvas;
}

/**
 * Rotate clockwise by quarter-turns. MediaPipe Face Landmarker is unreliable
 * on raw ImageBitmap in some browsers — always detect from a canvas.
 */
function drawRotated(
  source: ImageBitmap | HTMLCanvasElement,
  quarterTurns: 0 | 1 | 2 | 3,
): HTMLCanvasElement {
  const src = toCanvas(source);
  const w = src.width;
  const h = src.height;
  const turns = ((quarterTurns % 4) + 4) % 4;

  if (turns === 0) return src;

  const canvas = document.createElement("canvas");
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
  ctx.drawImage(src, -w / 2, -h / 2);
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

async function fileToBitmap(file: File): Promise<ImageBitmap> {
  // Prefer raw pixels — EXIF "from-image" can disagree with how WebPs are
  // stored and fight our manual 90° search.
  try {
    return await createImageBitmap(file);
  } catch {
    /* fall through */
  }

  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Could not decode image."));
      el.decoding = "async";
      el.src = url;
    });
    await img.decode().catch(() => undefined);
    return await createImageBitmap(img);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Downscale huge bitmaps before MediaPipe to avoid silent detect failures. */
async function bitmapForDetection(bitmap: ImageBitmap): Promise<{
  source: ImageBitmap;
  scaled: boolean;
}> {
  const maxEdge = 1600;
  const w = bitmap.width;
  const h = bitmap.height;
  if (Math.max(w, h) <= maxEdge) {
    return { source: bitmap, scaled: false };
  }

  const scale = maxEdge / Math.max(w, h);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return { source: bitmap, scaled: false };
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const scaledBmp = await createImageBitmap(canvas);
  return { source: scaledBmp, scaled: true };
}

/**
 * Run face landmark detection. Always feeds a canvas — more reliable than
 * ImageBitmap across Chrome/Edge MediaPipe builds.
 */
export async function extractFaceLandmarks(
  image: HTMLImageElement | HTMLCanvasElement | ImageBitmap,
): Promise<LandmarkPoint[] | null> {
  const landmarker = await getFaceLandmarker();
  const canvas = toCanvas(image);
  const result = landmarker.detect(canvas);
  const raw = result.faceLandmarks[0] ?? null;
  const landmarks = raw ? raw.slice(0, FACE_MESH_COUNT) : null;

  return landmarks;
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

  push(width * 0.5, height * 0.18, 0.55, 0.32, "upper-tight");
  push(width * 0.5, height * 0.2, 0.7, 0.4, "upper-mid");
  push(width * 0.5, height * 0.22, 0.85, 0.48, "upper-wide");
  push(width * 0.5, height * 0.15, 0.42, 0.28, "head-zoom");
  push(width * 0.5, height * 0.45, 0.85, 0.75, "center-face");
  push(width * 0.5, height * 0.4, 1, 0.7, "center-wide");
  push(width * 0.42, height * 0.18, 0.5, 0.34, "upper-left");
  push(width * 0.58, height * 0.18, 0.5, 0.34, "upper-right");

  return crops;
}

type Candidate = {
  landmarks: LandmarkPoint[];
  quarters: 0 | 1 | 2 | 3;
  canvas: HTMLCanvasElement;
  roll: number;
  span: number;
  fromCrop: boolean;
  label: string;
};

/**
 * Detect a face, trying upright + 90° rotations, then upper-body crops
 * when the face is too small. Successful rotates/crops are re-encoded so
 * uploaded pixels match landmarks and the preview is upright.
 */
export async function extractFaceLandmarksFromFile(
  file: File,
): Promise<FaceExtractionResult> {
  const rawBitmap = await fileToBitmap(file);
  const { source: bitmap, scaled } = await bitmapForDetection(rawBitmap);
  const bitmapsToClose: ImageBitmap[] = [rawBitmap];
  if (scaled) bitmapsToClose.push(bitmap);

  try {
    const candidates: Candidate[] = [];
    // Always try every orientation — sideways phone WebPs often have no EXIF.
    const turns: Array<0 | 1 | 2 | 3> = [0, 1, 3, 2];

    for (const q of turns) {
      const canvas = drawRotated(bitmap, q);
      let landmarks: LandmarkPoint[] | null = null;
      try {
        landmarks = await extractFaceLandmarks(canvas);
      } catch (err) {
        console.warn("[MediaPipe] detect failed for q" + q, err);
        continue;
      }
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
    }

    // Prefer level eyes + larger face among full-frame hits.
    let bestFull = candidates.length
      ? [...candidates].sort((a, b) => {
          const rollDiff = a.roll - b.roll;
          if (Math.abs(rollDiff) > 8) return rollDiff;
          return b.span - a.span;
        })[0]!
      : null;

    // Crops only on the best upright orientation (never on sideways pixels).
    const baseForCrop = bestFull?.canvas ?? drawRotated(bitmap, 0);
    const needsCrop = !bestFull || bestFull.span < 0.08 || bestFull.roll > 35;

    if (needsCrop) {
      const w = baseForCrop.width;
      const h = baseForCrop.height;
      const cropQuarters = bestFull?.quarters ?? 0;

      for (const region of faceSearchCrops(w, h)) {
        const crop = cropAndUpscale(
          baseForCrop,
          region.sx,
          region.sy,
          region.sw,
          region.sh,
        );
        let landmarks: LandmarkPoint[] | null = null;
        try {
          landmarks = await extractFaceLandmarks(crop);
        } catch (err) {
          console.warn("[MediaPipe] crop detect failed", region.label, err);
          continue;
        }
        if (!landmarks || landmarks.length < 100) continue;

        const span = eyeSpan(landmarks);
        const roll = eyeLineRollAbs(landmarks);
        candidates.push({
          landmarks,
          quarters: cropQuarters,
          canvas: crop,
          roll,
          span,
          fromCrop: true,
          label: region.label,
        });

        if (span > 0.18 && roll < 30) break;
      }

      // If no full-frame hit, also try crops on other orientations.
      if (!bestFull) {
        for (const q of turns) {
          if (q === 0) continue;
          const oriented = drawRotated(bitmap, q);
          for (const region of faceSearchCrops(oriented.width, oriented.height).slice(0, 4)) {
            const crop = cropAndUpscale(
              oriented,
              region.sx,
              region.sy,
              region.sw,
              region.sh,
            );
            let landmarks: LandmarkPoint[] | null = null;
            try {
              landmarks = await extractFaceLandmarks(crop);
            } catch {
              continue;
            }
            if (!landmarks || landmarks.length < 100) continue;
            candidates.push({
              landmarks,
              quarters: q,
              canvas: crop,
              roll: eyeLineRollAbs(landmarks),
              span: eyeSpan(landmarks),
              fromCrop: true,
              label: `q${q}-${region.label}`,
            });
          }
        }
      }
    }

    if (candidates.length === 0) {
      console.info("[MediaPipe] no face in any orientation", {
        width: bitmap.width,
        height: bitmap.height,
        type: file.type,
        name: file.name,
      });
      return {
        landmarks: null,
        fileForUpload: file,
        previewUrl: null,
        rotationQuarters: 0,
      };
    }

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

    // Always re-encode so the preview is upright and pixels match landmarks
    // (sideways WebPs / EXIF mismatches otherwise keep showing rotated).
    let canvasOut = best.canvas;
    let landmarksOut = best.landmarks;
    let quartersOut = best.quarters;

    if (
      best.fromCrop &&
      bestFull &&
      bestFull.span >= 0.08 &&
      bestFull.roll <= 35
    ) {
      canvasOut = bestFull.canvas;
      landmarksOut = bestFull.landmarks;
      quartersOut = bestFull.quarters;
    }

    const suffix = best.fromCrop && canvasOut === best.canvas
      ? "face-crop"
      : quartersOut
        ? "oriented"
        : "normalized";
    const fileForUpload = await canvasToJpegFile(canvasOut, file.name, suffix);
    const previewUrl = URL.createObjectURL(fileForUpload);

    return {
      landmarks: landmarksOut,
      fileForUpload,
      previewUrl,
      rotationQuarters: quartersOut,
    };
  } finally {
    for (const b of bitmapsToClose) {
      try {
        b.close();
      } catch {
        /* already closed */
      }
    }
  }
}
