"use client";

const FEATURES = [
  "Face symmetry",
  "Facial proportions",
  "Skin clarity",
  "Jawline definition",
  "Eyebrow shape",
  "Eye spacing",
  "Grooming signal",
  "Photo quality",
] as const;

export function FeatureMarquee() {
  const row = [...FEATURES, ...FEATURES];

  return (
    <section className="overflow-hidden border-y border-neutral-200 bg-white py-5">
      <div className="feature-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((feature, i) => (
          <span
            key={`${feature}-${i}`}
            className="text-sm uppercase tracking-[0.18em] text-neutral-400"
          >
            {feature}
            <span className="ml-10 text-neutral-300">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
