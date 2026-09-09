/**
 * Appearance Index — staged pillars + style preference schema.
 * Stage cycle: collect → reveal → next (not batch-then-one-report).
 */

import type { FeatureKey, FeatureScore, ReportFeatures } from "@/lib/types/report";

export type AppearanceStage =
  | "face_reveal"
  | "style_collect"
  | "style_reveal"
  | "prescription_reveal"
  | "complete";

export type PillarKey = "structure" | "grooming" | "style";

export const STRUCTURE_FEATURE_KEYS: Exclude<FeatureKey, "photo_quality">[] = [
  "face_symmetry",
  "facial_proportions",
  "eye_spacing",
  "jawline_definition",
  "eyebrow_shape",
];

export const GROOMING_FEATURE_KEYS: Exclude<FeatureKey, "photo_quality">[] = [
  "skin_clarity",
  "grooming_signal",
];

export interface PillarScore {
  key: PillarKey;
  label: string;
  score: number | null;
  confidence: "High" | "Medium" | "Low";
  featureKeys: Exclude<FeatureKey, "photo_quality">[];
  tips: string[];
  measurable: boolean;
}

export interface AppearancePillars {
  structure: PillarScore;
  grooming: PillarScore;
  /** Filled after Stage 2 */
  style: PillarScore | null;
}

/** Style preference enums — visual choice cards on Stage 2. */
export const FAVORITE_COLORS = [
  { id: "black", label: "Black", hex: "#1a1a1a" },
  { id: "navy", label: "Navy", hex: "#1e3a5f" },
  { id: "beige", label: "Beige", hex: "#c4b09a" },
  { id: "white", label: "White", hex: "#f5f5f5" },
  { id: "red", label: "Red", hex: "#b91c1c" },
  { id: "pink", label: "Pink", hex: "#e8a0bf" },
  { id: "green", label: "Green", hex: "#3d6b4f" },
  { id: "blue", label: "Blue", hex: "#3b82c4" },
] as const;
export type FavoriteColorId = (typeof FAVORITE_COLORS)[number]["id"];

export const BOTTOM_PREFERENCES = [
  { id: "dresses", label: "Dresses", hint: "One-piece looks" },
  { id: "jeans", label: "Jeans", hint: "Denim everyday" },
  { id: "skirts", label: "Skirts", hint: "Flow or pencil" },
  { id: "trousers", label: "Trousers", hint: "Tailored pants" },
] as const;
export type BottomPreferenceId = (typeof BOTTOM_PREFERENCES)[number]["id"];

export const SILHOUETTE_PREFERENCES = [
  { id: "fitted", label: "Fitted", hint: "Close to the body" },
  { id: "relaxed", label: "Relaxed", hint: "Easy, soft lines" },
  { id: "oversized", label: "Oversized", hint: "Roomy layers" },
] as const;
export type SilhouettePreferenceId =
  (typeof SILHOUETTE_PREFERENCES)[number]["id"];

export const STYLE_VIBES = [
  { id: "casual", label: "Casual", hint: "Weekend easy" },
  { id: "polished", label: "Polished", hint: "Clean & put-together" },
  { id: "street", label: "Street", hint: "Edge & attitude" },
  { id: "classic", label: "Classic", hint: "Timeless basics" },
] as const;
export type StyleVibeId = (typeof STYLE_VIBES)[number]["id"];

export const STYLE_BUDGETS = [
  { id: "low", label: "Budget-friendly", hint: "Keep it affordable" },
  { id: "mid", label: "Mid-range", hint: "Quality when it counts" },
  { id: "flexible", label: "Flexible", hint: "Spend for the right piece" },
] as const;
export type StyleBudgetId = (typeof STYLE_BUDGETS)[number]["id"];

/** Who the prescribed clothes should be for (drives men’s vs women’s looks). */
export const CLOTHING_PRESENTATIONS = [
  { id: "masculine", label: "Men", hint: "Men’s clothing & fits" },
  { id: "feminine", label: "Women", hint: "Women’s clothing & fits" },
  { id: "androgynous", label: "Either", hint: "More unisex looks" },
] as const;
export type ClothingPresentationId =
  (typeof CLOTHING_PRESENTATIONS)[number]["id"];

export interface StylePreferences {
  /** Men / women / either — required for shoppable looks. */
  presentation: ClothingPresentationId;
  favoriteColor: FavoriteColorId;
  bottomPreference: BottomPreferenceId;
  silhouette: SilhouettePreferenceId;
  vibe: StyleVibeId;
  budget: StyleBudgetId;
}

/** Bottoms shown for a clothing audience (men skip dresses/skirts). */
export function bottomsForPresentation(
  presentation: ClothingPresentationId | undefined,
): ReadonlyArray<(typeof BOTTOM_PREFERENCES)[number]> {
  if (presentation === "masculine") {
    return BOTTOM_PREFERENCES.filter(
      (b) => b.id === "jeans" || b.id === "trousers",
    );
  }
  return BOTTOM_PREFERENCES;
}

export interface StyleProfileView {
  preferences: StylePreferences;
  /** Vision signals filled later when full-body analyze ships */
  detectedSignals: string[];
  summary: string;
  estimateNote: string | null;
}

export type JourneyLookStatus =
  | "pending"
  | "generating_garment"
  | "garment_ready"
  | "generating_pose"
  | "generating_tryon"
  | "ready"
  | "failed";

export interface JourneyLook {
  id: string;
  index: number;
  label: string;
  status: JourneyLookStatus;
  fileId: string | null;
  /** Product still used for VTO (optional; garment→try-on pipeline). */
  garmentFileId?: string | null;
  /** InstantID posed body used as VTO person (optional). */
  poseFileId?: string | null;
  recommendedStyle: string;
  error: string | null;
}

export function isLookSettled(status: JourneyLookStatus): boolean {
  return status === "ready" || status === "failed";
}

export function isLookInFlight(status: JourneyLookStatus): boolean {
  return (
    status === "pending" ||
    status === "generating_garment" ||
    status === "garment_ready" ||
    status === "generating_pose" ||
    status === "generating_tryon"
  );
}

export interface AppearanceJourneyView {
  id: string;
  reportId: string;
  stage: AppearanceStage;
  pillars: AppearancePillars;
  stylePreferences: StylePreferences | null;
  styleProfile: StyleProfileView | null;
  looks: JourneyLook[];
  fullProfileComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

function avgMeasurable(
  features: ReportFeatures,
  keys: Exclude<FeatureKey, "photo_quality">[],
): { score: number | null; confidence: "High" | "Medium" | "Low"; measurable: boolean } {
  const packets: FeatureScore[] = [];
  for (const k of keys) {
    const p = features[k];
    if (p && p.measurable !== false) packets.push(p);
  }
  if (packets.length === 0) {
    return { score: null, confidence: "Low", measurable: false };
  }
  const score = Math.round(
    packets.reduce((a, p) => a + p.score, 0) / packets.length,
  );
  const highs = packets.filter((p) => p.confidence === "High").length;
  const lows = packets.filter((p) => p.confidence === "Low").length;
  const confidence =
    highs >= packets.length / 2
      ? "High"
      : lows >= packets.length / 2
        ? "Low"
        : "Medium";
  return { score, confidence, measurable: true };
}

function structureTips(features: ReportFeatures, score: number | null): string[] {
  const tips: string[] = [];
  if (score == null) {
    return ["Upload a clearer frontal face photo so structure can be measured."];
  }
  if (features.jawline_definition?.score < 70) {
    tips.push("Lighting from slightly above can sharpen how the jawline reads on camera.");
  }
  if (features.face_symmetry?.score < 70) {
    tips.push("Face the camera square-on — slight turns exaggerate asymmetry in photos.");
  }
  if (features.eyebrow_shape?.score < 70) {
    tips.push("Even brow grooming usually lifts how the upper face reads.");
  }
  if (tips.length === 0) {
    tips.push("Strong structure read — keep framing consistent when you recheck.");
  }
  return tips.slice(0, 3);
}

function groomingTips(features: ReportFeatures, score: number | null): string[] {
  const tips: string[] = [];
  if (score == null) {
    return ["Grooming needs a clearer face crop — soft front light helps skin + hair reads."];
  }
  if (features.skin_clarity?.measurable === false) {
    tips.push("Skin clarity was hard to read — try even daylight next time.");
  } else if (features.skin_clarity?.score < 70) {
    tips.push("A simple consistent skincare routine usually moves this pillar fastest.");
  }
  if (features.grooming_signal?.measurable === false) {
    tips.push(
      features.grooming_signal?.gateNote ??
        "Outfit/hair signal wasn’t clear enough — a mid-chest crop helps.",
    );
  } else if (features.grooming_signal?.score < 70) {
    tips.push("Hair finish and collar/neckline grooming often lift this score quickly.");
  }
  if (tips.length === 0) {
    tips.push("Grooming looks intentional — maintain the same finish on rechecks.");
  }
  return tips.slice(0, 3);
}

/** Roll Stage 1 features into Structure + Grooming pillars. */
export function computePillarsFromFeatures(
  features: ReportFeatures,
): AppearancePillars {
  const structureAvg = avgMeasurable(features, STRUCTURE_FEATURE_KEYS);
  const groomingAvg = avgMeasurable(features, GROOMING_FEATURE_KEYS);

  return {
    structure: {
      key: "structure",
      label: "Structure",
      score: structureAvg.score,
      confidence: structureAvg.confidence,
      featureKeys: STRUCTURE_FEATURE_KEYS,
      tips: structureTips(features, structureAvg.score),
      measurable: structureAvg.measurable,
    },
    grooming: {
      key: "grooming",
      label: "Grooming",
      score: groomingAvg.score,
      confidence: groomingAvg.confidence,
      featureKeys: GROOMING_FEATURE_KEYS,
      tips: groomingTips(features, groomingAvg.score),
      measurable: groomingAvg.measurable,
    },
    style: null,
  };
}

export function buildStyleProfileSummary(
  prefs: StylePreferences,
): StyleProfileView {
  const wardrobeLabel =
    prefs.presentation === "masculine"
      ? "Men's"
      : prefs.presentation === "androgynous"
        ? "Unisex"
        : "Women's";
  const color =
    FAVORITE_COLORS.find((c) => c.id === prefs.favoriteColor)?.label ??
    prefs.favoriteColor;
  const bottom =
    BOTTOM_PREFERENCES.find((b) => b.id === prefs.bottomPreference)?.label ??
    prefs.bottomPreference;
  const sil =
    SILHOUETTE_PREFERENCES.find((s) => s.id === prefs.silhouette)?.label ??
    prefs.silhouette;
  const vibe =
    STYLE_VIBES.find((v) => v.id === prefs.vibe)?.label ?? prefs.vibe;
  const budget =
    STYLE_BUDGETS.find((b) => b.id === prefs.budget)?.label ?? prefs.budget;

  return {
    preferences: prefs,
    detectedSignals: [],
    summary: `${wardrobeLabel} wardrobe — you lean ${vibe.toLowerCase()} with a ${sil.toLowerCase()} silhouette, favoring ${bottom.toLowerCase()} and ${color.toLowerCase()} tones — ${budget.toLowerCase()} spend.`,
    estimateNote:
      "Full-body measurements and outfit vision signals will refine this profile — preferences below are from your answers.",
  };
}

export const STAGE_LABELS: Record<AppearanceStage, string> = {
  face_reveal: "Face & Grooming",
  style_collect: "Style preferences",
  style_reveal: "Style Profile",
  prescription_reveal: "Your looks",
  complete: "Profile complete",
};

/** Full free-flow steps including upload (progress bar). */
export type JourneyFlowStepId =
  | "upload"
  | "face_reveal"
  | "style_collect"
  | "style_reveal"
  | "prescription_reveal";

export const JOURNEY_FLOW_STEPS: {
  id: JourneyFlowStepId;
  label: string;
  shortLabel: string;
}[] = [
  { id: "upload", label: "Upload photos", shortLabel: "Upload" },
  { id: "face_reveal", label: "Face & Grooming", shortLabel: "Face" },
  { id: "style_collect", label: "Style preferences", shortLabel: "Prefs" },
  { id: "style_reveal", label: "Style Profile", shortLabel: "Style" },
  {
    id: "prescription_reveal",
    label: "Prescribed looks",
    shortLabel: "Looks",
  },
];

export function journeyStepIndex(
  step: JourneyFlowStepId | "complete",
): number {
  if (step === "complete") return JOURNEY_FLOW_STEPS.length;
  return JOURNEY_FLOW_STEPS.findIndex((s) => s.id === step);
}

/**
 * Overall 0–100 progress.
 * `withinStep` is 0–1 fraction of the current step (e.g. photos accepted).
 */
export function journeyProgressPercent(
  current: JourneyFlowStepId | "complete",
  withinStep = 0,
): number {
  const total = JOURNEY_FLOW_STEPS.length;
  if (current === "complete") return 100;
  const index = journeyStepIndex(current);
  if (index < 0) return 0;
  const clamped = Math.min(1, Math.max(0, withinStep));
  return Math.round(((index + clamped) / total) * 100);
}

export function appearanceStageToFlowStep(
  stage: AppearanceStage,
): JourneyFlowStepId | "complete" {
  if (stage === "complete") return "complete";
  return stage;
}
