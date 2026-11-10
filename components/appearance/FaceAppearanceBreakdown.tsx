"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  FeatureOverlayPoint,
  ReportViewModel,
} from "@/lib/types/report";
import { appearanceSummaryFor } from "@/lib/appearance-summary";
import { FEATURE_LABELS } from "@/lib/types/report";
import { isFeatureMeasurable } from "@/lib/score-tone";

const FALLBACK_DOTS: FeatureOverlayPoint[] = [
  { id: "brow_l", feature: "eyebrow_shape", x: 0.38, y: 0.28 },
  { id: "brow_r", feature: "eyebrow_shape", x: 0.62, y: 0.28 },
  { id: "eye_l", feature: "eye_spacing", x: 0.37, y: 0.36 },
  { id: "eye_r", feature: "eye_spacing", x: 0.63, y: 0.36 },
  { id: "cheek_l", feature: "skin_clarity", x: 0.3, y: 0.48 },
  { id: "cheek_r", feature: "skin_clarity", x: 0.7, y: 0.48 },
  { id: "nose", feature: "facial_proportions", x: 0.5, y: 0.5 },
  { id: "jaw_l", feature: "jawline_definition", x: 0.34, y: 0.72 },
  { id: "jaw_r", feature: "jawline_definition", x: 0.66, y: 0.72 },
  { id: "chin", feature: "jawline_definition", x: 0.5, y: 0.82 },
];

/** Map normalized landmark coords onto object-fit: cover layout. */
function mapNormToCoverPercent(
  nx: number,
  ny: number,
  natW: number,
  natH: number,
  boxW: number,
  boxH: number,
) {
  if (natW <= 1 || natH <= 1 || boxW <= 1 || boxH <= 1) {
    return { left: nx * 100, top: ny * 100 };
  }
  const scale = Math.max(boxW / natW, boxH / natH);
  const dispW = natW * scale;
  const dispH = natH * scale;
  const ox = (boxW - dispW) / 2;
  const oy = (boxH - dispH) / 2;
  return {
    left: ((ox + nx * dispW) / boxW) * 100,
    top: ((oy + ny * dispH) / boxH) * 100,
  };
}

export function FaceAppearanceBreakdown({
  report,
  portraitSrc,
}: {
  report: ReportViewModel;
  portraitSrc: string;
}) {
  const faceRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [box, setBox] = useState({ w: 1, h: 1 });
  const [natural, setNatural] = useState({ w: 1, h: 1 });
  const [activeId, setActiveId] = useState<string | null>(null);

  const dots = useMemo(() => {
    return report.featureOverlays?.length
      ? report.featureOverlays
      : FALLBACK_DOTS;
  }, [report.featureOverlays]);

  const summary = useMemo(() => appearanceSummaryFor(report), [report]);

  const active = activeId
    ? dots.find((d) => d.id === activeId) ?? null
    : null;
  const activePacket = active ? report.features[active.feature] : null;

  useEffect(() => {
    const el = faceRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setBox({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setBox({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  return (
    <section className="face-break" aria-label="Face appearance breakdown">
      <div className="face-break__intro">
        <p className="celeb-match__label">Face breakdown</p>
        <h3>What we see in your photos</h3>
        <p className="face-break__summary">{summary}</p>
      </div>

      <div className="face-break__portrait-wrap">
        <div className="face-break__face" ref={faceRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={portraitSrc}
            alt="Your portrait"
            onLoad={() => {
              const img = imgRef.current;
              if (img) {
                setNatural({
                  w: img.naturalWidth || 1,
                  h: img.naturalHeight || 1,
                });
              }
            }}
          />

          {active && activePacket ? (
            <div className="face-break__badge" role="status">
              <span>Strongest</span>
              <strong>
                {FEATURE_LABELS[active.feature]} {Math.round(activePacket.score)}
              </strong>
            </div>
          ) : (
            <div className="face-break__hint" aria-hidden="true">
              Tap a point
            </div>
          )}

          <div className="face-break__dots">
            {dots.map((d, i) => {
              const pos = mapNormToCoverPercent(
                d.x,
                d.y,
                natural.w,
                natural.h,
                box.w,
                box.h,
              );
              const packet = report.features[d.feature];
              const tone =
                !packet || !isFeatureMeasurable(packet.measurable)
                  ? "is-neutral"
                  : packet.score >= 75
                    ? "is-strong"
                    : "is-soft";
              const isActive = activeId === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  className={`face-break__dot ${tone}${isActive ? " is-active" : ""}`}
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    animationDelay: `${i * 45}ms`,
                  }}
                  aria-label={FEATURE_LABELS[d.feature] ?? d.feature}
                  aria-pressed={isActive}
                  onClick={() =>
                    setActiveId((cur) => (cur === d.id ? null : d.id))
                  }
                >
                  <span
                    className="face-break__dot-core"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
