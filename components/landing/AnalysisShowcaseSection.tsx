"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  DistributionChart,
  FacialThirdsChart,
  RadarPreview,
  SymmetryTracks,
  ToneStrip,
} from "@/components/landing/HeroAnalyticCharts";

/**
 * Below-hero showcase for analytic glass cards + parallax portrait.
 */
export function AnalysisShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight || 1;
        // Progress through viewport: -1 (below) → 0 (center) → 1 (above)
        const mid = rect.top + rect.height / 2;
        const progress = (viewH / 2 - mid) / viewH;
        setParallaxY(Math.max(-48, Math.min(48, progress * 64)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#ebe8f2] px-5 py-20 text-neutral-900 sm:px-8 md:px-10 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_25%_35%,rgba(255,255,255,0.7),transparent_70%)]"
      />

      {/* Parallax woman — right side, behind cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[min(52%,36rem)] lg:block"
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}
        >
          <div className="relative ml-auto h-full w-full max-w-lg">
            <Image
              src="/landing/analysis-woman.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 36rem, 0px"
              className="object-cover object-[52%_12%] opacity-[0.92]"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#ebe8f2]/25 to-[#ebe8f2]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#ebe8f2] via-transparent to-[#ebe8f2]/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#ebe8f2]/40 via-transparent to-[#ebe8f2]/90" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            What you see in a report
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cursive)] text-4xl leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl">
            Scores with a signal behind them.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
            Every feature ships with a confidence label and the observed reason —
            so you know what to act on, not just a number.
          </p>
          <Link
            href="/upload"
            className="mt-8 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Start free report
          </Link>
        </div>

        <div className="relative z-20 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="flex justify-center sm:justify-start">
            <DistributionChart />
          </div>
          <div className="flex justify-center sm:justify-start">
            <SymmetryTracks />
          </div>
          <div className="flex justify-center sm:justify-start">
            <FacialThirdsChart />
          </div>
          <div className="flex justify-center sm:justify-start">
            <RadarPreview />
          </div>
          <div className="flex justify-center sm:col-span-2 sm:justify-start lg:col-span-1 xl:col-span-1">
            <ToneStrip />
          </div>
        </div>
      </div>
    </section>
  );
}
