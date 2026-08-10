/**
 * Optional upload personalization — priority tags only (not photo_quality).
 * Photo quality remains an internal gate per PRODUCT.md; users don't "opt into" it.
 */

import type { FeatureKey } from "@/lib/types/report";

/** Features a user may mark as "most curious about" (excludes photo_quality). */
export type PriorityFeatureKey = Exclude<FeatureKey, "photo_quality">;

export const PRIORITY_FEATURE_OPTIONS: {
  key: PriorityFeatureKey;
  label: string;
}[] = [
  { key: "face_symmetry", label: "Face symmetry" },
  { key: "facial_proportions", label: "Facial proportions" },
  { key: "skin_clarity", label: "Skin clarity" },
  { key: "jawline_definition", label: "Jawline definition" },
  { key: "eyebrow_shape", label: "Eyebrow shape" },
  { key: "eye_spacing", label: "Eye spacing" },
  { key: "grooming_signal", label: "Grooming" },
];

export const PRIORITY_FEATURE_KEYS: PriorityFeatureKey[] =
  PRIORITY_FEATURE_OPTIONS.map((o) => o.key);

export const USER_NOTE_MAX_LENGTH = 300;

export function isPriorityFeatureKey(value: unknown): value is PriorityFeatureKey {
  return (
    typeof value === "string" &&
    (PRIORITY_FEATURE_KEYS as string[]).includes(value)
  );
}

export function sanitizePriorityFeatures(
  input: unknown,
): PriorityFeatureKey[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<PriorityFeatureKey>();
  for (const item of input) {
    if (isPriorityFeatureKey(item)) seen.add(item);
  }
  return [...seen];
}

export function sanitizeUserNote(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim().slice(0, USER_NOTE_MAX_LENGTH);
  return trimmed.length > 0 ? trimmed : null;
}
