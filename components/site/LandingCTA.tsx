import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";

export function LandingCTA() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,#ebe4ff_0%,transparent_55%)]"
      />
      <div className="relative mx-auto grid max-w-7xl items-end gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              Free to start
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="mt-4 max-w-xl font-[family-name:var(--font-cursive)] text-5xl leading-[1.1] text-neutral-950 sm:text-6xl">
              Your first strengths pass is free.
            </h2>
          </Reveal>
          <Reveal delayMs={160}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-neutral-500">
              Zoom what already works on your real photos. Pro unlocks the full
              sequence, style direction, and private progress over time.
            </p>
          </Reveal>
        </div>
        <Reveal delayMs={220}>
          <div className="flex flex-col gap-4 md:items-end">
            <Link
              href="/upload"
              className="inline-flex w-fit rounded-xl bg-neutral-950 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Start your free pass
            </Link>
            <Link
              href="/pricing"
              className="inline-flex w-fit text-sm font-medium text-neutral-600 underline-offset-4 hover:text-neutral-950 hover:underline"
            >
              Compare free vs paid →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
