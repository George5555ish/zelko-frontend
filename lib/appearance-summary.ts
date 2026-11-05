import { isFeatureMeasurable } from "@/lib/score-tone";
import type { FeatureKey, ReportViewModel } from "@/lib/types/report";
import { FEATURE_LABELS, SCORED_APPEARANCE_KEYS } from "@/lib/types/report";

function listLabels(keys: FeatureKey[]): string {
  const labels = keys.map((k) => FEATURE_LABELS[k].toLowerCase());
  if (labels.length === 0) return "";
  if (labels.length === 1) return labels[0];
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
  /** Safe for free tier — leads with strengths only. */
  preview: string[];
  /** Full summary for paid/pro members. */
  full: string[];
} {
  const measurable = SCORED_APPEARANCE_KEYS.filter((k) =>
    isFeatureMeasurable(report.features[k].measurable),
  );
  const ranked = [...measurable].sort(
    (a, b) => report.features[b].score - report.features[a].score,
  );

  const top = ranked.slice(0, Math.min(2, ranked.length));
  const accent = ranked
    .filter((k) => report.features[k].score < 70)
    .sort((a, b) => report.features[a].score - report.features[b].score)
    .slice(0, 2);

  const skipped = SCORED_APPEARANCE_KEYS.filter(
    (k) => !isFeatureMeasurable(report.features[k].measurable),
  );

  const opener =
    "This pass stays private — you versus you. We lead with what already reads well on your photos, then suggest light ways to accentuate it.";

  let strengths: string;
  if (top.length === 0) {
    strengths =
      "We need a clearer frontal photo to map strengths next time. When the mesh reads cleanly, the zoom sequence gets more specific.";
  } else {
    strengths = `What’s already working: ${listLabels(top)}. Those are the cleanest signals in this set — good anchors for framing, color, and hair.`;
  }

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
