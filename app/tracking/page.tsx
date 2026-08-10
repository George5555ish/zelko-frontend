import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900">
      <SiteHeader variant="solid" />
      <PageHero
        eyebrow="Prove"
        title="Track change — carefully."
        description="Paid re-uploads compare against your baseline only after lighting and angle consistency checks. Non-improvement is framed as no significant change — never a decline callout. Once per week max."
        cta={{ href: "/upload", label: "Start with consent + upload" }}
      />

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            {
              title: "Consistency gate",
              body: "Before comparing, Zelko checks lighting and angle. Condition artifacts are flagged — never silently credited as improvement.",
            },
            {
              title: "Weekly cap",
              body: "Re-analysis is limited to once per week to avoid compulsive checking while still supporting real progress.",
            },
            {
              title: "Cause-linked",
              body: "When change is real, it ties back to the features and recommendations you acted on — assess → act → prove.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delayMs={i * 80}>
              <div className="h-full rounded-3xl border border-neutral-200 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                  0{i + 1}
                </p>
                <h2 className="mt-3 text-lg font-semibold tracking-tight text-neutral-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={280}>
          <p className="mx-auto mt-12 max-w-5xl text-sm text-neutral-500">
            Tracking requires opt-in photo retention on the consent screen, then
            a paid unlock. Comparison UI wires next once auth + paid billing are
            in place.{" "}
            <Link
              href="/pricing"
              className="font-medium text-neutral-800 underline-offset-4 hover:underline"
            >
              See paid access
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
