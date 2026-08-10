import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

const PREVIEW_FEATURES = [
  { name: "Eye spacing", score: 86, confidence: "High", locked: false },
  { name: "Face symmetry", score: 81, confidence: "High", locked: false },
  { name: "Skin clarity", score: null, confidence: "Medium-high", locked: true },
  { name: "Jawline definition", score: null, confidence: "Medium", locked: true },
  { name: "Eyebrow shape", score: null, confidence: "Medium-high", locked: true },
  { name: "Facial proportions", score: null, confidence: "Medium", locked: true },
] as const;

export default function YourReportPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <PageHero
        eyebrow="Your report"
        title="Individually measured. Never dumped."
        description="Free reports show your overall composite plus your top features. Paid unlocks the full breakdown — with confidence labels, observed signals, and paired recommendations."
        cta={{ href: "/upload", label: "Start your free report" }}
      />

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
                Overall composite
              </p>
              <p className="mt-4 font-[family-name:var(--font-cursive)] text-7xl text-neutral-950">
                78
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                Score 0–100 — never a percentage. Computed from all measured
                features even when some stay locked.
              </p>
              <div className="mt-8 rounded-2xl bg-[var(--hero-surface)] px-4 py-3 text-sm text-neutral-600">
                Free includes overall score + top 1–2 strongest features.
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {PREVIEW_FEATURES.map((feature, i) => (
              <Reveal key={feature.name} delayMs={80 + i * 60}>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white px-5 py-4">
                  <div>
                    <p className="font-medium text-neutral-950">{feature.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-neutral-400">
                      Confidence · {feature.confidence}
                    </p>
                  </div>
                  {feature.locked ? (
                    <div className="relative">
                      <span className="select-none text-2xl font-semibold tracking-tight text-neutral-300 blur-[6px]">
                        74
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                        Locked
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-semibold tracking-tight text-neutral-950">
                      {feature.score}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
            <Reveal delayMs={460}>
              <p className="pt-4 text-sm leading-relaxed text-neutral-500">
                Locked features keep their name visible with a blurred score —
                so you see depth without a full reveal. Recommendations unlock
                with weak scores; you never get a low mark without a next step.
              </p>
            </Reveal>
            <Reveal delayMs={520}>
              <Link
                href="/pricing"
                className="inline-flex text-sm font-medium text-neutral-800 underline-offset-4 hover:underline"
              >
                See what’s free vs paid →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
