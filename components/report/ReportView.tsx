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
import { buildAppearanceSummary } from "@/lib/appearance-summary";
import { isFeatureMeasurable, scoreToneClass } from "@/lib/score-tone";
import type { FeatureKey, ReportViewModel } from "@/lib/types/report";
import {
  FEATURE_LABELS,
  SCORED_APPEARANCE_KEYS,
} from "@/lib/types/report";
import { portraitUrl, registerAccount, loginAccount } from "@/lib/auth";
import { InteractivePortrait } from "@/components/report/InteractivePortrait";
import { ReportOrbitLayout } from "@/components/report/ReportOrbitLayout";
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
  const [layout, setLayout] = useState<ReportLayoutMode>("classic");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (stored === "classic" || stored === "orbit") setLayout(stored);
    } catch {
      /* ignore */
    }
  }, []);

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
    const weak = SCORED_APPEARANCE_KEYS.filter(
      (k) =>
        isFeatureMeasurable(report.features[k].measurable) &&
        report.features[k].score < 70,
    ).sort((a, b) => {
      const aPri = priority.has(a) ? 0 : 1;
      const bPri = priority.has(b) ? 0 : 1;
      if (aPri !== bPri) return aPri - bPri;
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

  useEffect(() => {
    const id = window.setTimeout(() => setSignupOpen(true), 2800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="report-dash relative min-h-screen overflow-hidden text-white">
      <div aria-hidden className="report-dash__bg" />

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-violet-500/30 text-sm font-bold text-violet-200">
            Z
          </span>
          <span className="text-lg font-semibold tracking-tight">Zelko</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md sm:flex">
          <Link
            href="/"
            className="rounded-full px-3.5 py-1.5 text-sm text-white/55 transition hover:text-white"
          >
            home
          </Link>
          <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3.5 py-1.5 text-sm font-medium text-white">
            result
          </span>
          <Link
            href="/tracking"
            className="rounded-full px-3.5 py-1.5 text-sm text-white/55 transition hover:text-white"
          >
            progress
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5">
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
              onClick={() => setPaid(true)}
              className="cursor-pointer rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
            >
              Unlock
            </button>
          ) : (
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Full report
            </span>
          )}
          <Link
            href="/login"
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/70 backdrop-blur-md transition hover:bg-white/10"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {layout === "orbit" ? (
        <ReportOrbitLayout
          report={report}
          faceSrc={faceSrc}
          usingUserPortrait={usingUserPortrait}
          isUnlocked={isUnlocked}
          topFeature={topFeature}
          paid={paid}
          onUnlock={() => setPaid(true)}
          appearanceSummary={appearanceSummary}
          weakRecs={weakRecs}
          groomingMeasurable={groomingMeasurable}
          compositeTen={compositeTen}
        />
      ) : (
      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 pb-24 pt-4 md:px-8 lg:grid-cols-[1fr_minmax(16rem,22rem)_1fr] lg:gap-5 lg:pt-6">
        {/* Left column */}
        <div className="flex flex-col gap-4 lg:order-1">
          <div className="report-glass rounded-3xl p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300/70">
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
            <p className="text-xs uppercase tracking-[0.16em] text-violet-300/70">
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
                      onClick={() => setPaid(true)}
                      className="cursor-pointer rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-md transition hover:bg-white/15 hover:text-white"
                    >
                      Unlock to view the full summary
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
              <span className="rounded-full bg-violet-500/25 px-2.5 py-1 text-xs font-semibold text-violet-200">
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
              accent="violet"
            >
              <MiniSpark values={sparkFromScore(clarity.score)} />
            </MetricTile>
            <MetricTile
              label="Symmetry map"
              score={isUnlocked("face_symmetry") ? symmetry.score : null}
              locked={!isUnlocked("face_symmetry")}
              accent="blue"
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

        {/* Center portrait — landmark-mapped tappable dots */}
        <InteractivePortrait
          report={report}
          faceSrc={faceSrc}
          usingUserPortrait={usingUserPortrait}
          isUnlocked={isUnlocked}
          topFeature={topFeature}
        />

        {/* Right column */}
        <div className="flex flex-col gap-4 lg:order-3">
          <div className="report-glass flex flex-col items-center rounded-3xl p-6 text-center">
            <RingProgress
              value={isUnlocked("jawline_definition") ? jawline.score : 0}
              locked={!isUnlocked("jawline_definition")}
              label="Jawline"
              color="#60a5fa"
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
            {paid && weakRecs.length > 0 ? (
              <ul className="mt-3 space-y-2.5">
                {weakRecs.map((rec) => (
                  <li
                    key={rec.action}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
                  >
                    <p className="text-sm text-white/90">{rec.action}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35">
                      {FEATURE_LABELS[rec.feature]} · {rec.effort} effort
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-white/45">
                {paid
                  ? "No weak scores below 70 — keep your routine consistent."
                  : "Unlock the full report to see paired recommendations for every weak score."}
              </p>
            )}
            {!paid && (
              <button
                type="button"
                onClick={() => setPaid(true)}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Unlock recommendations
              </button>
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
                color="#a78bfa"
              />
              <MiniRing
                label="Clarity"
                value={isUnlocked("skin_clarity") ? clarity.score : null}
                color="#34d399"
              />
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Full breakdown strip */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 md:px-8">
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
            className="text-sm text-violet-300 underline-offset-4 hover:underline"
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
                className="report-glass rounded-2xl px-4 py-4"
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
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] uppercase tracking-[0.14em] text-violet-200/80">
                        Locked
                      </span>
                    </span>
                  )}
                </div>
                {unlocked ? (
                  <>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35">
                      {packet.confidence} confidence
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/50">
                      {packet.observedSignal}
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
        onClose={() => setSignupOpen(false)}
        reportId={report.id}
      />
    </div>
  );
}

function SignupPrompt({
  open,
  onClose,
  reportId,
}: {
  open: boolean;
  onClose: () => void;
  reportId: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"register" | "login">("register");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [linkedEmail, setLinkedEmail] = useState<string | null>(null);

  if (!open) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result =
        mode === "register"
          ? await registerAccount({ email, password, reportId })
          : await loginAccount({ email, password, reportId });
      setLinkedEmail(result.user.email);
      setSent(true);
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
            <p className="text-xs uppercase tracking-[0.18em] text-violet-300/70">
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
                className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white"
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
            <p className="text-xs uppercase tracking-[0.18em] text-violet-300/70">
              Track progress
            </p>
            <h2
              id="signup-prompt-title"
              className="mt-2 text-2xl font-semibold text-white"
            >
              {mode === "register"
                ? "Create an account to save this report"
                : "Sign in to link this report"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Re-upload weekly, compare under consistent lighting, and keep
              recommendations tied to this baseline.
            </p>
            <label className="mt-5 block">
              <span className="text-xs uppercase tracking-[0.14em] text-white/40">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-violet-400/50"
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
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-violet-400/50"
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
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {busy
                ? "Working…"
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
        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-emerald-400"
        style={{ width: `${pct}%` }}
      />
      <span
        className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
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
  accent: "violet" | "blue";
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
        className={`mt-3 h-14 ${accent === "blue" ? "text-sky-300" : "text-violet-300"}`}
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
              ? "bg-gradient-to-r from-sky-400 to-violet-400"
              : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}
