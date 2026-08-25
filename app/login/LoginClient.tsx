"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import {
  fetchMe,
  linkReportToAccount,
  loginAccount,
  registerAccount,
} from "@/lib/auth";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportIdParam = searchParams.get("reportId") ?? undefined;
  const nextRaw = searchParams.get("next");
  const nextPath =
    nextRaw && nextRaw.startsWith("/") && !nextRaw.startsWith("//")
      ? nextRaw
      : null;
  const reportIdFromNext = nextPath?.match(/^\/report\/([a-f0-9]{24})/i)?.[1];
  const reportId = reportIdParam ?? reportIdFromNext;

  const [mode, setMode] = useState<"login" | "register">("login");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);

  useEffect(() => {
    void (async () => {
      const me = await fetchMe();
      if (me && reportId) {
        try {
          await linkReportToAccount(reportId);
        } catch {
          /* already linked elsewhere */
        }
      }
      if (me) {
        router.replace(nextPath ?? (reportId ? `/report/${reportId}` : "/dashboard"));
        return;
      }
      setLoadingMe(false);
    })();
  }, [nextPath, reportId, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "login") {
        await loginAccount({ email, password, reportId });
      } else {
        await registerAccount({ firstName, email, password, reportId });
      }
      if (nextPath) {
        router.push(nextPath);
        return;
      }
      if (reportId) {
        router.push(`/report/${reportId}`);
        return;
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (loadingMe) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#1a1c20] text-white/50">
        Checking session…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <section className="px-6 pb-24 pt-16 md:px-10">
        <div className="mx-auto max-w-md">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
            {mode === "login" ? "Log in" : "Create account"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
            {mode === "login" ? "Welcome back." : "Save your progress."}
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            {reportId
              ? "Sign in to link the report you just generated to your account."
              : nextPath === "/pricing"
                ? "Create an account first — then you can unlock Pro from pricing."
                : "Accounts keep reports, dual analysis, and tracking in one place."}
          </p>

          <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-8">
            <form onSubmit={onSubmit}>
              {mode === "register" ? (
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                    First name
                  </span>
                  <input
                    type="text"
                    required
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-neutral-200 bg-[var(--hero-surface)] px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-400"
                    placeholder="Alex"
                  />
                </label>
              ) : null}
              <label className={`block ${mode === "register" ? "mt-4" : ""}`}>
                <span className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-[var(--hero-surface)] px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-400"
                  placeholder="you@email.com"
                />
              </label>
              <label className="mt-4 block">
                <span className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                  Password
                </span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-[var(--hero-surface)] px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-400"
                  placeholder="At least 8 characters"
                />
              </label>
              {error && (
                <p className="mt-3 text-sm text-rose-600" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className="mt-6 w-full rounded-xl bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-60"
              >
                {busy
                  ? "Working…"
                  : mode === "login"
                    ? "Log in"
                    : "Create account"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode((m) => (m === "login" ? "register" : "login"));
                  setError(null);
                }}
                className="mt-4 w-full text-center text-sm text-neutral-500 underline-offset-4 hover:underline"
              >
                {mode === "login"
                  ? "Need an account? Register"
                  : "Already have an account? Log in"}
              </button>
              <p className="mt-6 text-center text-sm text-neutral-500">
                Or{" "}
                <Link
                  href="/upload"
                  className="font-medium text-neutral-800 underline-offset-4 hover:underline"
                >
                  start your free report
                </Link>{" "}
                now.
              </p>
            </form>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
