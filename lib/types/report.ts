/**
 * Feature keys from PRODUCT.md scoring rubric.
 * Photo quality gates the pipeline; remaining features are scored post-acceptance.
 */
export type FeatureKey =
  | "face_symmetry"
  | "facial_proportions"
  | "skin_clarity"
  | "jawline_definition"
  | "eyebrow_shape"
  | "eye_spacing"
  | "grooming_signal"
  | "photo_quality";

export type ConfidenceLabel = "High" | "Medium" | "Low";

/** Per-feature score packet — every scored trait ships all three fields. */
export interface FeatureScore {
  score: number; // 0–100, never a percentage
  confidence: ConfidenceLabel;
  observedSignal: string;
  /**
   * False when the feature could not be measured this session (e.g. grooming
   * when outfit is not clearly identifiable). Defaults to true when omitted.
   */
  measurable?: boolean;
  /** Human-readable gate note shown when measurable is false. */
  gateNote?: string | null;
}

export type ReportFeatures = Record<FeatureKey, FeatureScore>;

/** Tap targets on the portrait — normalized 0–1 image coordinates. */
export interface FeatureOverlayPoint {
  id: string;
  feature: Exclude<FeatureKey, "photo_quality">;
  x: number;
  y: number;
}

/**
 * Document shape for the `reports` collection.
 * Matches PRODUCT.md: feature scores + overall composite + privacy timestamps.
 */
export interface ReportDocument {
  features: ReportFeatures;
  overallScore: number;
  createdAt: Date;
  /** Source GridFS ids kept when retainForTracking is true. */
  fileIds: string[];
  /** First upload kept for report portrait display. */
  portraitFileId: string | null;
  retainForTracking: boolean;
  allowTraining: boolean;
  /** Set when non-portrait source photos are deleted after analysis. */
  photoDeletedAt: Date | null;
  /** Linked account id after signup / login. */
  userId?: string | null;
  /**
   * Optional user-selected features to prioritize in recommendations.
   * Does not change scores — ranking only. Never includes photo_quality.
   */
  priorityFeatures: Exclude<FeatureKey, "photo_quality">[];
  /**
   * Optional free-text focus note. Stored server-side only for context.
   * Never echo this string in confirmation / "here's your plan" UI copy.
   */
  userNote: string | null;
  /**
   * Portrait overlay anchors in image-normalized space (0–1).
   * Derived from MediaPipe landmarks when provided at analyze time.
   */
  featureOverlays: FeatureOverlayPoint[];
}

/** Client-safe report payload (ISO dates, string id). */
export interface ReportViewModel {
  id: string;
  features: ReportFeatures;
  overallScore: number;
  createdAt: string;
  retainForTracking: boolean;
  photoDeletedAt: string | null;
  portraitFileId: string | null;
  userId: string | null;
  /** Ranking hint for recommendations — safe to expose. */
  priorityFeatures: Exclude<FeatureKey, "photo_quality">[];
  featureOverlays: FeatureOverlayPoint[];
}

export const FEATURE_KEYS: FeatureKey[] = [
  "face_symmetry",
  "facial_proportions",
  "skin_clarity",
  "jawline_definition",
  "eyebrow_shape",
  "eye_spacing",
  "grooming_signal",
  "photo_quality",
];

/** Appearance features shown in the report breakdown (quality is a gate, not a “look”). */
export const SCORED_APPEARANCE_KEYS: FeatureKey[] = FEATURE_KEYS.filter(
  (k) => k !== "photo_quality",
);

export const FEATURE_LABELS: Record<FeatureKey, string> = {
  face_symmetry: "Face symmetry",
  facial_proportions: "Facial proportions",
  skin_clarity: "Skin clarity",
  jawline_definition: "Jawline definition",
  eyebrow_shape: "Eyebrow shape",
  eye_spacing: "Eye spacing",
  grooming_signal: "Grooming signal",
  photo_quality: "Photo quality",
};

export const FEATURE_CONFIDENCE_TIER: Record<FeatureKey, string> = {
  face_symmetry: "High",
  facial_proportions: "Medium",
  skin_clarity: "Medium-high",
  jawline_definition: "Medium",
  eyebrow_shape: "Medium-high",
  eye_spacing: "High",
  grooming_signal: "Low-medium",
  photo_quality: "High",
};
