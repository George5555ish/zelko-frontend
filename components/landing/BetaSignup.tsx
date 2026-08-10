"use client";

import { FormEvent, useState } from "react";

export function BetaSignup() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="beta" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-neutral-950 px-6 py-12 text-center text-white md:px-12 md:py-16">
        <p className="text-xs uppercase tracking-[0.22em] text-white/45">
          Limited seats
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Join Zelko beta testing
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
          Get early access to explainable skin scoring and clothing suggestions.
          We&apos;ll email when your invite is ready — no spam, no public leaderboard.
        </p>

        {sent ? (
          <p className="mt-10 text-sm font-medium text-[#ffb4a6]">
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="beta-email">
              Email
            </label>
            <input
              id="beta-email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/40"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-white/90"
            >
              Request access
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
