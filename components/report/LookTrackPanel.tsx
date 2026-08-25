"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  analyzeTargetLook,
  deleteMyReport,
  fetchProfile,
  fetchTargetLookReport,
  portraitUrl,
  type AuthUser,
} from "@/lib/auth";
import { extractFaceLandmarksFromFile } from "@/lib/mediapipe";
import {
  FEATURE_LABELS,
  type ReportViewModel,
  type TargetFeatureDiff,
} from "@/lib/types/report";
import { ProfileIntakeForm } from "@/components/profile/ProfileIntakeForm";

function recommendationsFromDiffs(diffs: TargetFeatureDiff[]) {
  return [...diffs]
    .filter((d) => d.measurable && d.gap >= 8)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 5)
    .map((d) => {
      const label = FEATURE_LABELS[d.feature] ?? d.feature;
      let action = `Close the gap on ${label} toward your reference look.`;
      if (d.feature === "skin_clarity") {
        action =
          "Match the reference skin clarity with consistent gentle skincare and even lighting in check-in photos.";
      } else if (d.feature === "grooming_signal") {
        action =
          "Echo the reference grooming: cleaner edges, outfit clarity, and intentional styling in your next shoot.";
      } else if (d.feature === "jawline_definition") {
        action =
          "Improve jawline read with posture, lighting angle, and grooming along the jaw contour.";
      } else if (d.feature === "eyebrow_shape") {
        action =
          "Shape and fill brows to better mirror the reference arch and density.";
      }
      return {
        feature: d.feature,
        action,
        effort: d.gap > 25 ? "medium" : "low",
        confidence: d.confidence.toLowerCase(),
      };
    });
}

/**
 * Toward-your-look flow: lifestyle profile + reference diff.
 * Baseline scores live under AI appearance — no nested mode tabs here.
 */
export function LookTrackPanel({
  baselineReport,
  isAuthed,
  isPro = false,
  onUserChange,
  tone = "dark",
}: {
  baselineReport: ReportViewModel;
  isAuthed: boolean;
  isPro?: boolean;
  onUserChange?: (user: AuthUser) => void;
  tone?: "light" | "dark";
}) {
  const [profileComplete, setProfileComplete] = useState(false);
  const [profile, setProfile] = useState<
    import("@/lib/profile").UserProfile | null
  >(null);
  const [targetReport, setTargetReport] = useState<ReportViewModel | null>(
    null,
  );
  const [recs, setRecs] = useState<
    { feature: string; action: string; effort: string; confidence: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refConsent, setRefConsent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [replaceBusy, setReplaceBusy] = useState(false);

  const baselineId =
    baselineReport.kind === "target_look"
      ? (baselineReport.baselineReportId ?? baselineReport.id)
      : baselineReport.id;

  const refresh = useCallback(async () => {
    if (!isAuthed) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const p = await fetchProfile();
      setProfile(p.profile);
      setProfileComplete(p.profileComplete);
      onUserChange?.(p.user);

      const target = await fetchTargetLookReport(baselineId);
      setTargetReport(target);
      if (target) {
        setRecs(recommendationsFromDiffs(target.targetDiff ?? []));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load look track.",
      );
    } finally {
      setLoading(false);
    }
  }, [baselineId, isAuthed, onUserChange]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const rankedDiffs = useMemo(() => {
    const diffs = targetReport?.targetDiff ?? [];
    return [...diffs].sort((a, b) => {
      if (a.measurable !== b.measurable) return a.measurable ? -1 : 1;
      return b.gap - a.gap;
    });
  }, [targetReport]);

  async function onReferenceSelected(file: File | null) {
    if (!file) return;
    if (!refConsent) {
      setError("Confirm reference photo retention before uploading.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const extracted = await extractFaceLandmarksFromFile(file);
      if (!extracted.landmarks?.length) {
        throw new Error(
          "Couldn't find a clear face. Full-body or looking-down shots often fail — try a closer crop of the face looking toward the camera.",
        );
      }

      const formData = new FormData();
      formData.append("file", extracted.fileForUpload);
      formData.append("retainForTracking", "true");
      formData.append("landmarks", JSON.stringify(extracted.landmarks));

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("zelko.authToken")
          : null;
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData,
      });
      const uploadData = (await uploadRes.json().catch(() => null)) as {
        fileId?: string;
        error?: string;
      } | null;
      if (!uploadRes.ok || !uploadData?.fileId) {
        throw new Error(uploadData?.error ?? "Reference upload failed.");
      }

      const result = await analyzeTargetLook({
        baselineReportId: baselineId,
        referenceFileId: uploadData.fileId,
        referenceLandmarks: extracted.landmarks,
      });
      setTargetReport(result.report);
      setRecs(
        result.recommendations.length > 0
          ? result.recommendations
          : recommendationsFromDiffs(result.report.targetDiff ?? []),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Target-look analysis failed.",
      );
    } finally {
      setBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  if (!isAuthed) {
    return (
      <section className="look-track-panel report-glass rounded-2xl p-5 sm:p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
          Toward your look
        </p>
        <h3 className="mt-1 text-lg font-semibold text-white">
          Diff against a reference
        </h3>
        <p className="mt-2 text-sm text-white/50">
          Sign in to add a lifestyle profile, upload a reference photo, and
          compare skin, grooming, and facial features against the look you want.
        </p>
        <Link
          href={`/login?next=/report/${baselineReport.id}`}
          className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950"
        >
          Sign in to continue
        </Link>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="look-track-panel report-glass rounded-2xl p-5 text-sm text-white/45">
        Loading toward your look…
      </section>
    );
  }

  const refUrl = portraitUrl(
    targetReport?.referencePortraitFileId ?? targetReport?.referenceFileId,
  );
  const youUrl = portraitUrl(baselineReport.portraitFileId);

  return (
    <section className="look-track-panel report-glass space-y-5 rounded-2xl p-5 sm:p-6">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
          Toward your look
        </p>
        <h3 className="mt-1 text-lg font-semibold text-white">
          Diff against a reference
        </h3>
        <p className="mt-1 max-w-xl text-sm text-white/45">
          Set lifestyle context, then upload a reference photo. We compare
          landmarks, skin clarity, and grooming — not ethnicity.
        </p>
      </div>

      {error ? (
        <p className="text-sm text-rose-300" role="alert">
          {error}
        </p>
      ) : null}

      <ProfileIntakeForm
        initial={profile}
        compact
        tone={tone}
        onSaved={(user, saved) => {
          onUserChange?.(user);
          setProfile(saved);
          setProfileComplete(true);
        }}
      />

      {!profileComplete ? (
        <p className="text-sm text-white/45">
          Save your lifestyle profile first — it shapes styling context for this
          reference diff.
        </p>
      ) : !targetReport ? (
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <p className="text-sm text-white/55">
                Upload a reference photo of the look you want. Closer face
                crops work best — we auto-zoom full-body shots when we can.
              </p>
          <label className="flex items-start gap-2.5 text-sm text-white/55">
            <input
              type="checkbox"
              checked={refConsent}
              onChange={(e) => setRefConsent(e.target.checked)}
              className="mt-1 accent-white"
            />
            <span>
              Keep this reference photo so we can re-diff. You can delete linked
              reports anytime.
            </span>
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={busy || !refConsent}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex cursor-pointer rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:opacity-50"
            >
              {busy ? "Analyzing…" : "Upload reference photo"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={busy}
              onChange={(e) =>
                void onReferenceSelected(e.target.files?.[0] ?? null)
              }
            />
            {busy ? (
              <p className="text-sm text-white/40">
                Landmarks + skin + grooming…
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Comparison: large portraits + feature charts */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Alignment to this reference
                </p>
                <p className="mt-0.5 text-3xl font-semibold tabular-nums tracking-tight text-white">
                  {targetReport.overallAlignment ?? "—"}
                  <span className="ml-1 text-sm font-medium text-white/40">
                    / 100
                  </span>
                </p>
              </div>
              <button
                type="button"
                disabled={replaceBusy}
                className="cursor-pointer text-sm text-white/45 underline-offset-2 hover:text-white hover:underline disabled:opacity-50"
                onClick={() => {
                  void (async () => {
                    if (!targetReport) return;
                    const ok = window.confirm(
                      "Remove this reference look? You can upload a new one after.",
                    );
                    if (!ok) return;
                    setReplaceBusy(true);
                    setError(null);
                    try {
                      await deleteMyReport(targetReport.id);
                      setTargetReport(null);
                      setRecs([]);
                      setRefConsent(false);
                    } catch (err) {
                      setError(
                        err instanceof Error
                          ? err.message
                          : "Could not remove reference.",
                      );
                    } finally {
                      setReplaceBusy(false);
                    }
                  })();
                }}
              >
                {replaceBusy ? "Removing…" : "Replace reference"}
              </button>
            </div>

            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)]">
              <div className="grid grid-cols-2 gap-2 p-3 sm:gap-3 sm:p-4">
                <figure className="relative overflow-hidden rounded-xl bg-black/30">
                  {youUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={youUrl}
                      alt="You"
                      className="aspect-[3/4] w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex aspect-[3/4] items-center justify-center text-sm text-white/35">
                      You
                    </div>
                  )}
                  <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90">
                    You
                  </figcaption>
                </figure>
                <figure className="relative overflow-hidden rounded-xl bg-black/30">
                  {refUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={refUrl}
                      alt="Reference look"
                      className="aspect-[3/4] w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex aspect-[3/4] items-center justify-center text-sm text-white/35">
                      Reference
                    </div>
                  )}
                  <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90">
                    Reference
                  </figcaption>
                </figure>
              </div>

              <div className="border-t border-white/8 p-3 sm:p-4 lg:border-l lg:border-t-0">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                  Feature alignment
                </p>
                <ul className="space-y-3">
                  {rankedDiffs.map((d) => (
                    <li key={d.feature}>
                      <div className="flex items-baseline justify-between gap-2 text-sm">
                        <span className="font-medium text-white/90">
                          {FEATURE_LABELS[d.feature] ?? d.feature}
                        </span>
                        {d.measurable ? (
                          <span className="shrink-0 tabular-nums text-[11px] text-white/40">
                            You {d.userScore} · Ref {d.referenceScore}
                          </span>
                        ) : (
                          <span className="text-[11px] text-white/30">
                            Not comparable
                          </span>
                        )}
                      </div>
                      {d.measurable ? (
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-white/70"
                              style={{
                                width: `${Math.max(4, Math.min(100, d.alignment))}%`,
                              }}
                            />
                          </div>
                          <span className="w-7 text-right text-[11px] tabular-nums text-white/50">
                            {d.alignment}
                          </span>
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Roadmap: where you are → where you want to be (Pro) */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="border-b border-white/8 px-4 py-3 sm:px-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
                Your roadmap
              </p>
              <h4 className="mt-0.5 text-lg font-semibold text-white">
                From here to this look
              </h4>
              <p className="mt-1 max-w-xl text-sm text-white/45">
                Ordered steps based on the biggest gaps — act, then re-check
                under the same light.
              </p>
            </div>

            {isPro ? (
              <ol className="space-y-0 p-4 sm:p-5">
                <li className="relative flex gap-3 pb-5">
                  <span
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-neutral-950"
                    aria-hidden
                  >
                    1
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      Where you are
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      Alignment {targetReport.overallAlignment ?? "—"}/100 to
                      this reference. Baseline composite{" "}
                      {baselineReport.overallScore}.
                    </p>
                  </div>
                </li>
                {(recs.length > 0
                  ? recs
                  : rankedDiffs
                      .filter((d) => d.measurable && d.gap >= 5)
                      .slice(0, 4)
                      .map((d) => ({
                        feature: d.feature,
                        action: `Close the gap on ${FEATURE_LABELS[d.feature] ?? d.feature}.`,
                        effort: d.gap > 25 ? "medium" : "low",
                        confidence: d.confidence.toLowerCase(),
                      }))
                ).map((r, i) => (
                  <li
                    key={`${r.feature}-${r.action}`}
                    className="relative flex gap-3 pb-5 last:pb-0"
                  >
                    <span
                      className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[11px] font-bold text-white/80"
                      aria-hidden
                    >
                      {i + 2}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        {FEATURE_LABELS[r.feature as keyof typeof FEATURE_LABELS] ??
                          r.feature}
                        <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/35">
                          {r.effort} effort
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-white/55">{r.action}</p>
                    </div>
                  </li>
                ))}
                <li className="relative flex gap-3 border-t border-white/8 pt-5">
                  <span
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-white/25 text-[11px] font-bold text-white/70"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      Where you want to be
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      Re-upload weekly under consistent lighting to prove
                      movement toward this reference — never framed as a
                      decline.
                    </p>
                    <Link
                      href="/upload"
                      className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-white/90"
                    >
                      Schedule next check-in
                    </Link>
                  </div>
                </li>
              </ol>
            ) : (
              <div className="relative px-4 py-6 sm:px-5">
                <ol
                  className="pointer-events-none select-none space-y-4 blur-[5px]"
                  aria-hidden
                >
                  {[
                    "Where you are — current alignment",
                    "Close the largest gap first",
                    "Lock lighting and angle for check-ins",
                    "Where you want to be — prove the shift",
                  ].map((label, i) => (
                    <li key={label} className="flex gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-[11px] font-bold text-white/50">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/55">{label}</p>
                    </li>
                  ))}
                </ol>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1c20]/55 px-5 text-center backdrop-blur-[2px]">
                  <p className="text-sm font-semibold text-white">
                    Unlock your roadmap with Pro
                  </p>
                  <p className="mt-1 max-w-sm text-sm text-white/50">
                    See the ordered path from this score to your reference look
                    — plus weekly tracking to prove change.
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-4 inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                  >
                    Upgrade to Pro
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
