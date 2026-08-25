"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  SkinGlassLens,
  type SkinGlassLensStop,
} from "@/components/SkinGlassLens";
import {
  MenuToggleButton,
  MobileNavSheet,
} from "@/components/site/MobileNavSheet";
import { setAuthToken } from "@/lib/auth";
import { navForAuth } from "@/lib/site-nav";
import { useAuthUser } from "@/lib/use-auth-user";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthed } = useAuthUser();
  const navLinks = navForAuth(isAuthed);

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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 md:px-10">
          <Link href="/main" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-[1.25rem] font-semibold tracking-tight sm:text-[1.35rem]">
              Zelko
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-[0.92rem] lg:flex">
            {navLinks.map((link) => (
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

          <div className="flex items-center gap-2.5 sm:gap-4">
            {isAuthed && user?.isPro ? (
              <span
                className={`hidden rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] sm:inline ${
                  scrolled
                    ? "bg-neutral-950 text-white"
                    : "bg-white/15 text-white"
                }`}
              >
                Pro
              </span>
            ) : null}
            {!isAuthed ? (
              <Link
                href="/contact"
                className={`hidden rounded-lg border px-4 py-2 text-sm font-medium transition lg:inline-flex ${
                  scrolled
                    ? "border-neutral-900/80 hover:bg-neutral-50"
                    : "border-white/80 hover:bg-white/10"
                }`}
              >
                Contact Us
              </Link>
            ) : null}
            <Link
              href={isAuthed ? "/dashboard" : "/login"}
              className={`hidden text-sm font-medium transition sm:inline ${
                scrolled ? "hover:text-neutral-950" : "hover:text-white/80"
              }`}
            >
              {isAuthed ? "Dashboard" : "Log in"}
            </Link>
            <MenuToggleButton
              open={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              light={!scrolled}
            />
          </div>
        </div>
      </header>

      <MobileNavSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        extras={
          isAuthed ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/upload"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-neutral-900"
              >
                New assessment
              </Link>
              <div className="flex gap-3">
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setAuthToken(null);
                    window.location.href = "/";
                  }}
                  className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/upload"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-neutral-900"
              >
                Start your free report
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900"
              >
                Log in
              </Link>
            </div>
          )
        }
      />

      <div className="beta-hero-panel relative min-h-[100svh] overflow-hidden rounded-b-[2rem] px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-24 text-white sm:px-6 md:min-h-[88svh] md:rounded-b-[2.5rem] md:px-10 md:pb-16 md:pt-32 lg:px-14">
        <div
          aria-hidden
          className="beta-hero-lines pointer-events-none absolute inset-0"
        />

        <div className="pointer-events-none absolute inset-0 z-[1] lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-[50%_12%] transition-opacity duration-700 ${
              started ? "opacity-90" : "opacity-0"
            }`}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1428] via-[#1a1428]/55 to-[#1a1428]/25" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[52%] z-[5] hidden -translate-y-1/2 justify-center lg:flex">
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

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-end gap-8 md:min-h-[calc(88svh-7rem)] lg:grid lg:grid-cols-[1fr_minmax(14rem,20rem)_1fr] lg:items-center lg:justify-end lg:gap-6">
          <div className="order-2 max-w-md lg:order-1 lg:justify-self-start">
            <div
              className={`hero-word mb-4 inline-flex w-fit items-center rounded-full border border-white/35 bg-white/15 px-3.5 py-1.5 text-xs text-white/90 backdrop-blur-sm sm:mb-5 sm:text-sm ${
                started ? "is-in" : ""
              }`}
            >
              Private, explainable analysis
            </div>

            <h1
              className={`hero-word font-[family-name:var(--font-cursive)] text-[2.35rem] leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.15rem] ${
                started ? "is-in" : ""
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              Know exactly
              <br />
              what to change.
            </h1>

            <p
              className={`hero-word mt-3 text-lg font-medium leading-snug text-white/85 sm:mt-4 sm:text-2xl sm:font-normal sm:text-white/75 ${
                started ? "is-in" : ""
              }`}
              style={{ transitionDelay: "220ms" }}
            >
              And prove it worked.
            </p>

            <p
              className={`hero-word mt-5 hidden max-w-sm text-base leading-relaxed text-white/70 lg:block ${
                started ? "is-in" : ""
              }`}
              style={{ transitionDelay: "320ms" }}
            >
              Every score comes with the reason behind it — no guessing, no
              percentile, just what&apos;s measurable and what to do next.
            </p>

            <div
              className={`hero-word mt-7 ${started ? "is-in" : ""}`}
              style={{ transitionDelay: "420ms" }}
            >
              <Link
                href="/upload"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-900 transition hover:bg-white/90 sm:w-auto sm:py-3"
              >
                Start your free report
              </Link>
            </div>
          </div>

          <div className="order-1 hidden lg:order-2 lg:block" aria-hidden />

          <div className="order-3 hidden flex-col gap-7 lg:flex lg:justify-self-end lg:pl-4">
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
