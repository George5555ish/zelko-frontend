import type { ReportViewModel } from "@/lib/types/report";
import { matchSeedForReport } from "@/lib/celebrity-match";

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
  if (eyes?.trim() && extras.length < 2) extras.push("eyes that read clearly in frame");

  const extra =
    extras.length > 0 ? `, with ${extras.slice(0, 2).join(" and ")}` : "";

  return `From these photos: a young-looking woman who reads in her ${age}, with ${hairLine}, ${eyeLine}, ${skinLine}, and ${buildLine}${extra}.`;
}
