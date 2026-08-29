import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What you agree to when you upload",
    body: [
      "By uploading photos to Zelko, you confirm they are of you (or you have permission to use them), and you authorize us to run face-landmark and appearance analysis to generate your report.",
      "Analysis covers measurable features only (symmetry, proportions, skin clarity, jawline, brows, eye spacing, grooming signal, and photo quality). We do not score personality, ethnicity, health diagnoses, or a single “attractiveness” vibe.",
    ],
  },
  {
    title: "How we handle your photos",
    body: [
      "Extra upload photos are deleted after analysis by default. We keep a portrait copy for your report display so scores stay tied to the face that was measured.",
      "If you use paid tracking, you may choose to retain source photos for normalized comparisons. Reference-look photos (Toward your look) are retained for comparison and outfit stills until you delete the linked report.",
      "We do not use your photos to train AI models unless you separately and explicitly allow it (off by default).",
      "We do not sell or share your photos with third parties for advertising. Stripe processes payment details; we do not store card numbers.",
    ],
  },
  {
    title: "Outfit stills and generative previews",
    body: [
      "Outfit stills are generative fashion previews (via fal.ai). They are not medical or clinical advice. Signed-in users can generate up to 3 stills from their face.",
    ],
  },
  {
    title: "Your controls",
    body: [
      "You can delete a linked report (and its stored files) from your account at any time.",
      "Questions about privacy or data deletion: contact us via the Contact page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Zelko handles uploads, analysis, retention, and your controls — including what you accept when you start a report."
      />

      <section className="mx-auto max-w-3xl space-y-10 px-6 pb-24 md:px-10">
        {SECTIONS.map((section, i) => (
          <Reveal key={section.title} delayMs={i * 40}>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                {section.title}
              </h2>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-neutral-600">
                {section.body.map((p) => (
                  <li key={p.slice(0, 48)}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        <Reveal delayMs={200}>
          <p className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-500">
            Ready to continue?{" "}
            <Link
              href="/upload"
              className="font-medium text-neutral-900 underline-offset-2 hover:underline"
            >
              Start your free report
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
