"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Landing product previews — real report screenshots (dashboard + analytics).
 */
export function ReportPreviewSection() {
  return (
    <section
      id="inside-your-report"
      className="relative overflow-hidden bg-[#1a1c20] px-5 py-20 text-white sm:px-8 md:px-10 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(ellipse_55%_45%_at_90%_80%,rgba(148,163,184,0.08),transparent_50%)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Inside your pass
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cursive)] text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl">
            Strengths on your real photos.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-[15px]">
            Zoom what already works, then light style direction — private, no
            public ranking, no likeness-first generation.
          </p>
        </div>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          <PreviewRow
            eyebrow="Strengths view"
            title="Your face, accentuated — not scored first."
            body="Soft highlights on your real photo. Short strength notes for eyes, framing, and structure. Pro unlocks the full sequence and style panel."
            bullets={[
              "Interactive zooms on your uploads",
              "Positive, specific strength notes",
              "Free 2–3 zooms · Pro unlocks the full pass",
            ]}
            imageSrc="/landing/report-dashboard.png"
            imageAlt="Zelko strengths presentation on a real portrait"
            reverse={false}
          />

          <PreviewRow
            eyebrow="Style direction"
            title="Neckline, color, hair — tied to a zoom."
            body="After the zooms, a clean panel suggests open necklines, a short palette, and hair framing that keeps attention on your strongest features."
            bullets={[
              "Neckline that keeps structure visible",
              "3–5 undertone-friendly swatches",
              "One low-effort next step",
            ]}
            imageSrc="/landing/report-analytics.png"
            imageAlt="Zelko style direction panel with palette and framing notes"
            reverse
          />
        </div>

        <div className="mt-14 flex flex-wrap gap-3 md:mt-16">
          <Link
            href="/upload"
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
          >
            Start free strengths pass
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}

function PreviewRow({
  eyebrow,
  title,
  body,
  bullets,
  imageSrc,
  imageAlt,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div
        className={`transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/50">{body}</p>
        <ul className="mt-5 space-y-2 text-sm text-white/55">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-white/25">·</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <ScreenshotFrame
        visible={visible}
        delayMs={reverse ? 80 : 140}
        src={imageSrc}
        alt={imageAlt}
      />
    </div>
  );
}

function ScreenshotFrame({
  src,
  alt,
  visible,
  delayMs,
}: {
  src: string;
  alt: string;
  visible: boolean;
  delayMs: number;
}) {
  return (
    <div
      className={`transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      <div className="overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#111317] shadow-[0_28px_80px_-24px_rgba(0,0,0,0.65)] ring-1 ring-white/5">
        <div className="flex items-center gap-1.5 border-b border-white/8 px-3.5 py-2.5">
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-white/30">
            Report preview
          </span>
        </div>
        <div className="relative aspect-[16/10] w-full bg-[#15171b]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            quality={95}
            className="object-cover object-top"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
