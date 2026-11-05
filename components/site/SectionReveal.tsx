"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-linked section enter: content rises into place as it enters the
 * viewport (parallax feel), instead of a one-shot fade.
 */
export function SectionReveal({
  children,
  className = "",
  /** Extra vertical travel in px while entering (higher = stronger rise). */
  risePx = 96,
}: {
  children: ReactNode;
  className?: string;
  risePx?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      node.style.setProperty("--sr-p", "1");
      return;
    }

    node.style.setProperty("--sr-rise", `${risePx}px`);

    let raf = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 = section top still at bottom of viewport
      // 1 = section top has risen to ~28% of viewport height
      const start = vh;
      const end = vh * 0.28;
      const raw = (start - rect.top) / Math.max(1, start - end);
      const progress = Math.max(0, Math.min(1, raw));
      node.style.setProperty("--sr-p", progress.toFixed(4));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [risePx]);

  return (
    <div ref={ref} className={`section-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
