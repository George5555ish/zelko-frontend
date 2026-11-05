"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FEATURE_LABELS,
  SCORED_APPEARANCE_KEYS,
  type FeatureKey,
  type FeatureOverlayPoint,
  type ReportViewModel,
} from "@/lib/types/report";
import { isFeatureMeasurable } from "@/lib/score-tone";
import { buildStrengthsPresentation } from "@/lib/strengths-presentation";

const FALLBACK_ANCHORS: Record<
  Exclude<FeatureKey, "photo_quality">,
  { x: number; y: number }
> = {
  eyebrow_shape: { x: 0.42, y: 0.28 },
  eye_spacing: { x: 0.58, y: 0.36 },
  facial_proportions: { x: 0.5, y: 0.48 },
  face_symmetry: { x: 0.72, y: 0.52 },
  jawline_definition: { x: 0.5, y: 0.78 },
  skin_clarity: { x: 0.3, y: 0.48 },
  grooming_signal: { x: 0.68, y: 0.42 },
};

type Callout = {
  id: string;
  index: number;
  key: Exclude<FeatureKey, "photo_quality">;
  tag: string;
  title: string;
  meta: string;
  note: string;
  ax: number;
  ay: number;
  side: "left" | "right";
  cardX: number;
  cardY: number;
};

function shortTitle(label: string): string {
  return label.replace(/\s+/g, " ").trim();
}

function pickAnchor(
  key: Exclude<FeatureKey, "photo_quality">,
  overlays: FeatureOverlayPoint[] | undefined,
): { x: number; y: number } {
  const hit = overlays?.find((o) => o.feature === key);
  if (hit) return { x: hit.x, y: hit.y };
  return FALLBACK_ANCHORS[key];
}

function buildCallouts(report: ReportViewModel): Callout[] {
  const ranked = [...SCORED_APPEARANCE_KEYS]
    .filter((k) => isFeatureMeasurable(report.features[k]?.measurable))
    .sort(
      (a, b) =>
        (report.features[b]?.score ?? 0) - (report.features[a]?.score ?? 0),
    )
    .slice(0, 3);

  return ranked.map((key, i) => {
    const score = Math.round(report.features[key].score);
    const { x, y } = pickAnchor(key, report.featureOverlays);
    const side: "left" | "right" =
      i === 1 ? "right" : x < 0.5 ? "left" : i === 0 ? "left" : "right";
    // Card sits outward from the face so the portrait stays clear.
    const cardX = side === "left" ? Math.max(0.04, x - 0.34) : Math.min(0.72, x + 0.08);
    const cardY = Math.max(0.08, Math.min(0.52, y - 0.12 + i * 0.02));
    const tag = FEATURE_LABELS[key].split(" ")[0]!.toUpperCase();
    return {
      id: key,
      index: i + 1,
      key,
      tag: `${tag} #${String(i + 1).padStart(3, "0")}`,
      title: shortTitle(FEATURE_LABELS[key]),
      meta: `Strength · ${score}`,
      note:
        report.features[key].observedSignal?.trim().slice(0, 72) ||
        "Reads clearly on this scan",
      ax: x,
      ay: y,
      side,
      cardX,
      cardY,
    };
  });
}

export function DashboardStrengthMap({
  report,
  portraitSrc,
  avatarBusy = false,
  onTowardLook,
  onOutfits,
}: {
  report: ReportViewModel;
  portraitSrc: string;
  avatarBusy?: boolean;
  onTowardLook: () => void;
  onOutfits: () => void;
}) {
  const callouts = useMemo(() => buildCallouts(report), [report]);
  const [activeId, setActiveId] = useState<string | null>(
    () => callouts[0]?.id ?? null,
  );
  const presentation = useMemo(
    () => buildStrengthsPresentation(report),
    [report],
  );
  const active = callouts.find((c) => c.id === activeId) ?? callouts[0] ?? null;
  const strengthsHref = `/appearance/${report.id}`;

  return (
    <section className="strength-map" aria-label="Strength analysis">
      <div className="strength-map__stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="strength-map__photo"
          src={portraitSrc}
          alt="Your appearance portrait"
        />
        <div className="strength-map__veil" aria-hidden />

        <svg
          className="strength-map__lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {callouts.map((c) => {
            const joinX = c.side === "left" ? c.cardX * 100 + 22 : c.cardX * 100;
            const joinY = c.cardY * 100 + 10;
            return (
              <g key={c.id}>
                <line
                  x1={c.ax * 100}
                  y1={c.ay * 100}
                  x2={joinX}
                  y2={joinY}
                  className={`strength-map__line${
                    active?.id === c.id ? " is-active" : ""
                  }`}
                />
                <circle
                  cx={c.ax * 100}
                  cy={c.ay * 100}
                  r="0.9"
                  className={`strength-map__anchor${
                    active?.id === c.id ? " is-active" : ""
                  }`}
                />
              </g>
            );
          })}
        </svg>

        {callouts.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`strength-map__callout${
              active?.id === c.id ? " is-active" : ""
            }`}
            style={{
              left: `${c.cardX * 100}%`,
              top: `${c.cardY * 100}%`,
            }}
            onClick={() => setActiveId(c.id)}
            aria-pressed={active?.id === c.id}
          >
            <span className="strength-map__tag">{c.tag}</span>
            <span
              className="strength-map__thumb"
              style={{
                backgroundImage: `url(${portraitSrc})`,
                backgroundPosition: `${c.ax * 100}% ${c.ay * 100}%`,
              }}
              aria-hidden
            />
            <span className="strength-map__body">
              <span className="strength-map__title">{c.title}</span>
              <span className="strength-map__meta">{c.meta}</span>
            </span>
          </button>
        ))}

        <p className="strength-map__scan-badge">
          {avatarBusy ? "Generating…" : "Zelko scan"}
        </p>

        <div className="strength-map__panel">
          <p className="strength-map__chip">
            {active
              ? `${active.title} leads this scan`
              : "Strengths mapped on your photo"}
          </p>

          <div className="strength-map__panel-grid">
            <div className="strength-map__panel-copy">
              <p className="strength-map__brand">
                Zelko strengths
                <span aria-hidden>✦</span>
              </p>
              <h2 className="strength-map__headline">
                Detects what already works — then styles that follow your lead.
              </h2>
              <div className="strength-map__cta-row">
                <Link href={strengthsHref} className="strength-map__cta">
                  Open full pass
                </Link>
                <Link href="/upload" className="strength-map__cta-ghost">
                  Upload another
                </Link>
              </div>
            </div>

            <ul className="strength-map__features">
              <li>
                <span className="strength-map__feat-icon" aria-hidden>
                  ⌕
                </span>
                <div>
                  <p className="strength-map__feat-title">Toward your look</p>
                  <p className="strength-map__feat-copy">
                    Compare alignment to a reference without a flaw list.
                  </p>
                  <button
                    type="button"
                    className="strength-map__feat-link"
                    onClick={onTowardLook}
                  >
                    Open →
                  </button>
                </div>
              </li>
              <li>
                <span className="strength-map__feat-icon" aria-hidden>
                  ▦
                </span>
                <div>
                  <p className="strength-map__feat-title">Outfits</p>
                  <p className="strength-map__feat-copy">
                    Looks prescribed from your strengths, with shoppable matches.
                  </p>
                  <button
                    type="button"
                    className="strength-map__feat-link"
                    onClick={onOutfits}
                  >
                    Open →
                  </button>
                </div>
              </li>
              <li>
                <span className="strength-map__feat-icon" aria-hidden>
                  ✶
                </span>
                <div>
                  <p className="strength-map__feat-title">Framing</p>
                  <p className="strength-map__feat-copy">
                    {presentation.summary.persona}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DashboardStrengthEmpty({ loading }: { loading: boolean }) {
  return (
    <section className="strength-map strength-map--empty account-dash__card">
      <div className="strength-map__empty">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
          Strength analysis
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          {loading ? "Loading your scan…" : "Upload a portrait"}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
          Zelko pins what already reads well on your face — then builds style
          and Toward your look from those leads.
        </p>
        {!loading ? (
          <Link
            href="/upload"
            className="mt-5 inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950"
          >
            Start scan
          </Link>
        ) : null}
      </div>
    </section>
  );
}
