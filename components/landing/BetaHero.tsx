import Image from "next/image";
import Link from "next/link";

const SCAN_CHECKS = [
  "Skin clarity",
  "Symmetry",
  "Hydration read",
  "Grooming",
  "Color undertone",
] as const;

export function BetaHero() {
  return (
    <section className="pb-10 md:pb-14">
      <div className="beta-hero-panel relative overflow-hidden rounded-b-[2rem] px-6 pb-10 pt-28 text-white md:rounded-b-[2.5rem] md:px-12 md:pb-14 md:pt-32">
        <div aria-hidden className="beta-hero-lines pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">
              Private beta
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-[3.15rem]">
              Skin and style analysis in a few minutes
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
              Zelko measures what&apos;s visible — clarity, proportions, grooming —
              then pairs weak scores with care steps and clothing direction that
              fits your features. No public ranks. No black-box vibe scores.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#beta"
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-white/90"
              >
                Join beta testing
              </Link>
              <p className="text-sm text-white/75">
                Upload photos · get an explainable report
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <Image
                src="/woman1.png"
                alt=""
                fill
                priority
                className="object-cover object-[30%_20%]"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#c9a0ff]/35 via-transparent to-transparent"
              />

              {/* Phone scan frame */}
              <div className="absolute inset-x-[18%] top-[12%] bottom-[18%] rounded-[1.4rem] border-[3px] border-white/90 shadow-[0_20px_50px_rgba(40,20,80,0.25)]">
                <div className="absolute inset-x-0 top-0 flex items-center justify-between rounded-t-[1.15rem] bg-white/95 px-3 py-2 text-[10px] font-semibold tracking-wide text-neutral-700">
                  <span>Skin & style scan</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a62]" />
                </div>
                <svg
                  className="absolute inset-0 m-auto h-[70%] w-[78%] text-white/85"
                  viewBox="0 0 200 240"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M100 28 C70 28 48 55 48 95 C48 140 70 175 100 210 C130 175 152 140 152 95 C152 55 130 28 100 28Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="4 5"
                  />
                  <path d="M62 88 H138 M72 120 H128 M78 150 H122" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                  <circle cx="78" cy="92" r="3" fill="currentColor" />
                  <circle cx="122" cy="92" r="3" fill="currentColor" />
                  <circle cx="100" cy="128" r="3" fill="currentColor" />
                  <circle cx="100" cy="168" r="3" fill="currentColor" />
                </svg>
              </div>
            </div>

            <ul className="absolute -left-1 top-[18%] z-20 space-y-2.5 sm:-left-6 md:-left-10">
              {SCAN_CHECKS.map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-3 text-xs font-medium text-neutral-800 shadow-sm"
                >
                  <span className="grid size-5 place-items-center rounded-full bg-[#ff7a62] text-[10px] text-white">
                    ✓
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
