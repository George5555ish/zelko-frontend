"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  SkinGlassLens,
  type SkinGlassLensStop,
} from "@/components/SkinGlassLens";

const NAV_LINKS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Your report", href: "/your-report" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
] as const;

const STATS = [
  { value: "8", label: "measured features" },
  { value: "Always", label: "shows confidence" },
  { value: "Free", label: "overall score" },
] as const;

const HERO_IMAGE = "/woman3.png";
/** Portrait cutout (transparent PNG); frame aspect matches subject crop */
const HERO_ASPECT = "4 / 5";

const MAIN_LENS_STOPS: SkinGlassLensStop[] = [
  { x: 0.42, y: 0.28, label: "Skin clarity", motion: "orbit" },
  { x: 0.46, y: 0.14, label: "Forehead tone", motion: "sweep" },
  { x: 0.44, y: 0.72, label: "Dress style", motion: "figure8" },
  { x: 0.22, y: 0.32, label: "Hair shape", motion: "zigzag" },
  { x: 0.48, y: 0.4, label: "Lip definition", motion: "bob" },
];

export function MainHero() {
  const [scrolled, setScrolled] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setStarted(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="pb-6 md:pb-10">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,color] duration-300 ${
          scrolled
            ? "border-b border-neutral-200/50 bg-white/85 text-neutral-500 backdrop-blur-md"
            : "border-b border-transparent bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 md:px-10">
          <Link href="/main" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-[1.35rem] font-semibold tracking-tight">
              Zelko
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-[0.92rem] lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  scrolled ? "hover:text-neutral-950" : "hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={`hidden rounded-lg border px-4 py-2 text-sm font-medium transition sm:inline-flex ${
                scrolled
                  ? "border-neutral-900/80 hover:bg-neutral-50"
                  : "border-white/80 hover:bg-white/10"
              }`}
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className={`text-sm font-medium transition ${
                scrolled ? "hover:text-neutral-950" : "hover:text-white/80"
              }`}
            >
              Log in
            </Link>
          </div>
        </div>
      </header>

      <div className="beta-hero-panel relative min-h-[88svh] overflow-hidden rounded-b-[2rem] px-6 pb-12 pt-28 text-white md:rounded-b-[2.5rem] md:px-10 md:pb-16 md:pt-32 lg:px-14">
        <div
          aria-hidden
          className="beta-hero-lines pointer-events-none absolute inset-0"
        />

        {/* Large centered portrait — absolute, ~70% viewport height */}
        <div className="pointer-events-none absolute inset-x-0 top-[52%] z-[5] flex -translate-y-1/2 justify-center">
          <div
            className={`relative h-[70vh] max-h-[78vh] w-auto max-w-[min(92vw,28rem)] ${
              started ? "opacity-100" : "opacity-0"
            }`}
            style={{
              aspectRatio: HERO_ASPECT,
              transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: "180ms",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMAGE}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center drop-shadow-[0_28px_50px_rgba(40,20,80,0.28)]"
              draggable={false}
            />
            <SkinGlassLens
              active={started}
              imageSrc={HERO_IMAGE}
              stops={MAIN_LENS_STOPS}
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto grid min-h-[calc(88svh-7rem)] max-w-7xl items-center gap-8 lg:grid-cols-[1fr_minmax(14rem,20rem)_1fr] lg:gap-6">
          {/* Left copy — home-style */}
          <div className="order-2 max-w-md lg:order-1 lg:justify-self-start">
            <div
              className={`hero-word mb-5 inline-flex w-fit items-center rounded-full border border-white/35 bg-white/15 px-3.5 py-1.5 text-xs text-white/90 backdrop-blur-sm sm:text-sm ${
                started ? "is-in" : ""
              }`}
            >
              Private, explainable analysis
            </div>

            <h1
              className={`hero-word font-[family-name:var(--font-cursive)] text-4xl leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.15rem] ${
                started ? "is-in" : ""
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              Know exactly
              <br />
              what to change.
            </h1>

            <p
              className={`hero-word mt-4 text-xl font-normal leading-snug text-white/75 sm:text-2xl ${
                started ? "is-in" : ""
              }`}
              style={{ transitionDelay: "220ms" }}
            >
              And prove it worked.
            </p>

            <p
              className={`hero-word mt-5 max-w-sm text-base leading-relaxed text-white/70 ${
                started ? "is-in" : ""
              }`}
              style={{ transitionDelay: "320ms" }}
            >
              Every score comes with the reason behind it — no guessing, no
              percentile, just what&apos;s measurable and what to do next.
            </p>

            <div
              className={`hero-word mt-8 ${started ? "is-in" : ""}`}
              style={{ transitionDelay: "420ms" }}
            >
              <Link
                href="/upload"
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-white/90"
              >
                Start your free report
              </Link>
            </div>
          </div>

          {/* Spacer column keeps left/right balance around the absolute portrait */}
          <div className="order-1 hidden lg:order-2 lg:block" aria-hidden />

          {/* Right stats */}
          <div className="order-3 flex flex-col gap-7 lg:justify-self-end lg:pl-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`hero-word hero-word-right ${started ? "is-in" : ""}`}
                style={{ transitionDelay: `${360 + i * 100}ms` }}
              >
                <p className="text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]">
                  {stat.value}
                </p>
                <p className="mt-1 max-w-[9.5rem] text-sm leading-snug text-white/65">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="text-[#ebe4ff]"
    >
      <path
        d="M12 2.5 13.8 8.2 19.5 10 13.8 11.8 12 17.5 10.2 11.8 4.5 10 10.2 8.2 12 2.5Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M18.2 14.2 19 16.6 21.4 17.4 19 18.2 18.2 20.6 17.4 18.2 15 17.4 17.4 16.6 18.2 14.2Z"
        fill="currentColor"
      />
      <path
        d="M6.4 15.1 7 17 8.9 17.6 7 18.2 6.4 20.1 5.8 18.2 3.9 17.6 5.8 17 6.4 15.1Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}
