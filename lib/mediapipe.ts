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
/** Forehead / chin — reject 180° flips that still have level eyes. */
const FOREHEAD = 10;
const CHIN = 152;
const NOSE_TIP = 1;

let faceLandmarkerPromise: Promise<FaceLandmarker> | null = null;

async function getFaceLandmarker(): Promise<FaceLandmarker> {
  if (!faceLandmarkerPromise) {
    faceLandmarkerPromise = (async () => {
      const { FaceLandmarker, FilesetResolver } = await import(
        "@mediapipe/tasks-vision"
      );

      // MUST match installed @mediapipe/tasks-vision version (package.json).
      // Mismatched CDN wasm (e.g. 0.10.18 vs 0.10.35) often returns empty faces.
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm",
      );

      const baseOptions = {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      } as const;

      const shared = {
        runningMode: "IMAGE" as const,
        numFaces: 2,
        minFaceDetectionConfidence: 0.3,
        minFacePresenceConfidence: 0.3,
        minTrackingConfidence: 0.3,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
      };

      // CPU first — GPU can "succeed" then return empty landmark sets on some GPUs.
      try {
        const cpu = await FaceLandmarker.createFromOptions(vision, {
          ...shared,
          baseOptions: { ...baseOptions, delegate: "CPU" },
        });
        console.info("[MediaPipe] FaceLandmarker ready (CPU)");
        return cpu;
      } catch (cpuErr) {
        console.warn("[MediaPipe] CPU delegate failed, trying GPU", cpuErr);
        const gpu = await FaceLandmarker.createFromOptions(vision, {
          ...shared,
          baseOptions: { ...baseOptions, delegate: "GPU" },
        });
        console.info("[MediaPipe] FaceLandmarker ready (GPU)");
        return gpu;
      }
    })().catch((err) => {
      faceLandmarkerPromise = null;
      throw err;
    });
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

/**
 * How anatomically upright the face is in image space (y grows downward).
 * Positive ⇒ chin below eyes / forehead above eyes. Near-zero or negative
 * means the mesh was fit on an upside-down (or near-inverted) frame — the
 * common failure mode when we only scored eye-line roll.
 */
function faceUprightness(landmarks: LandmarkPoint[]): number {
  const L = landmarks[LEFT_EYE_OUTER];
  const R = landmarks[RIGHT_EYE_OUTER];
  const chin = landmarks[CHIN];
  const forehead = landmarks[FOREHEAD];
  const nose = landmarks[NOSE_TIP];
  if (!L || !R || !chin || !forehead) return -1;

  const eyeY = (L.y + R.y) / 2;
  // Chin should sit below the eyes; forehead above.
  let score = chin.y - eyeY + (eyeY - forehead.y);
  if (nose) {
    // Nose tip should also sit below the eye line on an upright face.
    score += Math.max(-0.05, nose.y - eyeY);
  }
  return score;
}

function isFaceUpright(landmarks: LandmarkPoint[]): boolean {
  return faceUprightness(landmarks) >= 0.04;
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

/** Rank candidates: upright anatomy first, then size, then level eyes. */
function compareFaceCandidates(a: Candidate, b: Candidate): number {
  const aUp = isFaceUpright(a.landmarks);
  const bUp = isFaceUpright(b.landmarks);
  if (aUp !== bUp) return aUp ? -1 : 1;

  const uprightDiff = faceUprightness(b.landmarks) - faceUprightness(a.landmarks);
  if (Math.abs(uprightDiff) > 0.02) return uprightDiff;

  const spanDiff = b.span - a.span;
  if (Math.abs(spanDiff) > 0.03) return spanDiff;

  const rollDiff = a.roll - b.roll;
  if (Math.abs(rollDiff) > 8) return rollDiff;

  // Prefer fewer quarter-turns when scores tie (avoid gratuitous 180° flips).
  return a.quarters - b.quarters;
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
  // Opaque backdrop — transparent cutouts otherwise confuse MediaPipe.
  ctx.fillStyle = "#d4d0cc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  // Force raw pixels — EXIF "from-image" can disagree with how WebPs are
  // stored and fight our manual 90°/180° search (double-rotate → upside down).
  try {
    return await createImageBitmap(file, { imageOrientation: "none" });
  } catch {
    try {
      return await createImageBitmap(file);
    } catch {
      /* fall through */
    }
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
    try {
      return await createImageBitmap(img, { imageOrientation: "none" });
    } catch {
      return await createImageBitmap(img);
    }
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * MediaPipe is unreliable on transparent PNGs (cutouts). Paint onto an opaque
 * neutral backdrop, then for ultra-wide / ultra-tall canvases crop toward a
 * portrait window so the face isn't a tiny strip after downscale.
 */
function prepareCanvasForFaceDetect(
  source: ImageBitmap | HTMLCanvasElement,
): HTMLCanvasElement {
  const w = source.width;
  const h = source.height;
  const aspect = w / Math.max(1, h);

  let sx = 0;
  let sy = 0;
  let sw = w;
  let sh = h;

  // Ultra-wide cutouts (common studio PNGs): keep a portrait window on center.
  if (aspect > 1.35) {
    const targetAspect = 3 / 4;
    sw = Math.min(w, Math.round(h * targetAspect * 1.15));
    sh = h;
    sx = Math.max(0, Math.round((w - sw) / 2));
  } else if (aspect < 0.55) {
    // Ultra-tall: keep upper-body band where faces usually sit.
    const targetAspect = 3 / 4;
    sh = Math.min(h, Math.round(w / targetAspect));
    sw = w;
    sy = Math.max(0, Math.round(h * 0.08));
    if (sy + sh > h) sy = Math.max(0, h - sh);
  }

  const maxEdge = 1600;
  const scale = Math.min(1, maxEdge / Math.max(sw, sh));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(sw * scale));
  canvas.height = Math.max(1, Math.round(sh * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create detection canvas.");

  // Opaque fill — transparent pixels become soft gray, not checker noise.
  ctx.fillStyle = "#d4d0cc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    source,
    sx,
    sy,
    sw,
    sh,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  return canvas;
}

/** Downscale / flatten / reframe before MediaPipe. */
async function bitmapForDetection(bitmap: ImageBitmap): Promise<{
  source: ImageBitmap | HTMLCanvasElement;
  scaled: boolean;
}> {
  const prepared = prepareCanvasForFaceDetect(bitmap);
  const changed =
    prepared.width !== bitmap.width || prepared.height !== bitmap.height;
  return { source: prepared, scaled: changed };
}

function landmarksFromDetect(
  landmarker: FaceLandmarker,
  canvas: HTMLCanvasElement,
): LandmarkPoint[] | null {
  const result = landmarker.detect(canvas);
  const raw = result.faceLandmarks[0] ?? null;
  if (!raw) {
    console.info("[MediaPipe] detect: no face", {
      w: canvas.width,
      h: canvas.height,
      faces: result.faceLandmarks.length,
    });
    return null;
  }
  return raw.slice(0, FACE_MESH_COUNT).map((p) => ({
    x: p.x,
    y: p.y,
    z: p.z ?? 0,
  }));
}

/** Re-draw onto a solid backdrop (helps transparent cutouts / noisy studio mats). */
function withBackdrop(
  source: HTMLCanvasElement,
  color: string,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return source;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, 0, 0);
  return canvas;
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
  let landmarks = landmarksFromDetect(landmarker, canvas);
  if (landmarks) return landmarks;

  // Retry on alternate backdrops — cutouts / checker mats confuse the detector.
  for (const color of ["#f0eeea", "#2a2a2a", "#ffffff"]) {
    landmarks = landmarksFromDetect(landmarker, withBackdrop(canvas, color));
    if (landmarks) return landmarks;
  }

  return null;
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

/**
 * Detect a face, trying upright + 90° rotations, then upper-body crops
 * when the face is too small. Successful rotates/crops are re-encoded so
 * uploaded pixels match landmarks and the preview is upright.
 */
export async function extractFaceLandmarksFromFile(
  file: File,
): Promise<FaceExtractionResult> {
  const rawBitmap = await fileToBitmap(file);
  const { source: prepared } = await bitmapForDetection(rawBitmap);

  try {
    const candidates: Candidate[] = [];
    // Always try every orientation — sideways phone WebPs often have no EXIF.
    const turns: Array<0 | 1 | 2 | 3> = [0, 1, 3, 2];

    for (const q of turns) {
      const canvas = drawRotated(prepared, q);
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

    // Prefer anatomically upright full-frame hits (chin below eyes), then
    // level eyes / larger face. Eye-roll alone used to accept 180° flips.
    const bestFull = candidates.length
      ? [...candidates].sort(compareFaceCandidates)[0]!
      : null;

    // Crops only on the best upright orientation (never on sideways pixels).
    const baseForCrop = bestFull?.canvas ?? drawRotated(prepared, 0);
    const needsCrop =
      !bestFull ||
      bestFull.span < 0.08 ||
      bestFull.roll > 35 ||
      !isFaceUpright(bestFull.landmarks);

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

        if (span > 0.18 && roll < 30 && isFaceUpright(landmarks)) {
          break;
        }
      }

      // If no full-frame hit, also try crops on other orientations.
      if (!bestFull) {
        for (const q of turns) {
          if (q === 0) continue;
          const oriented = drawRotated(prepared, q);
          for (const region of faceSearchCrops(
            oriented.width,
            oriented.height,
          ).slice(0, 4)) {
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
        width: prepared.width,
        height: prepared.height,
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

    candidates.sort(compareFaceCandidates);

    const best = candidates[0]!;
    console.info("[MediaPipe] chose face pass", {
      label: best.label,
      fromCrop: best.fromCrop,
      quarters: best.quarters,
      roll: Math.round(best.roll),
      eyeSpan: Number(best.span.toFixed(3)),
      upright: Number(faceUprightness(best.landmarks).toFixed(3)),
      tried: candidates.length,
    });

    // Always re-encode so preview is upright, opaque, and matches landmarks
    // (transparent / ultra-wide cutouts otherwise break detection + display).
    let canvasOut = best.canvas;
    let landmarksOut = best.landmarks;
    let quartersOut = best.quarters;

    if (
      best.fromCrop &&
      bestFull &&
      bestFull.span >= 0.08 &&
      bestFull.roll <= 35 &&
      isFaceUpright(bestFull.landmarks)
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
    try {
      rawBitmap.close();
    } catch {
      /* already closed */
    }
  }
}
