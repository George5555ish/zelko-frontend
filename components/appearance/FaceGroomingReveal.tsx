"use client";

import { useMemo } from "react";
import type { ReportViewModel } from "@/lib/types/report";
import {
  FEATURE_LABELS,
  SCORED_APPEARANCE_KEYS,
  type FeatureKey,
} from "@/lib/types/report";
import type { AppearancePillars, PillarScore } from "@/lib/appearance-index";
import { InteractivePortrait } from "@/components/report/InteractivePortrait";
import { isFeatureMeasurable } from "@/lib/score-tone";
import "@/components/report/report-dash.css";

function PillarCard({
  pillar,
  features,
  delay = 0,
}: {
  pillar: PillarScore;
  features: ReportViewModel["features"];
  delay?: number;
}) {
  return (
    <article
      className="ai-pillar report-glass"
      style={{ animationDelay: `${delay}ms` }}
    >
      <header className="ai-pillar__head">
        <h3>{pillar.label}</h3>
        <p className="ai-pillar__conf">{pillar.confidence} confidence</p>
      </header>
      <p className="ai-pillar__score">
        {pillar.measurable && pillar.score != null ? (
          <>
            <span>{(pillar.score / 10).toFixed(1)}</span>
            <small>/10</small>
          </>
        ) : (
          <span className="ai-pillar__na">Not measured</span>
        )}
      </p>
      <ul className="ai-pillar__features">
        {pillar.featureKeys.map((key) => {
          const packet = features[key as FeatureKey];
          if (!packet) return null;
          const ok = packet.measurable !== false;
          return (
            <li key={key}>
              <span>{FEATURE_LABELS[key as FeatureKey]}</span>
              <strong>{ok ? Math.round(packet.score) : "—"}</strong>
            </li>
          );
        })}
      </ul>
      <ul className="ai-pillar__tips">
        {pillar.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </article>
  );
}

export function FaceGroomingReveal({
  report,
  pillars,
  onContinue,
  continueLabel = "Continue to style profile",
  continueNote = "Next: a few visual style choices (and later, a full-body photo).",
}: {
  report: ReportViewModel;
  pillars: AppearancePillars;
  onContinue: () => void;
  continueLabel?: string;
  continueNote?: string;
}) {
  // Landmarks were measured on the real upload — never swap in the AI avatar here.
  const portraitId = report.portraitFileId;
  const faceSrc = portraitId
    ? `/api/files/${portraitId}`
    : "/woman1.png";
  const usingUserPortrait = Boolean(portraitId);

  const topFeature = useMemo(() => {
    const ranked = [...SCORED_APPEARANCE_KEYS]
      .filter((k) => isFeatureMeasurable(report.features[k]?.measurable))
      .sort(
        (a, b) =>
          (report.features[b]?.score ?? 0) - (report.features[a]?.score ?? 0),
      );
    return ranked[0] ?? "face_symmetry";
  }, [report.features]);

  return (
    <section className="ai-reveal">
      <div className="ai-reveal__intro">
        <p className="ai-reveal__eyebrow">Stage 1 · Face & Grooming Index</p>
        <h2>Your first reveal</h2>
        <p>
          Two separate pillars — structure from your face mesh, grooming from
          skin and finish. Hover the landmark dots for feature details.
        </p>
      </div>

      <div className="ai-reveal__grid">
        <div className="ai-reveal__portrait-wrap">
          <InteractivePortrait
            report={report}
            faceSrc={faceSrc}
            usingUserPortrait={usingUserPortrait}
            isUnlocked={() => true}
            topFeature={topFeature}
            openOnHover
          />
        </div>
        <div className="ai-reveal__pillars">
          <PillarCard
            pillar={pillars.structure}
            features={report.features}
            delay={80}
          />
          <PillarCard
            pillar={pillars.grooming}
            features={report.features}
            delay={200}
          />
        </div>
      </div>

      <div className="ai-reveal__cta">
        <button type="button" className="ai-btn" onClick={onContinue}>
          {continueLabel}
        </button>
        <p className="ai-reveal__note">{continueNote}</p>
      </div>
    </section>
  );
}
