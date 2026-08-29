import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { PrivacyDataStatement } from "@/components/site/PrivacyDataStatement";

const FAQS = [
  {
    q: "What does Zelko actually measure?",
    a: "Eight measurable features: face symmetry, facial proportions, skin clarity, jawline definition, eyebrow shape, eye spacing, grooming signal, and photo quality. Each score includes confidence and the observed signal.",
  },
  {
    q: "Do you score attractiveness or personality?",
    a: "No. We never score confidence, trustworthiness, intelligence, approachability, ethnicity-based comparisons, displayed age, or health diagnoses. Attractiveness only exists as a composite of measured sub-scores — never a single inferred vibe.",
  },
  {
    q: "What are the two analysis tracks?",
    a: "Baseline is the general heuristic report from your selfie. Toward your look compares you to a reference photo you upload — including skin clarity and grooming, not just facial landmarks. Lifestyle profile answers are for styling context only, never ethnicity scoring.",
  },
  {
    q: "What happens to my photos?",
    a: "Extra upload photos are deleted after analysis by default. We keep a portrait copy so your report can display the face that was measured. Reference look photos are retained for comparison and outfit stills until you delete the linked report. We do not train on your images unless you separately allow it, and we do not sell photos to third parties.",
  },
  {
    q: "What about outfit stills?",
    a: "From your report you can generate AI-recommended outfits that complement your face, eyes, and hair. Signed-in users get up to 3 stills. These are generative fashion previews, not medical or clinical advice.",
  },
  {
    q: "What’s free vs paid?",
    a: "Free always includes your overall composite score plus your top 1–2 strongest features, and up to 3 AI outfit stills when signed in. Paid unlocks the full breakdown, confidence labels, a trackable action checklist, and re-upload tracking.",
  },
  {
    q: "How do recommendations work?",
    a: "Weak scores unlock paired recommendations. We separate changeable levers (skin, grooming, brows, photo setup) from photo-sensitive reads (often lighting/angle) and mostly structural ones (like eye spacing). On Pro, only actionable items become your weekly checklist — structural context stays on the report, not as chores.",
  },
  {
    q: "How does re-upload tracking work?",
    a: "Before comparing two uploads we check lighting and angle consistency. If conditions differ, we flag it. Re-analysis is capped at once per week. Non-improvement is framed as “no significant change detected,” never as a decline.",
  },
] as const;

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <PageHero
        eyebrow="FAQ"
        title="Straight answers."
        description="Explainable scoring, private by default, and a hard line on what we refuse to measure."
      />

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto mb-10 max-w-3xl">
          <PrivacyDataStatement tone="light" />
        </div>
        <div className="mx-auto max-w-3xl divide-y divide-neutral-200 border-y border-neutral-200">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delayMs={i * 60}>
              <details className="group py-6">
                <summary className="cursor-pointer list-none text-lg font-medium tracking-tight text-neutral-950 marker:content-none">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="mt-1 text-neutral-400 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-base leading-relaxed text-neutral-500">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
