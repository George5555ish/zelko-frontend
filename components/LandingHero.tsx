"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  SkinGlassLens,
  type SkinGlassLensStop,
} from "@/components/SkinGlassLens";
import {
  MenuToggleButton,
  MobileNavSheet,
} from "@/components/site/MobileNavSheet";
import { SITE_NAV } from "@/lib/site-nav";

const HEADLINE_LINES = ["Know exactly", "what to change."] as const;
const PROOF_LINE_WORDS = ["And", "prove", "it", "worked."] as const;

const BODY_WORDS = [
  "Every",
  "score",
  "comes",
  "with",
  "the",
  "reason",
  "behind",
  "it",
  "—",
  "no",
  "guessing,",
  "no",
  "percentile,",
  "just",
  "what's",
  "measurable",
  "and",
  "what",
  "to",
  "do",
  "next.",
] as const;

const STATS = [
  {
    value: "8",
    label: "measured features",
    icon: CubeIcon,
  },
  {
    value: "Always",
    label: "shows confidence",
    icon: CirclesIcon,
  },
  {
    value: "Free",
    label: "overall score",
    icon: CylinderIcon,
  },
] as const;

/**
 * Smaller batches (2 at a time) keep pan smooth.
 * Timing is independent of the hero video crossfade.
 */
const LENS_BATCHES: SkinGlassLensStop[][] = [
  [
    // Skin clarity sits on the mid-cheek / jaw area; jawline sits lower on the face
    { x: 0.52, y: 0.28, label: "Skin clarity", motion: "orbit" },
    { x: 0.48, y: 0.7, label: "Jawline definition", motion: "sweep" },
  ],
  [
    { x: 0.5, y: 0.38, label: "Eye spacing", motion: "bob" },
    { x: 0.5, y: 0.22, label: "Forehead tone", motion: "zigzag" },
  ],
  [
    { x: 0.5, y: 0.68, label: "Lip definition", motion: "figure8" },
    { x: 0.72, y: 0.36, label: "Cheek volume", motion: "orbit" },
  ],
];

/**
 * Landmark dots in small batches (2 each), timed like the glasses
 */
const LANDMARK_BATCHES = [
  [
    { id: "forehead", x: 0.525, y: 0.25 },
    { id: "eye", x: 0.525, y: 0.41 },
  ],
  [
    { id: "skin", x: 0.545, y: 0.31 },
    { id: "cheek", x: 0.745, y: 0.39 },
  ],
  [
    { id: "lip", x: 0.525, y: 0.63 },
    { id: "jaw", x: 0.505, y: 0.73 },
  ],
] as const;

/** Clear one-after-another pop-in within a batch */
const BATCH_STAGGER_MS = 700;
const BATCH_DWELL_MS = 3800;
const BATCH_FADE_MS = 900;
/** Pause after a batch fades out before the next pops in */
const BATCH_GAP_MS = 3000;
const BATCH_ENTER_BASE_MS = 0;
/** Wait after page start before the first glass batch */
const BATCH_START_DELAY_MS = 3000;
/** Hard stop — no more glasses after this from first appear */
const LENSES_MAX_MS = 30_000;

/** Landmark batch timing */
const LM_START_DELAY_MS = 900;
const LM_STAGGER_MS = 450;
const LM_DWELL_MS = 2400;
const LM_FADE_MS = 700;
const LM_GAP_MS = 1400;

const HERO_VIDEOS = ["/output.mp4", "/output2.mp4"] as const;
/** Each clip stays up for this long, then we crossfade to the next */
const VIDEO_INTERVAL_MS = 4000;
/** Crossfade length — incoming fades over the outgoing (no empty gap) */
const VIDEO_FADE_MS = 1000;

function playFromStart(video: HTMLVideoElement | null) {
  if (!video) return;
  try {
    video.currentTime = 0;
  } catch {
    /* ignore seek before ready */
  }
  void video.play().catch(() => {});
}

function pauseAndReset(video: HTMLVideoElement | null) {
  if (!video) return;
  video.pause();
  try {
    video.currentTime = 0;
  } catch {
    /* ignore */
  }
}

export function LandingHero() {
  const [started, setStarted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [previousVideo, setPreviousVideo] = useState<number | null>(null);
  const [lensBatch, setLensBatch] = useState(0);
  const [lensesReady, setLensesReady] = useState(false);
  const [lensesDone, setLensesDone] = useState(false);
  const [landmarkBatch, setLandmarkBatch] = useState(0);
  const [landmarksReady, setLandmarksReady] = useState(false);
  const [landmarksVisible, setLandmarksVisible] = useState(false);
  const [landmarksDone, setLandmarksDone] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const glowRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const activeVideoSyncRef = useRef<HTMLVideoElement | null>(null);
  const videoStageRef = useRef<HTMLDivElement>(null);
  const copyLayerRef = useRef<HTMLDivElement>(null);
  const parallaxRaf = useRef(0);

  useEffect(() => {
    const id = window.setTimeout(() => setStarted(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!started) return;
    const landmarksId = window.setTimeout(() => {
      setLandmarksReady(true);
      setLandmarksVisible(true);
    }, LM_START_DELAY_MS);
    const lensesId = window.setTimeout(
      () => setLensesReady(true),
      BATCH_START_DELAY_MS,
    );
    return () => {
      window.clearTimeout(landmarksId);
      window.clearTimeout(lensesId);
    };
  }, [started]);

  // Landmark batches: show 2 dots → fade → next batch → stop after last
  useEffect(() => {
    if (!landmarksReady || landmarksDone) return;
    const batch = LANDMARK_BATCHES[landmarkBatch] ?? LANDMARK_BATCHES[0];
    const lastEnter = (batch.length - 1) * LM_STAGGER_MS;
    const hideAt = lastEnter + LM_DWELL_MS;
    const advanceAt = hideAt + LM_FADE_MS + LM_GAP_MS;

    const hideId = window.setTimeout(() => setLandmarksVisible(false), hideAt);
    const advanceId = window.setTimeout(() => {
      if (landmarkBatch >= LANDMARK_BATCHES.length - 1) {
        setLandmarksDone(true);
        return;
      }
      setLandmarkBatch((prev) => prev + 1);
      setLandmarksVisible(true);
    }, advanceAt);

    return () => {
      window.clearTimeout(hideId);
      window.clearTimeout(advanceId);
    };
  }, [landmarksReady, landmarksDone, landmarkBatch]);

  useEffect(() => {
    if (!lensesReady || lensesDone) return;
    const id = window.setTimeout(() => setLensesDone(true), LENSES_MAX_MS);
    return () => window.clearTimeout(id);
  }, [lensesReady, lensesDone]);

  useEffect(() => {
    activeVideoSyncRef.current = videoRefs.current[activeVideo] ?? null;
  }, [activeVideo]);

  useEffect(() => {
    const applyParallax = () => {
      const y = window.scrollY;
      setScrolled(y >= 30);
      const video = videoStageRef.current;
      const copy = copyLayerRef.current;
      if (video) {
        video.style.transform = `translate3d(0, ${y * 0.32}px, 0)`;
      }
      if (copy) {
        copy.style.transform = `translate3d(0, ${y * -0.1}px, 0)`;
      }
      parallaxRaf.current = 0;
    };

    const onScroll = () => {
      if (parallaxRaf.current) return;
      parallaxRaf.current = window.requestAnimationFrame(applyParallax);
    };

    applyParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (parallaxRaf.current) window.cancelAnimationFrame(parallaxRaf.current);
    };
  }, []);

  useEffect(() => {
    // Initial state: only the first clip plays; others sit paused at 0
    HERO_VIDEOS.forEach((_, i) => {
      const main = videoRefs.current[i];
      if (i === 0) {
        playFromStart(main);
        playFromStart(glowRefs.current[i]);
      } else {
        pauseAndReset(main);
      }
    });
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveVideo((prev) => {
        setPreviousVideo(prev);
        return (prev + 1) % HERO_VIDEOS.length;
      });
    }, VIDEO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  // Advance through batches once (no infinite loop), then stop
  useEffect(() => {
    if (!lensesReady || lensesDone) return;
    const batch = LENS_BATCHES[lensBatch] ?? LENS_BATCHES[0];
    const lastEnter =
      BATCH_ENTER_BASE_MS + (batch.length - 1) * BATCH_STAGGER_MS;
    const cycleMs =
      lastEnter + BATCH_DWELL_MS + BATCH_FADE_MS + BATCH_GAP_MS;
    const id = window.setTimeout(() => {
      setLensBatch((prev) => {
        if (prev >= LENS_BATCHES.length - 1) {
          setLensesDone(true);
          return prev;
        }
        return prev + 1;
      });
    }, cycleMs);
    return () => window.clearTimeout(id);
  }, [lensesReady, lensesDone, lensBatch]);

  useEffect(() => {
    // Incoming clip always restarts from the beginning
    playFromStart(videoRefs.current[activeVideo]);
    playFromStart(glowRefs.current[activeVideo]);
  }, [activeVideo]);

  useEffect(() => {
    if (previousVideo === null) return;
    const fadingOut = previousVideo;
    const id = window.setTimeout(() => {
      pauseAndReset(videoRefs.current[fadingOut]);
      setPreviousVideo(null);
    }, VIDEO_FADE_MS);
    return () => window.clearTimeout(id);
  }, [previousVideo, activeVideo]);

  const proofDelay = 180 + HEADLINE_LINES.length * 160 + 40;
  const bodyDelay = proofDelay + PROOF_LINE_WORDS.length * 90 + 80;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--hero-surface)] text-neutral-900">
      {/* ~90% portrait with top breathing room under the nav */}
      <div
        ref={videoStageRef}
        className="hero-video-stage absolute inset-0 z-0 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {HERO_VIDEOS.map((src, i) => {
          const isActive = i === activeVideo;
          const isPrevious = i === previousVideo;
          // Outgoing stays fully opaque underneath; incoming fades in on top — no see-through gap
          const fadingIn = isActive && previousVideo !== null;
          const opacity = fadingIn ? undefined : isActive || isPrevious ? 1 : 0;

          return (
            <div
              key={src}
              className={`hero-video-slide absolute inset-0 ${fadingIn ? "is-fading-in" : ""}`}
              style={{
                opacity,
                zIndex: isActive ? 2 : isPrevious ? 1 : 0,
              }}
              aria-hidden={!isActive && !isPrevious}
            >
              {isActive ? (
                <div className="hero-video-glow pointer-events-none absolute inset-0">
                  <video
                    ref={(el) => {
                      glowRefs.current[i] = el;
                    }}
                    className="absolute inset-0 h-full w-full scale-[1.03] object-cover object-[50%_18%]"
                    src={src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              ) : null}
              <div className="hero-video-mask absolute inset-0 overflow-hidden">
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
                  src={src}
                  muted
                  loop
                  playsInline
                  preload={isActive || isPrevious ? "auto" : "metadata"}
                />
              </div>
            </div>
          );
        })}

        <div aria-hidden className="hero-video-wash pointer-events-none absolute inset-0" />
        <div aria-hidden className="hero-video-fringe pointer-events-none absolute inset-0" />
        <div aria-hidden className="hero-fullscreen-vignette pointer-events-none absolute inset-0" />

        {landmarksReady &&
          !landmarksDone &&
          (LANDMARK_BATCHES[landmarkBatch] ?? []).map((mark, i) => (
            <span
              key={`${landmarkBatch}-${mark.id}`}
              className={`hero-landmark pointer-events-none ${
                landmarksVisible ? "is-on" : ""
              }`}
              style={{
                left: `${mark.x * 100}%`,
                top: `${mark.y * 100}%`,
                transitionDelay: landmarksVisible
                  ? `${i * LM_STAGGER_MS}ms`
                  : "0ms",
                animationDelay: `${i * LM_STAGGER_MS}ms`,
              }}
              aria-hidden
            />
          ))}

        {lensesReady &&
          !lensesDone &&
          (LENS_BATCHES[lensBatch] ?? []).map((lens, i) => {
            const batchLen = LENS_BATCHES[lensBatch]?.length ?? 1;
            return (
              <SkinGlassLens
                key={`${lensBatch}-${lens.label}`}
                active
                useVideoZoom
                syncVideoRef={activeVideoSyncRef}
                stop={lens}
                objectPosition="50% 18%"
                className="skin-glass-lens--field"
                enterDelayMs={BATCH_ENTER_BASE_MS + i * BATCH_STAGGER_MS}
                dwellMs={
                  BATCH_DWELL_MS + (batchLen - 1 - i) * BATCH_STAGGER_MS
                }
                fadeMs={BATCH_FADE_MS}
                loop={false}
                lite
              />
            );
          })}
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,color] duration-300 ${
          scrolled
            ? "border-b border-neutral-200/40 bg-[color-mix(in_srgb,var(--hero-surface)_72%,transparent)] text-neutral-600 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 md:px-10">
          <Link
            href="/"
            className={`hero-word flex items-center gap-2.5 ${started ? "is-in" : ""}`}
            style={{ transitionDelay: "40ms" }}
          >
            <LogoMark />
            <span className="text-[1.25rem] font-semibold tracking-tight sm:text-[1.35rem]">
              Zelko
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-[0.92rem] lg:flex">
            {SITE_NAV.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hero-word transition ${
                  scrolled ? "hover:text-neutral-950" : "hover:text-white/80"
                } ${started ? "is-in" : ""}`}
                style={{ transitionDelay: `${120 + i * 70}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/contact"
              className={`hero-word hidden rounded-lg border px-4 py-2 text-sm font-medium transition lg:inline-flex ${
                scrolled
                  ? "border-neutral-900/80 hover:bg-white/50"
                  : "border-white/80 hover:bg-white/10"
              } ${started ? "is-in" : ""}`}
              style={{ transitionDelay: `${120 + SITE_NAV.length * 70 + 40}ms` }}
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className={`hero-word hidden text-sm font-medium transition sm:inline ${
                scrolled ? "hover:text-neutral-950" : "hover:text-white/80"
              } ${started ? "is-in" : ""}`}
              style={{
                transitionDelay: `${120 + SITE_NAV.length * 70 + 110}ms`,
              }}
            >
              Log in
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
        links={SITE_NAV}
        extras={
          <div className="flex flex-col gap-3">
            <Link
              href="/upload"
              onClick={() => setMenuOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#ebe4ff] px-5 py-3.5 text-sm font-semibold text-neutral-900 transition hover:bg-[#e0d6ff]"
            >
              Start your free report
            </Link>
            <div className="flex gap-3">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-900/70 px-4 py-3 text-sm font-medium text-neutral-900"
              >
                Contact
              </Link>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white"
              >
                Log in
              </Link>
            </div>
          </div>
        }
      />

      <div
        ref={copyLayerRef}
        className="pointer-events-none relative z-20 flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-24 will-change-transform sm:px-6 sm:pb-12 md:px-10 lg:block lg:justify-center lg:px-14 lg:pb-16 lg:pt-28"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <div className="pointer-events-auto relative w-full max-w-[20rem] rounded-3xl bg-gradient-to-t from-[var(--hero-surface)]/90 via-[var(--hero-surface)]/55 to-transparent p-1 sm:max-w-[22rem] lg:absolute lg:left-[5%] lg:top-[28%] lg:max-w-[22rem] lg:bg-none lg:p-0">
          <div
            className={`hero-word mb-4 inline-flex w-fit items-center rounded-full border border-neutral-200/80 bg-white/85 px-3.5 py-1.5 text-xs text-neutral-600 shadow-sm backdrop-blur-sm sm:mb-5 sm:text-sm ${started ? "is-in" : ""}`}
            style={{ transitionDelay: "60ms" }}
          >
            Private, explainable analysis
          </div>

          <h1 className="font-[family-name:var(--font-cursive)] text-[2.15rem] font-semibold leading-[1.12] tracking-tight text-neutral-950 sm:text-5xl lg:text-[3.5rem]">
            {HEADLINE_LINES.map((line, i) => (
              <span
                key={line}
                className={`hero-word block ${started ? "is-in" : ""}`}
                style={{ transitionDelay: `${180 + i * 160}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-2.5 text-lg font-normal leading-snug tracking-tight text-neutral-400 sm:mt-3 sm:text-2xl lg:text-[1.65rem]">
            {PROOF_LINE_WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className={`hero-word inline-block pr-[0.28em] last:pr-0 ${started ? "is-in" : ""}`}
                style={{ transitionDelay: `${proofDelay + i * 90}ms` }}
              >
                {word}
              </span>
            ))}
          </p>

          <p className="mt-4 max-w-[20rem] text-[0.95rem] leading-relaxed text-neutral-400 sm:mt-5 sm:text-lg">
            {BODY_WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className={`hero-word inline-block pr-[0.28em] last:pr-0 ${started ? "is-in" : ""}`}
                style={{ transitionDelay: `${bodyDelay + i * 35}ms` }}
              >
                {word}
              </span>
            ))}
          </p>

          <div
            className={`hero-word mt-6 sm:mt-7 ${started ? "is-in" : ""}`}
            style={{
              transitionDelay: `${bodyDelay + BODY_WORDS.length * 35 + 60}ms`,
            }}
          >
            <Link
              href="/upload"
              className="inline-flex items-center rounded-xl bg-[#ebe4ff] px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-[#e0d6ff]"
            >
              Start your free report
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute right-6 top-[34%] hidden flex-col gap-8 sm:right-10 md:right-14 lg:right-[5%] lg:flex">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            const baseDelay = 420 + i * 220;
            return (
              <div key={stat.value} className="flex items-start gap-3">
                <span
                  className={`hero-word hero-word-right shrink-0 text-neutral-400 ${started ? "is-in" : ""}`}
                  style={{ transitionDelay: `${baseDelay}ms` }}
                >
                  <Icon />
                </span>
                <div>
                  <p
                    className={`hero-word hero-word-right text-2xl font-semibold tracking-tight text-neutral-900 sm:text-[1.65rem] ${started ? "is-in" : ""}`}
                    style={{ transitionDelay: `${baseDelay + 70}ms` }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-0.5 max-w-[9.5rem] text-sm leading-snug text-neutral-500">
                    {stat.label.split(" ").map((word, wi) => (
                      <span
                        key={`${stat.value}-${word}-${wi}`}
                        className={`hero-word hero-word-right inline-block pr-[0.3em] last:pr-0 ${started ? "is-in" : ""}`}
                        style={{
                          transitionDelay: `${baseDelay + 140 + wi * 70}ms`,
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            );
          })}
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
      className="text-[#8b7cf6]"
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

function CubeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="mt-1"
      aria-hidden
    >
      <path d="M14 4.5 23 9.5v9L14 23.5 5 18.5v-9L14 4.5Z" />
      <path d="M14 14.5 23 9.5M14 14.5 5 9.5M14 14.5v9" />
    </svg>
  );
}

function CirclesIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="mt-1"
      aria-hidden
    >
      <circle cx="11" cy="14" r="6.5" />
      <circle cx="17" cy="14" r="6.5" />
    </svg>
  );
}

function CylinderIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="mt-1"
      aria-hidden
    >
      <ellipse cx="14" cy="7.5" rx="7" ry="3" />
      <path d="M7 7.5v13c0 1.7 3.1 3 7 3s7-1.3 7-3v-13" />
      <path d="M7 14c0 1.7 3.1 3 7 3s7-1.3 7-3" opacity="0.5" />
    </svg>
  );
}
