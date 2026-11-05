"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  FeatureOverlayPoint,
  ReportViewModel,
} from "@/lib/types/report";
import { FEATURE_LABELS } from "@/lib/types/report";
import {
  buildStrengthsPresentation,
  formatObservationLine,
  type PresentationGender,
  type StrengthZoom,
} from "@/lib/strengths-presentation";
import {
  computePillarsFromFeatures,
  type PillarScore,
} from "@/lib/appearance-index";
import { mapNormToCoverPercent } from "@/lib/object-cover-map";
import { isFeatureMeasurable, scoreToneClass } from "@/lib/score-tone";
import type { FeatureKey } from "@/lib/types/report";
import "@/components/report/report-dash.css";

const FALLBACK_MAP_DOTS: FeatureOverlayPoint[] = [
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
];

type Phase =
  | "boot"
  | "wide"
  | "zoom_in"
  | "highlight"
  | "zoom_out"
  | "complete";

const TIMING = {
  boot: 2200,
  wide: 1400,
  zoomIn: 1600,
  highlight: 4800,
  zoomOut: 1400,
} as const;

type Props = {
  report: ReportViewModel;
  isPro?: boolean;
  onContinue: () => void;
  continueLabel?: string;
  continueNote?: string;
};

export function StrengthsPresentation({
  report,
  isPro = false,
  onContinue,
  continueLabel = "Continue to style preferences",
  continueNote = "Next: a few visual choices so we can tailor framing and color.",
}: Props) {
  const model = useMemo(() => buildStrengthsPresentation(report), [report]);
  const pillars = useMemo(
    () => computePillarsFromFeatures(report.features),
    [report.features],
  );
  const steps: StrengthZoom[] = useMemo(() => {
    if (!isPro) return model.freeZooms;
    return [...model.zooms, model.faceShape];
  }, [isPro, model]);

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("boot");
  const [paused, setPaused] = useState(false);
  const [showStyle, setShowStyle] = useState(false);
  const [selectedWriteUp, setSelectedWriteUp] = useState<StrengthZoom | null>(
    null,
  );
  const [gender, setGender] = useState<PresentationGender | null>(
    model.summary.suggestedGender,
  );
  const indexRef = useRef(0);
  const phaseRef = useRef<Phase>("boot");

  const portraitId = report.portraitFileId;
  const faceSrc = portraitId ? `/api/files/${portraitId}` : "/woman1.png";
  const current = steps[index] ?? steps[0]!;
  const observationLine = useMemo(
    () => formatObservationLine(model.summary, gender),
    [model.summary, gender],
  );

  const zoomed = phase === "zoom_in" || phase === "highlight";
  const showDots = phase === "highlight";
  const showFullMap = phase === "complete" && isPro;
  const showFreeSummary = phase === "complete" && !isPro;
  const activeCard = showFullMap
    ? selectedWriteUp
    : showFreeSummary
      ? null
      : current;
  const cardState = showFullMap
    ? selectedWriteUp
      ? "in"
      : "hidden"
    : showFreeSummary
      ? "hidden"
      : phase === "highlight"
        ? "in"
        : phase === "zoom_out"
          ? "out"
          : "hidden";

  const mapDots = useMemo(() => {
    const raw =
      report.featureOverlays?.length > 0
        ? report.featureOverlays
        : FALLBACK_MAP_DOTS;
    return raw;
  }, [report.featureOverlays]);

  const writeUpLookup = useMemo(() => {
    const byDotId = new Map<string, StrengthZoom>();
    const byFeature = new Map<string, StrengthZoom>();
    for (const z of [...model.freeZooms, ...model.zooms, model.faceShape]) {
      for (const d of z.dots) byDotId.set(d.id, z);
      for (const k of z.featureKeys) byFeature.set(k, z);
    }
    return { byDotId, byFeature };
  }, [model]);

  const strongest = useMemo(() => {
    let best: { label: string; score: number } | null = null;
    for (const d of mapDots) {
      const packet = report.features[d.feature];
      if (!packet || !isFeatureMeasurable(packet.measurable)) continue;
      if (!best || packet.score > best.score) {
        best = {
          label: FEATURE_LABELS[d.feature] ?? d.feature,
          score: packet.score,
        };
      }
    }
    return best;
  }, [mapDots, report.features]);

  const restart = useCallback(() => {
    indexRef.current = 0;
    phaseRef.current = "boot";
    setIndex(0);
    setPhase("boot");
    setShowStyle(false);
    setSelectedWriteUp(null);
    setPaused(false);
  }, []);

  useEffect(() => {
    setGender(model.summary.suggestedGender);
  }, [model.summary.suggestedGender, report.id]);

  function openWriteUpForDot(dot: FeatureOverlayPoint) {
    const fromRegion =
      writeUpLookup.byDotId.get(dot.id) ??
      writeUpLookup.byFeature.get(dot.feature) ??
      null;
    const packet = report.features[dot.feature];
    const writeUp: StrengthZoom | null =
      fromRegion ??
      (packet
        ? {
            id: "detail",
            label: FEATURE_LABELS[dot.feature] ?? dot.feature,
            note:
              packet.observedSignal?.trim() ||
              "This landmark is part of your mapped strength scan.",
            accentTip: null,
            featureKeys: [dot.feature],
            strength: packet.score ?? 0,
            dots: [{ id: dot.id, x: dot.x, y: dot.y }],
            focus: { x: dot.x, y: dot.y, scale: 1.6 },
          }
        : null);
    setSelectedWriteUp((prev) =>
      prev && writeUp && prev.id === writeUp.id && prev.label === writeUp.label
        ? null
        : writeUp,
    );
  }

  useEffect(() => {
    restart();
  }, [report.id, restart]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Autoplay state machine.
  useEffect(() => {
    if (paused || showStyle || phase === "complete") return;

    const ms =
      phase === "boot"
        ? TIMING.boot
        : phase === "wide"
          ? TIMING.wide
          : phase === "zoom_in"
            ? TIMING.zoomIn
            : phase === "highlight"
              ? TIMING.highlight
              : TIMING.zoomOut;

    const id = window.setTimeout(() => {
      const p = phaseRef.current;
      const i = indexRef.current;

      if (p === "boot") {
        setPhase("wide");
        return;
      }
      if (p === "wide") {
        setPhase("zoom_in");
        return;
      }
      if (p === "zoom_in") {
        setPhase("highlight");
        return;
      }
      if (p === "highlight") {
        setPhase("zoom_out");
        return;
      }
      if (p === "zoom_out") {
        if (i >= steps.length - 1) {
          setPhase("complete");
          return;
        }
        setIndex(i + 1);
        setPhase("wide");
      }
    }, ms);

    return () => window.clearTimeout(id);
  }, [phase, paused, showStyle, steps.length]);

  function skipToComplete() {
    setPaused(true);
    setPhase("complete");
  }

  function playFrom(i: number) {
    setPaused(false);
    setShowStyle(false);
    setIndex(i);
    indexRef.current = i;
    setPhase("wide");
  }

  if (showStyle) {
    return (
      <section className="ai-reveal sp-root">
        <div className="sp-slideshow report-glass">
          <StyleDirectionPanel
            style={model.style}
            onBack={() => {
              setShowStyle(false);
              setPhase("complete");
              setPaused(true);
            }}
            onContinue={onContinue}
            continueLabel={continueLabel}
          />
        </div>
      </section>
    );
  }

  const showPanelNote =
    !showFreeSummary &&
    !showFullMap &&
    (phase === "highlight" || phase === "zoom_out") &&
    !!current;
  const showPillarPanel =
    !showFreeSummary && !showPanelNote && !(showFullMap && selectedWriteUp);

  return (
    <section className="ai-reveal sp-root">
      <div className="sp-intro sp-intro--compact">
        <p className="ai-reveal__eyebrow">Strength scan</p>
        <h2>What already works</h2>
      </div>

      <div className="sp-layout">
        <nav className="sp-rail" aria-label="Scan steps">
          <ol className="sp-rail__steps">
            {steps.map((s, i) => {
              const done = i < index || phase === "complete";
              const active = i === index && phase !== "complete";
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    className={`sp-rail__step${done ? " is-done" : ""}${
                      active ? " is-active" : ""
                    }`}
                    onClick={() => playFrom(i)}
                  >
                    <span className="sp-rail__dot" aria-hidden />
                    <span className="sp-rail__label">{s.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="sp-rail__actions">
            <button
              type="button"
              className="sp-transport__btn"
              onClick={() => setPaused((p) => !p)}
              disabled={phase === "complete"}
            >
              {paused ? "Resume" : "Pause"}
            </button>
            <button
              type="button"
              className="sp-transport__btn"
              onClick={skipToComplete}
              disabled={phase === "complete"}
            >
              Skip
            </button>
          </div>
        </nav>

        <div
          className={`sp-slideshow report-glass${
            phase === "boot" ? " is-booting" : ""
          }`}
        >
          <div className="sp-slideshow__stage">
            <SlideshowPortrait
              src={faceSrc}
              zoom={current}
              zoomed={zoomed}
              showDots={showDots}
              mapDots={showFullMap || showFreeSummary ? mapDots : null}
              features={report.features}
              activeWriteUp={selectedWriteUp}
              onMapDotClick={
                showFullMap || showFreeSummary ? openWriteUpForDot : undefined
              }
              boot={phase === "boot"}
              scanning={phase === "boot" || phase === "wide"}
            />

            <div className="sp-hud" aria-hidden>
              <span className="sp-hud__corner sp-hud__corner--tl" />
              <span className="sp-hud__corner sp-hud__corner--tr" />
              <span className="sp-hud__corner sp-hud__corner--bl" />
              <span className="sp-hud__corner sp-hud__corner--br" />
              <p className="sp-hud__tag">
                {phase === "boot"
                  ? "ACQUIRING SUBJECT…"
                  : showFreeSummary
                    ? "SCAN COMPLETE"
                    : phase === "complete"
                      ? selectedWriteUp
                        ? `SIGNAL · ${selectedWriteUp.label.toUpperCase()}`
                        : "TAP A POINT"
                      : `SIGNAL · ${current.label.toUpperCase()}`}
              </p>
              <p className="sp-hud__meta">
                {showFreeSummary
                  ? "FREE PASS"
                  : phase === "complete"
                    ? `${String(mapDots.length).padStart(2, "0")} POINTS`
                    : `${String(index + 1).padStart(2, "0")} / ${String(
                        steps.length,
                      ).padStart(2, "0")}`}
              </p>
            </div>

            {showFullMap && strongest && !selectedWriteUp ? (
              <aside className="sp-strongest" aria-live="polite">
                <p className="sp-strongest__eyebrow">Strongest</p>
                <p className="sp-strongest__value">
                  {strongest.label}{" "}
                  <span>{Math.round(strongest.score)}</span>
                </p>
              </aside>
            ) : null}

            {showFullMap ? (
              <div className="sp-complete">
                <div className="sp-complete__copy">
                  <p className="sp-complete__eyebrow">Strengths mapped</p>
                  <p>Tap a point for its strength note</p>
                </div>
                <div className="sp-nav">
                  <button
                    type="button"
                    className="ai-btn ai-btn--ghost"
                    onClick={restart}
                  >
                    Replay
                  </button>
                  <button
                    type="button"
                    className="ai-btn"
                    onClick={() => setShowStyle(true)}
                  >
                    Style direction
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="sp-panel" aria-label="Scan details">
          {(showFullMap || showFreeSummary) && selectedWriteUp ? (
            <aside className="sp-note-card is-in">
              <div className="sp-card__head">
                <p className="sp-note-card__eyebrow">Strength note</p>
                <button
                  type="button"
                  className="sp-card__close"
                  aria-label="Close note"
                  onClick={() => setSelectedWriteUp(null)}
                >
                  ✕
                </button>
              </div>
              <h3 className="sp-note-card__title">{selectedWriteUp.label}</h3>
              <p className="sp-note-card__note">{selectedWriteUp.note}</p>
              {selectedWriteUp.accentTip ? (
                <p className="sp-note-card__tip">{selectedWriteUp.accentTip}</p>
              ) : null}
            </aside>
          ) : null}

          {showFreeSummary && !selectedWriteUp ? (
            <div className="sp-summary sp-summary--panel">
              <p className="sp-summary__eyebrow">Framing summary</p>
              <p className="sp-summary__observation">{observationLine}</p>

              <div
                className="sp-summary__gender"
                role="group"
                aria-label="Correct gender framing"
              >
                <span className="sp-summary__gender-label">Framed as</span>
                <button
                  type="button"
                  className={`sp-summary__chip${
                    gender === "woman" ? " is-on" : ""
                  }`}
                  onClick={() =>
                    setGender((g) => (g === "woman" ? null : "woman"))
                  }
                >
                  Woman
                </button>
                <button
                  type="button"
                  className={`sp-summary__chip${
                    gender === "man" ? " is-on" : ""
                  }`}
                  onClick={() =>
                    setGender((g) => (g === "man" ? null : "man"))
                  }
                >
                  Man
                </button>
                <button
                  type="button"
                  className={`sp-summary__chip${
                    gender === null ? " is-on" : ""
                  }`}
                  onClick={() => setGender(null)}
                >
                  Skip
                </button>
              </div>

              <p className="sp-summary__persona">{model.summary.persona}</p>
              <ul className="sp-summary__rules">
                {model.summary.styleRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>

              <div className="sp-nav">
                <button
                  type="button"
                  className="ai-btn ai-btn--ghost"
                  onClick={restart}
                >
                  Replay
                </button>
                <button type="button" className="ai-btn" onClick={onContinue}>
                  {continueLabel}
                </button>
              </div>
            </div>
          ) : null}

          {showPanelNote && activeCard ? (
            <aside
              className={`sp-note-card${
                cardState === "in"
                  ? " is-in"
                  : cardState === "out"
                    ? " is-out"
                    : ""
              }`}
            >
              <p className="sp-note-card__eyebrow">Primary strength</p>
              <h3 className="sp-note-card__title">{activeCard.label}</h3>
              <p className="sp-note-card__note">{activeCard.note}</p>
              {activeCard.accentTip ? (
                <p className="sp-note-card__tip">{activeCard.accentTip}</p>
              ) : null}
            </aside>
          ) : null}

          {showPillarPanel ? (
            <SidePillarCard
              pillar={pillars.structure}
              features={report.features}
              delay={80}
            />
          ) : null}
        </aside>
      </div>

      {portraitId ? (
        <p className="sp-source sp-source--compact">
          Source: your uploaded portrait · private scan
        </p>
      ) : null}
    </section>
  );
}

function SidePillarCard({
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
      className="ai-pillar report-glass sp-side__card"
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
      {pillar.tips.length > 0 ? (
        <p className="ai-pillar__tip">{pillar.tips.join(" ")}</p>
      ) : null}
    </article>
  );
}

function StyleDirectionPanel({
  style,
  onBack,
  onContinue,
  continueLabel,
}: {
  style: ReturnType<typeof buildStrengthsPresentation>["style"];
  onBack: () => void;
  onContinue: () => void;
  continueLabel: string;
}) {
  return (
    <div className="sp-style sp-style--panel">
      <p className="sp-step">Style direction</p>
      <h3 className="sp-title">Accentuate what leads</h3>
      <p className="sp-note">
        Every suggestion ties back to a strength zoom — not a score to “fix.”
      </p>

      <div className="sp-style__block">
        <h4>Neckline</h4>
        <p className="sp-style__lead">{style.neckline.type}</p>
        <p className="sp-tip">{style.neckline.reason}</p>
      </div>

      <div className="sp-style__block">
        <h4>Color palette</h4>
        <div className="sp-swatches" aria-label="Recommended colors">
          {style.palette.map((c) => (
            <span key={c.hex} className="sp-swatch" title={c.label}>
              <span style={{ background: c.hex }} />
              <em>{c.label}</em>
            </span>
          ))}
        </div>
      </div>

      <div className="sp-style__block">
        <h4>Hair framing</h4>
        <p className="sp-note">{style.hairFraming.suggestion}</p>
      </div>

      <div className="sp-style__block sp-style__next">
        <h4>Low-effort next step</h4>
        <p className="sp-note">{style.nextStep}</p>
      </div>

      <div className="sp-nav">
        <button type="button" className="ai-btn ai-btn--ghost" onClick={onBack}>
          Back
        </button>
        <button type="button" className="ai-btn" onClick={onContinue}>
          {continueLabel}
        </button>
      </div>
    </div>
  );
}

function SlideshowPortrait({
  src,
  zoom,
  zoomed,
  showDots,
  mapDots,
  features,
  activeWriteUp,
  onMapDotClick,
  boot,
  scanning,
}: {
  src: string;
  zoom: StrengthZoom;
  zoomed: boolean;
  showDots: boolean;
  mapDots: FeatureOverlayPoint[] | null;
  features: ReportViewModel["features"];
  activeWriteUp: StrengthZoom | null;
  onMapDotClick?: (dot: FeatureOverlayPoint) => void;
  boot: boolean;
  scanning: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [box, setBox] = useState({ w: 1, h: 1 });
  const [natural, setNatural] = useState({ w: 1, h: 1 });
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });

  useEffect(() => {
    const sync = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setBox({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setBox({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // Prefer the dots cluster so zoom lands on the highlighted region, not a guess.
  const focusNorm = useMemo(() => {
    if (zoom.dots.length > 0) {
      const sx = zoom.dots.reduce((a, d) => a + d.x, 0) / zoom.dots.length;
      const sy = zoom.dots.reduce((a, d) => a + d.y, 0) / zoom.dots.length;
      return { x: sx, y: sy, scale: zoom.focus.scale };
    }
    return zoom.focus;
  }, [zoom]);

  const focusBox = mapNormToCoverPercent(
    focusNorm.x,
    focusNorm.y,
    natural.w,
    natural.h,
    box.w,
    box.h,
    0.5,
    0.5,
  );
  const ox = focusBox.left / 100;
  const oy = focusBox.top / 100;
  const scale = zoomed ? focusNorm.scale : 1;
  // Keep the feature slightly off-center (upper-third) for a dystopian frame.
  const targetX = 0.42;
  const targetY = 0.38;
  const tx = zoomed
    ? (targetX - 0.5 - (ox - 0.5) * scale) * 100
    : 0;
  const ty = zoomed
    ? (targetY - 0.5 - (oy - 0.5) * scale) * 100
    : 0;

  const frameStyle = useMemo(() => {
    const ar =
      natural.w > 1 && natural.h > 1 ? natural.w / natural.h : 3 / 4;
    // Leave room for fixed header + journey bar + intro (~10rem).
    const maxH = Math.min(viewport.h * 0.68, 620);
    const maxW = Math.min(viewport.w * 0.9, 520);
    let height = maxH;
    let width = height * ar;
    if (width > maxW) {
      width = maxW;
      height = width / ar;
    }
    return {
      width: `${Math.round(width)}px`,
      height: `${Math.round(height)}px`,
    };
  }, [natural.w, natural.h, viewport.h, viewport.w]);

  return (
    <div
      className={`sp-portrait${boot ? " is-boot" : ""}${scanning ? " is-scanning" : ""}${
        mapDots ? " is-mapped" : ""
      }`}
      ref={wrapRef}
      style={frameStyle}
    >
      <div
        className="sp-portrait__zoom"
        style={{
          transform: `translate(${tx}%, ${ty}%) scale(${scale})`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt="Your portrait"
          className="sp-portrait__img"
          onLoad={() => {
            const img = imgRef.current;
            if (img)
              setNatural({
                w: img.naturalWidth || 1,
                h: img.naturalHeight || 1,
              });
          }}
        />
        {showDots
          ? zoom.dots.map((d, i) => {
              const pos = mapNormToCoverPercent(
                d.x,
                d.y,
                natural.w,
                natural.h,
                box.w,
                box.h,
                0.5,
                0.5,
              );
              return (
                <span
                  key={d.id}
                  className="sp-dot"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    animationDelay: `${i * 70}ms`,
                  }}
                >
                  <span className="sp-dot__core" />
                  <span className="sp-dot__ring" aria-hidden />
                </span>
              );
            })
          : null}
      </div>
      <div className="sp-portrait__veil" aria-hidden />
      <div className="sp-portrait__grain" aria-hidden />
      {mapDots ? (
        <div className="sp-map-layer">
          {mapDots.map((d, i) => {
            const pos = mapNormToCoverPercent(
              d.x,
              d.y,
              natural.w,
              natural.h,
              box.w,
              box.h,
              0.5,
              0.5,
            );
            const packet = features[d.feature];
            const tone =
              !packet || !isFeatureMeasurable(packet.measurable)
                ? "bg-white/40"
                : scoreToneClass(packet.score, true);
            const isActive =
              !!activeWriteUp &&
              (activeWriteUp.dots.some((x) => x.id === d.id) ||
                activeWriteUp.featureKeys.includes(d.feature));
            return (
              <button
                key={`map-${d.id}`}
                type="button"
                className={`report-face-dot sp-map-dot${
                  onMapDotClick ? " is-clickable" : ""
                }${isActive ? " report-face-dot--active" : ""}`}
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  animationDelay: `${i * 45}ms`,
                }}
                aria-label={`Open ${FEATURE_LABELS[d.feature] ?? d.feature} note`}
                aria-pressed={isActive}
                onClick={(e) => {
                  e.stopPropagation();
                  onMapDotClick?.(d);
                }}
              >
                <span className={`report-face-dot__core ${tone}`} />
                <span className={`report-face-dot__ring ${tone}`} aria-hidden />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
