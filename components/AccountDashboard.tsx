"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  type ReportViewModel,
} from "@/lib/types/report";
import { isFeatureMeasurable } from "@/lib/score-tone";
import { LookTrackPanel } from "@/components/report/LookTrackPanel";
import { OutfitRecommendPanel } from "@/components/report/OutfitRecommendPanel";
import { JourneyLooksGallery } from "@/components/dashboard/OutfitsSection";
import type { DashboardTheme } from "@/hooks/useDashboardTheme";
import "./account-dash.css";

type AnalysisMode = "assistant" | "target";
type DashView = "overview" | "outfits";

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

  const strongest = useMemo(() => {
    if (!latest) return null;
    const ranked = [...SCORED_APPEARANCE_KEYS]
      .filter((k) => isFeatureMeasurable(latest.features[k]?.measurable))
      .sort(
        (a, b) =>
          (latest.features[b]?.score ?? 0) - (latest.features[a]?.score ?? 0),
      );
    const key = ranked[0];
    if (!key) return null;
    return {
      key,
      label: FEATURE_LABELS[key],
      score: Math.round(latest.features[key].score),
    };
  }, [latest]);

  const portraitSrc = accountPortraitUrl(latest);
  const strengthsHref = latest ? `/appearance/${latest.id}` : "/upload";
  const reportHref = latest ? `/report/${latest.id}` : "/upload";

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
                New scan
              </Link>
              <Link
                href={strengthsHref}
                className="inline-flex items-center rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-white/90"
              >
                {latest ? "Open strengths" : "Start scan"}
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
              <p className="text-xs font-semibold">Your scan</p>
              <p
                className={`mt-0.5 text-[11px] ${
                  analysisMode === "assistant"
                    ? "text-neutral-500"
                    : "text-white/35"
                }`}
              >
                Strengths & next steps
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
                Compare to a reference
              </p>
            </button>
          </div>
          ) : null}

          {error ? (
            <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </p>
          ) : null}

          {user.isPro && reports.length === 0 && !loading ? (
            <div className="account-dash__card px-5 py-4">
              <p className="text-sm font-semibold text-white">
                Upload a portrait to start
              </p>
              <p className="mt-1 text-sm text-white/50">
                Your first scan unlocks strengths, style, and Toward your look.
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
            <div className="account-dash__hub">
              <section className="account-dash__card overflow-hidden">
                <div className="account-dash__portrait account-dash__portrait--clean">
                  {portraitSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={portraitSrc}
                      alt="Your appearance portrait"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                      <p className="text-sm text-white/55">
                        {loading
                          ? "Loading your portrait…"
                          : "Upload a portrait to see what already works."}
                      </p>
                      {!loading ? (
                        <Link
                          href="/upload"
                          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950"
                        >
                          Start scan
                        </Link>
                      ) : null}
                    </div>
                  )}
                  <div className="account-dash__badge">
                    {avatarBusy ? "Generating…" : "Zelko scan"}
                  </div>
                </div>
              </section>

              <div className="flex min-w-0 flex-col gap-3">
                <section className="account-dash__card p-5 sm:p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    What already works
                  </p>
                  {latest && strongest ? (
                    <>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                        {strongest.label}
                      </h2>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                        Your latest scan lead. Open the strengths pass for the
                        full map — style and Toward your look build from here.
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <Link
                          href={strengthsHref}
                          className="inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                        >
                          Open strengths
                        </Link>
                        <Link
                          href={reportHref}
                          className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                        >
                          Full report
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                        Start with a scan
                      </h2>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                        Zelko maps what already reads well on your face, then
                        points style and looks from those strengths.
                      </p>
                      <Link
                        href="/upload"
                        className="mt-5 inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                      >
                        Upload portrait
                      </Link>
                    </>
                  )}
                </section>

                <div className="account-dash__paths">
                  <button
                    type="button"
                    className="account-dash__path"
                    onClick={() => selectMode("target")}
                  >
                    <p className="account-dash__path-label">Toward your look</p>
                    <p className="account-dash__path-copy">
                      Compare yourself to a reference photo
                    </p>
                  </button>
                  <button
                    type="button"
                    className="account-dash__path"
                    onClick={goOutfits}
                  >
                    <p className="account-dash__path-label">Outfits</p>
                    <p className="account-dash__path-copy">
                      Prescribed looks and shoppable matches
                    </p>
                  </button>
                  <Link href="/upload" className="account-dash__path">
                    <p className="account-dash__path-label">Re-scan</p>
                    <p className="account-dash__path-copy">
                      Prove what&apos;s working under the same light
                    </p>
                  </Link>
                </div>

                {user.isPro ? (
                  <section className="account-dash__card flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                        Pro
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        {user.cancelAtPeriodEnd && user.currentPeriodEnd
                          ? `Active until ${new Date(user.currentPeriodEnd).toLocaleDateString("en-GB")}.`
                          : "Full map, tracking, and checklist included."}
                      </p>
                      {billingMessage ? (
                        <p className="mt-1 text-sm text-emerald-300">
                          {billingMessage}
                        </p>
                      ) : null}
                    </div>
                    {!user.cancelAtPeriodEnd ? (
                      <button
                        type="button"
                        disabled={billingBusy}
                        onClick={() => void handleCancelSubscription()}
                        className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/10 disabled:opacity-60"
                      >
                        {billingBusy ? "Canceling…" : "Cancel"}
                      </button>
                    ) : null}
                  </section>
                ) : null}

                {baselineReports.length > 1 ? (
                  <section className="account-dash__card p-4 sm:p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                          Earlier scans
                        </p>
                        <h2 className="mt-1 text-base font-semibold text-white">
                          {baselineReports.length - 1} more
                        </h2>
                      </div>
                      <Link
                        href="/tracking"
                        className="text-xs font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline"
                      >
                        Progress
                      </Link>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {baselineReports.slice(1, 4).map((report) => (
                        <li
                          key={report.id}
                          className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
                        >
                          <p className="text-xs text-white/55">
                            {new Date(report.createdAt).toLocaleDateString(
                              "en-GB",
                            )}
                          </p>
                          <div className="flex gap-2">
                            <Link
                              href={`/appearance/${report.id}`}
                              className="text-xs font-semibold text-white/80 hover:text-white"
                            >
                              Open
                            </Link>
                            <button
                              type="button"
                              disabled={deletingId === report.id}
                              onClick={() => void handleDelete(report.id)}
                              className="cursor-pointer text-xs font-semibold text-white/45 hover:text-rose-200 disabled:opacity-60"
                            >
                              {deletingId === report.id ? "…" : "Delete"}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>
            </div>
          ) : null}

        </div>
      </div>
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
