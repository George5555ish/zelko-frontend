"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  AppearanceJourneyView,
  AppearancePillars,
  JourneyLook,
  JourneyLookStatus,
  StylePreferences,
} from "@/lib/appearance-index";
import { isLookSettled } from "@/lib/appearance-index";
import { getAuthToken } from "@/lib/auth";
import { deviceAuthHeaders } from "@/lib/device-id";

const LOOK_SLOTS = [0] as const;
const LOOK_COUNT = LOOK_SLOTS.length;

function authHeaders(): HeadersInit {
  const token = getAuthToken();
  return deviceAuthHeaders({
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });
}

type LookPhase =
  | "waiting"
  | "garment"
  | "garment_ready"
  | "pose"
  | "tryon"
  | "ready"
  | "failed";

type UiLook = JourneyLook & { phase: LookPhase };

type UpgradeHotspot = {
  id: string;
  region: "face" | "outfit" | "silhouette";
  top: string;
  left: string;
  title: string;
  tip: string;
};

function labelFor(_index: number): string {
  return "Your prescribed look";
}

function phaseFromStatus(status: JourneyLookStatus): LookPhase {
  if (status === "ready") return "ready";
  if (status === "failed") return "failed";
  if (status === "generating_garment") return "garment";
  if (status === "garment_ready") return "garment_ready";
  if (status === "generating_pose") return "pose";
  if (status === "generating_tryon") return "tryon";
  return "waiting";
}

function phaseLabel(phase: LookPhase): string {
  switch (phase) {
    case "garment":
      return "Generating garment…";
    case "garment_ready":
      return "Garment generated";
    case "pose":
      return "Creating fashion pose…";
    case "tryon":
      return "Styling look via virtual try-on…";
    case "ready":
      return "Ready";
    case "failed":
      return "Couldn’t generate";
    default:
      return "Waiting…";
  }
}

function isBusyPhase(phase: LookPhase): boolean {
  return (
    phase === "garment" ||
    phase === "garment_ready" ||
    phase === "pose" ||
    phase === "tryon"
  );
}

function seedLooks(from?: JourneyLook[] | null): UiLook[] {
  return LOOK_SLOTS.map((index) => {
    const existing = from?.[index];
    if (existing) {
      const phase = phaseFromStatus(existing.status);
      return {
        ...existing,
        phase,
        error:
          phase === "failed" && existing.error
            ? friendlyGenError(0, existing.error)
            : existing.error,
      };
    }
    return {
      id: `look-${index}`,
      index,
      label: labelFor(index),
      status: "pending",
      fileId: null,
      recommendedStyle: "",
      error: null,
      phase: "waiting" as const,
    };
  });
}

function mergeLook(looks: UiLook[], next: UiLook): UiLook[] {
  const copy = [...looks];
  while (copy.length < LOOK_COUNT) {
    copy.push({
      id: `look-${copy.length}`,
      index: copy.length,
      label: labelFor(copy.length),
      status: "pending",
      fileId: null,
      recommendedStyle: "",
      error: null,
      phase: "waiting",
    });
  }
  if (next.index >= 0 && next.index < LOOK_COUNT) {
    copy[next.index] = next;
  }
  return copy.slice(0, LOOK_COUNT);
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function isGatewayTimeout(status: number, raw: string): boolean {
  const text = raw.replace(/\s+/g, " ").trim();
  return (
    status === 502 ||
    status === 504 ||
    status === 408 ||
    /^Internal\s/i.test(text) ||
    text.startsWith("<!DOCTYPE") ||
    text.includes("Unexpected token") ||
    /timed?\s*out/i.test(text) ||
    /took too long/i.test(text) ||
    /socket hang up/i.test(text) ||
    /ECONNRESET/i.test(text)
  );
}

async function fetchJourney(
  reportId: string,
): Promise<AppearanceJourneyView | null> {
  try {
    const res = await fetch(`/api/appearance/${reportId}`, {
      headers: authHeaders(),
      cache: "no-store",
    });
    const data = (await res.json()) as {
      journey?: AppearanceJourneyView;
    };
    return data.journey ?? null;
  } catch {
    return null;
  }
}

/** Poll until this look is ready/failed; stream intermediate phases to the UI. */
async function pollLookUntilSettled(
  reportId: string,
  lookIndex: number,
  opts: {
    signal: AbortSignal;
    onUpdate: (look: JourneyLook) => void;
    maxMs?: number;
    intervalMs?: number;
  },
): Promise<JourneyLook | null> {
  const maxMs = opts.maxMs ?? 360_000;
  const intervalMs = opts.intervalMs ?? 1500;
  const started = Date.now();

  while (Date.now() - started < maxMs) {
    if (opts.signal.aborted) return null;
    const journey = await fetchJourney(reportId);
    const look = journey?.looks?.[lookIndex];
    if (look) {
      opts.onUpdate(look);
      if (isLookSettled(look.status)) return look;
    }
    await sleep(intervalMs);
  }
  return null;
}

async function postGenerateLook(
  reportId: string,
  lookIndex: number,
  signal: AbortSignal,
): Promise<{
  ok: boolean;
  status: number;
  journey?: AppearanceJourneyView;
  look?: JourneyLook;
  error?: string;
  raw: string;
}> {
  const res = await fetch(`/api/appearance/${reportId}/looks/generate`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ lookIndex }),
    signal,
  });
  const raw = await res.text();
  let data: {
    journey?: AppearanceJourneyView;
    look?: JourneyLook;
    error?: string;
  } = {};
  try {
    data = raw ? (JSON.parse(raw) as typeof data) : {};
  } catch {
    data = {};
  }
  return {
    ok: res.ok || res.status === 202,
    status: res.status,
    journey: data.journey,
    look: data.look,
    error: data.error,
    raw,
  };
}

function toUiLook(look: JourneyLook): UiLook {
  const phase = phaseFromStatus(look.status);
  return {
    ...look,
    phase,
    error:
      phase === "failed" && look.error
        ? friendlyGenError(0, look.error)
        : look.error,
  };
}

function ebaySearchHref(style: string): string {
  const query = encodeURIComponent((style || "outfit").slice(0, 80));
  return `https://www.ebay.com/sch/i.html?_nkw=${query}`;
}

type EbayShopLink = {
  id: string;
  label: string;
  query: string;
  href: string;
};

/** Short color words that actually match eBay listing titles. */
const EBAY_COLOR: Record<StylePreferences["favoriteColor"], string> = {
  black: "black",
  navy: "navy",
  beige: "beige",
  white: "white",
  red: "red",
  pink: "pink",
  green: "green",
  blue: "blue",
};

/**
 * Shoppable eBay queries — one piece at a time.
 * Dress / one-piece → single short query.
 * Jeans / trousers / skirt → separate bottom + top searches (never the long outfit sentence).
 */
function buildEbayShopLinks(
  _recommendedStyle: string,
  prefs: StylePreferences | null,
): EbayShopLink[] {
  if (!prefs) {
    const fallback = "women casual outfit";
    return [
      {
        id: "piece",
        label: "Shop",
        query: fallback,
        href: ebaySearchHref(fallback),
      },
    ];
  }

  const color = EBAY_COLOR[prefs.favoriteColor] || prefs.favoriteColor;
  const sil =
    prefs.silhouette === "oversized"
      ? "oversized"
      : prefs.silhouette === "relaxed"
        ? "relaxed"
        : "fitted";

  // One-piece looks: single short search.
  if (prefs.bottomPreference === "dresses") {
    const dressQuery = `${sil} ${color} midi dress`;
    return [
      {
        id: "dress",
        label: "Dress",
        query: dressQuery,
        href: ebaySearchHref(dressQuery),
      },
    ];
  }

  const bottomNoun =
    prefs.bottomPreference === "jeans"
      ? "jeans"
      : prefs.bottomPreference === "trousers"
        ? "trousers"
        : "skirt";

  const bottomLabel =
    prefs.bottomPreference === "jeans"
      ? "Jeans"
      : prefs.bottomPreference === "trousers"
        ? "Trousers"
        : "Skirt";

  const topNoun =
    prefs.vibe === "polished"
      ? "blouse"
      : prefs.vibe === "street"
        ? "crop top"
        : prefs.vibe === "classic"
          ? "knit top"
          : "top";

  const bottomQuery = `${sil} ${color} ${bottomNoun}`.replace(/\s+/g, " ").trim();
  const topQuery = `${color} ${topNoun}`.replace(/\s+/g, " ").trim();

  return [
    {
      id: "bottoms",
      label: bottomLabel,
      query: bottomQuery,
      href: ebaySearchHref(bottomQuery),
    },
    {
      id: "top",
      label: "Top",
      query: topQuery,
      href: ebaySearchHref(topQuery),
    },
  ];
}

/** Approximate hotspots on the after still — coaching upgrades, not landmark locks. */
function buildUpgradeHotspots(
  pillars: AppearancePillars,
  prefs: StylePreferences | null,
  recommendedStyle: string,
): UpgradeHotspot[] {
  const spots: UpgradeHotspot[] = [];
  const faceTip =
    pillars.grooming.tips[0] ??
    pillars.structure.tips[0] ??
    "Keep grooming consistent so rechecks measure real change.";
  spots.push({
    id: "face",
    region: "face",
    top: "18%",
    left: "52%",
    title: "Face & grooming",
    tip: faceTip,
  });

  const structureTip = pillars.structure.tips[0];
  if (structureTip && structureTip !== faceTip) {
    spots.push({
      id: "framing",
      region: "face",
      top: "28%",
      left: "78%",
      title: "Framing",
      tip: structureTip,
    });
  }

  const outfitLine =
    recommendedStyle.trim() ||
    (prefs
      ? `${prefs.vibe} ${prefs.silhouette} ${prefs.bottomPreference}`
      : "Your prescribed outfit");
  spots.push({
    id: "outfit",
    region: "outfit",
    top: "48%",
    left: "28%",
    title: "Outfit match",
    tip: `This look is dialed to your style profile: ${outfitLine}. Shop close matches on eBay next.`,
  });

  if (prefs) {
    spots.push({
      id: "silhouette",
      region: "silhouette",
      top: "72%",
      left: "62%",
      title: `${prefs.silhouette} silhouette`,
      tip: `You chose ${prefs.silhouette} + ${prefs.bottomPreference}. Keep this shape when shopping so the prescription stays coherent.`,
    });
  }

  return spots.slice(0, 4);
}

export function LooksReveal({
  reportId,
  portraitFileId,
  journey,
  onJourneyUpdate,
  onFinish,
}: {
  reportId: string;
  portraitFileId?: string | null;
  journey: AppearanceJourneyView;
  onJourneyUpdate: (journey: AppearanceJourneyView) => void;
  onFinish: () => void;
}) {
  const [looks, setLooks] = useState<UiLook[]>(() => seedLooks(journey.looks));
  const [retryingIndex, setRetryingIndex] = useState<number | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [shopOpen, setShopOpen] = useState(false);
  const [shopLinkId, setShopLinkId] = useState<string | null>(null);
  const onJourneyUpdateRef = useRef(onJourneyUpdate);
  const prefsRef = useRef(journey.looks);
  const retryAbortRef = useRef<AbortController | null>(null);

  const applyLookUpdate = useCallback((look: JourneyLook) => {
    setLooks((prev) => mergeLook(prev, toUiLook(look)));
  }, []);

  useEffect(() => {
    onJourneyUpdateRef.current = onJourneyUpdate;
  }, [onJourneyUpdate]);

  useEffect(() => {
    prefsRef.current = journey.looks;
  }, [journey.looks]);

  useEffect(() => {
    if (journey.looks?.length) {
      setLooks((prev) => {
        const next = seedLooks(journey.looks);
        return next.map((s, i) => {
          const was = prev[i];
          if (
            (s.phase === "waiting" || isBusyPhase(s.phase)) &&
            was &&
            isBusyPhase(was.phase) &&
            s.phase === "waiting"
          ) {
            return was;
          }
          return s;
        });
      });
    }
  }, [journey.looks]);

  const retryLook = useCallback(
    async (lookIndex: number) => {
      if (retryingIndex != null) return;
      retryAbortRef.current?.abort();
      const ac = new AbortController();
      retryAbortRef.current = ac;
      setRetryingIndex(lookIndex);

      const prev = looks[lookIndex];
      setLooks((cur) =>
        mergeLook(cur, {
          ...(prev ?? {
            id: `look-${lookIndex}`,
            index: lookIndex,
            label: labelFor(lookIndex),
            recommendedStyle: "",
            status: "pending",
            fileId: null,
            error: null,
            phase: "waiting",
          }),
          status: prev?.garmentFileId ? "generating_pose" : "generating_garment",
          fileId: null,
          error: null,
          phase: prev?.garmentFileId ? "pose" : "garment",
          garmentFileId: prev?.garmentFileId ?? null,
        }),
      );

      try {
        const posted = await postGenerateLook(reportId, lookIndex, ac.signal);
        if (ac.signal.aborted) return;
        if (posted.journey) onJourneyUpdateRef.current(posted.journey);
        if (posted.look) applyLookUpdate(posted.look);

        if (posted.look && isLookSettled(posted.look.status)) {
          return;
        }

        const settled = await pollLookUntilSettled(reportId, lookIndex, {
          signal: ac.signal,
          onUpdate: applyLookUpdate,
        });
        if (ac.signal.aborted) return;
        if (settled) {
          applyLookUpdate(settled);
          const refreshed = await fetchJourney(reportId);
          if (refreshed) onJourneyUpdateRef.current(refreshed);
        } else {
          applyLookUpdate({
            id: prev?.id ?? `look-${lookIndex}`,
            index: lookIndex,
            label: labelFor(lookIndex),
            status: "failed",
            fileId: null,
            garmentFileId: prev?.garmentFileId ?? null,
            recommendedStyle: prev?.recommendedStyle ?? "",
            error: "Timed out waiting for this look.",
          });
        }
      } catch (err) {
        if (ac.signal.aborted) return;
        applyLookUpdate({
          id: prev?.id ?? `look-${lookIndex}`,
          index: lookIndex,
          label: labelFor(lookIndex),
          status: "failed",
          fileId: null,
          garmentFileId: prev?.garmentFileId ?? null,
          recommendedStyle: prev?.recommendedStyle ?? "",
          error: friendlyGenError(
            0,
            err instanceof Error ? err.message : "Retry failed.",
          ),
        });
      } finally {
        if (!ac.signal.aborted) {
          setRetryingIndex(null);
        }
      }
    },
    [applyLookUpdate, looks, reportId, retryingIndex],
  );

  useEffect(() => {
    const ac = new AbortController();
    const initial = seedLooks(prefsRef.current);
    setLooks(initial);

    void (async () => {
      for (const lookIndex of LOOK_SLOTS) {
        if (ac.signal.aborted) return;

        const latest = await fetchJourney(reportId);
        if (ac.signal.aborted) return;

        const existing = latest?.looks?.[lookIndex];
        if (existing?.status === "ready" && existing.fileId) {
          applyLookUpdate(existing);
          if (latest) onJourneyUpdateRef.current(latest);
          continue;
        }

        if (existing?.status === "failed") {
          applyLookUpdate(existing);
          if (latest) onJourneyUpdateRef.current(latest);
          continue;
        }

        setLooks((prev) =>
          mergeLook(prev, {
            ...(prev[lookIndex] ?? {
              id: `look-${lookIndex}`,
              index: lookIndex,
              label: labelFor(lookIndex),
              recommendedStyle: existing?.recommendedStyle ?? "",
              garmentFileId: existing?.garmentFileId ?? null,
            }),
            status: existing?.status ?? "generating_garment",
            fileId: null,
            error: null,
            phase: existing ? phaseFromStatus(existing.status) : "garment",
          }),
        );

        try {
          const posted = await postGenerateLook(
            reportId,
            lookIndex,
            ac.signal,
          );
          if (ac.signal.aborted) return;

          if (posted.journey) onJourneyUpdateRef.current(posted.journey);
          if (posted.look) applyLookUpdate(posted.look);

          if (posted.look && isLookSettled(posted.look.status)) {
            continue;
          }

          if (
            !posted.ok &&
            posted.status !== 202 &&
            !isGatewayTimeout(posted.status, posted.raw)
          ) {
            console.warn(
              "[LooksReveal] generate returned",
              posted.status,
              posted.raw.slice(0, 200),
            );
          }

          if (!posted.ok && posted.status === 429) {
            applyLookUpdate({
              id: `look-${lookIndex}`,
              index: lookIndex,
              label: labelFor(lookIndex),
              status: "failed",
              fileId: null,
              garmentFileId: existing?.garmentFileId ?? null,
              recommendedStyle: initial[lookIndex]?.recommendedStyle ?? "",
              error:
                posted.error ||
                "This device or network already used the free outfit generation.",
            });
            continue;
          }

          const settled = await pollLookUntilSettled(reportId, lookIndex, {
            signal: ac.signal,
            onUpdate: applyLookUpdate,
          });
          if (ac.signal.aborted) return;

          if (settled) {
            applyLookUpdate(settled);
            const refreshed = await fetchJourney(reportId);
            if (refreshed) onJourneyUpdateRef.current(refreshed);
          } else {
            applyLookUpdate({
              id: `look-${lookIndex}`,
              index: lookIndex,
              label: labelFor(lookIndex),
              status: "failed",
              fileId: null,
              garmentFileId: existing?.garmentFileId ?? null,
              recommendedStyle: initial[lookIndex]?.recommendedStyle ?? "",
              error: "Timed out waiting for this look.",
            });
          }
        } catch (err) {
          if (ac.signal.aborted) return;
          const settled = await pollLookUntilSettled(reportId, lookIndex, {
            signal: ac.signal,
            onUpdate: applyLookUpdate,
            maxMs: 180_000,
          });
          if (ac.signal.aborted) return;

          if (settled) {
            applyLookUpdate(settled);
            const refreshed = await fetchJourney(reportId);
            if (refreshed) onJourneyUpdateRef.current(refreshed);
          } else {
            applyLookUpdate({
              id: `look-${lookIndex}`,
              index: lookIndex,
              label: labelFor(lookIndex),
              status: "failed",
              fileId: null,
              garmentFileId: existing?.garmentFileId ?? null,
              recommendedStyle: "",
              error: friendlyGenError(
                0,
                err instanceof Error ? err.message : "Generation failed.",
              ),
            });
          }
        }
      }

      if (ac.signal.aborted) return;
      const refreshed = await fetchJourney(reportId);
      if (refreshed) onJourneyUpdateRef.current(refreshed);
    })();

    return () => {
      ac.abort();
      retryAbortRef.current?.abort();
    };
  }, [reportId, applyLookUpdate]);

  const look = looks[0] ?? null;
  const ready = Boolean(look?.phase === "ready" && look.fileId);
  const failed = look?.phase === "failed" && retryingIndex == null;
  const loading =
    look != null && (isBusyPhase(look.phase) || retryingIndex === look.index);
  const allSettled =
    looks.length === LOOK_COUNT &&
    looks.every((l) => l.phase === "ready" || l.phase === "failed");
  const youSrc = portraitFileId ? `/api/files/${portraitFileId}` : null;

  const hotspots = useMemo(
    () =>
      buildUpgradeHotspots(
        journey.pillars,
        journey.stylePreferences,
        look?.recommendedStyle ?? "",
      ),
    [journey.pillars, journey.stylePreferences, look?.recommendedStyle],
  );

  const ebayLinks = useMemo(
    () =>
      buildEbayShopLinks(
        look?.recommendedStyle ?? "",
        journey.stylePreferences,
      ),
    [look?.recommendedStyle, journey.stylePreferences],
  );
  const activeShopLink =
    ebayLinks.find((l) => l.id === shopLinkId) ?? ebayLinks[0] ?? null;

  useEffect(() => {
    if (!shopOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShopOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shopOpen]);

  return (
    <section className="ai-reveal">
      <div className="ai-reveal__intro">
        <p className="ai-reveal__eyebrow">Stage 3 · Prescription</p>
        <h2>Before &amp; after</h2>
        <p>
          Your photo versus one prescribed look. Hover the markers on the after
          still for upgrades tied to your profile.
          {loading && look
            ? ` ${phaseLabel(look.phase)}`
            : ready
              ? " Ready."
              : ""}
        </p>
      </div>

      <div className="ai-ba">
        <article className="ai-ba__panel report-glass">
          <div className="ai-ba__media">
            {youSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={youSrc} alt="Before — your photo" className="ai-look-card__img" />
            ) : (
              <div className="ai-look-card__pulse">
                <p className="ai-look-card__pulse-label">Your photo</p>
              </div>
            )}
            <span className="ai-ba__badge">Before</span>
          </div>
          <div className="ai-ba__caption">
            <h3>Original</h3>
            <p>Baseline selfie for comparison.</p>
          </div>
        </article>

        <article
          className={`ai-ba__panel report-glass${loading ? " is-loading" : ""}${failed ? " is-failed" : ""}${ready ? " is-ready" : ""}`}
        >
          <div className="ai-ba__media">
            {ready && look?.fileId ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/files/${look.fileId}`}
                  alt="After — prescribed look"
                  className="ai-look-card__img"
                />
                <div className="ai-ba__hotspots" aria-label="Upgrade highlights">
                  {hotspots.map((spot) => {
                    const open = activeHotspot === spot.id;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        className={`ai-ba__hotspot ai-ba__hotspot--${spot.region}${open ? " is-open" : ""}`}
                        style={{ top: spot.top, left: spot.left }}
                        aria-expanded={open}
                        aria-describedby={`hotspot-tip-${spot.id}`}
                        onMouseEnter={() => setActiveHotspot(spot.id)}
                        onMouseLeave={() => setActiveHotspot(null)}
                        onFocus={() => setActiveHotspot(spot.id)}
                        onBlur={() => setActiveHotspot(null)}
                        onClick={() =>
                          setActiveHotspot((cur) =>
                            cur === spot.id ? null : spot.id,
                          )
                        }
                      >
                        <span className="ai-ba__hotspot-dot" aria-hidden />
                        <span
                          id={`hotspot-tip-${spot.id}`}
                          className="ai-ba__hotspot-tip"
                          role="tooltip"
                        >
                          <strong>{spot.title}</strong>
                          <span>{spot.tip}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : look?.garmentFileId &&
              (look.phase === "garment_ready" ||
                look.phase === "pose" ||
                look.phase === "tryon" ||
                look.phase === "failed") ? (
              <div className="ai-look-card__garment-stage">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/files/${look.garmentFileId}`}
                  alt=""
                  className="ai-look-card__garment-thumb"
                />
                <div
                  className="ai-look-card__pulse ai-look-card__pulse--overlay"
                  aria-hidden
                >
                  {loading ? <span className="ai-look-card__pulse-ring" /> : null}
                  <p className="ai-look-card__pulse-label">
                    {retryingIndex != null
                      ? "Retrying…"
                      : look
                        ? phaseLabel(look.phase)
                        : "Waiting…"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="ai-look-card__pulse" aria-hidden>
                {loading ? (
                  <>
                    <span className="ai-look-card__pulse-ring" />
                    <span className="ai-look-card__pulse-ring ai-look-card__pulse-ring--delay" />
                  </>
                ) : null}
                <p className="ai-look-card__pulse-label">
                  {look ? phaseLabel(look.phase) : "Waiting…"}
                </p>
              </div>
            )}
            <span className="ai-ba__badge ai-ba__badge--after">After</span>
          </div>
          <div className="ai-ba__caption">
            <h3>{look?.label ?? "Prescribed look"}</h3>
            {look?.recommendedStyle ? <p>{look.recommendedStyle}</p> : null}
            {loading ? (
              <p className="ai-look-card__stage">
                {retryingIndex != null && look?.garmentFileId
                  ? "Garment saved · retrying pose + try-on…"
                  : look?.phase === "tryon"
                    ? "Pose ready · styling via virtual try-on…"
                    : look?.phase === "pose"
                      ? "Garment ready · creating a fashion pose…"
                      : phaseLabel(look?.phase ?? "waiting")}
              </p>
            ) : null}
            {failed && look?.error ? (
              <p className="ai-look-card__error">{look.error}</p>
            ) : null}
            {failed && retryingIndex == null ? (
              <button
                type="button"
                className="ai-look-card__retry"
                onClick={() => void retryLook(0)}
              >
                {look?.garmentFileId ? "Retry pose + try-on" : "Retry look"}
              </button>
            ) : null}
          </div>
        </article>

        <aside className="ai-ba__shop report-glass">
          <p className="ai-ba__shop-eyebrow">Shop the look</p>
          <h3>Check eBay prices</h3>
          <p>
            Browse live listings that match this outfit prescription. Affiliate
            links stay free.
          </p>
          <button
            type="button"
            className={`ai-ba__shop-cta${ready ? "" : " is-disabled"}`}
            disabled={!ready}
            onClick={() => {
              setShopLinkId(ebayLinks[0]?.id ?? null);
              setShopOpen(true);
            }}
          >
            {ready ? "Browse eBay prices →" : "Available when look is ready"}
          </button>
          {ebayLinks.length > 0 ? (
            <p className="ai-ba__shop-query">
              Searches: {ebayLinks.map((l) => l.query).join(" · ")}
            </p>
          ) : look?.recommendedStyle ? (
            <p className="ai-ba__shop-query">{look.recommendedStyle}</p>
          ) : null}
        </aside>
      </div>

      {shopOpen && activeShopLink ? (
        <EbayShopModal
          links={ebayLinks}
          activeId={activeShopLink.id}
          onSelect={setShopLinkId}
          onClose={() => setShopOpen(false)}
        />
      ) : null}

      <div className="ai-reveal__cta">
        <button
          type="button"
          className="ai-btn"
          onClick={onFinish}
          disabled={!allSettled && !ready}
        >
          {allSettled || ready ? "Finish this pass" : "Continue while look finishes"}
        </button>
      </div>
    </section>
  );
}

function EbayShopModal({
  links,
  activeId,
  onSelect,
  onClose,
}: {
  links: EbayShopLink[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const active = links.find((l) => l.id === activeId) ?? links[0]!;
  const [items, setItems] = useState<EbayListingCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    setItems([]);

    void (async () => {
      try {
        const qs = new URLSearchParams({
          q: active.query,
          limit: "12",
        });
        const res = await fetch(`/api/ebay/search?${qs}`, {
          headers: authHeaders(),
          signal: ac.signal,
          cache: "no-store",
        });
        const raw = await res.text();
        let data: {
          items?: EbayListingCard[];
          error?: string;
        } = {};
        try {
          data = raw ? (JSON.parse(raw) as typeof data) : {};
        } catch {
          data = {};
        }
        if (ac.signal.aborted) return;
        if (!res.ok) {
          setError(data.error || `Search failed (${res.status}).`);
          setItems([]);
          return;
        }
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        if (ac.signal.aborted) return;
        setError(
          err instanceof Error ? err.message : "Couldn’t load eBay listings.",
        );
        setItems([]);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [active.query]);

  return (
    <div className="ai-ebay-modal">
      <button
        type="button"
        className="ai-ebay-modal__backdrop"
        aria-label="Close eBay shop"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby="ai-ebay-modal-title"
        className="ai-ebay-modal__panel report-glass"
      >
        <header className="ai-ebay-modal__header">
          <div>
            <p className="ai-ebay-modal__eyebrow">eBay</p>
            <h2 id="ai-ebay-modal-title">Shop this look</h2>
          </div>
          <button
            type="button"
            className="ai-ebay-modal__close"
            onClick={onClose}
          >
            Close
          </button>
        </header>

        <div className="ai-ebay-modal__tabs" role="tablist" aria-label="Search queries">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              role="tab"
              aria-selected={link.id === active.id}
              className={`ai-ebay-modal__tab${link.id === active.id ? " is-active" : ""}`}
              onClick={() => onSelect(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="ai-ebay-modal__toolbar">
          <p className="ai-ebay-modal__query">{active.query}</p>
          <a
            className="ai-ebay-modal__open"
            href={active.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            Open search on eBay
          </a>
        </div>

        <div className="ai-ebay-modal__results">
          {loading ? (
            <p className="ai-ebay-modal__status">Searching live listings…</p>
          ) : error ? (
            <div className="ai-ebay-modal__status ai-ebay-modal__status--error">
              <p>{error}</p>
              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                Open this search on eBay →
              </a>
            </div>
          ) : items.length === 0 ? (
            <div className="ai-ebay-modal__status">
              <p>No listings matched this query.</p>
              <a
                href={active.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
              >
                Try the full eBay search →
              </a>
            </div>
          ) : (
            <ul className="ai-ebay-modal__grid">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    className="ai-ebay-modal__card"
                    href={item.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                  >
                    <div className="ai-ebay-modal__card-media">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.imageUrl} alt="" />
                      ) : (
                        <span className="ai-ebay-modal__card-placeholder" />
                      )}
                    </div>
                    <div className="ai-ebay-modal__card-body">
                      <p className="ai-ebay-modal__card-title">{item.title}</p>
                      <p className="ai-ebay-modal__card-price">
                        {formatEbayPrice(item.price, item.currency)}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

type EbayListingCard = {
  id: string;
  title: string;
  price: number | null;
  currency: string;
  imageUrl: string | null;
  shopUrl: string;
};

function formatEbayPrice(price: number | null, currency: string): string {
  if (price == null) return "See price on eBay";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    return `${currency} ${price.toFixed(2)}`;
  }
}

function friendlyGenError(status: number, raw: string): string {
  const text = raw.replace(/\s+/g, " ").trim();
  if (isGatewayTimeout(status, text)) {
    return "Still working on this look — hang tight, or retry if it stalls.";
  }
  if (status === 422 || /failed \(422\)/i.test(text)) {
    return "The image model rejected this request (invalid inputs). Check backend logs for the prompt + fal detail.";
  }
  if (status === 503 || /not configured/i.test(text)) {
    return "Outfit generation isn’t configured (missing FAL_KEY).";
  }
  const cleaned = text
    .replace(/^Outfit generation failed \(\d+\):\s*/i, "")
    .replace(/^\{.*\}$/, "Generation failed — see backend logs.");
  return cleaned.slice(0, 160) || "Generation failed.";
}
