import type { FeatureKey } from "@/lib/types/report";

/**
 * How a feature should be coached:
 * - actionable: weekly checklist + changeable habits (skin, grooming, brows, photo setup)
 * - photo_sensitive: often lighting/angle — verify conditions before treating as "your face"
 * - structural: largely fixed anatomy — context / styling only, never weekly "fix" checklist
 */
export type FeatureMutability =
  | "actionable"
  | "photo_sensitive"
  | "structural";

export const FEATURE_MUTABILITY: Record<FeatureKey, FeatureMutability> = {
  skin_clarity: "actionable",
  grooming_signal: "actionable",
  eyebrow_shape: "actionable",
  photo_quality: "actionable",
  face_symmetry: "photo_sensitive",
  facial_proportions: "photo_sensitive",
  jawline_definition: "photo_sensitive",
  eye_spacing: "structural",
};

export const MUTABILITY_LABELS: Record<FeatureMutability, string> = {
  actionable: "You can act on this",
  photo_sensitive: "Check photo conditions first",
  structural: "Mostly fixed",
};

export const MUTABILITY_HINTS: Record<FeatureMutability, string> = {
  actionable:
    "Habits and grooming can move this score when you re-check under the same light.",
  photo_sensitive:
    "Lighting and angle often drive this read — re-shoot cleanly before treating it as fixed anatomy.",
  structural:
    "This is largely structural. We won’t put it on your weekly checklist — use it for styling and reference-look context.",
};

export function featureMutability(feature: FeatureKey): FeatureMutability {
  return FEATURE_MUTABILITY[feature];
}

export function isChecklistEligibleFeature(feature: FeatureKey): boolean {
  return FEATURE_MUTABILITY[feature] === "actionable";
}
