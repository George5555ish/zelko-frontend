const QUOTES = [
  {
    quote:
      "Finally a score that says why — and what shirt colors actually help.",
    name: "Beta tester · early cohort",
  },
  {
    quote:
      "I stopped comparing myself to strangers. Weekly re-checks feel calm, not obsessive.",
    name: "Private preview",
  },
] as const;

export function BetaReviews() {
  return (
    <section id="reviews" className="px-4 pb-8 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
        {QUOTES.map((item) => (
          <blockquote
            key={item.quote}
            className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 md:p-8"
          >
            <p className="text-lg leading-relaxed text-neutral-800">
              “{item.quote}”
            </p>
            <footer className="mt-5 text-xs uppercase tracking-[0.16em] text-neutral-400">
              {item.name}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
