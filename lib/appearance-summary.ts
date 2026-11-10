import { isFeatureMeasurable } from "@/lib/score-tone";
import type { FeatureKey, ReportViewModel } from "@/lib/types/report";
import { FEATURE_LABELS, SCORED_APPEARANCE_KEYS } from "@/lib/types/report";
import { matchSeedForReport } from "@/lib/celebrity-match";

function listLabels(keys: FeatureKey[]): string {
  const labels = keys.map((k) => FEATURE_LABELS[k].toLowerCase());
  if (labels.length === 0) return "";
  if (labels.length === 1) return labels[0]!;
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

/**
 * Strengths-first appearance summary for the report UI.
 * Free: short preview of what already works.
 * Pro: full write-up with light accent notes (never a flaw list).
 */
export function buildAppearanceSummary(report: ReportViewModel): {
  title: string;
  preview: string[];
  full: string[];
} {
  const measurable = SCORED_APPEARANCE_KEYS.filter((k) =>
    isFeatureMeasurable(report.features[k]?.measurable),
  );
  const ranked = [...measurable].sort(
    (a, b) =>
      (report.features[b]?.score ?? 0) - (report.features[a]?.score ?? 0),
  );
  const top = ranked.slice(0, Math.min(2, ranked.length));
  const accent = ranked
    .filter((k) => (report.features[k]?.score ?? 0) < 70)
    .sort(
      (a, b) =>
        (report.features[a]?.score ?? 0) - (report.features[b]?.score ?? 0),
    )
    .slice(0, 2);
  const skipped = SCORED_APPEARANCE_KEYS.filter(
    (k) => !isFeatureMeasurable(report.features[k]?.measurable),
  );

  const opener =
    "This pass stays private — you versus you. We lead with what already reads well on your photos, then suggest light ways to accentuate it.";
  const strengths =
    top.length === 0
      ? "We need a clearer frontal photo to map strengths next time. When the mesh reads cleanly, the zoom sequence gets more specific."
      : `What’s already working: ${listLabels(top)}. Those are the cleanest signals in this set — good anchors for framing, color, and hair.`;

  const preview = [opener, strengths];
  const full = [...preview];

  if (accent.length > 0) {
    full.push(
      `Light accent notes around ${listLabels(accent)} are optional and low-effort — think emphasis, not overhaul. Open the strengths zooms on your portrait for the close-up version.`,
    );
  } else if (measurable.length > 0) {
    full.push(
      "Nothing here needs a heavy hand. Keep lighting and angle similar when you re-upload so progress looks like progress.",
    );
  }

  if (skipped.includes("grooming_signal")) {
    full.push(
      "Grooming finish wasn’t clear in this frame. A slightly wider shot next time lets that signal join the strengths read.",
    );
  }

  const priorities = (report.priorityFeatures ?? []).filter((k) =>
    measurable.includes(k),
  );
  if (priorities.length > 0) {
    full.push(
      `You flagged ${listLabels(priorities)} as personal priorities. We keep those in view when we order accent tips — scores stay as measured.`,
    );
  }

  return {
    title: "Strengths summary",
    preview,
    full,
  };
}

function fnv1a(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Short observational presentation blurb for the face breakdown.
 * Soft, style-oriented language — not a medical or demographic claim.
 */
export function appearanceSummaryFor(report: ReportViewModel): string {
  const seed = matchSeedForReport(report);
  const h = fnv1a(seed);
  const skin = report.features.skin_clarity?.score ?? 70;
  const eyes = report.features.eye_spacing?.observedSignal;
  const brows = report.features.eyebrow_shape?.observedSignal;
  const jaw = report.features.jawline_definition?.observedSignal;

  const ageBands = [
    "early 20s",
    "mid 20s",
    "late 20s",
    "early 30s",
    "mid 30s",
  ] as const;
  const hair = [
    "short, face-framing hair",
    "mid-length hair",
    "shoulder-length hair",
    "longer hair with soft volume",
  ] as const;
  const eyeTone = [
    "soft dark eyes",
    "warm brown eyes",
    "light eyes",
    "clear, open eyes",
  ] as const;
  const build = [
    "a slender build",
    "a fine-boned frame",
    "a balanced, lean frame",
    "a soft, light frame",
  ] as const;

  const age = ageBands[h % ageBands.length]!;
  const hairLine = hair[(h >>> 3) % hair.length]!;
  const eyeLine = eyeTone[(h >>> 7) % eyeTone.length]!;
  const buildLine = build[(h >>> 11) % build.length]!;
  const skinLine =
    skin >= 78
      ? "clear-looking skin"
      : skin >= 62
        ? "soft, even-looking skin"
        : "natural skin texture that photographs honestly";

  const extras: string[] = [];
  if (brows?.trim()) extras.push("brows that frame the upper face");
  if (jaw?.trim()) extras.push("a defined lower-face line");
  if (eyes?.trim() && extras.length < 2)
    extras.push("eyes that read clearly in frame");

  const extra =
    extras.length > 0 ? `, with ${extras.slice(0, 2).join(" and ")}` : "";

  return `From these photos: a young-looking woman who reads in her ${age}, with ${hairLine}, ${eyeLine}, ${skinLine}, and ${buildLine}${extra}.`;
}
