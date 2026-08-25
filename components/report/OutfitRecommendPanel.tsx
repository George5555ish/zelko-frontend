"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  fetchOutfitStills,
  generateOutfitStill,
  portraitUrl,
  type AuthUser,
} from "@/lib/auth";

type Recommendation = {
  eyeColor: string;
  hairColor: string;
  undertone: string;
  complementaryColors: string[];
  recommendedStyle: string;
  rationale: string;
};

type Still = {
  id: string;
  fileId: string;
  createdAt: string;
  promptMeta?: {
    eyeColor?: string;
    hairColor?: string;
    complementaryColors?: string[];
    recommendedStyle?: string;
    rationale?: string;
  };
};

export function OutfitRecommendPanel({
  baselineReportId,
  isAuthed,
  isPro,
  reportPath,
  onUserChange,
}: {
  baselineReportId: string;
  isAuthed: boolean;
  isPro: boolean;
  reportPath: string;
  onUserChange?: (user: AuthUser) => void;
}) {
  const [stills, setStills] = useState<Still[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null,
  );
  const [cap, setCap] = useState(1);
  const [used, setUsed] = useState(0);
  const [remaining, setRemaining] = useState(1);
  const [busy, setBusy] = useState(false);
  const [needsPro, setNeedsPro] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(isAuthed);

  const refresh = useCallback(async () => {
    if (!isAuthed) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const outfits = await fetchOutfitStills(baselineReportId);
      setStills(outfits.stills);
      setCap(outfits.cap);
      setUsed(outfits.used);
      setRemaining(outfits.remaining);
      onUserChange?.(outfits.user);
      const meta = outfits.stills[0]?.promptMeta;
      if (meta?.recommendedStyle && meta?.rationale) {
        setRecommendation({
          eyeColor: meta.eyeColor ?? "",
          hairColor: meta.hairColor ?? "",
          undertone: "",
          complementaryColors: meta.complementaryColors ?? [],
          recommendedStyle: meta.recommendedStyle,
          rationale: meta.rationale,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load outfits.");
    } finally {
      setLoading(false);
    }
  }, [baselineReportId, isAuthed, onUserChange]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function onGenerate() {
    setBusy(true);
    setError(null);
    setNeedsPro(false);
    try {
      const result = await generateOutfitStill(baselineReportId);
      setStills((prev) => [result.still, ...prev]);
      setCap(result.cap);
      setUsed(result.used);
      setRemaining(result.remaining);
      if (result.recommendation) setRecommendation(result.recommendation);
      onUserChange?.(result.user);
    } catch (err) {
      const e = err as Error & { needsPro?: boolean };
      setError(e.message);
      setNeedsPro(e.needsPro === true);
    } finally {
      setBusy(false);
    }
  }

  if (!isAuthed) {
    return (
      <div className="report-glass rounded-3xl p-5 text-center text-white">
        <p className="text-xs uppercase tracking-[0.16em] text-white/40">
          Outfit
        </p>
        <p className="mt-2 text-sm text-white/65">
          Sign in to generate one free outfit matched to your face, eyes, and
          hair.
        </p>
        <Link
          href={`/login?reportId=${encodeURIComponent(baselineReportId)}&next=${encodeURIComponent(reportPath)}`}
          className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950"
        >
          Sign in to generate
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="report-glass rounded-3xl p-5 text-sm text-white/45">
        Loading outfit…
      </div>
    );
  }

  const latestSrc =
    stills.length > 0 ? portraitUrl(stills[0].fileId) : null;

  return (
    <div className="report-glass space-y-4 rounded-3xl p-5 text-white">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-white/40">
          Outfit recommendation
        </p>
        <h3 className="mt-1 text-base font-semibold text-white">
          One look for your face
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-white/45">
          Colors and style from your eyes, hair, and undertone. Free: 1. Another
          requires Pro.
        </p>
        <p className="mt-2 text-[11px] text-white/35">
          {used} / {cap} used · {remaining} remaining
        </p>
      </div>

      {error ? (
        <p className="text-sm text-amber-200/90" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy || remaining <= 0}
          onClick={() => void onGenerate()}
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950 disabled:opacity-50"
        >
          {busy
            ? "Generating…"
            : remaining > 0
              ? used === 0
                ? "Generate recommended outfit"
                : "Generate another outfit"
              : "Free outfit used"}
        </button>
        {!isPro && (remaining <= 0 || needsPro) ? (
          <Link
            href="/pricing"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85"
          >
            Generate another with Pro
          </Link>
        ) : null}
      </div>

      {recommendation ? (
        <div className="rounded-2xl bg-white/5 px-3.5 py-3">
          <p className="text-sm font-medium text-white/90">
            {recommendation.recommendedStyle}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/55">
            {recommendation.rationale}
          </p>
          <p className="mt-2 text-[11px] text-white/40">
            Eyes {recommendation.eyeColor || "—"} · Hair{" "}
            {recommendation.hairColor || "—"}
            {recommendation.complementaryColors.length > 0
              ? ` · ${recommendation.complementaryColors.join(", ")}`
              : ""}
          </p>
        </div>
      ) : null}

      {latestSrc ? (
        <div className="overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={latestSrc}
            alt="Recommended outfit"
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
      ) : null}

      {stills.length > 1 ? (
        <div className="grid grid-cols-3 gap-2">
          {stills.slice(1).map((s) => {
            const src = portraitUrl(s.fileId);
            if (!src) return null;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.id}
                src={src}
                alt="Earlier outfit still"
                className="aspect-[3/4] w-full rounded-xl object-cover"
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
