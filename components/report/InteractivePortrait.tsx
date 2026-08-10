"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { mapNormToCoverPercent } from "@/lib/object-cover-map";
import { recommendationsForScore } from "@/lib/recommendations";
import { isFeatureMeasurable, scoreToneClass } from "@/lib/score-tone";
import type {
  FeatureKey,
  FeatureOverlayPoint,
  FeatureScore,
  ReportViewModel,
} from "@/lib/types/report";
import { FEATURE_LABELS } from "@/lib/types/report";

const OBJECT_POS_X = 0.5;
const OBJECT_POS_Y = 0.18;
const POPOVER_W = 188;
const POPOVER_H = 168;
const POPOVER_GAP = 14;

type AppearanceFeature = Exclude<FeatureKey, "photo_quality">;

const FALLBACK_OVERLAYS: FeatureOverlayPoint[] = [
  { id: "brow_l", feature: "eyebrow_shape", x: 0.38, y: 0.28 },
  { id: "brow_r", feature: "eyebrow_shape", x: 0.62, y: 0.28 },
  { id: "eye_l", feature: "eye_spacing", x: 0.37, y: 0.36 },
  { id: "eye_r", feature: "eye_spacing", x: 0.63, y: 0.36 },
  { id: "cheek_l", feature: "skin_clarity", x: 0.3, y: 0.48 },
  { id: "cheek_r", feature: "skin_clarity", x: 0.7, y: 0.48 },
  { id: "nose", feature: "facial_proportions", x: 0.5, y: 0.5 },
  { id: "sym_l", feature: "face_symmetry", x: 0.28, y: 0.52 },
  { id: "sym_r", feature: "face_symmetry", x: 0.72, y: 0.52 },
  { id: "jaw_l", feature: "jawline_definition", x: 0.34, y: 0.72 },
  { id: "jaw_r", feature: "jawline_definition", x: 0.66, y: 0.72 },
  { id: "chin", feature: "jawline_definition", x: 0.5, y: 0.82 },
  { id: "groom", feature: "grooming_signal", x: 0.5, y: 0.62 },
];

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Place a compact card beside the dot, flipped to stay on the portrait. */
function popoverOrigin(
  leftPct: number,
  topPct: number,
  boxW: number,
  boxH: number,
): { left: number; top: number; placeRight: boolean } {
  const cx = (leftPct / 100) * boxW;
  const cy = (topPct / 100) * boxH;
  const placeRight = leftPct < 52;
  let left = placeRight ? cx + POPOVER_GAP : cx - POPOVER_GAP - POPOVER_W;
  let top = cy - POPOVER_H / 2;
  left = clamp(left, 8, Math.max(8, boxW - POPOVER_W - 8));
  top = clamp(top, 8, Math.max(8, boxH - POPOVER_H - 8));
  return { left, top, placeRight };
}

export function InteractivePortrait({
  report,
  faceSrc,
  usingUserPortrait,
  isUnlocked,
  topFeature,
}: {
  report: ReportViewModel;
  faceSrc: string;
  usingUserPortrait: boolean;
  isUnlocked: (key: FeatureKey) => boolean;
  topFeature: FeatureKey;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [boxSize, setBoxSize] = useState({ w: 0, h: 0 });
  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const overlays =
    report.featureOverlays?.length > 0
      ? report.featureOverlays
      : FALLBACK_OVERLAYS;

  const measure = useCallback(() => {
    const box = boxRef.current;
    const img = imgRef.current;
    if (box) {
      const r = box.getBoundingClientRect();
      setBoxSize({ w: r.width, h: r.height });
    }
    if (img && img.naturalWidth > 0) {
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
    }
  }, []);

  useEffect(() => {
    measure();
    const box = boxRef.current;
    if (!box || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(box);
    return () => ro.disconnect();
  }, [measure, faceSrc]);

  const selectedDot = overlays.find((d) => d.id === selectedId) ?? null;
  const selectedScore = selectedDot
    ? report.features[selectedDot.feature]
    : null;

  const selectedPos = selectedDot
    ? mapNormToCoverPercent(
        selectedDot.x,
        selectedDot.y,
        imgSize.w || 1,
        imgSize.h || 1,
        boxSize.w || 1,
        boxSize.h || 1,
        OBJECT_POS_X,
        OBJECT_POS_Y,
      )
    : null;

  const pop =
    selectedPos && boxSize.w > 0
      ? popoverOrigin(selectedPos.left, selectedPos.top, boxSize.w, boxSize.h)
      : null;

  return (
    <div className="relative mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
      <div
        ref={boxRef}
        className="report-glass relative aspect-[3/4] overflow-hidden rounded-[2rem]"
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedId(null);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={faceSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_18%] opacity-90"
          onLoad={measure}
          onClick={() => setSelectedId(null)}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12081f]/90 via-transparent to-[#1a0b2e]/35"
          aria-hidden
        />

        {!usingUserPortrait && (
          <p className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/55 backdrop-blur-sm">
            Demo portrait
          </p>
        )}

        <p className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-black/35 px-2.5 py-1 text-[10px] text-white/50 backdrop-blur-sm">
          Tap a point
        </p>

        {overlays.map((dot) => (
          <OverlayDot
            key={dot.id}
            dot={dot}
            score={report.features[dot.feature]}
            unlocked={isUnlocked(dot.feature)}
            active={selectedId === dot.id}
            imgSize={imgSize}
            boxSize={boxSize}
            onSelect={() =>
              setSelectedId((prev) => (prev === dot.id ? null : dot.id))
            }
          />
        ))}

        {isUnlocked(topFeature) && !selectedDot && (
          <div className="pointer-events-none absolute left-3 top-12 z-10 report-glass-chip rounded-2xl px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">
              Strongest
            </p>
            <p className="text-sm font-semibold text-white">
              {FEATURE_LABELS[topFeature]}{" "}
              <span className="text-violet-300">
                {report.features[topFeature].score}
              </span>
            </p>
          </div>
        )}

        {selectedDot && selectedScore && pop && (
          <FeatureBreakdownCard
            feature={selectedDot.feature}
            packet={selectedScore}
            unlocked={isUnlocked(selectedDot.feature)}
            placeRight={pop.placeRight}
            style={{ left: pop.left, top: pop.top }}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}

function OverlayDot({
  dot,
  score,
  unlocked,
  active,
  imgSize,
  boxSize,
  onSelect,
}: {
  dot: FeatureOverlayPoint;
  score: FeatureScore;
  unlocked: boolean;
  active: boolean;
  imgSize: { w: number; h: number };
  boxSize: { w: number; h: number };
  onSelect: () => void;
}) {
  const pos = mapNormToCoverPercent(
    dot.x,
    dot.y,
    imgSize.w || 1,
    imgSize.h || 1,
    boxSize.w || 1,
    boxSize.h || 1,
    OBJECT_POS_X,
    OBJECT_POS_Y,
  );

  const tone = !isFeatureMeasurable(score.measurable)
    ? "bg-white/35"
    : scoreToneClass(score.score, unlocked);

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  }

  return (
    <button
      type="button"
      aria-label={`${FEATURE_LABELS[dot.feature]} — tap for breakdown`}
      aria-pressed={active}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onKeyDown={onKeyDown}
      className={`report-face-dot absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 ${
        active ? "report-face-dot--active" : ""
      }`}
      style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
    >
      <span className={`report-face-dot__core ${tone}`} />
      <span className={`report-face-dot__ring ${tone}`} aria-hidden />
    </button>
  );
}

function FeatureBreakdownCard({
  feature,
  packet,
  unlocked,
  placeRight,
  style,
  onClose,
}: {
  feature: AppearanceFeature;
  packet: FeatureScore;
  unlocked: boolean;
  placeRight: boolean;
  style: { left: number; top: number };
  onClose: () => void;
}) {
  const measurable = isFeatureMeasurable(packet.measurable);
  const tip =
    unlocked && measurable
      ? recommendationsForScore(feature, packet.score)[0]?.action
      : null;

  return (
    <div
      role="dialog"
      aria-label={`${FEATURE_LABELS[feature]} breakdown`}
      className={`report-face-popover absolute z-30 report-glass-chip rounded-xl px-3 py-2.5 ${
        placeRight
          ? "report-face-popover--from-left"
          : "report-face-popover--from-right"
      }`}
      style={{
        left: style.left,
        top: style.top,
        width: POPOVER_W,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-[0.14em] text-white/45">
            Region
          </p>
          <p className="mt-0.5 truncate text-[13px] font-semibold text-white">
            {FEATURE_LABELS[feature]}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-full px-1.5 py-0.5 text-[10px] text-white/50 transition hover:bg-white/10 hover:text-white"
          aria-label="Close breakdown"
        >
          ✕
        </button>
      </div>

      {!measurable ? (
        <>
          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-amber-300/90">
            Not measured
          </p>
          <p className="mt-1 line-clamp-4 text-[11px] leading-snug text-white/75">
            {packet.gateNote ?? packet.observedSignal}
          </p>
        </>
      ) : unlocked ? (
        <>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
            <span className="text-xl font-semibold tracking-tight text-white">
              {packet.score}
              <span className="ml-0.5 text-[11px] font-normal text-white/35">
                /100
              </span>
            </span>
            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em] text-white/55">
              {packet.confidence}
            </span>
          </div>
          <p className="mt-1.5 line-clamp-3 text-[11px] leading-snug text-white/75">
            {packet.observedSignal}
          </p>
          {tip && (
            <p className="mt-1.5 border-t border-white/10 pt-1.5 text-[10px] leading-snug text-violet-200/85">
              Tip: {tip}
            </p>
          )}
        </>
      ) : (
        <p className="mt-1.5 text-[11px] leading-snug text-white/55">
          Locked on free — unlock to see this region&apos;s score and signal.
        </p>
      )}
    </div>
  );
}
