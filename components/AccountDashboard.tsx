"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  accountPortraitUrl,
  cancelProSubscription,
  deleteMyReport,
  ensureStandardizedPortrait,
  fetchMyReports,
  type AuthUser,
} from "@/lib/auth";
import {
  FEATURE_LABELS,
  SCORED_APPEARANCE_KEYS,
  type FeatureKey,
  type ReportViewModel,
} from "@/lib/types/report";
import { isFeatureMeasurable } from "@/lib/score-tone";
import { recommendationsForScore } from "@/lib/recommendations";
import { LookTrackPanel } from "@/components/report/LookTrackPanel";
import { OutfitRecommendPanel } from "@/components/report/OutfitRecommendPanel";
import { JourneyLooksGallery } from "@/components/dashboard/OutfitsSection";
import type { DashboardTheme } from "@/hooks/useDashboardTheme";
import "./account-dash.css";

type AnalysisMode = "assistant" | "target";
type DashView = "overview" | "outfits";

const RING_FEATURES: {
  key: "overall" | Exclude<FeatureKey, "photo_quality">;
  label: string;
}[] = [
  { key: "overall", label: "Overall" },
  { key: "skin_clarity", label: "Clarity" },
  { key: "jawline_definition", label: "Jawline" },
  { key: "face_symmetry", label: "Symmetry" },
  { key: "facial_proportions", label: "Balance" },
];

export function AccountDashboard({
  user,
  theme = "dark",
  onToggleTheme,
  onUserChange,
  onSignOut,
}: {
  user: AuthUser;
  theme?: DashboardTheme;
  onToggleTheme?: () => void;
  onUserChange: (user: AuthUser) => void;
  onSignOut: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const viewParam = searchParams.get("view");
  const dashView: DashView = viewParam === "outfits" ? "outfits" : "overview";
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>(
    modeParam === "target" ? "target" : "assistant",
  );

  const [reports, setReports] = useState<ReportViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [billingBusy, setBillingBusy] = useState(false);
  const [billingMessage, setBillingMessage] = useState<string | null>(null);
  const [avatarBusy, setAvatarBusy] = useState(false);

  useEffect(() => {
    setAnalysisMode(modeParam === "target" ? "target" : "assistant");
  }, [modeParam]);

  function selectMode(mode: AnalysisMode) {
    setAnalysisMode(mode);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("view");
    if (mode === "target") params.set("mode", "target");
    else params.delete("mode");
    const q = params.toString();
    router.replace(q ? `/dashboard?${q}` : "/dashboard", { scroll: false });
  }

  function goOutfits() {
    router.replace("/dashboard?view=outfits", { scroll: false });
  }

  function goOverview() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("view");
    const q = params.toString();
    router.replace(q ? `/dashboard?${q}` : "/dashboard", { scroll: false });
  }

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyReports();
      setReports(data.reports);
      onUserChange(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }, [onUserChange]);

  useEffect(() => {
    void load();
  }, [load]);

  const baselineReports = useMemo(
    () => reports.filter((r) => r.kind !== "target_look"),
    [reports],
  );
  const latest = baselineReports[0] ?? null;
  const baseline =
    baselineReports.length > 1
      ? baselineReports[baselineReports.length - 1]!
      : null;

  // Backfill standardized portrait for older reports (once).
  useEffect(() => {
    if (!latest?.id || latest.standardizedPortraitFileId || !latest.portraitFileId) {
      return;
    }
    let cancelled = false;
    setAvatarBusy(true);
    void (async () => {
      try {
        const updated = await ensureStandardizedPortrait(latest.id);
        if (!cancelled) {
          setReports((prev) =>
            prev.map((r) => (r.id === updated.id ? updated : r)),
          );
        }
      } catch {
        /* keep source portrait */
      } finally {
        if (!cancelled) setAvatarBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [latest?.id, latest?.standardizedPortraitFileId, latest?.portraitFileId]);

  const focusAreas = useMemo(() => {
    if (!latest) return [];
    const priority = new Set(latest.priorityFeatures ?? []);
    const weak = (
      SCORED_APPEARANCE_KEYS as Exclude<FeatureKey, "photo_quality">[]
    )
      .filter((key) => {
        const f = latest.features[key];
        return isFeatureMeasurable(f.measurable) && f.score < 70;
      })
      .sort((a, b) => latest.features[a].score - latest.features[b].score);

    const ordered: Exclude<FeatureKey, "photo_quality">[] = [];
    for (const key of latest.priorityFeatures ?? []) {
      if (!ordered.includes(key)) ordered.push(key);
    }
    for (const key of weak) {
      if (!ordered.includes(key)) ordered.push(key);
    }
    return ordered.slice(0, 5).map((key) => {
      const score = latest.features[key].score;
      const concern = Math.max(0, Math.min(100, 100 - score));
      const level =
        concern >= 55 ? "High" : concern >= 35 ? "Moderate" : "Low";
      return {
        key,
        label: FEATURE_LABELS[key],
        score,
        concern,
        level,
        prioritized: priority.has(key),
        signal: latest.features[key].observedSignal,
      };
    });
  }, [latest]);

  const recCards = useMemo(() => {
    if (!latest) return [];
    const out: { title: string; body: string; feature: FeatureKey }[] = [];
    for (const key of SCORED_APPEARANCE_KEYS) {
      const score = latest.features[key].score;
      if (!isFeatureMeasurable(latest.features[key].measurable)) continue;
      const recs = recommendationsForScore(key, score);
      if (recs[0]) {
        out.push({
          feature: key,
          title: FEATURE_LABELS[key],
          body: recs[0].action,
        });
      }
      if (out.length >= 3) break;
    }
    if (out.length === 0) {
      out.push({
        feature: "skin_clarity",
        title: "Keep the loop",
        body: "Re-upload under the same light next week to prove what’s working.",
      });
    }
    return out;
  }, [latest]);

  const progress = useMemo(() => {
    if (!latest || !baseline || latest.id === baseline.id) return null;
    const delta = latest.overallScore - baseline.overallScore;
    const label =
      Math.abs(delta) < 3
        ? "No significant change detected"
        : delta > 0
          ? "Improvement detected on the composite"
          : "No significant change detected";
    return {
      from: baseline.overallScore,
      to: latest.overallScore,
      delta,
      label,
      sessions: baselineReports.length,
    };
  }, [baseline, latest, baselineReports.length]);

  const heatVars = useMemo(() => {
    if (!latest) {
      return {
        "--heat-cheek": "0.15",
        "--heat-brow": "0.12",
        "--heat-jaw": "0.1",
      } as CSSProperties;
    }
    const skin = latest.features.skin_clarity.score;
    const brow = latest.features.eyebrow_shape.score;
    const jaw = latest.features.jawline_definition.score;
    const cheek = Math.max(0.08, Math.min(0.55, (100 - skin) / 100));
    const browHeat = Math.max(0.06, Math.min(0.4, (100 - brow) / 140));
    const jawHeat = Math.max(0.06, Math.min(0.35, (100 - jaw) / 160));
    return {
      "--heat-cheek": String(cheek),
      "--heat-brow": String(browHeat),
      "--heat-jaw": String(jawHeat),
    } as CSSProperties;
  }, [latest]);

  const concernThumb = useMemo(() => {
    if (!latest) return 18;
    const avgConcern =
      focusAreas.length > 0
        ? focusAreas.reduce((a, b) => a + b.concern, 0) / focusAreas.length
        : Math.max(0, 100 - latest.overallScore);
    return Math.max(8, Math.min(92, avgConcern));
  }, [focusAreas, latest]);

  const portraitSrc = accountPortraitUrl(latest);

  async function handleDelete(reportId: string) {
    const ok = window.confirm(
      "Delete this report permanently? Linked photos for it will be removed too.",
    );
    if (!ok) return;
    setDeletingId(reportId);
    setError(null);
    try {
      await deleteMyReport(reportId);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleCancelSubscription() {
    const endHint = user.currentPeriodEnd
      ? ` You’ll keep Pro until ${new Date(user.currentPeriodEnd).toLocaleDateString("en-GB")}.`
      : " You’ll keep Pro until the end of the current billing period.";
    const ok = window.confirm(
      `Cancel Zelko Pro?${endHint} You can resubscribe anytime from Pricing.`,
    );
    if (!ok) return;
    setBillingBusy(true);
    setBillingMessage(null);
    setError(null);
    try {
      const result = await cancelProSubscription();
      onUserChange(result.user);
      setBillingMessage(result.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not cancel subscription.",
      );
    } finally {
      setBillingBusy(false);
    }
  }

  const firstName =
    user.firstName?.trim() ||
    user.email.split("@")[0] ||
    "there";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="account-dash mx-auto max-w-7xl" data-theme={theme}>
      <div className="account-dash__shell">
        <nav className="account-dash__rail" aria-label="Account">
          <Link href="/" title="Home">
            <IconHome />
            <span className="account-dash__rail-label">Home</span>
          </Link>
          <button
            type="button"
            title="Dashboard"
            data-active={dashView === "overview" ? "true" : undefined}
            onClick={goOverview}
          >
            <IconGrid />
            <span className="account-dash__rail-label">Dashboard</span>
          </button>
          <button
            type="button"
            title="Outfits"
            data-active={dashView === "outfits" ? "true" : undefined}
            onClick={goOutfits}
          >
            <IconOutfit />
            <span className="account-dash__rail-label">Outfits</span>
          </button>
          <Link href="/upload" title="New scan">
            <IconScan />
            <span className="account-dash__rail-label">New scan</span>
          </Link>
          <Link href="/tracking" title="Progress">
            <IconHeart />
            <span className="account-dash__rail-label">Progress</span>
          </Link>
          <Link href="/pricing" title={user.isPro ? "Plan" : "Upgrade"}>
            <IconSpark />
            <span className="account-dash__rail-label">
              {user.isPro ? "Plan" : "Upgrade"}
            </span>
          </Link>
          {onToggleTheme ? (
            <button
              type="button"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
              aria-label={
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              onClick={onToggleTheme}
            >
              {theme === "dark" ? <IconSun /> : <IconMoon />}
              <span className="account-dash__rail-label">
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            </button>
          ) : null}
          <button type="button" title="Sign out" onClick={onSignOut}>
            <IconOut />
            <span className="account-dash__rail-label">Sign out</span>
          </button>
        </nav>

        <div className="account-dash__main">
          <header className="account-dash__top">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/5 text-sm font-semibold uppercase">
                {firstName.slice(0, 1)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {dashView === "outfits"
                    ? "Your outfits"
                    : `${greeting}, ${firstName}`}
                </p>
                <p className="truncate text-xs text-white/45">
                  {dashView === "outfits"
                    ? "Prescribed looks, AI stills, and eBay matches"
                    : user.email}
                </p>
              </div>
              <span
                className={`ml-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                  user.isPro
                    ? "bg-white text-neutral-950"
                    : "border border-white/20 text-white/70"
                }`}
              >
                {user.isPro
                  ? user.cancelAtPeriodEnd
                    ? "Pro · ending"
                    : "Pro"
                  : "Free"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {!user.isPro ? (
                <Link
                  href="/pricing"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/16"
                >
                  Upgrade to Pro
                </Link>
              ) : null}
              <Link
                href="/upload"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/10"
              >
                New assessment
              </Link>
              <Link
                href={latest ? `/report/${latest.id}` : "/upload"}
                className="inline-flex items-center rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-white/90"
              >
                Open report
              </Link>
            </div>
          </header>

          {dashView === "overview" ? (
          <div
            className="flex flex-wrap gap-1 rounded-2xl border border-white/15 bg-white/[0.04] p-1 shadow-[0_8px_28px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)]"
            role="tablist"
            aria-label="Analysis mode"
          >
            <button
              type="button"
              role="tab"
              aria-selected={analysisMode === "assistant"}
              onClick={() => selectMode("assistant")}
              className={`flex-1 cursor-pointer rounded-xl px-4 py-2.5 text-left transition sm:flex-none sm:min-w-[12rem] ${
                analysisMode === "assistant"
                  ? "bg-white text-neutral-950 shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
                  : "text-white/55 hover:bg-white/5 hover:text-white"
              }`}
            >
              <p className="text-xs font-semibold">AI appearance</p>
              <p
                className={`mt-0.5 text-[11px] ${
                  analysisMode === "assistant"
                    ? "text-neutral-500"
                    : "text-white/35"
                }`}
              >
                Default scores & coaching
              </p>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={analysisMode === "target"}
              onClick={() => selectMode("target")}
              className={`flex-1 cursor-pointer rounded-xl px-4 py-2.5 text-left transition sm:flex-none sm:min-w-[12rem] ${
                analysisMode === "target"
                  ? "bg-white text-neutral-950 shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
                  : "text-white/55 hover:bg-white/5 hover:text-white"
              }`}
            >
              <p className="text-xs font-semibold">Toward your look</p>
              <p
                className={`mt-0.5 text-[11px] ${
                  analysisMode === "target"
                    ? "text-neutral-500"
                    : "text-white/35"
                }`}
              >
                Diff vs a reference photo
              </p>
            </button>
          </div>
          ) : null}

          {error ? (
            <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </p>
          ) : null}

          {!user.isPro ? (
            <section className="account-dash__card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Free plan
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
                  Unlock Pro for full coaching
                </h2>
                <p className="mt-1 max-w-xl text-sm text-white/50">
                  Full feature breakdown, confidence labels, weekly tracking,
                  and checklist — £9.99/mo.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link
                  href="/pricing"
                  className="inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                >
                  Upgrade to Pro
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                >
                  See plans
                </Link>
              </div>
            </section>
          ) : null}

          {user.isPro && reports.length === 0 && !loading ? (
            <div className="account-dash__card px-5 py-4">
              <p className="text-sm font-semibold text-white">
                Upload your first report to use Pro
              </p>
              <p className="mt-1 text-sm text-white/50">
                Progress and checklist unlock after your first linked assessment.
              </p>
            </div>
          ) : null}

          {dashView === "outfits" ? (
            <div className="flex flex-col gap-4">
              {latest ? (
                <>
                  <JourneyLooksGallery reportId={latest.id} />
                  <section className="account-dash__outfit">
                    <OutfitRecommendPanel
                      baselineReportId={latest.id}
                      isAuthed
                      compact
                      reportPath="/dashboard?view=outfits"
                      onUserChange={onUserChange}
                    />
                  </section>
                </>
              ) : (
                <section className="account-dash__card p-5 sm:p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    Outfits
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-white">
                    Need a scan first
                  </h2>
                  <p className="mt-2 text-sm text-white/50">
                    Complete an appearance assessment to unlock prescribed looks
                    and eBay matches.
                  </p>
                  <Link
                    href="/upload"
                    className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950"
                  >
                    Start assessment
                  </Link>
                </section>
              )}
            </div>
          ) : null}

          {dashView === "overview" && analysisMode === "target" ? (
            latest ? (
              <LookTrackPanel
                baselineReport={latest}
                isAuthed
                isPro={user.isPro}
                tone={theme === "light" ? "light" : "dark"}
                onUserChange={onUserChange}
              />
            ) : (
              <section className="account-dash__card p-5 sm:p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Toward your look
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  Need a baseline first
                </h3>
                <p className="mt-2 text-sm text-white/50">
                  Complete a free appearance scan, then upload a reference photo
                  to compare alignment.
                </p>
                <Link
                  href="/upload"
                  className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950"
                >
                  Start assessment
                </Link>
              </section>
            )
          ) : null}

          {dashView === "overview" && analysisMode === "assistant" ? (
          <div className="account-dash__grid">
            {/* Left: standardized portrait */}
            <section className="account-dash__card overflow-hidden">
              <div className="account-dash__portrait" style={heatVars}>
                {portraitSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={portraitSrc}
                    alt="Standardized appearance portrait"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                    <p className="text-sm text-white/55">
                      {loading
                        ? "Loading your portrait…"
                        : "Complete an assessment to generate your clinical avatar."}
                    </p>
                    {!loading ? (
                      <Link
                        href="/upload"
                        className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950"
                      >
                        Start assessment
                      </Link>
                    ) : null}
                  </div>
                )}
                <div className="account-dash__heat" aria-hidden />
                <div className="account-dash__badge">
                  {avatarBusy ? "Generating…" : "Zelko scan"}
                </div>
                {latest ? (
                  <div className="account-dash__result">
                    Result {latest.overallScore}
                  </div>
                ) : null}
                <div className="account-dash__concern-scale">
                  <span>Low</span>
                  <div className="account-dash__concern-scale-track">
                    <span
                      className="account-dash__concern-scale-thumb"
                      style={{ left: `${concernThumb}%` }}
                    />
                  </div>
                  <span>High</span>
                </div>
              </div>
            </section>

            {/* Right: metrics */}
            <div className="flex min-w-0 flex-col gap-3">
              <section className="account-dash__card p-4 sm:p-5">
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                      Appearance overview
                    </p>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
                      Measured signals
                    </h2>
                  </div>
                  {latest ? (
                    <p className="text-xs text-white/40">
                      {new Date(latest.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  ) : null}
                </div>
                <div className="account-dash__rings">
                  {RING_FEATURES.map((item) => {
                    const value =
                      item.key === "overall"
                        ? (latest?.overallScore ?? 0)
                        : (latest?.features[item.key].score ?? 0);
                    const locked =
                      item.key !== "overall" &&
                      latest &&
                      !isFeatureMeasurable(latest.features[item.key].measurable);
                    return (
                      <ScoreRing
                        key={item.key}
                        label={item.label}
                        value={locked ? null : value}
                      />
                    );
                  })}
                </div>
              </section>

              <section className="account-dash__card p-4 sm:p-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Focus areas
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
                  Where to act
                </h2>
                {!latest ? (
                  <p className="mt-3 text-sm text-white/45">
                    Soft spots appear here after your first report.
                  </p>
                ) : focusAreas.length === 0 ? (
                  <p className="mt-3 text-sm text-white/45">
                    No soft spots below 70 — keep the routine consistent.
                  </p>
                ) : (
                  focusAreas.map((item) => (
                    <div key={item.key} className="account-dash__bar-row">
                      <p className="truncate text-xs font-medium text-white/75">
                        {item.label}
                      </p>
                      <div className="account-dash__bar-track">
                        <div
                          className="account-dash__bar-fill"
                          style={{ width: `${item.concern}%` }}
                        />
                      </div>
                      <p className="text-right text-[11px] tabular-nums text-white/55">
                        {item.level}
                      </p>
                    </div>
                  ))
                )}
              </section>

              <section className="account-dash__card p-4 sm:p-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Recommendations
                </p>
                <div className="account-dash__recs mt-3">
                  {recCards.map((rec) => (
                    <div key={rec.title + rec.body} className="account-dash__rec">
                      <p className="text-xs font-semibold text-white">
                        {rec.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/50">
                        {rec.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="account-dash__footer-row">
                <section className="account-dash__card p-4 sm:p-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    Next check-in
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Weekly re-upload window
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    Tracking compares under consistent lighting — never a decline
                    callout.
                  </p>
                  <Link
                    href="/upload"
                    className="mt-3 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/85"
                  >
                    Schedule scan
                  </Link>
                </section>
                <section className="account-dash__card p-4 sm:p-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    Your progress
                  </p>
                  {progress ? (
                    <>
                      <p className="mt-2 text-2xl font-semibold tabular-nums text-white">
                        {progress.delta > 0 ? "+" : ""}
                        {progress.to - progress.from}
                        <span className="ml-1 text-sm font-medium text-white/45">
                          composite
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-white/45">{progress.label}</p>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 text-2xl font-semibold tabular-nums text-white">
                        —
                      </p>
                      <p className="mt-1 text-xs text-white/45">
                        Needs a second linked session to compare.
                      </p>
                    </>
                  )}
                  {user.isPro ? (
                    <Link
                      href="/tracking"
                      className="mt-3 inline-flex text-xs font-semibold text-white/80 underline-offset-4 hover:underline"
                    >
                      Open tracking →
                    </Link>
                  ) : (
                    <Link
                      href="/pricing"
                      className="mt-3 inline-flex text-xs font-semibold text-white/80 underline-offset-4 hover:underline"
                    >
                      Unlock tracking →
                    </Link>
                  )}
                </section>
              </div>
            </div>

            {latest ? (
              <section className="account-dash__card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    Outfits
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-white">
                    Prescribed looks &amp; eBay matches
                  </h2>
                  <p className="mt-1 text-sm text-white/50">
                    Journey stills, AI outfit recommendations, and shoppable
                    eBay searches live on the Outfits page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={goOutfits}
                  className="shrink-0 cursor-pointer rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                >
                  Open outfits
                </button>
              </section>
            ) : null}
          </div>
          ) : null}

          {user.isPro ? (
            <section className="account-dash__card p-4 sm:p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                Billing
              </p>
              <p className="mt-2 text-sm text-white/60">
                {user.cancelAtPeriodEnd && user.currentPeriodEnd
                  ? `Pro stays active until ${new Date(user.currentPeriodEnd).toLocaleDateString("en-GB")}.`
                  : "£9.99 GBP / month. Cancel anytime."}
              </p>
              {billingMessage ? (
                <p className="mt-2 text-sm text-emerald-300">{billingMessage}</p>
              ) : null}
              {!user.cancelAtPeriodEnd ? (
                <button
                  type="button"
                  disabled={billingBusy}
                  onClick={() => void handleCancelSubscription()}
                  className="mt-3 cursor-pointer rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 disabled:opacity-60"
                >
                  {billingBusy ? "Canceling…" : "Cancel subscription"}
                </button>
              ) : null}
            </section>
          ) : (
            <section className="account-dash__card p-4 sm:p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                Plan
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
                You&apos;re on Free
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-white/50">
                <li>Composite score + strongest features preview</li>
                <li>Up to 3 outfit stills</li>
                <li className="text-white/35">
                  Pro adds full breakdown, tracking, and checklist
                </li>
              </ul>
              <Link
                href="/pricing"
                className="mt-4 inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
              >
                Upgrade to Pro — £9.99/mo
              </Link>
            </section>
          )}

          <section className="account-dash__card p-4 sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Reports
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
                  Your assessments
                </h2>
              </div>
              <Link
                href="/upload"
                className="text-xs font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                New assessment
              </Link>
            </div>

            {loading ? (
              <p className="mt-5 text-sm text-white/45">Loading…</p>
            ) : baselineReports.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-8 text-center">
                <p className="text-sm text-white/55">No reports linked yet.</p>
                <Link
                  href="/upload"
                  className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950"
                >
                  Start free report
                </Link>
              </div>
            ) : (
              <ul className="mt-5 space-y-2.5">
                {baselineReports.map((report, index) => {
                  const face = accountPortraitUrl(report);
                  const topPriority = report.priorityFeatures?.[0];
                  return (
                    <li
                      key={report.id}
                      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-white/5">
                          {face ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={face}
                              alt=""
                              className="h-full w-full object-cover object-top"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-white/35">
                              —
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">
                            Score {report.overallScore}
                            {index === 0 ? (
                              <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
                                Latest
                              </span>
                            ) : null}
                          </p>
                          <p className="mt-0.5 text-xs text-white/40">
                            {new Date(report.createdAt).toLocaleString()}
                            {topPriority
                              ? ` · focus ${FEATURE_LABELS[topPriority]}`
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        <Link
                          href={`/report/${report.id}`}
                          className="inline-flex rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-neutral-950"
                        >
                          Open
                        </Link>
                        <button
                          type="button"
                          disabled={deletingId === report.id}
                          onClick={() => void handleDelete(report.id)}
                          className="inline-flex cursor-pointer rounded-full border border-white/15 bg-transparent px-3.5 py-2 text-xs font-semibold text-white/70 transition hover:border-rose-300/40 hover:text-rose-200 disabled:opacity-60"
                        >
                          {deletingId === report.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}

function ScoreRing({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const pct = value == null ? 0 : Math.max(0, Math.min(100, value)) / 100;
  const dash = `${c * pct} ${c}`;
  return (
    <div className="account-dash__ring">
      <div className="account-dash__ring-chart">
        <svg viewBox="0 0 72 72" aria-hidden>
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke="var(--ad-ring-track)"
            strokeWidth="6"
          />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke="var(--ad-ring-stroke)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={dash}
          />
        </svg>
        <span>{value == null ? "—" : value}</span>
      </div>
      <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/45">
        {label}
      </p>
    </div>
  );
}

function IconSun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconMoon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18.5 14.2A7.2 7.2 0 0 1 9.8 5.5 7.5 7.5 0 1 0 18.5 14.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconScan() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4H5a1 1 0 0 0-1 1v2M17 4h2a1 1 0 0 1 1 1v2M7 20H5a1 1 0 0 1-1-1v-2M17 20h2a1 1 0 0 0 1-1v-2M8 12h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M6.2 6.2l2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.3 15.7l-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconOutfit() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 4.5 12 3l3 1.5 3.5 1.2v3.3L16 11v9H8v-9L5.5 9V5.7L9 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconOut() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 7V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-2M14 12H4m0 0 3-3M4 12l3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
