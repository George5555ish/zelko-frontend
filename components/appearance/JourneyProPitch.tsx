"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  devUnlockPro,
  startProCheckout,
  type AuthUser,
} from "@/lib/auth";

export function JourneyProPitch({
  reportId,
  user,
  onUserUpdate,
}: {
  reportId: string;
  user: AuthUser | null;
  onUserUpdate?: (user: AuthUser) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isPro = Boolean(user?.isPro);

  const unlock = useCallback(async () => {
    if (!user) {
      setError("Sign in to unlock Pro.");
      return;
    }
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const checkout = await startProCheckout({
        successPath: `/appearance/${reportId}?checkout=success`,
        cancelPath: `/appearance/${reportId}?checkout=cancel`,
      });
      if (checkout.alreadyPro) {
        setMessage("You’re already on Pro.");
        return;
      }
      if (checkout.url) {
        window.location.href = checkout.url;
        return;
      }
      if (checkout.devUnlock) {
        const updated = await devUnlockPro();
        onUserUpdate?.(updated);
        setMessage("Pro unlocked (dev).");
        return;
      }
      setError(checkout.error ?? "Checkout unavailable right now.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
    } finally {
      setBusy(false);
    }
  }, [onUserUpdate, reportId, user]);

  if (isPro) {
    return (
      <section className="ai-reveal">
        <div className="ai-reveal__intro">
          <p className="ai-reveal__eyebrow">Pro</p>
          <h2>You’re unlocked</h2>
          <p>
            Rechecks, pillar history, and restocked looks stay on your
            dashboard. Your first Appearance Profile pass is saved.
          </p>
        </div>
        <div className="ai-reveal__cta ai-reveal__cta--row">
          <Link className="ai-btn" href="/dashboard">
            Go to dashboard
          </Link>
          <Link className="ai-btn ai-btn--ghost" href={`/report/${reportId}`}>
            Open full report
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="ai-reveal">
      <div className="ai-reveal__intro">
        <p className="ai-reveal__eyebrow">First pass complete</p>
        <h2>Keep improving with Pro</h2>
        <p>
          You’ve finished the free Appearance Profile — face, style, and one
          prescribed look with shoppable matches. Pro unlocks the ongoing loop.
        </p>
      </div>

      <ul className="ai-pro-pitch__list">
        <li>Weekly rechecks with per-pillar history</li>
        <li>Restocked eBay-driven looks over time</li>
        <li>Seasonal themed style pushes</li>
      </ul>

      <div className="ai-reveal__cta ai-reveal__cta--row">
        <button
          type="button"
          className="ai-btn"
          disabled={busy || !user}
          onClick={() => void unlock()}
        >
          {busy ? "Opening checkout…" : "Unlock Pro — £9.99/mo"}
        </button>
        <Link className="ai-btn ai-btn--ghost" href={`/report/${reportId}`}>
          Skip for now — full report
        </Link>
      </div>

      {message ? <p className="ai-pro-pitch__msg">{message}</p> : null}
      {error ? <p className="ai-error mt-3">{error}</p> : null}
      {!user ? (
        <p className="ai-reveal__note">Sign in to unlock Pro checkout.</p>
      ) : null}
    </section>
  );
}
