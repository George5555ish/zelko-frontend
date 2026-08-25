"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Static cheek mesh — faint landmark dots on both cheek areas (right-side portrait).
 * Coordinates normalized to the recomposed landing asset (woman on the right).
 */
const MESH_NODES: { id: string; x: number; y: number }[] = [
  // Left cheek (viewer-left / her right cheek — closer to camera center)
  { id: "lc1", x: 0.68, y: 0.4 },
  { id: "lc2", x: 0.71, y: 0.38 },
  { id: "lc3", x: 0.74, y: 0.41 },
  { id: "lc4", x: 0.69, y: 0.44 },
  { id: "lc5", x: 0.72, y: 0.45 },
  { id: "lc6", x: 0.75, y: 0.47 },
  { id: "lc7", x: 0.7, y: 0.49 },
  { id: "lc8", x: 0.73, y: 0.5 },
  // Right cheek (viewer-right / her left cheek)
  { id: "rc1", x: 0.8, y: 0.39 },
  { id: "rc2", x: 0.83, y: 0.38 },
  { id: "rc3", x: 0.86, y: 0.41 },
  { id: "rc4", x: 0.81, y: 0.44 },
  { id: "rc5", x: 0.84, y: 0.45 },
  { id: "rc6", x: 0.87, y: 0.47 },
  { id: "rc7", x: 0.82, y: 0.49 },
  { id: "rc8", x: 0.85, y: 0.5 },
];

const MESH_EDGES: [string, string][] = [
  ["lc1", "lc2"],
  ["lc2", "lc3"],
  ["lc1", "lc4"],
  ["lc2", "lc5"],
  ["lc3", "lc6"],
  ["lc4", "lc5"],
  ["lc5", "lc6"],
  ["lc4", "lc7"],
  ["lc5", "lc8"],
  ["lc7", "lc8"],
  ["rc1", "rc2"],
  ["rc2", "rc3"],
  ["rc1", "rc4"],
  ["rc2", "rc5"],
  ["rc3", "rc6"],
  ["rc4", "rc5"],
  ["rc5", "rc6"],
  ["rc4", "rc7"],
  ["rc5", "rc8"],
  ["rc7", "rc8"],
];

/**
 * One composition: copy left, woman right (matches the recomposed asset).
 */
export function FaceMeshScanSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="ai-scan"
      className="relative overflow-hidden bg-[#f4f3f1] px-5 py-14 text-neutral-900 sm:px-8 md:px-10 md:py-20"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          className={`relative overflow-hidden rounded-[1.75rem] bg-[#ebe9e6] transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-[2rem] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative aspect-[4/3] w-full max-h-[min(520px,70vh)] sm:aspect-[14/10] sm:max-h-[560px]">
            <Image
              src="/landing/face-scan-woman.png"
              alt="Woman with AI face landmark mesh overlay"
              fill
              priority={false}
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover object-right"
              quality={90}
            />

            <FaceMesh />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#f4f3f1_0%,rgba(244,243,241,0.92)_28%,rgba(244,243,241,0.35)_48%,transparent_62%),linear-gradient(180deg,transparent_78%,#f4f3f1_100%)]"
            />

            <div
              className={`absolute inset-y-0 left-0 z-10 flex w-full max-w-md flex-col justify-center px-6 py-8 sm:max-w-lg sm:px-10 md:px-12 transition duration-700 delay-100 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                Face landmarks
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-cursive)] text-3xl leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl md:text-[2.75rem]">
                Understand{" "}
                <em className="not-italic text-neutral-500">your face.</em>
                <br />
                Coach it with{" "}
                <span className="relative inline-block">
                  AI
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-neutral-900/80"
                  />
                </span>
                .
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
                Zelko maps measurable signals — skin, jawline, proportions —
                then pairs each score with something you can actually do.
              </p>
              <Link
                href="/upload"
                className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                <CameraIcon />
                Start free appearance scan
              </Link>
            </div>

            <div
              className={`absolute right-[8%] top-[14%] z-10 hidden max-w-[10.5rem] rounded-2xl border border-white/50 bg-white/55 p-2.5 shadow-[0_16px_36px_-18px_rgba(0,0,0,0.35)] backdrop-blur-md sm:block transition duration-700 delay-300 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                Skin clarity
              </p>
              <p className="mt-0.5 text-xl font-semibold tabular-nums text-neutral-950">
                90
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaceMesh() {
  const byId = Object.fromEntries(MESH_NODES.map((n) => [n.id, n]));

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {MESH_EDGES.map(([a, b]) => {
        const na = byId[a];
        const nb = byId[b];
        if (!na || !nb) return null;
        return (
          <line
            key={`${a}-${b}`}
            x1={na.x * 100}
            y1={na.y * 100}
            x2={nb.x * 100}
            y2={nb.y * 100}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.12"
          />
        );
      })}
      {MESH_NODES.map((n) => (
        <circle
          key={n.id}
          cx={n.x * 100}
          cy={n.y * 100}
          r="0.32"
          fill="rgba(255,255,255,0.4)"
        />
      ))}
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.2l1.1-1.6A1.5 1.5 0 0 1 10 3.8h4a1.5 1.5 0 0 1 1.2.6L16.3 6h1.2A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12.5" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
