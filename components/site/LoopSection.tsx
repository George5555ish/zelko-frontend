import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";

const STEPS = [
  {
    step: "01",
    title: "Assess",
    body: "Upload 3–5 clear photos. Photo quality gates the pipeline first — then we measure only traits with a real signal.",
  },
  {
    step: "02",
    title: "Act",
    body: "Every weak score unlocks paired recommendations ranked by effort and confidence. No low score without a next step.",
  },
  {
    step: "03",
    title: "Prove",
    body: "Re-upload over time. We check lighting and angle consistency before comparing — so change isn’t a photo artifact.",
  },
] as const;

export function LoopSection() {
  return (
    <section
      id="how-it-works"
      className="bg-[var(--hero-surface)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            The loop
          </p>
        </Reveal>
        <Reveal delayMs={80}>
          <h2 className="mt-4 max-w-xl font-[family-name:var(--font-cursive)] text-4xl text-neutral-950 sm:text-5xl">
            Assess → Act → Prove
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((item, i) => (
            <Reveal key={item.step} delayMs={120 + i * 100}>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
                {item.step}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-500">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={420}>
          <Link
            href="/how-it-works"
            className="mt-12 inline-flex text-sm font-medium text-neutral-800 underline-offset-4 hover:underline"
          >
            See how measurement works →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
