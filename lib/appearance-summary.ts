import { isFeatureMeasurable } from "@/lib/score-tone";
import type { FeatureKey, ReportViewModel } from "@/lib/types/report";
import { FEATURE_LABELS, SCORED_APPEARANCE_KEYS } from "@/lib/types/report";

function bandFor(score: number): "strong" | "steady" | "soft" {
  if (score >= 75) return "strong";
  if (score >= 60) return "steady";
  return "soft";
}

function vibeLine(score: number): string {
  if (score >= 80) {
    return "Honestly? This is a strong read. Most of what we measured is holding up.";
  }
  if (score >= 70) {
    return "Overall you're in a good place. A few things look solid, a couple deserve a second look.";
  }
  if (score >= 60) {
    return "It's a mixed bag in a useful way. Some stuff is already working. Some stuff is softer.";
  }
  return "There's a clear shortlist of things to work on. Not a roast. Just where the signals got quieter.";
}

function listLabels(keys: FeatureKey[]): string {
  const labels = keys.map((k) => FEATURE_LABELS[k].toLowerCase());
  if (labels.length === 0) return "";
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

/**
 * Conversational appearance summary for the report UI.
 * Free: short preview only (composite + strongest cues).
 * Paid/pro: full write-up including softer spots, gates, and focus notes.
 */
export function buildAppearanceSummary(report: ReportViewModel): {
  title: string;
  /** Safe for free tier — no weak-feature spoiler detail. */
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

  const strong = ranked.filter(
    (k) => bandFor(report.features[k].score) === "strong",
  );
  const soft = ranked.filter(
    (k) => bandFor(report.features[k].score) === "soft",
  );
  const top = ranked.slice(0, Math.min(2, ranked.length));
  const weak = [...measurable]
    .filter((k) => report.features[k].score < 70)
    .sort((a, b) => report.features[a].score - report.features[b].score)
    .slice(0, 2);

  const skipped = SCORED_APPEARANCE_KEYS.filter(
    (k) => !isFeatureMeasurable(report.features[k].measurable),
  );

  const opener = `Your composite landed at ${report.overallScore}/100. ${vibeLine(report.overallScore)} Reminder: this is not an attractiveness score, and nobody else is in this comparison.`;

  let strengths: string;
  if (top.length === 0) {
    strengths =
      "We couldn't get a clean enough read this round. Next time, try clearer front-facing shots and we'll have more to work with.";
  } else if (strong.length >= 2) {
    strengths = `What's popping first: ${listLabels(top)}. Those are your cleanest signals in this photo. Good anchors if you re-upload later.`;
  } else if (strong.length === 1) {
    strengths = `Your strongest moment is ${FEATURE_LABELS[strong[0]].toLowerCase()} at ${report.features[strong[0]].score}/100.${
      top[1]
        ? ` ${FEATURE_LABELS[top[1]].toLowerCase()} is right behind it.`
        : " Everything else is more mixed, which actually helps you know where to focus."
    }`;
  } else {
    strengths = `Nothing is screaming "perfect," but ${listLabels(top)} are leading right now. Lean on those while you tidy up the softer scores.`;
  }

  const preview = [opener, strengths];

  const full = [...preview];

  if (weak.length > 0) {
    full.push(
      `The softer spots are mostly ${listLabels(weak)}. Each one has a real signal behind it plus a next step, so you're not left guessing. Tap the dots on your portrait if you want the close-up version.`,
    );
  } else if (soft.length === 0 && measurable.length > 0) {
    full.push(
      "Nothing here is sitting in a clearly weak zone. When you re-upload, keep the lighting and angle similar so change looks like change, not a photo accident.",
    );
  }

  if (skipped.includes("grooming_signal")) {
    full.push(
      "We skipped grooming this time. Your outfit wasn't clear enough in the frame. Wider shot next round and that signal can join the party.",
    );
  }

  const priorities = (report.priorityFeatures ?? []).filter((k) =>
    measurable.includes(k),
  );
  if (priorities.length > 0) {
    full.push(
      `You flagged ${listLabels(priorities)} as the stuff you care about most. We didn't change those scores. We just bump them up when we rank what to do next.`,
    );
  }

  return {
    title: "Appearance summary",
    preview,
    full,
  };
}
