import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

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
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <PageHero
        eyebrow="Pricing"
        title="Start free. Go deeper when it matters."
        description="Free proves the system. Paid unlocks the full explainable breakdown and weekly tracking — without public ranks or percentiles."
      />

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
                Free
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-cursive)] text-5xl text-neutral-950">
                Always free
              </h2>
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
                Paid
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-cursive)] text-5xl">
                Full clarity
              </h2>
              <p className="mt-3 text-neutral-400">
                Every feature, every confidence label, every recommendation —
                plus private progress tracking.
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {PAID.map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/10 pb-3 text-sm text-neutral-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-10 inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
              >
                Talk to us about access
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delayMs={200}>
          <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed text-neutral-500">
            Locked features show their name with a blurred score — depth without
            a dump. Re-analysis is capped at once per week to avoid compulsive
            checking. Photos are deleted by default after analysis.
          </p>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
