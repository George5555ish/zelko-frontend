"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const COPY_LEAD =
  "Zelko helps you understand and care for your skin like never before. Get insights and tips backed by AI and real science";
const COPY_EMPHASIS = "for your healthiest, happiest skin";

/** Cards start stacked at center, then fly out to these offsets from center. */
const TAGS = [
  {
    label: "Beautiful",
    icon: "🌸",
    dx: "-11rem",
    dy: "-5.5rem",
    delay: 0,
    floatDelay: "0s",
  },
  {
    label: "Healthy",
    icon: "💗",
    dx: "10rem",
    dy: "-5rem",
    delay: 80,
    floatDelay: "0.4s",
  },
  {
    label: "Confident",
    icon: "⭐",
    dx: "-13rem",
    dy: "0.5rem",
    delay: 160,
    floatDelay: "0.8s",
  },
  {
    label: "Glowing",
    icon: "✨",
    dx: "-2rem",
    dy: "6.5rem",
    delay: 240,
    floatDelay: "1.2s",
  },
  {
    label: "Happy",
    icon: "😊",
    dx: "11rem",
    dy: "5.5rem",
    delay: 320,
    floatDelay: "1.6s",
  },
] as const;

const CARD_FLIGHT_MS = 900;
const LAST_CARD_DELAY_MS = 320;

export function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);
  const [cardsOut, setCardsOut] = useState(false);
  const [textDark, setTextDark] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let textTimer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setCardsOut(true);
        textTimer = window.setTimeout(() => {
          setTextDark(true);
        }, LAST_CARD_DELAY_MS + CARD_FLIGHT_MS + 120);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (textTimer) window.clearTimeout(textTimer);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-white px-6 py-28"
    >
      {TAGS.map((tag) => (
        <div
          key={tag.label}
          className={`manifesto-card absolute z-10 ${cardsOut ? "is-out" : ""} ${textDark ? "is-floating" : ""}`}
          style={
            {
              "--dx": tag.dx,
              "--dy": tag.dy,
              transitionDelay: `${tag.delay}ms`,
              animationDelay: tag.floatDelay,
            } as CSSProperties
          }
        >
          <span className="inline-flex items-center gap-2 rounded-2xl border border-neutral-100 bg-white/90 px-3.5 py-2.5 text-sm text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            <span aria-hidden className="text-base leading-none">
              {tag.icon}
            </span>
            {tag.label}
          </span>
        </div>
      ))}

      <div className="relative z-0 mx-auto max-w-3xl text-center">
        <p
          className={`manifesto-copy text-2xl leading-snug tracking-tight sm:text-3xl md:text-[2.15rem] md:leading-[1.4] ${textDark ? "is-dark" : ""}`}
        >
          <span className="manifesto-copy-lead">{COPY_LEAD} </span>
          <span className="manifesto-copy-emphasis">{COPY_EMPHASIS}</span>
        </p>
      </div>
    </section>
  );
}
