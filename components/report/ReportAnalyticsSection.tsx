"use client";

import {
  FEATURE_LABELS,
  SCORED_APPEARANCE_KEYS,
  type FeatureKey,
  type ReportViewModel,
} from "@/lib/types/report";
import { isFeatureMeasurable } from "@/lib/score-tone";

/**
 * Premium analytics strip for the report — same visual language as the
 * landing analytic cards, driven by the user's measured scores.
 */

export function ReportAnalyticsSection({
  report,
  isUnlocked,
}: {
  report: ReportViewModel;
  isUnlocked: (key: FeatureKey) => boolean;
}) {
  const clarity = report.features.skin_clarity;
  const symmetry = report.features.face_symmetry;
  const proportions = report.features.facial_proportions;
  const eyes = report.features.eye_spacing;
  const brows = report.features.eyebrow_shape;
  const jaw = report.features.jawline_definition;

  const radarKeys: FeatureKey[] = [
    "skin_clarity",
    "face_symmetry",
    "facial_proportions",
    "jawline_definition",
    "eye_spacing",
    "eyebrow_shape",
  ];

  const radarScales = radarKeys.map((k) => {
    if (!isUnlocked(k) || !isFeatureMeasurable(report.features[k].measurable)) {
      return 0.35;
    }
    return Math.max(0.2, Math.min(1, report.features[k].score / 100));
  });

  const rankedBars = SCORED_APPEARANCE_KEYS.filter((k) =>
    isFeatureMeasurable(report.features[k].measurable),
  )
    .map((k) => ({
      key: k,
      label: FEATURE_LABELS[k],
      score: report.features[k].score,
      unlocked: isUnlocked(k),
    }))
    .sort((a, b) => b.score - a.score);

  // Facial thirds: balanced ideal ~0.33; skew slightly from proportions score.
  const prop = proportions.score / 100;
  const drift = (0.5 - prop) * 0.08;
  const thirds = [
    { label: "Upper", value: 0.33 + drift * 0.4, fill: 0.55 + prop * 0.35 },
    { label: "Middle", value: 0.34 - drift * 0.2, fill: 0.6 + prop * 0.3 },
    { label: "Lower", value: 0.33 - drift * 0.2, fill: 0.52 + prop * 0.35 },
  ];

  const symTracks = [
    {
      label: "Eyes",
      pos: isUnlocked("eye_spacing") ? eyes.score / 100 : 0.45,
      locked: !isUnlocked("eye_spacing"),
    },
    {
      label: "Brows",
      pos: isUnlocked("eyebrow_shape") ? brows.score / 100 : 0.45,
      locked: !isUnlocked("eyebrow_shape"),
    },
    {
      label: "Jaw",
      pos: isUnlocked("jawline_definition") ? jaw.score / 100 : 0.45,
      locked: !isUnlocked("jawline_definition"),
    },
  ];

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 pb-10 md:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/40">
            Analytic views
          </p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            How your signals read
          </h2>
        </div>
        <p className="max-w-sm text-xs leading-relaxed text-white/40">
          Same chart language as the product preview — now filled with your
          measured scores.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {/* Facial thirds */}
        <div
          className="report-glass report-chart-enter rounded-3xl p-4 text-white sm:p-5"
          style={{ animationDelay: "40ms" }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
            Facial thirds
          </p>
          <p className="mt-1 text-xs text-white/35">
            Proportion balance ·{" "}
            {isUnlocked("facial_proportions")
              ? proportions.score
              : "locked"}
          </p>
          <div className="mt-4 space-y-2.5">
            {thirds.map((row) => (
              <div key={row.label}>
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-[11px] text-white/55">{row.label}</span>
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      isUnlocked("facial_proportions")
                        ? "text-white/85"
                        : "blur-sm select-none text-white/40"
                    }`}
                  >
                    {row.value.toFixed(2)}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-white/50 to-white/85"
                    style={{
                      width: isUnlocked("facial_proportions")
                        ? `${row.fill * 100}%`
                        : "28%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skin clarity distribution */}
        <div
          className="report-glass report-chart-enter rounded-3xl p-4 text-white sm:p-5"
          style={{ animationDelay: "100ms" }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
            Skin clarity
          </p>
          <svg viewBox="0 0 160 72" className="mt-2 w-full" aria-hidden>
            <defs>
              <linearGradient id="reportDistFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(226,232,240,0.35)" />
                <stop offset="100%" stopColor="rgba(226,232,240,0)" />
              </linearGradient>
            </defs>
            <path
              d="M8 62 C 28 60, 40 18, 80 16 C 120 14, 132 52, 152 62"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.4"
            />
            <path
              d="M80 16 C 100 15, 118 40, 132 54 L 132 62 L 80 62 Z"
              fill="url(#reportDistFill)"
            />
            {isUnlocked("skin_clarity") ? (
              <line
                x1={16 + (clarity.score / 100) * 128}
                y1="12"
                x2={16 + (clarity.score / 100) * 128}
                y2="62"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            ) : null}
          </svg>
          <div className="mt-1 flex items-end justify-between">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white/75"
                style={{
                  width: isUnlocked("skin_clarity")
                    ? `${clarity.score}%`
                    : "30%",
                }}
              />
            </div>
            <span
              className={`ml-3 font-mono text-lg font-semibold tabular-nums ${
                isUnlocked("skin_clarity")
                  ? "text-white"
                  : "blur-sm select-none text-white/40"
              }`}
            >
              {isUnlocked("skin_clarity") ? clarity.score : "72"}
            </span>
          </div>
          <p className="mt-1 text-[10px] text-white/40">
            Confidence ·{" "}
            {isUnlocked("skin_clarity") ? clarity.confidence : "—"}
          </p>
        </div>

        {/* Symmetry tracks */}
        <div
          className="report-glass report-chart-enter rounded-3xl p-4 text-white sm:p-5"
          style={{ animationDelay: "160ms" }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
            Symmetry map
          </p>
          <p className="mt-1 text-xs text-white/35">
            Overall ·{" "}
            {isUnlocked("face_symmetry") ? symmetry.score : "locked"}
          </p>
          <div className="mt-4 space-y-3">
            {symTracks.map((t) => (
              <div key={t.label}>
                <div className="mb-1 flex justify-between text-[10px] text-white/40">
                  <span>{t.label}</span>
                </div>
                <div className="relative h-2 rounded-full bg-white/10">
                  <span
                    className={`absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)] ${
                      t.locked ? "opacity-30" : ""
                    }`}
                    style={{ left: `calc(${t.pos * 100}% - 5px)` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[9px] uppercase tracking-[0.12em] text-white/30">
            <span>Asym</span>
            <span>Sym</span>
          </div>
        </div>

        {/* Feature radar */}
        <div
          className="report-glass report-chart-enter rounded-3xl p-4 text-white sm:p-5"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
              Feature map
            </p>
            <p className="font-mono text-[10px] text-white/50">
              Composite{" "}
              <span className="text-white/90">{report.overallScore}</span>
            </p>
          </div>
          <svg
            viewBox="0 0 160 150"
            className="mx-auto mt-1 w-[9.5rem]"
            aria-hidden
          >
            {[0.35, 0.55, 0.75, 1].map((s) => (
              <polygon
                key={s}
                points={hexPoints(80, 78, 52 * s)}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            ))}
            <polygon
              points={hexPoints(80, 78, 48, radarScales)}
              fill="rgba(226,232,240,0.18)"
              stroke="rgba(248,250,252,0.75)"
              strokeWidth="1.3"
            />
          </svg>
          <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] text-white/40">
            {radarKeys.map((k) => (
              <span key={k} className="truncate">
                {FEATURE_LABELS[k]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ranked feature bars */}
      <div
        className="report-glass report-chart-enter mt-3 rounded-3xl p-5 text-white sm:p-6"
        style={{ animationDelay: "280ms" }}
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
              Feature ranking
            </p>
            <p className="mt-1 text-sm text-white/50">
              Strongest measured signals first
            </p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {rankedBars.map((row, i) => (
            <div key={row.key} className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3 sm:grid-cols-[10rem_1fr_3rem]">
              <span className="truncate text-xs text-white/60">{row.label}</span>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-white/35 via-white/70 to-white"
                  style={{
                    width: row.unlocked ? `${row.score}%` : `${18 + i * 4}%`,
                    opacity: row.unlocked ? 1 : 0.35,
                  }}
                />
              </div>
              <span
                className={`text-right font-mono text-xs tabular-nums ${
                  row.unlocked
                    ? "text-white/85"
                    : "blur-[3px] select-none text-white/40"
                }`}
              >
                {row.unlocked ? row.score : "··"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function hexPoints(
  cx: number,
  cy: number,
  r: number,
  scales: number[] = [1, 1, 1, 1, 1, 1],
) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI) / 3;
    const sr = r * (scales[i] ?? 1);
    return `${cx + Math.cos(angle) * sr},${cy + Math.sin(angle) * sr}`;
  }).join(" ");
}
