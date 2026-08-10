/**
 * Client-side MediaPipe Face Landmarker.
 * The task model returns 478 points (468 face mesh + 10 iris). We keep the
 * classic 468-point mesh per PRODUCT.md and log that array to the console.
 */

import type { FaceLandmarker } from "@mediapipe/tasks-vision";

const FACE_MESH_COUNT = 468;

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

/**
 * Run face landmark detection on an HTMLImageElement / ImageBitmap / HTMLCanvasElement.
 * Returns the 468-point face mesh for the first face, or null if none detected.
 * Always logs the raw 468-point output to the console.
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
    landmarks,
  });

  return landmarks;
}

/**
 * Convenience: load a File as an ImageBitmap, run landmarks, revoke the bitmap.
 */
export async function extractFaceLandmarksFromFile(
  file: File,
): Promise<LandmarkPoint[] | null> {
  const bitmap = await createImageBitmap(file);
  try {
    return await extractFaceLandmarks(bitmap);
  } finally {
    bitmap.close();
  }
}
