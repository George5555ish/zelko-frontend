"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  SkinGlassLens,
  type SkinGlassLensStop,
} from "@/components/SkinGlassLens";
import { GlassPillNav } from "@/components/landing/GlassPillNav";

const HERO_VIDEOS = ["/output.mp4", "/output2.mp4"] as const;
/** Each clip stays up for this long, then we crossfade to the next */
const VIDEO_INTERVAL_MS = 4000;
/** Crossfade length — must match `.hero-video-slide.is-fading-in` (~1s) */
const VIDEO_FADE_MS = 1000;

/** Face center in viewport — matches video `object-[52%_28%]` crop. */
const FACE_CX = 0.52;
const FACE_CY = 0.36;

const LENS_BATCHES: SkinGlassLensStop[][] = [
  [
    { x: FACE_CX - 0.08, y: FACE_CY - 0.12, label: "Skin clarity", motion: "orbit" },
    { x: FACE_CX - 0.1, y: FACE_CY + 0.12, label: "Jawline definition", motion: "sweep" },
  ],
  [
    { x: FACE_CX - 0.1, y: FACE_CY - 0.06, label: "Eye spacing", motion: "bob" },
    { x: FACE_CX - 0.08, y: FACE_CY - 0.18, label: "Forehead tone", motion: "zigzag" },
  ],
  [
    { x: FACE_CX - 0.08, y: FACE_CY + 0.06, label: "Lip definition", motion: "figure8" },
    { x: FACE_CX + 0.02, y: FACE_CY - 0.04, label: "Cheek volume", motion: "orbit" },
  ],
];

const LANDMARK_BATCHES = [
  [
    { id: "forehead", x: FACE_CX, y: FACE_CY - 0.14 },
    { id: "eye-l", x: FACE_CX - 0.045, y: FACE_CY - 0.05 },
  ],
  [
    { id: "eye-r", x: FACE_CX + 0.045, y: FACE_CY - 0.05 },
    { id: "cheek", x: FACE_CX + 0.08, y: FACE_CY + 0.02 },
  ],
  [
    { id: "lip", x: FACE_CX, y: FACE_CY + 0.1 },
    { id: "jaw", x: FACE_CX, y: FACE_CY + 0.18 },
  ],
] as const;

const BATCH_STAGGER_MS = 700;
const BATCH_DWELL_MS = 3800;
const BATCH_FADE_MS = 900;
const BATCH_GAP_MS = 3000;
const BATCH_ENTER_BASE_MS = 0;
const BATCH_START_DELAY_MS = 3000;
const LENSES_MAX_MS = 30_000;

const LM_START_DELAY_MS = 900;
const LM_STAGGER_MS = 450;
const LM_DWELL_MS = 2400;
const LM_FADE_MS = 700;
const LM_GAP_MS = 1400;

function playFromStart(video: HTMLVideoElement | null) {
  if (!video) return;
  try {
    video.currentTime = 0;
  } catch {
    /* ignore */
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

/**
 * Landing hero — dual-video crossfade, landmark dots + glass lenses,
 * right-side analytic cards, glass pill nav.
 */
export function LandingHero() {
  const [started, setStarted] = useState(false);
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
  const activeVideoSyncRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setStarted(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  // Dual-video interval crossfade
  useEffect(() => {
    playFromStart(videoRefs.current[0] ?? null);
    activeVideoSyncRef.current = videoRefs.current[0] ?? null;

    const id = window.setInterval(() => {
      setActiveVideo((current) => {
        const next = (current + 1) % HERO_VIDEOS.length;
        setPreviousVideo(current);
        playFromStart(videoRefs.current[next] ?? null);
        activeVideoSyncRef.current = videoRefs.current[next] ?? null;
        window.setTimeout(() => {
          setPreviousVideo((prev) => {
            if (prev === current) {
              pauseAndReset(videoRefs.current[current] ?? null);
              return null;
            }
            return prev;
          });
        }, VIDEO_FADE_MS);
        return next;
      });
    }, VIDEO_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, []);

  // Landmark + lens batch timers
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
    const stopId = window.setTimeout(() => setLensesDone(true), LENSES_MAX_MS);
    return () => {
      window.clearTimeout(landmarksId);
      window.clearTimeout(lensesId);
      window.clearTimeout(stopId);
    };
  }, [started]);

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
      setLandmarkBatch((b) => b + 1);
      setLandmarksVisible(true);
    }, advanceAt);

    return () => {
      window.clearTimeout(hideId);
      window.clearTimeout(advanceId);
    };
  }, [landmarksReady, landmarksDone, landmarkBatch]);

  useEffect(() => {
    if (!lensesReady || lensesDone) return;
    const batch = LENS_BATCHES[lensBatch] ?? LENS_BATCHES[0];
    const lastEnter = (batch.length - 1) * BATCH_STAGGER_MS;
    const advanceAt =
      lastEnter + BATCH_DWELL_MS + BATCH_FADE_MS + BATCH_GAP_MS;

    const advanceId = window.setTimeout(() => {
      if (lensBatch >= LENS_BATCHES.length - 1) {
        setLensBatch(0);
        return;
      }
      setLensBatch((b) => b + 1);
    }, advanceAt);

    return () => window.clearTimeout(advanceId);
  }, [lensesReady, lensesDone, lensBatch]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#2a3038] text-white">
      <GlassPillNav />

      {/* Dual-video stage */}
      <div className="absolute inset-0 z-0">
        {HERO_VIDEOS.map((src, i) => {
          const isActive = i === activeVideo;
          const isPrevious = i === previousVideo;
          return (
            <div
              key={src}
              className={`hero-video-slide absolute inset-0 ${
                isActive
                  ? previousVideo !== null
                    ? "is-fading-in z-[1]"
                    : "z-[1] !opacity-100"
                  : isPrevious
                    ? "z-0 !opacity-100"
                    : "z-0"
              }`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                  if (isActive) activeVideoSyncRef.current = el;
                }}
                className="absolute inset-0 h-full w-full object-cover object-[52%_28%]"
                src={src}
                muted
                playsInline
                preload={isActive || isPrevious ? "auto" : "metadata"}
              />
            </div>
          );
        })}
        <div
          aria-hidden
          className="absolute inset-0 z-[2] bg-[#3a4554]/12 mix-blend-multiply"
        />
        <div
          aria-hidden
          className="hero-edge-vignette absolute inset-0 z-[3]"
        />

        {/* Landmarks sit inside the video stage so % coords track the face crop */}
        {landmarksReady &&
          !landmarksDone &&
          (LANDMARK_BATCHES[landmarkBatch] ?? []).map((mark, i) => (
            <span
              key={`${landmarkBatch}-${mark.id}`}
              className={`hero-landmark pointer-events-none max-lg:hidden ${
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
      </div>

      {/* Glass measure lenses */}
      {lensesReady &&
        !lensesDone &&
        (LENS_BATCHES[lensBatch] ?? []).map((lens, i) => {
          const batchLen = LENS_BATCHES[lensBatch]?.length ?? 1;
          return (
            <div key={`${lensBatch}-${lens.label}`} className="max-lg:hidden">
              <SkinGlassLens
                active
                useVideoZoom
                syncVideoRef={activeVideoSyncRef}
                stop={lens}
                objectPosition="52% 28%"
                className="skin-glass-lens--field"
                enterDelayMs={BATCH_ENTER_BASE_MS + i * BATCH_STAGGER_MS}
                dwellMs={BATCH_DWELL_MS + (batchLen - 1 - i) * BATCH_STAGGER_MS}
                fadeMs={BATCH_FADE_MS}
                loop={false}
                lite
              />
            </div>
          );
        })}

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:justify-center lg:px-10 lg:pb-24 lg:pt-32">
        <div
          className={`max-w-xl transition duration-700 ease-out ${
            started ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 sm:text-[11px]">
            Join people measuring what they can change
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-cursive)] text-[2.6rem] leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
            Know exactly
            <br />
            what to change.
          </h1>
          <p className="mt-3 max-w-sm text-[12px] leading-relaxed text-white/55 sm:mt-4 sm:text-[13px]">
            Every score comes with the reason behind it — no guessing, no
            percentile, just what&apos;s measurable and what to do next.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/upload"
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1a1e24] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.55)] transition hover:bg-white/92"
            >
              Start free report
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/16"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Minimal right accent — measure rail, not a card stack */}
        <HeroMeasureRail started={started} />
      </div>
    </section>
  );
}

function HeroMeasureRail({ started }: { started: boolean }) {
  const ticks = [
    { label: "Symmetry", pos: 0.22 },
    { label: "Clarity", pos: 0.48 },
    { label: "Jawline", pos: 0.72 },
  ];

  return (
    <aside
      aria-hidden
      className={`pointer-events-none absolute right-8 top-1/2 hidden w-36 -translate-y-1/2 lg:block xl:right-12 ${
        started ? "opacity-100" : "opacity-0"
      } transition duration-1000 delay-300`}
    >
      <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
        Measured
      </p>
      <p className="mt-1 font-mono text-3xl font-light tabular-nums tracking-tight text-white/80">
        8
      </p>
      <p className="mt-0.5 text-[11px] text-white/40">features</p>

      <div className="relative mt-8 h-44">
        <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-white/5 via-white/25 to-white/5" />
        {ticks.map((t) => (
          <div
            key={t.label}
            className="absolute left-0 flex items-center gap-2"
            style={{ top: `${t.pos * 100}%` }}
          >
            <span className="ml-[7px] size-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.35)]" />
            <span className="text-[10px] tracking-wide text-white/45">
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
