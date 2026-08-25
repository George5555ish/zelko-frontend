"use client";

import type { ReactNode } from "react";

/**
 * Decorative analytic overlays for the landing hero.
 * Visual language inspired by premium facial-analysis marketing —
 * metrics map to Zelko’s measured features (not competitor copy).
 */

function GlassCard({
  className,
  children,
  delayMs = 0,
}: {
  className?: string;
  children: ReactNode;
  delayMs?: number;
}) {
  return (
    <div
      className={`hero-chart-card pointer-events-none absolute ${className ?? ""}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

/** Facial thirds range bars */
export function FacialThirdsChart() {
  const rows = [
    { label: "Upper", value: 0.33, fill: 0.62 },
    { label: "Middle", value: 0.34, fill: 0.7 },
    { label: "Lower", value: 0.33, fill: 0.58 },
  ];
  return (
    <div className="w-[11.5rem] rounded-2xl border border-white/12 bg-[#2a2e35]/55 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:w-[13rem] sm:p-3.5">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
        Facial thirds
      </p>
      <div className="mt-3 space-y-2.5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[11px] text-white/55">{row.label}</span>
              <span className="font-mono text-[11px] tabular-nums text-white/85">
                {row.value.toFixed(2)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-300/80 to-white/80"
                style={{ width: `${row.fill * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Bell curve + score readout */
export function DistributionChart() {
  return (
    <div className="w-[12rem] rounded-2xl border border-white/12 bg-[#2a2e35]/55 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:w-[13.5rem] sm:p-3.5">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
        Skin clarity
      </p>
      <svg viewBox="0 0 160 72" className="mt-2 w-full" aria-hidden>
        <defs>
          <linearGradient id="zelkoDistFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(186,230,253,0.45)" />
            <stop offset="100%" stopColor="rgba(186,230,253,0)" />
          </linearGradient>
        </defs>
        <path
          d="M8 62 C 28 60, 40 18, 80 16 C 120 14, 132 52, 152 62"
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.4"
        />
        <path
          d="M80 16 C 100 15, 118 40, 132 54 L 132 62 L 80 62 Z"
          fill="url(#zelkoDistFill)"
        />
        <line
          x1="108"
          y1="12"
          x2="108"
          y2="62"
          stroke="rgba(125,211,252,0.9)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
      </svg>
      <div className="mt-1 flex items-end justify-between">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-sky-300/80" />
        </div>
        <span className="ml-3 font-mono text-lg font-semibold tabular-nums text-white">
          72
        </span>
      </div>
      <p className="mt-1 text-[10px] text-white/40">Confidence · High</p>
    </div>
  );
}

/** Symmetry dot tracks */
export function SymmetryTracks() {
  const tracks = [
    { label: "Eyes", pos: 0.78 },
    { label: "Brows", pos: 0.7 },
    { label: "Jaw", pos: 0.64 },
  ];
  return (
    <div className="w-[12rem] rounded-2xl border border-white/12 bg-[#2a2e35]/55 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:w-[13.5rem] sm:p-3.5">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
        Symmetry
      </p>
      <div className="mt-3 space-y-3">
        {tracks.map((t) => (
          <div key={t.label}>
            <div className="mb-1 flex justify-between text-[10px] text-white/40">
              <span>{t.label}</span>
            </div>
            <div className="relative h-2 rounded-full bg-white/10">
              <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] text-white/30">
                ·
              </span>
              <span
                className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.45)]"
                style={{ left: `calc(${t.pos * 100}% - 5px)` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[9px] uppercase tracking-[0.12em] text-white/30">
        <span>Asym</span>
        <span>Sym</span>
      </div>
    </div>
  );
}

/** Compact radar / projected potential */
export function RadarPreview() {
  return (
    <div className="w-[13rem] rounded-2xl border border-white/12 bg-[#2a2e35]/55 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:w-[14.5rem] sm:p-3.5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
          Feature map
        </p>
        <p className="font-mono text-[10px] text-white/50">
          Composite <span className="text-white/90">74</span>
        </p>
      </div>
      <svg viewBox="0 0 160 150" className="mx-auto mt-1 w-[9.5rem]" aria-hidden>
        {[0.35, 0.55, 0.75, 1].map((s) => (
          <polygon
            key={s}
            points={hexPoints(80, 78, 52 * s)}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
        ))}
        <polygon
          points={hexPoints(80, 78, 38, [0.7, 0.55, 0.8, 0.62, 0.75, 0.58])}
          fill="rgba(148,163,184,0.35)"
          stroke="rgba(226,232,240,0.7)"
          strokeWidth="1.2"
        />
        <polygon
          points={hexPoints(80, 78, 48, [0.9, 0.78, 0.92, 0.85, 0.88, 0.8])}
          fill="rgba(167,243,208,0.22)"
          stroke="rgba(167,243,208,0.75)"
          strokeWidth="1.2"
        />
      </svg>
      <div className="mt-1 flex justify-center gap-3 text-[9px] text-white/45">
        <span className="inline-flex items-center gap-1">
          <i className="inline-block size-1.5 rounded-sm bg-slate-300/80" /> Current
        </span>
        <span className="inline-flex items-center gap-1">
          <i className="inline-block size-1.5 rounded-sm bg-emerald-200/80" /> Focus potential
        </span>
      </div>
    </div>
  );
}

function hexPoints(
  cx: number,
  cy: number,
  r: number,
  scales: number[] = [1, 1, 1, 1, 1, 1],
) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI) / 3;
    const sr = r * (scales[i] ?? 1);
    return `${cx + Math.cos(angle) * sr},${cy + Math.sin(angle) * sr}`;
  }).join(" ");
}

/** Tone strip callout */
export function ToneStrip() {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/12 bg-[#2a2e35]/55 px-2.5 py-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
      <div
        className="h-16 w-2.5 rounded-full"
        style={{
          background:
            "linear-gradient(180deg,#f5e6d3 0%,#d4a574 35%,#8b5a3c 70%,#3d2314 100%)",
        }}
        aria-hidden
      />
      <div>
        <p className="text-[9px] uppercase tracking-[0.14em] text-white/40">
          Tone read
        </p>
        <p className="mt-0.5 text-[11px] text-white/75">Even · Mid</p>
      </div>
    </div>
  );
}

export function HeroAnalyticOverlays({ started }: { started: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 hidden lg:block ${
        started ? "hero-charts-in" : "opacity-0"
      }`}
      aria-hidden
    >
      {/* Right side only — left charts live in AnalysisShowcaseSection */}
      <GlassCard className="right-[5%] top-[18%]" delayMs={240}>
        <FacialThirdsChart />
      </GlassCard>
      <GlassCard className="right-[4%] top-[48%]" delayMs={400}>
        <RadarPreview />
      </GlassCard>
      <GlassCard className="right-[22%] top-[72%]" delayMs={480}>
        <ToneStrip />
      </GlassCard>
    </div>
  );
}
