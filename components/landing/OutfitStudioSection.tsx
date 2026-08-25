"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    src: "/outfit/studio-1.png",
    label: "Tailored day",
    hint: "Blazer + clean neutrals",
  },
  {
    src: "/outfit/studio-2.png",
    label: "Smart casual",
    hint: "Knit polo + structured trousers",
  },
  {
    src: "/outfit/studio-3.png",
    label: "Soft linen",
    hint: "Warm weather ease",
  },
  {
    src: "/outfit/studio-4.png",
    label: "Evening layer",
    hint: "Turtleneck + overcoat",
  },
] as const;

const INTERVAL_MS = 3200;
const FADE_MS = 750;

/**
 * Landing showcase for Outfit Studio — always auto-advances when in view.
 */
export function OutfitStudioSection() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      const next = (activeRef.current + 1) % SLIDES.length;
      activeRef.current = next;
      setActive(next);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="outfit-studio"
      className="relative overflow-hidden bg-[#f4f2f8] px-5 py-20 text-neutral-900 sm:px-8 md:px-10 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_40%,rgba(180,190,210,0.28),transparent_65%)]"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="max-w-lg">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            Outfit studio
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cursive)] text-4xl leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl">
            See yourself in the look — not just the score.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
            From your report, Zelko recommends one outfit that complements your
            face, eyes, and hair — then generates you in it. One free look;
            another requires Pro.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-neutral-500">
            <li className="flex gap-2">
              <span className="text-neutral-300">·</span>
              Colors and style matched to your portrait cues
            </li>
            <li className="flex gap-2">
              <span className="text-neutral-300">·</span>
              Optional lifestyle profile sharpens the dress code
            </li>
            <li className="flex gap-2">
              <span className="text-neutral-300">·</span>
              Generative previews — fashion direction, not medical advice
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/upload"
              className="inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Start free report
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex rounded-full border border-neutral-300 bg-white/70 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-white"
            >
              How it works
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-neutral-200/90 bg-neutral-100 shadow-[0_28px_60px_-36px_rgba(40,35,60,0.35)]">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.src}
                className="absolute inset-0 transition-opacity ease-out"
                style={{
                  opacity: i === active ? 1 : 0,
                  transitionDuration: `${FADE_MS}ms`,
                  pointerEvents: i === active ? "auto" : "none",
                }}
                aria-hidden={i !== active}
              >
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover object-[50%_18%]"
                  priority={i === 0}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                />
              </div>
            ))}

            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-5 sm:p-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                  Look preview
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-white">
                  {SLIDES[active].label}
                </p>
                <p className="text-sm text-white/65">{SLIDES[active].hint}</p>
              </div>
              <div
                className="flex gap-1.5 pb-1"
                role="tablist"
                aria-label="Outfit slides"
              >
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Show ${slide.label}`}
                    onClick={() => {
                      activeRef.current = i;
                      setActive(i);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/65"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-neutral-400 lg:text-left">
            Example looks — your stills are generated from your own portrait.
          </p>
        </div>
      </div>
    </section>
  );
}
