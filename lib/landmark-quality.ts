/**
 * Client-side landmark quality for upload gating + report portrait pick.
 *
 * Accept only when the mesh can actually drive scores and overlay dots:
 * full Face Mesh, face filling the frame, at least one clear eye, nose,
 * jawline anchors, and not a hard profile / extreme turn.
 */

import type { LandmarkPoint } from "@/lib/mediapipe";

const LEFT_EYE_OUTER = 33;
const RIGHT_EYE_OUTER = 263;
const NOSE_TIP = 1;
const LEFT_CHEEK = 234;
const RIGHT_CHEEK = 454;
const FOREHEAD = 10;
const CHIN = 152;
const LEFT_JAW = 172;
const RIGHT_JAW = 397;

/** Minimum score (0–100) to accept a photo / use as report face. */
export const MIN_PORTRAIT_LANDMARK_SCORE = 62;

function pt(
  landmarks: LandmarkPoint[],
  i: number,
): LandmarkPoint | null {
  const p = landmarks[i];
  if (!p || typeof p.x !== "number" || typeof p.y !== "number") return null;
  return p;
}

function inFrame(p: LandmarkPoint, pad = 0.02): boolean {
  return p.x >= pad && p.x <= 1 - pad && p.y >= pad && p.y <= 1 - pad;
}

function dist(a: LandmarkPoint, b: LandmarkPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export type LandmarkQuality = {
  score: number;
  eyeSpan: number;
  yawProxy: number;
  rollAbs: number;
  meshCount: number;
  oneEyeVisible: boolean;
  bothEyesVisible: boolean;
  noseVisible: boolean;
  jawVisible: boolean;
  /** True when strong enough to accept + drive the report portrait */
  usableForPortrait: boolean;
  /** Short reason when not usable */
  rejectReason: string | null;
};

/**
 * Score MediaPipe mesh for gating. Returns null if landmarks missing entirely.
 */
export function assessLandmarkQuality(
  landmarks: LandmarkPoint[] | null | undefined,
): LandmarkQuality | null {
  if (!landmarks || landmarks.length < 100) return null;

  const meshCount = landmarks.length;
  const le = pt(landmarks, LEFT_EYE_OUTER);
  const re = pt(landmarks, RIGHT_EYE_OUTER);
  const nose = pt(landmarks, NOSE_TIP);
  const leftCheek = pt(landmarks, LEFT_CHEEK);
  const rightCheek = pt(landmarks, RIGHT_CHEEK);
  const fore = pt(landmarks, FOREHEAD);
  const chin = pt(landmarks, CHIN);
  const leftJaw = pt(landmarks, LEFT_JAW);
  const rightJaw = pt(landmarks, RIGHT_JAW);

  const leftEyeOk = Boolean(le && inFrame(le, 0.015));
  const rightEyeOk = Boolean(re && inFrame(re, 0.015));
  const oneEyeVisible = leftEyeOk || rightEyeOk;
  const bothEyesVisible = Boolean(
    leftEyeOk &&
      rightEyeOk &&
      le &&
      re &&
      dist(le, re) > 0.05,
  );
  const noseVisible = Boolean(nose && inFrame(nose, 0.02));
  const jawVisible = Boolean(
    chin &&
      inFrame(chin, 0.02) &&
      ((leftJaw && inFrame(leftJaw, 0.02)) ||
        (rightJaw && inFrame(rightJaw, 0.02))),
  );

  const eyeSpan = le && re ? dist(le, re) : leftEyeOk || rightEyeOk ? 0.06 : 0;
  const rollAbs =
    le && re
      ? Math.abs(Math.atan2(re.y - le.y, re.x - le.x) * (180 / Math.PI))
      : 45;

  let yawProxy = 0;
  if (leftCheek && rightCheek && nose) {
    const midX = (leftCheek.x + rightCheek.x) / 2;
    const faceW = dist(leftCheek, rightCheek) || 1;
    yawProxy = ((nose.x - midX) / faceW) * 100;
  }

  const faceSpan =
    fore && chin
      ? dist(fore, chin)
      : leftCheek && rightCheek
        ? dist(leftCheek, rightCheek)
        : 0;

  let score = 0;
  if (meshCount >= 400) score += 22;
  else if (meshCount >= 200) score += 8;

  if (eyeSpan >= 0.14) score += 26;
  else if (eyeSpan >= 0.1) score += 20;
  else if (eyeSpan >= 0.07) score += 12;
  else if (eyeSpan >= 0.05) score += 6;

  if (faceSpan >= 0.28) score += 10;
  else if (faceSpan >= 0.2) score += 6;

  if (rollAbs <= 12) score += 14;
  else if (rollAbs <= 22) score += 8;
  else if (rollAbs <= 32) score += 3;

  const absYaw = Math.abs(yawProxy);
  if (absYaw <= 14) score += 14;
  else if (absYaw <= 24) score += 8;
  else if (absYaw <= 34) score += 3;

  if (bothEyesVisible && noseVisible && jawVisible) score += 14;
  else if (oneEyeVisible && noseVisible && jawVisible) score += 8;
  else if (oneEyeVisible && noseVisible) score += 4;

  score = Math.round(Math.min(100, Math.max(0, score)));

  let rejectReason: string | null = null;
  if (meshCount < 400) {
    rejectReason =
      "Face mesh incomplete — use a clearer close-up looking toward the camera.";
  } else if (!oneEyeVisible) {
    rejectReason =
      "Need at least one clear eye in frame — face the camera more directly.";
  } else if (!noseVisible) {
    rejectReason = "Nose not visible enough — center your face in the shot.";
  } else if (!jawVisible) {
    rejectReason =
      "Jawline not visible enough — show chin and jaw, not a cropped forehead.";
  } else if (eyeSpan < 0.07 && faceSpan < 0.2) {
    rejectReason =
      "Face too small in frame — move closer so your face fills more of the photo.";
  } else if (absYaw > 36) {
    rejectReason =
      "Face turned too far sideways — we need a more frontal shot for landmarks.";
  } else if (rollAbs > 38) {
    rejectReason = "Head tilted too far — keep your head more level.";
  } else if (score < MIN_PORTRAIT_LANDMARK_SCORE) {
    rejectReason =
      "Face landmarks too weak — try a clearer, well-lit frontal selfie.";
  }

  const usableForPortrait = rejectReason === null;

  return {
    score,
    eyeSpan,
    yawProxy,
    rollAbs,
    meshCount,
    oneEyeVisible,
    bothEyesVisible,
    noseVisible,
    jawVisible,
    usableForPortrait,
    rejectReason,
  };
}

/** Pick the best accepted slot for the report portrait (highest landmark score). */
export function pickBestPortraitSlot<
  T extends {
    landmarks?: LandmarkPoint[] | null;
    landmarkScore?: number | null;
  },
>(slots: T[]): T | null {
  if (slots.length === 0) return null;
  return [...slots].sort((a, b) => {
    const sa = a.landmarkScore ?? assessLandmarkQuality(a.landmarks)?.score ?? 0;
    const sb = b.landmarkScore ?? assessLandmarkQuality(b.landmarks)?.score ?? 0;
    return sb - sa;
  })[0]!;
}
