import type { FeatureKey } from "@/lib/types/report";
import {
  featureMutability,
  isChecklistEligibleFeature,
  type FeatureMutability,
} from "@/lib/feature-mutability";

export type RecommendationEffort = "low" | "medium" | "high";
export type RecommendationConfidence = "high" | "medium" | "low";

export interface RecommendationAction {
  action: string;
  effort: RecommendationEffort;
  confidence: RecommendationConfidence;
  /** False for structural context notes — never go on the Pro weekly checklist. */
  checklistEligible: boolean;
  mutability: FeatureMutability;
}

export interface FeatureRecommendationRule {
  if_score: "below_70";
  observed_signal: string[];
  recommendations: Omit<
    RecommendationAction,
    "checklistEligible" | "mutability"
  >[];
}

/**
 * Flat JSON recommendation lookup — PRODUCT.md shape.
 * Weak scores unlock paired recommendations; never show a low score alone.
 */
export const RECOMMENDATION_LOOKUP: Partial<
  Record<FeatureKey, FeatureRecommendationRule>
> = {
  skin_clarity: {
    if_score: "below_70",
    observed_signal: ["texture_unevenness", "redness_detected"],
    recommendations: [
      {
        action: "Consistent skincare routine",
        effort: "low",
        confidence: "high",
      },
      {
        action: "Reduce harsh overhead lighting in future photos",
        effort: "low",
        confidence: "high",
      },
      {
        action: "Dermatologist consult if persistent",
        effort: "medium",
        confidence: "medium",
      },
    ],
  },
  face_symmetry: {
    if_score: "below_70",
    observed_signal: ["mirror_pair_deviation"],
    recommendations: [
      {
        action: "Re-shoot with face centered and camera at eye level",
        effort: "low",
        confidence: "high",
      },
      {
        action: "Check for uneven lighting that exaggerates asymmetry",
        effort: "low",
        confidence: "high",
      },
    ],
  },
  facial_proportions: {
    if_score: "below_70",
    observed_signal: ["thirds_ratio_drift"],
    recommendations: [
      {
        action: "Use a straight-on angle; avoid wide-angle close-ups",
        effort: "low",
        confidence: "high",
      },
      {
        action: "Keep chin level — tilt changes perceived proportions",
        effort: "low",
        confidence: "medium",
      },
    ],
  },
  jawline_definition: {
    if_score: "below_70",
    observed_signal: ["low_edge_contrast"],
    recommendations: [
      {
        action: "Side lighting to increase jaw contour contrast in photos",
        effort: "low",
        confidence: "high",
      },
      {
        action: "Reduce soft frontal fill that flattens the jaw edge",
        effort: "low",
        confidence: "medium",
      },
    ],
  },
  eyebrow_shape: {
    if_score: "below_70",
    observed_signal: ["arch_asymmetry", "thickness_mismatch"],
    recommendations: [
      {
        action: "Groom brows to match arch height across both sides",
        effort: "low",
        confidence: "high",
      },
      {
        action: "Avoid over-plucking the outer third",
        effort: "low",
        confidence: "medium",
      },
    ],
  },
  eye_spacing: {
    if_score: "below_70",
    observed_signal: ["inter_eye_ratio_outlier"],
    recommendations: [
      {
        action:
          "Confirm the camera is centered — off-axis shots can skew spacing reads",
        effort: "low",
        confidence: "high",
      },
      {
        action:
          "This spacing read is largely structural. We won’t put it on your weekly checklist — use it for styling and reference-look context.",
        effort: "low",
        confidence: "high",
      },
    ],
  },
  grooming_signal: {
    if_score: "below_70",
    observed_signal: ["visible_stubble_unevenness", "brow_untidiness"],
    recommendations: [
      {
        action: "Clean up edges (neckline, brows) before the next shoot",
        effort: "low",
        confidence: "high",
      },
      {
        action: "Keep a consistent grooming schedule for tracking photos",
        effort: "medium",
        confidence: "medium",
      },
    ],
  },
  photo_quality: {
    if_score: "below_70",
    observed_signal: ["soft_focus", "uneven_lighting"],
    recommendations: [
      {
        action: "Reshoot in even daylight facing a window",
        effort: "low",
        confidence: "high",
      },
      {
        action: "Hold the camera steady; avoid digital zoom",
        effort: "low",
        confidence: "high",
      },
    ],
  },
};

function withMutability(
  feature: FeatureKey,
  rec: Omit<RecommendationAction, "checklistEligible" | "mutability">,
): RecommendationAction {
  const mutability = featureMutability(feature);
  return {
    ...rec,
    mutability,
    checklistEligible: isChecklistEligibleFeature(feature),
  };
}

export function recommendationsForScore(
  feature: FeatureKey,
  score: number,
): RecommendationAction[] {
  if (score >= 70) return [];
  const mutability = featureMutability(feature);
  const raw = RECOMMENDATION_LOOKUP[feature]?.recommendations ?? [];

  if (mutability === "structural") {
    // Prefer the structural context note; keep a single framing check first if present.
    const tagged = raw.map((r) => withMutability(feature, r));
    return tagged.map((r) => ({ ...r, checklistEligible: false }));
  }

  return raw.map((r) => withMutability(feature, r));
}

/** Actions allowed on the Pro weekly checklist (actionable features only). */
export function checklistRecommendationsForScore(
  feature: FeatureKey,
  score: number,
): RecommendationAction[] {
  return recommendationsForScore(feature, score).filter(
    (r) => r.checklistEligible,
  );
}
