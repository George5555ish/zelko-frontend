/**
 * Strengths-first presentation model — zooms + notes on real photos.
 * Free: fixed 4-slide sequence + summary. Pro: full ranked sequence.
 */

import { isFeatureMeasurable } from "@/lib/score-tone";
import type {
  FeatureKey,
  FeatureOverlayPoint,
  ReportViewModel,
} from "@/lib/types/report";
import { FEATURE_LABELS, SCORED_APPEARANCE_KEYS } from "@/lib/types/report";

export type StrengthRegionId =
  | "eyes"
  | "brows"
  | "jaw"
  | "hair"
  | "skin"
  | "detail"
  | "face_shape";

export type PresentationGender = "woman" | "man";

export interface StrengthDot {
  id: string;
  /** Normalized image coords 0–1 */
  x: number;
  y: number;
}

export interface StrengthZoom {
  id: StrengthRegionId;
  label: string;
  /** Short positive note (1–2 sentences). */
  note: string;
  /** Practical accent tip — never framed as a flaw. */
  accentTip: string | null;
  /** Feature keys that power this zoom (for ranking). */
  featureKeys: Exclude<FeatureKey, "photo_quality">[];
  /** Relative strength 0–100 for ordering (internal only). */
  strength: number;
  dots: StrengthDot[];
  /** Zoom focus as normalized center + scale. */
  focus: { x: number; y: number; scale: number };
}

export interface StyleDirection {
  neckline: {
    type: string;
    reason: string;
    tiedTo: StrengthRegionId;
  };
  palette: { hex: string; label: string }[];
  hairFraming: {
    suggestion: string;
    tiedTo: StrengthRegionId;
  };
  nextStep: string;
}

/** Free-tier summary after the 4 strength slides. */
export interface StrengthsSummary {
  /** Trait phrases used to compose the observation line. */
  traits: {
    faceShape: string;
    skinTone: string;
    hair: string;
    eyeLead: string | null;
  };
  /**
   * Only true when a strong, consistent early-adult signal exists.
   * Without a dedicated detector we keep this false (omit age language).
   */
  youngSignal: boolean;
  /** Gender only when confidently known — otherwise null; UI can correct. */
  suggestedGender: PresentationGender | null;
  /** One-line persona, e.g. "Eye-forward with even skin tone". */
  persona: string;
  /** Exactly two concrete style rules. */
  styleRules: [string, string];
}

export interface StrengthsPresentationModel {
  /** Fixed free sequence — always length 4. */
  freeZooms: StrengthZoom[];
  /** Full ranked zooms for Pro. */
  zooms: StrengthZoom[];
  freeZoomCount: number;
  faceShape: StrengthZoom;
  style: StyleDirection;
  overallLead: string;
  summary: StrengthsSummary;
}

const FREE_ZOOM_COUNT = 4;
const FREE_ORDER: StrengthRegionId[] = ["skin", "eyes", "jaw", "detail"];

type RegionDef = {
  id: StrengthRegionId;
  label: string;
  features: Exclude<FeatureKey, "photo_quality">[];
  overlayIds: string[];
  scale: number;
  notes: (score: number, signal: string) => { note: string; tip: string | null };
};

const REGION_DEFS: RegionDef[] = [
  {
    id: "skin",
    label: "Skin & undertone",
    features: ["skin_clarity", "grooming_signal"],
    overlayIds: ["cheek_l", "cheek_r", "nose"],
    scale: 2.0,
    notes: (score, signal) => {
      if (score >= 70) {
        return {
          note: `Skin texture and tone read evenly here. ${trimSignal(signal)} A sheer finish lets structure and eyes stay the story.`,
          tip: "Skip heavy coverage where clarity is already a strength.",
        };
      }
      return {
        note: `Skin reads best with even light and a natural finish. ${trimSignal(signal)} Hydration and a tinted moisturizer are enough.`,
        tip: "Match foundation depth to the jaw, not the brighter center of the face.",
      };
    },
  },
  {
    id: "eyes",
    label: "Eyes",
    features: ["eye_spacing", "eyebrow_shape"],
    overlayIds: ["eye_l", "eye_r", "brow_l", "brow_r"],
    scale: 2.35,
    notes: (_score, signal) => ({
      note: `Your eyes are the natural focal point. ${trimSignal(signal)} Soft emphasis along the outer corner or brow arch keeps attention here.`,
      tip: "Keep the rest of the face quieter so the eyes stay the lead.",
    }),
  },
  {
    id: "jaw",
    label: "Jaw / neck framing",
    features: ["jawline_definition", "face_symmetry"],
    overlayIds: ["jaw_l", "jaw_r", "chin"],
    scale: 1.85,
    notes: (_score, signal) => ({
      note: `Jaw and neck framing read clearly in this light. ${trimSignal(signal)} Open or soft necklines keep that structure visible.`,
      tip: "Avoid high, closed collars when you want this contour to show.",
    }),
  },
  {
    id: "brows",
    label: "Brows & upper face",
    features: ["eyebrow_shape"],
    overlayIds: ["brow_l", "brow_r"],
    scale: 2.2,
    notes: (score, signal) => {
      if (score >= 70) {
        return {
          note: `Brow shape frames the upper face cleanly. ${trimSignal(signal)} Keeping the arch soft lets your eye read stay front and center.`,
          tip: "Brush through and fill only sparse spots — structure is already there.",
        };
      }
      return {
        note: `Brows set the stage for the upper face. ${trimSignal(signal)} A light fill and tidy edge is enough to support your eye focus.`,
        tip: "Match brow softness to how bold you want the eyes to feel.",
      };
    },
  },
  {
    id: "hair",
    label: "Hair framing",
    features: ["facial_proportions", "eyebrow_shape"],
    overlayIds: ["brow_l", "brow_r", "sym_l", "sym_r"],
    scale: 1.55,
    notes: () => ({
      note: "Hair that opens the forehead and temples keeps your strongest features in view. Soft face-framing pieces complement without covering the lead.",
      tip: "Part slightly off-center if you want more cheek and eye emphasis.",
    }),
  },
];

function trimSignal(signal: string): string {
  const s = signal?.trim();
  if (!s || s.length < 8) return "";
  const clipped = s.length > 90 ? `${s.slice(0, 87)}…` : s;
  return clipped.endsWith(".") ? clipped : `${clipped}.`;
}

function avgScore(
  report: ReportViewModel,
  keys: Exclude<FeatureKey, "photo_quality">[],
): number {
  const usable = keys.filter((k) =>
    isFeatureMeasurable(report.features[k]?.measurable),
  );
  if (usable.length === 0) return 55;
  return Math.round(
    usable.reduce((a, k) => a + (report.features[k]?.score ?? 55), 0) /
      usable.length,
  );
}

function primarySignal(
  report: ReportViewModel,
  keys: Exclude<FeatureKey, "photo_quality">[],
): string {
  for (const k of keys) {
    const p = report.features[k];
    if (p && isFeatureMeasurable(p.measurable) && p.observedSignal) {
      return p.observedSignal;
    }
  }
  return "";
}

function overlayMap(
  overlays: FeatureOverlayPoint[] | undefined,
): Map<string, FeatureOverlayPoint> {
  const m = new Map<string, FeatureOverlayPoint>();
  for (const o of overlays ?? []) m.set(o.id, o);
  return m;
}

function dotsFor(
  map: Map<string, FeatureOverlayPoint>,
  ids: string[],
  max = 3,
): StrengthDot[] {
  const dots: StrengthDot[] = [];
  for (const id of ids) {
    const o = map.get(id);
    if (o) dots.push({ id: o.id, x: o.x, y: o.y });
    if (dots.length >= max) break;
  }
  return dots;
}

function focusFromDots(
  dots: StrengthDot[],
  fallback: { x: number; y: number },
  scale: number,
): StrengthZoom["focus"] {
  if (dots.length === 0) return { ...fallback, scale };
  const x = dots.reduce((a, d) => a + d.x, 0) / dots.length;
  const y = dots.reduce((a, d) => a + d.y, 0) / dots.length;
  return { x, y, scale };
}

function buildZoom(
  def: RegionDef,
  report: ReportViewModel,
  map: Map<string, FeatureOverlayPoint>,
): StrengthZoom {
  const strength = avgScore(report, def.features);
  const signal = primarySignal(report, def.features);
  const { note, tip } = def.notes(strength, signal);
  const dots = dotsFor(map, def.overlayIds, def.id === "eyes" ? 3 : 3);
  const fallback =
    def.id === "hair"
      ? { x: 0.5, y: 0.22 }
      : def.id === "eyes"
        ? { x: 0.5, y: 0.34 }
        : def.id === "brows"
          ? { x: 0.5, y: 0.28 }
          : def.id === "jaw"
            ? { x: 0.5, y: 0.74 }
            : { x: 0.5, y: 0.48 };
  return {
    id: def.id,
    label: def.label,
    note,
    accentTip: tip,
    featureKeys: def.features,
    strength,
    dots,
    focus: focusFromDots(dots, fallback, def.scale),
  };
}

/** Fine-detail slide: hair framing, cheek, or lip-adjacent complement. */
function buildDetailZoom(
  report: ReportViewModel,
  map: Map<string, FeatureOverlayPoint>,
  hairZoom: StrengthZoom | undefined,
): StrengthZoom {
  const cheekDots = dotsFor(map, ["cheek_l", "cheek_r", "sym_l"], 2);
  const hairDots = dotsFor(map, ["brow_l", "sym_l", "sym_r"], 2);
  const skin = avgScore(report, ["skin_clarity"]);
  const proportions = avgScore(report, ["facial_proportions"]);

  if (proportions >= skin && (hairZoom || hairDots.length > 0)) {
    return {
      id: "detail",
      label: "Hair framing",
      note: "How your hair sits around the face softens the frame without competing with your lead features — a quiet complement.",
      accentTip: null,
      featureKeys: ["facial_proportions", "eyebrow_shape"],
      strength: proportions,
      dots: hairDots.length > 0 ? hairDots : (hairZoom?.dots.slice(0, 2) ?? []),
      focus: focusFromDots(
        hairDots.length > 0 ? hairDots : (hairZoom?.dots ?? []),
        { x: 0.5, y: 0.24 },
        1.55,
      ),
    };
  }

  return {
    id: "detail",
    label: "Cheek detail",
    note: "A soft cheek read adds quiet polish next to your stronger focal points — keep it light so the lead stays clear.",
    accentTip: null,
    featureKeys: ["skin_clarity", "face_symmetry"],
    strength: skin,
    dots: cheekDots,
    focus: focusFromDots(cheekDots, { x: 0.5, y: 0.48 }, 2.05),
  };
}

function faceShapeZoom(report: ReportViewModel): StrengthZoom {
  const score = avgScore(report, [
    "facial_proportions",
    "jawline_definition",
    "face_symmetry",
  ]);
  const signal = primarySignal(report, [
    "facial_proportions",
    "jawline_definition",
  ]);
  const note =
    score >= 72
      ? `Overall face shape reads balanced and intentional. ${trimSignal(signal)} Lean into necklines and hair that keep that silhouette visible.`
      : `Your face shape gives a clear silhouette to style around. ${trimSignal(signal)} Soft open necklines help the proportions you already have show up cleanly.`;
  return {
    id: "face_shape",
    label: "Face shape",
    note,
    accentTip: "Think accentuation, not overhaul — small framing choices go further.",
    featureKeys: ["facial_proportions", "jawline_definition", "face_symmetry"],
    strength: score,
    dots: [],
    focus: { x: 0.5, y: 0.42, scale: 1.15 },
  };
}

function buildStyleDirection(
  report: ReportViewModel,
  topRegion: StrengthRegionId,
): StyleDirection {
  const jaw = avgScore(report, ["jawline_definition"]);
  const eyes = avgScore(report, ["eye_spacing"]);
  const neckline =
    jaw >= 68
      ? {
          type: "Open scoop or soft V",
          reason:
            "Keeps the jaw and neck contour visible so structure stays in the frame.",
          tiedTo: "jaw" as StrengthRegionId,
        }
      : {
          type: "Soft V or open crew",
          reason:
            "Opens the neckline enough to support face focus without competing with your eye lead.",
          tiedTo: (eyes >= jaw ? "eyes" : "jaw") as StrengthRegionId,
        };

  const palette = [
    { hex: "#1a1a1a", label: "Near black" },
    { hex: "#5c4a3a", label: "Warm cocoa" },
    { hex: "#c4a484", label: "Soft camel" },
    { hex: "#e8d5c4", label: "Warm ivory" },
    { hex: "#6b7c8a", label: "Muted slate" },
  ];

  const hairFraming =
    topRegion === "eyes" || topRegion === "brows"
      ? {
          suggestion:
            "Keep hair off the brow and temples so eye strength stays unobstructed. Soft pieces beside the cheekbones are fine.",
          tiedTo: topRegion,
        }
      : {
          suggestion:
            "Face-framing length that clears the jaw helps structure read in photos. Avoid a heavy center fringe that covers brows.",
          tiedTo: "jaw" as StrengthRegionId,
        };

  return {
    neckline,
    palette,
    hairFraming,
    nextStep:
      topRegion === "eyes"
        ? "One low-effort step: define lashes or brows lightly before your next photo — then keep everything else simple."
        : "One low-effort step: choose an open neckline for your next clear photo so your strongest structure stays visible.",
  };
}

function matchPhrase(
  text: string,
  patterns: { re: RegExp; phrase: string }[],
  fallback: string,
): string {
  const t = text.toLowerCase();
  for (const p of patterns) {
    if (p.re.test(t)) return p.phrase;
  }
  return fallback;
}

function buildSummary(
  report: ReportViewModel,
  freeZooms: StrengthZoom[],
  style: StyleDirection,
): StrengthsSummary {
  const propSignal = primarySignal(report, ["facial_proportions"]);
  const skinSignal = primarySignal(report, ["skin_clarity"]);
  const eyeScore = avgScore(report, ["eye_spacing"]);
  const skinScore = avgScore(report, ["skin_clarity"]);

  const faceShape = matchPhrase(
    propSignal,
    [
      { re: /oval/, phrase: "an oval face" },
      { re: /heart/, phrase: "a heart-shaped face" },
      { re: /round/, phrase: "a round face" },
      { re: /square|angular/, phrase: "a structured face" },
      { re: /long|oblong|rectangular/, phrase: "a long face" },
      { re: /diamond/, phrase: "a diamond-shaped face" },
    ],
    "balanced facial proportions",
  );

  const skinTone = matchPhrase(
    skinSignal,
    [
      { re: /even.*(?:light|fair)/, phrase: "even light skin tone" },
      { re: /(?:light|fair).*(?:even|clear)/, phrase: "even light skin tone" },
      { re: /even.*(?:medium|olive)/, phrase: "even medium skin tone" },
      { re: /(?:medium|olive).*(?:even|clear)/, phrase: "even medium skin tone" },
      { re: /even.*(?:deep|dark)/, phrase: "even deep skin tone" },
      { re: /(?:deep|dark).*(?:even|clear)/, phrase: "even deep skin tone" },
      { re: /even|clear|smooth/, phrase: "even skin tone" },
    ],
    skinScore >= 65 ? "even skin tone" : "natural skin tone",
  );

  const detail = freeZooms.find((z) => z.id === "detail");
  const hair =
    detail?.id === "detail" && detail.label === "Hair framing"
      ? "face-framing hair"
      : matchPhrase(
          propSignal + " " + skinSignal,
          [
            { re: /face[- ]?fram/, phrase: "face-framing hair" },
            { re: /short hair|cropped/, phrase: "short hair" },
            { re: /long hair/, phrase: "long hair" },
          ],
          "soft hair framing",
        );

  const eyeLead =
    eyeScore >= 62 ? "eyes that read as a clear focal point" : null;

  let persona: string;
  if (eyeScore >= skinScore && eyeScore >= 62) {
    persona =
      skinScore >= 65
        ? "Eye-forward with even skin tone"
        : "Eye-forward with soft framing";
  } else if (skinScore >= 65) {
    persona = "Even-skin lead with quiet structure";
  } else {
    persona = "Structure-forward with soft framing";
  }

  const colorRule =
    style.palette[1]?.label != null
      ? `Lean ${style.palette[1].label.toLowerCase()}–${style.palette[2]?.label.toLowerCase() ?? "neutral"} for color`
      : "Lean warm neutrals for color";

  return {
    traits: { faceShape, skinTone, hair, eyeLead },
    youngSignal: false,
    suggestedGender: null,
    persona,
    styleRules: [
      `${style.neckline.type} neckline`,
      colorRule,
    ],
  };
}

/**
 * Compose the one-sentence observation line.
 * Gender is optional and user-correctable; "young" only when youngSignal is true.
 */
export function formatObservationLine(
  summary: StrengthsSummary,
  gender: PresentationGender | null,
): string {
  const { faceShape, skinTone, hair } = summary.traits;
  const traits = [faceShape, skinTone, `and ${hair}`];

  if (gender) {
    const age = summary.youngSignal ? "young " : "";
    const subject = `${age}${gender}`;
    if (faceShape.startsWith("a ") || faceShape.startsWith("an ")) {
      return `${capitalize(subject)} with ${faceShape}, ${skinTone}, and ${hair}.`;
    }
    return `${capitalize(subject)} with ${traits.join(", ")}.`;
  }

  // No gender — trait-only sentence (examples omit age/gender).
  if (faceShape.startsWith("a ") || faceShape.startsWith("an ")) {
    return `${capitalize(faceShape)}, ${skinTone}, ${hair}.`;
  }
  return `${capitalize(faceShape)}, ${skinTone}, ${hair}.`;
}

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Build ordered strength zooms from report scores + landmark overlays.
 */
export function buildStrengthsPresentation(
  report: ReportViewModel,
): StrengthsPresentationModel {
  const map = overlayMap(report.featureOverlays);
  const byId = new Map<StrengthRegionId, StrengthZoom>();

  for (const def of REGION_DEFS) {
    byId.set(def.id, buildZoom(def, report, map));
  }

  const detail = buildDetailZoom(report, map, byId.get("hair"));
  byId.set("detail", detail);

  const freeZooms = FREE_ORDER.map((id) => {
    const z = byId.get(id);
    if (!z) throw new Error(`Missing free zoom: ${id}`);
    return z;
  });

  // Pro: ranked measurable regions (exclude synthetic detail duplicate of hair).
  const zooms = ["skin", "eyes", "jaw", "brows", "hair"]
    .map((id) => byId.get(id as StrengthRegionId)!)
    .filter(Boolean)
    .sort((a, b) => b.strength - a.strength);

  const faceShape = faceShapeZoom(report);
  const top = freeZooms.find((z) => z.id === "eyes")?.strength ?? 0;
  const topRegion: StrengthRegionId =
    top >= avgScore(report, ["jawline_definition"]) ? "eyes" : "jaw";
  const style = buildStyleDirection(report, topRegion);
  const summary = buildSummary(report, freeZooms, style);

  return {
    freeZooms,
    zooms,
    freeZoomCount: FREE_ZOOM_COUNT,
    faceShape,
    style,
    overallLead:
      "Four short zooms on your real photo — what already works, then a tight framing summary.",
    summary,
  };
}

export function strengthRegionFeatureLabel(
  key: Exclude<FeatureKey, "photo_quality">,
): string {
  return FEATURE_LABELS[key];
}

/** Ranked measurable features for a collapsed “details” panel (not the main story). */
export function measurementDetails(report: ReportViewModel): {
  key: FeatureKey;
  label: string;
  score: number;
}[] {
  return SCORED_APPEARANCE_KEYS.filter((k) =>
    isFeatureMeasurable(report.features[k]?.measurable),
  )
    .map((key) => ({
      key,
      label: FEATURE_LABELS[key],
      score: Math.round(report.features[key].score),
    }))
    .sort((a, b) => b.score - a.score);
}
