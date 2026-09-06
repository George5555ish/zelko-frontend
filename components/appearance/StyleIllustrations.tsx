"use client";

/** Lightweight SVG illustrations for style preference cards. */

export function DressIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 96"
      fill="none"
      aria-hidden
    >
      <path
        d="M28 14c0-6 5-10 12-10s12 4 12 10v6l8 4-4 14h-32l-4-14 8-4v-6z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M24 38h32l10 48H14L24 38z"
        fill="currentColor"
        opacity="0.55"
      />
      <circle cx="40" cy="10" r="5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function JeansIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 96"
      fill="none"
      aria-hidden
    >
      <path
        d="M26 18h28v10l4 4v54H42V52h-4v34H22V32l4-4V18z"
        fill="currentColor"
        opacity="0.7"
      />
      <path d="M30 28h20" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M40 32v20" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <circle cx="40" cy="12" r="5" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export function SkirtIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 96"
      fill="none"
      aria-hidden
    >
      <circle cx="40" cy="12" r="5" fill="currentColor" opacity="0.85" />
      <path
        d="M30 18h20v16H30z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M28 34h24l14 46H14L28 34z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

export function TrousersIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 96"
      fill="none"
      aria-hidden
    >
      <circle cx="40" cy="12" r="5" fill="currentColor" opacity="0.85" />
      <path
        d="M28 18h24v12l3 4v52H42V48h-4v38H25V34l3-4V18z"
        fill="currentColor"
        opacity="0.65"
      />
    </svg>
  );
}

export function SilhouetteIllustration({
  variant,
  className = "",
}: {
  variant: "fitted" | "relaxed" | "oversized";
  className?: string;
}) {
  const width =
    variant === "fitted" ? 22 : variant === "relaxed" ? 30 : 40;
  const x = 40 - width / 2;
  return (
    <svg
      className={className}
      viewBox="0 0 80 96"
      fill="none"
      aria-hidden
    >
      <circle cx="40" cy="14" r="8" fill="currentColor" opacity="0.8" />
      <rect
        x={x}
        y="26"
        width={width}
        height="52"
        rx={variant === "fitted" ? 6 : 10}
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}
