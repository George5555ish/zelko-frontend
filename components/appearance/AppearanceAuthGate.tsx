"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  loginAccount,
  registerAccount,
  type AuthUser,
} from "@/lib/auth";

/**
 * Hard gate after Face & Grooming reveal — style prefs + looks require an account.
 */
export function AppearanceAuthGate({
  reportId,
  open,
  onAuthed,
  onDismiss,
  dismissible = false,
}: {
  reportId: string;
  open: boolean;
  onAuthed: (user: AuthUser) => void;
  onDismiss?: () => void;
  /** Soft dismiss only when still on face reveal; later stages stay locked. */
  dismissible?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [mode, setMode] = useState<"register" | "login">("register");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result =
        mode === "register"
          ? await registerAccount({ firstName, email, password, reportId })
          : await loginAccount({ email, password, reportId });
      onAuthed(result.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center">
      {dismissible ? (
        <button
          type="button"
          aria-label="Dismiss"
          className="absolute inset-0 bg-[#0a0414]/75 backdrop-blur-sm"
          onClick={onDismiss}
        />
      ) : (
        <div className="absolute inset-0 bg-[#0a0414]/75 backdrop-blur-sm" />
      )}
      <div
        role="dialog"
        aria-modal
        aria-labelledby="appearance-auth-title"
        className="report-glass relative z-10 w-full max-w-md rounded-3xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-8"
      >
        {dismissible && onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="absolute right-4 top-4 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        ) : null}

        <form onSubmit={onSubmit} className="pt-1">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">
            Free account
          </p>
          <h2
            id="appearance-auth-title"
            className="mt-2 text-2xl font-semibold text-white"
          >
            Save this pass &amp; unlock your style profile
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            Your Face &amp; Grooming reveal is ready. Create a free account to
            set style preferences and generate prescribed looks — and keep this
            report on your dashboard.
          </p>

          {mode === "register" ? (
            <label className="mt-5 block">
              <span className="text-xs text-white/45">First name</span>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white/35"
                autoComplete="given-name"
              />
            </label>
          ) : null}

          <label className={`block ${mode === "register" ? "mt-3" : "mt-5"}`}>
            <span className="text-xs text-white/45">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white/35"
              autoComplete="email"
            />
          </label>

          <label className="mt-3 block">
            <span className="text-xs text-white/45">Password</span>
            <input
              required
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white/35"
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
            />
          </label>

          {error ? (
            <p className="mt-3 text-sm text-amber-200/90" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 disabled:opacity-60"
          >
            {busy
              ? "Working…"
              : mode === "register"
                ? "Create account & continue"
                : "Sign in & continue"}
          </button>

          <button
            type="button"
            className="mt-3 w-full text-center text-xs text-white/50 underline-offset-4 hover:text-white/80 hover:underline"
            onClick={() => {
              setMode((m) => (m === "register" ? "login" : "register"));
              setError(null);
            }}
          >
            {mode === "register"
              ? "Already have an account? Sign in"
              : "Need an account? Create one"}
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
