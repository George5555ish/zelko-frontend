"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import {
  fetchMe,
  getAuthToken,
  startProCheckout,
  type AuthUser,
} from "@/lib/auth";
import { FEATURE_LABELS, type FeatureKey, type ReportViewModel } from "@/lib/types/report";

interface TrackingCompare {
  baselineId: string;
  currentId: string;
  consistent: boolean;
  flags: string[];
  overall: { baseline: number; current: number; label: string };
  features: {
    key: FeatureKey;
    baseline: number | null;
    current: number | null;
    label: string;
  }[];
}

interface TrackingPayload {
  user: AuthUser;
  reports: ReportViewModel[];
  canCheckIn: boolean;
  nextEligibleAt: string | null;
  compare: TrackingCompare | null;
  needsRetention: string | null;
  error?: string;
  code?: string;
}

export default function TrackingPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [data, setData] = useState<TrackingPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [proRequired, setProRequired] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setProRequired(false);
    try {
      const me = await fetchMe();
      setUser(me);
      if (!me) {
        setData(null);
        setError("Sign in to view tracking.");
        return;
      }
      if ((me.reportIds?.length ?? 0) === 0) {
        setData(null);
        setError(
          "Upload at least one report before progress tracking unlocks.",
        );
        return;
      }
      const token = getAuthToken();
      const res = await fetch("/api/tracking", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: "no-store",
      });
      const json = (await res.json()) as TrackingPayload & { error?: string };
      if (res.status === 403 && json.code === "pro_required") {
        setProRequired(true);
        setError(json.error ?? "Tracking is a Pro feature.");
        setData(null);
        return;
      }
      if (!res.ok) {
        setError(json.error ?? "Failed to load tracking.");
        setData(null);
        return;
      }
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tracking.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function unlockPro() {
    if (!user) {
      window.location.href = "/login?next=/pricing";
      return;
    }
    const checkout = await startProCheckout({
      successPath: "/tracking",
      cancelPath: "/pricing?checkout=cancel",
    });
    if (checkout.url) {
      window.location.href = checkout.url;
      return;
    }
    setError(
      checkout.error ??
        "Stripe is not configured. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID.",
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <PageHero
        eyebrow="Prove"
        title="Track change — carefully."
        description="Paid re-uploads compare against your baseline only after lighting and angle consistency checks. Non-improvement is framed as no significant change — never a decline callout. Once per week max."
        cta={{ href: "/upload", label: "New check-in upload" }}
      />

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-5xl">
          {loading ? (
            <p className="text-sm text-neutral-500">Loading tracking…</p>
          ) : null}

          {!loading && error ? (
            <Reveal>
              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <p className="text-sm text-neutral-700">{error}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {!user ? (
                    <Link
                      href="/login"
                      className="rounded-xl bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
                    >
                      Sign in
                    </Link>
                  ) : null}
                  {user && (user.reportIds?.length ?? 0) === 0 ? (
                    <Link
                      href="/upload"
                      className="rounded-xl bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
                    >
                      Upload first report
                    </Link>
                  ) : null}
                  {proRequired ? (
                    <>
                      <button
                        type="button"
                        onClick={() => void unlockPro()}
                        className="cursor-pointer rounded-xl bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
                      >
                        Unlock Pro
                      </button>
                      <Link
                        href="/pricing"
                        className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800"
                      >
                        See pricing
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ) : null}

          {!loading && data ? (
            <div className="space-y-6">
              <Reveal>
                <div className="grid gap-4 md:grid-cols-3">
                  <Stat
                    label="Reports"
                    value={String(data.reports.length)}
                  />
                  <Stat
                    label="Weekly check-in"
                    value={data.canCheckIn ? "Available" : "Cooldown"}
                    hint={
                      data.nextEligibleAt
                        ? `Next: ${new Date(data.nextEligibleAt).toLocaleDateString()}`
                        : undefined
                    }
                  />
                  <Stat
                    label="Retention"
                    value={
                      data.reports.some((r) => r.retainForTracking)
                        ? "On"
                        : "Off"
                    }
                  />
                </div>
              </Reveal>

              {data.needsRetention ? (
                <Reveal>
                  <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    {data.needsRetention}
                  </p>
                </Reveal>
              ) : null}

              {data.compare ? (
                <Reveal delayMs={60}>
                  <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                      Normalized compare
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-neutral-950">
                      Baseline → latest
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600">
                      {data.compare.overall.label}
                    </p>
                    <p className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950">
                      {data.compare.overall.baseline}
                      <span className="mx-2 text-neutral-300">→</span>
                      {data.compare.overall.current}
                    </p>

                    {!data.compare.consistent ? (
                      <ul className="mt-4 space-y-1 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        {data.compare.flags.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm text-emerald-700">
                        Lighting and angle look consistent enough to compare.
                      </p>
                    )}

                    <div className="mt-6 divide-y divide-neutral-100">
                      {data.compare.features.map((row) => (
                        <div
                          key={row.key}
                          className="flex flex-wrap items-baseline justify-between gap-2 py-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-neutral-900">
                              {FEATURE_LABELS[row.key]}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {row.label}
                            </p>
                          </div>
                          <p className="text-sm tabular-nums text-neutral-700">
                            {row.baseline ?? "—"}
                            <span className="mx-1.5 text-neutral-300">→</span>
                            {row.current ?? "—"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ) : (
                <Reveal delayMs={60}>
                  <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                    <h2 className="text-lg font-semibold text-neutral-950">
                      Need a second session
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600">
                      Complete another retained upload after the weekly cooldown
                      to see a baseline comparison.
                    </p>
                    <Link
                      href="/upload"
                      className="mt-4 inline-flex rounded-xl bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
                    >
                      Upload check-in
                    </Link>
                  </div>
                </Reveal>
              )}

              {data.reports.length > 0 ? (
                <Reveal delayMs={100}>
                  <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                    <h2 className="text-lg font-semibold text-neutral-950">
                      History
                    </h2>
                    <ul className="mt-4 divide-y divide-neutral-100">
                      {data.reports.map((r) => (
                        <li
                          key={r.id}
                          className="flex flex-wrap items-center justify-between gap-2 py-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-neutral-900">
                              Score {r.overallScore}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {new Date(r.createdAt).toLocaleString()}
                              {r.retainForTracking ? " · retained" : ""}
                            </p>
                          </div>
                          <Link
                            href={`/report/${r.id}`}
                            className="text-sm font-medium text-neutral-800 underline-offset-4 hover:underline"
                          >
                            Open report
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}
            </div>
          ) : null}

          {!loading && !data && !error ? (
            <p className="text-sm text-neutral-500">No tracking data yet.</p>
          ) : null}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-neutral-950">{value}</p>
      {hint ? <p className="mt-1 text-xs text-neutral-500">{hint}</p> : null}
    </div>
  );
}
