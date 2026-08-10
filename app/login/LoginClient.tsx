"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import {
  fetchMe,
  loginAccount,
  registerAccount,
  setAuthToken,
  type AuthUser,
} from "@/lib/auth";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reportId = searchParams.get("reportId") ?? undefined;

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    void fetchMe().then(setUser);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result =
        mode === "login"
          ? await loginAccount({ email, password, reportId })
          : await registerAccount({ email, password, reportId });
      setUser(result.user);
      if (reportId) {
        router.push(`/report/${reportId}`);
      } else if (result.user.reportIds[0]) {
        router.push(`/report/${result.user.reportIds[0]}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <PageHero
        eyebrow={mode === "login" ? "Log in" : "Create account"}
        title={mode === "login" ? "Welcome back." : "Save your progress."}
        description={
          reportId
            ? "Sign in to link the report you just generated to your account."
            : "Accounts let you keep reports and track change over time."
        }
      />

      <section className="px-6 pb-24 md:px-10">
        <Reveal>
          <div className="mx-auto max-w-md rounded-3xl border border-neutral-200 bg-white p-8">
            {user ? (
              <div>
                <p className="text-sm text-neutral-500">Signed in as</p>
                <p className="mt-1 text-lg font-semibold text-neutral-950">
                  {user.email}
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  {user.reportIds.length} linked report
                  {user.reportIds.length === 1 ? "" : "s"}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {user.reportIds[0] && (
                    <Link
                      href={`/report/${user.reportIds[0]}`}
                      className="rounded-xl bg-neutral-950 px-5 py-3 text-center text-sm font-medium text-white"
                    >
                      Open latest report
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthToken(null);
                      setUser(null);
                    }}
                    className="rounded-xl border border-neutral-200 px-5 py-3 text-sm font-medium text-neutral-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <label className="block">
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
            )}
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
