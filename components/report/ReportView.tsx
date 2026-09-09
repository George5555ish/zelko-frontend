"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { recommendationsForScore } from "@/lib/recommendations";
import {
  FEATURE_MUTABILITY,
  MUTABILITY_HINTS,
  MUTABILITY_LABELS,
} from "@/lib/feature-mutability";
import { buildAppearanceSummary } from "@/lib/appearance-summary";
import { isFeatureMeasurable, scoreToneClass } from "@/lib/score-tone";
import type { FeatureKey, ReportViewModel } from "@/lib/types/report";
import {
  FEATURE_LABELS,
  SCORED_APPEARANCE_KEYS,
} from "@/lib/types/report";
import {
  portraitUrl,
  registerAccount,
  loginAccount,
  fetchMe,
  startProCheckout,
  devUnlockPro,
  linkReportToAccount,
} from "@/lib/auth";
import { useAuthUser } from "@/lib/use-auth-user";
import { navForAuth } from "@/lib/site-nav";
import {
  MenuToggleButton,
  MobileNavSheet,
} from "@/components/site/MobileNavSheet";
import { InteractivePortrait } from "@/components/report/InteractivePortrait";
import { ReportOrbitLayout } from "@/components/report/ReportOrbitLayout";
import { ActionChecklist } from "@/components/report/ActionChecklist";
import { LookTrackPanel } from "@/components/report/LookTrackPanel";
import { OutfitRecommendPanel } from "@/components/report/OutfitRecommendPanel";
import { ReportAnalyticsSection } from "@/components/report/ReportAnalyticsSection";
import { PrivacyDataStatement } from "@/components/site/PrivacyDataStatement";
import "./report-dash.css";
const FREE_TOP_COUNT = 2;

type ReportLayoutMode = "classic" | "orbit";
const LAYOUT_STORAGE_KEY = "zelko-report-layout";

export function ReportView({
  report,
  initialPaid = false,
}: {
  report: ReportViewModel;
  initialPaid?: boolean;
}) {
  const [paid, setPaid] = useState(initialPaid);
  const [signupOpen, setSignupOpen] = useState(false);
  /** Why the auth modal opened — unlock requires account before Stripe. */
  const [signupReason, setSignupReason] = useState<"save" | "unlock">("save");
  const [layout, setLayout] = useState<ReportLayoutMode>("classic");
  const [unlockBusy, setUnlockBusy] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutJustSucceeded, setCheckoutJustSucceeded] = useState(false);
  const { user, ready, isAuthed } = useAuthUser();
  const navLinks = navForAuth(isAuthed);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (stored === "classic" || stored === "orbit") setLayout(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    // Signed-in free users get the full feature report within the upload cap;
    // Pro still gates tracking / checklist elsewhere.
    if (user?.isPro || isAuthed) setPaid(true);
  }, [user?.isPro, isAuthed]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      // After Stripe redirect, poll briefly — webhook may lag.
      if (
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("checkout") ===
          "success"
      ) {
        setCheckoutJustSucceeded(true);
        for (let i = 0; i < 5; i++) {
          await new Promise((r) => setTimeout(r, 1200));
          const again = await fetchMe();
          if (cancelled) return;
          if (again?.isPro) {
            setPaid(true);
            try {
              await linkReportToAccount(report.id);
            } catch {
              /* report may already be linked */
            }
            break;
          }
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [report.id]);

  // Soft “save report” prompt only for guests — never for signed-in users.
  useEffect(() => {
    if (!ready || !isAuthed) return;
    let cancelled = false;
    void (async () => {
      try {
        await linkReportToAccount(report.id);
      } catch {
        /* already linked to someone else, or guest edge */
      }
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthed, report.id]);

  useEffect(() => {
    if (!ready || isAuthed) {
      if (isAuthed) setSignupOpen(false);
      return;
    }
    const id = window.setTimeout(() => {
      setSignupReason((reason) => (reason === "unlock" ? reason : "save"));
      setSignupOpen(true);
    }, 2800);
    return () => window.clearTimeout(id);
  }, [ready, isAuthed]);

  /** Stripe / Pro checkout — callers must already be authenticated. */
  async function runProCheckout() {
    setUnlockError(null);
    setUnlockBusy(true);
    try {
      const me = await fetchMe();
      if (!me) {
        setSignupReason("unlock");
        setSignupOpen(true);
        return;
      }
      try {
        await linkReportToAccount(report.id);
      } catch {
        /* already linked or guest edge */
      }
      if (me.isPro) {
        setPaid(true);
        return;
      }

      const checkout = await startProCheckout({
        successPath: `/report/${report.id}?checkout=success`,
        cancelPath: `/report/${report.id}?checkout=cancel`,
      });

      if (checkout.alreadyPro) {
        setPaid(true);
        return;
      }

      if (checkout.url) {
        window.location.href = checkout.url;
        return;
      }

      if (checkout.devUnlock) {
        const updated = await devUnlockPro();
        if (updated.isPro) setPaid(true);
        return;
      }

      setUnlockError(
        checkout.error ??
          "Billing is not configured yet. Set Stripe keys on the backend.",
      );
    } catch (err) {
      setUnlockError(
        err instanceof Error ? err.message : "Could not start checkout.",
      );
    } finally {
      setUnlockBusy(false);
    }
  }

  /** Unlock Pro: account first, then checkout. */
  async function handleUnlock() {
    setUnlockError(null);
    const me = await fetchMe();
    if (!me) {
      setSignupReason("unlock");
      setSignupOpen(true);
      return;
    }
    await runProCheckout();
  }

  function switchLayout(next: ReportLayoutMode) {
    setLayout(next);
    try {
      window.localStorage.setItem(LAYOUT_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }

  const ranked = useMemo(() => {
    return [...SCORED_APPEARANCE_KEYS]
      .filter((k) => isFeatureMeasurable(report.features[k].measurable))
      .sort((a, b) => report.features[b].score - report.features[a].score);
  }, [report.features]);

  const freeUnlocked = useMemo(
    () => new Set(ranked.slice(0, FREE_TOP_COUNT)),
    [ranked],
  );

  const isUnlocked = (key: FeatureKey) => paid || freeUnlocked.has(key);

  const topFeature = ranked[0] ?? SCORED_APPEARANCE_KEYS[0];
  const clarity = report.features.skin_clarity;
  const jawline = report.features.jawline_definition;
  const grooming = report.features.grooming_signal;
  const groomingMeasurable = isFeatureMeasurable(grooming.measurable);
  const symmetry = report.features.face_symmetry;
  const proportions = report.features.facial_proportions;

  const weakRecs = useMemo(() => {
    if (!paid) return [];
    const priority = new Set<string>(report.priorityFeatures ?? []);
    // Personalization only reorders recommendations — scores stay as measured.
    // Prefer actionable first, then photo-sensitive setup tips; structural last.
    const mutRank = (k: FeatureKey) => {
      const m = FEATURE_MUTABILITY[k];
      if (m === "actionable") return 0;
      if (m === "photo_sensitive") return 1;
      return 2;
    };
    const weak = SCORED_APPEARANCE_KEYS.filter(
      (k) =>
        isFeatureMeasurable(report.features[k].measurable) &&
        report.features[k].score < 70,
    ).sort((a, b) => {
      const aPri = priority.has(a) ? 0 : 1;
      const bPri = priority.has(b) ? 0 : 1;
      if (aPri !== bPri) return aPri - bPri;
      const m = mutRank(a) - mutRank(b);
      if (m !== 0) return m;
      return report.features[a].score - report.features[b].score;
    });

    return weak
      .flatMap((k) =>
        recommendationsForScore(k, report.features[k].score)
          .slice(0, 1)
          .map((rec) => ({ feature: k, ...rec })),
      )
      .slice(0, 4);
  }, [paid, report.features, report.priorityFeatures]);

  const appearanceSummary = useMemo(
    () => buildAppearanceSummary(report),
    [report],
  );

  const compositeTen = (report.overallScore / 10).toFixed(1);
  const faceSrc = portraitUrl(report.portraitFileId) ?? "/woman1.png";
  const usingUserPortrait = Boolean(report.portraitFileId);

  return (
    <div className="report-dash relative min-h-screen overflow-hidden text-white">
      <div aria-hidden className="report-dash__bg" />

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white/90">
            Z
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Zelko
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/12 bg-white/8 p-1 shadow-sm backdrop-blur-xl lg:flex">
          {isAuthed ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3.5 py-1.5 text-sm text-white/50 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-950">
                Report
              </span>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="rounded-full px-3.5 py-1.5 text-sm text-white/50 transition hover:text-white"
              >
                home
              </Link>
              <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-950">
                result
              </span>
              <Link
                href="/tracking"
                className="rounded-full px-3.5 py-1.5 text-sm text-white/50 transition hover:text-white"
              >
                progress
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/12 bg-white/8 p-0.5 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => switchLayout("classic")}
              className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                layout === "classic"
                  ? "bg-white/15 text-white"
                  : "text-white/45 hover:text-white/75"
              }`}
              aria-pressed={layout === "classic"}
            >
              Classic
            </button>
            <button
              type="button"
              onClick={() => switchLayout("orbit")}
              className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                layout === "orbit"
                  ? "bg-white/15 text-white"
                  : "text-white/45 hover:text-white/75"
              }`}
              aria-pressed={layout === "orbit"}
            >
              Orbit
            </button>
          </div>
          {!paid ? (
            <button
              type="button"
              onClick={() => void handleUnlock()}
              disabled={unlockBusy}
              className="cursor-pointer rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-950 transition hover:bg-white/90 disabled:opacity-60"
            >
              {unlockBusy ? "…" : "Unlock"}
            </button>
          ) : (
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
              Full report
            </span>
          )}
          {isAuthed ? (
            <Link
              href="/login"
              className="hidden rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-sm text-white/70 backdrop-blur-xl transition hover:bg-white/15 sm:inline"
            >
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-sm text-white/70 backdrop-blur-xl transition hover:bg-white/15 sm:inline"
            >
              Sign in
            </Link>
          )}
          <MenuToggleButton
            open={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            light
          />
        </div>
      </nav>

      <MobileNavSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={
          isAuthed
            ? [...navLinks, { label: "This report", href: `/report/${report.id}` }]
            : [
                { label: "Home", href: "/" },
                { label: "Tracking", href: "/tracking" },
                { label: "Pricing", href: "/pricing" },
              ]
        }
        extras={
          isAuthed ? (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white"
            >
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white"
            >
              Sign in
            </Link>
          )
        }
      />

      {unlockError ? (
        <p className="relative z-20 mx-auto max-w-7xl px-5 pb-2 text-sm text-amber-200/90 md:px-8">
          {unlockError}
        </p>
      ) : null}

      {layout === "orbit" ? (
        <>
          <ReportOrbitLayout
            report={report}
            faceSrc={faceSrc}
            usingUserPortrait={usingUserPortrait}
            isUnlocked={isUnlocked}
            topFeature={topFeature}
            paid={paid}
            onUnlock={() => void handleUnlock()}
            appearanceSummary={appearanceSummary}
            weakRecs={weakRecs}
            groomingMeasurable={groomingMeasurable}
            compositeTen={compositeTen}
          />
          <div className="relative z-10 mx-auto max-w-md px-5 pb-8 md:px-8">
            <OutfitRecommendPanel
              baselineReportId={
                report.kind === "target_look"
                  ? (report.baselineReportId ?? report.id)
                  : report.id
              }
              isAuthed={isAuthed}
              isPro={Boolean(user?.isPro) || paid}
              reportPath={`/report/${report.id}`}
            />
          </div>
        </>
      ) : (
      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 pb-24 pt-4 text-white md:px-8 lg:grid-cols-[1fr_minmax(16rem,22rem)_1fr] lg:gap-5 lg:pt-6">
        {/* Left column */}
        <div className="flex flex-col gap-4 lg:order-1">
          <div className="report-glass rounded-3xl p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Appearance report
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-cursive)] text-4xl leading-[1.1] text-white sm:text-5xl">
              Your AI Appearance Report
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
              Precise metrics from measurable features — each score names the
              signal behind it. Never a raw attractiveness number.
            </p>
          </div>

          <div className="report-glass rounded-3xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">
              {appearanceSummary.title}
            </p>
            <div className="relative mt-3">
              {paid ? (
                <div className="space-y-3.5">
                  {appearanceSummary.full.map((para, i) => (
                    <p
                      key={`summary-full-${i}`}
                      className="text-sm leading-relaxed text-white/75"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <>
                  <div className="report-summary-fade max-h-[10rem] space-y-3.5 overflow-hidden">
                    {appearanceSummary.preview.map((para, i) => (
                      <p
                        key={`summary-preview-${i}`}
                        className="text-sm leading-relaxed text-white/75"
                      >
                        {para}
                      </p>
                    ))}
                    {/* Visual depth only — no paid copy in the DOM for free users */}
                    <p className="text-sm leading-relaxed text-white/75" aria-hidden>
                      More detail on softer spots, confidence notes, and what to
                      do next sits behind Pro.
                    </p>
                    <p className="text-sm leading-relaxed text-white/75" aria-hidden>
                      Unlock the full appearance summary when you&apos;re ready
                      for the complete write-up.
                    </p>
                  </div>
                  <div className="relative z-10 mt-3 flex justify-center">
                    <button
                      type="button"
                      onClick={() => void handleUnlock()}
                      disabled={unlockBusy}
                      className="cursor-pointer rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-md transition hover:bg-white/15 hover:text-white disabled:opacity-60"
                    >
                      {unlockBusy ? "Starting…" : "Unlock to view the full summary"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="report-glass rounded-3xl p-5 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                  Overall composite
                </p>
                <p className="mt-2 text-5xl font-semibold tracking-tight text-white md:text-6xl">
                  {report.overallScore}
                  <span className="ml-1 text-lg font-normal text-white/35">
                    / 100
                  </span>
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/70">
                measured
              </span>
            </div>
            <ScoreGauge value={report.overallScore} />
            <p className="mt-3 text-xs leading-relaxed text-white/40">
              {report.retainForTracking
                ? "Photos retained for tracking (opt-in)."
                : report.portraitFileId
                  ? "Portrait kept for this report; other source photos deleted."
                  : report.photoDeletedAt
                    ? "Source photos deleted after analysis."
                    : "Analysis complete."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricTile
              label="Skin clarity"
              score={isUnlocked("skin_clarity") ? clarity.score : null}
              locked={!isUnlocked("skin_clarity")}
              accent="neutral"
            >
              <MiniSpark values={sparkFromScore(clarity.score)} />
            </MetricTile>
            <MetricTile
              label="Symmetry map"
              score={isUnlocked("face_symmetry") ? symmetry.score : null}
              locked={!isUnlocked("face_symmetry")}
              accent="neutral"
            >
              <DotScatter
                scores={SCORED_APPEARANCE_KEYS.filter((k) =>
                  isFeatureMeasurable(report.features[k].measurable),
                ).map((k) => ({
                  key: k,
                  score: report.features[k].score,
                  unlocked: isUnlocked(k),
                }))}
              />
            </MetricTile>
          </div>
        </div>

        {/* Center portrait + outfit still below the face */}
        <div className="mx-auto flex w-full max-w-md flex-col gap-4 lg:order-2 lg:max-w-none">
          <InteractivePortrait
            report={report}
            faceSrc={faceSrc}
            usingUserPortrait={usingUserPortrait}
            isUnlocked={isUnlocked}
            topFeature={topFeature}
          />
          <OutfitRecommendPanel
            baselineReportId={
              report.kind === "target_look"
                ? (report.baselineReportId ?? report.id)
                : report.id
            }
            isAuthed={isAuthed}
            isPro={Boolean(user?.isPro) || paid}
            reportPath={`/report/${report.id}`}
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4 lg:order-3">
          <div className="report-glass flex flex-col items-center rounded-3xl p-6 text-center">
            <RingProgress
              value={isUnlocked("jawline_definition") ? jawline.score : 0}
              locked={!isUnlocked("jawline_definition")}
              label="Jawline"
              color="#e2e8f0"
            />
            <p className="mt-3 text-xs leading-relaxed text-white/45">
              Edge contrast along the jaw contour — medium confidence tier.
            </p>
          </div>

          <div className="report-glass rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-white/40">
              Grooming signal
            </p>
            {!groomingMeasurable ? (
              <>
                <p className="mt-2 text-lg font-semibold text-amber-200/90">
                  Not measured
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  {grooming.gateNote ?? grooming.observedSignal}
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {isUnlocked("grooming_signal") ? (
                    <>
                      {grooming.score}
                      <span className="text-base font-normal text-white/35">
                        {" "}
                        / 100
                      </span>
                    </>
                  ) : (
                    <span className="blur-sm select-none">72</span>
                  )}
                </p>
                <DropMeter
                  filled={
                    isUnlocked("grooming_signal")
                      ? Math.round(grooming.score / 20)
                      : 0
                  }
                />
                <p className="mt-2 text-xs text-white/40">
                  {isUnlocked("grooming_signal")
                    ? `Confidence · ${grooming.confidence}`
                    : "Locked on free"}
                </p>
              </>
            )}
          </div>

          <div className="report-glass rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-white/40">
              Next actions
            </p>
            {paid ? (
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Your checklist below only includes changeable levers (skin,
                grooming, brows, photo setup) — not fixed facial structure.
              </p>
            ) : (
              <>
                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  Unlock the full report to get a concrete Pro checklist tied to
                  this score.
                </p>
                <button
                  type="button"
                  onClick={() => void handleUnlock()}
                  disabled={unlockBusy}
                  className="mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:opacity-60"
                >
                  {unlockBusy ? "Starting…" : "Unlock recommendations"}
                </button>
              </>
            )}
          </div>

          <div className="report-glass rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-white/40">
              Appearance index
            </p>
            <p className="mt-1 text-4xl font-semibold text-white">
              {compositeTen}
              <span className="text-lg font-normal text-white/35"> / 10</span>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <MiniRing
                label="Proportions"
                value={
                  isUnlocked("facial_proportions") ? proportions.score : null
                }
                color="#f8fafc"
              />
              <MiniRing
                label="Clarity"
                value={isUnlocked("skin_clarity") ? clarity.score : null}
                color="#94a3b8"
              />
            </div>
          </div>
        </div>
      </div>
      )}

      <ReportAnalyticsSection report={report} isUnlocked={isUnlocked} />

      {/* Full breakdown strip */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 md:px-8">
        {paid ? (
          <div className="mb-8 space-y-4">
            {checkoutJustSucceeded ? (
              <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                Pro is active. Your full report is unlocked — start the checklist
                below before your next weekly check-in.
              </p>
            ) : null}
            <ActionChecklist
              reportId={report.id}
              highlight={checkoutJustSucceeded}
            />
            <LookTrackPanel
              baselineReport={report}
              isAuthed={isAuthed}
              isPro={Boolean(user?.isPro) || paid}
            />
            <PrivacyDataStatement tone="dark" compact />
          </div>
        ) : (
          <div className="mb-8">
            <LookTrackPanel
              baselineReport={report}
              isAuthed={isAuthed}
              isPro={Boolean(user?.isPro) || paid}
            />
          </div>
        )}
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">
              Feature breakdown
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">
              Individually measured
            </h2>
          </div>
          <Link
            href="/upload"
            className="text-sm text-white/50 underline-offset-4 hover:text-white hover:underline"
          >
            Start another assessment
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ranked.map((key) => {
            const unlocked = isUnlocked(key);
            const packet = report.features[key];
            return (
              <div
                key={key}
                className="report-glass rounded-2xl px-4 py-4 text-white"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-white/90">
                    {FEATURE_LABELS[key]}
                  </p>
                  {unlocked ? (
                    <span className="text-lg font-semibold text-white">
                      {packet.score}
                    </span>
                  ) : (
                    <span className="relative text-lg font-semibold text-white/30">
                      <span className="blur-[5px] select-none">
                        {packet.score}
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] uppercase tracking-[0.14em] text-white/50">
                        Locked
                      </span>
                    </span>
                  )}
                </div>
                {unlocked ? (
                  <>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35">
                      {packet.confidence} confidence ·{" "}
                      {MUTABILITY_LABELS[FEATURE_MUTABILITY[key]]}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/50">
                      {packet.observedSignal}
                    </p>
                    <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-white/35">
                      {MUTABILITY_HINTS[FEATURE_MUTABILITY[key]]}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-xs text-white/35">
                    Measured · unlock to reveal
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <SignupPrompt
        open={signupOpen}
        reason={signupReason}
        onClose={() => setSignupOpen(false)}
        reportId={report.id}
        onAuthed={(authedUser) => {
          if (authedUser.isPro) {
            setPaid(true);
            setSignupOpen(false);
            return;
          }
          if (signupReason === "unlock") {
            setSignupOpen(false);
            void runProCheckout();
          }
        }}
      />
    </div>
  );
}

function SignupPrompt({
  open,
  onClose,
  reportId,
  reason = "save",
  onAuthed,
}: {
  open: boolean;
  onClose: () => void;
  reportId: string;
  reason?: "save" | "unlock";
  onAuthed?: (user: { isPro: boolean; email: string }) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [mode, setMode] = useState<"register" | "login">("register");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [linkedEmail, setLinkedEmail] = useState<string | null>(null);
  const forUnlock = reason === "unlock";

  if (!open) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result =
        mode === "register"
          ? await registerAccount({ firstName, email, password, reportId })
          : await loginAccount({ email, password, reportId });
      setLinkedEmail(result.user.email);
      onAuthed?.(result.user);
      // Unlock flow continues to Stripe in onAuthed — skip “saved” screen.
      if (!forUnlock) setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-[#0a0414]/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal
        aria-labelledby="signup-prompt-title"
        className="report-glass relative z-10 w-full max-w-md rounded-3xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          Close
        </button>

        {sent ? (
          <div className="pt-2">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              Linked
            </p>
            <h2
              id="signup-prompt-title"
              className="mt-2 text-2xl font-semibold text-white"
            >
              Report saved to your account
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Signed in as{" "}
              <span className="text-white/85">{linkedEmail}</span>. This report
              is linked for progress tracking when you re-upload.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tracking"
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950"
              >
                Go to tracking
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/70"
              >
                Keep reading report
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="pt-2">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              {forUnlock ? "Unlock Pro" : "Track progress"}
            </p>
            <h2
              id="signup-prompt-title"
              className="mt-2 text-2xl font-semibold text-white"
            >
              {forUnlock
                ? mode === "register"
                  ? "Create an account to unlock Pro"
                  : "Sign in to unlock Pro"
                : mode === "register"
                  ? "Create an account to save this report"
                  : "Sign in to link this report"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {forUnlock
                ? "Pro is tied to your account so full reports and tracking stay with you. After you sign up, we’ll take you to checkout."
                : "Re-upload weekly, compare under consistent lighting, and keep recommendations tied to this baseline."}
            </p>
            {mode === "register" ? (
              <label className="mt-5 block">
                <span className="text-xs uppercase tracking-[0.14em] text-white/40">
                  First name
                </span>
                <input
                  type="text"
                  required
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Alex"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/40"
                />
              </label>
            ) : null}
            <label className={`block ${mode === "register" ? "mt-3" : "mt-5"}`}>
              <span className="text-xs uppercase tracking-[0.14em] text-white/40">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/40"
              />
            </label>
            <label className="mt-3 block">
              <span className="text-xs uppercase tracking-[0.14em] text-white/40">
                Password
              </span>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/40"
              />
            </label>
            {error && (
              <p className="mt-3 text-sm text-rose-300" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="mt-4 w-full rounded-xl bg-white py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:opacity-60"
            >
              {busy
                ? "Working…"
                : forUnlock
                  ? mode === "register"
                    ? "Create account & continue"
                    : "Sign in & continue"
                  : mode === "register"
                    ? "Create account & save report"
                    : "Sign in & link report"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode((m) => (m === "register" ? "login" : "register"));
                setError(null);
              }}
              className="mt-3 w-full text-center text-xs text-white/45 underline-offset-2 hover:text-white/70 hover:underline"
            >
              {mode === "register"
                ? "Already have an account? Sign in"
                : "Need an account? Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ScoreGauge({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="relative mt-5 h-2.5 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-white/40 via-white/80 to-white"
        style={{ width: `${pct}%` }}
      />
      <span
        className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-[0_0_12px_rgba(255,255,255,0.55)]"
        style={{ left: `calc(${pct}% - 6px)` }}
      />
    </div>
  );
}

function MetricTile({
  label,
  score,
  locked,
  accent,
  children,
}: {
  label: string;
  score: number | null;
  locked: boolean;
  accent: "neutral" | "blue";
  children: ReactNode;
}) {
  return (
    <div className="report-glass rounded-2xl p-4">
      <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-white">
        {locked || score === null ? (
          <span className="blur-sm select-none text-white/50">68</span>
        ) : (
          score
        )}
      </p>
      <div
        className={`mt-3 h-14 ${accent === "blue" ? "text-slate-300" : "text-white/70"}`}
      >
        {children}
      </div>
    </div>
  );
}

function sparkFromScore(score: number): number[] {
  const base = score / 100;
  return [0.35, 0.42, 0.38, 0.55, 0.5, 0.62, 0.58, base, base * 0.95, base].map(
    (v) => Math.max(0.15, Math.min(1, v)),
  );
}

function MiniSpark({ values }: { values: number[] }) {
  const w = 120;
  const h = 40;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - v * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" aria-hidden>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
        opacity="0.85"
      />
    </svg>
  );
}

function DotScatter({
  scores,
}: {
  scores: { key: string; score: number; unlocked: boolean }[];
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-black/25">
      {scores.map((s, i) => {
        const x = 12 + ((i * 17) % 76);
        const y = 15 + ((s.score * 0.55 + i * 7) % 70);
        const color = scoreToneClass(s.score, s.unlocked);
        return (
          <span
            key={s.key}
            className={`absolute size-1.5 rounded-full ${color} opacity-80`}
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        );
      })}
    </div>
  );
}

function RingProgress({
  value,
  locked,
  label,
  color,
}: {
  value: number;
  locked: boolean;
  label: string;
  color: string;
}) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const shown = locked ? 0 : value;
  const offset = c - (shown / 100) * c;
  return (
    <div className="relative size-36">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">
          {label}
        </p>
        <p className="text-2xl font-semibold text-white">
          {locked ? (
            <span className="blur-sm select-none">71</span>
          ) : (
            value
          )}
        </p>
      </div>
    </div>
  );
}

function MiniRing({
  label,
  value,
  color,
}: {
  label: string;
  value: number | null;
  color: string;
}) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const shown = value ?? 0;
  const offset = c - (shown / 100) * c;
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 44 44" className="size-11 -rotate-90">
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="4"
        />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={value === null ? c : offset}
        />
      </svg>
      <div>
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/40">
          {label}
        </p>
        <p className="text-sm font-semibold text-white">
          {value === null ? (
            <span className="blur-sm select-none">80%</span>
          ) : (
            `${value}`
          )}
        </p>
      </div>
    </div>
  );
}

function DropMeter({ filled }: { filled: number }) {
  const n = Math.max(0, Math.min(5, filled));
  return (
    <div className="mt-3 flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 flex-1 rounded-full ${
            i < n
              ? "bg-gradient-to-r from-white/50 to-white"
              : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}
