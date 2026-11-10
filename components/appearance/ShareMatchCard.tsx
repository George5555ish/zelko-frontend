"use client";

import { useRef, useState } from "react";
import type { CelebrityProfile } from "@/lib/celebrity-match";

function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 80"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M32 4C18 18 10 34 12 52c1.5 12 10 22 20 24 10-2 18.5-12 20-24 2-18-6-34-20-48Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M32 10c-1 14-1 28 0 50"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M32 28c-6 4-10 10-12 16M32 40c6 3 10 8 12 14"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2l1.35 6.2L20 12l-6.65 1.8L12 22l-1.35-8.2L4 12l6.65-1.8L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.4S4.5 15.7 4.5 10.2A3.9 3.9 0 0 1 12 7.2a3.9 3.9 0 0 1 7.5 3C19.5 15.7 12 20.4 12 20.4z"
        fill="currentColor"
      />
    </svg>
  );
}

function Crown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden="true">
      <path
        d="M2.5 13.5 5 5.5l3.5 4L12 3.5l3.5 6 3.5-4 2.5 8H2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type StyleMatchResultProps = {
  userSrc: string;
  celebrity: CelebrityProfile;
  percent: number;
  lookLine: string;
  shareLabel?: string;
  keywords?: string[];
  className?: string;
};

/** Full “YOUR STYLE MATCH” result frame — used as the main hero and share card. */
export function StyleMatchResultCard({
  userSrc,
  celebrity,
  percent,
  shareLabel = "Inspired soft chic look",
  keywords = ["Soft tones", "Effortless hair", "Feminine elegance"],
  className,
}: StyleMatchResultProps) {
  return (
    <div
      className={["celeb-share__card", className].filter(Boolean).join(" ")}
    >
      <LeafMark className="celeb-share__corner celeb-share__corner--tl" />
      <LeafMark className="celeb-share__corner celeb-share__corner--tr" />
      <LeafMark className="celeb-share__corner celeb-share__corner--bl" />
      <LeafMark className="celeb-share__corner celeb-share__corner--br" />

      <div className="celeb-share__top">
        <Heart className="celeb-share__heart" />
        <h3>Your Style Match</h3>
        <p className="celeb-share__eyebrow">Celebrity beauty style result</p>
        <div className="celeb-share__divider" aria-hidden="true">
          <span />
          <Sparkle className="celeb-share__sparkle" />
          <span />
        </div>
      </div>

      <div className="celeb-share__faces">
        <div className="celeb-share__frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={userSrc} alt="You" className="celeb-share__you" />
        </div>

        <div
          className="celeb-share__badge"
          aria-label={`${percent} percent style match`}
        >
          <span className="celeb-share__rays" aria-hidden="true" />
          <div className="celeb-share__badge-inner">
            <span>Style</span>
            <strong>{percent}%</strong>
            <em>Match</em>
            <Heart className="celeb-share__badge-heart" />
          </div>
        </div>

        <div className="celeb-share__frame celeb-share__frame--celeb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={celebrity.imageSrc}
            alt={celebrity.name}
            className="celeb-share__celeb"
          />
          <span className="celeb-share__celeb-tag">
            <Crown className="celeb-share__crown" />
            {celebrity.name}
          </span>
        </div>
      </div>

      <div className="celeb-share__footer">
        <p className="celeb-share__script">
          <LeafMark className="celeb-share__script-leaf" />
          <span>{shareLabel}</span>
        </p>
        <p className="celeb-share__keywords">{keywords.join(" • ")}</p>

        <div
          className="celeb-share__divider celeb-share__divider--heart"
          aria-hidden="true"
        >
          <span />
          <Heart className="celeb-share__sparkle" />
          <span />
        </div>

        <p className="celeb-share__pill">
          <Sparkle className="celeb-share__pill-sparkle" />
          Your beauty. Your style. Perfectly you.
          <Sparkle className="celeb-share__pill-sparkle" />
        </p>

          <p className="celeb-share__brand">
          <LeafMark className="celeb-share__brand-leaf" />
          Beauty Style App
          <LeafMark className="celeb-share__brand-leaf celeb-share__brand-leaf--flip" />
        </p>
        <p className="celeb-share__credit-link">
          <a href="/credits/celebrities">Photo credits</a>
        </p>
      </div>
    </div>
  );
}

export function ShareMatchCard({
  userSrc,
  celebrity,
  percent,
  lookLine,
  shareLabel = "Inspired soft chic look",
  keywords = ["Soft tones", "Effortless hair", "Feminine elegance"],
  showShareButton = true,
}: StyleMatchResultProps & { showShareButton?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  async function shareOrCopy() {
    const text = `I'm a ${percent}% style match with ${celebrity.name} — ${shareLabel}. ${lookLine}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My style match", text });
        return;
      }
    } catch {
      /* fall through to clipboard */
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="celeb-share" ref={cardRef}>
      <StyleMatchResultCard
        userSrc={userSrc}
        celebrity={celebrity}
        percent={percent}
        lookLine={lookLine}
        shareLabel={shareLabel}
        keywords={keywords}
      />
      {showShareButton ? (
        <button
          type="button"
          className="celeb-match__btn celeb-match__btn--ghost"
          onClick={() => void shareOrCopy()}
        >
          {copied ? "Copied" : "Share / copy card"}
        </button>
      ) : null}
    </div>
  );
}
