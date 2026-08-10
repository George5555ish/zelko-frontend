import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  cta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  cta?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,#f6f3ff_0%,transparent_55%)]"
      />
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delayMs={80}>
          <h1 className="mt-4 font-[family-name:var(--font-cursive)] text-5xl leading-[1.1] text-neutral-950 sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delayMs={160}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
            {description}
          </p>
        </Reveal>
        {cta && (
          <Reveal delayMs={240}>
            <Link
              href={cta.href}
              className="mt-8 inline-flex rounded-xl bg-[#ebe4ff] px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-[#e0d6ff]"
            >
              {cta.label}
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
