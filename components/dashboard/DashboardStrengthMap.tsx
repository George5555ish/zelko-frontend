"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FEATURE_LABELS,
  SCORED_APPEARANCE_KEYS,
  type FeatureKey,
  type FeatureOverlayPoint,
  type ReportViewModel,
} from "@/lib/types/report";
import { isFeatureMeasurable } from "@/lib/score-tone";
import { buildStrengthsPresentation } from "@/lib/strengths-presentation";
import { fetchOutfitStills, getAuthToken } from "@/lib/auth";
import type { AppearanceJourneyView, JourneyLook } from "@/lib/appearance-index";

const FALLBACK_ANCHORS: Record<
  Exclude<FeatureKey, "photo_quality">,
  { x: number; y: number }
> = {
  eyebrow_shape: { x: 0.42, y: 0.28 },
  eye_spacing: { x: 0.58, y: 0.36 },
  facial_proportions: { x: 0.5, y: 0.48 },
  face_symmetry: { x: 0.72, y: 0.52 },
  jawline_definition: { x: 0.5, y: 0.72 },
  skin_clarity: { x: 0.32, y: 0.46 },
  grooming_signal: { x: 0.66, y: 0.4 },
};

type Callout = {
  id: string;
  index: number;
  key: Exclude<FeatureKey, "photo_quality">;
  tag: string;
  title: string;
  meta: string;
  ax: number;
  ay: number;
  side: "left" | "right";
};

type OutfitTile = {
  id: string;
  label: string;
  style: string | null;
  imageSrc: string | null;
  ebayHref: string | null;
};

function pickAnchor(
  key: Exclude<FeatureKey, "photo_quality">,
  overlays: FeatureOverlayPoint[] | undefined,
): { x: number; y: number } {
  const hit = overlays?.find((o) => o.feature === key);
  if (hit) return { x: hit.x, y: hit.y };
  return FALLBACK_ANCHORS[key];
}

function buildCallouts(report: ReportViewModel): Callout[] {
  const measurable = [...SCORED_APPEARANCE_KEYS].filter((k) =>
    isFeatureMeasurable(report.features[k]?.measurable),
  );
  const pool = measurable.length > 0 ? measurable : [...SCORED_APPEARANCE_KEYS];
  const ranked = pool
    .sort(
      (a, b) =>
        (report.features[b]?.score ?? 0) - (report.features[a]?.score ?? 0),
    )
    .slice(0, 2);

  return ranked.map((key, i) => {
    const score = Math.round(report.features[key]?.score ?? 0);
    const { x, y } = pickAnchor(key, report.featureOverlays);
    const side: "left" | "right" = i === 0 ? "left" : "right";
    const tag = FEATURE_LABELS[key].split(" ")[0]!.toUpperCase();
    return {
      id: key,
      index: i + 1,
      key,
      tag: `${tag} #${String(i + 1).padStart(3, "0")}`,
      title: FEATURE_LABELS[key],
      meta: `Strength · ${score}`,
      ax: Math.min(0.78, Math.max(0.22, x)),
      ay: Math.min(0.58, Math.max(0.2, y)),
      side,
    };
  });
}

function ebaySearchHref(query: string): string {
  return `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
    query.slice(0, 80),
  )}`;
}

function tilesFromJourney(looks: JourneyLook[]): OutfitTile[] {
  return looks
    .filter((l) => l.status === "ready")
    .map((look) => {
      const style = look.recommendedStyle?.trim() || look.label;
      return {
        id: look.id,
        label: look.label,
        style: look.recommendedStyle,
        imageSrc: look.fileId ? `/api/files/${look.fileId}` : null,
        ebayHref: style ? ebaySearchHref(style) : null,
      };
    });
}

function tilesFromStills(
  stills: {
    id: string;
    fileId: string;
    promptMeta?: { recommendedStyle?: string };
  }[],
): OutfitTile[] {
  return stills.map((still, i) => {
    const style = still.promptMeta?.recommendedStyle?.trim() || null;
    return {
      id: still.id,
      label: `Outfit ${i + 1}`,
      style,
      imageSrc: `/api/files/${still.fileId}`,
      ebayHref: style ? ebaySearchHref(style) : null,
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
  const [outfitTiles, setOutfitTiles] = useState<OutfitTile[]>([]);
  const [outfitsLoading, setOutfitsLoading] = useState(true);

  const persona = useMemo(() => {
    try {
      return buildStrengthsPresentation(report).summary.persona;
    } catch {
      return "Strengths mapped from your latest scan.";
    }
  }, [report]);
  const active = callouts.find((c) => c.id === activeId) ?? callouts[0] ?? null;
  const strengthsHref = `/appearance/${report.id}`;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setOutfitsLoading(true);
      try {
        const token = getAuthToken();
        const [journeyRes, stills] = await Promise.all([
          fetch(`/api/appearance/${report.id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            cache: "no-store",
          })
            .then(
              (res) =>
                res.json() as Promise<{
                  journey?: AppearanceJourneyView;
                }>,
            )
            .catch(() => ({ journey: undefined })),
          fetchOutfitStills(report.id).catch(() => null),
        ]);

        if (cancelled) return;

        const fromJourney = tilesFromJourney(journeyRes.journey?.looks ?? []);
        const fromStills = stills ? tilesFromStills(stills.stills) : [];
        // Prefer journey stills with images; fill with AI outfit stills; dedupe by image.
        const merged: OutfitTile[] = [];
        const seen = new Set<string>();
        for (const tile of [...fromJourney, ...fromStills]) {
          const key = tile.imageSrc || tile.id;
          if (seen.has(key)) continue;
          seen.add(key);
          merged.push(tile);
          if (merged.length >= 4) break;
        }
        setOutfitTiles(merged);
      } finally {
        if (!cancelled) setOutfitsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [report.id]);

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
            const joinX = c.side === "left" ? 8 : 92;
            const joinY = c.side === "left" ? 22 : 28;
            const midX = c.side === "left" ? c.ax * 100 - 10 : c.ax * 100 + 10;
            return (
              <g key={c.id}>
                <path
                  d={`M ${c.ax * 100} ${c.ay * 100} L ${midX} ${joinY} L ${joinX} ${joinY}`}
                  className={`strength-map__line${
                    active?.id === c.id ? " is-active" : ""
                  }`}
                />
                <circle
                  cx={c.ax * 100}
                  cy={c.ay * 100}
                  r="1.1"
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
            className={`strength-map__callout strength-map__callout--${c.side}${
              active?.id === c.id ? " is-active" : ""
            }`}
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
      </div>

      <div className="strength-map__side">
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
                  <p className="strength-map__feat-copy">{persona}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="strength-map__outfits">
          <div className="strength-map__outfits-head">
            <div>
              <p className="strength-map__outfits-eyebrow">Looks &amp; eBay</p>
              <h3 className="strength-map__outfits-title">
                {outfitTiles.length > 0
                  ? "Your generated outfits"
                  : "Outfits land here"}
              </h3>
            </div>
            <button
              type="button"
              className="strength-map__feat-link"
              onClick={onOutfits}
            >
              All outfits →
            </button>
          </div>

          {outfitsLoading ? (
            <p className="strength-map__outfits-empty">Loading looks…</p>
          ) : outfitTiles.length === 0 ? (
            <div className="strength-map__outfits-empty-card">
              <p>
                Finish the style journey or generate an outfit to fill this
                space with stills and eBay matches.
              </p>
              <button
                type="button"
                className="strength-map__cta-ghost"
                onClick={onOutfits}
              >
                Open outfits
              </button>
            </div>
          ) : (
            <ul className="strength-map__outfit-grid">
              {outfitTiles.map((tile) => (
                <li key={tile.id} className="strength-map__outfit-card">
                  {tile.imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={tile.imageSrc} alt={tile.label} />
                  ) : (
                    <div className="strength-map__outfit-ph" aria-hidden />
                  )}
                  <div className="strength-map__outfit-meta">
                    <p className="strength-map__outfit-label">{tile.label}</p>
                    {tile.style ? (
                      <p className="strength-map__outfit-style">{tile.style}</p>
                    ) : null}
                    {tile.ebayHref ? (
                      <a
                        href={tile.ebayHref}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="strength-map__feat-link"
                      >
                        Search eBay →
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
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
          Celebrity style match
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          {loading ? "Loading your match…" : "Upload photos to match"}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
          Basic match needs 1–2 clear face/upper-body photos. The full profile
          unlocks with 2 full-body + 2 half-body shots.
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
