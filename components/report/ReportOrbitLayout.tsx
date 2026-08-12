"use client";

import type { ReactNode } from "react";
import type { FeatureKey, ReportViewModel } from "@/lib/types/report";
import { FEATURE_LABELS } from "@/lib/types/report";
import { InteractivePortrait } from "@/components/report/InteractivePortrait";

type WeakRec = {
  feature: FeatureKey;
  action: string;
  effort: string;
};

/**
 * Orbit layout: large portrait (~70% stage) with glass cards floating around it.
 */
export function ReportOrbitLayout({
  report,
  faceSrc,
  usingUserPortrait,
  isUnlocked,
  topFeature,
  paid,
  onUnlock,
  appearanceSummary,
  weakRecs,
  groomingMeasurable,
  compositeTen,
}: {
  report: ReportViewModel;
  faceSrc: string;
  usingUserPortrait: boolean;
  isUnlocked: (key: FeatureKey) => boolean;
  topFeature: FeatureKey;
  paid: boolean;
  onUnlock: () => void;
  appearanceSummary: { title: string; preview: string[]; full: string[] };
  weakRecs: WeakRec[];
  groomingMeasurable: boolean;
  compositeTen: string;
}) {
  const clarity = report.features.skin_clarity;
  const jawline = report.features.jawline_definition;
  const grooming = report.features.grooming_signal;
  const symmetry = report.features.face_symmetry;

  return (
    <div className="report-orbit relative z-10 mx-auto max-w-[90rem] px-4 pb-20 pt-2 md:px-8">
      <div className="report-orbit__stage relative mx-auto min-h-[78svh] w-full max-w-6xl">
        {/* Center portrait */}
        <div className="report-orbit__portrait absolute left-1/2 top-1/2 z-10 w-[min(70vw,40rem)] -translate-x-1/2 -translate-y-1/2">
          <InteractivePortrait
            report={report}
            faceSrc={faceSrc}
            usingUserPortrait={usingUserPortrait}
            isUnlocked={isUnlocked}
            topFeature={topFeature}
            size="hero"
          />
        </div>

        <FloatCard className="report-orbit__card report-orbit__card--tl hidden max-w-[16rem] lg:block">
          <p className="text-[10px] uppercase tracking-[0.16em] text-violet-300/70">
            Overall
          </p>
          <p className="mt-1 text-4xl font-semibold tracking-tight text-white">
            {report.overallScore}
            <span className="ml-1 text-sm font-normal text-white/35">/100</span>
          </p>
          <p className="mt-1 text-xs text-white/45">
            Index {compositeTen}/10 · measured composite
          </p>
        </FloatCard>

        <FloatCard className="report-orbit__card report-orbit__card--tr hidden max-w-[17rem] lg:block">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
            Strongest
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {FEATURE_LABELS[topFeature]}
          </p>
          <p className="mt-0.5 text-2xl font-semibold text-violet-200">
            {isUnlocked(topFeature) ? report.features[topFeature].score : "··"}
          </p>
        </FloatCard>

        <FloatCard className="report-orbit__card report-orbit__card--ml hidden max-w-[15rem] lg:block">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
            Skin clarity
          </p>
          <p className="mt-1 text-3xl font-semibold text-white">
            {isUnlocked("skin_clarity") ? clarity.score : (
              <span className="blur-sm select-none">72</span>
            )}
          </p>
          <p className="mt-1 line-clamp-2 text-[11px] text-white/45">
            {isUnlocked("skin_clarity")
              ? clarity.observedSignal
              : "Unlock to reveal"}
          </p>
        </FloatCard>

        <FloatCard className="report-orbit__card report-orbit__card--mr hidden max-w-[15rem] lg:block">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
            Jawline
          </p>
          <p className="mt-1 text-3xl font-semibold text-sky-300">
            {isUnlocked("jawline_definition") ? jawline.score : (
              <span className="blur-sm select-none">68</span>
            )}
          </p>
          <p className="mt-1 line-clamp-2 text-[11px] text-white/45">
            Edge contrast along the jaw contour
          </p>
        </FloatCard>

        <FloatCard className="report-orbit__card report-orbit__card--bl hidden max-w-[16rem] md:block">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
            Symmetry
          </p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {isUnlocked("face_symmetry") ? symmetry.score : (
              <span className="blur-sm select-none">74</span>
            )}
          </p>
          <p className="mt-1 line-clamp-2 text-[11px] text-white/45">
            {isUnlocked("face_symmetry")
              ? symmetry.observedSignal
              : "Measured · unlock to reveal"}
          </p>
        </FloatCard>

        <FloatCard className="report-orbit__card report-orbit__card--br hidden max-w-[16rem] md:block">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
            Grooming
          </p>
          {!groomingMeasurable ? (
            <p className="mt-1 text-sm font-medium text-amber-200/90">
              Not measured
            </p>
          ) : (
            <p className="mt-1 text-2xl font-semibold text-white">
              {isUnlocked("grooming_signal") ? grooming.score : (
                <span className="blur-sm select-none">70</span>
              )}
            </p>
          )}
          <p className="mt-1 line-clamp-2 text-[11px] text-white/45">
            {!groomingMeasurable
              ? (grooming.gateNote ?? grooming.observedSignal)
              : isUnlocked("grooming_signal")
                ? `Confidence · ${grooming.confidence}`
                : "Locked on free"}
          </p>
        </FloatCard>
      </div>

      {/* Mobile / stacked cards under portrait */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
        <FloatCard className="report-orbit-float--static">
          <p className="text-[10px] uppercase tracking-[0.16em] text-violet-300/70">
            Overall
          </p>
          <p className="mt-1 text-3xl font-semibold text-white">
            {report.overallScore}
            <span className="ml-1 text-sm font-normal text-white/35">/100</span>
          </p>
        </FloatCard>
        <FloatCard className="report-orbit-float--static">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
            Strongest
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {FEATURE_LABELS[topFeature]} ·{" "}
            {isUnlocked(topFeature) ? report.features[topFeature].score : "··"}
          </p>
        </FloatCard>
      </div>

      <div className="mx-auto mt-6 grid max-w-4xl gap-4 lg:grid-cols-2">
        <FloatCard className="report-orbit-float--static max-w-none">
          <p className="text-[10px] uppercase tracking-[0.16em] text-violet-300/70">
            {appearanceSummary.title}
          </p>
          {paid ? (
            <div className="mt-3 space-y-3">
              {appearanceSummary.full.map((para, i) => (
                <p
                  key={`orbit-sum-${i}`}
                  className="text-sm leading-relaxed text-white/75"
                >
                  {para}
                </p>
              ))}
            </div>
          ) : (
            <>
              <div className="report-summary-fade mt-3 max-h-[7.5rem] space-y-3 overflow-hidden">
                {appearanceSummary.preview.map((para, i) => (
                  <p
                    key={`orbit-prev-${i}`}
                    className="text-sm leading-relaxed text-white/75"
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={onUnlock}
                  className="cursor-pointer rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/85 transition hover:bg-white/15"
                >
                  Unlock to view the full summary
                </button>
              </div>
            </>
          )}
        </FloatCard>

        <FloatCard className="report-orbit-float--static max-w-none">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
            Next actions
          </p>
          {paid && weakRecs.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {weakRecs.map((rec) => (
                <li
                  key={rec.action}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
                >
                  <p className="text-sm text-white/90">{rec.action}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35">
                    {FEATURE_LABELS[rec.feature]} · {rec.effort} effort
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              {paid
                ? "No weak scores below 70 — keep your routine consistent."
                : "Unlock the full report to see paired recommendations."}
            </p>
          )}
          {!paid && (
            <button
              type="button"
              onClick={onUnlock}
              className="mt-4 w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Unlock recommendations
            </button>
          )}
        </FloatCard>
      </div>
    </div>
  );
}

function FloatCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`report-glass report-orbit-float rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
}
