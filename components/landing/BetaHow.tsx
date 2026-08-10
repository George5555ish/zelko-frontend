const STEPS = [
  {
    n: "01",
    title: "Upload",
    body: "3–5 clear face photos. Quality gates the pipeline before any scoring.",
  },
  {
    n: "02",
    title: "Measure",
    body: "Explainable features with confidence — clarity, symmetry, proportions, grooming.",
  },
  {
    n: "03",
    title: "Act on both",
    body: "Weak scores unlock skin care steps and clothing direction ranked by effort.",
  },
] as const;

export function BetaHow() {
  return (
    <section id="how" className="bg-[#f6f2f8] px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          The loop
        </p>
        <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight text-neutral-950">
          Assess → act → prove — built for beta testers first.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <article
              key={step.n}
              className="rounded-[1.5rem] border border-white bg-white/80 p-6 shadow-[0_12px_40px_-28px_rgba(40,20,80,0.35)]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#ff7a62]">
                {step.n}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-neutral-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
