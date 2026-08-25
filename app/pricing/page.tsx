"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import {
  fetchMe,
  startProCheckout,
  devUnlockPro,
  getAuthToken,
  type AuthUser,
} from "@/lib/auth";
import { PrivacyDataStatement } from "@/components/site/PrivacyDataStatement";

const FREE = [
  "Overall composite score (always)",
  "Top 1–2 strongest features, named and scored",
  "Photo quality gate before analysis",
] as const;

const PAID = [
  "Full per-feature breakdown",
  "Confidence labels on every score",
  "All paired recommendations",
  "Re-upload tracking with normalized comparison",
  "Lighting/angle consistency checks before comparing",
] as const;

export default function PricingPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(Boolean(getAuthToken()));
    void fetchMe().then(setUser);
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("checkout");
    if (q === "success") {
      setMessage("Payment received — refreshing Pro status…");
      void (async () => {
        for (let i = 0; i < 6; i++) {
          await new Promise((r) => setTimeout(r, 1000));
          const me = await fetchMe();
          setUser(me);
          if (me?.isPro) {
            setMessage("Pro is active. Tracking and full reports are unlocked.");
            return;
          }
        }
        setMessage(
          "Payment may still be confirming. Refresh in a moment or open a report.",
        );
      })();
    } else if (q === "cancel") {
      setMessage("Checkout canceled — no charge was made.");
    }
  }, []);

  const unlock = useCallback(async () => {
    setMessage(null);
    setBusy(true);
    try {
      if (!getAuthToken()) {
        window.location.href = "/login?next=/pricing";
        return;
      }
      const me = await fetchMe();
      setUser(me);
      if (me?.isPro) {
        setMessage("You already have Pro.");
        return;
      }
      const checkout = await startProCheckout({
        successPath: "/pricing?checkout=success",
        cancelPath: "/pricing?checkout=cancel",
      });
      if (checkout.alreadyPro) {
        setUser(await fetchMe());
        setMessage("You already have Pro.");
        return;
      }
      if (checkout.url) {
        window.location.href = checkout.url;
        return;
      }
      if (checkout.devUnlock) {
        const updated = await devUnlockPro();
        setUser(updated);
        setMessage("Dev Pro unlock applied.");
        return;
      }
      setMessage(
        checkout.error ??
          "Stripe is not configured. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID.",
      );
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Checkout failed.");
    } finally {
      setBusy(false);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <PageHero
        eyebrow="Pricing"
        title="Start free. Go deeper when it matters."
        description="Free proves the system. Paid unlocks the full explainable breakdown and weekly tracking — without public ranks or percentiles."
      />

      <section className="px-6 pb-24 md:px-10">
        {message ? (
          <p className="mx-auto mb-8 max-w-7xl rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700">
            {message}
          </p>
        ) : null}

        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
                Free
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-cursive)] text-5xl text-neutral-950">
                Free
              </h2>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
                £0
                <span className="ml-2 text-base font-normal text-neutral-500">
                  GBP
                </span>
              </p>
              <p className="mt-3 text-neutral-500">
                Your overall score and strongest features — enough to see the
                loop without a wall.
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {FREE.map((item) => (
                  <li
                    key={item}
                    className="border-b border-neutral-100 pb-3 text-sm text-neutral-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/upload"
                className="mt-10 inline-flex w-fit rounded-xl bg-[#ebe4ff] px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-[#e0d6ff]"
              >
                Start your free report
              </Link>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="flex h-full flex-col rounded-3xl border border-neutral-900 bg-neutral-950 p-8 text-white md:p-10">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
                Pro
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-cursive)] text-5xl">
                £9.99
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                GBP / month · billed via Stripe
              </p>
              <div className="mt-8 border-t border-white/10 pt-8">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  Full clarity
                </h3>
                <p className="mt-2 text-neutral-400">
                  Every feature, every confidence label, every recommendation —
                  plus private progress tracking.
                </p>
                <ul className="mt-6 space-y-3">
                  {PAID.map((item) => (
                    <li
                      key={item}
                      className="border-b border-white/10 pb-3 text-sm text-neutral-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {user?.isPro ? (
                <div className="mt-10 space-y-3">
                  <Link
                    href="/tracking"
                    className="inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
                  >
                    Open tracking
                  </Link>
                  <p className="text-sm text-neutral-400">
                    {user.cancelAtPeriodEnd && user.currentPeriodEnd
                      ? `Canceling — Pro ends ${new Date(user.currentPeriodEnd).toLocaleDateString("en-GB")}.`
                      : "Manage or cancel anytime from your Account page."}{" "}
                    <Link
                      href="/login"
                      className="text-neutral-200 underline-offset-4 hover:underline"
                    >
                      Go to Account
                    </Link>
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void unlock()}
                  className="mt-10 inline-flex w-fit cursor-pointer rounded-xl bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200 disabled:opacity-60"
                >
                  {busy
                    ? "Starting…"
                    : signedIn
                      ? "Unlock Pro — £9.99/mo"
                      : "Sign in to unlock Pro"}
                </button>
              )}
              {!signedIn ? (
                <Link
                  href="/login?next=/pricing"
                  className="mt-3 text-sm text-neutral-400 underline-offset-4 hover:underline"
                >
                  Sign in / create account first
                </Link>
              ) : null}
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={200}>
          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            <PrivacyDataStatement tone="light" />
            <p className="text-center text-sm leading-relaxed text-neutral-500">
              Locked features show their name with a blurred score — depth without
              a dump. Re-analysis is capped at once per week to avoid compulsive
              checking. Extra upload photos are deleted by default after analysis;
              a portrait is kept for report display.
            </p>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
