import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FeatureMarquee } from "@/components/site/FeatureMarquee";

const FEATURES = [
  {
    name: "Face symmetry",
    signal: "Landmark mirror-pair deviation",
    confidence: "High",
  },
  {
    name: "Facial proportions",
    signal: "Landmark ratio vs classical thirds/fifths",
    confidence: "Medium",
  },
  {
    name: "Skin clarity",
    signal: "Texture/tone uniformity, pixel-level",
    confidence: "Medium-high",
  },
  {
    name: "Jawline definition",
    signal: "Edge contrast along jaw contour",
    confidence: "Medium",
  },
  {
    name: "Eyebrow shape",
    signal: "Arch, thickness, symmetry from landmarks",
    confidence: "Medium-high",
  },
  {
    name: "Eye spacing",
    signal: "Canthal tilt, inter-eye ratio",
    confidence: "High",
  },
  {
    name: "Grooming signal",
    signal: "Vision-model qualitative read",
    confidence: "Low-medium",
  },
  {
    name: "Photo quality",
    signal: "Lighting, blur, resolution, angle — gates the pipeline",
    confidence: "High",
  },
] as const;

const EXCLUSIONS = [
  "Confidence / trustworthiness / intelligence",
  "Approachability or other psychological inferences",
  "Raw attractiveness as a single inferred number",
  "Ethnicity-based comparison",
  "Displayed age estimation",
  "Health diagnoses",
] as const;

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <PageHero
        eyebrow="How it works"
        title="Measure what can be measured."
        description="Zelko follows one loop: assess → act → prove. Photo quality gates everything. Every score ships with confidence and the observed signal — never a black-box vibe check."
        cta={{ href: "/upload", label: "Start your free report" }}
      />

      <FeatureMarquee />

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              The loop
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Assess",
                body: "Upload photos. We extract 468 face landmarks client-side, then score measurable features with structured vision output.",
              },
              {
                title: "Act",
                body: "Recommendations unlock with weak scores — ranked by effort and confidence. You always know what to try next.",
              },
              {
                title: "Prove",
                body: "Paid tracking re-checks lighting and angle before comparing. Non-improvement is framed as no significant change — never a decline callout.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delayMs={i * 90}>
                <h2 className="font-[family-name:var(--font-cursive)] text-4xl text-neutral-950">
                  {item.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-500">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--hero-surface)] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              Scoring rubric
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-neutral-950">
              Eight features. Each with a signal and a confidence tier.
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.name} delayMs={40 + i * 40}>
                <div className="grid gap-2 py-5 md:grid-cols-[1.1fr_1.6fr_0.7fr] md:items-baseline">
                  <p className="font-medium text-neutral-950">{feature.name}</p>
                  <p className="text-sm text-neutral-500">{feature.signal}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-neutral-400 md:text-right">
                    {feature.confidence}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              Explicitly excluded
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-cursive)] text-4xl text-neutral-950">
              What we will never score.
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {EXCLUSIONS.map((item, i) => (
              <Reveal key={item} delayMs={100 + i * 50}>
                <li className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-600">
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
